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
var be = (r, e, t) => Gr(r, typeof e != "symbol" ? e + "" : e, t);
function $t(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Rt = { exports: {} };
var an = Rt.exports;
var Ea;
function rn() {
  return Ea || (Ea = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(an, function() {
      var t = "minute", a = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
      return function(o, l, s) {
        var u = l.prototype;
        s.utc = function(m) {
          var p = { date: m, utc: true, args: arguments };
          return new l(p);
        }, u.utc = function(m) {
          var p = s(this.toDate(), { locale: this.$L, utc: true });
          return m ? p.add(this.utcOffset(), t) : p;
        }, u.local = function() {
          return s(this.toDate(), { locale: this.$L, utc: false });
        };
        var c = u.parse;
        u.parse = function(m) {
          m.utc && (this.$u = true), this.$utils().u(m.$offset) || (this.$offset = m.$offset), c.call(this, m);
        };
        var g = u.init;
        u.init = function() {
          if (this.$u) {
            var m = this.$d;
            this.$y = m.getUTCFullYear(), this.$M = m.getUTCMonth(), this.$D = m.getUTCDate(), this.$W = m.getUTCDay(), this.$H = m.getUTCHours(), this.$m = m.getUTCMinutes(), this.$s = m.getUTCSeconds(), this.$ms = m.getUTCMilliseconds();
          } else g.call(this);
        };
        var y = u.utcOffset;
        u.utcOffset = function(m, p) {
          var i = this.$utils().u;
          if (i(m)) return this.$u ? 0 : i(this.$offset) ? y.call(this) : this.$offset;
          if (typeof m == "string" && (m = function(k) {
            k === void 0 && (k = "");
            var M = k.match(a);
            if (!M) return null;
            var d = ("" + M[0]).match(n) || ["-", 0, 0], v = d[0], h = 60 * +d[1] + +d[2];
            return h === 0 ? 0 : v === "+" ? h : -h;
          }(m), m === null)) return this;
          var b = Math.abs(m) <= 16 ? 60 * m : m, D = this;
          if (p) return D.$offset = b, D.$u = m === 0, D;
          if (m !== 0) {
            var S = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (D = this.local().add(b + S, t)).$offset = b, D.$x.$localOffset = S;
          } else D = this.utc();
          return D;
        };
        var f = u.format;
        u.format = function(m) {
          var p = m || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return f.call(this, p);
        }, u.valueOf = function() {
          var m = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * m;
        }, u.isUTC = function() {
          return !!this.$u;
        }, u.toISOString = function() {
          return this.toDate().toISOString();
        }, u.toString = function() {
          return this.toDate().toUTCString();
        };
        var T = u.toDate;
        u.toDate = function(m) {
          return m === "s" && this.$offset ? s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : T.call(this);
        };
        var w = u.diff;
        u.diff = function(m, p, i) {
          if (m && this.$u === m.$u) return w.call(this, m, p, i);
          var b = this.local(), D = s(m).local();
          return w.call(b, D, p, i);
        };
      };
    });
  }(Rt)), Rt.exports;
}
var nn = rn();
var on = $t(nn);
var Et = { exports: {} };
var ln = Et.exports;
var Ia;
function sn() {
  return Ia || (Ia = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(ln, function() {
      var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, a = {};
      return function(n, o, l) {
        var s, u = function(f, T, w) {
          w === void 0 && (w = {});
          var m = new Date(f), p = function(i, b) {
            b === void 0 && (b = {});
            var D = b.timeZoneName || "short", S = i + "|" + D, k = a[S];
            return k || (k = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: i, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: D }), a[S] = k), k;
          }(T, w);
          return p.formatToParts(m);
        }, c = function(f, T) {
          for (var w = u(f, T), m = [], p = 0; p < w.length; p += 1) {
            var i = w[p], b = i.type, D = i.value, S = t[b];
            S >= 0 && (m[S] = parseInt(D, 10));
          }
          var k = m[3], M = k === 24 ? 0 : k, d = m[0] + "-" + m[1] + "-" + m[2] + " " + M + ":" + m[4] + ":" + m[5] + ":000", v = +f;
          return (l.utc(d).valueOf() - (v -= v % 1e3)) / 6e4;
        }, g = o.prototype;
        g.tz = function(f, T) {
          f === void 0 && (f = s);
          var w, m = this.utcOffset(), p = this.toDate(), i = p.toLocaleString("en-US", { timeZone: f }), b = Math.round((p - new Date(i)) / 1e3 / 60), D = 15 * -Math.round(p.getTimezoneOffset() / 15) - b;
          if (!Number(D)) w = this.utcOffset(0, T);
          else if (w = l(i, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(D, true), T) {
            var S = w.utcOffset();
            w = w.add(m - S, "minute");
          }
          return w.$x.$timezone = f, w;
        }, g.offsetName = function(f) {
          var T = this.$x.$timezone || l.tz.guess(), w = u(this.valueOf(), T, { timeZoneName: f }).find(function(m) {
            return m.type.toLowerCase() === "timezonename";
          });
          return w && w.value;
        };
        var y = g.startOf;
        g.startOf = function(f, T) {
          if (!this.$x || !this.$x.$timezone) return y.call(this, f, T);
          var w = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return y.call(w, f, T).tz(this.$x.$timezone, true);
        }, l.tz = function(f, T, w) {
          var m = w && T, p = w || T || s, i = c(+l(), p);
          if (typeof f != "string") return l(f).tz(p);
          var b = function(M, d, v) {
            var h = M - 60 * d * 1e3, A = c(h, v);
            if (d === A) return [h, d];
            var B = c(h -= 60 * (A - d) * 1e3, v);
            return A === B ? [h, A] : [M - 60 * Math.min(A, B) * 1e3, Math.max(A, B)];
          }(l.utc(f, m).valueOf(), i, p), D = b[0], S = b[1], k = l(D).utcOffset(S);
          return k.$x.$timezone = p, k;
        }, l.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, l.tz.setDefault = function(f) {
          s = f;
        };
      };
    });
  }(Et)), Et.exports;
}
var un = sn();
var cn = $t(un);
var It = { exports: {} };
var dn = It.exports;
var Oa;
function fn() {
  return Oa || (Oa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(dn, function() {
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, a = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, o = /\d\d/, l = /\d\d?/, s = /\d*[^-_:/,()\s\d]+/, u = {}, c = function(p) {
        return (p = +p) + (p > 68 ? 1900 : 2e3);
      }, g = function(p) {
        return function(i) {
          this[p] = +i;
        };
      }, y = [/[+-]\d\d:?(\d\d)?|Z/, function(p) {
        (this.zone || (this.zone = {})).offset = function(i) {
          if (!i || i === "Z") return 0;
          var b = i.match(/([+-]|\d\d)/g), D = 60 * b[1] + (+b[2] || 0);
          return D === 0 ? 0 : b[0] === "+" ? -D : D;
        }(p);
      }], f = function(p) {
        var i = u[p];
        return i && (i.indexOf ? i : i.s.concat(i.f));
      }, T = function(p, i) {
        var b, D = u.meridiem;
        if (D) {
          for (var S = 1; S <= 24; S += 1) if (p.indexOf(D(S, 0, i)) > -1) {
            b = S > 12;
            break;
          }
        } else b = p === (i ? "pm" : "PM");
        return b;
      }, w = { A: [s, function(p) {
        this.afternoon = T(p, false);
      }], a: [s, function(p) {
        this.afternoon = T(p, true);
      }], Q: [n, function(p) {
        this.month = 3 * (p - 1) + 1;
      }], S: [n, function(p) {
        this.milliseconds = 100 * +p;
      }], SS: [o, function(p) {
        this.milliseconds = 10 * +p;
      }], SSS: [/\d{3}/, function(p) {
        this.milliseconds = +p;
      }], s: [l, g("seconds")], ss: [l, g("seconds")], m: [l, g("minutes")], mm: [l, g("minutes")], H: [l, g("hours")], h: [l, g("hours")], HH: [l, g("hours")], hh: [l, g("hours")], D: [l, g("day")], DD: [o, g("day")], Do: [s, function(p) {
        var i = u.ordinal, b = p.match(/\d+/);
        if (this.day = b[0], i) for (var D = 1; D <= 31; D += 1) i(D).replace(/\[|\]/g, "") === p && (this.day = D);
      }], w: [l, g("week")], ww: [o, g("week")], M: [l, g("month")], MM: [o, g("month")], MMM: [s, function(p) {
        var i = f("months"), b = (f("monthsShort") || i.map(function(D) {
          return D.slice(0, 3);
        })).indexOf(p) + 1;
        if (b < 1) throw new Error();
        this.month = b % 12 || b;
      }], MMMM: [s, function(p) {
        var i = f("months").indexOf(p) + 1;
        if (i < 1) throw new Error();
        this.month = i % 12 || i;
      }], Y: [/[+-]?\d+/, g("year")], YY: [o, function(p) {
        this.year = c(p);
      }], YYYY: [/\d{4}/, g("year")], Z: y, ZZ: y };
      function m(p) {
        var i, b;
        i = p, b = u && u.formats;
        for (var D = (p = i.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(A, B, _) {
          var z = _ && _.toUpperCase();
          return B || b[_] || t[_] || b[z].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(re, X, I) {
            return X || I.slice(1);
          });
        })).match(a), S = D.length, k = 0; k < S; k += 1) {
          var M = D[k], d = w[M], v = d && d[0], h = d && d[1];
          D[k] = h ? { regex: v, parser: h } : M.replace(/^\[|\]$/g, "");
        }
        return function(A) {
          for (var B = {}, _ = 0, z = 0; _ < S; _ += 1) {
            var re = D[_];
            if (typeof re == "string") z += re.length;
            else {
              var X = re.regex, I = re.parser, R = A.slice(z), $ = X.exec(R)[0];
              I.call(B, $), A = A.replace($, "");
            }
          }
          return function(H) {
            var L = H.afternoon;
            if (L !== void 0) {
              var te = H.hours;
              L ? te < 12 && (H.hours += 12) : te === 12 && (H.hours = 0), delete H.afternoon;
            }
          }(B), B;
        };
      }
      return function(p, i, b) {
        b.p.customParseFormat = true, p && p.parseTwoDigitYear && (c = p.parseTwoDigitYear);
        var D = i.prototype, S = D.parse;
        D.parse = function(k) {
          var M = k.date, d = k.utc, v = k.args;
          this.$u = d;
          var h = v[1];
          if (typeof h == "string") {
            var A = v[2] === true, B = v[3] === true, _ = A || B, z = v[2];
            B && (z = v[2]), u = this.$locale(), !A && z && (u = b.Ls[z]), this.$d = function(R, $, H, L) {
              try {
                if (["x", "X"].indexOf($) > -1) return new Date(($ === "X" ? 1e3 : 1) * R);
                var te = m($)(R), ce = te.year, se = te.month, C = te.day, x = te.hours, U = te.minutes, ee = te.seconds, J = te.milliseconds, P = te.zone, K = te.week, ne = /* @__PURE__ */ new Date(), De = C || (ce || se ? 1 : ne.getDate()), V = ce || ne.getFullYear(), ae = 0;
                ce && !se || (ae = se > 0 ? se - 1 : ne.getMonth());
                var pe, E = x || 0, Z = U || 0, oe = ee || 0, Q = J || 0;
                return P ? new Date(Date.UTC(V, ae, De, E, Z, oe, Q + 60 * P.offset * 1e3)) : H ? new Date(Date.UTC(V, ae, De, E, Z, oe, Q)) : (pe = new Date(V, ae, De, E, Z, oe, Q), K && (pe = L(pe).week(K).toDate()), pe);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            }(M, h, d, b), this.init(), z && z !== true && (this.$L = this.locale(z).$L), _ && M != this.format(h) && (this.$d = /* @__PURE__ */ new Date("")), u = {};
          } else if (h instanceof Array) for (var re = h.length, X = 1; X <= re; X += 1) {
            v[1] = h[X - 1];
            var I = b.apply(this, v);
            if (I.isValid()) {
              this.$d = I.$d, this.$L = I.$L, this.init();
              break;
            }
            X === re && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else S.call(this, k);
        };
      };
    });
  }(It)), It.exports;
}
var mn = fn();
var ur = $t(mn);
var Ot = { exports: {} };
var hn = Ot.exports;
var Va;
function vn() {
  return Va || (Va = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(hn, function() {
      var t = "week", a = "year";
      return function(n, o, l) {
        var s = o.prototype;
        s.week = function(u) {
          if (u === void 0 && (u = null), u !== null) return this.add(7 * (u - this.week()), "day");
          var c = this.$locale().yearStart || 1;
          if (this.month() === 11 && this.date() > 25) {
            var g = l(this).startOf(a).add(1, a).date(c), y = l(this).endOf(t);
            if (g.isBefore(y)) return 1;
          }
          var f = l(this).startOf(a).date(c).startOf(t).subtract(1, "millisecond"), T = this.diff(f, t, true);
          return T < 0 ? l(this).startOf("week").week() : Math.ceil(T);
        }, s.weeks = function(u) {
          return u === void 0 && (u = null), this.week(u);
        };
      };
    });
  }(Ot)), Ot.exports;
}
var pn = vn();
var gn = $t(pn);
var Vt = { exports: {} };
var yn = Vt.exports;
var Fa;
function $n() {
  return Fa || (Fa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(yn, function() {
      return function(t, a, n) {
        var o = a.prototype, l = function(y) {
          return y && (y.indexOf ? y : y.s);
        }, s = function(y, f, T, w, m) {
          var p = y.name ? y : y.$locale(), i = l(p[f]), b = l(p[T]), D = i || b.map(function(k) {
            return k.slice(0, w);
          });
          if (!m) return D;
          var S = p.weekStart;
          return D.map(function(k, M) {
            return D[(M + (S || 0)) % 7];
          });
        }, u = function() {
          return n.Ls[n.locale()];
        }, c = function(y, f) {
          return y.formats[f] || function(T) {
            return T.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(w, m, p) {
              return m || p.slice(1);
            });
          }(y.formats[f.toUpperCase()]);
        }, g = function() {
          var y = this;
          return { months: function(f) {
            return f ? f.format("MMMM") : s(y, "months");
          }, monthsShort: function(f) {
            return f ? f.format("MMM") : s(y, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return y.$locale().weekStart || 0;
          }, weekdays: function(f) {
            return f ? f.format("dddd") : s(y, "weekdays");
          }, weekdaysMin: function(f) {
            return f ? f.format("dd") : s(y, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(f) {
            return f ? f.format("ddd") : s(y, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(f) {
            return c(y.$locale(), f);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        o.localeData = function() {
          return g.bind(this)();
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
          }, longDateFormat: function(f) {
            return c(y, f);
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
  }(Vt)), Vt.exports;
}
var Dn = $n();
var bn = $t(Dn);
import_dayjs.default.extend(ur);
var Pa = {
  "en-US": ["MM/DD/YYYY", "M/D/YYYY"],
  "en-GB": ["DD/MM/YYYY", "D/M/YYYY"],
  "zh-TW": ["YYYY-MM-DD", "YYYY/MM/DD"],
  "zh-CN": ["YYYY-MM-DD", "YYYY/MM/DD"]
};
var Aa = [
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
    be(this, "locale");
    be(this, "calendar");
    be(this, "preferredFormats");
    this.locale = e, this.calendar = t, this.preferredFormats = [
      ...Pa[e] || [],
      ...Aa
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
        const t = new Vr();
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
      ...Pa[e] || [],
      ...Aa
    ];
  }
  setCalendar(e) {
    this.calendar = e;
  }
};
var ut = new Mn();
function Sn(r, e = "zh-TW", t = "gregory") {
  return e !== ut.locale && ut.setLocale(e), t !== ut.calendar && ut.setCalendar(t), ut.parse(r);
}
function Xe(r, e) {
  return r - e * Math.floor(r / e);
}
var cr = 1721426;
function _e(r, e, t, a) {
  e = Dt(r, e);
  let n = e - 1, o = -2;
  return t <= 2 ? o = 0 : We(e) && (o = -1), cr - 1 + 365 * n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400) + Math.floor((367 * t - 362) / 12 + o + a);
}
function We(r) {
  return r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0);
}
function Dt(r, e) {
  return r === "BC" ? 1 - e : e;
}
function jt(r) {
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
var Ee = class {
  fromJulianDay(e) {
    let t = e, a = t - cr, n = Math.floor(a / 146097), o = Xe(a, 146097), l = Math.floor(o / 36524), s = Xe(o, 36524), u = Math.floor(s / 1461), c = Xe(s, 1461), g = Math.floor(c / 365), y = n * 400 + l * 100 + u * 4 + g + (l !== 4 && g !== 4 ? 1 : 0), [f, T] = jt(y), w = t - _e(f, T, 1, 1), m = 2;
    t < _e(f, T, 3, 1) ? m = 0 : We(T) && (m = 1);
    let p = Math.floor(((w + m) * 12 + 373) / 367), i = t - _e(f, T, p, 1) + 1;
    return new ue(f, T, p, i);
  }
  toJulianDay(e) {
    return _e(e.era, e.year, e.month, e.day);
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
function dr(r, e, t) {
  let a = r.calendar.toJulianDay(r), n = In(e), o = Math.ceil(a + 1 - n) % 7;
  return o < 0 && (o += 7), o;
}
function xn(r) {
  return Ne(Date.now(), r);
}
function Yn(r) {
  return Pn(xn(r));
}
function fr(r, e) {
  return r.calendar.toJulianDay(r) - e.calendar.toJulianDay(e);
}
function Cn(r, e) {
  return La(r) - La(e);
}
function La(r) {
  return r.hour * 36e5 + r.minute * 6e4 + r.second * 1e3 + r.millisecond;
}
var Qt = null;
function ya() {
  return Qt == null && (Qt = new Intl.DateTimeFormat().resolvedOptions().timeZone), Qt;
}
function Rn(r) {
  return r.subtract({
    days: r.day - 1
  });
}
var Ba = /* @__PURE__ */ new Map();
function En(r) {
  if (Intl.Locale) {
    let t = Ba.get(r);
    return t || (t = new Intl.Locale(r).maximize().region, t && Ba.set(r, t)), t;
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
  return Math.ceil((dr(Rn(r), e) + a) / 7);
}
function ot(r) {
  r = Ce(r, new Ee());
  let e = Dt(r.era, r.year);
  return mr(e, r.month, r.day, r.hour, r.minute, r.second, r.millisecond);
}
function mr(r, e, t, a, n, o, l) {
  let s = /* @__PURE__ */ new Date();
  return s.setUTCHours(a, n, o, l), s.setUTCFullYear(r, e - 1, t), s.getTime();
}
function aa(r, e) {
  if (e === "UTC") return 0;
  if (r > 0 && e === ya()) return new Date(r).getTimezoneOffset() * -6e4;
  let { year: t, month: a, day: n, hour: o, minute: l, second: s } = hr(r, e);
  return mr(t, a, n, o, l, s, 0) - Math.floor(r / 1e3) * 1e3;
}
var Ha = /* @__PURE__ */ new Map();
function hr(r, e) {
  let t = Ha.get(e);
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
  }), Ha.set(e, t));
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
var qa = 864e5;
function Vn(r, e, t, a) {
  return (t === a ? [
    t
  ] : [
    t,
    a
  ]).filter((o) => Fn(r, e, o));
}
function Fn(r, e, t) {
  let a = hr(t, e);
  return r.year === a.year && r.month === a.month && r.day === a.day && r.hour === a.hour && r.minute === a.minute && r.second === a.second;
}
function He(r, e, t = "compatible") {
  let a = lt(r);
  if (e === "UTC") return ot(a);
  if (e === ya() && t === "compatible") {
    a = Ce(a, new Ee());
    let u = /* @__PURE__ */ new Date(), c = Dt(a.era, a.year);
    return u.setFullYear(c, a.month - 1, a.day), u.setHours(a.hour, a.minute, a.second, a.millisecond), u.getTime();
  }
  let n = ot(a), o = aa(n - qa, e), l = aa(n + qa, e), s = Vn(a, e, n - o, n - l);
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
function vr(r, e, t = "compatible") {
  return new Date(He(r, e, t));
}
function Ne(r, e) {
  let t = aa(r, e), a = new Date(r + t), n = a.getUTCFullYear(), o = a.getUTCMonth() + 1, l = a.getUTCDate(), s = a.getUTCHours(), u = a.getUTCMinutes(), c = a.getUTCSeconds(), g = a.getUTCMilliseconds();
  return new yt(n < 1 ? "BC" : "AD", n < 1 ? -n + 1 : n, o, l, e, t, s, u, c, g);
}
function Pn(r) {
  return new ue(r.calendar, r.era, r.year, r.month, r.day);
}
function lt(r, e) {
  let t = 0, a = 0, n = 0, o = 0;
  if ("timeZone" in r) ({ hour: t, minute: a, second: n, millisecond: o } = r);
  else if ("hour" in r && !e) return r;
  return e && ({ hour: t, minute: a, second: n, millisecond: o } = e), new st(r.calendar, r.era, r.year, r.month, r.day, t, a, n, o);
}
function Ce(r, e) {
  if (Tn(r.calendar, e)) return r;
  let t = e.fromJulianDay(r.calendar.toJulianDay(r)), a = r.copy();
  return a.calendar = e, a.era = t.era, a.year = t.year, a.month = t.month, a.day = t.day, Qe(a), a;
}
function An(r, e, t) {
  if (r instanceof yt)
    return r.timeZone === e ? r : Bn(r, e);
  let a = He(r, e, t);
  return Ne(a, e);
}
function Ln(r) {
  let e = ot(r) - r.offset;
  return new Date(e);
}
function Bn(r, e) {
  let t = ot(r) - r.offset;
  return Ce(Ne(t, e), r.calendar);
}
var ct = 36e5;
function Jt(r, e) {
  let t = r.copy(), a = "hour" in t ? Un(t, e) : 0;
  ra(t, e.years || 0), t.calendar.balanceYearMonth && t.calendar.balanceYearMonth(t, r), t.month += e.months || 0, na(t), pr(t), t.day += (e.weeks || 0) * 7, t.day += e.days || 0, t.day += a, Hn(t), t.calendar.balanceDate && t.calendar.balanceDate(t), t.year < 1 && (t.year = 1, t.month = 1, t.day = 1);
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
function ra(r, e) {
  var t, a;
  !((t = (a = r.calendar).isInverseEra) === null || t === void 0) && t.call(a, r) && (e = -e), r.year += e;
}
function na(r) {
  for (; r.month < 1; )
    ra(r, -1), r.month += r.calendar.getMonthsInYear(r);
  let e = 0;
  for (; r.month > (e = r.calendar.getMonthsInYear(r)); )
    r.month -= e, ra(r, 1);
}
function Hn(r) {
  for (; r.day < 1; )
    r.month--, na(r), r.day += r.calendar.getDaysInMonth(r);
  for (; r.day > r.calendar.getDaysInMonth(r); )
    r.day -= r.calendar.getDaysInMonth(r), r.month++, na(r);
}
function pr(r) {
  r.month = Math.max(1, Math.min(r.calendar.getMonthsInYear(r), r.month)), r.day = Math.max(1, Math.min(r.calendar.getDaysInMonth(r), r.day));
}
function Qe(r) {
  r.calendar.constrainDate && r.calendar.constrainDate(r), r.year = Math.max(1, Math.min(r.calendar.getYearsInEra(r), r.year)), pr(r);
}
function gr(r) {
  let e = {};
  for (let t in r) typeof r[t] == "number" && (e[t] = -r[t]);
  return e;
}
function yr(r, e) {
  return Jt(r, gr(e));
}
function $a(r, e) {
  let t = r.copy();
  return e.era != null && (t.era = e.era), e.year != null && (t.year = e.year), e.month != null && (t.month = e.month), e.day != null && (t.day = e.day), Qe(t), t;
}
function Lt(r, e) {
  let t = r.copy();
  return e.hour != null && (t.hour = e.hour), e.minute != null && (t.minute = e.minute), e.second != null && (t.second = e.second), e.millisecond != null && (t.millisecond = e.millisecond), Nn(t), t;
}
function qn(r) {
  r.second += Math.floor(r.millisecond / 1e3), r.millisecond = wt(r.millisecond, 1e3), r.minute += Math.floor(r.second / 60), r.second = wt(r.second, 60), r.hour += Math.floor(r.minute / 60), r.minute = wt(r.minute, 60);
  let e = Math.floor(r.hour / 24);
  return r.hour = wt(r.hour, 24), e;
}
function Nn(r) {
  r.millisecond = Math.max(0, Math.min(r.millisecond, 1e3)), r.second = Math.max(0, Math.min(r.second, 59)), r.minute = Math.max(0, Math.min(r.minute, 59)), r.hour = Math.max(0, Math.min(r.hour, 23));
}
function wt(r, e) {
  let t = r % e;
  return t < 0 && (t += e), t;
}
function Un(r, e) {
  return r.hour += e.hours || 0, r.minute += e.minutes || 0, r.second += e.seconds || 0, r.millisecond += e.milliseconds || 0, qn(r);
}
function Da(r, e, t, a) {
  let n = r.copy();
  switch (e) {
    case "era": {
      let s = r.calendar.getEras(), u = s.indexOf(r.era);
      if (u < 0) throw new Error("Invalid era: " + r.era);
      u = Ue(u, t, 0, s.length - 1, a == null ? void 0 : a.round), n.era = s[u], Qe(n);
      break;
    }
    case "year":
      var o, l;
      !((o = (l = n.calendar).isInverseEra) === null || o === void 0) && o.call(l, n) && (t = -t), n.year = Ue(r.year, t, -1 / 0, 9999, a == null ? void 0 : a.round), n.year === -1 / 0 && (n.year = 1), n.calendar.balanceYearMonth && n.calendar.balanceYearMonth(n, r);
      break;
    case "month":
      n.month = Ue(r.month, t, 1, r.calendar.getMonthsInYear(r), a == null ? void 0 : a.round);
      break;
    case "day":
      n.day = Ue(r.day, t, 1, r.calendar.getDaysInMonth(r), a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return r.calendar.balanceDate && r.calendar.balanceDate(n), Qe(n), n;
}
function $r(r, e, t, a) {
  let n = r.copy();
  switch (e) {
    case "hour": {
      let o = r.hour, l = 0, s = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let u = o >= 12;
        l = u ? 12 : 0, s = u ? 23 : 11;
      }
      n.hour = Ue(o, t, l, s, a == null ? void 0 : a.round);
      break;
    }
    case "minute":
      n.minute = Ue(r.minute, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "second":
      n.second = Ue(r.second, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "millisecond":
      n.millisecond = Ue(r.millisecond, t, 0, 999, a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return n;
}
function Ue(r, e, t, a, n = false) {
  if (n) {
    r += Math.sign(e), r < t && (r = a);
    let o = Math.abs(e);
    e > 0 ? r = Math.ceil(r / o) * o : r = Math.floor(r / o) * o, r > a && (r = t);
  } else
    r += e, r < t ? r = a - (t - r - 1) : r > a && (r = t + (r - a - 1));
  return r;
}
function Dr(r, e) {
  let t;
  if (e.years != null && e.years !== 0 || e.months != null && e.months !== 0 || e.weeks != null && e.weeks !== 0 || e.days != null && e.days !== 0) {
    let n = Jt(lt(r), {
      years: e.years,
      months: e.months,
      weeks: e.weeks,
      days: e.days
    });
    t = He(n, r.timeZone);
  } else
    t = ot(r) - r.offset;
  t += e.milliseconds || 0, t += (e.seconds || 0) * 1e3, t += (e.minutes || 0) * 6e4, t += (e.hours || 0) * 36e5;
  let a = Ne(t, r.timeZone);
  return Ce(a, r.calendar);
}
function zn(r, e) {
  return Dr(r, gr(e));
}
function Wn(r, e, t, a) {
  switch (e) {
    case "hour": {
      let n = 0, o = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let w = r.hour >= 12;
        n = w ? 12 : 0, o = w ? 23 : 11;
      }
      let l = lt(r), s = Ce(Lt(l, {
        hour: n
      }), new Ee()), u = [
        He(s, r.timeZone, "earlier"),
        He(s, r.timeZone, "later")
      ].filter((w) => Ne(w, r.timeZone).day === s.day)[0], c = Ce(Lt(l, {
        hour: o
      }), new Ee()), g = [
        He(c, r.timeZone, "earlier"),
        He(c, r.timeZone, "later")
      ].filter((w) => Ne(w, r.timeZone).day === c.day).pop(), y = ot(r) - r.offset, f = Math.floor(y / ct), T = y % ct;
      return y = Ue(f, t, Math.floor(u / ct), Math.floor(g / ct), a == null ? void 0 : a.round) * ct + T, Ce(Ne(y, r.timeZone), r.calendar);
    }
    case "minute":
    case "second":
    case "millisecond":
      return $r(r, e, t, a);
    case "era":
    case "year":
    case "month":
    case "day": {
      let n = Da(lt(r), e, t, a), o = He(n, r.timeZone);
      return Ce(Ne(o, r.timeZone), r.calendar);
    }
    default:
      throw new Error("Unsupported field " + e);
  }
}
function jn(r, e, t) {
  let a = lt(r), n = Lt($a(a, e), e);
  if (n.compare(a) === 0) return r;
  let o = He(n, r.timeZone, t);
  return Ce(Ne(o, r.timeZone), r.calendar);
}
function Jn(r) {
  return `${String(r.hour).padStart(2, "0")}:${String(r.minute).padStart(2, "0")}:${String(r.second).padStart(2, "0")}${r.millisecond ? String(r.millisecond / 1e3).slice(1) : ""}`;
}
function br(r) {
  let e = Ce(r, new Ee()), t;
  return e.era === "BC" ? t = e.year === 1 ? "0000" : "-" + String(Math.abs(1 - e.year)).padStart(6, "00") : t = String(e.year).padStart(4, "0"), `${t}-${String(e.month).padStart(2, "0")}-${String(e.day).padStart(2, "0")}`;
}
function Mr(r) {
  return `${br(r)}T${Jn(r)}`;
}
function _n(r) {
  let e = Math.sign(r) < 0 ? "-" : "+";
  r = Math.abs(r);
  let t = Math.floor(r / 36e5), a = r % 36e5 / 6e4;
  return `${e}${String(t).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
}
function Kn(r) {
  return `${Mr(r)}${_n(r.offset)}[${r.timeZone}]`;
}
function Qn(r, e) {
  if (e.has(r))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function ba(r, e, t) {
  Qn(r, e), e.set(r, t);
}
function Ma(r) {
  let e = typeof r[0] == "object" ? r.shift() : new Ee(), t;
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
    return Jt(this, e);
  }
  /** Returns a new `CalendarDate` with the given duration subtracted from it. */
  subtract(e) {
    return yr(this, e);
  }
  /** Returns a new `CalendarDate` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(e) {
    return $a(this, e);
  }
  /**
  * Returns a new `CalendarDate` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(e, t, a) {
    return Da(this, e, t, a);
  }
  /** Converts the date to a native JavaScript Date object, with the time set to midnight in the given time zone. */
  toDate(e) {
    return vr(this, e);
  }
  /** Converts the date to an ISO 8601 formatted string. */
  toString() {
    return br(this);
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(e) {
    return fr(this, e);
  }
  constructor(...e) {
    ba(this, Zn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = Ma(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, Qe(this);
  }
};
var Gn = /* @__PURE__ */ new WeakMap();
var st = class _st {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _st(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond) : new _st(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `CalendarDateTime` with the given duration added to it. */
  add(e) {
    return Jt(this, e);
  }
  /** Returns a new `CalendarDateTime` with the given duration subtracted from it. */
  subtract(e) {
    return yr(this, e);
  }
  /** Returns a new `CalendarDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(e) {
    return $a(Lt(this, e), e);
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
        return Da(this, e, t, a);
      default:
        return $r(this, e, t, a);
    }
  }
  /** Converts the date to a native JavaScript Date object in the given time zone. */
  toDate(e, t) {
    return vr(this, e, t);
  }
  /** Converts the date to an ISO 8601 formatted string. */
  toString() {
    return Mr(this);
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(e) {
    let t = fr(this, e);
    return t === 0 ? Cn(this, lt(e)) : t;
  }
  constructor(...e) {
    ba(this, Gn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = Ma(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, Qe(this);
  }
};
var Xn = /* @__PURE__ */ new WeakMap();
var yt = class _yt {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _yt(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond) : new _yt(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `ZonedDateTime` with the given duration added to it. */
  add(e) {
    return Dr(this, e);
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
    ba(this, Xn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = Ma(e), s = e.shift(), u = e.shift();
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.timeZone = s, this.offset = u, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, Qe(this);
  }
};
var et = [
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
var Ft = [
  1867,
  1911,
  1925,
  1988,
  2018
];
var ze = [
  "meiji",
  "taisho",
  "showa",
  "heisei",
  "reiwa"
];
function Na(r) {
  const e = et.findIndex(([t, a, n]) => r.year < t || r.year === t && r.month < a || r.year === t && r.month === a && r.day < n);
  return e === -1 ? et.length - 1 : e === 0 ? 0 : e - 1;
}
function Zt(r) {
  let e = Ft[ze.indexOf(r.era)];
  if (!e) throw new Error("Unknown era: " + r.era);
  return new ue(r.year + e, r.month, r.day);
}
var to = class extends Ee {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = Na(t);
    return new ue(this, ze[a], t.year - Ft[a], t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Zt(e));
  }
  balanceDate(e) {
    let t = Zt(e), a = Na(t);
    ze[a] !== e.era && (e.era = ze[a], e.year = t.year - Ft[a]), this.constrainDate(e);
  }
  constrainDate(e) {
    let t = ze.indexOf(e.era), a = eo[t];
    if (a != null) {
      let [n, o, l] = a, s = n - Ft[t];
      e.year = Math.max(1, Math.min(s, e.year)), e.year === s && (e.month = Math.min(o, e.month), e.month === o && (e.day = Math.min(l, e.day)));
    }
    if (e.year === 1 && t >= 0) {
      let [, n, o] = et[t];
      e.month = Math.max(n, e.month), e.month === n && (e.day = Math.max(o, e.day));
    }
  }
  getEras() {
    return ze;
  }
  getYearsInEra(e) {
    let t = ze.indexOf(e.era), a = et[t], n = et[t + 1];
    if (n == null)
      return 9999 - a[0] + 1;
    let o = n[0] - a[0];
    return (e.month < n[1] || e.month === n[1] && e.day < n[2]) && o++, o;
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(Zt(e));
  }
  getMinimumMonthInYear(e) {
    let t = Ua(e);
    return t ? t[1] : 1;
  }
  getMinimumDayInMonth(e) {
    let t = Ua(e);
    return t && e.month === t[1] ? t[2] : 1;
  }
  constructor(...e) {
    super(...e), this.identifier = "japanese";
  }
};
function Ua(r) {
  if (r.year === 1) {
    let e = ze.indexOf(r.era);
    return et[e];
  }
}
var Sr = -543;
var ao = class extends Ee {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = Dt(t.era, t.year);
    return new ue(this, a - Sr, t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(za(e));
  }
  getEras() {
    return [
      "BE"
    ];
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(za(e));
  }
  balanceDate() {
  }
  constructor(...e) {
    super(...e), this.identifier = "buddhist";
  }
};
function za(r) {
  let [e, t] = jt(r.year + Sr);
  return new ue(e, t, r.month, r.day);
}
var Bt = 1911;
function kr(r) {
  return r.era === "minguo" ? r.year + Bt : 1 - r.year + Bt;
}
function Wa(r) {
  let e = r - Bt;
  return e > 0 ? [
    "minguo",
    e
  ] : [
    "before_minguo",
    1 - e
  ];
}
var ro = class extends Ee {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = Dt(t.era, t.year), [n, o] = Wa(a);
    return new ue(this, n, o, t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(ja(e));
  }
  getEras() {
    return [
      "before_minguo",
      "minguo"
    ];
  }
  balanceDate(e) {
    let [t, a] = Wa(kr(e));
    e.era = t, e.year = a;
  }
  isInverseEra(e) {
    return e.era === "before_minguo";
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(ja(e));
  }
  getYearsInEra(e) {
    return e.era === "before_minguo" ? 9999 : 9999 - Bt;
  }
  constructor(...e) {
    super(...e), this.identifier = "roc";
  }
};
function ja(r) {
  let [e, t] = jt(kr(r));
  return new ue(e, t, r.month, r.day);
}
var Ja = 1948320;
var _a = [
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
    let t = e - Ja, a = 1 + Math.floor((33 * t + 3) / 12053), n = 365 * (a - 1) + Math.floor((8 * a + 21) / 33), o = t - n, l = o < 216 ? Math.floor(o / 31) : Math.floor((o - 6) / 30), s = o - _a[l] + 1;
    return new ue(this, a, l + 1, s);
  }
  toJulianDay(e) {
    let t = Ja - 1 + 365 * (e.year - 1) + Math.floor((8 * e.year + 21) / 33);
    return t += _a[e.month - 1], t += e.day, t;
  }
  getMonthsInYear() {
    return 12;
  }
  getDaysInMonth(e) {
    return e.month <= 6 ? 31 : e.month <= 11 || Xe(25 * e.year + 11, 33) < 8 ? 30 : 29;
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
var Gt = 78;
var Ka = 80;
var oo = class extends Ee {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = t.year - Gt, n = e - _e(t.era, t.year, 1, 1), o;
    n < Ka ? (a--, o = We(t.year - 1) ? 31 : 30, n += o + 155 + 90 + 10) : (o = We(t.year) ? 31 : 30, n -= Ka);
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
    let t = e.year + Gt, [a, n] = jt(t), o, l;
    return We(n) ? (o = 31, l = _e(a, n, 3, 21)) : (o = 30, l = _e(a, n, 3, 22)), e.month === 1 ? l + e.day - 1 : (l += o + Math.min(e.month - 2, 5) * 31, e.month >= 8 && (l += (e.month - 7) * 30), l += e.day - 1, l);
  }
  getDaysInMonth(e) {
    return e.month === 1 && We(e.year + Gt) || e.month >= 2 && e.month <= 6 ? 31 : 30;
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
var Ht = 1948440;
var Qa = 1948439;
var Oe = 1300;
var Ze = 1600;
var lo = 460322;
function qt(r, e, t, a) {
  return a + Math.ceil(29.5 * (t - 1)) + (e - 1) * 354 + Math.floor((3 + 11 * e) / 30) + r - 1;
}
function wr(r, e, t) {
  let a = Math.floor((30 * (t - e) + 10646) / 10631), n = Math.min(12, Math.ceil((t - (29 + qt(e, a, 1, 1))) / 29.5) + 1), o = t - qt(e, a, n, 1) + 1;
  return new ue(r, a, n, o);
}
function Za(r) {
  return (14 + 11 * r) % 30 < 11;
}
var Sa = class {
  fromJulianDay(e) {
    return wr(this, Ht, e);
  }
  toJulianDay(e) {
    return qt(Ht, e.year, e.month, e.day);
  }
  getDaysInMonth(e) {
    let t = 29 + e.month % 2;
    return e.month === 12 && Za(e.year) && t++, t;
  }
  getMonthsInYear() {
    return 12;
  }
  getDaysInYear(e) {
    return Za(e.year) ? 355 : 354;
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
var so = class extends Sa {
  fromJulianDay(e) {
    return wr(this, Qa, e);
  }
  toJulianDay(e) {
    return qt(Qa, e.year, e.month, e.day);
  }
  constructor(...e) {
    super(...e), this.identifier = "islamic-tbla";
  }
};
var io = "qgpUDckO1AbqBmwDrQpVBakGkgepC9QF2gpcBS0NlQZKB1QLagutBa4ETwoXBYsGpQbVCtYCWwmdBE0KJg2VDawFtgm6AlsKKwWVCsoG6Qr0AnYJtgJWCcoKpAvSC9kF3AJtCU0FpQpSC6ULtAW2CVcFlwJLBaMGUgdlC2oFqworBZUMSg2lDcoF1gpXCasESwmlClILagt1BXYCtwhbBFUFqQW0BdoJ3QRuAjYJqgpUDbIN1QXaAlsJqwRVCkkLZAtxC7QFtQpVCiUNkg7JDtQG6QprCasEkwpJDaQNsg25CroEWworBZUKKgtVC1wFvQQ9Ah0JlQpKC1oLbQW2AjsJmwRVBqkGVAdqC2wFrQpVBSkLkgupC9QF2gpaBasKlQVJB2QHqgu1BbYCVgpNDiULUgtqC60FrgIvCZcESwalBqwG1gpdBZ0ETQoWDZUNqgW1BdoCWwmtBJUFygbkBuoK9QS2AlYJqgpUC9IL2QXqAm0JrQSVCkoLpQuyBbUJ1gSXCkcFkwZJB1ULagVrCisFiwpGDaMNygXWCtsEawJLCaUKUgtpC3UFdgG3CFsCKwVlBbQF2gntBG0BtgimClINqQ3UBdoKWwmrBFMGKQdiB6kLsgW1ClUFJQuSDckO0gbpCmsFqwRVCikNVA2qDbUJugQ7CpsETQqqCtUK2gJdCV4ELgqaDFUNsga5BroEXQotBZUKUguoC7QLuQXaAloJSgukDdEO6AZqC20FNQWVBkoNqA3UDdoGWwWdAisGFQtKC5ULqgWuCi4JjwwnBZUGqgbWCl0FnQI=";
var oa;
var tt;
function Pt(r) {
  return lo + tt[r - Oe];
}
function ft(r, e) {
  let t = r - Oe, a = 1 << 11 - (e - 1);
  return (oa[t] & a) === 0 ? 29 : 30;
}
function Ga(r, e) {
  let t = Pt(r);
  for (let a = 1; a < e; a++) t += ft(r, a);
  return t;
}
function Xa(r) {
  return tt[r + 1 - Oe] - tt[r - Oe];
}
var uo = class extends Sa {
  fromJulianDay(e) {
    let t = e - Ht, a = Pt(Oe), n = Pt(Ze);
    if (t < a || t > n) return super.fromJulianDay(e);
    {
      let o = Oe - 1, l = 1, s = 1;
      for (; s > 0; ) {
        o++, s = t - Pt(o) + 1;
        let u = Xa(o);
        if (s === u) {
          l = 12;
          break;
        } else if (s < u) {
          let c = ft(o, l);
          for (l = 1; s > c; )
            s -= c, l++, c = ft(o, l);
          break;
        }
      }
      return new ue(this, o, l, t - Ga(o, l) + 1);
    }
  }
  toJulianDay(e) {
    return e.year < Oe || e.year > Ze ? super.toJulianDay(e) : Ht + Ga(e.year, e.month) + (e.day - 1);
  }
  getDaysInMonth(e) {
    return e.year < Oe || e.year > Ze ? super.getDaysInMonth(e) : ft(e.year, e.month);
  }
  getDaysInYear(e) {
    return e.year < Oe || e.year > Ze ? super.getDaysInYear(e) : Xa(e.year);
  }
  constructor() {
    if (super(), this.identifier = "islamic-umalqura", oa || (oa = new Uint16Array(Uint8Array.from(atob(io), (e) => e.charCodeAt(0)).buffer)), !tt) {
      tt = new Uint32Array(Ze - Oe + 1);
      let e = 0;
      for (let t = Oe; t <= Ze; t++) {
        tt[t - Oe] = e;
        for (let a = 1; a <= 12; a++) e += ft(t, a);
      }
    }
  }
};
var er = 347997;
var Tr = 1080;
var xr = 24 * Tr;
var co = 29;
var fo = 12 * Tr + 793;
var mo = co * xr + fo;
function Je(r) {
  return Xe(r * 7 + 1, 19) < 7;
}
function At(r) {
  let e = Math.floor((235 * r - 234) / 19), t = 12084 + 13753 * e, a = e * 29 + Math.floor(t / 25920);
  return Xe(3 * (a + 1), 7) < 3 && (a += 1), a;
}
function ho(r) {
  let e = At(r - 1), t = At(r);
  return At(r + 1) - t === 356 ? 2 : t - e === 382 ? 1 : 0;
}
function mt(r) {
  return At(r) + ho(r);
}
function Yr(r) {
  return mt(r + 1) - mt(r);
}
function vo(r) {
  let e = Yr(r);
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
function Tt(r, e) {
  if (e >= 6 && !Je(r) && e++, e === 4 || e === 7 || e === 9 || e === 11 || e === 13) return 29;
  let t = vo(r);
  return e === 2 ? t === 2 ? 30 : 29 : e === 3 ? t === 0 ? 29 : 30 : e === 6 ? Je(r) ? 30 : 0 : 30;
}
var po = class {
  fromJulianDay(e) {
    let t = e - er, a = t * xr / mo, n = Math.floor((19 * a + 234) / 235) + 1, o = mt(n), l = Math.floor(t - o);
    for (; l < 1; )
      n--, o = mt(n), l = Math.floor(t - o);
    let s = 1, u = 0;
    for (; u < l; )
      u += Tt(n, s), s++;
    s--, u -= Tt(n, s);
    let c = l - u;
    return new ue(this, n, s, c);
  }
  toJulianDay(e) {
    let t = mt(e.year);
    for (let a = 1; a < e.month; a++) t += Tt(e.year, a);
    return t + e.day + er;
  }
  getDaysInMonth(e) {
    return Tt(e.year, e.month);
  }
  getMonthsInYear(e) {
    return Je(e.year) ? 13 : 12;
  }
  getDaysInYear(e) {
    return Yr(e.year);
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
    t.year !== e.year && (Je(t.year) && !Je(e.year) && t.month > 6 ? e.month-- : !Je(t.year) && Je(e.year) && t.month > 6 && e.month++);
  }
  constructor() {
    this.identifier = "hebrew";
  }
};
var la = 1723856;
var tr = 1824665;
var sa = 5500;
function Nt(r, e, t, a) {
  return r + 365 * e + Math.floor(e / 4) + 30 * (t - 1) + a - 1;
}
function ka(r, e) {
  let t = Math.floor(4 * (e - r) / 1461), a = 1 + Math.floor((e - Nt(r, t, 1, 1)) / 30), n = e + 1 - Nt(r, t, a, 1);
  return [
    t,
    a,
    n
  ];
}
function Cr(r) {
  return Math.floor(r % 4 / 3);
}
function Rr(r, e) {
  return e % 13 !== 0 ? 30 : Cr(r) + 5;
}
var wa = class {
  fromJulianDay(e) {
    let [t, a, n] = ka(la, e), o = "AM";
    return t <= 0 && (o = "AA", t += sa), new ue(this, o, t, a, n);
  }
  toJulianDay(e) {
    let t = e.year;
    return e.era === "AA" && (t -= sa), Nt(la, t, e.month, e.day);
  }
  getDaysInMonth(e) {
    return Rr(e.year, e.month);
  }
  getMonthsInYear() {
    return 13;
  }
  getDaysInYear(e) {
    return 365 + Cr(e.year);
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
var go = class extends wa {
  fromJulianDay(e) {
    let [t, a, n] = ka(la, e);
    return t += sa, new ue(this, "AA", t, a, n);
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
var yo = class extends wa {
  fromJulianDay(e) {
    let [t, a, n] = ka(tr, e), o = "CE";
    return t <= 0 && (o = "BCE", t = 1 - t), new ue(this, o, t, a, n);
  }
  toJulianDay(e) {
    let t = e.year;
    return e.era === "BCE" && (t = 1 - t), Nt(tr, t, e.month, e.day);
  }
  getDaysInMonth(e) {
    let t = e.year;
    return e.era === "BCE" && (t = 1 - t), Rr(t, e.month);
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
      return new wa();
    case "ethioaa":
      return new go();
    case "coptic":
      return new yo();
    case "hebrew":
      return new po();
    case "indian":
      return new oo();
    case "islamic-civil":
      return new Sa();
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
      return new Ee();
  }
}
var Xt = /* @__PURE__ */ new Map();
var Ut = class {
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
    this.formatter = Er(e, t), this.options = t;
  }
};
var Do = {
  true: {
    // Only Japanese uses the h11 style for 12 hour time. All others use h12.
    ja: "h11"
  },
  false: {}
};
function Er(r, e = {}) {
  if (typeof e.hour12 == "boolean" && bo()) {
    e = {
      ...e
    };
    let n = Do[String(e.hour12)][r.split("-")[0]], o = e.hour12 ? "h12" : "h23";
    e.hourCycle = n ?? o, delete e.hour12;
  }
  let t = r + (e ? Object.entries(e).sort((n, o) => n[0] < o[0] ? -1 : 1).join() : "");
  if (Xt.has(t)) return Xt.get(t);
  let a = new Intl.DateTimeFormat(r, e);
  return Xt.set(t, a), a;
}
var ea = null;
function bo() {
  return ea == null && (ea = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false
  }).format(new Date(2020, 2, 3, 0)) === "24"), ea;
}
var ta = null;
function Mo() {
  return ta == null && (ta = new Intl.DateTimeFormat("fr", {
    hour: "numeric",
    hour12: false
  }).resolvedOptions().hourCycle === "h12"), ta;
}
function So(r, e) {
  if (!e.timeStyle && !e.hour) return;
  r = r.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, ""), r += (r.includes("-u-") ? "" : "-u") + "-nu-latn";
  let t = Er(r, {
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
import_dayjs.default.extend(ur);
import_dayjs.default.extend(gn);
import_dayjs.default.extend(bn);
function at() {
  const r = /* @__PURE__ */ new Date();
  return {
    year: r.getFullYear(),
    month: r.getMonth() + 1,
    day: r.getDate()
  };
}
function ko(r) {
  try {
    const e = ya(), t = Yn(e);
    if (r.calendar.identifier !== t.calendar.identifier) {
      const a = Ce(t, r.calendar);
      return r.compare(a) === 0;
    }
    return r.compare(t) === 0;
  } catch (e) {
    return console.error("Error checking if date is today:", e), false;
  }
}
function Ge() {
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
function qe(r, e, t, a, n, o) {
  const l = { year: r, month: e, day: t };
  return a !== void 0 && (l.hour = a), n !== void 0 && (l.minute = n), o !== void 0 && (l.second = o), l;
}
function ye(r, e = "zh-TW", t = "gregory") {
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
function Re(r, e = "YYYY-MM-DD") {
  if (!r) return null;
  try {
    return (0, import_dayjs.default)("2000-01-01 00:00:00").year(r.year).month(r.month - 1).date(r.day).hour(r.hour || 0).minute(r.minute || 0).second(r.second || 0).format(e);
  } catch (t) {
    return console.error("Failed to format date:", t), null;
  }
}
function zt(r, e = "iso", t, a = false, n = "gregory", o = "zh-TW", l = false) {
  if (!r) return null;
  try {
    switch (e) {
      case "iso":
        return a ? Re(r, l ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD HH:mm:ss") : Re(r, "YYYY-MM-DD");
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
        const s = t || (a ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD");
        return me.formatOutput(r, s, n, o);
      default:
        return console.warn(`不支援的輸出類型: ${e}，回退到 ISO 格式`), Re(r, "YYYY-MM-DD");
    }
  } catch (s) {
    return console.error("formatOutput 失敗:", s), r;
  }
}
function Wt(r, e) {
  const t = r.year * 1e4 + r.month * 100 + r.day, a = e.year * 1e4 + e.month * 100 + e.day;
  return t < a ? -1 : t > a ? 1 : 0;
}
function ia(r, e) {
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
function ar(r, e) {
  const t = new Date(r.year, r.month - 1, r.day).getTime(), a = new Date(e.year, e.month - 1, e.day).getTime();
  return Math.ceil((a - t) / (1e3 * 60 * 60 * 24));
}
function wo() {
  const r = Ge(), e = qe(r.year, r.month, 1, 0, 0, 0), t = r.month === 12 ? 1 : r.month + 1, a = r.month === 12 ? r.year + 1 : r.year, n = qe(a, t, 1), o = ia(n, -1);
  return { start: e, end: o };
}
function To(r) {
  if (!r || typeof r != "string")
    return false;
  const e = Ir(r), t = Or(r);
  if (!e && !t)
    return false;
  try {
    const n = (0, import_dayjs.default)("2000-12-31 23:59:59").format(r);
    return n !== r && n.length > 0;
  } catch {
    return false;
  }
}
function Ir(r) {
  const e = ["YYYY", "YY", "MM", "M", "DD", "D"], t = ["-", "/", ".", " "];
  let a = r;
  t.forEach((f) => {
    a = a.replace(new RegExp(`\\${f}`, "g"), " ");
  });
  const n = a.split(/\s+/).filter(Boolean);
  if (!n.every((f) => e.includes(f))) return false;
  const l = n.some((f) => f === "YYYY" || f === "YY"), s = n.some((f) => f === "MM" || f === "M"), u = n.some((f) => f === "DD" || f === "D"), c = n.filter((f) => f === "YYYY" || f === "YY").length, g = n.filter((f) => f === "MM" || f === "M").length, y = n.filter((f) => f === "DD" || f === "D").length;
  return c > 1 || g > 1 || y > 1 ? false : l && s && u;
}
function Or(r) {
  const e = ["HH", "H", "mm", "m", "ss", "s", "a", "A"], t = r.replace(/[^\w]/g, " "), a = t.includes("HH") || t.includes("H"), n = t.includes("mm") || t.includes("m"), l = t.split(/\s+/).filter(Boolean).some((s) => !!(/^[hH]{1,2}$/.test(s) && !e.includes(s) || /^[mM]{1,2}$/.test(s) && !e.includes(s) || /^[sS]{1,2}$/.test(s) && !e.includes(s)));
  return a && n && !l;
}
function xo(r) {
  return r.replace(/yyyy/g, "YYYY").replace(/yy/g, "YY").replace(/mm/g, "MM").replace(/dd/g, "DD");
}
function Yo(r) {
  return r.replace(/hh/g, "HH");
}
function Co(r) {
  return !r || typeof r != "object" ? false : typeof r.year == "number" && typeof r.month == "number" && typeof r.day == "number";
}
var Vr = class {
  constructor() {
    be(this, "id", "roc");
    be(this, "yearRange", {
      min: 1,
      // 民國1年 (1912年)
      max: 200
      // 民國200年 (2111年)
    });
    be(this, "displayName", {
      "zh-TW": "民國曆",
      "zh-CN": "民国历",
      "en-US": "ROC Calendar",
      "ja-JP": "中華民国暦",
      "ko-KR": "중화민국력"
    });
    be(this, "YEAR_OFFSET", 1911);
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
        const c = this.tryParseWithSeparator(l, u);
        if (c) return c;
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
      let c = parseInt(l);
      const g = parseInt(s), y = u ? parseInt(u) : 0;
      return o === "下午" && c !== 12 ? c += 12 : o === "上午" && c === 12 && (c = 0), c < 0 || c > 23 || g < 0 || g > 59 || y < 0 || y > 59 ? null : { hour: c, minute: g, second: y };
    }
    const n = t.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (n) {
      const [, o, l, s] = n, u = parseInt(o), c = parseInt(l), g = s ? parseInt(s) : 0;
      return u < 0 || u > 23 || c < 0 || c > 59 || g < 0 || g > 59 ? null : { hour: u, minute: c, second: g };
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
      const c = this.detectTimeFormat(s), g = this.formatTimePart(e, s, c);
      return `${u} ${g}`;
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
    let c = (0, import_dayjs.default)(u).format(t);
    if (t.includes("YYYY"))
      c = c.replace(e.year.toString(), n.toString());
    else if (t.includes("YY")) {
      const g = e.year.toString().slice(-2), y = n.toString().slice(-2);
      c = c.replace(g, y);
    }
    return c;
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
    const s = e < 12 ? "上午" : "下午", u = e === 0 ? 12 : e > 12 ? e - 12 : e, c = l ? u.toString().padStart(2, "0") : u.toString(), g = t.toString().padStart(2, "0"), y = n ? a.toString().padStart(2, "0") : "";
    switch (o) {
      case "suffix":
        return n ? `${c}:${g}:${y} ${s}` : `${c}:${g} ${s}`;
      case "prefix":
        return n ? `${s} ${c}:${g}:${y}` : `${s} ${c}:${g}`;
      case "chinese":
        return n ? `${s} ${c}時${g}分${y}秒` : `${s} ${c}時${g}分`;
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
var Te = class Te2 {
  /**
   * 安全地創建日曆實例
   */
  static createSafeCalendar(e) {
    try {
      return $o(e);
    } catch (t) {
      return console.warn(`無法創建日曆 ${e}，回退到西元曆:`, t), new Ee();
    }
  }
  /**
   * 安全地進行日曆轉換
   */
  static safeToCalendar(e, t) {
    try {
      return Ce(e, t);
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
      const l = this.createSafeCalendar(a), s = new ue(e, t, 1), u = a === "gregory" ? s : this.safeToCalendar(s, l), c = On(u, n) ?? 6, y = (dr(u, n) - o + 7) % 7, f = u.subtract({ days: y }), T = [];
      let w = f;
      const m = c * 7;
      for (let p = 0; p < m; p++)
        T.push(w), w = w.add({ days: 1 });
      return T;
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
      return this.safeToCalendar(n, new Ee()).year;
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
  static formatOutput(e, t, a = "gregory", n = "zh-TW") {
    if (!e) return "";
    try {
      switch (a) {
        case "gregory":
          let s = t || "YYYY-MM-DD HH:mm:ss";
          To(s) || (s = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0 ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD");
          const u = new Date(
            e.year,
            e.month - 1,
            e.day,
            e.hour || 0,
            e.minute || 0,
            e.second || 0
          );
          return (0, import_dayjs.default)(u).format(s);
        case "roc":
          const c = new Vr();
          if (c.supportsFormat(t) && c.canParseInput(t))
            return c.format(e, t, n);
          break;
        // 其他日曆插件可以在這裡添加
        case "buddhist":
        case "japanese":
        case "islamic":
        case "persian":
        case "hebrew":
          break;
      }
      const o = this.convertToCalendarDateSmart(e, a);
      if (o) {
        const s = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0, u = {
          calendar: a,
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        return s && (u.hour = "numeric", u.minute = "numeric", e.second !== void 0 && (u.second = "numeric")), new Ut(n, u).format(o.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone));
      }
      const l = new Date(
        e.year,
        e.month - 1,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
      return (0, import_dayjs.default)(l).format(t);
    } catch (o) {
      console.warn("所有格式化方法都失敗，使用基本回退:", o);
      let l = `${e.year}-${e.month.toString().padStart(2, "0")}-${e.day.toString().padStart(2, "0")}`;
      return (e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0) && (l += ` ${(e.hour || 0).toString().padStart(2, "0")}:${(e.minute || 0).toString().padStart(2, "0")}`, e.second !== void 0 && (l += `:${e.second.toString().padStart(2, "0")}`)), l;
    }
  }
};
be(Te, "convertToCalendarDateSmart", (e, t) => e ? e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0 ? Te.convertToCalendarDateTime(e, t) : Te.convertToCalendarDate(e, t) : null), /**
* 統一的轉換函數：SimpleDateValue → CalendarDate
*/
be(Te, "convertToCalendarDate", (e, t) => {
  if (!e || e.year <= 0 || e.month <= 0 || e.day <= 0 || e.month > 12 || e.day > 31)
    return null;
  try {
    if (t === "gregory")
      return new ue(e.year, e.month, e.day);
    {
      const a = Te.createSafeCalendar(t), n = new ue(e.year, e.month, e.day);
      return Te.safeToCalendar(n, a);
    }
  } catch (a) {
    return console.error("轉換為 CalendarDate 失敗:", a), null;
  }
}), /**
* 統一的轉換函數：SimpleDateValue → CalendarDateTime (日期+時間)
*/
be(Te, "convertToCalendarDateTime", (e, t) => {
  if (!e) return null;
  try {
    if (t === "gregory")
      return new st(
        e.year,
        e.month,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
    {
      const a = Te.createSafeCalendar(t), n = new st(
        e.year,
        e.month,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
      return Ce(n, a);
    }
  } catch (a) {
    return console.error("轉換為 CalendarDateTime 失敗:", a), null;
  }
}), /**
* 統一的轉換函數：CalendarDate → SimpleDateValue
*/
be(Te, "convertFromCalendarDate", (e, t) => {
  if (!e) return null;
  try {
    if (e.calendar.identifier === "gregory" || t === "gregory")
      return {
        year: e.year,
        month: e.month,
        day: e.day
      };
    {
      const a = Te.createSafeCalendar("gregory"), n = Te.safeToCalendar(e, a);
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
var me = Te;
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
var rt = (r) => /^\d+$/.test(r);
var rr = (r) => r % 4 === 0 && r % 100 !== 0 || r % 400 === 0;
var Ae = null;
function Ro() {
  return Ae || (Ae = document.createElement("span"), Ae.style.visibility = "hidden", Ae.style.position = "absolute", Ae.style.top = "-9999px", Ae.style.left = "-9999px", Ae.style.whiteSpace = "pre", document.body.appendChild(Ae)), Ae;
}
var ua = /* @__PURE__ */ new WeakMap();
function Eo(r, e = "") {
  const t = Ro(), a = getComputedStyle(r);
  return t.style.font = a.font, t.style.fontSize = a.fontSize, t.style.fontWeight = a.fontWeight, t.style.letterSpacing = a.letterSpacing, t.style.padding = a.padding, t.style.border = a.border, t.style.boxSizing = a.boxSizing, t.textContent = r.value || e || "", t.offsetWidth + 4;
}
function dt(r) {
  const e = r.placeholder || "", t = Eo(r, e), a = ua.get(r) || 0;
  r.style.width = `${Math.max(t, a)}px`;
}
var nt = {
  // 初始設置
  mounted(r, e) {
    e.value && typeof e.value == "number" && ua.set(r, e.value), dt(r), r.addEventListener("input", () => dt(r)), document.fonts && document.fonts.ready && document.fonts.ready.then(() => dt(r));
  },
  // 處理更新
  updated(r, e) {
    e.value && typeof e.value == "number" && e.oldValue !== e.value && ua.set(r, e.value), dt(r);
  },
  // 為 Vue 3 添加 beforeUnmount
  beforeUnmount(r) {
    r.removeEventListener("input", () => dt(r));
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
      mounted: nt.mounted,
      updated: nt.updated,
      beforeUnmount: nt.beforeUnmount
    }, n = r, o = t, l = ref(""), s = ref(""), u = ref(""), c = ref({}), g = ref({}), y = ref(null), f = ref(false), T = ref(false), w = ref(null), m = ref(/* @__PURE__ */ new Map()), p = (C, x) => {
      C && C instanceof HTMLInputElement ? m.value.set(x, C) : m.value.delete(x);
    }, i = (C) => m.value.get(C), b = computed(() => {
      const C = {};
      return Object.entries(c.value).forEach(([x, U]) => {
        C[x] = U.key;
      }), C;
    }), D = computed(() => Object.keys(c.value).length > 0), S = computed(() => Object.values(b.value)), k = computed(() => {
      const C = n.dateFormat.toUpperCase(), x = [];
      return C.split(/[^A-Z]+/).filter(Boolean).forEach((ee) => {
        ee.includes("Y") ? x.push("year") : ee.includes("M") ? x.push("month") : ee.includes("D") && x.push("day");
      }), x.length !== 3 ? (console.warn(`Invalid date format: ${n.dateFormat}, falling back to YYYY-MM-DD`), ["year", "month", "day"]) : x;
    }), M = computed(() => {
      if (!l.value || !s.value || !u.value)
        return null;
      const C = l.value.padStart(4, "0"), x = s.value.padStart(2, "0"), U = u.value.padStart(2, "0");
      return `${C}-${x}-${U}`;
    }), d = computed(() => {
      if (!M.value) return null;
      const C = (0, import_dayjs.default)(M.value);
      return C.isValid() ? C.format(n.dateFormat) : null;
    });
    watch(() => n.modelValue, (C) => {
      if (f.value || (f.value = true), C) {
        const x = ye(C);
        x && (l.value = x.year.toString(), s.value = x.month.toString().padStart(2, "0"), u.value = x.day.toString().padStart(2, "0"));
      } else
        l.value = "", s.value = "", u.value = "";
      C || (w.value = null, T.value = false);
    }, { immediate: true });
    const v = () => {
      if (k.value.length === 0) return;
      const C = k.value[0], x = i(C);
      if (x && typeof x.focus == "function")
        try {
          x.focus();
        } catch (U) {
          console.warn("無法聚焦到輸入框:", U);
        }
      else
        for (const U of k.value) {
          const ee = i(U);
          if (ee && typeof ee.focus == "function")
            try {
              ee.focus();
              break;
            } catch (J) {
              console.warn("無法聚焦到輸入框:", J);
            }
        }
    }, h = (C) => {
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
    }, B = (C, x) => {
      const U = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return x === 2 ? rr(C) ? 29 : 28 : U[x];
    }, _ = (C, x) => {
      if (!x) return { valid: true };
      const U = parseInt(x);
      switch (C) {
        case "year":
          if (x.length < 4) return { valid: true };
          const ee = n.maxDate ? (0, import_dayjs.default)(n.maxDate).year() : (/* @__PURE__ */ new Date()).getFullYear() + 50, J = n.minDate ? (0, import_dayjs.default)(n.minDate).year() : 1;
          if (!rt(x) || U < J || U > ee)
            return { valid: false, error: { key: "year.outOfRange", params: { min: J, max: ee } } };
          if (s.value === "02" && u.value === "29" && !rr(U))
            return { valid: false, error: { key: "year.notLeapYear", params: { year: U } } };
          break;
        case "month":
          if (!rt(x) || U < 1 || U > 12)
            return { valid: false, error: { key: "month.outOfRange" } };
          if (u.value && l.value) {
            const P = parseInt(l.value), K = B(P, U);
            if (parseInt(u.value) > K)
              return { valid: false, error: { key: "day.notExistInMonth", params: { month: x, maxDays: K } } };
          }
          break;
        case "day":
          if (!rt(x) || U < 1 || U > 31)
            return { valid: false, error: { key: "day.outOfRange" } };
          if (l.value && s.value) {
            const P = parseInt(l.value), K = parseInt(s.value), ne = B(P, K);
            if (U > ne)
              return K === 2 && U === 29 ? { valid: false, error: { key: "year.notLeapYear", params: { year: P } } } : { valid: false, error: { key: "day.notExistInMonth", params: { month: s.value, maxDays: ne } } };
          }
          break;
      }
      return c.value[C] && (delete c.value[C], delete g.value[C]), { valid: true };
    }, z = () => {
      if (!f.value) return;
      c.value = {}, g.value = {};
      const C = _("year", l.value), x = _("month", s.value), U = _("day", u.value);
      if (!C.valid && C.error && (c.value.year = C.error, C.error.params && (g.value.year = C.error.params)), !x.valid && x.error && (c.value.month = x.error, x.error.params && (g.value.month = x.error.params)), !U.valid && U.error && (c.value.day = U.error, U.error.params && (g.value.day = U.error.params)), n.required && (l.value || (c.value.year = { key: "year.required" }), s.value || (c.value.month = { key: "month.required" }), u.value || (c.value.day = { key: "day.required" })), M.value && Object.keys(c.value).length === 0) {
        const ee = (0, import_dayjs.default)(M.value);
        if (!ee.isValid())
          c.value.day = { key: "day.invalid" };
        else if (n.minDate && ee.isBefore((0, import_dayjs.default)(n.minDate)))
          c.value.day = {
            key: "date.beforeMin",
            params: { minDate: (0, import_dayjs.default)(n.minDate).format(n.dateFormat) }
          }, g.value.day = { minDate: (0, import_dayjs.default)(n.minDate).format(n.dateFormat) };
        else if (n.maxDate && ee.isAfter((0, import_dayjs.default)(n.maxDate)))
          c.value.day = {
            key: "date.afterMax",
            params: { maxDate: (0, import_dayjs.default)(n.maxDate).format(n.dateFormat) }
          }, g.value.day = { maxDate: (0, import_dayjs.default)(n.maxDate).format(n.dateFormat) };
        else if (d.value) {
          o("update:modelValue", d.value);
          const J = d.value;
          J !== w.value && !T.value && (w.value = J, o("complete", d.value));
        }
      } else f.value && !l.value && !s.value && !u.value && (o("update:modelValue", null), w.value = null);
      o("validation", !D.value, b.value, g.value);
    }, re = () => {
      l.value = "", s.value = "", u.value = "", c.value = {};
    }, X = (C) => {
      const x = k.value.findIndex((ee) => ee === C), U = x < k.value.length - 1 ? k.value[x + 1] : null;
      U ? nextTick(() => {
        h(U);
      }) : z();
    }, I = (C, x, U, ee) => {
      const J = x.replace(/\D/g, "");
      if (J.length === 1 && T.value && (T.value = false), J.length <= U) {
        if (ee && J.length === 1 && parseInt(J) > ee) {
          const P = J.padStart(2, "0");
          C === "year" ? l.value = P : C === "month" ? s.value = P : C === "day" && (u.value = P), X(C);
        } else
          C === "year" ? l.value = J : C === "month" ? s.value = J : C === "day" && (u.value = J);
        J.length === U && X(C);
      }
    }, R = (C) => {
      const x = C.target;
      I("year", x.value, 4);
    }, $ = (C) => {
      const x = C.target;
      I("month", x.value, 2, 1);
    }, H = (C) => {
      const x = C.target;
      I("day", x.value, 2, 3);
    }, L = () => {
      nextTick(() => {
        if (k.value.length === 0) return;
        const C = k.value[k.value.length - 1], x = i(C);
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
      const U = C.target, ee = k.value.findIndex((K) => K === x), J = ee > 0 ? k.value[ee - 1] : null, P = ee < k.value.length - 1 ? k.value[ee + 1] : null;
      C.key === "Backspace" && U.value === "" && J && (C.preventDefault(), T.value = true, A(J, "end")), C.key === "ArrowLeft" && U.selectionStart === 0 && J && (C.preventDefault(), T.value = true, A(J, "end")), C.key === "ArrowRight" && U.selectionStart === U.value.length && P && (C.preventDefault(), T.value = true, A(P, "start")), C.key === "Enter" && z();
    }, ce = (C) => {
      y.value = C;
    }, se = (C) => {
      z(), y.value = null;
    };
    return e({
      validate: z,
      reset: () => {
        re(), o("update:modelValue", null);
      },
      getErrors: () => ({ ...c.value }),
      hasErrors: () => D.value,
      errorMessages: () => S.value,
      focus: v,
      focusLast: L,
      setDate: (C) => {
        if (C) {
          const x = ye(C);
          x && (l.value = x.year.toString(), s.value = x.month.toString().padStart(2, "0"), u.value = x.day.toString().padStart(2, "0"), z());
        } else
          re(), o("update:modelValue", null);
      },
      resetCompletionState: () => {
        T.value = false, w.value = null;
      }
    }), (C, x) => (openBlock(), createElementBlock("div", Io, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(k.value, (U, ee) => (openBlock(), createElementBlock(Fragment, { key: U }, [
        U === "year" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 0,
          ref_for: true,
          ref: (J) => p(J, "year"),
          "onUpdate:modelValue": x[0] || (x[0] = (J) => l.value = J),
          type: "text",
          inputmode: "numeric",
          placeholder: C.yearPlaceholder,
          maxlength: 4,
          class: "date-input text-sm text-center active:bg-vdt-theme-100",
          onInput: R,
          onKeydown: x[1] || (x[1] = (J) => te(J, "year")),
          onFocus: x[2] || (x[2] = (J) => ce("year")),
          onBlur: x[3] || (x[3] = (J) => se()),
          "aria-label": "year",
          "aria-invalid": !!b.value.year,
          "aria-errormessage": b.value.year ? "year-error" : void 0
        }, null, 40, Oo)), [
          [vModelText, l.value],
          [a, 20]
        ]) : U === "month" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 1,
          ref_for: true,
          ref: (J) => p(J, "month"),
          "onUpdate:modelValue": x[4] || (x[4] = (J) => s.value = J),
          type: "text",
          inputmode: "numeric",
          placeholder: C.monthPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: $,
          onKeydown: x[5] || (x[5] = (J) => te(J, "month")),
          onFocus: x[6] || (x[6] = (J) => ce("month")),
          onBlur: x[7] || (x[7] = (J) => se()),
          "aria-label": "month",
          "aria-invalid": !!b.value.month,
          "aria-errormessage": b.value.month ? "month-error" : void 0
        }, null, 40, Vo)), [
          [vModelText, s.value],
          [a, 20]
        ]) : U === "day" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 2,
          ref_for: true,
          ref: (J) => p(J, "day"),
          "onUpdate:modelValue": x[8] || (x[8] = (J) => u.value = J),
          type: "text",
          inputmode: "numeric",
          placeholder: C.dayPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: H,
          onKeydown: x[9] || (x[9] = (J) => te(J, "day")),
          onFocus: x[10] || (x[10] = (J) => ce("day")),
          onBlur: x[11] || (x[11] = (J) => se()),
          "aria-label": "day",
          "aria-invalid": !!b.value.day,
          "aria-errormessage": b.value.day ? "day-error" : void 0
        }, null, 40, Fo)), [
          [vModelText, u.value],
          [a, 20]
        ]) : createCommentVNode("", true),
        ee < k.value.length - 1 ? (openBlock(), createElementBlock("span", Po, toDisplayString(C.separator), 1)) : createCommentVNode("", true)
      ], 64))), 128))
    ]));
  }
});
var je = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [a, n] of e)
    t[a] = n;
  return t;
};
var ca = je(Ao, [["__scopeId", "data-v-917a492c"]]);
var Lo = { class: "time-input-container flex items-center justify-center" };
var Bo = ["placeholder", "aria-invalid", "aria-errormessage"];
var Ho = ["placeholder", "aria-invalid", "aria-errormessage"];
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
      mounted: nt.mounted,
      updated: nt.updated,
      beforeUnmount: nt.beforeUnmount
    }, n = r, o = t, l = ref(""), s = ref(""), u = ref(""), c = ref("AM"), g = ref({}), y = ref({}), f = ref(null), T = ref(false), w = ref(), m = ref(), p = ref(), i = computed(() => Object.keys(g.value).length > 0), b = computed(() => {
      const I = {};
      return Object.entries(g.value).forEach(([R, $]) => {
        I[R] = $.key;
      }), I;
    }), D = () => {
      l.value = "", s.value = "", u.value = "", c.value = "AM";
    }, S = computed(() => {
      var I, R;
      if (!n.useLocalizedPeriod) return c.value;
      try {
        const $ = /* @__PURE__ */ new Date();
        $.setHours(9, 0, 0);
        const H = /* @__PURE__ */ new Date();
        H.setHours(15, 0, 0);
        const L = new Intl.DateTimeFormat(n.locale, {
          hour: "numeric",
          hour12: true
        }), te = L.formatToParts($), ce = L.formatToParts(H), se = ((I = te.find((x) => x.type === "dayPeriod")) == null ? void 0 : I.value) || "AM", C = ((R = ce.find((x) => x.type === "dayPeriod")) == null ? void 0 : R.value) || "PM";
        return c.value === "AM" ? se : C;
      } catch ($) {
        return console.error("Error getting localized period:", $), c.value;
      }
    }), k = computed(() => S.value), M = computed(() => {
      if (l.value === "" || s.value === "" || n.enableSeconds && u.value === "")
        return null;
      let I = parseInt(l.value, 10);
      n.use24Hour || (c.value === "PM" && I < 12 ? I += 12 : c.value === "AM" && I === 12 && (I = 0));
      const R = I.toString().padStart(2, "0"), $ = s.value.padStart(2, "0");
      if (n.enableSeconds) {
        const H = u.value.padStart(2, "0");
        return `${R}:${$}:${H}`;
      } else
        return `${R}:${$}`;
    });
    watch(() => n.modelValue, (I) => {
      if (T.value || (T.value = true), I) {
        const R = I.split(":");
        let $ = parseInt(R[0] || "0", 10);
        const H = (R[1] || "").replace(/\D/g, ""), L = (R[2] || "").replace(/\D/g, "");
        n.use24Hour || ($ >= 12 ? (c.value = "PM", $ = $ === 12 ? 12 : $ - 12) : (c.value = "AM", $ = $ === 0 ? 12 : $)), l.value = $.toString().padStart(2, "0"), s.value = H, n.enableSeconds && (u.value = L);
      } else
        D();
    }, { immediate: true });
    const d = (I, R) => {
      if (!R) return { valid: true };
      const $ = parseInt(R);
      switch (I) {
        case "hour":
          const H = n.use24Hour ? 23 : 12, L = n.use24Hour ? 0 : 1;
          if (!rt(R) || $ < L || $ > H)
            return { valid: false, error: { key: "time.hourOutOfRange", params: { min: L, max: H } } };
          break;
        case "minute":
          if (!rt(R) || $ < 0 || $ > 59)
            return { valid: false, error: { key: "time.minuteOutOfRange", params: { min: 0, max: 59 } } };
          if (n.minuteStep > 1 && $ % n.minuteStep !== 0)
            return { valid: false, error: { key: "time.minuteStepInvalid", params: { step: n.minuteStep } } };
          break;
        case "second":
          if (!rt(R) || $ < 0 || $ > 59)
            return { valid: false, error: { key: "time.secondOutOfRange", params: { min: 0, max: 59 } } };
          break;
      }
      return g.value[I] && (delete g.value[I], delete y.value[I]), { valid: true };
    }, v = () => {
      c.value = c.value === "AM" ? "PM" : "AM", h();
    }, h = () => {
      if (!T.value) return;
      g.value = {}, y.value = {};
      const I = d("hour", l.value), R = d("minute", s.value), $ = n.enableSeconds ? d("second", u.value) : { valid: true };
      !I.valid && I.error && (g.value.hour = I.error, I.error.params && (y.value.hour = I.error.params)), !R.valid && R.error && (g.value.minute = R.error, R.error.params && (y.value.minute = R.error.params)), !$.valid && $.error && (g.value.second = $.error, $.error.params && (y.value.second = $.error.params)), n.required && (l.value || (g.value.hour = { key: "time.hourRequired" }), s.value || (g.value.minute = { key: "time.minuteRequired" }), n.enableSeconds && !u.value && (g.value.second = { key: "time.secondRequired" })), o("validation", !i.value, b.value, y.value), M.value ? (o("update:modelValue", M.value), o("complete", M.value)) : T.value && o("update:modelValue", null);
    }, A = (I) => {
      const $ = I.target.value.replace(/\D/g, "");
      if ($.length <= 2) {
        if (l.value = $, !d("hour", $).valid) return;
        ($.length === 2 || n.use24Hour && parseInt($) > 2 || !n.use24Hour && parseInt($) > 1) && nextTick(() => {
          var L;
          (L = m.value) == null || L.focus();
        });
      }
    }, B = (I) => {
      const $ = I.target.value.replace(/\D/g, "");
      if ($.length <= 2) {
        if ($.length === 1 && parseInt($) > 5 ? (s.value = $.padStart(2, "0"), nextTick(() => {
          n.enableSeconds && p.value ? p.value.focus() : h();
        })) : s.value = $, !d("minute", $).valid) return;
        $.length === 2 && nextTick(() => {
          n.enableSeconds && p.value ? p.value.focus() : h();
        });
      }
    }, _ = (I) => {
      const $ = I.target.value.replace(/\D/g, "");
      if ($.length <= 2) {
        if ($.length === 1 && parseInt($) > 5 ? (u.value = $.padStart(2, "0"), h()) : u.value = $, !d("second", $).valid) return;
        $.length === 2 && h();
      }
    }, z = (I, R) => {
      var H, L, te, ce, se, C, x, U, ee, J, P, K;
      const $ = I.target;
      if (I.key === "Backspace" && $.value === "")
        switch (R) {
          case "hour":
            I.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            I.preventDefault(), (H = w.value) == null || H.focus(), (L = w.value) == null || L.setSelectionRange(-1, -1);
            break;
          case "second":
            I.preventDefault(), (te = m.value) == null || te.focus(), (ce = m.value) == null || ce.setSelectionRange(-1, -1);
            break;
        }
      if (I.key === "ArrowLeft" && $.selectionStart === 0)
        switch (R) {
          case "hour":
            I.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            I.preventDefault(), (se = w.value) == null || se.focus(), (C = w.value) == null || C.setSelectionRange(-1, -1);
            break;
          case "second":
            I.preventDefault(), (x = m.value) == null || x.focus(), (U = m.value) == null || U.setSelectionRange(-1, -1);
            break;
        }
      if (I.key === "ArrowRight" && $.selectionStart === $.value.length)
        switch (R) {
          case "hour":
            I.preventDefault(), (ee = m.value) == null || ee.focus(), (J = m.value) == null || J.setSelectionRange(0, 0);
            break;
          case "minute":
            n.enableSeconds && (I.preventDefault(), (P = p.value) == null || P.focus(), (K = p.value) == null || K.setSelectionRange(0, 0));
            break;
        }
      I.key === "Enter" && h();
    }, re = (I) => {
      f.value = I;
    }, X = (I) => {
      f.value = null, h();
    };
    return e({
      validate: h,
      reset: () => {
        D(), g.value = {}, y.value = {}, o("update:modelValue", null);
      },
      getErrors: () => b.value,
      hasErrors: i,
      setTime: (I) => {
        if (I) {
          const [R, $, H] = I.split(":");
          let L = parseInt(R);
          n.use24Hour || (L >= 12 ? (c.value = "PM", L = L === 12 ? 12 : L - 12) : (c.value = "AM", L = L === 0 ? 12 : L)), l.value = L.toString().padStart(2, "0"), s.value = $, n.enableSeconds && H && (u.value = H), h();
        } else
          D(), o("update:modelValue", null);
      },
      focus: () => {
        var I;
        (I = w.value) == null || I.focus();
      },
      focusLast: () => {
        n.enableSeconds && p.value ? (p.value.focus(), p.value.setSelectionRange(0, 0)) : m.value ? (m.value.focus(), m.value.setSelectionRange(0, 0)) : w.value && (w.value.focus(), w.value.setSelectionRange(0, 0));
      }
    }), (I, R) => (openBlock(), createElementBlock("div", Lo, [
      withDirectives(createBaseVNode("input", {
        ref_key: "hourRef",
        ref: w,
        "onUpdate:modelValue": R[0] || (R[0] = ($) => l.value = $),
        type: "text",
        inputmode: "numeric",
        placeholder: I.hourPlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: A,
        onKeydown: R[1] || (R[1] = ($) => z($, "hour")),
        onFocus: R[2] || (R[2] = ($) => re("hour")),
        onBlur: R[3] || (R[3] = ($) => X()),
        "aria-label": "hour",
        "aria-invalid": !!g.value.hour,
        "aria-errormessage": g.value.hour ? "hour-error" : void 0
      }, null, 40, Bo), [
        [vModelText, l.value],
        [a, 20]
      ]),
      R[13] || (R[13] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
      withDirectives(createBaseVNode("input", {
        ref_key: "minuteRef",
        ref: m,
        "onUpdate:modelValue": R[4] || (R[4] = ($) => s.value = $),
        type: "text",
        inputmode: "numeric",
        placeholder: I.minutePlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: B,
        onKeydown: R[5] || (R[5] = ($) => z($, "minute")),
        onFocus: R[6] || (R[6] = ($) => re("minute")),
        onBlur: R[7] || (R[7] = ($) => X()),
        "aria-label": "minute",
        "aria-invalid": !!g.value.minute,
        "aria-errormessage": g.value.minute ? "minute-error" : void 0
      }, null, 40, Ho), [
        [vModelText, s.value],
        [a, 20]
      ]),
      I.enableSeconds ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        R[12] || (R[12] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
        withDirectives(createBaseVNode("input", {
          ref_key: "secondRef",
          ref: p,
          "onUpdate:modelValue": R[8] || (R[8] = ($) => u.value = $),
          type: "text",
          inputmode: "numeric",
          placeholder: I.secondPlaceholder,
          maxlength: 2,
          class: "time-input text-sm text-center",
          onInput: _,
          onKeydown: R[9] || (R[9] = ($) => z($, "second")),
          onFocus: R[10] || (R[10] = ($) => re("second")),
          onBlur: R[11] || (R[11] = ($) => X()),
          "aria-label": "second",
          "aria-invalid": !!g.value.second,
          "aria-errormessage": g.value.second ? "second-error" : void 0
        }, null, 40, qo), [
          [vModelText, u.value],
          [a, 20]
        ])
      ], 64)) : createCommentVNode("", true),
      I.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
        key: 1,
        type: "button",
        class: normalizeClass(["time-period pl-2 text-sm cursor-pointer", l.value ? "text-vdt-content" : "text-gray-400"]),
        onClick: withModifiers(v, ["stop"])
      }, toDisplayString(k.value), 3))
    ]));
  }
});
var da = je(No, [["__scopeId", "data-v-fb3720c7"]]);
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
      start: "請選擇開始日期",
      end: "請選擇結束日期"
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
      start: "请选择开始日期",
      end: "请选择结束日期"
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
      start: "Please select start date",
      end: "Please select end date"
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
      start: "開始日を選択してください",
      end: "終了日を選択してください"
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
      start: "시작 날짜를 선택해주세요",
      end: "종료 날짜를 선택해주세요"
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
var Le = {
  "zh-TW": Uo,
  "zh-CN": zo,
  "en-US": Wo,
  "ja-JP": jo,
  "ko-KR": Jo
};
function Fr(r, e) {
  return r.replace(/\{(\w+)\}/g, (t, a) => {
    var n;
    return ((n = e[a]) == null ? void 0 : n.toString()) || t;
  });
}
var _o = class {
  constructor() {
    be(this, "currentLocale", "zh-TW");
  }
  setLocale(e) {
    if (!Le[e]) {
      console.warn(`Locale '${e}' not found, falling back to 'zh-TW'`), this.currentLocale = "zh-TW";
      return;
    }
    this.currentLocale = e;
  }
  // 註冊自定義語言包
  registerLocale(e, t) {
    Le[e] = t;
  }
  // 檢查語言包是否存在
  hasLocale(e) {
    return !!Le[e];
  }
  // 獲取所有可用語言
  getAvailableLocales() {
    return Object.keys(Le);
  }
  getCurrentLocale() {
    return this.currentLocale;
  }
  getMessage(e, t) {
    const a = e.split(".");
    let n = Le[this.currentLocale];
    for (const o of a)
      n = n == null ? void 0 : n[o];
    return typeof n != "string" ? (console.warn(`Missing translation for path: ${e} in locale: ${this.currentLocale}`), e) : t ? Fr(n, t) : n;
  }
  getErrorMessage(e, t) {
    return this.getMessage(`error.${e}`, t);
  }
  getPlaceholderMessage(e, t) {
    return this.getMessage(`placeholder.${e}`, t);
  }
  // 支援自定義語言包
  addCustomMessages(e, t) {
    if (!Le[e]) {
      console.warn(`Locale '${e}' not found. Please register it first using registerLocale().`);
      return;
    }
    Le[e] = {
      ...Le[e],
      ...this.deepMerge(Le[e], t)
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
function bt(r = "en-US", e) {
  const t = new _o(), a = ref(r);
  e && r && t.registerLocale(r, e), t.setLocale(r);
  const n = (y, f) => {
    a.value = y, f && t.registerLocale(y, f), t.setLocale(y);
  }, o = (y, f) => t.getMessage(y, f), l = (y, f) => t.getErrorMessage(y, f), s = (y, f) => t.getPlaceholderMessage(y, f), u = (y, f) => Fr(y, f), c = (y, f) => {
    t.registerLocale(y, f);
  }, g = (y) => t.hasLocale(y);
  return {
    currentLocale: computed(() => a.value),
    setLocale: n,
    getMessage: o,
    getErrorMessage: l,
    getPlaceholderMessage: s,
    formatText: u,
    registerCustomLocale: c,
    hasLocale: g
  };
}
var Ko = {
  key: 0,
  class: "date-error-message mt-1 text-sm text-red-500"
};
var Qo = { key: 0 };
var Zo = { key: 1 };
var Go = { key: 2 };
var Pr = defineComponent({
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
    const t = r, { currentLocale: a, setLocale: n, getErrorMessage: o } = bt(t.locale);
    watch(() => t.locale, (i) => {
      i && t.useI18n && n(i);
    }, { immediate: true });
    const l = ref({}), s = ref({}), u = computed(() => ({
      ...t.customMessages,
      ...l.value
    })), c = computed(() => t.errors ? Array.isArray(t.errors) ? t.errors.length > 0 : typeof t.errors == "string" ? t.errors.trim().length > 0 : typeof t.errors == "object" ? Object.values(t.errors).some((i) => i && i.trim().length > 0) : false : false), g = computed(() => {
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
        return Object.entries(t.errors).forEach(([b, D]) => {
          var S;
          if (D) {
            s.value[b] = D;
            const k = ((S = t.errorParams) == null ? void 0 : S[b]) || {};
            i[b] = m(D, b, k), t.debug && console.log(`Processing error for field "${b}":`, {
              original: D,
              params: k,
              translated: i[b],
              field: b,
              slotName: T(b)
            });
          }
        }), i;
      }
      return t.errors;
    }), y = computed(() => t.errorParams || {});
    function f(i) {
      return s.value[i];
    }
    function T(i) {
      return `error-${i.replace(/^(date|time|range)\./, "")}`;
    }
    function w(i) {
      return i.startsWith("date.") ? "date" : i.startsWith("time.") ? "time" : i.startsWith("range.") ? "range" : "unknown";
    }
    function m(i, b, D = {}) {
      if (t.debug && console.log(`翻譯訊息: "${i}", field: "${b}", params:`, D), u.value[i])
        return u.value[i];
      if (!t.useI18n)
        return i;
      if (/^[a-zA-Z]+\.[a-zA-Z]+$/.test(i))
        try {
          const M = o(i, D);
          if (t.debug && console.log(`Locale key 翻譯: "${i}" -> "${M}" with params:`, D), M && M !== i)
            return M;
        } catch (M) {
          t.debug && console.warn(`Locale key 翻譯失敗: ${i}`, M);
        }
      const k = t.messageKeyMap[i];
      if (k)
        try {
          const M = o(k, D);
          if (t.debug && console.log(`MessageKeyMap 翻譯: "${i}" -> "${M}" with params:`, D), M && M !== k)
            return M;
        } catch (M) {
          t.debug && console.warn(`MessageKeyMap 翻譯失敗: ${k}`, M);
        }
      return p(i, b, D);
    }
    function p(i, b, D = {}) {
      t.debug && console.log(`smartTranslateError: "${i}", field: "${b}", params:`, D);
      const S = {
        請選擇日期: "date.required",
        請選擇時間: "time.required",
        請選擇開始日期: "range.startRequired",
        請選擇結束日期: "range.endRequired",
        "Please select a date": "date.required",
        "Please select a time": "time.required",
        "Please select start date": "range.startRequired",
        "Please select end date": "range.endRequired"
      };
      if (S[i])
        try {
          const v = o(S[i], D);
          if (t.debug && console.log(`直接匹配翻譯: "${i}" -> "${v}" with params:`, D), v && v !== S[i])
            return v;
        } catch (v) {
          t.debug && console.warn(`直接匹配翻譯失敗: ${S[i]}`, v);
        }
      function k(v, h) {
        if (/請輸入|please enter|required/i.test(v)) {
          if (h != null && h.includes("year") || v.includes("年份")) return "year.required";
          if (h != null && h.includes("month") || v.includes("月份")) return "month.required";
          if (h != null && h.includes("day") || v.includes("日期")) return "day.required";
          if (h != null && h.includes("hour") || v.includes("小時")) return "time.hourRequired";
          if (h != null && h.includes("minute") || v.includes("分鐘")) return "time.minuteRequired";
          if (h != null && h.includes("second") || v.includes("秒鐘")) return "time.secondRequired";
          if (h != null && h.includes("startDate") || v.includes("開始日期")) return "range.startRequired";
          if (h != null && h.includes("endDate") || v.includes("結束日期")) return "range.endRequired";
          if (h != null && h.includes("time") || v.includes("時間")) return "time.required";
          if (h != null && h.includes("date") || v.includes("日期")) return "date.required";
        }
        return null;
      }
      const M = k(i, b);
      if (M)
        try {
          const v = o(M, D);
          if (t.debug && console.log(`智能匹配翻譯: "${i}" -> "${v}" with params:`, D), v && v !== M)
            return v;
        } catch (v) {
          t.debug && console.warn(`智能匹配翻譯失敗: ${M}`, v);
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
          handler: (v) => v != null && v.includes("year") ? "year.invalid" : v != null && v.includes("month") ? "month.invalid" : v != null && v.includes("day") ? "day.invalid" : v != null && v.includes("time") || v != null && v.includes("hour") || v != null && v.includes("minute") || v != null && v.includes("second") ? "time.invalid" : "date.invalid"
        }
      ];
      for (const v of d)
        if (v.regex.test(i)) {
          const h = v.handler ? v.handler(b) : v.key;
          if (h)
            try {
              const A = o(h, D);
              if (t.debug && console.log(`模式匹配翻譯: "${i}" -> "${A}" (key: ${h}) with params:`, D), A && A !== h)
                return A;
            } catch (A) {
              t.debug && console.warn(`模式匹配翻譯失敗: ${h}`, A);
            }
        }
      return t.debug && console.log(`無法翻譯，返回原始訊息: "${i}"`), i;
    }
    return e({
      hasErrors: c,
      processedErrors: g,
      processedErrorParams: y,
      translateMessage: m,
      getOriginalKey: f,
      getSlotName: T,
      getFieldType: w,
      setLocale: (i) => {
        n(i);
      },
      addCustomTranslation: (i, b) => {
        l.value[i] = b;
      },
      currentLocale: a
    }), (i, b) => c.value ? (openBlock(), createElementBlock("div", Ko, [
      Array.isArray(g.value) ? (openBlock(), createElementBlock("div", Qo, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(g.value, (D, S) => (openBlock(), createElementBlock("div", { key: S }, [
          renderSlot(i.$slots, `error-${D.field}`, {
            error: D,
            message: D.message,
            field: D.field,
            errorParams: D.params
          }, () => [
            createBaseVNode("span", null, toDisplayString(D.message), 1)
          ])
        ]))), 128))
      ])) : typeof g.value == "string" ? (openBlock(), createElementBlock("div", Zo, [
        renderSlot(i.$slots, "error-single", {
          error: g.value,
          message: g.value
        }, () => [
          createBaseVNode("span", null, toDisplayString(g.value), 1)
        ])
      ])) : typeof g.value == "object" ? (openBlock(), createElementBlock("div", Go, [
        renderSlot(i.$slots, "error", {
          errors: g.value,
          errorParams: t.errorParams
        }, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(g.value, (D, S) => (openBlock(), createElementBlock("div", { key: S }, [
            renderSlot(i.$slots, T(S), {
              field: S,
              error: D,
              message: D,
              originalKey: f(S),
              fieldType: w(S),
              errorParams: t.errorParams[S] || {}
            }, () => [
              createBaseVNode("span", null, toDisplayString(D), 1)
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
var Ar = je(Xo, [["render", tl]]);
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
var Lr = je(al, [["render", nl]]);
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
var Br = je(ol, [["render", sl]]);
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
    const a = r, n = t, { getMessage: o, formatText: l } = bt(a.locale), s = ref(null), u = ref(null), c = computed(() => me.getCalendarRange(a.calendar)), g = computed(() => me.getCalendarDisplayName(a.calendar, a.locale)), y = computed(() => a.calendar === "gregory"), f = computed(() => a.calendar === "japanese"), T = computed(() => M.value[0]), w = computed(() => M.value[M.value.length - 1]), m = ref(0), p = ($) => {
      const H = Math.floor($ / a.pageSize) * a.pageSize;
      return Math.max(H, c.value.min);
    }, i = () => {
      m.value = p(a.selectedYear);
    }, b = /* @__PURE__ */ new Map(), D = ($, H) => {
      const L = `${$}-${H}`;
      if (!b.has(L))
        try {
          b.set(L, new Ut(H, { calendar: $, year: "numeric", era: "short" }));
        } catch {
          b.set(L, new Ut(H, { year: "numeric" }));
        }
      return b.get(L);
    }, S = ($) => {
      var L, te;
      const H = {
        gregorianYear: $,
        displayEra: "",
        displayYear: $.toString(),
        showReference: false,
        displayWarning: false
      };
      if (y.value)
        return H;
      try {
        const ce = new ue($, 6, 1), se = me.safeToCalendar(ce, me.createSafeCalendar(a.calendar)), x = D(a.calendar, a.locale).formatToParts(se.toDate("UTC"));
        H.displayYear = ((L = x.find((J) => J.type === "year")) == null ? void 0 : L.value) || $.toString(), H.displayEra = ((te = x.find((J) => J.type === "era")) == null ? void 0 : te.value) || "";
        const U = !!H.displayEra, ee = H.displayEra !== $.toString();
        (U || ee) && (H.showReference = true, H.referenceYear = $.toString());
      } catch {
        if (H.displayWarning = true, H.warningMessage = `無法轉換為${g.value}`, a.calendar === "roc") {
          const se = $ - 1911;
          H.displayYear = se > 0 ? se.toString() : `民國前${Math.abs(se - 1)}年`;
        }
      }
      return H;
    }, k = ($) => $ >= c.value.min && $ <= c.value.max, M = computed(() => {
      const $ = m.value, H = [];
      for (let L = 0; L < a.pageSize; L++) {
        const te = $ + L;
        if (te > c.value.max) break;
        te < c.value.min || H.push(S(te));
      }
      return H;
    }), d = computed(() => {
      const $ = M.value;
      if ($.length === 0) return "";
      const H = $[0], L = $[$.length - 1];
      if (y.value)
        return `${H.displayYear} - ${L.displayYear}`;
      if (H.gregorianYear === L.gregorianYear)
        return H.displayYear;
      const te = H.displayEra, ce = L.displayEra;
      return te && ce && te === ce ? `${te} ${H.displayYear} - ${L.displayYear}` : `${H.displayEra} ${H.displayYear} - ${L.displayEra} ${L.displayYear}`;
    }), v = computed(() => m.value > c.value.min), h = computed(() => m.value + a.pageSize <= c.value.max), A = () => {
      v.value && (m.value = Math.max(
        m.value - a.pageSize,
        c.value.min
      ));
    }, B = () => {
      h.value && (m.value = Math.min(
        m.value + a.pageSize,
        c.value.max
      ));
    }, _ = ($) => {
      k($) && (n("year-selected", $), n("update:showSelector", false));
    }, z = () => {
      u.value && (k(u.value) ? (m.value = p(u.value), n("year-selected", u.value), n("update:showSelector", false), u.value = null) : console.warn(`年份 ${u.value} 超出範圍 ${c.value.min}-${c.value.max}`));
    }, re = () => {
      const $ = Math.max(c.value.min, Math.min((/* @__PURE__ */ new Date()).getFullYear(), c.value.max));
      n("year-selected", $);
    }, X = ($) => o(`yearSelector.${$}`);
    watch([() => a.selectedYear, () => a.calendar], () => {
      k(a.selectedYear) && (m.value = p(a.selectedYear));
    }, { immediate: true });
    const R = ($) => {
      if (a.showSelector && s.value) {
        const H = $.target, L = !!H.closest("[data-year-selector-button]");
        !s.value.contains(H) && !L && n("update:showSelector", false);
      }
    };
    return onMounted(() => {
      i(), document.addEventListener("mousedown", R);
    }), onBeforeUnmount(() => {
      document.removeEventListener("mousedown", R);
    }), e({
      getLocalizedText: X,
      formatText: l,
      goToSpecificYear: z,
      goToValidRange: re
    }), ($, H) => $.showSelector ? (openBlock(), createElementBlock("div", {
      key: 0,
      ref_key: "yearSelectorRef",
      ref: s,
      class: "absolute top-full mt-1 right-0 min-w-56 max-h-72 overflow-auto bg-vdt-surface-elevated text-vdt-content border border-vdt-outline rounded-md shadow-lg z-20"
    }, [
      createBaseVNode("div", il, [
        createBaseVNode("button", {
          type: "button",
          onClick: A,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !v.value }]),
          disabled: !v.value,
          "aria-label": "previous year"
        }, [
          createVNode(Lr, { class: "h-4 w-4" })
        ], 10, ul),
        createBaseVNode("span", cl, [
          renderSlot($.$slots, "year-range-display", {
            firstYear: T.value,
            lastYear: w.value,
            displayText: d.value
          }, () => [
            createTextVNode(toDisplayString(d.value), 1)
          ], true)
        ]),
        createBaseVNode("button", {
          type: "button",
          onClick: B,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !h.value }]),
          disabled: !h.value,
          "aria-label": "next year"
        }, [
          createVNode(Br, { class: "h-4 w-4" })
        ], 10, dl)
      ]),
      M.value.length > 0 ? (openBlock(), createElementBlock("div", fl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(M.value, (L) => (openBlock(), createElementBlock("button", {
          type: "button",
          key: L.gregorianYear,
          onClick: (te) => _(L.gregorianYear),
          class: normalizeClass([
            "p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200",
            $.selectedYear === L.gregorianYear ? "bg-vdt-theme-500 text-white" : "hover:bg-vdt-interactive-hover text-vdt-content",
            L.displayWarning ? "ring-1 ring-amber-400" : ""
          ]),
          title: L.warningMessage
        }, [
          renderSlot($.$slots, "year-display", {
            yearData: L,
            isSelected: $.selectedYear === L.gregorianYear
          }, () => [
            createBaseVNode("div", hl, [
              f.value ? (openBlock(), createElementBlock("div", vl, toDisplayString(L.displayEra), 1)) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(L.displayYear), 1)
            ]),
            L.showReference ? (openBlock(), createElementBlock("div", pl, toDisplayString(L.referenceYear), 1)) : createCommentVNode("", true)
          ], true)
        ], 10, ml))), 128))
      ])) : (openBlock(), createElementBlock("div", gl, [
        renderSlot($.$slots, "no-years-display", {
          calendarRange: c.value,
          goToValidRange: re
        }, () => [
          createBaseVNode("div", yl, toDisplayString(X("noYearsToDisplay")), 1),
          createBaseVNode("button", {
            type: "button",
            onClick: re,
            class: "text-xs bg-vdt-theme-100 hover:bg-vdt-theme-200 px-3 py-1 rounded text-vdt-theme-700"
          }, toDisplayString(X("returnToValidRange")), 1)
        ], true)
      ])),
      createBaseVNode("div", $l, [
        renderSlot($.$slots, "year-input", {
          yearInput: u.value,
          calendarRange: c.value,
          calendarDisplayName: g.value,
          goToSpecificYear: z,
          getLocalizedText: X,
          formatText: unref(l)
        }, () => [
          createBaseVNode("div", Dl, toDisplayString(X("jumpToYear")), 1),
          withDirectives(createBaseVNode("input", {
            type: "number",
            "onUpdate:modelValue": H[0] || (H[0] = (L) => u.value = L),
            onKeydown: withKeys(z, ["enter"]),
            placeholder: X("inputYearPlaceholder"),
            min: c.value.min,
            max: c.value.max,
            class: "w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500"
          }, null, 40, bl), [
            [vModelText, u.value]
          ]),
          createBaseVNode("div", Ml, toDisplayString(unref(l)(X("yearRangeInfo"), {
            calendar: g.value,
            min: c.value.min,
            max: c.value.max
          })), 1)
        ], true)
      ])
    ], 512)) : createCommentVNode("", true);
  }
});
var kl = je(Sl, [["__scopeId", "data-v-f14c8987"]]);
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
    const t = r, a = e, n = ref(t.month), o = ref(t.year), l = ref(false), s = computed(() => t.calendar || "gregory"), u = computed(() => me.getCalendarRange(t.calendar));
    watch(() => t.month, (S) => {
      n.value = S;
    }, { immediate: true }), watch(() => t.year, (S) => {
      o.value = S;
    }, { immediate: true });
    const c = computed(() => {
      if (t.calendar === "gregory")
        return o.value.toString();
      try {
        const S = new ue(o.value, 6, 1), k = me.safeToCalendar(
          S,
          me.createSafeCalendar(t.calendar)
        );
        return new Ut(t.locale, {
          calendar: t.calendar,
          year: "numeric"
        }).format(k.toDate("UTC"));
      } catch {
        return o.value.toString();
      }
    }), g = computed(() => me.getMonthNames(t.locale, t.calendar)), y = computed(() => {
      let S = o.value, k = n.value - 1;
      return k < 1 && (k = 12, S = o.value - 1), S >= u.value.min;
    }), f = computed(() => {
      let S = o.value, k = n.value + 1;
      return k > 12 && (k = 1, S = o.value + 1), S <= u.value.max;
    }), T = () => {
      if (!y.value) return;
      let S = n.value - 1, k = o.value;
      S < 1 && (S = 12, k -= 1), k >= u.value.min && b(S, k);
    }, w = () => {
      if (!f.value) return;
      let S = n.value + 1, k = o.value;
      S > 12 && (S = 1, k += 1), k <= u.value.max && b(S, k);
    }, m = () => {
      b(n.value, o.value);
    }, p = (S) => {
      S !== void 0 && (n.value = S), b(n.value, o.value);
    }, i = (S) => {
      S >= u.value.min && S <= u.value.max && (o.value = S, b(n.value, S));
    }, b = (S, k) => {
      n.value = S, o.value = k, a("update:month", S), a("update:year", k);
    }, D = () => {
      l.value = !l.value;
    };
    return (S, k) => (openBlock(), createElementBlock("div", wl, [
      createBaseVNode("button", {
        type: "button",
        onClick: T,
        class: "p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "上個月",
        disabled: !y.value
      }, [
        createVNode(Lr, { class: "h-5 w-5" })
      ], 8, Tl),
      createBaseVNode("div", xl, [
        renderSlot(S.$slots, "month-selector", {
          monthNames: g.value,
          selectedMonth: n.value,
          onMonthChange: p
        }, () => [
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": k[0] || (k[0] = (M) => n.value = M),
            onChange: m,
            class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500",
            "aria-label": "選擇月份",
            role: "combobox"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(g.value, (M, d) => (openBlock(), createElementBlock("option", {
              key: d,
              value: d + 1
            }, toDisplayString(M), 9, Yl))), 128))
          ], 544), [
            [vModelSelect, n.value]
          ])
        ]),
        createBaseVNode("div", Cl, [
          renderSlot(S.$slots, "year-selector", {
            displayYear: c.value,
            toggleYearSelector: D,
            showYearSelector: l.value
          }, () => [
            createBaseVNode("button", {
              type: "button",
              onClick: D,
              "data-year-selector-button": "",
              class: "inline-flex text-nowrap items-center px-2 py-1 bg-vdt-surface text-vdt-content w-full border border-vdt-outline rounded-sm text-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200",
              "aria-label": "選擇年份"
            }, toDisplayString(c.value), 1)
          ]),
          createVNode(kl, {
            "selected-year": o.value,
            "show-selector": l.value,
            "onUpdate:showSelector": k[1] || (k[1] = (M) => l.value = M),
            calendar: s.value,
            locale: S.locale,
            onYearSelected: i
          }, createSlots({ _: 2 }, [
            renderList(S.$slots, (M, d) => ({
              name: d,
              fn: withCtx((v) => [
                renderSlot(S.$slots, d, normalizeProps(guardReactiveProps(v)))
              ])
            }))
          ]), 1032, ["selected-year", "show-selector", "calendar", "locale"])
        ])
      ]),
      createBaseVNode("button", {
        type: "button",
        onClick: w,
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
          u[0] || (u[0] = withKeys((c) => a("nav", "up"), ["up"])),
          u[1] || (u[1] = withKeys((c) => a("nav", "down"), ["down"])),
          u[2] || (u[2] = withKeys((c) => a("nav", "left"), ["left"])),
          u[3] || (u[3] = withKeys((c) => a("nav", "right"), ["right"]))
        ]
      }, toDisplayString(s.date.day), 43, Fl)
    ]));
  }
});
var Al = je(Pl, [["__scopeId", "data-v-9018b2ca"]]);
var Ll = { class: "grid grid-cols-7 gap-1" };
var Bl = defineComponent({
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
      const m = at();
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
    )), u = (m) => {
      if (!a.rangeStart || !a.rangeEnd) return false;
      try {
        return m.compare(a.rangeStart) >= 0 && m.compare(a.rangeEnd) <= 0;
      } catch {
        return false;
      }
    }, c = (m, p) => {
      if (!m || !p) return false;
      try {
        return m.compare(p) === 0;
      } catch {
        return false;
      }
    }, g = (m) => {
      try {
        return !!(a.minDate && m.compare(a.minDate) < 0 || a.maxDate && m.compare(a.maxDate) > 0);
      } catch {
        return true;
      }
    }, y = (m) => ko(m), f = computed(() => s.value.map((m, p) => {
      const i = `${m.year}-${m.month}-${m.day}`, b = y(m), D = m.month !== o.value, S = g(m), k = a.selectionMode === "single" && c(m, a.selectedDate), M = a.selectionMode === "range" && c(m, a.rangeStart), d = a.selectionMode === "range" && c(m, a.rangeEnd), v = a.selectionMode === "range" && u(m) && !M && !d && !S, h = m.day === 1 && m.month === o.value, A = [
        i,
        k,
        b,
        S,
        M,
        d,
        v,
        a.selectionMode,
        a.calendar
      ];
      return {
        key: `${a.calendar}-${l.value}-${o.value}-${i}-${p}`,
        memoKey: A,
        date: m,
        isToday: b,
        isSelected: k,
        isDisabled: S,
        isOutsideMonth: D,
        isRangeStart: M,
        isRangeEnd: d,
        isInRange: v,
        isFocusable: h
      };
    })), T = (m) => {
      a.selectionMode === "single" ? n("select", m) : a.selectionMode === "range" && n("range-select", m, null);
    }, w = (m) => {
      const p = f.value;
      if (p.length === 0) return;
      const i = p[0], b = p[p.length - 1];
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
    }), (m, p) => (openBlock(), createElementBlock("div", Ll, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (i, b, D, S) => {
        const k = i.memoKey;
        if (S && S.key === i.key && isMemoSame(S, k)) return S;
        const M = (openBlock(), createBlock(Al, {
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
          onSelect: T,
          onNav: w
        }, null, 8, ["date", "current-month", "selected", "is-today", "disabled", "focusable", "is-range-start", "is-range-end", "is-in-range", "selection-mode"]));
        return M.memo = k, M;
      }, p, 0), 128))
    ]));
  }
});
var Hl = { key: 0 };
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
    const a = r, n = t, { getPlaceholderMessage: o } = bt(a.locale), l = ref(0), s = ref(0), u = ref(0), c = ref("AM"), g = ref(false), y = computed(() => a.use24Hour ? Array.from({ length: 24 }, (d, v) => v) : Array.from({ length: 12 }, (d, v) => v + 1)), f = computed(() => Array.from({ length: 60 }, (d, v) => v)), T = computed(() => Array.from({ length: 60 }, (d, v) => v)), w = computed(() => {
      let d = l.value;
      a.use24Hour || (c.value === "PM" && d < 12 ? d += 12 : c.value === "AM" && d === 12 && (d = 0));
      const v = m(d), h = m(s.value);
      if (a.enableSeconds) {
        const A = m(u.value);
        return `${v}:${h}:${A}`;
      } else
        return `${v}:${h}`;
    }), m = (d) => d.toString().padStart(2, "0"), p = (d) => m(d), i = (d) => {
      if (!d) return;
      const [v, h, A] = d.split(":");
      let B = parseInt(v) || 0;
      a.use24Hour || (B >= 12 ? (c.value = "PM", B = B === 12 ? 12 : B - 12) : (c.value = "AM", B = B === 0 ? 12 : B)), l.value = B, s.value = parseInt(h) || 0, a.enableSeconds && A && (u.value = parseInt(A) || 0), g.value = true;
    }, b = () => {
      i(a.defaultTime);
    }, D = (d) => {
      c.value = d;
    }, S = (d) => {
      const v = /* @__PURE__ */ new Date();
      v.setHours(d === "AM" ? 6 : 18, 0, 0, 0);
      const B = new Intl.DateTimeFormat(a.locale || navigator.language, {
        hour12: true,
        hour: "numeric"
      }).formatToParts(v).find((_) => _.type === "dayPeriod");
      return (B == null ? void 0 : B.value) || d;
    }, k = () => {
      const d = /* @__PURE__ */ new Date();
      if (a.use24Hour)
        l.value = d.getHours();
      else {
        const v = d.getHours();
        c.value = v >= 12 ? "PM" : "AM", l.value = v % 12 || 12;
      }
      s.value = d.getMinutes(), a.enableSeconds && (u.value = d.getSeconds()), g.value = true;
    }, M = () => {
      n("today-click");
    };
    return watch(() => a.timeValue, (d) => {
      d ? i(d) : !g.value && a.show && b();
    }, { immediate: true }), watch(
      [l, s, u, c],
      () => {
        g.value && n("time-change", w.value);
      }
    ), e({
      // 獲取當前時間值
      getCurrentTime: () => w.value,
      // 設置時間
      setTime: (d) => i(d),
      // 重置為預設時間
      resetToDefault: () => b()
    }), (d, v) => d.show ? (openBlock(), createElementBlock("div", Hl, [
      v[5] || (v[5] = createBaseVNode("hr", { class: "my-2 border-vdt-outline" }, null, -1)),
      createBaseVNode("div", ql, [
        createBaseVNode("label", Nl, toDisplayString(unref(o)("general.time")) + ": ", 1),
        createBaseVNode("div", Ul, [
          createBaseVNode("button", {
            type: "button",
            onClick: k,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-active cursor-pointer"
          }, " Now "),
          d.selectionMode === "single" ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            onClick: M,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-active cursor-pointer"
          }, " Today ")) : createCommentVNode("", true)
        ])
      ]),
      createBaseVNode("div", zl, [
        createBaseVNode("div", Wl, [
          createBaseVNode("div", jl, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": v[0] || (v[0] = (h) => l.value = h),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(y.value, (h) => (openBlock(), createElementBlock("option", {
                key: h,
                value: h
              }, toDisplayString(p(h)), 9, Jl))), 128))
            ], 512), [
              [vModelSelect, l.value]
            ])
          ]),
          createBaseVNode("div", _l, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": v[1] || (v[1] = (h) => s.value = h),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (h) => (openBlock(), createElementBlock("option", {
                key: h,
                value: h
              }, toDisplayString(m(h)), 9, Kl))), 128))
            ], 512), [
              [vModelSelect, s.value]
            ])
          ]),
          d.enableSeconds ? (openBlock(), createElementBlock("div", Ql, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": v[2] || (v[2] = (h) => u.value = h),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(T.value, (h) => (openBlock(), createElementBlock("option", {
                key: h,
                value: h
              }, toDisplayString(m(h)), 9, Zl))), 128))
            ], 512), [
              [vModelSelect, u.value]
            ])
          ])) : createCommentVNode("", true),
          d.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Gl, [
            createBaseVNode("div", Xl, [
              createBaseVNode("button", {
                type: "button",
                onClick: v[3] || (v[3] = (h) => D("AM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", c.value === "AM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(S("AM")), 3),
              createBaseVNode("button", {
                type: "button",
                onClick: v[4] || (v[4] = (h) => D("PM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", c.value === "PM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(S("PM")), 3)
            ])
          ]))
        ])
      ])
    ])) : createCommentVNode("", true);
  }
});
var ts = { class: "vdt-date-picker calendar-grid w-full max-w-xs rounded-lg shadow p-2" };
var fa = defineComponent({
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
      const d = at();
      return { year: d.year, month: d.month };
    }, { year: l, month: s } = o(), u = ref(l), c = ref(s), g = ref(a.timeValue), y = computed(() => me.convertToCalendarDate(a.value, a.calendar)), f = computed(() => me.convertToCalendarDate(a.rangeStart, a.calendar)), T = computed(() => me.convertToCalendarDate(a.rangeEnd, a.calendar)), w = computed(() => me.convertToCalendarDate(a.minDate || null, a.calendar)), m = computed(() => me.convertToCalendarDate(a.maxDate || null, a.calendar)), p = computed(() => {
      var d;
      return ((d = a.minDate) == null ? void 0 : d.year) || 1900;
    }), i = computed(() => {
      var d;
      return ((d = a.maxDate) == null ? void 0 : d.year) || 2100;
    }), b = computed(() => {
      if (a.year !== void 0 && a.month !== void 0)
        return { year: a.year, month: a.month };
      const d = a.selectionMode === "range" ? a.rangeStart : a.value;
      return d ? { year: d.year, month: d.month } : { year: u.value, month: c.value };
    });
    watch(b, ({ year: d, month: v }) => {
      u.value = d, c.value = v;
    }, { immediate: true }), watch(() => a.timeValue, (d) => {
      g.value = d;
    }, { immediate: true });
    const D = (d) => {
      if (a.selectionMode === "single") {
        const v = me.convertFromCalendarDate(d, a.calendar);
        v && (n("select", v, true), a.showTimeSelector && g.value && n("time-select", g.value));
      }
    }, S = (d, v) => {
      if (a.selectionMode === "range") {
        const h = me.convertFromCalendarDate(d, a.calendar), A = me.convertFromCalendarDate(v, a.calendar);
        n("range-select", h, A);
      }
    }, k = (d) => {
      g.value = d, n("time-select", d);
    }, M = () => {
      if (a.selectionMode === "single") {
        const d = at();
        u.value = d.year, c.value = d.month, n("select", d, false);
      }
    };
    return e({
      // 獲取當前選中的日期（單一模式）
      getSelectedDate: () => a.value,
      // 獲取當前範圍（範圍模式）
      getSelectedRange: () => ({ start: a.rangeStart, end: a.rangeEnd }),
      // 設置顯示的月份
      setDisplayMonth: (d, v) => {
        u.value = d, c.value = v;
      },
      // 導航到上個月
      previousMonth: () => {
        c.value === 1 ? (c.value = 12, u.value -= 1) : c.value -= 1;
      },
      // 導航到下個月
      nextMonth: () => {
        c.value === 12 ? (c.value = 1, u.value += 1) : c.value += 1;
      }
    }), (d, v) => (openBlock(), createElementBlock("div", ts, [
      createVNode(El, {
        month: c.value,
        "onUpdate:month": v[0] || (v[0] = (h) => c.value = h),
        year: u.value,
        "onUpdate:year": v[1] || (v[1] = (h) => u.value = h),
        locale: d.locale,
        "min-year": p.value,
        "max-year": i.value,
        calendar: d.calendar
      }, createSlots({ _: 2 }, [
        renderList(d.$slots, (h, A) => ({
          name: A,
          fn: withCtx((B) => [
            renderSlot(d.$slots, A, normalizeProps(guardReactiveProps(B)))
          ])
        }))
      ]), 1032, ["month", "year", "locale", "min-year", "max-year", "calendar"]),
      createVNode(Ol, {
        locale: d.locale,
        "week-starts-on": d.weekStartsOn,
        calendar: d.calendar
      }, null, 8, ["locale", "week-starts-on", "calendar"]),
      createVNode(Bl, {
        year: u.value,
        month: c.value,
        "selected-date": y.value,
        "range-start": f.value,
        "range-end": T.value,
        "selection-mode": d.selectionMode,
        "min-date": w.value,
        "max-date": m.value,
        locale: d.locale,
        "week-starts-on": d.weekStartsOn,
        calendar: d.calendar,
        onSelect: D,
        onRangeSelect: S
      }, null, 8, ["year", "month", "selected-date", "range-start", "range-end", "selection-mode", "min-date", "max-date", "locale", "week-starts-on", "calendar"]),
      createVNode(es, {
        locale: d.locale,
        show: d.showTimeSelector,
        "time-value": g.value,
        "enable-seconds": d.enableSeconds,
        "use24-hour": d.use24Hour,
        "default-time": d.defaultTime,
        selectionMode: d.selectionMode,
        onTimeChange: k,
        onTodayClick: M
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
var Hr = je(as, [["render", ns]]);
function ma(r, e) {
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
        var y, f, T;
        n && ((y = a.value) != null && y.focusLast) ? a.value.focusLast() : (f = t.value) != null && f.focusLast ? t.value.focusLast() : (T = t.value) != null && T.focus && t.value.focus();
      });
    },
    // 專門的導航處理
    handleNavigateToTime: (y) => {
      n && nextTick(() => {
        var f;
        (f = a.value) != null && f.focus && a.value.focus();
      });
    },
    handleNavigateToDate: () => {
      nextTick(() => {
        var y, f;
        (y = t.value) != null && y.focusLast ? t.value.focusLast() : (f = t.value) != null && f.focus && t.value.focus();
      });
    },
    autoFocusTimeAfterDateComplete: (y, f) => {
      !n || !o || (f && !y.inputTimeValue.value && (y.inputTimeValue.value = f, y.updateFromInputs()), nextTick(() => {
        var T;
        (T = a.value) != null && T.focus && a.value.focus();
      }));
    }
  };
}
function ha(r = {}) {
  const { required: e = true, showTime: t = false, minDate: a, maxDate: n, dateFormat: o = "YYYY-MM-DD" } = r, l = ref({}), s = ref({}), u = ref({}), c = computed(() => ({ ...l.value, ...s.value })), g = computed(() => ({ ...u.value })), y = computed(() => Object.keys(c.value).length > 0), f = (k, M, d = "date", v = {}) => {
    ["date", "year", "month", "day"].forEach((h) => {
      m(`${d}.${h}`), p(`${d}.${h}`);
    }), k || Object.entries(M).forEach(([h, A]) => {
      const B = `${d}.${h}`;
      l.value[B] = A, v[h] && (u.value[B] = v[h]);
    });
  }, T = (k, M, d = "time", v = {}) => (["time", "hour", "minute", "second"].forEach((h) => {
    m(`${d}.${h}`), p(`${d}.${h}`);
  }), k || Object.entries(M).forEach(([h, A]) => {
    const B = `${d}.${h}`;
    l.value[B] = A, v[h] && (u.value[B] = v[h]);
  }), !y.value), w = (k) => {
    if (!k) return false;
    if (a) {
      const M = ye(a);
      if (M && Wt(k, M) < 0)
        return f(false, {
          date: "date.beforeMin"
        }, "date", {
          date: { minDate: Re(M, o) }
        }), false;
    }
    if (n) {
      const M = ye(n);
      if (M && Wt(k, M) > 0)
        return f(false, {
          date: "date.afterMax"
        }, "date", {
          date: { maxDate: Re(M, o) }
        }), false;
    }
    return true;
  }, m = (k) => {
    Object.keys(l.value).forEach((M) => {
      M.startsWith(k) && delete l.value[M];
    });
  }, p = (k) => {
    Object.keys(u.value).forEach((M) => {
      M.startsWith(k) && delete u.value[M];
    });
  };
  return {
    // 狀態
    errors: l,
    formatErrors: s,
    mergedErrors: c,
    hasErrors: y,
    errorParams: u,
    mergedErrorParams: g,
    // 驗證方法
    handleDateValidation: f,
    handleTimeValidation: T,
    validateDateTime: (k, M) => {
      const d = {
        isValid: true,
        errors: {}
      };
      return e && (k || (d.errors.date = "date.required", d.isValid = false), t && !M && (d.errors.time = "time.required", d.isValid = false)), Object.assign(l.value, d.errors), d.isValid && !y.value;
    },
    validateDateRange: w,
    // 錯誤管理
    clearFieldErrors: m,
    clearFieldParams: p,
    clearAllErrors: () => {
      l.value = {}, s.value = {}, u.value = {};
    },
    setFormatError: (k, M) => {
      s.value[k] = M;
    },
    clearFormatError: (k) => {
      delete s.value[k];
    }
  };
}
function va(r = {}) {
  const {
    showTime: e = false,
    dateFormat: t = "YYYY-MM-DD",
    timeFormat: a = "HH:mm:ss",
    outputType: n = "iso",
    defaultTime: o,
    enableSeconds: l = true
  } = r, s = ref(null), u = ref(null), c = ref(null), g = (d) => {
    if (!d || d.hour === void 0) return null;
    const v = d.hour.toString().padStart(2, "0"), h = (d.minute || 0).toString().padStart(2, "0");
    if (l) {
      const A = (d.second || 0).toString().padStart(2, "0");
      return `${v}:${h}:${A}`;
    } else
      return `${v}:${h}`;
  }, y = (d, v) => {
    if (!d) return null;
    const h = ye(d);
    if (!h) return null;
    if (!v && !e)
      return qe(h.year, h.month, h.day);
    if (!v)
      if (o) {
        const re = o.split(":").map(Number), X = re[0] || 0, I = re[1] || 0, R = re[2] || 0;
        return qe(
          h.year,
          h.month,
          h.day,
          X,
          I,
          R
        );
      } else
        return qe(h.year, h.month, h.day);
    const A = v.split(":").map(Number), B = A[0] || 0, _ = A[1] || 0, z = A[2] || 0;
    return qe(
      h.year,
      h.month,
      h.day,
      B,
      _,
      z
    );
  }, f = (d) => {
    const v = ye(d);
    s.value = v, v ? (u.value = Re(v, t), c.value = g(v)) : (u.value = null, c.value = null);
  }, T = (d, v) => {
    const h = d !== void 0 ? d : u.value, A = v !== void 0 ? v : c.value, B = y(h, A);
    return s.value = B, B;
  }, w = (d) => {
    if (!d) {
      s.value = null, u.value = null, c.value = null;
      return;
    }
    if (e && o && (d.hour === void 0 || d.hour === null) && !c.value) {
      const v = o.split(":").map(Number), h = v[0] || 0, A = v[1] || 0, B = v[2] || 0, _ = qe(
        d.year,
        d.month,
        d.day,
        h,
        A,
        B
      );
      s.value = _, c.value = o;
    } else
      s.value = d, c.value = g(d);
    s.value && (u.value = Re(s.value));
  }, m = (d) => {
    if (!s.value) return null;
    const v = d.split(":").map(Number), h = {
      ...s.value,
      hour: v[0] || 0,
      minute: v[1] || 0,
      second: v[2] || 0
    };
    return s.value = h, c.value = d, h;
  }, p = (d) => {
    const v = d !== void 0 ? d : s.value, h = e ? `${t} ${a}` : t;
    return zt(v, n, h);
  }, i = () => {
    s.value = null, u.value = null, c.value = null;
  }, b = computed(() => !!(u.value || c.value || s.value)), D = () => e && !c.value && o ? (c.value = o, true) : false, S = computed(() => !!u.value), k = computed(() => !!c.value), M = computed(() => e ? S.value && k.value : S.value);
  return {
    // 響應式狀態
    internalDateTime: s,
    inputDateValue: u,
    inputTimeValue: c,
    // 計算屬性
    hasDateValue: S,
    hasTimeValue: k,
    hasCompleteValue: M,
    hasValue: b,
    // 主要方法
    updateFromInputs: T,
    setInternalDateTime: w,
    updateTimeOnly: m,
    setExternalValue: f,
    // updateDateTime,
    getFormattedOutput: p,
    clearValues: i,
    applyDefaultTime: D,
    // 輔助方法
    getTimeFromDateTime: g,
    createDateTimeFromInputs: y
  };
}
function qr(r, e, t = {}) {
  const { disabled: a, onOutsideClick: n } = t, o = ref(false), l = () => {
    a != null && a.value || (o.value = !o.value, o.value && nextTick(() => {
      c();
    }));
  }, s = () => {
    a != null && a.value || (o.value = true, nextTick(() => {
      c();
    }));
  }, u = () => {
    o.value = false;
  }, c = () => {
    if (!r.value || !e.value) return;
    const m = r.value.getBoundingClientRect(), p = e.value, i = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    let b = m.height + 5, D = 0;
    const S = p.getBoundingClientRect();
    m.left + S.width > i.width && (D = i.width - m.left - S.width - 10), m.bottom + S.height > i.height && (b = -S.height - 5), p.style.position = "absolute", p.style.top = `${b}px`, p.style.left = `${D}px`, p.style.zIndex = "50";
  }, g = (m) => {
    const p = e.value, i = r.value, b = m.target;
    o.value && p && !p.contains(b) && i && !i.contains(b) && (u(), n == null || n());
  }, y = (m, p) => {
    if (a != null && a.value) return;
    const i = m.target;
    i.classList.contains("date-input") || i.classList.contains("time-input") || i.closest("input") || i.closest("button") || (m.preventDefault(), p == null || p());
  }, f = (m) => {
    if (a != null && a.value) return;
    const p = m.target;
    p.classList.contains("date-input") || p.classList.contains("time-input") || p.closest("input") || p.closest("button") || m.preventDefault();
  }, T = () => {
    o.value && c();
  }, w = () => {
    o.value && c();
  };
  return onMounted(() => {
    document.addEventListener("mousedown", g), window.addEventListener("resize", T), window.addEventListener("scroll", w);
  }), onBeforeUnmount(() => {
    document.removeEventListener("mousedown", g), window.removeEventListener("resize", T), window.removeEventListener("scroll", w);
  }), {
    // 狀態
    showCalendar: o,
    // 主要方法
    toggleCalendar: l,
    showCalendarPopup: s,
    hideCalendar: u,
    updateCalendarPosition: c,
    // 事件處理
    handleContainerClick: y,
    handleContainerMouseDown: f
  };
}
function os(r = {}) {
  const {
    customDefaultTime: e = "00:00:00",
    enableSeconds: t = true
  } = r, a = (c) => {
    if (!c) return false;
    if (!/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])(?::([0-5]?[0-9]))?$/.test(c))
      return console.warn(`時間格式不正確: ${c}，應為 HH:mm:ss 或 HH:mm 格式`), false;
    const y = c.split(":"), f = parseInt(y[0]), T = parseInt(y[1]), w = y[2] ? parseInt(y[2]) : 0;
    return f < 0 || f > 23 || T < 0 || T > 59 || w < 0 || w > 59 ? (console.warn(`時間值超出範圍: ${c}`), false) : true;
  }, n = (c, g = t) => {
    const y = c.split(":"), f = y[0].padStart(2, "0"), T = y[1].padStart(2, "0"), w = y[2] ? y[2].padStart(2, "0") : "00";
    return g ? `${f}:${T}:${w}` : `${f}:${T}`;
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
      const c = /* @__PURE__ */ new Date(), g = c.getHours().toString().padStart(2, "0"), y = c.getMinutes().toString().padStart(2, "0"), f = c.getSeconds().toString().padStart(2, "0");
      return t ? `${g}:${y}:${f}` : `${g}:${y}`;
    },
    parseTimeString: (c) => {
      const g = c.split(":");
      return {
        hours: parseInt(g[0]) || 0,
        minutes: parseInt(g[1]) || 0,
        seconds: parseInt(g[2]) || 0
      };
    },
    buildTimeString: (c, g, y = 0) => {
      const f = c.toString().padStart(2, "0"), T = g.toString().padStart(2, "0"), w = y.toString().padStart(2, "0");
      return t ? `${f}:${T}:${w}` : `${f}:${T}`;
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
    customDefaultTime: c,
    enableSeconds: g = true,
    autoFocusTimeAfterDate: y = true,
    minDate: f,
    maxDate: T
    // locale = 'zh-TW'
  } = r, { containerRef: w, calendarRef: m, dateInputRef: p, timeInputRef: i } = e, b = computed(() => {
    var P;
    return ((P = r.calendar) == null ? void 0 : P.value) || "gregory";
  }), D = computed(() => {
    var P;
    return ((P = r.locale) == null ? void 0 : P.value) || "zh-TW";
  }), S = computed(() => {
    var P;
    return ((P = r.outputType) == null ? void 0 : P.value) || "iso";
  }), k = ref(o), M = ha({
    required: n,
    showTime: a,
    minDate: f,
    maxDate: T,
    dateFormat: l
  }), d = va({
    showTime: a,
    dateFormat: l,
    timeFormat: s,
    outputType: S.value,
    defaultTime: c,
    enableSeconds: g
  }), v = ma(
    { dateInputRef: p, timeInputRef: i },
    { showTime: a, autoFocusTimeAfterDate: y }
  ), h = qr(
    w,
    m,
    {
      disabled: k,
      onOutsideClick: () => {
      }
    }
  ), A = os({
    customDefaultTime: c,
    enableSeconds: g
  }), B = computed(() => {
    const P = ye(f, D.value);
    return P || null;
  }), _ = computed(() => {
    const P = ye(T, D.value);
    return P || null;
  });
  let z = null, re = null, X = null;
  const I = (P) => {
    z = P.update || null, re = P.change || null, X = P.validation || null;
  }, R = async (P = d.internalDateTime.value) => {
    let K = null;
    if (P) {
      const De = a ? `${l} ${s}` : l;
      K = zt(P, S.value, De, a, b.value, D.value, u);
    }
    z == null || z(K), re == null || re(K);
    const ne = !M.hasErrors.value;
    X == null || X(ne, M.mergedErrors.value, M.errorParams.value);
  };
  watch(() => t, (P) => {
    const K = ye(P, D.value, b.value);
    P && !K ? (M.handleDateValidation(false, { date: "無效的日期格式" }), d.setExternalValue(null)) : K && !M.validateDateRange(K) ? d.setExternalValue(null) : (M.clearFieldErrors("date"), M.clearFieldErrors("invalidInput"), d.setExternalValue(K));
  }, { immediate: true });
  const $ = (P, K, ne = {}) => {
    M.handleDateValidation(P, K, "date", ne), X == null || X(!M.hasErrors.value, M.mergedErrors.value, M.errorParams.value);
  }, H = (P, K, ne = {}) => {
    M.handleTimeValidation(P, K, "time", ne), X == null || X(!M.hasErrors.value, M.mergedErrors.value, M.errorParams.value);
  }, L = async (P) => {
    d.inputDateValue.value = P;
    const K = d.updateFromInputs();
    if (!K) {
      M.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    M.validateDateRange(K) && (await R(K), ["date", "year", "month", "day"].forEach((ne) => {
      M.clearFieldErrors(ne);
    }), v.autoFocusTimeAfterDateComplete(
      d,
      c ? A.getValidDefaultTime.value : void 0
    ));
  }, te = async (P) => {
    d.inputTimeValue.value = P;
    const K = d.updateFromInputs();
    await R(K), ["time", "hour", "minute", "second"].forEach((ne) => {
      M.clearFieldErrors(ne);
    });
  }, ce = async (P, K = true) => {
    try {
      if (!M.validateDateRange(P))
        return;
      d.setInternalDateTime(P), await R(d.internalDateTime.value), ["date", "year", "month", "day"].forEach((ne) => {
        M.clearFieldErrors(ne);
      }), K && h.hideCalendar();
    } catch (ne) {
      console.error("處理日曆選擇失敗:", ne);
    }
  }, se = async (P) => {
    const K = d.updateTimeOnly(P);
    K && await R(K), ["time", "hour", "minute", "second"].forEach((ne) => {
      M.clearFieldErrors(ne);
    });
  }, C = (P) => {
    h.handleContainerClick(P, () => {
      v.focusFirstInput();
    }), h.toggleCalendar();
  }, x = () => {
    d.clearValues(), M.clearAllErrors(), R(null);
  }, U = async () => {
    var ae, pe;
    const P = await ((ae = p.value) == null ? void 0 : ae.validate()), K = a ? await ((pe = i.value) == null ? void 0 : pe.validate()) : true;
    let ne = true;
    d.internalDateTime.value && (ne = me.isValidDate(
      d.internalDateTime.value.year,
      d.internalDateTime.value.month,
      d.internalDateTime.value.day,
      "gregory"
      // 固定使用西元曆驗證
    ), ne || M.handleDateValidation(false, {
      date: "date.invalid"
      // 簡化錯誤信息
    }));
    const De = M.validateDateTime(
      d.inputDateValue.value,
      d.inputTimeValue.value
    ), V = P && K && ne && De;
    return X == null || X(V, M.mergedErrors.value, M.errorParams.value), V;
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
      d.setInternalDateTime(K), await R(K), ["date", "year", "month", "day", "time", "hour", "minute", "second"].forEach((ne) => {
        M.clearFieldErrors(ne);
      });
    } catch (ne) {
      console.warn("設置當前時間失敗:", ne);
      const De = `${K.year}-${K.month.toString().padStart(2, "0")}-${K.day.toString().padStart(2, "0")}`, V = a ? `${(K.hour || 0).toString().padStart(2, "0")}:${(K.minute || 0).toString().padStart(2, "0")}:${(K.second || 0).toString().padStart(2, "0")}` : null;
      d.inputDateValue.value = De, a && V && (d.inputTimeValue.value = V);
      const ae = d.updateFromInputs();
      await R(ae);
    }
  }, J = () => {
    v.focusFirstInput();
  };
  return {
    // 狀態
    isDisabled: k,
    // 日曆系統相關
    calendar: b,
    // 從各個 composables 暴露的狀態
    ...M,
    ...d,
    ...h,
    // 計算屬性
    calendarMinDate: B,
    calendarMaxDate: _,
    // 預設時間相關
    getValidDefaultTime: A.getValidDefaultTime,
    // 事件處理方法
    setEmitters: I,
    validateDateInput: $,
    validateTimeInput: H,
    handleDateComplete: L,
    handleTimeComplete: te,
    handleCalendarSelect: ce,
    handleTimeSelect: se,
    handleContainerClick: C,
    handleContainerMouseDown: h.handleContainerMouseDown,
    // 導航方法
    handleNavigateToDate: v.handleNavigateToDate,
    handleNavigateToTime: v.handleNavigateToTime,
    // 主要操作方法
    reset: x,
    validate: U,
    selectNow: ee,
    focus: J,
    // 直接暴露導航方法（用於 defineExpose）
    focusFirstInput: v.focusFirstInput,
    focusLastInput: v.focusLastInput
  };
}
var Ta = {
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
function nr(r) {
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
function Nr(r) {
  const { r: e, g: t, b: a } = r, n = e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4), o = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), l = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), s = 0.4124 * n + 0.3576 * o + 0.1805 * l, u = 0.2126 * n + 0.7152 * o + 0.0722 * l, c = 0.0193 * n + 0.1192 * o + 0.9505 * l, g = 0.95047, y = 1, f = 1.08883, T = s > 8856e-6 ? Math.pow(s / g, 1 / 3) : 7.787 * s / g + 16 / 116, w = u > 8856e-6 ? Math.pow(u / y, 1 / 3) : 7.787 * u / y + 16 / 116, m = c > 8856e-6 ? Math.pow(c / f, 1 / 3) : 7.787 * c / f + 16 / 116, p = 116 * w - 16, i = 500 * (T - w), b = 200 * (w - m);
  return { l: p, a: i, b };
}
function Ur(r) {
  const { l: e, a: t, b: a } = r, n = Math.sqrt(t * t + a * a);
  let o = Math.atan2(a, t) * 180 / Math.PI;
  return o < 0 && (o += 360), { l: e, c: n, h: o };
}
function us(r) {
  const e = ss(r), t = Nr(e), a = Ur(t);
  let n = a.h;
  return n > 0 && n < 60 && (n = n * 0.7), {
    lightness: a.l,
    chroma: Math.min(a.c / 150, 0.4),
    hue: n
  };
}
function cs(r) {
  const e = Nr(r), t = Ur(e);
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
  return r in Ta;
}
function vs(r) {
  return r.startsWith("rgb(") || r.startsWith("rgba(");
}
function or(r) {
  const e = "violet";
  if (hs(r))
    return r;
  let t = null;
  if (fs(r))
    t = nr(r);
  else if (ms(r))
    t = us(r);
  else if (vs(r)) {
    const o = is(r);
    o && (t = cs(o));
  }
  if (!t) return e;
  let a = e, n = 1 / 0;
  for (const [o, l] of Object.entries(Ta))
    for (const s of ["300", "400", "500", "600", "700"]) {
      const u = l[s];
      if (!u) continue;
      const c = nr(u);
      if (!c) continue;
      const g = ds(t, c);
      g < n && (n = g, a = o);
    }
  return a;
}
function ps(r) {
  return Ta[r] || {};
}
var gs = class {
  constructor() {
    be(this, "instances", /* @__PURE__ */ new Map());
    be(this, "mediaQuery", null);
    be(this, "listeners", /* @__PURE__ */ new Map());
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
      color: or(t.defaultColor || "violet"),
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
      const f = `--color-vdt-theme-${y}`;
      a[f] = e.style.getPropertyValue(f), e.style.removeProperty(f);
    });
    const o = getComputedStyle(e).getPropertyValue("--color-vdt-theme-500").trim();
    if (Object.entries(a).forEach(([y, f]) => {
      f && e.style.setProperty(y, f);
    }), !o) return false;
    const l = "oklch(60.6% 0.25 292.717)", s = t[500], u = this.isOklchEqual(o, l), c = this.isOklchEqual(o, s);
    return !u && !c;
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
    const n = or(t);
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
var Fe = new gs();
function zr(r = {}) {
  const e = ref(
    Fe.createInstance(r.instanceId, {
      defaultColor: r.defaultColor,
      defaultMode: r.defaultMode
    })
  ), t = ref(
    Fe.getState(e.value)
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
  }), u = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.userPreference) || "auto";
  }), c = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.systemPreference) || "light";
  }), g = computed(() => {
    var i;
    return ((i = t.value) == null ? void 0 : i.color) || "violet";
  }), y = computed(() => e.value ? Fe.getThemeClasses(e.value) : {}), f = computed(() => e.value ? Fe.getContainerAttributes(e.value) : {}), T = (i) => {
    e.value && Fe.setColor(e.value, i);
  }, w = (i) => {
    e.value && Fe.setMode(e.value, i);
  }, m = () => {
    if (t.value)
      if (t.value.userPreference === "auto") {
        const i = t.value.currentMode === "light" ? "dark" : "light";
        w(i);
      } else {
        const i = t.value.currentMode === "light" ? "dark" : "light";
        w(i);
      }
  }, p = computed(() => typeof window > "u" ? false : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches !== void 0);
  return onMounted(async () => {
    await nextTick(), t.value = Fe.getState(e.value), a = Fe.addListener(e.value, (i) => {
      t.value = i;
    }), setTimeout(() => {
      Fe.reapplyTheme(e.value);
    }, 10);
  }), onBeforeUnmount(() => {
    a && a(), e.value && Fe.destroyInstance(e.value);
  }), {
    // 響應式狀態
    instanceId: e,
    themeState: t,
    isDark: n,
    isLight: o,
    isAuto: l,
    currentMode: s,
    userPreference: u,
    systemPreference: c,
    currentColor: g,
    themeClasses: y,
    containerAttributes: f,
    supportsColorScheme: p,
    // 主要方法
    setColor: T,
    setMode: w,
    toggle: m,
    // 便利方法 - 模式設置
    setLightMode: () => w("light"),
    setDarkMode: () => w("dark"),
    setAutoMode: () => w("auto"),
    // 便利方法 - 常用顏色設置
    setRedTheme: () => T("red"),
    setBlueTheme: () => T("blue"),
    setGreenTheme: () => T("green"),
    setVioletTheme: () => T("violet"),
    setPurpleTheme: () => T("purple"),
    setIndigoTheme: () => T("indigo"),
    setTealTheme: () => T("teal"),
    setCyanTheme: () => T("cyan"),
    setSkyTheme: () => T("sky"),
    setEmeraldTheme: () => T("emerald")
  };
}
var ys = { key: 0 };
var $s = {
  key: 0,
  class: "text-vdt-content"
};
var Ds = {
  key: 1,
  class: "text-vdt-content-muted"
};
var bs = ["disabled"];
var Ms = { key: 0 };
var lr = defineComponent({
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
    timeFormat: { default: "HH:mm:ss" },
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
    const a = r, { setLocale: n, getPlaceholderMessage: o } = bt(
      a.locale,
      a.customLocaleMessages
    ), l = t, s = useSlots(), u = computed(() => {
      const E = {};
      return ["no-years-display", "month-selector"].forEach((Z) => {
        s[Z] && (E[Z] = s[Z]);
      }), Object.keys(s).forEach((Z) => {
        Z.startsWith("year-") && (E[Z] = s[Z]);
      }), E;
    }), c = ref(null), g = ref(null), y = ref(null), f = ref(null), T = ref(a.dateFormat), w = ref(a.timeFormat), m = ref({}), p = ls(
      {
        modelValue: a.modelValue,
        showTime: a.showTime,
        required: a.required,
        disabled: a.disabled,
        calendar: toRef(a, "calendar"),
        dateFormat: T.value,
        timeFormat: w.value,
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
        containerRef: c,
        calendarRef: g,
        dateInputRef: y,
        timeInputRef: f
      }
    );
    p.setEmitters({
      update: (E) => l("update:modelValue", E),
      change: (E) => l("change", E),
      validation: (E, Z, oe) => l("validation", E, Z, oe)
    });
    const {
      themeClasses: i,
      containerAttributes: b,
      setColor: D,
      setMode: S,
      currentMode: k,
      isDark: M,
      isLight: d
    } = zr(), v = computed(() => {
      const E = ye(a.minDate, a.locale);
      return Re(E);
    }), h = computed(() => {
      const E = ye(a.maxDate, a.locale);
      return Re(E);
    }), A = computed(() => T.value), B = computed(() => a.calendar === "gregory"), _ = computed(() => !!(R.value && R.value.trim())), z = computed(() => {
      var Z, oe, Q, ge, Pe, Mt, St;
      a.locale;
      const E = {
        selectDate: o("general.selectDate"),
        year: o("date.year"),
        month: o("date.month"),
        day: o("date.day"),
        hour: o("time.hour"),
        minute: o("time.minute"),
        second: o("time.second")
      };
      return {
        selectDate: ((Z = a.placeholderOverrides) == null ? void 0 : Z.selectDate) || E.selectDate,
        // 時間相關
        hour: ((oe = a.placeholderOverrides) == null ? void 0 : oe.hour) || E.hour,
        minute: ((Q = a.placeholderOverrides) == null ? void 0 : Q.minute) || E.minute,
        second: ((ge = a.placeholderOverrides) == null ? void 0 : ge.second) || E.second,
        // 日期相關
        year: ((Pe = a.placeholderOverrides) == null ? void 0 : Pe.year) || E.year,
        month: ((Mt = a.placeholderOverrides) == null ? void 0 : Mt.month) || E.month,
        day: ((St = a.placeholderOverrides) == null ? void 0 : St.day) || E.day
      };
    }), re = computed(() => ({
      ...p.mergedErrors.value,
      ...m.value
    })), X = computed(() => {
      var Q;
      const oe = {
        ...((Q = p.mergedErrorParams) == null ? void 0 : Q.value) || {},
        ...{}
      };
      return Object.keys(oe).length > 0 ? oe : {};
    }), I = computed(() => Object.keys(re.value).length > 0);
    onBeforeMount(() => {
      if (!Ir(a.dateFormat) && a.calendar === "gregory") {
        const E = a.dateFormat, Z = xo(a.dateFormat);
        m.value.dateFormat = "format.invalid", console.warn(`日期格式 "${E}" 不正確，已自動修復為 "${Z}"`), T.value = Z;
      }
      if (a.showTime && !Or(a.timeFormat)) {
        const E = a.timeFormat, Z = Yo(a.timeFormat);
        m.value.timeFormat = "format.invalid", console.warn(`時間格式 "${E}" 不正確，已自動修復為 "${Z}"`), w.value = Z;
      }
    }), watch(() => a.theme, (E) => {
      E && D(E);
    }, { immediate: true }), watch(() => a.mode, (E) => {
      S(E);
    }, { immediate: true }), watch(() => a.locale, (E) => {
      E && n(E, a.customLocaleMessages);
    }, { immediate: true }), watch(() => a.customLocaleMessages, (E) => {
      E && a.locale && n(a.locale, E);
    }), watch(() => a.calendar, (E) => {
      me.isCalendarSupported(E) ? delete m.value.calendar : m.value.calendar = "calendar.unsupported";
    }, { immediate: true }), e({
      // 基本操作
      focus: p.focus,
      reset: p.reset,
      validate: p.validate,
      selectNow: p.selectNow,
      // 數據獲取
      getDateTime: () => p.internalDateTime.value,
      setDateTime: (E) => {
        p.setExternalValue(E);
      },
      // 主題控制
      setTheme: D,
      setDarkMode: () => S("dark"),
      setLightMode: () => S("light"),
      setAutoMode: () => S("auto"),
      getCurrentMode: () => k.value,
      isDarkMode: () => M.value,
      isLightMode: () => d.value,
      // 錯誤相關
      getErrors: () => re.value,
      hasErrors: () => I.value
    });
    const {
      // 狀態
      inputDateValue: R,
      inputTimeValue: $,
      showCalendar: H,
      internalDateTime: L,
      calendarMinDate: te,
      calendarMaxDate: ce,
      getValidDefaultTime: se,
      hasValue: C,
      // 事件處理
      validateDateInput: x,
      validateTimeInput: U,
      handleDateComplete: ee,
      handleTimeComplete: J,
      handleCalendarSelect: P,
      handleTimeSelect: K,
      handleContainerClick: ne,
      handleContainerMouseDown: De,
      handleNavigateToDate: V,
      // 日曆控制
      toggleCalendar: ae,
      // 清除功能
      reset: pe
    } = p;
    return (E, Z) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", mergeProps({
        class: ["date-picker-wrapper relative w-full", [unref(i), E.showTime ? "min-w-[300px]" : "min-w-[150px]"]]
      }, unref(b), {
        ref_key: "containerRef",
        ref: c
      }), [
        createBaseVNode("div", {
          class: normalizeClass(["date-picker-container flex w-full items-center px-2 py-1 bg-vdt-surface text-vdt-content rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": I.value }]])
        }, [
          B.value && E.inputEnabled ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["flex w-full items-center justify-start gap-2", [E.disabled ? "cursor-not-allowed cursor-event-none opacity-50" : ""]]),
            onClick: Z[2] || (Z[2] = withModifiers(
              //@ts-ignore
              (...oe) => unref(ne) && unref(ne)(...oe),
              ["stop"]
            )),
            onMousedown: Z[3] || (Z[3] = //@ts-ignore
            (...oe) => unref(De) && unref(De)(...oe))
          }, [
            createBaseVNode("div", null, [
              createVNode(ca, {
                ref_key: "dateInputRef",
                ref: y,
                modelValue: unref(R),
                "onUpdate:modelValue": Z[0] || (Z[0] = (oe) => isRef(R) ? R.value = oe : null),
                "year-placeholder": z.value.year,
                "month-placeholder": z.value.month,
                "day-placeholder": z.value.day,
                "min-date": v.value,
                "max-date": h.value,
                required: E.required,
                separator: E.dateSeparator,
                "date-format": A.value,
                onValidation: unref(x),
                onComplete: unref(ee)
              }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "required", "separator", "date-format", "onValidation", "onComplete"])
            ]),
            E.showTime ? (openBlock(), createElementBlock("div", ys, [
              createVNode(da, {
                ref_key: "timeInputRef",
                ref: f,
                modelValue: unref($),
                "onUpdate:modelValue": Z[1] || (Z[1] = (oe) => isRef($) ? $.value = oe : null),
                "hour-placeholder": z.value.hour,
                "minute-placeholder": z.value.minute,
                "second-placeholder": z.value.second,
                "enable-seconds": E.enableSeconds,
                use24Hour: E.use24Hour,
                required: E.required,
                locale: E.locale,
                useLocalizedPeriod: E.useLocalizedPeriod,
                onValidation: unref(U),
                onComplete: unref(J),
                onNavigateToDate: unref(V)
              }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "required", "locale", "useLocalizedPeriod", "onValidation", "onComplete", "onNavigateToDate"])
            ])) : createCommentVNode("", true)
          ], 34)) : (openBlock(), createElementBlock("button", {
            key: 1,
            type: "button",
            class: normalizeClass(["flex w-full h-full items-center justify-start gap-1", {
              "cursor-not-allowed opacity-50": E.disabled
            }]),
            onClick: Z[4] || (Z[4] = withModifiers((oe) => {
              var Q;
              return !E.disabled && ((Q = unref(ae)) == null ? void 0 : Q());
            }, ["stop"])),
            onKeydown: [
              Z[5] || (Z[5] = withKeys(withModifiers((oe) => {
                var Q;
                return !E.disabled && ((Q = unref(ae)) == null ? void 0 : Q());
              }, ["prevent"]), ["enter"])),
              Z[6] || (Z[6] = withKeys(withModifiers((oe) => {
                var Q;
                return !E.disabled && ((Q = unref(ae)) == null ? void 0 : Q());
              }, ["prevent"]), ["space"]))
            ]
          }, [
            _.value ? (openBlock(), createElementBlock("span", $s, toDisplayString(E.modelValue), 1)) : (openBlock(), createElementBlock("span", Ds, toDisplayString(z.value.selectDate), 1))
          ], 34)),
          createBaseVNode("div", {
            class: normalizeClass(["date-picker-icon-container relative group cursor-pointer", { "cursor-not-allowed": E.disabled }])
          }, [
            createBaseVNode("button", {
              type: "button",
              class: normalizeClass(["date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed", { "group-hover:opacity-0": unref(C) && !E.disabled && E.showClearButton }]),
              disabled: E.disabled,
              "aria-label": "開啟日曆",
              onClick: Z[7] || (Z[7] = withModifiers((oe) => {
                var Q;
                return (Q = unref(ae)) == null ? void 0 : Q();
              }, ["stop", "prevent"]))
            }, [
              createVNode(Ar, { class: "h-5 w-5" })
            ], 10, bs),
            unref(C) && !E.disabled && E.showClearButton ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100",
              "aria-label": "清除日期",
              onClick: Z[8] || (Z[8] = withModifiers(
                //@ts-ignore
                (...oe) => unref(pe) && unref(pe)(...oe),
                ["stop", "prevent"]
              ))
            }, [
              createVNode(Hr, { class: "h-4 w-4" })
            ])) : createCommentVNode("", true)
          ], 2)
        ], 2),
        unref(H) && !E.disabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref_key: "calendarRef",
          ref: g,
          class: "calendar-container absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10",
          onClick: Z[9] || (Z[9] = withModifiers(() => {
          }, ["stop"])),
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "date-picker"
        }, [
          createVNode(fa, {
            value: unref(L),
            weekStartsOn: E.weekStartsOn,
            "min-date": unref(te),
            "max-date": unref(ce),
            showTimeSelector: E.showTime,
            "time-value": unref($),
            use24Hour: E.use24Hour,
            "default-time": unref(se),
            enableSeconds: E.enableSeconds,
            locale: E.locale,
            calendar: E.calendar,
            onSelect: unref(P),
            onTimeSelect: unref(K)
          }, createSlots({ _: 2 }, [
            renderList(u.value, (oe, Q) => ({
              name: Q,
              fn: withCtx((ge) => [
                renderSlot(E.$slots, Q, normalizeProps(guardReactiveProps(ge)))
              ])
            }))
          ]), 1032, ["value", "weekStartsOn", "min-date", "max-date", "showTimeSelector", "time-value", "use24Hour", "default-time", "enableSeconds", "locale", "calendar", "onSelect", "onTimeSelect"])
        ], 512)) : createCommentVNode("", true)
      ], 16),
      E.showErrorMessage && I.value ? (openBlock(), createElementBlock("div", Ms, [
        renderSlot(E.$slots, "error", {
          errors: re.value,
          errorParams: X.value,
          hasErrors: I.value
        }, () => [
          createVNode(Pr, {
            errors: re.value,
            locale: E.locale,
            "use-i18n": E.useI18n,
            "custom-messages": E.customErrorMessages,
            errorParams: X.value
          }, createSlots({ _: 2 }, [
            renderList(E.$slots, (oe, Q) => ({
              name: Q,
              fn: withCtx((ge) => [
                renderSlot(E.$slots, Q, normalizeProps(guardReactiveProps(ge)))
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
    initialYear: { default: () => at().year },
    initialMonth: { default: () => at().month }
  },
  emits: ["range-select", "time-select"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, o = () => {
      if (a.rangeStart)
        return { year: a.rangeStart.year, month: a.rangeStart.month };
      if (a.initialYear && a.initialMonth)
        return { year: a.initialYear, month: a.initialMonth };
      const i = at();
      return { year: i.year, month: i.month };
    }, { year: l, month: s } = o(), u = ref(l), c = ref(s), g = computed(() => c.value === 12 ? u.value + 1 : u.value), y = computed(() => c.value === 12 ? 1 : c.value + 1), f = ref({
      isSelecting: false,
      tempStart: null
    });
    watch(() => [a.rangeStart, a.rangeEnd], ([i, b]) => {
      i && !a.initialYear && !a.initialMonth && (u.value = i.year, c.value = i.month), i && b ? (f.value.isSelecting = false, f.value.tempStart = null) : i && !b ? (f.value.isSelecting = true, f.value.tempStart = i) : (f.value.isSelecting = false, f.value.tempStart = null);
    }, { immediate: true, deep: true });
    const T = (i, b) => {
      if (!i) {
        f.value.isSelecting = false, f.value.tempStart = null, n("range-select", null, null);
        return;
      }
      if (!f.value.isSelecting)
        f.value.isSelecting = true, f.value.tempStart = i, n("range-select", i, null);
      else {
        const D = f.value.tempStart;
        if (D && (i.year !== D.year || i.month !== D.month || i.day !== D.day)) {
          f.value.isSelecting = false, f.value.tempStart = null;
          const S = D.year * 1e4 + D.month * 100 + D.day, k = i.year * 1e4 + i.month * 100 + i.day;
          S <= k ? n("range-select", D, i) : n("range-select", i, D);
        } else
          f.value.tempStart = i, n("range-select", i, null);
      }
    }, w = (i, b) => {
      n("time-select", i, b);
    };
    return e({
      // 獲取當前顯示的月份
      getCurrentDisplay: () => ({
        left: { year: u.value, month: c.value },
        right: { year: g.value, month: y.value }
      }),
      // 設置顯示月份
      setDisplayMonth: (i, b) => {
        u.value = i, c.value = b;
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
        c.value === 1 ? (c.value = 12, u.value -= 1) : c.value -= 1;
      },
      nextMonth: () => {
        c.value === 12 ? (c.value = 1, u.value += 1) : c.value += 1;
      }
    }), (i, b) => (openBlock(), createElementBlock("div", Ss, [
      createBaseVNode("div", ks, [
        createVNode(fa, {
          "range-start": i.rangeStart,
          "range-end": i.rangeEnd,
          "selection-mode": "range",
          year: u.value,
          month: c.value,
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
          onRangeSelect: T,
          onTimeSelect: b[0] || (b[0] = (D) => w(D, "start"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour", "default-time"])
      ]),
      createBaseVNode("div", ws, [
        createVNode(fa, {
          "range-start": i.rangeStart,
          "range-end": i.rangeEnd,
          "selection-mode": "range",
          year: g.value,
          month: y.value,
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
          onRangeSelect: T,
          onTimeSelect: b[1] || (b[1] = (D) => w(D, "end"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour", "default-time"])
      ])
    ]));
  }
});
var xt = "00:00:00";
var Yt = "23:59:59";
function xs(r = {}, e) {
  const {
    calendar: t = "gregory",
    modelValue: a = null,
    showTime: n = false,
    required: o = false,
    disabled: l = false,
    incomplete: s = false,
    dateFormat: u = "YYYY-MM-DD",
    timeFormat: c = "HH:mm:ss",
    outputType: g = "iso",
    useStrictISO: y = false,
    enableSeconds: f = false,
    minDate: T,
    maxDate: w,
    maxRange: m,
    minRange: p,
    locale: i = "zh-TW"
  } = r, {
    containerRef: b,
    calendarRef: D,
    startDateInputRef: S,
    endDateInputRef: k,
    startTimeInputRef: M,
    endTimeInputRef: d
  } = e, v = ref(l);
  let h = {};
  const A = ha({
    required: o,
    showTime: n,
    minDate: T,
    maxDate: w,
    dateFormat: u
  }), B = ha({
    required: o,
    showTime: n,
    minDate: T,
    maxDate: w,
    dateFormat: u
  }), _ = va({
    showTime: n,
    dateFormat: u,
    timeFormat: c,
    outputType: g,
    defaultTime: xt,
    enableSeconds: f
  }), z = va({
    showTime: n,
    dateFormat: u,
    timeFormat: c,
    outputType: g,
    defaultTime: Yt,
    enableSeconds: f
  }), re = qr(
    b,
    D,
    { disabled: v }
  ), X = ma(
    { dateInputRef: S, timeInputRef: M },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), I = ma(
    { dateInputRef: k, timeInputRef: d },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), R = computed(
    () => _.hasValue.value || z.hasValue.value
  ), $ = computed(() => {
    const O = {
      ...A.mergedErrors.value,
      ...B.mergedErrors.value
    };
    return _.internalDateTime.value && !z.internalDateTime.value && s && (O["range.endRequired"] = "range.endRequired"), O;
  }), H = computed(() => ({
    ...A.mergedErrorParams.value,
    ...B.mergedErrorParams.value
  })), L = computed(() => Object.keys($.value).length > 0), te = computed(() => {
    const O = _.internalDateTime.value, G = z.internalDateTime.value;
    if (!O || !G || Wt(O, G) > 0) return false;
    if (m || p) {
      const le = ar(O, G);
      if (m && le > m)
        return B.handleDateValidation(false, {
          range: "range.exceedsMaxRange"
        }, "endDate", {
          range: { maxRange: m, actualDays: le }
        }), false;
      if (p && le < p)
        return B.handleDateValidation(false, {
          range: "range.belowMinRange"
        }, "endDate", {
          range: { minRange: p, actualDays: le }
        }), false;
      B.clearFieldErrors("range");
    }
    return !L.value;
  }), ce = computed(() => [
    {
      label: "今天",
      getValue: () => {
        const O = Ge();
        return {
          start: qe(O.year, O.month, O.day, 0, 0, 0),
          end: qe(O.year, O.month, O.day, 23, 59, 59)
        };
      }
    },
    {
      label: "最近7天",
      getValue: () => ({
        start: ia(Ge(), -6),
        end: Ge()
      })
    },
    {
      label: "最近30天",
      getValue: () => ({
        start: ia(Ge(), -29),
        end: Ge()
      })
    },
    {
      label: "本月",
      getValue: wo
    }
  ]), se = computed(() => ({
    minDate: ye(T, i),
    maxDate: z.internalDateTime.value || ye(w, i)
  })), C = computed(() => ({
    minDate: _.internalDateTime.value || ye(T, i),
    maxDate: ye(w, i)
  })), x = computed(() => ({
    minDate: se.value.minDate ? Re(se.value.minDate, u) : null,
    maxDate: se.value.maxDate ? Re(se.value.maxDate, u) : null
  })), U = computed(() => ({
    minDate: C.value.minDate ? Re(C.value.minDate, u) : null,
    maxDate: C.value.maxDate ? Re(C.value.maxDate, u) : null
  }));
  function ee(O, G) {
    const le = ar(O, G);
    return m && le > m ? {
      valid: false,
      error: "range.exceedsMaxRange",
      params: { maxRange: m, actualDays: le }
    } : p && le < p ? {
      valid: false,
      error: "range.belowMinRange",
      params: { minRange: p, actualDays: le }
    } : { valid: true };
  }
  function J(O) {
    !O.error || !O.params || B.handleDateValidation(
      false,
      { range: O.error },
      "endDate",
      { range: O.params }
    );
  }
  function P() {
    var we, kt, it, xa, Ya;
    if (!_.internalDateTime.value || !z.internalDateTime.value) {
      (we = h.update) == null || we.call(h, null), (kt = h.change) == null || kt.call(h, null);
      return;
    }
    const O = n ? `${u} ${c}` : u, G = {
      start: zt(
        _.internalDateTime.value,
        g,
        O,
        n,
        t,
        i,
        y
      ),
      end: zt(
        z.internalDateTime.value,
        g,
        O,
        n,
        t,
        i,
        y
      )
    };
    (it = h.update) == null || it.call(h, G), (xa = h.change) == null || xa.call(h, G);
    const le = te.value && !L.value;
    (Ya = h.validation) == null || Ya.call(h, le, $.value, H.value);
  }
  function K(O, G) {
    G.forEach((le) => O.clearFieldErrors(le));
  }
  const ne = (O) => {
    h = O;
  }, De = (O, G, le, we, kt) => {
    var it;
    le.handleDateValidation(O, G, we, kt), (it = h.validation) == null || it.call(h, !L.value, $.value, H.value);
  }, V = (O, G, le) => {
    De(O, G, A, "startDate", le);
  }, ae = (O, G, le) => {
    De(O, G, B, "endDate", le);
  }, pe = (O, G, le = {}) => {
    var we;
    A.handleTimeValidation(O, G, "startTime", le), (we = h.validation) == null || we.call(h, !L.value, $.value);
  }, E = (O, G, le = {}) => {
    var we;
    B.handleTimeValidation(O, G, "endTime", le), (we = h.validation) == null || we.call(h, !L.value, $.value, H.value);
  }, Z = (O) => {
    _.inputDateValue.value = O;
    const G = _.updateFromInputs();
    if (!G) {
      A.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    A.validateDateRange(G) && (X.autoFocusTimeAfterDateComplete(
      _,
      xt
    ), P(), K(A, ["startDate", "date.year", "date.month", "date.day"]), n || I.focusFirstInput());
  }, oe = (O) => {
    z.inputDateValue.value = O;
    const G = z.updateFromInputs();
    if (!G) {
      B.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    B.validateDateRange(G) && (I.autoFocusTimeAfterDateComplete(
      z,
      Yt
    ), P(), K(B, ["endDate", "date.year", "date.month", "date.day"]));
  }, Q = (O) => {
    _.inputTimeValue.value = O, _.updateFromInputs() && P(), K(A, ["startTime", "time.hour", "time.minute", "time.second"]);
  }, ge = (O) => {
    z.inputTimeValue.value = O, z.updateFromInputs() && P(), K(B, ["endTime", "time.hour", "time.minute", "time.second"]);
  }, Pe = (O, G) => {
    O && !G ? Mt(O) : O && G ? St(O, G) : _t(), P();
  };
  function Mt(O) {
    A.validateDateRange(O) && (_.setInternalDateTime(O), K(A, ["startDate", "date.year", "date.month", "date.day"]), z.clearValues());
  }
  function St(O, G) {
    if (!(!A.validateDateRange(O) || !B.validateDateRange(G))) {
      if (m || p) {
        const le = ee(O, G);
        if (!le.valid) {
          J(le);
          return;
        }
      }
      _.setInternalDateTime(O), z.setInternalDateTime(G), n && (_.inputTimeValue.value || (_.inputTimeValue.value = xt, _.updateFromInputs()), z.inputTimeValue.value || (z.inputTimeValue.value = Yt, z.updateFromInputs())), K(A, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]), K(B, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]);
    }
  }
  const Wr = (O, G) => {
    G === "start" && _.internalDateTime.value && Q(O), G === "end" && z.internalDateTime.value && ge(O);
  }, jr = (O) => {
    const G = O.getValue();
    _.setInternalDateTime(G.start), z.setInternalDateTime(G.end), n && (_.inputTimeValue.value || (_.inputTimeValue.value = xt, _.updateFromInputs()), z.inputTimeValue.value || (z.inputTimeValue.value = Yt, z.updateFromInputs())), P();
  }, _t = () => {
    _.clearValues(), z.clearValues(), A.clearAllErrors(), B.clearAllErrors(), P();
  }, Jr = (O) => {
    O ? (_.setExternalValue(O.start), z.setExternalValue(O.end)) : _t(), P();
  }, _r = () => {
    var O, G, le, we;
    return (O = S.value) == null || O.validate(), (G = k.value) == null || G.validate(), n && ((le = M.value) == null || le.validate(), (we = d.value) == null || we.validate()), te.value;
  }, Kr = (O) => {
    re.handleContainerClick(O, () => {
      X.focusFirstInput();
    });
  }, Qr = (O) => {
    re.handleContainerClick(O, () => {
      I.focusFirstInput();
    });
  };
  return watch(() => a, (O) => {
    if (O && (O.start || O.end)) {
      const G = O.start ? ye(O.start, i, t) : null, le = O.end ? ye(O.end, i, t) : null;
      if (O.start && !G && (console.warn(`Invalid start date provided: ${O.start}`), A.handleDateValidation(false, { date: "date.invalid" }, "startDate")), O.end && !le && (console.warn(`Invalid end date provided: ${O.end}`), B.handleDateValidation(false, { date: "date.invalid" }, "endDate")), G && le && Wt(G, le) > 0) {
        console.warn("Initial date range has start > end, auto-swapping values"), _.setExternalValue(O.end), z.setExternalValue(O.start), setTimeout(() => {
          P();
        }, 0);
        return;
      }
      _.setExternalValue(G ? O.start : null), z.setExternalValue(le ? O.end : null);
    } else
      _.clearValues(), z.clearValues();
  }, { immediate: true }), {
    // 狀態
    isDisabled: v,
    startDateConstraints: se,
    endDateConstraints: C,
    startDateConstraintsStr: x,
    endDateConstraintsStr: U,
    // 驗證相關
    hasErrors: L,
    mergedErrors: $,
    mergedErrorParams: H,
    isValidRange: te,
    // 日期時間值
    startDateTime: _,
    endDateTime: z,
    // 顯示值
    hasRangeValue: R,
    // 日曆相關
    ...re,
    // 快捷選項
    shortcuts: ce,
    // 事件設置
    setEmitters: ne,
    // 驗證事件處理
    handleStartDateValidation: V,
    handleEndDateValidation: ae,
    handleStartTimeValidation: pe,
    handleEndTimeValidation: E,
    // 完成事件處理
    handleStartDateComplete: Z,
    handleEndDateComplete: oe,
    handleStartTimeComplete: Q,
    handleEndTimeComplete: ge,
    // 日曆事件處理
    handleCalendarRangeSelect: Pe,
    handleTimeSelect: Wr,
    // 導航事件處理
    handleStartNavigateToDate: X.handleNavigateToDate,
    handleEndNavigateToDate: I.handleNavigateToDate,
    // 主要操作
    applyShortcut: jr,
    clearRange: _t,
    setRange: Jr,
    validate: _r,
    // 導航方法
    focusStartDate: Kr,
    focusEndDate: Qr
  };
}
var Ys = ["disabled"];
var Cs = { class: "flex-1 text-center whitespace-nowrap" };
var Rs = {
  key: 0,
  class: "text-vdt-content text-sm"
};
var Es = {
  key: 1,
  class: "text-vdt-content-muted text-sm"
};
var Is = {
  class: "text-vdt-content-muted text-sm px-1",
  "aria-label": "日期範圍分隔符",
  "data-testid": "separator"
};
var Os = { class: "flex-1 text-center whitespace-nowrap" };
var Vs = {
  key: 0,
  class: "text-vdt-content text-sm"
};
var Fs = {
  key: 1,
  class: "text-vdt-content-muted text-sm"
};
var Ps = ["disabled"];
var As = ["title"];
var Ls = { class: "p-2 space-y-2" };
var Bs = {
  key: 0,
  class: "w-full flex flex-col md:flex-row flex-justify-between gap-2"
};
var Hs = {
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
var Ws = { key: 2 };
var js = { class: "flex flex-wrap gap-2" };
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
    timeFormat: { default: "HH:mm:ss" },
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
    const a = r, n = t, o = ref(null), l = ref(null), s = ref(null), u = ref(null), c = ref(null), g = ref(null), y = ref({}), f = xs(
      {
        calendar: a.calendar,
        modelValue: a.modelValue,
        showTime: a.showTime,
        required: a.required,
        disabled: a.disabled,
        dateFormat: a.dateFormat,
        timeFormat: a.timeFormat,
        outputType: a.outputType,
        useStrictISO: a.useStrictISO,
        enableSeconds: a.enableSeconds,
        minDate: a.minDate,
        maxDate: a.maxDate,
        maxRange: a.maxRange,
        minRange: a.minRange,
        incomplete: a.incomplete
      },
      {
        containerRef: o,
        calendarRef: l,
        startDateInputRef: s,
        endDateInputRef: u,
        startTimeInputRef: c,
        endTimeInputRef: g
      }
    ), { setLocale: T, getPlaceholderMessage: w } = bt(a.locale);
    f.setEmitters({
      update: (V) => n("update:modelValue", V),
      change: (V) => n("change", V),
      validation: (V, ae, pe) => n("validation", V, ae, pe)
    });
    const {
      themeClasses: m,
      containerAttributes: p,
      setColor: i,
      setMode: b
    } = zr(), D = computed(() => {
      var ae, pe, E, Z, oe, Q, ge, Pe;
      const V = {
        start: w("range.start"),
        end: w("range.end"),
        year: w("date.year"),
        month: w("date.month"),
        day: w("date.day"),
        hour: w("time.hour"),
        minute: w("time.minute"),
        second: w("time.second")
      };
      return {
        start: ((ae = a.placeholderOverrides) == null ? void 0 : ae.start) || V.start,
        end: ((pe = a.placeholderOverrides) == null ? void 0 : pe.end) || V.end,
        // 時間相關
        hour: ((E = a.placeholderOverrides) == null ? void 0 : E.hour) || V.hour,
        minute: ((Z = a.placeholderOverrides) == null ? void 0 : Z.minute) || V.minute,
        second: ((oe = a.placeholderOverrides) == null ? void 0 : oe.second) || V.second,
        // 日期相關
        year: ((Q = a.placeholderOverrides) == null ? void 0 : Q.year) || V.year,
        month: ((ge = a.placeholderOverrides) == null ? void 0 : ge.month) || V.month,
        day: ((Pe = a.placeholderOverrides) == null ? void 0 : Pe.day) || V.day
      };
    }), S = computed(() => a.dateFormat), k = computed(() => ({
      ...f.mergedErrors.value,
      ...y.value
    })), M = computed(() => Object.keys(re.value).length > 0);
    watch(() => a.theme, (V) => {
      V && i(V);
    }, { immediate: true }), watch(() => a.mode, (V) => {
      b(V);
    }, { immediate: true }), watch(() => a.locale, (V) => {
      V && T(V);
    }, { immediate: true }), watch(() => a.calendar, (V) => {
      me.isCalendarSupported(V) ? delete y.value.calendar : y.value.calendar = "calendar.unsupported";
    }, { immediate: true }), onBeforeMount(() => {
      T(a.locale);
    }), e({
      // 基本操作
      reset: f.clearRange,
      validate: f.validate,
      setRange: f.setRange,
      // 聚焦方法
      focusStartDate: f.focusStartDate,
      focusEndDate: f.focusEndDate,
      // 主題控制
      setTheme: i,
      setDarkMode: () => b("dark"),
      setLightMode: () => b("light"),
      setAutoMode: () => b("auto"),
      // 錯誤相關
      getErrors: () => re.value,
      hasErrors: () => M.value
    });
    const {
      // 狀態
      showCalendar: d,
      startDateConstraintsStr: v,
      endDateConstraintsStr: h,
      shortcuts: A,
      startDateTime: B,
      endDateTime: _,
      hasRangeValue: z,
      mergedErrors: re,
      mergedErrorParams: X,
      // 事件處理方法
      handleStartDateValidation: I,
      handleEndDateValidation: R,
      handleStartTimeValidation: $,
      handleEndTimeValidation: H,
      handleStartDateComplete: L,
      handleEndDateComplete: te,
      handleStartTimeComplete: ce,
      handleEndTimeComplete: se,
      handleCalendarRangeSelect: C,
      handleStartNavigateToDate: x,
      handleEndNavigateToDate: U,
      handleTimeSelect: ee,
      // 操作方法
      toggleCalendar: J,
      applyShortcut: P,
      clearRange: K,
      focusStartDate: ne,
      focusEndDate: De
    } = f;
    return (V, ae) => {
      var pe, E, Z, oe;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", mergeProps({
          class: ["date-range-wrapper md:min-w-auto relative w-full", [unref(m), V.showTime ? "min-w-[300px]" : "min-w-[200px]"]]
        }, unref(p), {
          ref_key: "containerRef",
          ref: o
        }), [
          createBaseVNode("div", {
            class: normalizeClass(["date-picker-container flex w-full items-center px-2 py-1 rounded-sm transition-all duration-200 bg-vdt-surface text-vdt-content disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": M.value }]])
          }, [
            createBaseVNode("button", {
              type: "button",
              class: "flex items-center gap-1 flex-1 cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
              disabled: V.disabled,
              onClick: ae[0] || (ae[0] = //@ts-ignore
              (...Q) => unref(J) && unref(J)(...Q)),
              "aria-label": "選擇日期範圍"
            }, [
              createBaseVNode("div", Cs, [
                (pe = V.modelValue) != null && pe.start ? (openBlock(), createElementBlock("span", Rs, toDisplayString((E = V.modelValue) == null ? void 0 : E.start), 1)) : (openBlock(), createElementBlock("span", Es, toDisplayString(D.value.start), 1))
              ]),
              createBaseVNode("div", Is, toDisplayString(V.separator), 1),
              createBaseVNode("div", Os, [
                (Z = V.modelValue) != null && Z.end ? (openBlock(), createElementBlock("span", Vs, toDisplayString((oe = V.modelValue) == null ? void 0 : oe.end), 1)) : (openBlock(), createElementBlock("span", Fs, toDisplayString(D.value.end), 1))
              ])
            ], 8, Ys),
            createBaseVNode("div", {
              class: normalizeClass(["date-picker-icon-container relative group cursor-pointer", { "cursor-not-allowed": V.disabled }])
            }, [
              createBaseVNode("button", {
                type: "button",
                "aria-label": "開啟日曆",
                class: normalizeClass(["date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed", { "group-hover:opacity-0": unref(z) && !V.disabled && V.showClearButton }]),
                disabled: V.disabled,
                onClick: ae[1] || (ae[1] = withModifiers((Q) => {
                  var ge;
                  return (ge = unref(J)) == null ? void 0 : ge();
                }, ["stop", "prevent"]))
              }, [
                createVNode(Ar, { class: "h-5 w-5" })
              ], 10, Ps),
              unref(z) && !V.disabled && V.showClearButton ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                "aria-label": "清除日期",
                class: "date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100",
                onClick: ae[2] || (ae[2] = withModifiers(
                  //@ts-ignore
                  (...Q) => unref(K) && unref(K)(...Q),
                  ["stop"]
                )),
                title: "清除日期" + (V.showTime ? "時間" : "")
              }, [
                createVNode(Hr, { class: "h-4 w-4" })
              ], 8, As)) : createCommentVNode("", true)
            ], 2)
          ], 2),
          unref(d) && !V.disabled ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "calendarRef",
            ref: l,
            class: "absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10 overflow-auto md:min-w-[570px]",
            onClick: ae[9] || (ae[9] = withModifiers(() => {
            }, ["stop"])),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "date-range-picker"
          }, [
            createBaseVNode("div", Ls, [
              V.inputEnabled ? (openBlock(), createElementBlock("div", Bs, [
                createBaseVNode("div", {
                  "data-testid": "start-date-inputs",
                  "aria-label": "開始日期輸入區域",
                  onClick: ae[5] || (ae[5] = withModifiers(
                    //@ts-ignore
                    (...Q) => unref(ne) && unref(ne)(...Q),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center px-2 py-1 gap-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  createVNode(ca, {
                    ref_key: "startDateInputRef",
                    ref: s,
                    modelValue: unref(B).inputDateValue.value,
                    "onUpdate:modelValue": ae[3] || (ae[3] = (Q) => unref(B).inputDateValue.value = Q),
                    "year-placeholder": D.value.year,
                    "month-placeholder": D.value.month,
                    "day-placeholder": D.value.day,
                    "max-date": unref(v).maxDate,
                    "min-date": unref(v).minDate,
                    "date-format": S.value,
                    onValidation: unref(I),
                    onComplete: unref(L)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "max-date", "min-date", "date-format", "onValidation", "onComplete"]),
                  V.showTime ? (openBlock(), createElementBlock("div", Hs, [
                    createVNode(da, {
                      ref_key: "startTimeInputRef",
                      ref: c,
                      modelValue: unref(B).inputTimeValue.value,
                      "onUpdate:modelValue": ae[4] || (ae[4] = (Q) => unref(B).inputTimeValue.value = Q),
                      "hour-placeholder": D.value.hour,
                      "minute-placeholder": D.value.minute,
                      "second-placeholder": D.value.second,
                      "enable-seconds": V.enableSeconds,
                      use24Hour: V.use24Hour,
                      locale: V.locale,
                      onValidation: unref($),
                      onComplete: unref(ce),
                      onNavigateToDate: unref(x)
                    }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", {
                  "data-testid": "end-date-inputs",
                  "aria-label": "結束日期輸入區域",
                  onClick: ae[8] || (ae[8] = withModifiers(
                    //@ts-ignore
                    (...Q) => unref(De) && unref(De)(...Q),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center gap-2 px-2 py-1 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  createVNode(ca, {
                    ref_key: "endDateInputRef",
                    ref: u,
                    modelValue: unref(_).inputDateValue.value,
                    "onUpdate:modelValue": ae[6] || (ae[6] = (Q) => unref(_).inputDateValue.value = Q),
                    "year-placeholder": D.value.year,
                    "month-placeholder": D.value.month,
                    "day-placeholder": D.value.day,
                    "min-date": unref(h).minDate,
                    "max-date": unref(h).maxDate,
                    "date-format": S.value,
                    onValidation: unref(R),
                    onComplete: unref(te)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "date-format", "onValidation", "onComplete"]),
                  V.showTime ? (openBlock(), createElementBlock("div", qs, [
                    createVNode(da, {
                      ref_key: "endTimeInputRef",
                      ref: g,
                      modelValue: unref(_).inputTimeValue.value,
                      "onUpdate:modelValue": ae[7] || (ae[7] = (Q) => unref(_).inputTimeValue.value = Q),
                      "hour-placeholder": D.value.hour,
                      "minute-placeholder": D.value.minute,
                      "second-placeholder": D.value.second,
                      "enable-seconds": V.enableSeconds,
                      use24Hour: V.use24Hour,
                      locale: V.locale,
                      onValidation: unref(H),
                      onComplete: unref(se),
                      onNavigateToDate: unref(U)
                    }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              unref(A).length > 0 && V.showShortcuts ? (openBlock(), createElementBlock("div", Ns, [
                createBaseVNode("div", Us, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(A), (Q) => (openBlock(), createElementBlock("button", {
                    key: Q.label,
                    type: "button",
                    "aria-label": `選擇${Q.label}範圍`,
                    "data-testid": `shortcut-${Q.label.toLowerCase().replace(/\s+/g, "-")}`,
                    class: "px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors",
                    onClick: (ge) => unref(P)(Q)
                  }, toDisplayString(Q.label), 9, zs))), 128)),
                  renderSlot(V.$slots, "shortcuts", {
                    applyShortcut: unref(P),
                    shortcuts: unref(A),
                    currentRange: V.modelValue
                  })
                ])
              ])) : V.$slots.shortcuts && V.showShortcuts ? (openBlock(), createElementBlock("div", Ws, [
                createBaseVNode("div", js, [
                  renderSlot(V.$slots, "shortcuts", {
                    applyShortcut: unref(P),
                    shortcuts: unref(A),
                    currentRange: V.modelValue
                  })
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", Js, [
                createVNode(Ts, {
                  showTimeSelector: V.showTime,
                  calendar: V.calendar,
                  "range-start": unref(B).internalDateTime.value,
                  "range-end": unref(_).internalDateTime.value,
                  enableSeconds: V.enableSeconds,
                  use24Hour: V.use24Hour,
                  locale: V.locale,
                  "week-starts-on": V.weekStartsOn,
                  "start-time-value": unref(B).inputTimeValue.value,
                  "end-time-value": unref(_).inputTimeValue.value,
                  "min-date": unref(ye)(V.minDate),
                  "max-date": unref(ye)(V.maxDate),
                  onRangeSelect: unref(C),
                  onTimeSelect: unref(ee)
                }, null, 8, ["showTimeSelector", "calendar", "range-start", "range-end", "enableSeconds", "use24Hour", "locale", "week-starts-on", "start-time-value", "end-time-value", "min-date", "max-date", "onRangeSelect", "onTimeSelect"])
              ])
            ])
          ], 512)) : createCommentVNode("", true)
        ], 16),
        V.showErrorMessage && M.value ? (openBlock(), createElementBlock("div", _s, [
          renderSlot(V.$slots, "error", {
            errors: k.value,
            hasErrors: M.value
          }, () => [
            createVNode(Pr, {
              errors: unref(re),
              locale: V.locale,
              "use-i18n": V.useI18n,
              "custom-messages": V.customErrorMessages,
              errorParams: unref(X)
            }, createSlots({ _: 2 }, [
              renderList(V.$slots, (Q, ge) => ({
                name: ge,
                fn: withCtx((Pe) => [
                  renderSlot(V.$slots, ge, normalizeProps(guardReactiveProps(Pe)))
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
    r.component("VueDatepicker", lr), r.component("DatePicker", lr), r.component("DateRange", Ks);
  }
};
export {
  lr as DatePicker,
  Ks as DateRange,
  Vr as RocFormatPlugin,
  di as VueDatepicker,
  di as default
};
//# sourceMappingURL=@tiaohsun_vue-datepicker.js.map
