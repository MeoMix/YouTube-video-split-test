(function() {
    var g, aa = aa || {},
        m = this;

    function p(a) {
        return void 0 !== a
    }

    function q(a, b, c) {
        a = a.split(".");
        c = c || m;
        a[0] in c || !c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) !a.length && p(b) ? c[d] = b : c[d] ? c = c[d] : c = c[d] = {}
    }

    function r(a, b) {
        for (var c = a.split("."), d = b || m, e; e = c.shift();)
            if (null != d[e]) d = d[e];
            else return null;
        return d
    }

    function t() {}

    function ba(a) {
        a.getInstance = function() {
            return a.V ? a.V : a.V = new a
        }
    }

    function ca(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }

    function da(a) {
        return "array" == ca(a)
    }

    function ea(a) {
        var b = ca(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }

    function u(a) {
        return "string" == typeof a
    }

    function fa(a) {
        return "number" == typeof a
    }

    function ga(a) {
        return "function" == ca(a)
    }

    function ha(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }

    function ia(a) {
        return a[ja] || (a[ja] = ++ka)
    }
    var ja = "closure_uid_" + (1E9 * Math.random() >>> 0),
        ka = 0;

    function ma(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function na(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function v(a, b, c) {
        v = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ma : na;
        return v.apply(null, arguments)
    }

    function oa(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }
    var w = Date.now || function() {
        return +new Date
    };

    function y(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.K = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.base = function(a, c, f) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++) h[k - 2] = arguments[k];
            return b.prototype[c].apply(a, h)
        }
    }
    Function.prototype.bind = Function.prototype.bind || function(a, b) {
        if (1 < arguments.length) {
            var c = Array.prototype.slice.call(arguments, 1);
            c.unshift(this, a);
            return v.apply(null, c)
        }
        return v(this, a)
    };

    function pa(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, pa);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    }
    y(pa, Error);
    pa.prototype.name = "CustomError";
    var qa;

    function ra(a) {
        var b = a.length - 5;
        return 0 <= b && a.indexOf("_html", b) == b
    }
    var sa = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };

    function ta(a) {
        return decodeURIComponent(a.replace(/\+/g, " "))
    }

    function ua(a) {
        var b = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"'
            },
            c;
        c = m.document.createElement("div");
        return a.replace(va, function(a, e) {
            var f = b[a];
            if (f) return f;
            if ("#" == e.charAt(0)) {
                var h = Number("0" + e.substr(1));
                isNaN(h) || (f = String.fromCharCode(h))
            }
            f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
            return b[a] = f
        })
    }

    function wa(a) {
        return a.replace(/&([^;]+);/g, function(a, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    if ("#" == c.charAt(0)) {
                        var d = Number("0" + c.substr(1));
                        if (!isNaN(d)) return String.fromCharCode(d)
                    }
                    return a
            }
        })
    }
    var va = /&([^;\s<&]+);?/g;

    function xa(a, b) {
        for (var c = 0, d = sa(String(a)).split("."), e = sa(String(b)).split("."), f = Math.max(d.length, e.length), h = 0; 0 == c && h < f; h++) {
            var k = d[h] || "",
                l = e[h] || "",
                n = RegExp("(\\d*)(\\D*)", "g"),
                x = RegExp("(\\d*)(\\D*)", "g");
            do {
                var Z = n.exec(k) || ["", "", ""],
                    la = x.exec(l) || ["", "", ""];
                if (0 == Z[0].length && 0 == la[0].length) break;
                c = ya(0 == Z[1].length ? 0 : parseInt(Z[1], 10), 0 == la[1].length ? 0 : parseInt(la[1], 10)) || ya(0 == Z[2].length, 0 == la[2].length) || ya(Z[2], la[2])
            } while (0 == c)
        }
        return c
    }

    function ya(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    function za(a) {
        for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c), b %= 4294967296;
        return b
    };

    function Aa() {};
    var z = Array.prototype,
        Ba = z.indexOf ? function(a, b, c) {
            return z.indexOf.call(a, b, c)
        } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (u(a)) return u(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        A = z.forEach ? function(a, b, c) {
            z.forEach.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = u(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        },
        Ca = z.filter ? function(a, b, c) {
            return z.filter.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = [], f = 0, h = u(a) ?
                    a.split("") : a, k = 0; k < d; k++)
                if (k in h) {
                    var l = h[k];
                    b.call(c, l, k, a) && (e[f++] = l)
                }
            return e
        },
        B = z.map ? function(a, b, c) {
            return z.map.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = Array(d), f = u(a) ? a.split("") : a, h = 0; h < d; h++) h in f && (e[h] = b.call(c, f[h], h, a));
            return e
        },
        Da = z.some ? function(a, b, c) {
            return z.some.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = u(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && b.call(c, e[f], f, a)) return !0;
            return !1
        },
        Ea = z.every ? function(a, b, c) {
            return z.every.call(a, b, c)
        } : function(a, b, c) {
            for (var d =
                    a.length, e = u(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && !b.call(c, e[f], f, a)) return !1;
            return !0
        };

    function Fa(a, b, c) {
        b = Ga(a, b, c);
        return 0 > b ? null : u(a) ? a.charAt(b) : a[b]
    }

    function Ga(a, b, c) {
        for (var d = a.length, e = u(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return f;
        return -1
    }

    function Ha(a, b) {
        return 0 <= Ba(a, b)
    }

    function Ia() {
        var a = Ja;
        if (!da(a))
            for (var b = a.length - 1; 0 <= b; b--) delete a[b];
        a.length = 0
    }

    function Ka(a, b) {
        Ha(a, b) || a.push(b)
    }

    function La(a, b) {
        var c = Ba(a, b),
            d;
        (d = 0 <= c) && z.splice.call(a, c, 1);
        return d
    }

    function Ma(a, b) {
        var c = Ga(a, b, void 0);
        0 <= c && z.splice.call(a, c, 1)
    }

    function Na(a) {
        return z.concat.apply(z, arguments)
    }

    function Oa(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }

    function Pa(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (ea(d)) {
                var e = a.length || 0,
                    f = d.length || 0;
                a.length = e + f;
                for (var h = 0; h < f; h++) a[e + h] = d[h]
            } else a.push(d)
        }
    }

    function Qa(a, b, c, d) {
        return z.splice.apply(a, Ra(arguments, 1))
    }

    function Ra(a, b, c) {
        return 2 >= arguments.length ? z.slice.call(a, b) : z.slice.call(a, b, c)
    }

    function Sa(a, b, c) {
        if (!ea(a) || !ea(b) || a.length != b.length) return !1;
        var d = a.length;
        c = c || Ta;
        for (var e = 0; e < d; e++)
            if (!c(a[e], b[e])) return !1;
        return !0
    }

    function Ua(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    }

    function Ta(a, b) {
        return a === b
    };

    function Va(a, b) {
        for (var c in a) b.call(void 0, a[c], c, a)
    }

    function Wa(a, b, c) {
        var d = {},
            e;
        for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
        return d
    }

    function Xa(a) {
        var b = 0,
            c;
        for (c in a) b++;
        return b
    }

    function Ya(a, b) {
        return Za(a, b)
    }

    function $a(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    }

    function ab(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    }

    function Za(a, b) {
        for (var c in a)
            if (a[c] == b) return !0;
        return !1
    }

    function bb(a) {
        var b = cb,
            c;
        for (c in b)
            if (a.call(void 0, b[c], c, b)) return c
    }

    function db(a) {
        for (var b in a) return !1;
        return !0
    }

    function eb(a, b) {
        if (b in a) throw Error('The object already contains the key "' + b + '"');
        a[b] = !0
    }

    function fb(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    }

    function gb(a) {
        var b = ca(a);
        if ("object" == b || "array" == b) {
            if (a.clone) return a.clone();
            var b = "array" == b ? [] : {},
                c;
            for (c in a) b[c] = gb(a[c]);
            return b
        }
        return a
    }
    var hb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function ib(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < hb.length; f++) c = hb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }

    function jb(a) {
        var b = arguments.length;
        if (1 == b && da(arguments[0])) return jb.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
        return c
    };
    jb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));

    function kb() {
        this.j = ""
    }
    kb.prototype.dc = !0;
    kb.prototype.Zb = function() {
        return this.j
    };
    kb.prototype.toString = function() {
        return "Const{" + this.j + "}"
    };

    function lb() {
        var a = new kb;
        a.j = "HTML that is escaped and sanitized server-side and passed through yt.net.ajax";
        return a
    };

    function mb() {
        this.j = "";
        this.k = nb
    }
    mb.prototype.dc = !0;
    mb.prototype.Zb = function() {
        return this.j
    };

    function ob(a) {
        return a instanceof mb && a.constructor === mb && a.k === nb ? a.j : "type_error:SafeUrl"
    }
    var pb = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;

    function qb(a) {
        if (a instanceof mb) return a;
        a = a.dc ? a.Zb() : String(a);
        a = pb.test(a) ? rb(a) : "about:invalid#zClosurez";
        var b = new mb;
        b.j = a;
        return b
    }

    function rb(a) {
        try {
            var b = encodeURI(a)
        } catch (c) {
            return "about:invalid#zClosurez"
        }
        return b.replace(sb, function(a) {
            return tb[a]
        })
    }
    var sb = /[()']|%5B|%5D|%25/g,
        tb = {
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "%5B": "[",
            "%5D": "]",
            "%25": "%"
        },
        nb = {};

    function ub() {
        this.j = "";
        this.k = null
    }
    ub.prototype.dc = !0;
    ub.prototype.Zb = function() {
        return this.j
    };
    jb("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    jb("embed", "iframe", "link", "object", "script", "style", "template");

    function vb(a, b) {
        var c = new ub;
        c.j = a;
        c.k = b;
        return c
    }
    vb("", 0);

    function wb(a, b) {
        var c;
        c = b instanceof mb ? b : qb(b);
        a.href = ob(c)
    };

    function xb(a, b, c) {
        a && (a.dataset ? a.dataset[yb(b)] = c : a.setAttribute("data-" + b, c))
    }

    function C(a, b) {
        return a ? a.dataset ? a.dataset[yb(b)] : a.getAttribute("data-" + b) : null
    }
    var zb = {};

    function yb(a) {
        return zb[a] || (zb[a] = String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        }))
    };

    function D() {
        this.Ua = this.Ua;
        this.ha = this.ha
    }
    D.prototype.Ua = !1;
    D.prototype.J = function() {
        return this.Ua
    };
    D.prototype.dispose = function() {
        this.Ua || (this.Ua = !0, this.G())
    };

    function Ab(a, b) {
        a.Ua ? b.call(void 0) : (a.ha || (a.ha = []), a.ha.push(p(void 0) ? v(b, void 0) : b))
    }
    D.prototype.G = function() {
        if (this.ha)
            for (; this.ha.length;) this.ha.shift()()
    };

    function Bb(a) {
        a && "function" == typeof a.dispose && a.dispose()
    }

    function Cb(a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            ea(d) ? Cb.apply(null, d) : Bb(d)
        }
    };

    function E() {
        D.call(this);
        this.j = [];
        this.ea = {}
    }
    y(E, D);
    g = E.prototype;
    g.Gc = 1;
    g.Gb = 0;
    g.subscribe = function(a, b, c) {
        var d = this.ea[a];
        d || (d = this.ea[a] = []);
        var e = this.Gc;
        this.j[e] = a;
        this.j[e + 1] = b;
        this.j[e + 2] = c;
        this.Gc = e + 3;
        d.push(e);
        return e
    };
    g.unsubscribe = function(a, b, c) {
        if (a = this.ea[a]) {
            var d = this.j;
            if (a = Fa(a, function(a) {
                    return d[a + 1] == b && d[a + 2] == c
                })) return this.pa(a)
        }
        return !1
    };
    g.pa = function(a) {
        if (0 != this.Gb) return this.k || (this.k = []), this.k.push(a), !1;
        var b = this.j[a];
        if (b) {
            var c = this.ea[b];
            c && La(c, a);
            delete this.j[a];
            delete this.j[a + 1];
            delete this.j[a + 2]
        }
        return !!b
    };
    g.publish = function(a, b) {
        var c = this.ea[a];
        if (c) {
            this.Gb++;
            for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) d[e - 1] = arguments[e];
            e = 0;
            for (f = c.length; e < f; e++) {
                var h = c[e];
                this.j[h + 1].apply(this.j[h + 2], d)
            }
            this.Gb--;
            if (this.k && 0 == this.Gb)
                for (; c = this.k.pop();) this.pa(c);
            return 0 != e
        }
        return !1
    };
    g.clear = function(a) {
        if (a) {
            var b = this.ea[a];
            b && (A(b, this.pa, this), delete this.ea[a])
        } else this.j.length = 0, this.ea = {}
    };
    g.$ = function(a) {
        if (a) {
            var b = this.ea[a];
            return b ? b.length : 0
        }
        a = 0;
        for (b in this.ea) a += this.$(b);
        return a
    };
    g.G = function() {
        E.K.G.call(this);
        delete this.j;
        delete this.ea;
        delete this.k
    };
    var Db = window.yt && window.yt.config_ || {};
    q("yt.config_", Db, void 0);
    q("yt.tokens_", window.yt && window.yt.tokens_ || {}, void 0);
    var Eb = window.yt && window.yt.msgs_ || {};
    q("yt.msgs_", Eb, void 0);

    function Fb(a) {
        Gb(Db, arguments)
    }

    function F(a, b) {
        return a in Db ? Db[a] : b
    }

    function G(a, b) {
        ga(a) && (a = Hb(a));
        return window.setTimeout(a, b)
    }

    function Ib(a, b) {
        ga(a) && (a = Hb(a));
        window.setInterval(a, b)
    }

    function H(a) {
        window.clearTimeout(a)
    }

    function Hb(a) {
        return a && window.yterr ? function() {
            try {
                return a.apply(this, arguments)
            } catch (b) {
                throw Jb(b), b;
            }
        } : a
    }

    function Jb(a, b) {
        var c = r("yt.www.errors.log");
        c ? c(a, b) : (c = F("ERRORS") || [], c.push([a, b]), Fb("ERRORS", c))
    }

    function Kb() {
        var a = {},
            b = "FLASH_UPGRADE" in Eb ? Eb.FLASH_UPGRADE : 'You need to upgrade your Adobe Flash Player to watchthis video. <br> <a href="http://get.adobe.com/flashplayer/">Download it from Adobe.</a>';
        if (b)
            for (var c in a) b = b.replace(new RegExp("\\$" + c, "gi"), function() {
                return a[c]
            });
        return b
    }

    function Gb(a, b) {
        if (1 < b.length) {
            var c = b[0];
            a[c] = b[1]
        } else {
            var d = b[0];
            for (c in d) a[c] = d[c]
        }
    }
    var Lb = "Microsoft Internet Explorer" == navigator.appName;
    var Mb = r("yt.pubsub.instance_") || new E;
    E.prototype.subscribe = E.prototype.subscribe;
    E.prototype.unsubscribeByKey = E.prototype.pa;
    E.prototype.publish = E.prototype.publish;
    E.prototype.clear = E.prototype.clear;
    q("yt.pubsub.instance_", Mb, void 0);
    var Nb = r("yt.pubsub.subscribedKeys_") || {};
    q("yt.pubsub.subscribedKeys_", Nb, void 0);
    var Ob = r("yt.pubsub.topicToKeys_") || {};
    q("yt.pubsub.topicToKeys_", Ob, void 0);
    var Pb = r("yt.pubsub.isSynchronous_") || {};
    q("yt.pubsub.isSynchronous_", Pb, void 0);
    var Qb = r("yt.pubsub.skipSubId_") || null;
    q("yt.pubsub.skipSubId_", Qb, void 0);

    function Rb(a, b, c) {
        var d = Sb();
        if (d) {
            var e = d.subscribe(a, function() {
                if (!Qb || Qb != e) {
                    var d = arguments,
                        h = function() {
                            Nb[e] && b.apply(c || window, d)
                        };
                    try {
                        Pb[a] ? h() : G(h, 0)
                    } catch (k) {
                        Jb(k)
                    }
                }
            }, c);
            Nb[e] = !0;
            Ob[a] || (Ob[a] = []);
            Ob[a].push(e);
            return e
        }
        return 0
    }

    function Tb(a) {
        var b = Sb();
        b && ("number" == typeof a ? a = [a] : "string" == typeof a && (a = [parseInt(a, 10)]), A(a, function(a) {
            b.unsubscribeByKey(a);
            delete Nb[a]
        }))
    }

    function I(a, b) {
        var c = Sb();
        return c ? c.publish.apply(c, arguments) : !1
    }

    function Ub(a, b) {
        Pb[a] = !0;
        var c = Sb();
        c && c.publish.apply(c, arguments);
        Pb[a] = !1
    }

    function Vb(a) {
        Ob[a] && (a = Ob[a], A(a, function(a) {
            Nb[a] && delete Nb[a]
        }), a.length = 0)
    }

    function Wb(a) {
        var b = Sb();
        if (b)
            if (b.clear(a), a) Vb(a);
            else
                for (var c in Ob) Vb(c)
    }

    function Sb() {
        return r("yt.pubsub.instance_")
    };

    function Xb(a, b) {
        if (window.spf) {
            var c = "";
            if (a) {
                var d = a.indexOf("jsbin/"),
                    e = a.lastIndexOf(".js"),
                    f = d + 6; - 1 < d && -1 < e && e > f && (c = a.substring(f, e), c = c.replace(Yb, ""), c = c.replace(Zb, ""), c = c.replace("debug-", ""), c = c.replace("tracing-", ""))
            }
            spf.script.load(a, c, b)
        } else $b(a, b)
    }

    function $b(a, b) {
        var c = ac(a),
            d = document.getElementById(c),
            e = d && C(d, "loaded"),
            f = d && !e;
        if (e) b && b();
        else {
            if (b) {
                var e = Rb(c, b),
                    h = "" + ia(b);
                bc[h] = e
            }
            f || (d = cc(a, c, function() {
                C(d, "loaded") || (xb(d, "loaded", "true"), I(c), G(oa(Wb, c), 0))
            }))
        }
    }

    function cc(a, b, c) {
        var d = document.createElement("script");
        d.id = b;
        d.onload = function() {
            c && setTimeout(c, 0)
        };
        d.onreadystatechange = function() {
            switch (d.readyState) {
                case "loaded":
                case "complete":
                    d.onload()
            }
        };
        d.src = a;
        a = document.getElementsByTagName("head")[0] || document.body;
        a.insertBefore(d, a.firstChild);
        return d
    }

    function ac(a) {
        var b = document.createElement("a");
        wb(b, a);
        a = b.href.replace(/^[a-zA-Z]+:\/\//, "//");
        return "js-" + za(a)
    }
    var Yb = /\.vflset|-vfl[a-zA-Z0-9_+=-]+/,
        Zb = /-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/,
        bc = {};
    var dc = null;

    function ec() {
        // var a = F("BG_I", null),
            // b = F("BG_IU", null),
            // c = F("BG_P");
        // b ? Xb(b, function() {
            // dc = new botguard.bg(c)
        // }) : a && (eval(a), dc = new botguard.bg(c))
    }

    function fc() {
        return null != dc
    }

    function gc() {
        return dc ? dc.invoke() : null
    };

    function hc(a) {
        if (a.classList) return a.classList;
        a = a.className;
        return u(a) && a.match(/\S+/g) || []
    }

    function ic(a, b) {
        return a.classList ? a.classList.contains(b) : Ha(hc(a), b)
    }

    function jc(a, b) {
        a.classList ? a.classList.add(b) : ic(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
    }

    function kc(a, b) {
        a.classList ? a.classList.remove(b) : ic(a, b) && (a.className = Ca(hc(a), function(a) {
            return a != b
        }).join(" "))
    }

    function lc(a, b, c) {
        c ? jc(a, b) : kc(a, b)
    };

    function mc(a, b) {
        this.x = p(a) ? a : 0;
        this.y = p(b) ? b : 0
    }
    mc.prototype.clone = function() {
        return new mc(this.x, this.y)
    };
    mc.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    mc.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };

    function nc(a, b) {
        this.width = a;
        this.height = b
    }
    nc.prototype.clone = function() {
        return new nc(this.width, this.height)
    };
    nc.prototype.isEmpty = function() {
        return !(this.width * this.height)
    };
    nc.prototype.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    nc.prototype.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var oc;
    t: {
        var pc = m.navigator;
        if (pc) {
            var qc = pc.userAgent;
            if (qc) {
                oc = qc;
                break t
            }
        }
        oc = ""
    }

    function J(a) {
        return -1 != oc.indexOf(a)
    };

    function rc() {
        return J("Opera") || J("OPR")
    }

    function sc() {
        return J("Edge") || J("Trident") || J("MSIE")
    }

    function tc() {
        return (J("Chrome") || J("CriOS")) && !rc() && !sc()
    };

    function uc() {
        return J("Edge")
    };

    function vc() {
        return J("iPhone") && !J("iPod") && !J("iPad")
    };
    var wc = rc(),
        K = sc(),
        xc = J("Gecko") && !(-1 != oc.toLowerCase().indexOf("webkit") && !uc()) && !(J("Trident") || J("MSIE")) && !uc(),
        yc = -1 != oc.toLowerCase().indexOf("webkit") && !uc(),
        zc = J("Macintosh"),
        Ac = J("Windows");

    function Bc() {
        var a = oc;
        if (xc) return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (K && uc()) return /Edge\/([\d\.]+)/.exec(a);
        if (K) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (yc) return /WebKit\/(\S+)/.exec(a)
    }

    function Cc() {
        var a = m.document;
        return a ? a.documentMode : void 0
    }
    var Dc = function() {
            if (wc && m.opera) {
                var a = m.opera.version;
                return ga(a) ? a() : a
            }
            var a = "",
                b = Bc();
            b && (a = b ? b[1] : "");
            return K && !uc() && (b = Cc(), b > parseFloat(a)) ? String(b) : a
        }(),
        Ec = {};

    function Fc(a) {
        return Ec[a] || (Ec[a] = 0 <= xa(Dc, a))
    }

    function Gc(a) {
        return K && Hc >= a
    }
    var Ic = m.document,
        Jc = Cc(),
        Hc = !Ic || !K || !Jc && uc() ? void 0 : Jc || ("CSS1Compat" == Ic.compatMode ? parseInt(Dc, 10) : 5);
    !xc && !K || K && Gc(9) || xc && Fc("1.9.1");
    K && Fc("9");

    function Kc(a) {
        return a ? new Lc(Mc(a)) : qa || (qa = new Lc)
    }

    function Nc(a) {
        return u(a) ? document.getElementById(a) : a
    }

    function Oc(a) {
        var b = document;
        return u(a) ? b.getElementById(a) : a
    }

    function Pc(a) {
        var b = document;
        return b.querySelectorAll && b.querySelector ? b.querySelectorAll("." + a) : Qc(a, void 0)
    }

    function Qc(a, b) {
        var c, d, e, f;
        c = document;
        c = b || c;
        if (c.querySelectorAll && c.querySelector && a) return c.querySelectorAll("" + (a ? "." + a : ""));
        if (a && c.getElementsByClassName) {
            var h = c.getElementsByClassName(a);
            return h
        }
        h = c.getElementsByTagName("*");
        if (a) {
            f = {};
            for (d = e = 0; c = h[d]; d++) {
                var k = c.className;
                "function" == typeof k.split && Ha(k.split(/\s+/), a) && (f[e++] = c)
            }
            f.length = e;
            return f
        }
        return h
    }

    function Rc(a) {
        return "CSS1Compat" == a.compatMode
    }

    function Sc(a) {
        for (var b; b = a.firstChild;) a.removeChild(b)
    }

    function Tc(a) {
        if (!a) return null;
        if (a.firstChild) return a.firstChild;
        for (; a && !a.nextSibling;) a = a.parentNode;
        return a ? a.nextSibling : null
    }

    function Uc(a) {
        if (!a) return null;
        if (!a.previousSibling) return a.parentNode;
        for (a = a.previousSibling; a && a.lastChild;) a = a.lastChild;
        return a
    }

    function Mc(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }

    function Vc(a) {
        var b = Wc.rd;
        return b ? Xc(a, function(a) {
            return !b || u(a.className) && Ha(a.className.split(/\s+/), b)
        }, !0, void 0) : null
    }

    function Xc(a, b, c, d) {
        c || (a = a.parentNode);
        c = null == d;
        for (var e = 0; a && (c || e <= d);) {
            if (b(a)) return a;
            a = a.parentNode;
            e++
        }
        return null
    }

    function Lc(a) {
        this.j = a || m.document || document
    }
    Lc.prototype.createElement = function(a) {
        return this.j.createElement(a)
    };
    Lc.prototype.appendChild = function(a, b) {
        a.appendChild(b)
    };
    Lc.prototype.contains = function(a, b) {
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    var Yc = yc ? "webkit" : xc ? "moz" : K ? "ms" : wc ? "o" : "",
        Zc = r("yt.dom.getNextId_");
    if (!Zc) {
        Zc = function() {
            return ++$c
        };
        q("yt.dom.getNextId_", Zc, void 0);
        var $c = 0
    }

    function ad() {
        var a = document,
            b;
        Da(["fullscreenElement", "fullScreenElement"], function(c) {
            c in a ? b = a[c] : (c = Yc + c.charAt(0).toUpperCase() + c.substr(1), b = c in a ? a[c] : void 0);
            return !!b
        });
        return b
    };

    function bd(a) {
        if (a = a || window.event) {
            for (var b in a) b in cd || (this[b] = a[b]);
            this.Ob = a;
            (b = a.target || a.srcElement) && 3 == b.nodeType && (b = b.parentNode);
            this.target = b;
            if (b = a.relatedTarget) try {
                b = b.nodeName ? b : null
            } catch (c) {
                b = null
            } else "mouseover" == this.type ? b = a.fromElement : "mouseout" == this.type && (b = a.toElement);
            this.relatedTarget = b;
            this.clientX = void 0 != a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 != a.clientY ? a.clientY : a.pageY;
            this.keyCode = a.keyCode ? a.keyCode : a.which;
            this.charCode = a.charCode || ("keypress" ==
                this.type ? this.keyCode : 0);
            this.altKey = a.altKey;
            this.ctrlKey = a.ctrlKey;
            this.shiftKey = a.shiftKey;
            "MozMousePixelScroll" == this.type ? (this.wheelDeltaX = a.axis == a.HORIZONTAL_AXIS ? a.detail : 0, this.wheelDeltaY = a.axis == a.HORIZONTAL_AXIS ? 0 : a.detail) : window.opera ? (this.wheelDeltaX = 0, this.wheelDeltaY = a.detail) : 0 == a.wheelDelta % 120 ? "WebkitTransform" in document.documentElement.style ? window.chrome && 0 == navigator.platform.indexOf("Mac") ? (this.wheelDeltaX = a.wheelDeltaX / -30, this.wheelDeltaY = a.wheelDeltaY / -30) : (this.wheelDeltaX =
                a.wheelDeltaX / -1.2, this.wheelDeltaY = a.wheelDeltaY / -1.2) : (this.wheelDeltaX = 0, this.wheelDeltaY = a.wheelDelta / -1.6) : (this.wheelDeltaX = a.wheelDeltaX / -3, this.wheelDeltaY = a.wheelDeltaY / -3)
        }
    }
    g = bd.prototype;
    g.Ob = null;
    g.type = "";
    g.target = null;
    g.relatedTarget = null;
    g.currentTarget = null;
    g.data = null;
    g.source = null;
    g.state = null;
    g.keyCode = 0;
    g.charCode = 0;
    g.altKey = !1;
    g.ctrlKey = !1;
    g.shiftKey = !1;
    g.clientX = 0;
    g.clientY = 0;
    g.wheelDeltaX = 0;
    g.wheelDeltaY = 0;
    g.preventDefault = function() {
        this.Ob.returnValue = !1;
        this.Ob.preventDefault && this.Ob.preventDefault()
    };
    var cd = {
        stopImmediatePropagation: 1,
        stopPropagation: 1,
        preventMouseEvent: 1,
        preventManipulation: 1,
        preventDefault: 1,
        layerX: 1,
        layerY: 1,
        scale: 1,
        rotation: 1
    };
    var cb = r("yt.events.listeners_") || {};
    q("yt.events.listeners_", cb, void 0);
    var dd = r("yt.events.counter_") || {
        count: 0
    };
    q("yt.events.counter_", dd, void 0);

    function ed(a, b, c, d) {
        return bb(function(e) {
            return e[0] == a && e[1] == b && e[2] == c && e[4] == !!d
        })
    }

    function L(a, b, c, d) {
        if (!a || !a.addEventListener && !a.attachEvent) return "";
        d = !!d;
        var e = ed(a, b, c, d);
        if (e) return e;
        var e = ++dd.count + "",
            f = !("mouseenter" != b && "mouseleave" != b || !a.addEventListener || "onmouseenter" in document),
            h;
        h = f ? function(d) {
            d = new bd(d);
            if (!Xc(d.relatedTarget, function(b) {
                    return b == a
                }, !0)) return d.currentTarget = a, d.type = b, c.call(a, d)
        } : function(b) {
            b = new bd(b);
            b.currentTarget = a;
            return c.call(a, b)
        };
        h = Hb(h);
        cb[e] = [a, b, c, h, d];
        a.addEventListener ? "mouseenter" == b && f ? a.addEventListener("mouseover",
            h, d) : "mouseleave" == b && f ? a.addEventListener("mouseout", h, d) : "mousewheel" == b && "MozBoxSizing" in document.documentElement.style ? a.addEventListener("MozMousePixelScroll", h, d) : a.addEventListener(b, h, d) : a.attachEvent("on" + b, h);
        return e
    }

    function fd(a) {
        a && ("string" == typeof a && (a = [a]), A(a, function(a) {
            if (a in cb) {
                var c = cb[a],
                    d = c[0],
                    e = c[1],
                    f = c[3],
                    c = c[4];
                d.removeEventListener ? d.removeEventListener(e, f, c) : d.detachEvent && d.detachEvent("on" + e, f);
                delete cb[a]
            }
        }))
    };

    function gd(a) {
        this.j = a
    }
    var hd = /\s*;\s*/;
    g = gd.prototype;
    g.isEnabled = function() {
        return navigator.cookieEnabled
    };
    g.set = function(a, b, c, d, e, f) {
        if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
        p(c) || (c = -1);
        e = e ? ";domain=" + e : "";
        d = d ? ";path=" + d : "";
        f = f ? ";secure" : "";
        c = 0 > c ? "" : 0 == c ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(w() + 1E3 * c)).toUTCString();
        this.j.cookie = a + "=" + b + e + d + c + f
    };
    g.get = function(a, b) {
        for (var c = a + "=", d = (this.j.cookie || "").split(hd), e = 0, f; f = d[e]; e++) {
            if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
            if (f == a) return ""
        }
        return b
    };
    g.remove = function(a, b, c) {
        var d = p(this.get(a));
        this.set(a, "", 0, b, c);
        return d
    };
    g.xa = function() {
        return id(this).keys
    };
    g.ba = function() {
        return id(this).values
    };
    g.isEmpty = function() {
        return !this.j.cookie
    };
    g.$ = function() {
        return this.j.cookie ? (this.j.cookie || "").split(hd).length : 0
    };
    g.vb = function(a) {
        for (var b = id(this).values, c = 0; c < b.length; c++)
            if (b[c] == a) return !0;
        return !1
    };
    g.clear = function() {
        for (var a = id(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b])
    };

    function id(a) {
        a = (a.j.cookie || "").split(hd);
        for (var b = [], c = [], d, e, f = 0; e = a[f]; f++) d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    }
    var jd = new gd(document);
    jd.k = 3950;

    function kd(a, b, c) {
        jd.set("" + a, b, c, "/", "youtube.com")
    }

    function ld(a, b) {
        return jd.get("" + a, b)
    };

    function md(a, b) {
        a = !!a;
        q("_lactCookie", a, window);
        if (null == r("_lact", window)) {
            if (F("EXP_LACT_TEMPDATA")) {
                var c = parseInt(F("LAST_ACTIVITY_TIME"), 10),
                    c = isFinite(c) ? c : -1;
                q("_lact", c, window); - 1 == c && nd()
            } else a && b ? (c = ld("ACTIVITY", "-1"), q("_lact", parseInt(c, 10), window)) : (q("_lact", -1, window), nd());
            L(document, "keydown", nd);
            L(document, "keyup", nd);
            L(document, "mousedown", nd);
            L(document, "mouseup", nd)
        }
    }

    function nd() {
        var a = r("_lact", window);
        null == a && (md(), a = r("_lact", window));
        var b = w();
        q("_lact", b, window);
        F("EXP_LACT_TEMPDATA") || r("_lactCookie", window) && 1E3 <= b - a && kd("ACTIVITY", "" + b, -1);
        I("USER_ACTIVE")
    }

    function od() {
        var a = r("_lact", window);
        return null == a ? -1 : Math.max(w() - a, 0)
    };
    var pd = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;

    function qd(a) {
        if (rd) {
            rd = !1;
            var b = m.location;
            if (b) {
                var c = b.href;
                if (c && (c = sd(c)) && c != b.hostname) throw rd = !0, Error();
            }
        }
        return a.match(pd)
    }
    var rd = yc;

    function sd(a) {
        return (a = qd(a)[3] || null) ? decodeURI(a) : a
    }

    function td(a, b) {
        for (var c = a.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].indexOf("="),
                f = null,
                h = null;
            0 <= e ? (f = c[d].substring(0, e), h = c[d].substring(e + 1)) : f = c[d];
            b(f, h ? ta(h) : "")
        }
    }

    function ud(a) {
        if (a[1]) {
            var b = a[0],
                c = b.indexOf("#");
            0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
            c = b.indexOf("?");
            0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0)
        }
        return a.join("")
    }

    function vd(a, b, c) {
        if (da(b))
            for (var d = 0; d < b.length; d++) vd(a, String(b[d]), c);
        else null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
    }

    function wd(a, b, c) {
        Math.max(b.length - (c || 0), 0);
        for (c = c || 0; c < b.length; c += 2) vd(b[c], b[c + 1], a);
        return a
    }

    function xd(a, b) {
        for (var c in b) vd(c, b[c], a);
        return a
    }

    function yd(a) {
        a = xd([], a);
        a[0] = "";
        return a.join("")
    }

    function zd(a, b) {
        return ud(2 == arguments.length ? wd([a], arguments[1], 0) : wd([a], arguments, 1))
    }

    function Ad(a, b) {
        return ud(xd([a], b))
    };

    function Bd(a) {
        "?" == a.charAt(0) && (a = a.substr(1));
        a = a.split("&");
        for (var b = {}, c = 0, d = a.length; c < d; c++) {
            var e = a[c].split("=");
            if (1 == e.length && e[0] || 2 == e.length) {
                var f = ta(e[0] || ""),
                    e = ta(e[1] || "");
                f in b ? da(b[f]) ? Pa(b[f], e) : b[f] = [b[f], e] : b[f] = e
            }
        }
        return b
    }
    var Cd = sd;

    function Dd(a, b) {
        var c = a.split("#", 2);
        a = c[0];
        var c = 1 < c.length ? "#" + c[1] : "",
            d = a.split("?", 2);
        a = d[0];
        var d = Bd(d[1] || ""),
            e;
        for (e in b) d[e] = b[e];
        return Ad(a, d) + c
    }

    function Ed(a) {
        a = Cd(a);
        a = null === a ? null : a.split(".").reverse();
        return (null === a ? !1 : "com" == a[0] && a[1].match(/^youtube(?:-nocookie)?$/) ? !0 : !1) || (null === a ? !1 : "google" == a[1] ? !0 : "google" == a[2] ? "au" == a[0] && "com" == a[1] ? !0 : "uk" == a[0] && "co" == a[1] ? !0 : !1 : !1)
    };

    function Fd(a, b) {
        var c = sd(a);
        if (c == sd(window.location.href) || !c && 0 == a.lastIndexOf("/", 0)) {
            var d = qd(a),
                c = d[5],
                e = d[6],
                d = d[7],
                f = "";
            c && (f += c);
            e && (f += "?" + e);
            d && (f += "#" + d);
            c = f;
            e = c.indexOf("#");
            if (c = 0 > e ? c : c.substr(0, e)) c = F("SMALLER_SESSION_TEMPDATA_NAME") ? "ST-" + za(c).toString(36) : "s_tempdata-" + za(c), e = b ? yd(b) : "", kd(c, e, 5)
        }
    };

    function Gd(a, b, c) {
        var d = F("EVENT_ID");
        d && (b || (b = {}), b.ei || (b.ei = d));
        b && Fd(a, b);
        if (c) return !1;
        (window.ytspf || {}).enabled ? spf.navigate(a) : (b = window.location, a = Ad(a, {}) + "", a = a instanceof mb ? a : qb(a), b.href = ob(a));
        return !0
    };

    function Hd(a, b) {
        return vb(b, null)
    };
    var Id = "StopIteration" in m ? m.StopIteration : Error("StopIteration");

    function Jd() {}
    Jd.prototype.next = function() {
        throw Id;
    };
    Jd.prototype.ta = function() {
        return this
    };

    function Kd(a) {
        if (a instanceof Jd) return a;
        if ("function" == typeof a.ta) return a.ta(!1);
        if (ea(a)) {
            var b = 0,
                c = new Jd;
            c.next = function() {
                for (;;) {
                    if (b >= a.length) throw Id;
                    if (b in a) return a[b++];
                    b++
                }
            };
            return c
        }
        throw Error("Not implemented");
    }

    function Ld(a, b, c) {
        if (ea(a)) try {
            A(a, b, c)
        } catch (d) {
            if (d !== Id) throw d;
        } else {
            a = Kd(a);
            try {
                for (;;) b.call(c, a.next(), void 0, a)
            } catch (e) {
                if (e !== Id) throw e;
            }
        }
    }

    function Md(a) {
        if (ea(a)) return Oa(a);
        a = Kd(a);
        var b = [];
        Ld(a, function(a) {
            b.push(a)
        });
        return b
    };

    function Nd(a, b) {
        this.k = {};
        this.j = [];
        this.Ga = this.o = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else if (a) {
            a instanceof Nd ? (c = a.xa(), d = a.ba()) : (c = ab(a), d = $a(a));
            for (var e = 0; e < c.length; e++) this.set(c[e], d[e])
        }
    }
    g = Nd.prototype;
    g.$ = function() {
        return this.o
    };
    g.ba = function() {
        Od(this);
        for (var a = [], b = 0; b < this.j.length; b++) a.push(this.k[this.j[b]]);
        return a
    };
    g.xa = function() {
        Od(this);
        return this.j.concat()
    };
    g.vb = function(a) {
        for (var b = 0; b < this.j.length; b++) {
            var c = this.j[b];
            if (Pd(this.k, c) && this.k[c] == a) return !0
        }
        return !1
    };
    g.equals = function(a, b) {
        if (this === a) return !0;
        if (this.o != a.$()) return !1;
        var c = b || Qd;
        Od(this);
        for (var d, e = 0; d = this.j[e]; e++)
            if (!c(this.get(d), a.get(d))) return !1;
        return !0
    };

    function Qd(a, b) {
        return a === b
    }
    g.isEmpty = function() {
        return 0 == this.o
    };
    g.clear = function() {
        this.k = {};
        this.Ga = this.o = this.j.length = 0
    };
    g.remove = function(a) {
        return Pd(this.k, a) ? (delete this.k[a], this.o--, this.Ga++, this.j.length > 2 * this.o && Od(this), !0) : !1
    };

    function Od(a) {
        if (a.o != a.j.length) {
            for (var b = 0, c = 0; b < a.j.length;) {
                var d = a.j[b];
                Pd(a.k, d) && (a.j[c++] = d);
                b++
            }
            a.j.length = c
        }
        if (a.o != a.j.length) {
            for (var e = {}, c = b = 0; b < a.j.length;) d = a.j[b], Pd(e, d) || (a.j[c++] = d, e[d] = 1), b++;
            a.j.length = c
        }
    }
    g.get = function(a, b) {
        return Pd(this.k, a) ? this.k[a] : b
    };
    g.set = function(a, b) {
        Pd(this.k, a) || (this.o++, this.j.push(a), this.Ga++);
        this.k[a] = b
    };
    g.forEach = function(a, b) {
        for (var c = this.xa(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    g.clone = function() {
        return new Nd(this)
    };
    g.ta = function(a) {
        Od(this);
        var b = 0,
            c = this.j,
            d = this.k,
            e = this.Ga,
            f = this,
            h = new Jd;
        h.next = function() {
            for (;;) {
                if (e != f.Ga) throw Error("The map has changed since the iterator was created");
                if (b >= c.length) throw Id;
                var h = c[b++];
                return a ? h : d[h]
            }
        };
        return h
    };

    function Pd(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };

    function Rd(a) {
        return "function" == typeof a.$ ? a.$() : ea(a) || u(a) ? a.length : Xa(a)
    }

    function Sd(a) {
        if ("function" == typeof a.ba) return a.ba();
        if (u(a)) return a.split("");
        if (ea(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return $a(a)
    }

    function Td(a) {
        if ("function" == typeof a.xa) return a.xa();
        if ("function" != typeof a.ba) {
            if (ea(a) || u(a)) {
                var b = [];
                a = a.length;
                for (var c = 0; c < a; c++) b.push(c);
                return b
            }
            return ab(a)
        }
    }

    function Ud(a, b) {
        if ("function" == typeof a.forEach) a.forEach(b, void 0);
        else if (ea(a) || u(a)) A(a, b, void 0);
        else
            for (var c = Td(a), d = Sd(a), e = d.length, f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a)
    }

    function Vd(a, b) {
        if ("function" == typeof a.every) return a.every(b, void 0);
        if (ea(a) || u(a)) return Ea(a, b, void 0);
        for (var c = Td(a), d = Sd(a), e = d.length, f = 0; f < e; f++)
            if (!b.call(void 0, d[f], c && c[f], a)) return !1;
        return !0
    };

    function Wd(a) {
        this.j = new Nd;
        if (a) {
            a = Sd(a);
            for (var b = a.length, c = 0; c < b; c++) this.add(a[c])
        }
    }

    function Xd(a) {
        var b = typeof a;
        return "object" == b && a || "function" == b ? "o" + ia(a) : b.substr(0, 1) + a
    }
    g = Wd.prototype;
    g.$ = function() {
        return this.j.$()
    };
    g.add = function(a) {
        this.j.set(Xd(a), a)
    };
    g.removeAll = function(a) {
        a = Sd(a);
        for (var b = a.length, c = 0; c < b; c++) this.remove(a[c])
    };
    g.remove = function(a) {
        return this.j.remove(Xd(a))
    };
    g.clear = function() {
        this.j.clear()
    };
    g.isEmpty = function() {
        return this.j.isEmpty()
    };
    g.contains = function(a) {
        a = Xd(a);
        return Pd(this.j.k, a)
    };
    g.ba = function() {
        return this.j.ba()
    };
    g.clone = function() {
        return new Wd(this)
    };
    g.equals = function(a) {
        return this.$() == Rd(a) && Yd(this, a)
    };

    function Yd(a, b) {
        var c = Rd(b);
        if (a.$() > c) return !1;
        !(b instanceof Wd) && 5 < c && (b = new Wd(b));
        return Vd(a, function(a) {
            var c = b;
            return "function" == typeof c.contains ? c.contains(a) : "function" == typeof c.vb ? c.vb(a) : ea(c) || u(c) ? Ha(c, a) : Za(c, a)
        })
    }
    g.ta = function() {
        return this.j.ta(!1)
    };

    function Zd() {};

    function $d(a) {
        m.setTimeout(function() {
            throw a;
        }, 0)
    }
    var ae;

    function be() {
        var a = m.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !J("Presto") && (a = function() {
            var a = document.createElement("iframe");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow,
                a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(),
                d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
                a = v(function(a) {
                    if (("*" == d || a.origin == d) && a.data ==
                        c) this.port1.onmessage()
                }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    b.postMessage(c, d)
                }
            }
        });
        if ("undefined" !== typeof a && !sc()) {
            var b = new a,
                c = {},
                d = c;
            b.port1.onmessage = function() {
                if (p(c.next)) {
                    c = c.next;
                    var a = c.xc;
                    c.xc = null;
                    a()
                }
            };
            return function(a) {
                d.next = {
                    xc: a
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange" in document.createElement("script") ? function(a) {
            var b = document.createElement("script");
            b.onreadystatechange =
                function() {
                    b.onreadystatechange = null;
                    b.parentNode.removeChild(b);
                    b = null;
                    a();
                    a = null
                };
            document.documentElement.appendChild(b)
        } : function(a) {
            m.setTimeout(a, 0)
        }
    };

    function ce(a, b, c) {
        this.B = c;
        this.o = a;
        this.A = b;
        this.k = 0;
        this.j = null
    }
    ce.prototype.get = function() {
        var a;
        0 < this.k ? (this.k--, a = this.j, this.j = a.next, a.next = null) : a = this.o();
        return a
    };
    ce.prototype.put = function(a) {
        this.A(a);
        this.k < this.B && (this.k++, a.next = this.j, this.j = a)
    };

    function de() {
        this.k = this.j = null
    }
    var fe = new ce(function() {
        return new ee
    }, function(a) {
        a.reset()
    }, 100);
    de.prototype.add = function(a, b) {
        var c = fe.get();
        c.set(a, b);
        this.k ? this.k.next = c : this.j = c;
        this.k = c
    };
    de.prototype.remove = function() {
        var a = null;
        this.j && (a = this.j, this.j = this.j.next, this.j || (this.k = null), a.next = null);
        return a
    };

    function ee() {
        this.next = this.scope = this.j = null
    }
    ee.prototype.set = function(a, b) {
        this.j = a;
        this.scope = b;
        this.next = null
    };
    ee.prototype.reset = function() {
        this.next = this.scope = this.j = null
    };

    function ge(a, b) {
        he || ie();
        je || (he(), je = !0);
        ke.add(a, b)
    }
    var he;

    function ie() {
        if (m.Promise && m.Promise.resolve) {
            var a = m.Promise.resolve();
            he = function() {
                a.then(le)
            }
        } else he = function() {
            var a = le;
            !ga(m.setImmediate) || m.Window && m.Window.prototype && m.Window.prototype.setImmediate == m.setImmediate ? (ae || (ae = be()), ae(a)) : m.setImmediate(a)
        }
    }
    var je = !1,
        ke = new de;

    function le() {
        for (var a = null; a = ke.remove();) {
            try {
                a.j.call(a.scope)
            } catch (b) {
                $d(b)
            }
            fe.put(a)
        }
        je = !1
    };

    function me(a, b) {
        this.k = 0;
        this.C = void 0;
        this.j = this.o = null;
        this.B = this.A = !1;
        if (a == ne) oe(this, 2, b);
        else try {
            var c = this;
            a.call(b, function(a) {
                oe(c, 2, a)
            }, function(a) {
                oe(c, 3, a)
            })
        } catch (d) {
            oe(this, 3, d)
        }
    }

    function ne() {}
    me.prototype.then = function(a, b, c) {
        return pe(this, ga(a) ? a : null, ga(b) ? b : null, c)
    };
    me.prototype.then = me.prototype.then;
    me.prototype.$goog_Thenable = !0;
    me.prototype.cancel = function(a) {
        0 == this.k && ge(function() {
            var b = new qe(a);
            re(this, b)
        }, this)
    };

    function re(a, b) {
        if (0 == a.k)
            if (a.o) {
                var c = a.o;
                if (c.j) {
                    for (var d = 0, e = -1, f = 0, h; h = c.j[f]; f++)
                        if (h = h.La)
                            if (d++, h == a && (e = f), 0 <= e && 1 < d) break;
                    0 <= e && (0 == c.k && 1 == d ? re(c, b) : (d = c.j.splice(e, 1)[0], se(c, d, 3, b)))
                }
                a.o = null
            } else oe(a, 3, b)
    }

    function te(a, b) {
        a.j && a.j.length || 2 != a.k && 3 != a.k || ue(a);
        a.j || (a.j = []);
        a.j.push(b)
    }

    function pe(a, b, c, d) {
        var e = {
            La: null,
            Kc: null,
            Pc: null
        };
        e.La = new me(function(a, h) {
            e.Kc = b ? function(c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (n) {
                    h(n)
                }
            } : a;
            e.Pc = c ? function(b) {
                try {
                    var e = c.call(d, b);
                    !p(e) && b instanceof qe ? h(b) : a(e)
                } catch (n) {
                    h(n)
                }
            } : h
        });
        e.La.o = a;
        te(a, e);
        return e.La
    }
    me.prototype.F = function(a) {
        this.k = 0;
        oe(this, 2, a)
    };
    me.prototype.H = function(a) {
        this.k = 0;
        oe(this, 3, a)
    };

    function oe(a, b, c) {
        if (0 == a.k) {
            if (a == c) b = 3, c = new TypeError("Promise cannot resolve to itself");
            else {
                var d;
                if (c) try {
                    d = !!c.$goog_Thenable
                } catch (e) {
                    d = !1
                } else d = !1;
                if (d) {
                    a.k = 1;
                    c.then(a.F, a.H, a);
                    return
                }
                if (ha(c)) try {
                    var f = c.then;
                    if (ga(f)) {
                        ve(a, c, f);
                        return
                    }
                } catch (h) {
                    b = 3, c = h
                }
            }
            a.C = c;
            a.k = b;
            a.o = null;
            ue(a);
            3 != b || c instanceof qe || we(a, c)
        }
    }

    function ve(a, b, c) {
        function d(b) {
            f || (f = !0, a.H(b))
        }

        function e(b) {
            f || (f = !0, a.F(b))
        }
        a.k = 1;
        var f = !1;
        try {
            c.call(b, e, d)
        } catch (h) {
            d(h)
        }
    }

    function ue(a) {
        a.A || (a.A = !0, ge(a.L, a))
    }
    me.prototype.L = function() {
        for (; this.j && this.j.length;) {
            var a = this.j;
            this.j = null;
            for (var b = 0; b < a.length; b++) se(this, a[b], this.k, this.C)
        }
        this.A = !1
    };

    function se(a, b, c, d) {
        b.La && (b.La.o = null);
        if (2 == c) b.Kc(d);
        else {
            if (b.La)
                for (; a && a.B; a = a.o) a.B = !1;
            b.Pc(d)
        }
    }

    function we(a, b) {
        a.B = !0;
        ge(function() {
            a.B && xe.call(null, b)
        })
    }
    var xe = $d;

    function qe(a) {
        pa.call(this, a)
    }
    y(qe, pa);
    qe.prototype.name = "cancel";

    function ye(a) {
        this.j = a;
        a.then(v(function() {}, this))
    }

    function ze(a, b, c, d) {
        for (var e = Array(arguments.length - 3), f = 3; f < arguments.length; f++) e[f - 3] = arguments[f];
        f = Ae(a, b, c).then(function(a) {
            return a.apply(this, e)
        });
        return new ye(f)
    }
    var Be = {};

    function Ae(a, b, c) {
        var d = "https://www.gstatic.com/feedback/js/help/" + (a && "prod" != a && "canary" != a ? "nonprod" : "prod") + "/" + b;
        if (a = Be[c]) return a;
        a = (a = r(c)) ? new me(ne, a) : (new me(function(a, b) {
            var c = document.createElement("script");
            c.async = !0;
            c.src = d;
            c.onload = c.onreadystatechange = function() {
                c.readyState && "loaded" != c.readyState && "complete" != c.readyState || a()
            };
            c.onerror = b;
            (document.head || document.getElementsByTagName("head")[0]).appendChild(c)
        })).then(function() {
            var a = r(c);
            if (!a) throw Error("Failed to load " +
                c + " from " + d);
            return a
        });
        return Be[c] = a
    }

    function Ce(a, b, c) {
        a.j.then(function(a) {
            var e = a[b];
            if (!e) throw Error("Method not found: " + b);
            return e.apply(a, c)
        })
    };

    function De(a) {
        this.j = a
    }

    function Ee(a, b) {
        var c = b || {},
            c = ze("prod", "service/lazy.min.js", "help.service.Lazy.create", a, {
                apiKey: c.of || c.apiKey,
                environment: c.qf || c.environment,
                helpCenterPath: c.sf || c.helpCenterPath,
                locale: c.locale || c.locale,
                productData: c.vf || c.productData,
                receiverUri: c.wf || c.receiverUri,
                theme: c.theme || c.theme,
                window: c.window || c.window
            });
        return new De(c)
    }
    De.prototype.k = function(a) {
        Ce(this.j, "startFeedback", arguments)
    };
    De.prototype.o = function(a) {
        Ce(this.j, "startHelp", arguments)
    };
    var Fe = !1;

    function Ge(a) {
        if (a = a.match(/[\d]+/g)) a.length = 3, a.join(".")
    }
    if (navigator.plugins && navigator.plugins.length) {
        var He = navigator.plugins["Shockwave Flash"];
        He && (Fe = !0, He.description && Ge(He.description));
        navigator.plugins["Shockwave Flash 2.0"] && (Fe = !0)
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var Ie = navigator.mimeTypes["application/x-shockwave-flash"];
        (Fe = Ie && Ie.enabledPlugin) && Ge(Ie.enabledPlugin.description)
    } else try {
        var Je = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
            Fe = !0;
        Ge(Je.GetVariable("$version"))
    } catch (Ke) {
        try {
            Je = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),
                Fe = !0
        } catch (Le) {
            try {
                Je = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), Fe = !0, Ge(Je.GetVariable("$version"))
            } catch (Me) {}
        }
    };
    var Ne = J("Firefox"),
        Oe = vc() || J("iPod"),
        Pe = J("iPad"),
        Qe = J("Android") && !(tc() || J("Firefox") || rc() || J("Silk")),
        Re = tc(),
        Se = J("Safari") && !(tc() || J("Coast") || rc() || sc() || J("Silk") || J("Android")) && !(vc() || J("iPad") || J("iPod"));

    function Te(a) {
        return (a = a.exec(oc)) ? a[1] : ""
    }(function() {
        if (Ne) return Te(/Firefox\/([0-9.]+)/);
        if (K || wc) return Dc;
        if (Re) return Te(/Chrome\/([0-9.]+)/);
        if (Se && !(vc() || J("iPad") || J("iPod"))) return Te(/Version\/([0-9.]+)/);
        if (Oe || Pe) {
            var a;
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(oc)) return a[1] + "." + a[2]
        } else if (Qe) return (a = Te(/Android\s+([0-9.]+)/)) ? a : Te(/Version\/([0-9.]+)/);
        return ""
    })();

    function Ue() {
        this.o = this.k = this.j = 0;
        this.B = "";
        var a = r("window.navigator.plugins"),
            b = r("window.navigator.mimeTypes"),
            a = a && a["Shockwave Flash"],
            b = b && b["application/x-shockwave-flash"],
            b = a && b && b.enabledPlugin && a.description || "";
        if (a = b) {
            var c = a.indexOf("Shockwave Flash");
            0 <= c && (a = a.substr(c + 15));
            for (var c = a.split(" "), d = "", a = "", e = 0, f = c.length; e < f; e++)
                if (d)
                    if (a) break;
                    else a = c[e];
            else d = c[e];
            d = d.split(".");
            c = parseInt(d[0], 10) || 0;
            d = parseInt(d[1], 10) || 0;
            e = 0;
            if ("r" == a.charAt(0) || "d" == a.charAt(0)) e = parseInt(a.substr(1),
                10) || 0;
            a = [c, d, e]
        } else a = [0, 0, 0];
        this.B = b;
        b = a;
        this.j = b[0];
        this.k = b[1];
        this.o = b[2];
        if (0 >= this.j) {
            var h, k, l, n;
            if (Lb) try {
                h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
            } catch (x) {
                h = null
            } else l = document.body, n = document.createElement("object"), n.setAttribute("type", "application/x-shockwave-flash"), h = l.appendChild(n);
            if (h && "GetVariable" in h) try {
                k = h.GetVariable("$version")
            } catch (Z) {
                k = ""
            }
            l && n && l.removeChild(n);
            (h = k || "") ? (h = h.split(" ")[1].split(","), h = [parseInt(h[0], 10) || 0, parseInt(h[1], 10) || 0, parseInt(h[2],
                10) || 0]) : h = [0, 0, 0];
            this.j = h[0];
            this.k = h[1];
            this.o = h[2]
        }
    }
    ba(Ue);
    Ue.prototype.getVersion = function() {
        return [this.j, this.k, this.o]
    };

    function Ve(a, b, c, d) {
        b = "string" == typeof b ? b.split(".") : [b, c, d];
        b[0] = parseInt(b[0], 10) || 0;
        b[1] = parseInt(b[1], 10) || 0;
        b[2] = parseInt(b[2], 10) || 0;
        return a.j > b[0] || a.j == b[0] && a.k > b[1] || a.j == b[0] && a.k == b[1] && a.o >= b[2]
    }

    function We(a) {
        return -1 < a.B.indexOf("Gnash") && -1 == a.B.indexOf("AVM2") || 9 == a.j && 1 == a.k || 9 == a.j && 0 == a.k && 1 == a.o ? !1 : 9 <= a.j
    }

    function Xe(a) {
        return Ac ? !Ve(a, 11, 2) : zc ? !Ve(a, 11, 3) : !We(a)
    };

    function Ye(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    }
    Ye.prototype.clone = function() {
        return new Ye(this.top, this.right, this.bottom, this.left)
    };
    Ye.prototype.contains = function(a) {
        return this && a ? a instanceof Ye ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    Ye.prototype.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    Ye.prototype.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };

    function Ze(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    }
    Ze.prototype.clone = function() {
        return new Ze(this.left, this.top, this.width, this.height)
    };
    Ze.prototype.contains = function(a) {
        return a instanceof Ze ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
    };
    Ze.prototype.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    Ze.prototype.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };

    function $e(a, b) {
        var c = Mc(a);
        return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
    }

    function af(a, b) {
        return $e(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }

    function bf(a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
        K && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }

    function cf(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    }

    function df(a) {
        var b = ef;
        if ("none" != af(a, "display")) return b(a);
        var c = a.style,
            d = c.display,
            e = c.visibility,
            f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }

    function ef(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight,
            d = yc && !b && !c;
        return p(b) && !d || !a.getBoundingClientRect ? new nc(b, c) : (a = bf(a), new nc(a.right - a.left, a.bottom - a.top))
    }

    function ff(a, b) {
        if (/^\d+px?$/.test(b)) return parseInt(b, 10);
        var c = a.style.left,
            d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = b;
        var e = a.style.pixelLeft;
        a.style.left = c;
        a.runtimeStyle.left = d;
        return e
    }

    function gf(a, b) {
        var c = a.currentStyle ? a.currentStyle[b] : null;
        return c ? ff(a, c) : 0
    }
    var hf = {
        thin: 2,
        medium: 4,
        thick: 6
    };

    function jf(a, b) {
        if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null)) return 0;
        var c = a.currentStyle ? a.currentStyle[b + "Width"] : null;
        return c in hf ? hf[c] : ff(a, c)
    };

    function kf(a, b) {
        (a = Nc(a)) && a.style && (a.style.display = b ? "" : "none", lc(a, "hid", !b))
    }

    function lf(a) {
        A(arguments, function(a) {
            kf(a, !0)
        })
    }

    function mf(a) {
        A(arguments, function(a) {
            kf(a, !1)
        })
    };
    var nf = {};

    function of(a, b) {
        var c = F("FEEDBACK_LOCALE_LANGUAGE"),
            d = F("FEEDBACK_LOCALE_EXTRAS", {});
        a ? ib(nf, a) : ib(nf, d);
        try {
            var e, f = r("yt.player.getPlayerByElement");
            (e = f ? f("player-api") : null) && e.pauseVideo && e.pauseVideo();
            var h = Ue.getInstance();
            nf.flashVersion = h.getVersion().join(".");
            e && (nf.playback_id = e.getVideoData().cpn)
        } catch (k) {}
        b && ib(nf, {
            trackingParam: b
        });
        return {
            helpCenterPath: "/youtube",
            locale: c,
            productData: nf
        }
    }

    function pf() {
        var a = F("SESSION_INDEX"),
            b = F("FEEDBACK_BUCKET_ID"),
            c = {
                abuseLink: "https://support.google.com/youtube/bin/answer.py?answer=140536",
                customZIndex: "2000000005"
            };
        a && (c.authuser = a + "");
        b && (c.bucket = b);
        return c
    }

    function qf(a, b) {
        try {
            var c = (a || "59") + "",
                d = of(b),
                e = pf();
            Ee(c, d).k(e);
            return !1
        } catch (f) {
            return !0
        }
    }

    function rf(a, b, c, d) {
        var e;
        d = (d || "59") + "";
        c = of(c, void 0);
        a = {
            context: b,
            anchor: void 0,
            enableSendFeedback: !0,
            defaultHelpArticleId: a
        };
        ib(a, pf());
        try {
            Ee(d, c).o(a), e = !1
        } catch (f) {
            e = !0
        }
        return e
    };

    function sf(a) {
        a = a || {};
        this.url = a.url || "";
        this.urlV9As2 = a.url_v9as2 || "";
        this.args = a.args || fb(tf);
        this.assets = a.assets || {};
        this.attrs = a.attrs || fb(uf);
        this.params = a.params || fb(vf);
        this.minVersion = a.min_version || "8.0.0";
        this.fallback = a.fallback || null;
        this.fallbackMessage = a.fallbackMessage || null;
        this.html5 = !!a.html5;
        this.disable = a.disable || {};
        this.loaded = !!a.loaded;
        this.messages = a.messages || {}
    }
    var tf = {
            enablejsapi: 1
        },
        uf = {},
        vf = {
            allowscriptaccess: "always",
            allowfullscreen: "true",
            bgcolor: "#000000"
        };

    function wf(a) {
        a instanceof sf || (a = new sf(a));
        return a
    }
    sf.prototype.clone = function() {
        var a = new sf,
            b;
        for (b in this) {
            var c = this[b];
            "object" == ca(c) ? a[b] = fb(c) : a[b] = c
        }
        return a
    };

    function xf(a) {
        xf[" "](a);
        return a
    }
    xf[" "] = t;
    var yf = !K || Gc(9),
        zf = K && !Fc("9");
    !yc || Fc("528");
    xc && Fc("1.9b") || K && Fc("8") || wc && Fc("9.5") || yc && Fc("528");
    xc && !Fc("8") || K && Fc("9");

    function Af(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = !1;
        this.ad = !0
    }
    Af.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.ad = !1
    };

    function Bf(a, b) {
        Af.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.charCode = this.keyCode = this.button = this.clientY = this.clientX = 0;
        this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.j = this.state = null;
        a && this.init(a, b)
    }
    y(Bf, Af);
    Bf.prototype.init = function(a, b) {
        var c = this.type = a.type;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (xc) {
                var e;
                t: {
                    try {
                        xf(d.nodeName);
                        e = !0;
                        break t
                    } catch (f) {}
                    e = !1
                }
                e || (d = null)
            }
        } else "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
        this.relatedTarget = d;
        this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
        this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.state = a.state;
        this.j = a;
        a.defaultPrevented && this.preventDefault()
    };
    Bf.prototype.preventDefault = function() {
        Bf.K.preventDefault.call(this);
        var a = this.j;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, zf) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    Bf.prototype.k = function() {
        return this.j
    };
    var Cf = "closure_listenable_" + (1E6 * Math.random() | 0),
        Df = 0;

    function Ef(a, b, c, d, e) {
        this.za = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.tb = !!d;
        this.zb = e;
        this.key = ++Df;
        this.removed = this.rb = !1
    }

    function Ff(a) {
        a.removed = !0;
        a.za = null;
        a.proxy = null;
        a.src = null;
        a.zb = null
    };

    function Gf(a) {
        this.src = a;
        this.j = {};
        this.k = 0
    }
    Gf.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.j[f];
        a || (a = this.j[f] = [], this.k++);
        var h = Hf(a, b, d, e); - 1 < h ? (b = a[h], c || (b.rb = !1)) : (b = new Ef(b, this.src, f, !!d, e), b.rb = c, a.push(b));
        return b
    };
    Gf.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.j)) return !1;
        var e = this.j[a];
        b = Hf(e, b, c, d);
        return -1 < b ? (Ff(e[b]), z.splice.call(e, b, 1), 0 == e.length && (delete this.j[a], this.k--), !0) : !1
    };

    function If(a, b) {
        var c = b.type;
        if (!(c in a.j)) return !1;
        var d = La(a.j[c], b);
        d && (Ff(b), 0 == a.j[c].length && (delete a.j[c], a.k--));
        return d
    }
    Gf.prototype.removeAll = function(a) {
        a = a && a.toString();
        var b = 0,
            c;
        for (c in this.j)
            if (!a || c == a) {
                for (var d = this.j[c], e = 0; e < d.length; e++) ++b, Ff(d[e]);
                delete this.j[c];
                this.k--
            }
        return b
    };

    function Jf(a, b, c, d, e) {
        a = a.j[b.toString()];
        b = -1;
        a && (b = Hf(a, c, d, e));
        return -1 < b ? a[b] : null
    }

    function Hf(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.removed && f.za == b && f.tb == !!c && f.zb == d) return e
        }
        return -1
    };
    var Kf = "closure_lm_" + (1E6 * Math.random() | 0),
        Lf = {},
        Mf = 0;

    function Nf(a, b, c, d, e) {
        if (da(b)) {
            for (var f = 0; f < b.length; f++) Nf(a, b[f], c, d, e);
            return null
        }
        c = Of(c);
        if (a && a[Cf]) a = a.listen(b, c, d, e);
        else {
            if (!b) throw Error("Invalid event type");
            var f = !!d,
                h = Pf(a);
            h || (a[Kf] = h = new Gf(a));
            c = h.add(b, c, !1, d, e);
            c.proxy || (d = Qf(), c.proxy = d, d.src = a, d.za = c, a.addEventListener ? a.addEventListener(b.toString(), d, f) : a.attachEvent(Rf(b.toString()), d), Mf++);
            a = c
        }
        return a
    }

    function Qf() {
        var a = Sf,
            b = yf ? function(c) {
                return a.call(b.src, b.za, c)
            } : function(c) {
                c = a.call(b.src, b.za, c);
                if (!c) return c
            };
        return b
    }

    function Tf(a, b, c, d, e) {
        if (da(b))
            for (var f = 0; f < b.length; f++) Tf(a, b[f], c, d, e);
        else c = Of(c), a && a[Cf] ? a.mc(b, c, d, e) : a && (a = Pf(a)) && (b = Jf(a, b, c, !!d, e)) && Uf(b)
    }

    function Uf(a) {
        if (fa(a) || !a || a.removed) return !1;
        var b = a.src;
        if (b && b[Cf]) return If(b.Ca, a);
        var c = a.type,
            d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.tb) : b.detachEvent && b.detachEvent(Rf(c), d);
        Mf--;
        (c = Pf(b)) ? (If(c, a), 0 == c.k && (c.src = null, b[Kf] = null)) : Ff(a);
        return !0
    }

    function Rf(a) {
        return a in Lf ? Lf[a] : Lf[a] = "on" + a
    }

    function Vf(a, b, c, d) {
        var e = !0;
        if (a = Pf(a))
            if (b = a.j[b.toString()])
                for (b = b.concat(), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.tb == c && !f.removed && (f = Wf(f, d), e = e && !1 !== f)
                }
            return e
    }

    function Wf(a, b) {
        var c = a.za,
            d = a.zb || a.src;
        a.rb && Uf(a);
        return c.call(d, b)
    }

    function Sf(a, b) {
        if (a.removed) return !0;
        if (!yf) {
            var c = b || r("window.event"),
                d = new Bf(c, this),
                e = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                t: {
                    var f = !1;
                    if (0 == c.keyCode) try {
                        c.keyCode = -1;
                        break t
                    } catch (h) {
                        f = !0
                    }
                    if (f || void 0 == c.returnValue) c.returnValue = !0
                }
                c = [];
                for (f = d.currentTarget; f; f = f.parentNode) c.push(f);
                for (var f = a.type, k = c.length - 1; 0 <= k; k--) {
                    d.currentTarget = c[k];
                    var l = Vf(c[k], f, !0, d),
                        e = e && l
                }
                for (k = 0; k < c.length; k++) d.currentTarget = c[k],
                l = Vf(c[k], f, !1, d),
                e = e && l
            }
            return e
        }
        return Wf(a, new Bf(b, this))
    }

    function Pf(a) {
        a = a[Kf];
        return a instanceof Gf ? a : null
    }
    var Xf = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

    function Of(a) {
        if (ga(a)) return a;
        a[Xf] || (a[Xf] = function(b) {
            return a.handleEvent(b)
        });
        return a[Xf]
    };

    function Yf() {
        var a = ld("PREF");
        if (a)
            for (var a = unescape(a).split("&"), b = 0; b < a.length; b++) {
                var c = a[b].split("="),
                    d = c[0];
                (c = c[1]) && (Zf[d] = c.toString())
            }
    }
    ba(Yf);
    var Zf = r("yt.prefs.UserPrefs.prefs_") || {};
    q("yt.prefs.UserPrefs.prefs_", Zf, void 0);

    function $f(a) {
        if (/^f([1-9][0-9]*)$/.test(a)) throw "ExpectedRegexMatch: " + a;
    }

    function ag(a) {
        if (!/^\w+$/.test(a)) throw "ExpectedRegexMismatch: " + a;
    }

    function bg(a) {
        return void 0 !== Zf[a] ? Zf[a].toString() : null
    }
    Yf.prototype.get = function(a, b) {
        ag(a);
        $f(a);
        var c = bg(a);
        return null != c ? c : b ? b : ""
    };
    Yf.prototype.set = function(a, b) {
        ag(a);
        $f(a);
        if (null == b) throw "ExpectedNotNull";
        Zf[a] = b.toString()
    };
    Yf.prototype.remove = function(a) {
        ag(a);
        $f(a);
        delete Zf[a]
    };
    Yf.prototype.clear = function() {
        Zf = {}
    };

    function cg(a, b, c) {
        if (b) {
            a = u(a) ? Oc(a) : a;
            c = wf(c);
            var d = fb(c.attrs);
            d.tabindex = 0;
            var e = fb(c.params);
            e.flashvars = yd(c.args);
            if (Lb) {
                d.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
                e.movie = b;
                b = document.createElement("object");
                for (var f in d) b.setAttribute(f, d[f]);
                for (f in e) d = document.createElement("param"), d.setAttribute("name", f), d.setAttribute("value", e[f]), b.appendChild(d)
            } else {
                d.type = "application/x-shockwave-flash";
                d.src = b;
                b = document.createElement("embed");
                b.setAttribute("name", d.id);
                for (f in d) b.setAttribute(f,
                    d[f]);
                for (f in e) b.setAttribute(f, e[f])
            }
            e = document.createElement("div");
            e.appendChild(b);
            a.innerHTML = e.innerHTML
        }
    }

    function dg(a, b, c) {
        if (a && a.attrs && a.attrs.id) {
            a = wf(a);
            var d = !!b,
                e = Nc(a.attrs.id),
                f = e ? e.parentNode : null;
            if (e && f) {
                if (window != window.top) {
                    var h = null;
                    if (document.referrer) {
                        var k = document.referrer.substring(0, 128);
                        Ed(k) || (h = k)
                    } else h = "unknown";
                    h && (d = !0, a.args.framer = h)
                }
                h = Ue.getInstance();
                if (Ve(h, a.minVersion)) {
                    var k = eg(a, h),
                        l = ""; - 1 < navigator.userAgent.indexOf("Sony/COM2") || (l = e.getAttribute("src") || e.movie);
                    (l != k || d) && cg(f, k, a);
                    Xe(h) && fg()
                } else gg(f, a, h);
                c && c()
            } else G(function() {
                dg(a, b, c)
            }, 50)
        }
    }

    function gg(a, b, c) {
        0 == c.j && b.fallback ? b.fallback() : 0 == c.j && b.fallbackMessage ? b.fallbackMessage() : a.innerHTML = '<div id="flash-upgrade">' + Kb() + "</div>"
    }

    function eg(a, b) {
        return We(b) && a.url || (-1 < navigator.userAgent.indexOf("Sony/COM2") && !Ve(b, 9, 1, 58) ? !1 : !0) && a.urlV9As2 || a.url
    }

    function fg() {
        var a = Nc("flash10-promo-div"),
            b;
        Yf.getInstance();
        b = bg("f" + (Math.floor(107 / 31) + 1));
        b = !!(((null != b && /^[A-Fa-f0-9]+$/.test(b) ? parseInt(b, 16) : null) || 0) & 16384);
        a && !b && lf(a)
    };

    function hg(a) {
        if (window.spf) {
            var b = a.match(ig);
            spf.style.load(a, b ? b[1] : "", void 0)
        } else jg(a)
    }

    function jg(a) {
        var b = kg(a),
            c = document.getElementById(b),
            d = c && C(c, "loaded");
        d || c && !d || (c = lg(a, b, function() {
            C(c, "loaded") || (xb(c, "loaded", "true"), I(b), G(oa(Wb, b), 0))
        }))
    }

    function lg(a, b, c) {
        var d = document.createElement("link");
        d.id = b;
        d.rel = "stylesheet";
        d.onload = function() {
            c && setTimeout(c, 0)
        };
        wb(d, a);
        (document.getElementsByTagName("head")[0] || document.body).appendChild(d);
        return d
    }

    function kg(a) {
        var b = document.createElement("a");
        wb(b, a);
        a = b.href.replace(/^[a-zA-Z]+:\/\//, "//");
        return "css-" + za(a)
    }
    var ig = /cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;
    var mg;
    var ng = oc,
        ng = ng.toLowerCase();
    if (-1 != ng.indexOf("android")) {
        var og = ng.match(/android\D*(\d\.\d)[^\;|\)]*[\;\)]/);
        if (og) mg = Number(og[1]);
        else {
            var pg = {
                    cupcake: 1.5,
                    donut: 1.6,
                    eclair: 2,
                    froyo: 2.2,
                    gingerbread: 2.3,
                    honeycomb: 3,
                    "ice cream sandwich": 4,
                    jellybean: 4.1
                },
                qg = ng.match("(" + ab(pg).join("|") + ")");
            mg = qg ? pg[qg[0]] : 0
        }
    } else mg = void 0;

    function rg() {
        if (2.2 == mg) return !0;
        var a;
        a = r("yt.player.utils.videoElement_");
        a || (a = document.createElement("video"), q("yt.player.utils.videoElement_", a, void 0));
        try {
            return !(!a || !a.canPlayType || !a.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"') && !a.canPlayType('video/webm; codecs="vp8.0, vorbis"'))
        } catch (b) {
            return !1
        }
    };

    function sg(a, b) {
        var c;
        a instanceof sg ? (this.Oa = p(b) ? b : a.Oa, tg(this, a.Fa), this.Ta = a.Ta, ug(this, a.wa), vg(this, a.Ra), this.ja = a.ja, wg(this, a.j.clone()), this.Na = a.Na) : a && (c = qd(String(a))) ? (this.Oa = !!b, tg(this, c[1] || "", !0), this.Ta = xg(c[2] || ""), ug(this, c[3] || "", !0), vg(this, c[4]), this.ja = xg(c[5] || "", !0), wg(this, c[6] || "", !0), this.Na = xg(c[7] || "")) : (this.Oa = !!b, this.j = new yg(null, 0, this.Oa))
    }
    g = sg.prototype;
    g.Fa = "";
    g.Ta = "";
    g.wa = "";
    g.Ra = null;
    g.ja = "";
    g.Na = "";
    g.Oa = !1;
    g.toString = function() {
        var a = [],
            b = this.Fa;
        b && a.push(zg(b, Ag, !0), ":");
        if (b = this.wa) {
            a.push("//");
            var c = this.Ta;
            c && a.push(zg(c, Ag, !0), "@");
            a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
            b = this.Ra;
            null != b && a.push(":", String(b))
        }
        if (b = this.ja) this.wa && "/" != b.charAt(0) && a.push("/"), a.push(zg(b, "/" == b.charAt(0) ? Bg : Cg, !0));
        (b = this.j.toString()) && a.push("?", b);
        (b = this.Na) && a.push("#", zg(b, Dg));
        return a.join("")
    };
    g.resolve = function(a) {
        var b = this.clone(),
            c = !!a.Fa;
        c ? tg(b, a.Fa) : c = !!a.Ta;
        c ? b.Ta = a.Ta : c = !!a.wa;
        c ? ug(b, a.wa) : c = null != a.Ra;
        var d = a.ja;
        if (c) vg(b, a.Ra);
        else if (c = !!a.ja) {
            if ("/" != d.charAt(0))
                if (this.wa && !this.ja) d = "/" + d;
                else {
                    var e = b.ja.lastIndexOf("/"); - 1 != e && (d = b.ja.substr(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e) d = "";
            else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                for (var d = 0 == e.lastIndexOf("/", 0), e = e.split("/"), f = [], h = 0; h < e.length;) {
                    var k = e[h++];
                    "." == k ? d && h == e.length && f.push("") : ".." == k ? ((1 < f.length || 1 == f.length &&
                        "" != f[0]) && f.pop(), d && h == e.length && f.push("")) : (f.push(k), d = !0)
                }
                d = f.join("/")
            } else d = e
        }
        c ? b.ja = d : c = "" !== a.j.toString();
        c ? wg(b, xg(a.j.toString())) : c = !!a.Na;
        c && (b.Na = a.Na);
        return b
    };
    g.clone = function() {
        return new sg(this)
    };

    function tg(a, b, c) {
        a.Fa = c ? xg(b, !0) : b;
        a.Fa && (a.Fa = a.Fa.replace(/:$/, ""))
    }

    function ug(a, b, c) {
        a.wa = c ? xg(b, !0) : b
    }

    function vg(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
            a.Ra = b
        } else a.Ra = null
    }

    function wg(a, b, c) {
        b instanceof yg ? (a.j = b, Eg(a.j, a.Oa)) : (c || (b = zg(b, Fg)), a.j = new yg(b, 0, a.Oa))
    }

    function M(a, b, c) {
        a.j.set(b, c)
    }

    function Gg(a, b, c) {
        da(c) || (c = [String(c)]);
        Hg(a.j, b, c)
    }

    function Ig(a) {
        M(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ w()).toString(36));
        return a
    }

    function Jg(a) {
        return a instanceof sg ? a.clone() : new sg(a, void 0)
    }

    function Kg(a, b, c, d) {
        var e = new sg(null, void 0);
        a && tg(e, a);
        b && ug(e, b);
        c && vg(e, c);
        d && (e.ja = d);
        return e
    }

    function xg(a, b) {
        return a ? b ? decodeURI(a) : decodeURIComponent(a) : ""
    }

    function zg(a, b, c) {
        return u(a) ? (a = encodeURI(a).replace(b, Lg), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }

    function Lg(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var Ag = /[#\/\?@]/g,
        Cg = /[\#\?:]/g,
        Bg = /[\#\?]/g,
        Fg = /[\#\?@]/g,
        Dg = /#/g;

    function yg(a, b, c) {
        this.j = a || null;
        this.k = !!c
    }

    function Mg(a) {
        a.N || (a.N = new Nd, a.Y = 0, a.j && td(a.j, function(b, c) {
            a.add(ta(b), c)
        }))
    }
    g = yg.prototype;
    g.N = null;
    g.Y = null;
    g.$ = function() {
        Mg(this);
        return this.Y
    };
    g.add = function(a, b) {
        Mg(this);
        this.j = null;
        a = Ng(this, a);
        var c = this.N.get(a);
        c || this.N.set(a, c = []);
        c.push(b);
        this.Y++;
        return this
    };
    g.remove = function(a) {
        Mg(this);
        a = Ng(this, a);
        return Pd(this.N.k, a) ? (this.j = null, this.Y -= this.N.get(a).length, this.N.remove(a)) : !1
    };
    g.clear = function() {
        this.N = this.j = null;
        this.Y = 0
    };
    g.isEmpty = function() {
        Mg(this);
        return 0 == this.Y
    };

    function Og(a, b) {
        Mg(a);
        b = Ng(a, b);
        return Pd(a.N.k, b)
    }
    g.vb = function(a) {
        var b = this.ba();
        return Ha(b, a)
    };
    g.xa = function() {
        Mg(this);
        for (var a = this.N.ba(), b = this.N.xa(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    g.ba = function(a) {
        Mg(this);
        var b = [];
        if (u(a)) Og(this, a) && (b = Na(b, this.N.get(Ng(this, a))));
        else {
            a = this.N.ba();
            for (var c = 0; c < a.length; c++) b = Na(b, a[c])
        }
        return b
    };
    g.set = function(a, b) {
        Mg(this);
        this.j = null;
        a = Ng(this, a);
        Og(this, a) && (this.Y -= this.N.get(a).length);
        this.N.set(a, [b]);
        this.Y++;
        return this
    };
    g.get = function(a, b) {
        var c = a ? this.ba(a) : [];
        return 0 < c.length ? String(c[0]) : b
    };

    function Hg(a, b, c) {
        a.remove(b);
        0 < c.length && (a.j = null, a.N.set(Ng(a, b), Oa(c)), a.Y += c.length)
    }
    g.toString = function() {
        if (this.j) return this.j;
        if (!this.N) return "";
        for (var a = [], b = this.N.xa(), c = 0; c < b.length; c++)
            for (var d = b[c], e = encodeURIComponent(String(d)), d = this.ba(d), f = 0; f < d.length; f++) {
                var h = e;
                "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
                a.push(h)
            }
        return this.j = a.join("&")
    };
    g.clone = function() {
        var a = new yg;
        a.j = this.j;
        this.N && (a.N = this.N.clone(), a.Y = this.Y);
        return a
    };

    function Ng(a, b) {
        var c = String(b);
        a.k && (c = c.toLowerCase());
        return c
    }

    function Eg(a, b) {
        b && !a.k && (Mg(a), a.j = null, a.N.forEach(function(a, b) {
            var e = b.toLowerCase();
            b != e && (this.remove(b), Hg(this, e, a))
        }, a));
        a.k = b
    };
    var Pg = "corp.google.com googleplex.com youtube.com youtube-nocookie.com youtubeeducation.com borg.google.com prod.google.com sandbox.google.com books.googleusercontent.com docs.google.com drive.google.com mail.google.com photos.google.com plus.google.com play.google.com googlevideo.com talkgadget.google.com survey.g.doubleclick.net youtube.googleapis.com vevo.com".split(" "),
        Qg = "";

    function Rg(a) {
        return a && a == Qg ? !0 : (new RegExp("^(https?:)?//([a-z0-9-]{1,63}\\.)*(" + Pg.join("|").replace(/\./g, ".") + ")(:[0-9]+)?([/?#]|$)", "i")).test(a) ? (Qg = a, !0) : !1
    };
    var Sg = {},
        Tg = 0,
        Ug = r("yt.net.ping.workerUrl_") || null;
    q("yt.net.ping.workerUrl_", Ug, void 0);

    function Vg(a) {
        var b = new Image,
            c = "" + Tg++;
        Sg[c] = b;
        b.onload = b.onerror = function() {
            delete Sg[c]
        };
        b.src = a;
        b = eval("null")
    };

    function Wg(a) {
        var b = void 0;
        void 0 === b && (b = NaN);
        var c = r("yt.scheduler.instance.addJob");
        c ? (isNaN(b) && (b = 0), c(a, 0, b)) : isNaN(b) ? a() : G(a, b || 0)
    };

    function N(a, b) {
        this.version = a;
        this.args = b
    }

    function Xg(a) {
        if (!a.Ga) {
            var b = {};
            a.call(b);
            a.Ga = b.version
        }
        return a.Ga
    }

    function Yg(a, b) {
        function c() {
            a.apply(this, b.args)
        }
        if (!b.args || !b.version) throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");
        var d;
        try {
            d = Xg(a)
        } catch (e) {}
        if (!d || b.version != d) throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");
        c.prototype = a.prototype;
        try {
            return new c
        } catch (f) {
            throw f.message = "yt.pubsub2.Data.deserialize(): " + f.message, f;
        }
    }

    function O(a, b) {
        this.k = a;
        this.j = b
    }
    O.prototype.toString = function() {
        return this.k
    };
    var Zg = r("yt.pubsub2.instance_") || new E;
    E.prototype.subscribe = E.prototype.subscribe;
    E.prototype.unsubscribeByKey = E.prototype.pa;
    E.prototype.publish = E.prototype.publish;
    E.prototype.clear = E.prototype.clear;
    q("yt.pubsub2.instance_", Zg, void 0);
    var $g = r("yt.pubsub2.subscribedKeys_") || {};
    q("yt.pubsub2.subscribedKeys_", $g, void 0);
    var ah = r("yt.pubsub2.topicToKeys_") || {};
    q("yt.pubsub2.topicToKeys_", ah, void 0);
    var bh = r("yt.pubsub2.isAsync_") || {};
    q("yt.pubsub2.isAsync_", bh, void 0);
    q("yt.pubsub2.skipSubKey_", null, void 0);

    function P(a, b) {
        var c = ch();
        c && c.publish.call(c, a.toString(), a, b)
    }

    function dh(a, b, c) {
        var d = ch();
        if (!d) return 0;
        var e = d.subscribe(a.toString(), function(d, h) {
            if (!window.yt.pubsub2.skipSubKey_ || window.yt.pubsub2.skipSubKey_ != e) {
                var k = function() {
                    if ($g[e]) try {
                        if (h && a instanceof O && a != d) try {
                            h = Yg(a.j, h)
                        } catch (k) {
                            throw k.message = "yt.pubsub2 cross-binary conversion error for " + a.toString() + ": " + k.message, k;
                        }
                        b.call(c || window, h)
                    } catch (n) {
                        Jb(n)
                    }
                };
                bh[a.toString()] ? r("yt.scheduler.instance") ? Wg(k) : G(k, 0) : k()
            }
        });
        $g[e] = !0;
        ah[a.toString()] || (ah[a.toString()] = []);
        ah[a.toString()].push(e);
        return e
    }

    function eh(a) {
        var b = ch();
        b && (fa(a) && (a = [a]), A(a, function(a) {
            b.unsubscribeByKey(a);
            delete $g[a]
        }))
    }

    function ch() {
        return r("yt.pubsub2.instance_")
    };

    function fh(a) {
        N.call(this, 1, arguments)
    }
    y(fh, N);
    var gh = new O("timing-sent", fh);
    var Q = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {},
        hh = v(Q.clearResourceTimings || Q.webkitClearResourceTimings || Q.mozClearResourceTimings || Q.msClearResourceTimings || Q.oClearResourceTimings || t, Q),
        ih = Q.mark ? function(a) {
            Q.mark(a)
        } : t;

    function jh(a) {
        kh().tick[a] = w();
        ih(a);
        F("CSI_LOG_ON_TICK") && lh()
    }

    function mh() {
        nh();
        hh();
        q("yt.timing.pingSent_", !1, void 0)
    }

    function oh() {
        var a = kh().tick;
        if (a.aft) return a.aft;
        for (var b = F("TIMING_AFT_KEYS", ["ol"]), c = b.length, d = 0; d < c; d++) {
            var e = a[b[d]];
            if (e) return e
        }
        return NaN
    }

    function ph(a) {
        return Math.round(Q.timing.navigationStart + a)
    }

    function qh(a) {
        var b = window.location.protocol,
            c = Q.getEntriesByType("resource"),
            d = c.filter(function(a) {
                return 0 == a.name.indexOf(b + "//fonts.googleapis.com/css?family=")
            })[0],
            c = c.filter(function(a) {
                return 0 == a.name.indexOf(b + "//fonts.gstatic.com/s/")
            }).reduce(function(a, b) {
                return b.duration > a.duration ? b : a
            }, {
                duration: 0
            });
        d && 0 < d.startTime && 0 < d.responseEnd && (a.wfcs = ph(d.startTime), a.wfce = ph(d.responseEnd));
        c && 0 < c.startTime && 0 < c.responseEnd && (a.wffs = ph(c.startTime), a.wffe = ph(c.responseEnd))
    }

    function lh() {
        var a = F("TIMING_ACTION"),
            b = kh().tick;
        if (a && b._start && oh()) {
            var a = !0,
                c = F("TIMING_WAIT", []);
            if (c.length)
                for (var d = 0, e = c.length; d < e; ++d)
                    if (!(c[d] in b)) {
                        a = !1;
                        break
                    }
            if (a)
                if (c = kh().tick, b = kh().span, d = kh().info, a = r("yt.timing.reportbuilder_")) {
                    if (a = a(c, b, d, void 0)) rh(a), mh()
                } else {
                    a = {
                        v: 2,
                        s: F("CSI_SERVICE_NAME", "youtube"),
                        action: F("TIMING_ACTION")
                    };
                    Q.now && Q.timing && (e = Q.timing.navigationStart + Q.now(), e = Math.round(w() - e), d.yt_hrd = e);
                    var e = F("TIMING_INFO") || {},
                        f;
                    for (f in e) d[f] = e[f];
                    f = d.srt;
                    delete d.srt;
                    var h;
                    f || 0 === f || (h = Q.timing || {}, f = Math.max(0, h.responseStart - h.navigationStart), isNaN(f) && d.pt && (f = d.pt));
                    if (f || 0 === f) d.srt = f;
                    d.h5jse && (e = window.location.protocol + r("ytplayer.config.assets.js"), (e = Q.getEntriesByName ? Q.getEntriesByName(e)[0] : null) ? d.h5jse = Math.round(d.h5jse - e.responseEnd) : delete d.h5jse);
                    c.aft = oh();
                    e = c._start;
                    if ("cold" == d.yt_lt) {
                        h || (h = Q.timing || {});
                        var k;
                        t: if (k = h, k.msFirstPaint) k = Math.max(0, k.msFirstPaint);
                            else {
                                var l = window.chrome;
                                if (l && (l = l.loadTimes, ga(l))) {
                                    var l = l(),
                                        n = 1E3 * Math.min(l.requestTime ||
                                            Infinity, l.startLoadTime || Infinity),
                                        n = Infinity === n ? 0 : k.navigationStart - n;
                                    k = Math.max(0, Math.round(1E3 * l.firstPaintTime + n) || 0);
                                    break t
                                }
                                k = 0
                            }
                        0 < k && k > e && (c.fpt = k);
                        k = kh().span;
                        l = h.redirectEnd - h.redirectStart;
                        0 < l && (k.rtime_ = l);
                        l = h.domainLookupEnd - h.domainLookupStart;
                        0 < l && (k.dns_ = l);
                        l = h.connectEnd - h.connectStart;
                        0 < l && (k.tcp_ = l);
                        l = h.connectEnd - h.secureConnectionStart;
                        h.secureConnectionStart >= h.navigationStart && 0 < l && (k.stcp_ = l);
                        l = h.responseStart - h.requestStart;
                        0 < l && (k.req_ = l);
                        l = h.responseEnd - h.responseStart;
                        0 < l && (k.rcv_ = l);
                        F("EXP_WEBFONT_ENABLED") && Q.getEntriesByType && qh(c)
                    }
                    F("CSI_MORE") && (d.p = F("CLIENT_PROTOCOL") || "unknown", d.t = F("CLIENT_TRANSPORT") || "unknown");
                    for (var x in d) "_" != x.charAt(0) && (a[x] = d[x]);
                    x = {};
                    h = [];
                    for (var Z in c) "_" != Z.charAt(0) && (k = Math.max(Math.round(c[Z] - e), 0), x[Z] = k, h.push(Z + "." + k));
                    a.rt = h.join(",");
                    Z = {};
                    h = [];
                    for (var la in b) "_" != la.charAt(0) && (Z[la] = b[la], h.push(la + "." + b[la]));
                    a.it = h.join(",");
                    (la = r("ytdebug.logTiming")) && la(a, x, Z);
                    mh();
                    F("EXP_DEFER_CSI_PING") ? (sh(), q("yt.timing.deferredPingArgs_",
                        a, void 0), la = G(sh, 0), q("yt.timing.deferredPingTimer_", la, void 0)) : rh(a);
                    P(gh, new fh(x.aft + (f || 0)))
                }
        }
    }

    function rh(a) {
        F("EXP_DEFER_CSI_PING") && (H(r("yt.timing.deferredPingTimer_")), q("yt.timing.deferredPingArgs_", null, void 0));
        var b = "https:" == window.location.protocol ? "https://gg.google.com/csi" : "http://csi.gstatic.com/csi",
            c = "",
            d;
        for (d in a) c += "&" + d + "=" + a[d];
        (a = b + "?" + c.substring(1)) && Vg(a);
        q("yt.timing.pingSent_", !0, void 0)
    }

    function sh(a) {
        if (F("EXP_DEFER_CSI_PING")) {
            var b = r("yt.timing.deferredPingArgs_");
            b && (a && (b.yt_fss = a), rh(b))
        }
    }

    function kh() {
        return r("ytcsi.data_") || nh()
    }

    function nh() {
        var a = {
            tick: {},
            span: {},
            info: {}
        };
        q("ytcsi.data_", a, void 0);
        return a
    };

    function th() {};

    function uh() {}
    y(uh, th);
    uh.prototype.$ = function() {
        var a = 0;
        Ld(this.ta(!0), function() {
            a++
        });
        return a
    };
    uh.prototype.clear = function() {
        var a = Md(this.ta(!0)),
            b = this;
        A(a, function(a) {
            b.remove(a)
        })
    };

    function vh(a) {
        this.j = a
    }
    y(vh, uh);
    g = vh.prototype;
    g.isAvailable = function() {
        if (!this.j) return !1;
        try {
            return this.j.setItem("__sak", "1"), this.j.removeItem("__sak"), !0
        } catch (a) {
            return !1
        }
    };
    g.set = function(a, b) {
        try {
            this.j.setItem(a, b)
        } catch (c) {
            if (0 == this.j.length) throw "Storage mechanism: Storage disabled";
            throw "Storage mechanism: Quota exceeded";
        }
    };
    g.get = function(a) {
        a = this.j.getItem(a);
        if (!u(a) && null !== a) throw "Storage mechanism: Invalid value was encountered";
        return a
    };
    g.remove = function(a) {
        this.j.removeItem(a)
    };
    g.$ = function() {
        return this.j.length
    };
    g.ta = function(a) {
        var b = 0,
            c = this.j,
            d = new Jd;
        d.next = function() {
            if (b >= c.length) throw Id;
            var d;
            d = c.key(b++);
            if (a) return d;
            d = c.getItem(d);
            if (!u(d)) throw "Storage mechanism: Invalid value was encountered";
            return d
        };
        return d
    };
    g.clear = function() {
        this.j.clear()
    };
    g.key = function(a) {
        return this.j.key(a)
    };

    function wh() {
        var a = null;
        try {
            a = window.localStorage || null
        } catch (b) {}
        this.j = a
    }
    y(wh, vh);

    function xh() {
        var a = null;
        try {
            a = window.sessionStorage || null
        } catch (b) {}
        this.j = a
    }
    y(xh, vh);

    function yh(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
            return eval("(" + a + ")")
        } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }

    function zh(a) {
        return eval("(" + a + ")")
    }

    function R(a) {
        return Ah(new Bh(void 0), a)
    }

    function Bh(a) {
        this.j = a
    }

    function Ah(a, b) {
        var c = [];
        Ch(a, b, c);
        return c.join("")
    }

    function Ch(a, b, c) {
        switch (typeof b) {
            case "string":
                Dh(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if (da(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++) c.push(e), e = b[f], Ch(a, a.j ? a.j.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b) Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), Dh(f, c),
                    c.push(":"), Ch(a, a.j ? a.j.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }
    var Eh = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        },
        Fh = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function Dh(a, b) {
        b.push('"', a.replace(Fh, function(a) {
            if (a in Eh) return Eh[a];
            var b = a.charCodeAt(0),
                e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return Eh[a] = e + b.toString(16)
        }), '"')
    };

    function Gh(a) {
        this.j = a
    }
    Gh.prototype.set = function(a, b) {
        p(b) ? this.j.set(a, R(b)) : this.j.remove(a)
    };
    Gh.prototype.get = function(a) {
        var b;
        try {
            b = this.j.get(a)
        } catch (c) {
            return
        }
        if (null !== b) try {
            return yh(b)
        } catch (d) {
            throw "Storage: Invalid value was encountered";
        }
    };
    Gh.prototype.remove = function(a) {
        this.j.remove(a)
    };

    function Hh(a) {
        this.j = a
    }
    y(Hh, Gh);

    function Ih(a) {
        this.data = a
    }

    function Jh(a) {
        return !p(a) || a instanceof Ih ? a : new Ih(a)
    }
    Hh.prototype.set = function(a, b) {
        Hh.K.set.call(this, a, Jh(b))
    };
    Hh.prototype.k = function(a) {
        a = Hh.K.get.call(this, a);
        if (!p(a) || a instanceof Object) return a;
        throw "Storage: Invalid value was encountered";
    };
    Hh.prototype.get = function(a) {
        if (a = this.k(a)) {
            if (a = a.data, !p(a)) throw "Storage: Invalid value was encountered";
        } else a = void 0;
        return a
    };

    function Kh(a) {
        this.j = a
    }
    y(Kh, Hh);

    function Lh(a) {
        var b = a.creation;
        a = a.expiration;
        return !!a && a < w() || !!b && b > w()
    }
    Kh.prototype.set = function(a, b, c) {
        if (b = Jh(b)) {
            if (c) {
                if (c < w()) {
                    Kh.prototype.remove.call(this, a);
                    return
                }
                b.expiration = c
            }
            b.creation = w()
        }
        Kh.K.set.call(this, a, b)
    };
    Kh.prototype.k = function(a, b) {
        var c = Kh.K.k.call(this, a);
        if (c)
            if (!b && Lh(c)) Kh.prototype.remove.call(this, a);
            else return c
    };

    function Mh(a) {
        this.j = a
    }
    y(Mh, Kh);

    function Nh(a, b) {
        var c = [];
        Ld(b, function(a) {
            var b;
            try {
                b = Mh.prototype.k.call(this, a, !0)
            } catch (f) {
                if ("Storage: Invalid value was encountered" == f) return;
                throw f;
            }
            p(b) ? Lh(b) && c.push(a) : c.push(a)
        }, a);
        return c
    }

    function Oh(a, b) {
        var c = Nh(a, b);
        A(c, function(a) {
            Mh.prototype.remove.call(this, a)
        }, a)
    }

    function Ph() {
        var a = Qh;
        Oh(a, a.j.ta(!0))
    };

    function S(a, b, c) {
        var d = c && 0 < c ? c : 0;
        c = d ? w() + 1E3 * d : 0;
        if ((d = d ? Qh : Rh) && window.JSON) {
            u(b) || (b = JSON.stringify(b, void 0));
            try {
                d.set(a, b, c)
            } catch (e) {
                d.remove(a)
            }
        }
    }

    function T(a) {
        if (!Rh && !Qh || !window.JSON) return null;
        var b;
        try {
            b = Rh.get(a)
        } catch (c) {}
        if (!u(b)) try {
            b = Qh.get(a)
        } catch (d) {}
        if (!u(b)) return null;
        try {
            b = JSON.parse(b, void 0)
        } catch (e) {}
        return b
    }

    function Sh(a) {
        Rh && Rh.remove(a);
        Qh && Qh.remove(a)
    }
    var Qh, Th = new wh;
    Qh = Th.isAvailable() ? new Mh(Th) : null;
    var Rh, Uh = new xh;
    Rh = Uh.isAvailable() ? new Mh(Uh) : null;

    function Vh() {
        var a = {
                volume: 100,
                muted: !1
            },
            b = T("yt-player-volume") || {};
        a.volume = isNaN(b.volume) ? 100 : Math.min(Math.max(b.volume, 0), 100);
        a.muted = void 0 == b.muted ? !1 : b.muted;
        return a
    };

    function Wh(a, b) {
	console.log('roooar');
        D.call(this);
        this.B = this.M = a;
        this.W = b;
        this.L = !1;
        this.k = {};
        this.Ia = this.U = null;
        this.ia = new E;
        Ab(this, oa(Bb, this.ia));
        this.A = {};
        this.F = this.Va = this.o = this.Rb = this.j = null;
        this.qa = !1;
        this.R = this.H = this.Pb = this.C = null;
        this.qb = {};
        this.zd = ["onReady"];
        this.Ha = [];
        this.Sb = null;
        this.vc = 0;
        this.ra = {};
        Xh(this);
        this.ua("onVolumeChange", v(this.fe, this));
        this.ua("onError", v(this.ee, this));
        this.ua("onTabOrderChange", v(this.Cd, this));
        this.ua("onTabAnnounce", v(this.Me, this));
        this.ua("WATCH_LATER_VIDEO_ADDED",
            v(this.ge, this));
        this.ua("WATCH_LATER_VIDEO_REMOVED", v(this.he, this));
        this.ua("onMouseWheelCapture", v(this.be, this));
        this.ua("onMouseWheelRelease", v(this.ce, this));
        this.Qb = !1;
        Nf(this.M, "mousewheel", this.Nc, !1, this);
        Nf(this.M, "wheel", this.Nc, !1, this)
    }
    y(Wh, D);
    g = Wh.prototype;
    g.qc = function(a, b) {
        this.J() || (Yh(this, a), Zh(this, b), this.L && $h(this))
    };

    function Yh(a, b) {
        a.Rb = b;
        a.j = b.clone();
        a.o = a.j.attrs.id || a.o;
        "video-player" == a.o && (a.o = a.W, a.j.attrs.id = a.W);
        a.B.id == a.o && (a.o = a.o + "-player", a.j.attrs.id = a.o);
        a.j.args.enablejsapi = "1";
        a.j.args.playerapiid = a.W;
        a.Va || (a.Va = ai(a, a.j.args.jsapicallback || "onYouTubePlayerReady"));
        a.j.args.jsapicallback = null;
        var c = a.j.attrs.width;
        c && (a.B.style.width = cf(Number(c) || c, !0));
        if (c = a.j.attrs.height) a.B.style.height = cf(Number(c) || c, !0);
        a.B.style.overflow = "hidden"
    }
    g.Jd = function() {
        return this.Rb
    };

    function $h(a) {
        a.j.loaded || (a.j.loaded = !0, "0" != a.j.args.autoplay ? a.k.loadVideoByPlayerVars(a.j.args) : a.k.cueVideoByPlayerVars(a.j.args))
    }

    function bi(a) {
        if (!p(a.j.disable.flash)) {
            var b = a.j.disable,
                c;
            c = Ve(Ue.getInstance(), a.j.minVersion);
            b.flash = !c
        }
        return !a.j.disable.flash
    }

    function ci(a) {
        var b = di(a);
        b && b.stopVideo && b.stopVideo();
        if (bi(a)) {
            var c = a.j;
            b && b.getUpdatedConfigurationData && (c = wf(b.getUpdatedConfigurationData()));
            c.args.autoplay = 1;
            c.args.html5_unavailable = "1";
            Yh(a, c);
            Zh(a, "flash")
        }
    }

    function Zh(a, b) {
        if (!a.J()) {
            if (!b) {
                var c;
                if (!(c = !a.j.html5 && bi(a))) {
                    if (!p(a.j.disable.html5)) {
                        if (c = rg()) c = ei(a) || a.j.assets.js;
                        a.j.disable.html5 = !c;
                        c || (a.j.args.html5_unavailable = "1")
                    }
                    c = !!a.j.disable.html5
                }
                b = c ? bi(a) ? "flash" : "unsupported" : "html5"
            }("flash" == b ? a.Re : "html5" == b ? a.Se : a.Te).call(a)
        }
    }

    function ei(a) {
        var b = !0,
            c = di(a);
        c && a.j && (a = a.j, b = C(c, "version") == a.assets.js);
        return b && !!r("yt.player.Application.create")
    }
    g.Se = function() {
        if (!this.qa) {
            var a = ei(this);
            if (a && "html5" == fi(this)) this.F = "html5", this.L || this.ab();
            else if (gi(this), this.F = "html5", a && this.Pb) this.M.appendChild(this.Pb), this.ab();
            else {
                this.j.loaded = !0;
                var b = v(function() {
                    var a = this.M,
                        b = this.j.clone();
                    r("yt.player.Application.create")(a, b);
                    this.ab()
                }, this);
                this.C = b;
                this.qa = !0;
                a ? this.C() : (this.j.assets.js2 ? (this.C = a = v(function() {
                    Xb(this.j.assets.js2, b);
                    this.C = b
                }, this), Xb(this.j.assets.js, a)) : Xb(this.j.assets.js, this.C), hg(this.j.assets.css))
            }
        }
    };
    g.Re = function() {
        var a = this.j.clone();
        if (!this.H) {
            var b = di(this);
            b && (this.H = document.createElement("span"), this.H.tabIndex = 0, this.Ha.push(L(this.H, "focus", v(this.Jc, this))), this.R = document.createElement("span"), this.R.tabIndex = 0, this.Ha.push(L(this.R, "focus", v(this.Jc, this))), b.parentNode && b.parentNode.insertBefore(this.H, b), b.parentNode && b.parentNode.insertBefore(this.R, b.nextSibling))
        }
        a.attrs.width = a.attrs.width || "100%";
        a.attrs.height = a.attrs.height || "100%";
        if ("flash" == fi(this)) this.F = "flash", this.L ||
            dg(a, !1, v(this.ab, this));
        else {
            gi(this);
            this.F = "flash";
            this.j.loaded = !0;
            b = this.M;
            b = u(b) ? Oc(b) : b;
            a = wf(a);
            if (window != window.top) {
                var c = null;
                document.referrer && (c = document.referrer.substring(0, 128));
                a.args.framer = c
            }
            c = Ue.getInstance();
            Ve(c, a.minVersion) ? (c = eg(a, c), cg(b, c, a)) : gg(b, a, c);
            this.ab()
        }
    };
    g.Jc = function() {
        di(this).focus()
    };

    function di(a) {
        var b = Nc(a.o);
        !b && a.B && a.B.querySelector && (b = a.B.querySelector("#" + a.o));
        return b
    }
    g.ab = function() {
        var a = di(this),
            b = !1;
        try {
            a && a.getApiInterface && a.getApiInterface() && (b = !0)
        } catch (c) {}
        if (b)
            if (this.qa = !1, a.isNotServable && a.isNotServable(this.j.args.video_id)) ci(this);
            else {
                Xh(this);
                this.L = !0;
                a = di(this);
                a.addEventListener && (this.U = hi(this, a, "addEventListener"));
                a.removeEventListener && (this.Ia = hi(this, a, "removeEventListener"));
                for (var b = a.getApiInterface(), b = b.concat(a.getInternalApiInterface()), d = 0; d < b.length; d++) {
                    var e = b[d];
                    this.k[e] || (this.k[e] = hi(this, a, e))
                }
                for (var f in this.A) this.U(f,
                    this.A[f]);
                $h(this);
                this.Va && this.Va(this.k);
                this.ia.publish("onReady", this.k)
            } else this.vc = G(v(this.ab, this), 50)
    };

    function hi(a, b, c) {
        var d = b[c];
        return function() {
            try {
                return a.Sb = null, d.apply(b, arguments)
            } catch (e) {
                "Bad NPObject as private data!" != e.message && (e.message += " (" + c + ")", a.Sb = e, Jb(e, "WARNING"))
            }
        }
    }

    function Xh(a) {
        a.L = !1;
        if (a.Ia)
            for (var b in a.A) a.Ia(b, a.A[b]);
        for (var c in a.ra) H(parseInt(c, 10));
        a.ra = {};
        a.U = null;
        a.Ia = null;
        for (var d in a.k) a.k[d] = null;
        a.k.addEventListener = v(a.ua, a);
        a.k.removeEventListener = v(a.Be, a);
        a.k.destroy = v(a.dispose, a);
        a.k.getLastError = v(a.Kd, a);
        a.k.getPlayerType = v(a.Ld, a);
        a.k.getCurrentVideoConfig = v(a.Jd, a);
        a.k.loadNewVideoConfig = v(a.qc, a);
        a.k.isReady = v(a.cf, a)
    }
    g.cf = function() {
        return this.L
    };
    g.ua = function(a, b) {
        if (!this.J()) {
            var c = ai(this, b);
            if (c) {
			console.log('pow', a);
                if (!Ha(this.zd, a) && !this.A[a]) {
                    var d = ii(this, a);
                    this.U && this.U(a, d)
                }
                this.ia.subscribe(a, c);
                "onReady" == a && this.L && G(oa(c, this.k), 0)
            }
        }
    };
    g.Be = function(a, b) {
        if (!this.J()) {
            var c = ai(this, b);
            c && this.ia.unsubscribe(a, c)
        }
    };

    function ai(a, b) {
        var c = b;
        if ("string" == typeof b) {
            if (a.qb[b]) return a.qb[b];
            c = function() {
                var a = r(b);
                a && a.apply(m, arguments)
            };
            a.qb[b] = c
        }
        return c ? c : null
    }

    function ii(a, b) {
        var c = "ytPlayer" + b + a.W;
        a.A[b] = c;
        m[c] = function(c) {
            var e = G(function() {
                if (!a.J()) {
                    a.ia.publish(b, c);
                    var f = a.ra,
                        h = e.toString();
                    h in f && delete f[h]
                }
            }, 0);
            eb(a.ra, e.toString())
        };
        return c
    }
    g.Cd = function(a) {
        a = a ? Uc : Tc;
        for (var b = a(document.activeElement); b && (1 != b.nodeType || b == this.H || b == this.R || (b.focus(), b != document.activeElement));) b = a(b)
    };
    g.Me = function(a) {
        I("a11y-announce", a)
    };
    g.fe = function(a) {
        var b = {};
        b.volume = isNaN(a.volume) ? Vh().volume : Math.min(Math.max(a.volume, 0), 100);
        b.muted = void 0 == a.muted ? Vh().muted : a.muted;
        S("yt-player-volume", b, 2592E3)
    };
    g.ee = function(a) {
        5 == a && ci(this)
    };
    g.ge = function(a) {
        I("WATCH_LATER_VIDEO_ADDED", a)
    };
    g.he = function(a) {
        I("WATCH_LATER_VIDEO_REMOVED", a)
    };
    g.be = function() {
        this.Qb = !0
    };
    g.ce = function() {
        this.Qb = !1
    };
    g.Nc = function(a) {
        this.Qb && a.preventDefault()
    };
    g.Te = function() {
        gi(this);
        this.F = "unsupported";
        var a = 'Adobe Flash Player or an HTML5 supported browser is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="/html5">Learn more about upgrading to an HTML5 browser</a>',
            b = navigator.userAgent.match(/Version\/(\d).*Safari/);
        b && 5 <= parseInt(b[1], 10) && (a = 'Adobe Flash Player or QuickTime is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/"> Get the latest Flash Player</a> <br> <a href="http://www.apple.com/quicktime/download/">Get the latest version of QuickTime</a>');
        b = this.j.messages.player_fallback || a;
        a = Nc("player-unavailable");
        if (Nc("unavailable-submessage") && a) {
            Nc("unavailable-submessage").innerHTML = b;
            var b = a || document,
                c = null;
            b.getElementsByClassName ? c = b.getElementsByClassName("icon")[0] : b.querySelectorAll && b.querySelector ? c = b.querySelector(".icon") : c = Qc("icon", a)[0];
            if (c = b = c || null) c = b ? b.dataset ? yb("icon") in b.dataset : b.hasAttribute ? !!b.hasAttribute("data-icon") : !!b.getAttribute("data-icon") : !1;
            c && (b.src = C(b, "icon"));
            kc(a, "hid");
            jc(Nc("player"), "off-screen-trigger")
        }
    };
    g.Ld = function() {
        return this.F || fi(this)
    };
    g.Kd = function() {
        return this.Sb
    };

    function fi(a) {
        return (a = di(a)) ? "div" == a.tagName.toLowerCase() ? "html5" : "flash" : null
    }

    function gi(a) {
        jh("dcp");
        a.cancel();
        Xh(a);
        a.F = null;
        a.j && (a.j.loaded = !1);
        var b = di(a);
        "html5" == fi(a) ? a.Pb = b : b && b.destroy && b.destroy();
        Sc(a.M);
        fd(a.Ha);
        a.Ha.length = 0;
        a.H = null;
        a.R = null
    }
    g.cancel = function() {
        if (this.C) {
            var a = this.C;
            this.j.assets.js && a && (a = "" + ia(a), (a = bc[a]) && Tb(a))
        }
        H(this.vc);
        this.qa = !1
    };
    g.G = function() {
        gi(this);
        this.qb = null;
        for (var a in this.A) m[this.A[a]] = null;
        this.k = null;
        delete this.M;
        delete this.B;
        this.j && (this.Rb = this.j = this.j.fallback = null);
        Wh.K.G.call(this)
    };
    var ji = {},
        ki = "player_uid_" + (1E9 * Math.random() >>> 0);

    function li(a, b) {
        a = u(a) ? Oc(a) : a;
        b = wf(b);
        var c = ki + "_" + ia(a),
            d = ji[c];
        if (d) return d.qc(b), d.k;
        d = new Wh(a, c);
        ji[c] = d;
        I("player-added", d.k);
        Ab(d, oa(mi, d));
        G(function() {
            d.qc(b)
        }, 0);
        return d.k
    }

    function ni() {
        for (var a in ji) {
            var b = ji[a];
            b && b.cancel()
        }
    }

    function oi(a) {
        if (a = Nc(a)) a = ki + "_" + ia(a), (a = ji[a]) && a.dispose()
    }

    function mi(a) {
        ji[a.W] = null
    }

    function pi(a) {
        a = Nc(a);
        if (!a) return null;
        var b = ki + "_" + ia(a),
            c = ji[b];
        c || (c = new Wh(a, b), ji[b] = c);
        return c.k
    };
    var qi = r("yt.abuse.botguardInitialized") || fc;
    q("yt.abuse.botguardInitialized", qi, void 0);
    var ri = r("yt.abuse.invokeBotguard") || gc;
    q("yt.abuse.invokeBotguard", ri, void 0);
    var si = r("yt.player.exports.navigate") || Gd;
    q("yt.player.exports.navigate", si, void 0);
    var ti = r("yt.player.embed") || li;
    q("yt.player.embed", ti, void 0);
    var ui = r("yt.player.destroy") || oi;
    q("yt.player.destroy", ui, void 0);
    var vi = r("yt.player.cancelAll") || ni;
    q("yt.player.cancelAll", vi, void 0);
    var wi = r("yt.player.getPlayerByElement") || pi;
    q("yt.player.getPlayerByElement", wi, void 0);
    var xi = r("yt.player.exports.feedbackStart") || qf;
    q("yt.player.exports.feedbackStart", xi, void 0);
    var yi = r("yt.player.exports.feedbackShowArticle") || rf;
    q("yt.player.exports.feedbackShowArticle", yi, void 0);
    var zi = r("yt.util.activity.init") || md;
    q("yt.util.activity.init", zi, void 0);
    var Ai = r("yt.util.activity.getTimeSinceActive") || od;
    q("yt.util.activity.getTimeSinceActive", Ai, void 0);
    var Bi = r("yt.util.activity.setTimestamp") || nd;
    q("yt.util.activity.setTimestamp", Bi, void 0);

    function Ci(a) {
        N.call(this, 1, arguments);
        this.j = a
    }
    y(Ci, N);

    function Di(a) {
        N.call(this, 1, arguments);
        this.j = a
    }
    y(Di, N);

    function Ei(a, b, c) {
        N.call(this, 1, arguments);
        this.k = a;
        this.isEnabled = b;
        this.j = c || null
    }
    y(Ei, N);

    function Fi(a, b) {
        N.call(this, 1, arguments);
        this.j = a;
        this.isEnabled = b
    }
    y(Fi, N);

    function Gi(a, b, c, d, e) {
        N.call(this, 2, arguments);
        this.k = a;
        this.j = b;
        this.B = c || null;
        this.o = d || null;
        this.source = e || null
    }
    y(Gi, N);

    function Hi(a, b, c) {
        N.call(this, 1, arguments);
        this.j = a;
        this.bb = b
    }
    y(Hi, N);

    function Ii(a, b, c, d, e, f, h) {
        N.call(this, 1, arguments);
        this.k = a;
        this.bb = b;
        this.j = c;
        this.A = d || null;
        this.B = e || null;
        this.o = f || null;
        this.source = h || null
    }
    y(Ii, N);
    var Ji = new O("subscription-batch-pref-email", Ei),
        Ki = new O("subscription-batch-pref-uploads", Ei),
        Li = new O("subscription-batch-subscribe", Ci),
        Mi = new O("subscription-batch-unsubscribe", Ci),
        Ni = new O("subscription-pref-email", Fi),
        Oi = new O("subscription-pref-uploads", Fi),
        Pi = new O("subscription-subscribe", Gi),
        Qi = new O("subscription-subscribe-loading", Di),
        Ri = new O("subscription-subscribe-loaded", Di),
        Si = new O("subscription-subscribe-success", Hi),
        Ti = new O("subscription-subscribe-external", Gi),
        Ui = new O("subscription-unsubscribe",
            Ii),
        Vi = new O("subscription-unsubscirbe-loading", Di),
        Wi = new O("subscription-unsubscribe-loaded", Di),
        Xi = new O("subscription-unsubscribe-success", Di),
        Yi = new O("subscription-external-unsubscribe", Ii),
        Zi = new O("subscription-enable-ypc", Di),
        $i = new O("subscription-disable-ypc", Di);

    function aj(a, b, c) {
        var d = document.location.protocol + "//" + document.domain + "/post_login";
        b && (d = zd(d, "mode", b));
        b = zd("/signin?context=popup", "next", d);
        c && (b = zd(b, "feature", c));
        if (c = window.open(b, "loginPopup", "width=375,height=440,resizable=yes,scrollbars=yes", !0)) b = Rb("LOGGED_IN", function(b) {
            Tb(F("LOGGED_IN_PUBSUB_KEY"));
            Fb("LOGGED_IN", !0);
            a(b)
        }), Fb("LOGGED_IN_PUBSUB_KEY", b), c.moveTo((screen.width - 375) / 2, (screen.height - 440) / 2)
    }
    q("yt.pubsub.publish", I, void 0);
    var bj = null;
    "undefined" != typeof XMLHttpRequest ? bj = function() {
        return new XMLHttpRequest
    } : "undefined" != typeof ActiveXObject && (bj = function() {
        return new ActiveXObject("Microsoft.XMLHTTP")
    });

    function cj(a, b, c, d, e, f, h) {
        function k() {
            4 == (l && "readyState" in l ? l.readyState : 0) && b && Hb(b)(l)
        }
        var l = bj && bj();
        if (!("open" in l)) return null;
        "onloadend" in l ? l.addEventListener("loadend", k, !1) : l.onreadystatechange = k;
        c = (c || "GET").toUpperCase();
        d = d || "";
        l.open(c, a, !0);
        f && (l.responseType = f);
        h && (l.withCredentials = !0);
        f = "POST" == c;
        if (e = dj(a, e))
            for (var n in e) l.setRequestHeader(n, e[n]), "content-type" == n.toLowerCase() && (f = !1);
        f && l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        l.send(d);
        return l
    }

    function dj(a, b) {
        b = b || {};
        for (var c in ej) {
            var d = F(ej[c]),
                e;
            if (e = d) {
                e = a;
                var f = void 0;
                f = window.location.href;
                var h = qd(e)[1] || null,
                    k = Cd(e);
                h && k ? (e = qd(e), f = qd(f), e = e[3] == f[3] && e[1] == f[1] && e[4] == f[4]) : e = k ? Cd(f) == k && (Number(qd(f)[4] || null) || null) == (Number(qd(e)[4] || null) || null) : !0;
                e || (e = c, f = F("CORS_HEADER_WHITELIST") || {}, e = (h = Cd(a)) ? (f = f[h]) ? Ha(f, e) : !1 : !0)
            }
            e && (b[c] = d)
        }
        return b
    }

    function fj(a, b) {
        var c = F("XSRF_FIELD_NAME"),
            d;
        b.headers && (d = b.headers["Content-Type"]);
        return !b.rf && (!Cd(a) || Cd(a) == document.location.hostname) && "POST" == b.method && (!d || "application/x-www-form-urlencoded" == d) && !(b.S && b.S[c])
    }

    function gj(a, b) {
        var c = b.format || "JSON";
        b.tf && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);
        var d = F("XSRF_FIELD_NAME"),
            e = F("XSRF_TOKEN"),
            f = b.nc;
        f && (f[d] && delete f[d], a = Dd(a, f));
        var h = b.uf || "",
            f = b.S;
        fj(a, b) && (f || (f = {}), f[d] = e);
        f && u(h) && (d = Bd(h), ib(d, f), h = yd(d));
        var k = !1,
            l, n = cj(a, function(a) {
                if (!k) {
                    k = !0;
                    l && H(l);
                    var d;
                    t: switch (a && "status" in a ? a.status : -1) {
                        case 200:
                        case 201:
                        case 202:
                        case 203:
                        case 204:
                        case 205:
                        case 206:
                        case 304:
                            d = !0;
                            break t;
                        default:
                            d = !1
                    }
                    var e = null;
                    if (d || 400 <= a.status && 500 > a.status) e = hj(c, a, b.pf);
                    if (d) t: {
                        switch (c) {
                            case "XML":
                                d = 0 == parseInt(e && e.return_code, 10);
                                break t;
                            case "RAW":
                                d = !0;
                                break t
                        }
                        d = !!e
                    }
                    var e = e || {},
                        f = b.context || m;
                    d ? b.ca && b.ca.call(f, a, e) : b.onError && b.onError.call(f, a, e);
                    b.gc && b.gc.call(f, a, e)
                }
            }, b.method, h, b.headers, b.responseType, b.withCredentials);
        b.Eb && 0 < b.timeout && (l = G(function() {
            k || (k = !0, n.abort(), H(l), b.Eb.call(b.context || m, n))
        }, b.timeout));
        return n
    }

    function hj(a, b, c) {
        var d = null;
        switch (a) {
            case "JSON":
                a = b.responseText;
                b = b.getResponseHeader("Content-Type") || "";
                a && 0 <= b.indexOf("json") && (d = zh(a));
                break;
            case "XML":
                if (b = (b = b.responseXML) ? ij(b) : null) d = {}, A(b.getElementsByTagName("*"), function(a) {
                    d[a.tagName] = jj(a)
                })
        }
        if (c)
            for (var e in d)
                if ("html_content" == e || ra(e)) d[e] = Hd(lb(), d[e]);
        return d
    }

    function ij(a) {
        return a ? (a = ("responseXML" in a ? a.responseXML : a).getElementsByTagName("root")) && 0 < a.length ? a[0] : null : null
    }

    function jj(a) {
        var b = "";
        A(a.childNodes, function(a) {
            b += a.nodeValue
        });
        return b
    }
    var ej = {
        "X-YouTube-Page-CL": "PAGE_CL",
        "X-YouTube-Page-Timestamp": "PAGE_BUILD_TIMESTAMP",
        "X-YouTube-Variants-Checksum": "VARIANTS_CHECKSUM"
    };

    function kj() {
        var a = F("PLAYER_CONFIG");
        return a && a.args && void 0 !== a.args.authuser ? !0 : !(!F("SESSION_INDEX") && !F("LOGGED_IN"))
    };
    var lj = {},
        mj = "ontouchstart" in document;

    function nj(a, b, c) {
        var d;
        switch (a) {
            case "mouseover":
            case "mouseout":
                d = 3;
                break;
            case "mouseenter":
            case "mouseleave":
                d = 9
        }
        return Xc(c, function(a) {
            return ic(a, b)
        }, !0, d)
    }

    function oj(a) {
        var b = "mouseover" == a.type && "mouseenter" in lj || "mouseout" == a.type && "mouseleave" in lj,
            c = a.type in lj || b;
        if ("HTML" != a.target.tagName && c) {
            if (b) {
                var b = "mouseover" == a.type ? "mouseenter" : "mouseleave",
                    c = lj[b],
                    d;
                for (d in c.ea) {
                    var e = nj(b, d, a.target);
                    e && !Xc(a.relatedTarget, function(a) {
                        return a == e
                    }, !0) && c.publish(d, e, b, a)
                }
            }
            if (b = lj[a.type])
                for (d in b.ea)(e = nj(a.type, d, a.target)) && b.publish(d, e, a.type, a)
        }
    }
    L(document, "blur", oj, !0);
    L(document, "change", oj, !0);
    L(document, "click", oj);
    L(document, "focus", oj, !0);
    L(document, "mouseover", oj);
    L(document, "mouseout", oj);
    L(document, "mousedown", oj);
    L(document, "keydown", oj);
    L(document, "keyup", oj);
    L(document, "keypress", oj);
    L(document, "cut", oj);
    L(document, "paste", oj);
    mj && (L(document, "touchstart", oj), L(document, "touchend", oj), L(document, "touchcancel", oj));

    function pj() {
        this.k = {};
        this.Yc = [];
        this.o = []
    }

    function qj(a, b) {
        return "yt-uix" + (a.Wb ? "-" + a.Wb : "") + (b ? "-" + b : "")
    }
    pj.prototype.init = t;
    pj.prototype.dispose = t;

    function rj(a, b, c) {
        a.o.push(dh(b, c, a))
    }

    function sj(a, b, c) {
        var d = qj(a, void 0),
            e = v(c, a);
        b in lj || (lj[b] = new E);
        lj[b].subscribe(d, e);
        a.k[c] = e
    }

    function tj(a, b) {
        xb(a, "tooltip-text", b)
    }
    pj.prototype.removeData = function(a, b) {
        a && (a.dataset ? delete a.dataset[yb(b)] : a.removeAttribute("data-" + b))
    };

    function uj() {
        pj.call(this);
        this.j = {}
    }
    y(uj, pj);
    ba(uj);
    g = uj.prototype;
    g.Wb = "tooltip";
    g.Bb = 0;
    g.register = function() {
        sj(this, "mouseover", this.Ic);
        sj(this, "mouseout", this.Cb);
        sj(this, "click", this.Cb);
        sj(this, "touchstart", this.Pe);
        sj(this, "touchend", this.gd);
        sj(this, "touchcancel", this.gd)
    };
    g.dispose = function() {
        for (var a in this.j) this.Cb(this.j[a]);
        this.j = {}
    };
    g.Ic = function(a) {
        if (!(this.Bb && 1E3 > w() - this.Bb)) {
            var b = parseInt(C(a, "tooltip-hide-timer"), 10);
            b && (this.removeData(a, "tooltip-hide-timer"), H(b));
            var b = v(function() {
                    vj(this, a);
                    this.removeData(a, "tooltip-show-timer")
                }, this),
                c = parseInt(C(a, "tooltip-show-delay"), 10) || 0,
                b = G(b, c);
            xb(a, "tooltip-show-timer", b.toString());
            a.title && (tj(a, wj(a)), a.title = "");
            b = ia(a).toString();
            this.j[b] = a
        }
    };
    g.Cb = function(a) {
        var b = parseInt(C(a, "tooltip-show-timer"), 10);
        b && (H(b), this.removeData(a, "tooltip-show-timer"));
        b = v(function() {
            if (a) {
                var b = Nc(xj(this, a));
                b && (yj(b), b && b.parentNode && b.parentNode.removeChild(b), this.removeData(a, "content-id"))
            }
            this.removeData(a, "tooltip-hide-timer")
        }, this);
        b = G(b, 50);
        xb(a, "tooltip-hide-timer", b.toString());
        if (b = C(a, "tooltip-text")) a.title = b;
        b = ia(a).toString();
        delete this.j[b]
    };
    g.Pe = function(a, b) {
        this.Bb = 0;
        var c = nj(b, qj(this), null[0].target);
        this.Ic(c)
    };
    g.gd = function(a, b) {
        this.Bb = w();
        var c = nj(b, qj(this), null[0].target);
        this.Cb(c)
    };

    function zj(a, b) {
        tj(a, b);
        var c = C(a, "content-id");
        if (c = Nc(c))
            if ("textContent" in c) c.textContent = b;
            else if (3 == c.nodeType) c.data = b;
        else if (c.firstChild && 3 == c.firstChild.nodeType) {
            for (; c.lastChild != c.firstChild;) c.removeChild(c.lastChild);
            c.firstChild.data = b
        } else {
            Sc(c);
            var d = Mc(c);
            c.appendChild(d.createTextNode(String(b)))
        }
    }

    function wj(a) {
        return C(a, "tooltip-text") || a.title
    }

    function vj(a, b) {
        if (b) {
            var c = wj(b);
            if (c) {
                var d = Nc(xj(a, b));
                if (!d) {
                    d = document.createElement("div");
                    d.id = xj(a, b);
                    d.className = qj(a, "tip");
                    var e = document.createElement("div");
                    e.className = qj(a, "tip-body");
                    var f = document.createElement("div");
                    f.className = qj(a, "tip-arrow");
                    var h = document.createElement("div");
                    h.className = qj(a, "tip-content");
                    var k = Aj(a, b),
                        l = xj(a, b, "content");
                    h.id = l;
                    xb(b, "content-id", l);
                    e.appendChild(h);
                    k && d.appendChild(k);
                    d.appendChild(e);
                    d.appendChild(f);
                    (ad() || document.body).appendChild(d);
                    zj(b, c);
                    (c = parseInt(C(b, "tooltip-max-width"), 10)) && e.offsetWidth > c && (e.style.width = c + "px", jc(h, qj(a, "normal-wrap")));
                    h = ic(b, qj(a, "reverse"));
                    Bj(a, b, d, e, k, h) || Bj(a, b, d, e, k, !h);
                    var n = qj(a, "tip-visible");
                    G(function() {
                        jc(d, n)
                    }, 0)
                }
            }
        }
    }

    function Bj(a, b, c, d, e, f) {
        lc(c, qj(a, "tip-reverse"), f);
        var h = 0;
        f && (h = 1);
        a = df(b);
        f = new mc((a.width - 10) / 2, f ? a.height : 0);
        var k = Mc(b),
            l = new mc(0, 0),
            n;
        n = k ? Mc(k) : document;
        var x;
        (x = !K || Gc(9)) || (x = Kc(n), x = Rc(x.j));
        b != (x ? n.documentElement : n.body) && (n = bf(b), x = Kc(k).j, k = !yc && Rc(x) ? x.documentElement : x.body || x.documentElement, x = x.parentWindow || x.defaultView, k = K && Fc("10") && x.pageYOffset != k.scrollTop ? new mc(k.scrollLeft, k.scrollTop) : new mc(x.pageXOffset || k.scrollLeft, x.pageYOffset || k.scrollTop), l.x = n.left + k.x, l.y =
            n.top + k.y);
        f = new mc(l.x + f.x, l.y + f.y);
        f = f.clone();
        l = (h & 4 && "rtl" == af(c, "direction") ? h ^ 2 : h) & -5;
        h = df(c);
        n = h.clone();
        k = f.clone();
        n = n.clone();
        0 != l && (l & 2 && (k.x -= n.width + 0), l & 1 && (k.y -= n.height + 0));
        f = new Ze(0, 0, 0, 0);
        f.left = k.x;
        f.top = k.y;
        f.width = n.width;
        f.height = n.height;
        n = new mc(f.left, f.top);
        n instanceof mc ? (l = n.x, n = n.y) : (l = n, n = void 0);
        c.style.left = cf(l, !1);
        c.style.top = cf(n, !1);
        n = new nc(f.width, f.height);
        if (!(h == n || h && n && h.width == n.width && h.height == n.height))
            if (h = n, f = Mc(c), f = Kc(f), l = Rc(f.j), !K || Fc("10") ||
                l && Fc("8")) f = c.style, xc ? f.MozBoxSizing = "border-box" : yc ? f.WebkitBoxSizing = "border-box" : f.boxSizing = "border-box", f.width = Math.max(h.width, 0) + "px", f.height = Math.max(h.height, 0) + "px";
            else if (f = c.style, l) {
            K ? (l = gf(c, "paddingLeft"), n = gf(c, "paddingRight"), k = gf(c, "paddingTop"), x = gf(c, "paddingBottom"), l = new Ye(k, n, x, l)) : (l = $e(c, "paddingLeft"), n = $e(c, "paddingRight"), k = $e(c, "paddingTop"), x = $e(c, "paddingBottom"), l = new Ye(parseFloat(k), parseFloat(n), parseFloat(x), parseFloat(l)));
            if (K && !Gc(9)) {
                n = jf(c, "borderLeft");
                k = jf(c, "borderRight");
                x = jf(c, "borderTop");
                var Z = jf(c, "borderBottom");
                n = new Ye(x, k, Z, n)
            } else n = $e(c, "borderLeftWidth"), k = $e(c, "borderRightWidth"), x = $e(c, "borderTopWidth"), Z = $e(c, "borderBottomWidth"), n = new Ye(parseFloat(x), parseFloat(k), parseFloat(Z), parseFloat(n));
            f.pixelWidth = h.width - n.left - l.left - l.right - n.right;
            f.pixelHeight = h.height - n.top - l.top - l.bottom - n.bottom
        } else f.pixelWidth = h.width, f.pixelHeight = h.height;
        h = window.document;
        h = Rc(h) ? h.documentElement : h.body;
        h = new nc(h.clientWidth, h.clientHeight);
        1 == c.nodeType ? (c = bf(c), n = new mc(c.left, c.top)) : (f = ga(c.k), l = c, c.targetTouches && c.targetTouches.length ? l = c.targetTouches[0] : f && c.j.targetTouches && c.j.targetTouches.length && (l = c.j.targetTouches[0]), n = new mc(l.clientX, l.clientY));
        c = df(d);
        k = Math.floor(c.width / 2);
        f = !!(h.height < n.y + a.height);
        a = !!(n.y < a.height);
        l = !!(n.x < k);
        h = !!(h.width < n.x + k);
        n = (c.width + 3) / -2 - -5;
        b = C(b, "force-tooltip-direction");
        if ("left" == b || l) n = -5;
        else if ("right" == b || h) n = 20 - c.width - 3;
        b = Math.floor(n) + "px";
        d.style.left = b;
        e && (e.style.left =
            b, e.style.height = c.height + "px", e.style.width = c.width + "px");
        return !(f || a)
    }

    function xj(a, b, c) {
        a = qj(a);
        var d = b.__yt_uid_key;
        d || (d = Zc(), b.__yt_uid_key = d);
        b = a + d;
        c && (b += "-" + c);
        return b
    }

    function Aj(a, b) {
        var c = null;
        Ac && ic(b, qj(a, "masked")) && ((c = Nc("yt-uix-tooltip-shared-mask")) ? (c.parentNode.removeChild(c), lf(c)) : (c = document.createElement("iframe"), c.src = 'javascript:""', c.id = "yt-uix-tooltip-shared-mask", c.className = qj(a, "tip-mask")));
        return c
    }

    function yj(a) {
        var b = Nc("yt-uix-tooltip-shared-mask"),
            c = b && Xc(b, function(b) {
                return b == a
            }, !1, 2);
        b && c && (b.parentNode.removeChild(b), mf(b), document.body.appendChild(b))
    };

    function Cj() {
        pj.call(this)
    }
    y(Cj, pj);
    ba(Cj);
    Cj.prototype.Wb = "subscription-button";
    Cj.prototype.register = function() {
        sj(this, "click", this.Bc);
        rj(this, Qi, this.Mc);
        rj(this, Ri, this.Lc);
        rj(this, Si, this.qe);
        rj(this, Vi, this.Mc);
        rj(this, Wi, this.Lc);
        rj(this, Xi, this.ve);
        rj(this, Zi, this.ae);
        rj(this, $i, this.$d)
    };
    var Wc = {
            sc: "hover-enabled",
            pd: "yt-uix-button-subscribe",
            qd: "yt-uix-button-subscribed",
            df: "ypc-enabled",
            rd: "yt-uix-button-subscription-container",
            sd: "yt-subscription-button-disabled-mask-container"
        },
        Dj = {
            ef: "channel-external-id",
            ud: "subscriber-count-show-when-subscribed",
            vd: "subscriber-count-tooltip",
            wd: "subscriber-count-title",
            ff: "href",
            tc: "is-subscribed",
            hf: "parent-url",
            kf: "sessionlink",
            xd: "style-type",
            uc: "subscription-id",
            nf: "target",
            yd: "ypc-enabled"
        };
    g = Cj.prototype;
    g.Bc = function(a) {
        var b = C(a, "href"),
            c = kj();
        if (b) a = C(a, "target") || "_self", window.open(b, a);
        else if (c) {
            var b = C(a, "channel-external-id"),
                c = C(a, "sessionlink"),
                d;
            if (C(a, "ypc-enabled")) {
                d = C(a, "ypc-item-type");
                var e = C(a, "ypc-item-id");
                d = {
                    itemType: d,
                    itemId: e,
                    subscriptionElement: a
                }
            } else d = null;
            e = C(a, "parent-url");
            if (C(a, "is-subscribed")) {
                var f = C(a, "subscription-id");
                P(Ui, new Ii(b, f, d, a, c, e))
            } else P(Pi, new Gi(b, d, c, e))
        } else Ej(this, a)
    };
    g.Mc = function(a) {
        this.Wa(a.j, this.cd, !0)
    };
    g.Lc = function(a) {
        this.Wa(a.j, this.cd, !1)
    };
    g.qe = function(a) {
        this.Wa(a.j, this.ed, !0, a.bb)
    };
    g.ve = function(a) {
        this.Wa(a.j, this.ed, !1)
    };
    g.ae = function(a) {
        this.Wa(a.j, this.Fd)
    };
    g.$d = function(a) {
        this.Wa(a.j, this.Ed)
    };
    g.ed = function(a, b, c) {
        b ? (xb(a, Dj.tc, "true"), c && xb(a, Dj.uc, c)) : (this.removeData(a, Dj.tc), this.removeData(a, Dj.uc));
        Fj(a)
    };
    g.cd = function(a, b) {
        var c;
        c = Vc(a);
        lc(c, Wc.sd, b);
        a.setAttribute("aria-busy", b ? "true" : "false");
        a.disabled = b
    };

    function Fj(a) {
        var b = C(a, Dj.xd),
            c = !!C(a, "is-subscribed"),
            b = "-" + b,
            d = Wc.qd + b;
        lc(a, Wc.pd + b, !c);
        lc(a, d, c);
        C(a, Dj.vd) && !C(a, Dj.ud) && (b = qj(uj.getInstance()), lc(a, b, !c), a.title = c ? "" : C(a, Dj.wd));
        c ? G(function() {
            jc(a, Wc.sc)
        }, 1E3) : kc(a, Wc.sc)
    }
    g.Fd = function(a) {
        var b = !!C(a, "ypc-item-type"),
            c = !!C(a, "ypc-item-id");
        !C(a, "ypc-enabled") && b && c && (jc(a, "ypc-enabled"), xb(a, Dj.yd, "true"))
    };
    g.Ed = function(a) {
        C(a, "ypc-enabled") && (kc(a, "ypc-enabled"), this.removeData(a, "ypc-enabled"))
    };

    function Gj(a, b) {
        var c = Pc(qj(a));
        return Ca(c, function(a) {
            return b == C(a, "channel-external-id")
        }, a)
    }
    g.Bd = function(a, b, c) {
        var d = Ra(arguments, 2);
        A(a, function(a) {
            b.apply(this, Na(a, d))
        }, this)
    };
    g.Wa = function(a, b, c) {
        var d = Gj(this, a),
            d = Na([d], Ra(arguments, 1));
        this.Bd.apply(this, d)
    };

    function Ej(a, b) {
        var c = v(function(a) {
            a.discoverable_subscriptions && Fb("SUBSCRIBE_EMBED_DISCOVERABLE_SUBSCRIPTIONS", a.discoverable_subscriptions);
            this.Bc(b)
        }, a);
        aj(c, "subscribe", "sub_button")
    };
    var Hj = window.yt && window.yt.uix && window.yt.uix.widgets_ || {};
    q("yt.uix.widgets_", Hj, void 0);

    function Ij(a) {
        return (0 == a.search("cue") || 0 == a.search("load")) && "loadModule" != a
    }

    function Jj(a, b, c) {
        u(a) && (a = {
            mediaContentUrl: a,
            startSeconds: b,
            suggestedQuality: c
        });
        b = a;
        c = /\/([ve]|embed)\/([^#?]+)/.exec(a.mediaContentUrl);
        b.videoId = c && c[2] ? c[2] : null;
        return Kj(a)
    }

    function Kj(a, b, c) {
        if (ha(a)) {
            b = "endSeconds startSeconds mediaContentUrl suggestedQuality videoId two_stage_token".split(" ");
            c = {};
            for (var d = 0; d < b.length; d++) {
                var e = b[d];
                a[e] && (c[e] = a[e])
            }
            return c
        }
        return {
            videoId: a,
            startSeconds: b,
            suggestedQuality: c
        }
    }

    function Lj(a, b, c, d) {
        if (ha(a) && !da(a)) {
            b = "playlist list listType index startSeconds suggestedQuality".split(" ");
            c = {};
            for (d = 0; d < b.length; d++) {
                var e = b[d];
                a[e] && (c[e] = a[e])
            }
            return c
        }
        c = {
            index: b,
            startSeconds: c,
            suggestedQuality: d
        };
        u(a) && 16 == a.length ? c.list = "PL" + a : c.playlist = a;
        return c
    }

    function Mj(a) {
        var b = a.video_id || a.videoId;
        if (u(b)) {
            var c = T("yt-player-two-stage-token") || {},
                d = T("yt-player-two-stage-token") || {};
            p(void 0) ? d[b] = void 0 : delete d[b];
            S("yt-player-two-stage-token", d, 300);
            (b = c[b]) && (a.two_stage_token = b)
        }
    };
    var Nj = w(),
        Oj = null,
        Pj = Array(50),
        Qj = -1,
        Rj = !1;

    function Sj(a) {
        Tj();
        Oj.push(a);
        Uj(Oj)
    }

    function Vj(a) {
        var b = r("yt.mdx.remote.debug.handlers_");
        La(b || [], a)
    }

    function Wj(a, b) {
        Tj();
        var c = Oj,
            d = Xj(a, String(b));
        0 == c.length ? Yj(d) : (Uj(c), A(c, function(a) {
            a(d)
        }))
    }

    function Tj() {
        Oj || (Oj = r("yt.mdx.remote.debug.handlers_") || [], q("yt.mdx.remote.debug.handlers_", Oj, void 0))
    }

    function Yj(a) {
        var b = (Qj + 1) % 50;
        Qj = b;
        Pj[b] = a;
        Rj || (Rj = 49 == b)
    }

    function Uj(a) {
        var b = Pj;
        if (b[0]) {
            var c = Qj,
                d = Rj ? c : -1;
            do {
                var d = (d + 1) % 50,
                    e = b[d];
                A(a, function(a) {
                    a(e)
                })
            } while (d != c);
            Pj = Array(50);
            Qj = -1;
            Rj = !1
        }
    }

    function Xj(a, b) {
        var c = (w() - Nj) / 1E3;
        c.toFixed && (c = c.toFixed(3));
        var d = [];
        d.push("[", c + "s", "] ");
        d.push("[", "yt.mdx.remote", "] ");
        d.push(a + ": " + b, "\n");
        return d.join("")
    };

    function Zj(a) {
        a = a || {};
        this.name = a.name || "";
        this.id = a.id || a.screenId || "";
        this.token = a.token || a.loungeToken || "";
        this.uuid = a.uuid || a.dialId || ""
    }

    function ak(a, b) {
        return !!b && (a.id == b || a.uuid == b)
    }

    function bk(a, b) {
        return a || b ? !a != !b ? !1 : a.id == b.id : !0
    }

    function ck(a, b) {
        return a || b ? !a != !b ? !1 : a.id == b.id && a.token == b.token && a.name == b.name && a.uuid == b.uuid : !0
    }

    function dk(a) {
        return {
            name: a.name,
            screenId: a.id,
            loungeToken: a.token,
            dialId: a.uuid
        }
    }

    function ek(a) {
        return new Zj(a)
    }

    function fk(a) {
        return da(a) ? B(a, ek) : []
    }

    function gk(a) {
        return a ? '{name:"' + a.name + '",id:' + a.id.substr(0, 6) + "..,token:" + (a.token ? ".." + a.token.slice(-6) : "-") + ",uuid:" + (a.uuid ? ".." + a.uuid.slice(-6) : "-") + "}" : "null"
    }

    function hk(a) {
        return da(a) ? "[" + B(a, gk).join(",") + "]" : "null"
    };
    var ik = ["boadgeojelhgndaghljhdicfkmllpafd", "dliochdbjfkdbacpmhlcpmleaejidimm", "hfaagokkkhdbgiakmmlclaapfelnkoah", "fmfcbgogabcbclcofgocippekhfcmgfj", "enhhojjnijigcajfphajepfemndkmdlo"];

    function jk(a, b) {
        a == ik.length ? b(null) : kk(ik[a], function(c) {
            c ? (c = ik[a], S("yt-remote-cast-last-extension", c), b(c)) : jk(a + 1, b)
        })
    }

    function lk(a) {
        return "chrome-extension://" + a + "/cast_sender.js"
    }

    function kk(a, b) {
        var c = new XMLHttpRequest;
        c.onreadystatechange = function() {
            4 == c.readyState && 200 == c.status && b(!0)
        };
        c.onerror = function() {
            b(!1)
        };
        try {
            //c.open("GET", lk(a), !0), c.send()
        } catch (d) {
            b(!1)
        }
    }

    function mk(a) {
        window.__onGCastApiAvailable = a;
        nk(function(b) {
            if (b) {
                Wj("bootstrap", "Found cast extension: " + b);
                q("chrome.cast.extensionId", b, void 0);
                var c = document.createElement("script");
                c.src = lk(b);
                c.onerror = function() {
                    ok();
                    Sh("yt-remote-cast-last-extension");
                    a(!1, "Extension JS failed to load.")
                };
                (document.head || document.documentElement).appendChild(c)
            } else Wj("bootstrap", "No cast extension found"), a(!1, "No cast extension found")
        })
    }

    function ok() {
        window.__onGCastApiAvailable && delete window.__onGCastApiAvailable
    }

    function nk(a) {
        var b = T("yt-remote-cast-last-extension");
        b ? a(b) : jk(0, a)
    };
    var pk = {
        mf: "ska",
        jf: "que",
        gf: "mus",
        lf: "sus"
    };

    function qk(a) {
        this.port = this.o = "";
        this.j = "/api/lounge";
        this.k = !0;
        a = a || document.location.href;
        var b = Number(qd(a)[4] || null) || null || "";
        b && (this.port = ":" + b);
        this.o = sd(a) || "";
        a = oc;
        0 <= a.search("MSIE") && (a = a.match(/MSIE ([\d.]+)/)[1], 0 > xa(a, "10.0") && (this.k = !1))
    }

    function rk(a, b, c, d) {
        var e = a.j;
        if (p(d) ? d : a.k) e = "https://" + a.o + a.port + a.j;
        return Ad(e + b, c || {})
    }
    qk.prototype.sendRequest = function(a, b, c, d, e, f, h) {
        a = {
            format: f ? "RAW" : "JSON",
            method: a,
            context: this,
            timeout: 5E3,
            withCredentials: !!h,
            ca: oa(this.A, d, !f),
            onError: oa(this.B, e),
            Eb: oa(this.C, e)
        };
        c && (a.S = c, a.headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        });
        return gj(b, a)
    };
    qk.prototype.A = function(a, b, c, d) {
        b ? a(d) : a({
            text: c.responseText
        })
    };
    qk.prototype.B = function(a, b) {
        a(Error("Request error: " + b.status))
    };
    qk.prototype.C = function(a) {
        a(Error("request timed out"))
    };

    function sk(a) {
        a && (this.id = a.id || "", this.name = a.name || "", this.activityId = a.activityId || "", this.status = a.status || "UNKNOWN")
    }
    sk.prototype.id = "";
    sk.prototype.name = "";
    sk.prototype.activityId = "";
    sk.prototype.status = "UNKNOWN";

    function tk(a) {
        return {
            id: a.id,
            name: a.name,
            activityId: a.activityId,
            status: a.status
        }
    }
    sk.prototype.toString = function() {
        return "{id:" + this.id + ",name:" + this.name + ",activityId:" + this.activityId + ",status:" + this.status + "}"
    };

    function uk(a) {
        a = a || [];
        return "[" + B(a, function(a) {
            return a ? a.toString() : "null"
        }).join(",") + "]"
    };

    function vk() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 16 * Math.random() | 0;
            return ("x" == a ? b : b & 3 | 8).toString(16)
        })
    }

    function wk(a, b) {
        return Fa(a, function(a) {
            return a.key == b
        })
    }

    function xk(a) {
        return B(a, function(a) {
            return {
                key: a.id,
                name: a.name
            }
        })
    }

    function yk(a) {
        return B(a, function(a) {
            return tk(a)
        })
    }

    function zk(a) {
        return B(a, function(a) {
            return new sk(a)
        })
    }

    function Ak(a, b) {
        return a || b ? a && b ? a.id == b.id && a.name == b.name : !1 : !0
    }

    function Bk(a, b) {
        return Fa(a, function(a) {
            return a.id == b
        })
    }

    function Ck(a, b) {
        return Fa(a, function(a) {
            return bk(a, b)
        })
    }

    function Dk(a, b) {
        return Fa(a, function(a) {
            return ak(a, b)
        })
    };

    function U() {
        D.call(this);
        this.B = new E;
        Ab(this, oa(Bb, this.B))
    }
    y(U, D);
    U.prototype.subscribe = function(a, b, c) {
        return this.J() ? 0 : this.B.subscribe(a, b, c)
    };
    U.prototype.unsubscribe = function(a, b, c) {
        return this.J() ? !1 : this.B.unsubscribe(a, b, c)
    };
    U.prototype.pa = function(a) {
        return this.J() ? !1 : this.B.pa(a)
    };
    U.prototype.publish = function(a, b) {
        return this.J() ? !1 : this.B.publish.apply(this.B, arguments)
    };

    function Ek(a) {
        U.call(this);
        this.F = a;
        this.screens = []
    }
    y(Ek, U);
    g = Ek.prototype;
    g.aa = function() {
        return this.screens
    };
    g.contains = function(a) {
        return !!Ck(this.screens, a)
    };
    g.get = function(a) {
        return a ? Dk(this.screens, a) : null
    };

    function Fk(a, b) {
        var c = a.get(b.uuid) || a.get(b.id);
        if (c) {
            var d = c.name;
            c.id = b.id || c.id;
            c.name = b.name;
            c.token = b.token;
            c.uuid = b.uuid || c.uuid;
            return c.name != d
        }
        a.screens.push(b);
        return !0
    }

    function Gk(a, b) {
        var c = a.screens.length != b.length;
        a.screens = Ca(a.screens, function(a) {
            return !!Ck(b, a)
        });
        for (var d = 0, e = b.length; d < e; d++) c = Fk(a, b[d]) || c;
        return c
    }

    function Hk(a, b) {
        var c = a.screens.length;
        a.screens = Ca(a.screens, function(a) {
            return !bk(a, b)
        });
        return a.screens.length < c
    }
    g.info = function(a) {
        Wj(this.F, a)
    };
    g.warn = function(a) {
        Wj(this.F, a)
    };

    function Ik(a, b, c, d) {
        U.call(this);
        this.H = a;
        this.F = b;
        this.A = c;
        this.C = d;
        this.o = 0;
        this.j = null;
        this.k = NaN
    }
    y(Ik, U);
    var Jk = [2E3, 2E3, 1E3, 1E3, 1E3, 2E3, 2E3, 5E3, 5E3, 1E4];
    g = Ik.prototype;
    g.start = function() {
        !this.j && isNaN(this.k) && this.Xc()
    };
    g.stop = function() {
        this.j && (this.j.abort(), this.j = null);
        isNaN(this.k) || (H(this.k), this.k = NaN)
    };
    g.G = function() {
        this.stop();
        Ik.K.G.call(this)
    };
    g.Xc = function() {
        this.k = NaN;
        this.j = gj(rk(this.H, "/pairing/get_screen"), {
            method: "POST",
            S: {
                pairing_code: this.F
            },
            timeout: 5E3,
            ca: v(this.We, this),
            onError: v(this.Ve, this),
            Eb: v(this.Xe, this)
        })
    };
    g.We = function(a, b) {
        this.j = null;
        var c = b.screen || {};
        c.dialId = this.A;
        c.name = this.C;
        this.publish("pairingComplete", new Zj(c))
    };
    g.Ve = function(a) {
        this.j = null;
        a.status && 404 == a.status ? this.o >= Jk.length ? this.publish("pairingFailed", Error("DIAL polling timed out")) : (a = Jk[this.o], this.k = G(v(this.Xc, this), a), this.o++) : this.publish("pairingFailed", Error("Server error " + a.status))
    };
    g.Xe = function() {
        this.j = null;
        this.publish("pairingFailed", Error("Server not responding"))
    };

    function Kk(a) {
        a && (this.id = a.id || a.name, this.name = a.name, this.app = a.app, this.type = a.type || "REMOTE_CONTROL", this.avatar = a.userAvatarUri || "", this.theme = a.theme || "u", this.capabilities = new Wd(Ca((a.capabilities || "").split(","), oa(Ya, pk))))
    }
    Kk.prototype.id = "";
    Kk.prototype.name = "";
    g = Kk.prototype;
    g.app = "";
    g.type = "REMOTE_CONTROL";
    g.avatar = "";
    g.theme = "u";
    g.equals = function(a) {
        return a ? this.id == a.id : !1
    };
    var Lk;

    function Mk() {
        var a = Nk(),
            b = Ok();
        Ha(a, b);
        if (Pk()) {
            var c = a,
                d;
            d = 0;
            for (var e = c.length, f; d < e;) {
                var h = d + e >> 1,
                    k;
                k = Ua(b, c[h]);
                0 < k ? d = h + 1 : (e = h, f = !k)
            }
            d = f ? d : ~d;
            0 > d && Qa(c, -(d + 1), 0, b)
        }
        a = Qk(a);
        if (0 == a.length) try {
            a = "remote_sid", jd.remove("" + a, "/", "youtube.com")
        } catch (l) {} else try {
            kd("remote_sid", a.join(","), -1)
        } catch (n) {}
    }

    function Nk() {
        var a = T("yt-remote-connected-devices") || [];
        a.sort(Ua);
        return a
    }

    function Qk(a) {
        if (0 == a.length) return [];
        var b = a[0].indexOf("#"),
            c = -1 == b ? a[0] : a[0].substring(0, b);
        return B(a, function(a, b) {
            return 0 == b ? a : a.substring(c.length)
        })
    }

    function Rk(a) {
        S("yt-remote-connected-devices", a, 86400)
    }

    function Ok() {
        if (Sk) return Sk;
        var a = T("yt-remote-device-id");
        a || (a = vk(), S("yt-remote-device-id", a, 31536E3));
        for (var b = Nk(), c = 1, d = a; Ha(b, d);) c++, d = a + "#" + c;
        return Sk = d
    }

    function Tk() {
        return T("yt-remote-session-browser-channel")
    }

    function Pk() {
        return T("yt-remote-session-screen-id")
    }

    function Uk(a) {
        5 < a.length && (a = a.slice(a.length - 5));
        var b = B(Vk(), function(a) {
                return a.loungeToken
            }),
            c = B(a, function(a) {
                return a.loungeToken
            });
        Ea(c, function(a) {
            return !Ha(b, a)
        }) && Wk();
        S("yt-remote-local-screens", a, 31536E3)
    }

    function Vk() {
        return T("yt-remote-local-screens") || []
    }

    function Wk() {
        S("yt-remote-lounge-token-expiration", !0, 86400)
    }

    function Xk() {
        return !T("yt-remote-lounge-token-expiration")
    }

    function Yk(a) {
        S("yt-remote-online-screens", a, 60)
    }

    function Zk() {
        return T("yt-remote-online-screens") || []
    }

    function $k(a) {
        S("yt-remote-online-dial-devices", a, 30)
    }

    function al() {
        return T("yt-remote-online-dial-devices") || []
    }

    function bl(a, b) {
        S("yt-remote-session-browser-channel", a);
        S("yt-remote-session-screen-id", b);
        var c = Nk(),
            d = Ok();
        Ha(c, d) || c.push(d);
        Rk(c);
        Mk()
    }

    function cl(a) {
        a || (Sh("yt-remote-session-screen-id"), Sh("yt-remote-session-video-id"));
        Mk();
        a = Nk();
        La(a, Ok());
        Rk(a)
    }

    function dl() {
        if (!Lk) {
            var a;
            a = new wh;
            (a = a.isAvailable() ? a : null) && (Lk = new Gh(a))
        }
        return Lk ? !!Lk.get("yt-remote-use-staging-server") : !1
    }
    var Sk = "";

    function el(a) {
        Ek.call(this, "LocalScreenService");
        this.k = a;
        this.j = NaN;
        fl(this);
        this.info("Initializing with " + hk(this.screens))
    }
    y(el, Ek);
    g = el.prototype;
    g.start = function() {
        fl(this) && this.publish("screenChange");
        Xk() && gl(this);
        H(this.j);
        this.j = G(v(this.start, this), 1E4)
    };
    g.add = function(a, b) {
        fl(this);
        Fk(this, a);
        hl(this, !1);
        this.publish("screenChange");
        b(a);
        a.token || gl(this)
    };
    g.remove = function(a, b) {
        var c = fl(this);
        Hk(this, a) && (hl(this, !1), c = !0);
        b(a);
        c && this.publish("screenChange")
    };
    g.Lb = function(a, b, c, d) {
        var e = fl(this),
            f = this.get(a.id);
        f ? (f.name != b && (f.name = b, hl(this, !1), e = !0), c(a)) : d(Error("no such local screen."));
        e && this.publish("screenChange")
    };
    g.G = function() {
        H(this.j);
        el.K.G.call(this)
    };

    function gl(a) {
        if (a.screens.length) {
            var b = B(a.screens, function(a) {
                    return a.id
                }),
                c = rk(a.k, "/pairing/get_lounge_token_batch");
            a.k.sendRequest("POST", c, {
                screen_ids: b.join(",")
            }, v(a.Od, a), v(a.Nd, a))
        }
    }
    g.Od = function(a) {
        fl(this);
        var b = this.screens.length;
        a = a && a.screens || [];
        for (var c = 0, d = a.length; c < d; ++c) {
            var e = a[c],
                f = this.get(e.screenId);
            f && (f.token = e.loungeToken, --b)
        }
        hl(this, !b);
        b && this.warn("Missed " + b + " lounge tokens.")
    };
    g.Nd = function(a) {
        this.warn("Requesting lounge tokens failed: " + a)
    };

    function fl(a) {
        var b = fk(Vk()),
            b = Ca(b, function(a) {
                return !a.uuid
            });
        return Gk(a, b)
    }

    function hl(a, b) {
        Uk(B(a.screens, dk));
        b && Wk()
    };

    function il(a, b) {
        U.call(this);
        this.C = b;
        for (var c = T("yt-remote-online-screen-ids") || "", c = c ? c.split(",") : [], d = {}, e = this.C(), f = 0, h = e.length; f < h; ++f) {
            var k = e[f].id;
            d[k] = Ha(c, k)
        }
        this.j = d;
        this.F = a;
        this.o = this.A = NaN;
        this.k = null;
        jl("Initialized with " + R(this.j))
    }
    y(il, U);
    g = il.prototype;
    g.start = function() {
        var a = parseInt(T("yt-remote-fast-check-period") || "0", 10);
        (this.A = w() - 144E5 < a ? 0 : a) ? kl(this): (this.A = w() + 3E5, S("yt-remote-fast-check-period", this.A), this.jc())
    };
    g.isEmpty = function() {
        return db(this.j)
    };
    g.update = function() {
        jl("Updating availability on schedule.");
        var a = this.C(),
            b = Wa(this.j, function(b, d) {
                return b && !!Dk(a, d)
            }, this);
        ll(this, b)
    };

    function ml(a, b, c) {
        var d = rk(a.F, "/pairing/get_screen_availability");
        a.F.sendRequest("POST", d, {
            lounge_token: b.token
        }, v(function(a) {
            a = a.screens || [];
            for (var d = 0, h = a.length; d < h; ++d)
                if (a[d].loungeToken == b.token) {
                    c("online" == a[d].status);
                    return
                }
            c(!1)
        }, a), v(function() {
            c(!1)
        }, a))
    }
    g.G = function() {
        H(this.o);
        this.o = NaN;
        this.k && (this.k.abort(), this.k = null);
        il.K.G.call(this)
    };

    function ll(a, b) {
        var c;
        t: if (Xa(b) != Xa(a.j)) c = !1;
            else {
                c = ab(b);
                for (var d = 0, e = c.length; d < e; ++d)
                    if (!a.j[c[d]]) {
                        c = !1;
                        break t
                    }
                c = !0
            }
        c || (jl("Updated online screens: " + R(a.j)), a.j = b, a.publish("screenChange"));
        nl(a)
    }

    function kl(a) {
        isNaN(a.o) || H(a.o);
        a.o = G(v(a.jc, a), 0 < a.A && a.A < w() ? 2E4 : 1E4)
    }
    g.jc = function() {
        H(this.o);
        this.o = NaN;
        this.k && this.k.abort();
        var a = ol(this);
        if (Xa(a)) {
            var b = rk(this.F, "/pairing/get_screen_availability"),
                c = {
                    lounge_token: ab(a).join(",")
                };
            this.k = this.F.sendRequest("POST", b, c, v(this.oe, this, a), v(this.ne, this))
        } else ll(this, {}), kl(this)
    };
    g.oe = function(a, b) {
        this.k = null;
        var c = ab(ol(this));
        if (Sa(c, ab(a))) {
            for (var c = b.screens || [], d = {}, e = 0, f = c.length; e < f; ++e) d[a[c[e].loungeToken]] = "online" == c[e].status;
            ll(this, d);
            kl(this)
        } else this.P("Changing Screen set during request."), this.jc()
    };
    g.ne = function(a) {
        this.P("Screen availability failed: " + a);
        this.k = null;
        kl(this)
    };

    function jl(a) {
        Wj("OnlineScreenService", a)
    }
    g.P = function(a) {
        Wj("OnlineScreenService", a)
    };

    function ol(a) {
        var b = {};
        A(a.C(), function(a) {
            a.token ? b[a.token] = a.id : this.P("Requesting availability of screen w/o lounge token.")
        });
        return b
    }

    function nl(a) {
        var b = ab(Wa(a.j, function(a) {
            return a
        }));
        b.sort(Ua);
        b.length ? S("yt-remote-online-screen-ids", b.join(","), 60) : Sh("yt-remote-online-screen-ids");
        a = Ca(a.C(), function(a) {
            return !!this.j[a.id]
        }, a);
        Yk(B(a, dk))
    };

    function V(a) {
        Ek.call(this, "ScreenService");
        this.C = a;
        this.j = this.k = null;
        this.o = [];
        this.A = {};
        pl(this)
    }
    y(V, Ek);
    g = V.prototype;
    g.start = function() {
        this.k.start();
        this.j.start();
        this.screens.length && (this.publish("screenChange"), this.j.isEmpty() || this.publish("onlineScreenChange"))
    };
    g.add = function(a, b, c) {
        this.k.add(a, b, c)
    };
    g.remove = function(a, b, c) {
        this.k.remove(a, b, c);
        this.j.update()
    };
    g.Lb = function(a, b, c, d) {
        this.k.contains(a) ? this.k.Lb(a, b, c, d) : (a = "Updating name of unknown screen: " + a.name, this.warn(a), d(Error(a)))
    };
    g.aa = function(a) {
        return a ? this.screens : Na(this.screens, Ca(this.o, function(a) {
            return !this.contains(a)
        }, this))
    };
    g.jd = function() {
        return Ca(this.aa(!0), function(a) {
            return !!this.j.j[a.id]
        }, this)
    };

    function ql(a, b, c, d, e, f) {
        a.info("getAutomaticScreenByIds " + c + " / " + b);
        c || (c = a.A[b]);
        var h = a.aa();
        if (h = (c ? Dk(h, c) : null) || Dk(h, b)) {
            h.uuid = b;
            var k = rl(a, h);
            ml(a.j, k, function(a) {
                e(a ? k : null)
            })
        } else c ? sl(a, c, v(function(a) {
            var f = rl(this, new Zj({
                name: d,
                screenId: c,
                loungeToken: a,
                dialId: b || ""
            }));
            ml(this.j, f, function(a) {
                e(a ? f : null)
            })
        }, a), f) : e(null)
    }
    g.kd = function(a, b, c, d, e) {
        this.info("getDialScreenByPairingCode " + a + " / " + b);
        var f = new Ik(this.C, a, b, c);
        f.subscribe("pairingComplete", v(function(a) {
            Bb(f);
            d(rl(this, a))
        }, this));
        f.subscribe("pairingFailed", function(a) {
            Bb(f);
            e(a)
        });
        f.start();
        return v(f.stop, f)
    };

    function tl(a, b) {
        for (var c = 0, d = a.screens.length; c < d; ++c)
            if (a.screens[c].name == b) return a.screens[c];
        return null
    }
    g.Dc = function(a, b) {
        for (var c = 2, d = b(a, c); tl(this, d);) {
            c++;
            if (20 < c) return a;
            d = b(a, c)
        }
        return d
    };
    g.Ze = function(a, b, c, d) {
        gj(rk(this.C, "/pairing/get_screen"), {
            method: "POST",
            S: {
                pairing_code: a
            },
            timeout: 5E3,
            ca: v(function(a, d) {
                var h = new Zj(d.screen || {});
                if (!h.name || tl(this, h.name)) h.name = this.Dc(h.name, b);
                c(rl(this, h))
            }, this),
            onError: v(function(a) {
                d(Error("pairing request failed: " + a.status))
            }, this),
            Eb: v(function() {
                d(Error("pairing request timed out."))
            }, this)
        })
    };
    g.G = function() {
        Bb(this.k);
        Bb(this.j);
        V.K.G.call(this)
    };

    function sl(a, b, c, d) {
        a.info("requestLoungeToken_ for " + b);
        var e = {
            S: {
                screen_ids: b
            },
            method: "POST",
            context: a,
            ca: function(a, e) {
                var k = e && e.screens || [];
                k[0] && k[0].screenId == b ? c(k[0].loungeToken) : d(Error("Missing lounge token in token response"))
            },
            onError: function() {
                d(Error("Request screen lounge token failed"))
            }
        };
        gj(rk(a.C, "/pairing/get_lounge_token_batch"), e)
    }

    function ul(a) {
        a.screens = a.k.aa();
        var b = a.A,
            c = {},
            d;
        for (d in b) c[b[d]] = d;
        b = 0;
        for (d = a.screens.length; b < d; ++b) {
            var e = a.screens[b];
            e.uuid = c[e.id] || ""
        }
        a.info("Updated manual screens: " + hk(a.screens))
    }
    g.Pd = function() {
        ul(this);
        this.publish("screenChange");
        this.j.update()
    };

    function pl(a) {
        vl(a);
        a.k = new el(a.C);
        a.k.subscribe("screenChange", v(a.Pd, a));
        ul(a);
        a.o = fk(T("yt-remote-automatic-screen-cache") || []);
        vl(a);
        a.info("Initializing automatic screens: " + hk(a.o));
        a.j = new il(a.C, v(a.aa, a, !0));
        a.j.subscribe("screenChange", v(function() {
            this.publish("onlineScreenChange")
        }, a))
    }

    function rl(a, b) {
        var c = a.get(b.id);
        c ? (c.uuid = b.uuid, b = c) : ((c = Dk(a.o, b.uuid)) ? (c.id = b.id, c.token = b.token, b = c) : a.o.push(b), S("yt-remote-automatic-screen-cache", B(a.o, dk)));
        vl(a);
        a.A[b.uuid] = b.id;
        S("yt-remote-device-id-map", a.A, 31536E3);
        return b
    }

    function vl(a) {
        a.A = T("yt-remote-device-id-map") || {}
    }
    V.prototype.dispose = V.prototype.dispose;

    function wl(a, b, c) {
        U.call(this);
        this.W = c;
        this.M = a;
        this.k = b;
        this.o = null
    }
    y(wl, U);

    function xl(a, b) {
        a.o = b;
        a.publish("sessionScreen", a.o)
    }
    g = wl.prototype;
    g.Z = function(a) {
        this.J() || (a && this.warn("" + a), this.o = null, this.publish("sessionScreen", null))
    };
    g.info = function(a) {
        Wj(this.W, a)
    };
    g.warn = function(a) {
        Wj(this.W, a)
    };
    g.md = function() {
        return null
    };
    g.lc = function(a) {
        var b = this.k;
        a ? (b.displayStatus = new chrome.cast.ReceiverDisplayStatus(a, []), b.displayStatus.showStop = !0) : b.displayStatus = null;
        chrome.cast.setReceiverDisplayStatus(b, v(function() {
            this.info("Updated receiver status for " + b.friendlyName + ": " + a)
        }, this), v(function() {
            this.warn("Failed to update receiver status for: " + b.friendlyName)
        }, this))
    };
    g.G = function() {
        this.lc("");
        wl.K.G.call(this)
    };

    function yl(a, b) {
        wl.call(this, a, b, "CastSession");
        this.j = null;
        this.C = 0;
        this.A = null;
        this.H = v(this.$e, this);
        this.F = v(this.xe, this);
        this.C = G(v(function() {
            zl(this, null)
        }, this), 12E4)
    }
    y(yl, wl);
    g = yl.prototype;
    g.kc = function(a) {
        if (this.j) {
            if (this.j == a) return;
            this.warn("Overriding cast sesison with new session object");
            this.j.removeUpdateListener(this.H);
            this.j.removeMessageListener("urn:x-cast:com.google.youtube.mdx", this.F)
        }
        this.j = a;
        this.j.addUpdateListener(this.H);
        this.j.addMessageListener("urn:x-cast:com.google.youtube.mdx", this.F);
        this.A && Al(this);
        Bl(this, "getMdxSessionStatus")
    };
    g.$a = function(a) {
        this.info("launchWithParams: " + R(a));
        this.A = a;
        this.j && Al(this)
    };
    g.stop = function() {
        this.j ? this.j.stop(v(function() {
            this.Z()
        }, this), v(function() {
            this.Z(Error("Failed to stop receiver app."))
        }, this)) : this.Z(Error("Stopping cast device witout session."))
    };
    g.lc = t;
    g.G = function() {
        this.info("disposeInternal");
        H(this.C);
        this.C = 0;
        this.j && (this.j.removeUpdateListener(this.H), this.j.removeMessageListener("urn:x-cast:com.google.youtube.mdx", this.F));
        this.j = null;
        yl.K.G.call(this)
    };

    function Al(a) {
        var b = a.A.videoId || a.A.videoIds[a.A.index];
        b && Bl(a, "flingVideo", {
            videoId: b,
            currentTime: a.A.currentTime || 0
        });
        a.A = null
    }

    function Bl(a, b, c) {
        a.info("sendYoutubeMessage_: " + b + " " + R(c));
        var d = {};
        d.type = b;
        c && (d.data = c);
        a.j ? a.j.sendMessage("urn:x-cast:com.google.youtube.mdx", d, t, v(function() {
            this.warn("Failed to send message: " + b + ".")
        }, a)) : a.warn("Sending yt message without session: " + R(d))
    }
    g.xe = function(a, b) {
        if (!this.J())
            if (b) {
                var c = zh(b);
                if (c) {
                    var d = "" + c.type,
                        c = c.data || {};
                    this.info("onYoutubeMessage_: " + d + " " + R(c));
                    switch (d) {
                        case "mdxSessionStatus":
                            zl(this, c.screenId);
                            break;
                        default:
                            this.warn("Unknown youtube message: " + d)
                    }
                } else this.warn("Unable to parse message.")
            } else this.warn("No data in message.")
    };

    function zl(a, b) {
        H(a.C);
        b ? (a.info("onConnectedScreenId_: Received screenId: " + b), a.o && a.o.id == b || ql(a.M, a.k.label, b, a.k.friendlyName, v(function(a) {
            a ? xl(this, a) : this.Z(Error("Unable to fetch screen."))
        }, a), v(a.Z, a))) : a.Z(Error("Waiting for session status timed out."))
    }
    g.md = function() {
        return this.j
    };
    g.$e = function(a) {
        this.J() || a || (this.warn("Cast session died."), this.Z())
    };

    function Cl(a, b) {
        wl.call(this, a, b, "DialSession");
        this.C = this.L = null;
        this.R = "";
        this.A = null;
        this.H = t;
        this.F = NaN;
        this.U = v(this.bf, this);
        this.j = t
    }
    y(Cl, wl);
    g = Cl.prototype;
    g.kc = function(a) {
        this.C = a;
        this.C.addUpdateListener(this.U)
    };
    g.$a = function(a) {
        this.A = a;
        this.H()
    };
    g.stop = function() {
        this.j();
        this.j = t;
        H(this.F);
        this.C ? this.C.stop(v(this.Z, this, null), v(this.Z, this, "Failed to stop DIAL device.")) : this.Z()
    };
    g.G = function() {
        this.j();
        this.j = t;
        H(this.F);
        this.C && this.C.removeUpdateListener(this.U);
        this.C = null;
        Cl.K.G.call(this)
    };

    function Dl(a) {
        a.j = a.M.kd(a.R, a.k.label, a.k.friendlyName, v(function(a) {
            this.j = t;
            xl(this, a)
        }, a), v(function(a) {
            this.j = t;
            this.Z(a)
        }, a))
    }
    g.bf = function(a) {
        this.J() || a || (this.warn("DIAL session died."), this.j(), this.j = t, this.Z())
    };

    function El(a) {
        var b = {};
        b.pairingCode = a.R;
        if (a.A) {
            var c = a.A.index || 0,
                d = a.A.currentTime || 0;
            b.v = a.A.videoId || a.A.videoIds[c];
            b.t = d
        }
        dl() && (b.env_useStageMdx = 1);
        return yd(b)
    }
    g.ec = function(a) {
        this.R = vk();
        if (this.A) {
            var b = new chrome.cast.DialLaunchResponse(!0, El(this));
            a(b);
            Dl(this)
        } else this.H = v(function() {
            H(this.F);
            this.H = t;
            this.F = NaN;
            var b = new chrome.cast.DialLaunchResponse(!0, El(this));
            a(b);
            Dl(this)
        }, this), this.F = G(v(function() {
            this.H()
        }, this), 100)
    };
    g.Qd = function(a, b) {
        ql(this.M, this.L.receiver.label, a, this.k.friendlyName, v(function(a) {
            a && a.token ? (xl(this, a), b(new chrome.cast.DialLaunchResponse(!1))) : this.ec(b)
        }, this), v(function(a) {
            this.warn("Failed to get DIAL screen: " + a);
            this.ec(b)
        }, this))
    };

    function Fl(a, b) {
        wl.call(this, a, b, "ManualSession");
        this.j = G(v(this.$a, this, null), 150)
    }
    y(Fl, wl);
    Fl.prototype.stop = function() {
        this.Z()
    };
    Fl.prototype.kc = t;
    Fl.prototype.$a = function() {
        H(this.j);
        this.j = NaN;
        var a = Dk(this.M.aa(), this.k.label);
        a ? xl(this, a) : this.Z(Error("No such screen"))
    };
    Fl.prototype.G = function() {
        H(this.j);
        this.j = NaN;
        Fl.K.G.call(this)
    };

    function Gl(a) {
        U.call(this);
        this.k = a;
        this.j = null;
        this.C = !1;
        this.o = [];
        this.A = v(this.ke, this)
    }
    y(Gl, U);
    g = Gl.prototype;
    g.init = function(a, b) {
        chrome.cast.timeout.requestSession = 3E4;
        var c = new chrome.cast.SessionRequest("233637DE");
        c.dialRequest = new chrome.cast.DialRequest("YouTube");
        var d = chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED,
            e = a ? chrome.cast.DefaultActionPolicy.CAST_THIS_TAB : chrome.cast.DefaultActionPolicy.CREATE_SESSION,
            c = new chrome.cast.ApiConfig(c, v(this.Rc, this), v(this.le, this), d, e);
        c.customDialLaunchCallback = v(this.Zd, this);
        chrome.cast.initialize(c, v(function() {
            this.J() || (chrome.cast.addReceiverActionListener(this.A),
                Sj(Hl), this.k.subscribe("onlineScreenChange", v(this.ld, this)), this.o = Il(this), chrome.cast.setCustomReceivers(this.o, t, v(function(a) {
                    this.P("Failed to set initial custom receivers: " + R(a))
                }, this)), this.publish("yt-remote-cast2-availability-change", Jl(this)), b(!0))
        }, this), function(a) {
            this.P("Failed to initialize API: " + R(a));
            b(!1)
        })
    };
    g.Ke = function(a, b) {
        Kl("Setting connected screen ID: " + a + " -> " + b);
        if (this.j) {
            var c = this.j.o;
            if (!a || c && c.id != a) Kl("Unsetting old screen status: " + this.j.k.friendlyName), Bb(this.j), this.j = null
        }
        if (a && b) {
            if (!this.j) {
                c = Dk(this.k.aa(), a);
                if (!c) {
                    Kl("setConnectedScreenStatus: Unknown screen.");
                    return
                }
                var d = Ll(this, c);
                d || (Kl("setConnectedScreenStatus: Connected receiver not custom..."), d = new chrome.cast.Receiver(c.uuid ? c.uuid : c.id, c.name), d.receiverType = chrome.cast.ReceiverType.CUSTOM, this.o.push(d), chrome.cast.setCustomReceivers(this.o,
                    t, v(function(a) {
                        this.P("Failed to set initial custom receivers: " + R(a))
                    }, this)));
                Kl("setConnectedScreenStatus: new active receiver: " + d.friendlyName);
                Ml(this, new Fl(this.k, d), !0)
            }
            this.j.lc(b)
        } else Kl("setConnectedScreenStatus: no screen.")
    };

    function Ll(a, b) {
        return b ? Fa(a.o, function(a) {
            return ak(b, a.label)
        }, a) : null
    }
    g.Le = function(a) {
        this.J() ? this.P("Setting connection data on disposed cast v2") : this.j ? this.j.$a(a) : this.P("Setting connection data without a session")
    };
    g.stopSession = function() {
        this.J() ? this.P("Stopping session on disposed cast v2") : this.j ? (this.j.stop(), Bb(this.j), this.j = null) : Kl("Stopping non-existing session")
    };
    g.requestSession = function() {
        chrome.cast.requestSession(v(this.Rc, this), v(this.pe, this))
    };
    g.G = function() {
        this.k.unsubscribe("onlineScreenChange", v(this.ld, this));
        window.chrome && chrome.cast && chrome.cast.removeReceiverActionListener(this.A);
        Vj(Hl);
        Bb(this.j);
        Gl.K.G.call(this)
    };

    function Kl(a) {
        Wj("Controller", a)
    }
    g.P = function(a) {
        Wj("Controller", a)
    };

    function Hl(a) {
        window.chrome && chrome.cast && chrome.cast.logMessage && chrome.cast.logMessage(a)
    }

    function Jl(a) {
        return a.C || !!a.o.length || !!a.j
    }

    function Ml(a, b, c) {
        Bb(a.j);
        (a.j = b) ? (c ? a.publish("yt-remote-cast2-receiver-resumed", b.k) : a.publish("yt-remote-cast2-receiver-selected", b.k), b.subscribe("sessionScreen", v(a.Sc, a, b)), b.o ? a.publish("yt-remote-cast2-session-change", b.o) : c && a.j.$a(null)) : a.publish("yt-remote-cast2-session-change", null)
    }
    g.Sc = function(a, b) {
        this.j == a && (b || Ml(this, null), this.publish("yt-remote-cast2-session-change", b))
    };
    g.ke = function(a, b) {
        if (!this.J())
            if (a) switch (Kl("onReceiverAction_ " + a.label + " / " + a.friendlyName + "-- " + b), b) {
                case chrome.cast.ReceiverAction.CAST:
                    if (this.j)
                        if (this.j.k.label != a.label) Kl("onReceiverAction_: Stopping active receiver: " + this.j.k.friendlyName), this.j.stop();
                        else {
                            Kl("onReceiverAction_: Casting to active receiver.");
                            this.j.o && this.publish("yt-remote-cast2-session-change", this.j.o);
                            break
                        }
                    switch (a.receiverType) {
                        case chrome.cast.ReceiverType.CUSTOM:
                            Ml(this, new Fl(this.k, a));
                            break;
                        case chrome.cast.ReceiverType.DIAL:
                            Ml(this,
                                new Cl(this.k, a));
                            break;
                        case chrome.cast.ReceiverType.CAST:
                            Ml(this, new yl(this.k, a));
                            break;
                        default:
                            this.P("Unknown receiver type: " + a.receiverType);
                            return
                    }
                    break;
                case chrome.cast.ReceiverAction.STOP:
                    this.j && this.j.k.label == a.label ? this.j.stop() : this.P("Stopping receiver w/o session: " + a.friendlyName)
            } else this.P("onReceiverAction_ called without receiver.")
    };
    g.Zd = function(a) {
        if (this.J()) return Promise.reject(Error("disposed"));
        var b = a.receiver;
        b.receiverType != chrome.cast.ReceiverType.DIAL && (this.P("Not DIAL receiver: " + b.friendlyName), b.receiverType = chrome.cast.ReceiverType.DIAL);
        var c = this.j ? this.j.k : null;
        if (!c || c.label != b.label) return this.P("Receiving DIAL launch request for non-clicked DIAL receiver: " + b.friendlyName), Promise.reject(Error("illegal DIAL launch"));
        if (c && c.label == b.label && c.receiverType != chrome.cast.ReceiverType.DIAL) {
            if (this.j.o) return Kl("Reselecting dial screen."),
                this.publish("yt-remote-cast2-session-change", this.j.o), Promise.resolve(new chrome.cast.DialLaunchResponse(!1));
            this.P('Changing CAST intent from "' + c.receiverType + '" to "dial" for ' + b.friendlyName);
            Ml(this, new Cl(this.k, b))
        }
        b = this.j;
        b.L = a;
        return b.L.appState == chrome.cast.DialAppState.RUNNING ? new Promise(v(b.Qd, b, (b.L.extraData || {}).screenId || null)) : new Promise(v(b.ec, b))
    };
    g.Rc = function(a) {
        if (!this.J()) {
            Kl("New cast session ID: " + a.sessionId);
            var b = a.receiver;
            if (b.receiverType != chrome.cast.ReceiverType.CUSTOM) {
                if (!this.j)
                    if (b.receiverType == chrome.cast.ReceiverType.CAST) Kl("Got resumed cast session before resumed mdx connection."), Ml(this, new yl(this.k, b), !0);
                    else {
                        this.P("Got non-cast session without previous mdx receiver event, or mdx resume.");
                        return
                    }
                var c = this.j.k,
                    d = Dk(this.k.aa(), c.label);
                d && ak(d, b.label) && c.receiverType != chrome.cast.ReceiverType.CAST && b.receiverType ==
                    chrome.cast.ReceiverType.CAST && (Kl("onSessionEstablished_: manual to cast session change " + b.friendlyName), Bb(this.j), this.j = new yl(this.k, b), this.j.subscribe("sessionScreen", v(this.Sc, this, this.j)), this.j.$a(null));
                this.j.kc(a)
            }
        }
    };
    g.af = function() {
        return this.j ? this.j.md() : null
    };
    g.pe = function(a) {
        this.J() || (this.P("Failed to estabilish a session: " + R(a)), a.code != chrome.cast.ErrorCode.CANCEL && Ml(this, null))
    };
    g.le = function(a) {
        Kl("Receiver availability updated: " + a);
        if (!this.J()) {
            var b = Jl(this);
            this.C = a == chrome.cast.ReceiverAvailability.AVAILABLE;
            Jl(this) != b && this.publish("yt-remote-cast2-availability-change", Jl(this))
        }
    };

    function Il(a) {
        var b = a.k.jd(),
            c = a.j && a.j.k;
        a = B(b, function(a) {
            c && ak(a, c.label) && (c = null);
            var b = a.uuid ? a.uuid : a.id,
                f = Ll(this, a);
            f ? (f.label = b, f.friendlyName = a.name) : (f = new chrome.cast.Receiver(b, a.name), f.receiverType = chrome.cast.ReceiverType.CUSTOM);
            return f
        }, a);
        c && (c.receiverType != chrome.cast.ReceiverType.CUSTOM && (c = new chrome.cast.Receiver(c.label, c.friendlyName), c.receiverType = chrome.cast.ReceiverType.CUSTOM), a.push(c));
        return a
    }
    g.ld = function() {
        if (!this.J()) {
            var a = Jl(this);
            this.o = Il(this);
            Kl("Updating custom receivers: " + R(this.o));
            chrome.cast.setCustomReceivers(this.o, t, v(function() {
                this.P("Failed to set custom receivers.")
            }, this));
            var b = Jl(this);
            b != a && this.publish("yt-remote-cast2-availability-change", b)
        }
    };
    Gl.prototype.setLaunchParams = Gl.prototype.Le;
    Gl.prototype.setConnectedScreenStatus = Gl.prototype.Ke;
    Gl.prototype.stopSession = Gl.prototype.stopSession;
    Gl.prototype.getCastSession = Gl.prototype.af;
    Gl.prototype.requestSession = Gl.prototype.requestSession;
    Gl.prototype.init = Gl.prototype.init;
    Gl.prototype.dispose = Gl.prototype.dispose;

    function Nl(a, b, c) {
        Ol() ? Ql(a) && (Rl(!0), window.chrome && chrome.cast && chrome.cast.isAvailable ? Sl(b) : c ? (window.__onGCastApiAvailable = function(a, c) {
            Tl(b, a, c)
        }, Xb("https://www.gstatic.com/cv/js/sender/v1/cast_sender.js")) : mk(function(a, c) {
            Tl(b, a, c)
        })) : Pl("Cannot initialize because not running Chrome")
    }

    function Ul() {
        Pl("dispose");
        ok();
        var a = Vl();
        a && a.dispose();
        Wl = null;
        q("yt.mdx.remote.cloudview.instance_", null, void 0);
        Xl(!1);
        Tb(Yl);
        Yl.length = 0
    }

    function Zl() {
        return !!T("yt-remote-cast-installed")
    }

    function $l() {
        var a = T("yt-remote-cast-receiver");
        return a ? a.friendlyName : null
    }

    function am() {
        Pl("clearCurrentReciever");
        Sh("yt-remote-cast-receiver")
    }

    function bm() {
        Zl() ? Vl() ? cm() ? (Pl("Requesting cast selector."), Wl.requestSession()) : (Pl("Wait for cast API to be ready to request the session."), Yl.push(Rb("yt-remote-cast2-api-ready", bm))) : dm("requestCastSelector: Cast is not initialized.") : dm("requestCastSelector: Cast API is not installed!")
    }

    function em(a) {
        cm() ? Vl().setLaunchParams(a) : dm("setLaunchParams called before ready.")
    }

    function fm(a, b) {
        cm() ? Vl().setConnectedScreenStatus(a, b) : dm("setConnectedScreenStatus called before ready.")
    }
    var Wl = null;

    function Ol() {
        var a;
        a = 0 <= oc.search(/\ (CrMo|Chrome|CriOS)\//);
        return Re || a
    }

    function Tl(a, b, c) {
        b ? Sl(a) : (dm("Failed to load cast API: " + c), gm(!1), Rl(!1), Sh("yt-remote-cast-available"), Sh("yt-remote-cast-receiver"), Ul(), a(!1))
    }

    function hm(a) {
        Wl.init(!0, a)
    }

    function Ql(a) {
        var b = !1;
        if (!Wl) {
            var c = r("yt.mdx.remote.cloudview.instance_");
            c || (c = new Gl(a), c.subscribe("yt-remote-cast2-availability-change", function(a) {
                S("yt-remote-cast-available", a);
                I("yt-remote-cast2-availability-change", a)
            }), c.subscribe("yt-remote-cast2-receiver-selected", function(a) {
                Pl("onReceiverSelected: " + a.friendlyName);
                S("yt-remote-cast-receiver", a);
                I("yt-remote-cast2-receiver-selected", a)
            }), c.subscribe("yt-remote-cast2-receiver-resumed", function(a) {
                Pl("onReceiverResumed: " + a.friendlyName);
                S("yt-remote-cast-receiver", a)
            }), c.subscribe("yt-remote-cast2-session-change", function(a) {
                Pl("onSessionChange: " + gk(a));
                a || Sh("yt-remote-cast-receiver");
                I("yt-remote-cast2-session-change", a)
            }), q("yt.mdx.remote.cloudview.instance_", c, void 0), b = !0);
            Wl = c
        }
        Pl("cloudview.createSingleton_: " + b);
        return b
    }

    function Vl() {
        Wl || (Wl = r("yt.mdx.remote.cloudview.instance_"));
        return Wl
    }

    function Sl(a) {
        gm(!0);
        Rl(!1);
        hm(function(b) {
            b ? (Xl(!0), I("yt-remote-cast2-api-ready")) : (dm("Failed to initialize cast API."), gm(!1), Sh("yt-remote-cast-available"), Sh("yt-remote-cast-receiver"), Ul());
            a(b)
        })
    }

    function Pl(a) {
        Wj("cloudview", a)
    }

    function dm(a) {
        Wj("cloudview", a)
    }

    function gm(a) {
        Pl("setCastInstalled_ " + a);
        S("yt-remote-cast-installed", a)
    }

    function cm() {
        return !!r("yt.mdx.remote.cloudview.apiReady_")
    }

    function Xl(a) {
        Pl("setApiReady_ " + a);
        q("yt.mdx.remote.cloudview.apiReady_", a, void 0)
    }

    function Rl(a) {
        q("yt.mdx.remote.cloudview.initializing_", a, void 0)
    }
    var Yl = [];

    function im() {
        if (!("cast" in window)) return !1;
        var a = window.cast || {};
        return "ActivityStatus" in a && "Api" in a && "LaunchRequest" in a && "Receiver" in a
    }

    function jm(a) {
        Wj("CAST", a)
    }

    function km(a) {
        var b = lm();
        b && b.logMessage && b.logMessage(a)
    }

    function mm(a) {
        if (a.source == window && a.data && "CastApi" == a.data.source && "Hello" == a.data.event)
            for (; nm.length;) nm.shift()()
    }

    function om() {
        if (!r("yt.mdx.remote.castv2_") && !pm && (0 == Ja.length && Pa(Ja, al()), im())) {
            var a = lm();
            a ? (a.removeReceiverListener("YouTube", qm), a.addReceiverListener("YouTube", qm), jm("API initialized in the other binary")) : (a = new cast.Api, rm(a), a.addReceiverListener("YouTube", qm), a.setReloadTabRequestHandler && a.setReloadTabRequestHandler(function() {
                G(function() {
                    window.location.reload(!0)
                }, 1E3)
            }), Sj(km), jm("API initialized"));
            pm = !0
        }
    }

    function sm() {
        var a = lm();
        a && (jm("API disposed"), Vj(km), a.setReloadTabRequestHandler && a.setReloadTabRequestHandler(t), a.removeReceiverListener("YouTube", qm), rm(null));
        pm = !1;
        nm = null;
        (a = ed(window, "message", mm, !1)) && fd(a)
    }

    function tm(a) {
        var b = Ga(Ja, function(b) {
            return b.id == a.id
        });
        0 <= b && (Ja[b] = tk(a))
    }

    function qm(a) {
        a.length && jm("Updating receivers: " + R(a));
        um(a);
        I("yt-remote-cast-device-list-update");
        A(vm(), function(a) {
            wm(a.id)
        });
        A(a, function(a) {
            if (a.isTabProjected) {
                var c = xm(a.id);
                jm("Detected device: " + c.id + " is tab projected. Firing DEVICE_TAB_PROJECTED event.");
                G(function() {
                    I("yt-remote-cast-device-tab-projected", c.id)
                }, 1E3)
            }
        })
    }

    function ym(a, b) {
        jm("Updating " + a + " activity status: " + R(b));
        var c = xm(a);
        c ? (b.activityId && (c.activityId = b.activityId), c.status = "running" == b.status ? "RUNNING" : "stopped" == b.status ? "STOPPED" : "error" == b.status ? "ERROR" : "UNKNOWN", "RUNNING" != c.status && (c.activityId = ""), tm(c), I("yt-remote-cast-device-status-update", c)) : jm("Device not found")
    }

    function vm() {
        om();
        return zk(Ja)
    }

    function um(a) {
        a = B(a, function(a) {
            var c = a.id,
                d;
            d = a.name;
            d = -1 != d.indexOf("&") ? "document" in m ? ua(d) : wa(d) : d;
            c = {
                id: c,
                name: d
            };
            if (a = xm(a.id)) c.activityId = a.activityId, c.status = a.status;
            return c
        });
        Ia();
        Pa(Ja, a)
    }

    function xm(a) {
        var b = vm();
        return Fa(b, function(b) {
            return b.id == a
        }) || null
    }

    function wm(a) {
        var b = xm(a),
            c = lm();
        c && b && b.activityId && c.getActivityStatus(b.activityId, function(b) {
            "error" == b.status && (b.status = "stopped");
            ym(a, b)
        })
    }

    function zm(a) {
        om();
        var b = xm(a),
            c = lm();
        c && b && b.activityId ? (jm("Stopping cast activity"), c.stopActivity(b.activityId, oa(ym, a))) : jm("Dropping cast activity stop")
    }

    function lm() {
        return r("yt.mdx.remote.castapi.api_")
    }

    function rm(a) {
        q("yt.mdx.remote.castapi.api_", a, void 0)
    }
    var pm = !1,
        nm = null,
        Ja = r("yt.mdx.remote.castapi.devices_") || [];
    q("yt.mdx.remote.castapi.devices_", Ja, void 0);

    function Am(a, b) {
        this.action = a;
        this.params = b || null
    };

    function Bm() {
        this.j = w()
    }
    new Bm;
    Bm.prototype.set = function(a) {
        this.j = a
    };
    Bm.prototype.reset = function() {
        this.set(w())
    };
    Bm.prototype.get = function() {
        return this.j
    };

    function Cm() {
        D.call(this);
        this.Ca = new Gf(this);
        this.Va = this;
        this.qa = null
    }
    y(Cm, D);
    Cm.prototype[Cf] = !0;
    g = Cm.prototype;
    g.addEventListener = function(a, b, c, d) {
        Nf(this, a, b, c, d)
    };
    g.removeEventListener = function(a, b, c, d) {
        Tf(this, a, b, c, d)
    };

    function Dm(a, b) {
        var c, d = a.qa;
        if (d) {
            c = [];
            for (var e = 1; d; d = d.qa) c.push(d), ++e
        }
        var d = a.Va,
            e = b,
            f = e.type || e;
        if (u(e)) e = new Af(e, d);
        else if (e instanceof Af) e.target = e.target || d;
        else {
            var h = e,
                e = new Af(f, d);
            ib(e, h)
        }
        var h = !0,
            k;
        if (c)
            for (var l = c.length - 1; 0 <= l; l--) k = e.currentTarget = c[l], h = Em(k, f, !0, e) && h;
        k = e.currentTarget = d;
        h = Em(k, f, !0, e) && h;
        h = Em(k, f, !1, e) && h;
        if (c)
            for (l = 0; l < c.length; l++) k = e.currentTarget = c[l], h = Em(k, f, !1, e) && h
    }
    g.G = function() {
        Cm.K.G.call(this);
        this.removeAllListeners();
        this.qa = null
    };
    g.listen = function(a, b, c, d) {
        return this.Ca.add(String(a), b, !1, c, d)
    };
    g.mc = function(a, b, c, d) {
        return this.Ca.remove(String(a), b, c, d)
    };
    g.removeAllListeners = function(a) {
        return this.Ca ? this.Ca.removeAll(a) : 0
    };

    function Em(a, b, c, d) {
        b = a.Ca.j[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.removed && h.tb == c) {
                var k = h.za,
                    l = h.zb || h.src;
                h.rb && If(a.Ca, h);
                e = !1 !== k.call(l, d) && e
            }
        }
        return e && 0 != d.ad
    };

    function Fm(a, b) {
        this.k = new Bh(a);
        this.j = b ? zh : yh
    }
    Fm.prototype.stringify = function(a) {
        return Ah(this.k, a)
    };
    Fm.prototype.parse = function(a) {
        return this.j(a)
    };

    function Gm(a, b) {
        Cm.call(this);
        this.j = a || 1;
        this.k = b || m;
        this.o = v(this.Oe, this);
        this.B = w()
    }
    y(Gm, Cm);
    g = Gm.prototype;
    g.enabled = !1;
    g.fa = null;

    function Hm(a, b) {
        a.j = b;
        a.fa && a.enabled ? (a.stop(), a.start()) : a.fa && a.stop()
    }
    g.Oe = function() {
        if (this.enabled) {
            var a = w() - this.B;
            0 < a && a < .8 * this.j ? this.fa = this.k.setTimeout(this.o, this.j - a) : (this.fa && (this.k.clearTimeout(this.fa), this.fa = null), Dm(this, "tick"), this.enabled && (this.fa = this.k.setTimeout(this.o, this.j), this.B = w()))
        }
    };
    g.start = function() {
        this.enabled = !0;
        this.fa || (this.fa = this.k.setTimeout(this.o, this.j), this.B = w())
    };
    g.stop = function() {
        this.enabled = !1;
        this.fa && (this.k.clearTimeout(this.fa), this.fa = null)
    };
    g.G = function() {
        Gm.K.G.call(this);
        this.stop();
        delete this.k
    };

    function Im(a, b, c) {
        if (ga(a)) c && (a = v(a, c));
        else if (a && "function" == typeof a.handleEvent) a = v(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return 2147483647 < b ? -1 : m.setTimeout(a, b || 0)
    };

    function Jm(a, b, c) {
        D.call(this);
        this.B = a;
        this.o = b;
        this.k = c;
        this.j = v(this.re, this)
    }
    y(Jm, D);
    g = Jm.prototype;
    g.Kb = !1;
    g.Ya = null;
    g.stop = function() {
        this.Ya && (m.clearTimeout(this.Ya), this.Ya = null, this.Kb = !1)
    };
    g.G = function() {
        Jm.K.G.call(this);
        this.stop()
    };
    g.re = function() {
        this.Ya = null;
        this.Kb && (this.Kb = !1, Km(this))
    };

    function Km(a) {
        a.Ya = Im(a.j, a.o);
        a.B.call(a.k)
    };

    function Lm(a) {
        D.call(this);
        this.k = a;
        this.j = {}
    }
    y(Lm, D);
    var Mm = [];
    g = Lm.prototype;
    g.listen = function(a, b, c, d) {
        da(b) || (b && (Mm[0] = b.toString()), b = Mm);
        for (var e = 0; e < b.length; e++) {
            var f = Nf(a, b[e], c || this.handleEvent, d || !1, this.k || this);
            if (!f) break;
            this.j[f.key] = f
        }
        return this
    };
    g.mc = function(a, b, c, d, e) {
        if (da(b))
            for (var f = 0; f < b.length; f++) this.mc(a, b[f], c, d, e);
        else c = c || this.handleEvent, e = e || this.k || this, c = Of(c), d = !!d, b = a && a[Cf] ? Jf(a.Ca, String(b), c, d, e) : a ? (a = Pf(a)) ? Jf(a, b, c, d, e) : null : null, b && (Uf(b), delete this.j[b.key]);
        return this
    };
    g.removeAll = function() {
        Va(this.j, Uf);
        this.j = {}
    };
    g.G = function() {
        Lm.K.G.call(this);
        this.removeAll()
    };
    g.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    };

    function Nm() {}
    Nm.prototype.j = null;

    function Om(a) {
        var b;
        (b = a.j) || (b = {}, Pm(a) && (b[0] = !0, b[1] = !0), b = a.j = b);
        return b
    };
    var Qm;

    function Rm() {}
    y(Rm, Nm);

    function Sm(a) {
        return (a = Pm(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }

    function Pm(a) {
        if (!a.k && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.k = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.k
    }
    Qm = new Rm;

    function Tm(a, b, c, d, e) {
        this.j = a;
        this.o = c;
        this.H = d;
        this.F = e || 1;
        this.A = 45E3;
        this.B = new Lm(this);
        this.k = new Gm;
        Hm(this.k, 250)
    }
    g = Tm.prototype;
    g.Pa = null;
    g.na = !1;
    g.eb = null;
    g.oc = null;
    g.nb = null;
    g.cb = null;
    g.Aa = null;
    g.Ea = null;
    g.Sa = null;
    g.Q = null;
    g.pb = 0;
    g.oa = null;
    g.Nb = null;
    g.Qa = null;
    g.lb = -1;
    g.bd = !0;
    g.Ja = !1;
    g.cc = 0;
    g.Hb = null;
    var Um = {},
        Vm = {};
    g = Tm.prototype;
    g.setTimeout = function(a) {
        this.A = a
    };

    function Wm(a, b, c) {
        a.cb = 1;
        a.Aa = Ig(b.clone());
        a.Sa = c;
        a.C = !0;
        Xm(a, null)
    }

    function Ym(a, b, c, d, e) {
        a.cb = 1;
        a.Aa = Ig(b.clone());
        a.Sa = null;
        a.C = c;
        e && (a.bd = !1);
        Xm(a, d)
    }

    function Xm(a, b) {
        a.nb = w();
        Zm(a);
        a.Ea = a.Aa.clone();
        Gg(a.Ea, "t", a.F);
        a.pb = 0;
        a.Q = a.j.Vb(a.j.ob() ? b : null);
        0 < a.cc && (a.Hb = new Jm(v(a.hd, a, a.Q), a.cc));
        a.B.listen(a.Q, "readystatechange", a.ze);
        var c = a.Pa ? fb(a.Pa) : {};
        a.Sa ? (a.Nb = "POST", c["Content-Type"] = "application/x-www-form-urlencoded", a.Q.send(a.Ea, a.Nb, a.Sa, c)) : (a.Nb = "GET", a.bd && !yc && (c.Connection = "close"), a.Q.send(a.Ea, a.Nb, null, c));
        a.j.ma(1)
    }
    g.ze = function(a) {
        a = a.target;
        var b = this.Hb;
        b && 3 == $m(a) ? b.Ya ? b.Kb = !0 : Km(b) : this.hd(a)
    };
    g.hd = function(a) {
        try {
            if (a == this.Q) t: {
                var b = $m(this.Q),
                    c = this.Q.B,
                    d = this.Q.getStatus();
                if (K && !Gc(10) || yc && !Fc("420+")) {
                    if (4 > b) break t
                } else if (3 > b || 3 == b && !wc && !an(this.Q)) break t;
                this.Ja || 4 != b || 7 == c || (8 == c || 0 >= d ? this.j.ma(3) : this.j.ma(2));
                bn(this);
                var e = this.Q.getStatus();
                this.lb = e;
                var f = an(this.Q);
                (this.na = 200 == e) ? (4 == b && cn(this), this.C ? (dn(this, b, f), wc && this.na && 3 == b && (this.B.listen(this.k, "tick", this.ye), this.k.start())) : en(this, f), this.na && !this.Ja && (4 == b ? this.j.Db(this) : (this.na = !1, Zm(this)))) :
                (this.Qa = 400 == e && 0 < f.indexOf("Unknown SID") ? 3 : 0, W(), cn(this), fn(this))
            }
        } catch (h) {
            this.Q && an(this.Q)
        } finally {}
    };

    function dn(a, b, c) {
        for (var d = !0; !a.Ja && a.pb < c.length;) {
            var e = gn(a, c);
            if (e == Vm) {
                4 == b && (a.Qa = 4, W(), d = !1);
                break
            } else if (e == Um) {
                a.Qa = 4;
                W();
                d = !1;
                break
            } else en(a, e)
        }
        4 == b && 0 == c.length && (a.Qa = 1, W(), d = !1);
        a.na = a.na && d;
        d || (cn(a), fn(a))
    }
    g.ye = function() {
        var a = $m(this.Q),
            b = an(this.Q);
        this.pb < b.length && (bn(this), dn(this, a, b), this.na && 4 != a && Zm(this))
    };

    function gn(a, b) {
        var c = a.pb,
            d = b.indexOf("\n", c);
        if (-1 == d) return Vm;
        c = Number(b.substring(c, d));
        if (isNaN(c)) return Um;
        d += 1;
        if (d + c > b.length) return Vm;
        var e = b.substr(d, c);
        a.pb = d + c;
        return e
    }

    function hn(a, b) {
        a.nb = w();
        Zm(a);
        var c = b ? window.location.hostname : "";
        a.Ea = a.Aa.clone();
        M(a.Ea, "DOMAIN", c);
        M(a.Ea, "t", a.F);
        try {
            a.oa = new ActiveXObject("htmlfile")
        } catch (d) {
            cn(a);
            a.Qa = 7;
            W();
            fn(a);
            return
        }
        var e = "<html><body>";
        b && (e += '<script>document.domain="' + c + '"\x3c/script>');
        e += "</body></html>";
        a.oa.open();
        a.oa.write(e);
        a.oa.close();
        a.oa.parentWindow.m = v(a.ue, a);
        a.oa.parentWindow.d = v(a.Vc, a, !0);
        a.oa.parentWindow.rpcClose = v(a.Vc, a, !1);
        c = a.oa.createElement("div");
        a.oa.parentWindow.document.body.appendChild(c);
        c.innerHTML = '<iframe src="' + a.Ea + '"></iframe>';
        a.j.ma(1)
    }
    g.ue = function(a) {
        jn(v(this.te, this, a), 0)
    };
    g.te = function(a) {
        this.Ja || (bn(this), en(this, a), Zm(this))
    };
    g.Vc = function(a) {
        jn(v(this.se, this, a), 0)
    };
    g.se = function(a) {
        this.Ja || (cn(this), this.na = a, this.j.Db(this), this.j.ma(4))
    };
    g.cancel = function() {
        this.Ja = !0;
        cn(this)
    };

    function Zm(a) {
        a.oc = w() + a.A;
        kn(a, a.A)
    }

    function kn(a, b) {
        if (null != a.eb) throw Error("WatchDog timer not null");
        a.eb = jn(v(a.we, a), b)
    }

    function bn(a) {
        a.eb && (m.clearTimeout(a.eb), a.eb = null)
    }
    g.we = function() {
        this.eb = null;
        var a = w();
        0 <= a - this.oc ? (2 != this.cb && this.j.ma(3), cn(this), this.Qa = 2, W(), fn(this)) : kn(this, this.oc - a)
    };

    function fn(a) {
        a.j.Fc() || a.Ja || a.j.Db(a)
    }

    function cn(a) {
        bn(a);
        Bb(a.Hb);
        a.Hb = null;
        a.k.stop();
        a.B.removeAll();
        if (a.Q) {
            var b = a.Q;
            a.Q = null;
            ln(b);
            b.dispose()
        }
        a.oa && (a.oa = null)
    }

    function en(a, b) {
        try {
            a.j.Qc(a, b), a.j.ma(4)
        } catch (c) {}
    };

    function mn(a, b, c, d, e) {
        if (0 == d) c(!1);
        else {
            var f = e || 0;
            d--;
            nn(a, b, function(e) {
                e ? c(!0) : m.setTimeout(function() {
                    mn(a, b, c, d, f)
                }, f)
            })
        }
    }

    function nn(a, b, c) {
        var d = new Image;
        d.onload = function() {
            try {
                on(d), c(!0)
            } catch (a) {}
        };
        d.onerror = function() {
            try {
                on(d), c(!1)
            } catch (a) {}
        };
        d.onabort = function() {
            try {
                on(d), c(!1)
            } catch (a) {}
        };
        d.ontimeout = function() {
            try {
                on(d), c(!1)
            } catch (a) {}
        };
        m.setTimeout(function() {
            if (d.ontimeout) d.ontimeout()
        }, b);
        d.src = a
    }

    function on(a) {
        a.onload = null;
        a.onerror = null;
        a.onabort = null;
        a.ontimeout = null
    };

    function pn(a) {
        this.j = a;
        this.k = new Fm(null, !0)
    }
    g = pn.prototype;
    g.ac = null;
    g.da = null;
    g.Ib = !1;
    g.fd = null;
    g.wb = null;
    g.fc = null;
    g.bc = null;
    g.ga = null;
    g.ya = -1;
    g.kb = null;
    g.fb = null;
    g.connect = function(a) {
        this.bc = a;
        a = qn(this.j, null, this.bc);
        W();
        this.fd = w();
        var b = this.j.H;
        null != b ? (this.kb = b[0], (this.fb = b[1]) ? (this.ga = 1, rn(this)) : (this.ga = 2, sn(this))) : (Gg(a, "MODE", "init"), this.da = new Tm(this, 0, void 0, void 0, void 0), this.da.Pa = this.ac, Ym(this.da, a, !1, null, !0), this.ga = 0)
    };

    function rn(a) {
        var b = qn(a.j, a.fb, "/mail/images/cleardot.gif");
        Ig(b);
        mn(b.toString(), 5E3, v(a.Dd, a), 3, 2E3);
        a.ma(1)
    }
    g.Dd = function(a) {
        if (a) this.ga = 2, sn(this);
        else {
            W();
            var b = this.j;
            b.ka = b.Ba.ya;
            tn(b, 9)
        }
        a && this.ma(2)
    };

    function sn(a) {
        var b = a.j.L;
        if (null != b) W(), b ? (W(), un(a.j, a, !1)) : (W(), un(a.j, a, !0));
        else if (a.da = new Tm(a, 0, void 0, void 0, void 0), a.da.Pa = a.ac, b = a.j, b = qn(b, b.ob() ? a.kb : null, a.bc), W(), !K || Gc(10)) Gg(b, "TYPE", "xmlhttp"), Ym(a.da, b, !1, a.kb, !1);
        else {
            Gg(b, "TYPE", "html");
            var c = a.da;
            a = Boolean(a.kb);
            c.cb = 3;
            c.Aa = Ig(b.clone());
            hn(c, a)
        }
    }
    g.Vb = function(a) {
        return this.j.Vb(a)
    };
    g.Fc = function() {
        return !1
    };
    g.Qc = function(a, b) {
        this.ya = a.lb;
        if (0 == this.ga)
            if (b) {
                try {
                    var c = this.k.parse(b)
                } catch (d) {
                    c = this.j;
                    c.ka = this.ya;
                    tn(c, 2);
                    return
                }
                this.kb = c[0];
                this.fb = c[1]
            } else c = this.j, c.ka = this.ya, tn(c, 2);
        else if (2 == this.ga)
            if (this.Ib) W(), this.fc = w();
            else if ("11111" == b) {
            if (W(), this.Ib = !0, this.wb = w(), c = this.wb - this.fd, !K || Gc(10) || 500 > c) this.ya = 200, this.da.cancel(), W(), un(this.j, this, !0)
        } else W(), this.wb = this.fc = w(), this.Ib = !1
    };
    g.Db = function() {
        this.ya = this.da.lb;
        if (this.da.na) 0 == this.ga ? this.fb ? (this.ga = 1, rn(this)) : (this.ga = 2, sn(this)) : 2 == this.ga && (a = !1, (a = !K || Gc(10) ? this.Ib : 200 > this.fc - this.wb ? !1 : !0) ? (W(), un(this.j, this, !0)) : (W(), un(this.j, this, !1)));
        else {
            0 == this.ga ? W() : 2 == this.ga && W();
            var a = this.j;
            a.ka = this.ya;
            tn(a, 2)
        }
    };
    g.ob = function() {
        return this.j.ob()
    };
    g.isActive = function() {
        return this.j.isActive()
    };
    g.ma = function(a) {
        this.j.ma(a)
    };

    function vn(a) {
        Cm.call(this);
        this.headers = new Nd;
        this.U = a || null;
        this.k = !1;
        this.R = this.j = null;
        this.ra = this.H = "";
        this.B = 0;
        this.A = "";
        this.o = this.ia = this.F = this.W = !1;
        this.C = 0;
        this.L = null;
        this.Ha = "";
        this.M = this.Ia = !1
    }
    y(vn, Cm);
    var wn = /^https?$/i,
        xn = ["POST", "PUT"];
    g = vn.prototype;
    g.send = function(a, b, c, d) {
        if (this.j) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.H + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.H = a;
        this.A = "";
        this.B = 0;
        this.ra = b;
        this.W = !1;
        this.k = !0;
        this.j = this.U ? Sm(this.U) : Sm(Qm);
        this.R = this.U ? Om(this.U) : Om(Qm);
        this.j.onreadystatechange = v(this.Oc, this);
        try {
            Zd(yn(this, "Opening Xhr")), this.ia = !0, this.j.open(b, String(a), !0), this.ia = !1
        } catch (e) {
            Zd(yn(this, "Error opening Xhr: " + e.message));
            zn(this, e);
            return
        }
        a = c || "";
        var f = this.headers.clone();
        d && Ud(d, function(a, b) {
            f.set(b, a)
        });
        d = Fa(f.xa(), An);
        c = m.FormData && a instanceof m.FormData;
        !Ha(xn, b) || d || c || f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        f.forEach(function(a, b) {
            this.j.setRequestHeader(b, a)
        }, this);
        this.Ha && (this.j.responseType = this.Ha);
        "withCredentials" in this.j && (this.j.withCredentials = this.Ia);
        try {
            Bn(this), 0 < this.C && (this.M = Cn(this.j), Zd(yn(this, "Will abort after " + this.C + "ms if incomplete, xhr2 " + this.M)), this.M ? (this.j.timeout = this.C, this.j.ontimeout = v(this.Ec,
                this)) : this.L = Im(this.Ec, this.C, this)), Zd(yn(this, "Sending request")), this.F = !0, this.j.send(a), this.F = !1
        } catch (h) {
            Zd(yn(this, "Send error: " + h.message)), zn(this, h)
        }
    };

    function Cn(a) {
        return K && Fc(9) && fa(a.timeout) && p(a.ontimeout)
    }

    function An(a) {
        return "content-type" == a.toLowerCase()
    }
    g.Ec = function() {
        "undefined" != typeof aa && this.j && (this.A = "Timed out after " + this.C + "ms, aborting", this.B = 8, yn(this, this.A), Dm(this, "timeout"), ln(this, 8))
    };

    function zn(a, b) {
        a.k = !1;
        a.j && (a.o = !0, a.j.abort(), a.o = !1);
        a.A = b;
        a.B = 5;
        Dn(a);
        En(a)
    }

    function Dn(a) {
        a.W || (a.W = !0, Dm(a, "complete"), Dm(a, "error"))
    }

    function ln(a, b) {
        a.j && a.k && (yn(a, "Aborting"), a.k = !1, a.o = !0, a.j.abort(), a.o = !1, a.B = b || 7, Dm(a, "complete"), Dm(a, "abort"), En(a))
    }
    g.G = function() {
        this.j && (this.k && (this.k = !1, this.o = !0, this.j.abort(), this.o = !1), En(this, !0));
        vn.K.G.call(this)
    };
    g.Oc = function() {
        this.J() || (this.ia || this.F || this.o ? Fn(this) : this.ie())
    };
    g.ie = function() {
        Fn(this)
    };

    function Fn(a) {
        if (a.k && "undefined" != typeof aa)
            if (a.R[1] && 4 == $m(a) && 2 == a.getStatus()) yn(a, "Local request error detected and ignored");
            else if (a.F && 4 == $m(a)) Im(a.Oc, 0, a);
        else if (Dm(a, "readystatechange"), 4 == $m(a)) {
            yn(a, "Request complete");
            a.k = !1;
            try {
                var b = a.getStatus(),
                    c;
                t: switch (b) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        c = !0;
                        break t;
                    default:
                        c = !1
                }
                var d;
                if (!(d = c)) {
                    var e;
                    if (e = 0 === b) {
                        var f = qd(String(a.H))[1] || null;
                        if (!f && self.location) var h = self.location.protocol,
                            f = h.substr(0, h.length -
                                1);
                        e = !wn.test(f ? f.toLowerCase() : "")
                    }
                    d = e
                }
                if (d) Dm(a, "complete"), Dm(a, "success");
                else {
                    a.B = 6;
                    var k;
                    try {
                        k = 2 < $m(a) ? a.j.statusText : ""
                    } catch (l) {
                        k = ""
                    }
                    a.A = k + " [" + a.getStatus() + "]";
                    Dn(a)
                }
            } finally {
                En(a)
            }
        }
    }

    function En(a, b) {
        if (a.j) {
            Bn(a);
            var c = a.j,
                d = a.R[0] ? t : null;
            a.j = null;
            a.R = null;
            b || Dm(a, "ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }

    function Bn(a) {
        a.j && a.M && (a.j.ontimeout = null);
        fa(a.L) && (m.clearTimeout(a.L), a.L = null)
    }
    g.isActive = function() {
        return !!this.j
    };

    function $m(a) {
        return a.j ? a.j.readyState : 0
    }
    g.getStatus = function() {
        try {
            return 2 < $m(this) ? this.j.status : -1
        } catch (a) {
            return -1
        }
    };

    function an(a) {
        try {
            return a.j ? a.j.responseText : ""
        } catch (b) {
            return ""
        }
    }

    function yn(a, b) {
        return b + " [" + a.ra + " " + a.H + " " + a.getStatus() + "]"
    };

    function Gn(a, b, c) {
        this.F = a || null;
        this.j = 1;
        this.k = [];
        this.B = [];
        this.A = new Fm(null, !0);
        this.H = b || null;
        this.L = null != c ? c : null
    }

    function Hn(a, b) {
        this.j = a;
        this.map = b;
        this.context = null
    }
    g = Gn.prototype;
    g.ib = null;
    g.X = null;
    g.O = null;
    g.$b = null;
    g.xb = null;
    g.wc = null;
    g.yb = null;
    g.mb = 0;
    g.Sd = 0;
    g.T = null;
    g.Da = null;
    g.va = null;
    g.Ma = null;
    g.Ba = null;
    g.Mb = null;
    g.Za = -1;
    g.Hc = -1;
    g.ka = -1;
    g.jb = 0;
    g.Xa = 0;
    g.Ka = 8;
    var In = new Cm;

    function Jn(a) {
        Af.call(this, "statevent", a)
    }
    y(Jn, Af);

    function Kn(a, b) {
        Af.call(this, "timingevent", a);
        this.size = b
    }
    y(Kn, Af);

    function Ln(a) {
        Af.call(this, "serverreachability", a)
    }
    y(Ln, Af);
    g = Gn.prototype;
    g.connect = function(a, b, c, d, e) {
        W();
        this.$b = b;
        this.ib = c || {};
        d && p(e) && (this.ib.OSID = d, this.ib.OAID = e);
        this.Ba = new pn(this);
        this.Ba.ac = null;
        this.Ba.k = this.A;
        this.Ba.connect(a)
    };
    g.disconnect = function() {
        Mn(this);
        if (3 == this.j) {
            var a = this.mb++,
                b = this.xb.clone();
            M(b, "SID", this.o);
            M(b, "RID", a);
            M(b, "TYPE", "terminate");
            Nn(this, b);
            a = new Tm(this, 0, this.o, a, void 0);
            a.cb = 2;
            a.Aa = Ig(b.clone());
            (new Image).src = a.Aa;
            a.nb = w();
            Zm(a)
        }
        On(this)
    };

    function Mn(a) {
        if (a.Ba) {
            var b = a.Ba;
            b.da && (b.da.cancel(), b.da = null);
            b.ya = -1;
            a.Ba = null
        }
        a.O && (a.O.cancel(), a.O = null);
        a.va && (m.clearTimeout(a.va), a.va = null);
        Pn(a);
        a.X && (a.X.cancel(), a.X = null);
        a.Da && (m.clearTimeout(a.Da), a.Da = null)
    }

    function Qn(a, b) {
        if (0 == a.j) throw Error("Invalid operation: sending map when state is closed");
        a.k.push(new Hn(a.Sd++, b));
        2 != a.j && 3 != a.j || Rn(a)
    }
    g.Fc = function() {
        return 0 == this.j
    };
    g.getState = function() {
        return this.j
    };

    function Sn(a) {
        var b = 0;
        a.O && b++;
        a.X && b++;
        return b
    }

    function Rn(a) {
        a.X || a.Da || (a.Da = jn(v(a.Uc, a), 0), a.jb = 0)
    }
    g.Uc = function(a) {
        this.Da = null;
        Tn(this, a)
    };

    function Tn(a, b) {
        if (1 == a.j) {
            if (!b) {
                a.mb = Math.floor(1E5 * Math.random());
                var c = a.mb++,
                    d = new Tm(a, 0, "", c, void 0);
                d.Pa = null;
                var e = Un(a),
                    f = a.xb.clone();
                M(f, "RID", c);
                a.F && M(f, "CVER", a.F);
                Nn(a, f);
                Wm(d, f, e);
                a.X = d;
                a.j = 2
            }
        } else 3 == a.j && (b ? Vn(a, b) : 0 != a.k.length && (a.X || Vn(a)))
    }

    function Vn(a, b) {
        var c, d;
        b ? 6 < a.Ka ? (a.k = a.B.concat(a.k), a.B.length = 0, c = a.mb - 1, d = Un(a)) : (c = b.H, d = b.Sa) : (c = a.mb++, d = Un(a));
        var e = a.xb.clone();
        M(e, "SID", a.o);
        M(e, "RID", c);
        M(e, "AID", a.Za);
        Nn(a, e);
        c = new Tm(a, 0, a.o, c, a.jb + 1);
        c.Pa = null;
        c.setTimeout(Math.round(1E4) + Math.round(1E4 * Math.random()));
        a.X = c;
        Wm(c, e, d)
    }

    function Nn(a, b) {
        if (a.T) {
            var c = a.T.Cc(a);
            c && Va(c, function(a, c) {
                M(b, c, a)
            })
        }
    }

    function Un(a) {
        var b = Math.min(a.k.length, 1E3),
            c = ["count=" + b],
            d;
        6 < a.Ka && 0 < b ? (d = a.k[0].j, c.push("ofs=" + d)) : d = 0;
        for (var e = 0; e < b; e++) {
            var f = a.k[e].j,
                h = a.k[e].map,
                f = 6 >= a.Ka ? e : f - d;
            try {
                Ud(h, function(a, b) {
                    c.push("req" + f + "_" + b + "=" + encodeURIComponent(a))
                })
            } catch (k) {
                c.push("req" + f + "_type=" + encodeURIComponent("_badmap"))
            }
        }
        a.B = a.B.concat(a.k.splice(0, b));
        return c.join("&")
    }

    function Wn(a) {
        a.O || a.va || (a.C = 1, a.va = jn(v(a.Tc, a), 0), a.Xa = 0)
    }

    function Xn(a) {
        if (a.O || a.va || 3 <= a.Xa) return !1;
        a.C++;
        a.va = jn(v(a.Tc, a), Yn(a, a.Xa));
        a.Xa++;
        return !0
    }
    g.Tc = function() {
        this.va = null;
        this.O = new Tm(this, 0, this.o, "rpc", this.C);
        this.O.Pa = null;
        this.O.cc = 0;
        var a = this.wc.clone();
        M(a, "RID", "rpc");
        M(a, "SID", this.o);
        M(a, "CI", this.Mb ? "0" : "1");
        M(a, "AID", this.Za);
        Nn(this, a);
        if (!K || Gc(10)) M(a, "TYPE", "xmlhttp"), Ym(this.O, a, !0, this.yb, !1);
        else {
            M(a, "TYPE", "html");
            var b = this.O,
                c = Boolean(this.yb);
            b.cb = 3;
            b.Aa = Ig(a.clone());
            hn(b, c)
        }
    };

    function un(a, b, c) {
        a.Mb = c;
        a.ka = b.ya;
        a.Gd(1, 0);
        a.xb = qn(a, null, a.$b);
        Rn(a)
    }
    g.Qc = function(a, b) {
        if (0 != this.j && (this.O == a || this.X == a))
            if (this.ka = a.lb, this.X == a && 3 == this.j)
                if (7 < this.Ka) {
                    var c;
                    try {
                        c = this.A.parse(b)
                    } catch (d) {
                        c = null
                    }
                    if (da(c) && 3 == c.length)
                        if (0 == c[0]) t: {
                            if (!this.va) {
                                if (this.O)
                                    if (this.O.nb + 3E3 < this.X.nb) Pn(this), this.O.cancel(), this.O = null;
                                    else break t;
                                Xn(this);
                                W()
                            }
                        } else this.Hc = c[1], 0 < this.Hc - this.Za && 37500 > c[2] && this.Mb && 0 == this.Xa && !this.Ma && (this.Ma = jn(v(this.Td, this), 6E3));
                        else tn(this, 11)
                } else "y2f%" != b && tn(this, 11);
        else if (this.O == a && Pn(this), !/^[\s\xa0]*$/.test(b)) {
            c =
                this.A.parse(b);
            da(c);
            for (var e = 0; e < c.length; e++) {
                var f = c[e];
                this.Za = f[0];
                f = f[1];
                2 == this.j ? "c" == f[0] ? (this.o = f[1], this.yb = f[2], f = f[3], null != f ? this.Ka = f : this.Ka = 6, this.j = 3, this.T && this.T.Ac(this), this.wc = qn(this, this.ob() ? this.yb : null, this.$b), Wn(this)) : "stop" == f[0] && tn(this, 7) : 3 == this.j && ("stop" == f[0] ? tn(this, 7) : "noop" != f[0] && this.T && this.T.zc(this, f), this.Xa = 0)
            }
        }
    };
    g.Td = function() {
        null != this.Ma && (this.Ma = null, this.O.cancel(), this.O = null, Xn(this), W())
    };

    function Pn(a) {
        null != a.Ma && (m.clearTimeout(a.Ma), a.Ma = null)
    }
    g.Db = function(a) {
        var b;
        if (this.O == a) Pn(this), this.O = null, b = 2;
        else if (this.X == a) this.X = null, b = 1;
        else return;
        this.ka = a.lb;
        if (0 != this.j)
            if (a.na) 1 == b ? (w(), Dm(In, new Kn(In, a.Sa ? a.Sa.length : 0)), Rn(this), this.B.length = 0) : Wn(this);
            else {
                var c = a.Qa,
                    d;
                if (!(d = 3 == c || 7 == c || 0 == c && 0 < this.ka)) {
                    if (d = 1 == b) this.X || this.Da || 1 == this.j || 2 <= this.jb ? d = !1 : (this.Da = jn(v(this.Uc, this, a), Yn(this, this.jb)), this.jb++, d = !0);
                    d = !(d || 2 == b && Xn(this))
                }
                if (d) switch (c) {
                    case 1:
                        tn(this, 5);
                        break;
                    case 4:
                        tn(this, 10);
                        break;
                    case 3:
                        tn(this, 6);
                        break;
                    case 7:
                        tn(this, 12);
                        break;
                    default:
                        tn(this, 2)
                }
            }
    };

    function Yn(a, b) {
        var c = 5E3 + Math.floor(1E4 * Math.random());
        a.isActive() || (c *= 2);
        return c * b
    }
    g.Gd = function(a) {
        if (!Ha(arguments, this.j)) throw Error("Unexpected channel state: " + this.j);
    };

    function tn(a, b) {
        if (2 == b || 9 == b) {
            var c = null;
            a.T && (c = null);
            var d = v(a.Ne, a);
            c || (c = new sg("//www.google.com/images/cleardot.gif"), Ig(c));
            nn(c.toString(), 1E4, d)
        } else W();
        Zn(a, b)
    }
    g.Ne = function(a) {
        a ? W() : (W(), Zn(this, 8))
    };

    function Zn(a, b) {
        a.j = 0;
        a.T && a.T.yc(a, b);
        On(a);
        Mn(a)
    }

    function On(a) {
        a.j = 0;
        a.ka = -1;
        if (a.T)
            if (0 == a.B.length && 0 == a.k.length) a.T.Tb(a);
            else {
                var b = Oa(a.B),
                    c = Oa(a.k);
                a.B.length = 0;
                a.k.length = 0;
                a.T.Tb(a, b, c)
            }
    }

    function qn(a, b, c) {
        var d = Jg(c);
        if ("" != d.wa) b && ug(d, b + "." + d.wa), vg(d, d.Ra);
        else var e = window.location,
            d = Kg(e.protocol, b ? b + "." + e.hostname : e.hostname, e.port, c);
        a.ib && Va(a.ib, function(a, b) {
            M(d, b, a)
        });
        M(d, "VER", a.Ka);
        Nn(a, d);
        return d
    }
    g.Vb = function(a) {
        if (a) throw Error("Can't create secondary domain capable XhrIo object.");
        a = new vn;
        a.Ia = !1;
        return a
    };
    g.isActive = function() {
        return !!this.T && this.T.isActive(this)
    };

    function jn(a, b) {
        if (!ga(a)) throw Error("Fn must not be null and must be a function");
        return m.setTimeout(function() {
            a()
        }, b)
    }
    g.ma = function() {
        Dm(In, new Ln(In))
    };

    function W() {
        Dm(In, new Jn(In))
    }
    g.ob = function() {
        return !(!K || Gc(10))
    };

    function $n() {}
    g = $n.prototype;
    g.Ac = function() {};
    g.zc = function() {};
    g.yc = function() {};
    g.Tb = function() {};
    g.Cc = function() {
        return {}
    };
    g.isActive = function() {
        return !0
    };

    function ao(a, b) {
        Gm.call(this);
        if (ga(a)) b && (a = v(a, b));
        else if (a && ga(a.handleEvent)) a = v(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        this.F = a;
        Nf(this, "tick", v(this.C, this));
        this.stop();
        Hm(this, 5E3 + 2E4 * Math.random())
    }
    y(ao, Gm);
    ao.prototype.A = 0;
    ao.prototype.C = function() {
        if (500 < this.j) {
            var a = this.j;
            24E4 > 2 * a && (a *= 2);
            Hm(this, a)
        }
        this.F()
    };
    ao.prototype.start = function() {
        ao.K.start.call(this);
        this.A = w() + this.j
    };
    ao.prototype.stop = function() {
        this.A = 0;
        ao.K.stop.call(this)
    };

    function bo(a, b) {
        this.M = a;
        this.B = b;
        this.o = new E;
        this.k = new ao(this.Ue, this);
        this.j = null;
        this.ha = !1;
        this.C = null;
        this.L = "";
        this.H = this.A = 0;
        this.F = []
    }
    y(bo, $n);
    g = bo.prototype;
    g.subscribe = function(a, b, c) {
        return this.o.subscribe(a, b, c)
    };
    g.unsubscribe = function(a, b, c) {
        return this.o.unsubscribe(a, b, c)
    };
    g.pa = function(a) {
        return this.o.pa(a)
    };
    g.publish = function(a, b) {
        return this.o.publish.apply(this.o, arguments)
    };
    g.dispose = function() {
        this.ha || (this.ha = !0, this.o.clear(), this.disconnect(), Bb(this.o))
    };
    g.J = function() {
        return this.ha
    };

    function co(a) {
        return {
            firstTestResults: [""],
            secondTestResults: !a.j.Mb,
            sessionId: a.j.o,
            arrayId: a.j.Za
        }
    }
    g.connect = function(a, b, c) {
        if (!this.j || 2 != this.j.getState()) {
            this.L = "";
            this.k.stop();
            this.C = a || null;
            this.A = b || 0;
            a = this.M + "/test";
            b = this.M + "/bind";
            var d = new Gn("1", c ? c.firstTestResults : null, c ? c.secondTestResults : null),
                e = this.j;
            e && (e.T = null);
            d.T = this;
            this.j = d;
            e ? (3 != e.getState() && 0 == Sn(e) || e.getState(), this.j.connect(a, b, this.B, e.o, e.Za)) : c ? this.j.connect(a, b, this.B, c.sessionId, c.arrayId) : this.j.connect(a, b, this.B)
        }
    };
    g.disconnect = function(a) {
        this.H = a || 0;
        this.k.stop();
        this.j && (3 == this.j.getState() && Tn(this.j), this.j.disconnect());
        this.H = 0
    };
    g.sendMessage = function(a, b) {
        var c = {
            _sc: a
        };
        b && ib(c, b);
        this.k.enabled || 2 == (this.j ? this.j.getState() : 0) ? this.F.push(c) : this.j && 3 == this.j.getState() && Qn(this.j, c)
    };
    g.Ac = function() {
        var a = this.k;
        a.stop();
        Hm(a, 5E3 + 2E4 * Math.random());
        this.C = null;
        this.A = 0;
        if (this.F.length) {
            a = this.F;
            this.F = [];
            for (var b = 0, c = a.length; b < c; ++b) Qn(this.j, a[b])
        }
        this.publish("handlerOpened")
    };
    g.yc = function(a, b) {
        var c = 2 == b && 401 == this.j.ka;
        if (4 != b && !c) {
            if (6 == b || 410 == this.j.ka) c = this.k, c.stop(), Hm(c, 500);
            this.k.start()
        }
        this.publish("handlerError", b)
    };
    g.Tb = function(a, b, c) {
        if (!this.k.enabled) this.publish("handlerClosed");
        else if (c)
            for (a = 0, b = c.length; a < b; ++a) this.F.push(c[a].map)
    };
    g.Cc = function() {
        var a = {
            v: 2
        };
        this.L && (a.gsessionid = this.L);
        0 != this.A && (a.ui = "" + this.A);
        0 != this.H && (a.ui = "" + this.H);
        this.C && ib(a, this.C);
        return a
    };
    g.zc = function(a, b) {
        if ("S" == b[0]) this.L = b[1];
        else if ("gracefulReconnect" == b[0]) {
            var c = this.k;
            c.stop();
            Hm(c, 500);
            this.k.start();
            this.j.disconnect()
        } else this.publish("handlerMessage", new Am(b[0], b[1]))
    };

    function eo(a, b) {
        (a.B.loungeIdToken = b) || a.k.stop()
    }
    g.getDeviceId = function() {
        return this.B.id
    };
    g.Ue = function() {
        this.k.stop();
        0 != Sn(this.j) ? this.k.start() : this.connect(this.C, this.A)
    };

    function fo(a) {
        this.reset(a)
    }

    function go(a, b) {
        if (a.k) throw Error(b + " is not allowed in V3.");
    }

    function ho(a) {
        a.volume = -1;
        a.C = !1;
        a.B = null;
        a.j = -1;
        a.o = null;
        a.A = 0;
        a.F = w()
    }
    g = fo.prototype;
    g.reset = function(a) {
        this.videoIds = [];
        this.k = "";
        this.index = -1;
        this.videoId = "";
        ho(this);
        a && (this.videoIds = a.videoIds, this.index = a.index, this.k = a.listId, this.videoId = a.videoId, this.j = a.playerState, this.o = a.errorReason, this.volume = a.volume, this.C = a.muted, this.B = a.trackData, this.A = a.playerTime, this.F = a.playerTimeAt)
    };

    function io(a) {
        return a.k ? a.videoId : a.videoIds[a.index]
    }

    function jo(a) {
        switch (a.j) {
            case 1:
                return (w() - a.F) / 1E3 + a.A;
            case -1E3:
                return 0
        }
        return a.A
    }
    g.setVideoId = function(a) {
        go(this, "setVideoId");
        var b = this.index;
        this.index = Ba(this.videoIds, a);
        b != this.index && ho(this);
        return -1 != b
    };

    function ko(a, b, c) {
        go(a, "setPlaylist");
        c = c || io(a);
        Sa(a.videoIds, b) && c == io(a) || (a.videoIds = Oa(b), a.setVideoId(c))
    }
    g.add = function(a) {
        go(this, "add");
        return a && !Ha(this.videoIds, a) ? (this.videoIds.push(a), !0) : !1
    };
    g.remove = function(a) {
        go(this, "remove");
        var b = io(this);
        return La(this.videoIds, a) ? (this.index = Ba(this.videoIds, b), !0) : !1
    };

    function lo(a) {
        var b = {};
        b.videoIds = Oa(a.videoIds);
        b.index = a.index;
        b.listId = a.k;
        b.videoId = a.videoId;
        b.playerState = a.j;
        b.errorReason = a.o;
        b.volume = a.volume;
        b.muted = a.C;
        b.trackData = gb(a.B);
        b.playerTime = a.A;
        b.playerTimeAt = a.F;
        return b
    }
    g.clone = function() {
        return new fo(lo(this))
    };

    function X(a, b, c) {
        U.call(this);
        this.qa = a;
        this.H = [];
        this.H.push(L(window, "beforeunload", v(this.Md, this)));
        this.k = [];
        this.D = new fo;
        3 == c["mdx-version"] && (this.D.k = "RQ" + b.token);
        this.L = b.id;
        this.j = mo(this, c);
        this.j.subscribe("handlerOpened", this.Yd, this);
        this.j.subscribe("handlerClosed", this.Ud, this);
        this.j.subscribe("handlerError", this.Vd, this);
        this.D.k ? this.j.subscribe("handlerMessage", this.Wd, this) : this.j.subscribe("handlerMessage", this.Xd, this);
        eo(this.j, b.token);
        this.subscribe("remoteQueueChange",
            function() {
                var a = this.D.videoId;
                Pk() && S("yt-remote-session-video-id", a)
            }, this)
    }
    y(X, U);
    g = X.prototype;
    g.gb = NaN;
    g.ic = !1;
    g.Jb = NaN;
    g.hc = NaN;
    g.ub = NaN;
    g.Ab = NaN;
    g.connect = function(a, b) {
        if (b) {
            if (this.D.k) {
                var c = b.listId,
                    d = b.videoId,
                    e = b.index,
                    f = b.currentTime || 0;
                5 >= f && (f = 0);
                h = {
                    videoId: d,
                    currentTime: f
                };
                c && (h.listId = c);
                p(e) && (h.currentIndex = e);
                c && (this.D.k = c);
                this.D.videoId = d;
                this.D.index = e || 0
            } else {
                var d = b.videoIds[b.index],
                    f = b.currentTime || 0;
                5 >= f && (f = 0);
                var h = {
                    videoIds: d,
                    videoId: d,
                    currentTime: f
                };
                this.D.videoIds = [d];
                this.D.index = 0
            }
            this.D.state = 3;
            c = this.D;
            c.A = f;
            c.F = w();
            this.I("Connecting with setPlaylist and params: " + R(h));
            this.j.connect({
                method: "setPlaylist",
                params: R(h)
            }, a, Tk())
        } else this.I("Connecting without params"), this.j.connect({}, a, Tk());
        no(this)
    };
    g.dispose = function() {
        this.J() || (this.publish("beforeDispose"), oo(this, 3));
        X.K.dispose.call(this)
    };
    g.G = function() {
        po(this);
        qo(this);
        ro(this);
        H(this.ub);
        this.ub = NaN;
        H(this.Ab);
        this.Ab = NaN;
        this.A = null;
        fd(this.H);
        this.H.length = 0;
        this.j.dispose();
        X.K.G.call(this);
        this.k = this.D = this.j = null
    };
    g.I = function(a) {
        Wj("conn", a)
    };
    g.Md = function() {
        this.o(2)
    };

    function mo(a, b) {
        return new bo(rk(a.qa, "/bc", void 0, !1), b)
    }

    function oo(a, b) {
        a.publish("proxyStateChange", b)
    }

    function no(a) {
        a.gb = G(v(function() {
            this.I("Connecting timeout");
            this.o(1)
        }, a), 2E4)
    }

    function po(a) {
        H(a.gb);
        a.gb = NaN
    }

    function ro(a) {
        H(a.Jb);
        a.Jb = NaN
    }

    function so(a) {
        qo(a);
        a.hc = G(v(function() {
            to(this, "getNowPlaying")
        }, a), 2E4)
    }

    function qo(a) {
        H(a.hc);
        a.hc = NaN
    }

    function uo(a) {
        var b = a.j;
        return !!b.j && 3 == b.j.getState() && isNaN(a.gb)
    }
    g.Yd = function() {
        this.I("Channel opened");
        this.ic && (this.ic = !1, ro(this), this.Jb = G(v(function() {
            this.I("Timing out waiting for a screen.");
            this.o(1)
        }, this), 15E3));
        bl(co(this.j), this.L)
    };
    g.Ud = function() {
        this.I("Channel closed");
        isNaN(this.gb) ? cl(!0) : cl();
        this.dispose()
    };
    g.Vd = function(a) {
        cl();
        isNaN(this.C()) ? (this.I("Channel error: " + a + " without reconnection"), this.dispose()) : (this.ic = !0, this.I("Channel error: " + a + " with reconnection in " + this.C() + " ms"), oo(this, 2))
    };

    function vo(a, b) {
        b && (po(a), ro(a));
        b == uo(a) ? b && (oo(a, 1), to(a, "getSubtitlesTrack")) : b ? (a.F() && a.D.reset(), oo(a, 1), to(a, "getNowPlaying"), wo(a)) : a.o(1)
    }

    function xo(a, b) {
        var c = b.params.videoId;
        delete b.params.videoId;
        c == a.D.videoId && (db(b.params) ? a.D.B = null : a.D.B = b.params, a.publish("remotePlayerChange"))
    }

    function yo(a, b) {
        var c = b.params.videoId || b.params.video_id,
            d = parseInt(b.params.currentIndex, 10);
        a.D.k = b.params.listId || a.D.k;
        var e = a.D,
            f = e.videoId;
        e.videoId = c;
        e.index = d;
        c != f && ho(e);
        a.publish("remoteQueueChange")
    }

    function zo(a, b) {
        b.params = b.params || {};
        yo(a, b);
        Ao(a, b)
    }

    function Ao(a, b) {
        var c = parseInt(b.params.currentTime || b.params.current_time, 10),
            d = a.D;
        d.A = isNaN(c) ? 0 : c;
        d.F = w();
        c = parseInt(b.params.state, 10);
        c = isNaN(c) ? -1 : c; - 1 == c && -1E3 == a.D.j && (c = -1E3);
        a.D.j = c;
        d = null; - 1E3 == c && (d = a.D.o || "unknown", p(b.params.currentError) && (d = yh(b.params.currentError).reason || d));
        a.D.o = d;
        1 == a.D.j ? so(a) : qo(a);
        a.publish("remotePlayerChange")
    }

    function Bo(a, b) {
        var c = "true" == b.params.muted;
        a.D.volume = parseInt(b.params.volume, 10);
        a.D.C = c;
        a.publish("remotePlayerChange")
    }
    g.Wd = function(a) {
        a.params ? this.I("Received: action=" + a.action + ", params=" + R(a.params)) : this.I("Received: action=" + a.action + " {}");
        switch (a.action) {
            case "loungeStatus":
                a = yh(a.params.devices);
                this.k = B(a, function(a) {
                    return new Kk(a)
                });
                a = !!Fa(this.k, function(a) {
                    return "LOUNGE_SCREEN" == a.type
                });
                vo(this, a);
                break;
            case "loungeScreenConnected":
                vo(this, !0);
                break;
            case "loungeScreenDisconnected":
                Ma(this.k, function(a) {
                    return "LOUNGE_SCREEN" == a.type
                });
                vo(this, !1);
                break;
            case "remoteConnected":
                var b = new Kk(yh(a.params.device));
                Fa(this.k, function(a) {
                    return a.equals(b)
                }) || Ka(this.k, b);
                break;
            case "remoteDisconnected":
                b = new Kk(yh(a.params.device));
                Ma(this.k, function(a) {
                    return a.equals(b)
                });
                break;
            case "gracefulDisconnect":
                break;
            case "playlistModified":
                yo(this, a);
                break;
            case "nowPlaying":
                zo(this, a);
                break;
            case "onStateChange":
                Ao(this, a);
                break;
            case "onVolumeChanged":
                Bo(this, a);
                break;
            case "onSubtitlesTrackChanged":
                xo(this, a);
                break;
            default:
                this.I("Unrecognized action: " + a.action)
        }
    };
    g.Xd = function(a) {
        a.params ? this.I("Received: action=" + a.action + ", params=" + R(a.params)) : this.I("Received: action=" + a.action);
        Co(this, a);
        Do(this, a);
        if (uo(this)) {
            var b = this.D.clone(),
                c = !1,
                d, e, f, h, k, l, n;
            a.params && (d = a.params.videoId || a.params.video_id, e = a.params.videoIds || a.params.video_ids, f = a.params.state, h = a.params.currentTime || a.params.current_time, k = a.params.volume, l = a.params.muted, p(a.params.currentError) && (n = yh(a.params.currentError)));
            if ("onSubtitlesTrackChanged" == a.action) d == io(this.D) && (delete a.params.videoId,
                db(a.params) ? this.D.B = null : this.D.B = a.params, this.publish("remotePlayerChange"));
            else if (io(this.D) || "onStateChange" != a.action) "playlistModified" != a.action && "nowPlayingPlaylist" != a.action || e ? (d || "nowPlaying" != a.action && "nowPlayingPlaylist" != a.action ? d || (d = io(this.D)) : this.D.setVideoId(""), e && (e = e.split(","), ko(this.D, e, d))) : ko(this.D, []), this.D.add(d) && to(this, "getPlaylist"), d && this.D.setVideoId(d), b.index == this.D.index && Sa(b.videoIds, this.D.videoIds) || this.publish("remoteQueueChange"), p(f) && (b = parseInt(f,
                10), b = isNaN(b) ? -1 : b, -1 == b && -1E3 == this.D.j && (b = -1E3), 0 == b && "0" == h && (b = -1), c = c || b != this.D.j, this.D.j = b, d = null, -1E3 == b && (d = this.D.o || "unknown", n && (d = n.reason || d)), c = c || this.D.o != d, this.D.o = d, 1 == this.D.j ? so(this) : qo(this)), "onError" != a.action || -1 != this.D.j && -1E3 != this.D.j || (a = yh(a.params.errors) || [], 1 == a.length && "PLAYER_ERROR" == a[0].error && a[0].videoId == io(this.D) && (this.D.j = -1E3, this.D.o = a[0].reason || "unknown", c = !0)), h && (b = parseInt(h, 10), c = this.D, c.A = isNaN(b) ? 0 : b, c.F = w(), c = !0), p(k) && (b = parseInt(k, 10),
                isNaN(b) || (c = c || this.D.volume != b, this.D.volume = b), p(l) && (l = "true" == l, c = c || this.D.C != l, this.D.C = l)), c && this.publish("remotePlayerChange")
        }
    };

    function Co(a, b) {
        switch (b.action) {
            case "loungeStatus":
                var c = yh(b.params.devices);
                a.k = B(c, function(a) {
                    return new Kk(a)
                });
                break;
            case "loungeScreenDisconnected":
                Ma(a.k, function(a) {
                    return "LOUNGE_SCREEN" == a.type
                });
                break;
            case "remoteConnected":
                var d = new Kk(yh(b.params.device));
                Fa(a.k, function(a) {
                    return a.equals(d)
                }) || Ka(a.k, d);
                break;
            case "remoteDisconnected":
                d = new Kk(yh(b.params.device)), Ma(a.k, function(a) {
                    return a.equals(d)
                })
        }
    }

    function Do(a, b) {
        var c = !1;
        if ("loungeStatus" == b.action) c = !!Fa(a.k, function(a) {
            return "LOUNGE_SCREEN" == a.type
        });
        else if ("loungeScreenConnected" == b.action) c = !0;
        else if ("loungeScreenDisconnected" == b.action) c = !1;
        else return;
        if (!isNaN(a.Jb))
            if (c) ro(a);
            else return;
        c == uo(a) ? c && oo(a, 1) : c ? (po(a), a.F() && a.D.reset(), oo(a, 1), to(a, "getNowPlaying"), wo(a)) : a.o(1)
    }
    g.Ce = function() {
        if (this.A) {
            var a = this.A;
            this.A = null;
            this.D.videoId != a && to(this, "getNowPlaying")
        }
    };
    X.prototype.subscribe = X.prototype.subscribe;
    X.prototype.unsubscribeByKey = X.prototype.pa;
    X.prototype.U = function() {
        var a = 3;
        this.J() || (a = 0, isNaN(this.C()) ? uo(this) && (a = 1) : a = 2);
        return a
    };
    X.prototype.getProxyState = X.prototype.U;
    X.prototype.o = function(a) {
        this.I("Disconnecting with " + a);
        po(this);
        this.publish("beforeDisconnect", a);
        1 == a && cl();
        this.j.disconnect(a);
        this.dispose()
    };
    X.prototype.disconnect = X.prototype.o;
    X.prototype.R = function() {
        var a = this.D;
        if (this.A) {
            var b = a = this.D.clone(),
                c = this.A,
                d = a.index,
                e = b.videoId;
            b.videoId = c;
            b.index = d;
            c != e && ho(b)
        }
        return lo(a)
    };
    X.prototype.getPlayerContextData = X.prototype.R;
    X.prototype.ia = function(a) {
        var b = new fo(a);
        b.videoId && b.videoId != this.D.videoId && (this.A = b.videoId, H(this.ub), this.ub = G(v(this.Ce, this), 5E3));
        var c = [];
        this.D.k == b.k && this.D.videoId == b.videoId && this.D.index == b.index && Sa(this.D.videoIds, b.videoIds) || c.push("remoteQueueChange");
        this.D.j == b.j && this.D.volume == b.volume && this.D.C == b.C && jo(this.D) == jo(b) && R(this.D.B) == R(b.B) || c.push("remotePlayerChange");
        this.D.reset(a);
        A(c, function(a) {
            this.publish(a)
        }, this)
    };
    X.prototype.setPlayerContextData = X.prototype.ia;
    X.prototype.M = function() {
        return this.j.B.loungeIdToken
    };
    X.prototype.getLoungeToken = X.prototype.M;
    X.prototype.F = function() {
        var a = this.j.getDeviceId(),
            b = Fa(this.k, function(b) {
                return "REMOTE_CONTROL" == b.type && b.id != a
            });
        return b ? b.id : ""
    };
    X.prototype.getOtherConnectedRemoteId = X.prototype.F;
    X.prototype.C = function() {
        var a = this.j;
        return a.k.enabled ? a.k.A - w() : NaN
    };
    X.prototype.getReconnectTimeout = X.prototype.C;
    X.prototype.ra = function() {
        if (!isNaN(this.C())) {
            var a = this.j.k;
            a.enabled && (a.stop(), a.start(), a.C())
        }
    };
    X.prototype.reconnect = X.prototype.ra;

    function wo(a) {
        H(a.Ab);
        a.Ab = G(v(a.o, a, 1), 864E5)
    }

    function to(a, b, c) {
        c ? a.I("Sending: action=" + b + ", params=" + R(c)) : a.I("Sending: action=" + b);
        a.j.sendMessage(b, c)
    }
    X.prototype.W = function(a, b) {
        to(this, a, b);
        wo(this)
    };
    X.prototype.sendMessage = X.prototype.W;

    function Eo(a) {
        U.call(this);
        this.A = a;
        this.la = Fo();
        this.I("Initializing local screens: " + hk(this.la));
        this.o = Go();
        this.I("Initializing account screens: " + hk(this.o));
        this.Ub = null;
        this.j = [];
        this.k = [];
        Ho(this, vm() || []);
        this.I("Initializing DIAL devices: " + uk(this.k));
        a = fk(Zk());
        Io(this, a);
        this.I("Initializing online screens: " + hk(this.j));
        this.C = w() + 3E5;
        Jo(this)
    }
    y(Eo, U);
    var Ko = [2E3, 2E3, 1E3, 1E3, 1E3, 2E3, 2E3, 5E3, 5E3, 1E4];
    g = Eo.prototype;
    g.hb = NaN;
    g.Fb = "";
    g.I = function(a) {
        Wj("RM", a)
    };
    g.P = function(a) {
        Wj("RM", a)
    };

    function Go() {
        var a = Fo(),
            b = fk(Zk());
        return Ca(b, function(b) {
            return !Ck(a, b)
        })
    }

    function Fo() {
        var a = fk(Vk());
        return Ca(a, function(a) {
            return !a.uuid
        })
    }

    function Jo(a) {
        Rb("yt-remote-cast-device-list-update", function() {
            var a = vm();
            Ho(this, a || [])
        }, a);
        Rb("yt-remote-cast-device-status-update", a.Qe, a);
        a.$c();
        var b = w() > a.C ? 2E4 : 1E4;
        Ib(v(a.$c, a), b)
    }
    g.publish = function(a, b) {
        if (this.J()) return !1;
        this.I("Firing " + a);
        return this.B.publish.apply(this.B, arguments)
    };
    g.$c = function() {
        var a = vm() || [];
        0 == a.length || Ho(this, a);
        a = Lo(this);
        0 == a.length || (Da(a, function(a) {
            return !Ck(this.o, a)
        }, this) && Xk() ? Mo(this) : No(this, a))
    };

    function Oo(a, b) {
        var c = Lo(a);
        return Ca(b, function(a) {
            return a.uuid ? (a = Bk(this.k, a.uuid), !!a && "RUNNING" == a.status) : !!Ck(c, a)
        }, a)
    }

    function Ho(a, b) {
        var c = !1;
        A(b, function(a) {
            var b = Dk(this.la, a.id);
            b && b.name != a.name && (this.I("Renaming screen id " + b.id + " from " + b.name + " to " + a.name), b.name = a.name, c = !0)
        }, a);
        c && (a.I("Renaming due to DIAL."), Po(a));
        $k(yk(b));
        var d = !Sa(a.k, b, Ak);
        d && a.I("Updating DIAL devices: " + uk(a.k) + " to " + uk(b));
        a.k = b;
        Io(a, a.j);
        d && a.publish("onlineReceiverChange")
    }
    g.Qe = function(a) {
        var b = Bk(this.k, a.id);
        b && (this.I("Updating DIAL device: " + b.id + "(" + b.name + ") from status: " + b.status + " to status: " + a.status + " and from activityId: " + b.activityId + " to activityId: " + a.activityId), b.activityId = a.activityId, b.status = a.status, $k(yk(this.k)));
        Io(this, this.j)
    };

    function Io(a, b, c) {
        var d = Oo(a, b),
            e = !Sa(a.j, d, ck);
        if (e || c) 0 == b.length || Yk(B(d, dk));
        e && (a.I("Updating online screens: " + hk(a.j) + " -> " + hk(d)), a.j = d, a.publish("onlineReceiverChange"))
    }

    function No(a, b) {
        var c = [],
            d = {};
        A(b, function(a) {
            a.token && (d[a.token] = a, c.push(a.token))
        });
        var e = {
            method: "POST",
            S: {
                lounge_token: c.join(",")
            },
            context: a,
            ca: function(a, b) {
                var c = [];
                A(b.screens || [], function(a) {
                    "online" == a.status && c.push(d[a.loungeToken])
                });
                var e = this.Ub ? Qo(this, this.Ub) : null;
                e && !Ck(c, e) && c.push(e);
                Io(this, c, !0)
            }
        };
        gj(rk(a.A, "/pairing/get_screen_availability"), e)
    }

    function Mo(a) {
        var b = Lo(a),
            c = B(b, function(a) {
                return a.id
            });
        0 != c.length && (a.I("Updating lounge tokens for: " + R(c)), gj(rk(a.A, "/pairing/get_lounge_token_batch"), {
            S: {
                screen_ids: c.join(",")
            },
            method: "POST",
            context: a,
            ca: function(a, c) {
                Ro(this, c.screens || []);
                this.la = Ca(this.la, function(a) {
                    return !!a.token
                });
                Po(this);
                No(this, b)
            }
        }))
    }

    function Ro(a, b) {
        A(Na(a.la, a.o), function(a) {
            var d = Fa(b, function(b) {
                return a.id == b.screenId
            });
            d && (a.token = d.loungeToken)
        })
    }

    function Po(a) {
        var b = Fo();
        Sa(a.la, b, ck) || (a.I("Saving local screens: " + hk(b) + " to " + hk(a.la)), Uk(B(a.la, dk)), Io(a, a.j, !0), Ho(a, vm() || []), a.publish("managedScreenChange", Lo(a)))
    }

    function So(a, b, c) {
        var d = Ga(b, function(a) {
                return bk(c, a)
            }),
            e = 0 > d;
        0 > d ? b.push(c) : b[d] = c;
        Ck(a.j, c) || a.j.push(c);
        return e
    }
    g.Dc = function(a, b) {
        for (var c = Lo(this), c = B(c, function(a) {
                return a.name
            }), d = a, e = 2; Ha(c, d);) d = b.call(m, e), e++;
        return d
    };
    g.Wc = function(a, b, c) {
        var d = !1;
        b >= Ko.length && (this.I("Pairing DIAL device " + a + " with " + c + " timed out."), d = !0);
        var e = Bk(this.k, a);
        if (!e) this.I("Pairing DIAL device " + a + " with " + c + " failed: no device for " + a), d = !0;
        else if ("ERROR" == e.status || "STOPPED" == e.status) this.I("Pairing DIAL device " + a + " with " + c + " failed: launch error on " + a), d = !0;
        d ? (To(this), this.publish("screenPair", null)) : gj(rk(this.A, "/pairing/get_screen"), {
            method: "POST",
            S: {
                pairing_code: c
            },
            context: this,
            ca: function(a, b) {
                if (c == this.Fb) {
                    To(this);
                    var d = new Zj(b.screen);
                    d.name = e.name;
                    d.uuid = e.id;
                    this.I("Pairing " + c + " succeeded.");
                    var l = So(this, this.la, d);
                    this.I("Paired with " + (l ? "a new" : "an old") + " local screen:" + gk(d));
                    Po(this);
                    this.publish("screenPair", d)
                }
            },
            onError: function() {
                c == this.Fb && (this.I("Polling pairing code: " + c), H(this.hb), this.hb = G(v(this.Wc, this, a, b + 1, c), Ko[b]))
            }
        })
    };

    function Uo(a, b, c) {
        var d = Y,
            e = "";
        To(d);
        if (Bk(d.k, a)) {
            if (!e) {
                var f = e = vk();
                om();
                var h = xm(a),
                    k = lm();
                if (k && h) {
                    var l = new cast.Receiver(h.id, h.name),
                        l = new cast.LaunchRequest("YouTube", l);
                    l.parameters = "pairingCode=" + f;
                    l.description = new cast.LaunchDescription;
                    l.description.text = document.title;
                    b && (l.parameters += "&v=" + b, c && (l.parameters += "&t=" + Math.round(c)), l.description.url = "http://i.ytimg.com/vi/" + b + "/default.jpg");
                    "UNKNOWN" != h.status && (h.status = "UNKNOWN", tm(h), I("yt-remote-cast-device-status-update", h));
                    jm("Sending a cast launch request with params: " + l.parameters);
                    k.launch(l, oa(ym, a))
                } else jm("No cast API or no cast device. Dropping cast launch.")
            }
            d.Fb = e;
            d.hb = G(v(d.Wc, d, a, 0, e), Ko[0])
        } else d.I("No DIAL device with id: " + a)
    }

    function To(a) {
        H(a.hb);
        a.hb = NaN;
        a.Fb = ""
    }

    function Qo(a, b) {
        var c = Dk(Lo(a), b);
        a.I("Found screen: " + gk(c) + " with key: " + b);
        return c
    }

    function Vo(a) {
        var b = Y,
            c = Dk(b.j, a);
        b.I("Found online screen: " + gk(c) + " with key: " + a);
        return c
    }

    function Wo(a) {
        var b = Y,
            c = Bk(b.k, a);
        if (!c) {
            var d = Dk(b.la, a);
            d && (c = Bk(b.k, d.uuid))
        }
        b.I("Found DIAL: " + (c ? c.toString() : "null") + " with key: " + a);
        return c
    }

    function Lo(a) {
        return Na(a.o, Ca(a.la, function(a) {
            return !Ck(this.o, a)
        }, a))
    };

    function Xo(a) {
        Ek.call(this, "ScreenServiceProxy");
        this.V = a;
        this.j = [];
        this.j.push(this.V.$_s("screenChange", v(this.Ye, this)));
        this.j.push(this.V.$_s("onlineScreenChange", v(this.de, this)))
    }
    y(Xo, Ek);
    g = Xo.prototype;
    g.aa = function(a) {
        return this.V.$_gs(a)
    };
    g.contains = function(a) {
        return !!this.V.$_c(a)
    };
    g.get = function(a) {
        return this.V.$_g(a)
    };
    g.start = function() {
        this.V.$_st()
    };
    g.add = function(a, b, c) {
        this.V.$_a(a, b, c)
    };
    g.remove = function(a, b, c) {
        this.V.$_r(a, b, c)
    };
    g.Lb = function(a, b, c, d) {
        this.V.$_un(a, b, c, d)
    };
    g.G = function() {
        for (var a = 0, b = this.j.length; a < b; ++a) this.V.$_ubk(this.j[a]);
        this.j.length = 0;
        this.V = null;
        Xo.K.G.call(this)
    };
    g.Ye = function() {
        this.publish("screenChange")
    };
    g.de = function() {
        this.publish("onlineScreenChange")
    };
    V.prototype.$_st = V.prototype.start;
    V.prototype.$_gspc = V.prototype.Ze;
    V.prototype.$_gsppc = V.prototype.kd;
    V.prototype.$_c = V.prototype.contains;
    V.prototype.$_g = V.prototype.get;
    V.prototype.$_a = V.prototype.add;
    V.prototype.$_un = V.prototype.Lb;
    V.prototype.$_r = V.prototype.remove;
    V.prototype.$_gs = V.prototype.aa;
    V.prototype.$_gos = V.prototype.jd;
    V.prototype.$_s = V.prototype.subscribe;
    V.prototype.$_ubk = V.prototype.pa;

    function Yo() {
        var a = !!F("MDX_ENABLE_CASTV2"),
            b = !!F("MDX_ENABLE_QUEUE"),
            c = {
                device: "Desktop",
                app: "youtube-desktop"
            };
        a ? q("yt.mdx.remote.castv2_", !0, void 0) : om();
        Qh && Ph();
        Mk();
        Zo || (Zo = new qk, dl() && (Zo.j = "/api/loungedev"));
        Y || a || (Y = new Eo(Zo), Y.subscribe("screenPair", $o), Y.subscribe("managedScreenChange", ap), Y.subscribe("onlineReceiverChange", function() {
            I("yt-remote-receiver-availability-change")
        }));
        bp || (bp = r("yt.mdx.remote.deferredProxies_") || [], q("yt.mdx.remote.deferredProxies_", bp, void 0));
        cp(b);
        b =
            dp();
        if (a && !b) {
            var d = new V(Zo);
            q("yt.mdx.remote.screenService_", d, void 0);
            b = dp();
            Nl(d, function(a) {
                a ? ep() && fm(ep(), "YouTube TV") : d.subscribe("onlineScreenChange", function() {
                    I("yt-remote-receiver-availability-change")
                })
            }, !(!c || !c.loadCastApiSetupScript))
        }
        if (c && !r("yt.mdx.remote.initialized_")) {
            q("yt.mdx.remote.initialized_", !0, void 0);
            fp("Initializing: " + R(c));
            gp.push(Rb("yt-remote-cast2-availability-change", function() {
                I("yt-remote-receiver-availability-change")
            }));
            gp.push(Rb("yt-remote-cast2-receiver-selected",
                function() {
                    hp(null);
                    I("yt-remote-auto-connect", "cast-selector-receiver")
                }));
            gp.push(Rb("yt-remote-cast2-session-change", ip));
            gp.push(Rb("yt-remote-connection-change", function(a) {
                a ? fm(ep(), "YouTube TV") : jp() || (fm(null, null), am())
            }));
            var e = kp();
            c.isAuto && (e.id += "#dial");
            e.name = c.device;
            e.app = c.app;
            fp(" -- with channel params: " + R(e));
            lp(e);
            a && b.start();
            ep() || mp()
        }
    }

    function np() {
        Tb(gp);
        gp.length = 0;
        Bb(op);
        op = null;
        bp && (A(bp, function(a) {
            a(null)
        }), bp.length = 0, bp = null, q("yt.mdx.remote.deferredProxies_", null, void 0));
        Y && (Bb(Y), Y = null);
        Zo = null;
        sm()
    }

    function pp() {
        if (qp() && Zl()) {
            var a = [];
            if (T("yt-remote-cast-available") || r("yt.mdx.remote.cloudview.castButtonShown_") || rp()) a.push({
                key: "cast-selector-receiver",
                name: sp()
            }), q("yt.mdx.remote.cloudview.castButtonShown_", !0, void 0);
            return a
        }
        if (r("yt.mdx.remote.cloudview.initializing_")) return [];
        var b = [],
            b = tp() ? dp().V.$_gos() : fk(Zk());
        (a = up()) && rp() && (Ck(b, a) || b.push(a));
        tp() || (a = zk(al()), a = Ca(a, function(a) {
            return !Dk(b, a.id)
        }), b = Na(b, a));
        return xk(b)
    }

    function vp() {
        if (qp() && Zl()) {
            var a = $l();
            return a ? {
                key: "cast-selector-receiver",
                name: a
            } : null
        }
        var a = pp(),
            b = wp(),
            c = up();
        c || (c = jp());
        return Fa(a, function(a) {
            return c && ak(c, a.key) || b && (a = Wo(a.key)) && a.id == b ? !0 : !1
        })
    }

    function sp() {
        if (qp() && Zl()) return $l();
        var a = up();
        return a ? a.name : null
    }

    function up() {
        var a = ep();
        if (!a) return null;
        if (!Y) {
            var b = dp().aa();
            return Dk(b, a)
        }
        return Qo(Y, a)
    }

    function ip(a) {
        fp("remote.onCastSessionChange_: " + gk(a));
        if (a) {
            var b = up();
            b && b.id == a.id ? fm(b.id, "YouTube TV") : (b && xp(), yp(a, 1))
        } else xp()
    }

    function zp(a, b) {
        fp("Connecting to: " + R(a));
        if ("cast-selector-receiver" == a.key) hp(b || null), em(b || null);
        else {
            xp();
            hp(b || null);
            var c = null;
            Y ? c = Vo(a.key) : (c = dp().aa(), c = Dk(c, a.key));
            if (c) yp(c, 1);
            else {
                if (Y && (c = Wo(a.key))) {
                    Ap(c);
                    return
                }
                G(function() {
                    Bp(null)
                }, 0)
            }
        }
    }

    function xp() {
        Y && To(Y);
        t: {
            var a = rp();
            if (a && (a = a.getOtherConnectedRemoteId())) {
                fp("Do not stop DIAL due to " + a);
                Cp("");
                break t
            }(a = wp()) ? (fp("Stopping DIAL: " + a), zm(a), Cp("")) : (a = up()) && a.uuid && (fp("Stopping DIAL: " + a.uuid), zm(a.uuid))
        }
        cm() ? Vl().stopSession() : dm("stopSession called before API ready.");
        (a = rp()) ? a.disconnect(1): (Ub("yt-remote-before-disconnect", 1), Ub("yt-remote-connection-change", !1));
        Bp(null)
    }

    function fp(a) {
        Wj("remote", a)
    }

    function qp() {
        return !!r("yt.mdx.remote.castv2_")
    }

    function tp() {
        return r("yt.mdx.remote.screenService_")
    }

    function dp() {
        if (!op) {
            var a = tp();
            op = a ? new Xo(a) : null
        }
        return op
    }

    function ep() {
        return r("yt.mdx.remote.currentScreenId_")
    }

    function Dp(a) {
        q("yt.mdx.remote.currentScreenId_", a, void 0);
        if (Y) {
            var b = Y;
            b.C = w() + 3E5;
            if ((b.Ub = a) && (a = Qo(b, a)) && !Ck(b.j, a)) {
                var c = Oa(b.j);
                c.push(a);
                Io(b, c, !0)
            }
        }
    }

    function wp() {
        return r("yt.mdx.remote.currentDialId_")
    }

    function Cp(a) {
        q("yt.mdx.remote.currentDialId_", a, void 0)
    }

    function Ep() {
        return r("yt.mdx.remote.connectData_")
    }

    function hp(a) {
        q("yt.mdx.remote.connectData_", a, void 0)
    }

    function rp() {
        return r("yt.mdx.remote.connection_")
    }

    function Bp(a) {
        var b = rp();
        hp(null);
        a ? Aa(!rp()) : (Dp(""), Cp(""));
        q("yt.mdx.remote.connection_", a, void 0);
        bp && (A(bp, function(b) {
            b(a)
        }), bp.length = 0);
        b && !a ? Ub("yt-remote-connection-change", !1) : !b && a && I("yt-remote-connection-change", !0)
    }

    function jp() {
        var a = Pk();
        if (!a) return null;
        if (tp()) {
            var b = dp().aa();
            return Dk(b, a)
        }
        return Y ? Qo(Y, a) : null
    }

    function yp(a, b) {
        Aa(!ep());
        Dp(a.id);
        var c = new X(Zo, a, kp());
        c.connect(b, Ep());
        c.subscribe("beforeDisconnect", function(a) {
            Ub("yt-remote-before-disconnect", a)
        });
        c.subscribe("beforeDispose", function() {
            rp() && (rp(), Bp(null))
        });
        Bp(c)
    }

    function Ap(a) {
        wp();
        fp("Connecting to: " + (a ? a.toString() : "null"));
        Cp(a.id);
        var b = Ep();
        b ? Uo(a.id, b.videoIds[b.index], b.currentTime) : Uo(a.id)
    }

    function mp() {
        var a = jp();
        a ? (fp("Resume connection to: " + gk(a)), yp(a, 0)) : (cl(), am(), fp("Skipping connecting because no session screen found."))
    }

    function $o(a) {
        fp("Paired with: " + gk(a));
        a ? yp(a, 1) : Bp(null)
    }

    function ap() {
        var a = ep();
        a && !up() && (fp("Dropping current screen with id: " + a), xp());
        jp() || cl()
    }
    var Zo = null,
        bp = null,
        op = null,
        Y = null;

    function cp(a) {
        var b = kp();
        if (db(b)) {
            var b = Ok(),
                c = T("yt-remote-session-name") || "",
                d = T("yt-remote-session-app") || "",
                b = {
                    device: "REMOTE_CONTROL",
                    id: b,
                    name: c,
                    app: d
                };
            a && (b["mdx-version"] = 3);
            q("yt.mdx.remote.channelParams_", b, void 0)
        }
    }

    function kp() {
        return r("yt.mdx.remote.channelParams_") || {}
    }

    function lp(a) {
        a ? (S("yt-remote-session-app", a.app), S("yt-remote-session-name", a.name)) : (Sh("yt-remote-session-app"), Sh("yt-remote-session-name"));
        q("yt.mdx.remote.channelParams_", a, void 0)
    }
    var gp = [];
    var Fp = null,
        Gp = [];

    function Hp() {
        Ip();
        if (vp()) {
            var a = Fp;
            "html5" != a.getPlayerType() && a.loadNewVideoConfig(a.getCurrentVideoConfig(), "html5")
        }
    }

    function Jp(a) {
        "cast-selector-receiver" == a ? bm() : Kp(a)
    }

    function Kp(a) {
        var b = pp();
        if (a = wk(b, a)) {
            var c = Fp,
                d = c.getVideoData().video_id,
                e = c.getVideoData().list,
                f = c.getCurrentTime();
            zp(a, {
                videoIds: [d],
                listId: e,
                videoId: d,
                index: 0,
                currentTime: f
            });
            "html5" != c.getPlayerType() ? c.loadNewVideoConfig(c.getCurrentVideoConfig(), "html5") : c.updateRemoteReceivers && c.updateRemoteReceivers(b, a)
        }
    }

    function Ip() {
        var a = Fp;
        a && a.updateRemoteReceivers && a.updateRemoteReceivers(pp(), vp())
    };
    var Lp = null,
        Mp = [];

    function Np(a) {
        return {
            externalChannelId: a.externalChannelId,
            Rd: !!a.isChannelPaid,
            source: a.source,
            bb: a.subscriptionId
        }
    }

    function Op(a) {
        Pp(Np(a))
    }

    function Pp(a) {
        kj() ? (P(Pi, new Gi(a.externalChannelId, a.Rd ? {
            itemType: "U",
            itemId: a.externalChannelId
        } : null)), (a = "/gen_204?" + yd({
            event: "subscribe",
            source: a.source
        })) && Vg(a)) : Qp(a)
    }

    function Qp(a) {
        aj(function(b) {
            b.subscription_ajax && Pp(a)
        }, null, "sub_button")
    }

    function Rp(a) {
        a = Np(a);
        P(Ui, new Ii(a.externalChannelId, a.bb, null));
        (a = "/gen_204?" + yd({
            event: "unsubscribe",
            source: a.source
        })) && Vg(a)
    }

    function Sp(a) {
        Lp && Lp.channelSubscribed(a.j, a.bb)
    }

    function Tp(a) {
        Lp && Lp.channelUnsubscribed(a.j)
    };

    function Up(a) {
        D.call(this);
        this.k = a;
        this.k.subscribe("command", this.Zc, this);
        this.o = {};
        this.B = !1
    }
    y(Up, D);
    g = Up.prototype;
    g.start = function() {
        this.B || this.J() || (this.B = !0, Vp(this.k, "RECEIVING"))
    };
    g.Zc = function(a, b) {
        if (this.B && !this.J()) {
            var c = b || {};
            switch (a) {
                case "addEventListener":
                    if (u(c.event) && (c = c.event, !(c in this.o))) {
                        var d = v(this.Ee, this, c);
                        this.o[c] = d;
                        this.addEventListener(c, d)
                    }
                    break;
                case "removeEventListener":
                    u(c.event) && Wp(this, c.event);
                    break;
                default:
                    this.j.isReady() && this.j[a] && (c = Xp(a, b || {}), c = this.j[a].apply(this.j, c), (c = Yp(a, c)) && this.B && !this.J() && Vp(this.k, a, c))
            }
        }
    };
    g.Ee = function(a, b) {
        this.B && !this.J() && Vp(this.k, a, this.Xb(a, b))
    };
    g.Xb = function(a, b) {
        if (null != b) return {
            value: b
        }
    };

    function Wp(a, b) {
        b in a.o && (a.removeEventListener(b, a.o[b]), delete a.o[b])
    }
    g.G = function() {
        this.k.unsubscribe("command", this.Zc, this);
        this.k = null;
        for (var a in this.o) Wp(this, a);
        Up.K.G.call(this)
    };

    function Zp(a, b) {
        Up.call(this, b);
        this.j = a;
        this.start()
    }
    y(Zp, Up);
    Zp.prototype.addEventListener = function(a, b) {
        this.j.addEventListener(a, b)
    };
    Zp.prototype.removeEventListener = function(a, b) {
        this.j.removeEventListener(a, b)
    };

    function Xp(a, b) {
        switch (a) {
            case "loadVideoById":
                return b = Kj(b), Mj(b), [b];
            case "cueVideoById":
                return b = Kj(b), Mj(b), [b];
            case "loadVideoByPlayerVars":
                return Mj(b), [b];
            case "cueVideoByPlayerVars":
                return Mj(b), [b];
            case "loadPlaylist":
                return b = Lj(b), Mj(b), [b];
            case "cuePlaylist":
                return b = Lj(b), Mj(b), [b];
            case "seekTo":
                return [b.seconds, b.allowSeekAhead];
            case "playVideoAt":
                return [b.index];
            case "setVolume":
                return [b.volume];
            case "setPlaybackQuality":
                return [b.suggestedQuality];
            case "setPlaybackRate":
                return [b.suggestedRate];
            case "setLoop":
                return [b.loopPlaylists];
            case "setShuffle":
                return [b.shufflePlaylist];
            case "getOptions":
                return [b.module];
            case "getOption":
                return [b.module, b.option];
            case "setOption":
                return [b.module, b.option, b.value]
        }
        return []
    }

    function Yp(a, b) {
        switch (a) {
            case "isMuted":
                return {
                    muted: b
                };
            case "getVolume":
                return {
                    volume: b
                };
            case "getPlaybackRate":
                return {
                    playbackRate: b
                };
            case "getAvailablePlaybackRates":
                return {
                    availablePlaybackRates: b
                };
            case "getVideoLoadedFraction":
                return {
                    videoLoadedFraction: b
                };
            case "getPlayerState":
                return {
                    playerState: b
                };
            case "getCurrentTime":
                return {
                    currentTime: b
                };
            case "getPlaybackQuality":
                return {
                    playbackQuality: b
                };
            case "getAvailableQualityLevels":
                return {
                    availableQualityLevels: b
                };
            case "getDuration":
                return {
                    duration: b
                };
            case "getVideoUrl":
                return {
                    videoUrl: b
                };
            case "getVideoEmbedCode":
                return {
                    videoEmbedCode: b
                };
            case "getPlaylist":
                return {
                    playlist: b
                };
            case "getPlaylistIndex":
                return {
                    playlistIndex: b
                };
            case "getOptions":
                return {
                    options: b
                };
            case "getOption":
                return {
                    option: b
                }
        }
    }
    Zp.prototype.Xb = function(a, b) {
	console.log('yep');
        switch (a) {
            case "onReady":
                return;
            case "onStateChange":
                return {
                    playerState: b
                };
            case "onPlaybackQualityChange":
                return {
                    playbackQuality: b
                };
            case "onPlaybackRateChange":
                return {
                    playbackRate: b
                };
            case "onError":
                return {
                    errorCode: b
                }
        }
        return Zp.K.Xb.call(this, a, b)
    };
    Zp.prototype.G = function() {
        Zp.K.G.call(this);
        delete this.j
    };

    function $p(a, b) {
        this.source = null;
        this.B = a || null;
        this.origin = "*";
        this.H = window.document.location.protocol + "//" + window.document.location.hostname;
        this.C = b;
        this.o = this.j = this.k = this.A = null;
        L(window, "message", v(this.F, this))
    }
    $p.prototype.F = function(a) {
        var b = this.C || F("POST_MESSAGE_ORIGIN") || this.H;
        if ("*" != b && a.origin != b) window.console && window.console.warn("Untrusted origin: " + a.origin);
        else if (!this.B || a.source == this.B)
            if (this.source = a.source, this.origin = "null" == a.origin ? this.origin : a.origin, a = a.data, u(a)) {
                try {
                    a = yh(a)
                } catch (c) {
                    return
                }
                this.A = a.id;
                switch (a.event) {
                    case "listening":
                        this.j && (this.j(), this.j = null);
                        break;
                    case "command":
                        this.k && (this.o && !Ha(this.o, a.func) || this.k(a.func, a.args))
                }
            }
    };
    $p.prototype.sendMessage = function(a) {
        this.source && (a.id = this.A, a = R(a), this.source.postMessage(a, this.origin))
    };

    function aq() {
        var a = this.k = new $p,
            b = v(this.Ae, this);
        a.k = b;
        a.o = null;
        this.B = [];
        this.F = !1;
        this.A = (a = F("POST_MESSAGE_ORIGIN")) && Rg(a) ? a : null;
        this.C = {}
    }
    g = aq.prototype;
    g.Ae = function(a, b) {
        if (this.A && this.A != this.k.origin) this.dispose();
        else if ("addEventListener" == a && b) {
            var c = b[0];
			console.log('gogo');
            this.C[c] || "onReady" == c || (this.addEventListener(c, bq(this, c)), this.C[c] = !0)
        } else this.nd(a, b)
    };
    g.nd = function() {};

    function bq(a, b) {
        return v(function(a) {
            this.sendMessage(b, a)
        }, a)
    }
    g.addEventListener = function() {};
    g.Id = function() {
	console.log('hihihi');
        this.F = !0;
        this.sendMessage("initialDelivery", this.Yb());
        this.sendMessage("onReady");
        A(this.B, this.od, this);
        this.B = []
    };
    g.Yb = function() {
        return null
    };

    function cq(a, b) {
        a.sendMessage("infoDelivery", b)
    }
    g.od = function(a) {
        this.F ? this.k.sendMessage(a) : this.B.push(a)
    };
    g.sendMessage = function(a, b) {
        this.od({
            event: a,
            info: void 0 == b ? null : b
        })
    };
    g.dispose = function() {
        this.k = null
    };

    function dq(a) {
        aq.call(this);
        this.j = a;
        this.o = [];
		console.log('gogo');
        this.addEventListener("onReady", v(this.je, this));
        this.addEventListener("onVideoProgress", v(this.Ie, this));
        this.addEventListener("onVolumeChange", v(this.Je, this));
        this.addEventListener("onApiChange", v(this.De, this));
        this.addEventListener("onPlaybackQualityChange", v(this.Fe, this));
        this.addEventListener("onPlaybackRateChange", v(this.Ge, this));
        this.addEventListener("onStateChange", v(this.He, this))
    }
    y(dq, aq);
    g = dq.prototype;
    g.nd = function(a, b) {
        if (this.j[a]) {
            b = b || [];
            if (0 < b.length && Ij(a)) {
                var c;
                c = b;
                if (ha(c[0]) && !da(c[0])) c = c[0];
                else {
                    var d = {};
                    switch (a) {
                        case "loadVideoById":
                        case "cueVideoById":
                            d = Kj.apply(window, c);
                            break;
                        case "loadVideoByUrl":
                        case "cueVideoByUrl":
                            d = Jj.apply(window, c);
                            break;
                        case "loadPlaylist":
                        case "cuePlaylist":
                            d = Lj.apply(window, c)
                    }
                    c = d
                }
                Mj(c);
                b.length = 1;
                b[0] = c
            }
            this.j[a].apply(this.j, b);
            Ij(a) && cq(this, this.Yb())
        }
    };
    g.je = function() {
        var a = v(this.Id, this);
        this.k.j = a
    };
    g.addEventListener = function(a, b) {
        this.o.push({
            Hd: a,
            za: b
        });
        this.j.addEventListener(a, b)
    };
    g.Yb = function() {
        if (!this.j) return null;
        var a = this.j.getApiInterface();
        La(a, "getVideoData");
        for (var b = {
                apiInterface: a
            }, c = 0, d = a.length; c < d; c++) {
            var e = a[c],
                f = e;
            if (0 == f.search("get") || 0 == f.search("is")) {
                var f = e,
                    h = 0;
                0 == f.search("get") ? h = 3 : 0 == f.search("is") && (h = 2);
                f = f.charAt(h).toLowerCase() + f.substr(h + 1);
                try {
                    var k = this.j[e]();
                    b[f] = k
                } catch (l) {}
            }
        }
        b.videoData = this.j.getVideoData();
        return b
    };
    g.He = function(a) {
        a = {
            playerState: a,
            currentTime: this.j.getCurrentTime(),
            duration: this.j.getDuration(),
            videoData: this.j.getVideoData(),
            videoStartBytes: 0,
            videoBytesTotal: this.j.getVideoBytesTotal(),
            videoLoadedFraction: this.j.getVideoLoadedFraction(),
            playbackQuality: this.j.getPlaybackQuality(),
            availableQualityLevels: this.j.getAvailableQualityLevels(),
            videoUrl: this.j.getVideoUrl(),
            playlist: this.j.getPlaylist(),
            playlistIndex: this.j.getPlaylistIndex()
        };
        this.j.getProgressState && (a.progressState = this.j.getProgressState());
        this.j.getStoryboardFormat && (a.storyboardFormat = this.j.getStoryboardFormat());
        cq(this, a)
    };
    g.Fe = function(a) {
        cq(this, {
            playbackQuality: a
        })
    };
    g.Ge = function(a) {
        cq(this, {
            playbackRate: a
        })
    };
    g.De = function() {
        for (var a = this.j.getOptions(), b = {
                namespaces: a
            }, c = 0, d = a.length; c < d; c++) {
            var e = a[c],
                f = this.j.getOptions(e);
            b[e] = {
                options: f
            };
            for (var h = 0, k = f.length; h < k; h++) {
                var l = f[h],
                    n = this.j.getOption(e, l);
                b[e][l] = n
            }
        }
        this.sendMessage("apiInfoDelivery", b)
    };
    g.Je = function() {
        cq(this, {
            muted: this.j.isMuted(),
            volume: this.j.getVolume()
        })
    };
    g.Ie = function(a) {
        a = {
            currentTime: a,
            videoBytesLoaded: this.j.getVideoBytesLoaded(),
            videoLoadedFraction: this.j.getVideoLoadedFraction()
        };
        this.j.getProgressState && (a.progressState = this.j.getProgressState());
        cq(this, a)
    };
    g.dispose = function() {
        dq.K.dispose.call(this);
        for (var a = 0; a < this.o.length; a++) {
            var b = this.o[a];
            this.j.removeEventListener(b.Hd, b.za)
        }
        this.o = []
    };

    function eq(a, b, c) {
        U.call(this);
        this.j = a;
        this.k = b;
        this.o = c
    }
    y(eq, U);

    function Vp(a, b, c) {
        if (!a.J()) {
            var d = a.j;
            d.J() || a.k != d.j || (a = {
                id: a.o,
                command: b
            }, c && (a.data = c), d.j.postMessage(R(a), d.o))
        }
    }
    eq.prototype.G = function() {
        this.k = this.j = null;
        eq.K.G.call(this)
    };

    function fq(a, b, c) {
        D.call(this);
        this.j = a;
        this.o = c;
        this.B = L(window, "message", v(this.A, this));
        this.k = new eq(this, a, b);
        Ab(this, oa(Bb, this.k))
    }
    y(fq, D);
    fq.prototype.A = function(a) {
        if (!this.J() && a.origin == this.o && a.source == this.j && (a = a.data, u(a))) {
            try {
                a = yh(a)
            } catch (b) {
                return
            }
            if (a.command) {
                var c = this.k;
                c.J() || c.publish("command", a.command, a.data)
            }
        }
    };
    fq.prototype.G = function() {
        fd(this.B);
        this.j = null;
        fq.K.G.call(this)
    };
    var gq = {};

    function hq(a) {
        return a ? 24 == a.length && "UC" == a.slice(0, 2) ? a.substr(2) : 22 == a.length ? a : null : null
    };
    var iq = [],
        jq = [];

    function kq(a, b) {
        if ("view" != a && "cvisit" != a) {
            if (!b) {
                var c = F("CONVERSION_CONFIG_DICT");
                if (!c) return;
                b = c.uid || null;
                if (!b) return
            }
            if ("subscribe" == a || "unsubscribe" == a) {
                if (u(b)) {
                    var d = hq(b);
                    d && (d = {
                        label: "followon_" + a,
                        foc_id: d,
                        r: Math.round(1E4 * Math.random())
                    }, (d = Ad("//googleads.g.doubleclick.net/pagead/viewthroughconversion/962985656/", d)) && d && Vg(d))
                }
            } else t: {
                c = F("CONVERSION_CONFIG_DICT");
                if (u(b)) {
                    var e = hq(b);
                    if (!c || c.uid != e)
                        if (c = gq[e], !c || c.uid != e) break t
                }
                if (a && c && c.baseUrl && c.uid) {
                    var f = c.rmktEnabled,
                        e =
                        c.focEnabled && (!c.isAd || "view" != a);
                    if (f || e) {
                        var h = {};
                        if (f) {
                            f = {
                                utuid: c.uid,
                                type: a,
                                client_name: "html5"
                            };
                            "cvisit" == a && (f.type = "cview");
                            c.vid && (f.utvid = c.vid);
                            c.eventLabel && (f.el = c.eventLabel);
                            c.playerStyle && (f.ps = c.playerStyle);
                            c.feature && (f.feature = c.feature);
                            c.ppe && (f.ppe = c.ppe);
                            c.subscribed && (f.subscribed = c.subscribed);
                            c.engaged && (f.engaged = c.engaged);
                            var k = [];
                            for (d in f) k.push(encodeURIComponent(d) + "=" + encodeURIComponent(f[d]));
                            d = k.join(";");
                            h.data = d
                        }
                        e && (h.label = "followon_" + a, h.foc_id = c.uid, h.r =
                            Math.round(1E4 * Math.random()));
                        if ("unsubscribe" == a || "dislike" == a) h.r = Math.round(1E4 * Math.random());
                        d = Ad(c.baseUrl, h)
                    } else d = null
                } else d = null;
                d && d && Vg(d)
            }
        }
    }

    function lq(a) {
        kq("subscribe", a.j)
    }

    function mq(a) {
        kq("unsubscribe", a.j)
    };

    function nq(a) {
        N.call(this, 1, arguments)
    }
    y(nq, N);

    function oq(a, b) {
        N.call(this, 2, arguments);
        this.k = a;
        this.j = b
    }
    y(oq, N);

    function pq(a, b, c, d) {
        N.call(this, 1, arguments);
        this.j = b;
        this.o = c || null;
        this.k = d || null
    }
    y(pq, N);

    function qq(a, b) {
        N.call(this, 1, arguments);
        this.k = a;
        this.j = b || null
    }
    y(qq, N);

    function rq(a) {
        N.call(this, 1, arguments)
    }
    y(rq, N);
    var sq = new O("ypc-core-load", nq),
        tq = new O("ypc-guide-sync-success", oq),
        uq = new O("ypc-purchase-success", pq),
        vq = new O("ypc-subscription-cancel", rq),
        wq = new O("ypc-subscription-cancel-success", qq),
        xq = new O("ypc-init-subscription", rq);
    var yq = !1,
        zq = [],
        Aq = [];

    function Bq(a) {
        a.j ? yq ? P(Ti, a) : P(sq, new nq(function() {
            P(xq, new rq(a.j))
        })) : Cq(a.k, a.B, a.o, a.source)
    }

    function Dq(a) {
        a.j ? yq ? P(Yi, a) : P(sq, new nq(function() {
            P(vq, new rq(a.j))
        })) : Eq(a.k, a.bb, a.B, a.o, a.source)
    }

    function Fq(a) {
        Gq(Oa(a.j))
    }

    function Hq(a) {
        Iq(Oa(a.j))
    }

    function Jq(a) {
        Kq(a.j, a.isEnabled, null, null)
    }

    function Lq(a) {
        Kq(a.j, null, null, a.isEnabled)
    }

    function Mq(a) {
        Nq(a.k, a.isEnabled, null, a.j)
    }

    function Oq(a) {
        Nq(a.k, null, a.isEnabled, a.j)
    }

    function Pq(a, b, c, d, e) {
        Kq(a, b, c, d, e)
    }

    function Qq(a) {
        var b = a.k,
            c = a.j.subscriptionId;
        b && c && P(Si, new Hi(b, c, a.j.channelInfo))
    }

    function Rq(a) {
        var b = a.j;
        Va(a.k, function(a, d) {
            P(Si, new Hi(d, a, b[d]))
        })
    }

    function Sq(a) {
        P(Xi, new Di(a.k.itemId));
        a.j && a.j.length && (Tq(a.j, Xi), Tq(a.j, Zi))
    }

    function Cq(a, b, c, d) {
        var e = new Di(a);
        P(Qi, e);
        var f = {};
        f.c = a;
        c && (f.eurl = c);
        d && (f.source = d);
        c = {};
        (d = F("PLAYBACK_ID")) && (c.plid = d);
        b && Uq("/subscription_ajax?action_create_subscription_to_channel=1", f, b);
        gj("/subscription_ajax?action_create_subscription_to_channel=1", {
            method: "POST",
            nc: f,
            S: c,
            ca: function(b, c) {
                var d = c.response;
                P(Si, new Hi(a, d.id, d.channel_info));
                d.show_feed_privacy_dialog && I("SHOW-FEED-PRIVACY-SUBSCRIBE-DIALOG", a)
            },
            gc: function() {
                P(Ri, e)
            }
        })
    }

    function Eq(a, b, c, d, e) {
        var f = new Di(a);
        P(Vi, f);
        var h = {};
        d && (h.eurl = d);
        e && (h.source = e);
        d = {};
        d.c = a;
        d.s = b;
        (a = F("PLAYBACK_ID")) && (d.plid = a);
        c && Uq("/subscription_ajax?action_remove_subscriptions=1", {}, c);
        gj("/subscription_ajax?action_remove_subscriptions=1", {
            method: "POST",
            nc: h,
            S: d,
            ca: function() {
                P(Xi, f)
            },
            gc: function() {
                P(Wi, f)
            }
        })
    }

    function Kq(a, b, c, d, e) {
        if (null !== b || null !== c || null !== d) {
            var f = {};
            a && (f.channel_id = a);
            null === b || (f.email_on_upload = b);
            null === c || (f.receive_no_updates = c);
            null === d || (f.uploads_only = d);
            gj("/subscription_ajax?action_update_subscription_preferences=1", {
                method: "POST",
                S: f,
                onError: function() {
                    e && e()
                }
            })
        }
    }

    function Gq(a) {
        if (a.length) {
            var b = Qa(a, 0, 40);
            P("subscription-batch-subscribe-loading");
            Tq(b, Qi);
            var c = {};
            c.a = b.join(",");
            var d = function() {
                P("subscription-batch-subscribe-loaded");
                Tq(b, Ri)
            };
            gj("/subscription_ajax?action_create_subscription_to_all=1", {
                method: "POST",
                S: c,
                ca: function(c, f) {
                    d();
                    var h = f.response,
                        k = h.id;
                    if (da(k) && k.length == b.length) {
                        var l = h.channel_info_map;
                        A(k, function(a, c) {
                            var d = b[c];
                            P(Si, new Hi(d, a, l[d]))
                        });
                        a.length ? Gq(a) : P("subscription-batch-subscribe-finished")
                    }
                },
                onError: function() {
                    d();
                    P("subscription-batch-subscribe-failure")
                }
            })
        }
    }

    function Iq(a) {
        if (a.length) {
            var b = Qa(a, 0, 40);
            P("subscription-batch-unsubscribe-loading");
            Tq(b, Vi);
            var c = {};
            c.c = b.join(",");
            var d = function() {
                P("subscription-batch-unsubscribe-loaded");
                Tq(b, Wi)
            };
            gj("/subscription_ajax?action_remove_subscriptions=1", {
                method: "POST",
                S: c,
                ca: function() {
                    d();
                    Tq(b, Xi);
                    a.length && Iq(a)
                },
                onError: function() {
                    d()
                }
            })
        }
    }

    function Nq(a, b, c, d) {
        if (a.length && (null !== b || null !== c)) {
            var e = Qa(a, 0, 40);
            I("subscription-batch-prefs-loading", e);
            var f = {};
            f.s = e.join(",");
            null !== b && (f.email_on_upload = b, f.receive_no_updates = !b);
            null === c || (f.uploads_only = c);
            var h = function() {
                I("subscription-batch-prefs-loaded", e)
            };
            gj("/subscription_ajax?action_update_subscription_preferences_batch=1", {
                method: "POST",
                S: f,
                ca: function() {
                    h();
                    I("subscription-batch-prefs-success", e);
                    a.length && Nq(a, b, c, d)
                },
                onError: function() {
                    h();
                    d && d();
                    I("subscription-batch-prefs-failure",
                        e)
                }
            })
        }
    }

    function Tq(a, b) {
        A(a, function(a) {
            P(b, new Di(a))
        })
    }

    function Uq(a, b, c) {
        a = Dd(a, b);
        c = Bd(c);
        Fd(a, c)
    };
    var Vq = null,
        Wq = null,
        Xq = null,
        Yq = !1;
    var Zq = {},
        $q = 0;
    q("yt.setConfig", Fb, void 0);
    q("yt.setMsg", function(a) {
        Gb(Eb, arguments)
    }, void 0);
    q("yt.www.errors.log", function(a, b) {
        if (a && window && window.yterr && !(5 <= $q)) {
            var c = a.stacktrace,
                d = a.columnNumber;
            var e = a,
                f = r("window.location.href");
            if (u(e)) a = {
                message: e,
                name: "Unknown error",
                lineNumber: "Not available",
                fileName: f,
                stack: "Not available"
            };
            else {
                var h, k, l = !1;
                try {
                    h = e.lineNumber || e.line || "Not available"
                } catch (n) {
                    h = "Not available", l = !0
                }
                try {
                    k = e.fileName || e.filename || e.sourceURL || m.$googDebugFname || f
                } catch (x) {
                    k = "Not available", l = !0
                }
                a = !l && e.lineNumber && e.fileName && e.stack && e.message && e.name ? e : {
                    message: e.message ||
                        "Not available",
                    name: e.name || "UnknownError",
                    lineNumber: h,
                    fileName: k,
                    stack: e.stack || "Not available"
                }
            }
            c = c || a.stack;
            e = a.lineNumber.toString();
            isNaN(e) || isNaN(d) || (e = e + ":" + d);
            Zq[a.message] || (d = {
                nc: {
                    a: "logerror",
                    t: "jserror",
                    type: a.name,
                    msg: a.message.substr(0, 1E3),
                    line: e,
                    level: b || "ERROR"
                },
                S: {
                    url: window.location.href,
                    file: a.fileName
                },
                method: "POST"
            }, c && (d.S.stack = c), gj("/gen_204", d), Zq[a.message] = !0, $q++)
        }
    }, void 0);
    q("yt.embed.openLoginDialog", function() {
        aj(function(a) {
            if (Vq.onLoginDialogSuccess) Vq.onLoginDialogSuccess(a)
        })
    }, void 0);
    q("writeEmbed", function() {
        var a = new sf(F("PLAYER_CONFIG")),
            b = document.referrer,
            c = F("POST_MESSAGE_ORIGIN"),
            d = !1;
        u(b) && u(c) && -1 < b.indexOf(c) && Rg(c) && Rg(b) && (d = !0);
        window != window.top && b && b != document.URL && (a.args.loaderUrl = b);
        F("LIGHTWEIGHT_AUTOPLAY") && (a.args.autoplay = "1");
        a.args.autoplay && Mj(a.args);
        Vq = li("player", a);
        b = F("POST_MESSAGE_ID", "player");
        F("ENABLE_JS_API") ? Xq = new dq(Vq) : F("ENABLE_POST_API") && u(b) && u(c) && (Wq = new fq(window.parent, b, c), Xq = new Zp(Vq, Wq.k));
        (Yq = d && !F("ENABLE_CAST_API")) ? a.args.disableCast =
            "1": (a = Vq, Yo(), Fp = a, Fp.addEventListener("onReady", Hp), Fp.addEventListener("onRemoteReceiverSelected", Jp), Gp.push(Rb("yt-remote-receiver-availability-change", Ip)), Gp.push(Rb("yt-remote-auto-connect", Kp)));
        F("BG_P") && (F("BG_I") || F("BG_IU")) && ec();
        Lp = Vq;
        Lp.addEventListener("SUBSCRIBE", Op);
        Lp.addEventListener("UNSUBSCRIBE", Rp);
        Mp.push(dh(Si, Sp), dh(Xi, Tp))
    }, void 0);
    q("yt.www.watch.ads.restrictioncookie.spr", function(a) {
        (a = a + "mac_204?action_fcts=1") && Vg(a);
        return !0
    }, void 0);
    L(window, "load", function() {
        jh("ol");
        F("CSI_LOG_ON_TICK") || lh();
        yq = !0;
        Aq.push(dh(Pi, Bq), dh(Ui, Dq));
        yq || (Aq.push(dh(Ti, Bq), dh(Yi, Dq), dh(Li, Fq), dh(Mi, Hq), dh(Ni, Jq), dh(Oi, Lq), dh(Ji, Mq), dh(Ki, Oq)), zq.push(Rb("subscription-prefs", Pq)), Aq.push(dh(uq, Qq), dh(wq, Sq), dh(tq, Rq)), iq.push(Rb("player-subscribe", oa(kq, "subscribe")), Rb("player-unsubscribe", oa(kq, "unsubscribe"))), jq.push(dh(Si, lq), dh(Xi, mq)))
    });
    L(window, "unload", function() {
        var a = Vq;
        a && a.sendAbandonmentPing && a.sendAbandonmentPing();
        F("PL_ATT") && (dc = null);
        Tb(zq);
        zq.length = 0;
        eh(Aq);
        Aq.length = 0;
        yq = !1;
        Tb(iq);
        iq.length = 0;
        eh(jq);
        jq.length = 0;
        Lp && (Lp.removeEventListener("SUBSCRIBE", Pp), Lp.removeEventListener("UNSUBSCRIBE", Rp));
        Lp = null;
        eh(Mp);
        Mp.length = 0;
        Yq || (Tb(Gp), Gp.length = 0, Fp && (Fp.removeEventListener("onRemoteReceiverSelected", Jp), Fp.removeEventListener("onReady", Hp), Fp = null), np());
        Cb(Xq, Wq);
        Vq && Vq.destroy()
    });
    var ar = Cj.getInstance(),
        br = qj(ar);
    br in Hj || (ar.register(), ar.Yc.push(Rb("yt-uix-init-" + br, ar.init, ar)), ar.Yc.push(Rb("yt-uix-dispose-" + br, ar.dispose, ar)), Hj[br] = ar);
})();