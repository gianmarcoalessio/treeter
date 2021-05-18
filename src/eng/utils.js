
// timer callback: normalizza il tempo per ogni macchina!


export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadJSON(url) {
    return fetch(url)
        .then(r => r.json())
}

export function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

export function getStorage(x, def) {
    var tm = window.localStorage.getItem(x)
    return tm ? JSON.parse(tm) : def;
}
export function setStorage(x, v) {
    if (!v) {
        window.localStorage.removeItem(x);
    } else {
        window.localStorage.setItem(x, JSON.stringify(v));
    }
}

export function clamp(v, v1, v2) {
    if (v < v1) return v1;
    if (v > v2) return v2;
    return v;
}

export function elapsed(d1, d2) {
    function pad(n, d) {
        n = n + '';
        return n.length >= d ? n : new Array(d - n.length + 1).join('0') + n;
    }
    var td;
    if (d2) {
        td = d2 - d1;
        td = td / 1000;
    } else {
        td = d1;
    }
    if (!td) return "";
    var s = Math.round(td % 60);
    td = Math.floor(td / 60);
    var m = Math.round(td % 60);
    td = Math.floor(td / 60);
    var h = td
    var tm = "";
    if (h) tm = h + "h ";
    if (m || h) tm = tm + pad(m, 2) + '\' '
    tm = tm + pad(s, 2) + '"';
    return tm;
}

export function random(min, max) {
    if (typeof min === 'undefined') {
        return Math.random();
    } else if (typeof max === 'undefined') {
        if (min instanceof Array) {
            return min[Math.floor(Math.random() * min.length)];
        } else {
            return Math.random() * min;
        }
    } else {
        if (min > max) {
            var tmp = min; min = max; max = tmp;
        }
        return Math.random() * (max - min) + min;
    }
};


export var tonum = (s,dec=-1) => {
    if (!s) return 0
    if (typeof (s) === "number") return s ? s : 0;
    let n = 0;
    if (typeof (s) === "string") {
        let x = s.match(/^-?[0-9.]+$/g);
        if (x && x.length > 0) {
            n = Number(x[0]);
        } else if (/^\s*\-?\s*[0-9]+(\.[0-9]+)?\s*$/gi.test(s)) {
            n = parseFloat(s);
        } else if (/[\s\d\(\)\-\+\/\*\^\.]+/gi.test(s)) {
            try {
                n = eval(s);
            } catch { }
        }
    }
    if (dec>=0) {
        switch(dec) {
        case 0:n=Math.round(n);break;
        case 1:n=Math.round(n*10)/10;break;
        case 2:n=Math.round(n*100)/100;break;
        case 3:n=Math.round(n*1000)/1000;break;
        case 4:n=Math.round(n*10000)/10000;break;
        case 5:n=Math.round(n*100000)/100000;break;
        case 6:n=Math.round(n*1000000)/1000000;break;
        default:
            break;
        } 
    }
    return n ? n: 0;
};

export var toEuro=(n)=>{
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(tonum(n));
}

export var datestr = d => {
    var a = Math.floor(d / 10000)
    d = d % 10000
    var m = Math.floor(d / 100)
    d = d % 100
    return ((d + 100) + '').substr(-2) + '/' + ((m + 100) + '').substr(-2) + '/' + a
}

export var toDate = (number) => {
    var xx = parseFloat(number || 0);
    var x1 = Math.floor(xx);
    var x2 = Math.floor((xx - x1) * 1000000 + .8);
    var d = x1 % 100; if (d < 1) d = 1;
    x1 = Math.floor(x1 / 100);
    var m = x1 % 100; if (m < 1) m = 1;
    var y = Math.floor(x1 / 100);
    var ss = x2 % 100;
    x2 = Math.floor(x2 / 100);
    var mm = x2 % 100;
    var hh = Math.floor(x2 / 100);
    return new Date(y, m - 1, d, hh, mm, ss);
}


export var validDate = (number) => {
    number = parseFloat(number || 0);
    var xx = toDate(number);
    return (xx.getYear() + 1900) * 10000 + (xx.getMonth() + 1) * 100 + xx.getDate() == Math.floor(number);
}
export var validDateTime = (number) => {
    number = parseFloat(number || 0);
    var xx = toDate(number);
    return (xx.getYear() + 1900) * 10000 + (xx.getMonth() + 1) * 100 + xx.getDate() == Math.floor(number) &&
        xx.getHours() == Math.floor(number * 100 + .5) % 100 && xx.getMinutes() == Math.floor(number * 10000 + .5) % 100
}

export var addDays = (number, add) => {
    if (validDate(number)) {
        var rr = toDate(number);
        var r1 = rr;
        rr.setDate(rr.getDate() + add);
        // console.log(r1,rr,number,rr.toInt());
        return rr.toInt();
    }
}

export var strWeekday = (nn) => {
    if (validDate(nn))
        return ["domenica", "lunedí", "martedí", "mercoledí", "giovedí", "venerdí", "sabato"][toDate(nn).getDay()]
    return ""
}


export var strDate = (nn) => {
    if (validDate(nn)) {
        var mm = Math.floor(nn * 10000 + .5) + '';
        return mm.substr(6, 2) + "/" + mm.substr(4, 2) + "/" + mm.substr(0, 4);
    } else {
        return ""
    }
}
export var strTime = (nn) => {
    if (validDate(nn)) {
        var mm = Math.floor(nn * 10000 + .5) + '';
        return mm.substr(8, 2) + ":" + mm.substr(10, 2);
    } else {
        return ""
    }
}
export var strDatetime = (nn) => {
    if (validDate(nn)) {
        var mm = Math.floor(nn * 10000 + .5) + '';
        return mm.substr(6, 2) + "/" + mm.substr(4, 2) + "/" + mm.substr(0, 4) + "  " + mm.substr(8, 2) + ":" + mm.substr(10, 2);
    } else {
        return ""
    }
}

