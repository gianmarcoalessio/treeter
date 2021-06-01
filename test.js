var { init } = require("liburno_lib")
init()





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

    d = 20210510.1233.toDate()
    var now = new Date().toFloat().toDate()
    var time = toTimeTreets((now - d) / 1000)
}