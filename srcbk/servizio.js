const fs = require('fs');
const router = require('express').Router();
const path = require("path");
const { init, B, Response, dm } = require('liburno_bklib');
const MAXTWEET = 20
const IDLENGTH = 15
init();

function toTime(d) {
    function toTimeTreets(n) {
        if (Math.floor(n / 60) == 0) {
            return `${n} sec ago`
        } else if (Math.floor(n / 3600) == 0) {
            return `${Math.floor(n / 60)} min ago`
        } else if (Math.floor(n / 86400) == 0) {
            return `${Math.floor(n / 3600)} h ago`
        } else if (Math.floor(n / 604800) == 0) {
            return `${Math.floor(n / 86400)} d ago`
        } else if (Math.floor(n / 2592000) == 0) {
            return `${Math.floor(n / 604800)} w ago`
        } else if (Math.floor(n / 31536000) == 0) {
            return `${Math.floor(n / 2592000)} m ago`
        } else {
            return `${Math.floor(n / 31536000)} y ago`
        }
    }

    var now = new Date().toFloat().toDate()
    var d1 = Number(d).toDate()
    return toTimeTreets((now - d1) / 1000)
}

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

    .post('/jgLog', (req, res) => {
        try {
            var db = dbTreeter();
            var logged = db.prepare("select id,username,name,surname,age,email,sex,picture,special from users order by random()").get()
            db.chiudi();
            res.send(new Response(req, logged))
        } catch (e) { res.send(new Response(req, logged, e.message)); }
    })

    //servizio che mi da la pagina successiva
    .post('/jgFeedMore', (req, res) => {
        try {
            var db = dbTreeter();

            var { logged, page } = req.body
            var query = db.prepare(`select picture, name, surname, username from users where id = ?`)
            var query1 = db.prepare(`select count(id) as count from treets where isRetreet=?`)
            var query2 = db.prepare(`select count(id) as count from treets where isComment=?`)
            var query3 = db.prepare(`select count(user) as count from likes where liked=?`)
            // con querydefinitiva sostituisco i cicli for e ottengo gia solo i primi 20 in ordine cronologico
            var hasmore = false
            var querydefinitiva = `select id as tid, date, content as tweet, isRetreet, author as uid from treets where author in (select following from followers where user = ?) or author = ? order by date desc limit ${page * MAXTWEET},${MAXTWEET + 1}`
            var treets = db.prepare(querydefinitiva).all(logged, logged)
            if (treets.length > MAXTWEET) {
                hasmore = true;
                treets.pop();
            }
            for (treet of treets) {
                var t = query.get(treet.uid)
                treet.src = t.picture
                treet.name = t.name + " " + t.surname
                treet.username = t.username
                treet.retweets = query1.get(treet.tid).count
                treet.comments = query2.get(treet.tid).count
                treet.likes = query3.get(treet.tid).count
                treet.time = toTime(treet.date)
            }

            // per far funzionare il sort si deve definire il "new Date" nella definizione della variabile e non dentro il sort
            db.chiudi();
            res.send(new Response(req, { treets, hasmore }))

        } catch (e) {
            res.send(new Response(req, treets, e.message));
        }

    })

    .post('/jgNewTreet', (req, res) => {
        try {
            var db = dbTreeter();
            query = 'select MAX(id) as last from treets'
            var { last } = db.prepare(query).get()
            var nid = Number(last.slice(1)) + 1
            var tid = "t" + "0".repeat(IDLENGTH - String(nid).length) + nid
            var date = new Date().toFloat()
            query = db.prepare("insert or replace into treets(id, author, isretreet, date, iscomment, content) values(?,?,?,?,?,?)")
            query.run(tid, req.body.author, req.body.isRetreet, date, req.body.isComment, req.body.content)
            db.chiudi();
            res.send(new Response(req))
        } catch (e) { res.send(new Response(req, e.message)); }
    })

    .post('/jgFeedTreet', (req, res) => {
        try {
            var db = dbTreeter();

            var { idt, page } = req.body
            var query = db.prepare(`select picture, name, surname, username from users where id = ?`)
            var query1 = db.prepare(`select count(id) as count from treets where isRetreet=?`)
            var query2 = db.prepare(`select count(id) as count from treets where isComment=?`)
            var query3 = db.prepare(`select count(user) as count from likes where liked=?`)
            // con querydefinitiva sostituisco i cicli for e ottengo gia solo i primi 20 in ordine cronologico
            var hasmore = false
            var querydefinitiva = `select id as tid, date, content as tweet, isRetreet, author as uid from treets where isComment = ? or isRetreet=? order by date desc limit ${page * MAXTWEET},${MAXTWEET + 1}`
            var treets = db.prepare(querydefinitiva).all(idt, idt)
            if (treets.length > MAXTWEET) {
                hasmore = true;
                treets.pop();
            }
            for (treet of treets) {
                var t = query.get(treet.uid)
                treet.src = t.picture
                treet.name = t.name + " " + t.surname
                treet.username = t.username
                treet.retweets = query1.get(treet.tid).count
                treet.comments = query2.get(treet.tid).count
                treet.likes = query3.get(treet.tid).count
                treet.time = toTime(treet.date)
            }

            // per far funzionare il sort si deve definire il "new Date" nella definizione della variabile e non dentro il sort
            db.chiudi();
            res.send(new Response(req, { treets, hasmore }))

        } catch (e) {
            res.send(new Response(req, treets, e.message));
        }

    })

    .post('/jgGetTreet', (req, res) => {
        try {
            var db = dbTreeter();

            var { tid } = req.body
            var query = db.prepare(`select date, content as tweet, isRetreet, author as uid from treets where id=?`)
            var query1 = db.prepare(`select count(id) as count from treets where isRetreet=?`)
            var query2 = db.prepare(`select count(id) as count from treets where isComment=?`)
            var query3 = db.prepare(`select count(user) as count from likes where liked=?`)
            var query4 = db.prepare(`select picture, name, surname, username from users where id = ?`)
            var treet = query.get(tid)
            var t = query4.get(treet.uid)
            treet.src = t.picture
            treet.name = t.name + " " + t.surname
            treet.username = t.username
            treet.retweets = query1.get(tid).count
            treet.comments = query2.get(tid).count
            treet.likes = query3.get(tid).count
            treet.time = toTime(treet.date)


            // per far funzionare il sort si deve definire il "new Date" nella definizione della variabile e non dentro il sort
            db.chiudi();
            res.send(new Response(req, treet))

        } catch (e) {
            res.send(new Response(req, treet, e.message));
        }

    })


