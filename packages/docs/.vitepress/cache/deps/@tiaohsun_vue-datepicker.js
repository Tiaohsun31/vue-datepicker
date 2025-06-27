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
function gt(r) {
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
            var u = ("" + T[0]).match(n) || ["-", 0, 0], g = u[0], $ = 60 * +u[1] + +u[2];
            return $ === 0 ? 0 : g === "+" ? $ : -$;
          }(h), h === null)) return this;
          var b = Math.abs(h) <= 16 ? 60 * h : h, y = this;
          if (f) return y.$offset = b, y.$u = h === 0, y;
          if (h !== 0) {
            var x = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (y = this.local().add(b + x, t)).$offset = b, y.$x.$localOffset = x;
          } else y = this.utc();
          return y;
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
          var b = this.local(), y = s(h).local();
          return M.call(b, y, f, d);
        };
      };
    });
  }(Rt)), Rt.exports;
}
var nn = rn();
var on = gt(nn);
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
        var s, i = function(m, w, M) {
          M === void 0 && (M = {});
          var h = new Date(m), f = function(d, b) {
            b === void 0 && (b = {});
            var y = b.timeZoneName || "short", x = d + "|" + y, S = a[x];
            return S || (S = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: d, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: y }), a[x] = S), S;
          }(w, M);
          return f.formatToParts(h);
        }, c = function(m, w) {
          for (var M = i(m, w), h = [], f = 0; f < M.length; f += 1) {
            var d = M[f], b = d.type, y = d.value, x = t[b];
            x >= 0 && (h[x] = parseInt(y, 10));
          }
          var S = h[3], T = S === 24 ? 0 : S, u = h[0] + "-" + h[1] + "-" + h[2] + " " + T + ":" + h[4] + ":" + h[5] + ":000", g = +m;
          return (l.utc(u).valueOf() - (g -= g % 1e3)) / 6e4;
        }, v = o.prototype;
        v.tz = function(m, w) {
          m === void 0 && (m = s);
          var M, h = this.utcOffset(), f = this.toDate(), d = f.toLocaleString("en-US", { timeZone: m }), b = Math.round((f - new Date(d)) / 1e3 / 60), y = 15 * -Math.round(f.getTimezoneOffset() / 15) - b;
          if (!Number(y)) M = this.utcOffset(0, w);
          else if (M = l(d, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(y, true), w) {
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
          var b = function(T, u, g) {
            var $ = T - 60 * u * 1e3, H = c($, g);
            if (u === H) return [$, u];
            var L = c($ -= 60 * (H - u) * 1e3, g);
            return H === L ? [$, H] : [T - 60 * Math.min(H, L) * 1e3, Math.max(H, L)];
          }(l.utc(m, h).valueOf(), d, f), y = b[0], x = b[1], S = l(y).utcOffset(x);
          return S.$x.$timezone = f, S;
        }, l.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, l.tz.setDefault = function(m) {
          s = m;
        };
      };
    });
  }(Et)), Et.exports;
}
var un = sn();
var cn = gt(un);
var It = { exports: {} };
var dn = It.exports;
var Oa;
function fn() {
  return Oa || (Oa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(dn, function() {
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, a = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, o = /\d\d/, l = /\d\d?/, s = /\d*[^-_:/,()\s\d]+/, i = {}, c = function(f) {
        return (f = +f) + (f > 68 ? 1900 : 2e3);
      }, v = function(f) {
        return function(d) {
          this[f] = +d;
        };
      }, p = [/[+-]\d\d:?(\d\d)?|Z/, function(f) {
        (this.zone || (this.zone = {})).offset = function(d) {
          if (!d || d === "Z") return 0;
          var b = d.match(/([+-]|\d\d)/g), y = 60 * b[1] + (+b[2] || 0);
          return y === 0 ? 0 : b[0] === "+" ? -y : y;
        }(f);
      }], m = function(f) {
        var d = i[f];
        return d && (d.indexOf ? d : d.s.concat(d.f));
      }, w = function(f, d) {
        var b, y = i.meridiem;
        if (y) {
          for (var x = 1; x <= 24; x += 1) if (f.indexOf(y(x, 0, d)) > -1) {
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
        if (this.day = b[0], d) for (var y = 1; y <= 31; y += 1) d(y).replace(/\[|\]/g, "") === f && (this.day = y);
      }], w: [l, v("week")], ww: [o, v("week")], M: [l, v("month")], MM: [o, v("month")], MMM: [s, function(f) {
        var d = m("months"), b = (m("monthsShort") || d.map(function(y) {
          return y.slice(0, 3);
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
        for (var y = (f = d.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(H, L, _) {
          var z = _ && _.toUpperCase();
          return L || b[_] || t[_] || b[z].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(re, X, I) {
            return X || I.slice(1);
          });
        })).match(a), x = y.length, S = 0; S < x; S += 1) {
          var T = y[S], u = M[T], g = u && u[0], $ = u && u[1];
          y[S] = $ ? { regex: g, parser: $ } : T.replace(/^\[|\]$/g, "");
        }
        return function(H) {
          for (var L = {}, _ = 0, z = 0; _ < x; _ += 1) {
            var re = y[_];
            if (typeof re == "string") z += re.length;
            else {
              var X = re.regex, I = re.parser, R = H.slice(z), D = X.exec(R)[0];
              I.call(L, D), H = H.replace(D, "");
            }
          }
          return function(U) {
            var P = U.afternoon;
            if (P !== void 0) {
              var te = U.hours;
              P ? te < 12 && (U.hours += 12) : te === 12 && (U.hours = 0), delete U.afternoon;
            }
          }(L), L;
        };
      }
      return function(f, d, b) {
        b.p.customParseFormat = true, f && f.parseTwoDigitYear && (c = f.parseTwoDigitYear);
        var y = d.prototype, x = y.parse;
        y.parse = function(S) {
          var T = S.date, u = S.utc, g = S.args;
          this.$u = u;
          var $ = g[1];
          if (typeof $ == "string") {
            var H = g[2] === true, L = g[3] === true, _ = H || L, z = g[2];
            L && (z = g[2]), i = this.$locale(), !H && z && (i = b.Ls[z]), this.$d = function(R, D, U, P) {
              try {
                if (["x", "X"].indexOf(D) > -1) return new Date((D === "X" ? 1e3 : 1) * R);
                var te = h(D)(R), ce = te.year, le = te.month, Y = te.day, k = te.hours, N = te.minutes, ee = te.seconds, J = te.milliseconds, A = te.zone, K = te.week, ne = /* @__PURE__ */ new Date(), ge = Y || (ce || le ? 1 : ne.getDate()), V = ce || ne.getFullYear(), ae = 0;
                ce && !le || (ae = le > 0 ? le - 1 : ne.getMonth());
                var $e, E = k || 0, Z = N || 0, ie = ee || 0, Q = J || 0;
                return A ? new Date(Date.UTC(V, ae, ge, E, Z, ie, Q + 60 * A.offset * 1e3)) : U ? new Date(Date.UTC(V, ae, ge, E, Z, ie, Q)) : ($e = new Date(V, ae, ge, E, Z, ie, Q), K && ($e = P($e).week(K).toDate()), $e);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            }(T, $, u, b), this.init(), z && z !== true && (this.$L = this.locale(z).$L), _ && T != this.format($) && (this.$d = /* @__PURE__ */ new Date("")), i = {};
          } else if ($ instanceof Array) for (var re = $.length, X = 1; X <= re; X += 1) {
            g[1] = $[X - 1];
            var I = b.apply(this, g);
            if (I.isValid()) {
              this.$d = I.$d, this.$L = I.$L, this.init();
              break;
            }
            X === re && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else x.call(this, S);
        };
      };
    });
  }(It)), It.exports;
}
var mn = fn();
var ur = gt(mn);
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
  }(Ot)), Ot.exports;
}
var pn = vn();
var yn = gt(pn);
var Vt = { exports: {} };
var gn = Vt.exports;
var Fa;
function $n() {
  return Fa || (Fa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(gn, function() {
      return function(t, a, n) {
        var o = a.prototype, l = function(p) {
          return p && (p.indexOf ? p : p.s);
        }, s = function(p, m, w, M, h) {
          var f = p.name ? p : p.$locale(), d = l(f[m]), b = l(f[w]), y = d || b.map(function(S) {
            return S.slice(0, M);
          });
          if (!h) return y;
          var x = f.weekStart;
          return y.map(function(S, T) {
            return y[(T + (x || 0)) % 7];
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
var Dn = $n();
var bn = gt(Dn);
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
var Mn = class {
  constructor(e = "zh-TW", t = "gregory") {
    be(this, "locale");
    be(this, "calendar");
    be(this, "preferredFormats");
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
      ...Aa[e] || [],
      ...Pa
    ];
  }
  setCalendar(e) {
    this.calendar = e;
  }
};
var it = new Mn();
function Sn(r, e = "zh-TW", t = "gregory") {
  return e !== it.locale && it.setLocale(e), t !== it.calendar && it.setCalendar(t), it.parse(r);
}
function Ge(r, e) {
  return r - e * Math.floor(r / e);
}
var cr = 1721426;
function Je(r, e, t, a) {
  e = $t(r, e);
  let n = e - 1, o = -2;
  return t <= 2 ? o = 0 : ze(e) && (o = -1), cr - 1 + 365 * n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400) + Math.floor((367 * t - 362) / 12 + o + a);
}
function ze(r) {
  return r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0);
}
function $t(r, e) {
  return r === "BC" ? 1 - e : e;
}
function jt(r) {
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
var Ee = class {
  fromJulianDay(e) {
    let t = e, a = t - cr, n = Math.floor(a / 146097), o = Ge(a, 146097), l = Math.floor(o / 36524), s = Ge(o, 36524), i = Math.floor(s / 1461), c = Ge(s, 1461), v = Math.floor(c / 365), p = n * 400 + l * 100 + i * 4 + v + (l !== 4 && v !== 4 ? 1 : 0), [m, w] = jt(p), M = t - Je(m, w, 1, 1), h = 2;
    t < Je(m, w, 3, 1) ? h = 0 : ze(w) && (h = 1);
    let f = Math.floor(((M + h) * 12 + 373) / 367), d = t - Je(m, w, f, 1) + 1;
    return new ue(m, w, f, d);
  }
  toJulianDay(e) {
    return Je(e.era, e.year, e.month, e.day);
  }
  getDaysInMonth(e) {
    return wn[ze(e.year) ? "leapyear" : "standard"][e.month - 1];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMonthsInYear(e) {
    return 12;
  }
  getDaysInYear(e) {
    return ze(e.year) ? 366 : 365;
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
function dr(r, e, t) {
  let a = r.calendar.toJulianDay(r), n = In(e), o = Math.ceil(a + 1 - n) % 7;
  return o < 0 && (o += 7), o;
}
function xn(r) {
  return qe(Date.now(), r);
}
function Yn(r) {
  return An(xn(r));
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
function ga() {
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
  return e && kn[e] || 0;
}
function On(r, e, t) {
  let a = r.calendar.getDaysInMonth(r);
  return Math.ceil((dr(Rn(r), e) + a) / 7);
}
function nt(r) {
  r = Ce(r, new Ee());
  let e = $t(r.era, r.year);
  return mr(e, r.month, r.day, r.hour, r.minute, r.second, r.millisecond);
}
function mr(r, e, t, a, n, o, l) {
  let s = /* @__PURE__ */ new Date();
  return s.setUTCHours(a, n, o, l), s.setUTCFullYear(r, e - 1, t), s.getTime();
}
function aa(r, e) {
  if (e === "UTC") return 0;
  if (r > 0 && e === ga()) return new Date(r).getTimezoneOffset() * -6e4;
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
function Be(r, e, t = "compatible") {
  let a = ot(r);
  if (e === "UTC") return nt(a);
  if (e === ga() && t === "compatible") {
    a = Ce(a, new Ee());
    let i = /* @__PURE__ */ new Date(), c = $t(a.era, a.year);
    return i.setFullYear(c, a.month - 1, a.day), i.setHours(a.hour, a.minute, a.second, a.millisecond), i.getTime();
  }
  let n = nt(a), o = aa(n - qa, e), l = aa(n + qa, e), s = Vn(a, e, n - o, n - l);
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
function qe(r, e) {
  let t = aa(r, e), a = new Date(r + t), n = a.getUTCFullYear(), o = a.getUTCMonth() + 1, l = a.getUTCDate(), s = a.getUTCHours(), i = a.getUTCMinutes(), c = a.getUTCSeconds(), v = a.getUTCMilliseconds();
  return new yt(n < 1 ? "BC" : "AD", n < 1 ? -n + 1 : n, o, l, e, t, s, i, c, v);
}
function An(r) {
  return new ue(r.calendar, r.era, r.year, r.month, r.day);
}
function ot(r, e) {
  let t = 0, a = 0, n = 0, o = 0;
  if ("timeZone" in r) ({ hour: t, minute: a, second: n, millisecond: o } = r);
  else if ("hour" in r && !e) return r;
  return e && ({ hour: t, minute: a, second: n, millisecond: o } = e), new lt(r.calendar, r.era, r.year, r.month, r.day, t, a, n, o);
}
function Ce(r, e) {
  if (Tn(r.calendar, e)) return r;
  let t = e.fromJulianDay(r.calendar.toJulianDay(r)), a = r.copy();
  return a.calendar = e, a.era = t.era, a.year = t.year, a.month = t.month, a.day = t.day, Ke(a), a;
}
function Pn(r, e, t) {
  if (r instanceof yt)
    return r.timeZone === e ? r : Bn(r, e);
  let a = Be(r, e, t);
  return qe(a, e);
}
function Ln(r) {
  let e = nt(r) - r.offset;
  return new Date(e);
}
function Bn(r, e) {
  let t = nt(r) - r.offset;
  return Ce(qe(t, e), r.calendar);
}
var ut = 36e5;
function Jt(r, e) {
  let t = r.copy(), a = "hour" in t ? Un(t, e) : 0;
  ra(t, e.years || 0), t.calendar.balanceYearMonth && t.calendar.balanceYearMonth(t, r), t.month += e.months || 0, na(t), pr(t), t.day += (e.weeks || 0) * 7, t.day += e.days || 0, t.day += a, Hn(t), t.calendar.balanceDate && t.calendar.balanceDate(t), t.year < 1 && (t.year = 1, t.month = 1, t.day = 1);
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
function Hn(r) {
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
function yr(r) {
  let e = {};
  for (let t in r) typeof r[t] == "number" && (e[t] = -r[t]);
  return e;
}
function gr(r, e) {
  return Jt(r, yr(e));
}
function $a(r, e) {
  let t = r.copy();
  return e.era != null && (t.era = e.era), e.year != null && (t.year = e.year), e.month != null && (t.month = e.month), e.day != null && (t.day = e.day), Ke(t), t;
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
      let s = r.calendar.getEras(), i = s.indexOf(r.era);
      if (i < 0) throw new Error("Invalid era: " + r.era);
      i = Ne(i, t, 0, s.length - 1, a == null ? void 0 : a.round), n.era = s[i], Ke(n);
      break;
    }
    case "year":
      var o, l;
      !((o = (l = n.calendar).isInverseEra) === null || o === void 0) && o.call(l, n) && (t = -t), n.year = Ne(r.year, t, -1 / 0, 9999, a == null ? void 0 : a.round), n.year === -1 / 0 && (n.year = 1), n.calendar.balanceYearMonth && n.calendar.balanceYearMonth(n, r);
      break;
    case "month":
      n.month = Ne(r.month, t, 1, r.calendar.getMonthsInYear(r), a == null ? void 0 : a.round);
      break;
    case "day":
      n.day = Ne(r.day, t, 1, r.calendar.getDaysInMonth(r), a == null ? void 0 : a.round);
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
      n.hour = Ne(o, t, l, s, a == null ? void 0 : a.round);
      break;
    }
    case "minute":
      n.minute = Ne(r.minute, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "second":
      n.second = Ne(r.second, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "millisecond":
      n.millisecond = Ne(r.millisecond, t, 0, 999, a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return n;
}
function Ne(r, e, t, a, n = false) {
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
    let n = Jt(ot(r), {
      years: e.years,
      months: e.months,
      weeks: e.weeks,
      days: e.days
    });
    t = Be(n, r.timeZone);
  } else
    t = nt(r) - r.offset;
  t += e.milliseconds || 0, t += (e.seconds || 0) * 1e3, t += (e.minutes || 0) * 6e4, t += (e.hours || 0) * 36e5;
  let a = qe(t, r.timeZone);
  return Ce(a, r.calendar);
}
function zn(r, e) {
  return Dr(r, yr(e));
}
function Wn(r, e, t, a) {
  switch (e) {
    case "hour": {
      let n = 0, o = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let M = r.hour >= 12;
        n = M ? 12 : 0, o = M ? 23 : 11;
      }
      let l = ot(r), s = Ce(Lt(l, {
        hour: n
      }), new Ee()), i = [
        Be(s, r.timeZone, "earlier"),
        Be(s, r.timeZone, "later")
      ].filter((M) => qe(M, r.timeZone).day === s.day)[0], c = Ce(Lt(l, {
        hour: o
      }), new Ee()), v = [
        Be(c, r.timeZone, "earlier"),
        Be(c, r.timeZone, "later")
      ].filter((M) => qe(M, r.timeZone).day === c.day).pop(), p = nt(r) - r.offset, m = Math.floor(p / ut), w = p % ut;
      return p = Ne(m, t, Math.floor(i / ut), Math.floor(v / ut), a == null ? void 0 : a.round) * ut + w, Ce(qe(p, r.timeZone), r.calendar);
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
      return Ce(qe(o, r.timeZone), r.calendar);
    }
    default:
      throw new Error("Unsupported field " + e);
  }
}
function jn(r, e, t) {
  let a = ot(r), n = Lt($a(a, e), e);
  if (n.compare(a) === 0) return r;
  let o = Be(n, r.timeZone, t);
  return Ce(qe(o, r.timeZone), r.calendar);
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
    return gr(this, e);
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
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, Ke(this);
  }
};
var Gn = /* @__PURE__ */ new WeakMap();
var lt = class _lt {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new _lt(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond) : new _lt(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `CalendarDateTime` with the given duration added to it. */
  add(e) {
    return Jt(this, e);
  }
  /** Returns a new `CalendarDateTime` with the given duration subtracted from it. */
  subtract(e) {
    return gr(this, e);
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
    return t === 0 ? Cn(this, ot(e)) : t;
  }
  constructor(...e) {
    ba(this, Gn, {
      writable: true,
      value: void 0
    });
    let [t, a, n, o, l] = Ma(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, Ke(this);
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
    return this.toDate().getTime() - Pn(e, this.timeZone).toDate().getTime();
  }
  constructor(...e) {
    ba(this, Xn, {
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
var Ue = [
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
  let e = Ft[Ue.indexOf(r.era)];
  if (!e) throw new Error("Unknown era: " + r.era);
  return new ue(r.year + e, r.month, r.day);
}
var to = class extends Ee {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = Na(t);
    return new ue(this, Ue[a], t.year - Ft[a], t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Zt(e));
  }
  balanceDate(e) {
    let t = Zt(e), a = Na(t);
    Ue[a] !== e.era && (e.era = Ue[a], e.year = t.year - Ft[a]), this.constrainDate(e);
  }
  constrainDate(e) {
    let t = Ue.indexOf(e.era), a = eo[t];
    if (a != null) {
      let [n, o, l] = a, s = n - Ft[t];
      e.year = Math.max(1, Math.min(s, e.year)), e.year === s && (e.month = Math.min(o, e.month), e.month === o && (e.day = Math.min(l, e.day)));
    }
    if (e.year === 1 && t >= 0) {
      let [, n, o] = Xe[t];
      e.month = Math.max(n, e.month), e.month === n && (e.day = Math.max(o, e.day));
    }
  }
  getEras() {
    return Ue;
  }
  getYearsInEra(e) {
    let t = Ue.indexOf(e.era), a = Xe[t], n = Xe[t + 1];
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
    let e = Ue.indexOf(r.era);
    return Xe[e];
  }
}
var Sr = -543;
var ao = class extends Ee {
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
  let [e, t] = jt(r.year + Sr);
  return new ue(e, t, r.month, r.day);
}
var Bt = 1911;
function wr(r) {
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
    return e.era === "before_minguo" ? 9999 : 9999 - Bt;
  }
  constructor(...e) {
    super(...e), this.identifier = "roc";
  }
};
function ja(r) {
  let [e, t] = jt(wr(r));
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
var oo = class extends Ee {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = t.year - Gt, n = e - Je(t.era, t.year, 1, 1), o;
    n < Ka ? (a--, o = ze(t.year - 1) ? 31 : 30, n += o + 155 + 90 + 10) : (o = ze(t.year) ? 31 : 30, n -= Ka);
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
    let t = e.year + Gt, [a, n] = jt(t), o, l;
    return ze(n) ? (o = 31, l = Je(a, n, 3, 21)) : (o = 30, l = Je(a, n, 3, 22)), e.month === 1 ? l + e.day - 1 : (l += o + Math.min(e.month - 2, 5) * 31, e.month >= 8 && (l += (e.month - 7) * 30), l += e.day - 1, l);
  }
  getDaysInMonth(e) {
    return e.month === 1 && ze(e.year + Gt) || e.month >= 2 && e.month <= 6 ? 31 : 30;
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
var Qe = 1600;
var lo = 460322;
function qt(r, e, t, a) {
  return a + Math.ceil(29.5 * (t - 1)) + (e - 1) * 354 + Math.floor((3 + 11 * e) / 30) + r - 1;
}
function kr(r, e, t) {
  let a = Math.floor((30 * (t - e) + 10646) / 10631), n = Math.min(12, Math.ceil((t - (29 + qt(e, a, 1, 1))) / 29.5) + 1), o = t - qt(e, a, n, 1) + 1;
  return new ue(r, a, n, o);
}
function Za(r) {
  return (14 + 11 * r) % 30 < 11;
}
var Sa = class {
  fromJulianDay(e) {
    return kr(this, Ht, e);
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
    return kr(this, Qa, e);
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
var et;
function At(r) {
  return lo + et[r - Oe];
}
function dt(r, e) {
  let t = r - Oe, a = 1 << 11 - (e - 1);
  return (oa[t] & a) === 0 ? 29 : 30;
}
function Ga(r, e) {
  let t = At(r);
  for (let a = 1; a < e; a++) t += dt(r, a);
  return t;
}
function Xa(r) {
  return et[r + 1 - Oe] - et[r - Oe];
}
var uo = class extends Sa {
  fromJulianDay(e) {
    let t = e - Ht, a = At(Oe), n = At(Qe);
    if (t < a || t > n) return super.fromJulianDay(e);
    {
      let o = Oe - 1, l = 1, s = 1;
      for (; s > 0; ) {
        o++, s = t - At(o) + 1;
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
    return e.year < Oe || e.year > Qe ? super.toJulianDay(e) : Ht + Ga(e.year, e.month) + (e.day - 1);
  }
  getDaysInMonth(e) {
    return e.year < Oe || e.year > Qe ? super.getDaysInMonth(e) : dt(e.year, e.month);
  }
  getDaysInYear(e) {
    return e.year < Oe || e.year > Qe ? super.getDaysInYear(e) : Xa(e.year);
  }
  constructor() {
    if (super(), this.identifier = "islamic-umalqura", oa || (oa = new Uint16Array(Uint8Array.from(atob(io), (e) => e.charCodeAt(0)).buffer)), !et) {
      et = new Uint32Array(Qe - Oe + 1);
      let e = 0;
      for (let t = Oe; t <= Qe; t++) {
        et[t - Oe] = e;
        for (let a = 1; a <= 12; a++) e += dt(t, a);
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
function je(r) {
  return Ge(r * 7 + 1, 19) < 7;
}
function Pt(r) {
  let e = Math.floor((235 * r - 234) / 19), t = 12084 + 13753 * e, a = e * 29 + Math.floor(t / 25920);
  return Ge(3 * (a + 1), 7) < 3 && (a += 1), a;
}
function ho(r) {
  let e = Pt(r - 1), t = Pt(r);
  return Pt(r + 1) - t === 356 ? 2 : t - e === 382 ? 1 : 0;
}
function ft(r) {
  return Pt(r) + ho(r);
}
function Yr(r) {
  return ft(r + 1) - ft(r);
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
function kt(r, e) {
  if (e >= 6 && !je(r) && e++, e === 4 || e === 7 || e === 9 || e === 11 || e === 13) return 29;
  let t = vo(r);
  return e === 2 ? t === 2 ? 30 : 29 : e === 3 ? t === 0 ? 29 : 30 : e === 6 ? je(r) ? 30 : 0 : 30;
}
var po = class {
  fromJulianDay(e) {
    let t = e - er, a = t * xr / mo, n = Math.floor((19 * a + 234) / 235) + 1, o = ft(n), l = Math.floor(t - o);
    for (; l < 1; )
      n--, o = ft(n), l = Math.floor(t - o);
    let s = 1, i = 0;
    for (; i < l; )
      i += kt(n, s), s++;
    s--, i -= kt(n, s);
    let c = l - i;
    return new ue(this, n, s, c);
  }
  toJulianDay(e) {
    let t = ft(e.year);
    for (let a = 1; a < e.month; a++) t += kt(e.year, a);
    return t + e.day + er;
  }
  getDaysInMonth(e) {
    return kt(e.year, e.month);
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
function Nt(r, e, t, a) {
  return r + 365 * e + Math.floor(e / 4) + 30 * (t - 1) + a - 1;
}
function wa(r, e) {
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
var ka = class {
  fromJulianDay(e) {
    let [t, a, n] = wa(la, e), o = "AM";
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
var yo = class extends ka {
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
var go = class extends ka {
  fromJulianDay(e) {
    let [t, a, n] = wa(tr, e), o = "CE";
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
      return new ka();
    case "ethioaa":
      return new yo();
    case "coptic":
      return new go();
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
import_dayjs.default.extend(yn);
import_dayjs.default.extend(bn);
function tt() {
  const r = /* @__PURE__ */ new Date();
  return {
    year: r.getFullYear(),
    month: r.getMonth() + 1,
    day: r.getDate()
  };
}
function wo(r) {
  try {
    const e = ga(), t = Yn(e);
    if (r.calendar.identifier !== t.calendar.identifier) {
      const a = Ce(t, r.calendar);
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
function He(r, e, t, a, n, o) {
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
function ko() {
  const r = Ze(), e = He(r.year, r.month, 1, 0, 0, 0), t = r.month === 12 ? 1 : r.month + 1, a = r.month === 12 ? r.year + 1 : r.year, n = He(a, t, 1), o = ia(n, -1);
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
    const n = e.hour !== void 0 && e.hour !== null, o = t.split(" "), l = o[0], s = o.slice(1).join(" "), i = this.formatDatePart(e, l, a);
    if (s && n) {
      const c = this.detectTimeFormat(s), v = this.formatTimePart(e, s, c);
      return `${i} ${v}`;
    }
    return i;
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
      const l = this.createSafeCalendar(a), s = new ue(e, t, 1), i = a === "gregory" ? s : this.safeToCalendar(s, l), c = On(i, n) ?? 6, p = (dr(i, n) - o + 7) % 7, m = i.subtract({ days: p }), w = [];
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
        const s = e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0, i = {
          calendar: a,
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        return s && (i.hour = "numeric", i.minute = "numeric", e.second !== void 0 && (i.second = "numeric")), new Ut(n, i).format(o.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone));
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
      return new lt(
        e.year,
        e.month,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
    {
      const a = Te.createSafeCalendar(t), n = new lt(
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
var at = (r) => /^\d+$/.test(r);
var rr = (r) => r % 4 === 0 && r % 100 !== 0 || r % 400 === 0;
var Pe = null;
function Ro() {
  return Pe || (Pe = document.createElement("span"), Pe.style.visibility = "hidden", Pe.style.position = "absolute", Pe.style.top = "-9999px", Pe.style.left = "-9999px", Pe.style.whiteSpace = "pre", document.body.appendChild(Pe)), Pe;
}
var ua = /* @__PURE__ */ new WeakMap();
function Eo(r, e = "") {
  const t = Ro(), a = getComputedStyle(r);
  return t.style.font = a.font, t.style.fontSize = a.fontSize, t.style.fontWeight = a.fontWeight, t.style.letterSpacing = a.letterSpacing, t.style.padding = a.padding, t.style.border = a.border, t.style.boxSizing = a.boxSizing, t.textContent = r.value || e || "", t.offsetWidth + 4;
}
function ct(r) {
  const e = r.placeholder || "", t = Eo(r, e), a = ua.get(r) || 0;
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
var Io = { class: "date-input-container flex items-center justify-start" };
var Oo = ["placeholder", "aria-invalid", "aria-errormessage"];
var Vo = ["placeholder", "aria-invalid", "aria-errormessage"];
var Fo = ["placeholder", "aria-invalid", "aria-errormessage"];
var Ao = {
  key: 3,
  class: "text-gray-400"
};
var Po = defineComponent({
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
    }), y = computed(() => Object.keys(c.value).length > 0), x = computed(() => Object.values(b.value)), S = computed(() => {
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
        const k = ye(Y);
        k && (l.value = k.year.toString(), s.value = k.month.toString().padStart(2, "0"), i.value = k.day.toString().padStart(2, "0"));
      } else
        l.value = "", s.value = "", i.value = "";
      Y || (M.value = null, w.value = false);
    }, { immediate: true });
    const g = () => {
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
    }, H = (Y, k) => {
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
    }, L = (Y, k) => {
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
            const A = parseInt(l.value), K = L(A, N);
            if (parseInt(i.value) > K)
              return { valid: false, error: { key: "day.notExistInMonth", params: { month: k, maxDays: K } } };
          }
          break;
        case "day":
          if (!at(k) || N < 1 || N > 31)
            return { valid: false, error: { key: "day.outOfRange" } };
          if (l.value && s.value) {
            const A = parseInt(l.value), K = parseInt(s.value), ne = L(A, K);
            if (N > ne)
              return K === 2 && N === 29 ? { valid: false, error: { key: "year.notLeapYear", params: { year: A } } } : { valid: false, error: { key: "day.notExistInMonth", params: { month: s.value, maxDays: ne } } };
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
      o("validation", !y.value, b.value, v.value);
    }, re = () => {
      l.value = "", s.value = "", i.value = "", c.value = {};
    }, X = (Y) => {
      const k = S.value.findIndex((ee) => ee === Y), N = k < S.value.length - 1 ? S.value[k + 1] : null;
      N ? nextTick(() => {
        $(N);
      }) : z();
    }, I = (Y, k, N, ee) => {
      const J = k.replace(/\D/g, "");
      if (J.length === 1 && w.value && (w.value = false), J.length <= N) {
        if (ee && J.length === 1 && parseInt(J) > ee) {
          const A = J.padStart(2, "0");
          Y === "year" ? l.value = A : Y === "month" ? s.value = A : Y === "day" && (i.value = A), X(Y);
        } else
          Y === "year" ? l.value = J : Y === "month" ? s.value = J : Y === "day" && (i.value = J);
        J.length === N && X(Y);
      }
    }, R = (Y) => {
      const k = Y.target;
      I("year", k.value, 4);
    }, D = (Y) => {
      const k = Y.target;
      I("month", k.value, 2, 1);
    }, U = (Y) => {
      const k = Y.target;
      I("day", k.value, 2, 3);
    }, P = () => {
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
      const N = Y.target, ee = S.value.findIndex((K) => K === k), J = ee > 0 ? S.value[ee - 1] : null, A = ee < S.value.length - 1 ? S.value[ee + 1] : null;
      Y.key === "Backspace" && N.value === "" && J && (Y.preventDefault(), w.value = true, H(J, "end")), Y.key === "ArrowLeft" && N.selectionStart === 0 && J && (Y.preventDefault(), w.value = true, H(J, "end")), Y.key === "ArrowRight" && N.selectionStart === N.value.length && A && (Y.preventDefault(), w.value = true, H(A, "start")), Y.key === "Enter" && z();
    }, ce = (Y) => {
      p.value = Y;
    }, le = (Y) => {
      z(), p.value = null;
    };
    return e({
      validate: z,
      reset: () => {
        re(), o("update:modelValue", null);
      },
      getErrors: () => ({ ...c.value }),
      hasErrors: () => y.value,
      errorMessages: () => x.value,
      focus: g,
      focusLast: P,
      setDate: (Y) => {
        if (Y) {
          const k = ye(Y);
          k && (l.value = k.year.toString(), s.value = k.month.toString().padStart(2, "0"), i.value = k.day.toString().padStart(2, "0"), z());
        } else
          re(), o("update:modelValue", null);
      },
      resetCompletionState: () => {
        w.value = false, M.value = null;
      }
    }), (Y, k) => (openBlock(), createElementBlock("div", Io, [
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
          onInput: R,
          onKeydown: k[1] || (k[1] = (J) => te(J, "year")),
          onFocus: k[2] || (k[2] = (J) => ce("year")),
          onBlur: k[3] || (k[3] = (J) => le()),
          "aria-label": "year",
          "aria-invalid": !!b.value.year,
          "aria-errormessage": b.value.year ? "year-error" : void 0
        }, null, 40, Oo)), [
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
          onBlur: k[7] || (k[7] = (J) => le()),
          "aria-label": "month",
          "aria-invalid": !!b.value.month,
          "aria-errormessage": b.value.month ? "month-error" : void 0
        }, null, 40, Vo)), [
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
          onInput: U,
          onKeydown: k[9] || (k[9] = (J) => te(J, "day")),
          onFocus: k[10] || (k[10] = (J) => ce("day")),
          onBlur: k[11] || (k[11] = (J) => le()),
          "aria-label": "day",
          "aria-invalid": !!b.value.day,
          "aria-errormessage": b.value.day ? "day-error" : void 0
        }, null, 40, Fo)), [
          [vModelText, i.value],
          [a, 20]
        ]) : createCommentVNode("", true),
        ee < S.value.length - 1 ? (openBlock(), createElementBlock("span", Ao, toDisplayString(Y.separator), 1)) : createCommentVNode("", true)
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
var ca = We(Po, [["__scopeId", "data-v-917a492c"]]);
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
      mounted: rt.mounted,
      updated: rt.updated,
      beforeUnmount: rt.beforeUnmount
    }, n = r, o = t, l = ref(""), s = ref(""), i = ref(""), c = ref("AM"), v = ref({}), p = ref({}), m = ref(null), w = ref(false), M = ref(), h = ref(), f = ref(), d = computed(() => Object.keys(v.value).length > 0), b = computed(() => {
      const I = {};
      return Object.entries(v.value).forEach(([R, D]) => {
        I[R] = D.key;
      }), I;
    }), y = () => {
      l.value = "", s.value = "", i.value = "", c.value = "AM";
    }, x = computed(() => {
      var I, R;
      if (!n.useLocalizedPeriod) return c.value;
      try {
        const D = /* @__PURE__ */ new Date();
        D.setHours(9, 0, 0);
        const U = /* @__PURE__ */ new Date();
        U.setHours(15, 0, 0);
        const P = new Intl.DateTimeFormat(n.locale, {
          hour: "numeric",
          hour12: true
        }), te = P.formatToParts(D), ce = P.formatToParts(U), le = ((I = te.find((k) => k.type === "dayPeriod")) == null ? void 0 : I.value) || "AM", Y = ((R = ce.find((k) => k.type === "dayPeriod")) == null ? void 0 : R.value) || "PM";
        return c.value === "AM" ? le : Y;
      } catch (D) {
        return console.error("Error getting localized period:", D), c.value;
      }
    }), S = computed(() => x.value), T = computed(() => {
      if (l.value === "" || s.value === "" || n.enableSeconds && i.value === "")
        return null;
      let I = parseInt(l.value, 10);
      n.use24Hour || (c.value === "PM" && I < 12 ? I += 12 : c.value === "AM" && I === 12 && (I = 0));
      const R = I.toString().padStart(2, "0"), D = s.value.padStart(2, "0");
      if (n.enableSeconds) {
        const U = i.value.padStart(2, "0");
        return `${R}:${D}:${U}`;
      } else
        return `${R}:${D}`;
    });
    watch(() => n.modelValue, (I) => {
      if (w.value || (w.value = true), I) {
        const R = I.split(":");
        let D = parseInt(R[0] || "0", 10);
        const U = (R[1] || "").replace(/\D/g, ""), P = (R[2] || "").replace(/\D/g, "");
        n.use24Hour || (D >= 12 ? (c.value = "PM", D = D === 12 ? 12 : D - 12) : (c.value = "AM", D = D === 0 ? 12 : D)), l.value = D.toString().padStart(2, "0"), s.value = U, n.enableSeconds && (i.value = P);
      } else
        y();
    }, { immediate: true });
    const u = (I, R) => {
      if (!R) return { valid: true };
      const D = parseInt(R);
      switch (I) {
        case "hour":
          const U = n.use24Hour ? 23 : 12, P = n.use24Hour ? 0 : 1;
          if (!at(R) || D < P || D > U)
            return { valid: false, error: { key: "time.hourOutOfRange", params: { min: P, max: U } } };
          break;
        case "minute":
          if (!at(R) || D < 0 || D > 59)
            return { valid: false, error: { key: "time.minuteOutOfRange", params: { min: 0, max: 59 } } };
          if (n.minuteStep > 1 && D % n.minuteStep !== 0)
            return { valid: false, error: { key: "time.minuteStepInvalid", params: { step: n.minuteStep } } };
          break;
        case "second":
          if (!at(R) || D < 0 || D > 59)
            return { valid: false, error: { key: "time.secondOutOfRange", params: { min: 0, max: 59 } } };
          break;
      }
      return v.value[I] && (delete v.value[I], delete p.value[I]), { valid: true };
    }, g = () => {
      c.value = c.value === "AM" ? "PM" : "AM", $();
    }, $ = () => {
      if (!w.value) return;
      v.value = {}, p.value = {};
      const I = u("hour", l.value), R = u("minute", s.value), D = n.enableSeconds ? u("second", i.value) : { valid: true };
      !I.valid && I.error && (v.value.hour = I.error, I.error.params && (p.value.hour = I.error.params)), !R.valid && R.error && (v.value.minute = R.error, R.error.params && (p.value.minute = R.error.params)), !D.valid && D.error && (v.value.second = D.error, D.error.params && (p.value.second = D.error.params)), n.required && (l.value || (v.value.hour = { key: "time.hourRequired" }), s.value || (v.value.minute = { key: "time.minuteRequired" }), n.enableSeconds && !i.value && (v.value.second = { key: "time.secondRequired" })), o("validation", !d.value, b.value, p.value), T.value ? (o("update:modelValue", T.value), o("complete", T.value)) : w.value && o("update:modelValue", null);
    }, H = (I) => {
      const D = I.target.value.replace(/\D/g, "");
      if (D.length <= 2) {
        if (l.value = D, !u("hour", D).valid) return;
        (D.length === 2 || n.use24Hour && parseInt(D) > 2 || !n.use24Hour && parseInt(D) > 1) && nextTick(() => {
          var P;
          (P = h.value) == null || P.focus();
        });
      }
    }, L = (I) => {
      const D = I.target.value.replace(/\D/g, "");
      if (D.length <= 2) {
        if (D.length === 1 && parseInt(D) > 5 ? (s.value = D.padStart(2, "0"), nextTick(() => {
          n.enableSeconds && f.value ? f.value.focus() : $();
        })) : s.value = D, !u("minute", D).valid) return;
        D.length === 2 && nextTick(() => {
          n.enableSeconds && f.value ? f.value.focus() : $();
        });
      }
    }, _ = (I) => {
      const D = I.target.value.replace(/\D/g, "");
      if (D.length <= 2) {
        if (D.length === 1 && parseInt(D) > 5 ? (i.value = D.padStart(2, "0"), $()) : i.value = D, !u("second", D).valid) return;
        D.length === 2 && $();
      }
    }, z = (I, R) => {
      var U, P, te, ce, le, Y, k, N, ee, J, A, K;
      const D = I.target;
      if (I.key === "Backspace" && D.value === "")
        switch (R) {
          case "hour":
            I.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            I.preventDefault(), (U = M.value) == null || U.focus(), (P = M.value) == null || P.setSelectionRange(-1, -1);
            break;
          case "second":
            I.preventDefault(), (te = h.value) == null || te.focus(), (ce = h.value) == null || ce.setSelectionRange(-1, -1);
            break;
        }
      if (I.key === "ArrowLeft" && D.selectionStart === 0)
        switch (R) {
          case "hour":
            I.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            I.preventDefault(), (le = M.value) == null || le.focus(), (Y = M.value) == null || Y.setSelectionRange(-1, -1);
            break;
          case "second":
            I.preventDefault(), (k = h.value) == null || k.focus(), (N = h.value) == null || N.setSelectionRange(-1, -1);
            break;
        }
      if (I.key === "ArrowRight" && D.selectionStart === D.value.length)
        switch (R) {
          case "hour":
            I.preventDefault(), (ee = h.value) == null || ee.focus(), (J = h.value) == null || J.setSelectionRange(0, 0);
            break;
          case "minute":
            n.enableSeconds && (I.preventDefault(), (A = f.value) == null || A.focus(), (K = f.value) == null || K.setSelectionRange(0, 0));
            break;
        }
      I.key === "Enter" && $();
    }, re = (I) => {
      m.value = I;
    }, X = (I) => {
      m.value = null, $();
    };
    return e({
      validate: $,
      reset: () => {
        y(), v.value = {}, p.value = {}, o("update:modelValue", null);
      },
      getErrors: () => b.value,
      hasErrors: d,
      setTime: (I) => {
        if (I) {
          const [R, D, U] = I.split(":");
          let P = parseInt(R);
          n.use24Hour || (P >= 12 ? (c.value = "PM", P = P === 12 ? 12 : P - 12) : (c.value = "AM", P = P === 0 ? 12 : P)), l.value = P.toString().padStart(2, "0"), s.value = D, n.enableSeconds && U && (i.value = U), $();
        } else
          y(), o("update:modelValue", null);
      },
      focus: () => {
        var I;
        (I = M.value) == null || I.focus();
      },
      focusLast: () => {
        n.enableSeconds && f.value ? (f.value.focus(), f.value.setSelectionRange(0, 0)) : h.value ? (h.value.focus(), h.value.setSelectionRange(0, 0)) : M.value && (M.value.focus(), M.value.setSelectionRange(0, 0));
      }
    }), (I, R) => (openBlock(), createElementBlock("div", Lo, [
      withDirectives(createBaseVNode("input", {
        ref_key: "hourRef",
        ref: M,
        "onUpdate:modelValue": R[0] || (R[0] = (D) => l.value = D),
        type: "text",
        inputmode: "numeric",
        placeholder: I.hourPlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: H,
        onKeydown: R[1] || (R[1] = (D) => z(D, "hour")),
        onFocus: R[2] || (R[2] = (D) => re("hour")),
        onBlur: R[3] || (R[3] = (D) => X()),
        "aria-label": "hour",
        "aria-invalid": !!v.value.hour,
        "aria-errormessage": v.value.hour ? "hour-error" : void 0
      }, null, 40, Bo), [
        [vModelText, l.value],
        [a, 20]
      ]),
      R[13] || (R[13] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
      withDirectives(createBaseVNode("input", {
        ref_key: "minuteRef",
        ref: h,
        "onUpdate:modelValue": R[4] || (R[4] = (D) => s.value = D),
        type: "text",
        inputmode: "numeric",
        placeholder: I.minutePlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: L,
        onKeydown: R[5] || (R[5] = (D) => z(D, "minute")),
        onFocus: R[6] || (R[6] = (D) => re("minute")),
        onBlur: R[7] || (R[7] = (D) => X()),
        "aria-label": "minute",
        "aria-invalid": !!v.value.minute,
        "aria-errormessage": v.value.minute ? "minute-error" : void 0
      }, null, 40, Ho), [
        [vModelText, s.value],
        [a, 20]
      ]),
      I.enableSeconds ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        R[12] || (R[12] = createBaseVNode("span", { class: "text-gray-400 mx-1" }, ":", -1)),
        withDirectives(createBaseVNode("input", {
          ref_key: "secondRef",
          ref: f,
          "onUpdate:modelValue": R[8] || (R[8] = (D) => i.value = D),
          type: "text",
          inputmode: "numeric",
          placeholder: I.secondPlaceholder,
          maxlength: 2,
          class: "time-input text-sm text-center",
          onInput: _,
          onKeydown: R[9] || (R[9] = (D) => z(D, "second")),
          onFocus: R[10] || (R[10] = (D) => re("second")),
          onBlur: R[11] || (R[11] = (D) => X()),
          "aria-label": "second",
          "aria-invalid": !!v.value.second,
          "aria-errormessage": v.value.second ? "second-error" : void 0
        }, null, 40, qo), [
          [vModelText, i.value],
          [a, 20]
        ])
      ], 64)) : createCommentVNode("", true),
      I.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
        key: 1,
        type: "button",
        class: normalizeClass(["time-period pl-2 text-sm cursor-pointer", l.value ? "text-vdt-content" : "text-gray-400"]),
        onClick: withModifiers(g, ["stop"])
      }, toDisplayString(S.value), 3))
    ]));
  }
});
var da = We(No, [["__scopeId", "data-v-fb3720c7"]]);
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
var Tt = {
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
    this.currentLocale = e;
  }
  getCurrentLocale() {
    return this.currentLocale;
  }
  getMessage(e, t) {
    const a = e.split(".");
    let n = Tt[this.currentLocale];
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
    Tt[e] = {
      ...Tt[e],
      ...this.deepMerge(Tt[e], t)
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
  const e = new _o(), t = ["zh-TW", "zh-CN", "en-US", "ja-JP", "ko-KR"], a = (p) => t.includes(p) ? p : (console.warn(`Locale "${p}" is not supported. Defaulting to "en-US".`), "en-US"), n = a(r), o = ref(n);
  e.setLocale(n);
  const l = (p) => {
    o.value = a(p), e.setLocale(o.value);
  }, s = (p, m) => e.getMessage(p, m), i = (p, m) => e.getErrorMessage(p, m), c = (p, m) => e.getPlaceholderMessage(p, m), v = (p, m) => Fr(p, m);
  return {
    currentLocale: computed(() => o.value),
    setLocale: l,
    getMessage: s,
    getErrorMessage: i,
    getPlaceholderMessage: c,
    formatText: v
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
          var y;
          if (b) {
            s.value[d] = b;
            const x = ((y = t.errorParams) == null ? void 0 : y[d]) || {};
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
      const y = {
        請選擇日期: "date.required",
        請選擇時間: "time.required",
        請選擇開始日期: "range.startRequired",
        請選擇結束日期: "range.endRequired",
        "Please select a date": "date.required",
        "Please select a time": "time.required",
        "Please select start date": "range.startRequired",
        "Please select end date": "range.endRequired"
      };
      if (y[f])
        try {
          const u = o(y[f], b);
          if (t.debug && console.log(`直接匹配翻譯: "${f}" -> "${u}" with params:`, b), u && u !== y[f])
            return u;
        } catch (u) {
          t.debug && console.warn(`直接匹配翻譯失敗: ${y[f]}`, u);
        }
      function x(u, g) {
        if (/請輸入|please enter|required/i.test(u)) {
          if (g != null && g.includes("year") || u.includes("年份")) return "year.required";
          if (g != null && g.includes("month") || u.includes("月份")) return "month.required";
          if (g != null && g.includes("day") || u.includes("日期")) return "day.required";
          if (g != null && g.includes("hour") || u.includes("小時")) return "time.hourRequired";
          if (g != null && g.includes("minute") || u.includes("分鐘")) return "time.minuteRequired";
          if (g != null && g.includes("second") || u.includes("秒鐘")) return "time.secondRequired";
          if (g != null && g.includes("startDate") || u.includes("開始日期")) return "range.startRequired";
          if (g != null && g.includes("endDate") || u.includes("結束日期")) return "range.endRequired";
          if (g != null && g.includes("time") || u.includes("時間")) return "time.required";
          if (g != null && g.includes("date") || u.includes("日期")) return "date.required";
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
          const g = u.handler ? u.handler(d) : u.key;
          if (g)
            try {
              const $ = o(g, b);
              if (t.debug && console.log(`模式匹配翻譯: "${f}" -> "${$}" (key: ${g}) with params:`, b), $ && $ !== g)
                return $;
            } catch ($) {
              t.debug && console.warn(`模式匹配翻譯失敗: ${g}`, $);
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
    }), (f, d) => c.value ? (openBlock(), createElementBlock("div", Ko, [
      Array.isArray(v.value) ? (openBlock(), createElementBlock("div", Qo, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(v.value, (b, y) => (openBlock(), createElementBlock("div", { key: y }, [
          renderSlot(f.$slots, `error-${b.field}`, {
            error: b,
            message: b.message,
            field: b.field
          }, () => [
            createBaseVNode("span", null, toDisplayString(b.message), 1)
          ])
        ]))), 128))
      ])) : typeof v.value == "string" ? (openBlock(), createElementBlock("div", Zo, [
        renderSlot(f.$slots, "error-single", {
          error: v.value,
          message: v.value
        }, () => [
          createBaseVNode("span", null, toDisplayString(v.value), 1)
        ])
      ])) : typeof v.value == "object" ? (openBlock(), createElementBlock("div", Go, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(v.value, (b, y) => (openBlock(), createElementBlock("div", { key: y }, [
          renderSlot(f.$slots, m(y), {
            field: y,
            error: b,
            message: b,
            originalKey: p(y),
            fieldType: w(y)
          }, () => [
            createBaseVNode("span", null, toDisplayString(b), 1)
          ])
        ]))), 128))
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
var Pr = We(Xo, [["render", tl]]);
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
var Lr = We(al, [["render", nl]]);
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
var Br = We(ol, [["render", sl]]);
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
var yl = {
  key: 1,
  class: "p-4 text-center text-sm text-vdt-content-muted"
};
var gl = { class: "mb-2" };
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
    const a = r, n = t, { getMessage: o, formatText: l } = Dt(a.locale), s = ref(null), i = ref(null), c = computed(() => me.getCalendarRange(a.calendar)), v = computed(() => me.getCalendarDisplayName(a.calendar, a.locale)), p = computed(() => a.calendar === "gregory"), m = computed(() => a.calendar === "japanese"), w = computed(() => T.value[0]), M = computed(() => T.value[T.value.length - 1]), h = ref(0), f = (D) => {
      const U = Math.floor(D / a.pageSize) * a.pageSize;
      return Math.max(U, c.value.min);
    }, d = () => {
      h.value = f(a.selectedYear);
    }, b = /* @__PURE__ */ new Map(), y = (D, U) => {
      const P = `${D}-${U}`;
      if (!b.has(P))
        try {
          b.set(P, new Ut(U, { calendar: D, year: "numeric", era: "short" }));
        } catch {
          b.set(P, new Ut(U, { year: "numeric" }));
        }
      return b.get(P);
    }, x = (D) => {
      var P, te;
      const U = {
        gregorianYear: D,
        displayEra: "",
        displayYear: D.toString(),
        showReference: false,
        displayWarning: false
      };
      if (p.value)
        return U;
      try {
        const ce = new ue(D, 6, 1), le = me.safeToCalendar(ce, me.createSafeCalendar(a.calendar)), k = y(a.calendar, a.locale).formatToParts(le.toDate("UTC"));
        U.displayYear = ((P = k.find((J) => J.type === "year")) == null ? void 0 : P.value) || D.toString(), U.displayEra = ((te = k.find((J) => J.type === "era")) == null ? void 0 : te.value) || "";
        const N = !!U.displayEra, ee = U.displayEra !== D.toString();
        (N || ee) && (U.showReference = true, U.referenceYear = D.toString());
      } catch {
        if (U.displayWarning = true, U.warningMessage = `無法轉換為${v.value}`, a.calendar === "roc") {
          const le = D - 1911;
          U.displayYear = le > 0 ? le.toString() : `民國前${Math.abs(le - 1)}年`;
        }
      }
      return U;
    }, S = (D) => D >= c.value.min && D <= c.value.max, T = computed(() => {
      const D = h.value, U = [];
      for (let P = 0; P < a.pageSize; P++) {
        const te = D + P;
        if (te > c.value.max) break;
        te < c.value.min || U.push(x(te));
      }
      return U;
    }), u = computed(() => {
      const D = T.value;
      if (D.length === 0) return "";
      const U = D[0], P = D[D.length - 1];
      if (p.value)
        return `${U.displayYear} - ${P.displayYear}`;
      if (U.gregorianYear === P.gregorianYear)
        return U.displayYear;
      const te = U.displayEra, ce = P.displayEra;
      return te && ce && te === ce ? `${te} ${U.displayYear} - ${P.displayYear}` : `${U.displayEra} ${U.displayYear} - ${P.displayEra} ${P.displayYear}`;
    }), g = computed(() => h.value > c.value.min), $ = computed(() => h.value + a.pageSize <= c.value.max), H = () => {
      g.value && (h.value = Math.max(
        h.value - a.pageSize,
        c.value.min
      ));
    }, L = () => {
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
    }, X = (D) => o(`yearSelector.${D}`);
    watch([() => a.selectedYear, () => a.calendar], () => {
      S(a.selectedYear) && (h.value = f(a.selectedYear));
    }, { immediate: true });
    const R = (D) => {
      if (a.showSelector && s.value) {
        const U = D.target, P = !!U.closest("[data-year-selector-button]");
        !s.value.contains(U) && !P && n("update:showSelector", false);
      }
    };
    return onMounted(() => {
      d(), document.addEventListener("mousedown", R);
    }), onBeforeUnmount(() => {
      document.removeEventListener("mousedown", R);
    }), e({
      getLocalizedText: X,
      formatText: l,
      goToSpecificYear: z,
      goToValidRange: re
    }), (D, U) => D.showSelector ? (openBlock(), createElementBlock("div", {
      key: 0,
      ref_key: "yearSelectorRef",
      ref: s,
      class: "absolute top-full mt-1 right-0 min-w-56 max-h-72 overflow-auto bg-vdt-surface-elevated text-vdt-content border border-vdt-outline rounded-md shadow-lg z-20"
    }, [
      createBaseVNode("div", il, [
        createBaseVNode("button", {
          type: "button",
          onClick: H,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !g.value }]),
          disabled: !g.value,
          "aria-label": "previous year"
        }, [
          createVNode(Lr, { class: "h-4 w-4" })
        ], 10, ul),
        createBaseVNode("span", cl, [
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
          onClick: L,
          class: normalizeClass(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !$.value }]),
          disabled: !$.value,
          "aria-label": "next year"
        }, [
          createVNode(Br, { class: "h-4 w-4" })
        ], 10, dl)
      ]),
      T.value.length > 0 ? (openBlock(), createElementBlock("div", fl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(T.value, (P) => (openBlock(), createElementBlock("button", {
          type: "button",
          key: P.gregorianYear,
          onClick: (te) => _(P.gregorianYear),
          class: normalizeClass([
            "p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200",
            D.selectedYear === P.gregorianYear ? "bg-vdt-theme-500 text-white" : "hover:bg-vdt-interactive-hover text-vdt-content",
            P.displayWarning ? "ring-1 ring-amber-400" : ""
          ]),
          title: P.warningMessage
        }, [
          renderSlot(D.$slots, "year-display", {
            yearData: P,
            isSelected: D.selectedYear === P.gregorianYear
          }, () => [
            createBaseVNode("div", hl, [
              m.value ? (openBlock(), createElementBlock("div", vl, toDisplayString(P.displayEra), 1)) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(P.displayYear), 1)
            ]),
            P.showReference ? (openBlock(), createElementBlock("div", pl, toDisplayString(P.referenceYear), 1)) : createCommentVNode("", true)
          ], true)
        ], 10, ml))), 128))
      ])) : (openBlock(), createElementBlock("div", yl, [
        renderSlot(D.$slots, "no-years-display", {
          calendarRange: c.value,
          goToValidRange: re
        }, () => [
          createBaseVNode("div", gl, toDisplayString(X("noYearsToDisplay")), 1),
          createBaseVNode("button", {
            type: "button",
            onClick: re,
            class: "text-xs bg-vdt-theme-100 hover:bg-vdt-theme-200 px-3 py-1 rounded text-vdt-theme-700"
          }, toDisplayString(X("returnToValidRange")), 1)
        ], true)
      ])),
      createBaseVNode("div", $l, [
        renderSlot(D.$slots, "year-input", {
          yearInput: i.value,
          calendarRange: c.value,
          calendarDisplayName: v.value,
          goToSpecificYear: z,
          getLocalizedText: X,
          formatText: unref(l)
        }, () => [
          createBaseVNode("div", Dl, toDisplayString(X("jumpToYear")), 1),
          withDirectives(createBaseVNode("input", {
            type: "number",
            "onUpdate:modelValue": U[0] || (U[0] = (P) => i.value = P),
            onKeydown: withKeys(z, ["enter"]),
            placeholder: X("inputYearPlaceholder"),
            min: c.value.min,
            max: c.value.max,
            class: "w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500"
          }, null, 40, bl), [
            [vModelText, i.value]
          ]),
          createBaseVNode("div", Ml, toDisplayString(unref(l)(X("yearRangeInfo"), {
            calendar: v.value,
            min: c.value.min,
            max: c.value.max
          })), 1)
        ], true)
      ])
    ], 512)) : createCommentVNode("", true);
  }
});
var wl = We(Sl, [["__scopeId", "data-v-f14c8987"]]);
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
    const t = r, a = e, n = ref(t.month), o = ref(t.year), l = ref(false), s = computed(() => t.calendar || "gregory"), i = computed(() => me.getCalendarRange(t.calendar));
    watch(() => t.month, (y) => {
      n.value = y;
    }, { immediate: true }), watch(() => t.year, (y) => {
      o.value = y;
    }, { immediate: true });
    const c = computed(() => {
      if (t.calendar === "gregory")
        return o.value.toString();
      try {
        const y = new ue(o.value, 6, 1), x = me.safeToCalendar(
          y,
          me.createSafeCalendar(t.calendar)
        );
        return new Ut(t.locale, {
          calendar: t.calendar,
          year: "numeric"
        }).format(x.toDate("UTC"));
      } catch {
        return o.value.toString();
      }
    }), v = computed(() => me.getMonthNames(t.locale, t.calendar)), p = computed(() => {
      let y = o.value, x = n.value - 1;
      return x < 1 && (x = 12, y = o.value - 1), y >= i.value.min;
    }), m = computed(() => {
      let y = o.value, x = n.value + 1;
      return x > 12 && (x = 1, y = o.value + 1), y <= i.value.max;
    }), w = () => {
      if (!p.value) return;
      let y = n.value - 1, x = o.value;
      y < 1 && (y = 12, x -= 1), x >= i.value.min && d(y, x);
    }, M = () => {
      if (!m.value) return;
      let y = n.value + 1, x = o.value;
      y > 12 && (y = 1, x += 1), x <= i.value.max && d(y, x);
    }, h = () => {
      d(n.value, o.value);
    }, f = (y) => {
      y >= i.value.min && y <= i.value.max && (o.value = y, d(n.value, y));
    }, d = (y, x) => {
      n.value = y, o.value = x, a("update:month", y), a("update:year", x);
    }, b = () => {
      l.value = !l.value;
    };
    return (y, x) => (openBlock(), createElementBlock("div", kl, [
      createBaseVNode("button", {
        type: "button",
        onClick: w,
        class: "p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "上個月",
        disabled: !p.value
      }, [
        createVNode(Lr, { class: "h-5 w-5" })
      ], 8, Tl),
      createBaseVNode("div", xl, [
        renderSlot(y.$slots, "month-selector", {
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
            }, toDisplayString(S), 9, Yl))), 128))
          ], 544), [
            [vModelSelect, n.value]
          ])
        ]),
        createBaseVNode("div", Cl, [
          renderSlot(y.$slots, "year-selector", {
            displayYear: c.value,
            toggleYearSelector: b,
            showYearSelector: l.value
          }, () => [
            createBaseVNode("button", {
              type: "button",
              onClick: b,
              "data-year-selector-button": "",
              class: "inline-flex text-nowrap items-center px-2 py-1 bg-vdt-surface text-vdt-content w-full border border-vdt-outline rounded-sm text-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200",
              "aria-label": "選擇年份"
            }, toDisplayString(c.value), 1)
          ]),
          createVNode(wl, {
            "selected-year": o.value,
            "show-selector": l.value,
            "onUpdate:showSelector": x[1] || (x[1] = (S) => l.value = S),
            calendar: s.value,
            locale: y.locale,
            onYearSelected: f
          }, createSlots({ _: 2 }, [
            renderList(y.$slots, (S, T) => ({
              name: T,
              fn: withCtx((u) => [
                renderSlot(y.$slots, T, normalizeProps(guardReactiveProps(u)))
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
var Al = defineComponent({
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
    return (s, i) => (openBlock(), createElementBlock("div", Vl, [
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
      }, toDisplayString(s.date.day), 43, Fl)
    ]));
  }
});
var Pl = We(Al, [["__scopeId", "data-v-9018b2ca"]]);
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
    }, p = (h) => wo(h), m = computed(() => s.value.map((h, f) => {
      const d = `${h.year}-${h.month}-${h.day}`, b = p(h), y = h.month !== o.value, x = v(h), S = a.selectionMode === "single" && c(h, a.selectedDate), T = a.selectionMode === "range" && c(h, a.rangeStart), u = a.selectionMode === "range" && c(h, a.rangeEnd), g = a.selectionMode === "range" && i(h) && !T && !u && !x, $ = h.day === 1 && h.month === o.value, H = [
        d,
        S,
        b,
        x,
        T,
        u,
        g,
        a.selectionMode,
        a.calendar
      ];
      return {
        key: `${a.calendar}-${l.value}-${o.value}-${d}-${f}`,
        memoKey: H,
        date: h,
        isToday: b,
        isSelected: S,
        isDisabled: x,
        isOutsideMonth: y,
        isRangeStart: T,
        isRangeEnd: u,
        isInRange: g,
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
    }), (h, f) => (openBlock(), createElementBlock("div", Ll, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(m.value, (d, b, y, x) => {
        const S = d.memoKey;
        if (x && x.key === d.key && isMemoSame(x, S)) return x;
        const T = (openBlock(), createBlock(Pl, {
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
    const a = r, n = t, { getPlaceholderMessage: o } = Dt(a.locale), l = ref(0), s = ref(0), i = ref(0), c = ref("AM"), v = ref(false), p = computed(() => a.use24Hour ? Array.from({ length: 24 }, (u, g) => g) : Array.from({ length: 12 }, (u, g) => g + 1)), m = computed(() => Array.from({ length: 60 }, (u, g) => g)), w = computed(() => Array.from({ length: 60 }, (u, g) => g)), M = computed(() => {
      let u = l.value;
      a.use24Hour || (c.value === "PM" && u < 12 ? u += 12 : c.value === "AM" && u === 12 && (u = 0));
      const g = h(u), $ = h(s.value);
      if (a.enableSeconds) {
        const H = h(i.value);
        return `${g}:${$}:${H}`;
      } else
        return `${g}:${$}`;
    }), h = (u) => u.toString().padStart(2, "0"), f = (u) => h(u), d = (u) => {
      if (!u) return;
      const [g, $, H] = u.split(":");
      let L = parseInt(g) || 0;
      a.use24Hour || (L >= 12 ? (c.value = "PM", L = L === 12 ? 12 : L - 12) : (c.value = "AM", L = L === 0 ? 12 : L)), l.value = L, s.value = parseInt($) || 0, a.enableSeconds && H && (i.value = parseInt(H) || 0), v.value = true;
    }, b = () => {
      d(a.defaultTime);
    }, y = (u) => {
      c.value = u;
    }, x = (u) => {
      const g = /* @__PURE__ */ new Date();
      g.setHours(u === "AM" ? 6 : 18, 0, 0, 0);
      const L = new Intl.DateTimeFormat(a.locale || navigator.language, {
        hour12: true,
        hour: "numeric"
      }).formatToParts(g).find((_) => _.type === "dayPeriod");
      return (L == null ? void 0 : L.value) || u;
    }, S = () => {
      const u = /* @__PURE__ */ new Date();
      if (a.use24Hour)
        l.value = u.getHours();
      else {
        const g = u.getHours();
        c.value = g >= 12 ? "PM" : "AM", l.value = g % 12 || 12;
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
    }), (u, g) => u.show ? (openBlock(), createElementBlock("div", Hl, [
      g[5] || (g[5] = createBaseVNode("hr", { class: "my-2 border-vdt-outline" }, null, -1)),
      createBaseVNode("div", ql, [
        createBaseVNode("label", Nl, toDisplayString(unref(o)("general.time")) + ": ", 1),
        createBaseVNode("div", Ul, [
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
      createBaseVNode("div", zl, [
        createBaseVNode("div", Wl, [
          createBaseVNode("div", jl, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": g[0] || (g[0] = ($) => l.value = $),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(p.value, ($) => (openBlock(), createElementBlock("option", {
                key: $,
                value: $
              }, toDisplayString(f($)), 9, Jl))), 128))
            ], 512), [
              [vModelSelect, l.value]
            ])
          ]),
          createBaseVNode("div", _l, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": g[1] || (g[1] = ($) => s.value = $),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(m.value, ($) => (openBlock(), createElementBlock("option", {
                key: $,
                value: $
              }, toDisplayString(h($)), 9, Kl))), 128))
            ], 512), [
              [vModelSelect, s.value]
            ])
          ]),
          u.enableSeconds ? (openBlock(), createElementBlock("div", Ql, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": g[2] || (g[2] = ($) => i.value = $),
              class: "appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(w.value, ($) => (openBlock(), createElementBlock("option", {
                key: $,
                value: $
              }, toDisplayString(h($)), 9, Zl))), 128))
            ], 512), [
              [vModelSelect, i.value]
            ])
          ])) : createCommentVNode("", true),
          u.use24Hour ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Gl, [
            createBaseVNode("div", Xl, [
              createBaseVNode("button", {
                type: "button",
                onClick: g[3] || (g[3] = ($) => y("AM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", c.value === "AM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(x("AM")), 3),
              createBaseVNode("button", {
                type: "button",
                onClick: g[4] || (g[4] = ($) => y("PM")),
                class: normalizeClass(["px-2 py-1 text-sm transition-colors", c.value === "PM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, toDisplayString(x("PM")), 3)
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
    watch(b, ({ year: u, month: g }) => {
      i.value = u, c.value = g;
    }, { immediate: true }), watch(() => a.timeValue, (u) => {
      v.value = u;
    }, { immediate: true });
    const y = (u) => {
      if (a.selectionMode === "single") {
        const g = me.convertFromCalendarDate(u, a.calendar);
        g && (n("select", g, true), a.showTimeSelector && v.value && n("time-select", v.value));
      }
    }, x = (u, g) => {
      if (a.selectionMode === "range") {
        const $ = me.convertFromCalendarDate(u, a.calendar), H = me.convertFromCalendarDate(g, a.calendar);
        n("range-select", $, H);
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
      setDisplayMonth: (u, g) => {
        i.value = u, c.value = g;
      },
      // 導航到上個月
      previousMonth: () => {
        c.value === 1 ? (c.value = 12, i.value -= 1) : c.value -= 1;
      },
      // 導航到下個月
      nextMonth: () => {
        c.value === 12 ? (c.value = 1, i.value += 1) : c.value += 1;
      }
    }), (u, g) => (openBlock(), createElementBlock("div", ts, [
      createVNode(El, {
        month: c.value,
        "onUpdate:month": g[0] || (g[0] = ($) => c.value = $),
        year: i.value,
        "onUpdate:year": g[1] || (g[1] = ($) => i.value = $),
        locale: u.locale,
        "min-year": f.value,
        "max-year": d.value,
        calendar: u.calendar
      }, createSlots({ _: 2 }, [
        renderList(u.$slots, ($, H) => ({
          name: H,
          fn: withCtx((L) => [
            renderSlot(u.$slots, H, normalizeProps(guardReactiveProps(L)))
          ])
        }))
      ]), 1032, ["month", "year", "locale", "min-year", "max-year", "calendar"]),
      createVNode(Ol, {
        locale: u.locale,
        "week-starts-on": u.weekStartsOn,
        calendar: u.calendar
      }, null, 8, ["locale", "week-starts-on", "calendar"]),
      createVNode(Bl, {
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
        onSelect: y,
        onRangeSelect: x
      }, null, 8, ["year", "month", "selected-date", "range-start", "range-end", "selection-mode", "min-date", "max-date", "locale", "week-starts-on", "calendar"]),
      createVNode(es, {
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
var Hr = We(as, [["render", ns]]);
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
  const { required: e = true, showTime: t = false, minDate: a, maxDate: n, dateFormat: o = "YYYY-MM-DD" } = r, l = ref({}), s = ref({}), i = ref({}), c = computed(() => ({ ...l.value, ...s.value })), v = computed(() => ({ ...i.value })), p = computed(() => Object.keys(c.value).length > 0), m = (S, T, u = "date", g = {}) => {
    ["date", "year", "month", "day"].forEach(($) => {
      h(`${u}.${$}`), f(`${u}.${$}`);
    }), S || Object.entries(T).forEach(([$, H]) => {
      const L = `${u}.${$}`;
      l.value[L] = H, g[$] && (i.value[L] = g[$]);
    });
  }, w = (S, T, u = "time", g = {}) => (["time", "hour", "minute", "second"].forEach(($) => {
    h(`${u}.${$}`), f(`${u}.${$}`);
  }), S || Object.entries(T).forEach(([$, H]) => {
    const L = `${u}.${$}`;
    l.value[L] = H, g[$] && (i.value[L] = g[$]);
  }), !p.value), M = (S) => {
    if (!S) return false;
    if (a) {
      const T = ye(a);
      if (T && Wt(S, T) < 0)
        return m(false, {
          date: "date.beforeMin"
        }, "date", {
          date: { minDate: Re(T, o) }
        }), false;
    }
    if (n) {
      const T = ye(n);
      if (T && Wt(S, T) > 0)
        return m(false, {
          date: "date.afterMax"
        }, "date", {
          date: { maxDate: Re(T, o) }
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
    const g = u.hour.toString().padStart(2, "0"), $ = (u.minute || 0).toString().padStart(2, "0");
    if (l) {
      const H = (u.second || 0).toString().padStart(2, "0");
      return `${g}:${$}:${H}`;
    } else
      return `${g}:${$}`;
  }, p = (u, g) => {
    if (!u) return null;
    const $ = ye(u);
    if (!$) return null;
    if (!g && !e)
      return He($.year, $.month, $.day);
    if (!g)
      if (o) {
        const re = o.split(":").map(Number), X = re[0] || 0, I = re[1] || 0, R = re[2] || 0;
        return He(
          $.year,
          $.month,
          $.day,
          X,
          I,
          R
        );
      } else
        return He($.year, $.month, $.day);
    const H = g.split(":").map(Number), L = H[0] || 0, _ = H[1] || 0, z = H[2] || 0;
    return He(
      $.year,
      $.month,
      $.day,
      L,
      _,
      z
    );
  }, m = (u) => {
    const g = ye(u);
    s.value = g, g ? (i.value = Re(g, t), c.value = v(g)) : (i.value = null, c.value = null);
  }, w = (u, g) => {
    const $ = u !== void 0 ? u : i.value, H = g !== void 0 ? g : c.value, L = p($, H);
    return s.value = L, L;
  }, M = (u) => {
    if (!u) {
      s.value = null, i.value = null, c.value = null;
      return;
    }
    if (e && o && (u.hour === void 0 || u.hour === null) && !c.value) {
      const g = o.split(":").map(Number), $ = g[0] || 0, H = g[1] || 0, L = g[2] || 0, _ = He(
        u.year,
        u.month,
        u.day,
        $,
        H,
        L
      );
      s.value = _, c.value = o;
    } else
      s.value = u, c.value = v(u);
    s.value && (i.value = Re(s.value));
  }, h = (u) => {
    if (!s.value) return null;
    const g = u.split(":").map(Number), $ = {
      ...s.value,
      hour: g[0] || 0,
      minute: g[1] || 0,
      second: g[2] || 0
    };
    return s.value = $, c.value = u, $;
  }, f = (u) => {
    const g = u !== void 0 ? u : s.value, $ = e ? `${t} ${a}` : t;
    return zt(g, n, $);
  }, d = () => {
    s.value = null, i.value = null, c.value = null;
  }, b = computed(() => !!(i.value || c.value || s.value)), y = () => e && !c.value && o ? (c.value = o, true) : false, x = computed(() => !!i.value), S = computed(() => !!c.value), T = computed(() => e ? x.value && S.value : x.value);
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
    applyDefaultTime: y,
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
    let b = h.height + 5, y = 0;
    const x = f.getBoundingClientRect();
    h.left + x.width > d.width && (y = d.width - h.left - x.width - 10), h.bottom + x.height > d.height && (b = -x.height - 5), f.style.position = "absolute", f.style.top = `${b}px`, f.style.left = `${y}px`, f.style.zIndex = "50";
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
function os(r = {}) {
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
    useStrictISO: i = false,
    customDefaultTime: c,
    enableSeconds: v = true,
    autoFocusTimeAfterDate: p = true,
    minDate: m,
    maxDate: w
    // locale = 'zh-TW'
  } = r, { containerRef: M, calendarRef: h, dateInputRef: f, timeInputRef: d } = e, b = computed(() => {
    var A;
    return ((A = r.calendar) == null ? void 0 : A.value) || "gregory";
  }), y = computed(() => {
    var A;
    return ((A = r.locale) == null ? void 0 : A.value) || "zh-TW";
  }), x = computed(() => {
    var A;
    return ((A = r.outputType) == null ? void 0 : A.value) || "iso";
  }), S = ref(o), T = ha({
    required: n,
    showTime: a,
    minDate: m,
    maxDate: w,
    dateFormat: l
  }), u = va({
    showTime: a,
    dateFormat: l,
    timeFormat: s,
    outputType: x.value,
    defaultTime: c,
    enableSeconds: v
  }), g = ma(
    { dateInputRef: f, timeInputRef: d },
    { showTime: a, autoFocusTimeAfterDate: p }
  ), $ = qr(
    M,
    h,
    {
      disabled: S,
      onOutsideClick: () => {
      }
    }
  ), H = os({
    customDefaultTime: c,
    enableSeconds: v
  }), L = computed(() => {
    const A = ye(m, y.value);
    return A || null;
  }), _ = computed(() => {
    const A = ye(w, y.value);
    return A || null;
  });
  let z = null, re = null, X = null;
  const I = (A) => {
    z = A.update || null, re = A.change || null, X = A.validation || null;
  }, R = async (A = u.internalDateTime.value) => {
    let K = null;
    if (A) {
      const ge = a ? `${l} ${s}` : l;
      K = zt(A, x.value, ge, a, b.value, y.value, i);
    }
    z == null || z(K), re == null || re(K);
    const ne = !T.hasErrors.value;
    X == null || X(ne, T.mergedErrors.value);
  };
  watch(() => t, (A) => {
    const K = ye(A, y.value, b.value);
    A && !K ? (T.handleDateValidation(false, { date: "無效的日期格式" }), u.setExternalValue(null)) : K && !T.validateDateRange(K) ? u.setExternalValue(null) : (T.clearFieldErrors("date"), T.clearFieldErrors("invalidInput"), u.setExternalValue(K));
  }, { immediate: true });
  const D = (A, K, ne = {}) => {
    T.handleDateValidation(A, K, "date", ne), X == null || X(!T.hasErrors.value, T.mergedErrors.value);
  }, U = (A, K, ne = {}) => {
    T.handleTimeValidation(A, K, "time", ne), X == null || X(!T.hasErrors.value, T.mergedErrors.value);
  }, P = async (A) => {
    u.inputDateValue.value = A;
    const K = u.updateFromInputs();
    if (!K) {
      T.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    T.validateDateRange(K) && (await R(K), ["date", "year", "month", "day"].forEach((ne) => {
      T.clearFieldErrors(ne);
    }), g.autoFocusTimeAfterDateComplete(
      u,
      c ? H.getValidDefaultTime.value : void 0
    ));
  }, te = async (A) => {
    u.inputTimeValue.value = A;
    const K = u.updateFromInputs();
    await R(K), ["time", "hour", "minute", "second"].forEach((ne) => {
      T.clearFieldErrors(ne);
    });
  }, ce = async (A, K = true) => {
    try {
      if (!T.validateDateRange(A))
        return;
      u.setInternalDateTime(A), await R(u.internalDateTime.value), ["date", "year", "month", "day"].forEach((ne) => {
        T.clearFieldErrors(ne);
      }), K && $.hideCalendar();
    } catch (ne) {
      console.error("處理日曆選擇失敗:", ne);
    }
  }, le = async (A) => {
    const K = u.updateTimeOnly(A);
    K && await R(K), ["time", "hour", "minute", "second"].forEach((ne) => {
      T.clearFieldErrors(ne);
    });
  }, Y = (A) => {
    $.handleContainerClick(A, () => {
      g.focusFirstInput();
    }), $.toggleCalendar();
  }, k = () => {
    u.clearValues(), T.clearAllErrors(), R(null);
  }, N = async () => {
    var ae, $e;
    const A = await ((ae = f.value) == null ? void 0 : ae.validate()), K = a ? await (($e = d.value) == null ? void 0 : $e.validate()) : true;
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
    const ge = T.validateDateTime(
      u.inputDateValue.value,
      u.inputTimeValue.value
    ), V = A && K && ne && ge;
    return X == null || X(V, T.mergedErrors.value), V;
  }, ee = async () => {
    const A = /* @__PURE__ */ new Date(), K = {
      year: A.getFullYear(),
      month: A.getMonth() + 1,
      day: A.getDate(),
      hour: A.getHours(),
      minute: A.getMinutes(),
      second: A.getSeconds()
    };
    try {
      u.setInternalDateTime(K), await R(K), ["date", "year", "month", "day", "time", "hour", "minute", "second"].forEach((ne) => {
        T.clearFieldErrors(ne);
      });
    } catch (ne) {
      console.warn("設置當前時間失敗:", ne);
      const ge = `${K.year}-${K.month.toString().padStart(2, "0")}-${K.day.toString().padStart(2, "0")}`, V = a ? `${(K.hour || 0).toString().padStart(2, "0")}:${(K.minute || 0).toString().padStart(2, "0")}:${(K.second || 0).toString().padStart(2, "0")}` : null;
      u.inputDateValue.value = ge, a && V && (u.inputTimeValue.value = V);
      const ae = u.updateFromInputs();
      await R(ae);
    }
  }, J = () => {
    g.focusFirstInput();
  };
  return {
    // 狀態
    isDisabled: S,
    // 日曆系統相關
    calendar: b,
    // 從各個 composables 暴露的狀態
    ...T,
    ...u,
    ...$,
    // 計算屬性
    calendarMinDate: L,
    calendarMaxDate: _,
    // 預設時間相關
    getValidDefaultTime: H.getValidDefaultTime,
    // 事件處理方法
    setEmitters: I,
    validateDateInput: D,
    validateTimeInput: U,
    handleDateComplete: P,
    handleTimeComplete: te,
    handleCalendarSelect: ce,
    handleTimeSelect: le,
    handleContainerClick: Y,
    handleContainerMouseDown: $.handleContainerMouseDown,
    // 導航方法
    handleNavigateToDate: g.handleNavigateToDate,
    handleNavigateToTime: g.handleNavigateToTime,
    // 主要操作方法
    reset: k,
    validate: N,
    selectNow: ee,
    focus: J,
    // 直接暴露導航方法（用於 defineExpose）
    focusFirstInput: g.focusFirstInput,
    focusLastInput: g.focusLastInput
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
  const { r: e, g: t, b: a } = r, n = e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4), o = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), l = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), s = 0.4124 * n + 0.3576 * o + 0.1805 * l, i = 0.2126 * n + 0.7152 * o + 0.0722 * l, c = 0.0193 * n + 0.1192 * o + 0.9505 * l, v = 0.95047, p = 1, m = 1.08883, w = s > 8856e-6 ? Math.pow(s / v, 1 / 3) : 7.787 * s / v + 16 / 116, M = i > 8856e-6 ? Math.pow(i / p, 1 / 3) : 7.787 * i / p + 16 / 116, h = c > 8856e-6 ? Math.pow(c / m, 1 / 3) : 7.787 * c / m + 16 / 116, f = 116 * M - 16, d = 500 * (w - M), b = 200 * (M - h);
  return { l: f, a: d, b };
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
      const i = l[s];
      if (!i) continue;
      const c = nr(i);
      if (!c) continue;
      const v = ds(t, c);
      v < n && (n = v, a = o);
    }
  return a;
}
function ps(r) {
  return Ta[r] || {};
}
var ys = class {
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
    Object.keys(t).forEach((p) => {
      const m = `--color-vdt-theme-${p}`;
      a[m] = e.style.getPropertyValue(m), e.style.removeProperty(m);
    });
    const o = getComputedStyle(e).getPropertyValue("--color-vdt-theme-500").trim();
    if (Object.entries(a).forEach(([p, m]) => {
      m && e.style.setProperty(p, m);
    }), !o) return false;
    const l = "oklch(60.6% 0.25 292.717)", s = t[500], i = this.isOklchEqual(o, l), c = this.isOklchEqual(o, s);
    return !i && !c;
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
var Fe = new ys();
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
  }), p = computed(() => e.value ? Fe.getThemeClasses(e.value) : {}), m = computed(() => e.value ? Fe.getContainerAttributes(e.value) : {}), w = (d) => {
    e.value && Fe.setColor(e.value, d);
  }, M = (d) => {
    e.value && Fe.setMode(e.value, d);
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
    await nextTick(), t.value = Fe.getState(e.value), a = Fe.addListener(e.value, (d) => {
      t.value = d;
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
var gs = { key: 0 };
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
    const a = r, { setLocale: n, getPlaceholderMessage: o } = Dt(a.locale), l = t, s = useSlots(), i = computed(() => {
      const E = {};
      return ["no-years-display", "month-selector"].forEach((Z) => {
        s[Z] && (E[Z] = s[Z]);
      }), Object.keys(s).forEach((Z) => {
        Z.startsWith("year-") && (E[Z] = s[Z]);
      }), E;
    }), c = ref(null), v = ref(null), p = ref(null), m = ref(null), w = ref(a.dateFormat), M = ref(a.timeFormat), h = ref({}), f = ls(
      {
        modelValue: a.modelValue,
        showTime: a.showTime,
        required: a.required,
        disabled: a.disabled,
        calendar: toRef(a, "calendar"),
        dateFormat: w.value,
        timeFormat: M.value,
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
        calendarRef: v,
        dateInputRef: p,
        timeInputRef: m
      }
    );
    f.setEmitters({
      update: (E) => l("update:modelValue", E),
      change: (E) => l("change", E),
      validation: (E, Z) => l("validation", E, Z)
    });
    const {
      themeClasses: d,
      containerAttributes: b,
      setColor: y,
      setMode: x,
      currentMode: S,
      isDark: T,
      isLight: u
    } = zr(), g = computed(() => {
      const E = ye(a.minDate, a.locale);
      return Re(E);
    }), $ = computed(() => {
      const E = ye(a.maxDate, a.locale);
      return Re(E);
    }), H = computed(() => w.value), L = computed(() => a.calendar === "gregory"), _ = computed(() => !!(R.value && R.value.trim())), z = computed(() => {
      var Z, ie, Q, pe, Ae, bt, Mt;
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
        hour: ((ie = a.placeholderOverrides) == null ? void 0 : ie.hour) || E.hour,
        minute: ((Q = a.placeholderOverrides) == null ? void 0 : Q.minute) || E.minute,
        second: ((pe = a.placeholderOverrides) == null ? void 0 : pe.second) || E.second,
        // 日期相關
        year: ((Ae = a.placeholderOverrides) == null ? void 0 : Ae.year) || E.year,
        month: ((bt = a.placeholderOverrides) == null ? void 0 : bt.month) || E.month,
        day: ((Mt = a.placeholderOverrides) == null ? void 0 : Mt.day) || E.day
      };
    }), re = computed(() => ({
      ...f.mergedErrors.value,
      ...h.value
    })), X = computed(() => {
      var E;
      return {
        ...((E = f.mergedErrorParams) == null ? void 0 : E.value) || {}
        // 格式錯誤通常不需要參數，但可以擴展
      };
    }), I = computed(() => Object.keys(re.value).length > 0);
    onBeforeMount(() => {
      if (!Ir(a.dateFormat) && a.calendar === "gregory") {
        const E = a.dateFormat, Z = xo(a.dateFormat);
        h.value.dateFormat = "format.invalid", console.warn(`日期格式 "${E}" 不正確，已自動修復為 "${Z}"`), w.value = Z;
      }
      if (a.showTime && !Or(a.timeFormat)) {
        const E = a.timeFormat, Z = Yo(a.timeFormat);
        h.value.timeFormat = "format.invalid", console.warn(`時間格式 "${E}" 不正確，已自動修復為 "${Z}"`), M.value = Z;
      }
    }), watch(() => a.theme, (E) => {
      E && y(E);
    }, { immediate: true }), watch(() => a.mode, (E) => {
      x(E);
    }, { immediate: true }), watch(() => a.locale, (E) => {
      E && n(E);
    }, { immediate: true }), watch(() => a.calendar, (E) => {
      me.isCalendarSupported(E) ? delete h.value.calendar : h.value.calendar = "calendar.unsupported";
    }, { immediate: true }), e({
      // 基本操作
      focus: f.focus,
      reset: f.reset,
      validate: f.validate,
      selectNow: f.selectNow,
      // 數據獲取
      getDateTime: () => f.internalDateTime.value,
      setDateTime: (E) => {
        f.setExternalValue(E);
      },
      // 主題控制
      setTheme: y,
      setDarkMode: () => x("dark"),
      setLightMode: () => x("light"),
      setAutoMode: () => x("auto"),
      getCurrentMode: () => S.value,
      isDarkMode: () => T.value,
      isLightMode: () => u.value,
      // 錯誤相關
      getErrors: () => re.value,
      hasErrors: () => I.value
    });
    const {
      // 狀態
      inputDateValue: R,
      inputTimeValue: D,
      showCalendar: U,
      internalDateTime: P,
      calendarMinDate: te,
      calendarMaxDate: ce,
      getValidDefaultTime: le,
      hasValue: Y,
      // 事件處理
      validateDateInput: k,
      validateTimeInput: N,
      handleDateComplete: ee,
      handleTimeComplete: J,
      handleCalendarSelect: A,
      handleTimeSelect: K,
      handleContainerClick: ne,
      handleContainerMouseDown: ge,
      handleNavigateToDate: V,
      // 日曆控制
      toggleCalendar: ae,
      // 清除功能
      reset: $e
    } = f;
    return (E, Z) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", mergeProps({
        class: ["date-picker-wrapper relative w-full", [unref(d), E.showTime ? "min-w-[300px]" : "min-w-[150px]"]]
      }, unref(b), {
        ref_key: "containerRef",
        ref: c
      }), [
        createBaseVNode("div", {
          class: normalizeClass(["date-picker-container flex w-full items-center px-2 py-1 bg-vdt-surface text-vdt-content rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": I.value }]])
        }, [
          L.value && E.inputEnabled ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["flex w-full items-center justify-start gap-2", [E.disabled ? "cursor-not-allowed cursor-event-none opacity-50" : ""]]),
            onClick: Z[2] || (Z[2] = withModifiers(
              //@ts-ignore
              (...ie) => unref(ne) && unref(ne)(...ie),
              ["stop"]
            )),
            onMousedown: Z[3] || (Z[3] = //@ts-ignore
            (...ie) => unref(ge) && unref(ge)(...ie))
          }, [
            createBaseVNode("div", null, [
              createVNode(ca, {
                ref_key: "dateInputRef",
                ref: p,
                modelValue: unref(R),
                "onUpdate:modelValue": Z[0] || (Z[0] = (ie) => isRef(R) ? R.value = ie : null),
                "year-placeholder": z.value.year,
                "month-placeholder": z.value.month,
                "day-placeholder": z.value.day,
                "min-date": g.value,
                "max-date": $.value,
                required: E.required,
                separator: E.dateSeparator,
                "date-format": H.value,
                onValidation: unref(k),
                onComplete: unref(ee)
              }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "required", "separator", "date-format", "onValidation", "onComplete"])
            ]),
            E.showTime ? (openBlock(), createElementBlock("div", gs, [
              createVNode(da, {
                ref_key: "timeInputRef",
                ref: m,
                modelValue: unref(D),
                "onUpdate:modelValue": Z[1] || (Z[1] = (ie) => isRef(D) ? D.value = ie : null),
                "hour-placeholder": z.value.hour,
                "minute-placeholder": z.value.minute,
                "second-placeholder": z.value.second,
                "enable-seconds": E.enableSeconds,
                use24Hour: E.use24Hour,
                required: E.required,
                locale: E.locale,
                useLocalizedPeriod: E.useLocalizedPeriod,
                onValidation: unref(N),
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
            onClick: Z[4] || (Z[4] = withModifiers((ie) => {
              var Q;
              return !E.disabled && ((Q = unref(ae)) == null ? void 0 : Q());
            }, ["stop"])),
            onKeydown: [
              Z[5] || (Z[5] = withKeys(withModifiers((ie) => {
                var Q;
                return !E.disabled && ((Q = unref(ae)) == null ? void 0 : Q());
              }, ["prevent"]), ["enter"])),
              Z[6] || (Z[6] = withKeys(withModifiers((ie) => {
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
              class: normalizeClass(["date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed", { "group-hover:opacity-0": unref(Y) && !E.disabled && E.showClearButton }]),
              disabled: E.disabled,
              "aria-label": "開啟日曆",
              onClick: Z[7] || (Z[7] = withModifiers((ie) => {
                var Q;
                return (Q = unref(ae)) == null ? void 0 : Q();
              }, ["stop", "prevent"]))
            }, [
              createVNode(Pr, { class: "h-5 w-5" })
            ], 10, bs),
            unref(Y) && !E.disabled && E.showClearButton ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100",
              "aria-label": "清除日期",
              onClick: Z[8] || (Z[8] = withModifiers(
                //@ts-ignore
                (...ie) => unref($e) && unref($e)(...ie),
                ["stop", "prevent"]
              ))
            }, [
              createVNode(Hr, { class: "h-4 w-4" })
            ])) : createCommentVNode("", true)
          ], 2)
        ], 2),
        unref(U) && !E.disabled ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref_key: "calendarRef",
          ref: v,
          class: "calendar-container absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10",
          onClick: Z[9] || (Z[9] = withModifiers(() => {
          }, ["stop"])),
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "date-picker"
        }, [
          createVNode(fa, {
            value: unref(P),
            weekStartsOn: E.weekStartsOn,
            "min-date": unref(te),
            "max-date": unref(ce),
            showTimeSelector: E.showTime,
            "time-value": unref(D),
            use24Hour: E.use24Hour,
            "default-time": unref(le),
            enableSeconds: E.enableSeconds,
            locale: E.locale,
            calendar: E.calendar,
            onSelect: unref(A),
            onTimeSelect: unref(K)
          }, createSlots({ _: 2 }, [
            renderList(i.value, (ie, Q) => ({
              name: Q,
              fn: withCtx((pe) => [
                renderSlot(E.$slots, Q, normalizeProps(guardReactiveProps(pe)))
              ])
            }))
          ]), 1032, ["value", "weekStartsOn", "min-date", "max-date", "showTimeSelector", "time-value", "use24Hour", "default-time", "enableSeconds", "locale", "calendar", "onSelect", "onTimeSelect"])
        ], 512)) : createCommentVNode("", true)
      ], 16),
      E.showErrorMessage && I.value ? (openBlock(), createElementBlock("div", Ms, [
        renderSlot(E.$slots, "error", {
          errors: re.value,
          hasErrors: I.value
        }, () => [
          createVNode(Ar, {
            errors: re.value,
            locale: E.locale,
            "use-i18n": E.useI18n,
            "custom-messages": E.customErrorMessages,
            errorParams: X.value
          }, createSlots({ _: 2 }, [
            renderList(E.$slots, (ie, Q) => ({
              name: Q,
              fn: withCtx((pe) => [
                renderSlot(E.$slots, Q, normalizeProps(guardReactiveProps(pe)))
              ])
            }))
          ]), 1032, ["errors", "locale", "use-i18n", "custom-messages", "errorParams"])
        ])
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Ss = { class: "dual-month-calendar flex flex-col gap-4 min-w-auto md:min-w-[570px] md:flex-row m-1" };
var ws = { class: "calendar-container flex-1 min-w-auto md:min-w-[275px]" };
var ks = { class: "calendar-container flex-1 md:min-w-[275px] min-w-auto" };
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
        const y = m.value.tempStart;
        if (y && (d.year !== y.year || d.month !== y.month || d.day !== y.day)) {
          m.value.isSelecting = false, m.value.tempStart = null;
          const x = y.year * 1e4 + y.month * 100 + y.day, S = d.year * 1e4 + d.month * 100 + d.day;
          x <= S ? n("range-select", y, d) : n("range-select", d, y);
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
    }), (d, b) => (openBlock(), createElementBlock("div", Ss, [
      createBaseVNode("div", ws, [
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
          onTimeSelect: b[0] || (b[0] = (y) => M(y, "start"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour", "default-time"])
      ]),
      createBaseVNode("div", ks, [
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
          onTimeSelect: b[1] || (b[1] = (y) => M(y, "end"))
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
    calendarRef: y,
    startDateInputRef: x,
    endDateInputRef: S,
    startTimeInputRef: T,
    endTimeInputRef: u
  } = e, g = ref(l);
  let $ = {};
  const H = ha({
    required: o,
    showTime: n,
    minDate: w,
    maxDate: M,
    dateFormat: i
  }), L = ha({
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
    defaultTime: xt,
    enableSeconds: m
  }), z = va({
    showTime: n,
    dateFormat: i,
    timeFormat: c,
    outputType: v,
    defaultTime: Yt,
    enableSeconds: m
  }), re = qr(
    b,
    y,
    { disabled: g }
  ), X = ma(
    { dateInputRef: x, timeInputRef: T },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), I = ma(
    { dateInputRef: S, timeInputRef: u },
    { showTime: n, autoFocusTimeAfterDate: true }
  ), R = computed(
    () => _.hasValue.value || z.hasValue.value
  ), D = computed(() => {
    const O = {
      ...H.mergedErrors.value,
      ...L.mergedErrors.value
    };
    return _.internalDateTime.value && !z.internalDateTime.value && s && (O["range.endRequired"] = "range.endRequired"), O;
  }), U = computed(() => ({
    ...H.mergedErrorParams.value,
    ...L.mergedErrorParams.value
  })), P = computed(() => Object.keys(D.value).length > 0), te = computed(() => {
    const O = _.internalDateTime.value, G = z.internalDateTime.value;
    if (!O || !G || Wt(O, G) > 0) return false;
    if (h || f) {
      const oe = ar(O, G);
      if (h && oe > h)
        return L.handleDateValidation(false, {
          range: "range.exceedsMaxRange"
        }, "endDate", {
          range: { maxRange: h, actualDays: oe }
        }), false;
      if (f && oe < f)
        return L.handleDateValidation(false, {
          range: "range.belowMinRange"
        }, "endDate", {
          range: { minRange: f, actualDays: oe }
        }), false;
      L.clearFieldErrors("range");
    }
    return !P.value;
  }), ce = computed(() => [
    {
      label: "今天",
      getValue: () => {
        const O = Ze();
        return {
          start: He(O.year, O.month, O.day, 0, 0, 0),
          end: He(O.year, O.month, O.day, 23, 59, 59)
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
      getValue: ko
    }
  ]), le = computed(() => ({
    minDate: ye(w, d),
    maxDate: z.internalDateTime.value || ye(M, d)
  })), Y = computed(() => ({
    minDate: _.internalDateTime.value || ye(w, d),
    maxDate: ye(M, d)
  })), k = computed(() => ({
    minDate: le.value.minDate ? Re(le.value.minDate, i) : null,
    maxDate: le.value.maxDate ? Re(le.value.maxDate, i) : null
  })), N = computed(() => ({
    minDate: Y.value.minDate ? Re(Y.value.minDate, i) : null,
    maxDate: Y.value.maxDate ? Re(Y.value.maxDate, i) : null
  }));
  function ee(O, G) {
    const oe = ar(O, G);
    return h && oe > h ? {
      valid: false,
      error: "range.exceedsMaxRange",
      params: { maxRange: h, actualDays: oe }
    } : f && oe < f ? {
      valid: false,
      error: "range.belowMinRange",
      params: { minRange: f, actualDays: oe }
    } : { valid: true };
  }
  function J(O) {
    !O.error || !O.params || L.handleDateValidation(
      false,
      { range: O.error },
      "endDate",
      { range: O.params }
    );
  }
  function A() {
    var ke, St, st, xa, Ya;
    if (!_.internalDateTime.value || !z.internalDateTime.value) {
      (ke = $.update) == null || ke.call($, null), (St = $.change) == null || St.call($, null);
      return;
    }
    const O = n ? `${i} ${c}` : i, G = {
      start: zt(
        _.internalDateTime.value,
        v,
        O,
        n,
        t,
        d,
        p
      ),
      end: zt(
        z.internalDateTime.value,
        v,
        O,
        n,
        t,
        d,
        p
      )
    };
    (st = $.update) == null || st.call($, G), (xa = $.change) == null || xa.call($, G);
    const oe = te.value && !P.value;
    (Ya = $.validation) == null || Ya.call($, oe, D.value);
  }
  function K(O, G) {
    G.forEach((oe) => O.clearFieldErrors(oe));
  }
  const ne = (O) => {
    $ = O;
  }, ge = (O, G, oe, ke, St) => {
    var st;
    oe.handleDateValidation(O, G, ke, St), (st = $.validation) == null || st.call($, !P.value, D.value);
  }, V = (O, G, oe) => {
    ge(O, G, H, "startDate", oe);
  }, ae = (O, G, oe) => {
    ge(O, G, L, "endDate", oe);
  }, $e = (O, G, oe = {}) => {
    var ke;
    H.handleTimeValidation(O, G, "startTime", oe), (ke = $.validation) == null || ke.call($, !P.value, D.value);
  }, E = (O, G, oe = {}) => {
    var ke;
    L.handleTimeValidation(O, G, "endTime", oe), (ke = $.validation) == null || ke.call($, !P.value, D.value);
  }, Z = (O) => {
    _.inputDateValue.value = O;
    const G = _.updateFromInputs();
    if (!G) {
      H.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    H.validateDateRange(G) && (X.autoFocusTimeAfterDateComplete(
      _,
      xt
    ), A(), K(H, ["startDate", "date.year", "date.month", "date.day"]), n || I.focusFirstInput());
  }, ie = (O) => {
    z.inputDateValue.value = O;
    const G = z.updateFromInputs();
    if (!G) {
      L.handleDateValidation(false, { date: "date.invalid" });
      return;
    }
    L.validateDateRange(G) && (I.autoFocusTimeAfterDateComplete(
      z,
      Yt
    ), A(), K(L, ["endDate", "date.year", "date.month", "date.day"]));
  }, Q = (O) => {
    _.inputTimeValue.value = O, _.updateFromInputs() && A(), K(H, ["startTime", "time.hour", "time.minute", "time.second"]);
  }, pe = (O) => {
    z.inputTimeValue.value = O, z.updateFromInputs() && A(), K(L, ["endTime", "time.hour", "time.minute", "time.second"]);
  }, Ae = (O, G) => {
    O && !G ? bt(O) : O && G ? Mt(O, G) : _t(), A();
  };
  function bt(O) {
    H.validateDateRange(O) && (_.setInternalDateTime(O), K(H, ["startDate", "date.year", "date.month", "date.day"]), z.clearValues());
  }
  function Mt(O, G) {
    if (!(!H.validateDateRange(O) || !L.validateDateRange(G))) {
      if (h || f) {
        const oe = ee(O, G);
        if (!oe.valid) {
          J(oe);
          return;
        }
      }
      _.setInternalDateTime(O), z.setInternalDateTime(G), n && (_.inputTimeValue.value || (_.inputTimeValue.value = xt, _.updateFromInputs()), z.inputTimeValue.value || (z.inputTimeValue.value = Yt, z.updateFromInputs())), K(H, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]), K(L, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]);
    }
  }
  const Wr = (O, G) => {
    G === "start" && _.internalDateTime.value && Q(O), G === "end" && z.internalDateTime.value && pe(O);
  }, jr = (O) => {
    const G = O.getValue();
    _.setInternalDateTime(G.start), z.setInternalDateTime(G.end), n && (_.inputTimeValue.value || (_.inputTimeValue.value = xt, _.updateFromInputs()), z.inputTimeValue.value || (z.inputTimeValue.value = Yt, z.updateFromInputs())), A();
  }, _t = () => {
    _.clearValues(), z.clearValues(), H.clearAllErrors(), L.clearAllErrors(), A();
  }, Jr = (O) => {
    O ? (_.setExternalValue(O.start), z.setExternalValue(O.end)) : _t(), A();
  }, _r = () => {
    var O, G, oe, ke;
    return (O = x.value) == null || O.validate(), (G = S.value) == null || G.validate(), n && ((oe = T.value) == null || oe.validate(), (ke = u.value) == null || ke.validate()), te.value;
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
      const G = O.start ? ye(O.start, d, t) : null, oe = O.end ? ye(O.end, d, t) : null;
      if (O.start && !G && (console.warn(`Invalid start date provided: ${O.start}`), H.handleDateValidation(false, { date: "date.invalid" }, "startDate")), O.end && !oe && (console.warn(`Invalid end date provided: ${O.end}`), L.handleDateValidation(false, { date: "date.invalid" }, "endDate")), G && oe && Wt(G, oe) > 0) {
        console.warn("Initial date range has start > end, auto-swapping values"), _.setExternalValue(O.end), z.setExternalValue(O.start), setTimeout(() => {
          A();
        }, 0);
        return;
      }
      _.setExternalValue(G ? O.start : null), z.setExternalValue(oe ? O.end : null);
    } else
      _.clearValues(), z.clearValues();
  }, { immediate: true }), {
    // 狀態
    isDisabled: g,
    startDateConstraints: le,
    endDateConstraints: Y,
    startDateConstraintsStr: k,
    endDateConstraintsStr: N,
    // 驗證相關
    hasErrors: P,
    mergedErrors: D,
    mergedErrorParams: U,
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
    handleStartTimeValidation: $e,
    handleEndTimeValidation: E,
    // 完成事件處理
    handleStartDateComplete: Z,
    handleEndDateComplete: ie,
    handleStartTimeComplete: Q,
    handleEndTimeComplete: pe,
    // 日曆事件處理
    handleCalendarRangeSelect: Ae,
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
var As = ["disabled"];
var Ps = ["title"];
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
    const a = r, n = t, o = ref(null), l = ref(null), s = ref(null), i = ref(null), c = ref(null), v = ref(null), p = ref({}), m = xs(
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
    } = zr(), y = computed(() => {
      var ae, $e, E, Z, ie, Q, pe, Ae;
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
        end: (($e = a.placeholderOverrides) == null ? void 0 : $e.end) || V.end,
        // 時間相關
        hour: ((E = a.placeholderOverrides) == null ? void 0 : E.hour) || V.hour,
        minute: ((Z = a.placeholderOverrides) == null ? void 0 : Z.minute) || V.minute,
        second: ((ie = a.placeholderOverrides) == null ? void 0 : ie.second) || V.second,
        // 日期相關
        year: ((Q = a.placeholderOverrides) == null ? void 0 : Q.year) || V.year,
        month: ((pe = a.placeholderOverrides) == null ? void 0 : pe.month) || V.month,
        day: ((Ae = a.placeholderOverrides) == null ? void 0 : Ae.day) || V.day
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
    }, { immediate: true }), watch(() => a.calendar, (V) => {
      me.isCalendarSupported(V) ? delete p.value.calendar : p.value.calendar = "calendar.unsupported";
    }, { immediate: true }), onBeforeMount(() => {
      w(a.locale);
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
      startDateConstraintsStr: g,
      endDateConstraintsStr: $,
      shortcuts: H,
      startDateTime: L,
      endDateTime: _,
      hasRangeValue: z,
      mergedErrors: re,
      mergedErrorParams: X,
      // 事件處理方法
      handleStartDateValidation: I,
      handleEndDateValidation: R,
      handleStartTimeValidation: D,
      handleEndTimeValidation: U,
      handleStartDateComplete: P,
      handleEndDateComplete: te,
      handleStartTimeComplete: ce,
      handleEndTimeComplete: le,
      handleCalendarRangeSelect: Y,
      handleStartNavigateToDate: k,
      handleEndNavigateToDate: N,
      handleTimeSelect: ee,
      // 操作方法
      toggleCalendar: J,
      applyShortcut: A,
      clearRange: K,
      focusStartDate: ne,
      focusEndDate: ge
    } = m;
    return (V, ae) => {
      var $e, E, Z, ie;
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
              (...Q) => unref(J) && unref(J)(...Q)),
              "aria-label": "選擇日期範圍"
            }, [
              createBaseVNode("div", Cs, [
                ($e = V.modelValue) != null && $e.start ? (openBlock(), createElementBlock("span", Rs, toDisplayString((E = V.modelValue) == null ? void 0 : E.start), 1)) : (openBlock(), createElementBlock("span", Es, toDisplayString(y.value.start), 1))
              ]),
              createBaseVNode("div", Is, toDisplayString(V.separator), 1),
              createBaseVNode("div", Os, [
                (Z = V.modelValue) != null && Z.end ? (openBlock(), createElementBlock("span", Vs, toDisplayString((ie = V.modelValue) == null ? void 0 : ie.end), 1)) : (openBlock(), createElementBlock("span", Fs, toDisplayString(y.value.end), 1))
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
                  var pe;
                  return (pe = unref(J)) == null ? void 0 : pe();
                }, ["stop", "prevent"]))
              }, [
                createVNode(Pr, { class: "h-5 w-5" })
              ], 10, As),
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
              ], 8, Ps)) : createCommentVNode("", true)
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
                    modelValue: unref(L).inputDateValue.value,
                    "onUpdate:modelValue": ae[3] || (ae[3] = (Q) => unref(L).inputDateValue.value = Q),
                    "year-placeholder": y.value.year,
                    "month-placeholder": y.value.month,
                    "day-placeholder": y.value.day,
                    "max-date": unref(g).maxDate,
                    "min-date": unref(g).minDate,
                    "date-format": x.value,
                    onValidation: unref(I),
                    onComplete: unref(P)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "max-date", "min-date", "date-format", "onValidation", "onComplete"]),
                  V.showTime ? (openBlock(), createElementBlock("div", Hs, [
                    createVNode(da, {
                      ref_key: "startTimeInputRef",
                      ref: c,
                      modelValue: unref(L).inputTimeValue.value,
                      "onUpdate:modelValue": ae[4] || (ae[4] = (Q) => unref(L).inputTimeValue.value = Q),
                      "hour-placeholder": y.value.hour,
                      "minute-placeholder": y.value.minute,
                      "second-placeholder": y.value.second,
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
                    (...Q) => unref(ge) && unref(ge)(...Q),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center gap-2 px-2 py-1 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  createVNode(ca, {
                    ref_key: "endDateInputRef",
                    ref: i,
                    modelValue: unref(_).inputDateValue.value,
                    "onUpdate:modelValue": ae[6] || (ae[6] = (Q) => unref(_).inputDateValue.value = Q),
                    "year-placeholder": y.value.year,
                    "month-placeholder": y.value.month,
                    "day-placeholder": y.value.day,
                    "min-date": unref($).minDate,
                    "max-date": unref($).maxDate,
                    "date-format": x.value,
                    onValidation: unref(R),
                    onComplete: unref(te)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "date-format", "onValidation", "onComplete"]),
                  V.showTime ? (openBlock(), createElementBlock("div", qs, [
                    createVNode(da, {
                      ref_key: "endTimeInputRef",
                      ref: v,
                      modelValue: unref(_).inputTimeValue.value,
                      "onUpdate:modelValue": ae[7] || (ae[7] = (Q) => unref(_).inputTimeValue.value = Q),
                      "hour-placeholder": y.value.hour,
                      "minute-placeholder": y.value.minute,
                      "second-placeholder": y.value.second,
                      "enable-seconds": V.enableSeconds,
                      use24Hour: V.use24Hour,
                      locale: V.locale,
                      onValidation: unref(U),
                      onComplete: unref(le),
                      onNavigateToDate: unref(N)
                    }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              unref(H).length > 0 && V.showShortcuts ? (openBlock(), createElementBlock("div", Ns, [
                createBaseVNode("div", Us, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(H), (Q) => (openBlock(), createElementBlock("button", {
                    key: Q.label,
                    type: "button",
                    "aria-label": `選擇${Q.label}範圍`,
                    "data-testid": `shortcut-${Q.label.toLowerCase().replace(/\s+/g, "-")}`,
                    class: "px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors",
                    onClick: (pe) => unref(A)(Q)
                  }, toDisplayString(Q.label), 9, zs))), 128)),
                  renderSlot(V.$slots, "shortcuts", {
                    applyShortcut: unref(A),
                    shortcuts: unref(H),
                    currentRange: V.modelValue
                  })
                ])
              ])) : V.$slots.shortcuts && V.showShortcuts ? (openBlock(), createElementBlock("div", Ws, [
                createBaseVNode("div", js, [
                  renderSlot(V.$slots, "shortcuts", {
                    applyShortcut: unref(A),
                    shortcuts: unref(H),
                    currentRange: V.modelValue
                  })
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", Js, [
                createVNode(Ts, {
                  showTimeSelector: V.showTime,
                  calendar: V.calendar,
                  "range-start": unref(L).internalDateTime.value,
                  "range-end": unref(_).internalDateTime.value,
                  enableSeconds: V.enableSeconds,
                  use24Hour: V.use24Hour,
                  locale: V.locale,
                  "week-starts-on": V.weekStartsOn,
                  "start-time-value": unref(L).inputTimeValue.value,
                  "end-time-value": unref(_).inputTimeValue.value,
                  "min-date": unref(ye)(V.minDate),
                  "max-date": unref(ye)(V.maxDate),
                  onRangeSelect: unref(Y),
                  onTimeSelect: unref(ee)
                }, null, 8, ["showTimeSelector", "calendar", "range-start", "range-end", "enableSeconds", "use24Hour", "locale", "week-starts-on", "start-time-value", "end-time-value", "min-date", "max-date", "onRangeSelect", "onTimeSelect"])
              ])
            ])
          ], 512)) : createCommentVNode("", true)
        ], 16),
        V.showErrorMessage && T.value ? (openBlock(), createElementBlock("div", _s, [
          renderSlot(V.$slots, "error", {
            errors: S.value,
            hasErrors: T.value
          }, () => [
            createVNode(Ar, {
              errors: unref(re),
              locale: V.locale,
              "use-i18n": V.useI18n,
              "custom-messages": V.customErrorMessages,
              errorParams: unref(X)
            }, createSlots({ _: 2 }, [
              renderList(V.$slots, (Q, pe) => ({
                name: pe,
                fn: withCtx((Ae) => [
                  renderSlot(V.$slots, pe, normalizeProps(guardReactiveProps(Ae)))
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
