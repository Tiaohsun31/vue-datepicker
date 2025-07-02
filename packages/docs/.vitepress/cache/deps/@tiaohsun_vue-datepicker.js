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
var Me = (r, e, t) => Gr(r, typeof e != "symbol" ? e + "" : e, t);
function Dt(r) {
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
        var c = l.prototype;
        s.utc = function(m) {
          var y = { date: m, utc: true, args: arguments };
          return new l(y);
        }, c.utc = function(m) {
          var y = s(this.toDate(), { locale: this.$L, utc: true });
          return m ? y.add(this.utcOffset(), t) : y;
        }, c.local = function() {
          return s(this.toDate(), { locale: this.$L, utc: false });
        };
        var u = c.parse;
        c.parse = function(m) {
          m.utc && (this.$u = true), this.$utils().u(m.$offset) || (this.$offset = m.$offset), u.call(this, m);
        };
        var h = c.init;
        c.init = function() {
          if (this.$u) {
            var m = this.$d;
            this.$y = m.getUTCFullYear(), this.$M = m.getUTCMonth(), this.$D = m.getUTCDate(), this.$W = m.getUTCDay(), this.$H = m.getUTCHours(), this.$m = m.getUTCMinutes(), this.$s = m.getUTCSeconds(), this.$ms = m.getUTCMilliseconds();
          } else h.call(this);
        };
        var p = c.utcOffset;
        c.utcOffset = function(m, y) {
          var i = this.$utils().u;
          if (i(m)) return this.$u ? 0 : i(this.$offset) ? p.call(this) : this.$offset;
          if (typeof m == "string" && (m = function(S) {
            S === void 0 && (S = "");
            var k = S.match(a);
            if (!k) return null;
            var d = ("" + k[0]).match(n) || ["-", 0, 0], g = d[0], v = 60 * +d[1] + +d[2];
            return v === 0 ? 0 : g === "+" ? v : -v;
          }(m), m === null)) return this;
          var b = Math.abs(m) <= 16 ? 60 * m : m, M = this;
          if (y) return M.$offset = b, M.$u = m === 0, M;
          if (m !== 0) {
            var D = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (M = this.local().add(b + D, t)).$offset = b, M.$x.$localOffset = D;
          } else M = this.utc();
          return M;
        };
        var f = c.format;
        c.format = function(m) {
          var y = m || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return f.call(this, y);
        }, c.valueOf = function() {
          var m = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * m;
        }, c.isUTC = function() {
          return !!this.$u;
        }, c.toISOString = function() {
          return this.toDate().toISOString();
        }, c.toString = function() {
          return this.toDate().toUTCString();
        };
        var w = c.toDate;
        c.toDate = function(m) {
          return m === "s" && this.$offset ? s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : w.call(this);
        };
        var T = c.diff;
        c.diff = function(m, y, i) {
          if (m && this.$u === m.$u) return T.call(this, m, y, i);
          var b = this.local(), M = s(m).local();
          return T.call(b, M, y, i);
        };
      };
    });
  }(Et)), Et.exports;
}
var nn = rn();
var on = Dt(nn);
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
        var s, c = function(f, w, T) {
          T === void 0 && (T = {});
          var m = new Date(f), y = function(i, b) {
            b === void 0 && (b = {});
            var M = b.timeZoneName || "short", D = i + "|" + M, S = a[D];
            return S || (S = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: i, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: M }), a[D] = S), S;
          }(w, T);
          return y.formatToParts(m);
        }, u = function(f, w) {
          for (var T = c(f, w), m = [], y = 0; y < T.length; y += 1) {
            var i = T[y], b = i.type, M = i.value, D = t[b];
            D >= 0 && (m[D] = parseInt(M, 10));
          }
          var S = m[3], k = S === 24 ? 0 : S, d = m[0] + "-" + m[1] + "-" + m[2] + " " + k + ":" + m[4] + ":" + m[5] + ":000", g = +f;
          return (l.utc(d).valueOf() - (g -= g % 1e3)) / 6e4;
        }, h = o.prototype;
        h.tz = function(f, w) {
          f === void 0 && (f = s);
          var T, m = this.utcOffset(), y = this.toDate(), i = y.toLocaleString("en-US", { timeZone: f }), b = Math.round((y - new Date(i)) / 1e3 / 60), M = 15 * -Math.round(y.getTimezoneOffset() / 15) - b;
          if (!Number(M)) T = this.utcOffset(0, w);
          else if (T = l(i, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(M, true), w) {
            var D = T.utcOffset();
            T = T.add(m - D, "minute");
          }
          return T.$x.$timezone = f, T;
        }, h.offsetName = function(f) {
          var w = this.$x.$timezone || l.tz.guess(), T = c(this.valueOf(), w, { timeZoneName: f }).find(function(m) {
            return m.type.toLowerCase() === "timezonename";
          });
          return T && T.value;
        };
        var p = h.startOf;
        h.startOf = function(f, w) {
          if (!this.$x || !this.$x.$timezone) return p.call(this, f, w);
          var T = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return p.call(T, f, w).tz(this.$x.$timezone, true);
        }, l.tz = function(f, w, T) {
          var m = T && w, y = T || w || s, i = u(+l(), y);
          if (typeof f != "string") return l(f).tz(y);
          var b = function(k, d, g) {
            var v = k - 60 * d * 1e3, A = u(v, g);
            if (d === A) return [v, d];
            var N = u(v -= 60 * (A - d) * 1e3, g);
            return A === N ? [v, A] : [k - 60 * Math.min(A, N) * 1e3, Math.max(A, N)];
          }(l.utc(f, m).valueOf(), i, y), M = b[0], D = b[1], S = l(M).utcOffset(D);
          return S.$x.$timezone = y, S;
        }, l.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, l.tz.setDefault = function(f) {
          s = f;
        };
      };
    });
  }(It)), It.exports;
}
var un = sn();
var cn = Dt(un);
var Ot = { exports: {} };
var dn = Ot.exports;
var Fa;
function fn() {
  return Fa || (Fa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(dn, function() {
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, a = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, o = /\d\d/, l = /\d\d?/, s = /\d*[^-_:/,()\s\d]+/, c = {}, u = function(y) {
        return (y = +y) + (y > 68 ? 1900 : 2e3);
      }, h = function(y) {
        return function(i) {
          this[y] = +i;
        };
      }, p = [/[+-]\d\d:?(\d\d)?|Z/, function(y) {
        (this.zone || (this.zone = {})).offset = function(i) {
          if (!i || i === "Z") return 0;
          var b = i.match(/([+-]|\d\d)/g), M = 60 * b[1] + (+b[2] || 0);
          return M === 0 ? 0 : b[0] === "+" ? -M : M;
        }(y);
      }], f = function(y) {
        var i = c[y];
        return i && (i.indexOf ? i : i.s.concat(i.f));
      }, w = function(y, i) {
        var b, M = c.meridiem;
        if (M) {
          for (var D = 1; D <= 24; D += 1) if (y.indexOf(M(D, 0, i)) > -1) {
            b = D > 12;
            break;
          }
        } else b = y === (i ? "pm" : "PM");
        return b;
      }, T = { A: [s, function(y) {
        this.afternoon = w(y, false);
      }], a: [s, function(y) {
        this.afternoon = w(y, true);
      }], Q: [n, function(y) {
        this.month = 3 * (y - 1) + 1;
      }], S: [n, function(y) {
        this.milliseconds = 100 * +y;
      }], SS: [o, function(y) {
        this.milliseconds = 10 * +y;
      }], SSS: [/\d{3}/, function(y) {
        this.milliseconds = +y;
      }], s: [l, h("seconds")], ss: [l, h("seconds")], m: [l, h("minutes")], mm: [l, h("minutes")], H: [l, h("hours")], h: [l, h("hours")], HH: [l, h("hours")], hh: [l, h("hours")], D: [l, h("day")], DD: [o, h("day")], Do: [s, function(y) {
        var i = c.ordinal, b = y.match(/\d+/);
        if (this.day = b[0], i) for (var M = 1; M <= 31; M += 1) i(M).replace(/\[|\]/g, "") === y && (this.day = M);
      }], w: [l, h("week")], ww: [o, h("week")], M: [l, h("month")], MM: [o, h("month")], MMM: [s, function(y) {
        var i = f("months"), b = (f("monthsShort") || i.map(function(M) {
          return M.slice(0, 3);
        })).indexOf(y) + 1;
        if (b < 1) throw new Error();
        this.month = b % 12 || b;
      }], MMMM: [s, function(y) {
        var i = f("months").indexOf(y) + 1;
        if (i < 1) throw new Error();
        this.month = i % 12 || i;
      }], Y: [/[+-]?\d+/, h("year")], YY: [o, function(y) {
        this.year = u(y);
      }], YYYY: [/\d{4}/, h("year")], Z: p, ZZ: p };
      function m(y) {
        var i, b;
        i = y, b = c && c.formats;
        for (var M = (y = i.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(A, N, J) {
          var z = J && J.toUpperCase();
          return N || b[J] || t[J] || b[z].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(ae, G, O) {
            return G || O.slice(1);
          });
        })).match(a), D = M.length, S = 0; S < D; S += 1) {
          var k = M[S], d = T[k], g = d && d[0], v = d && d[1];
          M[S] = v ? { regex: g, parser: v } : k.replace(/^\[|\]$/g, "");
        }
        return function(A) {
          for (var N = {}, J = 0, z = 0; J < D; J += 1) {
            var ae = M[J];
            if (typeof ae == "string") z += ae.length;
            else {
              var G = ae.regex, O = ae.parser, E = A.slice(z), $ = G.exec(E)[0];
              O.call(N, $), A = A.replace($, "");
            }
          }
          return function(L) {
            var H = L.afternoon;
            if (H !== void 0) {
              var te = L.hours;
              H ? te < 12 && (L.hours += 12) : te === 12 && (L.hours = 0), delete L.afternoon;
            }
          }(N), N;
        };
      }
      return function(y, i, b) {
        b.p.customParseFormat = true, y && y.parseTwoDigitYear && (u = y.parseTwoDigitYear);
        var M = i.prototype, D = M.parse;
        M.parse = function(S) {
          var k = S.date, d = S.utc, g = S.args;
          this.$u = d;
          var v = g[1];
          if (typeof v == "string") {
            var A = g[2] === true, N = g[3] === true, J = A || N, z = g[2];
            N && (z = g[2]), c = this.$locale(), !A && z && (c = b.Ls[z]), this.$d = function(E, $, L, H) {
              try {
                if (["x", "X"].indexOf($) > -1) return new Date(($ === "X" ? 1e3 : 1) * E);
                var te = m($)(E), ce = te.year, se = te.month, C = te.day, x = te.hours, U = te.minutes, ee = te.seconds, _ = te.milliseconds, P = te.zone, K = te.week, oe = /* @__PURE__ */ new Date(), ye = C || (ce || se ? 1 : oe.getDate()), De = ce || oe.getFullYear(), V = 0;
                ce && !se || (V = se > 0 ? se - 1 : oe.getMonth());
                var re, be = x || 0, R = U || 0, Z = ee || 0, ne = _ || 0;
                return P ? new Date(Date.UTC(De, V, ye, be, R, Z, ne + 60 * P.offset * 1e3)) : L ? new Date(Date.UTC(De, V, ye, be, R, Z, ne)) : (re = new Date(De, V, ye, be, R, Z, ne), K && (re = H(re).week(K).toDate()), re);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            }(k, v, d, b), this.init(), z && z !== true && (this.$L = this.locale(z).$L), J && k != this.format(v) && (this.$d = /* @__PURE__ */ new Date("")), c = {};
          } else if (v instanceof Array) for (var ae = v.length, G = 1; G <= ae; G += 1) {
            g[1] = v[G - 1];
            var O = b.apply(this, g);
            if (O.isValid()) {
              this.$d = O.$d, this.$L = O.$L, this.init();
              break;
            }
            G === ae && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else D.call(this, S);
        };
      };
    });
  }(Ot)), Ot.exports;
}
var mn = fn();
var dr = Dt(mn);
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
        s.week = function(c) {
          if (c === void 0 && (c = null), c !== null) return this.add(7 * (c - this.week()), "day");
          var u = this.$locale().yearStart || 1;
          if (this.month() === 11 && this.date() > 25) {
            var h = l(this).startOf(a).add(1, a).date(u), p = l(this).endOf(t);
            if (h.isBefore(p)) return 1;
          }
          var f = l(this).startOf(a).date(u).startOf(t).subtract(1, "millisecond"), w = this.diff(f, t, true);
          return w < 0 ? l(this).startOf("week").week() : Math.ceil(w);
        }, s.weeks = function(c) {
          return c === void 0 && (c = null), this.week(c);
        };
      };
    });
  }(Vt)), Vt.exports;
}
var pn = vn();
var gn = Dt(pn);
var Ft = { exports: {} };
var yn = Ft.exports;
var Aa;
function $n() {
  return Aa || (Aa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(yn, function() {
      return function(t, a, n) {
        var o = a.prototype, l = function(p) {
          return p && (p.indexOf ? p : p.s);
        }, s = function(p, f, w, T, m) {
          var y = p.name ? p : p.$locale(), i = l(y[f]), b = l(y[w]), M = i || b.map(function(S) {
            return S.slice(0, T);
          });
          if (!m) return M;
          var D = y.weekStart;
          return M.map(function(S, k) {
            return M[(k + (D || 0)) % 7];
          });
        }, c = function() {
          return n.Ls[n.locale()];
        }, u = function(p, f) {
          return p.formats[f] || function(w) {
            return w.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(T, m, y) {
              return m || y.slice(1);
            });
          }(p.formats[f.toUpperCase()]);
        }, h = function() {
          var p = this;
          return { months: function(f) {
            return f ? f.format("MMMM") : s(p, "months");
          }, monthsShort: function(f) {
            return f ? f.format("MMM") : s(p, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return p.$locale().weekStart || 0;
          }, weekdays: function(f) {
            return f ? f.format("dddd") : s(p, "weekdays");
          }, weekdaysMin: function(f) {
            return f ? f.format("dd") : s(p, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(f) {
            return f ? f.format("ddd") : s(p, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(f) {
            return u(p.$locale(), f);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        o.localeData = function() {
          return h.bind(this)();
        }, n.localeData = function() {
          var p = c();
          return { firstDayOfWeek: function() {
            return p.weekStart || 0;
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
          }, longDateFormat: function(f) {
            return u(p, f);
          }, meridiem: p.meridiem, ordinal: p.ordinal };
        }, n.months = function() {
          return s(c(), "months");
        }, n.monthsShort = function() {
          return s(c(), "monthsShort", "months", 3);
        }, n.weekdays = function(p) {
          return s(c(), "weekdays", null, null, p);
        }, n.weekdaysShort = function(p) {
          return s(c(), "weekdaysShort", "weekdays", 3, p);
        }, n.weekdaysMin = function(p) {
          return s(c(), "weekdaysMin", "weekdays", 2, p);
        };
      };
    });
  }(Ft)), Ft.exports;
}
var Dn = $n();
var bn = Dt(Dn);
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
    Me(this, "locale");
    Me(this, "calendar");
    Me(this, "preferredFormats");
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
var ct = new Mn();
function Sn(r, e = "zh-TW", t = "gregory") {
  return e !== ct.locale && ct.setLocale(e), t !== ct.calendar && ct.setCalendar(t), ct.parse(r);
}
function et(r, e) {
  return r - e * Math.floor(r / e);
}
var fr = 1721426;
function Ke(r, e, t, a) {
  e = bt(r, e);
  let n = e - 1, o = -2;
  return t <= 2 ? o = 0 : We(e) && (o = -1), fr - 1 + 365 * n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400) + Math.floor((367 * t - 362) / 12 + o + a);
}
function We(r) {
  return r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0);
}
function bt(r, e) {
  return r === "BC" ? 1 - e : e;
}
function Jt(r) {
  let e = "AD";
  return r <= 0 && (e = "BC", r = 1 - r), [
    e,
    r
  ];
}
var kn = {
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
var Ie = class {
  fromJulianDay(e) {
    let t = e, a = t - fr, n = Math.floor(a / 146097), o = et(a, 146097), l = Math.floor(o / 36524), s = et(o, 36524), c = Math.floor(s / 1461), u = et(s, 1461), h = Math.floor(u / 365), p = n * 400 + l * 100 + c * 4 + h + (l !== 4 && h !== 4 ? 1 : 0), [f, w] = Jt(p), T = t - Ke(f, w, 1, 1), m = 2;
    t < Ke(f, w, 3, 1) ? m = 0 : We(w) && (m = 1);
    let y = Math.floor(((T + m) * 12 + 373) / 367), i = t - Ke(f, w, y, 1) + 1;
    return new ue(f, w, y, i);
  }
  toJulianDay(e) {
    return Ke(e.era, e.year, e.month, e.day);
  }
  getDaysInMonth(e) {
    return kn[We(e.year) ? "leapyear" : "standard"][e.month - 1];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMonthsInYear(e) {
    return 12;
  }
  getDaysInYear(e) {
    return We(e.year) ? 366 : 365;
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
var wn = {
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
  return Ue(Date.now(), r);
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
var Zt = null;
function Da() {
  return Zt == null && (Zt = new Intl.DateTimeFormat().resolvedOptions().timeZone), Zt;
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
  return e && wn[e] || 0;
}
function On(r, e, t) {
  let a = r.calendar.getDaysInMonth(r);
  return Math.ceil((mr(Rn(r), e) + a) / 7);
}
function lt(r) {
  r = Re(r, new Ie());
  let e = bt(r.era, r.year);
  return vr(e, r.month, r.day, r.hour, r.minute, r.second, r.millisecond);
}
function vr(r, e, t, a, n, o, l) {
  let s = /* @__PURE__ */ new Date();
  return s.setUTCHours(a, n, o, l), s.setUTCFullYear(r, e - 1, t), s.getTime();
}
function ra(r, e) {
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
function qe(r, e, t = "compatible") {
  let a = st(r);
  if (e === "UTC") return lt(a);
  if (e === Da() && t === "compatible") {
    a = Re(a, new Ie());
    let c = /* @__PURE__ */ new Date(), u = bt(a.era, a.year);
    return c.setFullYear(u, a.month - 1, a.day), c.setHours(a.hour, a.minute, a.second, a.millisecond), c.getTime();
  }
  let n = lt(a), o = ra(n - Ua, e), l = ra(n + Ua, e), s = Vn(a, e, n - o, n - l);
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
  return new Date(qe(r, e, t));
}
function Ue(r, e) {
  let t = ra(r, e), a = new Date(r + t), n = a.getUTCFullYear(), o = a.getUTCMonth() + 1, l = a.getUTCDate(), s = a.getUTCHours(), c = a.getUTCMinutes(), u = a.getUTCSeconds(), h = a.getUTCMilliseconds();
  return new $t(n < 1 ? "BC" : "AD", n < 1 ? -n + 1 : n, o, l, e, t, s, c, u, h);
}
function Pn(r) {
  return new ue(r.calendar, r.era, r.year, r.month, r.day);
}
function st(r, e) {
  let t = 0, a = 0, n = 0, o = 0;
  if ("timeZone" in r) ({ hour: t, minute: a, second: n, millisecond: o } = r);
  else if ("hour" in r && !e) return r;
  return e && ({ hour: t, minute: a, second: n, millisecond: o } = e), new it(r.calendar, r.era, r.year, r.month, r.day, t, a, n, o);
}
function Re(r, e) {
  if (Tn(r.calendar, e)) return r;
  let t = e.fromJulianDay(r.calendar.toJulianDay(r)), a = r.copy();
  return a.calendar = e, a.era = t.era, a.year = t.year, a.month = t.month, a.day = t.day, Ze(a), a;
}
function An(r, e, t) {
  if (r instanceof $t)
    return r.timeZone === e ? r : Hn(r, e);
  let a = qe(r, e, t);
  return Ue(a, e);
}
function Ln(r) {
  let e = lt(r) - r.offset;
  return new Date(e);
}
function Hn(r, e) {
  let t = lt(r) - r.offset;
  return Re(Ue(t, e), r.calendar);
}
var dt = 36e5;
function _t(r, e) {
  let t = r.copy(), a = "hour" in t ? Un(t, e) : 0;
  na(t, e.years || 0), t.calendar.balanceYearMonth && t.calendar.balanceYearMonth(t, r), t.month += e.months || 0, oa(t), yr(t), t.day += (e.weeks || 0) * 7, t.day += e.days || 0, t.day += a, Bn(t), t.calendar.balanceDate && t.calendar.balanceDate(t), t.year < 1 && (t.year = 1, t.month = 1, t.day = 1);
  let n = t.calendar.getYearsInEra(t);
  if (t.year > n) {
    var o, l;
    let c = (o = (l = t.calendar).isInverseEra) === null || o === void 0 ? void 0 : o.call(l, t);
    t.year = n, t.month = c ? 1 : t.calendar.getMonthsInYear(t), t.day = c ? 1 : t.calendar.getDaysInMonth(t);
  }
  t.month < 1 && (t.month = 1, t.day = 1);
  let s = t.calendar.getMonthsInYear(t);
  return t.month > s && (t.month = s, t.day = t.calendar.getDaysInMonth(t)), t.day = Math.max(1, Math.min(t.calendar.getDaysInMonth(t), t.day)), t;
}
function na(r, e) {
  var t, a;
  !((t = (a = r.calendar).isInverseEra) === null || t === void 0) && t.call(a, r) && (e = -e), r.year += e;
}
function oa(r) {
  for (; r.month < 1; )
    na(r, -1), r.month += r.calendar.getMonthsInYear(r);
  let e = 0;
  for (; r.month > (e = r.calendar.getMonthsInYear(r)); )
    r.month -= e, na(r, 1);
}
function Bn(r) {
  for (; r.day < 1; )
    r.month--, oa(r), r.day += r.calendar.getDaysInMonth(r);
  for (; r.day > r.calendar.getDaysInMonth(r); )
    r.day -= r.calendar.getDaysInMonth(r), r.month++, oa(r);
}
function yr(r) {
  r.month = Math.max(1, Math.min(r.calendar.getMonthsInYear(r), r.month)), r.day = Math.max(1, Math.min(r.calendar.getDaysInMonth(r), r.day));
}
function Ze(r) {
  r.calendar.constrainDate && r.calendar.constrainDate(r), r.year = Math.max(1, Math.min(r.calendar.getYearsInEra(r), r.year)), yr(r);
}
function $r(r) {
  let e = {};
  for (let t in r) typeof r[t] == "number" && (e[t] = -r[t]);
  return e;
}
function Dr(r, e) {
  return _t(r, $r(e));
}
function ba(r, e) {
  let t = r.copy();
  return e.era != null && (t.era = e.era), e.year != null && (t.year = e.year), e.month != null && (t.month = e.month), e.day != null && (t.day = e.day), Ze(t), t;
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
      let s = r.calendar.getEras(), c = s.indexOf(r.era);
      if (c < 0) throw new Error("Invalid era: " + r.era);
      c = ze(c, t, 0, s.length - 1, a == null ? void 0 : a.round), n.era = s[c], Ze(n);
      break;
    }
    case "year":
      var o, l;
      !((o = (l = n.calendar).isInverseEra) === null || o === void 0) && o.call(l, n) && (t = -t), n.year = ze(r.year, t, -1 / 0, 9999, a == null ? void 0 : a.round), n.year === -1 / 0 && (n.year = 1), n.calendar.balanceYearMonth && n.calendar.balanceYearMonth(n, r);
      break;
    case "month":
      n.month = ze(r.month, t, 1, r.calendar.getMonthsInYear(r), a == null ? void 0 : a.round);
      break;
    case "day":
      n.day = ze(r.day, t, 1, r.calendar.getDaysInMonth(r), a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return r.calendar.balanceDate && r.calendar.balanceDate(n), Ze(n), n;
}
function br(r, e, t, a) {
  let n = r.copy();
  switch (e) {
    case "hour": {
      let o = r.hour, l = 0, s = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let c = o >= 12;
        l = c ? 12 : 0, s = c ? 23 : 11;
      }
      n.hour = ze(o, t, l, s, a == null ? void 0 : a.round);
      break;
    }
    case "minute":
      n.minute = ze(r.minute, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "second":
      n.second = ze(r.second, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "millisecond":
      n.millisecond = ze(r.millisecond, t, 0, 999, a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return n;
}
function ze(r, e, t, a, n = false) {
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
    let n = _t(st(r), {
      years: e.years,
      months: e.months,
      weeks: e.weeks,
      days: e.days
    });
    t = qe(n, r.timeZone);
  } else
    t = lt(r) - r.offset;
  t += e.milliseconds || 0, t += (e.seconds || 0) * 1e3, t += (e.minutes || 0) * 6e4, t += (e.hours || 0) * 36e5;
  let a = Ue(t, r.timeZone);
  return Re(a, r.calendar);
}
function zn(r, e) {
  return Mr(r, $r(e));
}
function jn(r, e, t, a) {
  switch (e) {
    case "hour": {
      let n = 0, o = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let T = r.hour >= 12;
        n = T ? 12 : 0, o = T ? 23 : 11;
      }
      let l = st(r), s = Re(Ht(l, {
        hour: n
      }), new Ie()), c = [
        qe(s, r.timeZone, "earlier"),
        qe(s, r.timeZone, "later")
      ].filter((T) => Ue(T, r.timeZone).day === s.day)[0], u = Re(Ht(l, {
        hour: o
      }), new Ie()), h = [
        qe(u, r.timeZone, "earlier"),
        qe(u, r.timeZone, "later")
      ].filter((T) => Ue(T, r.timeZone).day === u.day).pop(), p = lt(r) - r.offset, f = Math.floor(p / dt), w = p % dt;
      return p = ze(f, t, Math.floor(c / dt), Math.floor(h / dt), a == null ? void 0 : a.round) * dt + w, Re(Ue(p, r.timeZone), r.calendar);
    }
    case "minute":
    case "second":
    case "millisecond":
      return br(r, e, t, a);
    case "era":
    case "year":
    case "month":
    case "day": {
      let n = Ma(st(r), e, t, a), o = qe(n, r.timeZone);
      return Re(Ue(o, r.timeZone), r.calendar);
    }
    default:
      throw new Error("Unsupported field " + e);
  }
}
function Wn(r, e, t) {
  let a = st(r), n = Ht(ba(a, e), e);
  if (n.compare(a) === 0) return r;
  let o = qe(n, r.timeZone, t);
  return Re(Ue(o, r.timeZone), r.calendar);
}
function Jn(r) {
  return `${String(r.hour).padStart(2, "0")}:${String(r.minute).padStart(2, "0")}:${String(r.second).padStart(2, "0")}${r.millisecond ? String(r.millisecond / 1e3).slice(1) : ""}`;
}
function Sr(r) {
  let e = Re(r, new Ie()), t;
  return e.era === "BC" ? t = e.year === 1 ? "0000" : "-" + String(Math.abs(1 - e.year)).padStart(6, "00") : t = String(e.year).padStart(4, "0"), `${t}-${String(e.month).padStart(2, "0")}-${String(e.day).padStart(2, "0")}`;
}
function kr(r) {
  return `${Sr(r)}T${Jn(r)}`;
}
function _n(r) {
  let e = Math.sign(r) < 0 ? "-" : "+";
  r = Math.abs(r);
  let t = Math.floor(r / 36e5), a = r % 36e5 / 6e4;
  return `${e}${String(t).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
}
function Kn(r) {
  return `${kr(r)}${_n(r.offset)}[${r.timeZone}]`;
}
function Qn(r, e) {
  if (e.has(r))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function Sa(r, e, t) {
  Qn(r, e), e.set(r, t);
}
function ka(r) {
  let e = typeof r[0] == "object" ? r.shift() : new Ie(), t;
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
    return _t(this, e);
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
    let [t, a, n, o, l] = ka(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, Ze(this);
  }
};
var Gn = /* @__PURE__ */ new WeakMap();
var it = class _it {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _it(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond) : new _it(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `CalendarDateTime` with the given duration added to it. */
  add(e) {
    return _t(this, e);
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
    return kr(this);
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(e) {
    let t = hr(this, e);
    return t === 0 ? Cn(this, st(e)) : t;
  }
  constructor(...e) {
    Sa(this, Gn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = ka(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, Ze(this);
  }
};
var Xn = /* @__PURE__ */ new WeakMap();
var $t = class _$t {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _$t(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond) : new _$t(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
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
    return Wn(this, e, t);
  }
  /**
  * Returns a new `ZonedDateTime` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(e, t, a) {
    return jn(this, e, t, a);
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
    let [t, a, n, o, l] = ka(e), s = e.shift(), c = e.shift();
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.timeZone = s, this.offset = c, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, Ze(this);
  }
};
var tt = [
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
var je = [
  "meiji",
  "taisho",
  "showa",
  "heisei",
  "reiwa"
];
function za(r) {
  const e = tt.findIndex(([t, a, n]) => r.year < t || r.year === t && r.month < a || r.year === t && r.month === a && r.day < n);
  return e === -1 ? tt.length - 1 : e === 0 ? 0 : e - 1;
}
function Gt(r) {
  let e = Pt[je.indexOf(r.era)];
  if (!e) throw new Error("Unknown era: " + r.era);
  return new ue(r.year + e, r.month, r.day);
}
var to = class extends Ie {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = za(t);
    return new ue(this, je[a], t.year - Pt[a], t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Gt(e));
  }
  balanceDate(e) {
    let t = Gt(e), a = za(t);
    je[a] !== e.era && (e.era = je[a], e.year = t.year - Pt[a]), this.constrainDate(e);
  }
  constrainDate(e) {
    let t = je.indexOf(e.era), a = eo[t];
    if (a != null) {
      let [n, o, l] = a, s = n - Pt[t];
      e.year = Math.max(1, Math.min(s, e.year)), e.year === s && (e.month = Math.min(o, e.month), e.month === o && (e.day = Math.min(l, e.day)));
    }
    if (e.year === 1 && t >= 0) {
      let [, n, o] = tt[t];
      e.month = Math.max(n, e.month), e.month === n && (e.day = Math.max(o, e.day));
    }
  }
  getEras() {
    return je;
  }
  getYearsInEra(e) {
    let t = je.indexOf(e.era), a = tt[t], n = tt[t + 1];
    if (n == null)
      return 9999 - a[0] + 1;
    let o = n[0] - a[0];
    return (e.month < n[1] || e.month === n[1] && e.day < n[2]) && o++, o;
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(Gt(e));
  }
  getMinimumMonthInYear(e) {
    let t = ja(e);
    return t ? t[1] : 1;
  }
  getMinimumDayInMonth(e) {
    let t = ja(e);
    return t && e.month === t[1] ? t[2] : 1;
  }
  constructor(...e) {
    super(...e), this.identifier = "japanese";
  }
};
function ja(r) {
  if (r.year === 1) {
    let e = je.indexOf(r.era);
    return tt[e];
  }
}
var wr = -543;
var ao = class extends Ie {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = bt(t.era, t.year);
    return new ue(this, a - wr, t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Wa(e));
  }
  getEras() {
    return [
      "BE"
    ];
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(Wa(e));
  }
  balanceDate() {
  }
  constructor(...e) {
    super(...e), this.identifier = "buddhist";
  }
};
function Wa(r) {
  let [e, t] = Jt(r.year + wr);
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
var ro = class extends Ie {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = bt(t.era, t.year), [n, o] = Ja(a);
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
  let [e, t] = Jt(Tr(r));
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
    return e.month <= 6 ? 31 : e.month <= 11 || et(25 * e.year + 11, 33) < 8 ? 30 : 29;
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
var Xt = 78;
var Za = 80;
var oo = class extends Ie {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = t.year - Xt, n = e - Ke(t.era, t.year, 1, 1), o;
    n < Za ? (a--, o = We(t.year - 1) ? 31 : 30, n += o + 155 + 90 + 10) : (o = We(t.year) ? 31 : 30, n -= Za);
    let l, s;
    if (n < o)
      l = 1, s = n + 1;
    else {
      let c = n - o;
      c < 155 ? (l = Math.floor(c / 31) + 2, s = c % 31 + 1) : (c -= 155, l = Math.floor(c / 30) + 7, s = c % 30 + 1);
    }
    return new ue(this, a, l, s);
  }
  toJulianDay(e) {
    let t = e.year + Xt, [a, n] = Jt(t), o, l;
    return We(n) ? (o = 31, l = Ke(a, n, 3, 21)) : (o = 30, l = Ke(a, n, 3, 22)), e.month === 1 ? l + e.day - 1 : (l += o + Math.min(e.month - 2, 5) * 31, e.month >= 8 && (l += (e.month - 7) * 30), l += e.day - 1, l);
  }
  getDaysInMonth(e) {
    return e.month === 1 && We(e.year + Xt) || e.month >= 2 && e.month <= 6 ? 31 : 30;
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
var Ve = 1300;
var Ge = 1600;
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
var wa = class {
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
var so = class extends wa {
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
var la;
var at;
function At(r) {
  return lo + at[r - Ve];
}
function mt(r, e) {
  let t = r - Ve, a = 1 << 11 - (e - 1);
  return (la[t] & a) === 0 ? 29 : 30;
}
function er(r, e) {
  let t = At(r);
  for (let a = 1; a < e; a++) t += mt(r, a);
  return t;
}
function tr(r) {
  return at[r + 1 - Ve] - at[r - Ve];
}
var uo = class extends wa {
  fromJulianDay(e) {
    let t = e - qt, a = At(Ve), n = At(Ge);
    if (t < a || t > n) return super.fromJulianDay(e);
    {
      let o = Ve - 1, l = 1, s = 1;
      for (; s > 0; ) {
        o++, s = t - At(o) + 1;
        let c = tr(o);
        if (s === c) {
          l = 12;
          break;
        } else if (s < c) {
          let u = mt(o, l);
          for (l = 1; s > u; )
            s -= u, l++, u = mt(o, l);
          break;
        }
      }
      return new ue(this, o, l, t - er(o, l) + 1);
    }
  }
  toJulianDay(e) {
    return e.year < Ve || e.year > Ge ? super.toJulianDay(e) : qt + er(e.year, e.month) + (e.day - 1);
  }
  getDaysInMonth(e) {
    return e.year < Ve || e.year > Ge ? super.getDaysInMonth(e) : mt(e.year, e.month);
  }
  getDaysInYear(e) {
    return e.year < Ve || e.year > Ge ? super.getDaysInYear(e) : tr(e.year);
  }
  constructor() {
    if (super(), this.identifier = "islamic-umalqura", la || (la = new Uint16Array(Uint8Array.from(atob(io), (e) => e.charCodeAt(0)).buffer)), !at) {
      at = new Uint32Array(Ge - Ve + 1);
      let e = 0;
      for (let t = Ve; t <= Ge; t++) {
        at[t - Ve] = e;
        for (let a = 1; a <= 12; a++) e += mt(t, a);
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
function _e(r) {
  return et(r * 7 + 1, 19) < 7;
}
function Lt(r) {
  let e = Math.floor((235 * r - 234) / 19), t = 12084 + 13753 * e, a = e * 29 + Math.floor(t / 25920);
  return et(3 * (a + 1), 7) < 3 && (a += 1), a;
}
function ho(r) {
  let e = Lt(r - 1), t = Lt(r);
  return Lt(r + 1) - t === 356 ? 2 : t - e === 382 ? 1 : 0;
}
function ht(r) {
  return Lt(r) + ho(r);
}
function Rr(r) {
  return ht(r + 1) - ht(r);
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
  if (e >= 6 && !_e(r) && e++, e === 4 || e === 7 || e === 9 || e === 11 || e === 13) return 29;
  let t = vo(r);
  return e === 2 ? t === 2 ? 30 : 29 : e === 3 ? t === 0 ? 29 : 30 : e === 6 ? _e(r) ? 30 : 0 : 30;
}
var po = class {
  fromJulianDay(e) {
    let t = e - ar, a = t * Cr / mo, n = Math.floor((19 * a + 234) / 235) + 1, o = ht(n), l = Math.floor(t - o);
    for (; l < 1; )
      n--, o = ht(n), l = Math.floor(t - o);
    let s = 1, c = 0;
    for (; c < l; )
      c += xt(n, s), s++;
    s--, c -= xt(n, s);
    let u = l - c;
    return new ue(this, n, s, u);
  }
  toJulianDay(e) {
    let t = ht(e.year);
    for (let a = 1; a < e.month; a++) t += xt(e.year, a);
    return t + e.day + ar;
  }
  getDaysInMonth(e) {
    return xt(e.year, e.month);
  }
  getMonthsInYear(e) {
    return _e(e.year) ? 13 : 12;
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
    t.year !== e.year && (_e(t.year) && !_e(e.year) && t.month > 6 ? e.month-- : !_e(t.year) && _e(e.year) && t.month > 6 && e.month++);
  }
  constructor() {
    this.identifier = "hebrew";
  }
};
var sa = 1723856;
var rr = 1824665;
var ia = 5500;
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
    let [t, a, n] = Ta(sa, e), o = "AM";
    return t <= 0 && (o = "AA", t += ia), new ue(this, o, t, a, n);
  }
  toJulianDay(e) {
    let t = e.year;
    return e.era === "AA" && (t -= ia), Ut(sa, t, e.month, e.day);
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
    let [t, a, n] = Ta(sa, e);
    return t += ia, new ue(this, "AA", t, a, n);
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
      return new wa();
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
      return new Ie();
  }
}
var ea = /* @__PURE__ */ new Map();
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
  if (ea.has(t)) return ea.get(t);
  let a = new Intl.DateTimeFormat(r, e);
  return ea.set(t, a), a;
}
var ta = null;
function bo() {
  return ta == null && (ta = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false
  }).format(new Date(2020, 2, 3, 0)) === "24"), ta;
}
var aa = null;
function Mo() {
  return aa == null && (aa = new Intl.DateTimeFormat("fr", {
    hour: "numeric",
    hour12: false
  }).resolvedOptions().hourCycle === "h12"), aa;
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
function rt() {
  const r = /* @__PURE__ */ new Date();
  return {
    year: r.getFullYear(),
    month: r.getMonth() + 1,
    day: r.getDate()
  };
}
function ko(r) {
  try {
    const e = Da(), t = Yn(e);
    if (r.calendar.identifier !== t.calendar.identifier) {
      const a = Re(t, r.calendar);
      return r.compare(a) === 0;
    }
    return r.compare(t) === 0;
  } catch (e) {
    return console.error("Error checking if date is today:", e), false;
  }
}
function Xe() {
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
function Ne(r, e, t, a, n, o) {
  const l = { year: r, month: e, day: t };
  return a !== void 0 && (l.hour = a), n !== void 0 && (l.minute = n), o !== void 0 && (l.second = o), l;
}
function pe(r, e = "zh-TW", t = "gregory") {
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
function Ee(r, e = "YYYY-MM-DD") {
  if (!r) return null;
  try {
    return (0, import_dayjs.default)("2000-01-01 00:00:00").year(r.year).month(r.month - 1).date(r.day).hour(r.hour || 0).minute(r.minute || 0).second(r.second || 0).format(e);
  } catch (t) {
    return console.error("Failed to format date:", t), null;
  }
}
function jt(r, e = "iso", t = "YYYY-MM-DD", a, n = false, o = "gregory", l = "zh-TW", s = false, c = true) {
  if (!r) return null;
  try {
    switch (e) {
      case "iso":
        if (n) {
          let u;
          return c ? u = s ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD HH:mm:ss" : u = s ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD HH:mm", Ee(r, u);
        } else
          return Ee(r, "YYYY-MM-DD");
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
        return me.formatOutput(r, t, a, n, o, l);
      default:
        return console.warn(`不支援的輸出類型: ${e}，回退到 ISO 格式`), Ee(r, "YYYY-MM-DD");
    }
  } catch (u) {
    return console.error("formatOutput 失敗:", u), r;
  }
}
function Wt(r, e) {
  const t = r.year * 1e4 + r.month * 100 + r.day, a = e.year * 1e4 + e.month * 100 + e.day;
  return t < a ? -1 : t > a ? 1 : 0;
}
function ua(r, e) {
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
function wo() {
  const r = Xe(), e = Ne(r.year, r.month, 1, 0, 0, 0), t = r.month === 12 ? 1 : r.month + 1, a = r.month === 12 ? r.year + 1 : r.year, n = Ne(a, t, 1), o = ua(n, -1);
  return { start: e, end: o };
}
function To(r, e) {
  if (!r || typeof r != "string")
    return false;
  try {
    const t = Vr(r);
    let a = true;
    if (e && (a = ca(e)), !t)
      return console.warn(`日期格式語義驗證失敗: "${r}"`), false;
    if (e && !a)
      return console.warn(`時間格式語義驗證失敗: "${e}"`), false;
    const n = (0, import_dayjs.default)("2000-12-31 23:59:59");
    let o = false;
    try {
      const u = n.format(r);
      o = u !== r && u.length > 0;
    } catch (u) {
      console.warn(`日期格式 dayjs 驗證失敗: "${r}"`, u), o = false;
    }
    let l = true;
    if (e)
      try {
        const u = n.format(e);
        l = u !== e && u.length > 0;
      } catch (u) {
        console.warn(`時間格式 dayjs 驗證失敗: "${e}"`, u), l = false;
      }
    let s = true;
    if (e)
      try {
        const u = `${r} ${e}`, h = n.format(u);
        s = h !== u && h.length > 0;
      } catch (u) {
        console.warn(`組合格式 dayjs 驗證失敗: "${r} ${e}"`, u), s = false;
      }
    return o && l && s;
  } catch (t) {
    return console.error("格式驗證時發生錯誤:", t), false;
  }
}
function Vr(r) {
  const e = ["YYYY", "YY", "MM", "M", "DD", "D"], t = ["-", "/", ".", " "];
  let a = r;
  t.forEach((f) => {
    a = a.replace(new RegExp(`\\${f}`, "g"), " ");
  });
  const n = a.split(/\s+/).filter(Boolean);
  if (!n.every((f) => e.includes(f))) return false;
  const l = n.some((f) => f === "YYYY" || f === "YY"), s = n.some((f) => f === "MM" || f === "M"), c = n.some((f) => f === "DD" || f === "D"), u = n.filter((f) => f === "YYYY" || f === "YY").length, h = n.filter((f) => f === "MM" || f === "M").length, p = n.filter((f) => f === "DD" || f === "D").length;
  return u > 1 || h > 1 || p > 1 ? false : l && s && c;
}
function ca(r) {
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
  if (!a.every((h) => e.includes(h)))
    return false;
  const o = a.some((h) => ["HH", "H"].includes(h)), l = a.some((h) => ["hh", "h"].includes(h)), s = a.some((h) => ["mm", "m"].includes(h));
  if (a.some((h) => ["A", "a"].includes(h)), !(o || l) || !s || l && o)
    return false;
  const u = e.reduce((h, p) => (h[p] = a.filter((f) => f === p).length, h), {});
  return !Object.values(u).some((h) => h > 1);
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
    Me(this, "id", "roc");
    Me(this, "yearRange", {
      min: 1,
      // 民國1年 (1912年)
      max: 200
      // 民國200年 (2111年)
    });
    Me(this, "displayName", {
      "zh-TW": "民國曆",
      "zh-CN": "民国历",
      "en-US": "ROC Calendar",
      "ja-JP": "中華民国暦",
      "ko-KR": "중화민국력"
    });
    Me(this, "YEAR_OFFSET", 1911);
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
      for (const c of s) {
        const u = this.tryParseWithSeparator(l, c);
        if (u) return u;
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
    const [, a, n, o] = t, l = parseInt(a), s = parseInt(n), c = parseInt(o);
    return this.validateAndConvertRocDate(l, s, c);
  }
  /**
   * 解析時間部分 (如: "上午 12時00分")
   */
  parseTimePart(e) {
    if (!e) return null;
    const t = e.trim(), a = t.match(/(上午|下午)\s*(\d{1,2})時(\d{2})分(?:(\d{2})秒)?/);
    if (a) {
      const [, o, l, s, c] = a;
      let u = parseInt(l);
      const h = parseInt(s), p = c ? parseInt(c) : 0;
      return o === "下午" && u !== 12 ? u += 12 : o === "上午" && u === 12 && (u = 0), u < 0 || u > 23 || h < 0 || h > 59 || p < 0 || p > 59 ? null : { hour: u, minute: h, second: p };
    }
    const n = t.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (n) {
      const [, o, l, s] = n, c = parseInt(o), u = parseInt(l), h = s ? parseInt(s) : 0;
      return c < 0 || c > 23 || u < 0 || u > 59 || h < 0 || h > 59 ? null : { hour: c, minute: u, second: h };
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
    const n = e.hour !== void 0 && e.hour !== null, o = t.split(" "), l = o[0], s = o.slice(1).join(" "), c = this.formatDatePart(e, l, a);
    if (s && n) {
      const u = this.detectTimeFormat(s), h = this.formatTimePart(e, s, u);
      return `${c} ${h}`;
    }
    return c;
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
    const c = new Date(e.year, e.month - 1, e.day);
    let u = (0, import_dayjs.default)(c).format(t);
    if (t.includes("YYYY"))
      u = u.replace(e.year.toString(), n.toString());
    else if (t.includes("YY")) {
      const h = e.year.toString().slice(-2), p = n.toString().slice(-2);
      u = u.replace(h, p);
    }
    return u;
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
    const s = e < 12 ? "上午" : "下午", c = e === 0 ? 12 : e > 12 ? e - 12 : e, u = l ? c.toString().padStart(2, "0") : c.toString(), h = t.toString().padStart(2, "0"), p = n ? a.toString().padStart(2, "0") : "";
    switch (o) {
      case "suffix":
        return n ? `${u}:${h}:${p} ${s}` : `${u}:${h} ${s}`;
      case "prefix":
        return n ? `${s} ${u}:${h}:${p}` : `${s} ${u}:${h}`;
      case "chinese":
        return n ? `${s} ${u}時${h}分${p}秒` : `${s} ${u}時${h}分`;
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
var xe = class xe2 {
  /**
   * 安全地創建日曆實例
   */
  static createSafeCalendar(e) {
    try {
      return $o(e);
    } catch (t) {
      return console.warn(`無法創建日曆 ${e}，回退到西元曆:`, t), new Ie();
    }
  }
  /**
   * 安全地進行日曆轉換
   */
  static safeToCalendar(e, t) {
    try {
      return Re(e, t);
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
      const l = this.createSafeCalendar(a), s = new ue(e, t, 1), c = a === "gregory" ? s : this.safeToCalendar(s, l), u = On(c, n) ?? 6, p = (mr(c, n) - o + 7) % 7, f = c.subtract({ days: p }), w = [];
      let T = f;
      const m = u * 7;
      for (let y = 0; y < m; y++)
        w.push(T), T = T.add({ days: 1 });
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
      return this.safeToCalendar(n, new Ie()).year;
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
      const c = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0;
      s = `${t} HH:mm:ss`;
    } else
      s = t;
    try {
      switch (o) {
        case "gregory":
          To(t, a) || (s = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0 ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD");
          const h = new Date(
            e.year,
            e.month - 1,
            e.day,
            e.hour || 0,
            e.minute || 0,
            e.second || 0
          );
          return (0, import_dayjs.default)(h).format(s);
        case "roc":
          const p = new Fr();
          if (p.supportsFormat(s) && p.canParseInput(s))
            return p.format(e, s, l);
          break;
        // 其他日曆插件可以在這裡添加
        case "buddhist":
        case "japanese":
        case "islamic":
        case "persian":
        case "hebrew":
          break;
      }
      const c = this.convertToCalendarDateSmart(e, o);
      if (c) {
        const h = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0, p = {
          calendar: o,
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        return h && (p.hour = "numeric", p.minute = "numeric", e.second !== void 0 && (p.second = "numeric")), new zt(l, p).format(c.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone));
      }
      const u = new Date(
        e.year,
        e.month - 1,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
      return (0, import_dayjs.default)(u).format(s);
    } catch (c) {
      console.warn("所有格式化方法都失敗，使用基本回退:", c);
      let u = `${e.year}-${e.month.toString().padStart(2, "0")}-${e.day.toString().padStart(2, "0")}`;
      return (e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0) && (u += ` ${(e.hour || 0).toString().padStart(2, "0")}:${(e.minute || 0).toString().padStart(2, "0")}`, e.second !== void 0 && (u += `:${e.second.toString().padStart(2, "0")}`)), u;
    }
  }
};
Me(xe, "convertToCalendarDateSmart", (e, t) => e ? e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0 ? xe.convertToCalendarDateTime(e, t) : xe.convertToCalendarDate(e, t) : null), /**
* 統一的轉換函數：SimpleDateValue → CalendarDate
*/
Me(xe, "convertToCalendarDate", (e, t) => {
  if (!e || e.year <= 0 || e.month <= 0 || e.day <= 0 || e.month > 12 || e.day > 31)
    return null;
  try {
    if (t === "gregory")
      return new ue(e.year, e.month, e.day);
    {
      const a = xe.createSafeCalendar(t), n = new ue(e.year, e.month, e.day);
      return xe.safeToCalendar(n, a);
    }
  } catch (a) {
    return console.error("轉換為 CalendarDate 失敗:", a), null;
  }
}), /**
* 統一的轉換函數：SimpleDateValue → CalendarDateTime (日期+時間)
*/
Me(xe, "convertToCalendarDateTime", (e, t) => {
  if (!e) return null;
  try {
    if (t === "gregory")
      return new it(
        e.year,
        e.month,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
    {
      const a = xe.createSafeCalendar(t), n = new it(
        e.year,
        e.month,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
      return Re(n, a);
    }
  } catch (a) {
    return console.error("轉換為 CalendarDateTime 失敗:", a), null;
  }
}), /**
* 統一的轉換函數：CalendarDate → SimpleDateValue
*/
Me(xe, "convertFromCalendarDate", (e, t) => {
  if (!e) return null;
  try {
    if (e.calendar.identifier === "gregory" || t === "gregory")
      return {
        year: e.year,
        month: e.month,
        day: e.day
      };
    {
      const a = xe.createSafeCalendar("gregory"), n = xe.safeToCalendar(e, a);
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
var me = xe;
var {
  // 轉換核心
  convertToCalendarDate: Xs,
  convertFromCalendarDate: ei,
  // 日曆基礎
  createSafeCalendar: ti,
  safeToCalendar: ai,
  generateCalendarDays: ri,
  // 年份轉換 (YearSelector)
  convertGregorianYear: ni,
  convertToGregorianYear: oi,
  getCalendarRange: li,
  // getCalendarYearRange,
  // 顯示相關
  getMonthNames: si,
  getCalendarDisplayName: ii,
  // 日曆系統輸出輸入轉換
  // isValidDate,
  // parseInput,
  isCalendarSupported: ui,
  formatOutput: ci
} = me;
var nt = (r) => /^\d+$/.test(r);
var or = (r) => r % 4 === 0 && r % 100 !== 0 || r % 400 === 0;
var Le = null;
function Ro() {
  return Le || (Le = document.createElement("span"), Le.style.visibility = "hidden", Le.style.position = "absolute", Le.style.top = "-9999px", Le.style.left = "-9999px", Le.style.whiteSpace = "pre", document.body.appendChild(Le)), Le;
}
var da = /* @__PURE__ */ new WeakMap();
function Eo(r, e = "") {
  const t = Ro(), a = getComputedStyle(r);
  return t.style.font = a.font, t.style.fontSize = a.fontSize, t.style.fontWeight = a.fontWeight, t.style.letterSpacing = a.letterSpacing, t.style.padding = a.padding, t.style.border = a.border, t.style.boxSizing = a.boxSizing, t.textContent = r.value || e || "", t.offsetWidth + 4;
}
function ft(r) {
  const e = r.placeholder || "", t = Eo(r, e), a = da.get(r) || 0;
  r.style.width = `${Math.max(t, a)}px`;
}
var ot = {
  // 初始設置
  mounted(r, e) {
    e.value && typeof e.value == "number" && da.set(r, e.value), ft(r), r.addEventListener("input", () => ft(r)), document.fonts && document.fonts.ready && document.fonts.ready.then(() => ft(r));
  },
  // 處理更新
  updated(r, e) {
    e.value && typeof e.value == "number" && e.oldValue !== e.value && da.set(r, e.value), ft(r);
  },
  // 為 Vue 3 添加 beforeUnmount
  beforeUnmount(r) {
    r.removeEventListener("input", () => ft(r));
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
      mounted: ot.mounted,
      updated: ot.updated,
      beforeUnmount: ot.beforeUnmount
    }, n = r, o = t, l = ref(""), s = ref(""), c = ref(""), u = ref({}), h = ref({}), p = ref(null), f = ref(false), w = ref(false), T = ref(null), m = ref(/* @__PURE__ */ new Map()), y = (C, x) => {
      C && C instanceof HTMLInputElement ? m.value.set(x, C) : m.value.delete(x);
    }, i = (C) => m.value.get(C), b = computed(() => {
      const C = {};
      return Object.entries(u.value).forEach(([x, U]) => {
        C[x] = U.key;
      }), C;
    }), M = computed(() => Object.keys(u.value).length > 0), D = computed(() => Object.values(b.value)), S = computed(() => {
      const C = n.dateFormat.toUpperCase(), x = [];
      return C.split(/[^A-Z]+/).filter(Boolean).forEach((ee) => {
        ee.includes("Y") ? x.push("year") : ee.includes("M") ? x.push("month") : ee.includes("D") && x.push("day");
      }), x.length !== 3 ? (console.warn(`Invalid date format: ${n.dateFormat}, falling back to YYYY-MM-DD`), ["year", "month", "day"]) : x;
    }), k = computed(() => {
      if (!l.value || !s.value || !c.value)
        return null;
      const C = l.value.padStart(4, "0"), x = s.value.padStart(2, "0"), U = c.value.padStart(2, "0");
      return `${C}-${x}-${U}`;
    }), d = computed(() => {
      if (!k.value) return null;
      const C = (0, import_dayjs.default)(k.value);
      return C.isValid() ? C.format(n.dateFormat) : null;
    });
    watch(() => n.modelValue, (C) => {
      if (f.value || (f.value = true), C) {
        const x = pe(C);
        x && (l.value = x.year.toString(), s.value = x.month.toString().padStart(2, "0"), c.value = x.day.toString().padStart(2, "0"));
      } else
        l.value = "", s.value = "", c.value = "";
      C || (T.value = null, w.value = false);
    }, { immediate: true });
    const g = () => {
      if (S.value.length === 0) return;
      const C = S.value[0], x = i(C);
      if (x && typeof x.focus == "function")
        try {
          x.focus();
        } catch (U) {
          console.warn("無法聚焦到輸入框:", U);
        }
      else
        for (const U of S.value) {
          const ee = i(U);
          if (ee && typeof ee.focus == "function")
            try {
              ee.focus();
              break;
            } catch (_) {
              console.warn("無法聚焦到輸入框:", _);
            }
        }
    }, v = (C) => {
      const x = i(C);
      if (x && typeof x.focus == "function")
        try {
          x.focus();
        } catch (U) {
          console.warn(`無法聚焦到 ${C} 輸入框:`, U);
        }
    }, A = (C, x) => {
      const U = i(C);
      if (U)
        try {
          if (typeof U.focus == "function" && U.focus(), typeof U.setSelectionRange == "function") {
            const ee = x === "end" ? U.value.length : 0;
            U.setSelectionRange(ee, ee);
          }
        } catch (ee) {
          console.warn(`無法聚焦或設置游標位置到 ${C} 輸入框:`, ee);
        }
    }, N = (C, x) => {
      const U = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return x === 2 ? or(C) ? 29 : 28 : U[x];
    }, J = (C, x) => {
      if (!x) return { valid: true };
      const U = parseInt(x);
      switch (C) {
        case "year":
          if (x.length < 4) return { valid: true };
          const ee = n.maxDate ? (0, import_dayjs.default)(n.maxDate).year() : (/* @__PURE__ */ new Date()).getFullYear() + 50, _ = n.minDate ? (0, import_dayjs.default)(n.minDate).year() : 1;
          if (!nt(x) || U < _ || U > ee)
            return { valid: false, error: { key: "year.outOfRange", params: { min: _, max: ee } } };
          if (s.value === "02" && c.value === "29" && !or(U))
            return { valid: false, error: { key: "year.notLeapYear", params: { year: U } } };
          break;
        case "month":
          if (!nt(x) || U < 1 || U > 12)
            return { valid: false, error: { key: "month.outOfRange" } };
          if (c.value && l.value) {
            const P = parseInt(l.value), K = N(P, U);
            if (parseInt(c.value) > K)
              return { valid: false, error: { key: "day.notExistInMonth", params: { month: x, maxDays: K } } };
          }
          break;
        case "day":
          if (!nt(x) || U < 1 || U > 31)
            return { valid: false, error: { key: "day.outOfRange" } };
          if (l.value && s.value) {
            const P = parseInt(l.value), K = parseInt(s.value), oe = N(P, K);
            if (U > oe)
              return K === 2 && U === 29 ? { valid: false, error: { key: "year.notLeapYear", params: { year: P } } } : { valid: false, error: { key: "day.notExistInMonth", params: { month: s.value, maxDays: oe } } };
          }
          break;
      }
      return u.value[C] && (delete u.value[C], delete h.value[C]), { valid: true };
    }, z = () => {
      if (!f.value) return;
      u.value = {}, h.value = {};
      const C = J("year", l.value), x = J("month", s.value), U = J("day", c.value);
      if (!C.valid && C.error && (u.value.year = C.error, C.error.params && (h.value.year = C.error.params)), !x.valid && x.error && (u.value.month = x.error, x.error.params && (h.value.month = x.error.params)), !U.valid && U.error && (u.value.day = U.error, U.error.params && (h.value.day = U.error.params)), n.required && (l.value || (u.value.year = { key: "year.required" }), s.value || (u.value.month = { key: "month.required" }), c.value || (u.value.day = { key: "day.required" })), k.value && Object.keys(u.value).length === 0) {
        const ee = (0, import_dayjs.default)(k.value);
        if (!ee.isValid())
          u.value.day = { key: "day.invalid" };
        else if (n.minDate && ee.isBefore((0, import_dayjs.default)(n.minDate)))
          u.value.day = {
            key: "date.beforeMin",
            params: { minDate: (0, import_dayjs.default)(n.minDate).format(n.dateFormat) }
          }, h.value.day = { minDate: (0, import_dayjs.default)(n.minDate).format(n.dateFormat) };
        else if (n.maxDate && ee.isAfter((0, import_dayjs.default)(n.maxDate)))
          u.value.day = {
            key: "date.afterMax",
            params: { maxDate: (0, import_dayjs.default)(n.maxDate).format(n.dateFormat) }
          }, h.value.day = { maxDate: (0, import_dayjs.default)(n.maxDate).format(n.dateFormat) };
        else if (d.value) {
          o("update:modelValue", d.value);
          const _ = d.value;
          _ !== T.value && !w.value && (T.value = _, o("complete", d.value));
        }
      } else f.value && !l.value && !s.value && !c.value && (o("update:modelValue", null), T.value = null);
      o("validation", !M.value, b.value, h.value);
    }, ae = () => {
      l.value = "", s.value = "", c.value = "", u.value = {};
    }, G = (C) => {
      const x = S.value.findIndex((ee) => ee === C), U = x < S.value.length - 1 ? S.value[x + 1] : null;
      U ? nextTick(() => {
        v(U);
      }) : z();
    }, O = (C, x, U, ee) => {
      const _ = x.replace(/\D/g, "");
      if (_.length === 1 && w.value && (w.value = false), _.length <= U) {
        if (ee && _.length === 1 && parseInt(_) > ee) {
          const P = _.padStart(2, "0");
          C === "year" ? l.value = P : C === "month" ? s.value = P : C === "day" && (c.value = P), G(C);
        } else
          C === "year" ? l.value = _ : C === "month" ? s.value = _ : C === "day" && (c.value = _);
        _.length === U && G(C);
      }
    }, E = (C) => {
      const x = C.target;
      O("year", x.value, 4);
    }, $ = (C) => {
      const x = C.target;
      O("month", x.value, 2, 1);
    }, L = (C) => {
      const x = C.target;
      O("day", x.value, 2, 3);
    }, H = () => {
      nextTick(() => {
        if (S.value.length === 0) return;
        const C = S.value[S.value.length - 1], x = i(C);
        if (x && typeof x.focus == "function")
          try {
            x.focus();
            const U = x.value.length;
            x.setSelectionRange(U, U);
          } catch (U) {
            console.warn("無法聚焦到最後一個輸入框:", U);
          }
      });
    }, te = (C, x) => {
      const U = C.target, ee = S.value.findIndex((K) => K === x), _ = ee > 0 ? S.value[ee - 1] : null, P = ee < S.value.length - 1 ? S.value[ee + 1] : null;
      C.key === "Backspace" && U.value === "" && _ && (C.preventDefault(), w.value = true, A(_, "end")), C.key === "ArrowLeft" && U.selectionStart === 0 && _ && (C.preventDefault(), w.value = true, A(_, "end")), C.key === "ArrowRight" && U.selectionStart === U.value.length && P && (C.preventDefault(), w.value = true, A(P, "start")), C.key === "Enter" && z();
    }, ce = (C) => {
      p.value = C;
    }, se = (C) => {
      z(), p.value = null;
    };
    return e({
      validate: z,
      reset: () => {
        ae(), o("update:modelValue", null);
      },
      getErrors: () => ({ ...u.value }),
      hasErrors: () => M.value,
      errorMessages: () => D.value,
      focus: g,
      focusLast: H,
      setDate: (C) => {
        if (C) {
          const x = pe(C);
          x && (l.value = x.year.toString(), s.value = x.month.toString().padStart(2, "0"), c.value = x.day.toString().padStart(2, "0"), z());
        } else
          ae(), o("update:modelValue", null);
      },
      resetCompletionState: () => {
        w.value = false, T.value = null;
      }
    }), (C, x) => (openBlock(), createElementBlock("div", Io, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (U, ee) => (openBlock(), createElementBlock(Fragment, { key: U }, [
        U === "year" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 0,
          ref_for: true,
          ref: (_) => y(_, "year"),
          "onUpdate:modelValue": x[0] || (x[0] = (_) => l.value = _),
          type: "text",
          inputmode: "numeric",
          placeholder: C.yearPlaceholder,
          maxlength: 4,
          class: "date-input text-sm text-center active:bg-vdt-theme-100",
          onInput: E,
          onKeydown: x[1] || (x[1] = (_) => te(_, "year")),
          onFocus: x[2] || (x[2] = (_) => ce("year")),
          onBlur: x[3] || (x[3] = (_) => se()),
          "aria-label": "year",
          "aria-invalid": !!b.value.year,
          "aria-errormessage": b.value.year ? "year-error" : void 0
        }, null, 40, Oo)), [
          [vModelText, l.value],
          [a, 20]
        ]) : U === "month" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 1,
          ref_for: true,
          ref: (_) => y(_, "month"),
          "onUpdate:modelValue": x[4] || (x[4] = (_) => s.value = _),
          type: "text",
          inputmode: "numeric",
          placeholder: C.monthPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: $,
          onKeydown: x[5] || (x[5] = (_) => te(_, "month")),
          onFocus: x[6] || (x[6] = (_) => ce("month")),
          onBlur: x[7] || (x[7] = (_) => se()),
          "aria-label": "month",
          "aria-invalid": !!b.value.month,
          "aria-errormessage": b.value.month ? "month-error" : void 0
        }, null, 40, Vo)), [
          [vModelText, s.value],
          [a, 20]
        ]) : U === "day" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 2,
          ref_for: true,
          ref: (_) => y(_, "day"),
          "onUpdate:modelValue": x[8] || (x[8] = (_) => c.value = _),
          type: "text",
          inputmode: "numeric",
          placeholder: C.dayPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: L,
          onKeydown: x[9] || (x[9] = (_) => te(_, "day")),
          onFocus: x[10] || (x[10] = (_) => ce("day")),
          onBlur: x[11] || (x[11] = (_) => se()),
          "aria-label": "day",
          "aria-invalid": !!b.value.day,
          "aria-errormessage": b.value.day ? "day-error" : void 0
        }, null, 40, Fo)), [
          [vModelText, c.value],
          [a, 20]
        ]) : createCommentVNode("", true),
        ee < S.value.length - 1 ? (openBlock(), createElementBlock("span", Po, toDisplayString(C.separator), 1)) : createCommentVNode("", true)
      ], 64))), 128))
    ]));
  }
});
var Je = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [a, n] of e)
    t[a] = n;
  return t;
};
var fa = Je(Ao, [["__scopeId", "data-v-917a492c"]]);
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
      mounted: ot.mounted,
      updated: ot.updated,
      beforeUnmount: ot.beforeUnmount
    }, n = r, o = t, l = ref(""), s = ref(""), c = ref(""), u = ref("AM"), h = ref({}), p = ref({}), f = ref(null), w = ref(false), T = ref(), m = ref(), y = ref(), i = computed(() => Object.keys(h.value).length > 0), b = computed(() => {
      const O = {};
      return Object.entries(h.value).forEach(([E, $]) => {
        O[E] = $.key;
      }), O;
    }), M = () => {
      l.value = "", s.value = "", c.value = "", u.value = "AM";
    }, D = computed(() => {
      var O, E;
      if (!n.useLocalizedPeriod) return u.value;
      try {
        const $ = /* @__PURE__ */ new Date();
        $.setHours(9, 0, 0);
        const L = /* @__PURE__ */ new Date();
        L.setHours(15, 0, 0);
        const H = new Intl.DateTimeFormat(n.locale, {
          hour: "numeric",
          hour12: true
        }), te = H.formatToParts($), ce = H.formatToParts(L), se = ((O = te.find((x) => x.type === "dayPeriod")) == null ? void 0 : O.value) || "AM", C = ((E = ce.find((x) => x.type === "dayPeriod")) == null ? void 0 : E.value) || "PM";
        return u.value === "AM" ? se : C;
      } catch ($) {
        return console.error("Error getting localized period:", $), u.value;
      }
    }), S = computed(() => D.value), k = computed(() => {
      if (l.value === "" || s.value === "" || n.enableSeconds && c.value === "")
        return null;
      let O = parseInt(l.value, 10);
      n.use24Hour || (u.value === "PM" && O < 12 ? O += 12 : u.value === "AM" && O === 12 && (O = 0));
      const E = O.toString().padStart(2, "0"), $ = s.value.padStart(2, "0");
      if (n.enableSeconds) {
        const L = c.value.padStart(2, "0");
        return `${E}:${$}:${L}`;
      } else
        return `${E}:${$}`;
    });
    watch(() => n.modelValue, (O) => {
      if (w.value || (w.value = true), O) {
        const E = O.split(":");
        let $ = parseInt(E[0] || "0", 10);
        const L = (E[1] || "").replace(/\D/g, ""), H = (E[2] || "").replace(/\D/g, "");
        n.use24Hour || ($ >= 12 ? (u.value = "PM", $ = $ === 12 ? 12 : $ - 12) : (u.value = "AM", $ = $ === 0 ? 12 : $)), l.value = $.toString().padStart(2, "0"), s.value = L, n.enableSeconds && (c.value = H);
      } else
        M();
    }, { immediate: true });
    const d = (O, E) => {
      if (!E) return { valid: true };
      const $ = parseInt(E);
      switch (O) {
        case "hour":
          const L = n.use24Hour ? 23 : 12, H = n.use24Hour ? 0 : 1;
          if (!nt(E) || $ < H || $ > L)
            return { valid: false, error: { key: "time.hourOutOfRange", params: { min: H, max: L } } };
          break;
        case "minute":
          if (!nt(E) || $ < 0 || $ > 59)
            return { valid: false, error: { key: "time.minuteOutOfRange", params: { min: 0, max: 59 } } };
          if (n.minuteStep > 1 && $ % n.minuteStep !== 0)
            return { valid: false, error: { key: "time.minuteStepInvalid", params: { step: n.minuteStep } } };
          break;
        case "second":
          if (!nt(E) || $ < 0 || $ > 59)
            return { valid: false, error: { key: "time.secondOutOfRange", params: { min: 0, max: 59 } } };
          break;
      }
      return h.value[O] && (delete h.value[O], delete p.value[O]), { valid: true };
    }, g = () => {
      u.value = u.value === "AM" ? "PM" : "AM", v();
    }, v = () => {
      if (!w.value) return;
      h.value = {}, p.value = {};
      const O = d("hour", l.value), E = d("minute", s.value), $ = n.enableSeconds ? d("second", c.value) : { valid: true };
      !O.valid && O.error && (h.value.hour = O.error, O.error.params && (p.value.hour = O.error.params)), !E.valid && E.error && (h.value.minute = E.error, E.error.params && (p.value.minute = E.error.params)), !$.valid && $.error && (h.value.second = $.error, $.error.params && (p.value.second = $.error.params)), n.required && (l.value || (h.value.hour = { key: "time.hourRequired" }), s.value || (h.value.minute = { key: "time.minuteRequired" }), n.enableSeconds && !c.value && (h.value.second = { key: "time.secondRequired" })), o("validation", !i.value, b.value, p.value), k.value ? (o("update:modelValue", k.value), o("complete", k.value)) : w.value && o("update:modelValue", null);
    }, A = (O) => {
      const $ = O.target.value.replace(/\D/g, "");
      if ($.length <= 2) {
        if (l.value = $, !d("hour", $).valid) return;
        ($.length === 2 || n.use24Hour && parseInt($) > 2 || !n.use24Hour && parseInt($) > 1) && nextTick(() => {
          var H;
          (H = m.value) == null || H.focus();
        });
      }
    }, N = (O) => {
      const $ = O.target.value.replace(/\D/g, "");
      if ($.length <= 2) {
        if ($.length === 1 && parseInt($) > 5 ? (s.value = $.padStart(2, "0"), nextTick(() => {
          n.enableSeconds && y.value ? y.value.focus() : v();
        })) : s.value = $, !d("minute", $).valid) return;
        $.length === 2 && nextTick(() => {
          n.enableSeconds && y.value ? y.value.focus() : v();
        });
      }
    }, J = (O) => {
      const $ = O.target.value.replace(/\D/g, "");
      if ($.length <= 2) {
        if ($.length === 1 && parseInt($) > 5 ? (c.value = $.padStart(2, "0"), v()) : c.value = $, !d("second", $).valid) return;
        $.length === 2 && v();
      }
    }, z = (O, E) => {
      var L, H, te, ce, se, C, x, U, ee, _, P, K;
      const $ = O.target;
      if (O.key === "Backspace" && $.value === "")
        switch (E) {
          case "hour":
            O.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            O.preventDefault(), (L = T.value) == null || L.focus(), (H = T.value) == null || H.setSelectionRange(-1, -1);
            break;
          case "second":
            O.preventDefault(), (te = m.value) == null || te.focus(), (ce = m.value) == null || ce.setSelectionRange(-1, -1);
            break;
        }
      if (O.key === "ArrowLeft" && $.selectionStart === 0)
        switch (E) {
          case "hour":
            O.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            O.preventDefault(), (se = T.value) == null || se.focus(), (C = T.value) == null || C.setSelectionRange(-1, -1);
            break;
          case "second":
            O.preventDefault(), (x = m.value) == null || x.focus(), (U = m.value) == null || U.setSelectionRange(-1, -1);
            break;
        }
      if (O.key === "ArrowRight" && $.selectionStart === $.value.length)
        switch (E) {
          case "hour":
            O.preventDefault(), (ee = m.value) == null || ee.focus(), (_ = m.value) == null || _.setSelectionRange(0, 0);
            break;
          case "minute":
            n.enableSeconds && (O.preventDefault(), (P = y.value) == null || P.focus(), (K = y.value) == null || K.setSelectionRange(0, 0));
            break;
        }
      O.key === "Enter" && v();
    }, ae = (O) => {
      f.value = O;
    }, G = (O) => {
      f.value = null, v();
    };
    return e({
      validate: v,
      reset: () => {
        M(), h.value = {}, p.value = {}, o("update:modelValue", null);
      },
      getErrors: () => b.value,
      hasErrors: i,
      setTime: (O) => {
        if (O) {
          const [E, $, L] = O.split(":");
          let H = parseInt(E);
          n.use24Hour || (H >= 12 ? (u.value = "PM", H = H === 12 ? 12 : H - 12) : (u.value = "AM", H = H === 0 ? 12 : H)), l.value = H.toString().padStart(2, "0"), s.value = $, n.enableSeconds && L && (c.value = L), v();
        } else
          M(), o("update:modelValue", null);
      },
      focus: () => {
        var O;
        (O = T.value) == null || O.focus();
      },
      focusLast: () => {
        n.enableSeconds && y.value ? (y.value.focus(), y.value.setSelectionRange(0, 0)) : m.value ? (m.value.focus(), m.value.setSelectionRange(0, 0)) : T.value && (T.value.focus(), T.value.setSelectionRange(0, 0));
      }
    }), (O, E) => (openBlock(), createElementBlock("div", Lo, [
      withDirectives(createBaseVNode("input", {
        ref_key: "hourRef",
        ref: T,
        "onUpdate:modelValue": E[0] || (E[0] = ($) => l.value = $),
        type: "text",
        inputmode: "numeric",
        placeholder: O.hourPlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: A,
        onKeydown: E[1] || (E[1] = ($) => z($, "hour")),
        onFocus: E[2] || (E[2] = ($) => ae("hour")),
        onBlur: E[3] || (E[3] = ($) => G()),
        "aria-label": "hour",
        "aria-invalid": !!h.value.hour,
        "aria-errormessage": h.value.hour ? "hour-error" : void 0
      }, null, 40, Ho), [
        [vModelText, l.value],
        [a, 20]
      ]),
      E[13] || (E[13] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
      withDirectives(createBaseVNode("input", {
        ref_key: "minuteRef",
        ref: m,
        "onUpdate:modelValue": E[4] || (E[4] = ($) => s.value = $),
        type: "text",
        inputmode: "numeric",
        placeholder: O.minutePlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: N,
        onKeydown: E[5] || (E[5] = ($) => z($, "minute")),
        onFocus: E[6] || (E[6] = ($) => ae("minute")),
        onBlur: E[7] || (E[7] = ($) => G()),
        "aria-label": "minute",
        "aria-invalid": !!h.value.minute,
        "aria-errormessage": h.value.minute ? "minute-error" : void 0
      }, null, 40, Bo), [
        [vModelText, s.value],
        [a, 20]
      ]),
      O.enableSeconds ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        E[12] || (E[12] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
        withDirectives(createBaseVNode("input", {
          ref_key: "secondRef",
          ref: y,
          "onUpdate:modelValue": E[8] || (E[8] = ($) => c.value = $),
          type: "text",
          inputmode: "numeric",
          placeholder: O.secondPlaceholder,
          maxlength: 2,
          class: "time-input text-sm text-center",
          onInput: J,
          onKeydown: E[9] || (E[9] = ($) => z($, "second")),
          onFocus: E[10] || (E[10] = ($) => ae("second")),
          onBlur: E[11] || (E[11] = ($) => G()),
          "aria-label": "second",
          "aria-invalid": !!h.value.second,
          "aria-errormessage": h.value.second ? "second-error" : void 0
        }, null, 40, qo), [
          [vModelText, c.value],
          [a, 20]
        ])
      ], 64)) : createCommentVNode("", true),
      O.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
        key: 1,
        type: "button",
        class: normalizeClass(["time-period pl-2 text-sm cursor-pointer", l.value ? "text-vdt-content" : "text-gray-400"]),
        onClick: withModifiers(g, ["stop"])
      }, toDisplayString(S.value), 3))
    ]));
  }
});
var ma = Je(No, [["__scopeId", "data-v-fb3720c7"]]);
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
var jo = {
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
var Wo = {
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
var He = {
  "zh-TW": Uo,
  "zh-CN": zo,
  "en-US": jo,
  "ja-JP": Wo,
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
    Me(this, "currentLocale", "zh-TW");
  }
  setLocale(e) {
    if (!He[e]) {
      console.warn(`Locale '${e}' not found, falling back to 'zh-TW'`), this.currentLocale = "zh-TW";
      return;
    }
    this.currentLocale = e;
  }
  // 註冊自定義語言包
  registerLocale(e, t) {
    He[e] = t;
  }
  // 檢查語言包是否存在
  hasLocale(e) {
    return !!He[e];
  }
  // 獲取所有可用語言
  getAvailableLocales() {
    return Object.keys(He);
  }
  getCurrentLocale() {
    return this.currentLocale;
  }
  getMessage(e, t) {
    const a = e.split(".");
    let n = He[this.currentLocale];
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
    if (!He[e]) {
      console.warn(`Locale '${e}' not found. Please register it first using registerLocale().`);
      return;
    }
    He[e] = {
      ...He[e],
      ...this.deepMerge(He[e], t)
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
function Mt(r = "en-US", e) {
  const t = new _o(), a = ref(r);
  e && r && t.registerLocale(r, e), t.setLocale(r);
  const n = (p, f) => {
    a.value = p, f && t.registerLocale(p, f), t.setLocale(p);
  }, o = (p, f) => t.getMessage(p, f), l = (p, f) => t.getErrorMessage(p, f), s = (p, f) => t.getPlaceholderMessage(p, f), c = (p, f) => Pr(p, f), u = (p, f) => {
    t.registerLocale(p, f);
  }, h = (p) => t.hasLocale(p);
  return {
    currentLocale: computed(() => a.value),
    setLocale: n,
    getMessage: o,
    getErrorMessage: l,
    getPlaceholderMessage: s,
    formatText: c,
    registerCustomLocale: u,
    hasLocale: h
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
    const t = r, { currentLocale: a, setLocale: n, getErrorMessage: o } = Mt(t.locale);
    watch(() => t.locale, (i) => {
      i && t.useI18n && n(i);
    }, { immediate: true });
    const l = ref({}), s = ref({}), c = computed(() => ({
      ...t.customMessages,
      ...l.value
    })), u = computed(() => t.errors ? Array.isArray(t.errors) ? t.errors.length > 0 : typeof t.errors == "string" ? t.errors.trim().length > 0 : typeof t.errors == "object" ? Object.values(t.errors).some((i) => i && i.trim().length > 0) : false : false), h = computed(() => {
      if (!t.errors) return null;
      if (typeof t.errors == "string")
        return m(t.errors);
      if (Array.isArray(t.errors))
        return t.errors.map((i, b) => ({
          field: `item-${b}`,
          message: m(i),
          originalKey: i,
          params: {}
        }));
      if (typeof t.errors == "object") {
        const i = {};
        return Object.entries(t.errors).forEach(([b, M]) => {
          var D;
          if (M) {
            s.value[b] = M;
            const S = ((D = t.errorParams) == null ? void 0 : D[b]) || {};
            i[b] = m(M, b, S), t.debug && console.log(`Processing error for field "${b}":`, {
              original: M,
              params: S,
              translated: i[b],
              field: b,
              slotName: w(b)
            });
          }
        }), i;
      }
      return t.errors;
    }), p = computed(() => t.errorParams || {});
    function f(i) {
      return s.value[i];
    }
    function w(i) {
      return `error-${i.replace(/^(date|time|range)\./, "")}`;
    }
    function T(i) {
      return i.startsWith("date.") ? "date" : i.startsWith("time.") ? "time" : i.startsWith("range.") ? "range" : "unknown";
    }
    function m(i, b, M = {}) {
      if (t.debug && console.log(`翻譯訊息: "${i}", field: "${b}", params:`, M), c.value[i])
        return c.value[i];
      if (!t.useI18n)
        return i;
      if (/^[a-zA-Z]+\.[a-zA-Z]+$/.test(i))
        try {
          const k = o(i, M);
          if (t.debug && console.log(`Locale key 翻譯: "${i}" -> "${k}" with params:`, M), k && k !== i)
            return k;
        } catch (k) {
          t.debug && console.warn(`Locale key 翻譯失敗: ${i}`, k);
        }
      const S = t.messageKeyMap[i];
      if (S)
        try {
          const k = o(S, M);
          if (t.debug && console.log(`MessageKeyMap 翻譯: "${i}" -> "${k}" with params:`, M), k && k !== S)
            return k;
        } catch (k) {
          t.debug && console.warn(`MessageKeyMap 翻譯失敗: ${S}`, k);
        }
      return y(i, b, M);
    }
    function y(i, b, M = {}) {
      t.debug && console.log(`smartTranslateError: "${i}", field: "${b}", params:`, M);
      const D = {
        請選擇日期: "date.required",
        請選擇時間: "time.required",
        請選擇開始日期: "range.startRequired",
        請選擇結束日期: "range.endRequired",
        "Please select a date": "date.required",
        "Please select a time": "time.required",
        "Please select start date": "range.startRequired",
        "Please select end date": "range.endRequired"
      };
      if (D[i])
        try {
          const g = o(D[i], M);
          if (t.debug && console.log(`直接匹配翻譯: "${i}" -> "${g}" with params:`, M), g && g !== D[i])
            return g;
        } catch (g) {
          t.debug && console.warn(`直接匹配翻譯失敗: ${D[i]}`, g);
        }
      function S(g, v) {
        if (/請輸入|please enter|required/i.test(g)) {
          if (v != null && v.includes("year") || g.includes("年份")) return "year.required";
          if (v != null && v.includes("month") || g.includes("月份")) return "month.required";
          if (v != null && v.includes("day") || g.includes("日期")) return "day.required";
          if (v != null && v.includes("hour") || g.includes("小時")) return "time.hourRequired";
          if (v != null && v.includes("minute") || g.includes("分鐘")) return "time.minuteRequired";
          if (v != null && v.includes("second") || g.includes("秒鐘")) return "time.secondRequired";
          if (v != null && v.includes("startDate") || g.includes("開始日期")) return "range.startRequired";
          if (v != null && v.includes("endDate") || g.includes("結束日期")) return "range.endRequired";
          if (v != null && v.includes("time") || g.includes("時間")) return "time.required";
          if (v != null && v.includes("date") || g.includes("日期")) return "date.required";
        }
        return null;
      }
      const k = S(i, b);
      if (k)
        try {
          const g = o(k, M);
          if (t.debug && console.log(`智能匹配翻譯: "${i}" -> "${g}" with params:`, M), g && g !== k)
            return g;
        } catch (g) {
          t.debug && console.warn(`智能匹配翻譯失敗: ${k}`, g);
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
          handler: (g) => g != null && g.includes("year") ? "year.invalid" : g != null && g.includes("month") ? "month.invalid" : g != null && g.includes("day") ? "day.invalid" : g != null && g.includes("time") || g != null && g.includes("hour") || g != null && g.includes("minute") || g != null && g.includes("second") ? "time.invalid" : "date.invalid"
        }
      ];
      for (const g of d)
        if (g.regex.test(i)) {
          const v = g.handler ? g.handler(b) : g.key;
          if (v)
            try {
              const A = o(v, M);
              if (t.debug && console.log(`模式匹配翻譯: "${i}" -> "${A}" (key: ${v}) with params:`, M), A && A !== v)
                return A;
            } catch (A) {
              t.debug && console.warn(`模式匹配翻譯失敗: ${v}`, A);
            }
        }
      return t.debug && console.log(`無法翻譯，返回原始訊息: "${i}"`), i;
    }
    return e({
      hasErrors: u,
      processedErrors: h,
      processedErrorParams: p,
      translateMessage: m,
      getOriginalKey: f,
      getSlotName: w,
      getFieldType: T,
      setLocale: (i) => {
        n(i);
      },
      addCustomTranslation: (i, b) => {
        l.value[i] = b;
      },
      currentLocale: a
    }), (i, b) => u.value ? (openBlock(), createElementBlock("div", Ko, [
      Array.isArray(h.value) ? (openBlock(), createElementBlock("div", Qo, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(h.value, (M, D) => (openBlock(), createElementBlock("div", { key: D }, [
          renderSlot(i.$slots, `error-${M.field}`, {
            error: M,
            message: M.message,
            field: M.field,
            errorParams: M.params
          }, () => [
            createBaseVNode("span", null, toDisplayString(M.message), 1)
          ])
        ]))), 128))
      ])) : typeof h.value == "string" ? (openBlock(), createElementBlock("div", Zo, [
        renderSlot(i.$slots, "error-single", {
          error: h.value,
          message: h.value
        }, () => [
          createBaseVNode("span", null, toDisplayString(h.value), 1)
        ])
      ])) : typeof h.value == "object" ? (openBlock(), createElementBlock("div", Go, [
        renderSlot(i.$slots, "error", {
          errors: h.value,
          errorParams: t.errorParams
        }, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(h.value, (M, D) => (openBlock(), createElementBlock("div", { key: D }, [
            renderSlot(i.$slots, w(D), {
              field: D,
              error: M,
              message: M,
              originalKey: f(D),
              fieldType: T(D),
              errorParams: t.errorParams[D] || {}
            }, () => [
              createBaseVNode("span", null, toDisplayString(M), 1)
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
var Lr = Je(Xo, [["render", tl]]);
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
var Hr = Je(al, [["render", nl]]);
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
var Br = Je(ol, [["render", sl]]);
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
    const a = r, n = t, { getMessage: o, formatText: l } = Mt(a.locale), s = ref(null), c = ref(null), u = computed(() => me.getCalendarRange(a.calendar)), h = computed(() => me.getCalendarDisplayName(a.calendar, a.locale)), p = computed(() => a.calendar === "gregory"), f = computed(() => a.calendar === "japanese"), w = computed(() => k.value[0]), T = computed(() => k.value[k.value.length - 1]), m = ref(0), y = ($) => {
      const L = Math.floor($ / a.pageSize) * a.pageSize;
      return Math.max(L, u.value.min);
    }, i = () => {
      m.value = y(a.selectedYear);
    }, b = /* @__PURE__ */ new Map(), M = ($, L) => {
      const H = `${$}-${L}`;
      if (!b.has(H))
        try {
          b.set(H, new zt(L, { calendar: $, year: "numeric", era: "short" }));
        } catch {
          b.set(H, new zt(L, { year: "numeric" }));
        }
      return b.get(H);
    }, D = ($) => {
      var H, te;
      const L = {
        gregorianYear: $,
        displayEra: "",
        displayYear: $.toString(),
        showReference: false,
        displayWarning: false
      };
      if (p.value)
        return L;
      try {
        const ce = new ue($, 6, 1), se = me.safeToCalendar(ce, me.createSafeCalendar(a.calendar)), x = M(a.calendar, a.locale).formatToParts(se.toDate("UTC"));
        L.displayYear = ((H = x.find((_) => _.type === "year")) == null ? void 0 : H.value) || $.toString(), L.displayEra = ((te = x.find((_) => _.type === "era")) == null ? void 0 : te.value) || "";
        const U = !!L.displayEra, ee = L.displayEra !== $.toString();
        (U || ee) && (L.showReference = true, L.referenceYear = $.toString());
      } catch {
        if (L.displayWarning = true, L.warningMessage = `無法轉換為${h.value}`, a.calendar === "roc") {
          const se = $ - 1911;
          L.displayYear = se > 0 ? se.toString() : `民國前${Math.abs(se - 1)}年`;
        }
      }
      return L;
    }, S = ($) => $ >= u.value.min && $ <= u.value.max, k = computed(() => {
      const $ = m.value, L = [];
      for (let H = 0; H < a.pageSize; H++) {
        const te = $ + H;
        if (te > u.value.max) break;
        te < u.value.min || L.push(D(te));
      }
      return L;
    }), d = computed(() => {
      const $ = k.value;
      if ($.length === 0) return "";
      const L = $[0], H = $[$.length - 1];
      if (p.value)
        return `${L.displayYear} - ${H.displayYear}`;
      if (L.gregorianYear === H.gregorianYear)
        return L.displayYear;
      const te = L.displayEra, ce = H.displayEra;
      return te && ce && te === ce ? `${te} ${L.displayYear} - ${H.displayYear}` : `${L.displayEra} ${L.displayYear} - ${H.displayEra} ${H.displayYear}`;
    }), g = computed(() => m.value > u.value.min), v = computed(() => m.value + a.pageSize <= u.value.max), A = () => {
      g.value && (m.value = Math.max(
        m.value - a.pageSize,
        u.value.min
      ));
    }, N = () => {
      v.value && (m.value = Math.min(
        m.value + a.pageSize,
        u.value.max
      ));
    }, J = ($) => {
      S($) && (n("year-selected", $), n("update:showSelector", false));
    }, z = () => {
      c.value && (S(c.value) ? (m.value = y(c.value), n("year-selected", c.value), n("update:showSelector", false), c.value = null) : console.warn(`年份 ${c.value} 超出範圍 ${u.value.min}-${u.value.max}`));
    }, ae = () => {
      const $ = Math.max(u.value.min, Math.min((/* @__PURE__ */ new Date()).getFullYear(), u.value.max));
      n("year-selected", $);
    }, G = ($) => o(`yearSelector.${$}`);
    watch([() => a.selectedYear, () => a.calendar], () => {
      S(a.selectedYear) && (m.value = y(a.selectedYear));
    }, { immediate: true });
    const E = ($) => {
      if (a.showSelector && s.value) {
        const L = $.target, H = !!L.closest("[data-year-selector-button]");
        !s.value.contains(L) && !H && n("update:showSelector", false);
      }
    };
    return onMounted(() => {
      i(), document.addEventListener("mousedown", E);
    }), onBeforeUnmount(() => {
      document.removeEventListener("mousedown", E);
    }), e({
      getLocalizedText: G,
      formatText: l,
      goToSpecificYear: z,
      goToValidRange: ae
    }), ($, L) => $.showSelector ? (openBlock(), createElementBlock("div", {
      key: 0,
      ref_key: "yearSelectorRef",
      ref: s,
      class: "absolute top-full mt-1 right-0 min-w-56 max-h-72 overflow-auto bg-vdt-surface-elevated text-vdt-content border border-vdt-outline rounded-md shadow-lg z-20"
    }, [
      createBaseVNode("div", il, [
        createBaseVNode("button", {
          type: "button",
          onClick: A,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !g.value }]),
          disabled: !g.value,
          "aria-label": "previous year"
        }, [
          createVNode(Hr, { class: "h-4 w-4" })
        ], 10, ul),
        createBaseVNode("span", cl, [
          renderSlot($.$slots, "year-range-display", {
            firstYear: w.value,
            lastYear: T.value,
            displayText: d.value
          }, () => [
            createTextVNode(toDisplayString(d.value), 1)
          ], true)
        ]),
        createBaseVNode("button", {
          type: "button",
          onClick: N,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !v.value }]),
          disabled: !v.value,
          "aria-label": "next year"
        }, [
          createVNode(Br, { class: "h-4 w-4" })
        ], 10, dl)
      ]),
      k.value.length > 0 ? (openBlock(), createElementBlock("div", fl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(k.value, (H) => (openBlock(), createElementBlock("button", {
          type: "button",
          key: H.gregorianYear,
          onClick: (te) => J(H.gregorianYear),
          class: normalizeClass([
            "p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200",
            $.selectedYear === H.gregorianYear ? "bg-vdt-theme-500 text-white" : "hover:bg-vdt-interactive-hover text-vdt-content",
            H.displayWarning ? "ring-1 ring-amber-400" : ""
          ]),
          title: H.warningMessage
        }, [
          renderSlot($.$slots, "year-display", {
            yearData: H,
            isSelected: $.selectedYear === H.gregorianYear
          }, () => [
            createBaseVNode("div", hl, [
              f.value ? (openBlock(), createElementBlock("div", vl, toDisplayString(H.displayEra), 1)) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(H.displayYear), 1)
            ]),
            H.showReference ? (openBlock(), createElementBlock("div", pl, toDisplayString(H.referenceYear), 1)) : createCommentVNode("", true)
          ], true)
        ], 10, ml))), 128))
      ])) : (openBlock(), createElementBlock("div", gl, [
        renderSlot($.$slots, "no-years-display", {
          calendarRange: u.value,
          goToValidRange: ae
        }, () => [
          createBaseVNode("div", yl, toDisplayString(G("noYearsToDisplay")), 1),
          createBaseVNode("button", {
            type: "button",
            onClick: ae,
            class: "text-xs bg-vdt-theme-100 hover:bg-vdt-theme-200 px-3 py-1 rounded text-vdt-theme-700"
          }, toDisplayString(G("returnToValidRange")), 1)
        ], true)
      ])),
      createBaseVNode("div", $l, [
        renderSlot($.$slots, "year-input", {
          yearInput: c.value,
          calendarRange: u.value,
          calendarDisplayName: h.value,
          goToSpecificYear: z,
          getLocalizedText: G,
          formatText: unref(l)
        }, () => [
          createBaseVNode("div", Dl, toDisplayString(G("jumpToYear")), 1),
          withDirectives(createBaseVNode("input", {
            type: "number",
            "onUpdate:modelValue": L[0] || (L[0] = (H) => c.value = H),
            onKeydown: withKeys(z, ["enter"]),
            placeholder: G("inputYearPlaceholder"),
            min: u.value.min,
            max: u.value.max,
            class: "w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500"
          }, null, 40, bl), [
            [vModelText, c.value]
          ]),
          createBaseVNode("div", Ml, toDisplayString(unref(l)(G("yearRangeInfo"), {
            calendar: h.value,
            min: u.value.min,
            max: u.value.max
          })), 1)
        ], true)
      ])
    ], 512)) : createCommentVNode("", true);
  }
});
var kl = Je(Sl, [["__scopeId", "data-v-f14c8987"]]);
var wl = { class: "flex justify-between items-center mb-4 gap-2" };
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
    const t = r, a = e, n = ref(t.month), o = ref(t.year), l = ref(false), s = computed(() => t.calendar || "gregory"), c = computed(() => me.getCalendarRange(t.calendar));
    watch(() => t.month, (D) => {
      n.value = D;
    }, { immediate: true }), watch(() => t.year, (D) => {
      o.value = D;
    }, { immediate: true });
    const u = computed(() => {
      if (t.calendar === "gregory")
        return o.value.toString();
      try {
        const D = new ue(o.value, 6, 1), S = me.safeToCalendar(
          D,
          me.createSafeCalendar(t.calendar)
        );
        return new zt(t.locale, {
          calendar: t.calendar,
          year: "numeric"
        }).format(S.toDate("UTC"));
      } catch {
        return o.value.toString();
      }
    }), h = computed(() => me.getMonthNames(t.locale, t.calendar)), p = computed(() => {
      let D = o.value, S = n.value - 1;
      return S < 1 && (S = 12, D = o.value - 1), D >= c.value.min;
    }), f = computed(() => {
      let D = o.value, S = n.value + 1;
      return S > 12 && (S = 1, D = o.value + 1), D <= c.value.max;
    }), w = () => {
      if (!p.value) return;
      let D = n.value - 1, S = o.value;
      D < 1 && (D = 12, S -= 1), S >= c.value.min && b(D, S);
    }, T = () => {
      if (!f.value) return;
      let D = n.value + 1, S = o.value;
      D > 12 && (D = 1, S += 1), S <= c.value.max && b(D, S);
    }, m = () => {
      b(n.value, o.value);
    }, y = (D) => {
      D !== void 0 && (n.value = D), b(n.value, o.value);
    }, i = (D) => {
      D >= c.value.min && D <= c.value.max && (o.value = D, b(n.value, D));
    }, b = (D, S) => {
      n.value = D, o.value = S, a("update:month", D), a("update:year", S);
    }, M = () => {
      l.value = !l.value;
    };
    return (D, S) => (openBlock(), createElementBlock("div", wl, [
      createBaseVNode("button", {
        type: "button",
        onClick: w,
        class: "p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "上個月",
        disabled: !p.value
      }, [
        createVNode(Hr, { class: "h-5 w-5" })
      ], 8, Tl),
      createBaseVNode("div", xl, [
        renderSlot(D.$slots, "month-selector", {
          monthNames: h.value,
          selectedMonth: n.value,
          onMonthChange: y
        }, () => [
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": S[0] || (S[0] = (k) => n.value = k),
            onChange: m,
            class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500",
            "aria-label": "選擇月份",
            role: "combobox"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(h.value, (k, d) => (openBlock(), createElementBlock("option", {
              key: d,
              value: d + 1
            }, toDisplayString(k), 9, Yl))), 128))
          ], 544), [
            [vModelSelect, n.value]
          ])
        ]),
        createBaseVNode("div", Cl, [
          renderSlot(D.$slots, "year-selector", {
            displayYear: u.value,
            toggleYearSelector: M,
            showYearSelector: l.value
          }, () => [
            createBaseVNode("button", {
              type: "button",
              onClick: M,
              "data-year-selector-button": "",
              class: "inline-flex text-nowrap items-center px-2 py-1 bg-vdt-surface text-vdt-content w-full border border-vdt-outline rounded-sm text-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200",
              "aria-label": "選擇年份"
            }, toDisplayString(u.value), 1)
          ]),
          createVNode(kl, {
            "selected-year": o.value,
            "show-selector": l.value,
            "onUpdate:showSelector": S[1] || (S[1] = (k) => l.value = k),
            calendar: s.value,
            locale: D.locale,
            onYearSelected: i
          }, createSlots({ _: 2 }, [
            renderList(D.$slots, (k, d) => ({
              name: d,
              fn: withCtx((g) => [
                renderSlot(D.$slots, d, normalizeProps(guardReactiveProps(g)))
              ])
            }))
          ]), 1032, ["selected-year", "show-selector", "calendar", "locale"])
        ])
      ]),
      createBaseVNode("button", {
        type: "button",
        onClick: T,
        class: "p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "下個月",
        disabled: !f.value
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
    return (s, c) => (openBlock(), createElementBlock("div", Vl, [
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
          c[0] || (c[0] = withKeys((u) => a("nav", "up"), ["up"])),
          c[1] || (c[1] = withKeys((u) => a("nav", "down"), ["down"])),
          c[2] || (c[2] = withKeys((u) => a("nav", "left"), ["left"])),
          c[3] || (c[3] = withKeys((u) => a("nav", "right"), ["right"]))
        ]
      }, toDisplayString(s.date.day), 43, Fl)
    ]));
  }
});
var Al = Je(Pl, [["__scopeId", "data-v-9018b2ca"]]);
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
      const m = rt();
      return `${m.year}-${m.month}-${m.day}`;
    });
    const s = computed(() => me.generateCalendarDays(
      a.year,
      // 西元年
      a.month,
      // 西元月
      a.calendar,
      a.locale,
      a.weekStartsOn
    )), c = (m) => {
      if (!a.rangeStart || !a.rangeEnd) return false;
      try {
        return m.compare(a.rangeStart) >= 0 && m.compare(a.rangeEnd) <= 0;
      } catch {
        return false;
      }
    }, u = (m, y) => {
      if (!m || !y) return false;
      try {
        return m.compare(y) === 0;
      } catch {
        return false;
      }
    }, h = (m) => {
      try {
        return !!(a.minDate && m.compare(a.minDate) < 0 || a.maxDate && m.compare(a.maxDate) > 0);
      } catch {
        return true;
      }
    }, p = (m) => ko(m), f = computed(() => s.value.map((m, y) => {
      const i = `${m.year}-${m.month}-${m.day}`, b = p(m), M = m.month !== o.value, D = h(m), S = a.selectionMode === "single" && u(m, a.selectedDate), k = a.selectionMode === "range" && u(m, a.rangeStart), d = a.selectionMode === "range" && u(m, a.rangeEnd), g = a.selectionMode === "range" && c(m) && !k && !d && !D, v = m.day === 1 && m.month === o.value, A = [
        i,
        S,
        b,
        D,
        k,
        d,
        g,
        a.selectionMode,
        a.calendar
      ];
      return {
        key: `${a.calendar}-${l.value}-${o.value}-${i}-${y}`,
        memoKey: A,
        date: m,
        isToday: b,
        isSelected: S,
        isDisabled: D,
        isOutsideMonth: M,
        isRangeStart: k,
        isRangeEnd: d,
        isInRange: g,
        isFocusable: v
      };
    })), w = (m) => {
      a.selectionMode === "single" ? n("select", m) : a.selectionMode === "range" && n("range-select", m, null);
    }, T = (m) => {
      const y = f.value;
      if (y.length === 0) return;
      const i = y[0], b = y[y.length - 1];
      switch (m) {
        case "left":
          i.date.day < 15 && i.date.month !== o.value && n("navigate", "prev-month");
          break;
        case "right":
          b.date.day > 15 && b.date.month !== o.value && n("navigate", "next-month");
          break;
      }
    };
    return e({
      getCalendarDays: () => s.value,
      getCellStates: () => f.value
    }), (m, y) => (openBlock(), createElementBlock("div", Ll, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (i, b, M, D) => {
        const S = i.memoKey;
        if (D && D.key === i.key && isMemoSame(D, S)) return D;
        const k = (openBlock(), createBlock(Al, {
          key: i.key,
          date: i.date,
          "current-month": o.value,
          selected: i.isSelected,
          "is-today": i.isToday,
          disabled: i.isDisabled,
          focusable: i.isFocusable,
          "is-range-start": i.isRangeStart,
          "is-range-end": i.isRangeEnd,
          "is-in-range": i.isInRange,
          "selection-mode": m.selectionMode,
          onSelect: w,
          onNav: T
        }, null, 8, ["date", "current-month", "selected", "is-today", "disabled", "focusable", "is-range-start", "is-range-end", "is-in-range", "selection-mode"]));
        return k.memo = S, k;
      }, y, 0), 128))
    ]));
  }
});
var Bl = { key: 0 };
var ql = { class: "flex flex-row items-center justify-between" };
var Nl = { class: "text-sm font-medium text-vdt-content uppercase" };
var Ul = { class: "flex flex-row items-center gap-1" };
var zl = { class: "time-selector-container pt-1" };
var jl = { class: "flex flex-row items-center gap-1" };
var Wl = { class: "flex-1" };
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
    const a = r, n = t, { getPlaceholderMessage: o } = Mt(a.locale), l = ref(0), s = ref(0), c = ref(0), u = ref("AM"), h = ref(false), p = computed(() => a.use24Hour ? Array.from({ length: 24 }, (d, g) => g) : Array.from({ length: 12 }, (d, g) => g + 1)), f = computed(() => Array.from({ length: 60 }, (d, g) => g)), w = computed(() => Array.from({ length: 60 }, (d, g) => g)), T = computed(() => {
      let d = l.value;
      a.use24Hour || (u.value === "PM" && d < 12 ? d += 12 : u.value === "AM" && d === 12 && (d = 0));
      const g = m(d), v = m(s.value);
      if (a.enableSeconds) {
        const A = m(c.value);
        return `${g}:${v}:${A}`;
      } else
        return `${g}:${v}`;
    }), m = (d) => d.toString().padStart(2, "0"), y = (d) => m(d), i = (d) => {
      if (!d) return;
      const [g, v, A] = d.split(":");
      let N = parseInt(g) || 0;
      a.use24Hour || (N >= 12 ? (u.value = "PM", N = N === 12 ? 12 : N - 12) : (u.value = "AM", N = N === 0 ? 12 : N)), l.value = N, s.value = parseInt(v) || 0, a.enableSeconds && A && (c.value = parseInt(A) || 0), h.value = true;
    }, b = () => {
      i(a.defaultTime);
    }, M = (d) => {
      u.value = d;
    }, D = (d) => {
      const g = /* @__PURE__ */ new Date();
      g.setHours(d === "AM" ? 6 : 18, 0, 0, 0);
      const N = new Intl.DateTimeFormat(a.locale || navigator.language, {
        hour12: true,
        hour: "numeric"
      }).formatToParts(g).find((J) => J.type === "dayPeriod");
      return (N == null ? void 0 : N.value) || d;
    }, S = () => {
      const d = /* @__PURE__ */ new Date();
      if (a.use24Hour)
        l.value = d.getHours();
      else {
        const g = d.getHours();
        u.value = g >= 12 ? "PM" : "AM", l.value = g % 12 || 12;
      }
      s.value = d.getMinutes(), a.enableSeconds && (c.value = d.getSeconds()), h.value = true;
    }, k = () => {
      n("today-click");
    };
    return watch(() => a.timeValue, (d) => {
      d ? i(d) : !h.value && a.show && b();
    }, { immediate: true }), watch(
      [l, s, c, u],
      () => {
        h.value && n("time-change", T.value);
      }
    ), e({
      // 獲取當前時間值
      getCurrentTime: () => T.value,
      // 設置時間
      setTime: (d) => i(d),
      // 重置為預設時間
      resetToDefault: () => b()
    }), (d, g) => d.show ? (openBlock(), createElementBlock("div", Bl, [
      g[5] || (g[5] = createBaseVNode("hr", { class: "my-2 border-vdt-outline" }, null, -1)),
      createBaseVNode("div", ql, [
        createBaseVNode("label", Nl, toDisplayString(unref(o)("general.time")) + ": ", 1),
        createBaseVNode("div", Ul, [
          createBaseVNode("button", {
            type: "button",
            onClick: S,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-active cursor-pointer"
          }, " Now "),
          d.selectionMode === "single" ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            onClick: k,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-active cursor-pointer"
          }, " Today ")) : createCommentVNode("", true)
        ])
      ]),
      createBaseVNode("div", zl, [
        createBaseVNode("div", jl, [
          createBaseVNode("div", Wl, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": g[0] || (g[0] = (v) => l.value = v),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (v) => (openBlock(), createElementBlock("option", {
                key: v,
                value: v
              }, toDisplayString(y(v)), 9, Jl))), 128))
            ], 512), [
              [vModelSelect, l.value]
            ])
          ]),
          createBaseVNode("div", _l, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": g[1] || (g[1] = (v) => s.value = v),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (v) => (openBlock(), createElementBlock("option", {
                key: v,
                value: v
              }, toDisplayString(m(v)), 9, Kl))), 128))
            ], 512), [
              [vModelSelect, s.value]
            ])
          ]),
          d.enableSeconds ? (openBlock(), createElementBlock("div", Ql, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": g[2] || (g[2] = (v) => c.value = v),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(w.value, (v) => (openBlock(), createElementBlock("option", {
                key: v,
                value: v
              }, toDisplayString(m(v)), 9, Zl))), 128))
            ], 512), [
              [vModelSelect, c.value]
            ])
          ])) : createCommentVNode("", true),
          d.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Gl, [
            createBaseVNode("div", Xl, [
              createBaseVNode("button", {
                type: "button",
                onClick: g[3] || (g[3] = (v) => M("AM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", u.value === "AM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(D("AM")), 3),
              createBaseVNode("button", {
                type: "button",
                onClick: g[4] || (g[4] = (v) => M("PM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", u.value === "PM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(D("PM")), 3)
            ])
          ]))
        ])
      ])
    ])) : createCommentVNode("", true);
  }
});
var ts = { class: "vdt-date-picker calendar-grid w-full max-w-xs rounded-lg shadow p-2" };
var ha = defineComponent({
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
      const d = rt();
      return { year: d.year, month: d.month };
    }, { year: l, month: s } = o(), c = ref(l), u = ref(s), h = ref(a.timeValue), p = computed(() => me.convertToCalendarDate(a.value, a.calendar)), f = computed(() => me.convertToCalendarDate(a.rangeStart, a.calendar)), w = computed(() => me.convertToCalendarDate(a.rangeEnd, a.calendar)), T = computed(() => me.convertToCalendarDate(a.minDate || null, a.calendar)), m = computed(() => me.convertToCalendarDate(a.maxDate || null, a.calendar)), y = computed(() => {
      var d;
      return ((d = a.minDate) == null ? void 0 : d.year) || 1900;
    }), i = computed(() => {
      var d;
      return ((d = a.maxDate) == null ? void 0 : d.year) || 2100;
    }), b = computed(() => {
      if (a.year !== void 0 && a.month !== void 0)
        return { year: a.year, month: a.month };
      const d = a.selectionMode === "range" ? a.rangeStart : a.value;
      return d ? { year: d.year, month: d.month } : { year: c.value, month: u.value };
    });
    watch(b, ({ year: d, month: g }) => {
      c.value = d, u.value = g;
    }, { immediate: true }), watch(() => a.timeValue, (d) => {
      h.value = d;
    }, { immediate: true });
    const M = (d) => {
      if (a.selectionMode === "single") {
        const g = me.convertFromCalendarDate(d, a.calendar);
        g && (n("select", g, true), a.showTimeSelector && h.value && n("time-select", h.value));
      }
    }, D = (d, g) => {
      if (a.selectionMode === "range") {
        const v = me.convertFromCalendarDate(d, a.calendar), A = me.convertFromCalendarDate(g, a.calendar);
        n("range-select", v, A);
      }
    }, S = (d) => {
      h.value = d, n("time-select", d);
    }, k = () => {
      if (a.selectionMode === "single") {
        const d = rt();
        c.value = d.year, u.value = d.month, n("select", d, false);
      }
    };
    return e({
      // 獲取當前選中的日期（單一模式）
      getSelectedDate: () => a.value,
      // 獲取當前範圍（範圍模式）
      getSelectedRange: () => ({ start: a.rangeStart, end: a.rangeEnd }),
      // 設置顯示的月份
      setDisplayMonth: (d, g) => {
        c.value = d, u.value = g;
      },
      // 導航到上個月
      previousMonth: () => {
        u.value === 1 ? (u.value = 12, c.value -= 1) : u.value -= 1;
      },
      // 導航到下個月
      nextMonth: () => {
        u.value === 12 ? (u.value = 1, c.value += 1) : u.value += 1;
      }
    }), (d, g) => (openBlock(), createElementBlock("div", ts, [
      createVNode(El, {
        month: u.value,
        "onUpdate:month": g[0] || (g[0] = (v) => u.value = v),
        year: c.value,
        "onUpdate:year": g[1] || (g[1] = (v) => c.value = v),
        locale: d.locale,
        "min-year": y.value,
        "max-year": i.value,
        calendar: d.calendar
      }, createSlots({ _: 2 }, [
        renderList(d.$slots, (v, A) => ({
          name: A,
          fn: withCtx((N) => [
            renderSlot(d.$slots, A, normalizeProps(guardReactiveProps(N)))
          ])
        }))
      ]), 1032, ["month", "year", "locale", "min-year", "max-year", "calendar"]),
      createVNode(Ol, {
        locale: d.locale,
        "week-starts-on": d.weekStartsOn,
        calendar: d.calendar
      }, null, 8, ["locale", "week-starts-on", "calendar"]),
      createVNode(Hl, {
        year: c.value,
        month: u.value,
        "selected-date": p.value,
        "range-start": f.value,
        "range-end": w.value,
        "selection-mode": d.selectionMode,
        "min-date": T.value,
        "max-date": m.value,
        locale: d.locale,
        "week-starts-on": d.weekStartsOn,
        calendar: d.calendar,
        onSelect: M,
        onRangeSelect: D
      }, null, 8, ["year", "month", "selected-date", "range-start", "range-end", "selection-mode", "min-date", "max-date", "locale", "week-starts-on", "calendar"]),
      createVNode(es, {
        locale: d.locale,
        show: d.showTimeSelector,
        "time-value": h.value,
        "enable-seconds": d.enableSeconds,
        "use24-hour": d.use24Hour,
        "default-time": d.defaultTime,
        selectionMode: d.selectionMode,
        onTimeChange: S,
        onTodayClick: k
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
var qr = Je(as, [["render", ns]]);
function va(r, e) {
  const { dateInputRef: t, timeInputRef: a } = r, { showTime: n, autoFocusTimeAfterDate: o = true } = e;
  return {
    // 基本導航方法
    focusFirstInput: () => {
      nextTick(() => {
        var p;
        (p = t.value) != null && p.focus && t.value.focus();
      });
    },
    focusLastInput: () => {
      nextTick(() => {
        var p, f, w;
        n && ((p = a.value) != null && p.focusLast) ? a.value.focusLast() : (f = t.value) != null && f.focusLast ? t.value.focusLast() : (w = t.value) != null && w.focus && t.value.focus();
      });
    },
    // 專門的導航處理
    handleNavigateToTime: (p) => {
      n && nextTick(() => {
        var f;
        (f = a.value) != null && f.focus && a.value.focus();
      });
    },
    handleNavigateToDate: () => {
      nextTick(() => {
        var p, f;
        (p = t.value) != null && p.focusLast ? t.value.focusLast() : (f = t.value) != null && f.focus && t.value.focus();
      });
    },
    autoFocusTimeAfterDateComplete: (p, f) => {
      !n || !o || (f && !p.inputTimeValue.value && (p.inputTimeValue.value = f, p.updateFromInputs()), nextTick(() => {
        var w;
        (w = a.value) != null && w.focus && a.value.focus();
      }));
    }
  };
}
function pa(r = {}) {
  const { required: e = true, showTime: t = false, minDate: a, maxDate: n, dateFormat: o = "YYYY-MM-DD" } = r, l = ref({}), s = ref({}), c = ref({}), u = computed(() => ({ ...l.value, ...s.value })), h = computed(() => ({ ...c.value })), p = computed(() => Object.keys(u.value).length > 0), f = (S, k, d = "date", g = {}) => {
    ["date", "year", "month", "day"].forEach((v) => {
      m(`${d}.${v}`), y(`${d}.${v}`);
    }), S || Object.entries(k).forEach(([v, A]) => {
      const N = `${d}.${v}`;
      l.value[N] = A, g[v] && (c.value[N] = g[v]);
    });
  }, w = (S, k, d = "time", g = {}) => (["time", "hour", "minute", "second"].forEach((v) => {
    m(`${d}.${v}`), y(`${d}.${v}`);
  }), S || Object.entries(k).forEach(([v, A]) => {
    const N = `${d}.${v}`;
    l.value[N] = A, g[v] && (c.value[N] = g[v]);
  }), !p.value), T = (S) => {
    if (!S) return false;
    if (a) {
      const k = pe(a);
      if (k && Wt(S, k) < 0)
        return f(false, {
          date: "date.beforeMin"
        }, "date", {
          date: { minDate: Ee(k, o) }
        }), false;
    }
    if (n) {
      const k = pe(n);
      if (k && Wt(S, k) > 0)
        return f(false, {
          date: "date.afterMax"
        }, "date", {
          date: { maxDate: Ee(k, o) }
        }), false;
    }
    return true;
  }, m = (S) => {
    Object.keys(l.value).forEach((k) => {
      k.startsWith(S) && delete l.value[k];
    });
  }, y = (S) => {
    Object.keys(c.value).forEach((k) => {
      k.startsWith(S) && delete c.value[k];
    });
  };
  return {
    // 狀態
    errors: l,
    formatErrors: s,
    mergedErrors: u,
    hasErrors: p,
    errorParams: c,
    mergedErrorParams: h,
    // 驗證方法
    handleDateValidation: f,
    handleTimeValidation: w,
    validateDateTime: (S, k) => {
      const d = {
        isValid: true,
        errors: {}
      };
      return e && (S || (d.errors.date = "date.required", d.isValid = false), t && !k && (d.errors.time = "time.required", d.isValid = false)), Object.assign(l.value, d.errors), d.isValid && !p.value;
    },
    validateDateRange: T,
    // 錯誤管理
    clearFieldErrors: m,
    clearFieldParams: y,
    clearAllErrors: () => {
      l.value = {}, s.value = {}, c.value = {};
    },
    setFormatError: (S, k) => {
      s.value[S] = k;
    },
    clearFormatError: (S) => {
      delete s.value[S];
    }
  };
}
function ga(r = {}) {
  const {
    showTime: e = false,
    dateFormat: t = "YYYY-MM-DD",
    timeFormat: a = "HH:mm:ss",
    outputType: n = "iso",
    defaultTime: o,
    enableSeconds: l = true
  } = r, s = ref(null), c = ref(null), u = ref(null), h = (d) => {
    if (!d || d.hour === void 0) return null;
    const g = d.hour.toString().padStart(2, "0"), v = (d.minute || 0).toString().padStart(2, "0");
    if (l) {
      const A = (d.second || 0).toString().padStart(2, "0");
      return `${g}:${v}:${A}`;
    } else
      return `${g}:${v}`;
  }, p = (d, g) => {
    if (!d) return null;
    const v = pe(d);
    if (!v) return null;
    if (!g && !e)
      return Ne(v.year, v.month, v.day);
    if (!g)
      if (o) {
        const ae = o.split(":").map(Number), G = ae[0] || 0, O = ae[1] || 0, E = ae[2] || 0;
        return Ne(
          v.year,
          v.month,
          v.day,
          G,
          O,
          E
        );
      } else
        return Ne(v.year, v.month, v.day);
    const A = g.split(":").map(Number), N = A[0] || 0, J = A[1] || 0, z = A[2] || 0;
    return Ne(
      v.year,
      v.month,
      v.day,
      N,
      J,
      z
    );
  }, f = (d) => {
    const g = pe(d);
    s.value = g, g ? (c.value = Ee(g, t), u.value = h(g)) : (c.value = null, u.value = null);
  }, w = (d, g) => {
    const v = d !== void 0 ? d : c.value, A = g !== void 0 ? g : u.value, N = p(v, A);
    return s.value = N, N;
  }, T = (d) => {
    if (!d) {
      s.value = null, c.value = null, u.value = null;
      return;
    }
    if (e && o && (d.hour === void 0 || d.hour === null) && !u.value) {
      const g = o.split(":").map(Number), v = g[0] || 0, A = g[1] || 0, N = g[2] || 0, J = Ne(
        d.year,
        d.month,
        d.day,
        v,
        A,
        N
      );
      s.value = J, u.value = o;
    } else
      s.value = d, u.value = h(d);
    s.value && (c.value = Ee(s.value));
  }, m = (d) => {
    if (!s.value) return null;
    const g = d.split(":").map(Number), v = {
      ...s.value,
      hour: g[0] || 0,
      minute: g[1] || 0,
      second: g[2] || 0
    };
    return s.value = v, u.value = d, v;
  }, y = (d) => {
    const g = d !== void 0 ? d : s.value, v = e ? `${t} ${a}` : t;
    return jt(g, n, v);
  }, i = () => {
    s.value = null, c.value = null, u.value = null;
  }, b = computed(() => !!(c.value || u.value || s.value)), M = () => e && !u.value && o ? (u.value = o, true) : false, D = computed(() => !!c.value), S = computed(() => !!u.value), k = computed(() => e ? D.value && S.value : D.value);
  return {
    // 響應式狀態
    internalDateTime: s,
    inputDateValue: c,
    inputTimeValue: u,
    // 計算屬性
    hasDateValue: D,
    hasTimeValue: S,
    hasCompleteValue: k,
    hasValue: b,
    // 主要方法
    updateFromInputs: w,
    setInternalDateTime: T,
    updateTimeOnly: m,
    setExternalValue: f,
    // updateDateTime,
    getFormattedOutput: y,
    clearValues: i,
    applyDefaultTime: M,
    // 輔助方法
    getTimeFromDateTime: h,
    createDateTimeFromInputs: p
  };
}
function Nr(r, e, t = {}) {
  const { disabled: a, onOutsideClick: n } = t, o = ref(false), l = () => {
    a != null && a.value || (o.value = !o.value, o.value && nextTick(() => {
      u();
    }));
  }, s = () => {
    a != null && a.value || (o.value = true, nextTick(() => {
      u();
    }));
  }, c = () => {
    o.value = false;
  }, u = () => {
    if (!r.value || !e.value) return;
    const m = r.value.getBoundingClientRect(), y = e.value, i = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    let b = m.height + 5, M = 0;
    const D = y.getBoundingClientRect();
    m.left + D.width > i.width && (M = i.width - m.left - D.width - 10), m.bottom + D.height > i.height && (b = -D.height - 5), y.style.position = "absolute", y.style.top = `${b}px`, y.style.left = `${M}px`, y.style.zIndex = "50";
  }, h = (m) => {
    const y = e.value, i = r.value, b = m.target;
    o.value && y && !y.contains(b) && i && !i.contains(b) && (c(), n == null || n());
  }, p = (m, y) => {
    if (a != null && a.value) return;
    const i = m.target;
    i.classList.contains("date-input") || i.classList.contains("time-input") || i.closest("input") || i.closest("button") || (m.preventDefault(), y == null || y());
  }, f = (m) => {
    if (a != null && a.value) return;
    const y = m.target;
    y.classList.contains("date-input") || y.classList.contains("time-input") || y.closest("input") || y.closest("button") || m.preventDefault();
  }, w = () => {
    o.value && u();
  }, T = () => {
    o.value && u();
  };
  return onMounted(() => {
    document.addEventListener("mousedown", h), window.addEventListener("resize", w), window.addEventListener("scroll", T);
  }), onBeforeUnmount(() => {
    document.removeEventListener("mousedown", h), window.removeEventListener("resize", w), window.removeEventListener("scroll", T);
  }), {
    // 狀態
    showCalendar: o,
    // 主要方法
    toggleCalendar: l,
    showCalendarPopup: s,
    hideCalendar: c,
    updateCalendarPosition: u,
    // 事件處理
    handleContainerClick: p,
    handleContainerMouseDown: f
  };
}
function os(r = {}) {
  const {
    customDefaultTime: e = "00:00:00",
    enableSeconds: t = true
  } = r, a = (u) => {
    if (!u) return false;
    if (!/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])(?::([0-5]?[0-9]))?$/.test(u))
      return console.warn(`時間格式不正確: ${u}，應為 HH:mm:ss 或 HH:mm 格式`), false;
    const p = u.split(":"), f = parseInt(p[0]), w = parseInt(p[1]), T = p[2] ? parseInt(p[2]) : 0;
    return f < 0 || f > 23 || w < 0 || w > 59 || T < 0 || T > 59 ? (console.warn(`時間值超出範圍: ${u}`), false) : true;
  }, n = (u, h = t) => {
    const p = u.split(":"), f = p[0].padStart(2, "0"), w = p[1].padStart(2, "0"), T = p[2] ? p[2].padStart(2, "0") : "00";
    return h ? `${f}:${w}:${T}` : `${f}:${w}`;
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
      const u = /* @__PURE__ */ new Date(), h = u.getHours().toString().padStart(2, "0"), p = u.getMinutes().toString().padStart(2, "0"), f = u.getSeconds().toString().padStart(2, "0");
      return t ? `${h}:${p}:${f}` : `${h}:${p}`;
    },
    parseTimeString: (u) => {
      const h = u.split(":");
      return {
        hours: parseInt(h[0]) || 0,
        minutes: parseInt(h[1]) || 0,
        seconds: parseInt(h[2]) || 0
      };
    },
    buildTimeString: (u, h, p = 0) => {
      const f = u.toString().padStart(2, "0"), w = h.toString().padStart(2, "0"), T = p.toString().padStart(2, "0");
      return t ? `${f}:${w}:${T}` : `${f}:${w}`;
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
    useStrictISO: c = false,
    customDefaultTime: u,
    enableSeconds: h = true,
    autoFocusTimeAfterDate: p = true,
    minDate: f,
    maxDate: w
    // locale = 'zh-TW'
  } = r, { containerRef: T, calendarRef: m, dateInputRef: y, timeInputRef: i } = e, b = computed(() => {
    var P;
    return ((P = r.calendar) == null ? void 0 : P.value) || "gregory";
  }), M = computed(() => {
    var P;
    return ((P = r.locale) == null ? void 0 : P.value) || "zh-TW";
  }), D = computed(() => {
    var P;
    return ((P = r.outputType) == null ? void 0 : P.value) || "iso";
  }), S = ref(o), k = pa({
    required: n,
    showTime: a,
    minDate: f,
    maxDate: w,
    dateFormat: l
  }), d = ga({
    showTime: a,
    dateFormat: l,
    timeFormat: s,
    outputType: D.value,
    defaultTime: u,
    enableSeconds: h
  }), g = va(
    { dateInputRef: y, timeInputRef: i },
    { showTime: a, autoFocusTimeAfterDate: p }
  ), v = Nr(
    T,
    m,
    {
      disabled: S,
      onOutsideClick: () => {
      }
    }
  ), A = os({
    customDefaultTime: u,
    enableSeconds: h
  }), N = computed(() => {
    const P = pe(f, M.value);
    return P || null;
  }), J = computed(() => {
    const P = pe(w, M.value);
    return P || null;
  });
  let z = null, ae = null, G = null;
  const O = (P) => {
    z = P.update || null, ae = P.change || null, G = P.validation || null;
  }, E = async (P = d.internalDateTime.value) => {
    let K = null;
    if (P) {
      const ye = a ? s : void 0;
      K = jt(P, D.value, l, ye, a, b.value, M.value, c, h);
    }
    z == null || z(K), ae == null || ae(K);
    const oe = !k.hasErrors.value;
    G == null || G(oe, k.mergedErrors.value, k.errorParams.value);
  };
  watch(() => t, (P) => {
    const K = pe(P, M.value, b.value);
    P && !K ? (k.handleDateValidation(false, { date: "無效的日期格式" }), d.setExternalValue(null)) : K && !k.validateDateRange(K) ? d.setExternalValue(null) : (k.clearFieldErrors("date"), k.clearFieldErrors("invalidInput"), d.setExternalValue(K));
  }, { immediate: true });
  const $ = (P, K, oe = {}) => {
    k.handleDateValidation(P, K, "date", oe), G == null || G(!k.hasErrors.value, k.mergedErrors.value, k.errorParams.value);
  }, L = (P, K, oe = {}) => {
    k.handleTimeValidation(P, K, "time", oe), G == null || G(!k.hasErrors.value, k.mergedErrors.value, k.errorParams.value);
  }, H = async (P) => {
    d.inputDateValue.value = P;
    const K = d.updateFromInputs();
    if (!K) {
      k.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    k.validateDateRange(K) && (await E(K), ["date", "year", "month", "day"].forEach((oe) => {
      k.clearFieldErrors(oe);
    }), g.autoFocusTimeAfterDateComplete(
      d,
      u ? A.getValidDefaultTime.value : void 0
    ));
  }, te = async (P) => {
    d.inputTimeValue.value = P;
    const K = d.updateFromInputs();
    await E(K), ["time", "hour", "minute", "second"].forEach((oe) => {
      k.clearFieldErrors(oe);
    });
  }, ce = async (P, K = true) => {
    try {
      if (!k.validateDateRange(P))
        return;
      d.setInternalDateTime(P), await E(d.internalDateTime.value), ["date", "year", "month", "day"].forEach((oe) => {
        k.clearFieldErrors(oe);
      }), K && v.hideCalendar();
    } catch (oe) {
      console.error("處理日曆選擇失敗:", oe);
    }
  }, se = async (P) => {
    const K = d.updateTimeOnly(P);
    K && await E(K), ["time", "hour", "minute", "second"].forEach((oe) => {
      k.clearFieldErrors(oe);
    });
  }, C = (P) => {
    v.handleContainerClick(P, () => {
      g.focusFirstInput();
    }), v.toggleCalendar();
  }, x = () => {
    d.clearValues(), k.clearAllErrors(), E(null);
  }, U = async () => {
    var V, re;
    const P = await ((V = y.value) == null ? void 0 : V.validate()), K = a ? await ((re = i.value) == null ? void 0 : re.validate()) : true;
    let oe = true;
    d.internalDateTime.value && (oe = me.isValidDate(
      d.internalDateTime.value.year,
      d.internalDateTime.value.month,
      d.internalDateTime.value.day,
      "gregory"
      // 固定使用西元曆驗證
    ), oe || k.handleDateValidation(false, {
      date: "date.invalid"
      // 簡化錯誤信息
    }));
    const ye = k.validateDateTime(
      d.inputDateValue.value,
      d.inputTimeValue.value
    ), De = P && K && oe && ye;
    return G == null || G(De, k.mergedErrors.value, k.errorParams.value), De;
  }, ee = async () => {
    const P = /* @__PURE__ */ new Date(), K = {
      year: P.getFullYear(),
      month: P.getMonth() + 1,
      day: P.getDate(),
      hour: P.getHours(),
      minute: P.getMinutes(),
      second: P.getSeconds()
    };
    try {
      d.setInternalDateTime(K), await E(K), ["date", "year", "month", "day", "time", "hour", "minute", "second"].forEach((oe) => {
        k.clearFieldErrors(oe);
      });
    } catch (oe) {
      console.warn("設置當前時間失敗:", oe);
      const ye = `${K.year}-${K.month.toString().padStart(2, "0")}-${K.day.toString().padStart(2, "0")}`, De = a ? `${(K.hour || 0).toString().padStart(2, "0")}:${(K.minute || 0).toString().padStart(2, "0")}:${(K.second || 0).toString().padStart(2, "0")}` : null;
      d.inputDateValue.value = ye, a && De && (d.inputTimeValue.value = De);
      const V = d.updateFromInputs();
      await E(V);
    }
  }, _ = () => {
    g.focusFirstInput();
  };
  return {
    // 狀態
    isDisabled: S,
    // 日曆系統相關
    calendar: b,
    // 從各個 composables 暴露的狀態
    ...k,
    ...d,
    ...v,
    // 計算屬性
    calendarMinDate: N,
    calendarMaxDate: J,
    // 預設時間相關
    getValidDefaultTime: A.getValidDefaultTime,
    // 事件處理方法
    setEmitters: O,
    validateDateInput: $,
    validateTimeInput: L,
    handleDateComplete: H,
    handleTimeComplete: te,
    handleCalendarSelect: ce,
    handleTimeSelect: se,
    handleContainerClick: C,
    handleContainerMouseDown: v.handleContainerMouseDown,
    // 導航方法
    handleNavigateToDate: g.handleNavigateToDate,
    handleNavigateToTime: g.handleNavigateToTime,
    // 主要操作方法
    reset: x,
    validate: U,
    selectNow: ee,
    focus: _,
    // 直接暴露導航方法（用於 defineExpose）
    focusFirstInput: g.focusFirstInput,
    focusLastInput: g.focusLastInput
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
  const { r: e, g: t, b: a } = r, n = e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4), o = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), l = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), s = 0.4124 * n + 0.3576 * o + 0.1805 * l, c = 0.2126 * n + 0.7152 * o + 0.0722 * l, u = 0.0193 * n + 0.1192 * o + 0.9505 * l, h = 0.95047, p = 1, f = 1.08883, w = s > 8856e-6 ? Math.pow(s / h, 1 / 3) : 7.787 * s / h + 16 / 116, T = c > 8856e-6 ? Math.pow(c / p, 1 / 3) : 7.787 * c / p + 16 / 116, m = u > 8856e-6 ? Math.pow(u / f, 1 / 3) : 7.787 * u / f + 16 / 116, y = 116 * T - 16, i = 500 * (w - T), b = 200 * (T - m);
  return { l: y, a: i, b };
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
      const c = l[s];
      if (!c) continue;
      const u = lr(c);
      if (!u) continue;
      const h = ds(t, u);
      h < n && (n = h, a = o);
    }
  return a;
}
function ps(r) {
  return Ya[r] || {};
}
var gs = class {
  constructor() {
    Me(this, "instances", /* @__PURE__ */ new Map());
    Me(this, "mediaQuery", null);
    Me(this, "listeners", /* @__PURE__ */ new Map());
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
    Object.keys(t).forEach((p) => {
      const f = `--color-vdt-theme-${p}`;
      a[f] = e.style.getPropertyValue(f), e.style.removeProperty(f);
    });
    const o = getComputedStyle(e).getPropertyValue("--color-vdt-theme-500").trim();
    if (Object.entries(a).forEach(([p, f]) => {
      f && e.style.setProperty(p, f);
    }), !o) return false;
    const l = "oklch(60.6% 0.25 292.717)", s = t[500], c = this.isOklchEqual(o, l), u = this.isOklchEqual(o, s);
    return !c && !u;
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
var Pe = new gs();
function jr(r = {}) {
  const e = ref(
    Pe.createInstance(r.instanceId, {
      defaultColor: r.defaultColor,
      defaultMode: r.defaultMode
    })
  ), t = ref(
    Pe.getState(e.value)
  );
  let a = null;
  const n = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.currentMode) === "dark";
  }), o = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.currentMode) === "light";
  }), l = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.userPreference) === "auto";
  }), s = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.currentMode) || "light";
  }), c = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.userPreference) || "auto";
  }), u = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.systemPreference) || "light";
  }), h = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.color) || "violet";
  }), p = computed(() => e.value ? Pe.getThemeClasses(e.value) : {}), f = computed(() => e.value ? Pe.getContainerAttributes(e.value) : {}), w = (i) => {
    e.value && Pe.setColor(e.value, i);
  }, T = (i) => {
    e.value && Pe.setMode(e.value, i);
  }, m = () => {
    if (t.value)
      if (t.value.userPreference === "auto") {
        const i = t.value.currentMode === "light" ? "dark" : "light";
        T(i);
      } else {
        const i = t.value.currentMode === "light" ? "dark" : "light";
        T(i);
      }
  }, y = computed(() => typeof window > "u" ? false : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches !== void 0);
  return onMounted(async () => {
    await nextTick(), t.value = Pe.getState(e.value), a = Pe.addListener(e.value, (i) => {
      t.value = i;
    }), setTimeout(() => {
      Pe.reapplyTheme(e.value);
    }, 10);
  }), onBeforeUnmount(() => {
    a && a(), e.value && Pe.destroyInstance(e.value);
  }), {
    // 響應式狀態
    instanceId: e,
    themeState: t,
    isDark: n,
    isLight: o,
    isAuto: l,
    currentMode: s,
    userPreference: c,
    systemPreference: u,
    currentColor: h,
    themeClasses: p,
    containerAttributes: f,
    supportsColorScheme: y,
    // 主要方法
    setColor: w,
    setMode: T,
    toggle: m,
    // 便利方法 - 模式設置
    setLightMode: () => T("light"),
    setDarkMode: () => T("dark"),
    setAutoMode: () => T("auto"),
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
    const a = r, { setLocale: n, getPlaceholderMessage: o } = Mt(
      a.locale,
      a.customLocaleMessages
    ), l = t, s = useSlots(), c = computed(() => {
      const R = {};
      return ["no-years-display", "month-selector"].forEach((Z) => {
        s[Z] && (R[Z] = s[Z]);
      }), Object.keys(s).forEach((Z) => {
        Z.startsWith("year-") && (R[Z] = s[Z]);
      }), R;
    }), u = ref(null), h = ref(null), p = ref(null), f = ref(null), w = computed(() => a.timeFormat ? a.timeFormat : a.enableSeconds ? a.use24Hour ? "HH:mm:ss" : "hh:mm:ss A" : a.use24Hour ? "HH:mm" : "hh:mm A"), T = ref(a.dateFormat), m = ref(w.value), y = ref({}), i = ls(
      {
        modelValue: a.modelValue,
        showTime: a.showTime,
        required: a.required,
        disabled: a.disabled,
        calendar: toRef(a, "calendar"),
        dateFormat: T.value,
        timeFormat: m.value,
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
        containerRef: u,
        calendarRef: h,
        dateInputRef: p,
        timeInputRef: f
      }
    );
    i.setEmitters({
      update: (R) => l("update:modelValue", R),
      change: (R) => l("change", R),
      validation: (R, Z, ne) => l("validation", R, Z, ne)
    });
    const {
      themeClasses: b,
      containerAttributes: M,
      setColor: D,
      setMode: S,
      currentMode: k,
      isDark: d,
      isLight: g
    } = jr(), v = computed(() => {
      const R = pe(a.minDate, a.locale);
      return Ee(R);
    }), A = computed(() => {
      const R = pe(a.maxDate, a.locale);
      return Ee(R);
    }), N = computed(() => T.value), J = computed(() => a.calendar === "gregory"), z = computed(() => !!($.value && $.value.trim())), ae = computed(() => {
      var Z, ne, Q, $e, Ae, St, kt;
      a.locale;
      const R = {
        selectDate: o("general.selectDate"),
        year: o("date.year"),
        month: o("date.month"),
        day: o("date.day"),
        hour: o("time.hour"),
        minute: o("time.minute"),
        second: o("time.second")
      };
      return {
        selectDate: ((Z = a.placeholderOverrides) == null ? void 0 : Z.selectDate) || R.selectDate,
        // 時間相關
        hour: ((ne = a.placeholderOverrides) == null ? void 0 : ne.hour) || R.hour,
        minute: ((Q = a.placeholderOverrides) == null ? void 0 : Q.minute) || R.minute,
        second: (($e = a.placeholderOverrides) == null ? void 0 : $e.second) || R.second,
        // 日期相關
        year: ((Ae = a.placeholderOverrides) == null ? void 0 : Ae.year) || R.year,
        month: ((St = a.placeholderOverrides) == null ? void 0 : St.month) || R.month,
        day: ((kt = a.placeholderOverrides) == null ? void 0 : kt.day) || R.day
      };
    }), G = computed(() => ({
      ...i.mergedErrors.value,
      ...y.value
    })), O = computed(() => {
      var Q;
      const ne = {
        ...((Q = i.mergedErrorParams) == null ? void 0 : Q.value) || {},
        ...{}
      };
      return Object.keys(ne).length > 0 ? ne : {};
    }), E = computed(() => Object.keys(G.value).length > 0);
    onBeforeMount(() => {
      if (!Vr(a.dateFormat) && a.calendar === "gregory") {
        const R = a.dateFormat, Z = xo(a.dateFormat);
        y.value.dateFormat = "format.invalid", console.warn(`日期格式 "${R}" 不正確，已自動修復為 "${Z}"`), T.value = Z;
      }
      if (a.showTime && !ca(m.value)) {
        const R = m.value, Z = Yo(m.value);
        if (ca(Z))
          y.value.timeFormat = "format.invalid", console.warn(`時間格式 "${R}" 不正確，已自動修復為 "${Z}"`), m.value = Z;
        else {
          const ne = w.value;
          y.value.timeFormat = "format.invalid", console.warn(`時間格式 "${R}" 不正確，已使用預設格式 "${ne}"`), m.value = ne;
        }
      }
    }), watch(() => a.theme, (R) => {
      R && D(R);
    }, { immediate: true }), watch(() => a.mode, (R) => {
      S(R);
    }, { immediate: true }), watch(() => a.locale, (R) => {
      R && n(R, a.customLocaleMessages);
    }, { immediate: true }), watch(() => a.customLocaleMessages, (R) => {
      R && a.locale && n(a.locale, R);
    }), watch([() => a.enableSeconds, () => a.use24Hour, () => a.timeFormat], () => {
      a.timeFormat || (m.value = w.value);
    }, { immediate: true }), watch(() => a.calendar, (R) => {
      me.isCalendarSupported(R) ? delete y.value.calendar : y.value.calendar = "calendar.unsupported";
    }, { immediate: true }), e({
      // 基本操作
      focus: i.focus,
      reset: i.reset,
      validate: i.validate,
      selectNow: i.selectNow,
      // 數據獲取
      getDateTime: () => i.internalDateTime.value,
      setDateTime: (R) => {
        i.setExternalValue(R);
      },
      // 主題控制
      setTheme: D,
      setDarkMode: () => S("dark"),
      setLightMode: () => S("light"),
      setAutoMode: () => S("auto"),
      getCurrentMode: () => k.value,
      isDarkMode: () => d.value,
      isLightMode: () => g.value,
      // 錯誤相關
      getErrors: () => G.value,
      hasErrors: () => E.value
    });
    const {
      // 狀態
      inputDateValue: $,
      inputTimeValue: L,
      showCalendar: H,
      internalDateTime: te,
      calendarMinDate: ce,
      calendarMaxDate: se,
      getValidDefaultTime: C,
      hasValue: x,
      // 事件處理
      validateDateInput: U,
      validateTimeInput: ee,
      handleDateComplete: _,
      handleTimeComplete: P,
      handleCalendarSelect: K,
      handleTimeSelect: oe,
      handleContainerClick: ye,
      handleContainerMouseDown: De,
      handleNavigateToDate: V,
      // 日曆控制
      toggleCalendar: re,
      // 清除功能
      reset: be
    } = i;
    return (R, Z) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", mergeProps({
        class: ["date-picker-wrapper relative w-full", [unref(b), R.showTime ? "min-w-[300px]" : "min-w-[150px]"]]
      }, unref(M), {
        ref_key: "containerRef",
        ref: u
      }), [
        createBaseVNode("div", {
          class: normalizeClass(["date-picker-container flex w-full items-center px-2 py-1 bg-vdt-surface text-vdt-content rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": E.value }]])
        }, [
          J.value && R.inputEnabled ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["flex w-full items-center justify-start gap-2", [R.disabled ? "cursor-not-allowed cursor-event-none opacity-50" : ""]]),
            onClick: Z[2] || (Z[2] = withModifiers(
              //@ts-ignore
              (...ne) => unref(ye) && unref(ye)(...ne),
              ["stop"]
            )),
            onMousedown: Z[3] || (Z[3] = //@ts-ignore
            (...ne) => unref(De) && unref(De)(...ne))
          }, [
            createBaseVNode("div", null, [
              createVNode(fa, {
                ref_key: "dateInputRef",
                ref: p,
                modelValue: unref($),
                "onUpdate:modelValue": Z[0] || (Z[0] = (ne) => isRef($) ? $.value = ne : null),
                "year-placeholder": ae.value.year,
                "month-placeholder": ae.value.month,
                "day-placeholder": ae.value.day,
                "min-date": v.value,
                "max-date": A.value,
                required: R.required,
                separator: R.dateSeparator,
                "date-format": N.value,
                onValidation: unref(U),
                onComplete: unref(_)
              }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "required", "separator", "date-format", "onValidation", "onComplete"])
            ]),
            R.showTime ? (openBlock(), createElementBlock("div", ys, [
              createVNode(ma, {
                ref_key: "timeInputRef",
                ref: f,
                modelValue: unref(L),
                "onUpdate:modelValue": Z[1] || (Z[1] = (ne) => isRef(L) ? L.value = ne : null),
                "hour-placeholder": ae.value.hour,
                "minute-placeholder": ae.value.minute,
                "second-placeholder": ae.value.second,
                "enable-seconds": R.enableSeconds,
                use24Hour: R.use24Hour,
                required: R.required,
                locale: R.locale,
                useLocalizedPeriod: R.useLocalizedPeriod,
                onValidation: unref(ee),
                onComplete: unref(P),
                onNavigateToDate: unref(V)
              }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "required", "locale", "useLocalizedPeriod", "onValidation", "onComplete", "onNavigateToDate"])
            ])) : createCommentVNode("", true)
          ], 34)) : (openBlock(), createElementBlock("button", {
            key: 1,
            type: "button",
            class: normalizeClass(["flex w-full h-full items-center justify-start gap-1", {
              "cursor-not-allowed opacity-50": R.disabled
            }]),
            onClick: Z[4] || (Z[4] = withModifiers((ne) => {
              var Q;
              return !R.disabled && ((Q = unref(re)) == null ? void 0 : Q());
            }, ["stop"])),
            onKeydown: [
              Z[5] || (Z[5] = withKeys(withModifiers((ne) => {
                var Q;
                return !R.disabled && ((Q = unref(re)) == null ? void 0 : Q());
              }, ["prevent"]), ["enter"])),
              Z[6] || (Z[6] = withKeys(withModifiers((ne) => {
                var Q;
                return !R.disabled && ((Q = unref(re)) == null ? void 0 : Q());
              }, ["prevent"]), ["space"]))
            ]
          }, [
            z.value ? (openBlock(), createElementBlock("span", $s, toDisplayString(R.modelValue), 1)) : (openBlock(), createElementBlock("span", Ds, toDisplayString(ae.value.selectDate), 1))
          ], 34)),
          createBaseVNode("div", {
            class: normalizeClass(["date-picker-icon-container relative group cursor-pointer", { "cursor-not-allowed": R.disabled }])
          }, [
            createBaseVNode("button", {
              type: "button",
              class: normalizeClass(["date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed", { "group-hover:opacity-0": unref(x) && !R.disabled && R.showClearButton }]),
              disabled: R.disabled,
              "aria-label": "開啟日曆",
              onClick: Z[7] || (Z[7] = withModifiers((ne) => {
                var Q;
                return (Q = unref(re)) == null ? void 0 : Q();
              }, ["stop", "prevent"]))
            }, [
              createVNode(Lr, { class: "h-5 w-5" })
            ], 10, bs),
            unref(x) && !R.disabled && R.showClearButton ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100",
              "aria-label": "清除日期",
              onClick: Z[8] || (Z[8] = withModifiers(
                //@ts-ignore
                (...ne) => unref(be) && unref(be)(...ne),
                ["stop", "prevent"]
              ))
            }, [
              createVNode(qr, { class: "h-4 w-4" })
            ])) : createCommentVNode("", true)
          ], 2)
        ], 2),
        unref(H) && !R.disabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref_key: "calendarRef",
          ref: h,
          class: "calendar-container absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10",
          onClick: Z[9] || (Z[9] = withModifiers(() => {
          }, ["stop"])),
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "date-picker"
        }, [
          createVNode(ha, {
            value: unref(te),
            weekStartsOn: R.weekStartsOn,
            "min-date": unref(ce),
            "max-date": unref(se),
            showTimeSelector: R.showTime,
            "time-value": unref(L),
            use24Hour: R.use24Hour,
            "default-time": unref(C),
            enableSeconds: R.enableSeconds,
            locale: R.locale,
            calendar: R.calendar,
            onSelect: unref(K),
            onTimeSelect: unref(oe)
          }, createSlots({ _: 2 }, [
            renderList(c.value, (ne, Q) => ({
              name: Q,
              fn: withCtx(($e) => [
                renderSlot(R.$slots, Q, normalizeProps(guardReactiveProps($e)))
              ])
            }))
          ]), 1032, ["value", "weekStartsOn", "min-date", "max-date", "showTimeSelector", "time-value", "use24Hour", "default-time", "enableSeconds", "locale", "calendar", "onSelect", "onTimeSelect"])
        ], 512)) : createCommentVNode("", true)
      ], 16),
      R.showErrorMessage && E.value ? (openBlock(), createElementBlock("div", Ms, [
        renderSlot(R.$slots, "error", {
          errors: G.value,
          errorParams: O.value,
          hasErrors: E.value
        }, () => [
          createVNode(Ar, {
            errors: G.value,
            locale: R.locale,
            "use-i18n": R.useI18n,
            "custom-messages": R.customErrorMessages,
            errorParams: O.value
          }, createSlots({ _: 2 }, [
            renderList(R.$slots, (ne, Q) => ({
              name: Q,
              fn: withCtx(($e) => [
                renderSlot(R.$slots, Q, normalizeProps(guardReactiveProps($e)))
              ])
            }))
          ]), 1032, ["errors", "locale", "use-i18n", "custom-messages", "errorParams"])
        ])
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Ss = { class: "dual-month-calendar flex flex-col gap-4 min-w-auto md:min-w-[570px] md:flex-row m-1" };
var ks = { class: "calendar-container flex-1 min-w-auto md:min-w-[275px]" };
var ws = { class: "calendar-container flex-1 md:min-w-[275px] min-w-auto" };
var Ts = defineComponent({
  __name: "DualMonthCalendar",
  props: {
    rangeStart: { default: null },
    rangeEnd: { default: null },
    minDate: { default: null },
    maxDate: { default: null },
    locale: { default: "en-US" },
    weekStartsOn: { default: 0 },
    calendar: { default: "gregory" },
    showTimeSelector: { type: Boolean, default: false },
    startTimeValue: { default: null },
    endTimeValue: { default: null },
    enableSeconds: { type: Boolean, default: true },
    use24Hour: { type: Boolean, default: true },
    defaultTime: { default: "00:00:00" },
    initialYear: { default: () => rt().year },
    initialMonth: { default: () => rt().month }
  },
  emits: ["range-select", "time-select"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, o = () => {
      if (a.rangeStart)
        return { year: a.rangeStart.year, month: a.rangeStart.month };
      if (a.initialYear && a.initialMonth)
        return { year: a.initialYear, month: a.initialMonth };
      const i = rt();
      return { year: i.year, month: i.month };
    }, { year: l, month: s } = o(), c = ref(l), u = ref(s), h = computed(() => u.value === 12 ? c.value + 1 : c.value), p = computed(() => u.value === 12 ? 1 : u.value + 1), f = ref({
      isSelecting: false,
      tempStart: null
    });
    watch(() => [a.rangeStart, a.rangeEnd], ([i, b]) => {
      i && !a.initialYear && !a.initialMonth && (c.value = i.year, u.value = i.month), i && b ? (f.value.isSelecting = false, f.value.tempStart = null) : i && !b ? (f.value.isSelecting = true, f.value.tempStart = i) : (f.value.isSelecting = false, f.value.tempStart = null);
    }, { immediate: true, deep: true });
    const w = (i, b) => {
      if (!i) {
        f.value.isSelecting = false, f.value.tempStart = null, n("range-select", null, null);
        return;
      }
      if (!f.value.isSelecting)
        f.value.isSelecting = true, f.value.tempStart = i, n("range-select", i, null);
      else {
        const M = f.value.tempStart;
        if (M && (i.year !== M.year || i.month !== M.month || i.day !== M.day)) {
          f.value.isSelecting = false, f.value.tempStart = null;
          const D = M.year * 1e4 + M.month * 100 + M.day, S = i.year * 1e4 + i.month * 100 + i.day;
          D <= S ? n("range-select", M, i) : n("range-select", i, M);
        } else
          f.value.tempStart = i, n("range-select", i, null);
      }
    }, T = (i, b) => {
      n("time-select", i, b);
    };
    return e({
      // 獲取當前顯示的月份
      getCurrentDisplay: () => ({
        left: { year: c.value, month: u.value },
        right: { year: h.value, month: p.value }
      }),
      // 設置顯示月份
      setDisplayMonth: (i, b) => {
        c.value = i, u.value = b;
      },
      // 重置範圍選擇狀態
      resetRangeSelection: () => {
        f.value.isSelecting = false, f.value.tempStart = null;
      },
      // 獲取當前選擇狀態
      getSelectionState: () => ({
        isSelecting: f.value.isSelecting,
        tempStart: f.value.tempStart
      }),
      // 月份導航
      previousMonth: () => {
        u.value === 1 ? (u.value = 12, c.value -= 1) : u.value -= 1;
      },
      nextMonth: () => {
        u.value === 12 ? (u.value = 1, c.value += 1) : u.value += 1;
      }
    }), (i, b) => (openBlock(), createElementBlock("div", Ss, [
      createBaseVNode("div", ks, [
        createVNode(ha, {
          "range-start": i.rangeStart,
          "range-end": i.rangeEnd,
          "selection-mode": "range",
          year: c.value,
          month: u.value,
          "min-date": i.minDate,
          "max-date": i.maxDate,
          locale: i.locale,
          "week-starts-on": i.weekStartsOn,
          calendar: i.calendar,
          showTimeSelector: i.showTimeSelector,
          "time-value": i.startTimeValue,
          "enable-seconds": i.enableSeconds,
          "use24-hour": i.use24Hour,
          "default-time": i.defaultTime,
          onRangeSelect: w,
          onTimeSelect: b[0] || (b[0] = (M) => T(M, "start"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour", "default-time"])
      ]),
      createBaseVNode("div", ws, [
        createVNode(ha, {
          "range-start": i.rangeStart,
          "range-end": i.rangeEnd,
          "selection-mode": "range",
          year: h.value,
          month: p.value,
          "min-date": i.minDate,
          "max-date": i.maxDate,
          locale: i.locale,
          "week-starts-on": i.weekStartsOn,
          calendar: i.calendar,
          showTimeSelector: i.showTimeSelector,
          "time-value": i.endTimeValue,
          "enable-seconds": i.enableSeconds,
          "use24-hour": i.use24Hour,
          "default-time": i.defaultTime,
          onRangeSelect: w,
          onTimeSelect: b[1] || (b[1] = (M) => T(M, "end"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour", "default-time"])
      ])
    ]));
  }
});
var Yt = "00:00:00";
var Ct = "23:59:59";
function xs(r = {}, e) {
  const {
    calendar: t = "gregory",
    modelValue: a = null,
    showTime: n = false,
    required: o = false,
    disabled: l = false,
    incomplete: s = false,
    dateFormat: c = "YYYY-MM-DD",
    timeFormat: u = "HH:mm:ss",
    outputType: h = "iso",
    useStrictISO: p = false,
    enableSeconds: f = false,
    minDate: w,
    maxDate: T,
    maxRange: m,
    minRange: y,
    locale: i = "zh-TW"
  } = r, {
    containerRef: b,
    calendarRef: M,
    startDateInputRef: D,
    endDateInputRef: S,
    startTimeInputRef: k,
    endTimeInputRef: d
  } = e, g = ref(l);
  let v = {};
  const A = pa({
    required: o,
    showTime: n,
    minDate: w,
    maxDate: T,
    dateFormat: c
  }), N = pa({
    required: o,
    showTime: n,
    minDate: w,
    maxDate: T,
    dateFormat: c
  }), J = ga({
    showTime: n,
    dateFormat: c,
    timeFormat: u,
    outputType: h,
    defaultTime: Yt,
    enableSeconds: f
  }), z = ga({
    showTime: n,
    dateFormat: c,
    timeFormat: u,
    outputType: h,
    defaultTime: Ct,
    enableSeconds: f
  }), ae = Nr(
    b,
    M,
    { disabled: g }
  ), G = va(
    { dateInputRef: D, timeInputRef: k },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), O = va(
    { dateInputRef: S, timeInputRef: d },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), E = computed(
    () => J.hasValue.value || z.hasValue.value
  ), $ = computed(() => {
    const I = {
      ...A.mergedErrors.value,
      ...N.mergedErrors.value
    };
    return J.internalDateTime.value && !z.internalDateTime.value && s && (I["range.endRequired"] = "range.endRequired"), I;
  }), L = computed(() => ({
    ...A.mergedErrorParams.value,
    ...N.mergedErrorParams.value
  })), H = computed(() => Object.keys($.value).length > 0), te = computed(() => {
    const I = J.internalDateTime.value, X = z.internalDateTime.value;
    if (!I || !X || Wt(I, X) > 0) return false;
    if (m || y) {
      const le = nr(I, X);
      if (m && le > m)
        return N.handleDateValidation(false, {
          range: "range.exceedsMaxRange"
        }, "endDate", {
          range: { maxRange: m, actualDays: le }
        }), false;
      if (y && le < y)
        return N.handleDateValidation(false, {
          range: "range.belowMinRange"
        }, "endDate", {
          range: { minRange: y, actualDays: le }
        }), false;
      N.clearFieldErrors("range");
    }
    return !H.value;
  }), ce = computed(() => [
    {
      label: "今天",
      getValue: () => {
        const I = Xe();
        return {
          start: Ne(I.year, I.month, I.day, 0, 0, 0),
          end: Ne(I.year, I.month, I.day, 23, 59, 59)
        };
      }
    },
    {
      label: "最近7天",
      getValue: () => ({
        start: ua(Xe(), -6),
        end: Xe()
      })
    },
    {
      label: "最近30天",
      getValue: () => ({
        start: ua(Xe(), -29),
        end: Xe()
      })
    },
    {
      label: "本月",
      getValue: wo
    }
  ]), se = computed(() => ({
    minDate: pe(w, i),
    maxDate: z.internalDateTime.value || pe(T, i)
  })), C = computed(() => ({
    minDate: J.internalDateTime.value || pe(w, i),
    maxDate: pe(T, i)
  })), x = computed(() => ({
    minDate: se.value.minDate ? Ee(se.value.minDate, c) : null,
    maxDate: se.value.maxDate ? Ee(se.value.maxDate, c) : null
  })), U = computed(() => ({
    minDate: C.value.minDate ? Ee(C.value.minDate, c) : null,
    maxDate: C.value.maxDate ? Ee(C.value.maxDate, c) : null
  }));
  function ee(I, X) {
    const le = nr(I, X);
    return m && le > m ? {
      valid: false,
      error: "range.exceedsMaxRange",
      params: { maxRange: m, actualDays: le }
    } : y && le < y ? {
      valid: false,
      error: "range.belowMinRange",
      params: { minRange: y, actualDays: le }
    } : { valid: true };
  }
  function _(I) {
    !I.error || !I.params || N.handleDateValidation(
      false,
      { range: I.error },
      "endDate",
      { range: I.params }
    );
  }
  function P() {
    var Te, wt, ut, Ca, Ra;
    if (!J.internalDateTime.value || !z.internalDateTime.value) {
      (Te = v.update) == null || Te.call(v, null), (wt = v.change) == null || wt.call(v, null);
      return;
    }
    const I = n ? u : void 0, X = {
      start: jt(
        J.internalDateTime.value,
        h,
        c,
        I,
        n,
        t,
        i,
        p,
        f
      ),
      end: jt(
        z.internalDateTime.value,
        h,
        c,
        I,
        n,
        t,
        i,
        p,
        f
      )
    };
    (ut = v.update) == null || ut.call(v, X), (Ca = v.change) == null || Ca.call(v, X);
    const le = te.value && !H.value;
    (Ra = v.validation) == null || Ra.call(v, le, $.value, L.value);
  }
  function K(I, X) {
    X.forEach((le) => I.clearFieldErrors(le));
  }
  const oe = (I) => {
    v = I;
  }, ye = (I, X, le, Te, wt) => {
    var ut;
    le.handleDateValidation(I, X, Te, wt), (ut = v.validation) == null || ut.call(v, !H.value, $.value, L.value);
  }, De = (I, X, le) => {
    ye(I, X, A, "startDate", le);
  }, V = (I, X, le) => {
    ye(I, X, N, "endDate", le);
  }, re = (I, X, le = {}) => {
    var Te;
    A.handleTimeValidation(I, X, "startTime", le), (Te = v.validation) == null || Te.call(v, !H.value, $.value);
  }, be = (I, X, le = {}) => {
    var Te;
    N.handleTimeValidation(I, X, "endTime", le), (Te = v.validation) == null || Te.call(v, !H.value, $.value, L.value);
  }, R = (I) => {
    J.inputDateValue.value = I;
    const X = J.updateFromInputs();
    if (!X) {
      A.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    A.validateDateRange(X) && (G.autoFocusTimeAfterDateComplete(
      J,
      Yt
    ), P(), K(A, ["startDate", "date.year", "date.month", "date.day"]), n || O.focusFirstInput());
  }, Z = (I) => {
    z.inputDateValue.value = I;
    const X = z.updateFromInputs();
    if (!X) {
      N.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    N.validateDateRange(X) && (O.autoFocusTimeAfterDateComplete(
      z,
      Ct
    ), P(), K(N, ["endDate", "date.year", "date.month", "date.day"]));
  }, ne = (I) => {
    J.inputTimeValue.value = I, J.updateFromInputs() && P(), K(A, ["startTime", "time.hour", "time.minute", "time.second"]);
  }, Q = (I) => {
    z.inputTimeValue.value = I, z.updateFromInputs() && P(), K(N, ["endTime", "time.hour", "time.minute", "time.second"]);
  }, $e = (I, X) => {
    I && !X ? Ae(I) : I && X ? St(I, X) : Kt(), P();
  };
  function Ae(I) {
    A.validateDateRange(I) && (J.setInternalDateTime(I), K(A, ["startDate", "date.year", "date.month", "date.day"]), z.clearValues());
  }
  function St(I, X) {
    if (!(!A.validateDateRange(I) || !N.validateDateRange(X))) {
      if (m || y) {
        const le = ee(I, X);
        if (!le.valid) {
          _(le);
          return;
        }
      }
      J.setInternalDateTime(I), z.setInternalDateTime(X), n && (J.inputTimeValue.value || (J.inputTimeValue.value = Yt, J.updateFromInputs()), z.inputTimeValue.value || (z.inputTimeValue.value = Ct, z.updateFromInputs())), K(A, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]), K(N, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]);
    }
  }
  const kt = (I, X) => {
    X === "start" && J.internalDateTime.value && ne(I), X === "end" && z.internalDateTime.value && Q(I);
  }, Wr = (I) => {
    const X = I.getValue();
    J.setInternalDateTime(X.start), z.setInternalDateTime(X.end), n && (J.inputTimeValue.value || (J.inputTimeValue.value = Yt, J.updateFromInputs()), z.inputTimeValue.value || (z.inputTimeValue.value = Ct, z.updateFromInputs())), P();
  }, Kt = () => {
    J.clearValues(), z.clearValues(), A.clearAllErrors(), N.clearAllErrors(), P();
  }, Jr = (I) => {
    I ? (J.setExternalValue(I.start), z.setExternalValue(I.end)) : Kt(), P();
  }, _r = () => {
    var I, X, le, Te;
    return (I = D.value) == null || I.validate(), (X = S.value) == null || X.validate(), n && ((le = k.value) == null || le.validate(), (Te = d.value) == null || Te.validate()), te.value;
  }, Kr = (I) => {
    ae.handleContainerClick(I, () => {
      G.focusFirstInput();
    });
  }, Qr = (I) => {
    ae.handleContainerClick(I, () => {
      O.focusFirstInput();
    });
  };
  return watch(() => a, (I) => {
    if (I && (I.start || I.end)) {
      const X = I.start ? pe(I.start, i, t) : null, le = I.end ? pe(I.end, i, t) : null;
      if (I.start && !X && (console.warn(`Invalid start date provided: ${I.start}`), A.handleDateValidation(false, { date: "date.invalid" }, "startDate")), I.end && !le && (console.warn(`Invalid end date provided: ${I.end}`), N.handleDateValidation(false, { date: "date.invalid" }, "endDate")), X && le && Wt(X, le) > 0) {
        console.warn("Initial date range has start > end, auto-swapping values"), J.setExternalValue(I.end), z.setExternalValue(I.start), setTimeout(() => {
          P();
        }, 0);
        return;
      }
      J.setExternalValue(X ? I.start : null), z.setExternalValue(le ? I.end : null);
    } else
      J.clearValues(), z.clearValues();
  }, { immediate: true }), {
    // 狀態
    isDisabled: g,
    startDateConstraints: se,
    endDateConstraints: C,
    startDateConstraintsStr: x,
    endDateConstraintsStr: U,
    // 驗證相關
    hasErrors: H,
    mergedErrors: $,
    mergedErrorParams: L,
    isValidRange: te,
    // 日期時間值
    startDateTime: J,
    endDateTime: z,
    // 顯示值
    hasRangeValue: E,
    // 日曆相關
    ...ae,
    // 快捷選項
    shortcuts: ce,
    // 事件設置
    setEmitters: oe,
    // 驗證事件處理
    handleStartDateValidation: De,
    handleEndDateValidation: V,
    handleStartTimeValidation: re,
    handleEndTimeValidation: be,
    // 完成事件處理
    handleStartDateComplete: R,
    handleEndDateComplete: Z,
    handleStartTimeComplete: ne,
    handleEndTimeComplete: Q,
    // 日曆事件處理
    handleCalendarRangeSelect: $e,
    handleTimeSelect: kt,
    // 導航事件處理
    handleStartNavigateToDate: G.handleNavigateToDate,
    handleEndNavigateToDate: O.handleNavigateToDate,
    // 主要操作
    applyShortcut: Wr,
    clearRange: Kt,
    setRange: Jr,
    validate: _r,
    // 導航方法
    focusStartDate: Kr,
    focusEndDate: Qr
  };
}
var Ys = ["disabled"];
var Cs = ["title"];
var Rs = {
  key: 0,
  class: "date-placeholder text-vdt-content truncate block"
};
var Es = {
  key: 1,
  class: "date-placeholder text-vdt-content-muted truncate block"
};
var Is = {
  class: "text-vdt-content-muted text-sm px-1",
  "aria-label": "日期範圍分隔符",
  "data-testid": "separator"
};
var Os = ["title"];
var Vs = {
  key: 0,
  class: "date-placeholder text-vdt-content truncate block"
};
var Fs = {
  key: 1,
  class: "date-placeholder text-vdt-content-muted truncate block"
};
var Ps = ["disabled"];
var As = ["title"];
var Ls = { class: "p-2 space-y-2" };
var Hs = {
  key: 0,
  class: "w-full flex flex-col md:flex-row flex-justify-between gap-2"
};
var Bs = {
  key: 0,
  "data-testid": "start-time-inputs",
  "aria-label": "開始時間輸入區域"
};
var qs = {
  key: 0,
  "data-testid": "end-time-inputs",
  "aria-label": "結束時間輸入區域"
};
var Ns = {
  key: 1,
  "aria-label": "日期範圍快捷選項"
};
var Us = { class: "flex flex-wrap gap-2" };
var zs = ["aria-label", "data-testid", "onClick"];
var js = { key: 2 };
var Ws = { class: "flex flex-wrap gap-2" };
var Js = { class: "calendar-container flex flex-col md:flex-row gap-1 overflow-auto" };
var _s = { key: 0 };
var Ks = defineComponent({
  __name: "DateRange",
  props: {
    modelValue: { default: null },
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
    const a = r, n = t, o = ref(null), l = ref(null), s = ref(null), c = ref(null), u = ref(null), h = ref(null), p = ref({}), f = computed(() => a.timeFormat ? a.timeFormat : a.enableSeconds ? a.use24Hour ? "HH:mm:ss" : "hh:mm:ss A" : a.use24Hour ? "HH:mm" : "hh:mm A"), w = xs(
      {
        calendar: a.calendar,
        modelValue: a.modelValue,
        showTime: a.showTime,
        required: a.required,
        disabled: a.disabled,
        dateFormat: a.dateFormat,
        timeFormat: f.value,
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
        endDateInputRef: c,
        startTimeInputRef: u,
        endTimeInputRef: h
      }
    ), { setLocale: T, getPlaceholderMessage: m } = Mt(a.locale);
    w.setEmitters({
      update: (V) => n("update:modelValue", V),
      change: (V) => n("change", V),
      validation: (V, re, be) => n("validation", V, re, be)
    });
    const {
      themeClasses: y,
      containerAttributes: i,
      setColor: b,
      setMode: M
    } = jr(), D = computed(() => {
      var re, be, R, Z, ne, Q, $e, Ae;
      const V = {
        start: m("range.start"),
        end: m("range.end"),
        year: m("date.year"),
        month: m("date.month"),
        day: m("date.day"),
        hour: m("time.hour"),
        minute: m("time.minute"),
        second: m("time.second")
      };
      return {
        start: ((re = a.placeholderOverrides) == null ? void 0 : re.start) || V.start,
        end: ((be = a.placeholderOverrides) == null ? void 0 : be.end) || V.end,
        // 時間相關
        hour: ((R = a.placeholderOverrides) == null ? void 0 : R.hour) || V.hour,
        minute: ((Z = a.placeholderOverrides) == null ? void 0 : Z.minute) || V.minute,
        second: ((ne = a.placeholderOverrides) == null ? void 0 : ne.second) || V.second,
        // 日期相關
        year: ((Q = a.placeholderOverrides) == null ? void 0 : Q.year) || V.year,
        month: (($e = a.placeholderOverrides) == null ? void 0 : $e.month) || V.month,
        day: ((Ae = a.placeholderOverrides) == null ? void 0 : Ae.day) || V.day
      };
    }), S = computed(() => a.dateFormat), k = computed(() => ({
      ...w.mergedErrors.value,
      ...p.value
    })), d = computed(() => Object.keys(G.value).length > 0);
    watch(() => a.theme, (V) => {
      V && b(V);
    }, { immediate: true }), watch(() => a.mode, (V) => {
      M(V);
    }, { immediate: true }), watch(() => a.locale, (V) => {
      V && T(V);
    }, { immediate: true }), watch(() => a.calendar, (V) => {
      me.isCalendarSupported(V) ? delete p.value.calendar : p.value.calendar = "calendar.unsupported";
    }, { immediate: true }), onBeforeMount(() => {
      T(a.locale);
    }), e({
      // 基本操作
      reset: w.clearRange,
      validate: w.validate,
      setRange: w.setRange,
      // 聚焦方法
      focusStartDate: w.focusStartDate,
      focusEndDate: w.focusEndDate,
      // 主題控制
      setTheme: b,
      setDarkMode: () => M("dark"),
      setLightMode: () => M("light"),
      setAutoMode: () => M("auto"),
      // 錯誤相關
      getErrors: () => G.value,
      hasErrors: () => d.value
    });
    const {
      // 狀態
      showCalendar: g,
      startDateConstraintsStr: v,
      endDateConstraintsStr: A,
      shortcuts: N,
      startDateTime: J,
      endDateTime: z,
      hasRangeValue: ae,
      mergedErrors: G,
      mergedErrorParams: O,
      // 事件處理方法
      handleStartDateValidation: E,
      handleEndDateValidation: $,
      handleStartTimeValidation: L,
      handleEndTimeValidation: H,
      handleStartDateComplete: te,
      handleEndDateComplete: ce,
      handleStartTimeComplete: se,
      handleEndTimeComplete: C,
      handleCalendarRangeSelect: x,
      handleStartNavigateToDate: U,
      handleEndNavigateToDate: ee,
      handleTimeSelect: _,
      // 操作方法
      toggleCalendar: P,
      applyShortcut: K,
      clearRange: oe,
      focusStartDate: ye,
      focusEndDate: De
    } = w;
    return (V, re) => {
      var be, R, Z, ne;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", mergeProps({
          class: ["date-range-wrapper md:min-w-auto relative w-full", [unref(y), V.showTime ? "min-w-[300px]" : "min-w-[200px]"]]
        }, unref(i), {
          ref_key: "containerRef",
          ref: o
        }), [
          createBaseVNode("div", {
            class: normalizeClass(["date-picker-container flex w-full items-center px-2 py-1 rounded-sm transition-all duration-200 bg-vdt-surface text-vdt-content disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": d.value }]])
          }, [
            createBaseVNode("button", {
              type: "button",
              class: "flex items-center gap-1 flex-1 cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
              disabled: V.disabled,
              onClick: re[0] || (re[0] = //@ts-ignore
              (...Q) => unref(P) && unref(P)(...Q)),
              "aria-label": "選擇日期範圍"
            }, [
              createBaseVNode("div", {
                class: "flex-1 text-center min-w-0 max-w-[130px] sm:max-w-none",
                title: D.value.start
              }, [
                (be = V.modelValue) != null && be.start ? (openBlock(), createElementBlock("span", Rs, toDisplayString((R = V.modelValue) == null ? void 0 : R.start), 1)) : (openBlock(), createElementBlock("span", Es, toDisplayString(D.value.start), 1))
              ], 8, Cs),
              createBaseVNode("div", Is, toDisplayString(V.separator), 1),
              createBaseVNode("div", {
                class: "flex-1 text-center min-w-0 max-w-[130px] sm:max-w-none",
                title: D.value.end
              }, [
                (Z = V.modelValue) != null && Z.end ? (openBlock(), createElementBlock("span", Vs, toDisplayString((ne = V.modelValue) == null ? void 0 : ne.end), 1)) : (openBlock(), createElementBlock("span", Fs, toDisplayString(D.value.end), 1))
              ], 8, Os)
            ], 8, Ys),
            createBaseVNode("div", {
              class: normalizeClass(["date-picker-icon-container relative group cursor-pointer flex justify-center items-center flex-shrink-0", { "cursor-not-allowed": V.disabled }])
            }, [
              createBaseVNode("button", {
                type: "button",
                "aria-label": "開啟日曆",
                class: normalizeClass(["date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed", { "group-hover:opacity-0": unref(ae) && !V.disabled && V.showClearButton }]),
                disabled: V.disabled,
                onClick: re[1] || (re[1] = withModifiers((Q) => {
                  var $e;
                  return ($e = unref(P)) == null ? void 0 : $e();
                }, ["stop", "prevent"]))
              }, [
                createVNode(Lr, { class: "h-5 w-5" })
              ], 10, Ps),
              unref(ae) && !V.disabled && V.showClearButton ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                "aria-label": "清除日期",
                class: "date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100",
                onClick: re[2] || (re[2] = withModifiers(
                  //@ts-ignore
                  (...Q) => unref(oe) && unref(oe)(...Q),
                  ["stop"]
                )),
                title: "清除日期" + (V.showTime ? "時間" : "")
              }, [
                createVNode(qr, { class: "h-4 w-4" })
              ], 8, As)) : createCommentVNode("", true)
            ], 2)
          ], 2),
          unref(g) && !V.disabled ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "calendarRef",
            ref: l,
            class: "absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10 overflow-auto md:min-w-[570px]",
            onClick: re[9] || (re[9] = withModifiers(() => {
            }, ["stop"])),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "date-range-picker"
          }, [
            createBaseVNode("div", Ls, [
              V.inputEnabled ? (openBlock(), createElementBlock("div", Hs, [
                createBaseVNode("div", {
                  "data-testid": "start-date-inputs",
                  "aria-label": "開始日期輸入區域",
                  onClick: re[5] || (re[5] = withModifiers(
                    //@ts-ignore
                    (...Q) => unref(ye) && unref(ye)(...Q),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center px-2 py-1 gap-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  createVNode(fa, {
                    ref_key: "startDateInputRef",
                    ref: s,
                    modelValue: unref(J).inputDateValue.value,
                    "onUpdate:modelValue": re[3] || (re[3] = (Q) => unref(J).inputDateValue.value = Q),
                    "year-placeholder": D.value.year,
                    "month-placeholder": D.value.month,
                    "day-placeholder": D.value.day,
                    "max-date": unref(v).maxDate,
                    "min-date": unref(v).minDate,
                    "date-format": S.value,
                    onValidation: unref(E),
                    onComplete: unref(te)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "max-date", "min-date", "date-format", "onValidation", "onComplete"]),
                  V.showTime ? (openBlock(), createElementBlock("div", Bs, [
                    createVNode(ma, {
                      ref_key: "startTimeInputRef",
                      ref: u,
                      modelValue: unref(J).inputTimeValue.value,
                      "onUpdate:modelValue": re[4] || (re[4] = (Q) => unref(J).inputTimeValue.value = Q),
                      "hour-placeholder": D.value.hour,
                      "minute-placeholder": D.value.minute,
                      "second-placeholder": D.value.second,
                      "enable-seconds": V.enableSeconds,
                      use24Hour: V.use24Hour,
                      locale: V.locale,
                      onValidation: unref(L),
                      onComplete: unref(se),
                      onNavigateToDate: unref(U)
                    }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", {
                  "data-testid": "end-date-inputs",
                  "aria-label": "結束日期輸入區域",
                  onClick: re[8] || (re[8] = withModifiers(
                    //@ts-ignore
                    (...Q) => unref(De) && unref(De)(...Q),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center gap-2 px-2 py-1 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  createVNode(fa, {
                    ref_key: "endDateInputRef",
                    ref: c,
                    modelValue: unref(z).inputDateValue.value,
                    "onUpdate:modelValue": re[6] || (re[6] = (Q) => unref(z).inputDateValue.value = Q),
                    "year-placeholder": D.value.year,
                    "month-placeholder": D.value.month,
                    "day-placeholder": D.value.day,
                    "min-date": unref(A).minDate,
                    "max-date": unref(A).maxDate,
                    "date-format": S.value,
                    onValidation: unref($),
                    onComplete: unref(ce)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "date-format", "onValidation", "onComplete"]),
                  V.showTime ? (openBlock(), createElementBlock("div", qs, [
                    createVNode(ma, {
                      ref_key: "endTimeInputRef",
                      ref: h,
                      modelValue: unref(z).inputTimeValue.value,
                      "onUpdate:modelValue": re[7] || (re[7] = (Q) => unref(z).inputTimeValue.value = Q),
                      "hour-placeholder": D.value.hour,
                      "minute-placeholder": D.value.minute,
                      "second-placeholder": D.value.second,
                      "enable-seconds": V.enableSeconds,
                      use24Hour: V.use24Hour,
                      locale: V.locale,
                      onValidation: unref(H),
                      onComplete: unref(C),
                      onNavigateToDate: unref(ee)
                    }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              unref(N).length > 0 && V.showShortcuts ? (openBlock(), createElementBlock("div", Ns, [
                createBaseVNode("div", Us, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(N), (Q) => (openBlock(), createElementBlock("button", {
                    key: Q.label,
                    type: "button",
                    "aria-label": `選擇${Q.label}範圍`,
                    "data-testid": `shortcut-${Q.label.toLowerCase().replace(/\s+/g, "-")}`,
                    class: "px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors",
                    onClick: ($e) => unref(K)(Q)
                  }, toDisplayString(Q.label), 9, zs))), 128)),
                  renderSlot(V.$slots, "shortcuts", {
                    applyShortcut: unref(K),
                    shortcuts: unref(N),
                    currentRange: V.modelValue
                  })
                ])
              ])) : V.$slots.shortcuts && V.showShortcuts ? (openBlock(), createElementBlock("div", js, [
                createBaseVNode("div", Ws, [
                  renderSlot(V.$slots, "shortcuts", {
                    applyShortcut: unref(K),
                    shortcuts: unref(N),
                    currentRange: V.modelValue
                  })
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", Js, [
                createVNode(Ts, {
                  showTimeSelector: V.showTime,
                  calendar: V.calendar,
                  "range-start": unref(J).internalDateTime.value,
                  "range-end": unref(z).internalDateTime.value,
                  enableSeconds: V.enableSeconds,
                  use24Hour: V.use24Hour,
                  locale: V.locale,
                  "week-starts-on": V.weekStartsOn,
                  "start-time-value": unref(J).inputTimeValue.value,
                  "end-time-value": unref(z).inputTimeValue.value,
                  "min-date": unref(pe)(V.minDate),
                  "max-date": unref(pe)(V.maxDate),
                  onRangeSelect: unref(x),
                  onTimeSelect: unref(_)
                }, null, 8, ["showTimeSelector", "calendar", "range-start", "range-end", "enableSeconds", "use24Hour", "locale", "week-starts-on", "start-time-value", "end-time-value", "min-date", "max-date", "onRangeSelect", "onTimeSelect"])
              ])
            ])
          ], 512)) : createCommentVNode("", true)
        ], 16),
        V.showErrorMessage && d.value ? (openBlock(), createElementBlock("div", _s, [
          renderSlot(V.$slots, "error", {
            errors: k.value,
            hasErrors: d.value
          }, () => [
            createVNode(Ar, {
              errors: unref(G),
              locale: V.locale,
              "use-i18n": V.useI18n,
              "custom-messages": V.customErrorMessages,
              errorParams: unref(O)
            }, createSlots({ _: 2 }, [
              renderList(V.$slots, (Q, $e) => ({
                name: $e,
                fn: withCtx((Ae) => [
                  renderSlot(V.$slots, $e, normalizeProps(guardReactiveProps(Ae)))
                ])
              }))
            ]), 1032, ["errors", "locale", "use-i18n", "custom-messages", "errorParams"])
          ])
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var di = {
  install(r) {
    r.component("VueDatepicker", ir), r.component("DatePicker", ir), r.component("DateRange", Ks);
  }
};
export {
  ir as DatePicker,
  Ks as DateRange,
  Fr as RocFormatPlugin,
  di as VueDatepicker,
  di as default
};
//# sourceMappingURL=@tiaohsun_vue-datepicker.js.map
