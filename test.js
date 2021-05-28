var a = new Date("2/5/2013")
var b = new Date("2/2/2016")
var c = new Date("2/22/2010")

// var a = 1
// var b = 3
// var c = 2

var tmp = [a, b, c]
//tmp.sort(function (x, y) { return x - y })
tmp.sort((x, y) => x - y)
console.log(tmp)