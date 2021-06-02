// var i = 150
// const IDLENGTH = 15
// console.log("t" + "0".repeat(IDLENGTH - String(i).length) + i)
// var tm = 1 + Math.floor(Math.random() * 1000)
// var tmp1 = "t" + "0".repeat(IDLENGTH - String(tm).length) + tm
// console.log(tmp1)

const fs = require('fs');
const path = require("path");
const IDLENGTH = 15
var { init, database } = require("liburno_bklib")
init()

var db = database.db("data/treeter.db")
var query = 'select MAX(id) as last from treets'
var { last } = db.prepare(query).get()
var nid = Number(last.slice(1)) + 1
var id = "t" + "0".repeat(IDLENGTH - String(nid).length) + nid
console.log(id)


var date = new Date().toFloat()
var query1 = "insert or replace into treets(id, author, isretreet, date, iscomment, content) values(?,?,?,?,?,?)"
db.prepare(query1).run(id, 'u000000000079535', '', date, '', "Giammi Yoga is the best")




// /////////
// var a = new Date()
// var b = new Date("2/2/2016")
// var c = new Date("2/22/2010")

// // var a = 1
// // var b = 3
// // var c = 2

// var tmp = [a, b, c]
// //tmp.sort(function (x, y) { return x - y })
// tmp.sort((x, y) => x - y)

// var d = 20131105.123433

// console.log(a.toInt())
// console.log(a.toFloat())
// console.log(d.toDate())



// function toTime(d) {
//     function toTimeTreets(n) {
//         if (Math.floor(n / 60) == 0) {
//             return `${n} sec ago`
//         } else if (Math.floor(n / 3600) == 0) {
//             return `${Math.floor(n / 60)} min ago`
//         } else if (Math.floor(n / 86400) == 0) {
//             return `${Math.floor(n / 3600)} h ago`
//         } else if (Math.floor(n / 604800) == 0) {
//             return `${Math.floor(n / 86400)} d ago`
//         } else if (Math.floor(n / 2592000) == 0) {
//             return `${Math.floor(n / 604800)} w ago`
//         } else if (Math.floor(n / 31536000) == 0) {
//             return `${Math.floor(n / 2592000)} m ago`
//         } else {
//             return `${Math.floor(n / 31536000)} y ago`
//         }
//     }

//     d = 20210510.1233.toDate()
//     var now = new Date().toFloat().toDate()
//     var time = toTimeTreets((now - d) / 1000)
// }