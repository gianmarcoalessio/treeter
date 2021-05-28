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


const jgGetQuery = (req) => {
    var db = dbTreeter();
    var { query } = req.body
    var data = db.prepare(query).get()
    db.chiudi();
    return { req, data }
}

const jgAllQuery = (req) => {
    var db = dbTreeter();
    var { query } = req.body
    var data = db.prepare(query).all()
    db.chiudi();
    return { req, data }
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

    // .post('/jgLog', (req, res) => {
    //     try {
    //         var db = dbTreeter();
    //         var logged = db.prepare("select id,username,name,surname,age,email,sex,picture,special from users order by random()").get()
    //         db.chiudi();
    //         res.send(new Response(req, logged))
    //     } catch (e) { res.send(new Response(req, logged, e.message)); }
    // })

    .post('/jgGetQuery', (req, res) => {
        try {
            var { req, data } = jgGetQuery(req, res)
            res.send(new Response(req, data))
        } catch (e) { res.send(new Response(req, data, e.message)); }
    })

    .post('/jgAllQuery', (req, res) => {
        try {
            var { req, data } = jgAllQuery(req, res)
            res.send(new Response(req, data))
        } catch (e) { res.send(new Response(req, data, e.message)); }
    })

    // // .post('/jgFeed', (req, res) => {
    // //     try {
    // //         var db = dbTreeter();

    // //         var { logged } = req.body
    // //         query = `select following as id from followers where user = ?`
    // //         var following = db.prepare(query).all(logged)

    // //         for (follow of following) {
    // //             query = `select picture, name, surname, username from users where id = ?`
    // //             follow.picture = db.prepare(query).get(follow.id).picture
    // //             follow.name = db.prepare(query).get(follow.id).name
    // //             follow.surname = db.prepare(query).get(follow.id).surname
    // //             follow.username = db.prepare(query).get(follow.id).username

    // //             query = `select id, date, content, isRetreet from treets where author = ? and isComment = ''`
    // //             follow.treets = db.prepare(query).all(follow.id)

    // //             for (treet of follow.treets) {

    // //                 query = `select id from treets where isRetreet=?`
    // //                 treet.nr = db.prepare(query).all(treet.id).length

    // //                 query = `select id from treets where isComment=?`
    // //                 treet.nc = db.prepare(query).all(treet.id).length

    // //                 query = `select user from likes where liked=?`
    // //                 treet.nl = db.prepare(query).all(treet.id).length

    // //             }
    // //         }
    // //         db.chiudi();
    // //         res.send(new Response(req, following))

    // //     } catch (e) {
    // //         res.send(new Response(req, following, e.message));
    // //     }

    // // })

    .post('/jgFeed', (req, res) => {
        try {
            var db = dbTreeter();

            var { logged } = req.body
            query = `select following as id from followers where user = ?`
            var following = db.prepare(query).all(logged)

            for (follow of following) {
                query = `select picture, name, surname, username from users where id = ?`
                follow.picture = db.prepare(query).get(follow.id).picture
                follow.name = db.prepare(query).get(follow.id).name
                follow.surname = db.prepare(query).get(follow.id).surname
                follow.username = db.prepare(query).get(follow.id).username

                query = `select id, date, content, isRetreet from treets where author = ? and isComment = ''`
                follow.treets = db.prepare(query).all(follow.id)
                for (treet of follow.treets) {

                    query = `select id from treets where isRetreet=?`
                    treet.nr = db.prepare(query).all(treet.id).length

                    query = `select id from treets where isComment=?`
                    treet.nc = db.prepare(query).all(treet.id).length

                    query = `select user from likes where liked=?`
                    treet.nl = db.prepare(query).all(treet.id).length

                }
            }

            //andiamo a riformattare i treet per poterci fare un sorting

            var tmp = []
            for (follow of following) {
                for (treet of follow.treets) {
                    tmp.push({
                        uid: follow.id,
                        src: follow.picture,
                        name: follow.name + " " + follow.surname,
                        username: follow.username,
                        time: treet.date,
                        tweet: treet.content,
                        tid: treet.id,
                        comments: treet.nc,
                        retweets: treet.nr,
                        like: treet.nl
                    })
                }
            }

            tmp.sort((a, b) => { new Date(b.time) - new Date(a.time) })
            console.log(new Date(tmp[0].time) - new Date(tmp[1].time))
            db.chiudi();
            res.send(new Response(req, tmp))

        } catch (e) {
            res.send(new Response(req, tmp, e.message));
        }

    })


