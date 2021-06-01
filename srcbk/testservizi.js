    // .post('/jgGetQuery', (req, res) => {
    //     try {
    //         var { req, data } = jgGetQuery(req, res)
    //         res.send(new Response(req, data))
    //     } catch (e) { res.send(new Response(req, data, e.message)); }
    // })

    // .post('/jgAllQuery', (req, res) => {
    //     try {
    //         var { req, data } = jgAllQuery(req, res)
    //         res.send(new Response(req, data))
    //     } catch (e) { res.send(new Response(req, data, e.message)); }
    // })

    // .post('/jgFeed', (req, res) => {
    //     try {
    //         var db = dbTreeter();

    //         var { logged } = req.body
    //         var query = db.prepare(`select picture, name, surname, username from users where id = ?`)
    //         var query1 = db.prepare(`select count(id) as count from treets where isRetreet=?`)
    //         var query2 = db.prepare(`select count(id) as count from treets where isComment=?`)
    //         var query3 = db.prepare(`select count(user) as count from likes where liked=?`)
    //         // con querydefinitiva sostituisco i cicli for e ottengo gia solo i primi 20 in ordine cronologico
    //         var hasmore = false
    //         var querydefinitiva = `select id as tid, date, content as tweet, isRetreet, author as uid from treets where author in (select following from followers where user = ?) or author = ? order by date desc limit ${MAXTWEET + 1}`
    //         var treets = db.prepare(querydefinitiva).all(logged, logged)
    //         if (treets.length > MAXTWEET) {
    //             hasmore = true;
    //             treets.pop();
    //         }
    //         for (treet of treets) {
    //             var t = query.get(treet.uid)
    //             treet.src = t.picture
    //             treet.name = t.name + " " + t.surname
    //             treet.username = t.username
    //             treet.retweets = query1.get(treet.tid).count
    //             treet.comments = query2.get(treet.tid).count
    //             treet.like = query3.get(treet.tid).count
    //             treet.time = toTime(treet.date)
    //         }

    //         // per far funzionare il sort si deve definire il "new Date" nella definizione della variabile e non dentro il sort
    //         db.chiudi();
    //         res.send(new Response(req, { treets, hasmore }))

    //     } catch (e) {
    //         res.send(new Response(req, treets, e.message));
    //     }

    // })