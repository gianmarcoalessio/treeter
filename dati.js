const { randomInt } = require("crypto")
const LoremIpsum = require("lorem-ipsum").LoremIpsum
const fs = require("fs")
var { database } = require("liburno_lib")
var db1 = database.db("data/comuni.db")


function randomint(n) {
    return Math.floor(Math.random() * n) //valore casuale da 0 a n-1
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
    u.nome = n[0]
    u.cognome = n[1]
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
var db = database.db(file)

if (!esiste) {
    db.prepare(`
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
   isretreet NVARCHAR COLLATE NOCASE DEFAULT '',
   iscomment NVARCHAR COLLATE NOCASE DEFAULT '',
   content NVARCHAR COLLATE NOCASE DEFAULT ''
);
CREATE TABLE if not exists users (
   id NVARCHAR COLLATE NOCASE DEFAULT '',
   username NVARCHAR COLLATE NOCASE DEFAULT '',
   name NVARCHAR COLLATE NOCASE DEFAULT '',
   surname NVARCHAR COLLATE NOCASE DEFAULT '',
   age INTEGER DEFAULT 0,
   email NVARCHAR COLLATE NOCASE DEFAULT '',
   sex NVARCHAR COLLATE NOCASE DEFAULT '',
   picture NVARCHAR COLLATE NOCASE DEFAULT '',
   special INTEGER DEFAULT 0
);
`).run()
}

