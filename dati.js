const { randomInt } = require("crypto")
const LoremIpsum = require("lorem-ipsum").LoremIpsum
const fs = require("fs")
var { database, init } = require("liburno_lib")
var db1 = database.db("data/comuni.db")

init()

function randomint(n) {
    return Math.floor(Math.random() * n) //valore casuale da 0 a n-1
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toFloat();
}

function randomvec(v) {
    var i = randomint(v.length)
    return v[i] //valore casuale da 0 a n-1
}

var sql = 'select rowid, nome, dtnascita, dtelezione from amm order by random() limit 100' //se ci sono proprietà in più non è importante, perchè poi gli selezioneremo
var users = db1.prepare(sql).all()
var sex = ["M", "F"]
var treets = []

//tabella users
for (var u of users) {
    var n = u.nome.split(' ')
    u.name = n[0]
    u.surname = n[1]
    u.age = u.dtnascita
    u.id = "u" + u.rowid
    u.username = "@" + n[0].toLowerCase() + n[1].toLowerCase()
    u.sex = randomvec(sex)
    u.email = n[0].toLowerCase() + "." + n[1].toLowerCase() + "@gmail.com"
    u.picture = ""
    u.special = randomInt(1000)
}
for (var u of users) {
    var tmp = new Set
    for (var i = 0; i <= 150; i++) {
        var t = randomvec(users).id
        tmp.add(t)
    }
    u.following = [...tmp]
}

var tmp = {}
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 1
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
//tabella treets
for (var i = 1; i < 1001; i++) {
    tmp.id = "t" + i
    tmp.author = randomvec(users).id
    tmp.isRetreet = randomvec(["", "t" + (1 + randomInt(1000))])
    if (tmp.isRetreet == "") {
        tmp.isComment = randomvec(["", "t" + (1 + randomInt(1000))])
    } else {
        tmp.isComment = ""
    }
    tmp.content = lorem.generateWords(randomInt(17))
    tmp.date = randomDate(new Date(2012, 11, 21), new Date())
    treets.push(JSON.parse(JSON.stringify(tmp)))
}
for (tr of treets) {
    var tmp = new Set
    for (var i = 0; i <= 150; i++) {
        var t = randomvec(users).id
        tmp.add(t)
    }
    tr.liked = [...tmp]
}

var file = "data/treeter.db"
var esiste = fs.existsSync(file)
console.log(esiste)
var db = database.db(file)

if (!esiste) {
    db.run(`
    -- creazione
CREATE TABLE if not exists followers (
   user NVARCHAR COLLATE NOCASE DEFAULT '',
   following NVARCHAR COLLATE NOCASE DEFAULT ''
);
CREATE TABLE if not exists likes (
   user NVARCHAR COLLATE NOCASE DEFAULT '',
   liked NVARCHAR COLLATE NOCASE DEFAULT ''
);
CREATE TABLE if not exists treets (
   id NVARCHAR COLLATE NOCASE DEFAULT '',
   author NVARCHAR COLLATE NOCASE DEFAULT '',
   date NVARCHAR COLLATE NOCASE DEFAULT '',
   isretreet NVARCHAR COLLATE NOCASE DEFAULT '',
   iscomment NVARCHAR COLLATE NOCASE DEFAULT '',
   content NVARCHAR COLLATE NOCASE DEFAULT '',
   primary key (id)
);
-- CREATE INDEX ix_treets_isretreet on treets (isretreet);
-- CREATE INDEX ix_treets_iscomment on treets (iscomment);
CREATE TABLE if not exists users (
   id NVARCHAR COLLATE NOCASE DEFAULT '',
   username NVARCHAR COLLATE NOCASE DEFAULT '',
   name NVARCHAR COLLATE NOCASE DEFAULT '',
   surname NVARCHAR COLLATE NOCASE DEFAULT '',
   age INTEGER DEFAULT 0,
   email NVARCHAR COLLATE NOCASE DEFAULT '',
   sex NVARCHAR COLLATE NOCASE DEFAULT '',
   picture NVARCHAR COLLATE NOCASE DEFAULT '',
   special INTEGER DEFAULT 0,
   primary key (id)
);
`)
}


db.begin()
var df = db.prepare("insert or replace into followers (user, following) values (?,?) ")
var du = db.prepare("insert or replace into users (id, username, name, surname, age, email, sex, picture, special) values (?,?,?,?,?,?,?,?,?) ")
for (var u of users) {
    du.run(u.id, u.username, u.name, u.surname, u.age, u.email, u.sex, u.picture, u.special)
    for (var f of u.following) {
        df.run(u.id, f)
    }
}

var dl = db.prepare("insert or replace into likes (user, liked) values (?,?) ")
var dt = db.prepare("insert or replace into treets(id, author, isretreet, date, iscomment, content) values(?,?,?,?,?,?)")
for (var tr of treets) {
    dt.run(tr.id, tr.author, tr.isRetreet, tr.date, tr.isComment, tr.content)
    for (var l of tr.liked) {
        dl.run(l, tr.id)
    }
}
db.commit()
db.chiudi()