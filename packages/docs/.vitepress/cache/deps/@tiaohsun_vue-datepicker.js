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
var _r = Object.defineProperty;
var Kr = (r, e, t) => e in r ? _r(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
var De = (r, e, t) => Kr(r, typeof e != "symbol" ? e + "" : e, t);
function yt(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Et = { exports: {} };
var Xr = Et.exports;
var Ea;
function en() {
  return Ea || (Ea = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(Xr, function() {
      var t = "minute", a = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
      return function(o, l, s) {
        var i = l.prototype;
        s.utc = function(h) {
          var f = { date: h, utc: true, args: arguments };
          return new l(f);
        }, i.utc = function(h) {
          var f = s(this.toDate(), { locale: this.$L, utc: true });
          return h ? f.add(this.utcOffset(), t) : f;
        }, i.local = function() {
          return s(this.toDate(), { locale: this.$L, utc: false });
        };
        var c = i.parse;
        i.parse = function(h) {
          h.utc && (this.$u = true), this.$utils().u(h.$offset) || (this.$offset = h.$offset), c.call(this, h);
        };
        var v = i.init;
        i.init = function() {
          if (this.$u) {
            var h = this.$d;
            this.$y = h.getUTCFullYear(), this.$M = h.getUTCMonth(), this.$D = h.getUTCDate(), this.$W = h.getUTCDay(), this.$H = h.getUTCHours(), this.$m = h.getUTCMinutes(), this.$s = h.getUTCSeconds(), this.$ms = h.getUTCMilliseconds();
          } else v.call(this);
        };
        var p = i.utcOffset;
        i.utcOffset = function(h, f) {
          var d = this.$utils().u;
          if (d(h)) return this.$u ? 0 : d(this.$offset) ? p.call(this) : this.$offset;
          if (typeof h == "string" && (h = function(S) {
            S === void 0 && (S = "");
            var T = S.match(a);
            if (!T) return null;
            var u = ("" + T[0]).match(n) || ["-", 0, 0], y = u[0], $ = 60 * +u[1] + +u[2];
            return $ === 0 ? 0 : y === "+" ? $ : -$;
          }(h), h === null)) return this;
          var b = Math.abs(h) <= 16 ? 60 * h : h, g = this;
          if (f) return g.$offset = b, g.$u = h === 0, g;
          if (h !== 0) {
            var x = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (g = this.local().add(b + x, t)).$offset = b, g.$x.$localOffset = x;
          } else g = this.utc();
          return g;
        };
        var m = i.format;
        i.format = function(h) {
          var f = h || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return m.call(this, f);
        }, i.valueOf = function() {
          var h = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * h;
        }, i.isUTC = function() {
          return !!this.$u;
        }, i.toISOString = function() {
          return this.toDate().toISOString();
        }, i.toString = function() {
          return this.toDate().toUTCString();
        };
        var w = i.toDate;
        i.toDate = function(h) {
          return h === "s" && this.$offset ? s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : w.call(this);
        };
        var M = i.diff;
        i.diff = function(h, f, d) {
          if (h && this.$u === h.$u) return M.call(this, h, f, d);
          var b = this.local(), g = s(h).local();
          return M.call(b, g, f, d);
        };
      };
    });
  }(Et)), Et.exports;
}
var tn = en();
var an = yt(tn);
var It = { exports: {} };
var rn = It.exports;
var Ia;
function nn() {
  return Ia || (Ia = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(rn, function() {
      var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, a = {};
      return function(n, o, l) {
        var s, i = function(m, w, M) {
          M === void 0 && (M = {});
          var h = new Date(m), f = function(d, b) {
            b === void 0 && (b = {});
            var g = b.timeZoneName || "short", x = d + "|" + g, S = a[x];
            return S || (S = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: d, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: g }), a[x] = S), S;
          }(w, M);
          return f.formatToParts(h);
        }, c = function(m, w) {
          for (var M = i(m, w), h = [], f = 0; f < M.length; f += 1) {
            var d = M[f], b = d.type, g = d.value, x = t[b];
            x >= 0 && (h[x] = parseInt(g, 10));
          }
          var S = h[3], T = S === 24 ? 0 : S, u = h[0] + "-" + h[1] + "-" + h[2] + " " + T + ":" + h[4] + ":" + h[5] + ":000", y = +m;
          return (l.utc(u).valueOf() - (y -= y % 1e3)) / 6e4;
        }, v = o.prototype;
        v.tz = function(m, w) {
          m === void 0 && (m = s);
          var M, h = this.utcOffset(), f = this.toDate(), d = f.toLocaleString("en-US", { timeZone: m }), b = Math.round((f - new Date(d)) / 1e3 / 60), g = 15 * -Math.round(f.getTimezoneOffset() / 15) - b;
          if (!Number(g)) M = this.utcOffset(0, w);
          else if (M = l(d, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(g, true), w) {
            var x = M.utcOffset();
            M = M.add(h - x, "minute");
          }
          return M.$x.$timezone = m, M;
        }, v.offsetName = function(m) {
          var w = this.$x.$timezone || l.tz.guess(), M = i(this.valueOf(), w, { timeZoneName: m }).find(function(h) {
            return h.type.toLowerCase() === "timezonename";
          });
          return M && M.value;
        };
        var p = v.startOf;
        v.startOf = function(m, w) {
          if (!this.$x || !this.$x.$timezone) return p.call(this, m, w);
          var M = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return p.call(M, m, w).tz(this.$x.$timezone, true);
        }, l.tz = function(m, w, M) {
          var h = M && w, f = M || w || s, d = c(+l(), f);
          if (typeof m != "string") return l(m).tz(f);
          var b = function(T, u, y) {
            var $ = T - 60 * u * 1e3, U = c($, y);
            if (u === U) return [$, u];
            var q = c($ -= 60 * (U - u) * 1e3, y);
            return U === q ? [$, U] : [T - 60 * Math.min(U, q) * 1e3, Math.max(U, q)];
          }(l.utc(m, h).valueOf(), d, f), g = b[0], x = b[1], S = l(g).utcOffset(x);
          return S.$x.$timezone = f, S;
        }, l.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, l.tz.setDefault = function(m) {
          s = m;
        };
      };
    });
  }(It)), It.exports;
}
var on = nn();
var ln = yt(on);
var Ot = { exports: {} };
var sn = Ot.exports;
var Oa;
function un() {
  return Oa || (Oa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(sn, function() {
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, a = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, o = /\d\d/, l = /\d\d?/, s = /\d*[^-_:/,()\s\d]+/, i = {}, c = function(f) {
        return (f = +f) + (f > 68 ? 1900 : 2e3);
      }, v = function(f) {
        return function(d) {
          this[f] = +d;
        };
      }, p = [/[+-]\d\d:?(\d\d)?|Z/, function(f) {
        (this.zone || (this.zone = {})).offset = function(d) {
          if (!d || d === "Z") return 0;
          var b = d.match(/([+-]|\d\d)/g), g = 60 * b[1] + (+b[2] || 0);
          return g === 0 ? 0 : b[0] === "+" ? -g : g;
        }(f);
      }], m = function(f) {
        var d = i[f];
        return d && (d.indexOf ? d : d.s.concat(d.f));
      }, w = function(f, d) {
        var b, g = i.meridiem;
        if (g) {
          for (var x = 1; x <= 24; x += 1) if (f.indexOf(g(x, 0, d)) > -1) {
            b = x > 12;
            break;
          }
        } else b = f === (d ? "pm" : "PM");
        return b;
      }, M = { A: [s, function(f) {
        this.afternoon = w(f, false);
      }], a: [s, function(f) {
        this.afternoon = w(f, true);
      }], Q: [n, function(f) {
        this.month = 3 * (f - 1) + 1;
      }], S: [n, function(f) {
        this.milliseconds = 100 * +f;
      }], SS: [o, function(f) {
        this.milliseconds = 10 * +f;
      }], SSS: [/\d{3}/, function(f) {
        this.milliseconds = +f;
      }], s: [l, v("seconds")], ss: [l, v("seconds")], m: [l, v("minutes")], mm: [l, v("minutes")], H: [l, v("hours")], h: [l, v("hours")], HH: [l, v("hours")], hh: [l, v("hours")], D: [l, v("day")], DD: [o, v("day")], Do: [s, function(f) {
        var d = i.ordinal, b = f.match(/\d+/);
        if (this.day = b[0], d) for (var g = 1; g <= 31; g += 1) d(g).replace(/\[|\]/g, "") === f && (this.day = g);
      }], w: [l, v("week")], ww: [o, v("week")], M: [l, v("month")], MM: [o, v("month")], MMM: [s, function(f) {
        var d = m("months"), b = (m("monthsShort") || d.map(function(g) {
          return g.slice(0, 3);
        })).indexOf(f) + 1;
        if (b < 1) throw new Error();
        this.month = b % 12 || b;
      }], MMMM: [s, function(f) {
        var d = m("months").indexOf(f) + 1;
        if (d < 1) throw new Error();
        this.month = d % 12 || d;
      }], Y: [/[+-]?\d+/, v("year")], YY: [o, function(f) {
        this.year = c(f);
      }], YYYY: [/\d{4}/, v("year")], Z: p, ZZ: p };
      function h(f) {
        var d, b;
        d = f, b = i && i.formats;
        for (var g = (f = d.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(U, q, _) {
          var z = _ && _.toUpperCase();
          return q || b[_] || t[_] || b[z].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(re, G, O) {
            return G || O.slice(1);
          });
        })).match(a), x = g.length, S = 0; S < x; S += 1) {
          var T = g[S], u = M[T], y = u && u[0], $ = u && u[1];
          g[S] = $ ? { regex: y, parser: $ } : T.replace(/^\[|\]$/g, "");
        }
        return function(U) {
          for (var q = {}, _ = 0, z = 0; _ < x; _ += 1) {
            var re = g[_];
            if (typeof re == "string") z += re.length;
            else {
              var G = re.regex, O = re.parser, E = U.slice(z), D = G.exec(E)[0];
              O.call(q, D), U = U.replace(D, "");
            }
          }
          return function(P) {
            var A = P.afternoon;
            if (A !== void 0) {
              var te = P.hours;
              A ? te < 12 && (P.hours += 12) : te === 12 && (P.hours = 0), delete P.afternoon;
            }
          }(q), q;
        };
      }
      return function(f, d, b) {
        b.p.customParseFormat = true, f && f.parseTwoDigitYear && (c = f.parseTwoDigitYear);
        var g = d.prototype, x = g.parse;
        g.parse = function(S) {
          var T = S.date, u = S.utc, y = S.args;
          this.$u = u;
          var $ = y[1];
          if (typeof $ == "string") {
            var U = y[2] === true, q = y[3] === true, _ = U || q, z = y[2];
            q && (z = y[2]), i = this.$locale(), !U && z && (i = b.Ls[z]), this.$d = function(E, D, P, A) {
              try {
                if (["x", "X"].indexOf(D) > -1) return new Date((D === "X" ? 1e3 : 1) * E);
                var te = h(D)(E), ce = te.year, se = te.month, Y = te.day, k = te.hours, N = te.minutes, ee = te.seconds, J = te.milliseconds, L = te.zone, K = te.week, ne = /* @__PURE__ */ new Date(), ye = Y || (ce || se ? 1 : ne.getDate()), V = ce || ne.getFullYear(), ae = 0;
                ce && !se || (ae = se > 0 ? se - 1 : ne.getMonth());
                var ve, we = k || 0, R = N || 0, Q = ee || 0, Z = J || 0;
                return L ? new Date(Date.UTC(V, ae, ye, we, R, Q, Z + 60 * L.offset * 1e3)) : P ? new Date(Date.UTC(V, ae, ye, we, R, Q, Z)) : (ve = new Date(V, ae, ye, we, R, Q, Z), K && (ve = A(ve).week(K).toDate()), ve);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            }(T, $, u, b), this.init(), z && z !== true && (this.$L = this.locale(z).$L), _ && T != this.format($) && (this.$d = /* @__PURE__ */ new Date("")), i = {};
          } else if ($ instanceof Array) for (var re = $.length, G = 1; G <= re; G += 1) {
            y[1] = $[G - 1];
            var O = b.apply(this, y);
            if (O.isValid()) {
              this.$d = O.$d, this.$L = O.$L, this.init();
              break;
            }
            G === re && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else x.call(this, S);
        };
      };
    });
  }(Ot)), Ot.exports;
}
var cn = un();
var ur = yt(cn);
var Ft = { exports: {} };
var dn = Ft.exports;
var Fa;
function fn() {
  return Fa || (Fa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(dn, function() {
      var t = "week", a = "year";
      return function(n, o, l) {
        var s = o.prototype;
        s.week = function(i) {
          if (i === void 0 && (i = null), i !== null) return this.add(7 * (i - this.week()), "day");
          var c = this.$locale().yearStart || 1;
          if (this.month() === 11 && this.date() > 25) {
            var v = l(this).startOf(a).add(1, a).date(c), p = l(this).endOf(t);
            if (v.isBefore(p)) return 1;
          }
          var m = l(this).startOf(a).date(c).startOf(t).subtract(1, "millisecond"), w = this.diff(m, t, true);
          return w < 0 ? l(this).startOf("week").week() : Math.ceil(w);
        }, s.weeks = function(i) {
          return i === void 0 && (i = null), this.week(i);
        };
      };
    });
  }(Ft)), Ft.exports;
}
var mn = fn();
var hn = yt(mn);
var Vt = { exports: {} };
var vn = Vt.exports;
var Va;
function pn() {
  return Va || (Va = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(vn, function() {
      return function(t, a, n) {
        var o = a.prototype, l = function(p) {
          return p && (p.indexOf ? p : p.s);
        }, s = function(p, m, w, M, h) {
          var f = p.name ? p : p.$locale(), d = l(f[m]), b = l(f[w]), g = d || b.map(function(S) {
            return S.slice(0, M);
          });
          if (!h) return g;
          var x = f.weekStart;
          return g.map(function(S, T) {
            return g[(T + (x || 0)) % 7];
          });
        }, i = function() {
          return n.Ls[n.locale()];
        }, c = function(p, m) {
          return p.formats[m] || function(w) {
            return w.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(M, h, f) {
              return h || f.slice(1);
            });
          }(p.formats[m.toUpperCase()]);
        }, v = function() {
          var p = this;
          return { months: function(m) {
            return m ? m.format("MMMM") : s(p, "months");
          }, monthsShort: function(m) {
            return m ? m.format("MMM") : s(p, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return p.$locale().weekStart || 0;
          }, weekdays: function(m) {
            return m ? m.format("dddd") : s(p, "weekdays");
          }, weekdaysMin: function(m) {
            return m ? m.format("dd") : s(p, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(m) {
            return m ? m.format("ddd") : s(p, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(m) {
            return c(p.$locale(), m);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        o.localeData = function() {
          return v.bind(this)();
        }, n.localeData = function() {
          var p = i();
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
          }, longDateFormat: function(m) {
            return c(p, m);
          }, meridiem: p.meridiem, ordinal: p.ordinal };
        }, n.months = function() {
          return s(i(), "months");
        }, n.monthsShort = function() {
          return s(i(), "monthsShort", "months", 3);
        }, n.weekdays = function(p) {
          return s(i(), "weekdays", null, null, p);
        }, n.weekdaysShort = function(p) {
          return s(i(), "weekdaysShort", "weekdays", 3, p);
        }, n.weekdaysMin = function(p) {
          return s(i(), "weekdaysMin", "weekdays", 2, p);
        };
      };
    });
  }(Vt)), Vt.exports;
}
var gn = pn();
var yn = yt(gn);
import_dayjs.default.extend(ur);
var Aa = {
  "en-US": ["MM/DD/YYYY", "M/D/YYYY"],
  "en-GB": ["DD/MM/YYYY", "D/M/YYYY"],
  "zh-TW": ["YYYY-MM-DD", "YYYY/MM/DD"],
  "zh-CN": ["YYYY-MM-DD", "YYYY/MM/DD"]
};
var Pa = [
  "YYYY-MM-DD",
  "YYYY/MM/DD",
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "YY-MM-DD",
  "YY/MM/DD"
];
var $n = class {
  constructor(e = "zh-TW", t = "gregory") {
    De(this, "locale");
    De(this, "calendar");
    De(this, "preferredFormats");
    this.locale = e, this.calendar = t, this.preferredFormats = [
      ...Aa[e] || [],
      ...Pa
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
      ...Aa[e] || [],
      ...Pa
    ];
  }
  setCalendar(e) {
    this.calendar = e;
  }
};
var it = new $n();
function Dn(r, e = "zh-TW", t = "gregory") {
  return e !== it.locale && it.setLocale(e), t !== it.calendar && it.setCalendar(t), it.parse(r);
}
function Ge(r, e) {
  return r - e * Math.floor(r / e);
}
var cr = 1721426;
function Je(r, e, t, a) {
  e = $t(r, e);
  let n = e - 1, o = -2;
  return t <= 2 ? o = 0 : Ue(e) && (o = -1), cr - 1 + 365 * n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400) + Math.floor((367 * t - 362) / 12 + o + a);
}
function Ue(r) {
  return r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0);
}
function $t(r, e) {
  return r === "BC" ? 1 - e : e;
}
function Jt(r) {
  let e = "AD";
  return r <= 0 && (e = "BC", r = 1 - r), [
    e,
    r
  ];
}
var bn = {
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
    let t = e, a = t - cr, n = Math.floor(a / 146097), o = Ge(a, 146097), l = Math.floor(o / 36524), s = Ge(o, 36524), i = Math.floor(s / 1461), c = Ge(s, 1461), v = Math.floor(c / 365), p = n * 400 + l * 100 + i * 4 + v + (l !== 4 && v !== 4 ? 1 : 0), [m, w] = Jt(p), M = t - Je(m, w, 1, 1), h = 2;
    t < Je(m, w, 3, 1) ? h = 0 : Ue(w) && (h = 1);
    let f = Math.floor(((M + h) * 12 + 373) / 367), d = t - Je(m, w, f, 1) + 1;
    return new ue(m, w, f, d);
  }
  toJulianDay(e) {
    return Je(e.era, e.year, e.month, e.day);
  }
  getDaysInMonth(e) {
    return bn[Ue(e.year) ? "leapyear" : "standard"][e.month - 1];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMonthsInYear(e) {
    return 12;
  }
  getDaysInYear(e) {
    return Ue(e.year) ? 366 : 365;
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
var Mn = {
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
function Sn(r, e) {
  var t, a, n, o;
  return (o = (n = (t = r.isEqual) === null || t === void 0 ? void 0 : t.call(r, e)) !== null && n !== void 0 ? n : (a = e.isEqual) === null || a === void 0 ? void 0 : a.call(e, r)) !== null && o !== void 0 ? o : r.identifier === e.identifier;
}
function dr(r, e, t) {
  let a = r.calendar.toJulianDay(r), n = Cn(e), o = Math.ceil(a + 1 - n) % 7;
  return o < 0 && (o += 7), o;
}
function wn(r) {
  return He(Date.now(), r);
}
function kn(r) {
  return On(wn(r));
}
function fr(r, e) {
  return r.calendar.toJulianDay(r) - e.calendar.toJulianDay(e);
}
function Tn(r, e) {
  return La(r) - La(e);
}
function La(r) {
  return r.hour * 36e5 + r.minute * 6e4 + r.second * 1e3 + r.millisecond;
}
var Qt = null;
function ya() {
  return Qt == null && (Qt = new Intl.DateTimeFormat().resolvedOptions().timeZone), Qt;
}
function xn(r) {
  return r.subtract({
    days: r.day - 1
  });
}
var Ba = /* @__PURE__ */ new Map();
function Yn(r) {
  if (Intl.Locale) {
    let t = Ba.get(r);
    return t || (t = new Intl.Locale(r).maximize().region, t && Ba.set(r, t)), t;
  }
  let e = r.split("-")[1];
  return e === "u" ? void 0 : e;
}
function Cn(r) {
  let e = Yn(r);
  return e && Mn[e] || 0;
}
function Rn(r, e, t) {
  let a = r.calendar.getDaysInMonth(r);
  return Math.ceil((dr(xn(r), e) + a) / 7);
}
function nt(r) {
  r = Re(r, new Ie());
  let e = $t(r.era, r.year);
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
function En(r, e, t, a) {
  return (t === a ? [
    t
  ] : [
    t,
    a
  ]).filter((o) => In(r, e, o));
}
function In(r, e, t) {
  let a = hr(t, e);
  return r.year === a.year && r.month === a.month && r.day === a.day && r.hour === a.hour && r.minute === a.minute && r.second === a.second;
}
function Be(r, e, t = "compatible") {
  let a = ot(r);
  if (e === "UTC") return nt(a);
  if (e === ya() && t === "compatible") {
    a = Re(a, new Ie());
    let i = /* @__PURE__ */ new Date(), c = $t(a.era, a.year);
    return i.setFullYear(c, a.month - 1, a.day), i.setHours(a.hour, a.minute, a.second, a.millisecond), i.getTime();
  }
  let n = nt(a), o = aa(n - qa, e), l = aa(n + qa, e), s = En(a, e, n - o, n - l);
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
  return new Date(Be(r, e, t));
}
function He(r, e) {
  let t = aa(r, e), a = new Date(r + t), n = a.getUTCFullYear(), o = a.getUTCMonth() + 1, l = a.getUTCDate(), s = a.getUTCHours(), i = a.getUTCMinutes(), c = a.getUTCSeconds(), v = a.getUTCMilliseconds();
  return new gt(n < 1 ? "BC" : "AD", n < 1 ? -n + 1 : n, o, l, e, t, s, i, c, v);
}
function On(r) {
  return new ue(r.calendar, r.era, r.year, r.month, r.day);
}
function ot(r, e) {
  let t = 0, a = 0, n = 0, o = 0;
  if ("timeZone" in r) ({ hour: t, minute: a, second: n, millisecond: o } = r);
  else if ("hour" in r && !e) return r;
  return e && ({ hour: t, minute: a, second: n, millisecond: o } = e), new lt(r.calendar, r.era, r.year, r.month, r.day, t, a, n, o);
}
function Re(r, e) {
  if (Sn(r.calendar, e)) return r;
  let t = e.fromJulianDay(r.calendar.toJulianDay(r)), a = r.copy();
  return a.calendar = e, a.era = t.era, a.year = t.year, a.month = t.month, a.day = t.day, Ke(a), a;
}
function Fn(r, e, t) {
  if (r instanceof gt)
    return r.timeZone === e ? r : An(r, e);
  let a = Be(r, e, t);
  return He(a, e);
}
function Vn(r) {
  let e = nt(r) - r.offset;
  return new Date(e);
}
function An(r, e) {
  let t = nt(r) - r.offset;
  return Re(He(t, e), r.calendar);
}
var ut = 36e5;
function _t(r, e) {
  let t = r.copy(), a = "hour" in t ? Hn(t, e) : 0;
  ra(t, e.years || 0), t.calendar.balanceYearMonth && t.calendar.balanceYearMonth(t, r), t.month += e.months || 0, na(t), pr(t), t.day += (e.weeks || 0) * 7, t.day += e.days || 0, t.day += a, Pn(t), t.calendar.balanceDate && t.calendar.balanceDate(t), t.year < 1 && (t.year = 1, t.month = 1, t.day = 1);
  let n = t.calendar.getYearsInEra(t);
  if (t.year > n) {
    var o, l;
    let i = (o = (l = t.calendar).isInverseEra) === null || o === void 0 ? void 0 : o.call(l, t);
    t.year = n, t.month = i ? 1 : t.calendar.getMonthsInYear(t), t.day = i ? 1 : t.calendar.getDaysInMonth(t);
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
function Pn(r) {
  for (; r.day < 1; )
    r.month--, na(r), r.day += r.calendar.getDaysInMonth(r);
  for (; r.day > r.calendar.getDaysInMonth(r); )
    r.day -= r.calendar.getDaysInMonth(r), r.month++, na(r);
}
function pr(r) {
  r.month = Math.max(1, Math.min(r.calendar.getMonthsInYear(r), r.month)), r.day = Math.max(1, Math.min(r.calendar.getDaysInMonth(r), r.day));
}
function Ke(r) {
  r.calendar.constrainDate && r.calendar.constrainDate(r), r.year = Math.max(1, Math.min(r.calendar.getYearsInEra(r), r.year)), pr(r);
}
function gr(r) {
  let e = {};
  for (let t in r) typeof r[t] == "number" && (e[t] = -r[t]);
  return e;
}
function yr(r, e) {
  return _t(r, gr(e));
}
function $a(r, e) {
  let t = r.copy();
  return e.era != null && (t.era = e.era), e.year != null && (t.year = e.year), e.month != null && (t.month = e.month), e.day != null && (t.day = e.day), Ke(t), t;
}
function Bt(r, e) {
  let t = r.copy();
  return e.hour != null && (t.hour = e.hour), e.minute != null && (t.minute = e.minute), e.second != null && (t.second = e.second), e.millisecond != null && (t.millisecond = e.millisecond), Bn(t), t;
}
function Ln(r) {
  r.second += Math.floor(r.millisecond / 1e3), r.millisecond = kt(r.millisecond, 1e3), r.minute += Math.floor(r.second / 60), r.second = kt(r.second, 60), r.hour += Math.floor(r.minute / 60), r.minute = kt(r.minute, 60);
  let e = Math.floor(r.hour / 24);
  return r.hour = kt(r.hour, 24), e;
}
function Bn(r) {
  r.millisecond = Math.max(0, Math.min(r.millisecond, 1e3)), r.second = Math.max(0, Math.min(r.second, 59)), r.minute = Math.max(0, Math.min(r.minute, 59)), r.hour = Math.max(0, Math.min(r.hour, 23));
}
function kt(r, e) {
  let t = r % e;
  return t < 0 && (t += e), t;
}
function Hn(r, e) {
  return r.hour += e.hours || 0, r.minute += e.minutes || 0, r.second += e.seconds || 0, r.millisecond += e.milliseconds || 0, Ln(r);
}
function Da(r, e, t, a) {
  let n = r.copy();
  switch (e) {
    case "era": {
      let s = r.calendar.getEras(), i = s.indexOf(r.era);
      if (i < 0) throw new Error("Invalid era: " + r.era);
      i = qe(i, t, 0, s.length - 1, a == null ? void 0 : a.round), n.era = s[i], Ke(n);
      break;
    }
    case "year":
      var o, l;
      !((o = (l = n.calendar).isInverseEra) === null || o === void 0) && o.call(l, n) && (t = -t), n.year = qe(r.year, t, -1 / 0, 9999, a == null ? void 0 : a.round), n.year === -1 / 0 && (n.year = 1), n.calendar.balanceYearMonth && n.calendar.balanceYearMonth(n, r);
      break;
    case "month":
      n.month = qe(r.month, t, 1, r.calendar.getMonthsInYear(r), a == null ? void 0 : a.round);
      break;
    case "day":
      n.day = qe(r.day, t, 1, r.calendar.getDaysInMonth(r), a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return r.calendar.balanceDate && r.calendar.balanceDate(n), Ke(n), n;
}
function $r(r, e, t, a) {
  let n = r.copy();
  switch (e) {
    case "hour": {
      let o = r.hour, l = 0, s = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let i = o >= 12;
        l = i ? 12 : 0, s = i ? 23 : 11;
      }
      n.hour = qe(o, t, l, s, a == null ? void 0 : a.round);
      break;
    }
    case "minute":
      n.minute = qe(r.minute, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "second":
      n.second = qe(r.second, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "millisecond":
      n.millisecond = qe(r.millisecond, t, 0, 999, a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return n;
}
function qe(r, e, t, a, n = false) {
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
    let n = _t(ot(r), {
      years: e.years,
      months: e.months,
      weeks: e.weeks,
      days: e.days
    });
    t = Be(n, r.timeZone);
  } else
    t = nt(r) - r.offset;
  t += e.milliseconds || 0, t += (e.seconds || 0) * 1e3, t += (e.minutes || 0) * 6e4, t += (e.hours || 0) * 36e5;
  let a = He(t, r.timeZone);
  return Re(a, r.calendar);
}
function qn(r, e) {
  return Dr(r, gr(e));
}
function Nn(r, e, t, a) {
  switch (e) {
    case "hour": {
      let n = 0, o = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let M = r.hour >= 12;
        n = M ? 12 : 0, o = M ? 23 : 11;
      }
      let l = ot(r), s = Re(Bt(l, {
        hour: n
      }), new Ie()), i = [
        Be(s, r.timeZone, "earlier"),
        Be(s, r.timeZone, "later")
      ].filter((M) => He(M, r.timeZone).day === s.day)[0], c = Re(Bt(l, {
        hour: o
      }), new Ie()), v = [
        Be(c, r.timeZone, "earlier"),
        Be(c, r.timeZone, "later")
      ].filter((M) => He(M, r.timeZone).day === c.day).pop(), p = nt(r) - r.offset, m = Math.floor(p / ut), w = p % ut;
      return p = qe(m, t, Math.floor(i / ut), Math.floor(v / ut), a == null ? void 0 : a.round) * ut + w, Re(He(p, r.timeZone), r.calendar);
    }
    case "minute":
    case "second":
    case "millisecond":
      return $r(r, e, t, a);
    case "era":
    case "year":
    case "month":
    case "day": {
      let n = Da(ot(r), e, t, a), o = Be(n, r.timeZone);
      return Re(He(o, r.timeZone), r.calendar);
    }
    default:
      throw new Error("Unsupported field " + e);
  }
}
function Un(r, e, t) {
  let a = ot(r), n = Bt($a(a, e), e);
  if (n.compare(a) === 0) return r;
  let o = Be(n, r.timeZone, t);
  return Re(He(o, r.timeZone), r.calendar);
}
function zn(r) {
  return `${String(r.hour).padStart(2, "0")}:${String(r.minute).padStart(2, "0")}:${String(r.second).padStart(2, "0")}${r.millisecond ? String(r.millisecond / 1e3).slice(1) : ""}`;
}
function br(r) {
  let e = Re(r, new Ie()), t;
  return e.era === "BC" ? t = e.year === 1 ? "0000" : "-" + String(Math.abs(1 - e.year)).padStart(6, "00") : t = String(e.year).padStart(4, "0"), `${t}-${String(e.month).padStart(2, "0")}-${String(e.day).padStart(2, "0")}`;
}
function Mr(r) {
  return `${br(r)}T${zn(r)}`;
}
function Wn(r) {
  let e = Math.sign(r) < 0 ? "-" : "+";
  r = Math.abs(r);
  let t = Math.floor(r / 36e5), a = r % 36e5 / 6e4;
  return `${e}${String(t).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
}
function jn(r) {
  return `${Mr(r)}${Wn(r.offset)}[${r.timeZone}]`;
}
function Jn(r, e) {
  if (e.has(r))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function ba(r, e, t) {
  Jn(r, e), e.set(r, t);
}
function Ma(r) {
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
var _n = /* @__PURE__ */ new WeakMap();
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
    ba(this, _n, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = Ma(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, Ke(this);
  }
};
var Kn = /* @__PURE__ */ new WeakMap();
var lt = class _lt {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _lt(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond) : new _lt(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `CalendarDateTime` with the given duration added to it. */
  add(e) {
    return _t(this, e);
  }
  /** Returns a new `CalendarDateTime` with the given duration subtracted from it. */
  subtract(e) {
    return yr(this, e);
  }
  /** Returns a new `CalendarDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(e) {
    return $a(Bt(this, e), e);
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
    return t === 0 ? Tn(this, ot(e)) : t;
  }
  constructor(...e) {
    ba(this, Kn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = Ma(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, Ke(this);
  }
};
var Qn = /* @__PURE__ */ new WeakMap();
var gt = class _gt {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _gt(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond) : new _gt(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `ZonedDateTime` with the given duration added to it. */
  add(e) {
    return Dr(this, e);
  }
  /** Returns a new `ZonedDateTime` with the given duration subtracted from it. */
  subtract(e) {
    return qn(this, e);
  }
  /** Returns a new `ZonedDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(e, t) {
    return Un(this, e, t);
  }
  /**
  * Returns a new `ZonedDateTime` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(e, t, a) {
    return Nn(this, e, t, a);
  }
  /** Converts the date to a native JavaScript Date object. */
  toDate() {
    return Vn(this);
  }
  /** Converts the date to an ISO 8601 formatted string, including the UTC offset and time zone identifier. */
  toString() {
    return jn(this);
  }
  /** Converts the date to an ISO 8601 formatted string in UTC. */
  toAbsoluteString() {
    return this.toDate().toISOString();
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(e) {
    return this.toDate().getTime() - Fn(e, this.timeZone).toDate().getTime();
  }
  constructor(...e) {
    ba(this, Qn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = Ma(e), s = e.shift(), i = e.shift();
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.timeZone = s, this.offset = i, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, Ke(this);
  }
};
var Xe = [
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
var Zn = [
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
var At = [
  1867,
  1911,
  1925,
  1988,
  2018
];
var Ne = [
  "meiji",
  "taisho",
  "showa",
  "heisei",
  "reiwa"
];
function Na(r) {
  const e = Xe.findIndex(([t, a, n]) => r.year < t || r.year === t && r.month < a || r.year === t && r.month === a && r.day < n);
  return e === -1 ? Xe.length - 1 : e === 0 ? 0 : e - 1;
}
function Zt(r) {
  let e = At[Ne.indexOf(r.era)];
  if (!e) throw new Error("Unknown era: " + r.era);
  return new ue(r.year + e, r.month, r.day);
}
var Gn = class extends Ie {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = Na(t);
    return new ue(this, Ne[a], t.year - At[a], t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Zt(e));
  }
  balanceDate(e) {
    let t = Zt(e), a = Na(t);
    Ne[a] !== e.era && (e.era = Ne[a], e.year = t.year - At[a]), this.constrainDate(e);
  }
  constrainDate(e) {
    let t = Ne.indexOf(e.era), a = Zn[t];
    if (a != null) {
      let [n, o, l] = a, s = n - At[t];
      e.year = Math.max(1, Math.min(s, e.year)), e.year === s && (e.month = Math.min(o, e.month), e.month === o && (e.day = Math.min(l, e.day)));
    }
    if (e.year === 1 && t >= 0) {
      let [, n, o] = Xe[t];
      e.month = Math.max(n, e.month), e.month === n && (e.day = Math.max(o, e.day));
    }
  }
  getEras() {
    return Ne;
  }
  getYearsInEra(e) {
    let t = Ne.indexOf(e.era), a = Xe[t], n = Xe[t + 1];
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
    let e = Ne.indexOf(r.era);
    return Xe[e];
  }
}
var Sr = -543;
var Xn = class extends Ie {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = $t(t.era, t.year);
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
  let [e, t] = Jt(r.year + Sr);
  return new ue(e, t, r.month, r.day);
}
var Ht = 1911;
function wr(r) {
  return r.era === "minguo" ? r.year + Ht : 1 - r.year + Ht;
}
function Wa(r) {
  let e = r - Ht;
  return e > 0 ? [
    "minguo",
    e
  ] : [
    "before_minguo",
    1 - e
  ];
}
var eo = class extends Ie {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = $t(t.era, t.year), [n, o] = Wa(a);
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
    let [t, a] = Wa(wr(e));
    e.era = t, e.year = a;
  }
  isInverseEra(e) {
    return e.era === "before_minguo";
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(ja(e));
  }
  getYearsInEra(e) {
    return e.era === "before_minguo" ? 9999 : 9999 - Ht;
  }
  constructor(...e) {
    super(...e), this.identifier = "roc";
  }
};
function ja(r) {
  let [e, t] = Jt(wr(r));
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
var to = class {
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
    return e.month <= 6 ? 31 : e.month <= 11 || Ge(25 * e.year + 11, 33) < 8 ? 30 : 29;
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
var ao = class extends Ie {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = t.year - Gt, n = e - Je(t.era, t.year, 1, 1), o;
    n < Ka ? (a--, o = Ue(t.year - 1) ? 31 : 30, n += o + 155 + 90 + 10) : (o = Ue(t.year) ? 31 : 30, n -= Ka);
    let l, s;
    if (n < o)
      l = 1, s = n + 1;
    else {
      let i = n - o;
      i < 155 ? (l = Math.floor(i / 31) + 2, s = i % 31 + 1) : (i -= 155, l = Math.floor(i / 30) + 7, s = i % 30 + 1);
    }
    return new ue(this, a, l, s);
  }
  toJulianDay(e) {
    let t = e.year + Gt, [a, n] = Jt(t), o, l;
    return Ue(n) ? (o = 31, l = Je(a, n, 3, 21)) : (o = 30, l = Je(a, n, 3, 22)), e.month === 1 ? l + e.day - 1 : (l += o + Math.min(e.month - 2, 5) * 31, e.month >= 8 && (l += (e.month - 7) * 30), l += e.day - 1, l);
  }
  getDaysInMonth(e) {
    return e.month === 1 && Ue(e.year + Gt) || e.month >= 2 && e.month <= 6 ? 31 : 30;
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
var Qa = 1948439;
var Fe = 1300;
var Qe = 1600;
var ro = 460322;
function Nt(r, e, t, a) {
  return a + Math.ceil(29.5 * (t - 1)) + (e - 1) * 354 + Math.floor((3 + 11 * e) / 30) + r - 1;
}
function kr(r, e, t) {
  let a = Math.floor((30 * (t - e) + 10646) / 10631), n = Math.min(12, Math.ceil((t - (29 + Nt(e, a, 1, 1))) / 29.5) + 1), o = t - Nt(e, a, n, 1) + 1;
  return new ue(r, a, n, o);
}
function Za(r) {
  return (14 + 11 * r) % 30 < 11;
}
var Sa = class {
  fromJulianDay(e) {
    return kr(this, qt, e);
  }
  toJulianDay(e) {
    return Nt(qt, e.year, e.month, e.day);
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
var no = class extends Sa {
  fromJulianDay(e) {
    return kr(this, Qa, e);
  }
  toJulianDay(e) {
    return Nt(Qa, e.year, e.month, e.day);
  }
  constructor(...e) {
    super(...e), this.identifier = "islamic-tbla";
  }
};
var oo = "qgpUDckO1AbqBmwDrQpVBakGkgepC9QF2gpcBS0NlQZKB1QLagutBa4ETwoXBYsGpQbVCtYCWwmdBE0KJg2VDawFtgm6AlsKKwWVCsoG6Qr0AnYJtgJWCcoKpAvSC9kF3AJtCU0FpQpSC6ULtAW2CVcFlwJLBaMGUgdlC2oFqworBZUMSg2lDcoF1gpXCasESwmlClILagt1BXYCtwhbBFUFqQW0BdoJ3QRuAjYJqgpUDbIN1QXaAlsJqwRVCkkLZAtxC7QFtQpVCiUNkg7JDtQG6QprCasEkwpJDaQNsg25CroEWworBZUKKgtVC1wFvQQ9Ah0JlQpKC1oLbQW2AjsJmwRVBqkGVAdqC2wFrQpVBSkLkgupC9QF2gpaBasKlQVJB2QHqgu1BbYCVgpNDiULUgtqC60FrgIvCZcESwalBqwG1gpdBZ0ETQoWDZUNqgW1BdoCWwmtBJUFygbkBuoK9QS2AlYJqgpUC9IL2QXqAm0JrQSVCkoLpQuyBbUJ1gSXCkcFkwZJB1ULagVrCisFiwpGDaMNygXWCtsEawJLCaUKUgtpC3UFdgG3CFsCKwVlBbQF2gntBG0BtgimClINqQ3UBdoKWwmrBFMGKQdiB6kLsgW1ClUFJQuSDckO0gbpCmsFqwRVCikNVA2qDbUJugQ7CpsETQqqCtUK2gJdCV4ELgqaDFUNsga5BroEXQotBZUKUguoC7QLuQXaAloJSgukDdEO6AZqC20FNQWVBkoNqA3UDdoGWwWdAisGFQtKC5ULqgWuCi4JjwwnBZUGqgbWCl0FnQI=";
var oa;
var et;
function Pt(r) {
  return ro + et[r - Fe];
}
function dt(r, e) {
  let t = r - Fe, a = 1 << 11 - (e - 1);
  return (oa[t] & a) === 0 ? 29 : 30;
}
function Ga(r, e) {
  let t = Pt(r);
  for (let a = 1; a < e; a++) t += dt(r, a);
  return t;
}
function Xa(r) {
  return et[r + 1 - Fe] - et[r - Fe];
}
var lo = class extends Sa {
  fromJulianDay(e) {
    let t = e - qt, a = Pt(Fe), n = Pt(Qe);
    if (t < a || t > n) return super.fromJulianDay(e);
    {
      let o = Fe - 1, l = 1, s = 1;
      for (; s > 0; ) {
        o++, s = t - Pt(o) + 1;
        let i = Xa(o);
        if (s === i) {
          l = 12;
          break;
        } else if (s < i) {
          let c = dt(o, l);
          for (l = 1; s > c; )
            s -= c, l++, c = dt(o, l);
          break;
        }
      }
      return new ue(this, o, l, t - Ga(o, l) + 1);
    }
  }
  toJulianDay(e) {
    return e.year < Fe || e.year > Qe ? super.toJulianDay(e) : qt + Ga(e.year, e.month) + (e.day - 1);
  }
  getDaysInMonth(e) {
    return e.year < Fe || e.year > Qe ? super.getDaysInMonth(e) : dt(e.year, e.month);
  }
  getDaysInYear(e) {
    return e.year < Fe || e.year > Qe ? super.getDaysInYear(e) : Xa(e.year);
  }
  constructor() {
    if (super(), this.identifier = "islamic-umalqura", oa || (oa = new Uint16Array(Uint8Array.from(atob(oo), (e) => e.charCodeAt(0)).buffer)), !et) {
      et = new Uint32Array(Qe - Fe + 1);
      let e = 0;
      for (let t = Fe; t <= Qe; t++) {
        et[t - Fe] = e;
        for (let a = 1; a <= 12; a++) e += dt(t, a);
      }
    }
  }
};
var er = 347997;
var Tr = 1080;
var xr = 24 * Tr;
var so = 29;
var io = 12 * Tr + 793;
var uo = so * xr + io;
function je(r) {
  return Ge(r * 7 + 1, 19) < 7;
}
function Lt(r) {
  let e = Math.floor((235 * r - 234) / 19), t = 12084 + 13753 * e, a = e * 29 + Math.floor(t / 25920);
  return Ge(3 * (a + 1), 7) < 3 && (a += 1), a;
}
function co(r) {
  let e = Lt(r - 1), t = Lt(r);
  return Lt(r + 1) - t === 356 ? 2 : t - e === 382 ? 1 : 0;
}
function ft(r) {
  return Lt(r) + co(r);
}
function Yr(r) {
  return ft(r + 1) - ft(r);
}
function fo(r) {
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
  if (e >= 6 && !je(r) && e++, e === 4 || e === 7 || e === 9 || e === 11 || e === 13) return 29;
  let t = fo(r);
  return e === 2 ? t === 2 ? 30 : 29 : e === 3 ? t === 0 ? 29 : 30 : e === 6 ? je(r) ? 30 : 0 : 30;
}
var mo = class {
  fromJulianDay(e) {
    let t = e - er, a = t * xr / uo, n = Math.floor((19 * a + 234) / 235) + 1, o = ft(n), l = Math.floor(t - o);
    for (; l < 1; )
      n--, o = ft(n), l = Math.floor(t - o);
    let s = 1, i = 0;
    for (; i < l; )
      i += Tt(n, s), s++;
    s--, i -= Tt(n, s);
    let c = l - i;
    return new ue(this, n, s, c);
  }
  toJulianDay(e) {
    let t = ft(e.year);
    for (let a = 1; a < e.month; a++) t += Tt(e.year, a);
    return t + e.day + er;
  }
  getDaysInMonth(e) {
    return Tt(e.year, e.month);
  }
  getMonthsInYear(e) {
    return je(e.year) ? 13 : 12;
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
    t.year !== e.year && (je(t.year) && !je(e.year) && t.month > 6 ? e.month-- : !je(t.year) && je(e.year) && t.month > 6 && e.month++);
  }
  constructor() {
    this.identifier = "hebrew";
  }
};
var la = 1723856;
var tr = 1824665;
var sa = 5500;
function Ut(r, e, t, a) {
  return r + 365 * e + Math.floor(e / 4) + 30 * (t - 1) + a - 1;
}
function wa(r, e) {
  let t = Math.floor(4 * (e - r) / 1461), a = 1 + Math.floor((e - Ut(r, t, 1, 1)) / 30), n = e + 1 - Ut(r, t, a, 1);
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
var ka = class {
  fromJulianDay(e) {
    let [t, a, n] = wa(la, e), o = "AM";
    return t <= 0 && (o = "AA", t += sa), new ue(this, o, t, a, n);
  }
  toJulianDay(e) {
    let t = e.year;
    return e.era === "AA" && (t -= sa), Ut(la, t, e.month, e.day);
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
var ho = class extends ka {
  fromJulianDay(e) {
    let [t, a, n] = wa(la, e);
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
var vo = class extends ka {
  fromJulianDay(e) {
    let [t, a, n] = wa(tr, e), o = "CE";
    return t <= 0 && (o = "BCE", t = 1 - t), new ue(this, o, t, a, n);
  }
  toJulianDay(e) {
    let t = e.year;
    return e.era === "BCE" && (t = 1 - t), Ut(tr, t, e.month, e.day);
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
function po(r) {
  switch (r) {
    case "buddhist":
      return new Xn();
    case "ethiopic":
      return new ka();
    case "ethioaa":
      return new ho();
    case "coptic":
      return new vo();
    case "hebrew":
      return new mo();
    case "indian":
      return new ao();
    case "islamic-civil":
      return new Sa();
    case "islamic-tbla":
      return new no();
    case "islamic-umalqura":
      return new lo();
    case "japanese":
      return new Gn();
    case "persian":
      return new to();
    case "roc":
      return new eo();
    case "gregory":
    default:
      return new Ie();
  }
}
var Xt = /* @__PURE__ */ new Map();
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
    return $o() && (this.resolvedHourCycle || (this.resolvedHourCycle = Do(e.locale, this.options)), e.hourCycle = this.resolvedHourCycle, e.hour12 = this.resolvedHourCycle === "h11" || this.resolvedHourCycle === "h12"), e.calendar === "ethiopic-amete-alem" && (e.calendar = "ethioaa"), e;
  }
  constructor(e, t = {}) {
    this.formatter = Er(e, t), this.options = t;
  }
};
var go = {
  true: {
    // Only Japanese uses the h11 style for 12 hour time. All others use h12.
    ja: "h11"
  },
  false: {}
};
function Er(r, e = {}) {
  if (typeof e.hour12 == "boolean" && yo()) {
    e = {
      ...e
    };
    let n = go[String(e.hour12)][r.split("-")[0]], o = e.hour12 ? "h12" : "h23";
    e.hourCycle = n ?? o, delete e.hour12;
  }
  let t = r + (e ? Object.entries(e).sort((n, o) => n[0] < o[0] ? -1 : 1).join() : "");
  if (Xt.has(t)) return Xt.get(t);
  let a = new Intl.DateTimeFormat(r, e);
  return Xt.set(t, a), a;
}
var ea = null;
function yo() {
  return ea == null && (ea = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false
  }).format(new Date(2020, 2, 3, 0)) === "24"), ea;
}
var ta = null;
function $o() {
  return ta == null && (ta = new Intl.DateTimeFormat("fr", {
    hour: "numeric",
    hour12: false
  }).resolvedOptions().hourCycle === "h12"), ta;
}
function Do(r, e) {
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
import_dayjs.default.extend(an);
import_dayjs.default.extend(ln);
import_dayjs.default.extend(ur);
import_dayjs.default.extend(hn);
import_dayjs.default.extend(yn);
function tt() {
  const r = /* @__PURE__ */ new Date();
  return {
    year: r.getFullYear(),
    month: r.getMonth() + 1,
    day: r.getDate()
  };
}
function bo(r) {
  try {
    const e = ya(), t = kn(e);
    if (r.calendar.identifier !== t.calendar.identifier) {
      const a = Re(t, r.calendar);
      return r.compare(a) === 0;
    }
    return r.compare(t) === 0;
  } catch (e) {
    return console.error("Error checking if date is today:", e), false;
  }
}
function Ze() {
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
function pe(r, e = "zh-TW", t = "gregory") {
  if (!r) return null;
  try {
    if (To(r))
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
      const a = Dn(r, e, t);
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
function Wt(r, e = "iso", t, a = false, n = "gregory", o = "zh-TW", l = false) {
  if (!r) return null;
  try {
    switch (e) {
      case "iso":
        return a ? Ee(r, l ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD HH:mm:ss") : Ee(r, "YYYY-MM-DD");
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
        return console.warn(`不支援的輸出類型: ${e}，回退到 ISO 格式`), Ee(r, "YYYY-MM-DD");
    }
  } catch (s) {
    return console.error("formatOutput 失敗:", s), r;
  }
}
function jt(r, e) {
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
function Mo() {
  const r = Ze(), e = ze(r.year, r.month, 1, 0, 0, 0), t = r.month === 12 ? 1 : r.month + 1, a = r.month === 12 ? r.year + 1 : r.year, n = ze(a, t, 1), o = ia(n, -1);
  return { start: e, end: o };
}
function So(r) {
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
  t.forEach((m) => {
    a = a.replace(new RegExp(`\\${m}`, "g"), " ");
  });
  const n = a.split(/\s+/).filter(Boolean);
  if (!n.every((m) => e.includes(m))) return false;
  const l = n.some((m) => m === "YYYY" || m === "YY"), s = n.some((m) => m === "MM" || m === "M"), i = n.some((m) => m === "DD" || m === "D"), c = n.filter((m) => m === "YYYY" || m === "YY").length, v = n.filter((m) => m === "MM" || m === "M").length, p = n.filter((m) => m === "DD" || m === "D").length;
  return c > 1 || v > 1 || p > 1 ? false : l && s && i;
}
function Or(r) {
  const e = ["HH", "H", "mm", "m", "ss", "s", "a", "A"], t = r.replace(/[^\w]/g, " "), a = t.includes("HH") || t.includes("H"), n = t.includes("mm") || t.includes("m"), l = t.split(/\s+/).filter(Boolean).some((s) => !!(/^[hH]{1,2}$/.test(s) && !e.includes(s) || /^[mM]{1,2}$/.test(s) && !e.includes(s) || /^[sS]{1,2}$/.test(s) && !e.includes(s)));
  return a && n && !l;
}
function wo(r) {
  return r.replace(/yyyy/g, "YYYY").replace(/yy/g, "YY").replace(/mm/g, "MM").replace(/dd/g, "DD");
}
function ko(r) {
  return r.replace(/hh/g, "HH");
}
function To(r) {
  return !r || typeof r != "object" ? false : typeof r.year == "number" && typeof r.month == "number" && typeof r.day == "number";
}
var Fr = class {
  constructor() {
    De(this, "id", "roc");
    De(this, "yearRange", {
      min: 1,
      // 民國1年 (1912年)
      max: 200
      // 民國200年 (2111年)
    });
    De(this, "displayName", {
      "zh-TW": "民國曆",
      "zh-CN": "民国历",
      "en-US": "ROC Calendar",
      "ja-JP": "中華民国暦",
      "ko-KR": "중화민국력"
    });
    De(this, "YEAR_OFFSET", 1911);
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
      for (const i of s) {
        const c = this.tryParseWithSeparator(l, i);
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
    const [, a, n, o] = t, l = parseInt(a), s = parseInt(n), i = parseInt(o);
    return this.validateAndConvertRocDate(l, s, i);
  }
  /**
   * 解析時間部分 (如: "上午 12時00分")
   */
  parseTimePart(e) {
    if (!e) return null;
    const t = e.trim(), a = t.match(/(上午|下午)\s*(\d{1,2})時(\d{2})分(?:(\d{2})秒)?/);
    if (a) {
      const [, o, l, s, i] = a;
      let c = parseInt(l);
      const v = parseInt(s), p = i ? parseInt(i) : 0;
      return o === "下午" && c !== 12 ? c += 12 : o === "上午" && c === 12 && (c = 0), c < 0 || c > 23 || v < 0 || v > 59 || p < 0 || p > 59 ? null : { hour: c, minute: v, second: p };
    }
    const n = t.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (n) {
      const [, o, l, s] = n, i = parseInt(o), c = parseInt(l), v = s ? parseInt(s) : 0;
      return i < 0 || i > 23 || c < 0 || c > 59 || v < 0 || v > 59 ? null : { hour: i, minute: c, second: v };
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
    const n = t.split(" "), o = n[0], l = n.slice(1).join(" "), s = this.formatDatePart(e, o, a);
    if (l) {
      const i = this.detectTimeFormat(l), c = this.formatTimePart(e, l, i);
      return `${s} ${c}`;
    }
    return s;
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
      "ROC-YY": `民國${n.toString().slice(-2)}年`,
      "ROC-YYYY-MM-DD": `民國${n}年${o.toString().padStart(2, "0")}月${l.toString().padStart(2, "0")}日`,
      "ROC-YY-MM-DD": `民國${n.toString().slice(-2)}年${o.toString().padStart(2, "0")}月${l.toString().padStart(2, "0")}日`,
      "ROC-NUM-YYYY-MM-DD": `${n}-${o.toString().padStart(2, "0")}-${l.toString().padStart(2, "0")}`,
      "ROC-NUM-YY-MM-DD": `${n.toString().slice(-2)}-${o.toString().padStart(2, "0")}-${l.toString().padStart(2, "0")}`,
      "ROC-YYYY/MM/DD": `民國${n}/${o.toString().padStart(2, "0")}/${l.toString().padStart(2, "0")}`
    };
    if (s[t])
      return s[t];
    const i = new Date(e.year, e.month - 1, e.day);
    let c = (0, import_dayjs.default)(i).format(t);
    if (t.includes("YYYY"))
      c = c.replace(e.year.toString(), n.toString());
    else if (t.includes("YY")) {
      const v = e.year.toString().slice(-2), p = n.toString().slice(-2);
      c = c.replace(v, p);
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
    const s = e < 12 ? "上午" : "下午", i = e === 0 ? 12 : e > 12 ? e - 12 : e, c = l ? i.toString().padStart(2, "0") : i.toString(), v = t.toString().padStart(2, "0"), p = n ? a.toString().padStart(2, "0") : "";
    switch (o) {
      case "suffix":
        return n ? `${c}:${v}:${p} ${s}` : `${c}:${v} ${s}`;
      case "prefix":
        return n ? `${s} ${c}:${v}:${p}` : `${s} ${c}:${v}`;
      case "chinese":
        return n ? `${s} ${c}時${v}分${p}秒` : `${s} ${c}時${v}分`;
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
      return po(e);
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
      const l = this.createSafeCalendar(a), s = new ue(e, t, 1), i = a === "gregory" ? s : this.safeToCalendar(s, l), c = Rn(i, n) ?? 6, p = (dr(i, n) - o + 7) % 7, m = i.subtract({ days: p }), w = [];
      let M = m;
      const h = c * 7;
      for (let f = 0; f < h; f++)
        w.push(M), M = M.add({ days: 1 });
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
  static formatOutput(e, t, a = "gregory", n = "zh-TW") {
    if (!e) return "";
    try {
      switch (a) {
        case "gregory":
          let s = t || "YYYY-MM-DD HH:mm:ss";
          So(s) || (s = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0 ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD");
          const i = new Date(
            e.year,
            e.month - 1,
            e.day,
            e.hour || 0,
            e.minute || 0,
            e.second || 0
          );
          return (0, import_dayjs.default)(i).format(s);
        case "roc":
          const c = new Fr();
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
        const s = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0, i = {
          calendar: a,
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        return s && (i.hour = "numeric", i.minute = "numeric", e.second !== void 0 && (i.second = "numeric")), new zt(n, i).format(o.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone));
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
De(xe, "convertToCalendarDateSmart", (e, t) => e ? e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0 ? xe.convertToCalendarDateTime(e, t) : xe.convertToCalendarDate(e, t) : null), /**
* 統一的轉換函數：SimpleDateValue → CalendarDate
*/
De(xe, "convertToCalendarDate", (e, t) => {
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
De(xe, "convertToCalendarDateTime", (e, t) => {
  if (!e) return null;
  try {
    if (t === "gregory")
      return new lt(
        e.year,
        e.month,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
    {
      const a = xe.createSafeCalendar(t), n = new lt(
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
De(xe, "convertFromCalendarDate", (e, t) => {
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
  convertToCalendarDate: Ks,
  convertFromCalendarDate: Qs,
  // 日曆基礎
  createSafeCalendar: Zs,
  safeToCalendar: Gs,
  generateCalendarDays: Xs,
  // 年份轉換 (YearSelector)
  convertGregorianYear: ei,
  convertToGregorianYear: ti,
  getCalendarRange: ai,
  // getCalendarYearRange,
  // 顯示相關
  getMonthNames: ri,
  getCalendarDisplayName: ni,
  // 日曆系統輸出輸入轉換
  // isValidDate,
  // parseInput,
  isCalendarSupported: oi,
  formatOutput: li
} = me;
var at = (r) => /^\d+$/.test(r);
var rr = (r) => r % 4 === 0 && r % 100 !== 0 || r % 400 === 0;
var Pe = null;
function xo() {
  return Pe || (Pe = document.createElement("span"), Pe.style.visibility = "hidden", Pe.style.position = "absolute", Pe.style.top = "-9999px", Pe.style.left = "-9999px", Pe.style.whiteSpace = "pre", document.body.appendChild(Pe)), Pe;
}
var ua = /* @__PURE__ */ new WeakMap();
function Yo(r, e = "") {
  const t = xo(), a = getComputedStyle(r);
  return t.style.font = a.font, t.style.fontSize = a.fontSize, t.style.fontWeight = a.fontWeight, t.style.letterSpacing = a.letterSpacing, t.style.padding = a.padding, t.style.border = a.border, t.style.boxSizing = a.boxSizing, t.textContent = r.value || e || "", t.offsetWidth + 4;
}
function ct(r) {
  const e = r.placeholder || "", t = Yo(r, e), a = ua.get(r) || 0;
  r.style.width = `${Math.max(t, a)}px`;
}
var rt = {
  // 初始設置
  mounted(r, e) {
    e.value && typeof e.value == "number" && ua.set(r, e.value), ct(r), r.addEventListener("input", () => ct(r)), document.fonts && document.fonts.ready && document.fonts.ready.then(() => ct(r));
  },
  // 處理更新
  updated(r, e) {
    e.value && typeof e.value == "number" && e.oldValue !== e.value && ua.set(r, e.value), ct(r);
  },
  // 為 Vue 3 添加 beforeUnmount
  beforeUnmount(r) {
    r.removeEventListener("input", () => ct(r));
  }
};
var Co = { class: "date-input-container flex items-center justify-start" };
var Ro = ["placeholder", "aria-invalid", "aria-errormessage"];
var Eo = ["placeholder", "aria-invalid", "aria-errormessage"];
var Io = ["placeholder", "aria-invalid", "aria-errormessage"];
var Oo = {
  key: 3,
  class: "text-gray-400"
};
var Fo = defineComponent({
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
      mounted: rt.mounted,
      updated: rt.updated,
      beforeUnmount: rt.beforeUnmount
    }, n = r, o = t, l = ref(""), s = ref(""), i = ref(""), c = ref({}), v = ref({}), p = ref(null), m = ref(false), w = ref(false), M = ref(null), h = ref(/* @__PURE__ */ new Map()), f = (Y, k) => {
      Y && Y instanceof HTMLInputElement ? h.value.set(k, Y) : h.value.delete(k);
    }, d = (Y) => h.value.get(Y), b = computed(() => {
      const Y = {};
      return Object.entries(c.value).forEach(([k, N]) => {
        Y[k] = N.key;
      }), Y;
    }), g = computed(() => Object.keys(c.value).length > 0), x = computed(() => Object.values(b.value)), S = computed(() => {
      const Y = n.dateFormat.toUpperCase(), k = [];
      return Y.split(/[^A-Z]+/).filter(Boolean).forEach((ee) => {
        ee.includes("Y") ? k.push("year") : ee.includes("M") ? k.push("month") : ee.includes("D") && k.push("day");
      }), k.length !== 3 ? (console.warn(`Invalid date format: ${n.dateFormat}, falling back to YYYY-MM-DD`), ["year", "month", "day"]) : k;
    }), T = computed(() => {
      if (!l.value || !s.value || !i.value)
        return null;
      const Y = l.value.padStart(4, "0"), k = s.value.padStart(2, "0"), N = i.value.padStart(2, "0");
      return `${Y}-${k}-${N}`;
    }), u = computed(() => {
      if (!T.value) return null;
      const Y = (0, import_dayjs.default)(T.value);
      return Y.isValid() ? Y.format(n.dateFormat) : null;
    });
    watch(() => n.modelValue, (Y) => {
      if (m.value || (m.value = true), Y) {
        const k = pe(Y);
        k && (l.value = k.year.toString(), s.value = k.month.toString().padStart(2, "0"), i.value = k.day.toString().padStart(2, "0"));
      } else
        l.value = "", s.value = "", i.value = "";
      Y || (M.value = null, w.value = false);
    }, { immediate: true });
    const y = () => {
      if (S.value.length === 0) return;
      const Y = S.value[0], k = d(Y);
      if (k && typeof k.focus == "function")
        try {
          k.focus();
        } catch (N) {
          console.warn("無法聚焦到輸入框:", N);
        }
      else
        for (const N of S.value) {
          const ee = d(N);
          if (ee && typeof ee.focus == "function")
            try {
              ee.focus();
              break;
            } catch (J) {
              console.warn("無法聚焦到輸入框:", J);
            }
        }
    }, $ = (Y) => {
      const k = d(Y);
      if (k && typeof k.focus == "function")
        try {
          k.focus();
        } catch (N) {
          console.warn(`無法聚焦到 ${Y} 輸入框:`, N);
        }
    }, U = (Y, k) => {
      const N = d(Y);
      if (N)
        try {
          if (typeof N.focus == "function" && N.focus(), typeof N.setSelectionRange == "function") {
            const ee = k === "end" ? N.value.length : 0;
            N.setSelectionRange(ee, ee);
          }
        } catch (ee) {
          console.warn(`無法聚焦或設置游標位置到 ${Y} 輸入框:`, ee);
        }
    }, q = (Y, k) => {
      const N = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return k === 2 ? rr(Y) ? 29 : 28 : N[k];
    }, _ = (Y, k) => {
      if (!k) return { valid: true };
      const N = parseInt(k);
      switch (Y) {
        case "year":
          if (k.length < 4) return { valid: true };
          const ee = n.maxDate ? (0, import_dayjs.default)(n.maxDate).year() : (/* @__PURE__ */ new Date()).getFullYear() + 50, J = n.minDate ? (0, import_dayjs.default)(n.minDate).year() : 1;
          if (!at(k) || N < J || N > ee)
            return { valid: false, error: { key: "year.outOfRange", params: { min: J, max: ee } } };
          if (s.value === "02" && i.value === "29" && !rr(N))
            return { valid: false, error: { key: "year.notLeapYear", params: { year: N } } };
          break;
        case "month":
          if (!at(k) || N < 1 || N > 12)
            return { valid: false, error: { key: "month.outOfRange" } };
          if (i.value && l.value) {
            const L = parseInt(l.value), K = q(L, N);
            if (parseInt(i.value) > K)
              return { valid: false, error: { key: "day.notExistInMonth", params: { month: k, maxDays: K } } };
          }
          break;
        case "day":
          if (!at(k) || N < 1 || N > 31)
            return { valid: false, error: { key: "day.outOfRange" } };
          if (l.value && s.value) {
            const L = parseInt(l.value), K = parseInt(s.value), ne = q(L, K);
            if (N > ne)
              return K === 2 && N === 29 ? { valid: false, error: { key: "year.notLeapYear", params: { year: L } } } : { valid: false, error: { key: "day.notExistInMonth", params: { month: s.value, maxDays: ne } } };
          }
          break;
      }
      return c.value[Y] && (delete c.value[Y], delete v.value[Y]), { valid: true };
    }, z = () => {
      if (!m.value) return;
      c.value = {}, v.value = {};
      const Y = _("year", l.value), k = _("month", s.value), N = _("day", i.value);
      if (!Y.valid && Y.error && (c.value.year = Y.error, Y.error.params && (v.value.year = Y.error.params)), !k.valid && k.error && (c.value.month = k.error, k.error.params && (v.value.month = k.error.params)), !N.valid && N.error && (c.value.day = N.error, N.error.params && (v.value.day = N.error.params)), n.required && (l.value || (c.value.year = { key: "year.required" }), s.value || (c.value.month = { key: "month.required" }), i.value || (c.value.day = { key: "day.required" })), T.value && Object.keys(c.value).length === 0) {
        const ee = (0, import_dayjs.default)(T.value);
        if (!ee.isValid())
          c.value.day = { key: "day.invalid" };
        else if (n.minDate && ee.isBefore((0, import_dayjs.default)(n.minDate)))
          c.value.day = {
            key: "date.beforeMin",
            params: { minDate: (0, import_dayjs.default)(n.minDate).format(n.dateFormat) }
          }, v.value.day = { minDate: (0, import_dayjs.default)(n.minDate).format(n.dateFormat) };
        else if (n.maxDate && ee.isAfter((0, import_dayjs.default)(n.maxDate)))
          c.value.day = {
            key: "date.afterMax",
            params: { maxDate: (0, import_dayjs.default)(n.maxDate).format(n.dateFormat) }
          }, v.value.day = { maxDate: (0, import_dayjs.default)(n.maxDate).format(n.dateFormat) };
        else if (u.value) {
          o("update:modelValue", u.value);
          const J = u.value;
          J !== M.value && !w.value && (M.value = J, o("complete", u.value));
        }
      } else m.value && !l.value && !s.value && !i.value && (o("update:modelValue", null), M.value = null);
      o("validation", !g.value, b.value, v.value);
    }, re = () => {
      l.value = "", s.value = "", i.value = "", c.value = {};
    }, G = (Y) => {
      const k = S.value.findIndex((ee) => ee === Y), N = k < S.value.length - 1 ? S.value[k + 1] : null;
      N ? nextTick(() => {
        $(N);
      }) : z();
    }, O = (Y, k, N, ee) => {
      const J = k.replace(/\D/g, "");
      if (J.length === 1 && w.value && (w.value = false), J.length <= N) {
        if (ee && J.length === 1 && parseInt(J) > ee) {
          const L = J.padStart(2, "0");
          Y === "year" ? l.value = L : Y === "month" ? s.value = L : Y === "day" && (i.value = L), G(Y);
        } else
          Y === "year" ? l.value = J : Y === "month" ? s.value = J : Y === "day" && (i.value = J);
        J.length === N && G(Y);
      }
    }, E = (Y) => {
      const k = Y.target;
      O("year", k.value, 4);
    }, D = (Y) => {
      const k = Y.target;
      O("month", k.value, 2, 1);
    }, P = (Y) => {
      const k = Y.target;
      O("day", k.value, 2, 3);
    }, A = () => {
      nextTick(() => {
        if (S.value.length === 0) return;
        const Y = S.value[S.value.length - 1], k = d(Y);
        if (k && typeof k.focus == "function")
          try {
            k.focus();
            const N = k.value.length;
            k.setSelectionRange(N, N);
          } catch (N) {
            console.warn("無法聚焦到最後一個輸入框:", N);
          }
      });
    }, te = (Y, k) => {
      const N = Y.target, ee = S.value.findIndex((K) => K === k), J = ee > 0 ? S.value[ee - 1] : null, L = ee < S.value.length - 1 ? S.value[ee + 1] : null;
      Y.key === "Backspace" && N.value === "" && J && (Y.preventDefault(), w.value = true, U(J, "end")), Y.key === "ArrowLeft" && N.selectionStart === 0 && J && (Y.preventDefault(), w.value = true, U(J, "end")), Y.key === "ArrowRight" && N.selectionStart === N.value.length && L && (Y.preventDefault(), w.value = true, U(L, "start")), Y.key === "Enter" && z();
    }, ce = (Y) => {
      p.value = Y;
    }, se = (Y) => {
      z(), p.value = null;
    };
    return e({
      validate: z,
      reset: () => {
        re(), o("update:modelValue", null);
      },
      getErrors: () => ({ ...c.value }),
      hasErrors: () => g.value,
      errorMessages: () => x.value,
      focus: y,
      focusLast: A,
      setDate: (Y) => {
        if (Y) {
          const k = pe(Y);
          k && (l.value = k.year.toString(), s.value = k.month.toString().padStart(2, "0"), i.value = k.day.toString().padStart(2, "0"), z());
        } else
          re(), o("update:modelValue", null);
      },
      resetCompletionState: () => {
        w.value = false, M.value = null;
      }
    }), (Y, k) => (openBlock(), createElementBlock("div", Co, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(S.value, (N, ee) => (openBlock(), createElementBlock(Fragment, { key: N }, [
        N === "year" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 0,
          ref_for: true,
          ref: (J) => f(J, "year"),
          "onUpdate:modelValue": k[0] || (k[0] = (J) => l.value = J),
          type: "text",
          inputmode: "numeric",
          placeholder: Y.yearPlaceholder,
          maxlength: 4,
          class: "date-input text-sm text-center active:bg-vdt-theme-100",
          onInput: E,
          onKeydown: k[1] || (k[1] = (J) => te(J, "year")),
          onFocus: k[2] || (k[2] = (J) => ce("year")),
          onBlur: k[3] || (k[3] = (J) => se()),
          "aria-label": "year",
          "aria-invalid": !!b.value.year,
          "aria-errormessage": b.value.year ? "year-error" : void 0
        }, null, 40, Ro)), [
          [vModelText, l.value],
          [a, 20]
        ]) : N === "month" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 1,
          ref_for: true,
          ref: (J) => f(J, "month"),
          "onUpdate:modelValue": k[4] || (k[4] = (J) => s.value = J),
          type: "text",
          inputmode: "numeric",
          placeholder: Y.monthPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: D,
          onKeydown: k[5] || (k[5] = (J) => te(J, "month")),
          onFocus: k[6] || (k[6] = (J) => ce("month")),
          onBlur: k[7] || (k[7] = (J) => se()),
          "aria-label": "month",
          "aria-invalid": !!b.value.month,
          "aria-errormessage": b.value.month ? "month-error" : void 0
        }, null, 40, Eo)), [
          [vModelText, s.value],
          [a, 20]
        ]) : N === "day" ? withDirectives((openBlock(), createElementBlock("input", {
          key: 2,
          ref_for: true,
          ref: (J) => f(J, "day"),
          "onUpdate:modelValue": k[8] || (k[8] = (J) => i.value = J),
          type: "text",
          inputmode: "numeric",
          placeholder: Y.dayPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: P,
          onKeydown: k[9] || (k[9] = (J) => te(J, "day")),
          onFocus: k[10] || (k[10] = (J) => ce("day")),
          onBlur: k[11] || (k[11] = (J) => se()),
          "aria-label": "day",
          "aria-invalid": !!b.value.day,
          "aria-errormessage": b.value.day ? "day-error" : void 0
        }, null, 40, Io)), [
          [vModelText, i.value],
          [a, 20]
        ]) : createCommentVNode("", true),
        ee < S.value.length - 1 ? (openBlock(), createElementBlock("span", Oo, toDisplayString(Y.separator), 1)) : createCommentVNode("", true)
      ], 64))), 128))
    ]));
  }
});
var We = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [a, n] of e)
    t[a] = n;
  return t;
};
var ca = We(Fo, [["__scopeId", "data-v-917a492c"]]);
var Vo = { class: "time-input-container flex items-center justify-center" };
var Ao = ["placeholder", "aria-invalid", "aria-errormessage"];
var Po = ["placeholder", "aria-invalid", "aria-errormessage"];
var Lo = ["placeholder", "aria-invalid", "aria-errormessage"];
var Bo = defineComponent({
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
      mounted: rt.mounted,
      updated: rt.updated,
      beforeUnmount: rt.beforeUnmount
    }, n = r, o = t, l = ref(""), s = ref(""), i = ref(""), c = ref("AM"), v = ref({}), p = ref({}), m = ref(null), w = ref(false), M = ref(), h = ref(), f = ref(), d = computed(() => Object.keys(v.value).length > 0), b = computed(() => {
      const O = {};
      return Object.entries(v.value).forEach(([E, D]) => {
        O[E] = D.key;
      }), O;
    }), g = () => {
      l.value = "", s.value = "", i.value = "", c.value = "AM";
    }, x = computed(() => {
      var O, E;
      if (!n.useLocalizedPeriod) return c.value;
      try {
        const D = /* @__PURE__ */ new Date();
        D.setHours(9, 0, 0);
        const P = /* @__PURE__ */ new Date();
        P.setHours(15, 0, 0);
        const A = new Intl.DateTimeFormat(n.locale, {
          hour: "numeric",
          hour12: true
        }), te = A.formatToParts(D), ce = A.formatToParts(P), se = ((O = te.find((k) => k.type === "dayPeriod")) == null ? void 0 : O.value) || "AM", Y = ((E = ce.find((k) => k.type === "dayPeriod")) == null ? void 0 : E.value) || "PM";
        return c.value === "AM" ? se : Y;
      } catch (D) {
        return console.error("Error getting localized period:", D), c.value;
      }
    }), S = computed(() => x.value), T = computed(() => {
      if (l.value === "" || s.value === "" || n.enableSeconds && i.value === "")
        return null;
      let O = parseInt(l.value, 10);
      n.use24Hour || (c.value === "PM" && O < 12 ? O += 12 : c.value === "AM" && O === 12 && (O = 0));
      const E = O.toString().padStart(2, "0"), D = s.value.padStart(2, "0");
      if (n.enableSeconds) {
        const P = i.value.padStart(2, "0");
        return `${E}:${D}:${P}`;
      } else
        return `${E}:${D}`;
    });
    watch(() => n.modelValue, (O) => {
      if (w.value || (w.value = true), O) {
        const E = O.split(":");
        let D = parseInt(E[0] || "0", 10);
        const P = (E[1] || "").replace(/\D/g, ""), A = (E[2] || "").replace(/\D/g, "");
        n.use24Hour || (D >= 12 ? (c.value = "PM", D = D === 12 ? 12 : D - 12) : (c.value = "AM", D = D === 0 ? 12 : D)), l.value = D.toString().padStart(2, "0"), s.value = P, n.enableSeconds && (i.value = A);
      } else
        g();
    }, { immediate: true });
    const u = (O, E) => {
      if (!E) return { valid: true };
      const D = parseInt(E);
      switch (O) {
        case "hour":
          const P = n.use24Hour ? 23 : 12, A = n.use24Hour ? 0 : 1;
          if (!at(E) || D < A || D > P)
            return { valid: false, error: { key: "time.hourOutOfRange", params: { min: A, max: P } } };
          break;
        case "minute":
          if (!at(E) || D < 0 || D > 59)
            return { valid: false, error: { key: "time.minuteOutOfRange", params: { min: 0, max: 59 } } };
          if (n.minuteStep > 1 && D % n.minuteStep !== 0)
            return { valid: false, error: { key: "time.minuteStepInvalid", params: { step: n.minuteStep } } };
          break;
        case "second":
          if (!at(E) || D < 0 || D > 59)
            return { valid: false, error: { key: "time.secondOutOfRange", params: { min: 0, max: 59 } } };
          break;
      }
      return v.value[O] && (delete v.value[O], delete p.value[O]), { valid: true };
    }, y = () => {
      c.value = c.value === "AM" ? "PM" : "AM", $();
    }, $ = () => {
      if (!w.value) return;
      v.value = {}, p.value = {};
      const O = u("hour", l.value), E = u("minute", s.value), D = n.enableSeconds ? u("second", i.value) : { valid: true };
      !O.valid && O.error && (v.value.hour = O.error, O.error.params && (p.value.hour = O.error.params)), !E.valid && E.error && (v.value.minute = E.error, E.error.params && (p.value.minute = E.error.params)), !D.valid && D.error && (v.value.second = D.error, D.error.params && (p.value.second = D.error.params)), n.required && (l.value || (v.value.hour = { key: "time.hourRequired" }), s.value || (v.value.minute = { key: "time.minuteRequired" }), n.enableSeconds && !i.value && (v.value.second = { key: "time.secondRequired" })), o("validation", !d.value, b.value, p.value), T.value ? (o("update:modelValue", T.value), o("complete", T.value)) : w.value && o("update:modelValue", null);
    }, U = (O) => {
      const D = O.target.value.replace(/\D/g, "");
      if (D.length <= 2) {
        if (l.value = D, !u("hour", D).valid) return;
        (D.length === 2 || n.use24Hour && parseInt(D) > 2 || !n.use24Hour && parseInt(D) > 1) && nextTick(() => {
          var A;
          (A = h.value) == null || A.focus();
        });
      }
    }, q = (O) => {
      const D = O.target.value.replace(/\D/g, "");
      if (D.length <= 2) {
        if (D.length === 1 && parseInt(D) > 5 ? (s.value = D.padStart(2, "0"), nextTick(() => {
          n.enableSeconds && f.value ? f.value.focus() : $();
        })) : s.value = D, !u("minute", D).valid) return;
        D.length === 2 && nextTick(() => {
          n.enableSeconds && f.value ? f.value.focus() : $();
        });
      }
    }, _ = (O) => {
      const D = O.target.value.replace(/\D/g, "");
      if (D.length <= 2) {
        if (D.length === 1 && parseInt(D) > 5 ? (i.value = D.padStart(2, "0"), $()) : i.value = D, !u("second", D).valid) return;
        D.length === 2 && $();
      }
    }, z = (O, E) => {
      var P, A, te, ce, se, Y, k, N, ee, J, L, K;
      const D = O.target;
      if (O.key === "Backspace" && D.value === "")
        switch (E) {
          case "hour":
            O.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            O.preventDefault(), (P = M.value) == null || P.focus(), (A = M.value) == null || A.setSelectionRange(-1, -1);
            break;
          case "second":
            O.preventDefault(), (te = h.value) == null || te.focus(), (ce = h.value) == null || ce.setSelectionRange(-1, -1);
            break;
        }
      if (O.key === "ArrowLeft" && D.selectionStart === 0)
        switch (E) {
          case "hour":
            O.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            O.preventDefault(), (se = M.value) == null || se.focus(), (Y = M.value) == null || Y.setSelectionRange(-1, -1);
            break;
          case "second":
            O.preventDefault(), (k = h.value) == null || k.focus(), (N = h.value) == null || N.setSelectionRange(-1, -1);
            break;
        }
      if (O.key === "ArrowRight" && D.selectionStart === D.value.length)
        switch (E) {
          case "hour":
            O.preventDefault(), (ee = h.value) == null || ee.focus(), (J = h.value) == null || J.setSelectionRange(0, 0);
            break;
          case "minute":
            n.enableSeconds && (O.preventDefault(), (L = f.value) == null || L.focus(), (K = f.value) == null || K.setSelectionRange(0, 0));
            break;
        }
      O.key === "Enter" && $();
    }, re = (O) => {
      m.value = O;
    }, G = (O) => {
      m.value = null, $();
    };
    return e({
      validate: $,
      reset: () => {
        g(), v.value = {}, p.value = {}, o("update:modelValue", null);
      },
      getErrors: () => b.value,
      hasErrors: d,
      setTime: (O) => {
        if (O) {
          const [E, D, P] = O.split(":");
          let A = parseInt(E);
          n.use24Hour || (A >= 12 ? (c.value = "PM", A = A === 12 ? 12 : A - 12) : (c.value = "AM", A = A === 0 ? 12 : A)), l.value = A.toString().padStart(2, "0"), s.value = D, n.enableSeconds && P && (i.value = P), $();
        } else
          g(), o("update:modelValue", null);
      },
      focus: () => {
        var O;
        (O = M.value) == null || O.focus();
      },
      focusLast: () => {
        n.enableSeconds && f.value ? (f.value.focus(), f.value.setSelectionRange(0, 0)) : h.value ? (h.value.focus(), h.value.setSelectionRange(0, 0)) : M.value && (M.value.focus(), M.value.setSelectionRange(0, 0));
      }
    }), (O, E) => (openBlock(), createElementBlock("div", Vo, [
      withDirectives(createBaseVNode("input", {
        ref_key: "hourRef",
        ref: M,
        "onUpdate:modelValue": E[0] || (E[0] = (D) => l.value = D),
        type: "text",
        inputmode: "numeric",
        placeholder: O.hourPlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: U,
        onKeydown: E[1] || (E[1] = (D) => z(D, "hour")),
        onFocus: E[2] || (E[2] = (D) => re("hour")),
        onBlur: E[3] || (E[3] = (D) => G()),
        "aria-label": "hour",
        "aria-invalid": !!v.value.hour,
        "aria-errormessage": v.value.hour ? "hour-error" : void 0
      }, null, 40, Ao), [
        [vModelText, l.value],
        [a, 20]
      ]),
      E[13] || (E[13] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
      withDirectives(createBaseVNode("input", {
        ref_key: "minuteRef",
        ref: h,
        "onUpdate:modelValue": E[4] || (E[4] = (D) => s.value = D),
        type: "text",
        inputmode: "numeric",
        placeholder: O.minutePlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: q,
        onKeydown: E[5] || (E[5] = (D) => z(D, "minute")),
        onFocus: E[6] || (E[6] = (D) => re("minute")),
        onBlur: E[7] || (E[7] = (D) => G()),
        "aria-label": "minute",
        "aria-invalid": !!v.value.minute,
        "aria-errormessage": v.value.minute ? "minute-error" : void 0
      }, null, 40, Po), [
        [vModelText, s.value],
        [a, 20]
      ]),
      O.enableSeconds ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        E[12] || (E[12] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
        withDirectives(createBaseVNode("input", {
          ref_key: "secondRef",
          ref: f,
          "onUpdate:modelValue": E[8] || (E[8] = (D) => i.value = D),
          type: "text",
          inputmode: "numeric",
          placeholder: O.secondPlaceholder,
          maxlength: 2,
          class: "time-input text-sm text-center",
          onInput: _,
          onKeydown: E[9] || (E[9] = (D) => z(D, "second")),
          onFocus: E[10] || (E[10] = (D) => re("second")),
          onBlur: E[11] || (E[11] = (D) => G()),
          "aria-label": "second",
          "aria-invalid": !!v.value.second,
          "aria-errormessage": v.value.second ? "second-error" : void 0
        }, null, 40, Lo), [
          [vModelText, i.value],
          [a, 20]
        ])
      ], 64)) : createCommentVNode("", true),
      O.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
        key: 1,
        type: "button",
        class: normalizeClass(["time-period pl-2 text-sm cursor-pointer", l.value ? "text-vdt-content" : "text-gray-400"]),
        onClick: withModifiers(y, ["stop"])
      }, toDisplayString(S.value), 3))
    ]));
  }
});
var da = We(Bo, [["__scopeId", "data-v-fb3720c7"]]);
var Ho = {
  error: {
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
var qo = {
  error: {
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
var No = {
  error: {
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
var Uo = {
  error: {
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
var zo = {
  error: {
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
var xt = {
  "zh-TW": Ho,
  "zh-CN": qo,
  "en-US": No,
  "ja-JP": Uo,
  "ko-KR": zo
};
function Vr(r, e) {
  return r.replace(/\{(\w+)\}/g, (t, a) => {
    var n;
    return ((n = e[a]) == null ? void 0 : n.toString()) || t;
  });
}
var Wo = class {
  constructor() {
    De(this, "currentLocale", "zh-TW");
  }
  setLocale(e) {
    this.currentLocale = e;
  }
  getCurrentLocale() {
    return this.currentLocale;
  }
  getMessage(e, t) {
    const a = e.split(".");
    let n = xt[this.currentLocale];
    for (const o of a)
      n = n == null ? void 0 : n[o];
    return typeof n != "string" ? (console.warn(`Missing translation for path: ${e} in locale: ${this.currentLocale}`), e) : t ? Vr(n, t) : n;
  }
  getErrorMessage(e, t) {
    return this.getMessage(`error.${e}`, t);
  }
  getPlaceholderMessage(e, t) {
    return this.getMessage(`placeholder.${e}`, t);
  }
  // 支援自定義語言包
  addCustomMessages(e, t) {
    xt[e] = {
      ...xt[e],
      ...this.deepMerge(xt[e], t)
    };
  }
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
function Dt(r = "en-US") {
  const e = new Wo(), t = ["zh-TW", "zh-CN", "en-US", "ja-JP", "ko-KR"], a = (p) => t.includes(p) ? p : (console.warn(`Locale "${p}" is not supported. Defaulting to "en-US".`), "en-US"), n = a(r), o = ref(n);
  e.setLocale(n);
  const l = (p) => {
    o.value = a(p), e.setLocale(o.value);
  }, s = (p, m) => e.getMessage(p, m), i = (p, m) => e.getErrorMessage(p, m), c = (p, m) => e.getPlaceholderMessage(p, m), v = (p, m) => Vr(p, m);
  return {
    currentLocale: computed(() => o.value),
    setLocale: l,
    getMessage: s,
    getErrorMessage: i,
    getPlaceholderMessage: c,
    formatText: v
  };
}
var jo = {
  key: 0,
  class: "date-error-message mt-1 text-sm text-red-500"
};
var Jo = { key: 0 };
var _o = { key: 1 };
var Ko = { key: 2 };
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
    const t = r, { currentLocale: a, setLocale: n, getErrorMessage: o } = Dt(t.locale);
    watch(() => t.locale, (f) => {
      f && t.useI18n && n(f);
    }, { immediate: true });
    const l = ref({}), s = ref({}), i = computed(() => ({
      ...t.customMessages,
      ...l.value
    })), c = computed(() => t.errors ? Array.isArray(t.errors) ? t.errors.length > 0 : typeof t.errors == "string" ? t.errors.trim().length > 0 : typeof t.errors == "object" ? Object.values(t.errors).some((f) => f && f.trim().length > 0) : false : false), v = computed(() => {
      if (!t.errors) return null;
      if (typeof t.errors == "string")
        return M(t.errors);
      if (Array.isArray(t.errors))
        return t.errors.map((f, d) => ({
          field: `item-${d}`,
          message: M(f),
          originalKey: f
        }));
      if (typeof t.errors == "object") {
        const f = {};
        return Object.entries(t.errors).forEach(([d, b]) => {
          var g;
          if (b) {
            s.value[d] = b;
            const x = ((g = t.errorParams) == null ? void 0 : g[d]) || {};
            f[d] = M(b, d, x), t.debug && console.log(`Processing error for field "${d}":`, {
              original: b,
              params: x,
              translated: f[d],
              field: d,
              slotName: m(d)
            });
          }
        }), f;
      }
      return t.errors;
    });
    function p(f) {
      return s.value[f];
    }
    function m(f) {
      return `error-${f.replace(/^(date|time|range)\./, "")}`;
    }
    function w(f) {
      return f.startsWith("date.") ? "date" : f.startsWith("time.") ? "time" : f.startsWith("range.") ? "range" : "unknown";
    }
    function M(f, d, b = {}) {
      if (t.debug && console.log(`翻譯訊息: "${f}", field: "${d}", params:`, b), i.value[f])
        return i.value[f];
      if (!t.useI18n)
        return f;
      if (/^[a-zA-Z]+\.[a-zA-Z]+$/.test(f))
        try {
          const S = o(f, b);
          if (t.debug && console.log(`Locale key 翻譯: "${f}" -> "${S}" with params:`, b), S && S !== f)
            return S;
        } catch (S) {
          t.debug && console.warn(`Locale key 翻譯失敗: ${f}`, S);
        }
      const x = t.messageKeyMap[f];
      if (x)
        try {
          const S = o(x, b);
          if (t.debug && console.log(`MessageKeyMap 翻譯: "${f}" -> "${S}" with params:`, b), S && S !== x)
            return S;
        } catch (S) {
          t.debug && console.warn(`MessageKeyMap 翻譯失敗: ${x}`, S);
        }
      return h(f, d, b);
    }
    function h(f, d, b = {}) {
      t.debug && console.log(`smartTranslateError: "${f}", field: "${d}", params:`, b);
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
      if (g[f])
        try {
          const u = o(g[f], b);
          if (t.debug && console.log(`直接匹配翻譯: "${f}" -> "${u}" with params:`, b), u && u !== g[f])
            return u;
        } catch (u) {
          t.debug && console.warn(`直接匹配翻譯失敗: ${g[f]}`, u);
        }
      function x(u, y) {
        if (/請輸入|please enter|required/i.test(u)) {
          if (y != null && y.includes("year") || u.includes("年份")) return "year.required";
          if (y != null && y.includes("month") || u.includes("月份")) return "month.required";
          if (y != null && y.includes("day") || u.includes("日期")) return "day.required";
          if (y != null && y.includes("hour") || u.includes("小時")) return "time.hourRequired";
          if (y != null && y.includes("minute") || u.includes("分鐘")) return "time.minuteRequired";
          if (y != null && y.includes("second") || u.includes("秒鐘")) return "time.secondRequired";
          if (y != null && y.includes("startDate") || u.includes("開始日期")) return "range.startRequired";
          if (y != null && y.includes("endDate") || u.includes("結束日期")) return "range.endRequired";
          if (y != null && y.includes("time") || u.includes("時間")) return "time.required";
          if (y != null && y.includes("date") || u.includes("日期")) return "date.required";
        }
        return null;
      }
      const S = x(f, d);
      if (S)
        try {
          const u = o(S, b);
          if (t.debug && console.log(`智能匹配翻譯: "${f}" -> "${u}" with params:`, b), u && u !== S)
            return u;
        } catch (u) {
          t.debug && console.warn(`智能匹配翻譯失敗: ${S}`, u);
        }
      const T = [
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
          handler: (u) => u != null && u.includes("year") ? "year.invalid" : u != null && u.includes("month") ? "month.invalid" : u != null && u.includes("day") ? "day.invalid" : u != null && u.includes("time") || u != null && u.includes("hour") || u != null && u.includes("minute") || u != null && u.includes("second") ? "time.invalid" : "date.invalid"
        }
      ];
      for (const u of T)
        if (u.regex.test(f)) {
          const y = u.handler ? u.handler(d) : u.key;
          if (y)
            try {
              const $ = o(y, b);
              if (t.debug && console.log(`模式匹配翻譯: "${f}" -> "${$}" (key: ${y}) with params:`, b), $ && $ !== y)
                return $;
            } catch ($) {
              t.debug && console.warn(`模式匹配翻譯失敗: ${y}`, $);
            }
        }
      return t.debug && console.log(`無法翻譯，返回原始訊息: "${f}"`), f;
    }
    return e({
      hasErrors: c,
      processedErrors: v,
      translateMessage: M,
      getOriginalKey: p,
      getSlotName: m,
      getFieldType: w,
      setLocale: (f) => {
        n(f);
      },
      addCustomTranslation: (f, d) => {
        l.value[f] = d;
      },
      currentLocale: a
    }), (f, d) => c.value ? (openBlock(), createElementBlock("div", jo, [
      Array.isArray(v.value) ? (openBlock(), createElementBlock("div", Jo, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(v.value, (b, g) => (openBlock(), createElementBlock("div", { key: g }, [
          renderSlot(f.$slots, `error-${b.field}`, {
            error: b,
            message: b.message,
            field: b.field
          }, () => [
            createBaseVNode("span", null, toDisplayString(b.message), 1)
          ])
        ]))), 128))
      ])) : typeof v.value == "string" ? (openBlock(), createElementBlock("div", _o, [
        renderSlot(f.$slots, "error-single", {
          error: v.value,
          message: v.value
        }, () => [
          createBaseVNode("span", null, toDisplayString(v.value), 1)
        ])
      ])) : typeof v.value == "object" ? (openBlock(), createElementBlock("div", Ko, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(v.value, (b, g) => (openBlock(), createElementBlock("div", { key: g }, [
          renderSlot(f.$slots, m(g), {
            field: g,
            error: b,
            message: b,
            originalKey: p(g),
            fieldType: w(g)
          }, () => [
            createBaseVNode("span", null, toDisplayString(b), 1)
          ])
        ]))), 128))
      ])) : createCommentVNode("", true)
    ])) : createCommentVNode("", true);
  }
});
var Qo = {};
var Zo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
function Go(r, e) {
  return openBlock(), createElementBlock("svg", Zo, e[0] || (e[0] = [
    createBaseVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    }, null, -1)
  ]));
}
var Pr = We(Qo, [["render", Go]]);
var Xo = {};
var el = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
};
function tl(r, e) {
  return openBlock(), createElementBlock("svg", el, e[0] || (e[0] = [
    createBaseVNode("path", {
      "fill-rule": "evenodd",
      d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
var Lr = We(Xo, [["render", tl]]);
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
      d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
var Br = We(al, [["render", nl]]);
var ol = { class: "p-2 flex items-center justify-between border-b border-vdt-outline" };
var ll = ["disabled"];
var sl = { class: "text-sm font-medium" };
var il = ["disabled"];
var ul = {
  key: 0,
  class: "grid grid-cols-4 gap-1 p-2"
};
var cl = ["onClick", "title"];
var dl = { class: "font-medium" };
var fl = { key: 0 };
var ml = {
  key: 0,
  class: "text-xs opacity-60 mt-0.5"
};
var hl = {
  key: 1,
  class: "p-4 text-center text-sm text-vdt-content-muted"
};
var vl = { class: "mb-2" };
var pl = { class: "p-2 border-t border-vdt-outline" };
var gl = { class: "text-xs text-gray-400 mb-1" };
var yl = ["placeholder", "min", "max"];
var $l = { class: "text-xs text-vdt-content-muted mt-1" };
var Dl = defineComponent({
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
    const a = r, n = t, { getMessage: o, formatText: l } = Dt(a.locale), s = ref(null), i = ref(null), c = computed(() => me.getCalendarRange(a.calendar)), v = computed(() => me.getCalendarDisplayName(a.calendar, a.locale)), p = computed(() => a.calendar === "gregory"), m = computed(() => a.calendar === "japanese"), w = computed(() => T.value[0]), M = computed(() => T.value[T.value.length - 1]), h = ref(0), f = (D) => {
      const P = Math.floor(D / a.pageSize) * a.pageSize;
      return Math.max(P, c.value.min);
    }, d = () => {
      h.value = f(a.selectedYear);
    }, b = /* @__PURE__ */ new Map(), g = (D, P) => {
      const A = `${D}-${P}`;
      if (!b.has(A))
        try {
          b.set(A, new zt(P, { calendar: D, year: "numeric", era: "short" }));
        } catch {
          b.set(A, new zt(P, { year: "numeric" }));
        }
      return b.get(A);
    }, x = (D) => {
      var A, te;
      const P = {
        gregorianYear: D,
        displayEra: "",
        displayYear: D.toString(),
        showReference: false,
        displayWarning: false
      };
      if (p.value)
        return P;
      try {
        const ce = new ue(D, 6, 1), se = me.safeToCalendar(ce, me.createSafeCalendar(a.calendar)), k = g(a.calendar, a.locale).formatToParts(se.toDate("UTC"));
        P.displayYear = ((A = k.find((J) => J.type === "year")) == null ? void 0 : A.value) || D.toString(), P.displayEra = ((te = k.find((J) => J.type === "era")) == null ? void 0 : te.value) || "";
        const N = !!P.displayEra, ee = P.displayEra !== D.toString();
        (N || ee) && (P.showReference = true, P.referenceYear = D.toString());
      } catch {
        if (P.displayWarning = true, P.warningMessage = `無法轉換為${v.value}`, a.calendar === "roc") {
          const se = D - 1911;
          P.displayYear = se > 0 ? se.toString() : `民國前${Math.abs(se - 1)}年`;
        }
      }
      return P;
    }, S = (D) => D >= c.value.min && D <= c.value.max, T = computed(() => {
      const D = h.value, P = [];
      for (let A = 0; A < a.pageSize; A++) {
        const te = D + A;
        if (te > c.value.max) break;
        te < c.value.min || P.push(x(te));
      }
      return P;
    }), u = computed(() => {
      const D = T.value;
      if (D.length === 0) return "";
      const P = D[0], A = D[D.length - 1];
      if (p.value)
        return `${P.displayYear} - ${A.displayYear}`;
      if (P.gregorianYear === A.gregorianYear)
        return P.displayYear;
      const te = P.displayEra, ce = A.displayEra;
      return te && ce && te === ce ? `${te} ${P.displayYear} - ${A.displayYear}` : `${P.displayEra} ${P.displayYear} - ${A.displayEra} ${A.displayYear}`;
    }), y = computed(() => h.value > c.value.min), $ = computed(() => h.value + a.pageSize <= c.value.max), U = () => {
      y.value && (h.value = Math.max(
        h.value - a.pageSize,
        c.value.min
      ));
    }, q = () => {
      $.value && (h.value = Math.min(
        h.value + a.pageSize,
        c.value.max
      ));
    }, _ = (D) => {
      S(D) && (n("year-selected", D), n("update:showSelector", false));
    }, z = () => {
      i.value && (S(i.value) ? (h.value = f(i.value), n("year-selected", i.value), n("update:showSelector", false), i.value = null) : console.warn(`年份 ${i.value} 超出範圍 ${c.value.min}-${c.value.max}`));
    }, re = () => {
      const D = Math.max(c.value.min, Math.min((/* @__PURE__ */ new Date()).getFullYear(), c.value.max));
      n("year-selected", D);
    }, G = (D) => o(`yearSelector.${D}`);
    watch([() => a.selectedYear, () => a.calendar], () => {
      S(a.selectedYear) && (h.value = f(a.selectedYear));
    }, { immediate: true });
    const E = (D) => {
      if (a.showSelector && s.value) {
        const P = D.target, A = !!P.closest("[data-year-selector-button]");
        !s.value.contains(P) && !A && n("update:showSelector", false);
      }
    };
    return onMounted(() => {
      d(), document.addEventListener("mousedown", E);
    }), onBeforeUnmount(() => {
      document.removeEventListener("mousedown", E);
    }), e({
      getLocalizedText: G,
      formatText: l,
      goToSpecificYear: z,
      goToValidRange: re
    }), (D, P) => D.showSelector ? (openBlock(), createElementBlock("div", {
      key: 0,
      ref_key: "yearSelectorRef",
      ref: s,
      class: "absolute top-full mt-1 right-0 min-w-56 max-h-72 overflow-auto bg-vdt-surface-elevated text-vdt-content border border-vdt-outline rounded-md shadow-lg z-20"
    }, [
      createBaseVNode("div", ol, [
        createBaseVNode("button", {
          type: "button",
          onClick: U,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !y.value }]),
          disabled: !y.value,
          "aria-label": "previous year"
        }, [
          createVNode(Lr, { class: "h-4 w-4" })
        ], 10, ll),
        createBaseVNode("span", sl, [
          renderSlot(D.$slots, "year-range-display", {
            firstYear: w.value,
            lastYear: M.value,
            displayText: u.value
          }, () => [
            createTextVNode(toDisplayString(u.value), 1)
          ], true)
        ]),
        createBaseVNode("button", {
          type: "button",
          onClick: q,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !$.value }]),
          disabled: !$.value,
          "aria-label": "next year"
        }, [
          createVNode(Br, { class: "h-4 w-4" })
        ], 10, il)
      ]),
      T.value.length > 0 ? (openBlock(), createElementBlock("div", ul, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(T.value, (A) => (openBlock(), createElementBlock("button", {
          type: "button",
          key: A.gregorianYear,
          onClick: (te) => _(A.gregorianYear),
          class: normalizeClass([
            "p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200",
            D.selectedYear === A.gregorianYear ? "bg-vdt-theme-500 text-white" : "hover:bg-vdt-interactive-hover text-vdt-content",
            A.displayWarning ? "ring-1 ring-amber-400" : ""
          ]),
          title: A.warningMessage
        }, [
          renderSlot(D.$slots, "year-display", {
            yearData: A,
            isSelected: D.selectedYear === A.gregorianYear
          }, () => [
            createBaseVNode("div", dl, [
              m.value ? (openBlock(), createElementBlock("div", fl, toDisplayString(A.displayEra), 1)) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(A.displayYear), 1)
            ]),
            A.showReference ? (openBlock(), createElementBlock("div", ml, toDisplayString(A.referenceYear), 1)) : createCommentVNode("", true)
          ], true)
        ], 10, cl))), 128))
      ])) : (openBlock(), createElementBlock("div", hl, [
        renderSlot(D.$slots, "no-years-display", {
          calendarRange: c.value,
          goToValidRange: re
        }, () => [
          createBaseVNode("div", vl, toDisplayString(G("noYearsToDisplay")), 1),
          createBaseVNode("button", {
            type: "button",
            onClick: re,
            class: "text-xs bg-vdt-theme-100 hover:bg-vdt-theme-200 px-3 py-1 rounded text-vdt-theme-700"
          }, toDisplayString(G("returnToValidRange")), 1)
        ], true)
      ])),
      createBaseVNode("div", pl, [
        renderSlot(D.$slots, "year-input", {
          yearInput: i.value,
          calendarRange: c.value,
          calendarDisplayName: v.value,
          goToSpecificYear: z,
          getLocalizedText: G,
          formatText: unref(l)
        }, () => [
          createBaseVNode("div", gl, toDisplayString(G("jumpToYear")), 1),
          withDirectives(createBaseVNode("input", {
            type: "number",
            "onUpdate:modelValue": P[0] || (P[0] = (A) => i.value = A),
            onKeydown: withKeys(z, ["enter"]),
            placeholder: G("inputYearPlaceholder"),
            min: c.value.min,
            max: c.value.max,
            class: "w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500"
          }, null, 40, yl), [
            [vModelText, i.value]
          ]),
          createBaseVNode("div", $l, toDisplayString(unref(l)(G("yearRangeInfo"), {
            calendar: v.value,
            min: c.value.min,
            max: c.value.max
          })), 1)
        ], true)
      ])
    ], 512)) : createCommentVNode("", true);
  }
});
var bl = We(Dl, [["__scopeId", "data-v-f14c8987"]]);
var Ml = { class: "flex justify-between items-center mb-4 gap-2" };
var Sl = ["disabled"];
var wl = { class: "grow grid grid-cols-2 gap-2" };
var kl = ["value"];
var Tl = { class: "relative" };
var xl = ["disabled"];
var Yl = defineComponent({
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
    const t = r, a = e, n = ref(t.month), o = ref(t.year), l = ref(false), s = computed(() => t.calendar || "gregory"), i = computed(() => me.getCalendarRange(t.calendar));
    watch(() => t.month, (g) => {
      n.value = g;
    }, { immediate: true }), watch(() => t.year, (g) => {
      o.value = g;
    }, { immediate: true });
    const c = computed(() => {
      if (t.calendar === "gregory")
        return o.value.toString();
      try {
        const g = new ue(o.value, 6, 1), x = me.safeToCalendar(
          g,
          me.createSafeCalendar(t.calendar)
        );
        return new zt(t.locale, {
          calendar: t.calendar,
          year: "numeric"
        }).format(x.toDate("UTC"));
      } catch {
        return o.value.toString();
      }
    }), v = computed(() => me.getMonthNames(t.locale, t.calendar)), p = computed(() => {
      let g = o.value, x = n.value - 1;
      return x < 1 && (x = 12, g = o.value - 1), g >= i.value.min;
    }), m = computed(() => {
      let g = o.value, x = n.value + 1;
      return x > 12 && (x = 1, g = o.value + 1), g <= i.value.max;
    }), w = () => {
      if (!p.value) return;
      let g = n.value - 1, x = o.value;
      g < 1 && (g = 12, x -= 1), x >= i.value.min && d(g, x);
    }, M = () => {
      if (!m.value) return;
      let g = n.value + 1, x = o.value;
      g > 12 && (g = 1, x += 1), x <= i.value.max && d(g, x);
    }, h = () => {
      d(n.value, o.value);
    }, f = (g) => {
      g >= i.value.min && g <= i.value.max && (o.value = g, d(n.value, g));
    }, d = (g, x) => {
      n.value = g, o.value = x, a("update:month", g), a("update:year", x);
    }, b = () => {
      l.value = !l.value;
    };
    return (g, x) => (openBlock(), createElementBlock("div", Ml, [
      createBaseVNode("button", {
        type: "button",
        onClick: w,
        class: "p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "上個月",
        disabled: !p.value
      }, [
        createVNode(Lr, { class: "h-5 w-5" })
      ], 8, Sl),
      createBaseVNode("div", wl, [
        renderSlot(g.$slots, "month-selector", {
          monthNames: v.value,
          selectedMonth: n.value,
          onMonthChange: h
        }, () => [
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": x[0] || (x[0] = (S) => n.value = S),
            onChange: h,
            class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500",
            "aria-label": "選擇月份",
            role: "combobox"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(v.value, (S, T) => (openBlock(), createElementBlock("option", {
              key: T,
              value: T + 1
            }, toDisplayString(S), 9, kl))), 128))
          ], 544), [
            [vModelSelect, n.value]
          ])
        ]),
        createBaseVNode("div", Tl, [
          renderSlot(g.$slots, "year-selector", {
            displayYear: c.value,
            toggleYearSelector: b,
            showYearSelector: l.value
          }, () => [
            createBaseVNode("button", {
              type: "button",
              onClick: b,
              "data-year-selector-button": "",
              class: "inline-flex items-center px-2 py-1 bg-vdt-surface text-vdt-content w-full border border-vdt-outline rounded-sm text-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200",
              "aria-label": "選擇年份"
            }, toDisplayString(c.value), 1)
          ]),
          createVNode(bl, {
            "selected-year": o.value,
            "show-selector": l.value,
            "onUpdate:showSelector": x[1] || (x[1] = (S) => l.value = S),
            calendar: s.value,
            locale: g.locale,
            onYearSelected: f
          }, createSlots({ _: 2 }, [
            renderList(g.$slots, (S, T) => ({
              name: T,
              fn: withCtx((u) => [
                renderSlot(g.$slots, T, normalizeProps(guardReactiveProps(u)))
              ])
            }))
          ]), 1032, ["selected-year", "show-selector", "calendar", "locale"])
        ])
      ]),
      createBaseVNode("button", {
        type: "button",
        onClick: M,
        class: "p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "下個月",
        disabled: !m.value
      }, [
        createVNode(Br, { class: "h-5 w-5" })
      ], 8, xl)
    ]));
  }
});
var Cl = { class: "grid grid-cols-7 mb-2" };
var Rl = defineComponent({
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
    return (a, n) => (openBlock(), createElementBlock("div", Cl, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(t.value, (o, l) => (openBlock(), createElementBlock("div", {
        key: l,
        class: "text-center text-vdt-content text-sm py-2"
      }, toDisplayString(o), 1))), 128))
    ]));
  }
});
var El = { class: "calendar-cell text-center relative" };
var Il = ["disabled", "tabindex", "aria-selected", "aria-disabled", "aria-current", "data-in-current-month"];
var Ol = defineComponent({
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
    return (s, i) => (openBlock(), createElementBlock("div", El, [
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
          i[0] || (i[0] = withKeys((c) => a("nav", "up"), ["up"])),
          i[1] || (i[1] = withKeys((c) => a("nav", "down"), ["down"])),
          i[2] || (i[2] = withKeys((c) => a("nav", "left"), ["left"])),
          i[3] || (i[3] = withKeys((c) => a("nav", "right"), ["right"]))
        ]
      }, toDisplayString(s.date.day), 43, Il)
    ]));
  }
});
var Fl = We(Ol, [["__scopeId", "data-v-9018b2ca"]]);
var Vl = { class: "grid grid-cols-7 gap-1" };
var Al = defineComponent({
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
      const h = tt();
      return `${h.year}-${h.month}-${h.day}`;
    });
    const s = computed(() => me.generateCalendarDays(
      a.year,
      // 西元年
      a.month,
      // 西元月
      a.calendar,
      a.locale,
      a.weekStartsOn
    )), i = (h) => {
      if (!a.rangeStart || !a.rangeEnd) return false;
      try {
        return h.compare(a.rangeStart) >= 0 && h.compare(a.rangeEnd) <= 0;
      } catch {
        return false;
      }
    }, c = (h, f) => {
      if (!h || !f) return false;
      try {
        return h.compare(f) === 0;
      } catch {
        return false;
      }
    }, v = (h) => {
      try {
        return !!(a.minDate && h.compare(a.minDate) < 0 || a.maxDate && h.compare(a.maxDate) > 0);
      } catch {
        return true;
      }
    }, p = (h) => bo(h), m = computed(() => s.value.map((h, f) => {
      const d = `${h.year}-${h.month}-${h.day}`, b = p(h), g = h.month !== o.value, x = v(h), S = a.selectionMode === "single" && c(h, a.selectedDate), T = a.selectionMode === "range" && c(h, a.rangeStart), u = a.selectionMode === "range" && c(h, a.rangeEnd), y = a.selectionMode === "range" && i(h) && !T && !u && !x, $ = h.day === 1 && h.month === o.value, U = [
        d,
        S,
        b,
        x,
        T,
        u,
        y,
        a.selectionMode,
        a.calendar
      ];
      return {
        key: `${a.calendar}-${l.value}-${o.value}-${d}-${f}`,
        memoKey: U,
        date: h,
        isToday: b,
        isSelected: S,
        isDisabled: x,
        isOutsideMonth: g,
        isRangeStart: T,
        isRangeEnd: u,
        isInRange: y,
        isFocusable: $
      };
    })), w = (h) => {
      a.selectionMode === "single" ? n("select", h) : a.selectionMode === "range" && n("range-select", h, null);
    }, M = (h) => {
      const f = m.value;
      if (f.length === 0) return;
      const d = f[0], b = f[f.length - 1];
      switch (h) {
        case "left":
          d.date.day < 15 && d.date.month !== o.value && n("navigate", "prev-month");
          break;
        case "right":
          b.date.day > 15 && b.date.month !== o.value && n("navigate", "next-month");
          break;
      }
    };
    return e({
      getCalendarDays: () => s.value,
      getCellStates: () => m.value
    }), (h, f) => (openBlock(), createElementBlock("div", Vl, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(m.value, (d, b, g, x) => {
        const S = d.memoKey;
        if (x && x.key === d.key && isMemoSame(x, S)) return x;
        const T = (openBlock(), createBlock(Fl, {
          key: d.key,
          date: d.date,
          "current-month": o.value,
          selected: d.isSelected,
          "is-today": d.isToday,
          disabled: d.isDisabled,
          focusable: d.isFocusable,
          "is-range-start": d.isRangeStart,
          "is-range-end": d.isRangeEnd,
          "is-in-range": d.isInRange,
          "selection-mode": h.selectionMode,
          onSelect: w,
          onNav: M
        }, null, 8, ["date", "current-month", "selected", "is-today", "disabled", "focusable", "is-range-start", "is-range-end", "is-in-range", "selection-mode"]));
        return T.memo = S, T;
      }, f, 0), 128))
    ]));
  }
});
var Pl = { key: 0 };
var Ll = { class: "flex flex-row items-center justify-between" };
var Bl = { class: "text-sm font-medium text-vdt-content uppercase" };
var Hl = { class: "flex flex-row items-center gap-1" };
var ql = { class: "time-selector-container pt-1" };
var Nl = { class: "flex flex-row items-center gap-1" };
var Ul = { class: "flex-1" };
var zl = ["value"];
var Wl = { class: "flex-1" };
var jl = ["value"];
var Jl = {
  key: 0,
  class: "flex-1"
};
var _l = ["value"];
var Kl = {
  key: 1,
  class: "flex-shrink-0"
};
var Ql = { class: "isolate inline-flex rounded-md border border-vdt-outline bg-vdt-surface overflow-hidden" };
var Zl = defineComponent({
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
    const a = r, n = t, { getPlaceholderMessage: o } = Dt(a.locale), l = ref(0), s = ref(0), i = ref(0), c = ref("AM"), v = ref(false), p = computed(() => a.use24Hour ? Array.from({ length: 24 }, (u, y) => y) : Array.from({ length: 12 }, (u, y) => y + 1)), m = computed(() => Array.from({ length: 60 }, (u, y) => y)), w = computed(() => Array.from({ length: 60 }, (u, y) => y)), M = computed(() => {
      let u = l.value;
      a.use24Hour || (c.value === "PM" && u < 12 ? u += 12 : c.value === "AM" && u === 12 && (u = 0));
      const y = h(u), $ = h(s.value);
      if (a.enableSeconds) {
        const U = h(i.value);
        return `${y}:${$}:${U}`;
      } else
        return `${y}:${$}`;
    }), h = (u) => u.toString().padStart(2, "0"), f = (u) => h(u), d = (u) => {
      if (!u) return;
      const [y, $, U] = u.split(":");
      let q = parseInt(y) || 0;
      a.use24Hour || (q >= 12 ? (c.value = "PM", q = q === 12 ? 12 : q - 12) : (c.value = "AM", q = q === 0 ? 12 : q)), l.value = q, s.value = parseInt($) || 0, a.enableSeconds && U && (i.value = parseInt(U) || 0), v.value = true;
    }, b = () => {
      d(a.defaultTime);
    }, g = (u) => {
      c.value = u;
    }, x = (u) => {
      const y = /* @__PURE__ */ new Date();
      y.setHours(u === "AM" ? 6 : 18, 0, 0, 0);
      const q = new Intl.DateTimeFormat(a.locale || navigator.language, {
        hour12: true,
        hour: "numeric"
      }).formatToParts(y).find((_) => _.type === "dayPeriod");
      return (q == null ? void 0 : q.value) || u;
    }, S = () => {
      const u = /* @__PURE__ */ new Date();
      if (a.use24Hour)
        l.value = u.getHours();
      else {
        const y = u.getHours();
        c.value = y >= 12 ? "PM" : "AM", l.value = y % 12 || 12;
      }
      s.value = u.getMinutes(), a.enableSeconds && (i.value = u.getSeconds()), v.value = true;
    }, T = () => {
      n("today-click");
    };
    return watch(() => a.timeValue, (u) => {
      u ? d(u) : !v.value && a.show && b();
    }, { immediate: true }), watch(
      [l, s, i, c],
      () => {
        v.value && n("time-change", M.value);
      }
    ), e({
      // 獲取當前時間值
      getCurrentTime: () => M.value,
      // 設置時間
      setTime: (u) => d(u),
      // 重置為預設時間
      resetToDefault: () => b()
    }), (u, y) => u.show ? (openBlock(), createElementBlock("div", Pl, [
      y[5] || (y[5] = createBaseVNode("hr", { class: "my-2 border-vdt-outline" }, null, -1)),
      createBaseVNode("div", Ll, [
        createBaseVNode("label", Bl, toDisplayString(unref(o)("general.time")) + ": ", 1),
        createBaseVNode("div", Hl, [
          createBaseVNode("button", {
            type: "button",
            onClick: S,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-active cursor-pointer"
          }, " Now "),
          u.selectionMode === "single" ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            onClick: T,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-active cursor-pointer"
          }, " Today ")) : createCommentVNode("", true)
        ])
      ]),
      createBaseVNode("div", ql, [
        createBaseVNode("div", Nl, [
          createBaseVNode("div", Ul, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": y[0] || (y[0] = ($) => l.value = $),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(p.value, ($) => (openBlock(), createElementBlock("option", {
                key: $,
                value: $
              }, toDisplayString(f($)), 9, zl))), 128))
            ], 512), [
              [vModelSelect, l.value]
            ])
          ]),
          createBaseVNode("div", Wl, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": y[1] || (y[1] = ($) => s.value = $),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(m.value, ($) => (openBlock(), createElementBlock("option", {
                key: $,
                value: $
              }, toDisplayString(h($)), 9, jl))), 128))
            ], 512), [
              [vModelSelect, s.value]
            ])
          ]),
          u.enableSeconds ? (openBlock(), createElementBlock("div", Jl, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": y[2] || (y[2] = ($) => i.value = $),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(w.value, ($) => (openBlock(), createElementBlock("option", {
                key: $,
                value: $
              }, toDisplayString(h($)), 9, _l))), 128))
            ], 512), [
              [vModelSelect, i.value]
            ])
          ])) : createCommentVNode("", true),
          u.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Kl, [
            createBaseVNode("div", Ql, [
              createBaseVNode("button", {
                type: "button",
                onClick: y[3] || (y[3] = ($) => g("AM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", c.value === "AM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(x("AM")), 3),
              createBaseVNode("button", {
                type: "button",
                onClick: y[4] || (y[4] = ($) => g("PM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", c.value === "PM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(x("PM")), 3)
            ])
          ]))
        ])
      ])
    ])) : createCommentVNode("", true);
  }
});
var Gl = { class: "vdt-date-picker calendar-grid w-full max-w-xs rounded-lg shadow p-2" };
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
      const u = tt();
      return { year: u.year, month: u.month };
    }, { year: l, month: s } = o(), i = ref(l), c = ref(s), v = ref(a.timeValue), p = computed(() => me.convertToCalendarDate(a.value, a.calendar)), m = computed(() => me.convertToCalendarDate(a.rangeStart, a.calendar)), w = computed(() => me.convertToCalendarDate(a.rangeEnd, a.calendar)), M = computed(() => me.convertToCalendarDate(a.minDate || null, a.calendar)), h = computed(() => me.convertToCalendarDate(a.maxDate || null, a.calendar)), f = computed(() => {
      var u;
      return ((u = a.minDate) == null ? void 0 : u.year) || 1900;
    }), d = computed(() => {
      var u;
      return ((u = a.maxDate) == null ? void 0 : u.year) || 2100;
    }), b = computed(() => {
      if (a.year !== void 0 && a.month !== void 0)
        return { year: a.year, month: a.month };
      const u = a.selectionMode === "range" ? a.rangeStart : a.value;
      return u ? { year: u.year, month: u.month } : { year: i.value, month: c.value };
    });
    watch(b, ({ year: u, month: y }) => {
      i.value = u, c.value = y;
    }, { immediate: true }), watch(() => a.timeValue, (u) => {
      v.value = u;
    }, { immediate: true });
    const g = (u) => {
      if (a.selectionMode === "single") {
        const y = me.convertFromCalendarDate(u, a.calendar);
        y && (n("select", y, true), a.showTimeSelector && v.value && n("time-select", v.value));
      }
    }, x = (u, y) => {
      if (a.selectionMode === "range") {
        const $ = me.convertFromCalendarDate(u, a.calendar), U = me.convertFromCalendarDate(y, a.calendar);
        n("range-select", $, U);
      }
    }, S = (u) => {
      v.value = u, n("time-select", u);
    }, T = () => {
      if (a.selectionMode === "single") {
        const u = tt();
        i.value = u.year, c.value = u.month, n("select", u, false);
      }
    };
    return e({
      // 獲取當前選中的日期（單一模式）
      getSelectedDate: () => a.value,
      // 獲取當前範圍（範圍模式）
      getSelectedRange: () => ({ start: a.rangeStart, end: a.rangeEnd }),
      // 設置顯示的月份
      setDisplayMonth: (u, y) => {
        i.value = u, c.value = y;
      },
      // 導航到上個月
      previousMonth: () => {
        c.value === 1 ? (c.value = 12, i.value -= 1) : c.value -= 1;
      },
      // 導航到下個月
      nextMonth: () => {
        c.value === 12 ? (c.value = 1, i.value += 1) : c.value += 1;
      }
    }), (u, y) => (openBlock(), createElementBlock("div", Gl, [
      createVNode(Yl, {
        month: c.value,
        "onUpdate:month": y[0] || (y[0] = ($) => c.value = $),
        year: i.value,
        "onUpdate:year": y[1] || (y[1] = ($) => i.value = $),
        locale: u.locale,
        "min-year": f.value,
        "max-year": d.value,
        calendar: u.calendar
      }, createSlots({ _: 2 }, [
        renderList(u.$slots, ($, U) => ({
          name: U,
          fn: withCtx((q) => [
            renderSlot(u.$slots, U, normalizeProps(guardReactiveProps(q)))
          ])
        }))
      ]), 1032, ["month", "year", "locale", "min-year", "max-year", "calendar"]),
      createVNode(Rl, {
        locale: u.locale,
        "week-starts-on": u.weekStartsOn,
        calendar: u.calendar
      }, null, 8, ["locale", "week-starts-on", "calendar"]),
      createVNode(Al, {
        year: i.value,
        month: c.value,
        "selected-date": p.value,
        "range-start": m.value,
        "range-end": w.value,
        "selection-mode": u.selectionMode,
        "min-date": M.value,
        "max-date": h.value,
        locale: u.locale,
        "week-starts-on": u.weekStartsOn,
        calendar: u.calendar,
        onSelect: g,
        onRangeSelect: x
      }, null, 8, ["year", "month", "selected-date", "range-start", "range-end", "selection-mode", "min-date", "max-date", "locale", "week-starts-on", "calendar"]),
      createVNode(Zl, {
        locale: u.locale,
        show: u.showTimeSelector,
        "time-value": v.value,
        "enable-seconds": u.enableSeconds,
        "use24-hour": u.use24Hour,
        "default-time": u.defaultTime,
        selectionMode: u.selectionMode,
        onTimeChange: S,
        onTodayClick: T
      }, null, 8, ["locale", "show", "time-value", "enable-seconds", "use24-hour", "default-time", "selectionMode"])
    ]));
  }
});
var Xl = {};
var es = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor"
};
function ts(r, e) {
  return openBlock(), createElementBlock("svg", es, e[0] || (e[0] = [
    createBaseVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18L18 6M6 6l12 12"
    }, null, -1)
  ]));
}
var Hr = We(Xl, [["render", ts]]);
function ma(r, e) {
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
        var p, m, w;
        n && ((p = a.value) != null && p.focusLast) ? a.value.focusLast() : (m = t.value) != null && m.focusLast ? t.value.focusLast() : (w = t.value) != null && w.focus && t.value.focus();
      });
    },
    // 專門的導航處理
    handleNavigateToTime: (p) => {
      n && nextTick(() => {
        var m;
        (m = a.value) != null && m.focus && a.value.focus();
      });
    },
    handleNavigateToDate: () => {
      nextTick(() => {
        var p, m;
        (p = t.value) != null && p.focusLast ? t.value.focusLast() : (m = t.value) != null && m.focus && t.value.focus();
      });
    },
    autoFocusTimeAfterDateComplete: (p, m) => {
      !n || !o || (m && !p.inputTimeValue.value && (p.inputTimeValue.value = m, p.updateFromInputs()), nextTick(() => {
        var w;
        (w = a.value) != null && w.focus && a.value.focus();
      }));
    }
  };
}
function ha(r = {}) {
  const { required: e = true, showTime: t = false, minDate: a, maxDate: n, dateFormat: o = "YYYY-MM-DD" } = r, l = ref({}), s = ref({}), i = ref({}), c = computed(() => ({ ...l.value, ...s.value })), v = computed(() => ({ ...i.value })), p = computed(() => Object.keys(c.value).length > 0), m = (S, T, u = "date", y = {}) => {
    ["date", "year", "month", "day"].forEach(($) => {
      h(`${u}.${$}`), f(`${u}.${$}`);
    }), S || Object.entries(T).forEach(([$, U]) => {
      const q = `${u}.${$}`;
      l.value[q] = U, y[$] && (i.value[q] = y[$]);
    });
  }, w = (S, T, u = "time", y = {}) => (["time", "hour", "minute", "second"].forEach(($) => {
    h(`${u}.${$}`), f(`${u}.${$}`);
  }), S || Object.entries(T).forEach(([$, U]) => {
    const q = `${u}.${$}`;
    l.value[q] = U, y[$] && (i.value[q] = y[$]);
  }), !p.value), M = (S) => {
    if (!S) return false;
    if (a) {
      const T = pe(a);
      if (T && jt(S, T) < 0)
        return m(false, {
          date: "date.beforeMin"
        }, "date", {
          date: { minDate: Ee(T, o) }
        }), false;
    }
    if (n) {
      const T = pe(n);
      if (T && jt(S, T) > 0)
        return m(false, {
          date: "date.afterMax"
        }, "date", {
          date: { maxDate: Ee(T, o) }
        }), false;
    }
    return true;
  }, h = (S) => {
    Object.keys(l.value).forEach((T) => {
      T.startsWith(S) && delete l.value[T];
    });
  }, f = (S) => {
    Object.keys(i.value).forEach((T) => {
      T.startsWith(S) && delete i.value[T];
    });
  };
  return {
    // 狀態
    errors: l,
    formatErrors: s,
    mergedErrors: c,
    hasErrors: p,
    errorParams: i,
    mergedErrorParams: v,
    // 驗證方法
    handleDateValidation: m,
    handleTimeValidation: w,
    validateDateTime: (S, T) => {
      const u = {
        isValid: true,
        errors: {}
      };
      return e && (S || (u.errors.date = "date.required", u.isValid = false), t && !T && (u.errors.time = "time.required", u.isValid = false)), Object.assign(l.value, u.errors), u.isValid && !p.value;
    },
    validateDateRange: M,
    // 錯誤管理
    clearFieldErrors: h,
    clearFieldParams: f,
    clearAllErrors: () => {
      l.value = {}, s.value = {}, i.value = {};
    },
    setFormatError: (S, T) => {
      s.value[S] = T;
    },
    clearFormatError: (S) => {
      delete s.value[S];
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
  } = r, s = ref(null), i = ref(null), c = ref(null), v = (u) => {
    if (!u || u.hour === void 0) return null;
    const y = u.hour.toString().padStart(2, "0"), $ = (u.minute || 0).toString().padStart(2, "0");
    if (l) {
      const U = (u.second || 0).toString().padStart(2, "0");
      return `${y}:${$}:${U}`;
    } else
      return `${y}:${$}`;
  }, p = (u, y) => {
    if (!u) return null;
    const $ = pe(u);
    if (!$) return null;
    if (!y && !e)
      return ze($.year, $.month, $.day);
    if (!y)
      if (o) {
        const re = o.split(":").map(Number), G = re[0] || 0, O = re[1] || 0, E = re[2] || 0;
        return ze(
          $.year,
          $.month,
          $.day,
          G,
          O,
          E
        );
      } else
        return ze($.year, $.month, $.day);
    const U = y.split(":").map(Number), q = U[0] || 0, _ = U[1] || 0, z = U[2] || 0;
    return ze(
      $.year,
      $.month,
      $.day,
      q,
      _,
      z
    );
  }, m = (u) => {
    const y = pe(u);
    s.value = y, y ? (i.value = Ee(y, t), c.value = v(y)) : (i.value = null, c.value = null);
  }, w = (u, y) => {
    const $ = u !== void 0 ? u : i.value, U = y !== void 0 ? y : c.value, q = p($, U);
    return s.value = q, q;
  }, M = (u) => {
    s.value = u, u ? (i.value = Ee(u, t), c.value = v(u)) : (i.value = null, c.value = null);
  }, h = (u) => {
    if (!s.value) return null;
    const y = u.split(":").map(Number), $ = {
      ...s.value,
      hour: y[0] || 0,
      minute: y[1] || 0,
      second: y[2] || 0
    };
    return s.value = $, c.value = u, $;
  }, f = (u) => {
    const y = u !== void 0 ? u : s.value, $ = e ? `${t} ${a}` : t;
    return Wt(y, n, $);
  }, d = () => {
    s.value = null, i.value = null, c.value = null;
  }, b = computed(() => !!(i.value || c.value || s.value)), g = () => e && !c.value && o ? (c.value = o, true) : false, x = computed(() => !!i.value), S = computed(() => !!c.value), T = computed(() => e ? x.value && S.value : x.value);
  return {
    // 響應式狀態
    internalDateTime: s,
    inputDateValue: i,
    inputTimeValue: c,
    // 計算屬性
    hasDateValue: x,
    hasTimeValue: S,
    hasCompleteValue: T,
    hasValue: b,
    // 主要方法
    updateFromInputs: w,
    setInternalDateTime: M,
    updateTimeOnly: h,
    setExternalValue: m,
    // updateDateTime,
    getFormattedOutput: f,
    clearValues: d,
    applyDefaultTime: g,
    // 輔助方法
    getTimeFromDateTime: v,
    createDateTimeFromInputs: p
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
  }, i = () => {
    o.value = false;
  }, c = () => {
    if (!r.value || !e.value) return;
    const h = r.value.getBoundingClientRect(), f = e.value, d = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    let b = h.height + 5, g = 0;
    const x = f.getBoundingClientRect();
    h.left + x.width > d.width && (g = d.width - h.left - x.width - 10), h.bottom + x.height > d.height && (b = -x.height - 5), f.style.position = "absolute", f.style.top = `${b}px`, f.style.left = `${g}px`, f.style.zIndex = "50";
  }, v = (h) => {
    const f = e.value, d = r.value, b = h.target;
    o.value && f && !f.contains(b) && d && !d.contains(b) && (i(), n == null || n());
  }, p = (h, f) => {
    if (a != null && a.value) return;
    const d = h.target;
    d.classList.contains("date-input") || d.classList.contains("time-input") || d.closest("input") || d.closest("button") || (h.preventDefault(), f == null || f());
  }, m = (h) => {
    if (a != null && a.value) return;
    const f = h.target;
    f.classList.contains("date-input") || f.classList.contains("time-input") || f.closest("input") || f.closest("button") || h.preventDefault();
  }, w = () => {
    o.value && c();
  }, M = () => {
    o.value && c();
  };
  return onMounted(() => {
    document.addEventListener("mousedown", v), window.addEventListener("resize", w), window.addEventListener("scroll", M);
  }), onBeforeUnmount(() => {
    document.removeEventListener("mousedown", v), window.removeEventListener("resize", w), window.removeEventListener("scroll", M);
  }), {
    // 狀態
    showCalendar: o,
    // 主要方法
    toggleCalendar: l,
    showCalendarPopup: s,
    hideCalendar: i,
    updateCalendarPosition: c,
    // 事件處理
    handleContainerClick: p,
    handleContainerMouseDown: m
  };
}
function as(r = {}) {
  const {
    customDefaultTime: e = "00:00:00",
    enableSeconds: t = true
  } = r, a = (c) => {
    if (!c) return false;
    if (!/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])(?::([0-5]?[0-9]))?$/.test(c))
      return console.warn(`時間格式不正確: ${c}，應為 HH:mm:ss 或 HH:mm 格式`), false;
    const p = c.split(":"), m = parseInt(p[0]), w = parseInt(p[1]), M = p[2] ? parseInt(p[2]) : 0;
    return m < 0 || m > 23 || w < 0 || w > 59 || M < 0 || M > 59 ? (console.warn(`時間值超出範圍: ${c}`), false) : true;
  }, n = (c, v = t) => {
    const p = c.split(":"), m = p[0].padStart(2, "0"), w = p[1].padStart(2, "0"), M = p[2] ? p[2].padStart(2, "0") : "00";
    return v ? `${m}:${w}:${M}` : `${m}:${w}`;
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
      const c = /* @__PURE__ */ new Date(), v = c.getHours().toString().padStart(2, "0"), p = c.getMinutes().toString().padStart(2, "0"), m = c.getSeconds().toString().padStart(2, "0");
      return t ? `${v}:${p}:${m}` : `${v}:${p}`;
    },
    parseTimeString: (c) => {
      const v = c.split(":");
      return {
        hours: parseInt(v[0]) || 0,
        minutes: parseInt(v[1]) || 0,
        seconds: parseInt(v[2]) || 0
      };
    },
    buildTimeString: (c, v, p = 0) => {
      const m = c.toString().padStart(2, "0"), w = v.toString().padStart(2, "0"), M = p.toString().padStart(2, "0");
      return t ? `${m}:${w}:${M}` : `${m}:${w}`;
    }
  };
}
function rs(r = {}, e) {
  const {
    modelValue: t = null,
    showTime: a = false,
    required: n = true,
    disabled: o = false,
    calendar: l = "gregory",
    // 日曆系統
    dateFormat: s = "YYYY-MM-DD",
    timeFormat: i = "HH:mm:ss",
    outputType: c = "iso",
    useStrictISO: v = false,
    customDefaultTime: p,
    enableSeconds: m = true,
    autoFocusTimeAfterDate: w = true,
    minDate: M,
    maxDate: h,
    locale: f = "zh-TW"
  } = r, { containerRef: d, calendarRef: b, dateInputRef: g, timeInputRef: x } = e, S = ref(o), T = ha({
    required: n,
    showTime: a,
    minDate: M,
    maxDate: h,
    dateFormat: s
  }), u = va({
    showTime: a,
    dateFormat: s,
    timeFormat: i,
    outputType: c,
    defaultTime: p,
    enableSeconds: m
  }), y = ma(
    { dateInputRef: g, timeInputRef: x },
    { showTime: a, autoFocusTimeAfterDate: w }
  ), $ = qr(
    d,
    b,
    {
      disabled: S,
      onOutsideClick: () => {
      }
    }
  ), U = as({
    customDefaultTime: p,
    enableSeconds: m
  }), q = computed(() => {
    const L = pe(M, f);
    return L || null;
  }), _ = computed(() => {
    const L = pe(h, f);
    return L || null;
  });
  let z = null, re = null, G = null;
  const O = (L) => {
    z = L.update || null, re = L.change || null, G = L.validation || null;
  }, E = async (L = u.internalDateTime.value) => {
    let K = null;
    if (L) {
      const ye = a ? `${s} ${i}` : s;
      K = Wt(L, c, ye, a, l, f, v);
    }
    z == null || z(K), re == null || re(K);
    const ne = !T.hasErrors.value;
    G == null || G(ne, T.mergedErrors.value);
  };
  watch(() => t, (L) => {
    const K = pe(L, f, l);
    L && !K ? (T.handleDateValidation(false, { date: "無效的日期格式" }), u.setExternalValue(null)) : K && !T.validateDateRange(K) ? u.setExternalValue(null) : (T.clearFieldErrors("date"), T.clearFieldErrors("invalidInput"), u.setExternalValue(K));
  }, { immediate: true });
  const D = (L, K, ne = {}) => {
    T.handleDateValidation(L, K, "date", ne), G == null || G(!T.hasErrors.value, T.mergedErrors.value);
  }, P = (L, K, ne = {}) => {
    T.handleTimeValidation(L, K, "time", ne), G == null || G(!T.hasErrors.value, T.mergedErrors.value);
  }, A = async (L) => {
    u.inputDateValue.value = L;
    const K = u.updateFromInputs();
    if (!K) {
      T.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    T.validateDateRange(K) && (await E(K), ["date", "year", "month", "day"].forEach((ne) => {
      T.clearFieldErrors(ne);
    }), y.autoFocusTimeAfterDateComplete(
      u,
      p ? U.getValidDefaultTime.value : void 0
    ));
  }, te = async (L) => {
    u.inputTimeValue.value = L;
    const K = u.updateFromInputs();
    await E(K), ["time", "hour", "minute", "second"].forEach((ne) => {
      T.clearFieldErrors(ne);
    });
  }, ce = async (L, K = true) => {
    try {
      if (!T.validateDateRange(L))
        return;
      u.setInternalDateTime(L), await E(L), ["date", "year", "month", "day"].forEach((ne) => {
        T.clearFieldErrors(ne);
      }), K && $.hideCalendar();
    } catch (ne) {
      console.error("處理日曆選擇失敗:", ne);
    }
  }, se = async (L) => {
    const K = u.updateTimeOnly(L);
    K && await E(K), ["time", "hour", "minute", "second"].forEach((ne) => {
      T.clearFieldErrors(ne);
    });
  }, Y = (L) => {
    $.handleContainerClick(L, () => {
      y.focusFirstInput();
    }), $.toggleCalendar();
  }, k = () => {
    u.clearValues(), T.clearAllErrors(), E(null);
  }, N = async () => {
    var ae, ve;
    const L = await ((ae = g.value) == null ? void 0 : ae.validate()), K = a ? await ((ve = x.value) == null ? void 0 : ve.validate()) : true;
    let ne = true;
    u.internalDateTime.value && (ne = me.isValidDate(
      u.internalDateTime.value.year,
      u.internalDateTime.value.month,
      u.internalDateTime.value.day,
      "gregory"
      // 固定使用西元曆驗證
    ), ne || T.handleDateValidation(false, {
      date: "date.invalid"
      // 簡化錯誤信息
    }));
    const ye = T.validateDateTime(
      u.inputDateValue.value,
      u.inputTimeValue.value
    ), V = L && K && ne && ye;
    return G == null || G(V, T.mergedErrors.value), V;
  }, ee = async () => {
    const L = /* @__PURE__ */ new Date(), K = {
      year: L.getFullYear(),
      month: L.getMonth() + 1,
      day: L.getDate(),
      hour: L.getHours(),
      minute: L.getMinutes(),
      second: L.getSeconds()
    };
    try {
      u.setInternalDateTime(K), await E(K), ["date", "year", "month", "day", "time", "hour", "minute", "second"].forEach((ne) => {
        T.clearFieldErrors(ne);
      });
    } catch (ne) {
      console.warn("設置當前時間失敗:", ne);
      const ye = `${K.year}-${K.month.toString().padStart(2, "0")}-${K.day.toString().padStart(2, "0")}`, V = a ? `${(K.hour || 0).toString().padStart(2, "0")}:${(K.minute || 0).toString().padStart(2, "0")}:${(K.second || 0).toString().padStart(2, "0")}` : null;
      u.inputDateValue.value = ye, a && V && (u.inputTimeValue.value = V);
      const ae = u.updateFromInputs();
      await E(ae);
    }
  }, J = () => {
    y.focusFirstInput();
  };
  return {
    // 狀態
    isDisabled: S,
    // 日曆系統相關
    calendar: ref(l),
    // 從各個 composables 暴露的狀態
    ...T,
    ...u,
    ...$,
    // 計算屬性
    calendarMinDate: q,
    calendarMaxDate: _,
    // 預設時間相關
    getValidDefaultTime: U.getValidDefaultTime,
    // 事件處理方法
    setEmitters: O,
    validateDateInput: D,
    validateTimeInput: P,
    handleDateComplete: A,
    handleTimeComplete: te,
    handleCalendarSelect: ce,
    handleTimeSelect: se,
    handleContainerClick: Y,
    handleContainerMouseDown: $.handleContainerMouseDown,
    // 導航方法
    handleNavigateToDate: y.handleNavigateToDate,
    handleNavigateToTime: y.handleNavigateToTime,
    // 主要操作方法
    reset: k,
    validate: N,
    selectNow: ee,
    focus: J,
    // 直接暴露導航方法（用於 defineExpose）
    focusFirstInput: y.focusFirstInput,
    focusLastInput: y.focusLastInput
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
function ns(r) {
  r = r.replace(/^#/, ""), r.length === 3 && (r = r.split("").map((n) => n + n).join(""));
  const e = parseInt(r.slice(0, 2), 16) / 255, t = parseInt(r.slice(2, 4), 16) / 255, a = parseInt(r.slice(4, 6), 16) / 255;
  return { r: e, g: t, b: a };
}
function os(r) {
  const { r: e, g: t, b: a } = r, n = e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4), o = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), l = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), s = 0.4124 * n + 0.3576 * o + 0.1805 * l, i = 0.2126 * n + 0.7152 * o + 0.0722 * l, c = 0.0193 * n + 0.1192 * o + 0.9505 * l, v = 0.95047, p = 1, m = 1.08883, w = s > 8856e-6 ? Math.pow(s / v, 1 / 3) : 7.787 * s / v + 16 / 116, M = i > 8856e-6 ? Math.pow(i / p, 1 / 3) : 7.787 * i / p + 16 / 116, h = c > 8856e-6 ? Math.pow(c / m, 1 / 3) : 7.787 * c / m + 16 / 116, f = 116 * M - 16, d = 500 * (w - M), b = 200 * (M - h);
  return { l: f, a: d, b };
}
function ls(r) {
  const { l: e, a: t, b: a } = r, n = Math.sqrt(t * t + a * a);
  let o = Math.atan2(a, t) * 180 / Math.PI;
  return o < 0 && (o += 360), { l: e, c: n, h: o };
}
function ss(r) {
  const e = ns(r), t = os(e), a = ls(t);
  return {
    lightness: a.l,
    chroma: Math.min(a.c / 150, 0.4),
    hue: a.h
  };
}
function is(r, e) {
  const t = Math.min(
    Math.abs(r.hue - e.hue),
    360 - Math.abs(r.hue - e.hue)
  ), a = t > 60 ? 30 : 5;
  return Math.sqrt(
    Math.pow((r.lightness - e.lightness) * 1.5, 2) + Math.pow((r.chroma - e.chroma) * 2, 2) + Math.pow(t / 360 * a, 2) * 100
  );
}
function us(r) {
  return r.startsWith("oklch(");
}
function cs(r) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(r);
}
function ds(r) {
  return r in Ta;
}
function or(r) {
  const e = "violet";
  if (ds(r))
    return r;
  let t = null;
  if (us(r) ? t = nr(r) : cs(r) && (t = ss(r)), !t) return e;
  let a = e, n = 1 / 0;
  for (const [o, l] of Object.entries(Ta))
    for (const s of ["300", "400", "500", "600", "700"]) {
      const i = l[s];
      if (!i) continue;
      const c = nr(i);
      if (!c) continue;
      const v = is(t, c);
      v < n && (n = v, a = o);
    }
  return a;
}
function fs(r) {
  return Ta[r] || {};
}
var ms = class {
  constructor() {
    De(this, "instances", /* @__PURE__ */ new Map());
    De(this, "mediaQuery", null);
    De(this, "listeners", /* @__PURE__ */ new Map());
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
    const n = fs(t.color);
    Object.entries(n).forEach(([o, l]) => {
      a.style.setProperty(`--color-vdt-theme-${o}`, l);
    });
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
var Ae = new ms();
function Nr(r = {}) {
  const e = ref(
    Ae.createInstance(r.instanceId, {
      defaultColor: r.defaultColor,
      defaultMode: r.defaultMode
    })
  ), t = ref(
    Ae.getState(e.value)
  );
  let a = null;
  const n = computed(() => {
    var d;
    return ((d = t.value) == null ? void 0 : d.currentMode) === "dark";
  }), o = computed(() => {
    var d;
    return ((d = t.value) == null ? void 0 : d.currentMode) === "light";
  }), l = computed(() => {
    var d;
    return ((d = t.value) == null ? void 0 : d.userPreference) === "auto";
  }), s = computed(() => {
    var d;
    return ((d = t.value) == null ? void 0 : d.currentMode) || "light";
  }), i = computed(() => {
    var d;
    return ((d = t.value) == null ? void 0 : d.userPreference) || "auto";
  }), c = computed(() => {
    var d;
    return ((d = t.value) == null ? void 0 : d.systemPreference) || "light";
  }), v = computed(() => {
    var d;
    return ((d = t.value) == null ? void 0 : d.color) || "violet";
  }), p = computed(() => e.value ? Ae.getThemeClasses(e.value) : {}), m = computed(() => e.value ? Ae.getContainerAttributes(e.value) : {}), w = (d) => {
    e.value && Ae.setColor(e.value, d);
  }, M = (d) => {
    e.value && Ae.setMode(e.value, d);
  }, h = () => {
    if (t.value)
      if (t.value.userPreference === "auto") {
        const d = t.value.currentMode === "light" ? "dark" : "light";
        M(d);
      } else {
        const d = t.value.currentMode === "light" ? "dark" : "light";
        M(d);
      }
  }, f = computed(() => typeof window > "u" ? false : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches !== void 0);
  return onMounted(async () => {
    await nextTick(), t.value = Ae.getState(e.value), a = Ae.addListener(e.value, (d) => {
      t.value = d;
    }), setTimeout(() => {
      Ae.reapplyTheme(e.value);
    }, 10);
  }), onBeforeUnmount(() => {
    a && a(), e.value && Ae.destroyInstance(e.value);
  }), {
    // 響應式狀態
    instanceId: e,
    themeState: t,
    isDark: n,
    isLight: o,
    isAuto: l,
    currentMode: s,
    userPreference: i,
    systemPreference: c,
    currentColor: v,
    themeClasses: p,
    containerAttributes: m,
    supportsColorScheme: f,
    // 主要方法
    setColor: w,
    setMode: M,
    toggle: h,
    // 便利方法 - 模式設置
    setLightMode: () => M("light"),
    setDarkMode: () => M("dark"),
    setAutoMode: () => M("auto"),
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
var hs = { key: 0 };
var vs = {
  key: 0,
  class: "text-vdt-content"
};
var ps = {
  key: 1,
  class: "text-vdt-content-muted"
};
var gs = ["disabled"];
var ys = { key: 0 };
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
    use24Hour: { type: Boolean, default: false },
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
    const a = r, { setLocale: n, getPlaceholderMessage: o } = Dt(a.locale), l = t, s = useSlots(), i = computed(() => {
      const R = {};
      return ["no-years-display", "month-selector"].forEach((Q) => {
        s[Q] && (R[Q] = s[Q]);
      }), Object.keys(s).forEach((Q) => {
        Q.startsWith("year-") && (R[Q] = s[Q]);
      }), R;
    }), c = ref(null), v = ref(null), p = ref(null), m = ref(null), w = ref(a.dateFormat), M = ref(a.timeFormat), h = ref({}), f = rs(
      {
        modelValue: a.modelValue,
        showTime: a.showTime,
        required: a.required,
        disabled: a.disabled,
        calendar: a.calendar,
        dateFormat: w.value,
        timeFormat: M.value,
        outputType: a.outputType,
        useStrictISO: a.useStrictISO,
        customDefaultTime: a.customDefaultTime,
        enableSeconds: a.enableSeconds,
        autoFocusTimeAfterDate: a.autoFocusTimeAfterDate,
        minDate: a.minDate,
        maxDate: a.maxDate,
        locale: a.locale
      },
      {
        containerRef: c,
        calendarRef: v,
        dateInputRef: p,
        timeInputRef: m
      }
    );
    f.setEmitters({
      update: (R) => l("update:modelValue", R),
      change: (R) => l("change", R),
      validation: (R, Q) => l("validation", R, Q)
    });
    const {
      themeClasses: d,
      containerAttributes: b,
      setColor: g,
      setMode: x,
      currentMode: S,
      isDark: T,
      isLight: u
    } = Nr(), y = computed(() => {
      const R = pe(a.minDate, a.locale);
      return Ee(R);
    }), $ = computed(() => {
      const R = pe(a.maxDate, a.locale);
      return Ee(R);
    }), U = computed(() => w.value), q = computed(() => a.calendar === "gregory"), _ = computed(() => !!(D.value && D.value.trim())), z = computed(() => {
      var Q, Z, oe, ke, bt, Mt, St;
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
        selectDate: ((Q = a.placeholderOverrides) == null ? void 0 : Q.selectDate) || R.selectDate,
        // 時間相關
        hour: ((Z = a.placeholderOverrides) == null ? void 0 : Z.hour) || R.hour,
        minute: ((oe = a.placeholderOverrides) == null ? void 0 : oe.minute) || R.minute,
        second: ((ke = a.placeholderOverrides) == null ? void 0 : ke.second) || R.second,
        // 日期相關
        year: ((bt = a.placeholderOverrides) == null ? void 0 : bt.year) || R.year,
        month: ((Mt = a.placeholderOverrides) == null ? void 0 : Mt.month) || R.month,
        day: ((St = a.placeholderOverrides) == null ? void 0 : St.day) || R.day
      };
    }), re = computed(() => {
      var R;
      return ((R = a.placeholderOverrides) == null ? void 0 : R.selectDate) || o("general.selectDate");
    }), G = computed(() => ({
      ...f.mergedErrors.value,
      ...h.value
    })), O = computed(() => {
      var R;
      return {
        ...((R = f.mergedErrorParams) == null ? void 0 : R.value) || {}
        // 格式錯誤通常不需要參數，但可以擴展
      };
    }), E = computed(() => Object.keys(G.value).length > 0);
    onBeforeMount(() => {
      if (n(a.locale), me.isCalendarSupported(a.calendar) || (h.value.calendar = `不支援的日曆系統: "${a.calendar}"`), !Ir(a.dateFormat) && a.calendar === "gregory") {
        const R = a.dateFormat, Q = wo(a.dateFormat);
        h.value.dateFormat = `日期格式不正確: "${R}" 已自動修復為 "${Q}"`, console.warn(`日期格式 "${R}" 不正確，已自動修復為 "${Q}"`), w.value = Q;
      }
      if (a.showTime && !Or(a.timeFormat)) {
        const R = a.timeFormat, Q = ko(a.timeFormat);
        h.value.timeFormat = `時間格式不正確: "${R}" 已自動修復為 "${Q}"`, console.warn(`時間格式 "${R}" 不正確，已自動修復為 "${Q}"`), M.value = Q;
      }
    }), watch(() => a.theme, (R) => {
      R && g(R);
    }, { immediate: true }), watch(() => a.mode, (R) => {
      x(R);
    }, { immediate: true }), watch(() => a.locale, (R) => {
      R && n(R);
    }, { immediate: true }), e({
      // 基本操作
      focus: f.focus,
      reset: f.reset,
      validate: f.validate,
      selectNow: f.selectNow,
      // 數據獲取
      getDateTime: () => f.internalDateTime.value,
      setDateTime: (R) => {
        f.setExternalValue(R);
      },
      // 主題控制
      setTheme: g,
      setDarkMode: () => x("dark"),
      setLightMode: () => x("light"),
      setAutoMode: () => x("auto"),
      getCurrentMode: () => S.value,
      isDarkMode: () => T.value,
      isLightMode: () => u.value,
      // 錯誤相關
      getErrors: () => G.value,
      hasErrors: () => E.value
    });
    const {
      // 狀態
      inputDateValue: D,
      inputTimeValue: P,
      showCalendar: A,
      internalDateTime: te,
      calendarMinDate: ce,
      calendarMaxDate: se,
      getValidDefaultTime: Y,
      hasValue: k,
      // 事件處理
      validateDateInput: N,
      validateTimeInput: ee,
      handleDateComplete: J,
      handleTimeComplete: L,
      handleCalendarSelect: K,
      handleTimeSelect: ne,
      handleContainerClick: ye,
      handleContainerMouseDown: V,
      handleNavigateToDate: ae,
      // 日曆控制
      toggleCalendar: ve,
      // 清除功能
      reset: we
    } = f;
    return (R, Q) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", mergeProps({
        class: ["date-picker-wrapper relative w-full", [unref(d), R.showTime ? "min-w-[300px]" : "min-w-[150px]"]]
      }, unref(b), {
        ref_key: "containerRef",
        ref: c
      }), [
        createBaseVNode("div", {
          class: normalizeClass(["date-picker-container flex w-full items-center px-2 py-1 bg-vdt-surface text-vdt-content rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": E.value }]])
        }, [
          q.value && R.inputEnabled ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["flex w-full items-center justify-start gap-2", [R.disabled ? "cursor-not-allowed cursor-event-none opacity-50" : ""]]),
            onClick: Q[2] || (Q[2] = withModifiers(
              //@ts-ignore
              (...Z) => unref(ye) && unref(ye)(...Z),
              ["stop"]
            )),
            onMousedown: Q[3] || (Q[3] = //@ts-ignore
            (...Z) => unref(V) && unref(V)(...Z))
          }, [
            createBaseVNode("div", null, [
              createVNode(ca, {
                ref_key: "dateInputRef",
                ref: p,
                modelValue: unref(D),
                "onUpdate:modelValue": Q[0] || (Q[0] = (Z) => isRef(D) ? D.value = Z : null),
                "year-placeholder": z.value.year,
                "month-placeholder": z.value.month,
                "day-placeholder": z.value.day,
                "min-date": y.value,
                "max-date": $.value,
                required: R.required,
                separator: R.dateSeparator,
                "date-format": U.value,
                onValidation: unref(N),
                onComplete: unref(J)
              }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "required", "separator", "date-format", "onValidation", "onComplete"])
            ]),
            R.showTime ? (openBlock(), createElementBlock("div", hs, [
              createVNode(da, {
                ref_key: "timeInputRef",
                ref: m,
                modelValue: unref(P),
                "onUpdate:modelValue": Q[1] || (Q[1] = (Z) => isRef(P) ? P.value = Z : null),
                "hour-placeholder": z.value.hour,
                "minute-placeholder": z.value.minute,
                "second-placeholder": z.value.second,
                "enable-seconds": R.enableSeconds,
                use24Hour: R.use24Hour,
                required: R.required,
                locale: R.locale,
                useLocalizedPeriod: R.useLocalizedPeriod,
                onValidation: unref(ee),
                onComplete: unref(L),
                onNavigateToDate: unref(ae)
              }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "required", "locale", "useLocalizedPeriod", "onValidation", "onComplete", "onNavigateToDate"])
            ])) : createCommentVNode("", true)
          ], 34)) : (openBlock(), createElementBlock("button", {
            key: 1,
            type: "button",
            class: normalizeClass(["flex w-full h-full items-center justify-start gap-1", {
              "cursor-not-allowed opacity-50": R.disabled
            }]),
            onClick: Q[4] || (Q[4] = withModifiers((Z) => {
              var oe;
              return !R.disabled && ((oe = unref(ve)) == null ? void 0 : oe());
            }, ["stop"])),
            onKeydown: [
              Q[5] || (Q[5] = withKeys(withModifiers((Z) => {
                var oe;
                return !R.disabled && ((oe = unref(ve)) == null ? void 0 : oe());
              }, ["prevent"]), ["enter"])),
              Q[6] || (Q[6] = withKeys(withModifiers((Z) => {
                var oe;
                return !R.disabled && ((oe = unref(ve)) == null ? void 0 : oe());
              }, ["prevent"]), ["space"]))
            ]
          }, [
            _.value ? (openBlock(), createElementBlock("span", vs, toDisplayString(R.modelValue), 1)) : (openBlock(), createElementBlock("span", ps, toDisplayString(re.value), 1))
          ], 34)),
          createBaseVNode("div", {
            class: normalizeClass(["date-picker-icon-container relative group cursor-pointer", { "cursor-not-allowed": R.disabled }])
          }, [
            createBaseVNode("button", {
              type: "button",
              class: normalizeClass(["date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed", { "group-hover:opacity-0": unref(k) && !R.disabled && R.showClearButton }]),
              disabled: R.disabled,
              "aria-label": "開啟日曆",
              onClick: Q[7] || (Q[7] = withModifiers((Z) => {
                var oe;
                return (oe = unref(ve)) == null ? void 0 : oe();
              }, ["stop", "prevent"]))
            }, [
              createVNode(Pr, { class: "h-5 w-5" })
            ], 10, gs),
            unref(k) && !R.disabled && R.showClearButton ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100",
              "aria-label": "清除日期",
              onClick: Q[8] || (Q[8] = withModifiers(
                //@ts-ignore
                (...Z) => unref(we) && unref(we)(...Z),
                ["stop", "prevent"]
              ))
            }, [
              createVNode(Hr, { class: "h-4 w-4" })
            ])) : createCommentVNode("", true)
          ], 2)
        ], 2),
        unref(A) && !R.disabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref_key: "calendarRef",
          ref: v,
          class: "calendar-container absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10",
          onClick: Q[9] || (Q[9] = withModifiers(() => {
          }, ["stop"])),
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "date-picker"
        }, [
          createVNode(fa, {
            value: unref(te),
            weekStartsOn: R.weekStartsOn,
            "min-date": unref(ce),
            "max-date": unref(se),
            showTimeSelector: R.showTime,
            "time-value": unref(P),
            use24Hour: R.use24Hour,
            "default-time": unref(Y),
            enableSeconds: R.enableSeconds,
            locale: R.locale,
            calendar: R.calendar,
            onSelect: unref(K),
            onTimeSelect: unref(ne)
          }, createSlots({ _: 2 }, [
            renderList(i.value, (Z, oe) => ({
              name: oe,
              fn: withCtx((ke) => [
                renderSlot(R.$slots, oe, normalizeProps(guardReactiveProps(ke)))
              ])
            }))
          ]), 1032, ["value", "weekStartsOn", "min-date", "max-date", "showTimeSelector", "time-value", "use24Hour", "default-time", "enableSeconds", "locale", "calendar", "onSelect", "onTimeSelect"])
        ], 512)) : createCommentVNode("", true)
      ], 16),
      R.showErrorMessage && E.value ? (openBlock(), createElementBlock("div", ys, [
        renderSlot(R.$slots, "error", {
          errors: G.value,
          hasErrors: E.value
        }, () => [
          createVNode(Ar, {
            errors: G.value,
            locale: R.locale,
            "use-i18n": R.useI18n,
            "custom-messages": R.customErrorMessages,
            errorParams: O.value
          }, createSlots({ _: 2 }, [
            renderList(R.$slots, (Z, oe) => ({
              name: oe,
              fn: withCtx((ke) => [
                renderSlot(R.$slots, oe, normalizeProps(guardReactiveProps(ke)))
              ])
            }))
          ]), 1032, ["errors", "locale", "use-i18n", "custom-messages", "errorParams"])
        ])
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var $s = { class: "dual-month-calendar flex flex-col gap-4 min-w-auto md:min-w-[570px] md:flex-row m-1" };
var Ds = { class: "calendar-container flex-1 min-w-auto md:min-w-[275px]" };
var bs = { class: "calendar-container flex-1 md:min-w-[275px] min-w-auto" };
var Ms = defineComponent({
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
    initialYear: { default: () => tt().year },
    initialMonth: { default: () => tt().month }
  },
  emits: ["range-select", "time-select"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, o = () => {
      if (a.rangeStart)
        return { year: a.rangeStart.year, month: a.rangeStart.month };
      if (a.initialYear && a.initialMonth)
        return { year: a.initialYear, month: a.initialMonth };
      const d = tt();
      return { year: d.year, month: d.month };
    }, { year: l, month: s } = o(), i = ref(l), c = ref(s), v = computed(() => c.value === 12 ? i.value + 1 : i.value), p = computed(() => c.value === 12 ? 1 : c.value + 1), m = ref({
      isSelecting: false,
      tempStart: null
    });
    watch(() => [a.rangeStart, a.rangeEnd], ([d, b]) => {
      d && !a.initialYear && !a.initialMonth && (i.value = d.year, c.value = d.month), d && b ? (m.value.isSelecting = false, m.value.tempStart = null) : d && !b ? (m.value.isSelecting = true, m.value.tempStart = d) : (m.value.isSelecting = false, m.value.tempStart = null);
    }, { immediate: true, deep: true });
    const w = (d, b) => {
      if (!d) {
        m.value.isSelecting = false, m.value.tempStart = null, n("range-select", null, null);
        return;
      }
      if (!m.value.isSelecting)
        m.value.isSelecting = true, m.value.tempStart = d, n("range-select", d, null);
      else {
        const g = m.value.tempStart;
        if (g && (d.year !== g.year || d.month !== g.month || d.day !== g.day)) {
          m.value.isSelecting = false, m.value.tempStart = null;
          const x = g.year * 1e4 + g.month * 100 + g.day, S = d.year * 1e4 + d.month * 100 + d.day;
          x <= S ? n("range-select", g, d) : n("range-select", d, g);
        } else
          m.value.tempStart = d, n("range-select", d, null);
      }
    }, M = (d, b) => {
      n("time-select", d, b);
    };
    return e({
      // 獲取當前顯示的月份
      getCurrentDisplay: () => ({
        left: { year: i.value, month: c.value },
        right: { year: v.value, month: p.value }
      }),
      // 設置顯示月份
      setDisplayMonth: (d, b) => {
        i.value = d, c.value = b;
      },
      // 重置範圍選擇狀態
      resetRangeSelection: () => {
        m.value.isSelecting = false, m.value.tempStart = null;
      },
      // 獲取當前選擇狀態
      getSelectionState: () => ({
        isSelecting: m.value.isSelecting,
        tempStart: m.value.tempStart
      }),
      // 月份導航
      previousMonth: () => {
        c.value === 1 ? (c.value = 12, i.value -= 1) : c.value -= 1;
      },
      nextMonth: () => {
        c.value === 12 ? (c.value = 1, i.value += 1) : c.value += 1;
      }
    }), (d, b) => (openBlock(), createElementBlock("div", $s, [
      createBaseVNode("div", Ds, [
        createVNode(fa, {
          "range-start": d.rangeStart,
          "range-end": d.rangeEnd,
          "selection-mode": "range",
          year: i.value,
          month: c.value,
          "min-date": d.minDate,
          "max-date": d.maxDate,
          locale: d.locale,
          "week-starts-on": d.weekStartsOn,
          calendar: d.calendar,
          showTimeSelector: d.showTimeSelector,
          "time-value": d.startTimeValue,
          "enable-seconds": d.enableSeconds,
          "use24-hour": d.use24Hour,
          "default-time": d.defaultTime,
          onRangeSelect: w,
          onTimeSelect: b[0] || (b[0] = (g) => M(g, "start"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour", "default-time"])
      ]),
      createBaseVNode("div", bs, [
        createVNode(fa, {
          "range-start": d.rangeStart,
          "range-end": d.rangeEnd,
          "selection-mode": "range",
          year: v.value,
          month: p.value,
          "min-date": d.minDate,
          "max-date": d.maxDate,
          locale: d.locale,
          "week-starts-on": d.weekStartsOn,
          calendar: d.calendar,
          showTimeSelector: d.showTimeSelector,
          "time-value": d.endTimeValue,
          "enable-seconds": d.enableSeconds,
          "use24-hour": d.use24Hour,
          "default-time": d.defaultTime,
          onRangeSelect: w,
          onTimeSelect: b[1] || (b[1] = (g) => M(g, "end"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour", "default-time"])
      ])
    ]));
  }
});
var Yt = "00:00:00";
var Ct = "23:59:59";
function Ss(r = {}, e) {
  const {
    calendar: t = "gregory",
    modelValue: a = null,
    showTime: n = false,
    required: o = false,
    disabled: l = false,
    incomplete: s = false,
    dateFormat: i = "YYYY-MM-DD",
    timeFormat: c = "HH:mm:ss",
    outputType: v = "iso",
    useStrictISO: p = false,
    enableSeconds: m = false,
    minDate: w,
    maxDate: M,
    maxRange: h,
    minRange: f,
    locale: d = "zh-TW"
  } = r, {
    containerRef: b,
    calendarRef: g,
    startDateInputRef: x,
    endDateInputRef: S,
    startTimeInputRef: T,
    endTimeInputRef: u
  } = e, y = ref(l);
  let $ = {};
  const U = ha({
    required: o,
    showTime: n,
    minDate: w,
    maxDate: M,
    dateFormat: i
  }), q = ha({
    required: o,
    showTime: n,
    minDate: w,
    maxDate: M,
    dateFormat: i
  }), _ = va({
    showTime: n,
    dateFormat: i,
    timeFormat: c,
    outputType: v,
    defaultTime: Yt,
    enableSeconds: m
  }), z = va({
    showTime: n,
    dateFormat: i,
    timeFormat: c,
    outputType: v,
    defaultTime: Ct,
    enableSeconds: m
  }), re = qr(
    b,
    g,
    { disabled: y }
  ), G = ma(
    { dateInputRef: x, timeInputRef: T },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), O = ma(
    { dateInputRef: S, timeInputRef: u },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), E = computed(
    () => _.hasValue.value || z.hasValue.value
  ), D = computed(() => {
    const I = {
      ...U.mergedErrors.value,
      ...q.mergedErrors.value
    };
    return _.internalDateTime.value && !z.internalDateTime.value && s && (I["range.endRequired"] = "range.endRequired"), I;
  }), P = computed(() => ({
    ...U.mergedErrorParams.value,
    ...q.mergedErrorParams.value
  })), A = computed(() => Object.keys(D.value).length > 0), te = computed(() => {
    const I = _.internalDateTime.value, X = z.internalDateTime.value;
    if (!I || !X || jt(I, X) > 0) return false;
    if (h || f) {
      const le = ar(I, X);
      if (h && le > h)
        return q.handleDateValidation(false, {
          range: "range.exceedsMaxRange"
        }, "endDate", {
          range: { maxRange: h, actualDays: le }
        }), false;
      if (f && le < f)
        return q.handleDateValidation(false, {
          range: "range.belowMinRange"
        }, "endDate", {
          range: { minRange: f, actualDays: le }
        }), false;
      q.clearFieldErrors("range");
    }
    return !A.value;
  }), ce = computed(() => [
    {
      label: "今天",
      getValue: () => {
        const I = Ze();
        return {
          start: ze(I.year, I.month, I.day, 0, 0, 0),
          end: ze(I.year, I.month, I.day, 23, 59, 59)
        };
      }
    },
    {
      label: "最近7天",
      getValue: () => ({
        start: ia(Ze(), -6),
        end: Ze()
      })
    },
    {
      label: "最近30天",
      getValue: () => ({
        start: ia(Ze(), -29),
        end: Ze()
      })
    },
    {
      label: "本月",
      getValue: Mo
    }
  ]), se = computed(() => ({
    minDate: pe(w, d),
    maxDate: z.internalDateTime.value || pe(M, d)
  })), Y = computed(() => ({
    minDate: _.internalDateTime.value || pe(w, d),
    maxDate: pe(M, d)
  })), k = computed(() => ({
    minDate: se.value.minDate ? Ee(se.value.minDate, i) : null,
    maxDate: se.value.maxDate ? Ee(se.value.maxDate, i) : null
  })), N = computed(() => ({
    minDate: Y.value.minDate ? Ee(Y.value.minDate, i) : null,
    maxDate: Y.value.maxDate ? Ee(Y.value.maxDate, i) : null
  }));
  function ee(I, X) {
    const le = ar(I, X);
    return h && le > h ? {
      valid: false,
      error: "range.exceedsMaxRange",
      params: { maxRange: h, actualDays: le }
    } : f && le < f ? {
      valid: false,
      error: "range.belowMinRange",
      params: { minRange: f, actualDays: le }
    } : { valid: true };
  }
  function J(I) {
    !I.error || !I.params || q.handleDateValidation(
      false,
      { range: I.error },
      "endDate",
      { range: I.params }
    );
  }
  function L() {
    var Te, wt, st, xa, Ya;
    if (!_.internalDateTime.value || !z.internalDateTime.value) {
      (Te = $.update) == null || Te.call($, null), (wt = $.change) == null || wt.call($, null);
      return;
    }
    const I = n ? `${i} ${c}` : i, X = {
      start: Wt(
        _.internalDateTime.value,
        v,
        I,
        n,
        t,
        d,
        p
      ),
      end: Wt(
        z.internalDateTime.value,
        v,
        I,
        n,
        t,
        d,
        p
      )
    };
    (st = $.update) == null || st.call($, X), (xa = $.change) == null || xa.call($, X);
    const le = te.value && !A.value;
    (Ya = $.validation) == null || Ya.call($, le, D.value);
  }
  function K(I, X) {
    X.forEach((le) => I.clearFieldErrors(le));
  }
  const ne = (I) => {
    $ = I;
  }, ye = (I, X, le, Te, wt) => {
    var st;
    le.handleDateValidation(I, X, Te, wt), (st = $.validation) == null || st.call($, !A.value, D.value);
  }, V = (I, X, le) => {
    ye(I, X, U, "startDate", le);
  }, ae = (I, X, le) => {
    ye(I, X, q, "endDate", le);
  }, ve = (I, X, le = {}) => {
    var Te;
    U.handleTimeValidation(I, X, "startTime", le), (Te = $.validation) == null || Te.call($, !A.value, D.value);
  }, we = (I, X, le = {}) => {
    var Te;
    q.handleTimeValidation(I, X, "endTime", le), (Te = $.validation) == null || Te.call($, !A.value, D.value);
  }, R = (I) => {
    _.inputDateValue.value = I;
    const X = _.updateFromInputs();
    if (!X) {
      U.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    U.validateDateRange(X) && (G.autoFocusTimeAfterDateComplete(
      _,
      Yt
    ), L(), K(U, ["startDate", "date.year", "date.month", "date.day"]), n || O.focusFirstInput());
  }, Q = (I) => {
    z.inputDateValue.value = I;
    const X = z.updateFromInputs();
    if (!X) {
      q.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    q.validateDateRange(X) && (O.autoFocusTimeAfterDateComplete(
      z,
      Ct
    ), L(), K(q, ["endDate", "date.year", "date.month", "date.day"]));
  }, Z = (I) => {
    _.inputTimeValue.value = I, _.updateFromInputs() && L(), K(U, ["startTime", "time.hour", "time.minute", "time.second"]);
  }, oe = (I) => {
    z.inputTimeValue.value = I, z.updateFromInputs() && L(), K(q, ["endTime", "time.hour", "time.minute", "time.second"]);
  }, ke = (I, X) => {
    I && !X ? bt(I) : I && X ? Mt(I, X) : Kt(), L();
  };
  function bt(I) {
    U.validateDateRange(I) && (_.setInternalDateTime(I), K(U, ["startDate", "date.year", "date.month", "date.day"]), z.clearValues());
  }
  function Mt(I, X) {
    if (!(!U.validateDateRange(I) || !q.validateDateRange(X))) {
      if (h || f) {
        const le = ee(I, X);
        if (!le.valid) {
          J(le);
          return;
        }
      }
      _.setInternalDateTime(I), z.setInternalDateTime(X), n && (_.inputTimeValue.value || (_.inputTimeValue.value = Yt, _.updateFromInputs()), z.inputTimeValue.value || (z.inputTimeValue.value = Ct, z.updateFromInputs())), K(U, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]), K(q, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]);
    }
  }
  const St = (I, X) => {
    X === "start" && _.internalDateTime.value && Z(I), X === "end" && z.internalDateTime.value && oe(I);
  }, Ur = (I) => {
    const X = I.getValue();
    _.setInternalDateTime(X.start), z.setInternalDateTime(X.end), n && (_.inputTimeValue.value || (_.inputTimeValue.value = Yt, _.updateFromInputs()), z.inputTimeValue.value || (z.inputTimeValue.value = Ct, z.updateFromInputs())), L();
  }, Kt = () => {
    _.clearValues(), z.clearValues(), U.clearAllErrors(), q.clearAllErrors(), L();
  }, zr = (I) => {
    I ? (_.setExternalValue(I.start), z.setExternalValue(I.end)) : Kt(), L();
  }, Wr = () => {
    var I, X, le, Te;
    return (I = x.value) == null || I.validate(), (X = S.value) == null || X.validate(), n && ((le = T.value) == null || le.validate(), (Te = u.value) == null || Te.validate()), te.value;
  }, jr = (I) => {
    re.handleContainerClick(I, () => {
      G.focusFirstInput();
    });
  }, Jr = (I) => {
    re.handleContainerClick(I, () => {
      O.focusFirstInput();
    });
  };
  return watch(() => a, (I) => {
    if (I && (I.start || I.end)) {
      const X = I.start ? pe(I.start, d, t) : null, le = I.end ? pe(I.end, d, t) : null;
      if (I.start && !X && (console.warn(`Invalid start date provided: ${I.start}`), U.handleDateValidation(false, { date: "date.invalid" }, "startDate")), I.end && !le && (console.warn(`Invalid end date provided: ${I.end}`), q.handleDateValidation(false, { date: "date.invalid" }, "endDate")), X && le && jt(X, le) > 0) {
        console.warn("Initial date range has start > end, auto-swapping values"), _.setExternalValue(I.end), z.setExternalValue(I.start), setTimeout(() => {
          L();
        }, 0);
        return;
      }
      _.setExternalValue(X ? I.start : null), z.setExternalValue(le ? I.end : null);
    } else
      _.clearValues(), z.clearValues();
  }, { immediate: true }), {
    // 狀態
    isDisabled: y,
    startDateConstraints: se,
    endDateConstraints: Y,
    startDateConstraintsStr: k,
    endDateConstraintsStr: N,
    // 驗證相關
    hasErrors: A,
    mergedErrors: D,
    mergedErrorParams: P,
    isValidRange: te,
    // 日期時間值
    startDateTime: _,
    endDateTime: z,
    // 顯示值
    hasRangeValue: E,
    // 日曆相關
    ...re,
    // 快捷選項
    shortcuts: ce,
    // 事件設置
    setEmitters: ne,
    // 驗證事件處理
    handleStartDateValidation: V,
    handleEndDateValidation: ae,
    handleStartTimeValidation: ve,
    handleEndTimeValidation: we,
    // 完成事件處理
    handleStartDateComplete: R,
    handleEndDateComplete: Q,
    handleStartTimeComplete: Z,
    handleEndTimeComplete: oe,
    // 日曆事件處理
    handleCalendarRangeSelect: ke,
    handleTimeSelect: St,
    // 導航事件處理
    handleStartNavigateToDate: G.handleNavigateToDate,
    handleEndNavigateToDate: O.handleNavigateToDate,
    // 主要操作
    applyShortcut: Ur,
    clearRange: Kt,
    setRange: zr,
    validate: Wr,
    // 導航方法
    focusStartDate: jr,
    focusEndDate: Jr
  };
}
var ws = ["disabled"];
var ks = { class: "flex-1 text-center whitespace-nowrap" };
var Ts = {
  key: 0,
  class: "text-vdt-content text-sm"
};
var xs = {
  key: 1,
  class: "text-vdt-content-muted text-sm"
};
var Ys = {
  class: "text-vdt-content-muted text-sm px-1",
  "aria-label": "日期範圍分隔符",
  "data-testid": "separator"
};
var Cs = { class: "flex-1 text-center whitespace-nowrap" };
var Rs = {
  key: 0,
  class: "text-vdt-content text-sm"
};
var Es = {
  key: 1,
  class: "text-vdt-content-muted text-sm"
};
var Is = ["disabled"];
var Os = ["title"];
var Fs = { class: "p-2 space-y-2" };
var Vs = {
  key: 0,
  class: "w-full flex flex-col md:flex-row flex-justify-between gap-2"
};
var As = {
  key: 0,
  "data-testid": "start-time-inputs",
  "aria-label": "開始時間輸入區域"
};
var Ps = {
  key: 0,
  "data-testid": "end-time-inputs",
  "aria-label": "結束時間輸入區域"
};
var Ls = {
  key: 1,
  "aria-label": "日期範圍快捷選項"
};
var Bs = { class: "flex flex-wrap gap-2" };
var Hs = ["aria-label", "data-testid", "onClick"];
var qs = { key: 2 };
var Ns = { class: "flex flex-wrap gap-2" };
var Us = { class: "calendar-container flex flex-col md:flex-row gap-1 overflow-auto" };
var zs = { key: 0 };
var Ws = defineComponent({
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
    const a = r, n = t, o = ref(null), l = ref(null), s = ref(null), i = ref(null), c = ref(null), v = ref(null), p = ref({}), m = Ss(
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
        endDateInputRef: i,
        startTimeInputRef: c,
        endTimeInputRef: v
      }
    ), { setLocale: w, getPlaceholderMessage: M } = Dt(a.locale);
    m.setEmitters({
      update: (V) => n("update:modelValue", V),
      change: (V) => n("change", V),
      validation: (V, ae) => n("validation", V, ae)
    });
    const {
      themeClasses: h,
      containerAttributes: f,
      setColor: d,
      setMode: b
    } = Nr(), g = computed(() => {
      var ae, ve, we, R, Q, Z, oe, ke;
      const V = {
        start: M("range.start"),
        end: M("range.end"),
        year: M("date.year"),
        month: M("date.month"),
        day: M("date.day"),
        hour: M("time.hour"),
        minute: M("time.minute"),
        second: M("time.second")
      };
      return {
        start: ((ae = a.placeholderOverrides) == null ? void 0 : ae.start) || V.start,
        end: ((ve = a.placeholderOverrides) == null ? void 0 : ve.end) || V.end,
        // 時間相關
        hour: ((we = a.placeholderOverrides) == null ? void 0 : we.hour) || V.hour,
        minute: ((R = a.placeholderOverrides) == null ? void 0 : R.minute) || V.minute,
        second: ((Q = a.placeholderOverrides) == null ? void 0 : Q.second) || V.second,
        // 日期相關
        year: ((Z = a.placeholderOverrides) == null ? void 0 : Z.year) || V.year,
        month: ((oe = a.placeholderOverrides) == null ? void 0 : oe.month) || V.month,
        day: ((ke = a.placeholderOverrides) == null ? void 0 : ke.day) || V.day
      };
    }), x = computed(() => a.dateFormat), S = computed(() => ({
      ...m.mergedErrors.value,
      ...p.value
    })), T = computed(() => Object.keys(re.value).length > 0);
    watch(() => a.theme, (V) => {
      V && d(V);
    }, { immediate: true }), watch(() => a.mode, (V) => {
      b(V);
    }, { immediate: true }), watch(() => a.locale, (V) => {
      V && w(V);
    }, { immediate: true }), onBeforeMount(() => {
      w(a.locale), me.isCalendarSupported(a.calendar) || (p.value.calendar = `不支援的日曆系統: "${a.calendar}"`);
    }), e({
      // 基本操作
      reset: m.clearRange,
      validate: m.validate,
      setRange: m.setRange,
      // 聚焦方法
      focusStartDate: m.focusStartDate,
      focusEndDate: m.focusEndDate,
      // 主題控制
      setTheme: d,
      setDarkMode: () => b("dark"),
      setLightMode: () => b("light"),
      setAutoMode: () => b("auto"),
      // 錯誤相關
      getErrors: () => re.value,
      hasErrors: () => T.value
    });
    const {
      // 狀態
      showCalendar: u,
      startDateConstraintsStr: y,
      endDateConstraintsStr: $,
      shortcuts: U,
      startDateTime: q,
      endDateTime: _,
      hasRangeValue: z,
      mergedErrors: re,
      mergedErrorParams: G,
      // 事件處理方法
      handleStartDateValidation: O,
      handleEndDateValidation: E,
      handleStartTimeValidation: D,
      handleEndTimeValidation: P,
      handleStartDateComplete: A,
      handleEndDateComplete: te,
      handleStartTimeComplete: ce,
      handleEndTimeComplete: se,
      handleCalendarRangeSelect: Y,
      handleStartNavigateToDate: k,
      handleEndNavigateToDate: N,
      handleTimeSelect: ee,
      // 操作方法
      toggleCalendar: J,
      applyShortcut: L,
      clearRange: K,
      focusStartDate: ne,
      focusEndDate: ye
    } = m;
    return (V, ae) => {
      var ve, we, R, Q;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", mergeProps({
          class: ["date-range-wrapper md:min-w-auto relative w-full", [unref(h), V.showTime ? "min-w-[300px]" : "min-w-[200px]"]]
        }, unref(f), {
          ref_key: "containerRef",
          ref: o
        }), [
          createBaseVNode("div", {
            class: normalizeClass(["date-picker-container flex w-full items-center px-2 py-1 rounded-sm transition-all duration-200 bg-vdt-surface text-vdt-content disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": T.value }]])
          }, [
            createBaseVNode("button", {
              type: "button",
              class: "flex items-center gap-1 flex-1 cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
              disabled: V.disabled,
              onClick: ae[0] || (ae[0] = //@ts-ignore
              (...Z) => unref(J) && unref(J)(...Z)),
              "aria-label": "選擇日期範圍"
            }, [
              createBaseVNode("div", ks, [
                (ve = V.modelValue) != null && ve.start ? (openBlock(), createElementBlock("span", Ts, toDisplayString((we = V.modelValue) == null ? void 0 : we.start), 1)) : (openBlock(), createElementBlock("span", xs, toDisplayString(g.value.start), 1))
              ]),
              createBaseVNode("div", Ys, toDisplayString(V.separator), 1),
              createBaseVNode("div", Cs, [
                (R = V.modelValue) != null && R.end ? (openBlock(), createElementBlock("span", Rs, toDisplayString((Q = V.modelValue) == null ? void 0 : Q.end), 1)) : (openBlock(), createElementBlock("span", Es, toDisplayString(g.value.end), 1))
              ])
            ], 8, ws),
            createBaseVNode("div", {
              class: normalizeClass(["date-picker-icon-container relative group cursor-pointer", { "cursor-not-allowed": V.disabled }])
            }, [
              createBaseVNode("button", {
                type: "button",
                "aria-label": "開啟日曆",
                class: normalizeClass(["date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed", { "group-hover:opacity-0": unref(z) && !V.disabled && V.showClearButton }]),
                disabled: V.disabled,
                onClick: ae[1] || (ae[1] = withModifiers((Z) => {
                  var oe;
                  return (oe = unref(J)) == null ? void 0 : oe();
                }, ["stop", "prevent"]))
              }, [
                createVNode(Pr, { class: "h-5 w-5" })
              ], 10, Is),
              unref(z) && !V.disabled && V.showClearButton ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                "aria-label": "清除日期",
                class: "date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100",
                onClick: ae[2] || (ae[2] = withModifiers(
                  //@ts-ignore
                  (...Z) => unref(K) && unref(K)(...Z),
                  ["stop"]
                )),
                title: "清除日期" + (V.showTime ? "時間" : "")
              }, [
                createVNode(Hr, { class: "h-4 w-4" })
              ], 8, Os)) : createCommentVNode("", true)
            ], 2)
          ], 2),
          unref(u) && !V.disabled ? (openBlock(), createElementBlock("div", {
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
            createBaseVNode("div", Fs, [
              V.inputEnabled ? (openBlock(), createElementBlock("div", Vs, [
                createBaseVNode("div", {
                  "data-testid": "start-date-inputs",
                  "aria-label": "開始日期輸入區域",
                  onClick: ae[5] || (ae[5] = withModifiers(
                    //@ts-ignore
                    (...Z) => unref(ne) && unref(ne)(...Z),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center px-2 py-1 gap-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  createVNode(ca, {
                    ref_key: "startDateInputRef",
                    ref: s,
                    modelValue: unref(q).inputDateValue.value,
                    "onUpdate:modelValue": ae[3] || (ae[3] = (Z) => unref(q).inputDateValue.value = Z),
                    "year-placeholder": g.value.year,
                    "month-placeholder": g.value.month,
                    "day-placeholder": g.value.day,
                    "max-date": unref(y).maxDate,
                    "min-date": unref(y).minDate,
                    "date-format": x.value,
                    onValidation: unref(O),
                    onComplete: unref(A)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "max-date", "min-date", "date-format", "onValidation", "onComplete"]),
                  V.showTime ? (openBlock(), createElementBlock("div", As, [
                    createVNode(da, {
                      ref_key: "startTimeInputRef",
                      ref: c,
                      modelValue: unref(q).inputTimeValue.value,
                      "onUpdate:modelValue": ae[4] || (ae[4] = (Z) => unref(q).inputTimeValue.value = Z),
                      "hour-placeholder": g.value.hour,
                      "minute-placeholder": g.value.minute,
                      "second-placeholder": g.value.second,
                      "enable-seconds": V.enableSeconds,
                      use24Hour: V.use24Hour,
                      locale: V.locale,
                      onValidation: unref(D),
                      onComplete: unref(ce),
                      onNavigateToDate: unref(k)
                    }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", {
                  "data-testid": "end-date-inputs",
                  "aria-label": "結束日期輸入區域",
                  onClick: ae[8] || (ae[8] = withModifiers(
                    //@ts-ignore
                    (...Z) => unref(ye) && unref(ye)(...Z),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center gap-2 px-2 py-1 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  createVNode(ca, {
                    ref_key: "endDateInputRef",
                    ref: i,
                    modelValue: unref(_).inputDateValue.value,
                    "onUpdate:modelValue": ae[6] || (ae[6] = (Z) => unref(_).inputDateValue.value = Z),
                    "year-placeholder": g.value.year,
                    "month-placeholder": g.value.month,
                    "day-placeholder": g.value.day,
                    "min-date": unref($).minDate,
                    "max-date": unref($).maxDate,
                    "date-format": x.value,
                    onValidation: unref(E),
                    onComplete: unref(te)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "date-format", "onValidation", "onComplete"]),
                  V.showTime ? (openBlock(), createElementBlock("div", Ps, [
                    createVNode(da, {
                      ref_key: "endTimeInputRef",
                      ref: v,
                      modelValue: unref(_).inputTimeValue.value,
                      "onUpdate:modelValue": ae[7] || (ae[7] = (Z) => unref(_).inputTimeValue.value = Z),
                      "hour-placeholder": g.value.hour,
                      "minute-placeholder": g.value.minute,
                      "second-placeholder": g.value.second,
                      "enable-seconds": V.enableSeconds,
                      use24Hour: V.use24Hour,
                      locale: V.locale,
                      onValidation: unref(P),
                      onComplete: unref(se),
                      onNavigateToDate: unref(N)
                    }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              unref(U).length > 0 && V.showShortcuts ? (openBlock(), createElementBlock("div", Ls, [
                createBaseVNode("div", Bs, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(U), (Z) => (openBlock(), createElementBlock("button", {
                    key: Z.label,
                    type: "button",
                    "aria-label": `選擇${Z.label}範圍`,
                    "data-testid": `shortcut-${Z.label.toLowerCase().replace(/\s+/g, "-")}`,
                    class: "px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors",
                    onClick: (oe) => unref(L)(Z)
                  }, toDisplayString(Z.label), 9, Hs))), 128)),
                  renderSlot(V.$slots, "shortcuts", {
                    applyShortcut: unref(L),
                    shortcuts: unref(U),
                    currentRange: V.modelValue
                  })
                ])
              ])) : V.$slots.shortcuts && V.showShortcuts ? (openBlock(), createElementBlock("div", qs, [
                createBaseVNode("div", Ns, [
                  renderSlot(V.$slots, "shortcuts", {
                    applyShortcut: unref(L),
                    shortcuts: unref(U),
                    currentRange: V.modelValue
                  })
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", Us, [
                createVNode(Ms, {
                  showTimeSelector: V.showTime,
                  calendar: V.calendar,
                  "range-start": unref(q).internalDateTime.value,
                  "range-end": unref(_).internalDateTime.value,
                  enableSeconds: V.enableSeconds,
                  use24Hour: V.use24Hour,
                  locale: V.locale,
                  "week-starts-on": V.weekStartsOn,
                  "start-time-value": unref(q).inputTimeValue.value,
                  "end-time-value": unref(_).inputTimeValue.value,
                  "min-date": unref(pe)(V.minDate),
                  "max-date": unref(pe)(V.maxDate),
                  onRangeSelect: unref(Y),
                  onTimeSelect: unref(ee)
                }, null, 8, ["showTimeSelector", "calendar", "range-start", "range-end", "enableSeconds", "use24Hour", "locale", "week-starts-on", "start-time-value", "end-time-value", "min-date", "max-date", "onRangeSelect", "onTimeSelect"])
              ])
            ])
          ], 512)) : createCommentVNode("", true)
        ], 16),
        V.showErrorMessage && T.value ? (openBlock(), createElementBlock("div", zs, [
          renderSlot(V.$slots, "error", {
            errors: S.value,
            hasErrors: T.value
          }, () => [
            createVNode(Ar, {
              errors: unref(re),
              locale: V.locale,
              "use-i18n": V.useI18n,
              "custom-messages": V.customErrorMessages,
              errorParams: unref(G)
            }, createSlots({ _: 2 }, [
              renderList(V.$slots, (Z, oe) => ({
                name: oe,
                fn: withCtx((ke) => [
                  renderSlot(V.$slots, oe, normalizeProps(guardReactiveProps(ke)))
                ])
              }))
            ]), 1032, ["errors", "locale", "use-i18n", "custom-messages", "errorParams"])
          ])
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var si = {
  install(r) {
    r.component("VueDatepicker", lr), r.component("DatePicker", lr), r.component("DateRange", Ws);
  }
};
export {
  lr as DatePicker,
  Ws as DateRange,
  si as VueDatepicker,
  si as default
};
//# sourceMappingURL=@tiaohsun_vue-datepicker.js.map
