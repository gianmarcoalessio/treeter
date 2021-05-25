import { getStorage, setStorage } from "@eng/utils";
import { bus }  from "@eng/bus";

class Post {
    constructor() {
        this.baseurl = import.meta.env.MODE=="development"?(import.meta.env.VITE_BASEURL || "http://localhost:3000/") : "http://localhost:3000/"
        this.creds = getStorage("creds")
        if (!this.creds) {
            this.creds={ token:'guest'};
            setStorage("creds",this.creds);    
        }

        this.iswarning = true;
        this.init = {
            login: true,
            isguest: false,
            isregister: false,
            appname: ''
        }
        this.user = {}
        this.config = {}
        this.langs = []
        this.lang = ''
        this.trad = {}
        this.common = {}
        this.warnings = [];
        this.logdata={}
    }
    navigate(f, params) {
        f = this.fullget(f, params);
        window.open(f, '_blank');
    }
    token() {
        return new Promise((resolve, reject) => {
            this.creds = getStorage("creds")
            if (!this.creds) this.creds={ tref:'guest'}
            this.postbase('auth0/token',JSON.stringify( { token: this.creds.tref || '' })).then(d => {
                this.user = d.user;
                this.config = d.config;
                this.langs = d.langs;
                this.init = d.init;
                this.creds.token = d.token;
                setStorage("creds",this.creds);    
                resolve(d);
            }).catch(e => reject(e.message));
        })
    }
    login(name, password) {
        return new Promise((resolve, reject) => {
            this.creds = getStorage("creds") || {}
            if (name && password) {
                this.logdata.name = name;
                this.logdata.password = password;
            } else {
                if (!this.logdata.name || !this.logdata.password) {
                    reject({ message: '02-missing login name or password' })
                }
            }
            this.postbase('auth0/login',JSON.stringify( { name:this.logdata.name,password:this.logdata.password,sito:this.creds.site })).then(d => {
                this.creds.token=d.token;
                this.creds.tref=d.tref;
                setStorage("creds",this.creds);
                this.user = d.user;
                this.config = d.config;
                this.langs = d.langs;
                this.init = d.init;
                resolve(d);
            }).catch(err => { 
                this.logdata={};
                if (this.iswarning) {
                    bus.$emit('warning',err)
                }
                console.log("login:", err);
                reject(err) 
            } );
        })
    }
    logout() {
        this.creds = getStorage("creds") 
        if (this.creds) {
            this.postbase("auth0/logout",JSON.stringify({token:this.creds.token}))
            this.creds.token="";
            this.creds.tref="";
            if (this.init.isguest) this.creds.token="guest";
            setStorage("creds",this.creds);
        } 
        this.user={}
        this.logdata={};
        
    }
    checkuid(url) {
        if (url && this.creds && this.creds.token) {
            url = url.replace(/(_UID=)([\w\%]*)/g, "$1" + this.creds.token);
        }
        return url;
    }
    fullurl(url) {
        if (url && !/http[s]*:\/\//.test(url) && this.baseurl) {
            return this.baseurl + url;
        }
        return url
    }
    fullget(url, data) {
        url = this.fullurl(url);
        if (!data) data = {};
        if (this.creds && this.creds.token) data._UID = this.creds.token;
        if (this.user && this.user.ditta && !data.ditta) data.ditta = this.user.ditta;
        var rr = [];
        for (var x in data) {
            if (data[x])
                rr.push(`${x}=${encodeURIComponent(data[x])}`);
        }

        if (rr.length) {
            url = `${url}?${rr.join('&')}`
        }
        return url;
    }
    postbase(url,data) {
    
        return new Promise((resolve,reject)=>{
            if (!/http[s]*:\/\//.test(url) && this.baseurl) {
                url = this.baseurl + url;
            }
            fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body:data,
            })
            .then(response => {
                return response.json()
            })
            .then(d=>{
                if (d.err) reject (d.err)
                if (d && d.port && this.config) this.config.port=d.port;
                resolve(d.data?d.data:d);
            })
            .catch(e=>reject(e.message))
        })

    }
    post(url, data, files) {
        return new Promise((resolve, reject) => {
            var burl = url;
            var todata=(data,files)=>{
                if (!data) data = {};
                if (this.creds && this.creds.token) data._UID = this.creds.token;
                if (this.user && this.user.ditta && !data.ditta) data.ditta = this.user.ditta;
                if (files) {
                    data.type =(data.type|| 'GEN').toUpperCase();
                    const formData = new FormData();
                    for (var x in data) formData.append(x, data[x] || '');
                    if (fileList && fileList.length) {
                        Array.from(Array(fileList.length).keys()).map(x => {
                            formData.append(type + "_" + fileList[x].name, fileList[x], fileList[x].name);
                        });
                    }
                    return formData;
                }
                return JSON.stringify(data)
            }
            this.postbase(url,todata(data,files)).then(xx=>resolve(xx))
            .catch(e=>{
                if (/^\s*\w*\:?\s*01-/gi.test(e)) { 
                    // prova a rinnovare il token
                    this.token().then (d=>{
                        this.postbase(url,todata(data,files))
                            .then(xx=>resolve(xx))
                            .catch(e => this.sendwarning(reject, { burl, data, message: e }))
                    })
                    .catch(e => {
                        // e se non ci riesce prova a collegarsi
                        this.login()
                        .then(d=>{
                            this.postbase(url,todata(data,files))
                            .then(xx=>resolve(xx))
                            .catch(e => this.sendwarning(reject, { burl, data, message: e }))
                        })
                        // quindi rimand l'errore
                        .catch(e => this.sendwarning(reject, { burl, data, message: e }))
                    })
                } else {
                    this.sendwarning(reject, { burl, data, message: e })
                }
            });
        });
    }
    sendFiles(url, fileList, data) {
        return this.post(url,data,fileList);
    }
    sendwarning(reject, data) {
        if (this.iswarning) {
            bus.$emit('warning', data)
        }
        if (reject) reject(data);
    }
}
export var post= new Post();

