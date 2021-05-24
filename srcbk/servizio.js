const fs = require('fs');
const router = require('express').Router();
const path = require("path");
const { init, B, Response, dm } = require('liburno_bklib');
init();


const dbTreeter = () => {
    var ff = dm.getfile("../data/treeter.db");
    var fl = dm.exist(ff);
    var d = dm.dbget(ff);
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
    .post('/jServizio', (req, res) => {
        try {
            var u = dm.checkuser(req, 0)
            var db = dbTreeter();

            db.chiudi();
            res.send(new Response(req, u))
        } catch (e) { res.send(new Response(req, undefined, e.message)); }
    })

    .post('/jgLog', (req, res) => {
        try {
            var db = dbTreeter();
            var logged = db.prepare("select id,username,name,surname,age,email,sex,picture,special from users order by random()").get()
            db.chiudi();
            res.send(new Response(req, logged))
        } catch (e) { res.send(new Response(req, logged, e.message)); }
    })
