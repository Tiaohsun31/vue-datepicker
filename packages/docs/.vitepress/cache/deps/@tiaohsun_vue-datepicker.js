import {
  Fragment,
  __commonJS,
  __toESM,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  defineComponent,
  guardReactiveProps,
  isMemoSame,
  isRef,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  openBlock,
  ref,
  renderList,
  renderSlot,
  toDisplayString,
  toRef,
  unref,
  useSlots,
  vModelSelect,
  vModelText,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-MF554RVB.js";

// node_modules/@tiaohsun/vue-datepicker/node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "node_modules/@tiaohsun/vue-datepicker/node_modules/dayjs/dayjs.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
    }(exports, function() {
      "use strict";
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date()) return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = "$isDayjsObject", S = function(t2) {
        return t2 instanceof _ || !(!t2 || !t2[p]);
      }, w = function t2(e2, n2, r2) {
        var i2;
        if (!e2) return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1) return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, O = function(t2, e2) {
        if (S(t2)) return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, b = v;
      b.l = w, b.i = S, b.w = function(t2, e2) {
        return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2) return /* @__PURE__ */ new Date(NaN);
            if (b.u(e2)) return /* @__PURE__ */ new Date();
            if (e2 instanceof Date) return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return b;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = O(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return O(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < O(t2);
        }, m2.$g = function(t2, e2, n2) {
          return b.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
            var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[b.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = b.p(f2), y2 = function(t2) {
            var e2 = O(l2);
            return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c) return this.set(c, this.$M + r2);
          if ($2 === h) return this.set(h, this.$y + r2);
          if ($2 === a) return y2(1);
          if ($2 === o) return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return b.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid()) return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, d2 = function(t3) {
            return b.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, function(t3, r3) {
            return r3 || function(t4) {
              switch (t4) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return b.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n2.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return b.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n2.weekdaysMin, e2.$W, o2, 2);
                case "ddd":
                  return h2(n2.weekdaysShort, e2.$W, o2, 3);
                case "dddd":
                  return o2[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return b.s(u2, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return b.s(e2.$s, 2, "0");
                case "SSS":
                  return b.s(e2.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            }(t3) || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
            return b.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n;
              break;
            case s:
              $2 = g2 / e;
              break;
            case i:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2) return this.$L;
          var n2 = this.clone(), r2 = w(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return b.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), k = _.prototype;
      return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
        k[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), O.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, O), t2.$i = true), O;
      }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
        return O(1e3 * t2);
      }, O.en = D[g], O.Ls = D, O.p = {}, O;
    });
  }
});

// node_modules/@tiaohsun/vue-datepicker/dist/vue-datepicker.es.js
var import_dayjs = __toESM(require_dayjs_min());
var Zr = Object.defineProperty;
var Gr = (r, e, t) => e in r ? Zr(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
var Se = (r, e, t) => Gr(r, typeof e != "symbol" ? e + "" : e, t);
function Mt(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Et = { exports: {} };
var an = Et.exports;
var Oa;
function rn() {
  return Oa || (Oa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(an, function() {
      var t = "minute", a = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
      return function(o, l, s) {
        var u = l.prototype;
        s.utc = function(f) {
          var $ = { date: f, utc: true, args: arguments };
          return new l($);
        }, u.utc = function(f) {
          var $ = s(this.toDate(), { locale: this.$L, utc: true });
          return f ? $.add(this.utcOffset(), t) : $;
        }, u.local = function() {
          return s(this.toDate(), { locale: this.$L, utc: false });
        };
        var i = u.parse;
        u.parse = function(f) {
          f.utc && (this.$u = true), this.$utils().u(f.$offset) || (this.$offset = f.$offset), i.call(this, f);
        };
        var m = u.init;
        u.init = function() {
          if (this.$u) {
            var f = this.$d;
            this.$y = f.getUTCFullYear(), this.$M = f.getUTCMonth(), this.$D = f.getUTCDate(), this.$W = f.getUTCDay(), this.$H = f.getUTCHours(), this.$m = f.getUTCMinutes(), this.$s = f.getUTCSeconds(), this.$ms = f.getUTCMilliseconds();
          } else m.call(this);
        };
        var y = u.utcOffset;
        u.utcOffset = function(f, $) {
          var c = this.$utils().u;
          if (c(f)) return this.$u ? 0 : c(this.$offset) ? y.call(this) : this.$offset;
          if (typeof f == "string" && (f = function(b) {
            b === void 0 && (b = "");
            var D = b.match(a);
            if (!D) return null;
            var d = ("" + D[0]).match(n) || ["-", 0, 0], p = d[0], h = 60 * +d[1] + +d[2];
            return h === 0 ? 0 : p === "+" ? h : -h;
          }(f), f === null)) return this;
          var S = Math.abs(f) <= 16 ? 60 * f : f, k = this;
          if ($) return k.$offset = S, k.$u = f === 0, k;
          if (f !== 0) {
            var g = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (k = this.local().add(S + g, t)).$offset = S, k.$x.$localOffset = g;
          } else k = this.utc();
          return k;
        };
        var v = u.format;
        u.format = function(f) {
          var $ = f || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return v.call(this, $);
        }, u.valueOf = function() {
          var f = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * f;
        }, u.isUTC = function() {
          return !!this.$u;
        }, u.toISOString = function() {
          return this.toDate().toISOString();
        }, u.toString = function() {
          return this.toDate().toUTCString();
        };
        var w = u.toDate;
        u.toDate = function(f) {
          return f === "s" && this.$offset ? s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : w.call(this);
        };
        var x = u.diff;
        u.diff = function(f, $, c) {
          if (f && this.$u === f.$u) return x.call(this, f, $, c);
          var S = this.local(), k = s(f).local();
          return x.call(S, k, $, c);
        };
      };
    });
  }(Et)), Et.exports;
}
var nn = rn();
var on = Mt(nn);
var It = { exports: {} };
var ln = It.exports;
var Va;
function sn() {
  return Va || (Va = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(ln, function() {
      var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, a = {};
      return function(n, o, l) {
        var s, u = function(v, w, x) {
          x === void 0 && (x = {});
          var f = new Date(v), $ = function(c, S) {
            S === void 0 && (S = {});
            var k = S.timeZoneName || "short", g = c + "|" + k, b = a[g];
            return b || (b = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: c, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: k }), a[g] = b), b;
          }(w, x);
          return $.formatToParts(f);
        }, i = function(v, w) {
          for (var x = u(v, w), f = [], $ = 0; $ < x.length; $ += 1) {
            var c = x[$], S = c.type, k = c.value, g = t[S];
            g >= 0 && (f[g] = parseInt(k, 10));
          }
          var b = f[3], D = b === 24 ? 0 : b, d = f[0] + "-" + f[1] + "-" + f[2] + " " + D + ":" + f[4] + ":" + f[5] + ":000", p = +v;
          return (l.utc(d).valueOf() - (p -= p % 1e3)) / 6e4;
        }, m = o.prototype;
        m.tz = function(v, w) {
          v === void 0 && (v = s);
          var x, f = this.utcOffset(), $ = this.toDate(), c = $.toLocaleString("en-US", { timeZone: v }), S = Math.round(($ - new Date(c)) / 1e3 / 60), k = 15 * -Math.round($.getTimezoneOffset() / 15) - S;
          if (!Number(k)) x = this.utcOffset(0, w);
          else if (x = l(c, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(k, true), w) {
            var g = x.utcOffset();
            x = x.add(f - g, "minute");
          }
          return x.$x.$timezone = v, x;
        }, m.offsetName = function(v) {
          var w = this.$x.$timezone || l.tz.guess(), x = u(this.valueOf(), w, { timeZoneName: v }).find(function(f) {
            return f.type.toLowerCase() === "timezonename";
          });
          return x && x.value;
        };
        var y = m.startOf;
        m.startOf = function(v, w) {
          if (!this.$x || !this.$x.$timezone) return y.call(this, v, w);
          var x = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return y.call(x, v, w).tz(this.$x.$timezone, true);
        }, l.tz = function(v, w, x) {
          var f = x && w, $ = x || w || s, c = i(+l(), $);
          if (typeof v != "string") return l(v).tz($);
          var S = function(D, d, p) {
            var h = D - 60 * d * 1e3, A = i(h, p);
            if (d === A) return [h, d];
            var U = i(h -= 60 * (A - d) * 1e3, p);
            return A === U ? [h, A] : [D - 60 * Math.min(A, U) * 1e3, Math.max(A, U)];
          }(l.utc(v, f).valueOf(), c, $), k = S[0], g = S[1], b = l(k).utcOffset(g);
          return b.$x.$timezone = $, b;
        }, l.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, l.tz.setDefault = function(v) {
          s = v;
        };
      };
    });
  }(It)), It.exports;
}
var un = sn();
var cn = Mt(un);
var Ot = { exports: {} };
var dn = Ot.exports;
var Fa;
function fn() {
  return Fa || (Fa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(dn, function() {
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, a = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, o = /\d\d/, l = /\d\d?/, s = /\d*[^-_:/,()\s\d]+/, u = {}, i = function($) {
        return ($ = +$) + ($ > 68 ? 1900 : 2e3);
      }, m = function($) {
        return function(c) {
          this[$] = +c;
        };
      }, y = [/[+-]\d\d:?(\d\d)?|Z/, function($) {
        (this.zone || (this.zone = {})).offset = function(c) {
          if (!c || c === "Z") return 0;
          var S = c.match(/([+-]|\d\d)/g), k = 60 * S[1] + (+S[2] || 0);
          return k === 0 ? 0 : S[0] === "+" ? -k : k;
        }($);
      }], v = function($) {
        var c = u[$];
        return c && (c.indexOf ? c : c.s.concat(c.f));
      }, w = function($, c) {
        var S, k = u.meridiem;
        if (k) {
          for (var g = 1; g <= 24; g += 1) if ($.indexOf(k(g, 0, c)) > -1) {
            S = g > 12;
            break;
          }
        } else S = $ === (c ? "pm" : "PM");
        return S;
      }, x = { A: [s, function($) {
        this.afternoon = w($, false);
      }], a: [s, function($) {
        this.afternoon = w($, true);
      }], Q: [n, function($) {
        this.month = 3 * ($ - 1) + 1;
      }], S: [n, function($) {
        this.milliseconds = 100 * +$;
      }], SS: [o, function($) {
        this.milliseconds = 10 * +$;
      }], SSS: [/\d{3}/, function($) {
        this.milliseconds = +$;
      }], s: [l, m("seconds")], ss: [l, m("seconds")], m: [l, m("minutes")], mm: [l, m("minutes")], H: [l, m("hours")], h: [l, m("hours")], HH: [l, m("hours")], hh: [l, m("hours")], D: [l, m("day")], DD: [o, m("day")], Do: [s, function($) {
        var c = u.ordinal, S = $.match(/\d+/);
        if (this.day = S[0], c) for (var k = 1; k <= 31; k += 1) c(k).replace(/\[|\]/g, "") === $ && (this.day = k);
      }], w: [l, m("week")], ww: [o, m("week")], M: [l, m("month")], MM: [o, m("month")], MMM: [s, function($) {
        var c = v("months"), S = (v("monthsShort") || c.map(function(k) {
          return k.slice(0, 3);
        })).indexOf($) + 1;
        if (S < 1) throw new Error();
        this.month = S % 12 || S;
      }], MMMM: [s, function($) {
        var c = v("months").indexOf($) + 1;
        if (c < 1) throw new Error();
        this.month = c % 12 || c;
      }], Y: [/[+-]?\d+/, m("year")], YY: [o, function($) {
        this.year = i($);
      }], YYYY: [/\d{4}/, m("year")], Z: y, ZZ: y };
      function f($) {
        var c, S;
        c = $, S = u && u.formats;
        for (var k = ($ = c.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(A, U, K) {
          var W = K && K.toUpperCase();
          return U || S[K] || t[K] || S[W].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(X, Q, O) {
            return Q || O.slice(1);
          });
        })).match(a), g = k.length, b = 0; b < g; b += 1) {
          var D = k[b], d = x[D], p = d && d[0], h = d && d[1];
          k[b] = h ? { regex: p, parser: h } : D.replace(/^\[|\]$/g, "");
        }
        return function(A) {
          for (var U = {}, K = 0, W = 0; K < g; K += 1) {
            var X = k[K];
            if (typeof X == "string") W += X.length;
            else {
              var Q = X.regex, O = X.parser, E = A.slice(W), M = Q.exec(E)[0];
              O.call(U, M), A = A.replace(M, "");
            }
          }
          return function(L) {
            var H = L.afternoon;
            if (H !== void 0) {
              var te = L.hours;
              H ? te < 12 && (L.hours += 12) : te === 12 && (L.hours = 0), delete L.afternoon;
            }
          }(U), U;
        };
      }
      return function($, c, S) {
        S.p.customParseFormat = true, $ && $.parseTwoDigitYear && (i = $.parseTwoDigitYear);
        var k = c.prototype, g = k.parse;
        k.parse = function(b) {
          var D = b.date, d = b.utc, p = b.args;
          this.$u = d;
          var h = p[1];
          if (typeof h == "string") {
            var A = p[2] === true, U = p[3] === true, K = A || U, W = p[2];
            U && (W = p[2]), u = this.$locale(), !A && W && (u = S.Ls[W]), this.$d = function(E, M, L, H) {
              try {
                if (["x", "X"].indexOf(M) > -1) return new Date((M === "X" ? 1e3 : 1) * E);
                var te = f(M)(E), ce = te.year, le = te.month, R = te.day, T = te.hours, N = te.minutes, ee = te.seconds, J = te.milliseconds, F = te.zone, _ = te.week, ae = /* @__PURE__ */ new Date(), pe = R || (ce || le ? 1 : ae.getDate()), De = ce || ae.getFullYear(), Me = 0;
                ce && !le || (Me = le > 0 ? le - 1 : ae.getMonth());
                var be, P = T || 0, Y = N || 0, Z = ee || 0, re = J || 0;
                return F ? new Date(Date.UTC(De, Me, pe, P, Y, Z, re + 60 * F.offset * 1e3)) : L ? new Date(Date.UTC(De, Me, pe, P, Y, Z, re)) : (be = new Date(De, Me, pe, P, Y, Z, re), _ && (be = H(be).week(_).toDate()), be);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            }(D, h, d, S), this.init(), W && W !== true && (this.$L = this.locale(W).$L), K && D != this.format(h) && (this.$d = /* @__PURE__ */ new Date("")), u = {};
          } else if (h instanceof Array) for (var X = h.length, Q = 1; Q <= X; Q += 1) {
            p[1] = h[Q - 1];
            var O = S.apply(this, p);
            if (O.isValid()) {
              this.$d = O.$d, this.$L = O.$L, this.init();
              break;
            }
            Q === X && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else g.call(this, b);
        };
      };
    });
  }(Ot)), Ot.exports;
}
var mn = fn();
var dr = Mt(mn);
var Vt = { exports: {} };
var hn = Vt.exports;
var Pa;
function vn() {
  return Pa || (Pa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(hn, function() {
      var t = "week", a = "year";
      return function(n, o, l) {
        var s = o.prototype;
        s.week = function(u) {
          if (u === void 0 && (u = null), u !== null) return this.add(7 * (u - this.week()), "day");
          var i = this.$locale().yearStart || 1;
          if (this.month() === 11 && this.date() > 25) {
            var m = l(this).startOf(a).add(1, a).date(i), y = l(this).endOf(t);
            if (m.isBefore(y)) return 1;
          }
          var v = l(this).startOf(a).date(i).startOf(t).subtract(1, "millisecond"), w = this.diff(v, t, true);
          return w < 0 ? l(this).startOf("week").week() : Math.ceil(w);
        }, s.weeks = function(u) {
          return u === void 0 && (u = null), this.week(u);
        };
      };
    });
  }(Vt)), Vt.exports;
}
var pn = vn();
var gn = Mt(pn);
var Ft = { exports: {} };
var yn = Ft.exports;
var Aa;
function $n() {
  return Aa || (Aa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(yn, function() {
      return function(t, a, n) {
        var o = a.prototype, l = function(y) {
          return y && (y.indexOf ? y : y.s);
        }, s = function(y, v, w, x, f) {
          var $ = y.name ? y : y.$locale(), c = l($[v]), S = l($[w]), k = c || S.map(function(b) {
            return b.slice(0, x);
          });
          if (!f) return k;
          var g = $.weekStart;
          return k.map(function(b, D) {
            return k[(D + (g || 0)) % 7];
          });
        }, u = function() {
          return n.Ls[n.locale()];
        }, i = function(y, v) {
          return y.formats[v] || function(w) {
            return w.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(x, f, $) {
              return f || $.slice(1);
            });
          }(y.formats[v.toUpperCase()]);
        }, m = function() {
          var y = this;
          return { months: function(v) {
            return v ? v.format("MMMM") : s(y, "months");
          }, monthsShort: function(v) {
            return v ? v.format("MMM") : s(y, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return y.$locale().weekStart || 0;
          }, weekdays: function(v) {
            return v ? v.format("dddd") : s(y, "weekdays");
          }, weekdaysMin: function(v) {
            return v ? v.format("dd") : s(y, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(v) {
            return v ? v.format("ddd") : s(y, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(v) {
            return i(y.$locale(), v);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        o.localeData = function() {
          return m.bind(this)();
        }, n.localeData = function() {
          var y = u();
          return { firstDayOfWeek: function() {
            return y.weekStart || 0;
          }, weekdays: function() {
            return n.weekdays();
          }, weekdaysShort: function() {
            return n.weekdaysShort();
          }, weekdaysMin: function() {
            return n.weekdaysMin();
          }, months: function() {
            return n.months();
          }, monthsShort: function() {
            return n.monthsShort();
          }, longDateFormat: function(v) {
            return i(y, v);
          }, meridiem: y.meridiem, ordinal: y.ordinal };
        }, n.months = function() {
          return s(u(), "months");
        }, n.monthsShort = function() {
          return s(u(), "monthsShort", "months", 3);
        }, n.weekdays = function(y) {
          return s(u(), "weekdays", null, null, y);
        }, n.weekdaysShort = function(y) {
          return s(u(), "weekdaysShort", "weekdays", 3, y);
        }, n.weekdaysMin = function(y) {
          return s(u(), "weekdaysMin", "weekdays", 2, y);
        };
      };
    });
  }(Ft)), Ft.exports;
}
var Dn = $n();
var bn = Mt(Dn);
import_dayjs.default.extend(dr);
var La = {
  "en-US": ["MM/DD/YYYY", "M/D/YYYY"],
  "en-GB": ["DD/MM/YYYY", "D/M/YYYY"],
  "zh-TW": ["YYYY-MM-DD", "YYYY/MM/DD"],
  "zh-CN": ["YYYY-MM-DD", "YYYY/MM/DD"]
};
var Ha = [
  "YYYY-MM-DD",
  "YYYY/MM/DD",
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "YY-MM-DD",
  "YY/MM/DD"
];
var Mn = class {
  constructor(e = "zh-TW", t = "gregory") {
    Se(this, "locale");
    Se(this, "calendar");
    Se(this, "preferredFormats");
    this.locale = e, this.calendar = t, this.preferredFormats = [
      ...La[e] || [],
      ...Ha
    ];
  }
  parse(e) {
    if (!e || typeof e != "string")
      return { success: false, date: null, format: null, confidence: 0 };
    const t = e.trim();
    try {
      const a = this.tryParseWithPlugins(t);
      if (a.success) return a;
      for (const n of this.preferredFormats) {
        const o = this.tryParseWithFormat(t, n);
        if (o.success)
          return { ...o, confidence: 0.9 };
      }
      return this.fallbackParse(t);
    } catch (a) {
      return console.warn("日期解析失敗:", a), { success: false, date: null, format: null, confidence: 0 };
    }
  }
  tryParseWithPlugins(e) {
    switch (this.calendar) {
      case "roc":
        const t = new Fr();
        if (t.canParseInput(e)) {
          const a = t.parseInput(e, this.locale);
          if (a)
            return {
              success: true,
              date: a,
              format: "roc-plugin",
              confidence: 0.95,
              calendarSystem: "roc"
            };
        }
        break;
    }
    return { success: false, date: null, format: null, confidence: 0 };
  }
  tryParseWithFormat(e, t) {
    try {
      const a = (0, import_dayjs.default)(e, t, true);
      if (a.isValid())
        return {
          success: true,
          date: {
            year: a.year(),
            month: a.month() + 1,
            day: a.date(),
            hour: a.hour() || 0,
            minute: a.minute() || 0,
            second: a.second() || 0
          },
          format: t,
          confidence: 1,
          calendarSystem: "gregory"
        };
    } catch {
    }
    return { success: false, date: null, format: null, confidence: 0 };
  }
  fallbackParse(e) {
    try {
      const t = (0, import_dayjs.default)(e);
      if (t.isValid())
        return {
          success: true,
          date: {
            year: t.year(),
            month: t.month() + 1,
            day: t.date(),
            hour: t.hour() || 0,
            minute: t.minute() || 0,
            second: t.second() || 0
          },
          format: "auto-detected",
          confidence: 0.6,
          calendarSystem: "gregory"
        };
    } catch {
    }
    return { success: false, date: null, format: null, confidence: 0 };
  }
  setLocale(e) {
    this.locale = e, this.preferredFormats = [
      ...La[e] || [],
      ...Ha
    ];
  }
  setCalendar(e) {
    this.calendar = e;
  }
};
var ft = new Mn();
function Sn(r, e = "zh-TW", t = "gregory") {
  return e !== ft.locale && ft.setLocale(e), t !== ft.calendar && ft.setCalendar(t), ft.parse(r);
}
function at(r, e) {
  return r - e * Math.floor(r / e);
}
var fr = 1721426;
function Ze(r, e, t, a) {
  e = St(r, e);
  let n = e - 1, o = -2;
  return t <= 2 ? o = 0 : _e(e) && (o = -1), fr - 1 + 365 * n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400) + Math.floor((367 * t - 362) / 12 + o + a);
}
function _e(r) {
  return r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0);
}
function St(r, e) {
  return r === "BC" ? 1 - e : e;
}
function Kt(r) {
  let e = "AD";
  return r <= 0 && (e = "BC", r = 1 - r), [
    e,
    r
  ];
}
var wn = {
  standard: [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ],
  leapyear: [
    31,
    29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ]
};
var Ve = class {
  fromJulianDay(e) {
    let t = e, a = t - fr, n = Math.floor(a / 146097), o = at(a, 146097), l = Math.floor(o / 36524), s = at(o, 36524), u = Math.floor(s / 1461), i = at(s, 1461), m = Math.floor(i / 365), y = n * 400 + l * 100 + u * 4 + m + (l !== 4 && m !== 4 ? 1 : 0), [v, w] = Kt(y), x = t - Ze(v, w, 1, 1), f = 2;
    t < Ze(v, w, 3, 1) ? f = 0 : _e(w) && (f = 1);
    let $ = Math.floor(((x + f) * 12 + 373) / 367), c = t - Ze(v, w, $, 1) + 1;
    return new ue(v, w, $, c);
  }
  toJulianDay(e) {
    return Ze(e.era, e.year, e.month, e.day);
  }
  getDaysInMonth(e) {
    return wn[_e(e.year) ? "leapyear" : "standard"][e.month - 1];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMonthsInYear(e) {
    return 12;
  }
  getDaysInYear(e) {
    return _e(e.year) ? 366 : 365;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getYearsInEra(e) {
    return 9999;
  }
  getEras() {
    return [
      "BC",
      "AD"
    ];
  }
  isInverseEra(e) {
    return e.era === "BC";
  }
  balanceDate(e) {
    e.year <= 0 && (e.era = e.era === "BC" ? "AD" : "BC", e.year = 1 - e.year);
  }
  constructor() {
    this.identifier = "gregory";
  }
};
var kn = {
  "001": 1,
  AD: 1,
  AE: 6,
  AF: 6,
  AI: 1,
  AL: 1,
  AM: 1,
  AN: 1,
  AR: 1,
  AT: 1,
  AU: 1,
  AX: 1,
  AZ: 1,
  BA: 1,
  BE: 1,
  BG: 1,
  BH: 6,
  BM: 1,
  BN: 1,
  BY: 1,
  CH: 1,
  CL: 1,
  CM: 1,
  CN: 1,
  CR: 1,
  CY: 1,
  CZ: 1,
  DE: 1,
  DJ: 6,
  DK: 1,
  DZ: 6,
  EC: 1,
  EE: 1,
  EG: 6,
  ES: 1,
  FI: 1,
  FJ: 1,
  FO: 1,
  FR: 1,
  GB: 1,
  GE: 1,
  GF: 1,
  GP: 1,
  GR: 1,
  HR: 1,
  HU: 1,
  IE: 1,
  IQ: 6,
  IR: 6,
  IS: 1,
  IT: 1,
  JO: 6,
  KG: 1,
  KW: 6,
  KZ: 1,
  LB: 1,
  LI: 1,
  LK: 1,
  LT: 1,
  LU: 1,
  LV: 1,
  LY: 6,
  MC: 1,
  MD: 1,
  ME: 1,
  MK: 1,
  MN: 1,
  MQ: 1,
  MV: 5,
  MY: 1,
  NL: 1,
  NO: 1,
  NZ: 1,
  OM: 6,
  PL: 1,
  QA: 6,
  RE: 1,
  RO: 1,
  RS: 1,
  RU: 1,
  SD: 6,
  SE: 1,
  SI: 1,
  SK: 1,
  SM: 1,
  SY: 6,
  TJ: 1,
  TM: 1,
  TR: 1,
  UA: 1,
  UY: 1,
  UZ: 1,
  VA: 1,
  VN: 1,
  XK: 1
};
function Tn(r, e) {
  var t, a, n, o;
  return (o = (n = (t = r.isEqual) === null || t === void 0 ? void 0 : t.call(r, e)) !== null && n !== void 0 ? n : (a = e.isEqual) === null || a === void 0 ? void 0 : a.call(e, r)) !== null && o !== void 0 ? o : r.identifier === e.identifier;
}
function mr(r, e, t) {
  let a = r.calendar.toJulianDay(r), n = In(e), o = Math.ceil(a + 1 - n) % 7;
  return o < 0 && (o += 7), o;
}
function xn(r) {
  return We(Date.now(), r);
}
function Yn(r) {
  return Pn(xn(r));
}
function hr(r, e) {
  return r.calendar.toJulianDay(r) - e.calendar.toJulianDay(e);
}
function Cn(r, e) {
  return Ba(r) - Ba(e);
}
function Ba(r) {
  return r.hour * 36e5 + r.minute * 6e4 + r.second * 1e3 + r.millisecond;
}
var Xt = null;
function Da() {
  return Xt == null && (Xt = new Intl.DateTimeFormat().resolvedOptions().timeZone), Xt;
}
function Rn(r) {
  return r.subtract({
    days: r.day - 1
  });
}
var qa = /* @__PURE__ */ new Map();
function En(r) {
  if (Intl.Locale) {
    let t = qa.get(r);
    return t || (t = new Intl.Locale(r).maximize().region, t && qa.set(r, t)), t;
  }
  let e = r.split("-")[1];
  return e === "u" ? void 0 : e;
}
function In(r) {
  let e = En(r);
  return e && kn[e] || 0;
}
function On(r, e, t) {
  let a = r.calendar.getDaysInMonth(r);
  return Math.ceil((mr(Rn(r), e) + a) / 7);
}
function it(r) {
  r = Ie(r, new Ve());
  let e = St(r.era, r.year);
  return vr(e, r.month, r.day, r.hour, r.minute, r.second, r.millisecond);
}
function vr(r, e, t, a, n, o, l) {
  let s = /* @__PURE__ */ new Date();
  return s.setUTCHours(a, n, o, l), s.setUTCFullYear(r, e - 1, t), s.getTime();
}
function oa(r, e) {
  if (e === "UTC") return 0;
  if (r > 0 && e === Da()) return new Date(r).getTimezoneOffset() * -6e4;
  let { year: t, month: a, day: n, hour: o, minute: l, second: s } = pr(r, e);
  return vr(t, a, n, o, l, s, 0) - Math.floor(r / 1e3) * 1e3;
}
var Na = /* @__PURE__ */ new Map();
function pr(r, e) {
  let t = Na.get(e);
  t || (t = new Intl.DateTimeFormat("en-US", {
    timeZone: e,
    hour12: false,
    era: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }), Na.set(e, t));
  let a = t.formatToParts(new Date(r)), n = {};
  for (let o of a) o.type !== "literal" && (n[o.type] = o.value);
  return {
    // Firefox returns B instead of BC... https://bugzilla.mozilla.org/show_bug.cgi?id=1752253
    year: n.era === "BC" || n.era === "B" ? -n.year + 1 : +n.year,
    month: +n.month,
    day: +n.day,
    hour: n.hour === "24" ? 0 : +n.hour,
    minute: +n.minute,
    second: +n.second
  };
}
var Ua = 864e5;
function Vn(r, e, t, a) {
  return (t === a ? [
    t
  ] : [
    t,
    a
  ]).filter((o) => Fn(r, e, o));
}
function Fn(r, e, t) {
  let a = pr(t, e);
  return r.year === a.year && r.month === a.month && r.day === a.day && r.hour === a.hour && r.minute === a.minute && r.second === a.second;
}
function Ue(r, e, t = "compatible") {
  let a = ut(r);
  if (e === "UTC") return it(a);
  if (e === Da() && t === "compatible") {
    a = Ie(a, new Ve());
    let u = /* @__PURE__ */ new Date(), i = St(a.era, a.year);
    return u.setFullYear(i, a.month - 1, a.day), u.setHours(a.hour, a.minute, a.second, a.millisecond), u.getTime();
  }
  let n = it(a), o = oa(n - Ua, e), l = oa(n + Ua, e), s = Vn(a, e, n - o, n - l);
  if (s.length === 1) return s[0];
  if (s.length > 1) switch (t) {
    // 'compatible' means 'earlier' for "fall back" transitions
    case "compatible":
    case "earlier":
      return s[0];
    case "later":
      return s[s.length - 1];
    case "reject":
      throw new RangeError("Multiple possible absolute times found");
  }
  switch (t) {
    case "earlier":
      return Math.min(n - o, n - l);
    // 'compatible' means 'later' for "spring forward" transitions
    case "compatible":
    case "later":
      return Math.max(n - o, n - l);
    case "reject":
      throw new RangeError("No such absolute time found");
  }
}
function gr(r, e, t = "compatible") {
  return new Date(Ue(r, e, t));
}
function We(r, e) {
  let t = oa(r, e), a = new Date(r + t), n = a.getUTCFullYear(), o = a.getUTCMonth() + 1, l = a.getUTCDate(), s = a.getUTCHours(), u = a.getUTCMinutes(), i = a.getUTCSeconds(), m = a.getUTCMilliseconds();
  return new bt(n < 1 ? "BC" : "AD", n < 1 ? -n + 1 : n, o, l, e, t, s, u, i, m);
}
function Pn(r) {
  return new ue(r.calendar, r.era, r.year, r.month, r.day);
}
function ut(r, e) {
  let t = 0, a = 0, n = 0, o = 0;
  if ("timeZone" in r) ({ hour: t, minute: a, second: n, millisecond: o } = r);
  else if ("hour" in r && !e) return r;
  return e && ({ hour: t, minute: a, second: n, millisecond: o } = e), new ct(r.calendar, r.era, r.year, r.month, r.day, t, a, n, o);
}
function Ie(r, e) {
  if (Tn(r.calendar, e)) return r;
  let t = e.fromJulianDay(r.calendar.toJulianDay(r)), a = r.copy();
  return a.calendar = e, a.era = t.era, a.year = t.year, a.month = t.month, a.day = t.day, Xe(a), a;
}
function An(r, e, t) {
  if (r instanceof bt)
    return r.timeZone === e ? r : Hn(r, e);
  let a = Ue(r, e, t);
  return We(a, e);
}
function Ln(r) {
  let e = it(r) - r.offset;
  return new Date(e);
}
function Hn(r, e) {
  let t = it(r) - r.offset;
  return Ie(We(t, e), r.calendar);
}
var mt = 36e5;
function Qt(r, e) {
  let t = r.copy(), a = "hour" in t ? Un(t, e) : 0;
  la(t, e.years || 0), t.calendar.balanceYearMonth && t.calendar.balanceYearMonth(t, r), t.month += e.months || 0, sa(t), yr(t), t.day += (e.weeks || 0) * 7, t.day += e.days || 0, t.day += a, Bn(t), t.calendar.balanceDate && t.calendar.balanceDate(t), t.year < 1 && (t.year = 1, t.month = 1, t.day = 1);
  let n = t.calendar.getYearsInEra(t);
  if (t.year > n) {
    var o, l;
    let u = (o = (l = t.calendar).isInverseEra) === null || o === void 0 ? void 0 : o.call(l, t);
    t.year = n, t.month = u ? 1 : t.calendar.getMonthsInYear(t), t.day = u ? 1 : t.calendar.getDaysInMonth(t);
  }
  t.month < 1 && (t.month = 1, t.day = 1);
  let s = t.calendar.getMonthsInYear(t);
  return t.month > s && (t.month = s, t.day = t.calendar.getDaysInMonth(t)), t.day = Math.max(1, Math.min(t.calendar.getDaysInMonth(t), t.day)), t;
}
function la(r, e) {
  var t, a;
  !((t = (a = r.calendar).isInverseEra) === null || t === void 0) && t.call(a, r) && (e = -e), r.year += e;
}
function sa(r) {
  for (; r.month < 1; )
    la(r, -1), r.month += r.calendar.getMonthsInYear(r);
  let e = 0;
  for (; r.month > (e = r.calendar.getMonthsInYear(r)); )
    r.month -= e, la(r, 1);
}
function Bn(r) {
  for (; r.day < 1; )
    r.month--, sa(r), r.day += r.calendar.getDaysInMonth(r);
  for (; r.day > r.calendar.getDaysInMonth(r); )
    r.day -= r.calendar.getDaysInMonth(r), r.month++, sa(r);
}
function yr(r) {
  r.month = Math.max(1, Math.min(r.calendar.getMonthsInYear(r), r.month)), r.day = Math.max(1, Math.min(r.calendar.getDaysInMonth(r), r.day));
}
function Xe(r) {
  r.calendar.constrainDate && r.calendar.constrainDate(r), r.year = Math.max(1, Math.min(r.calendar.getYearsInEra(r), r.year)), yr(r);
}
function $r(r) {
  let e = {};
  for (let t in r) typeof r[t] == "number" && (e[t] = -r[t]);
  return e;
}
function Dr(r, e) {
  return Qt(r, $r(e));
}
function ba(r, e) {
  let t = r.copy();
  return e.era != null && (t.era = e.era), e.year != null && (t.year = e.year), e.month != null && (t.month = e.month), e.day != null && (t.day = e.day), Xe(t), t;
}
function Ht(r, e) {
  let t = r.copy();
  return e.hour != null && (t.hour = e.hour), e.minute != null && (t.minute = e.minute), e.second != null && (t.second = e.second), e.millisecond != null && (t.millisecond = e.millisecond), Nn(t), t;
}
function qn(r) {
  r.second += Math.floor(r.millisecond / 1e3), r.millisecond = Tt(r.millisecond, 1e3), r.minute += Math.floor(r.second / 60), r.second = Tt(r.second, 60), r.hour += Math.floor(r.minute / 60), r.minute = Tt(r.minute, 60);
  let e = Math.floor(r.hour / 24);
  return r.hour = Tt(r.hour, 24), e;
}
function Nn(r) {
  r.millisecond = Math.max(0, Math.min(r.millisecond, 1e3)), r.second = Math.max(0, Math.min(r.second, 59)), r.minute = Math.max(0, Math.min(r.minute, 59)), r.hour = Math.max(0, Math.min(r.hour, 23));
}
function Tt(r, e) {
  let t = r % e;
  return t < 0 && (t += e), t;
}
function Un(r, e) {
  return r.hour += e.hours || 0, r.minute += e.minutes || 0, r.second += e.seconds || 0, r.millisecond += e.milliseconds || 0, qn(r);
}
function Ma(r, e, t, a) {
  let n = r.copy();
  switch (e) {
    case "era": {
      let s = r.calendar.getEras(), u = s.indexOf(r.era);
      if (u < 0) throw new Error("Invalid era: " + r.era);
      u = je(u, t, 0, s.length - 1, a == null ? void 0 : a.round), n.era = s[u], Xe(n);
      break;
    }
    case "year":
      var o, l;
      !((o = (l = n.calendar).isInverseEra) === null || o === void 0) && o.call(l, n) && (t = -t), n.year = je(r.year, t, -1 / 0, 9999, a == null ? void 0 : a.round), n.year === -1 / 0 && (n.year = 1), n.calendar.balanceYearMonth && n.calendar.balanceYearMonth(n, r);
      break;
    case "month":
      n.month = je(r.month, t, 1, r.calendar.getMonthsInYear(r), a == null ? void 0 : a.round);
      break;
    case "day":
      n.day = je(r.day, t, 1, r.calendar.getDaysInMonth(r), a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return r.calendar.balanceDate && r.calendar.balanceDate(n), Xe(n), n;
}
function br(r, e, t, a) {
  let n = r.copy();
  switch (e) {
    case "hour": {
      let o = r.hour, l = 0, s = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let u = o >= 12;
        l = u ? 12 : 0, s = u ? 23 : 11;
      }
      n.hour = je(o, t, l, s, a == null ? void 0 : a.round);
      break;
    }
    case "minute":
      n.minute = je(r.minute, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "second":
      n.second = je(r.second, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "millisecond":
      n.millisecond = je(r.millisecond, t, 0, 999, a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return n;
}
function je(r, e, t, a, n = false) {
  if (n) {
    r += Math.sign(e), r < t && (r = a);
    let o = Math.abs(e);
    e > 0 ? r = Math.ceil(r / o) * o : r = Math.floor(r / o) * o, r > a && (r = t);
  } else
    r += e, r < t ? r = a - (t - r - 1) : r > a && (r = t + (r - a - 1));
  return r;
}
function Mr(r, e) {
  let t;
  if (e.years != null && e.years !== 0 || e.months != null && e.months !== 0 || e.weeks != null && e.weeks !== 0 || e.days != null && e.days !== 0) {
    let n = Qt(ut(r), {
      years: e.years,
      months: e.months,
      weeks: e.weeks,
      days: e.days
    });
    t = Ue(n, r.timeZone);
  } else
    t = it(r) - r.offset;
  t += e.milliseconds || 0, t += (e.seconds || 0) * 1e3, t += (e.minutes || 0) * 6e4, t += (e.hours || 0) * 36e5;
  let a = We(t, r.timeZone);
  return Ie(a, r.calendar);
}
function zn(r, e) {
  return Mr(r, $r(e));
}
function Wn(r, e, t, a) {
  switch (e) {
    case "hour": {
      let n = 0, o = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let x = r.hour >= 12;
        n = x ? 12 : 0, o = x ? 23 : 11;
      }
      let l = ut(r), s = Ie(Ht(l, {
        hour: n
      }), new Ve()), u = [
        Ue(s, r.timeZone, "earlier"),
        Ue(s, r.timeZone, "later")
      ].filter((x) => We(x, r.timeZone).day === s.day)[0], i = Ie(Ht(l, {
        hour: o
      }), new Ve()), m = [
        Ue(i, r.timeZone, "earlier"),
        Ue(i, r.timeZone, "later")
      ].filter((x) => We(x, r.timeZone).day === i.day).pop(), y = it(r) - r.offset, v = Math.floor(y / mt), w = y % mt;
      return y = je(v, t, Math.floor(u / mt), Math.floor(m / mt), a == null ? void 0 : a.round) * mt + w, Ie(We(y, r.timeZone), r.calendar);
    }
    case "minute":
    case "second":
    case "millisecond":
      return br(r, e, t, a);
    case "era":
    case "year":
    case "month":
    case "day": {
      let n = Ma(ut(r), e, t, a), o = Ue(n, r.timeZone);
      return Ie(We(o, r.timeZone), r.calendar);
    }
    default:
      throw new Error("Unsupported field " + e);
  }
}
function jn(r, e, t) {
  let a = ut(r), n = Ht(ba(a, e), e);
  if (n.compare(a) === 0) return r;
  let o = Ue(n, r.timeZone, t);
  return Ie(We(o, r.timeZone), r.calendar);
}
function Jn(r) {
  return `${String(r.hour).padStart(2, "0")}:${String(r.minute).padStart(2, "0")}:${String(r.second).padStart(2, "0")}${r.millisecond ? String(r.millisecond / 1e3).slice(1) : ""}`;
}
function Sr(r) {
  let e = Ie(r, new Ve()), t;
  return e.era === "BC" ? t = e.year === 1 ? "0000" : "-" + String(Math.abs(1 - e.year)).padStart(6, "00") : t = String(e.year).padStart(4, "0"), `${t}-${String(e.month).padStart(2, "0")}-${String(e.day).padStart(2, "0")}`;
}
function wr(r) {
  return `${Sr(r)}T${Jn(r)}`;
}
function _n(r) {
  let e = Math.sign(r) < 0 ? "-" : "+";
  r = Math.abs(r);
  let t = Math.floor(r / 36e5), a = r % 36e5 / 6e4;
  return `${e}${String(t).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
}
function Kn(r) {
  return `${wr(r)}${_n(r.offset)}[${r.timeZone}]`;
}
function Qn(r, e) {
  if (e.has(r))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function Sa(r, e, t) {
  Qn(r, e), e.set(r, t);
}
function wa(r) {
  let e = typeof r[0] == "object" ? r.shift() : new Ve(), t;
  if (typeof r[0] == "string") t = r.shift();
  else {
    let l = e.getEras();
    t = l[l.length - 1];
  }
  let a = r.shift(), n = r.shift(), o = r.shift();
  return [
    e,
    t,
    a,
    n,
    o
  ];
}
var Zn = /* @__PURE__ */ new WeakMap();
var ue = class _ue {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _ue(this.calendar, this.era, this.year, this.month, this.day) : new _ue(this.calendar, this.year, this.month, this.day);
  }
  /** Returns a new `CalendarDate` with the given duration added to it. */
  add(e) {
    return Qt(this, e);
  }
  /** Returns a new `CalendarDate` with the given duration subtracted from it. */
  subtract(e) {
    return Dr(this, e);
  }
  /** Returns a new `CalendarDate` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(e) {
    return ba(this, e);
  }
  /**
  * Returns a new `CalendarDate` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(e, t, a) {
    return Ma(this, e, t, a);
  }
  /** Converts the date to a native JavaScript Date object, with the time set to midnight in the given time zone. */
  toDate(e) {
    return gr(this, e);
  }
  /** Converts the date to an ISO 8601 formatted string. */
  toString() {
    return Sr(this);
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(e) {
    return hr(this, e);
  }
  constructor(...e) {
    Sa(this, Zn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = wa(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, Xe(this);
  }
};
var Gn = /* @__PURE__ */ new WeakMap();
var ct = class _ct {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _ct(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond) : new _ct(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `CalendarDateTime` with the given duration added to it. */
  add(e) {
    return Qt(this, e);
  }
  /** Returns a new `CalendarDateTime` with the given duration subtracted from it. */
  subtract(e) {
    return Dr(this, e);
  }
  /** Returns a new `CalendarDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(e) {
    return ba(Ht(this, e), e);
  }
  /**
  * Returns a new `CalendarDateTime` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(e, t, a) {
    switch (e) {
      case "era":
      case "year":
      case "month":
      case "day":
        return Ma(this, e, t, a);
      default:
        return br(this, e, t, a);
    }
  }
  /** Converts the date to a native JavaScript Date object in the given time zone. */
  toDate(e, t) {
    return gr(this, e, t);
  }
  /** Converts the date to an ISO 8601 formatted string. */
  toString() {
    return wr(this);
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(e) {
    let t = hr(this, e);
    return t === 0 ? Cn(this, ut(e)) : t;
  }
  constructor(...e) {
    Sa(this, Gn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = wa(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, Xe(this);
  }
};
var Xn = /* @__PURE__ */ new WeakMap();
var bt = class _bt {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _bt(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond) : new _bt(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `ZonedDateTime` with the given duration added to it. */
  add(e) {
    return Mr(this, e);
  }
  /** Returns a new `ZonedDateTime` with the given duration subtracted from it. */
  subtract(e) {
    return zn(this, e);
  }
  /** Returns a new `ZonedDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(e, t) {
    return jn(this, e, t);
  }
  /**
  * Returns a new `ZonedDateTime` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(e, t, a) {
    return Wn(this, e, t, a);
  }
  /** Converts the date to a native JavaScript Date object. */
  toDate() {
    return Ln(this);
  }
  /** Converts the date to an ISO 8601 formatted string, including the UTC offset and time zone identifier. */
  toString() {
    return Kn(this);
  }
  /** Converts the date to an ISO 8601 formatted string in UTC. */
  toAbsoluteString() {
    return this.toDate().toISOString();
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(e) {
    return this.toDate().getTime() - An(e, this.timeZone).toDate().getTime();
  }
  constructor(...e) {
    Sa(this, Xn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = wa(e), s = e.shift(), u = e.shift();
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.timeZone = s, this.offset = u, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, Xe(this);
  }
};
var rt = [
  [
    1868,
    9,
    8
  ],
  [
    1912,
    7,
    30
  ],
  [
    1926,
    12,
    25
  ],
  [
    1989,
    1,
    8
  ],
  [
    2019,
    5,
    1
  ]
];
var eo = [
  [
    1912,
    7,
    29
  ],
  [
    1926,
    12,
    24
  ],
  [
    1989,
    1,
    7
  ],
  [
    2019,
    4,
    30
  ]
];
var Pt = [
  1867,
  1911,
  1925,
  1988,
  2018
];
var Je = [
  "meiji",
  "taisho",
  "showa",
  "heisei",
  "reiwa"
];
function za(r) {
  const e = rt.findIndex(([t, a, n]) => r.year < t || r.year === t && r.month < a || r.year === t && r.month === a && r.day < n);
  return e === -1 ? rt.length - 1 : e === 0 ? 0 : e - 1;
}
function ea(r) {
  let e = Pt[Je.indexOf(r.era)];
  if (!e) throw new Error("Unknown era: " + r.era);
  return new ue(r.year + e, r.month, r.day);
}
var to = class extends Ve {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = za(t);
    return new ue(this, Je[a], t.year - Pt[a], t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(ea(e));
  }
  balanceDate(e) {
    let t = ea(e), a = za(t);
    Je[a] !== e.era && (e.era = Je[a], e.year = t.year - Pt[a]), this.constrainDate(e);
  }
  constrainDate(e) {
    let t = Je.indexOf(e.era), a = eo[t];
    if (a != null) {
      let [n, o, l] = a, s = n - Pt[t];
      e.year = Math.max(1, Math.min(s, e.year)), e.year === s && (e.month = Math.min(o, e.month), e.month === o && (e.day = Math.min(l, e.day)));
    }
    if (e.year === 1 && t >= 0) {
      let [, n, o] = rt[t];
      e.month = Math.max(n, e.month), e.month === n && (e.day = Math.max(o, e.day));
    }
  }
  getEras() {
    return Je;
  }
  getYearsInEra(e) {
    let t = Je.indexOf(e.era), a = rt[t], n = rt[t + 1];
    if (n == null)
      return 9999 - a[0] + 1;
    let o = n[0] - a[0];
    return (e.month < n[1] || e.month === n[1] && e.day < n[2]) && o++, o;
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(ea(e));
  }
  getMinimumMonthInYear(e) {
    let t = Wa(e);
    return t ? t[1] : 1;
  }
  getMinimumDayInMonth(e) {
    let t = Wa(e);
    return t && e.month === t[1] ? t[2] : 1;
  }
  constructor(...e) {
    super(...e), this.identifier = "japanese";
  }
};
function Wa(r) {
  if (r.year === 1) {
    let e = Je.indexOf(r.era);
    return rt[e];
  }
}
var kr = -543;
var ao = class extends Ve {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = St(t.era, t.year);
    return new ue(this, a - kr, t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(ja(e));
  }
  getEras() {
    return [
      "BE"
    ];
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(ja(e));
  }
  balanceDate() {
  }
  constructor(...e) {
    super(...e), this.identifier = "buddhist";
  }
};
function ja(r) {
  let [e, t] = Kt(r.year + kr);
  return new ue(e, t, r.month, r.day);
}
var Bt = 1911;
function Tr(r) {
  return r.era === "minguo" ? r.year + Bt : 1 - r.year + Bt;
}
function Ja(r) {
  let e = r - Bt;
  return e > 0 ? [
    "minguo",
    e
  ] : [
    "before_minguo",
    1 - e
  ];
}
var ro = class extends Ve {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = St(t.era, t.year), [n, o] = Ja(a);
    return new ue(this, n, o, t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(_a(e));
  }
  getEras() {
    return [
      "before_minguo",
      "minguo"
    ];
  }
  balanceDate(e) {
    let [t, a] = Ja(Tr(e));
    e.era = t, e.year = a;
  }
  isInverseEra(e) {
    return e.era === "before_minguo";
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(_a(e));
  }
  getYearsInEra(e) {
    return e.era === "before_minguo" ? 9999 : 9999 - Bt;
  }
  constructor(...e) {
    super(...e), this.identifier = "roc";
  }
};
function _a(r) {
  let [e, t] = Kt(Tr(r));
  return new ue(e, t, r.month, r.day);
}
var Ka = 1948320;
var Qa = [
  0,
  31,
  62,
  93,
  124,
  155,
  186,
  216,
  246,
  276,
  306,
  336
  // Esfand
];
var no = class {
  fromJulianDay(e) {
    let t = e - Ka, a = 1 + Math.floor((33 * t + 3) / 12053), n = 365 * (a - 1) + Math.floor((8 * a + 21) / 33), o = t - n, l = o < 216 ? Math.floor(o / 31) : Math.floor((o - 6) / 30), s = o - Qa[l] + 1;
    return new ue(this, a, l + 1, s);
  }
  toJulianDay(e) {
    let t = Ka - 1 + 365 * (e.year - 1) + Math.floor((8 * e.year + 21) / 33);
    return t += Qa[e.month - 1], t += e.day, t;
  }
  getMonthsInYear() {
    return 12;
  }
  getDaysInMonth(e) {
    return e.month <= 6 ? 31 : e.month <= 11 || at(25 * e.year + 11, 33) < 8 ? 30 : 29;
  }
  getEras() {
    return [
      "AP"
    ];
  }
  getYearsInEra() {
    return 9377;
  }
  constructor() {
    this.identifier = "persian";
  }
};
var ta = 78;
var Za = 80;
var oo = class extends Ve {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = t.year - ta, n = e - Ze(t.era, t.year, 1, 1), o;
    n < Za ? (a--, o = _e(t.year - 1) ? 31 : 30, n += o + 155 + 90 + 10) : (o = _e(t.year) ? 31 : 30, n -= Za);
    let l, s;
    if (n < o)
      l = 1, s = n + 1;
    else {
      let u = n - o;
      u < 155 ? (l = Math.floor(u / 31) + 2, s = u % 31 + 1) : (u -= 155, l = Math.floor(u / 30) + 7, s = u % 30 + 1);
    }
    return new ue(this, a, l, s);
  }
  toJulianDay(e) {
    let t = e.year + ta, [a, n] = Kt(t), o, l;
    return _e(n) ? (o = 31, l = Ze(a, n, 3, 21)) : (o = 30, l = Ze(a, n, 3, 22)), e.month === 1 ? l + e.day - 1 : (l += o + Math.min(e.month - 2, 5) * 31, e.month >= 8 && (l += (e.month - 7) * 30), l += e.day - 1, l);
  }
  getDaysInMonth(e) {
    return e.month === 1 && _e(e.year + ta) || e.month >= 2 && e.month <= 6 ? 31 : 30;
  }
  getYearsInEra() {
    return 9919;
  }
  getEras() {
    return [
      "saka"
    ];
  }
  balanceDate() {
  }
  constructor(...e) {
    super(...e), this.identifier = "indian";
  }
};
var qt = 1948440;
var Ga = 1948439;
var Pe = 1300;
var et = 1600;
var lo = 460322;
function Nt(r, e, t, a) {
  return a + Math.ceil(29.5 * (t - 1)) + (e - 1) * 354 + Math.floor((3 + 11 * e) / 30) + r - 1;
}
function xr(r, e, t) {
  let a = Math.floor((30 * (t - e) + 10646) / 10631), n = Math.min(12, Math.ceil((t - (29 + Nt(e, a, 1, 1))) / 29.5) + 1), o = t - Nt(e, a, n, 1) + 1;
  return new ue(r, a, n, o);
}
function Xa(r) {
  return (14 + 11 * r) % 30 < 11;
}
var ka = class {
  fromJulianDay(e) {
    return xr(this, qt, e);
  }
  toJulianDay(e) {
    return Nt(qt, e.year, e.month, e.day);
  }
  getDaysInMonth(e) {
    let t = 29 + e.month % 2;
    return e.month === 12 && Xa(e.year) && t++, t;
  }
  getMonthsInYear() {
    return 12;
  }
  getDaysInYear(e) {
    return Xa(e.year) ? 355 : 354;
  }
  getYearsInEra() {
    return 9665;
  }
  getEras() {
    return [
      "AH"
    ];
  }
  constructor() {
    this.identifier = "islamic-civil";
  }
};
var so = class extends ka {
  fromJulianDay(e) {
    return xr(this, Ga, e);
  }
  toJulianDay(e) {
    return Nt(Ga, e.year, e.month, e.day);
  }
  constructor(...e) {
    super(...e), this.identifier = "islamic-tbla";
  }
};
var io = "qgpUDckO1AbqBmwDrQpVBakGkgepC9QF2gpcBS0NlQZKB1QLagutBa4ETwoXBYsGpQbVCtYCWwmdBE0KJg2VDawFtgm6AlsKKwWVCsoG6Qr0AnYJtgJWCcoKpAvSC9kF3AJtCU0FpQpSC6ULtAW2CVcFlwJLBaMGUgdlC2oFqworBZUMSg2lDcoF1gpXCasESwmlClILagt1BXYCtwhbBFUFqQW0BdoJ3QRuAjYJqgpUDbIN1QXaAlsJqwRVCkkLZAtxC7QFtQpVCiUNkg7JDtQG6QprCasEkwpJDaQNsg25CroEWworBZUKKgtVC1wFvQQ9Ah0JlQpKC1oLbQW2AjsJmwRVBqkGVAdqC2wFrQpVBSkLkgupC9QF2gpaBasKlQVJB2QHqgu1BbYCVgpNDiULUgtqC60FrgIvCZcESwalBqwG1gpdBZ0ETQoWDZUNqgW1BdoCWwmtBJUFygbkBuoK9QS2AlYJqgpUC9IL2QXqAm0JrQSVCkoLpQuyBbUJ1gSXCkcFkwZJB1ULagVrCisFiwpGDaMNygXWCtsEawJLCaUKUgtpC3UFdgG3CFsCKwVlBbQF2gntBG0BtgimClINqQ3UBdoKWwmrBFMGKQdiB6kLsgW1ClUFJQuSDckO0gbpCmsFqwRVCikNVA2qDbUJugQ7CpsETQqqCtUK2gJdCV4ELgqaDFUNsga5BroEXQotBZUKUguoC7QLuQXaAloJSgukDdEO6AZqC20FNQWVBkoNqA3UDdoGWwWdAisGFQtKC5ULqgWuCi4JjwwnBZUGqgbWCl0FnQI=";
var ia;
var nt;
function At(r) {
  return lo + nt[r - Pe];
}
function vt(r, e) {
  let t = r - Pe, a = 1 << 11 - (e - 1);
  return (ia[t] & a) === 0 ? 29 : 30;
}
function er(r, e) {
  let t = At(r);
  for (let a = 1; a < e; a++) t += vt(r, a);
  return t;
}
function tr(r) {
  return nt[r + 1 - Pe] - nt[r - Pe];
}
var uo = class extends ka {
  fromJulianDay(e) {
    let t = e - qt, a = At(Pe), n = At(et);
    if (t < a || t > n) return super.fromJulianDay(e);
    {
      let o = Pe - 1, l = 1, s = 1;
      for (; s > 0; ) {
        o++, s = t - At(o) + 1;
        let u = tr(o);
        if (s === u) {
          l = 12;
          break;
        } else if (s < u) {
          let i = vt(o, l);
          for (l = 1; s > i; )
            s -= i, l++, i = vt(o, l);
          break;
        }
      }
      return new ue(this, o, l, t - er(o, l) + 1);
    }
  }
  toJulianDay(e) {
    return e.year < Pe || e.year > et ? super.toJulianDay(e) : qt + er(e.year, e.month) + (e.day - 1);
  }
  getDaysInMonth(e) {
    return e.year < Pe || e.year > et ? super.getDaysInMonth(e) : vt(e.year, e.month);
  }
  getDaysInYear(e) {
    return e.year < Pe || e.year > et ? super.getDaysInYear(e) : tr(e.year);
  }
  constructor() {
    if (super(), this.identifier = "islamic-umalqura", ia || (ia = new Uint16Array(Uint8Array.from(atob(io), (e) => e.charCodeAt(0)).buffer)), !nt) {
      nt = new Uint32Array(et - Pe + 1);
      let e = 0;
      for (let t = Pe; t <= et; t++) {
        nt[t - Pe] = e;
        for (let a = 1; a <= 12; a++) e += vt(t, a);
      }
    }
  }
};
var ar = 347997;
var Yr = 1080;
var Cr = 24 * Yr;
var co = 29;
var fo = 12 * Yr + 793;
var mo = co * Cr + fo;
function Qe(r) {
  return at(r * 7 + 1, 19) < 7;
}
function Lt(r) {
  let e = Math.floor((235 * r - 234) / 19), t = 12084 + 13753 * e, a = e * 29 + Math.floor(t / 25920);
  return at(3 * (a + 1), 7) < 3 && (a += 1), a;
}
function ho(r) {
  let e = Lt(r - 1), t = Lt(r);
  return Lt(r + 1) - t === 356 ? 2 : t - e === 382 ? 1 : 0;
}
function pt(r) {
  return Lt(r) + ho(r);
}
function Rr(r) {
  return pt(r + 1) - pt(r);
}
function vo(r) {
  let e = Rr(r);
  switch (e > 380 && (e -= 30), e) {
    case 353:
      return 0;
    // deficient
    case 354:
      return 1;
    // normal
    case 355:
      return 2;
  }
}
function xt(r, e) {
  if (e >= 6 && !Qe(r) && e++, e === 4 || e === 7 || e === 9 || e === 11 || e === 13) return 29;
  let t = vo(r);
  return e === 2 ? t === 2 ? 30 : 29 : e === 3 ? t === 0 ? 29 : 30 : e === 6 ? Qe(r) ? 30 : 0 : 30;
}
var po = class {
  fromJulianDay(e) {
    let t = e - ar, a = t * Cr / mo, n = Math.floor((19 * a + 234) / 235) + 1, o = pt(n), l = Math.floor(t - o);
    for (; l < 1; )
      n--, o = pt(n), l = Math.floor(t - o);
    let s = 1, u = 0;
    for (; u < l; )
      u += xt(n, s), s++;
    s--, u -= xt(n, s);
    let i = l - u;
    return new ue(this, n, s, i);
  }
  toJulianDay(e) {
    let t = pt(e.year);
    for (let a = 1; a < e.month; a++) t += xt(e.year, a);
    return t + e.day + ar;
  }
  getDaysInMonth(e) {
    return xt(e.year, e.month);
  }
  getMonthsInYear(e) {
    return Qe(e.year) ? 13 : 12;
  }
  getDaysInYear(e) {
    return Rr(e.year);
  }
  getYearsInEra() {
    return 9999;
  }
  getEras() {
    return [
      "AM"
    ];
  }
  balanceYearMonth(e, t) {
    t.year !== e.year && (Qe(t.year) && !Qe(e.year) && t.month > 6 ? e.month-- : !Qe(t.year) && Qe(e.year) && t.month > 6 && e.month++);
  }
  constructor() {
    this.identifier = "hebrew";
  }
};
var ua = 1723856;
var rr = 1824665;
var ca = 5500;
function Ut(r, e, t, a) {
  return r + 365 * e + Math.floor(e / 4) + 30 * (t - 1) + a - 1;
}
function Ta(r, e) {
  let t = Math.floor(4 * (e - r) / 1461), a = 1 + Math.floor((e - Ut(r, t, 1, 1)) / 30), n = e + 1 - Ut(r, t, a, 1);
  return [
    t,
    a,
    n
  ];
}
function Er(r) {
  return Math.floor(r % 4 / 3);
}
function Ir(r, e) {
  return e % 13 !== 0 ? 30 : Er(r) + 5;
}
var xa = class {
  fromJulianDay(e) {
    let [t, a, n] = Ta(ua, e), o = "AM";
    return t <= 0 && (o = "AA", t += ca), new ue(this, o, t, a, n);
  }
  toJulianDay(e) {
    let t = e.year;
    return e.era === "AA" && (t -= ca), Ut(ua, t, e.month, e.day);
  }
  getDaysInMonth(e) {
    return Ir(e.year, e.month);
  }
  getMonthsInYear() {
    return 13;
  }
  getDaysInYear(e) {
    return 365 + Er(e.year);
  }
  getYearsInEra(e) {
    return e.era === "AA" ? 9999 : 9991;
  }
  getEras() {
    return [
      "AA",
      "AM"
    ];
  }
  constructor() {
    this.identifier = "ethiopic";
  }
};
var go = class extends xa {
  fromJulianDay(e) {
    let [t, a, n] = Ta(ua, e);
    return t += ca, new ue(this, "AA", t, a, n);
  }
  getEras() {
    return [
      "AA"
    ];
  }
  getYearsInEra() {
    return 9999;
  }
  constructor(...e) {
    super(...e), this.identifier = "ethioaa";
  }
};
var yo = class extends xa {
  fromJulianDay(e) {
    let [t, a, n] = Ta(rr, e), o = "CE";
    return t <= 0 && (o = "BCE", t = 1 - t), new ue(this, o, t, a, n);
  }
  toJulianDay(e) {
    let t = e.year;
    return e.era === "BCE" && (t = 1 - t), Ut(rr, t, e.month, e.day);
  }
  getDaysInMonth(e) {
    let t = e.year;
    return e.era === "BCE" && (t = 1 - t), Ir(t, e.month);
  }
  isInverseEra(e) {
    return e.era === "BCE";
  }
  balanceDate(e) {
    e.year <= 0 && (e.era = e.era === "BCE" ? "CE" : "BCE", e.year = 1 - e.year);
  }
  getEras() {
    return [
      "BCE",
      "CE"
    ];
  }
  getYearsInEra(e) {
    return e.era === "BCE" ? 9999 : 9715;
  }
  constructor(...e) {
    super(...e), this.identifier = "coptic";
  }
};
function $o(r) {
  switch (r) {
    case "buddhist":
      return new ao();
    case "ethiopic":
      return new xa();
    case "ethioaa":
      return new go();
    case "coptic":
      return new yo();
    case "hebrew":
      return new po();
    case "indian":
      return new oo();
    case "islamic-civil":
      return new ka();
    case "islamic-tbla":
      return new so();
    case "islamic-umalqura":
      return new uo();
    case "japanese":
      return new to();
    case "persian":
      return new no();
    case "roc":
      return new ro();
    case "gregory":
    default:
      return new Ve();
  }
}
var aa = /* @__PURE__ */ new Map();
var zt = class {
  /** Formats a date as a string according to the locale and format options passed to the constructor. */
  format(e) {
    return this.formatter.format(e);
  }
  /** Formats a date to an array of parts such as separators, numbers, punctuation, and more. */
  formatToParts(e) {
    return this.formatter.formatToParts(e);
  }
  /** Formats a date range as a string. */
  formatRange(e, t) {
    if (typeof this.formatter.formatRange == "function")
      return this.formatter.formatRange(e, t);
    if (t < e) throw new RangeError("End date must be >= start date");
    return `${this.formatter.format(e)} – ${this.formatter.format(t)}`;
  }
  /** Formats a date range as an array of parts. */
  formatRangeToParts(e, t) {
    if (typeof this.formatter.formatRangeToParts == "function")
      return this.formatter.formatRangeToParts(e, t);
    if (t < e) throw new RangeError("End date must be >= start date");
    let a = this.formatter.formatToParts(e), n = this.formatter.formatToParts(t);
    return [
      ...a.map((o) => ({
        ...o,
        source: "startRange"
      })),
      {
        type: "literal",
        value: " – ",
        source: "shared"
      },
      ...n.map((o) => ({
        ...o,
        source: "endRange"
      }))
    ];
  }
  /** Returns the resolved formatting options based on the values passed to the constructor. */
  resolvedOptions() {
    let e = this.formatter.resolvedOptions();
    return Mo() && (this.resolvedHourCycle || (this.resolvedHourCycle = So(e.locale, this.options)), e.hourCycle = this.resolvedHourCycle, e.hour12 = this.resolvedHourCycle === "h11" || this.resolvedHourCycle === "h12"), e.calendar === "ethiopic-amete-alem" && (e.calendar = "ethioaa"), e;
  }
  constructor(e, t = {}) {
    this.formatter = Or(e, t), this.options = t;
  }
};
var Do = {
  true: {
    // Only Japanese uses the h11 style for 12 hour time. All others use h12.
    ja: "h11"
  },
  false: {}
};
function Or(r, e = {}) {
  if (typeof e.hour12 == "boolean" && bo()) {
    e = {
      ...e
    };
    let n = Do[String(e.hour12)][r.split("-")[0]], o = e.hour12 ? "h12" : "h23";
    e.hourCycle = n ?? o, delete e.hour12;
  }
  let t = r + (e ? Object.entries(e).sort((n, o) => n[0] < o[0] ? -1 : 1).join() : "");
  if (aa.has(t)) return aa.get(t);
  let a = new Intl.DateTimeFormat(r, e);
  return aa.set(t, a), a;
}
var ra = null;
function bo() {
  return ra == null && (ra = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false
  }).format(new Date(2020, 2, 3, 0)) === "24"), ra;
}
var na = null;
function Mo() {
  return na == null && (na = new Intl.DateTimeFormat("fr", {
    hour: "numeric",
    hour12: false
  }).resolvedOptions().hourCycle === "h12"), na;
}
function So(r, e) {
  if (!e.timeStyle && !e.hour) return;
  r = r.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, ""), r += (r.includes("-u-") ? "" : "-u") + "-nu-latn";
  let t = Or(r, {
    ...e,
    timeZone: void 0
    // use local timezone
  }), a = parseInt(t.formatToParts(new Date(2020, 2, 3, 0)).find((o) => o.type === "hour").value, 10), n = parseInt(t.formatToParts(new Date(2020, 2, 3, 23)).find((o) => o.type === "hour").value, 10);
  if (a === 0 && n === 23) return "h23";
  if (a === 24 && n === 23) return "h24";
  if (a === 0 && n === 11) return "h11";
  if (a === 12 && n === 11) return "h12";
  throw new Error("Unexpected hour cycle result");
}
import_dayjs.default.extend(on);
import_dayjs.default.extend(cn);
import_dayjs.default.extend(dr);
import_dayjs.default.extend(gn);
import_dayjs.default.extend(bn);
function ot() {
  const r = /* @__PURE__ */ new Date();
  return {
    year: r.getFullYear(),
    month: r.getMonth() + 1,
    day: r.getDate()
  };
}
function wo(r) {
  try {
    const e = Da(), t = Yn(e);
    if (r.calendar.identifier !== t.calendar.identifier) {
      const a = Ie(t, r.calendar);
      return r.compare(a) === 0;
    }
    return r.compare(t) === 0;
  } catch (e) {
    return console.error("Error checking if date is today:", e), false;
  }
}
function tt() {
  const r = /* @__PURE__ */ new Date();
  return {
    year: r.getFullYear(),
    month: r.getMonth() + 1,
    day: r.getDate(),
    hour: r.getHours(),
    minute: r.getMinutes(),
    second: r.getSeconds()
  };
}
function ze(r, e, t, a, n, o) {
  const l = { year: r, month: e, day: t };
  return a !== void 0 && (l.hour = a), n !== void 0 && (l.minute = n), o !== void 0 && (l.second = o), l;
}
function ge(r, e = "zh-TW", t = "gregory") {
  if (!r) return null;
  try {
    if (Co(r))
      return r;
    if (r instanceof Date && !isNaN(r.getTime()))
      return {
        year: r.getFullYear(),
        month: r.getMonth() + 1,
        day: r.getDate(),
        hour: r.getHours(),
        minute: r.getMinutes(),
        second: r.getSeconds()
      };
    if (typeof r == "string") {
      const a = Sn(r, e, t);
      return a.success ? a.date : null;
    }
    return null;
  } catch (a) {
    return console.error("Failed to parse date:", a), null;
  }
}
function Oe(r, e = "YYYY-MM-DD") {
  if (!r) return null;
  try {
    return (0, import_dayjs.default)("2000-01-01 00:00:00").year(r.year).month(r.month - 1).date(r.day).hour(r.hour || 0).minute(r.minute || 0).second(r.second || 0).format(e);
  } catch (t) {
    return console.error("Failed to format date:", t), null;
  }
}
function Wt(r, e = "iso", t = "YYYY-MM-DD", a, n = false, o = "gregory", l = "zh-TW", s = false, u = true) {
  if (!r) return null;
  try {
    switch (e) {
      case "iso":
        if (n) {
          let i;
          return u ? i = s ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD HH:mm:ss" : i = s ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD HH:mm", Oe(r, i);
        } else
          return Oe(r, "YYYY-MM-DD");
      case "date":
        return new Date(
          r.year,
          r.month - 1,
          r.day,
          r.hour || 0,
          r.minute || 0,
          r.second || 0
        );
      case "object":
        return r;
      case "custom":
        return he.formatOutput(r, t, a, n, o, l);
      default:
        return console.warn(`不支援的輸出類型: ${e}，回退到 ISO 格式`), Oe(r, "YYYY-MM-DD");
    }
  } catch (i) {
    return console.error("formatOutput 失敗:", i), r;
  }
}
function jt(r, e) {
  const t = r.year * 1e4 + r.month * 100 + r.day, a = e.year * 1e4 + e.month * 100 + e.day;
  return t < a ? -1 : t > a ? 1 : 0;
}
function da(r, e) {
  const t = new Date(r.year, r.month - 1, r.day);
  return t.setDate(t.getDate() + e), {
    year: t.getFullYear(),
    month: t.getMonth() + 1,
    day: t.getDate(),
    hour: r.hour,
    minute: r.minute,
    second: r.second
  };
}
function nr(r, e) {
  const t = new Date(r.year, r.month - 1, r.day).getTime(), a = new Date(e.year, e.month - 1, e.day).getTime();
  return Math.ceil((a - t) / (1e3 * 60 * 60 * 24));
}
function ko() {
  const r = tt(), e = ze(r.year, r.month, 1, 0, 0, 0), t = r.month === 12 ? 1 : r.month + 1, a = r.month === 12 ? r.year + 1 : r.year, n = ze(a, t, 1), o = da(n, -1);
  return { start: e, end: o };
}
function To(r, e) {
  if (!r || typeof r != "string")
    return false;
  try {
    const t = Vr(r);
    let a = true;
    if (e && (a = fa(e)), !t)
      return console.warn(`日期格式語義驗證失敗: "${r}"`), false;
    if (e && !a)
      return console.warn(`時間格式語義驗證失敗: "${e}"`), false;
    const n = (0, import_dayjs.default)("2000-12-31 23:59:59");
    let o = false;
    try {
      const i = n.format(r);
      o = i !== r && i.length > 0;
    } catch (i) {
      console.warn(`日期格式 dayjs 驗證失敗: "${r}"`, i), o = false;
    }
    let l = true;
    if (e)
      try {
        const i = n.format(e);
        l = i !== e && i.length > 0;
      } catch (i) {
        console.warn(`時間格式 dayjs 驗證失敗: "${e}"`, i), l = false;
      }
    let s = true;
    if (e)
      try {
        const i = `${r} ${e}`, m = n.format(i);
        s = m !== i && m.length > 0;
      } catch (i) {
        console.warn(`組合格式 dayjs 驗證失敗: "${r} ${e}"`, i), s = false;
      }
    return o && l && s;
  } catch (t) {
    return console.error("格式驗證時發生錯誤:", t), false;
  }
}
function Vr(r) {
  const e = ["YYYY", "YY", "MM", "M", "DD", "D"], t = ["-", "/", ".", " "];
  let a = r;
  t.forEach((v) => {
    a = a.replace(new RegExp(`\\${v}`, "g"), " ");
  });
  const n = a.split(/\s+/).filter(Boolean);
  if (!n.every((v) => e.includes(v))) return false;
  const l = n.some((v) => v === "YYYY" || v === "YY"), s = n.some((v) => v === "MM" || v === "M"), u = n.some((v) => v === "DD" || v === "D"), i = n.filter((v) => v === "YYYY" || v === "YY").length, m = n.filter((v) => v === "MM" || v === "M").length, y = n.filter((v) => v === "DD" || v === "D").length;
  return i > 1 || m > 1 || y > 1 ? false : l && s && u;
}
function fa(r) {
  if (!r || typeof r != "string")
    return false;
  const e = [
    "HH",
    "H",
    // 24 小時制
    "hh",
    "h",
    // 12 小時制
    "mm",
    "m",
    // 分鐘
    "ss",
    "s",
    // 秒
    "A",
    "a"
    // AM/PM
  ], a = r.replace(/[^\w]/g, " ").split(/\s+/).filter(Boolean);
  if (!a.every((m) => e.includes(m)))
    return false;
  const o = a.some((m) => ["HH", "H"].includes(m)), l = a.some((m) => ["hh", "h"].includes(m)), s = a.some((m) => ["mm", "m"].includes(m));
  if (a.some((m) => ["A", "a"].includes(m)), !(o || l) || !s || l && o)
    return false;
  const i = e.reduce((m, y) => (m[y] = a.filter((v) => v === y).length, m), {});
  return !Object.values(i).some((m) => m > 1);
}
function xo(r) {
  return r.replace(/yyyy/g, "YYYY").replace(/yy/g, "YY").replace(/mm/g, "MM").replace(/dd/g, "DD");
}
function Yo(r) {
  let e = r;
  return e = e.replace(/HH/g, "HH").replace(/hh/g, "hh").replace(/MM/g, "mm").replace(/SS/g, "ss").replace(/aa/g, "a").replace(/AA/g, "A"), e;
}
function Co(r) {
  return !r || typeof r != "object" ? false : typeof r.year == "number" && typeof r.month == "number" && typeof r.day == "number";
}
var Fr = class {
  constructor() {
    Se(this, "id", "roc");
    Se(this, "yearRange", {
      min: 1,
      // 民國1年 (1912年)
      max: 200
      // 民國200年 (2111年)
    });
    Se(this, "displayName", {
      "zh-TW": "民國曆",
      "zh-CN": "民国历",
      "en-US": "ROC Calendar",
      "ja-JP": "中華民国暦",
      "ko-KR": "중화민국력"
    });
    Se(this, "YEAR_OFFSET", 1911);
  }
  parseInput(e, t) {
    if (!e || typeof e != "string") return null;
    const n = e.trim().replace(/^(民國|民国|ROC\s*)/i, "").trim();
    if (/[上下]午|時|分|秒|\d{1,2}:\d{2}/.test(n))
      return this.parseDateTime(n);
    {
      if (/\d+年\d+月\d+日/.test(n))
        return this.parseDatePart(n);
      const l = n.replace(/[年月日時分秒]/g, ""), s = ["-", "/", ".", " "];
      for (const u of s) {
        const i = this.tryParseWithSeparator(l, u);
        if (i) return i;
      }
    }
    return null;
  }
  /**
   * 解析包含日期和時間的字串
   */
  parseDateTime(e) {
    const t = e.match(/^(\d+年\d+月\d+日)\s*(.*)$/);
    if (!t) return null;
    const [, a, n] = t, o = this.parseDatePart(a);
    if (!o) return null;
    const l = this.parseTimePart(n);
    return l ? {
      ...o,
      ...l
    } : o;
  }
  /**
   * 解析日期部分 (如: "114年06月18日")
   * 統一轉換為公元曆
   */
  parseDatePart(e) {
    const t = e.match(/(\d+)年(\d+)月(\d+)日/);
    if (!t) return null;
    const [, a, n, o] = t, l = parseInt(a), s = parseInt(n), u = parseInt(o);
    return this.validateAndConvertRocDate(l, s, u);
  }
  /**
   * 解析時間部分 (如: "上午 12時00分")
   */
  parseTimePart(e) {
    if (!e) return null;
    const t = e.trim(), a = t.match(/(上午|下午)\s*(\d{1,2})時(\d{2})分(?:(\d{2})秒)?/);
    if (a) {
      const [, o, l, s, u] = a;
      let i = parseInt(l);
      const m = parseInt(s), y = u ? parseInt(u) : 0;
      return o === "下午" && i !== 12 ? i += 12 : o === "上午" && i === 12 && (i = 0), i < 0 || i > 23 || m < 0 || m > 59 || y < 0 || y > 59 ? null : { hour: i, minute: m, second: y };
    }
    const n = t.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (n) {
      const [, o, l, s] = n, u = parseInt(o), i = parseInt(l), m = s ? parseInt(s) : 0;
      return u < 0 || u > 23 || i < 0 || i > 59 || m < 0 || m > 59 ? null : { hour: u, minute: i, second: m };
    }
    return null;
  }
  canParseInput(e) {
    return /^(民國|民国|ROC\s*)/i.test(e.trim());
  }
  /**
   * 使用指定分隔符解析
   */
  tryParseWithSeparator(e, t) {
    const a = e.split(t).map((s) => s.trim()).filter(Boolean);
    if (a.length < 3) return null;
    const n = parseInt(a[0]), o = parseInt(a[1]), l = parseInt(a[2]);
    return this.validateAndConvertRocDate(n, o, l);
  }
  /**
  * 通用的 ROC 日期驗證和轉換方法
  */
  validateAndConvertRocDate(e, t, a) {
    if (isNaN(e) || isNaN(t) || isNaN(a) || e < this.yearRange.min || e > this.yearRange.max) return null;
    const n = e + this.YEAR_OFFSET;
    if (t < 1 || t > 12 || a < 1 || a > 31) return null;
    const o = `${n}-${t.toString().padStart(2, "0")}-${a.toString().padStart(2, "0")}`, l = (0, import_dayjs.default)(o, "YYYY-MM-DD", true);
    return !l.isValid() || l.year() !== n || l.month() + 1 !== t || l.date() !== a ? null : {
      year: n,
      month: t,
      day: a
    };
  }
  /**
   * 檢查是否支援特定格式
   */
  supportsFormat(e) {
    return e.includes("ROC-") || e.includes("民國");
  }
  /**
   * 自定義格式化 - 專注於民國年的特殊格式
   */
  format(e, t, a) {
    if (!this.supportsFormat(t))
      throw new Error(`RocFormatPlugin 不支援格式: ${t}`);
    const n = e.hour !== void 0 && e.hour !== null, o = t.split(" "), l = o[0], s = o.slice(1).join(" "), u = this.formatDatePart(e, l, a);
    if (s && n) {
      const i = this.detectTimeFormat(s), m = this.formatTimePart(e, s, i);
      return `${u} ${m}`;
    }
    return u;
  }
  /**
   * 透過格式字串偵測時間制式
   */
  detectTimeFormat(e) {
    return !e.includes("A") && !e.includes("a") && !e.includes("hh");
  }
  /**
   * 格式化日期部分
   */
  formatDatePart(e, t, a) {
    const n = e.year - this.YEAR_OFFSET, o = e.month, l = e.day, s = {
      "ROC-YYYY": `民國${n}年`,
      "ROC-YYYY-MM-DD": `民國${n}年${o.toString().padStart(2, "0")}月${l.toString().padStart(2, "0")}日`,
      "ROC-YYYY/MM/DD": `民國${n}/${o.toString().padStart(2, "0")}/${l.toString().padStart(2, "0")}`,
      "ROC-NUM-YYYY-MM-DD": `${n}-${o.toString().padStart(2, "0")}-${l.toString().padStart(2, "0")}`,
      "ROC-NUM-YYYY/MM/DD": `${n}/${o.toString().padStart(2, "0")}/${l.toString().padStart(2, "0")}`
    };
    if (s[t])
      return s[t];
    const u = new Date(e.year, e.month - 1, e.day);
    let i = (0, import_dayjs.default)(u).format(t);
    if (t.includes("YYYY"))
      i = i.replace(e.year.toString(), n.toString());
    else if (t.includes("YY")) {
      const m = e.year.toString().slice(-2), y = n.toString().slice(-2);
      i = i.replace(m, y);
    }
    return i;
  }
  /**
   * 格式化 ROC 時間
   */
  formatTimePart(e, t, a) {
    if (!e) return "";
    const n = e.hour || 0, o = e.minute || 0, l = e.second || 0, s = this.getFormattedTime(n, o, l, t, a);
    return s || this.fallbackToDateJs(e, t, a);
  }
  /**
   * 統一的時間格式化處理
   */
  getFormattedTime(e, t, a, n, o) {
    if (o) {
      const l = {
        "HH:mm:ss": () => this.formatBasicTime(e, t, a, true),
        "HH:mm": () => this.formatBasicTime(e, t, 0, false),
        HH時mm分ss秒: () => this.formatChineseTime(e, t, a, true),
        HH時mm分: () => this.formatChineseTime(e, t, 0, false)
      };
      if (l[n])
        return l[n]();
    } else {
      const l = {
        "hh:mm:ss A": () => this.format12HourTime(e, t, a, true, "suffix"),
        "hh:mm A": () => this.format12HourTime(e, t, 0, false, "suffix"),
        "h:mm A": () => this.format12HourTime(e, t, 0, false, "suffix", false),
        "A hh:mm:ss": () => this.format12HourTime(e, t, a, true, "prefix"),
        "A hh:mm": () => this.format12HourTime(e, t, 0, false, "prefix"),
        "A HH時mm分ss秒": () => this.format12HourTime(e, t, a, true, "chinese"),
        "A HH時mm分": () => this.format12HourTime(e, t, 0, false, "chinese")
      };
      if (l[n])
        return l[n]();
    }
    return null;
  }
  /**
   * 基本時間格式化（24小時制）
   */
  formatBasicTime(e, t, a, n) {
    const o = e.toString().padStart(2, "0"), l = t.toString().padStart(2, "0");
    if (n) {
      const s = a.toString().padStart(2, "0");
      return `${o}:${l}:${s}`;
    }
    return `${o}:${l}`;
  }
  /**
   * 中文時間格式化（24小時制）
   */
  formatChineseTime(e, t, a, n) {
    const o = e.toString().padStart(2, "0"), l = t.toString().padStart(2, "0");
    if (n) {
      const s = a.toString().padStart(2, "0");
      return `${o}時${l}分${s}秒`;
    }
    return `${o}時${l}分`;
  }
  /**
   * 12小時制時間格式化（統一處理）
   */
  format12HourTime(e, t, a, n, o, l = true) {
    const s = e < 12 ? "上午" : "下午", u = e === 0 ? 12 : e > 12 ? e - 12 : e, i = l ? u.toString().padStart(2, "0") : u.toString(), m = t.toString().padStart(2, "0"), y = n ? a.toString().padStart(2, "0") : "";
    switch (o) {
      case "suffix":
        return n ? `${i}:${m}:${y} ${s}` : `${i}:${m} ${s}`;
      case "prefix":
        return n ? `${s} ${i}:${m}:${y}` : `${s} ${i}:${m}`;
      case "chinese":
        return n ? `${s} ${i}時${m}分${y}秒` : `${s} ${i}時${m}分`;
      default:
        return "";
    }
  }
  /**
  * 回退到 dayjs 處理
  */
  fallbackToDateJs(e, t, a) {
    const n = new Date(
      e.year,
      e.month - 1,
      e.day,
      e.hour || 0,
      e.minute || 0,
      e.second || 0
    );
    if (!n || isNaN(n.getTime())) return "";
    let o = (0, import_dayjs.default)(n).format(t);
    return !a && (t.includes("A") || t.includes("a")) && (o = o.replace(/AM/g, "上午").replace(/PM/g, "下午"), o = o.replace(/am/g, "上午").replace(/pm/g, "下午")), o;
  }
};
var Ce = class Ce2 {
  /**
   * 安全地創建日曆實例
   */
  static createSafeCalendar(e) {
    try {
      return $o(e);
    } catch (t) {
      return console.warn(`無法創建日曆 ${e}，回退到西元曆:`, t), new Ve();
    }
  }
  /**
   * 安全地進行日曆轉換
   */
  static safeToCalendar(e, t) {
    try {
      return Ie(e, t);
    } catch (a) {
      return console.warn("日曆轉換失敗，返回原始日期:", a), e;
    }
  }
  /**
   * 安全地生成日曆網格
   */
  static generateCalendarDays(e, t, a, n, o = 0) {
    try {
      if (!this.isCalendarSupported(a))
        return console.warn(`不支持的日曆系統: ${a}`), [];
      const l = this.createSafeCalendar(a), s = new ue(e, t, 1), u = a === "gregory" ? s : this.safeToCalendar(s, l), i = On(u, n) ?? 6, y = (mr(u, n) - o + 7) % 7, v = u.subtract({ days: y }), w = [];
      let x = v;
      const f = i * 7;
      for (let $ = 0; $ < f; $++)
        w.push(x), x = x.add({ days: 1 });
      return w;
    } catch (l) {
      return console.error("生成日曆網格失敗:", l), [];
    }
  }
  /**
   * 獲取日曆系統的有效年份範圍 (新版本)
   */
  static getCalendarRange(e) {
    const t = (/* @__PURE__ */ new Date()).getFullYear();
    return {
      gregory: { min: 1, max: t + 100 },
      japanese: { min: 1868, max: t + 100 },
      roc: { min: 1912, max: t + 100 },
      buddhist: { min: 544, max: t + 643 },
      islamic: { min: 622, max: t + 100 },
      persian: { min: 622, max: t + 100 },
      hebrew: { min: 1, max: t + 3860 }
    }[e] || { min: 1, max: t + 100 };
  }
  /**
   * 轉換西元年到目標日曆系統年份
   */
  static convertGregorianYear(e, t) {
    if (t === "gregory")
      return { localYear: e, isValid: true };
    try {
      const a = new ue(e, 1, 1), n = this.createSafeCalendar(t), o = this.safeToCalendar(a, n), l = this.getCalendarRange(t), s = e >= l.min && e <= l.max;
      return { localYear: o.year, isValid: s };
    } catch (a) {
      return console.warn(`年份轉換失敗 ${e} -> ${t}:`, a), { localYear: e, isValid: false };
    }
  }
  /**
   * 轉換目標日曆年份到西元年
   */
  static convertToGregorianYear(e, t) {
    if (t === "gregory")
      return e;
    try {
      const a = this.createSafeCalendar(t), n = new ue(a, e, 1, 1);
      return this.safeToCalendar(n, new Ve()).year;
    } catch (a) {
      return console.warn(`年份轉換失敗 ${e} ${t} -> Gregory:`, a), e;
    }
  }
  /**
   * 獲取月份名稱
   */
  static getMonthNames(e, t = "gregory") {
    try {
      const a = new Intl.DateTimeFormat(e, { month: "short" });
      return Array.from({ length: 12 }, (n, o) => {
        const l = new Date(2e3, o, 1);
        return a.format(l);
      });
    } catch (a) {
      return console.warn(`獲取月份名稱失敗 ${t}:`, a), e.startsWith("zh") ? Array.from({ length: 12 }, (n, o) => `${o + 1}月`) : e.startsWith("ja") ? Array.from({ length: 12 }, (n, o) => `${o + 1}月`) : [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
    }
  }
  /**
   * 獲取日曆系統的顯示名稱
   */
  static getCalendarDisplayName(e, t = "zh-TW") {
    var n, o;
    const a = {
      gregory: {
        "zh-TW": "西元",
        "zh-CN": "西元",
        "en-US": "Gregorian",
        "ja-JP": "西暦",
        "ko-KR": "서력"
      },
      roc: {
        "zh-TW": "民國",
        "zh-CN": "民国",
        "en-US": "ROC",
        "ja-JP": "中華民国",
        "ko-KR": "중화민국"
      },
      buddhist: {
        "zh-TW": "佛曆",
        "zh-CN": "佛历",
        "en-US": "Buddhist",
        "ja-JP": "仏暦",
        "ko-KR": "불력"
      },
      japanese: {
        "zh-TW": "和曆",
        "zh-CN": "和历",
        "en-US": "Japanese",
        "ja-JP": "和暦",
        "ko-KR": "일본력"
      },
      islamic: {
        "zh-TW": "伊斯蘭曆",
        "zh-CN": "伊斯兰历",
        "en-US": "Islamic",
        "ja-JP": "イスラム暦",
        "ko-KR": "이슬람력"
      },
      persian: {
        "zh-TW": "波斯曆",
        "zh-CN": "波斯历",
        "en-US": "Persian",
        "ja-JP": "ペルシア暦",
        "ko-KR": "페르시아력"
      },
      hebrew: {
        "zh-TW": "希伯來曆",
        "zh-CN": "希伯来历",
        "en-US": "Hebrew",
        "ja-JP": "ヘブライ暦",
        "ko-KR": "히브리력"
      }
    };
    return ((n = a[e]) == null ? void 0 : n[t]) || ((o = a[e]) == null ? void 0 : o["en-US"]) || e;
  }
  // ==================================================================== //
  /**
   * 驗證日期在指定日曆系統中是否有效
   */
  static isValidDate(e, t, a, n) {
    try {
      if (!this.isCalendarSupported(n))
        return console.warn(`不支持的日曆系統: ${n}`), false;
      if (e <= 0 || t <= 0 || a <= 0 || t > 12 || a > 31)
        return false;
      let o;
      if (n === "gregory")
        o = new ue(e, t, a);
      else {
        const s = this.createSafeCalendar(n);
        o = new ue(s, e, t, a);
      }
      return o.year === e && o.month === t && o.day === a;
    } catch (o) {
      return console.warn(`日期驗證失敗 ${e}-${t}-${a} in ${n}:`, o), false;
    }
  }
  /**
   * 解析輸入字串為 SimpleDateValue
   * 解析含日曆系統的格式，如民國XX年XX月XX日 XX時XX分XX秒
   * 執行順序：插件翻譯 → @internationalized/date → dayjs → 回退
   * 使用 dateParsingUtils.parseUserDateInput
   */
  // static parseInput(input: string, calendar: string = 'gregory', locale: string = 'zh-TW'): SimpleDateValue | null {
  //     if (!input) return null;
  //     const result = parseUserDateInput(input, locale, calendar);
  //     console.log(`解析輸入 "${input}" 為 ${calendar} 日曆系統:`, result);
  //     if (result.success && result.date) {
  //         // 如果是非西元曆且解析結果是西元日期，需要進行轉換
  //         if (calendar !== 'gregory' && result.calendarSystem === 'gregory') {
  //             // 將西元日期轉換為目標日曆系統的日期
  //             const gregorianDate = new CalendarDate(result.date.year, result.date.month, result.date.day);
  //             const targetCalendar = this.createSafeCalendar(calendar);
  //             const localDate = this.safeToCalendar(gregorianDate, targetCalendar);
  //             console.log(`轉換日期 ${result.date.year}-${result.date.month}-${result.date.day} 從西元曆到 ${calendar} 成功:`, localDate);
  //             return {
  //                 year: localDate.year,
  //                 month: localDate.month,
  //                 day: localDate.day
  //             };
  //         }
  //         return result.date;
  //     }
  //     return null;
  // }
  static isCalendarSupported(e) {
    return [
      "gregory",
      "buddhist",
      "ethiopic",
      "ethioaa",
      "coptic",
      "hebrew",
      "indian",
      "islamic-civil",
      "islamic-tbla",
      "islamic-umalqura",
      "japanese",
      "persian",
      "roc"
    ].includes(e);
  }
  /**
   * 格式化輸出 - 統一執行順序：插件 → @internationalized/date → dayjs → 基本回退
   * 格式化含日曆系統的格式，如民國XX年XX月XX日 XX時XX分XX秒
   */
  static formatOutput(e, t = "YYYY-MM-DD", a, n = false, o = "gregory", l = "zh-TW") {
    if (!e) return "";
    let s;
    if (n && a)
      s = `${t} ${a}`;
    else if (n) {
      const u = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0;
      s = `${t} HH:mm:ss`;
    } else
      s = t;
    try {
      switch (o) {
        case "gregory":
          To(t, a) || (s = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0 ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD");
          const m = new Date(
            e.year,
            e.month - 1,
            e.day,
            e.hour || 0,
            e.minute || 0,
            e.second || 0
          );
          return (0, import_dayjs.default)(m).format(s);
        case "roc":
          const y = new Fr();
          if (y.supportsFormat(s) && y.canParseInput(s))
            return y.format(e, s, l);
          break;
        // 其他日曆插件可以在這裡添加
        case "buddhist":
        case "japanese":
        case "islamic":
        case "persian":
        case "hebrew":
          break;
      }
      const u = this.convertToCalendarDateSmart(e, o);
      if (u) {
        const m = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0, y = {
          calendar: o,
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        return m && (y.hour = "numeric", y.minute = "numeric", e.second !== void 0 && (y.second = "numeric")), new zt(l, y).format(u.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone));
      }
      const i = new Date(
        e.year,
        e.month - 1,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
      return (0, import_dayjs.default)(i).format(s);
    } catch (u) {
      console.warn("所有格式化方法都失敗，使用基本回退:", u);
      let i = `${e.year}-${e.month.toString().padStart(2, "0")}-${e.day.toString().padStart(2, "0")}`;
      return (e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0) && (i += ` ${(e.hour || 0).toString().padStart(2, "0")}:${(e.minute || 0).toString().padStart(2, "0")}`, e.second !== void 0 && (i += `:${e.second.toString().padStart(2, "0")}`)), i;
    }
  }
};
Se(Ce, "convertToCalendarDateSmart", (e, t) => e ? e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0 ? Ce.convertToCalendarDateTime(e, t) : Ce.convertToCalendarDate(e, t) : null), /**
* 統一的轉換函數：SimpleDateValue → CalendarDate
*/
Se(Ce, "convertToCalendarDate", (e, t) => {
  if (!e || e.year <= 0 || e.month <= 0 || e.day <= 0 || e.month > 12 || e.day > 31)
    return null;
  try {
    if (t === "gregory")
      return new ue(e.year, e.month, e.day);
    {
      const a = Ce.createSafeCalendar(t), n = new ue(e.year, e.month, e.day);
      return Ce.safeToCalendar(n, a);
    }
  } catch (a) {
    return console.error("轉換為 CalendarDate 失敗:", a), null;
  }
}), /**
* 統一的轉換函數：SimpleDateValue → CalendarDateTime (日期+時間)
*/
Se(Ce, "convertToCalendarDateTime", (e, t) => {
  if (!e) return null;
  try {
    if (t === "gregory")
      return new ct(
        e.year,
        e.month,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
    {
      const a = Ce.createSafeCalendar(t), n = new ct(
        e.year,
        e.month,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
      return Ie(n, a);
    }
  } catch (a) {
    return console.error("轉換為 CalendarDateTime 失敗:", a), null;
  }
}), /**
* 統一的轉換函數：CalendarDate → SimpleDateValue
*/
Se(Ce, "convertFromCalendarDate", (e, t) => {
  if (!e) return null;
  try {
    if (e.calendar.identifier === "gregory" || t === "gregory")
      return {
        year: e.year,
        month: e.month,
        day: e.day
      };
    {
      const a = Ce.createSafeCalendar("gregory"), n = Ce.safeToCalendar(e, a);
      return {
        year: n.year,
        month: n.month,
        day: n.day
      };
    }
  } catch (a) {
    return console.error("轉換從 CalendarDate 失敗:", a), null;
  }
});
var he = Ce;
var {
  // 轉換核心
  convertToCalendarDate: Gs,
  convertFromCalendarDate: Xs,
  // 日曆基礎
  createSafeCalendar: ei,
  safeToCalendar: ti,
  generateCalendarDays: ai,
  // 年份轉換 (YearSelector)
  convertGregorianYear: ri,
  convertToGregorianYear: ni,
  getCalendarRange: oi,
  // getCalendarYearRange,
  // 顯示相關
  getMonthNames: li,
  getCalendarDisplayName: si,
  // 日曆系統輸出輸入轉換
  // isValidDate,
  // parseInput,
  isCalendarSupported: ii,
  formatOutput: ui
} = he;
var lt = (r) => /^\d+$/.test(r);
var or = (r) => r % 4 === 0 && r % 100 !== 0 || r % 400 === 0;
var Be = null;
function Ro() {
  return Be || (Be = document.createElement("span"), Be.style.visibility = "hidden", Be.style.position = "absolute", Be.style.top = "-9999px", Be.style.left = "-9999px", Be.style.whiteSpace = "pre", document.body.appendChild(Be)), Be;
}
var ma = /* @__PURE__ */ new WeakMap();
function Eo(r, e = "") {
  const t = Ro(), a = getComputedStyle(r);
  return t.style.font = a.font, t.style.fontSize = a.fontSize, t.style.fontWeight = a.fontWeight, t.style.letterSpacing = a.letterSpacing, t.style.padding = a.padding, t.style.border = a.border, t.style.boxSizing = a.boxSizing, t.textContent = r.value || e || "", t.offsetWidth + 4;
}
function ht(r) {
  const e = r.placeholder || "", t = Eo(r, e), a = ma.get(r) || 0;
  r.style.width = `${Math.max(t, a)}px`;
}
var st = {
  // 初始設置
  mounted(r, e) {
    e.value && typeof e.value == "number" && ma.set(r, e.value), ht(r), r.addEventListener("input", () => ht(r)), document.fonts && document.fonts.ready && document.fonts.ready.then(() => ht(r));
  },
  // 處理更新
  updated(r, e) {
    e.value && typeof e.value == "number" && e.oldValue !== e.value && ma.set(r, e.value), ht(r);
  },
  // 為 Vue 3 添加 beforeUnmount
  beforeUnmount(r) {
    r.removeEventListener("input", () => ht(r));
  }
};
var Io = { class: "date-input-container flex items-center justify-start" };
var Oo = ["placeholder", "aria-invalid", "aria-errormessage"];
var Vo = ["placeholder", "aria-invalid", "aria-errormessage"];
var Fo = ["placeholder", "aria-invalid", "aria-errormessage"];
var Po = {
  key: 3,
  class: "text-gray-400"
};
var Ao = defineComponent({
  __name: "DateInput",
  props: {
    modelValue: { default: null },
    yearPlaceholder: { default: "" },
    monthPlaceholder: { default: "" },
    dayPlaceholder: { default: "" },
    minDate: { default: null },
    maxDate: { default: null },
    required: { type: Boolean, default: true },
    separator: { default: "-" },
    dateFormat: { default: "YYYY-MM-DD" }
  },
  emits: ["update:modelValue", "validation", "complete"],
  setup(r, { expose: e, emit: t }) {
    const a = {
      mounted: st.mounted,
      updated: st.updated,
      beforeUnmount: st.beforeUnmount
    }, n = r, o = t, l = ref(""), s = ref(""), u = ref(""), i = ref({}), m = ref({}), y = ref(null), v = ref(false), w = ref(false), x = ref(null), f = ref(/* @__PURE__ */ new Map()), $ = (R, T) => {
      R && R instanceof HTMLInputElement ? f.value.set(T, R) : f.value.delete(T);
    }, c = (R) => f.value.get(R), S = computed(() => {
      const R = {};
      return Object.entries(i.value).forEach(([T, N]) => {
        R[T] = N.key;
      }), R;
    }), k = computed(() => Object.keys(i.value).length > 0), g = computed(() => Object.values(S.value)), b = computed(() => {
      const R = n.dateFormat.toUpperCase(), T = [];
      return R.split(/[^A-Z]+/).filter(Boolean).forEach((ee) => {
        ee.includes("Y") ? T.push("year") : ee.includes("M") ? T.push("month") : ee.includes("D") && T.push("day");
      }), T.length !== 3 ? (console.warn(`Invalid date format: ${n.dateFormat}, falling back to YYYY-MM-DD`), ["year", "month", "day"]) : T;
    }), D = computed(() => {
      if (!l.value || !s.value || !u.value)
        return null;
      const R = l.value.padStart(4, "0"), T = s.value.padStart(2, "0"), N = u.value.padStart(2, "0");
      return `${R}-${T}-${N}`;
    }), d = computed(() => {
      if (!D.value) return null;
      const R = (0, import_dayjs.default)(D.value);
      return R.isValid() ? R.format(n.dateFormat) : null;
    });
    watch(() => n.modelValue, (R) => {
      if (v.value || (v.value = true), R) {
        const T = ge(R);
        T && (l.value = T.year.toString(), s.value = T.month.toString().padStart(2, "0"), u.value = T.day.toString().padStart(2, "0"));
      } else
        l.value = "", s.value = "", u.value = "";
      R || (x.value = null, w.value = false);
    }, { immediate: true });
    const p = () => {
      if (b.value.length === 0) return;
      const R = b.value[0], T = c(R);
      if (T && typeof T.focus == "function")
        try {
          T.focus();
        } catch (N) {
          console.warn("無法聚焦到輸入框:", N);
        }
      else
        for (const N of b.value) {
          const ee = c(N);
          if (ee && typeof ee.focus == "function")
            try {
              ee.focus();
              break;
            } catch (J) {
              console.warn("無法聚焦到輸入框:", J);
            }
        }
    }, h = (R) => {
      const T = c(R);
      if (T && typeof T.focus == "function")
        try {
          T.focus();
        } catch (N) {
          console.warn(`無法聚焦到 ${R} 輸入框:`, N);
        }
    }, A = (R, T) => {
      const N = c(R);
      if (N)
        try {
          if (typeof N.focus == "function" && N.focus(), typeof N.setSelectionRange == "function") {
            const ee = T === "end" ? N.value.length : 0;
            N.setSelectionRange(ee, ee);
          }
        } catch (ee) {
          console.warn(`無法聚焦或設置游標位置到 ${R} 輸入框:`, ee);
        }
    }, U = (R, T) => {
      const N = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return T === 2 ? or(R) ? 29 : 28 : N[T];
    }, K = (R, T) => {
      if (!T) return { valid: true };
      const N = parseInt(T);
      switch (R) {
        case "year":
          if (T.length < 4) return { valid: true };
          const ee = n.maxDate ? (0, import_dayjs.default)(n.maxDate).year() : (/* @__PURE__ */ new Date()).getFullYear() + 50, J = n.minDate ? (0, import_dayjs.default)(n.minDate).year() : 1;
          if (!lt(T) || N < J || N > ee)
            return { valid: false, error: { key: "year.outOfRange", params: { min: J, max: ee } } };
          if (s.value === "02" && u.value === "29" && !or(N))
            return { valid: false, error: { key: "year.notLeapYear", params: { year: N } } };
          break;
        case "month":
          if (!lt(T) || N < 1 || N > 12)
            return { valid: false, error: { key: "month.outOfRange" } };
          if (u.value && l.value) {
            const F = parseInt(l.value), _ = U(F, N);
            if (parseInt(u.value) > _)
              return { valid: false, error: { key: "day.notExistInMonth", params: { month: T, maxDays: _ } } };
          }
          break;
        case "day":
          if (!lt(T) || N < 1 || N > 31)
            return { valid: false, error: { key: "day.outOfRange" } };
          if (l.value && s.value) {
            const F = parseInt(l.value), _ = parseInt(s.value), ae = U(F, _);
            if (N > ae)
              return _ === 2 && N === 29 ? { valid: false, error: { key: "year.notLeapYear", params: { year: F } } } : { valid: false, error: { key: "day.notExistInMonth", params: { month: s.value, maxDays: ae } } };
          }
          break;
      }
      return i.value[R] && (delete i.value[R], delete m.value[R]), { valid: true };
    }, W = () => {
      if (!v.value) return;
      i.value = {}, m.value = {};
      const R = K("year", l.value), T = K("month", s.value), N = K("day", u.value);
      if (!R.valid && R.error && (i.value.year = R.error, R.error.params && (m.value.year = R.error.params)), !T.valid && T.error && (i.value.month = T.error, T.error.params && (m.value.month = T.error.params)), !N.valid && N.error && (i.value.day = N.error, N.error.params && (m.value.day = N.error.params)), n.required && (l.value || (i.value.year = { key: "year.required" }), s.value || (i.value.month = { key: "month.required" }), u.value || (i.value.day = { key: "day.required" })), D.value && Object.keys(i.value).length === 0) {
        const ee = (0, import_dayjs.default)(D.value);
        if (!ee.isValid())
          i.value.day = { key: "day.invalid" };
        else if (n.minDate && ee.isBefore((0, import_dayjs.default)(n.minDate)))
          i.value.day = {
            key: "date.beforeMin",
            params: { minDate: (0, import_dayjs.default)(n.minDate).format(n.dateFormat) }
          }, m.value.day = { minDate: (0, import_dayjs.default)(n.minDate).format(n.dateFormat) };
        else if (n.maxDate && ee.isAfter((0, import_dayjs.default)(n.maxDate)))
          i.value.day = {
            key: "date.afterMax",
            params: { maxDate: (0, import_dayjs.default)(n.maxDate).format(n.dateFormat) }
          }, m.value.day = { maxDate: (0, import_dayjs.default)(n.maxDate).format(n.dateFormat) };
        else if (d.value) {
          o("update:modelValue", d.value);
          const J = d.value;
          J !== x.value && !w.value && (x.value = J, o("complete", d.value));
        }
      } else v.value && !l.value && !s.value && !u.value && (o("update:modelValue", null), x.value = null);
      o("validation", !k.value, S.value, m.value);
    }, X = () => {
      l.value = "", s.value = "", u.value = "", i.value = {};
    }, Q = (R) => {
      const T = b.value.findIndex((ee) => ee === R), N = T < b.value.length - 1 ? b.value[T + 1] : null;
      N ? nextTick(() => {
        h(N);
      }) : W();
    }, O = (R, T, N, ee) => {
      const J = T.replace(/\D/g, "");
      if (J.length === 1 && w.value && (w.value = false), J.length <= N) {
        if (ee && J.length === 1 && parseInt(J) > ee) {
          const F = J.padStart(2, "0");
          R === "year" ? l.value = F : R === "month" ? s.value = F : R === "day" && (u.value = F), Q(R);
        } else
          R === "year" ? l.value = J : R === "month" ? s.value = J : R === "day" && (u.value = J);
        J.length === N && Q(R);
      }
    }, E = (R) => {
      const T = R.target;
      O("year", T.value, 4);
    }, M = (R) => {
      const T = R.target;
      O("month", T.value, 2, 1);
    }, L = (R) => {
      const T = R.target;
      O("day", T.value, 2, 3);
    }, H = () => {
      nextTick(() => {
        if (b.value.length === 0) return;
        const R = b.value[b.value.length - 1], T = c(R);
        if (T && typeof T.focus == "function")
          try {
            T.focus();
            const N = T.value.length;
            T.setSelectionRange(N, N);
          } catch (N) {
            console.warn("無法聚焦到最後一個輸入框:", N);
          }
      });
    }, te = (R, T) => {
      const N = R.target, ee = b.value.findIndex((_) => _ === T), J = ee > 0 ? b.value[ee - 1] : null, F = ee < b.value.length - 1 ? b.value[ee + 1] : null;
      R.key === "Backspace" && N.value === "" && J && (R.preventDefault(), w.value = true, A(J, "end")), R.key === "ArrowLeft" && N.selectionStart === 0 && J && (R.preventDefault(), w.value = true, A(J, "end")), R.key === "ArrowRight" && N.selectionStart === N.value.length && F && (R.preventDefault(), w.value = true, A(F, "start")), R.key === "Enter" && W();
    }, ce = (R) => {
      y.value = R;
    }, le = (R) => {
      W(), y.value = null;
    };
    return e({
      validate: W,
      reset: () => {
        X(), o("update:modelValue", null);
      },
      getErrors: () => ({ ...i.value }),
      hasErrors: () => k.value,
      errorMessages: () => g.value,
      focus: p,
      focusLast: H,
      setDate: (R) => {
        if (R) {
          const T = ge(R);
          T && (l.value = T.year.toString(), s.value = T.month.toString().padStart(2, "0"), u.value = T.day.toString().padStart(2, "0"), W());
        } else
          X(), o("update:modelValue", null);
      },
      resetCompletionState: () => {
        w.value = false, x.value = null;
      }
    }), (R, T) => (openBlock(), createElementBlock("div", Io, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(b.value, (N, ee) => (openBlock(), createElementBlock(Fragment, { key: N }, [
        N === "year" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 0,
          ref_for: true,
          ref: (J) => $(J, "year"),
          "onUpdate:modelValue": T[0] || (T[0] = (J) => l.value = J),
          type: "text",
          inputmode: "numeric",
          placeholder: R.yearPlaceholder,
          maxlength: 4,
          class: "date-input text-sm text-center active:bg-vdt-theme-100",
          onInput: E,
          onKeydown: T[1] || (T[1] = (J) => te(J, "year")),
          onFocus: T[2] || (T[2] = (J) => ce("year")),
          onBlur: T[3] || (T[3] = (J) => le()),
          "aria-label": "year",
          "aria-invalid": !!S.value.year,
          "aria-errormessage": S.value.year ? "year-error" : void 0
        }, null, 40, Oo)), [
          [vModelText, l.value],
          [a, 20]
        ]) : N === "month" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 1,
          ref_for: true,
          ref: (J) => $(J, "month"),
          "onUpdate:modelValue": T[4] || (T[4] = (J) => s.value = J),
          type: "text",
          inputmode: "numeric",
          placeholder: R.monthPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: M,
          onKeydown: T[5] || (T[5] = (J) => te(J, "month")),
          onFocus: T[6] || (T[6] = (J) => ce("month")),
          onBlur: T[7] || (T[7] = (J) => le()),
          "aria-label": "month",
          "aria-invalid": !!S.value.month,
          "aria-errormessage": S.value.month ? "month-error" : void 0
        }, null, 40, Vo)), [
          [vModelText, s.value],
          [a, 20]
        ]) : N === "day" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 2,
          ref_for: true,
          ref: (J) => $(J, "day"),
          "onUpdate:modelValue": T[8] || (T[8] = (J) => u.value = J),
          type: "text",
          inputmode: "numeric",
          placeholder: R.dayPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: L,
          onKeydown: T[9] || (T[9] = (J) => te(J, "day")),
          onFocus: T[10] || (T[10] = (J) => ce("day")),
          onBlur: T[11] || (T[11] = (J) => le()),
          "aria-label": "day",
          "aria-invalid": !!S.value.day,
          "aria-errormessage": S.value.day ? "day-error" : void 0
        }, null, 40, Fo)), [
          [vModelText, u.value],
          [a, 20]
        ]) : createCommentVNode("", true),
        ee < b.value.length - 1 ? (openBlock(), createElementBlock("span", Po, toDisplayString(R.separator), 1)) : createCommentVNode("", true)
      ], 64))), 128))
    ]));
  }
});
var Ke = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [a, n] of e)
    t[a] = n;
  return t;
};
var ha = Ke(Ao, [["__scopeId", "data-v-917a492c"]]);
var Lo = { class: "time-input-container flex items-center justify-center" };
var Ho = ["placeholder", "aria-invalid", "aria-errormessage"];
var Bo = ["placeholder", "aria-invalid", "aria-errormessage"];
var qo = ["placeholder", "aria-invalid", "aria-errormessage"];
var No = defineComponent({
  __name: "TimeInput",
  props: {
    modelValue: { default: null },
    hourPlaceholder: { default: "HH" },
    minutePlaceholder: { default: "MM" },
    secondPlaceholder: { default: "SS" },
    enableSeconds: { type: Boolean, default: true },
    use24Hour: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    locale: { default: "zh-TW" },
    useLocalizedPeriod: { type: Boolean, default: false },
    minuteStep: { default: 1 }
  },
  emits: ["update:modelValue", "validation", "complete", "navigate-to-date"],
  setup(r, { expose: e, emit: t }) {
    const a = {
      mounted: st.mounted,
      updated: st.updated,
      beforeUnmount: st.beforeUnmount
    }, n = r, o = t, l = ref(""), s = ref(""), u = ref(""), i = ref("AM"), m = ref({}), y = ref({}), v = ref(null), w = ref(false), x = ref(), f = ref(), $ = ref(), c = computed(() => Object.keys(m.value).length > 0), S = computed(() => {
      const O = {};
      return Object.entries(m.value).forEach(([E, M]) => {
        O[E] = M.key;
      }), O;
    }), k = () => {
      l.value = "", s.value = "", u.value = "", i.value = "AM";
    }, g = computed(() => {
      var O, E;
      if (!n.useLocalizedPeriod) return i.value;
      try {
        const M = /* @__PURE__ */ new Date();
        M.setHours(9, 0, 0);
        const L = /* @__PURE__ */ new Date();
        L.setHours(15, 0, 0);
        const H = new Intl.DateTimeFormat(n.locale, {
          hour: "numeric",
          hour12: true
        }), te = H.formatToParts(M), ce = H.formatToParts(L), le = ((O = te.find((T) => T.type === "dayPeriod")) == null ? void 0 : O.value) || "AM", R = ((E = ce.find((T) => T.type === "dayPeriod")) == null ? void 0 : E.value) || "PM";
        return i.value === "AM" ? le : R;
      } catch (M) {
        return console.error("Error getting localized period:", M), i.value;
      }
    }), b = computed(() => g.value), D = computed(() => {
      if (l.value === "" || s.value === "" || n.enableSeconds && u.value === "")
        return null;
      let O = parseInt(l.value, 10);
      n.use24Hour || (i.value === "PM" && O < 12 ? O += 12 : i.value === "AM" && O === 12 && (O = 0));
      const E = O.toString().padStart(2, "0"), M = s.value.padStart(2, "0");
      if (n.enableSeconds) {
        const L = u.value.padStart(2, "0");
        return `${E}:${M}:${L}`;
      } else
        return `${E}:${M}`;
    });
    watch(() => n.modelValue, (O) => {
      if (w.value || (w.value = true), O) {
        const E = O.split(":");
        let M = parseInt(E[0] || "0", 10);
        const L = (E[1] || "").replace(/\D/g, ""), H = (E[2] || "").replace(/\D/g, "");
        n.use24Hour || (M >= 12 ? (i.value = "PM", M = M === 12 ? 12 : M - 12) : (i.value = "AM", M = M === 0 ? 12 : M)), l.value = M.toString().padStart(2, "0"), s.value = L, n.enableSeconds && (u.value = H);
      } else
        k();
    }, { immediate: true });
    const d = (O, E) => {
      if (!E) return { valid: true };
      const M = parseInt(E);
      switch (O) {
        case "hour":
          const L = n.use24Hour ? 23 : 12, H = n.use24Hour ? 0 : 1;
          if (!lt(E) || M < H || M > L)
            return { valid: false, error: { key: "time.hourOutOfRange", params: { min: H, max: L } } };
          break;
        case "minute":
          if (!lt(E) || M < 0 || M > 59)
            return { valid: false, error: { key: "time.minuteOutOfRange", params: { min: 0, max: 59 } } };
          if (n.minuteStep > 1 && M % n.minuteStep !== 0)
            return { valid: false, error: { key: "time.minuteStepInvalid", params: { step: n.minuteStep } } };
          break;
        case "second":
          if (!lt(E) || M < 0 || M > 59)
            return { valid: false, error: { key: "time.secondOutOfRange", params: { min: 0, max: 59 } } };
          break;
      }
      return m.value[O] && (delete m.value[O], delete y.value[O]), { valid: true };
    }, p = () => {
      i.value = i.value === "AM" ? "PM" : "AM", h();
    }, h = () => {
      if (!w.value) return;
      m.value = {}, y.value = {};
      const O = d("hour", l.value), E = d("minute", s.value), M = n.enableSeconds ? d("second", u.value) : { valid: true };
      !O.valid && O.error && (m.value.hour = O.error, O.error.params && (y.value.hour = O.error.params)), !E.valid && E.error && (m.value.minute = E.error, E.error.params && (y.value.minute = E.error.params)), !M.valid && M.error && (m.value.second = M.error, M.error.params && (y.value.second = M.error.params)), n.required && (l.value || (m.value.hour = { key: "time.hourRequired" }), s.value || (m.value.minute = { key: "time.minuteRequired" }), n.enableSeconds && !u.value && (m.value.second = { key: "time.secondRequired" })), o("validation", !c.value, S.value, y.value), D.value ? (o("update:modelValue", D.value), o("complete", D.value)) : w.value && o("update:modelValue", null);
    }, A = (O) => {
      const M = O.target.value.replace(/\D/g, "");
      if (M.length <= 2) {
        if (l.value = M, !d("hour", M).valid) return;
        (M.length === 2 || n.use24Hour && parseInt(M) > 2 || !n.use24Hour && parseInt(M) > 1) && nextTick(() => {
          var H;
          (H = f.value) == null || H.focus();
        });
      }
    }, U = (O) => {
      const M = O.target.value.replace(/\D/g, "");
      if (M.length <= 2) {
        if (M.length === 1 && parseInt(M) > 5 ? (s.value = M.padStart(2, "0"), nextTick(() => {
          n.enableSeconds && $.value ? $.value.focus() : h();
        })) : s.value = M, !d("minute", M).valid) return;
        M.length === 2 && nextTick(() => {
          n.enableSeconds && $.value ? $.value.focus() : h();
        });
      }
    }, K = (O) => {
      const M = O.target.value.replace(/\D/g, "");
      if (M.length <= 2) {
        if (M.length === 1 && parseInt(M) > 5 ? (u.value = M.padStart(2, "0"), h()) : u.value = M, !d("second", M).valid) return;
        M.length === 2 && h();
      }
    }, W = (O, E) => {
      var L, H, te, ce, le, R, T, N, ee, J, F, _;
      const M = O.target;
      if (O.key === "Backspace" && M.value === "")
        switch (E) {
          case "hour":
            O.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            O.preventDefault(), (L = x.value) == null || L.focus(), (H = x.value) == null || H.setSelectionRange(-1, -1);
            break;
          case "second":
            O.preventDefault(), (te = f.value) == null || te.focus(), (ce = f.value) == null || ce.setSelectionRange(-1, -1);
            break;
        }
      if (O.key === "ArrowLeft" && M.selectionStart === 0)
        switch (E) {
          case "hour":
            O.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            O.preventDefault(), (le = x.value) == null || le.focus(), (R = x.value) == null || R.setSelectionRange(-1, -1);
            break;
          case "second":
            O.preventDefault(), (T = f.value) == null || T.focus(), (N = f.value) == null || N.setSelectionRange(-1, -1);
            break;
        }
      if (O.key === "ArrowRight" && M.selectionStart === M.value.length)
        switch (E) {
          case "hour":
            O.preventDefault(), (ee = f.value) == null || ee.focus(), (J = f.value) == null || J.setSelectionRange(0, 0);
            break;
          case "minute":
            n.enableSeconds && (O.preventDefault(), (F = $.value) == null || F.focus(), (_ = $.value) == null || _.setSelectionRange(0, 0));
            break;
        }
      O.key === "Enter" && h();
    }, X = (O) => {
      v.value = O;
    }, Q = (O) => {
      v.value = null, h();
    };
    return e({
      validate: h,
      reset: () => {
        k(), m.value = {}, y.value = {}, o("update:modelValue", null);
      },
      getErrors: () => S.value,
      hasErrors: c,
      setTime: (O) => {
        if (O) {
          const [E, M, L] = O.split(":");
          let H = parseInt(E);
          n.use24Hour || (H >= 12 ? (i.value = "PM", H = H === 12 ? 12 : H - 12) : (i.value = "AM", H = H === 0 ? 12 : H)), l.value = H.toString().padStart(2, "0"), s.value = M, n.enableSeconds && L && (u.value = L), h();
        } else
          k(), o("update:modelValue", null);
      },
      focus: () => {
        var O;
        (O = x.value) == null || O.focus();
      },
      focusLast: () => {
        n.enableSeconds && $.value ? ($.value.focus(), $.value.setSelectionRange(0, 0)) : f.value ? (f.value.focus(), f.value.setSelectionRange(0, 0)) : x.value && (x.value.focus(), x.value.setSelectionRange(0, 0));
      }
    }), (O, E) => (openBlock(), createElementBlock("div", Lo, [
      withDirectives(createBaseVNode("input", {
        ref_key: "hourRef",
        ref: x,
        "onUpdate:modelValue": E[0] || (E[0] = (M) => l.value = M),
        type: "text",
        inputmode: "numeric",
        placeholder: O.hourPlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: A,
        onKeydown: E[1] || (E[1] = (M) => W(M, "hour")),
        onFocus: E[2] || (E[2] = (M) => X("hour")),
        onBlur: E[3] || (E[3] = (M) => Q()),
        "aria-label": "hour",
        "aria-invalid": !!m.value.hour,
        "aria-errormessage": m.value.hour ? "hour-error" : void 0
      }, null, 40, Ho), [
        [vModelText, l.value],
        [a, 20]
      ]),
      E[13] || (E[13] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
      withDirectives(createBaseVNode("input", {
        ref_key: "minuteRef",
        ref: f,
        "onUpdate:modelValue": E[4] || (E[4] = (M) => s.value = M),
        type: "text",
        inputmode: "numeric",
        placeholder: O.minutePlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: U,
        onKeydown: E[5] || (E[5] = (M) => W(M, "minute")),
        onFocus: E[6] || (E[6] = (M) => X("minute")),
        onBlur: E[7] || (E[7] = (M) => Q()),
        "aria-label": "minute",
        "aria-invalid": !!m.value.minute,
        "aria-errormessage": m.value.minute ? "minute-error" : void 0
      }, null, 40, Bo), [
        [vModelText, s.value],
        [a, 20]
      ]),
      O.enableSeconds ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        E[12] || (E[12] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
        withDirectives(createBaseVNode("input", {
          ref_key: "secondRef",
          ref: $,
          "onUpdate:modelValue": E[8] || (E[8] = (M) => u.value = M),
          type: "text",
          inputmode: "numeric",
          placeholder: O.secondPlaceholder,
          maxlength: 2,
          class: "time-input text-sm text-center",
          onInput: K,
          onKeydown: E[9] || (E[9] = (M) => W(M, "second")),
          onFocus: E[10] || (E[10] = (M) => X("second")),
          onBlur: E[11] || (E[11] = (M) => Q()),
          "aria-label": "second",
          "aria-invalid": !!m.value.second,
          "aria-errormessage": m.value.second ? "second-error" : void 0
        }, null, 40, qo), [
          [vModelText, u.value],
          [a, 20]
        ])
      ], 64)) : createCommentVNode("", true),
      O.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
        key: 1,
        type: "button",
        class: normalizeClass(["time-period pl-2 text-sm cursor-pointer", l.value ? "text-vdt-content" : "text-gray-400"]),
        onClick: withModifiers(p, ["stop"])
      }, toDisplayString(b.value), 3))
    ]));
  }
});
var va = Ke(No, [["__scopeId", "data-v-fb3720c7"]]);
var Uo = {
  error: {
    calendar: {
      unsupported: "不支援的日曆"
    },
    date: {
      required: "請選擇日期",
      invalid: "無效的日期",
      outOfRange: "日期超出允許範圍",
      beforeMin: "日期不能早於 {minDate}",
      afterMax: "日期不能晚於 {maxDate}",
      unsupportedFormat: "不支援的日期格式，支援格式: {formats}",
      parseError: "日期解析失敗，請檢查日期格式"
    },
    time: {
      required: "請選擇時間",
      invalid: "無效的時間",
      hourOutOfRange: "小時必須是 {min}-{max} 之間的數字",
      minuteOutOfRange: "分鐘必須是 0-59 之間的數字",
      secondOutOfRange: "秒鐘必須是 0-59 之間的數字",
      hourRequired: "請輸入小時",
      minuteRequired: "請輸入分鐘",
      secondRequired: "請輸入秒鐘",
      minuteStepInvalid: "分鐘必須是 {step} 的倍數"
    },
    year: {
      required: "請輸入年份",
      invalid: "年份格式不正確",
      outOfRange: "年份必須是 {min}-{max} 之間的數字",
      notLeapYear: "{year}年2月沒有29日，不是閏年"
    },
    month: {
      required: "請輸入月份",
      invalid: "月份格式不正確",
      outOfRange: "月份必須是 1-12 之間的數字"
    },
    day: {
      required: "請輸入日期",
      invalid: "日期格式不正確",
      outOfRange: "日期必須是 1-31 之間的數字",
      notExistInMonth: "{month}月最多只有{maxDays}天"
    },
    range: {
      startRequired: "請選擇開始日期",
      endRequired: "請選擇結束日期",
      startAfterEnd: "開始日期不能晚於結束日期",
      exceedsMaxRange: "選擇範圍不能超過 {maxRange} 天",
      belowMinRange: "選擇範圍不能少於 {minRange} 天"
    },
    format: {
      dateFormat: '日期格式不正確: "{original}" 已自動修復為 "{fixed}"',
      timeFormat: '時間格式不正確: "{original}" 已自動修復為 "{fixed}"'
    }
  },
  placeholder: {
    date: {
      year: "年",
      month: "月",
      day: "日"
    },
    time: {
      hour: "時",
      minute: "分",
      second: "秒"
    },
    general: {
      selectDate: "請選擇日期",
      selectTime: "請選擇時間",
      clear: "清除",
      time: "時間"
    },
    range: {
      start: "開始日期",
      end: "結束日期"
    }
  },
  yearSelector: {
    jumpToYear: "跳至年份",
    inputYearPlaceholder: "輸入西元年...",
    yearRangeInfo: "{calendar}年範圍: {min} - {max}",
    noYearsToDisplay: "沒有可顯示的年份",
    returnToValidRange: "返回有效範圍"
  }
};
var zo = {
  error: {
    calendar: {
      unsupported: "不支持的日历"
    },
    date: {
      required: "请选择日期",
      invalid: "无效的日期",
      outOfRange: "日期超出允许范围",
      beforeMin: "日期不能早于 {minDate}",
      afterMax: "日期不能晚于 {maxDate}",
      unsupportedFormat: "不支持的日期格式，支持格式: {formats}",
      parseError: "日期解析失败，请检查日期格式"
    },
    time: {
      required: "请选择时间",
      invalid: "无效的时间",
      hourOutOfRange: "小时必须是 {min}-{max} 之间的数字",
      minuteOutOfRange: "分钟必须是 0-59 之间的数字",
      secondOutOfRange: "秒钟必须是 0-59 之间的数字",
      hourRequired: "请输入小时",
      minuteRequired: "请输入分钟",
      secondRequired: "请输入秒钟",
      minuteStepInvalid: "分钟必须是 {step} 的倍数"
    },
    year: {
      required: "请输入年份",
      invalid: "年份格式不正确",
      outOfRange: "年份必须是 {min}-{max} 之间的数字",
      notLeapYear: "{year}年2月没有29日，不是闰年"
    },
    month: {
      required: "请输入月份",
      invalid: "月份格式不正确",
      outOfRange: "月份必须是 1-12 之间的数字"
    },
    day: {
      required: "请输入日期",
      invalid: "日期格式不正确",
      outOfRange: "日期必须是 1-31 之间的数字",
      notExistInMonth: "{month}月最多只有{maxDays}天"
    },
    range: {
      startRequired: "请选择开始日期",
      endRequired: "请选择结束日期",
      startAfterEnd: "开始日期不能晚于结束日期",
      exceedsMaxRange: "选择范围不能超过 {maxRange} 天",
      belowMinRange: "选择范围不能少于 {minRange} 天"
    },
    format: {
      dateFormat: '日期格式不正确: "{original}" 已自动修复为 "{fixed}"',
      timeFormat: '时间格式不正确: "{original}" 已自动修复为 "{fixed}"'
    }
  },
  placeholder: {
    date: {
      year: "年",
      month: "月",
      day: "日"
    },
    time: {
      hour: "时",
      minute: "分",
      second: "秒"
    },
    general: {
      selectDate: "请选择日期",
      selectTime: "请选择时间",
      clear: "清除",
      time: "时间"
    },
    range: {
      start: "开始日期",
      end: "结束日期"
    }
  },
  yearSelector: {
    jumpToYear: "跳至年份",
    inputYearPlaceholder: "输入公历年...",
    yearRangeInfo: "{calendar}年范围: {min} - {max}",
    noYearsToDisplay: "没有可显示的年份",
    returnToValidRange: "返回有效范围"
  }
};
var Wo = {
  error: {
    calendar: {
      unsupported: "Unsupported calendar"
    },
    date: {
      required: "Please select a date",
      invalid: "Invalid date",
      outOfRange: "Date is out of allowed range",
      beforeMin: "Date cannot be before {minDate}",
      afterMax: "Date cannot be after {maxDate}",
      unsupportedFormat: "Unsupported date format, supported formats: {formats}",
      parseError: "Failed to parse date, please check the date format"
    },
    time: {
      required: "Please select a time",
      invalid: "Invalid time",
      hourOutOfRange: "Hour must be between {min}-{max}",
      minuteOutOfRange: "Minute must be between 0-59",
      secondOutOfRange: "Second must be between 0-59",
      hourRequired: "Please enter hour",
      minuteRequired: "Please enter minute",
      secondRequired: "Please enter second",
      minuteStepInvalid: "Minute must be a multiple of {step}"
    },
    year: {
      required: "Please enter year",
      invalid: "Invalid year format",
      outOfRange: "Year must be between {min}-{max}",
      notLeapYear: "February 29th does not exist in {year}, not a leap year"
    },
    month: {
      required: "Please enter month",
      invalid: "Invalid month format",
      outOfRange: "Month must be between 1-12"
    },
    day: {
      required: "Please enter day",
      invalid: "Invalid day format",
      outOfRange: "Day must be between 1-31",
      notExistInMonth: "Month {month} has maximum {maxDays} days"
    },
    range: {
      startRequired: "Please select start date",
      endRequired: "Please select end date",
      startAfterEnd: "Start date cannot be after end date",
      exceedsMaxRange: "Selection range cannot exceed {maxRange} days",
      belowMinRange: "Selection range cannot be less than {minRange} days"
    },
    format: {
      dateFormat: 'Invalid date format: "{original}" auto-fixed to "{fixed}"',
      timeFormat: 'Invalid time format: "{original}" auto-fixed to "{fixed}"'
    }
  },
  placeholder: {
    date: {
      year: "YYYY",
      month: "MM",
      day: "DD"
    },
    time: {
      hour: "HH",
      minute: "mm",
      second: "ss"
    },
    general: {
      selectDate: "Please select a date",
      selectTime: "Please select a time",
      clear: "Clear",
      time: "Time"
    },
    range: {
      start: "Start date",
      end: "End date"
    }
  },
  yearSelector: {
    jumpToYear: "Jump to Year",
    inputYearPlaceholder: "Enter Gregorian year...",
    yearRangeInfo: "{calendar} Year Range: {min} - {max}",
    noYearsToDisplay: "No years to display",
    returnToValidRange: "Return to valid range"
  }
};
var jo = {
  error: {
    calendar: {
      unsupported: "サポートされていないカレンダーIDです"
    },
    date: {
      required: "日付を選択してください",
      invalid: "無効な日付",
      outOfRange: "日付が許可範囲外です",
      beforeMin: "日付は {minDate} より前にはできません",
      afterMax: "日付は {maxDate} より後にはできません",
      unsupportedFormat: "サポートされていない日付形式です。サポート形式: {formats}",
      parseError: "日付の解析に失敗しました。日付形式を確認してください"
    },
    time: {
      required: "時刻を選択してください",
      invalid: "無効な時刻",
      hourOutOfRange: "時間は {min}-{max} の間で入力してください",
      minuteOutOfRange: "分は 0-59 の間で入力してください",
      secondOutOfRange: "秒は 0-59 の間で入力してください",
      hourRequired: "時間を入力してください",
      minuteRequired: "分を入力してください",
      secondRequired: "秒を入力してください",
      minuteStepInvalid: "分は {step} の倍数でなければなりません"
    },
    year: {
      required: "年を入力してください",
      invalid: "年の形式が正しくありません",
      outOfRange: "年は {min}-{max} の間で入力してください",
      notLeapYear: "{year}年2月29日は存在しません（うるう年ではありません）"
    },
    month: {
      required: "月を入力してください",
      invalid: "月の形式が正しくありません",
      outOfRange: "月は 1-12 の間で入力してください"
    },
    day: {
      required: "日を入力してください",
      invalid: "日の形式が正しくありません",
      outOfRange: "日は 1-31 の間で入力してください",
      notExistInMonth: "{month}月は最大 {maxDays} 日までです"
    },
    range: {
      startRequired: "開始日を選択してください",
      endRequired: "終了日を選択してください",
      startAfterEnd: "開始日は終了日より後にはできません",
      exceedsMaxRange: "選択範囲は {maxRange} 日を超えることはできません",
      belowMinRange: "選択範囲は {minRange} 日未満にはできません"
    },
    format: {
      dateFormat: '日付形式が正しくありません: "{original}" を "{fixed}" に自動修正しました',
      timeFormat: '時刻形式が正しくありません: "{original}" を "{fixed}" に自動修正しました'
    }
  },
  placeholder: {
    date: {
      year: "年",
      month: "月",
      day: "日"
    },
    time: {
      hour: "時",
      minute: "分",
      second: "秒"
    },
    general: {
      selectDate: "日付を選択してください",
      selectTime: "時刻を選択してください",
      clear: "クリア",
      time: "時刻"
    },
    range: {
      start: "開始日を",
      end: "終了日を"
    }
  },
  yearSelector: {
    jumpToYear: "年にジャンプ",
    inputYearPlaceholder: "西暦年を入力...",
    yearRangeInfo: "{calendar}年の範囲: {min} - {max}",
    noYearsToDisplay: "表示する年はありません",
    returnToValidRange: "有効な範囲に戻る"
  }
};
var Jo = {
  error: {
    calendar: {
      unsupported: "지원하지 않는 달력 ID입니다"
    },
    date: {
      required: "날짜를 선택해주세요",
      invalid: "유효하지 않은 날짜",
      outOfRange: "날짜가 허용 범위를 벗어났습니다",
      beforeMin: "날짜는 {minDate}보다 이전일 수 없습니다",
      afterMax: "날짜는 {maxDate}보다 이후일 수 없습니다",
      unsupportedFormat: "지원하지 않는 날짜 형식입니다. 지원 형식: {formats}",
      parseError: "날짜를 파싱하는 데 실패했습니다. 날짜 형식을 확인해주세요"
    },
    time: {
      required: "시간을 선택해주세요",
      invalid: "유효하지 않은 시간",
      hourOutOfRange: "시간은 {min}-{max} 사이의 숫자여야 합니다",
      minuteOutOfRange: "분은 0-59 사이의 숫자여야 합니다",
      secondOutOfRange: "초는 0-59 사이의 숫자여야 합니다",
      hourRequired: "시간을 입력해주세요",
      minuteRequired: "분을 입력해주세요",
      secondRequired: "초을 입력해주세요",
      minuteStepInvalid: "분은 {step}의 배수여야 합니다"
    },
    year: {
      required: "연도를 입력해주세요",
      invalid: "연도 형식이 올바르지 않습니다",
      outOfRange: "연도는 {min}-{max} 사이의 숫자여야 합니다",
      notLeapYear: "{year}년 2월 29일은 존재하지 않습니다 (윤년이 아님)"
    },
    month: {
      required: "월을 입력해주세요",
      invalid: "월 형식이 올바르지 않습니다",
      outOfRange: "월은 1-12 사이의 숫자여야 합니다"
    },
    day: {
      required: "일을 입력해주세요",
      invalid: "일 형식이 올바르지 않습니다",
      outOfRange: "일은 1-31 사이의 숫자여야 합니다",
      notExistInMonth: "{month}월은 최대 {maxDays}일까지입니다"
    },
    range: {
      startRequired: "시작 날짜를 선택해주세요",
      endRequired: "종료 날짜를 선택해주세요",
      startAfterEnd: "시작 날짜는 종료 날짜보다 늦을 수 없습니다",
      exceedsMaxRange: "선택 범위는 {maxRange}일을 초과할 수 없습니다",
      belowMinRange: "선택 범위는 {minRange}일 미만일 수 없습니다"
    },
    format: {
      dateFormat: '날짜 형식이 올바르지 않습니다: "{original}"을(를) "{fixed}"로 자동 수정했습니다',
      timeFormat: '시간 형식이 올바르지 않습니다: "{original}"을(를) "{fixed}"로 자동 수정했습니다'
    }
  },
  placeholder: {
    date: {
      year: "년",
      month: "월",
      day: "일"
    },
    time: {
      hour: "시",
      minute: "분",
      second: "초"
    },
    general: {
      selectDate: "날짜를 선택해주세요",
      selectTime: "시간을 선택해주세요",
      clear: "지우기",
      time: "시간"
    },
    range: {
      start: "시작 날짜",
      end: "종료 날짜"
    }
  },
  yearSelector: {
    jumpToYear: "연도로 이동",
    inputYearPlaceholder: "서기 연도를 입력...",
    yearRangeInfo: "{calendar}년 범위: {min} - {max}",
    noYearsToDisplay: "표시한 연도는 없습니다",
    returnToValidRange: "유효한 범위로 이동"
  }
};
var qe = {
  "zh-TW": Uo,
  "zh-CN": zo,
  "en-US": Wo,
  "ja-JP": jo,
  "ko-KR": Jo
};
function Pr(r, e) {
  return r.replace(/\{(\w+)\}/g, (t, a) => {
    var n;
    return ((n = e[a]) == null ? void 0 : n.toString()) || t;
  });
}
var _o = class {
  constructor() {
    Se(this, "currentLocale", "zh-TW");
  }
  setLocale(e) {
    if (!qe[e]) {
      console.warn(`Locale '${e}' not found, falling back to 'zh-TW'`), this.currentLocale = "zh-TW";
      return;
    }
    this.currentLocale = e;
  }
  // 註冊自定義語言包
  registerLocale(e, t) {
    qe[e] = t;
  }
  // 檢查語言包是否存在
  hasLocale(e) {
    return !!qe[e];
  }
  // 獲取所有可用語言
  getAvailableLocales() {
    return Object.keys(qe);
  }
  getCurrentLocale() {
    return this.currentLocale;
  }
  getMessage(e, t) {
    const a = e.split(".");
    let n = qe[this.currentLocale];
    for (const o of a)
      n = n == null ? void 0 : n[o];
    return typeof n != "string" ? (console.warn(`Missing translation for path: ${e} in locale: ${this.currentLocale}`), e) : t ? Pr(n, t) : n;
  }
  getErrorMessage(e, t) {
    return this.getMessage(`error.${e}`, t);
  }
  getPlaceholderMessage(e, t) {
    return this.getMessage(`placeholder.${e}`, t);
  }
  // 支援自定義語言包
  addCustomMessages(e, t) {
    if (!qe[e]) {
      console.warn(`Locale '${e}' not found. Please register it first using registerLocale().`);
      return;
    }
    qe[e] = {
      ...qe[e],
      ...this.deepMerge(qe[e], t)
    };
  }
  // addCustomMessages(locale: LocaleKey, messages: Partial<ErrorMessages>): void {
  //     localeMessages[locale] = {
  //         ...localeMessages[locale],
  //         ...this.deepMerge(localeMessages[locale], messages)
  //     };
  // }
  /**
   * 獲取參數化錯誤訊息
   */
  getParameterizedErrorMessage(e, t = {}) {
    const a = this.getErrorMessage(e);
    return this.interpolateParameters(a, t);
  }
  /**
   * 參數插值
   */
  interpolateParameters(e, t = {}) {
    return !t || Object.keys(t).length === 0 ? e : e.replace(/\{(\w+)\}/g, (a, n) => {
      const o = t[n];
      return o == null ? (console.warn(`Missing variable '${n}' for template: "${e}"`), a) : String(o);
    });
  }
  deepMerge(e, t) {
    const a = { ...e };
    for (const n in t)
      t[n] && typeof t[n] == "object" && !Array.isArray(t[n]) ? a[n] = this.deepMerge(a[n] || {}, t[n]) : a[n] = t[n];
    return a;
  }
};
function wt(r = "en-US", e) {
  const t = new _o(), a = ref(r);
  e && r && t.registerLocale(r, e), t.setLocale(r);
  const n = (y, v) => {
    a.value = y, v && t.registerLocale(y, v), t.setLocale(y);
  }, o = (y, v) => t.getMessage(y, v), l = (y, v) => t.getErrorMessage(y, v), s = (y, v) => t.getPlaceholderMessage(y, v), u = (y, v) => Pr(y, v), i = (y, v) => {
    t.registerLocale(y, v);
  }, m = (y) => t.hasLocale(y);
  return {
    currentLocale: computed(() => a.value),
    setLocale: n,
    getMessage: o,
    getErrorMessage: l,
    getPlaceholderMessage: s,
    formatText: u,
    registerCustomLocale: i,
    hasLocale: m
  };
}
var Ko = {
  key: 0,
  class: "date-error-message mt-1 text-sm text-red-500"
};
var Qo = { key: 0 };
var Zo = { key: 1 };
var Go = { key: 2 };
var Ar = defineComponent({
  __name: "DateErrorMessage",
  props: {
    errors: { default: void 0 },
    errorParams: { default: () => ({}) },
    locale: { default: "zh-TW" },
    useI18n: { type: Boolean, default: true },
    customMessages: { default: () => ({}) },
    messageKeyMap: { default: () => ({}) },
    debug: { type: Boolean, default: false }
  },
  setup(r, { expose: e }) {
    const t = r, { currentLocale: a, setLocale: n, getErrorMessage: o } = wt(t.locale);
    watch(() => t.locale, (c) => {
      c && t.useI18n && n(c);
    }, { immediate: true });
    const l = ref({}), s = ref({}), u = computed(() => ({
      ...t.customMessages,
      ...l.value
    })), i = computed(() => t.errors ? Array.isArray(t.errors) ? t.errors.length > 0 : typeof t.errors == "string" ? t.errors.trim().length > 0 : typeof t.errors == "object" ? Object.values(t.errors).some((c) => c && c.trim().length > 0) : false : false), m = computed(() => {
      if (!t.errors) return null;
      if (typeof t.errors == "string")
        return f(t.errors);
      if (Array.isArray(t.errors))
        return t.errors.map((c, S) => ({
          field: `item-${S}`,
          message: f(c),
          originalKey: c,
          params: {}
        }));
      if (typeof t.errors == "object") {
        const c = {};
        return Object.entries(t.errors).forEach(([S, k]) => {
          var g;
          if (k) {
            s.value[S] = k;
            const b = ((g = t.errorParams) == null ? void 0 : g[S]) || {};
            c[S] = f(k, S, b), t.debug && console.log(`Processing error for field "${S}":`, {
              original: k,
              params: b,
              translated: c[S],
              field: S,
              slotName: w(S)
            });
          }
        }), c;
      }
      return t.errors;
    }), y = computed(() => t.errorParams || {});
    function v(c) {
      return s.value[c];
    }
    function w(c) {
      return `error-${c.replace(/^(date|time|range)\./, "")}`;
    }
    function x(c) {
      return c.startsWith("date.") ? "date" : c.startsWith("time.") ? "time" : c.startsWith("range.") ? "range" : "unknown";
    }
    function f(c, S, k = {}) {
      if (t.debug && console.log(`翻譯訊息: "${c}", field: "${S}", params:`, k), u.value[c])
        return u.value[c];
      if (!t.useI18n)
        return c;
      if (/^[a-zA-Z]+\.[a-zA-Z]+$/.test(c))
        try {
          const D = o(c, k);
          if (t.debug && console.log(`Locale key 翻譯: "${c}" -> "${D}" with params:`, k), D && D !== c)
            return D;
        } catch (D) {
          t.debug && console.warn(`Locale key 翻譯失敗: ${c}`, D);
        }
      const b = t.messageKeyMap[c];
      if (b)
        try {
          const D = o(b, k);
          if (t.debug && console.log(`MessageKeyMap 翻譯: "${c}" -> "${D}" with params:`, k), D && D !== b)
            return D;
        } catch (D) {
          t.debug && console.warn(`MessageKeyMap 翻譯失敗: ${b}`, D);
        }
      return $(c, S, k);
    }
    function $(c, S, k = {}) {
      t.debug && console.log(`smartTranslateError: "${c}", field: "${S}", params:`, k);
      const g = {
        請選擇日期: "date.required",
        請選擇時間: "time.required",
        請選擇開始日期: "range.startRequired",
        請選擇結束日期: "range.endRequired",
        "Please select a date": "date.required",
        "Please select a time": "time.required",
        "Please select start date": "range.startRequired",
        "Please select end date": "range.endRequired"
      };
      if (g[c])
        try {
          const p = o(g[c], k);
          if (t.debug && console.log(`直接匹配翻譯: "${c}" -> "${p}" with params:`, k), p && p !== g[c])
            return p;
        } catch (p) {
          t.debug && console.warn(`直接匹配翻譯失敗: ${g[c]}`, p);
        }
      function b(p, h) {
        if (/請輸入|please enter|required/i.test(p)) {
          if (h != null && h.includes("year") || p.includes("年份")) return "year.required";
          if (h != null && h.includes("month") || p.includes("月份")) return "month.required";
          if (h != null && h.includes("day") || p.includes("日期")) return "day.required";
          if (h != null && h.includes("hour") || p.includes("小時")) return "time.hourRequired";
          if (h != null && h.includes("minute") || p.includes("分鐘")) return "time.minuteRequired";
          if (h != null && h.includes("second") || p.includes("秒鐘")) return "time.secondRequired";
          if (h != null && h.includes("startDate") || p.includes("開始日期")) return "range.startRequired";
          if (h != null && h.includes("endDate") || p.includes("結束日期")) return "range.endRequired";
          if (h != null && h.includes("time") || p.includes("時間")) return "time.required";
          if (h != null && h.includes("date") || p.includes("日期")) return "date.required";
        }
        return null;
      }
      const D = b(c, S);
      if (D)
        try {
          const p = o(D, k);
          if (t.debug && console.log(`智能匹配翻譯: "${c}" -> "${p}" with params:`, k), p && p !== D)
            return p;
        } catch (p) {
          t.debug && console.warn(`智能匹配翻譯失敗: ${D}`, p);
        }
      const d = [
        {
          regex: /(年份|year).*(\d+)-(\d+).*數字/i,
          key: "year.outOfRange"
        },
        {
          regex: /(月份|month).*1-12.*數字/i,
          key: "month.outOfRange"
        },
        {
          regex: /(日期|day).*1-31.*數字/i,
          key: "day.outOfRange"
        },
        {
          regex: /(小時|hour).*(\d+)-(\d+)/i,
          key: "time.hourOutOfRange"
        },
        {
          regex: /(分鐘|minute).*0-59/i,
          key: "time.minuteOutOfRange"
        },
        {
          regex: /(秒鐘|second).*0-59/i,
          key: "time.secondOutOfRange"
        },
        {
          regex: /無效|invalid/i,
          key: null,
          handler: (p) => p != null && p.includes("year") ? "year.invalid" : p != null && p.includes("month") ? "month.invalid" : p != null && p.includes("day") ? "day.invalid" : p != null && p.includes("time") || p != null && p.includes("hour") || p != null && p.includes("minute") || p != null && p.includes("second") ? "time.invalid" : "date.invalid"
        }
      ];
      for (const p of d)
        if (p.regex.test(c)) {
          const h = p.handler ? p.handler(S) : p.key;
          if (h)
            try {
              const A = o(h, k);
              if (t.debug && console.log(`模式匹配翻譯: "${c}" -> "${A}" (key: ${h}) with params:`, k), A && A !== h)
                return A;
            } catch (A) {
              t.debug && console.warn(`模式匹配翻譯失敗: ${h}`, A);
            }
        }
      return t.debug && console.log(`無法翻譯，返回原始訊息: "${c}"`), c;
    }
    return e({
      hasErrors: i,
      processedErrors: m,
      processedErrorParams: y,
      translateMessage: f,
      getOriginalKey: v,
      getSlotName: w,
      getFieldType: x,
      setLocale: (c) => {
        n(c);
      },
      addCustomTranslation: (c, S) => {
        l.value[c] = S;
      },
      currentLocale: a
    }), (c, S) => i.value ? (openBlock(), createElementBlock("div", Ko, [
      Array.isArray(m.value) ? (openBlock(), createElementBlock("div", Qo, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(m.value, (k, g) => (openBlock(), createElementBlock("div", { key: g }, [
          renderSlot(c.$slots, `error-${k.field}`, {
            error: k,
            message: k.message,
            field: k.field,
            errorParams: k.params
          }, () => [
            createBaseVNode("span", null, toDisplayString(k.message), 1)
          ])
        ]))), 128))
      ])) : typeof m.value == "string" ? (openBlock(), createElementBlock("div", Zo, [
        renderSlot(c.$slots, "error-single", {
          error: m.value,
          message: m.value
        }, () => [
          createBaseVNode("span", null, toDisplayString(m.value), 1)
        ])
      ])) : typeof m.value == "object" ? (openBlock(), createElementBlock("div", Go, [
        renderSlot(c.$slots, "error", {
          errors: m.value,
          errorParams: t.errorParams
        }, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(m.value, (k, g) => (openBlock(), createElementBlock("div", { key: g }, [
            renderSlot(c.$slots, w(g), {
              field: g,
              error: k,
              message: k,
              originalKey: v(g),
              fieldType: x(g),
              errorParams: t.errorParams[g] || {}
            }, () => [
              createBaseVNode("span", null, toDisplayString(k), 1)
            ])
          ]))), 128))
        ])
      ])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true);
  }
});
var Xo = {};
var el = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
function tl(r, e) {
  return openBlock(), createElementBlock("svg", el, e[0] || (e[0] = [
    createBaseVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    }, null, -1)
  ]));
}
var Lr = Ke(Xo, [["render", tl]]);
var al = {};
var rl = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
};
function nl(r, e) {
  return openBlock(), createElementBlock("svg", rl, e[0] || (e[0] = [
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
var Hr = Ke(al, [["render", nl]]);
var ol = {};
var ll = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
};
function sl(r, e) {
  return openBlock(), createElementBlock("svg", ll, e[0] || (e[0] = [
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
var Br = Ke(ol, [["render", sl]]);
var il = { class: "p-2 flex items-center justify-between border-b border-vdt-outline" };
var ul = ["disabled"];
var cl = { class: "text-sm font-medium" };
var dl = ["disabled"];
var fl = {
  key: 0,
  class: "grid grid-cols-4 gap-1 p-2"
};
var ml = ["onClick", "title"];
var hl = { class: "font-medium" };
var vl = { key: 0 };
var pl = {
  key: 0,
  class: "text-xs opacity-60 mt-0.5"
};
var gl = {
  key: 1,
  class: "p-4 text-center text-sm text-vdt-content-muted"
};
var yl = { class: "mb-2" };
var $l = { class: "p-2 border-t border-vdt-outline" };
var Dl = { class: "text-xs text-gray-400 mb-1" };
var bl = ["placeholder", "min", "max"];
var Ml = { class: "text-xs text-vdt-content-muted mt-1" };
var Sl = defineComponent({
  __name: "YearSelector",
  props: {
    selectedYear: {},
    showSelector: { type: Boolean },
    pageSize: { default: 12 },
    calendar: { default: "gregory" },
    locale: { default: "zh-TW" }
  },
  emits: ["year-selected", "update:showSelector"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, { getMessage: o, formatText: l } = wt(a.locale), s = ref(null), u = ref(null), i = computed(() => he.getCalendarRange(a.calendar)), m = computed(() => he.getCalendarDisplayName(a.calendar, a.locale)), y = computed(() => a.calendar === "gregory"), v = computed(() => a.calendar === "japanese"), w = computed(() => D.value[0]), x = computed(() => D.value[D.value.length - 1]), f = ref(0), $ = (M) => {
      const L = Math.floor(M / a.pageSize) * a.pageSize;
      return Math.max(L, i.value.min);
    }, c = () => {
      f.value = $(a.selectedYear);
    }, S = /* @__PURE__ */ new Map(), k = (M, L) => {
      const H = `${M}-${L}`;
      if (!S.has(H))
        try {
          S.set(H, new zt(L, { calendar: M, year: "numeric", era: "short" }));
        } catch {
          S.set(H, new zt(L, { year: "numeric" }));
        }
      return S.get(H);
    }, g = (M) => {
      var H, te;
      const L = {
        gregorianYear: M,
        displayEra: "",
        displayYear: M.toString(),
        showReference: false,
        displayWarning: false
      };
      if (y.value)
        return L;
      try {
        const ce = new ue(M, 6, 1), le = he.safeToCalendar(ce, he.createSafeCalendar(a.calendar)), T = k(a.calendar, a.locale).formatToParts(le.toDate("UTC"));
        L.displayYear = ((H = T.find((J) => J.type === "year")) == null ? void 0 : H.value) || M.toString(), L.displayEra = ((te = T.find((J) => J.type === "era")) == null ? void 0 : te.value) || "";
        const N = !!L.displayEra, ee = L.displayEra !== M.toString();
        (N || ee) && (L.showReference = true, L.referenceYear = M.toString());
      } catch {
        if (L.displayWarning = true, L.warningMessage = `無法轉換為${m.value}`, a.calendar === "roc") {
          const le = M - 1911;
          L.displayYear = le > 0 ? le.toString() : `民國前${Math.abs(le - 1)}年`;
        }
      }
      return L;
    }, b = (M) => M >= i.value.min && M <= i.value.max, D = computed(() => {
      const M = f.value, L = [];
      for (let H = 0; H < a.pageSize; H++) {
        const te = M + H;
        if (te > i.value.max) break;
        te < i.value.min || L.push(g(te));
      }
      return L;
    }), d = computed(() => {
      const M = D.value;
      if (M.length === 0) return "";
      const L = M[0], H = M[M.length - 1];
      if (y.value)
        return `${L.displayYear} - ${H.displayYear}`;
      if (L.gregorianYear === H.gregorianYear)
        return L.displayYear;
      const te = L.displayEra, ce = H.displayEra;
      return te && ce && te === ce ? `${te} ${L.displayYear} - ${H.displayYear}` : `${L.displayEra} ${L.displayYear} - ${H.displayEra} ${H.displayYear}`;
    }), p = computed(() => f.value > i.value.min), h = computed(() => f.value + a.pageSize <= i.value.max), A = () => {
      p.value && (f.value = Math.max(
        f.value - a.pageSize,
        i.value.min
      ));
    }, U = () => {
      h.value && (f.value = Math.min(
        f.value + a.pageSize,
        i.value.max
      ));
    }, K = (M) => {
      b(M) && (n("year-selected", M), n("update:showSelector", false));
    }, W = () => {
      u.value && (b(u.value) ? (f.value = $(u.value), n("year-selected", u.value), n("update:showSelector", false), u.value = null) : console.warn(`年份 ${u.value} 超出範圍 ${i.value.min}-${i.value.max}`));
    }, X = () => {
      const M = Math.max(i.value.min, Math.min((/* @__PURE__ */ new Date()).getFullYear(), i.value.max));
      n("year-selected", M);
    }, Q = (M) => o(`yearSelector.${M}`);
    watch([() => a.selectedYear, () => a.calendar], () => {
      b(a.selectedYear) && (f.value = $(a.selectedYear));
    }, { immediate: true });
    const E = (M) => {
      if (a.showSelector && s.value) {
        const L = M.target, H = !!L.closest("[data-year-selector-button]");
        !s.value.contains(L) && !H && n("update:showSelector", false);
      }
    };
    return onMounted(() => {
      c(), document.addEventListener("mousedown", E);
    }), onBeforeUnmount(() => {
      document.removeEventListener("mousedown", E);
    }), e({
      getLocalizedText: Q,
      formatText: l,
      goToSpecificYear: W,
      goToValidRange: X
    }), (M, L) => M.showSelector ? (openBlock(), createElementBlock("div", {
      key: 0,
      ref_key: "yearSelectorRef",
      ref: s,
      class: "absolute top-full mt-1 right-0 min-w-56 max-h-72 overflow-auto bg-vdt-surface-elevated text-vdt-content border border-vdt-outline rounded-md shadow-lg z-20"
    }, [
      createBaseVNode("div", il, [
        createBaseVNode("button", {
          type: "button",
          onClick: A,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !p.value }]),
          disabled: !p.value,
          "aria-label": "previous year"
        }, [
          createVNode(Hr, { class: "h-4 w-4" })
        ], 10, ul),
        createBaseVNode("span", cl, [
          renderSlot(M.$slots, "year-range-display", {
            firstYear: w.value,
            lastYear: x.value,
            displayText: d.value
          }, () => [
            createTextVNode(toDisplayString(d.value), 1)
          ], true)
        ]),
        createBaseVNode("button", {
          type: "button",
          onClick: U,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !h.value }]),
          disabled: !h.value,
          "aria-label": "next year"
        }, [
          createVNode(Br, { class: "h-4 w-4" })
        ], 10, dl)
      ]),
      D.value.length > 0 ? (openBlock(), createElementBlock("div", fl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(D.value, (H) => (openBlock(), createElementBlock("button", {
          type: "button",
          key: H.gregorianYear,
          onClick: (te) => K(H.gregorianYear),
          class: normalizeClass([
            "p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200",
            M.selectedYear === H.gregorianYear ? "bg-vdt-theme-500 text-white" : "hover:bg-vdt-interactive-hover text-vdt-content",
            H.displayWarning ? "ring-1 ring-amber-400" : ""
          ]),
          title: H.warningMessage
        }, [
          renderSlot(M.$slots, "year-display", {
            yearData: H,
            isSelected: M.selectedYear === H.gregorianYear
          }, () => [
            createBaseVNode("div", hl, [
              v.value ? (openBlock(), createElementBlock("div", vl, toDisplayString(H.displayEra), 1)) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(H.displayYear), 1)
            ]),
            H.showReference ? (openBlock(), createElementBlock("div", pl, toDisplayString(H.referenceYear), 1)) : createCommentVNode("", true)
          ], true)
        ], 10, ml))), 128))
      ])) : (openBlock(), createElementBlock("div", gl, [
        renderSlot(M.$slots, "no-years-display", {
          calendarRange: i.value,
          goToValidRange: X
        }, () => [
          createBaseVNode("div", yl, toDisplayString(Q("noYearsToDisplay")), 1),
          createBaseVNode("button", {
            type: "button",
            onClick: X,
            class: "text-xs bg-vdt-theme-100 hover:bg-vdt-theme-200 px-3 py-1 rounded text-vdt-theme-700"
          }, toDisplayString(Q("returnToValidRange")), 1)
        ], true)
      ])),
      createBaseVNode("div", $l, [
        renderSlot(M.$slots, "year-input", {
          yearInput: u.value,
          calendarRange: i.value,
          calendarDisplayName: m.value,
          goToSpecificYear: W,
          getLocalizedText: Q,
          formatText: unref(l)
        }, () => [
          createBaseVNode("div", Dl, toDisplayString(Q("jumpToYear")), 1),
          withDirectives(createBaseVNode("input", {
            type: "number",
            "onUpdate:modelValue": L[0] || (L[0] = (H) => u.value = H),
            onKeydown: withKeys(W, ["enter"]),
            placeholder: Q("inputYearPlaceholder"),
            min: i.value.min,
            max: i.value.max,
            class: "w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500"
          }, null, 40, bl), [
            [vModelText, u.value]
          ]),
          createBaseVNode("div", Ml, toDisplayString(unref(l)(Q("yearRangeInfo"), {
            calendar: m.value,
            min: i.value.min,
            max: i.value.max
          })), 1)
        ], true)
      ])
    ], 512)) : createCommentVNode("", true);
  }
});
var wl = Ke(Sl, [["__scopeId", "data-v-f14c8987"]]);
var kl = { class: "flex justify-between items-center mb-4 gap-2" };
var Tl = ["disabled"];
var xl = { class: "grow grid grid-cols-2 gap-2" };
var Yl = ["value"];
var Cl = { class: "relative" };
var Rl = ["disabled"];
var El = defineComponent({
  __name: "CalendarHeader",
  props: {
    month: {},
    year: {},
    locale: { default: "en-US" },
    minYear: { default: 1900 },
    maxYear: { default: 2100 },
    calendar: { default: "gregory" }
  },
  emits: ["update:month", "update:year"],
  setup(r, { emit: e }) {
    const t = r, a = e, n = ref(t.month), o = ref(t.year), l = ref(false), s = computed(() => t.calendar || "gregory"), u = computed(() => he.getCalendarRange(t.calendar));
    watch(() => t.month, (g) => {
      n.value = g;
    }, { immediate: true }), watch(() => t.year, (g) => {
      o.value = g;
    }, { immediate: true });
    const i = computed(() => {
      if (t.calendar === "gregory")
        return o.value.toString();
      try {
        const g = new ue(o.value, 6, 1), b = he.safeToCalendar(
          g,
          he.createSafeCalendar(t.calendar)
        );
        return new zt(t.locale, {
          calendar: t.calendar,
          year: "numeric"
        }).format(b.toDate("UTC"));
      } catch {
        return o.value.toString();
      }
    }), m = computed(() => he.getMonthNames(t.locale, t.calendar)), y = computed(() => {
      let g = o.value, b = n.value - 1;
      return b < 1 && (b = 12, g = o.value - 1), g >= u.value.min;
    }), v = computed(() => {
      let g = o.value, b = n.value + 1;
      return b > 12 && (b = 1, g = o.value + 1), g <= u.value.max;
    }), w = () => {
      if (!y.value) return;
      let g = n.value - 1, b = o.value;
      g < 1 && (g = 12, b -= 1), b >= u.value.min && S(g, b);
    }, x = () => {
      if (!v.value) return;
      let g = n.value + 1, b = o.value;
      g > 12 && (g = 1, b += 1), b <= u.value.max && S(g, b);
    }, f = () => {
      S(n.value, o.value);
    }, $ = (g) => {
      g !== void 0 && (n.value = g), S(n.value, o.value);
    }, c = (g) => {
      g >= u.value.min && g <= u.value.max && (o.value = g, S(n.value, g));
    }, S = (g, b) => {
      n.value = g, o.value = b, a("update:month", g), a("update:year", b);
    }, k = () => {
      l.value = !l.value;
    };
    return (g, b) => (openBlock(), createElementBlock("div", kl, [
      createBaseVNode("button", {
        type: "button",
        onClick: w,
        class: "p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "上個月",
        disabled: !y.value
      }, [
        createVNode(Hr, { class: "h-5 w-5" })
      ], 8, Tl),
      createBaseVNode("div", xl, [
        renderSlot(g.$slots, "month-selector", {
          monthNames: m.value,
          selectedMonth: n.value,
          onMonthChange: $
        }, () => [
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": b[0] || (b[0] = (D) => n.value = D),
            onChange: f,
            class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500",
            "aria-label": "選擇月份",
            role: "combobox"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(m.value, (D, d) => (openBlock(), createElementBlock("option", {
              key: d,
              value: d + 1
            }, toDisplayString(D), 9, Yl))), 128))
          ], 544), [
            [vModelSelect, n.value]
          ])
        ]),
        createBaseVNode("div", Cl, [
          renderSlot(g.$slots, "year-selector", {
            displayYear: i.value,
            toggleYearSelector: k,
            showYearSelector: l.value
          }, () => [
            createBaseVNode("button", {
              type: "button",
              onClick: k,
              "data-year-selector-button": "",
              class: "inline-flex text-nowrap items-center px-2 py-1 bg-vdt-surface text-vdt-content w-full border border-vdt-outline rounded-sm text-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200",
              "aria-label": "選擇年份"
            }, toDisplayString(i.value), 1)
          ]),
          createVNode(wl, {
            "selected-year": o.value,
            "show-selector": l.value,
            "onUpdate:showSelector": b[1] || (b[1] = (D) => l.value = D),
            calendar: s.value,
            locale: g.locale,
            onYearSelected: c
          }, createSlots({ _: 2 }, [
            renderList(g.$slots, (D, d) => ({
              name: d,
              fn: withCtx((p) => [
                renderSlot(g.$slots, d, normalizeProps(guardReactiveProps(p)))
              ])
            }))
          ]), 1032, ["selected-year", "show-selector", "calendar", "locale"])
        ])
      ]),
      createBaseVNode("button", {
        type: "button",
        onClick: x,
        class: "p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "下個月",
        disabled: !v.value
      }, [
        createVNode(Br, { class: "h-5 w-5" })
      ], 8, Rl)
    ]));
  }
});
var Il = { class: "grid grid-cols-7 mb-2" };
var Ol = defineComponent({
  __name: "WeekdayHeader",
  props: {
    locale: { default: "en-US" },
    weekStartsOn: { default: 0 },
    calendar: { default: "gregory" }
  },
  setup(r) {
    const e = r, t = computed(() => {
      const a = new Intl.DateTimeFormat(e.locale, {
        weekday: "short",
        calendar: e.calendar
      }), n = new Date(2023, 0, 1);
      return Array.from({ length: 7 }, (o, l) => {
        const s = new Date(n);
        return s.setDate(n.getDate() + (l + e.weekStartsOn) % 7), a.format(s);
      });
    });
    return (a, n) => (openBlock(), createElementBlock("div", Il, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(t.value, (o, l) => (openBlock(), createElementBlock("div", {
        key: l,
        class: "text-center text-vdt-content text-sm py-2"
      }, toDisplayString(o), 1))), 128))
    ]));
  }
});
var Vl = { class: "calendar-cell text-center relative" };
var Fl = ["disabled", "tabindex", "aria-selected", "aria-disabled", "aria-current", "data-in-current-month"];
var Pl = defineComponent({
  __name: "CalendarCell",
  props: {
    date: {},
    currentMonth: {},
    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    isToday: { type: Boolean, default: false },
    focusable: { type: Boolean, default: false },
    selectionMode: { default: "single" },
    isRangeStart: { type: Boolean, default: false },
    isRangeEnd: { type: Boolean, default: false },
    isInRange: { type: Boolean, default: false }
  },
  emits: ["select", "nav"],
  setup(r, { emit: e }) {
    const t = r, a = e, n = computed(() => t.date.month !== t.currentMonth), o = computed(() => {
      const s = {};
      return s["flex justify-center items-center w-8 h-8 rounded-md mx-auto relative z-10"] = true, t.disabled ? (s["opacity-40 cursor-not-allowed"] = true, s["bg-vdt-surface text-vdt-content"] = true, s) : (t.selectionMode === "range" ? (t.isRangeStart || t.isRangeEnd ? s["bg-vdt-theme-500 text-white"] = true : t.isInRange ? s["bg-vdt-outline text-vdt-content"] = true : (s["bg-vdt-surface text-vdt-content"] = true, s["hover:bg-vdt-interactive-hover cursor-pointer"] = true), t.isToday && !t.isRangeStart && !t.isRangeEnd && !t.isInRange && (s["ring-2 ring-vdt-theme-500"] = true)) : (t.selected ? s["bg-vdt-theme-500 text-white"] = true : (s["bg-vdt-surface text-vdt-content"] = true, s["hover:bg-vdt-interactive-hover cursor-pointer"] = true), t.isToday && !t.selected && (s["ring-2 ring-vdt-theme-500"] = true)), n.value && !t.selected && !t.isRangeStart && !t.isRangeEnd && (s["text-vdt-content-muted"] = true, s["text-vdt-content"] = false), s);
    }), l = () => {
      t.disabled || a("select", t.date);
    };
    return (s, u) => (openBlock(), createElementBlock("div", Vl, [
      createBaseVNode("button", {
        type: "button",
        class: normalizeClass(["calendar-cell-button", o.value]),
        disabled: s.disabled,
        tabindex: s.focusable ? 0 : -1,
        "aria-selected": s.selected || s.isRangeStart || s.isRangeEnd,
        "aria-disabled": s.disabled,
        "aria-current": s.isToday ? "date" : void 0,
        "data-in-current-month": !n.value,
        onClick: l,
        onKeydown: [
          withKeys(l, ["enter"]),
          withKeys(l, ["space"]),
          u[0] || (u[0] = withKeys((i) => a("nav", "up"), ["up"])),
          u[1] || (u[1] = withKeys((i) => a("nav", "down"), ["down"])),
          u[2] || (u[2] = withKeys((i) => a("nav", "left"), ["left"])),
          u[3] || (u[3] = withKeys((i) => a("nav", "right"), ["right"]))
        ]
      }, toDisplayString(s.date.day), 43, Fl)
    ]));
  }
});
var Al = Ke(Pl, [["__scopeId", "data-v-9018b2ca"]]);
var Ll = { class: "grid grid-cols-7 gap-1" };
var Hl = defineComponent({
  __name: "DateGridView",
  props: {
    year: {},
    month: {},
    selectedDate: { default: null },
    rangeStart: { default: null },
    rangeEnd: { default: null },
    selectionMode: { default: "single" },
    minDate: { default: void 0 },
    maxDate: { default: void 0 },
    locale: { default: "en-US" },
    weekStartsOn: { default: 0 },
    calendar: { default: "gregory" }
  },
  emits: ["select", "range-select", "navigate"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, o = computed(() => a.month), l = computed(() => a.year);
    computed(() => {
      const f = ot();
      return `${f.year}-${f.month}-${f.day}`;
    });
    const s = computed(() => he.generateCalendarDays(
      a.year,
      // 西元年
      a.month,
      // 西元月
      a.calendar,
      a.locale,
      a.weekStartsOn
    )), u = (f) => {
      if (!a.rangeStart || !a.rangeEnd) return false;
      try {
        return f.compare(a.rangeStart) >= 0 && f.compare(a.rangeEnd) <= 0;
      } catch {
        return false;
      }
    }, i = (f, $) => {
      if (!f || !$) return false;
      try {
        return f.compare($) === 0;
      } catch {
        return false;
      }
    }, m = (f) => {
      try {
        return !!(a.minDate && f.compare(a.minDate) < 0 || a.maxDate && f.compare(a.maxDate) > 0);
      } catch {
        return true;
      }
    }, y = (f) => wo(f), v = computed(() => s.value.map((f, $) => {
      const c = `${f.year}-${f.month}-${f.day}`, S = y(f), k = f.month !== o.value, g = m(f), b = a.selectionMode === "single" && i(f, a.selectedDate), D = a.selectionMode === "range" && i(f, a.rangeStart), d = a.selectionMode === "range" && i(f, a.rangeEnd), p = a.selectionMode === "range" && u(f) && !D && !d && !g, h = f.day === 1 && f.month === o.value, A = [
        c,
        b,
        S,
        g,
        D,
        d,
        p,
        a.selectionMode,
        a.calendar
      ];
      return {
        key: `${a.calendar}-${l.value}-${o.value}-${c}-${$}`,
        memoKey: A,
        date: f,
        isToday: S,
        isSelected: b,
        isDisabled: g,
        isOutsideMonth: k,
        isRangeStart: D,
        isRangeEnd: d,
        isInRange: p,
        isFocusable: h
      };
    })), w = (f) => {
      a.selectionMode === "single" ? n("select", f) : a.selectionMode === "range" && n("range-select", f, null);
    }, x = (f) => {
      const $ = v.value;
      if ($.length === 0) return;
      const c = $[0], S = $[$.length - 1];
      switch (f) {
        case "left":
          c.date.day < 15 && c.date.month !== o.value && n("navigate", "prev-month");
          break;
        case "right":
          S.date.day > 15 && S.date.month !== o.value && n("navigate", "next-month");
          break;
      }
    };
    return e({
      getCalendarDays: () => s.value,
      getCellStates: () => v.value
    }), (f, $) => (openBlock(), createElementBlock("div", Ll, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(v.value, (c, S, k, g) => {
        const b = c.memoKey;
        if (g && g.key === c.key && isMemoSame(g, b)) return g;
        const D = (openBlock(), createBlock(Al, {
          key: c.key,
          date: c.date,
          "current-month": o.value,
          selected: c.isSelected,
          "is-today": c.isToday,
          disabled: c.isDisabled,
          focusable: c.isFocusable,
          "is-range-start": c.isRangeStart,
          "is-range-end": c.isRangeEnd,
          "is-in-range": c.isInRange,
          "selection-mode": f.selectionMode,
          onSelect: w,
          onNav: x
        }, null, 8, ["date", "current-month", "selected", "is-today", "disabled", "focusable", "is-range-start", "is-range-end", "is-in-range", "selection-mode"]));
        return D.memo = b, D;
      }, $, 0), 128))
    ]));
  }
});
var Bl = { key: 0 };
var ql = { class: "flex flex-row items-center justify-between" };
var Nl = { class: "text-sm font-medium text-vdt-content uppercase" };
var Ul = { class: "flex flex-row items-center gap-1" };
var zl = { class: "time-selector-container pt-1" };
var Wl = { class: "flex flex-row items-center gap-1" };
var jl = { class: "flex-1" };
var Jl = ["value"];
var _l = { class: "flex-1" };
var Kl = ["value"];
var Ql = {
  key: 0,
  class: "flex-1"
};
var Zl = ["value"];
var Gl = {
  key: 1,
  class: "flex-shrink-0"
};
var Xl = { class: "isolate inline-flex rounded-md border border-vdt-outline bg-vdt-surface overflow-hidden" };
var es = defineComponent({
  __name: "TimeSelector",
  props: {
    show: { type: Boolean, default: true },
    timeValue: { default: null },
    enableSeconds: { type: Boolean, default: true },
    use24Hour: { type: Boolean, default: false },
    defaultTime: { default: "00:00:00" },
    locale: { default: "zh-TW" },
    selectionMode: { default: "single" }
  },
  emits: ["time-change", "today-click"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, { getPlaceholderMessage: o } = wt(a.locale), l = ref(0), s = ref(0), u = ref(0), i = ref("AM"), m = ref(false), y = computed(() => a.use24Hour ? Array.from({ length: 24 }, (d, p) => p) : Array.from({ length: 12 }, (d, p) => p + 1)), v = computed(() => Array.from({ length: 60 }, (d, p) => p)), w = computed(() => Array.from({ length: 60 }, (d, p) => p)), x = computed(() => {
      let d = l.value;
      a.use24Hour || (i.value === "PM" && d < 12 ? d += 12 : i.value === "AM" && d === 12 && (d = 0));
      const p = f(d), h = f(s.value);
      if (a.enableSeconds) {
        const A = f(u.value);
        return `${p}:${h}:${A}`;
      } else
        return `${p}:${h}`;
    }), f = (d) => d.toString().padStart(2, "0"), $ = (d) => f(d), c = (d) => {
      if (!d) return;
      const [p, h, A] = d.split(":");
      let U = parseInt(p) || 0;
      a.use24Hour || (U >= 12 ? (i.value = "PM", U = U === 12 ? 12 : U - 12) : (i.value = "AM", U = U === 0 ? 12 : U)), l.value = U, s.value = parseInt(h) || 0, a.enableSeconds && A && (u.value = parseInt(A) || 0), m.value = true;
    }, S = () => {
      c(a.defaultTime);
    }, k = (d) => {
      i.value = d;
    }, g = (d) => {
      const p = /* @__PURE__ */ new Date();
      p.setHours(d === "AM" ? 6 : 18, 0, 0, 0);
      const U = new Intl.DateTimeFormat(a.locale || navigator.language, {
        hour12: true,
        hour: "numeric"
      }).formatToParts(p).find((K) => K.type === "dayPeriod");
      return (U == null ? void 0 : U.value) || d;
    }, b = () => {
      const d = /* @__PURE__ */ new Date();
      if (a.use24Hour)
        l.value = d.getHours();
      else {
        const p = d.getHours();
        i.value = p >= 12 ? "PM" : "AM", l.value = p % 12 || 12;
      }
      s.value = d.getMinutes(), a.enableSeconds && (u.value = d.getSeconds()), m.value = true;
    }, D = () => {
      n("today-click");
    };
    return watch(() => a.timeValue, (d) => {
      d ? c(d) : !m.value && a.show && S();
    }, { immediate: true }), watch(
      [l, s, u, i],
      () => {
        m.value && n("time-change", x.value);
      }
    ), e({
      // 獲取當前時間值
      getCurrentTime: () => x.value,
      // 設置時間
      setTime: (d) => c(d),
      // 重置為預設時間
      resetToDefault: () => S()
    }), (d, p) => d.show ? (openBlock(), createElementBlock("div", Bl, [
      p[5] || (p[5] = createBaseVNode("hr", { class: "my-2 border-vdt-outline" }, null, -1)),
      createBaseVNode("div", ql, [
        createBaseVNode("label", Nl, toDisplayString(unref(o)("general.time")) + ": ", 1),
        createBaseVNode("div", Ul, [
          createBaseVNode("button", {
            type: "button",
            onClick: b,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-active cursor-pointer"
          }, " Now "),
          d.selectionMode === "single" ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            onClick: D,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-active cursor-pointer"
          }, " Today ")) : createCommentVNode("", true)
        ])
      ]),
      createBaseVNode("div", zl, [
        createBaseVNode("div", Wl, [
          createBaseVNode("div", jl, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": p[0] || (p[0] = (h) => l.value = h),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(y.value, (h) => (openBlock(), createElementBlock("option", {
                key: h,
                value: h
              }, toDisplayString($(h)), 9, Jl))), 128))
            ], 512), [
              [vModelSelect, l.value]
            ])
          ]),
          createBaseVNode("div", _l, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": p[1] || (p[1] = (h) => s.value = h),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(v.value, (h) => (openBlock(), createElementBlock("option", {
                key: h,
                value: h
              }, toDisplayString(f(h)), 9, Kl))), 128))
            ], 512), [
              [vModelSelect, s.value]
            ])
          ]),
          d.enableSeconds ? (openBlock(), createElementBlock("div", Ql, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": p[2] || (p[2] = (h) => u.value = h),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(w.value, (h) => (openBlock(), createElementBlock("option", {
                key: h,
                value: h
              }, toDisplayString(f(h)), 9, Zl))), 128))
            ], 512), [
              [vModelSelect, u.value]
            ])
          ])) : createCommentVNode("", true),
          d.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Gl, [
            createBaseVNode("div", Xl, [
              createBaseVNode("button", {
                type: "button",
                onClick: p[3] || (p[3] = (h) => k("AM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", i.value === "AM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(g("AM")), 3),
              createBaseVNode("button", {
                type: "button",
                onClick: p[4] || (p[4] = (h) => k("PM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", i.value === "PM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(g("PM")), 3)
            ])
          ]))
        ])
      ])
    ])) : createCommentVNode("", true);
  }
});
var ts = { class: "vdt-date-picker calendar-grid w-full max-w-xs rounded-lg shadow p-2" };
var pa = defineComponent({
  __name: "CalendarGrid",
  props: {
    value: { default: null },
    rangeStart: { default: null },
    rangeEnd: { default: null },
    selectionMode: { default: "single" },
    year: { default: void 0 },
    month: { default: void 0 },
    minDate: { default: void 0 },
    maxDate: { default: void 0 },
    locale: { default: "en-US" },
    weekStartsOn: { default: 0 },
    showTimeSelector: { type: Boolean, default: false },
    timeValue: { default: null },
    enableSeconds: { type: Boolean, default: true },
    use24Hour: { type: Boolean, default: false },
    defaultTime: { default: "00:00:00" },
    calendar: { default: "gregory" }
  },
  emits: ["select", "time-select", "range-select"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, o = () => {
      if (a.year !== void 0 && a.month !== void 0)
        return { year: a.year, month: a.month };
      if (a.value)
        return { year: a.value.year, month: a.value.month };
      if (a.rangeStart)
        return { year: a.rangeStart.year, month: a.rangeStart.month };
      const d = ot();
      return { year: d.year, month: d.month };
    }, { year: l, month: s } = o(), u = ref(l), i = ref(s), m = ref(a.timeValue), y = computed(() => he.convertToCalendarDate(a.value, a.calendar)), v = computed(() => he.convertToCalendarDate(a.rangeStart, a.calendar)), w = computed(() => he.convertToCalendarDate(a.rangeEnd, a.calendar)), x = computed(() => he.convertToCalendarDate(a.minDate || null, a.calendar)), f = computed(() => he.convertToCalendarDate(a.maxDate || null, a.calendar)), $ = computed(() => {
      var d;
      return ((d = a.minDate) == null ? void 0 : d.year) || 1900;
    }), c = computed(() => {
      var d;
      return ((d = a.maxDate) == null ? void 0 : d.year) || 2100;
    }), S = computed(() => {
      if (a.year !== void 0 && a.month !== void 0)
        return { year: a.year, month: a.month };
      const d = a.selectionMode === "range" ? a.rangeStart : a.value;
      return d ? { year: d.year, month: d.month } : { year: u.value, month: i.value };
    });
    watch(S, ({ year: d, month: p }) => {
      u.value = d, i.value = p;
    }, { immediate: true }), watch(() => a.timeValue, (d) => {
      m.value = d;
    }, { immediate: true });
    const k = (d) => {
      if (a.selectionMode === "single") {
        const p = he.convertFromCalendarDate(d, a.calendar);
        p && (n("select", p, true), a.showTimeSelector && m.value && n("time-select", m.value));
      }
    }, g = (d, p) => {
      if (a.selectionMode === "range") {
        const h = he.convertFromCalendarDate(d, a.calendar), A = he.convertFromCalendarDate(p, a.calendar);
        n("range-select", h, A);
      }
    }, b = (d) => {
      m.value = d, n("time-select", d);
    }, D = () => {
      if (a.selectionMode === "single") {
        const d = ot();
        u.value = d.year, i.value = d.month, n("select", d, false);
      }
    };
    return e({
      // 獲取當前選中的日期（單一模式）
      getSelectedDate: () => a.value,
      // 獲取當前範圍（範圍模式）
      getSelectedRange: () => ({ start: a.rangeStart, end: a.rangeEnd }),
      // 設置顯示的月份
      setDisplayMonth: (d, p) => {
        u.value = d, i.value = p;
      },
      // 導航到上個月
      previousMonth: () => {
        i.value === 1 ? (i.value = 12, u.value -= 1) : i.value -= 1;
      },
      // 導航到下個月
      nextMonth: () => {
        i.value === 12 ? (i.value = 1, u.value += 1) : i.value += 1;
      }
    }), (d, p) => (openBlock(), createElementBlock("div", ts, [
      createVNode(El, {
        month: i.value,
        "onUpdate:month": p[0] || (p[0] = (h) => i.value = h),
        year: u.value,
        "onUpdate:year": p[1] || (p[1] = (h) => u.value = h),
        locale: d.locale,
        "min-year": $.value,
        "max-year": c.value,
        calendar: d.calendar
      }, createSlots({ _: 2 }, [
        renderList(d.$slots, (h, A) => ({
          name: A,
          fn: withCtx((U) => [
            renderSlot(d.$slots, A, normalizeProps(guardReactiveProps(U)))
          ])
        }))
      ]), 1032, ["month", "year", "locale", "min-year", "max-year", "calendar"]),
      createVNode(Ol, {
        locale: d.locale,
        "week-starts-on": d.weekStartsOn,
        calendar: d.calendar
      }, null, 8, ["locale", "week-starts-on", "calendar"]),
      createVNode(Hl, {
        year: u.value,
        month: i.value,
        "selected-date": y.value,
        "range-start": v.value,
        "range-end": w.value,
        "selection-mode": d.selectionMode,
        "min-date": x.value,
        "max-date": f.value,
        locale: d.locale,
        "week-starts-on": d.weekStartsOn,
        calendar: d.calendar,
        onSelect: k,
        onRangeSelect: g
      }, null, 8, ["year", "month", "selected-date", "range-start", "range-end", "selection-mode", "min-date", "max-date", "locale", "week-starts-on", "calendar"]),
      createVNode(es, {
        locale: d.locale,
        show: d.showTimeSelector,
        "time-value": m.value,
        "enable-seconds": d.enableSeconds,
        "use24-hour": d.use24Hour,
        "default-time": d.defaultTime,
        selectionMode: d.selectionMode,
        onTimeChange: b,
        onTodayClick: D
      }, null, 8, ["locale", "show", "time-value", "enable-seconds", "use24-hour", "default-time", "selectionMode"])
    ]));
  }
});
var as = {};
var rs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor"
};
function ns(r, e) {
  return openBlock(), createElementBlock("svg", rs, e[0] || (e[0] = [
    createBaseVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18L18 6M6 6l12 12"
    }, null, -1)
  ]));
}
var qr = Ke(as, [["render", ns]]);
function ga(r, e) {
  const { dateInputRef: t, timeInputRef: a } = r, { showTime: n, autoFocusTimeAfterDate: o = true } = e;
  return {
    // 基本導航方法
    focusFirstInput: () => {
      nextTick(() => {
        var y;
        (y = t.value) != null && y.focus && t.value.focus();
      });
    },
    focusLastInput: () => {
      nextTick(() => {
        var y, v, w;
        n && ((y = a.value) != null && y.focusLast) ? a.value.focusLast() : (v = t.value) != null && v.focusLast ? t.value.focusLast() : (w = t.value) != null && w.focus && t.value.focus();
      });
    },
    // 專門的導航處理
    handleNavigateToTime: (y) => {
      n && nextTick(() => {
        var v;
        (v = a.value) != null && v.focus && a.value.focus();
      });
    },
    handleNavigateToDate: () => {
      nextTick(() => {
        var y, v;
        (y = t.value) != null && y.focusLast ? t.value.focusLast() : (v = t.value) != null && v.focus && t.value.focus();
      });
    },
    autoFocusTimeAfterDateComplete: (y, v) => {
      !n || !o || (v && !y.inputTimeValue.value && (y.inputTimeValue.value = v, y.updateFromInputs()), nextTick(() => {
        var w;
        (w = a.value) != null && w.focus && a.value.focus();
      }));
    }
  };
}
function ya(r = {}) {
  const { required: e = true, showTime: t = false, minDate: a, maxDate: n, dateFormat: o = "YYYY-MM-DD" } = r, l = ref({}), s = ref({}), u = ref({}), i = computed(() => ({ ...l.value, ...s.value })), m = computed(() => ({ ...u.value })), y = computed(() => Object.keys(i.value).length > 0), v = (b, D, d = "date", p = {}) => {
    ["date", "year", "month", "day"].forEach((h) => {
      f(`${d}.${h}`), $(`${d}.${h}`);
    }), b || Object.entries(D).forEach(([h, A]) => {
      const U = `${d}.${h}`;
      l.value[U] = A, p[h] && (u.value[U] = p[h]);
    });
  }, w = (b, D, d = "time", p = {}) => (["time", "hour", "minute", "second"].forEach((h) => {
    f(`${d}.${h}`), $(`${d}.${h}`);
  }), b || Object.entries(D).forEach(([h, A]) => {
    const U = `${d}.${h}`;
    l.value[U] = A, p[h] && (u.value[U] = p[h]);
  }), !y.value), x = (b) => {
    if (!b) return false;
    if (a) {
      const D = ge(a);
      if (D && jt(b, D) < 0)
        return v(false, {
          date: "date.beforeMin"
        }, "date", {
          date: { minDate: Oe(D, o) }
        }), false;
    }
    if (n) {
      const D = ge(n);
      if (D && jt(b, D) > 0)
        return v(false, {
          date: "date.afterMax"
        }, "date", {
          date: { maxDate: Oe(D, o) }
        }), false;
    }
    return true;
  }, f = (b) => {
    Object.keys(l.value).forEach((D) => {
      D.startsWith(b) && delete l.value[D];
    });
  }, $ = (b) => {
    Object.keys(u.value).forEach((D) => {
      D.startsWith(b) && delete u.value[D];
    });
  };
  return {
    // 狀態
    errors: l,
    formatErrors: s,
    mergedErrors: i,
    hasErrors: y,
    errorParams: u,
    mergedErrorParams: m,
    // 驗證方法
    handleDateValidation: v,
    handleTimeValidation: w,
    validateDateTime: (b, D) => {
      const d = {
        isValid: true,
        errors: {}
      };
      return e && (b || (d.errors.date = "date.required", d.isValid = false), t && !D && (d.errors.time = "time.required", d.isValid = false)), Object.assign(l.value, d.errors), d.isValid && !y.value;
    },
    validateDateRange: x,
    // 錯誤管理
    clearFieldErrors: f,
    clearFieldParams: $,
    clearAllErrors: () => {
      l.value = {}, s.value = {}, u.value = {};
    },
    setFormatError: (b, D) => {
      s.value[b] = D;
    },
    clearFormatError: (b) => {
      delete s.value[b];
    }
  };
}
function $a(r = {}) {
  const {
    showTime: e = false,
    dateFormat: t = "YYYY-MM-DD",
    timeFormat: a = "HH:mm:ss",
    outputType: n = "iso",
    defaultTime: o,
    enableSeconds: l = true
  } = r, s = ref(null), u = ref(null), i = ref(null), m = (d) => {
    if (!d || d.hour === void 0) return null;
    const p = d.hour.toString().padStart(2, "0"), h = (d.minute || 0).toString().padStart(2, "0");
    if (l) {
      const A = (d.second || 0).toString().padStart(2, "0");
      return `${p}:${h}:${A}`;
    } else
      return `${p}:${h}`;
  }, y = (d, p) => {
    if (!d) return null;
    const h = ge(d);
    if (!h) return null;
    if (!p && !e)
      return ze(h.year, h.month, h.day);
    if (!p)
      if (o) {
        const X = o.split(":").map(Number), Q = X[0] || 0, O = X[1] || 0, E = X[2] || 0;
        return ze(
          h.year,
          h.month,
          h.day,
          Q,
          O,
          E
        );
      } else
        return ze(h.year, h.month, h.day);
    const A = p.split(":").map(Number), U = A[0] || 0, K = A[1] || 0, W = A[2] || 0;
    return ze(
      h.year,
      h.month,
      h.day,
      U,
      K,
      W
    );
  }, v = (d) => {
    const p = ge(d);
    s.value = p, p ? (u.value = Oe(p, t), i.value = m(p)) : (u.value = null, i.value = null);
  }, w = (d, p) => {
    const h = d !== void 0 ? d : u.value, A = p !== void 0 ? p : i.value, U = y(h, A);
    return s.value = U, U;
  }, x = (d) => {
    if (!d) {
      s.value = null, u.value = null, i.value = null;
      return;
    }
    if (e && o && (d.hour === void 0 || d.hour === null) && !i.value) {
      const p = o.split(":").map(Number), h = p[0] || 0, A = p[1] || 0, U = p[2] || 0, K = ze(
        d.year,
        d.month,
        d.day,
        h,
        A,
        U
      );
      s.value = K, i.value = o;
    } else
      s.value = d, i.value = m(d);
    s.value && (u.value = Oe(s.value));
  }, f = (d) => {
    if (!s.value) return null;
    const p = d.split(":").map(Number), h = {
      ...s.value,
      hour: p[0] || 0,
      minute: p[1] || 0,
      second: p[2] || 0
    };
    return s.value = h, i.value = d, h;
  }, $ = (d) => {
    const p = d !== void 0 ? d : s.value, h = e ? `${t} ${a}` : t;
    return Wt(p, n, h);
  }, c = () => {
    s.value = null, u.value = null, i.value = null;
  }, S = computed(() => !!(u.value || i.value || s.value)), k = () => e && !i.value && o ? (i.value = o, true) : false, g = computed(() => !!u.value), b = computed(() => !!i.value), D = computed(() => e ? g.value && b.value : g.value);
  return {
    // 響應式狀態
    internalDateTime: s,
    inputDateValue: u,
    inputTimeValue: i,
    // 計算屬性
    hasDateValue: g,
    hasTimeValue: b,
    hasCompleteValue: D,
    hasValue: S,
    // 主要方法
    updateFromInputs: w,
    setInternalDateTime: x,
    updateTimeOnly: f,
    setExternalValue: v,
    // updateDateTime,
    getFormattedOutput: $,
    clearValues: c,
    applyDefaultTime: k,
    // 輔助方法
    getTimeFromDateTime: m,
    createDateTimeFromInputs: y
  };
}
function Nr(r, e, t = {}) {
  const { disabled: a, onOutsideClick: n } = t, o = ref(false), l = () => {
    a != null && a.value || (o.value = !o.value, o.value && nextTick(() => {
      i();
    }));
  }, s = () => {
    a != null && a.value || (o.value = true, nextTick(() => {
      i();
    }));
  }, u = () => {
    o.value = false;
  }, i = () => {
    if (!r.value || !e.value) return;
    const f = r.value.getBoundingClientRect(), $ = e.value, c = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    $.style.position = "absolute", $.style.visibility = "hidden", $.style.display = "block";
    const S = $.getBoundingClientRect();
    let k = f.height + 5, g = 0;
    const b = c.height - f.bottom, D = f.top, d = S.height;
    b < d && D > b && (k = -d - 5);
    const p = c.width - f.left, h = S.width;
    p < h && (g = Math.max(-(h - p + 10), -f.left + 10)), f.left + g < 0 && (g = -f.left + 10), $.style.top = `${k}px`, $.style.left = `${g}px`, $.style.zIndex = "50", $.style.visibility = "visible";
  }, m = (f) => {
    const $ = e.value, c = r.value, S = f.target;
    o.value && $ && !$.contains(S) && c && !c.contains(S) && (u(), n == null || n());
  }, y = (f, $) => {
    if (a != null && a.value) return;
    const c = f.target;
    c.classList.contains("date-input") || c.classList.contains("time-input") || c.closest("input") || c.closest("button") || (f.preventDefault(), $ == null || $());
  }, v = (f) => {
    if (a != null && a.value) return;
    const $ = f.target;
    $.classList.contains("date-input") || $.classList.contains("time-input") || $.closest("input") || $.closest("button") || f.preventDefault();
  }, w = () => {
    o.value && i();
  }, x = () => {
    o.value && i();
  };
  return onMounted(() => {
    document.addEventListener("mousedown", m), window.addEventListener("resize", w), window.addEventListener("scroll", x);
  }), onBeforeUnmount(() => {
    document.removeEventListener("mousedown", m), window.removeEventListener("resize", w), window.removeEventListener("scroll", x);
  }), {
    // 狀態
    showCalendar: o,
    // 主要方法
    toggleCalendar: l,
    showCalendarPopup: s,
    hideCalendar: u,
    updateCalendarPosition: i,
    // 事件處理
    handleContainerClick: y,
    handleContainerMouseDown: v
  };
}
function os(r = {}) {
  const {
    customDefaultTime: e = "00:00:00",
    enableSeconds: t = true
  } = r, a = (i) => {
    if (!i) return false;
    if (!/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])(?::([0-5]?[0-9]))?$/.test(i))
      return console.warn(`時間格式不正確: ${i}，應為 HH:mm:ss 或 HH:mm 格式`), false;
    const y = i.split(":"), v = parseInt(y[0]), w = parseInt(y[1]), x = y[2] ? parseInt(y[2]) : 0;
    return v < 0 || v > 23 || w < 0 || w > 59 || x < 0 || x > 59 ? (console.warn(`時間值超出範圍: ${i}`), false) : true;
  }, n = (i, m = t) => {
    const y = i.split(":"), v = y[0].padStart(2, "0"), w = y[1].padStart(2, "0"), x = y[2] ? y[2].padStart(2, "0") : "00";
    return m ? `${v}:${w}:${x}` : `${v}:${w}`;
  };
  return {
    // 計算屬性
    getValidDefaultTime: computed(() => {
      if (e && a(e))
        return n(e, t);
    }),
    // 驗證方法
    isValidTimeValue: a,
    // 格式化方法
    formatTimeString: n,
    getCurrentTimeString: () => {
      const i = /* @__PURE__ */ new Date(), m = i.getHours().toString().padStart(2, "0"), y = i.getMinutes().toString().padStart(2, "0"), v = i.getSeconds().toString().padStart(2, "0");
      return t ? `${m}:${y}:${v}` : `${m}:${y}`;
    },
    parseTimeString: (i) => {
      const m = i.split(":");
      return {
        hours: parseInt(m[0]) || 0,
        minutes: parseInt(m[1]) || 0,
        seconds: parseInt(m[2]) || 0
      };
    },
    buildTimeString: (i, m, y = 0) => {
      const v = i.toString().padStart(2, "0"), w = m.toString().padStart(2, "0"), x = y.toString().padStart(2, "0");
      return t ? `${v}:${w}:${x}` : `${v}:${w}`;
    }
  };
}
function ls(r = {}, e) {
  const {
    modelValue: t = null,
    showTime: a = false,
    required: n = true,
    disabled: o = false,
    // calendar = 'gregory',          // 日曆系統
    dateFormat: l = "YYYY-MM-DD",
    timeFormat: s = "HH:mm:ss",
    // outputType = 'iso',
    useStrictISO: u = false,
    customDefaultTime: i,
    enableSeconds: m = true,
    autoFocusTimeAfterDate: y = true,
    minDate: v,
    maxDate: w
    // locale = 'zh-TW'
  } = r, { containerRef: x, calendarRef: f, dateInputRef: $, timeInputRef: c } = e, S = computed(() => {
    var F;
    return ((F = r.calendar) == null ? void 0 : F.value) || "gregory";
  }), k = computed(() => {
    var F;
    return ((F = r.locale) == null ? void 0 : F.value) || "zh-TW";
  }), g = computed(() => {
    var F;
    return ((F = r.outputType) == null ? void 0 : F.value) || "iso";
  }), b = ref(o), D = ya({
    required: n,
    showTime: a,
    minDate: v,
    maxDate: w,
    dateFormat: l
  }), d = $a({
    showTime: a,
    dateFormat: l,
    timeFormat: s,
    outputType: g.value,
    defaultTime: i,
    enableSeconds: m
  }), p = ga(
    { dateInputRef: $, timeInputRef: c },
    { showTime: a, autoFocusTimeAfterDate: y }
  ), h = Nr(
    x,
    f,
    {
      disabled: b,
      onOutsideClick: () => {
      }
    }
  ), A = os({
    customDefaultTime: i,
    enableSeconds: m
  }), U = computed(() => {
    const F = ge(v, k.value);
    return F || null;
  }), K = computed(() => {
    const F = ge(w, k.value);
    return F || null;
  });
  let W = null, X = null, Q = null;
  const O = (F) => {
    W = F.update || null, X = F.change || null, Q = F.validation || null;
  }, E = async (F = d.internalDateTime.value) => {
    let _ = null;
    if (F) {
      const pe = a ? s : void 0;
      _ = Wt(F, g.value, l, pe, a, S.value, k.value, u, m);
    }
    W == null || W(_), X == null || X(_);
    const ae = !D.hasErrors.value;
    Q == null || Q(ae, D.mergedErrors.value, D.errorParams.value);
  };
  watch(() => t, (F) => {
    const _ = ge(F, k.value, S.value);
    F && !_ ? (D.handleDateValidation(false, { date: "無效的日期格式" }), d.setExternalValue(null)) : _ && !D.validateDateRange(_) ? d.setExternalValue(null) : (D.clearFieldErrors("date"), D.clearFieldErrors("invalidInput"), d.setExternalValue(_));
  }, { immediate: true });
  const M = (F, _, ae = {}) => {
    D.handleDateValidation(F, _, "date", ae), Q == null || Q(!D.hasErrors.value, D.mergedErrors.value, D.errorParams.value);
  }, L = (F, _, ae = {}) => {
    D.handleTimeValidation(F, _, "time", ae), Q == null || Q(!D.hasErrors.value, D.mergedErrors.value, D.errorParams.value);
  }, H = async (F) => {
    d.inputDateValue.value = F;
    const _ = d.updateFromInputs();
    if (!_) {
      D.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    D.validateDateRange(_) && (await E(_), ["date", "year", "month", "day"].forEach((ae) => {
      D.clearFieldErrors(ae);
    }), p.autoFocusTimeAfterDateComplete(
      d,
      i ? A.getValidDefaultTime.value : void 0
    ));
  }, te = async (F) => {
    d.inputTimeValue.value = F;
    const _ = d.updateFromInputs();
    await E(_), ["time", "hour", "minute", "second"].forEach((ae) => {
      D.clearFieldErrors(ae);
    });
  }, ce = async (F, _ = true) => {
    try {
      if (!D.validateDateRange(F))
        return;
      d.setInternalDateTime(F), await E(d.internalDateTime.value), ["date", "year", "month", "day"].forEach((ae) => {
        D.clearFieldErrors(ae);
      }), _ && h.hideCalendar();
    } catch (ae) {
      console.error("處理日曆選擇失敗:", ae);
    }
  }, le = async (F) => {
    const _ = d.updateTimeOnly(F);
    _ && await E(_), ["time", "hour", "minute", "second"].forEach((ae) => {
      D.clearFieldErrors(ae);
    });
  }, R = (F) => {
    h.handleContainerClick(F, () => {
      p.focusFirstInput();
    }), h.toggleCalendar();
  }, T = () => {
    d.clearValues(), D.clearAllErrors(), E(null);
  }, N = async () => {
    var Me, be;
    const F = await ((Me = $.value) == null ? void 0 : Me.validate()), _ = a ? await ((be = c.value) == null ? void 0 : be.validate()) : true;
    let ae = true;
    d.internalDateTime.value && (ae = he.isValidDate(
      d.internalDateTime.value.year,
      d.internalDateTime.value.month,
      d.internalDateTime.value.day,
      "gregory"
      // 固定使用西元曆驗證
    ), ae || D.handleDateValidation(false, {
      date: "date.invalid"
      // 簡化錯誤信息
    }));
    const pe = D.validateDateTime(
      d.inputDateValue.value,
      d.inputTimeValue.value
    ), De = F && _ && ae && pe;
    return Q == null || Q(De, D.mergedErrors.value, D.errorParams.value), De;
  }, ee = async () => {
    const F = /* @__PURE__ */ new Date(), _ = {
      year: F.getFullYear(),
      month: F.getMonth() + 1,
      day: F.getDate(),
      hour: F.getHours(),
      minute: F.getMinutes(),
      second: F.getSeconds()
    };
    try {
      d.setInternalDateTime(_), await E(_), ["date", "year", "month", "day", "time", "hour", "minute", "second"].forEach((ae) => {
        D.clearFieldErrors(ae);
      });
    } catch (ae) {
      console.warn("設置當前時間失敗:", ae);
      const pe = `${_.year}-${_.month.toString().padStart(2, "0")}-${_.day.toString().padStart(2, "0")}`, De = a ? `${(_.hour || 0).toString().padStart(2, "0")}:${(_.minute || 0).toString().padStart(2, "0")}:${(_.second || 0).toString().padStart(2, "0")}` : null;
      d.inputDateValue.value = pe, a && De && (d.inputTimeValue.value = De);
      const Me = d.updateFromInputs();
      await E(Me);
    }
  }, J = () => {
    p.focusFirstInput();
  };
  return {
    // 狀態
    isDisabled: b,
    // 日曆系統相關
    calendar: S,
    // 從各個 composables 暴露的狀態
    ...D,
    ...d,
    ...h,
    // 計算屬性
    calendarMinDate: U,
    calendarMaxDate: K,
    // 預設時間相關
    getValidDefaultTime: A.getValidDefaultTime,
    // 事件處理方法
    setEmitters: O,
    validateDateInput: M,
    validateTimeInput: L,
    handleDateComplete: H,
    handleTimeComplete: te,
    handleCalendarSelect: ce,
    handleTimeSelect: le,
    handleContainerClick: R,
    handleContainerMouseDown: h.handleContainerMouseDown,
    // 導航方法
    handleNavigateToDate: p.handleNavigateToDate,
    handleNavigateToTime: p.handleNavigateToTime,
    // 主要操作方法
    reset: T,
    validate: N,
    selectNow: ee,
    focus: J,
    // 直接暴露導航方法（用於 defineExpose）
    focusFirstInput: p.focusFirstInput,
    focusLastInput: p.focusLastInput
  };
}
var Ya = {
  slate: {
    50: "oklch(98.4% 0.003 247.858)",
    100: "oklch(96.8% 0.007 247.896)",
    200: "oklch(92.9% 0.013 255.508)",
    300: "oklch(86.9% 0.022 252.894)",
    400: "oklch(70.4% 0.04 256.788)",
    500: "oklch(55.4% 0.046 257.417)",
    600: "oklch(44.6% 0.043 257.281)",
    700: "oklch(37.2% 0.044 257.287)",
    800: "oklch(27.9% 0.041 260.031)",
    900: "oklch(20.8% 0.042 265.755)",
    950: "oklch(12.9% 0.042 264.695)"
  },
  gray: {
    50: "oklch(98.5% 0.002 247.839)",
    100: "oklch(96.7% 0.003 264.542)",
    200: "oklch(92.8% 0.006 264.531)",
    300: "oklch(87.2% 0.01 258.338)",
    400: "oklch(70.7% 0.022 261.325)",
    500: "oklch(55.1% 0.027 264.364)",
    600: "oklch(44.6% 0.03 256.802)",
    700: "oklch(37.3% 0.034 259.733)",
    800: "oklch(27.8% 0.033 256.848)",
    900: "oklch(21% 0.034 264.665)",
    950: "oklch(13% 0.028 261.692)"
  },
  zinc: {
    50: "oklch(98.5% 0 0)",
    100: "oklch(96.7% 0.001 286.375)",
    200: "oklch(92% 0.004 286.32)",
    300: "oklch(87.1% 0.006 286.286)",
    400: "oklch(70.5% 0.015 286.067)",
    500: "oklch(55.2% 0.016 285.938)",
    600: "oklch(44.2% 0.017 285.786)",
    700: "oklch(37% 0.013 285.805)",
    800: "oklch(27.4% 0.006 286.033)",
    900: "oklch(21% 0.006 285.885)",
    950: "oklch(14.1% 0.005 285.823)"
  },
  neutral: {
    50: "oklch(98.5% 0 0)",
    100: "oklch(97% 0 0)",
    200: "oklch(92.2% 0 0)",
    300: "oklch(87% 0 0)",
    400: "oklch(70.8% 0 0)",
    500: "oklch(55.6% 0 0)",
    600: "oklch(43.9% 0 0)",
    700: "oklch(37.1% 0 0)",
    800: "oklch(26.9% 0 0)",
    900: "oklch(20.5% 0 0)",
    950: "oklch(14.5% 0 0)"
  },
  stone: {
    50: "oklch(98.5% 0.001 106.423)",
    100: "oklch(97% 0.001 106.424)",
    200: "oklch(92.3% 0.003 48.717)",
    300: "oklch(86.9% 0.005 56.366)",
    400: "oklch(70.9% 0.01 56.259)",
    500: "oklch(55.3% 0.013 58.071)",
    600: "oklch(44.4% 0.011 73.639)",
    700: "oklch(37.4% 0.01 67.558)",
    800: "oklch(26.8% 0.007 34.298)",
    900: "oklch(21.6% 0.006 56.043)",
    950: "oklch(14.7% 0.004 49.25)"
  },
  red: {
    50: "oklch(97.1% 0.013 17.38)",
    100: "oklch(93.6% 0.032 17.717)",
    200: "oklch(88.5% 0.062 18.334)",
    300: "oklch(80.8% 0.114 19.571)",
    400: "oklch(70.4% 0.191 22.216)",
    500: "oklch(63.7% 0.237 25.331)",
    600: "oklch(57.7% 0.245 27.325)",
    700: "oklch(50.5% 0.213 27.518)",
    800: "oklch(44.4% 0.177 26.899)",
    900: "oklch(39.6% 0.141 25.723)",
    950: "oklch(25.8% 0.092 26.042)"
  },
  orange: {
    50: "oklch(98% 0.016 73.684)",
    100: "oklch(95.4% 0.038 75.164)",
    200: "oklch(90.1% 0.076 70.697)",
    300: "oklch(83.7% 0.128 66.29)",
    400: "oklch(75% 0.183 55.934)",
    500: "oklch(70.5% 0.213 47.604)",
    600: "oklch(64.6% 0.222 41.116)",
    700: "oklch(55.3% 0.195 38.402)",
    800: "oklch(47% 0.157 37.304)",
    900: "oklch(40.8% 0.123 38.172)",
    950: "oklch(26.6% 0.079 36.259)"
  },
  amber: {
    50: "oklch(98.7% 0.022 95.277)",
    100: "oklch(96.2% 0.059 95.617)",
    200: "oklch(92.4% 0.12 95.746)",
    300: "oklch(87.9% 0.169 91.605)",
    400: "oklch(82.8% 0.189 84.429)",
    500: "oklch(76.9% 0.188 70.08)",
    600: "oklch(66.6% 0.179 58.318)",
    700: "oklch(55.5% 0.163 48.998)",
    800: "oklch(47.3% 0.137 46.201)",
    900: "oklch(41.4% 0.112 45.904)",
    950: "oklch(27.9% 0.077 45.635)"
  },
  yellow: {
    50: "oklch(98.7% 0.026 102.212)",
    100: "oklch(97.3% 0.071 103.193)",
    200: "oklch(94.5% 0.129 101.54)",
    300: "oklch(90.5% 0.182 98.111)",
    400: "oklch(85.2% 0.199 91.936)",
    500: "oklch(79.5% 0.184 86.047)",
    600: "oklch(68.1% 0.162 75.834)",
    700: "oklch(55.4% 0.135 66.442)",
    800: "oklch(47.6% 0.114 61.907)",
    900: "oklch(42.1% 0.095 57.708)",
    950: "oklch(28.6% 0.066 53.813)"
  },
  lime: {
    50: "oklch(98.6% 0.031 120.757)",
    100: "oklch(96.7% 0.067 122.328)",
    200: "oklch(93.8% 0.127 124.321)",
    300: "oklch(89.7% 0.196 126.665)",
    400: "oklch(84.1% 0.238 128.85)",
    500: "oklch(76.8% 0.233 130.85)",
    600: "oklch(64.8% 0.2 131.684)",
    700: "oklch(53.2% 0.157 131.589)",
    800: "oklch(45.3% 0.124 130.933)",
    900: "oklch(40.5% 0.101 131.063)",
    950: "oklch(27.4% 0.072 132.109)"
  },
  green: {
    50: "oklch(98.2% 0.018 155.826)",
    100: "oklch(96.2% 0.044 156.743)",
    200: "oklch(92.5% 0.084 155.995)",
    300: "oklch(87.1% 0.15 154.449)",
    400: "oklch(79.2% 0.209 151.711)",
    500: "oklch(72.3% 0.219 149.579)",
    600: "oklch(62.7% 0.194 149.214)",
    700: "oklch(52.7% 0.154 150.069)",
    800: "oklch(44.8% 0.119 151.328)",
    900: "oklch(39.3% 0.095 152.535)",
    950: "oklch(26.6% 0.065 152.934)"
  },
  emerald: {
    50: "oklch(97.9% 0.021 166.113)",
    100: "oklch(95% 0.052 163.051)",
    200: "oklch(90.5% 0.093 164.15)",
    300: "oklch(84.5% 0.143 164.978)",
    400: "oklch(76.5% 0.177 163.223)",
    500: "oklch(69.6% 0.17 162.48)",
    600: "oklch(59.6% 0.145 163.225)",
    700: "oklch(50.8% 0.118 165.612)",
    800: "oklch(43.2% 0.095 166.913)",
    900: "oklch(37.8% 0.077 168.94)",
    950: "oklch(26.2% 0.051 172.552)"
  },
  teal: {
    50: "oklch(98.4% 0.014 180.72)",
    100: "oklch(95.3% 0.051 180.801)",
    200: "oklch(91% 0.096 180.426)",
    300: "oklch(85.5% 0.138 181.071)",
    400: "oklch(77.7% 0.152 181.912)",
    500: "oklch(70.4% 0.14 182.503)",
    600: "oklch(60% 0.118 184.704)",
    700: "oklch(51.1% 0.096 186.391)",
    800: "oklch(43.7% 0.078 188.216)",
    900: "oklch(38.6% 0.063 188.416)",
    950: "oklch(27.7% 0.046 192.524)"
  },
  cyan: {
    50: "oklch(98.4% 0.019 200.873)",
    100: "oklch(95.6% 0.045 203.388)",
    200: "oklch(91.7% 0.08 205.041)",
    300: "oklch(86.5% 0.127 207.078)",
    400: "oklch(78.9% 0.154 211.53)",
    500: "oklch(71.5% 0.143 215.221)",
    600: "oklch(60.9% 0.126 221.723)",
    700: "oklch(52% 0.105 223.128)",
    800: "oklch(45% 0.085 224.283)",
    900: "oklch(39.8% 0.07 227.392)",
    950: "oklch(30.2% 0.056 229.695)"
  },
  sky: {
    50: "oklch(97.7% 0.013 236.62)",
    100: "oklch(95.1% 0.026 236.824)",
    200: "oklch(90.1% 0.058 230.902)",
    300: "oklch(82.8% 0.111 230.318)",
    400: "oklch(74.6% 0.16 232.661)",
    500: "oklch(68.5% 0.169 237.323)",
    600: "oklch(58.8% 0.158 241.966)",
    700: "oklch(50% 0.134 242.749)",
    800: "oklch(44.3% 0.11 240.79)",
    900: "oklch(39.1% 0.09 240.876)",
    950: "oklch(29.3% 0.066 243.157)"
  },
  blue: {
    50: "oklch(97% 0.014 254.604)",
    100: "oklch(93.2% 0.032 255.585)",
    200: "oklch(88.2% 0.059 254.128)",
    300: "oklch(80.9% 0.105 251.813)",
    400: "oklch(70.7% 0.165 254.624)",
    500: "oklch(62.3% 0.214 259.815)",
    600: "oklch(54.6% 0.245 262.881)",
    700: "oklch(48.8% 0.243 264.376)",
    800: "oklch(42.4% 0.199 265.638)",
    900: "oklch(37.9% 0.146 265.522)",
    950: "oklch(28.2% 0.091 267.935)"
  },
  indigo: {
    50: "oklch(96.2% 0.018 272.314)",
    100: "oklch(93% 0.034 272.788)",
    200: "oklch(87% 0.065 274.039)",
    300: "oklch(78.5% 0.115 274.713)",
    400: "oklch(67.3% 0.182 276.935)",
    500: "oklch(58.5% 0.233 277.117)",
    600: "oklch(51.1% 0.262 276.966)",
    700: "oklch(45.7% 0.24 277.023)",
    800: "oklch(39.8% 0.195 277.366)",
    900: "oklch(35.9% 0.144 278.697)",
    950: "oklch(25.7% 0.09 281.288)"
  },
  violet: {
    50: "oklch(96.9% 0.016 293.756)",
    100: "oklch(94.3% 0.029 294.588)",
    200: "oklch(89.4% 0.057 293.283)",
    300: "oklch(81.1% 0.111 293.571)",
    400: "oklch(70.2% 0.183 293.541)",
    500: "oklch(60.6% 0.25 292.717)",
    600: "oklch(54.1% 0.281 293.009)",
    700: "oklch(49.1% 0.27 292.581)",
    800: "oklch(43.2% 0.232 292.759)",
    900: "oklch(38% 0.189 293.745)",
    950: "oklch(28.3% 0.141 291.089)"
  },
  purple: {
    50: "oklch(97.7% 0.014 308.299)",
    100: "oklch(94.6% 0.033 307.174)",
    200: "oklch(90.2% 0.063 306.703)",
    300: "oklch(82.7% 0.119 306.383)",
    400: "oklch(71.4% 0.203 305.504)",
    500: "oklch(62.7% 0.265 303.9)",
    600: "oklch(55.8% 0.288 302.321)",
    700: "oklch(49.6% 0.265 301.924)",
    800: "oklch(43.8% 0.218 303.724)",
    900: "oklch(38.1% 0.176 304.987)",
    950: "oklch(29.1% 0.149 302.717)"
  },
  fuchsia: {
    50: "oklch(97.7% 0.017 320.058)",
    100: "oklch(95.2% 0.037 318.852)",
    200: "oklch(90.3% 0.076 319.62)",
    300: "oklch(83.3% 0.145 321.434)",
    400: "oklch(74% 0.238 322.16)",
    500: "oklch(66.7% 0.295 322.15)",
    600: "oklch(59.1% 0.293 322.896)",
    700: "oklch(51.8% 0.253 323.949)",
    800: "oklch(45.2% 0.211 324.591)",
    900: "oklch(40.1% 0.17 325.612)",
    950: "oklch(29.3% 0.136 325.661)"
  },
  pink: {
    50: "oklch(97.1% 0.014 343.198)",
    100: "oklch(94.8% 0.028 342.258)",
    200: "oklch(89.9% 0.061 343.231)",
    300: "oklch(82.3% 0.12 346.018)",
    400: "oklch(71.8% 0.202 349.761)",
    500: "oklch(65.6% 0.241 354.308)",
    600: "oklch(59.2% 0.249 0.584)",
    700: "oklch(52.5% 0.223 3.958)",
    800: "oklch(45.9% 0.187 3.815)",
    900: "oklch(40.8% 0.153 2.432)",
    950: "oklch(28.4% 0.109 3.907)"
  },
  rose: {
    50: "oklch(96.9% 0.015 12.422)",
    100: "oklch(94.1% 0.03 12.58)",
    200: "oklch(89.2% 0.058 10.001)",
    300: "oklch(81% 0.117 11.638)",
    400: "oklch(71.2% 0.194 13.428)",
    500: "oklch(64.5% 0.246 16.439)",
    600: "oklch(58.6% 0.253 17.585)",
    700: "oklch(51.4% 0.222 16.935)",
    800: "oklch(45.5% 0.188 13.697)",
    900: "oklch(41% 0.159 10.272)",
    950: "oklch(27.1% 0.105 12.094)"
  }
};
function lr(r) {
  const e = r.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)/);
  if (!e) return null;
  const [t, a, n, o] = e.map(Number);
  return { lightness: a, chroma: n, hue: o };
}
function ss(r) {
  r = r.replace(/^#/, ""), r.length === 3 && (r = r.split("").map((n) => n + n).join(""));
  const e = parseInt(r.slice(0, 2), 16), t = parseInt(r.slice(2, 4), 16), a = parseInt(r.slice(4, 6), 16);
  return {
    r: e / 255,
    g: t / 255,
    b: a / 255
  };
}
function is(r) {
  const e = r.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
  if (e) {
    const [a, n, o, l] = e.map(Number);
    return {
      r: Math.max(0, Math.min(255, n)) / 255,
      g: Math.max(0, Math.min(255, o)) / 255,
      b: Math.max(0, Math.min(255, l)) / 255
    };
  }
  const t = r.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9]*\.?[0-9]+)\s*\)$/);
  if (t) {
    const [a, n, o, l] = t.map(Number);
    return {
      r: Math.max(0, Math.min(255, n)) / 255,
      g: Math.max(0, Math.min(255, o)) / 255,
      b: Math.max(0, Math.min(255, l)) / 255
    };
  }
  return null;
}
function Ur(r) {
  const { r: e, g: t, b: a } = r, n = e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4), o = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), l = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), s = 0.4124 * n + 0.3576 * o + 0.1805 * l, u = 0.2126 * n + 0.7152 * o + 0.0722 * l, i = 0.0193 * n + 0.1192 * o + 0.9505 * l, m = 0.95047, y = 1, v = 1.08883, w = s > 8856e-6 ? Math.pow(s / m, 1 / 3) : 7.787 * s / m + 16 / 116, x = u > 8856e-6 ? Math.pow(u / y, 1 / 3) : 7.787 * u / y + 16 / 116, f = i > 8856e-6 ? Math.pow(i / v, 1 / 3) : 7.787 * i / v + 16 / 116, $ = 116 * x - 16, c = 500 * (w - x), S = 200 * (x - f);
  return { l: $, a: c, b: S };
}
function zr(r) {
  const { l: e, a: t, b: a } = r, n = Math.sqrt(t * t + a * a);
  let o = Math.atan2(a, t) * 180 / Math.PI;
  return o < 0 && (o += 360), { l: e, c: n, h: o };
}
function us(r) {
  const e = ss(r), t = Ur(e), a = zr(t);
  let n = a.h;
  return n > 0 && n < 60 && (n = n * 0.7), {
    lightness: a.l,
    chroma: Math.min(a.c / 150, 0.4),
    hue: n
  };
}
function cs(r) {
  const e = Ur(r), t = zr(e);
  let a = t.h;
  return a > 0 && a < 60 && (a = a * 0.7), {
    lightness: t.l,
    chroma: Math.min(t.c / 150, 0.4),
    hue: a
  };
}
function ds(r, e) {
  const t = Math.min(
    Math.abs(r.hue - e.hue),
    360 - Math.abs(r.hue - e.hue)
  ), a = t > 60 ? 30 : 5;
  return Math.sqrt(
    Math.pow((r.lightness - e.lightness) * 1.5, 2) + Math.pow((r.chroma - e.chroma) * 2, 2) + Math.pow(t / 360 * a, 2) * 100
  );
}
function fs(r) {
  return r.startsWith("oklch(");
}
function ms(r) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(r);
}
function hs(r) {
  return r in Ya;
}
function vs(r) {
  return r.startsWith("rgb(") || r.startsWith("rgba(");
}
function sr(r) {
  const e = "violet";
  if (hs(r))
    return r;
  let t = null;
  if (fs(r))
    t = lr(r);
  else if (ms(r))
    t = us(r);
  else if (vs(r)) {
    const o = is(r);
    o && (t = cs(o));
  }
  if (!t) return e;
  let a = e, n = 1 / 0;
  for (const [o, l] of Object.entries(Ya))
    for (const s of ["300", "400", "500", "600", "700"]) {
      const u = l[s];
      if (!u) continue;
      const i = lr(u);
      if (!i) continue;
      const m = ds(t, i);
      m < n && (n = m, a = o);
    }
  return a;
}
function ps(r) {
  return Ya[r] || {};
}
var gs = class {
  constructor() {
    Se(this, "instances", /* @__PURE__ */ new Map());
    Se(this, "mediaQuery", null);
    Se(this, "listeners", /* @__PURE__ */ new Map());
    this.initializeSystemPreference();
  }
  /**
   * 初始化系統偏好檢測
   */
  initializeSystemPreference() {
    typeof window < "u" && window.matchMedia && (this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)"), this.mediaQuery.addEventListener("change", this.handleSystemThemeChange.bind(this)));
  }
  /**
   * 處理系統主題變化
   */
  handleSystemThemeChange(e) {
    const t = e.matches ? "dark" : "light";
    this.instances.forEach((a, n) => {
      a.systemPreference = t, a.userPreference === "auto" && this.updateCurrentMode(n);
    });
  }
  /**
   * 獲取當前系統偏好
   */
  getSystemPreference() {
    return this.mediaQuery && this.mediaQuery.matches ? "dark" : "light";
  }
  /**
   * 創建新的主題實例
   */
  createInstance(e, t = {}) {
    const a = e || this.generateInstanceId(), n = {
      currentMode: "light",
      userPreference: t.defaultMode || "auto",
      systemPreference: this.getSystemPreference(),
      color: sr(t.defaultColor || "violet"),
      instanceId: a
    };
    return this.instances.set(a, n), this.listeners.set(a, []), this.updateCurrentMode(a), typeof document < "u" && setTimeout(() => {
      this.applyColorToDOM(a), this.applyModeToDOM(a);
    }, 0), a;
  }
  /**
   * 銷毀主題實例
   */
  destroyInstance(e) {
    this.instances.delete(e), this.listeners.delete(e);
  }
  /**
   * 生成實例 ID
   */
  generateInstanceId() {
    return `vdt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  /**
   * 更新當前模式
   */
  updateCurrentMode(e) {
    const t = this.instances.get(e);
    if (!t) return;
    const a = t.currentMode;
    t.userPreference === "auto" ? t.currentMode = t.systemPreference : t.currentMode = t.userPreference, a !== t.currentMode && (this.applyModeToDOM(e), this.notifyListeners(e));
  }
  /**
   * 應用模式到特定的 DOM 元素
   */
  applyModeToDOM(e) {
    if (typeof document > "u") return;
    const t = this.instances.get(e);
    if (!t) return;
    const a = document.querySelector(`[data-vdt-instance="${e}"]`);
    if (!a) {
      setTimeout(() => this.applyModeToDOM(e), 10);
      return;
    }
    t.userPreference === "auto" ? a.removeAttribute("data-vdt-mode") : a.setAttribute("data-vdt-mode", t.currentMode);
  }
  /**
   * 應用顏色到特定的 DOM 元素
   */
  applyColorToDOM(e) {
    if (typeof document > "u") return;
    const t = this.instances.get(e);
    if (!t) return;
    const a = document.querySelector(`[data-vdt-instance="${e}"]`);
    if (!a) {
      setTimeout(() => this.applyColorToDOM(e), 10);
      return;
    }
    const n = ps(t.color);
    this.checkForUserOverride(a, n) ? Object.keys(n).forEach((l) => {
      a.style.removeProperty(`--color-vdt-theme-${l}`);
    }) : Object.entries(n).forEach(([l, s]) => {
      a.style.setProperty(`--color-vdt-theme-${l}`, s);
    });
  }
  /**
   * 檢查用戶是否有 CSS 覆蓋
   */
  checkForUserOverride(e, t) {
    const a = {};
    Object.keys(t).forEach((y) => {
      const v = `--color-vdt-theme-${y}`;
      a[v] = e.style.getPropertyValue(v), e.style.removeProperty(v);
    });
    const o = getComputedStyle(e).getPropertyValue("--color-vdt-theme-500").trim();
    if (Object.entries(a).forEach(([y, v]) => {
      v && e.style.setProperty(y, v);
    }), !o) return false;
    const l = "oklch(60.6% 0.25 292.717)", s = t[500], u = this.isOklchEqual(o, l), i = this.isOklchEqual(o, s);
    return !u && !i;
  }
  /**
   * 解析 OKLCH 值為數值以便比較
   */
  parseOklchForComparison(e) {
    const t = e.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)\s*\)/);
    return t ? {
      l: parseFloat(t[1]),
      c: parseFloat(t[2]),
      h: parseFloat(t[3])
    } : null;
  }
  /**
   * 比較兩個 OKLCH 顏色是否相等（容許小數點誤差）
   */
  isOklchEqual(e, t, a = 1e-3) {
    const n = this.parseOklchForComparison(e), o = this.parseOklchForComparison(t);
    return !n || !o ? e.trim() === t.trim() : Math.abs(n.l - o.l) < a && Math.abs(n.c - o.c) < a && Math.abs(n.h - o.h) < a;
  }
  /**
   * 通知監聽器
   */
  notifyListeners(e) {
    const t = this.instances.get(e), a = this.listeners.get(e);
    t && a && a.forEach((n) => n({ ...t }));
  }
  /**
   * 設置主題模式
   */
  setMode(e, t) {
    const a = this.instances.get(e);
    a && (a.userPreference = t, this.updateCurrentMode(e));
  }
  /**
   * 設置主題顏色
   */
  setColor(e, t) {
    const a = this.instances.get(e);
    if (!a) return;
    const n = sr(t);
    a.color = n, this.applyColorToDOM(e), this.notifyListeners(e);
  }
  /**
   * 獲取實例狀態
   */
  getState(e) {
    const t = this.instances.get(e);
    return t ? { ...t } : null;
  }
  /**
   * 獲取主題類別（用於組件）
   */
  getThemeClasses(e) {
    const t = this.instances.get(e);
    return t ? {
      // 穩定的通用類名
      "vdt-datepicker": true,
      "vdt-themed": true,
      // 主題色相關類名
      [`vdt-theme-${t.color}`]: true,
      // 模式相關類名
      [`vdt-mode-${t.currentMode}`]: true,
      "vdt-mode-auto": t.userPreference === "auto",
      // 實例相關（用於調試，但不應用於 CSS）
      [`vdt-instance-${e}`]: true
    } : {};
  }
  /**
   * 獲取容器屬性
   */
  getContainerAttributes(e) {
    const t = this.instances.get(e);
    if (!t) return {};
    const a = {
      "data-vdt-instance": e,
      "data-vdt-theme": t.color,
      "data-vdt-mode-preference": t.userPreference
    };
    return t.userPreference !== "auto" && (a["data-vdt-mode"] = t.currentMode), a;
  }
  /**
   * 強制重新應用主題（用於調試或強制刷新）
   */
  reapplyTheme(e) {
    this.applyColorToDOM(e), this.applyModeToDOM(e);
  }
  /**
   * 添加監聽器
   */
  addListener(e, t) {
    const a = this.listeners.get(e);
    return a ? (a.push(t), () => {
      const n = a.indexOf(t);
      n > -1 && a.splice(n, 1);
    }) : () => {
    };
  }
  /**
   * 銷毀管理器
   */
  destroy() {
    this.mediaQuery && this.mediaQuery.removeEventListener("change", this.handleSystemThemeChange.bind(this)), this.instances.clear(), this.listeners.clear();
  }
};
var Le = new gs();
function Wr(r = {}) {
  const e = ref(
    Le.createInstance(r.instanceId, {
      defaultColor: r.defaultColor,
      defaultMode: r.defaultMode
    })
  ), t = ref(
    Le.getState(e.value)
  );
  let a = null;
  const n = computed(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.currentMode) === "dark";
  }), o = computed(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.currentMode) === "light";
  }), l = computed(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.userPreference) === "auto";
  }), s = computed(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.currentMode) || "light";
  }), u = computed(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.userPreference) || "auto";
  }), i = computed(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.systemPreference) || "light";
  }), m = computed(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.color) || "violet";
  }), y = computed(() => e.value ? Le.getThemeClasses(e.value) : {}), v = computed(() => e.value ? Le.getContainerAttributes(e.value) : {}), w = (c) => {
    e.value && Le.setColor(e.value, c);
  }, x = (c) => {
    e.value && Le.setMode(e.value, c);
  }, f = () => {
    if (t.value)
      if (t.value.userPreference === "auto") {
        const c = t.value.currentMode === "light" ? "dark" : "light";
        x(c);
      } else {
        const c = t.value.currentMode === "light" ? "dark" : "light";
        x(c);
      }
  }, $ = computed(() => typeof window > "u" ? false : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches !== void 0);
  return onMounted(async () => {
    await nextTick(), t.value = Le.getState(e.value), a = Le.addListener(e.value, (c) => {
      t.value = c;
    }), setTimeout(() => {
      Le.reapplyTheme(e.value);
    }, 10);
  }), onBeforeUnmount(() => {
    a && a(), e.value && Le.destroyInstance(e.value);
  }), {
    // 響應式狀態
    instanceId: e,
    themeState: t,
    isDark: n,
    isLight: o,
    isAuto: l,
    currentMode: s,
    userPreference: u,
    systemPreference: i,
    currentColor: m,
    themeClasses: y,
    containerAttributes: v,
    supportsColorScheme: $,
    // 主要方法
    setColor: w,
    setMode: x,
    toggle: f,
    // 便利方法 - 模式設置
    setLightMode: () => x("light"),
    setDarkMode: () => x("dark"),
    setAutoMode: () => x("auto"),
    // 便利方法 - 常用顏色設置
    setRedTheme: () => w("red"),
    setBlueTheme: () => w("blue"),
    setGreenTheme: () => w("green"),
    setVioletTheme: () => w("violet"),
    setPurpleTheme: () => w("purple"),
    setIndigoTheme: () => w("indigo"),
    setTealTheme: () => w("teal"),
    setCyanTheme: () => w("cyan"),
    setSkyTheme: () => w("sky"),
    setEmeraldTheme: () => w("emerald")
  };
}
var ys = { key: 0 };
var $s = {
  key: 0,
  class: "date-placeholder text-vdt-content truncate"
};
var Ds = {
  key: 1,
  class: "date-placeholder text-vdt-content-muted truncate"
};
var bs = ["disabled"];
var Ms = { key: 0 };
var ir = defineComponent({
  __name: "DatePicker",
  props: {
    modelValue: { default: null },
    customDefaultTime: {},
    autoFocusTimeAfterDate: { type: Boolean, default: true },
    placeholderOverrides: { default: () => ({}) },
    mode: { default: "auto" },
    theme: { default: () => "violet" },
    calendar: { default: "gregory" },
    locale: { default: "zh-TW" },
    customLocaleMessages: { default: void 0 },
    outputType: { default: "iso" },
    useStrictISO: { type: Boolean, default: false },
    weekStartsOn: { default: 0 },
    minDate: {},
    maxDate: {},
    dateSeparator: { default: "-" },
    dateFormat: { default: "YYYY-MM-DD" },
    timeFormat: {},
    showTime: { type: Boolean, default: false },
    enableSeconds: { type: Boolean, default: true },
    use24Hour: { type: Boolean, default: true },
    useLocalizedPeriod: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    inputEnabled: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    showClearButton: { type: Boolean, default: true },
    showErrorMessage: { type: Boolean, default: true },
    useI18n: { type: Boolean, default: true },
    customErrorMessages: { default: () => ({}) }
  },
  emits: ["update:modelValue", "change", "validation"],
  setup(r, { expose: e, emit: t }) {
    const a = r, { setLocale: n, getPlaceholderMessage: o } = wt(
      a.locale,
      a.customLocaleMessages
    ), l = t, s = useSlots(), u = computed(() => {
      const Y = {};
      return ["no-years-display", "month-selector"].forEach((Z) => {
        s[Z] && (Y[Z] = s[Z]);
      }), Object.keys(s).forEach((Z) => {
        Z.startsWith("year-") && (Y[Z] = s[Z]);
      }), Y;
    }), i = ref(null), m = ref(null), y = ref(null), v = ref(null), w = computed(() => a.timeFormat ? a.timeFormat : a.enableSeconds ? a.use24Hour ? "HH:mm:ss" : "hh:mm:ss A" : a.use24Hour ? "HH:mm" : "hh:mm A"), x = ref(a.dateFormat), f = ref(w.value), $ = ref({}), c = ls(
      {
        modelValue: a.modelValue,
        showTime: a.showTime,
        required: a.required,
        disabled: a.disabled,
        calendar: toRef(a, "calendar"),
        dateFormat: x.value,
        timeFormat: f.value,
        outputType: toRef(a, "outputType"),
        useStrictISO: a.useStrictISO,
        customDefaultTime: a.customDefaultTime,
        enableSeconds: a.enableSeconds,
        autoFocusTimeAfterDate: a.autoFocusTimeAfterDate,
        minDate: a.minDate,
        maxDate: a.maxDate,
        locale: toRef(a, "locale")
      },
      {
        containerRef: i,
        calendarRef: m,
        dateInputRef: y,
        timeInputRef: v
      }
    );
    c.setEmitters({
      update: (Y) => l("update:modelValue", Y),
      change: (Y) => l("change", Y),
      validation: (Y, Z, re) => l("validation", Y, Z, re)
    });
    const {
      themeClasses: S,
      containerAttributes: k,
      setColor: g,
      setMode: b,
      currentMode: D,
      isDark: d,
      isLight: p
    } = Wr(), h = computed(() => {
      const Y = ge(a.minDate, a.locale);
      return Oe(Y);
    }), A = computed(() => {
      const Y = ge(a.maxDate, a.locale);
      return Oe(Y);
    }), U = computed(() => x.value), K = computed(() => a.calendar === "gregory"), W = computed(() => !!(M.value && M.value.trim())), X = computed(() => {
      var Z, re, oe, Te, se, xe, He;
      a.locale;
      const Y = {
        selectDate: o("general.selectDate"),
        year: o("date.year"),
        month: o("date.month"),
        day: o("date.day"),
        hour: o("time.hour"),
        minute: o("time.minute"),
        second: o("time.second")
      };
      return {
        selectDate: ((Z = a.placeholderOverrides) == null ? void 0 : Z.selectDate) || Y.selectDate,
        // 時間相關
        hour: ((re = a.placeholderOverrides) == null ? void 0 : re.hour) || Y.hour,
        minute: ((oe = a.placeholderOverrides) == null ? void 0 : oe.minute) || Y.minute,
        second: ((Te = a.placeholderOverrides) == null ? void 0 : Te.second) || Y.second,
        // 日期相關
        year: ((se = a.placeholderOverrides) == null ? void 0 : se.year) || Y.year,
        month: ((xe = a.placeholderOverrides) == null ? void 0 : xe.month) || Y.month,
        day: ((He = a.placeholderOverrides) == null ? void 0 : He.day) || Y.day
      };
    }), Q = computed(() => ({
      ...c.mergedErrors.value,
      ...$.value
    })), O = computed(() => {
      var oe;
      const re = {
        ...((oe = c.mergedErrorParams) == null ? void 0 : oe.value) || {},
        ...{}
      };
      return Object.keys(re).length > 0 ? re : {};
    }), E = computed(() => Object.keys(Q.value).length > 0);
    onBeforeMount(() => {
      if (!Vr(a.dateFormat) && a.calendar === "gregory") {
        const Y = a.dateFormat, Z = xo(a.dateFormat);
        $.value.dateFormat = "format.invalid", console.warn(`日期格式 "${Y}" 不正確，已自動修復為 "${Z}"`), x.value = Z;
      }
      if (a.showTime && !fa(f.value)) {
        const Y = f.value, Z = Yo(f.value);
        if (fa(Z))
          $.value.timeFormat = "format.invalid", console.warn(`時間格式 "${Y}" 不正確，已自動修復為 "${Z}"`), f.value = Z;
        else {
          const re = w.value;
          $.value.timeFormat = "format.invalid", console.warn(`時間格式 "${Y}" 不正確，已使用預設格式 "${re}"`), f.value = re;
        }
      }
    }), watch(() => a.theme, (Y) => {
      Y && g(Y);
    }, { immediate: true }), watch(() => a.mode, (Y) => {
      b(Y);
    }, { immediate: true }), watch(() => a.locale, (Y) => {
      Y && n(Y, a.customLocaleMessages);
    }, { immediate: true }), watch(() => a.customLocaleMessages, (Y) => {
      Y && a.locale && n(a.locale, Y);
    }), watch([() => a.enableSeconds, () => a.use24Hour, () => a.timeFormat], () => {
      a.timeFormat || (f.value = w.value);
    }, { immediate: true }), watch(() => a.calendar, (Y) => {
      he.isCalendarSupported(Y) ? delete $.value.calendar : $.value.calendar = "calendar.unsupported";
    }, { immediate: true }), e({
      // 基本操作
      focus: c.focus,
      reset: c.reset,
      validate: c.validate,
      selectNow: c.selectNow,
      // 數據獲取
      getDateTime: () => c.internalDateTime.value,
      setDateTime: (Y) => {
        c.setExternalValue(Y);
      },
      // 主題控制
      setTheme: g,
      setDarkMode: () => b("dark"),
      setLightMode: () => b("light"),
      setAutoMode: () => b("auto"),
      getCurrentMode: () => D.value,
      isDarkMode: () => d.value,
      isLightMode: () => p.value,
      // 錯誤相關
      getErrors: () => Q.value,
      hasErrors: () => E.value
    });
    const {
      // 狀態
      inputDateValue: M,
      inputTimeValue: L,
      showCalendar: H,
      internalDateTime: te,
      calendarMinDate: ce,
      calendarMaxDate: le,
      getValidDefaultTime: R,
      hasValue: T,
      // 事件處理
      validateDateInput: N,
      validateTimeInput: ee,
      handleDateComplete: J,
      handleTimeComplete: F,
      handleCalendarSelect: _,
      handleTimeSelect: ae,
      handleContainerClick: pe,
      handleContainerMouseDown: De,
      handleNavigateToDate: Me,
      // 日曆控制
      toggleCalendar: be,
      // 清除功能
      reset: P
    } = c;
    return (Y, Z) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", mergeProps({
        class: ["date-picker-wrapper relative w-full", [unref(S), Y.showTime ? "min-w-[300px]" : "min-w-[150px]"]]
      }, unref(k), {
        ref_key: "containerRef",
        ref: i
      }), [
        createBaseVNode("div", {
          class: normalizeClass(["date-picker-container flex w-full items-center px-2 py-1 bg-vdt-surface text-vdt-content rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": E.value }]])
        }, [
          K.value && Y.inputEnabled ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["flex w-full items-center justify-start gap-2", [Y.disabled ? "cursor-not-allowed cursor-event-none opacity-50" : ""]]),
            onClick: Z[2] || (Z[2] = withModifiers(
              //@ts-ignore
              (...re) => unref(pe) && unref(pe)(...re),
              ["stop"]
            )),
            onMousedown: Z[3] || (Z[3] = //@ts-ignore
            (...re) => unref(De) && unref(De)(...re))
          }, [
            createBaseVNode("div", null, [
              createVNode(ha, {
                ref_key: "dateInputRef",
                ref: y,
                modelValue: unref(M),
                "onUpdate:modelValue": Z[0] || (Z[0] = (re) => isRef(M) ? M.value = re : null),
                "year-placeholder": X.value.year,
                "month-placeholder": X.value.month,
                "day-placeholder": X.value.day,
                "min-date": h.value,
                "max-date": A.value,
                required: Y.required,
                separator: Y.dateSeparator,
                "date-format": U.value,
                onValidation: unref(N),
                onComplete: unref(J)
              }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "required", "separator", "date-format", "onValidation", "onComplete"])
            ]),
            Y.showTime ? (openBlock(), createElementBlock("div", ys, [
              createVNode(va, {
                ref_key: "timeInputRef",
                ref: v,
                modelValue: unref(L),
                "onUpdate:modelValue": Z[1] || (Z[1] = (re) => isRef(L) ? L.value = re : null),
                "hour-placeholder": X.value.hour,
                "minute-placeholder": X.value.minute,
                "second-placeholder": X.value.second,
                "enable-seconds": Y.enableSeconds,
                use24Hour: Y.use24Hour,
                required: Y.required,
                locale: Y.locale,
                useLocalizedPeriod: Y.useLocalizedPeriod,
                onValidation: unref(ee),
                onComplete: unref(F),
                onNavigateToDate: unref(Me)
              }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "required", "locale", "useLocalizedPeriod", "onValidation", "onComplete", "onNavigateToDate"])
            ])) : createCommentVNode("", true)
          ], 34)) : (openBlock(), createElementBlock("button", {
            key: 1,
            type: "button",
            class: normalizeClass(["flex w-full h-full items-center justify-start gap-1", {
              "cursor-not-allowed opacity-50": Y.disabled
            }]),
            onClick: Z[4] || (Z[4] = withModifiers((re) => {
              var oe;
              return !Y.disabled && ((oe = unref(be)) == null ? void 0 : oe());
            }, ["stop"])),
            onKeydown: [
              Z[5] || (Z[5] = withKeys(withModifiers((re) => {
                var oe;
                return !Y.disabled && ((oe = unref(be)) == null ? void 0 : oe());
              }, ["prevent"]), ["enter"])),
              Z[6] || (Z[6] = withKeys(withModifiers((re) => {
                var oe;
                return !Y.disabled && ((oe = unref(be)) == null ? void 0 : oe());
              }, ["prevent"]), ["space"]))
            ]
          }, [
            W.value ? (openBlock(), createElementBlock("span", $s, toDisplayString(Y.modelValue), 1)) : (openBlock(), createElementBlock("span", Ds, toDisplayString(X.value.selectDate), 1))
          ], 34)),
          createBaseVNode("div", {
            class: normalizeClass(["date-picker-icon-container relative group cursor-pointer", { "cursor-not-allowed": Y.disabled }])
          }, [
            createBaseVNode("button", {
              type: "button",
              class: normalizeClass(["date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed", { "group-hover:opacity-0": unref(T) && !Y.disabled && Y.showClearButton }]),
              disabled: Y.disabled,
              "aria-label": "開啟日曆",
              onClick: Z[7] || (Z[7] = withModifiers((re) => {
                var oe;
                return (oe = unref(be)) == null ? void 0 : oe();
              }, ["stop", "prevent"]))
            }, [
              createVNode(Lr, { class: "h-5 w-5" })
            ], 10, bs),
            unref(T) && !Y.disabled && Y.showClearButton ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100",
              "aria-label": "清除日期",
              onClick: Z[8] || (Z[8] = withModifiers(
                //@ts-ignore
                (...re) => unref(P) && unref(P)(...re),
                ["stop", "prevent"]
              ))
            }, [
              createVNode(qr, { class: "h-4 w-4" })
            ])) : createCommentVNode("", true)
          ], 2)
        ], 2),
        unref(H) && !Y.disabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref_key: "calendarRef",
          ref: m,
          class: "calendar-container absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10",
          onClick: Z[9] || (Z[9] = withModifiers(() => {
          }, ["stop"])),
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "date-picker"
        }, [
          createVNode(pa, {
            value: unref(te),
            weekStartsOn: Y.weekStartsOn,
            "min-date": unref(ce),
            "max-date": unref(le),
            showTimeSelector: Y.showTime,
            "time-value": unref(L),
            use24Hour: Y.use24Hour,
            "default-time": unref(R),
            enableSeconds: Y.enableSeconds,
            locale: Y.locale,
            calendar: Y.calendar,
            onSelect: unref(_),
            onTimeSelect: unref(ae)
          }, createSlots({ _: 2 }, [
            renderList(u.value, (re, oe) => ({
              name: oe,
              fn: withCtx((Te) => [
                renderSlot(Y.$slots, oe, normalizeProps(guardReactiveProps(Te)))
              ])
            }))
          ]), 1032, ["value", "weekStartsOn", "min-date", "max-date", "showTimeSelector", "time-value", "use24Hour", "default-time", "enableSeconds", "locale", "calendar", "onSelect", "onTimeSelect"])
        ], 512)) : createCommentVNode("", true)
      ], 16),
      Y.showErrorMessage && E.value ? (openBlock(), createElementBlock("div", Ms, [
        renderSlot(Y.$slots, "error", {
          errors: Q.value,
          errorParams: O.value,
          hasErrors: E.value
        }, () => [
          createVNode(Ar, {
            errors: Q.value,
            locale: Y.locale,
            "use-i18n": Y.useI18n,
            "custom-messages": Y.customErrorMessages,
            errorParams: O.value
          }, createSlots({ _: 2 }, [
            renderList(Y.$slots, (re, oe) => ({
              name: oe,
              fn: withCtx((Te) => [
                renderSlot(Y.$slots, oe, normalizeProps(guardReactiveProps(Te)))
              ])
            }))
          ]), 1032, ["errors", "locale", "use-i18n", "custom-messages", "errorParams"])
        ])
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Ss = {
  key: 0,
  class: "calendar-container flex-1 md:min-w-[275px] min-w-auto"
};
var ws = defineComponent({
  __name: "RangeCalendar",
  props: {
    rangeStart: { default: null },
    rangeEnd: { default: null },
    minDate: { default: null },
    maxDate: { default: null },
    locale: { default: "zh-TW" },
    weekStartsOn: { default: 0 },
    calendar: { default: "gregory" },
    showTimeSelector: { type: Boolean, default: false },
    startTimeValue: { default: null },
    endTimeValue: { default: null },
    enableSeconds: { type: Boolean, default: true },
    use24Hour: { type: Boolean, default: true },
    monthDisplayMode: { default: "dual" },
    initialYear: { default: () => ot().year },
    initialMonth: { default: () => ot().month }
  },
  emits: ["range-select", "time-select"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, o = ref({
      isSelecting: false,
      tempStart: null,
      activeTimeTarget: "start"
    }), l = () => {
      if (a.rangeStart)
        return { year: a.rangeStart.year, month: a.rangeStart.month };
      if (a.initialYear && a.initialMonth)
        return { year: a.initialYear, month: a.initialMonth };
      const g = ot();
      return { year: g.year, month: g.month };
    }, { year: s, month: u } = l(), i = ref(s), m = ref(u), y = computed(() => m.value === 12 ? i.value + 1 : i.value), v = computed(() => m.value === 12 ? 1 : m.value + 1), w = computed(() => a.monthDisplayMode === "single" ? o.value.activeTimeTarget === "start" ? a.startTimeValue : a.endTimeValue : a.startTimeValue), x = computed(() => a.endTimeValue), f = computed(() => a.monthDisplayMode === "single" ? o.value.activeTimeTarget : "start");
    watch(() => [a.rangeStart, a.rangeEnd], ([g, b]) => {
      g && !a.initialYear && !a.initialMonth && (i.value = g.year, m.value = g.month), a.monthDisplayMode === "single" ? g && b ? (o.value.isSelecting = false, o.value.tempStart = null, o.value.activeTimeTarget = "start") : g && !b ? (o.value.isSelecting = true, o.value.tempStart = g, o.value.activeTimeTarget = "end") : (o.value.isSelecting = false, o.value.tempStart = null, o.value.activeTimeTarget = "start") : g && b ? (o.value.isSelecting = false, o.value.tempStart = null) : g && !b ? (o.value.isSelecting = true, o.value.tempStart = g) : (o.value.isSelecting = false, o.value.tempStart = null);
    }, { immediate: true, deep: true });
    const $ = (g, b) => {
      if (!g) {
        o.value.isSelecting = false, o.value.tempStart = null, a.monthDisplayMode === "single" && (o.value.activeTimeTarget = "start"), n("range-select", null, null);
        return;
      }
      if (!o.value.isSelecting)
        o.value.isSelecting = true, o.value.tempStart = g, a.monthDisplayMode === "single" && (o.value.activeTimeTarget = "start"), n("range-select", g, null);
      else {
        const D = o.value.tempStart;
        if (D && (g.year !== D.year || g.month !== D.month || g.day !== D.day)) {
          o.value.isSelecting = false, o.value.tempStart = null;
          const d = D.year * 1e4 + D.month * 100 + D.day, p = g.year * 1e4 + g.month * 100 + g.day;
          d <= p ? n("range-select", D, g) : n("range-select", g, D), a.monthDisplayMode === "single" && (o.value.activeTimeTarget = "end");
        } else
          o.value.tempStart = g, a.monthDisplayMode === "single" && (o.value.activeTimeTarget = "start"), n("range-select", g, null);
      }
    }, c = (g, b) => {
      n("time-select", g, b);
    };
    return e({
      // 獲取當前顯示的月份
      getCurrentDisplay: () => a.monthDisplayMode === "single" ? {
        year: i.value,
        month: m.value
      } : {
        left: { year: i.value, month: m.value },
        right: { year: y.value, month: v.value }
      },
      // 設置顯示月份
      setDisplayMonth: (g, b) => {
        i.value = g, m.value = b;
      },
      // 重置範圍選擇狀態
      resetRangeSelection: () => {
        o.value.isSelecting = false, o.value.tempStart = null, a.monthDisplayMode === "single" && (o.value.activeTimeTarget = "start");
      },
      // 獲取當前選擇狀態
      getSelectionState: () => ({
        isSelecting: o.value.isSelecting,
        tempStart: o.value.tempStart,
        activeTimeTarget: o.value.activeTimeTarget
      }),
      // 月份導航
      previousMonth: () => {
        m.value === 1 ? (m.value = 12, i.value -= 1) : m.value -= 1;
      },
      nextMonth: () => {
        m.value === 12 ? (m.value = 1, i.value += 1) : m.value += 1;
      },
      handleRangeSelect: $
    }), (g, b) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["range-calendar", [
        g.monthDisplayMode === "single" ? "single-month" : "dual-month",
        "flex flex-col gap-4",
        g.monthDisplayMode === "dual" ? "min-w-auto md:min-w-[570px] md:flex-row" : "min-w-auto max-w-[300px]",
        "m-1"
      ]])
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["calendar-container flex-1", [
          g.monthDisplayMode === "dual" ? "min-w-auto md:min-w-[275px]" : "min-w-auto"
        ]])
      }, [
        createVNode(pa, {
          "range-start": g.rangeStart,
          "range-end": g.rangeEnd,
          "selection-mode": "range",
          year: i.value,
          month: m.value,
          "min-date": g.minDate,
          "max-date": g.maxDate,
          locale: g.locale,
          "week-starts-on": g.weekStartsOn,
          calendar: g.calendar,
          showTimeSelector: g.showTimeSelector,
          "time-value": w.value,
          "enable-seconds": g.enableSeconds,
          "use24-hour": g.use24Hour,
          onRangeSelect: $,
          onTimeSelect: b[0] || (b[0] = (D) => c(D, f.value))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour"])
      ], 2),
      g.monthDisplayMode === "dual" ? (openBlock(), createElementBlock("div", Ss, [
        createVNode(pa, {
          "range-start": g.rangeStart,
          "range-end": g.rangeEnd,
          "selection-mode": "range",
          year: y.value,
          month: v.value,
          "min-date": g.minDate,
          "max-date": g.maxDate,
          locale: g.locale,
          "week-starts-on": g.weekStartsOn,
          calendar: g.calendar,
          showTimeSelector: g.showTimeSelector,
          "time-value": x.value,
          "enable-seconds": g.enableSeconds,
          "use24-hour": g.use24Hour,
          onRangeSelect: $,
          onTimeSelect: b[1] || (b[1] = (D) => c(D, "end"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour"])
      ])) : createCommentVNode("", true)
    ], 2));
  }
});
var Yt = "00:00:00";
var Ct = "23:59:59";
function ks(r = {}, e) {
  const {
    calendar: t = "gregory",
    modelValue: a = null,
    showTime: n = false,
    required: o = false,
    disabled: l = false,
    incomplete: s = false,
    dateFormat: u = "YYYY-MM-DD",
    timeFormat: i = "HH:mm:ss",
    outputType: m = "iso",
    useStrictISO: y = false,
    enableSeconds: v = false,
    minDate: w,
    maxDate: x,
    maxRange: f,
    minRange: $,
    locale: c = "zh-TW"
  } = r, {
    containerRef: S,
    calendarRef: k,
    startDateInputRef: g,
    endDateInputRef: b,
    startTimeInputRef: D,
    endTimeInputRef: d
  } = e, p = ref(l);
  let h = {};
  const A = ya({
    required: o,
    showTime: n,
    minDate: w,
    maxDate: x,
    dateFormat: u
  }), U = ya({
    required: o,
    showTime: n,
    minDate: w,
    maxDate: x,
    dateFormat: u
  }), K = $a({
    showTime: n,
    dateFormat: u,
    timeFormat: i,
    outputType: m,
    defaultTime: Yt,
    enableSeconds: v
  }), W = $a({
    showTime: n,
    dateFormat: u,
    timeFormat: i,
    outputType: m,
    defaultTime: Ct,
    enableSeconds: v
  }), X = Nr(
    S,
    k,
    { disabled: p }
  ), Q = ga(
    { dateInputRef: g, timeInputRef: D },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), O = ga(
    { dateInputRef: b, timeInputRef: d },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), E = computed(
    () => K.hasValue.value || W.hasValue.value
  ), M = computed(() => {
    const I = {
      ...A.mergedErrors.value,
      ...U.mergedErrors.value
    };
    return K.internalDateTime.value && !W.internalDateTime.value && s && (I["range.endRequired"] = "range.endRequired"), I;
  }), L = computed(() => ({
    ...A.mergedErrorParams.value,
    ...U.mergedErrorParams.value
  })), H = computed(() => Object.keys(M.value).length > 0), te = computed(() => {
    const I = K.internalDateTime.value, G = W.internalDateTime.value;
    if (!I || !G || jt(I, G) > 0) return false;
    if (f || $) {
      const ne = nr(I, G);
      if (f && ne > f)
        return U.handleDateValidation(false, {
          range: "range.exceedsMaxRange"
        }, "endDate", {
          range: { maxRange: f, actualDays: ne }
        }), false;
      if ($ && ne < $)
        return U.handleDateValidation(false, {
          range: "range.belowMinRange"
        }, "endDate", {
          range: { minRange: $, actualDays: ne }
        }), false;
      U.clearFieldErrors("range");
    }
    return !H.value;
  }), ce = computed(() => [
    {
      label: "今天",
      getValue: () => {
        const I = tt();
        return {
          start: ze(I.year, I.month, I.day, 0, 0, 0),
          end: ze(I.year, I.month, I.day, 23, 59, 59)
        };
      }
    },
    {
      label: "最近7天",
      getValue: () => ({
        start: da(tt(), -6),
        end: tt()
      })
    },
    {
      label: "最近30天",
      getValue: () => ({
        start: da(tt(), -29),
        end: tt()
      })
    },
    {
      label: "本月",
      getValue: ko
    }
  ]), le = computed(() => ({
    minDate: ge(w, c),
    maxDate: W.internalDateTime.value || ge(x, c)
  })), R = computed(() => ({
    minDate: K.internalDateTime.value || ge(w, c),
    maxDate: ge(x, c)
  })), T = computed(() => ({
    minDate: le.value.minDate ? Oe(le.value.minDate, u) : null,
    maxDate: le.value.maxDate ? Oe(le.value.maxDate, u) : null
  })), N = computed(() => ({
    minDate: R.value.minDate ? Oe(R.value.minDate, u) : null,
    maxDate: R.value.maxDate ? Oe(R.value.maxDate, u) : null
  }));
  function ee(I, G) {
    const ne = nr(I, G);
    return f && ne > f ? {
      valid: false,
      error: "range.exceedsMaxRange",
      params: { maxRange: f, actualDays: ne }
    } : $ && ne < $ ? {
      valid: false,
      error: "range.belowMinRange",
      params: { minRange: $, actualDays: ne }
    } : { valid: true };
  }
  function J(I) {
    !I.error || !I.params || U.handleDateValidation(
      false,
      { range: I.error },
      "endDate",
      { range: I.params }
    );
  }
  function F() {
    var Ye, kt, dt, Ca, Ra;
    if (!K.internalDateTime.value || !W.internalDateTime.value) {
      (Ye = h.update) == null || Ye.call(h, null), (kt = h.change) == null || kt.call(h, null);
      return;
    }
    const I = n ? i : void 0, G = {
      start: Wt(
        K.internalDateTime.value,
        m,
        u,
        I,
        n,
        t,
        c,
        y,
        v
      ),
      end: Wt(
        W.internalDateTime.value,
        m,
        u,
        I,
        n,
        t,
        c,
        y,
        v
      )
    };
    (dt = h.update) == null || dt.call(h, G), (Ca = h.change) == null || Ca.call(h, G);
    const ne = te.value && !H.value;
    (Ra = h.validation) == null || Ra.call(h, ne, M.value, L.value);
  }
  function _(I, G) {
    G.forEach((ne) => I.clearFieldErrors(ne));
  }
  const ae = (I) => {
    h = I;
  }, pe = (I, G, ne, Ye, kt) => {
    var dt;
    ne.handleDateValidation(I, G, Ye, kt), (dt = h.validation) == null || dt.call(h, !H.value, M.value, L.value);
  }, De = (I, G, ne) => {
    pe(I, G, A, "startDate", ne);
  }, Me = (I, G, ne) => {
    pe(I, G, U, "endDate", ne);
  }, be = (I, G, ne = {}) => {
    var Ye;
    A.handleTimeValidation(I, G, "startTime", ne), (Ye = h.validation) == null || Ye.call(h, !H.value, M.value);
  }, P = (I, G, ne = {}) => {
    var Ye;
    U.handleTimeValidation(I, G, "endTime", ne), (Ye = h.validation) == null || Ye.call(h, !H.value, M.value, L.value);
  }, Y = (I) => {
    K.inputDateValue.value = I;
    const G = K.updateFromInputs();
    if (!G) {
      A.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    A.validateDateRange(G) && (Q.autoFocusTimeAfterDateComplete(
      K,
      Yt
    ), F(), _(A, ["startDate", "date.year", "date.month", "date.day"]), n || O.focusFirstInput());
  }, Z = (I) => {
    W.inputDateValue.value = I;
    const G = W.updateFromInputs();
    if (!G) {
      U.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    U.validateDateRange(G) && (O.autoFocusTimeAfterDateComplete(
      W,
      Ct
    ), F(), _(U, ["endDate", "date.year", "date.month", "date.day"]));
  }, re = (I) => {
    K.inputTimeValue.value = I, K.updateFromInputs() && F(), _(A, ["startTime", "time.hour", "time.minute", "time.second"]);
  }, oe = (I) => {
    W.inputTimeValue.value = I, W.updateFromInputs() && F(), _(U, ["endTime", "time.hour", "time.minute", "time.second"]);
  }, Te = (I, G) => {
    I && !G ? se(I) : I && G ? xe(I, G) : Zt(), F();
  };
  function se(I) {
    A.validateDateRange(I) && (K.setInternalDateTime(I), _(A, ["startDate", "date.year", "date.month", "date.day"]), W.clearValues());
  }
  function xe(I, G) {
    if (!(!A.validateDateRange(I) || !U.validateDateRange(G))) {
      if (f || $) {
        const ne = ee(I, G);
        if (!ne.valid) {
          J(ne);
          return;
        }
      }
      K.setInternalDateTime(I), W.setInternalDateTime(G), n && (K.inputTimeValue.value || (K.inputTimeValue.value = Yt, K.updateFromInputs()), W.inputTimeValue.value || (W.inputTimeValue.value = Ct, W.updateFromInputs())), _(A, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]), _(U, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]);
    }
  }
  const He = (I, G) => {
    G === "start" && K.internalDateTime.value && re(I), G === "end" && W.internalDateTime.value && oe(I);
  }, jr = (I) => {
    const G = I.getValue();
    K.setInternalDateTime(G.start), W.setInternalDateTime(G.end), n && (K.inputTimeValue.value || (K.inputTimeValue.value = Yt, K.updateFromInputs()), W.inputTimeValue.value || (W.inputTimeValue.value = Ct, W.updateFromInputs())), F();
  }, Zt = () => {
    K.clearValues(), W.clearValues(), A.clearAllErrors(), U.clearAllErrors(), F();
  }, Jr = (I) => {
    I ? (K.setExternalValue(I.start), W.setExternalValue(I.end)) : Zt(), F();
  }, _r = () => {
    var I, G, ne, Ye;
    return (I = g.value) == null || I.validate(), (G = b.value) == null || G.validate(), n && ((ne = D.value) == null || ne.validate(), (Ye = d.value) == null || Ye.validate()), te.value;
  }, Kr = (I) => {
    X.handleContainerClick(I, () => {
      Q.focusFirstInput();
    });
  }, Qr = (I) => {
    X.handleContainerClick(I, () => {
      O.focusFirstInput();
    });
  };
  return watch(() => a, (I) => {
    if (I && (I.start || I.end)) {
      const G = I.start ? ge(I.start, c, t) : null, ne = I.end ? ge(I.end, c, t) : null;
      if (I.start && !G && (console.warn(`Invalid start date provided: ${I.start}`), A.handleDateValidation(false, { date: "date.invalid" }, "startDate")), I.end && !ne && (console.warn(`Invalid end date provided: ${I.end}`), U.handleDateValidation(false, { date: "date.invalid" }, "endDate")), G && ne && jt(G, ne) > 0) {
        console.warn("Initial date range has start > end, auto-swapping values"), K.setExternalValue(I.end), W.setExternalValue(I.start), setTimeout(() => {
          F();
        }, 0);
        return;
      }
      K.setExternalValue(G ? I.start : null), W.setExternalValue(ne ? I.end : null);
    } else
      K.clearValues(), W.clearValues();
  }, { immediate: true }), {
    // 狀態
    isDisabled: p,
    startDateConstraints: le,
    endDateConstraints: R,
    startDateConstraintsStr: T,
    endDateConstraintsStr: N,
    // 驗證相關
    hasErrors: H,
    mergedErrors: M,
    mergedErrorParams: L,
    isValidRange: te,
    // 日期時間值
    startDateTime: K,
    endDateTime: W,
    // 顯示值
    hasRangeValue: E,
    // 日曆相關
    ...X,
    // 快捷選項
    shortcuts: ce,
    // 事件設置
    setEmitters: ae,
    // 驗證事件處理
    handleStartDateValidation: De,
    handleEndDateValidation: Me,
    handleStartTimeValidation: be,
    handleEndTimeValidation: P,
    // 完成事件處理
    handleStartDateComplete: Y,
    handleEndDateComplete: Z,
    handleStartTimeComplete: re,
    handleEndTimeComplete: oe,
    // 日曆事件處理
    handleCalendarRangeSelect: Te,
    handleTimeSelect: He,
    // 導航事件處理
    handleStartNavigateToDate: Q.handleNavigateToDate,
    handleEndNavigateToDate: O.handleNavigateToDate,
    // 主要操作
    applyShortcut: jr,
    clearRange: Zt,
    setRange: Jr,
    validate: _r,
    // 導航方法
    focusStartDate: Kr,
    focusEndDate: Qr
  };
}
function Ts() {
  const r = ref(typeof window < "u" ? window.innerWidth : 0), e = ref(typeof window < "u" ? window.innerHeight : 0), t = () => {
    r.value = window.innerWidth, e.value = window.innerHeight;
  };
  return onMounted(() => {
    t(), window.addEventListener("resize", t);
  }), onBeforeUnmount(() => {
    window.removeEventListener("resize", t);
  }), { width: r, height: e };
}
var xs = ["disabled"];
var Ys = ["title"];
var Cs = {
  key: 0,
  class: "date-placeholder text-vdt-content truncate block"
};
var Rs = {
  key: 1,
  class: "date-placeholder text-vdt-content-muted truncate block"
};
var Es = {
  class: "text-vdt-content-muted text-sm px-1",
  "aria-label": "日期範圍分隔符",
  "data-testid": "separator"
};
var Is = ["title"];
var Os = {
  key: 0,
  class: "date-placeholder text-vdt-content truncate block"
};
var Vs = {
  key: 1,
  class: "date-placeholder text-vdt-content-muted truncate block"
};
var Fs = ["disabled"];
var Ps = ["title"];
var As = { class: "p-2 space-y-2" };
var Ls = {
  key: 0,
  class: "w-full flex flex-col md:flex-row flex-justify-between gap-2"
};
var Hs = {
  key: 0,
  "data-testid": "start-time-inputs",
  "aria-label": "開始時間輸入區域"
};
var Bs = {
  key: 0,
  "data-testid": "end-time-inputs",
  "aria-label": "結束時間輸入區域"
};
var qs = {
  key: 1,
  "aria-label": "日期範圍快捷選項"
};
var Ns = { class: "flex flex-wrap gap-2" };
var Us = ["aria-label", "data-testid", "onClick"];
var zs = { key: 2 };
var Ws = { class: "flex flex-wrap gap-2" };
var js = { class: "calendar-container overflow-auto" };
var Js = { key: 0 };
var _s = defineComponent({
  __name: "DateRange",
  props: {
    modelValue: { default: null },
    monthDisplayMode: {},
    placeholderOverrides: { default: () => ({}) },
    separator: { default: " ~ " },
    showShortcuts: { type: Boolean, default: false },
    incomplete: { type: Boolean, default: true },
    maxRange: { default: void 0 },
    minRange: { default: void 0 },
    mode: { default: "auto" },
    theme: { default: () => "violet" },
    calendar: { default: "gregory" },
    locale: { default: "zh-TW" },
    customLocaleMessages: {},
    outputType: { default: "iso" },
    useStrictISO: { type: Boolean, default: false },
    weekStartsOn: { default: 0 },
    minDate: { default: void 0 },
    maxDate: { default: void 0 },
    dateSeparator: { default: "-" },
    dateFormat: { default: "YYYY-MM-DD" },
    timeFormat: {},
    showTime: { type: Boolean, default: false },
    enableSeconds: { type: Boolean, default: true },
    use24Hour: { type: Boolean, default: true },
    useLocalizedPeriod: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    inputEnabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    showClearButton: { type: Boolean, default: true },
    showErrorMessage: { type: Boolean, default: true },
    useI18n: { type: Boolean, default: true },
    customErrorMessages: { default: () => ({}) }
  },
  emits: ["update:modelValue", "change", "validation"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, o = ref(null), l = ref(null), s = ref(null), u = ref(null), i = ref(null), m = ref(null), y = ref({}), { width: v } = Ts(), w = computed(() => a.monthDisplayMode ? a.monthDisplayMode : v.value < 768 ? "single" : "dual"), x = computed(() => a.timeFormat ? a.timeFormat : a.enableSeconds ? a.use24Hour ? "HH:mm:ss" : "hh:mm:ss A" : a.use24Hour ? "HH:mm" : "hh:mm A"), f = ks(
      {
        calendar: a.calendar,
        modelValue: a.modelValue,
        showTime: a.showTime,
        required: a.required,
        disabled: a.disabled,
        dateFormat: a.dateFormat,
        timeFormat: x.value,
        outputType: a.outputType,
        useStrictISO: a.useStrictISO,
        enableSeconds: a.enableSeconds,
        minDate: a.minDate,
        maxDate: a.maxDate,
        maxRange: a.maxRange,
        minRange: a.minRange,
        incomplete: a.incomplete,
        locale: a.locale
      },
      {
        containerRef: o,
        calendarRef: l,
        startDateInputRef: s,
        endDateInputRef: u,
        startTimeInputRef: i,
        endTimeInputRef: m
      }
    ), { setLocale: $, getPlaceholderMessage: c } = wt(a.locale);
    f.setEmitters({
      update: (P) => n("update:modelValue", P),
      change: (P) => n("change", P),
      validation: (P, Y, Z) => n("validation", P, Y, Z)
    });
    const {
      themeClasses: S,
      containerAttributes: k,
      setColor: g,
      setMode: b
    } = Wr(), D = computed(() => {
      var Y, Z, re, oe, Te, se, xe, He;
      const P = {
        start: c("range.start"),
        end: c("range.end"),
        year: c("date.year"),
        month: c("date.month"),
        day: c("date.day"),
        hour: c("time.hour"),
        minute: c("time.minute"),
        second: c("time.second")
      };
      return {
        start: ((Y = a.placeholderOverrides) == null ? void 0 : Y.start) || P.start,
        end: ((Z = a.placeholderOverrides) == null ? void 0 : Z.end) || P.end,
        // 時間相關
        hour: ((re = a.placeholderOverrides) == null ? void 0 : re.hour) || P.hour,
        minute: ((oe = a.placeholderOverrides) == null ? void 0 : oe.minute) || P.minute,
        second: ((Te = a.placeholderOverrides) == null ? void 0 : Te.second) || P.second,
        // 日期相關
        year: ((se = a.placeholderOverrides) == null ? void 0 : se.year) || P.year,
        month: ((xe = a.placeholderOverrides) == null ? void 0 : xe.month) || P.month,
        day: ((He = a.placeholderOverrides) == null ? void 0 : He.day) || P.day
      };
    }), d = computed(() => a.dateFormat), p = computed(() => ({
      ...f.mergedErrors.value,
      ...y.value
    })), h = computed(() => Object.keys(E.value).length > 0);
    watch(() => a.theme, (P) => {
      P && g(P);
    }, { immediate: true }), watch(() => a.mode, (P) => {
      b(P);
    }, { immediate: true }), watch(() => a.locale, (P) => {
      P && $(P);
    }, { immediate: true }), watch(() => a.calendar, (P) => {
      he.isCalendarSupported(P) ? delete y.value.calendar : y.value.calendar = "calendar.unsupported";
    }, { immediate: true }), onBeforeMount(() => {
      $(a.locale);
    }), e({
      // 基本操作
      reset: f.clearRange,
      validate: f.validate,
      setRange: f.setRange,
      // 聚焦方法
      focusStartDate: f.focusStartDate,
      focusEndDate: f.focusEndDate,
      // 主題控制
      setTheme: g,
      setDarkMode: () => b("dark"),
      setLightMode: () => b("light"),
      setAutoMode: () => b("auto"),
      // 錯誤相關
      getErrors: () => E.value,
      hasErrors: () => h.value
    });
    const {
      // 狀態
      showCalendar: A,
      startDateConstraintsStr: U,
      endDateConstraintsStr: K,
      shortcuts: W,
      startDateTime: X,
      endDateTime: Q,
      hasRangeValue: O,
      mergedErrors: E,
      mergedErrorParams: M,
      // 事件處理方法
      handleStartDateValidation: L,
      handleEndDateValidation: H,
      handleStartTimeValidation: te,
      handleEndTimeValidation: ce,
      handleStartDateComplete: le,
      handleEndDateComplete: R,
      handleStartTimeComplete: T,
      handleEndTimeComplete: N,
      handleCalendarRangeSelect: ee,
      handleStartNavigateToDate: J,
      handleEndNavigateToDate: F,
      handleTimeSelect: _,
      // 操作方法
      toggleCalendar: ae,
      applyShortcut: pe,
      clearRange: De,
      focusStartDate: Me,
      focusEndDate: be
    } = f;
    return (P, Y) => {
      var Z, re, oe, Te;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", mergeProps({
          class: ["date-range-wrapper relative w-full", [unref(S), P.showTime ? "min-w-[300px]" : "min-w-[200px]"]]
        }, unref(k), {
          ref_key: "containerRef",
          ref: o
        }), [
          createBaseVNode("div", {
            class: normalizeClass(["date-picker-container flex w-full items-center px-2 py-1 rounded-sm transition-all duration-200 bg-vdt-surface text-vdt-content overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": h.value }]])
          }, [
            createBaseVNode("button", {
              type: "button",
              class: "grid grid-cols-[1fr_auto_1fr] gap-1 w-full cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
              disabled: P.disabled,
              onClick: Y[0] || (Y[0] = //@ts-ignore
              (...se) => unref(ae) && unref(ae)(...se)),
              "aria-label": "選擇日期範圍"
            }, [
              createBaseVNode("div", {
                class: "text-center min-w-0 max-w-[130px] sm:max-w-none",
                title: D.value.start
              }, [
                (Z = P.modelValue) != null && Z.start ? (openBlock(), createElementBlock("span", Cs, toDisplayString((re = P.modelValue) == null ? void 0 : re.start), 1)) : (openBlock(), createElementBlock("span", Rs, toDisplayString(D.value.start), 1))
              ], 8, Ys),
              createBaseVNode("div", Es, toDisplayString(P.separator), 1),
              createBaseVNode("div", {
                class: "text-center min-w-0 max-w-[130px] sm:max-w-none",
                title: D.value.end
              }, [
                (oe = P.modelValue) != null && oe.end ? (openBlock(), createElementBlock("span", Os, toDisplayString((Te = P.modelValue) == null ? void 0 : Te.end), 1)) : (openBlock(), createElementBlock("span", Vs, toDisplayString(D.value.end), 1))
              ], 8, Is)
            ], 8, xs),
            createBaseVNode("div", {
              class: normalizeClass(["date-picker-icon-container relative group cursor-pointer flex justify-center items-center flex-shrink-0", { "cursor-not-allowed": P.disabled }])
            }, [
              createBaseVNode("button", {
                type: "button",
                "aria-label": "開啟日曆",
                class: normalizeClass(["date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed", { "group-hover:opacity-0": unref(O) && !P.disabled && P.showClearButton }]),
                disabled: P.disabled,
                onClick: Y[1] || (Y[1] = withModifiers((se) => {
                  var xe;
                  return (xe = unref(ae)) == null ? void 0 : xe();
                }, ["stop", "prevent"]))
              }, [
                createVNode(Lr, { class: "h-5 w-5" })
              ], 10, Fs),
              unref(O) && !P.disabled && P.showClearButton ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                "aria-label": "清除日期",
                class: "date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100",
                onClick: Y[2] || (Y[2] = withModifiers(
                  //@ts-ignore
                  (...se) => unref(De) && unref(De)(...se),
                  ["stop"]
                )),
                title: "清除日期" + (P.showTime ? "時間" : "")
              }, [
                createVNode(qr, { class: "h-4 w-4" })
              ], 8, Ps)) : createCommentVNode("", true)
            ], 2)
          ], 2),
          unref(A) && !P.disabled ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "calendarRef",
            ref: l,
            class: normalizeClass(["absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10 overflow-auto", [
              // 基本尺寸控制
              "max-w-[95vw]",
              // 響應式最大高度和滾動
              "max-h-[80vh] overflow-auto",
              // 小螢幕時確保足夠的邊距
              "sm:max-h-[70vh]",
              // 確保在小螢幕上有足夠的觸控空間
              w.value === "single" ? "min-w-[275px]" : "min-w-[275px] md:min-w-[570px]"
            ]]),
            onClick: Y[9] || (Y[9] = withModifiers(() => {
            }, ["stop"])),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "date-range-picker"
          }, [
            createBaseVNode("div", As, [
              P.inputEnabled && w.value === "dual" ? (openBlock(), createElementBlock("div", Ls, [
                createBaseVNode("div", {
                  "data-testid": "start-date-inputs",
                  "aria-label": "開始日期輸入區域",
                  onClick: Y[5] || (Y[5] = withModifiers(
                    //@ts-ignore
                    (...se) => unref(Me) && unref(Me)(...se),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center px-2 py-1 gap-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  createVNode(ha, {
                    ref_key: "startDateInputRef",
                    ref: s,
                    modelValue: unref(X).inputDateValue.value,
                    "onUpdate:modelValue": Y[3] || (Y[3] = (se) => unref(X).inputDateValue.value = se),
                    "year-placeholder": D.value.year,
                    "month-placeholder": D.value.month,
                    "day-placeholder": D.value.day,
                    "max-date": unref(U).maxDate,
                    "min-date": unref(U).minDate,
                    "date-format": d.value,
                    onValidation: unref(L),
                    onComplete: unref(le)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "max-date", "min-date", "date-format", "onValidation", "onComplete"]),
                  P.showTime ? (openBlock(), createElementBlock("div", Hs, [
                    createVNode(va, {
                      ref_key: "startTimeInputRef",
                      ref: i,
                      modelValue: unref(X).inputTimeValue.value,
                      "onUpdate:modelValue": Y[4] || (Y[4] = (se) => unref(X).inputTimeValue.value = se),
                      "hour-placeholder": D.value.hour,
                      "minute-placeholder": D.value.minute,
                      "second-placeholder": D.value.second,
                      "enable-seconds": P.enableSeconds,
                      use24Hour: P.use24Hour,
                      locale: P.locale,
                      onValidation: unref(te),
                      onComplete: unref(T),
                      onNavigateToDate: unref(J)
                    }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", {
                  "data-testid": "end-date-inputs",
                  "aria-label": "結束日期輸入區域",
                  onClick: Y[8] || (Y[8] = withModifiers(
                    //@ts-ignore
                    (...se) => unref(be) && unref(be)(...se),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center gap-2 px-2 py-1 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  createVNode(ha, {
                    ref_key: "endDateInputRef",
                    ref: u,
                    modelValue: unref(Q).inputDateValue.value,
                    "onUpdate:modelValue": Y[6] || (Y[6] = (se) => unref(Q).inputDateValue.value = se),
                    "year-placeholder": D.value.year,
                    "month-placeholder": D.value.month,
                    "day-placeholder": D.value.day,
                    "min-date": unref(K).minDate,
                    "max-date": unref(K).maxDate,
                    "date-format": d.value,
                    onValidation: unref(H),
                    onComplete: unref(R)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "date-format", "onValidation", "onComplete"]),
                  P.showTime ? (openBlock(), createElementBlock("div", Bs, [
                    createVNode(va, {
                      ref_key: "endTimeInputRef",
                      ref: m,
                      modelValue: unref(Q).inputTimeValue.value,
                      "onUpdate:modelValue": Y[7] || (Y[7] = (se) => unref(Q).inputTimeValue.value = se),
                      "hour-placeholder": D.value.hour,
                      "minute-placeholder": D.value.minute,
                      "second-placeholder": D.value.second,
                      "enable-seconds": P.enableSeconds,
                      use24Hour: P.use24Hour,
                      locale: P.locale,
                      onValidation: unref(ce),
                      onComplete: unref(N),
                      onNavigateToDate: unref(F)
                    }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              unref(W).length > 0 && P.showShortcuts ? (openBlock(), createElementBlock("div", qs, [
                createBaseVNode("div", Ns, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(W), (se) => (openBlock(), createElementBlock("button", {
                    key: se.label,
                    type: "button",
                    "aria-label": `選擇${se.label}範圍`,
                    "data-testid": `shortcut-${se.label.toLowerCase().replace(/\s+/g, "-")}`,
                    class: "px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors",
                    onClick: (xe) => unref(pe)(se)
                  }, toDisplayString(se.label), 9, Us))), 128)),
                  renderSlot(P.$slots, "shortcuts", {
                    applyShortcut: unref(pe),
                    shortcuts: unref(W),
                    currentRange: P.modelValue
                  })
                ])
              ])) : P.$slots.shortcuts && P.showShortcuts ? (openBlock(), createElementBlock("div", zs, [
                createBaseVNode("div", Ws, [
                  renderSlot(P.$slots, "shortcuts", {
                    applyShortcut: unref(pe),
                    shortcuts: unref(W),
                    currentRange: P.modelValue
                  })
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", js, [
                createVNode(ws, {
                  "month-display-mode": w.value,
                  showTimeSelector: P.showTime,
                  calendar: P.calendar,
                  "range-start": unref(X).internalDateTime.value,
                  "range-end": unref(Q).internalDateTime.value,
                  "start-time-value": unref(X).inputTimeValue.value,
                  "end-time-value": unref(Q).inputTimeValue.value,
                  locale: P.locale,
                  "week-starts-on": P.weekStartsOn,
                  "min-date": unref(ge)(P.minDate),
                  "max-date": unref(ge)(P.maxDate),
                  "enable-seconds": P.enableSeconds,
                  "use24-hour": P.use24Hour,
                  onRangeSelect: unref(ee),
                  onTimeSelect: unref(_)
                }, null, 8, ["month-display-mode", "showTimeSelector", "calendar", "range-start", "range-end", "start-time-value", "end-time-value", "locale", "week-starts-on", "min-date", "max-date", "enable-seconds", "use24-hour", "onRangeSelect", "onTimeSelect"])
              ])
            ])
          ], 2)) : createCommentVNode("", true)
        ], 16),
        P.showErrorMessage && h.value ? (openBlock(), createElementBlock("div", Js, [
          renderSlot(P.$slots, "error", {
            errors: p.value,
            hasErrors: h.value
          }, () => [
            createVNode(Ar, {
              errors: unref(E),
              locale: P.locale,
              "use-i18n": P.useI18n,
              "custom-messages": P.customErrorMessages,
              errorParams: unref(M)
            }, createSlots({ _: 2 }, [
              renderList(P.$slots, (se, xe) => ({
                name: xe,
                fn: withCtx((He) => [
                  renderSlot(P.$slots, xe, normalizeProps(guardReactiveProps(He)))
                ])
              }))
            ]), 1032, ["errors", "locale", "use-i18n", "custom-messages", "errorParams"])
          ])
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var ci = {
  install(r) {
    r.component("VueDatepicker", ir), r.component("DatePicker", ir), r.component("DateRange", _s);
  }
};
export {
  ir as DatePicker,
  _s as DateRange,
  Fr as RocFormatPlugin,
  ci as VueDatepicker,
  ci as default
};
//# sourceMappingURL=@tiaohsun_vue-datepicker.js.map
