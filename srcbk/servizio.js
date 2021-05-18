const fs = require('fs');
const router = require('express').Router();
const path=require("path");
const {init,B,Response,dm}=require('liburno_bklib');
init();


const dbBlog=()=> {
        var ff=dm.getfile("blog.db");
        var fl=dm.exist(ff);
        var d=dm.dbget(ff);
        if (!fl) {
        /*    d.run(`
            CREATE TABLE if not exists blog(
                ...da fare
            );
        */
        }
        return d;
}

module.exports = router;
router
.post('/jServizio' ,(req, res) => {
    try {
        var u=dm.checkuser(req,0)
        var db=dbBlog();
        db.chiudi();
        res.send(new Response(req,u))
    } catch(e) { res.send(new Response(req,undefined,e.message)); }
})
