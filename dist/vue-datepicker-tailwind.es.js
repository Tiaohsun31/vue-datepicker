var _r = Object.defineProperty;
var Kr = (r, e, t) => e in r ? _r(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var be = (r, e, t) => Kr(r, typeof e != "symbol" ? e + "" : e, t);
import { defineComponent as Re, ref as W, computed as E, watch as ye, createElementBlock as q, openBlock as L, Fragment as Se, renderList as Me, withDirectives as Oe, createCommentVNode as fe, vModelText as Je, toDisplayString as oe, nextTick as Te, createElementVNode as J, withModifiers as Ie, normalizeClass as Fe, renderSlot as $e, onMounted as Jt, onBeforeUnmount as $a, createVNode as me, createTextVNode as Ca, unref as O, withKeys as Pe, vModelSelect as Ct, createSlots as mt, withCtx as ht, normalizeProps as vt, guardReactiveProps as pt, isMemoSame as Qr, createBlock as na, useSlots as Zr, onBeforeMount as ir, mergeProps as ur, isRef as Ea } from "vue";
import ue from "dayjs";
const Ge = (r) => /^\d+$/.test(r), Ia = (r) => r % 4 === 0 && r % 100 !== 0 || r % 400 === 0;
let Ae = null;
function Gr() {
  return Ae || (Ae = document.createElement("span"), Ae.style.visibility = "hidden", Ae.style.position = "absolute", Ae.style.top = "-9999px", Ae.style.left = "-9999px", Ae.style.whiteSpace = "pre", document.body.appendChild(Ae)), Ae;
}
const oa = /* @__PURE__ */ new WeakMap();
function Xr(r, e = "") {
  const t = Gr(), a = getComputedStyle(r);
  return t.style.font = a.font, t.style.fontSize = a.fontSize, t.style.fontWeight = a.fontWeight, t.style.letterSpacing = a.letterSpacing, t.style.padding = a.padding, t.style.border = a.border, t.style.boxSizing = a.boxSizing, t.textContent = r.value || e || "", t.offsetWidth + 4;
}
function it(r) {
  const e = r.placeholder || "", t = Xr(r, e), a = oa.get(r) || 0;
  r.style.width = `${Math.max(t, a)}px`;
}
const Xe = {
  // 初始設置
  mounted(r, e) {
    e.value && typeof e.value == "number" && oa.set(r, e.value), it(r), r.addEventListener("input", () => it(r)), document.fonts && document.fonts.ready && document.fonts.ready.then(() => it(r));
  },
  // 處理更新
  updated(r, e) {
    e.value && typeof e.value == "number" && e.oldValue !== e.value && oa.set(r, e.value), it(r);
  },
  // 為 Vue 3 添加 beforeUnmount
  beforeUnmount(r) {
    r.removeEventListener("input", () => it(r));
  }
};
function yt(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Et = { exports: {} }, en = Et.exports, Oa;
function tn() {
  return Oa || (Oa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(en, function() {
      var t = "minute", a = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
      return function(o, l, s) {
        var i = l.prototype;
        s.utc = function(m) {
          var f = { date: m, utc: !0, args: arguments };
          return new l(f);
        }, i.utc = function(m) {
          var f = s(this.toDate(), { locale: this.$L, utc: !0 });
          return m ? f.add(this.utcOffset(), t) : f;
        }, i.local = function() {
          return s(this.toDate(), { locale: this.$L, utc: !1 });
        };
        var d = i.parse;
        i.parse = function(m) {
          m.utc && (this.$u = !0), this.$utils().u(m.$offset) || (this.$offset = m.$offset), d.call(this, m);
        };
        var p = i.init;
        i.init = function() {
          if (this.$u) {
            var m = this.$d;
            this.$y = m.getUTCFullYear(), this.$M = m.getUTCMonth(), this.$D = m.getUTCDate(), this.$W = m.getUTCDay(), this.$H = m.getUTCHours(), this.$m = m.getUTCMinutes(), this.$s = m.getUTCSeconds(), this.$ms = m.getUTCMilliseconds();
          } else p.call(this);
        };
        var g = i.utcOffset;
        i.utcOffset = function(m, f) {
          var c = this.$utils().u;
          if (c(m)) return this.$u ? 0 : c(this.$offset) ? g.call(this) : this.$offset;
          if (typeof m == "string" && (m = function(S) {
            S === void 0 && (S = "");
            var I = S.match(a);
            if (!I) return null;
            var u = ("" + I[0]).match(n) || ["-", 0, 0], h = u[0], y = 60 * +u[1] + +u[2];
            return y === 0 ? 0 : h === "+" ? y : -y;
          }(m), m === null)) return this;
          var D = Math.abs(m) <= 16 ? 60 * m : m, b = this;
          if (f) return b.$offset = D, b.$u = m === 0, b;
          if (m !== 0) {
            var Y = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            (b = this.local().add(D + Y, t)).$offset = D, b.$x.$localOffset = Y;
          } else b = this.utc();
          return b;
        };
        var v = i.format;
        i.format = function(m) {
          var f = m || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
          return v.call(this, f);
        }, i.valueOf = function() {
          var m = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
          return this.$d.valueOf() - 6e4 * m;
        }, i.isUTC = function() {
          return !!this.$u;
        }, i.toISOString = function() {
          return this.toDate().toISOString();
        }, i.toString = function() {
          return this.toDate().toUTCString();
        };
        var M = i.toDate;
        i.toDate = function(m) {
          return m === "s" && this.$offset ? s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : M.call(this);
        };
        var w = i.diff;
        i.diff = function(m, f, c) {
          if (m && this.$u === m.$u) return w.call(this, m, f, c);
          var D = this.local(), b = s(m).local();
          return w.call(D, b, f, c);
        };
      };
    });
  }(Et)), Et.exports;
}
var an = tn();
const rn = /* @__PURE__ */ yt(an);
var It = { exports: {} }, nn = It.exports, Fa;
function on() {
  return Fa || (Fa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(nn, function() {
      var t = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, a = {};
      return function(n, o, l) {
        var s, i = function(v, M, w) {
          w === void 0 && (w = {});
          var m = new Date(v), f = function(c, D) {
            D === void 0 && (D = {});
            var b = D.timeZoneName || "short", Y = c + "|" + b, S = a[Y];
            return S || (S = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: c, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: b }), a[Y] = S), S;
          }(M, w);
          return f.formatToParts(m);
        }, d = function(v, M) {
          for (var w = i(v, M), m = [], f = 0; f < w.length; f += 1) {
            var c = w[f], D = c.type, b = c.value, Y = t[D];
            Y >= 0 && (m[Y] = parseInt(b, 10));
          }
          var S = m[3], I = S === 24 ? 0 : S, u = m[0] + "-" + m[1] + "-" + m[2] + " " + I + ":" + m[4] + ":" + m[5] + ":000", h = +v;
          return (l.utc(u).valueOf() - (h -= h % 1e3)) / 6e4;
        }, p = o.prototype;
        p.tz = function(v, M) {
          v === void 0 && (v = s);
          var w, m = this.utcOffset(), f = this.toDate(), c = f.toLocaleString("en-US", { timeZone: v }), D = Math.round((f - new Date(c)) / 1e3 / 60), b = 15 * -Math.round(f.getTimezoneOffset() / 15) - D;
          if (!Number(b)) w = this.utcOffset(0, M);
          else if (w = l(c, { locale: this.$L }).$set("millisecond", this.$ms).utcOffset(b, !0), M) {
            var Y = w.utcOffset();
            w = w.add(m - Y, "minute");
          }
          return w.$x.$timezone = v, w;
        }, p.offsetName = function(v) {
          var M = this.$x.$timezone || l.tz.guess(), w = i(this.valueOf(), M, { timeZoneName: v }).find(function(m) {
            return m.type.toLowerCase() === "timezonename";
          });
          return w && w.value;
        };
        var g = p.startOf;
        p.startOf = function(v, M) {
          if (!this.$x || !this.$x.$timezone) return g.call(this, v, M);
          var w = l(this.format("YYYY-MM-DD HH:mm:ss:SSS"), { locale: this.$L });
          return g.call(w, v, M).tz(this.$x.$timezone, !0);
        }, l.tz = function(v, M, w) {
          var m = w && M, f = w || M || s, c = d(+l(), f);
          if (typeof v != "string") return l(v).tz(f);
          var D = function(I, u, h) {
            var y = I - 60 * u * 1e3, B = d(y, h);
            if (u === B) return [y, u];
            var N = d(y -= 60 * (B - u) * 1e3, h);
            return B === N ? [y, B] : [I - 60 * Math.min(B, N) * 1e3, Math.max(B, N)];
          }(l.utc(v, m).valueOf(), c, f), b = D[0], Y = D[1], S = l(b).utcOffset(Y);
          return S.$x.$timezone = f, S;
        }, l.tz.guess = function() {
          return Intl.DateTimeFormat().resolvedOptions().timeZone;
        }, l.tz.setDefault = function(v) {
          s = v;
        };
      };
    });
  }(It)), It.exports;
}
var ln = on();
const sn = /* @__PURE__ */ yt(ln);
var Ot = { exports: {} }, un = Ot.exports, Va;
function cn() {
  return Va || (Va = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(un, function() {
      var t = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, a = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, o = /\d\d/, l = /\d\d?/, s = /\d*[^-_:/,()\s\d]+/, i = {}, d = function(f) {
        return (f = +f) + (f > 68 ? 1900 : 2e3);
      }, p = function(f) {
        return function(c) {
          this[f] = +c;
        };
      }, g = [/[+-]\d\d:?(\d\d)?|Z/, function(f) {
        (this.zone || (this.zone = {})).offset = function(c) {
          if (!c || c === "Z") return 0;
          var D = c.match(/([+-]|\d\d)/g), b = 60 * D[1] + (+D[2] || 0);
          return b === 0 ? 0 : D[0] === "+" ? -b : b;
        }(f);
      }], v = function(f) {
        var c = i[f];
        return c && (c.indexOf ? c : c.s.concat(c.f));
      }, M = function(f, c) {
        var D, b = i.meridiem;
        if (b) {
          for (var Y = 1; Y <= 24; Y += 1) if (f.indexOf(b(Y, 0, c)) > -1) {
            D = Y > 12;
            break;
          }
        } else D = f === (c ? "pm" : "PM");
        return D;
      }, w = { A: [s, function(f) {
        this.afternoon = M(f, !1);
      }], a: [s, function(f) {
        this.afternoon = M(f, !0);
      }], Q: [n, function(f) {
        this.month = 3 * (f - 1) + 1;
      }], S: [n, function(f) {
        this.milliseconds = 100 * +f;
      }], SS: [o, function(f) {
        this.milliseconds = 10 * +f;
      }], SSS: [/\d{3}/, function(f) {
        this.milliseconds = +f;
      }], s: [l, p("seconds")], ss: [l, p("seconds")], m: [l, p("minutes")], mm: [l, p("minutes")], H: [l, p("hours")], h: [l, p("hours")], HH: [l, p("hours")], hh: [l, p("hours")], D: [l, p("day")], DD: [o, p("day")], Do: [s, function(f) {
        var c = i.ordinal, D = f.match(/\d+/);
        if (this.day = D[0], c) for (var b = 1; b <= 31; b += 1) c(b).replace(/\[|\]/g, "") === f && (this.day = b);
      }], w: [l, p("week")], ww: [o, p("week")], M: [l, p("month")], MM: [o, p("month")], MMM: [s, function(f) {
        var c = v("months"), D = (v("monthsShort") || c.map(function(b) {
          return b.slice(0, 3);
        })).indexOf(f) + 1;
        if (D < 1) throw new Error();
        this.month = D % 12 || D;
      }], MMMM: [s, function(f) {
        var c = v("months").indexOf(f) + 1;
        if (c < 1) throw new Error();
        this.month = c % 12 || c;
      }], Y: [/[+-]?\d+/, p("year")], YY: [o, function(f) {
        this.year = d(f);
      }], YYYY: [/\d{4}/, p("year")], Z: g, ZZ: g };
      function m(f) {
        var c, D;
        c = f, D = i && i.formats;
        for (var b = (f = c.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(B, N, _) {
          var U = _ && _.toUpperCase();
          return N || D[_] || t[_] || D[U].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(te, ee, C) {
            return ee || C.slice(1);
          });
        })).match(a), Y = b.length, S = 0; S < Y; S += 1) {
          var I = b[S], u = w[I], h = u && u[0], y = u && u[1];
          b[S] = y ? { regex: h, parser: y } : I.replace(/^\[|\]$/g, "");
        }
        return function(B) {
          for (var N = {}, _ = 0, U = 0; _ < Y; _ += 1) {
            var te = b[_];
            if (typeof te == "string") U += te.length;
            else {
              var ee = te.regex, C = te.parser, F = B.slice(U), $ = ee.exec(F)[0];
              C.call(N, $), B = B.replace($, "");
            }
          }
          return function(H) {
            var A = H.afternoon;
            if (A !== void 0) {
              var X = H.hours;
              A ? X < 12 && (H.hours += 12) : X === 12 && (H.hours = 0), delete H.afternoon;
            }
          }(N), N;
        };
      }
      return function(f, c, D) {
        D.p.customParseFormat = !0, f && f.parseTwoDigitYear && (d = f.parseTwoDigitYear);
        var b = c.prototype, Y = b.parse;
        b.parse = function(S) {
          var I = S.date, u = S.utc, h = S.args;
          this.$u = u;
          var y = h[1];
          if (typeof y == "string") {
            var B = h[2] === !0, N = h[3] === !0, _ = B || N, U = h[2];
            N && (U = h[2]), i = this.$locale(), !B && U && (i = D.Ls[U]), this.$d = function(F, $, H, A) {
              try {
                if (["x", "X"].indexOf($) > -1) return new Date(($ === "X" ? 1e3 : 1) * F);
                var X = m($)(F), ie = X.year, ne = X.month, R = X.day, T = X.hours, P = X.minutes, Z = X.seconds, j = X.milliseconds, ae = X.zone, z = X.week, k = /* @__PURE__ */ new Date(), K = R || (ie || ne ? 1 : k.getDate()), ve = ie || k.getFullYear(), pe = 0;
                ie && !ne || (pe = ne > 0 ? ne - 1 : k.getMonth());
                var he, De = T || 0, x = P || 0, Q = Z || 0, le = j || 0;
                return ae ? new Date(Date.UTC(ve, pe, K, De, x, Q, le + 60 * ae.offset * 1e3)) : H ? new Date(Date.UTC(ve, pe, K, De, x, Q, le)) : (he = new Date(ve, pe, K, De, x, Q, le), z && (he = A(he).week(z).toDate()), he);
              } catch {
                return /* @__PURE__ */ new Date("");
              }
            }(I, y, u, D), this.init(), U && U !== !0 && (this.$L = this.locale(U).$L), _ && I != this.format(y) && (this.$d = /* @__PURE__ */ new Date("")), i = {};
          } else if (y instanceof Array) for (var te = y.length, ee = 1; ee <= te; ee += 1) {
            h[1] = y[ee - 1];
            var C = D.apply(this, h);
            if (C.isValid()) {
              this.$d = C.$d, this.$L = C.$L, this.init();
              break;
            }
            ee === te && (this.$d = /* @__PURE__ */ new Date(""));
          }
          else Y.call(this, S);
        };
      };
    });
  }(Ot)), Ot.exports;
}
var dn = cn();
const cr = /* @__PURE__ */ yt(dn);
var Ft = { exports: {} }, fn = Ft.exports, Aa;
function mn() {
  return Aa || (Aa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(fn, function() {
      var t = "week", a = "year";
      return function(n, o, l) {
        var s = o.prototype;
        s.week = function(i) {
          if (i === void 0 && (i = null), i !== null) return this.add(7 * (i - this.week()), "day");
          var d = this.$locale().yearStart || 1;
          if (this.month() === 11 && this.date() > 25) {
            var p = l(this).startOf(a).add(1, a).date(d), g = l(this).endOf(t);
            if (p.isBefore(g)) return 1;
          }
          var v = l(this).startOf(a).date(d).startOf(t).subtract(1, "millisecond"), M = this.diff(v, t, !0);
          return M < 0 ? l(this).startOf("week").week() : Math.ceil(M);
        }, s.weeks = function(i) {
          return i === void 0 && (i = null), this.week(i);
        };
      };
    });
  }(Ft)), Ft.exports;
}
var hn = mn();
const vn = /* @__PURE__ */ yt(hn);
var Vt = { exports: {} }, pn = Vt.exports, Pa;
function gn() {
  return Pa || (Pa = 1, function(r, e) {
    (function(t, a) {
      r.exports = a();
    })(pn, function() {
      return function(t, a, n) {
        var o = a.prototype, l = function(g) {
          return g && (g.indexOf ? g : g.s);
        }, s = function(g, v, M, w, m) {
          var f = g.name ? g : g.$locale(), c = l(f[v]), D = l(f[M]), b = c || D.map(function(S) {
            return S.slice(0, w);
          });
          if (!m) return b;
          var Y = f.weekStart;
          return b.map(function(S, I) {
            return b[(I + (Y || 0)) % 7];
          });
        }, i = function() {
          return n.Ls[n.locale()];
        }, d = function(g, v) {
          return g.formats[v] || function(M) {
            return M.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(w, m, f) {
              return m || f.slice(1);
            });
          }(g.formats[v.toUpperCase()]);
        }, p = function() {
          var g = this;
          return { months: function(v) {
            return v ? v.format("MMMM") : s(g, "months");
          }, monthsShort: function(v) {
            return v ? v.format("MMM") : s(g, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return g.$locale().weekStart || 0;
          }, weekdays: function(v) {
            return v ? v.format("dddd") : s(g, "weekdays");
          }, weekdaysMin: function(v) {
            return v ? v.format("dd") : s(g, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(v) {
            return v ? v.format("ddd") : s(g, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(v) {
            return d(g.$locale(), v);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        o.localeData = function() {
          return p.bind(this)();
        }, n.localeData = function() {
          var g = i();
          return { firstDayOfWeek: function() {
            return g.weekStart || 0;
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
            return d(g, v);
          }, meridiem: g.meridiem, ordinal: g.ordinal };
        }, n.months = function() {
          return s(i(), "months");
        }, n.monthsShort = function() {
          return s(i(), "monthsShort", "months", 3);
        }, n.weekdays = function(g) {
          return s(i(), "weekdays", null, null, g);
        }, n.weekdaysShort = function(g) {
          return s(i(), "weekdaysShort", "weekdays", 3, g);
        }, n.weekdaysMin = function(g) {
          return s(i(), "weekdaysMin", "weekdays", 2, g);
        };
      };
    });
  }(Vt)), Vt.exports;
}
var yn = gn();
const $n = /* @__PURE__ */ yt(yn);
class Dn {
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
      const l = n.replace(/[年月日時分秒]/g, ""), s = ["-", "/", ".", " "];
      for (const i of s) {
        const d = this.tryParseWithSeparator(l, i);
        if (d) return d;
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
    if (isNaN(l) || isNaN(s) || isNaN(i) || l < this.yearRange.min || l > this.yearRange.max) return null;
    const d = l + this.YEAR_OFFSET;
    return s < 1 || s > 12 || i < 1 || i > 31 || !ue(`${d}-${s.toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`).isValid() ? null : {
      year: d,
      month: s,
      day: i
    };
  }
  /**
   * 解析時間部分 (如: "上午 12時00分")
   */
  parseTimePart(e) {
    if (!e) return null;
    const t = e.trim(), a = t.match(/(上午|下午)\s*(\d{1,2})時(\d{2})分(?:(\d{2})秒)?/);
    if (a) {
      const [, o, l, s, i] = a;
      let d = parseInt(l);
      const p = parseInt(s), g = i ? parseInt(i) : 0;
      return o === "下午" && d !== 12 ? d += 12 : o === "上午" && d === 12 && (d = 0), d < 0 || d > 23 || p < 0 || p > 59 || g < 0 || g > 59 ? null : { hour: d, minute: p, second: g };
    }
    const n = t.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (n) {
      const [, o, l, s] = n, i = parseInt(o), d = parseInt(l), p = s ? parseInt(s) : 0;
      return i < 0 || i > 23 || d < 0 || d > 59 || p < 0 || p > 59 ? null : { hour: i, minute: d, second: p };
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
    const a = e.split(t).map((p) => p.trim()).filter(Boolean);
    if (a.length < 3) return null;
    const n = parseInt(a[0]), o = parseInt(a[1]), l = parseInt(a[2]);
    if (isNaN(n) || isNaN(o) || isNaN(l) || n < this.yearRange.min || n > this.yearRange.max) return null;
    const s = n + this.YEAR_OFFSET;
    if (o < 1 || o > 12 || l < 1 || l > 31) return null;
    const i = {
      year: s,
      month: o,
      day: l
    };
    return ue(`${s}-${o.toString().padStart(2, "0")}-${l.toString().padStart(2, "0")}`).isValid() ? i : null;
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
      const i = this.detectTimeFormat(l), d = this.formatTimePart(e, l, i);
      return `${s} ${d}`;
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
    let d = ue(i).format(t);
    if (t.includes("YYYY"))
      d = d.replace(e.year.toString(), n.toString());
    else if (t.includes("YY")) {
      const p = e.year.toString().slice(-2), g = n.toString().slice(-2);
      d = d.replace(p, g);
    }
    return d;
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
        "HH:mm:ss": () => this.formatBasicTime(e, t, a, !0),
        "HH:mm": () => this.formatBasicTime(e, t, 0, !1),
        HH時mm分ss秒: () => this.formatChineseTime(e, t, a, !0),
        HH時mm分: () => this.formatChineseTime(e, t, 0, !1)
      };
      if (l[n])
        return l[n]();
    } else {
      const l = {
        "hh:mm:ss A": () => this.format12HourTime(e, t, a, !0, "suffix"),
        "hh:mm A": () => this.format12HourTime(e, t, 0, !1, "suffix"),
        "h:mm A": () => this.format12HourTime(e, t, 0, !1, "suffix", !1),
        "A hh:mm:ss": () => this.format12HourTime(e, t, a, !0, "prefix"),
        "A hh:mm": () => this.format12HourTime(e, t, 0, !1, "prefix"),
        "A HH時mm分ss秒": () => this.format12HourTime(e, t, a, !0, "chinese"),
        "A HH時mm分": () => this.format12HourTime(e, t, 0, !1, "chinese")
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
  format12HourTime(e, t, a, n, o, l = !0) {
    const s = e < 12 ? "上午" : "下午", i = e === 0 ? 12 : e > 12 ? e - 12 : e, d = l ? i.toString().padStart(2, "0") : i.toString(), p = t.toString().padStart(2, "0"), g = n ? a.toString().padStart(2, "0") : "";
    switch (o) {
      case "suffix":
        return n ? `${d}:${p}:${g} ${s}` : `${d}:${p} ${s}`;
      case "prefix":
        return n ? `${s} ${d}:${p}:${g}` : `${s} ${d}:${p}`;
      case "chinese":
        return n ? `${s} ${d}時${p}分${g}秒` : `${s} ${d}時${p}分`;
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
    let o = ue(n).format(t);
    return !a && (t.includes("A") || t.includes("a")) && (o = o.replace(/AM/g, "上午").replace(/PM/g, "下午"), o = o.replace(/am/g, "上午").replace(/pm/g, "下午")), o;
  }
}
function dr() {
  return new Dn();
}
ue.extend(cr);
const La = dr(), Ba = {
  "en-US": ["MM/DD/YYYY", "M/D/YYYY"],
  "en-GB": ["DD/MM/YYYY", "D/M/YYYY"],
  "zh-TW": ["YYYY-MM-DD", "YYYY/MM/DD"],
  "zh-CN": ["YYYY-MM-DD", "YYYY/MM/DD"]
}, Ha = [
  "YYYY-MM-DD",
  "YYYY/MM/DD",
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "YY-MM-DD",
  "YY/MM/DD"
];
class bn {
  constructor(e = "zh-TW", t = "gregory") {
    be(this, "locale");
    be(this, "calendar");
    be(this, "preferredFormats");
    this.locale = e, this.calendar = t, this.preferredFormats = [
      ...Ba[e] || [],
      ...Ha
    ];
  }
  parse(e) {
    if (!e || typeof e != "string")
      return { success: !1, date: null, format: null, confidence: 0 };
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
      return console.warn("日期解析失敗:", a), { success: !1, date: null, format: null, confidence: 0 };
    }
  }
  tryParseWithPlugins(e) {
    switch (this.calendar) {
      case "roc":
        if (La.canParseInput(e)) {
          const t = La.parseInput(e, this.locale);
          if (t)
            return {
              success: !0,
              date: t,
              format: "roc-plugin",
              confidence: 0.95,
              calendarSystem: "roc"
            };
        }
        break;
    }
    return { success: !1, date: null, format: null, confidence: 0 };
  }
  tryParseWithFormat(e, t) {
    try {
      const a = ue(e, t, !0);
      if (a.isValid())
        return {
          success: !0,
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
    return { success: !1, date: null, format: null, confidence: 0 };
  }
  fallbackParse(e) {
    try {
      const t = ue(e);
      if (t.isValid())
        return {
          success: !0,
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
    return { success: !1, date: null, format: null, confidence: 0 };
  }
  setLocale(e) {
    this.locale = e, this.preferredFormats = [
      ...Ba[e] || [],
      ...Ha
    ];
  }
  setCalendar(e) {
    this.calendar = e;
  }
}
const ut = new bn();
function Mn(r, e = "zh-TW", t = "gregory") {
  return e !== ut.locale && ut.setLocale(e), t !== ut.calendar && ut.setCalendar(t), ut.parse(r);
}
function et(r, e) {
  return r - e * Math.floor(r / e);
}
const fr = 1721426;
function je(r, e, t, a) {
  e = $t(r, e);
  let n = e - 1, o = -2;
  return t <= 2 ? o = 0 : ze(e) && (o = -1), fr - 1 + 365 * n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400) + Math.floor((367 * t - 362) / 12 + o + a);
}
function ze(r) {
  return r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0);
}
function $t(r, e) {
  return r === "BC" ? 1 - e : e;
}
function _t(r) {
  let e = "AD";
  return r <= 0 && (e = "BC", r = 1 - r), [
    e,
    r
  ];
}
const Sn = {
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
class Ye {
  fromJulianDay(e) {
    let t = e, a = t - fr, n = Math.floor(a / 146097), o = et(a, 146097), l = Math.floor(o / 36524), s = et(o, 36524), i = Math.floor(s / 1461), d = et(s, 1461), p = Math.floor(d / 365), g = n * 400 + l * 100 + i * 4 + p + (l !== 4 && p !== 4 ? 1 : 0), [v, M] = _t(g), w = t - je(v, M, 1, 1), m = 2;
    t < je(v, M, 3, 1) ? m = 0 : ze(M) && (m = 1);
    let f = Math.floor(((w + m) * 12 + 373) / 367), c = t - je(v, M, f, 1) + 1;
    return new se(v, M, f, c);
  }
  toJulianDay(e) {
    return je(e.era, e.year, e.month, e.day);
  }
  getDaysInMonth(e) {
    return Sn[ze(e.year) ? "leapyear" : "standard"][e.month - 1];
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
}
const wn = {
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
function kn(r, e) {
  var t, a, n, o;
  return (o = (n = (t = r.isEqual) === null || t === void 0 ? void 0 : t.call(r, e)) !== null && n !== void 0 ? n : (a = e.isEqual) === null || a === void 0 ? void 0 : a.call(e, r)) !== null && o !== void 0 ? o : r.identifier === e.identifier;
}
function mr(r, e, t) {
  let a = r.calendar.toJulianDay(r), n = En(e), o = Math.ceil(a + 1 - n) % 7;
  return o < 0 && (o += 7), o;
}
function Tn(r) {
  return Be(Date.now(), r);
}
function xn(r) {
  return Vn(Tn(r));
}
function hr(r, e) {
  return r.calendar.toJulianDay(r) - e.calendar.toJulianDay(e);
}
function Yn(r, e) {
  return qa(r) - qa(e);
}
function qa(r) {
  return r.hour * 36e5 + r.minute * 6e4 + r.second * 1e3 + r.millisecond;
}
let Zt = null;
function vr() {
  return Zt == null && (Zt = new Intl.DateTimeFormat().resolvedOptions().timeZone), Zt;
}
function Rn(r) {
  return r.subtract({
    days: r.day - 1
  });
}
const Na = /* @__PURE__ */ new Map();
function Cn(r) {
  if (Intl.Locale) {
    let t = Na.get(r);
    return t || (t = new Intl.Locale(r).maximize().region, t && Na.set(r, t)), t;
  }
  let e = r.split("-")[1];
  return e === "u" ? void 0 : e;
}
function En(r) {
  let e = Cn(r);
  return e && wn[e] || 0;
}
function In(r, e, t) {
  let a = r.calendar.getDaysInMonth(r);
  return Math.ceil((mr(Rn(r), e) + a) / 7);
}
function nt(r) {
  r = Ee(r, new Ye());
  let e = $t(r.era, r.year);
  return pr(e, r.month, r.day, r.hour, r.minute, r.second, r.millisecond);
}
function pr(r, e, t, a, n, o, l) {
  let s = /* @__PURE__ */ new Date();
  return s.setUTCHours(a, n, o, l), s.setUTCFullYear(r, e - 1, t), s.getTime();
}
function la(r, e) {
  if (e === "UTC") return 0;
  if (r > 0 && e === vr()) return new Date(r).getTimezoneOffset() * -6e4;
  let { year: t, month: a, day: n, hour: o, minute: l, second: s } = gr(r, e);
  return pr(t, a, n, o, l, s, 0) - Math.floor(r / 1e3) * 1e3;
}
const Ua = /* @__PURE__ */ new Map();
function gr(r, e) {
  let t = Ua.get(e);
  t || (t = new Intl.DateTimeFormat("en-US", {
    timeZone: e,
    hour12: !1,
    era: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }), Ua.set(e, t));
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
const za = 864e5;
function On(r, e, t, a) {
  return (t === a ? [
    t
  ] : [
    t,
    a
  ]).filter((o) => Fn(r, e, o));
}
function Fn(r, e, t) {
  let a = gr(t, e);
  return r.year === a.year && r.month === a.month && r.day === a.day && r.hour === a.hour && r.minute === a.minute && r.second === a.second;
}
function Le(r, e, t = "compatible") {
  let a = ot(r);
  if (e === "UTC") return nt(a);
  if (e === vr() && t === "compatible") {
    a = Ee(a, new Ye());
    let i = /* @__PURE__ */ new Date(), d = $t(a.era, a.year);
    return i.setFullYear(d, a.month - 1, a.day), i.setHours(a.hour, a.minute, a.second, a.millisecond), i.getTime();
  }
  let n = nt(a), o = la(n - za, e), l = la(n + za, e), s = On(a, e, n - o, n - l);
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
function yr(r, e, t = "compatible") {
  return new Date(Le(r, e, t));
}
function Be(r, e) {
  let t = la(r, e), a = new Date(r + t), n = a.getUTCFullYear(), o = a.getUTCMonth() + 1, l = a.getUTCDate(), s = a.getUTCHours(), i = a.getUTCMinutes(), d = a.getUTCSeconds(), p = a.getUTCMilliseconds();
  return new gt(n < 1 ? "BC" : "AD", n < 1 ? -n + 1 : n, o, l, e, t, s, i, d, p);
}
function Vn(r) {
  return new se(r.calendar, r.era, r.year, r.month, r.day);
}
function ot(r, e) {
  let t = 0, a = 0, n = 0, o = 0;
  if ("timeZone" in r) ({ hour: t, minute: a, second: n, millisecond: o } = r);
  else if ("hour" in r && !e) return r;
  return e && ({ hour: t, minute: a, second: n, millisecond: o } = e), new lt(r.calendar, r.era, r.year, r.month, r.day, t, a, n, o);
}
function Ee(r, e) {
  if (kn(r.calendar, e)) return r;
  let t = e.fromJulianDay(r.calendar.toJulianDay(r)), a = r.copy();
  return a.calendar = e, a.era = t.era, a.year = t.year, a.month = t.month, a.day = t.day, _e(a), a;
}
function An(r, e, t) {
  if (r instanceof gt)
    return r.timeZone === e ? r : Ln(r, e);
  let a = Le(r, e, t);
  return Be(a, e);
}
function Pn(r) {
  let e = nt(r) - r.offset;
  return new Date(e);
}
function Ln(r, e) {
  let t = nt(r) - r.offset;
  return Ee(Be(t, e), r.calendar);
}
const ct = 36e5;
function Kt(r, e) {
  let t = r.copy(), a = "hour" in t ? Nn(t, e) : 0;
  sa(t, e.years || 0), t.calendar.balanceYearMonth && t.calendar.balanceYearMonth(t, r), t.month += e.months || 0, ia(t), $r(t), t.day += (e.weeks || 0) * 7, t.day += e.days || 0, t.day += a, Bn(t), t.calendar.balanceDate && t.calendar.balanceDate(t), t.year < 1 && (t.year = 1, t.month = 1, t.day = 1);
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
function sa(r, e) {
  var t, a;
  !((t = (a = r.calendar).isInverseEra) === null || t === void 0) && t.call(a, r) && (e = -e), r.year += e;
}
function ia(r) {
  for (; r.month < 1; )
    sa(r, -1), r.month += r.calendar.getMonthsInYear(r);
  let e = 0;
  for (; r.month > (e = r.calendar.getMonthsInYear(r)); )
    r.month -= e, sa(r, 1);
}
function Bn(r) {
  for (; r.day < 1; )
    r.month--, ia(r), r.day += r.calendar.getDaysInMonth(r);
  for (; r.day > r.calendar.getDaysInMonth(r); )
    r.day -= r.calendar.getDaysInMonth(r), r.month++, ia(r);
}
function $r(r) {
  r.month = Math.max(1, Math.min(r.calendar.getMonthsInYear(r), r.month)), r.day = Math.max(1, Math.min(r.calendar.getDaysInMonth(r), r.day));
}
function _e(r) {
  r.calendar.constrainDate && r.calendar.constrainDate(r), r.year = Math.max(1, Math.min(r.calendar.getYearsInEra(r), r.year)), $r(r);
}
function Dr(r) {
  let e = {};
  for (let t in r) typeof r[t] == "number" && (e[t] = -r[t]);
  return e;
}
function br(r, e) {
  return Kt(r, Dr(e));
}
function Da(r, e) {
  let t = r.copy();
  return e.era != null && (t.era = e.era), e.year != null && (t.year = e.year), e.month != null && (t.month = e.month), e.day != null && (t.day = e.day), _e(t), t;
}
function Bt(r, e) {
  let t = r.copy();
  return e.hour != null && (t.hour = e.hour), e.minute != null && (t.minute = e.minute), e.second != null && (t.second = e.second), e.millisecond != null && (t.millisecond = e.millisecond), qn(t), t;
}
function Hn(r) {
  r.second += Math.floor(r.millisecond / 1e3), r.millisecond = kt(r.millisecond, 1e3), r.minute += Math.floor(r.second / 60), r.second = kt(r.second, 60), r.hour += Math.floor(r.minute / 60), r.minute = kt(r.minute, 60);
  let e = Math.floor(r.hour / 24);
  return r.hour = kt(r.hour, 24), e;
}
function qn(r) {
  r.millisecond = Math.max(0, Math.min(r.millisecond, 1e3)), r.second = Math.max(0, Math.min(r.second, 59)), r.minute = Math.max(0, Math.min(r.minute, 59)), r.hour = Math.max(0, Math.min(r.hour, 23));
}
function kt(r, e) {
  let t = r % e;
  return t < 0 && (t += e), t;
}
function Nn(r, e) {
  return r.hour += e.hours || 0, r.minute += e.minutes || 0, r.second += e.seconds || 0, r.millisecond += e.milliseconds || 0, Hn(r);
}
function ba(r, e, t, a) {
  let n = r.copy();
  switch (e) {
    case "era": {
      let s = r.calendar.getEras(), i = s.indexOf(r.era);
      if (i < 0) throw new Error("Invalid era: " + r.era);
      i = He(i, t, 0, s.length - 1, a == null ? void 0 : a.round), n.era = s[i], _e(n);
      break;
    }
    case "year":
      var o, l;
      !((o = (l = n.calendar).isInverseEra) === null || o === void 0) && o.call(l, n) && (t = -t), n.year = He(r.year, t, -1 / 0, 9999, a == null ? void 0 : a.round), n.year === -1 / 0 && (n.year = 1), n.calendar.balanceYearMonth && n.calendar.balanceYearMonth(n, r);
      break;
    case "month":
      n.month = He(r.month, t, 1, r.calendar.getMonthsInYear(r), a == null ? void 0 : a.round);
      break;
    case "day":
      n.day = He(r.day, t, 1, r.calendar.getDaysInMonth(r), a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return r.calendar.balanceDate && r.calendar.balanceDate(n), _e(n), n;
}
function Mr(r, e, t, a) {
  let n = r.copy();
  switch (e) {
    case "hour": {
      let o = r.hour, l = 0, s = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let i = o >= 12;
        l = i ? 12 : 0, s = i ? 23 : 11;
      }
      n.hour = He(o, t, l, s, a == null ? void 0 : a.round);
      break;
    }
    case "minute":
      n.minute = He(r.minute, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "second":
      n.second = He(r.second, t, 0, 59, a == null ? void 0 : a.round);
      break;
    case "millisecond":
      n.millisecond = He(r.millisecond, t, 0, 999, a == null ? void 0 : a.round);
      break;
    default:
      throw new Error("Unsupported field " + e);
  }
  return n;
}
function He(r, e, t, a, n = !1) {
  if (n) {
    r += Math.sign(e), r < t && (r = a);
    let o = Math.abs(e);
    e > 0 ? r = Math.ceil(r / o) * o : r = Math.floor(r / o) * o, r > a && (r = t);
  } else
    r += e, r < t ? r = a - (t - r - 1) : r > a && (r = t + (r - a - 1));
  return r;
}
function Sr(r, e) {
  let t;
  if (e.years != null && e.years !== 0 || e.months != null && e.months !== 0 || e.weeks != null && e.weeks !== 0 || e.days != null && e.days !== 0) {
    let n = Kt(ot(r), {
      years: e.years,
      months: e.months,
      weeks: e.weeks,
      days: e.days
    });
    t = Le(n, r.timeZone);
  } else
    t = nt(r) - r.offset;
  t += e.milliseconds || 0, t += (e.seconds || 0) * 1e3, t += (e.minutes || 0) * 6e4, t += (e.hours || 0) * 36e5;
  let a = Be(t, r.timeZone);
  return Ee(a, r.calendar);
}
function Un(r, e) {
  return Sr(r, Dr(e));
}
function zn(r, e, t, a) {
  switch (e) {
    case "hour": {
      let n = 0, o = 23;
      if ((a == null ? void 0 : a.hourCycle) === 12) {
        let w = r.hour >= 12;
        n = w ? 12 : 0, o = w ? 23 : 11;
      }
      let l = ot(r), s = Ee(Bt(l, {
        hour: n
      }), new Ye()), i = [
        Le(s, r.timeZone, "earlier"),
        Le(s, r.timeZone, "later")
      ].filter((w) => Be(w, r.timeZone).day === s.day)[0], d = Ee(Bt(l, {
        hour: o
      }), new Ye()), p = [
        Le(d, r.timeZone, "earlier"),
        Le(d, r.timeZone, "later")
      ].filter((w) => Be(w, r.timeZone).day === d.day).pop(), g = nt(r) - r.offset, v = Math.floor(g / ct), M = g % ct;
      return g = He(v, t, Math.floor(i / ct), Math.floor(p / ct), a == null ? void 0 : a.round) * ct + M, Ee(Be(g, r.timeZone), r.calendar);
    }
    case "minute":
    case "second":
    case "millisecond":
      return Mr(r, e, t, a);
    case "era":
    case "year":
    case "month":
    case "day": {
      let n = ba(ot(r), e, t, a), o = Le(n, r.timeZone);
      return Ee(Be(o, r.timeZone), r.calendar);
    }
    default:
      throw new Error("Unsupported field " + e);
  }
}
function Wn(r, e, t) {
  let a = ot(r), n = Bt(Da(a, e), e);
  if (n.compare(a) === 0) return r;
  let o = Le(n, r.timeZone, t);
  return Ee(Be(o, r.timeZone), r.calendar);
}
function jn(r) {
  return `${String(r.hour).padStart(2, "0")}:${String(r.minute).padStart(2, "0")}:${String(r.second).padStart(2, "0")}${r.millisecond ? String(r.millisecond / 1e3).slice(1) : ""}`;
}
function wr(r) {
  let e = Ee(r, new Ye()), t;
  return e.era === "BC" ? t = e.year === 1 ? "0000" : "-" + String(Math.abs(1 - e.year)).padStart(6, "00") : t = String(e.year).padStart(4, "0"), `${t}-${String(e.month).padStart(2, "0")}-${String(e.day).padStart(2, "0")}`;
}
function kr(r) {
  return `${wr(r)}T${jn(r)}`;
}
function Jn(r) {
  let e = Math.sign(r) < 0 ? "-" : "+";
  r = Math.abs(r);
  let t = Math.floor(r / 36e5), a = r % 36e5 / 6e4;
  return `${e}${String(t).padStart(2, "0")}:${String(a).padStart(2, "0")}`;
}
function _n(r) {
  return `${kr(r)}${Jn(r.offset)}[${r.timeZone}]`;
}
function Kn(r, e) {
  if (e.has(r))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function Ma(r, e, t) {
  Kn(r, e), e.set(r, t);
}
function Sa(r) {
  let e = typeof r[0] == "object" ? r.shift() : new Ye(), t;
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
var Qn = /* @__PURE__ */ new WeakMap();
class se {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new se(this.calendar, this.era, this.year, this.month, this.day) : new se(this.calendar, this.year, this.month, this.day);
  }
  /** Returns a new `CalendarDate` with the given duration added to it. */
  add(e) {
    return Kt(this, e);
  }
  /** Returns a new `CalendarDate` with the given duration subtracted from it. */
  subtract(e) {
    return br(this, e);
  }
  /** Returns a new `CalendarDate` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(e) {
    return Da(this, e);
  }
  /**
  * Returns a new `CalendarDate` with the given field adjusted by a specified amount.
  * When the resulting value reaches the limits of the field, it wraps around.
  */
  cycle(e, t, a) {
    return ba(this, e, t, a);
  }
  /** Converts the date to a native JavaScript Date object, with the time set to midnight in the given time zone. */
  toDate(e) {
    return yr(this, e);
  }
  /** Converts the date to an ISO 8601 formatted string. */
  toString() {
    return wr(this);
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(e) {
    return hr(this, e);
  }
  constructor(...e) {
    Ma(this, Qn, {
      writable: !0,
      value: void 0
    });
    let [t, a, n, o, l] = Sa(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, _e(this);
  }
}
var Zn = /* @__PURE__ */ new WeakMap();
class lt {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new lt(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond) : new lt(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `CalendarDateTime` with the given duration added to it. */
  add(e) {
    return Kt(this, e);
  }
  /** Returns a new `CalendarDateTime` with the given duration subtracted from it. */
  subtract(e) {
    return br(this, e);
  }
  /** Returns a new `CalendarDateTime` with the given fields set to the provided values. Other fields will be constrained accordingly. */
  set(e) {
    return Da(Bt(this, e), e);
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
        return ba(this, e, t, a);
      default:
        return Mr(this, e, t, a);
    }
  }
  /** Converts the date to a native JavaScript Date object in the given time zone. */
  toDate(e, t) {
    return yr(this, e, t);
  }
  /** Converts the date to an ISO 8601 formatted string. */
  toString() {
    return kr(this);
  }
  /** Compares this date with another. A negative result indicates that this date is before the given one, and a positive date indicates that it is after. */
  compare(e) {
    let t = hr(this, e);
    return t === 0 ? Yn(this, ot(e)) : t;
  }
  constructor(...e) {
    Ma(this, Zn, {
      writable: !0,
      value: void 0
    });
    let [t, a, n, o, l] = Sa(e);
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, _e(this);
  }
}
var Gn = /* @__PURE__ */ new WeakMap();
class gt {
  /** Returns a copy of this date. */
  copy() {
    return this.era ? new gt(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond) : new gt(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
  }
  /** Returns a new `ZonedDateTime` with the given duration added to it. */
  add(e) {
    return Sr(this, e);
  }
  /** Returns a new `ZonedDateTime` with the given duration subtracted from it. */
  subtract(e) {
    return Un(this, e);
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
    return zn(this, e, t, a);
  }
  /** Converts the date to a native JavaScript Date object. */
  toDate() {
    return Pn(this);
  }
  /** Converts the date to an ISO 8601 formatted string, including the UTC offset and time zone identifier. */
  toString() {
    return _n(this);
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
    Ma(this, Gn, {
      writable: !0,
      value: void 0
    });
    let [t, a, n, o, l] = Sa(e), s = e.shift(), i = e.shift();
    this.calendar = t, this.era = a, this.year = n, this.month = o, this.day = l, this.timeZone = s, this.offset = i, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, _e(this);
  }
}
const tt = [
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
], Xn = [
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
], At = [
  1867,
  1911,
  1925,
  1988,
  2018
], Ue = [
  "meiji",
  "taisho",
  "showa",
  "heisei",
  "reiwa"
];
function Wa(r) {
  const e = tt.findIndex(([t, a, n]) => r.year < t || r.year === t && r.month < a || r.year === t && r.month === a && r.day < n);
  return e === -1 ? tt.length - 1 : e === 0 ? 0 : e - 1;
}
function Gt(r) {
  let e = At[Ue.indexOf(r.era)];
  if (!e) throw new Error("Unknown era: " + r.era);
  return new se(r.year + e, r.month, r.day);
}
class eo extends Ye {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = Wa(t);
    return new se(this, Ue[a], t.year - At[a], t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Gt(e));
  }
  balanceDate(e) {
    let t = Gt(e), a = Wa(t);
    Ue[a] !== e.era && (e.era = Ue[a], e.year = t.year - At[a]), this.constrainDate(e);
  }
  constrainDate(e) {
    let t = Ue.indexOf(e.era), a = Xn[t];
    if (a != null) {
      let [n, o, l] = a, s = n - At[t];
      e.year = Math.max(1, Math.min(s, e.year)), e.year === s && (e.month = Math.min(o, e.month), e.month === o && (e.day = Math.min(l, e.day)));
    }
    if (e.year === 1 && t >= 0) {
      let [, n, o] = tt[t];
      e.month = Math.max(n, e.month), e.month === n && (e.day = Math.max(o, e.day));
    }
  }
  getEras() {
    return Ue;
  }
  getYearsInEra(e) {
    let t = Ue.indexOf(e.era), a = tt[t], n = tt[t + 1];
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
}
function ja(r) {
  if (r.year === 1) {
    let e = Ue.indexOf(r.era);
    return tt[e];
  }
}
const Tr = -543;
class to extends Ye {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = $t(t.era, t.year);
    return new se(this, a - Tr, t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Ja(e));
  }
  getEras() {
    return [
      "BE"
    ];
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(Ja(e));
  }
  balanceDate() {
  }
  constructor(...e) {
    super(...e), this.identifier = "buddhist";
  }
}
function Ja(r) {
  let [e, t] = _t(r.year + Tr);
  return new se(e, t, r.month, r.day);
}
const Ht = 1911;
function xr(r) {
  return r.era === "minguo" ? r.year + Ht : 1 - r.year + Ht;
}
function _a(r) {
  let e = r - Ht;
  return e > 0 ? [
    "minguo",
    e
  ] : [
    "before_minguo",
    1 - e
  ];
}
class ao extends Ye {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = $t(t.era, t.year), [n, o] = _a(a);
    return new se(this, n, o, t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Ka(e));
  }
  getEras() {
    return [
      "before_minguo",
      "minguo"
    ];
  }
  balanceDate(e) {
    let [t, a] = _a(xr(e));
    e.era = t, e.year = a;
  }
  isInverseEra(e) {
    return e.era === "before_minguo";
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(Ka(e));
  }
  getYearsInEra(e) {
    return e.era === "before_minguo" ? 9999 : 9999 - Ht;
  }
  constructor(...e) {
    super(...e), this.identifier = "roc";
  }
}
function Ka(r) {
  let [e, t] = _t(xr(r));
  return new se(e, t, r.month, r.day);
}
const Qa = 1948320, Za = [
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
class ro {
  fromJulianDay(e) {
    let t = e - Qa, a = 1 + Math.floor((33 * t + 3) / 12053), n = 365 * (a - 1) + Math.floor((8 * a + 21) / 33), o = t - n, l = o < 216 ? Math.floor(o / 31) : Math.floor((o - 6) / 30), s = o - Za[l] + 1;
    return new se(this, a, l + 1, s);
  }
  toJulianDay(e) {
    let t = Qa - 1 + 365 * (e.year - 1) + Math.floor((8 * e.year + 21) / 33);
    return t += Za[e.month - 1], t += e.day, t;
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
}
const Xt = 78, Ga = 80;
class no extends Ye {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e), a = t.year - Xt, n = e - je(t.era, t.year, 1, 1), o;
    n < Ga ? (a--, o = ze(t.year - 1) ? 31 : 30, n += o + 155 + 90 + 10) : (o = ze(t.year) ? 31 : 30, n -= Ga);
    let l, s;
    if (n < o)
      l = 1, s = n + 1;
    else {
      let i = n - o;
      i < 155 ? (l = Math.floor(i / 31) + 2, s = i % 31 + 1) : (i -= 155, l = Math.floor(i / 30) + 7, s = i % 30 + 1);
    }
    return new se(this, a, l, s);
  }
  toJulianDay(e) {
    let t = e.year + Xt, [a, n] = _t(t), o, l;
    return ze(n) ? (o = 31, l = je(a, n, 3, 21)) : (o = 30, l = je(a, n, 3, 22)), e.month === 1 ? l + e.day - 1 : (l += o + Math.min(e.month - 2, 5) * 31, e.month >= 8 && (l += (e.month - 7) * 30), l += e.day - 1, l);
  }
  getDaysInMonth(e) {
    return e.month === 1 && ze(e.year + Xt) || e.month >= 2 && e.month <= 6 ? 31 : 30;
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
}
const qt = 1948440, Xa = 1948439, Ce = 1300, Ke = 1600, oo = 460322;
function Nt(r, e, t, a) {
  return a + Math.ceil(29.5 * (t - 1)) + (e - 1) * 354 + Math.floor((3 + 11 * e) / 30) + r - 1;
}
function Yr(r, e, t) {
  let a = Math.floor((30 * (t - e) + 10646) / 10631), n = Math.min(12, Math.ceil((t - (29 + Nt(e, a, 1, 1))) / 29.5) + 1), o = t - Nt(e, a, n, 1) + 1;
  return new se(r, a, n, o);
}
function er(r) {
  return (14 + 11 * r) % 30 < 11;
}
class wa {
  fromJulianDay(e) {
    return Yr(this, qt, e);
  }
  toJulianDay(e) {
    return Nt(qt, e.year, e.month, e.day);
  }
  getDaysInMonth(e) {
    let t = 29 + e.month % 2;
    return e.month === 12 && er(e.year) && t++, t;
  }
  getMonthsInYear() {
    return 12;
  }
  getDaysInYear(e) {
    return er(e.year) ? 355 : 354;
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
}
class lo extends wa {
  fromJulianDay(e) {
    return Yr(this, Xa, e);
  }
  toJulianDay(e) {
    return Nt(Xa, e.year, e.month, e.day);
  }
  constructor(...e) {
    super(...e), this.identifier = "islamic-tbla";
  }
}
const so = "qgpUDckO1AbqBmwDrQpVBakGkgepC9QF2gpcBS0NlQZKB1QLagutBa4ETwoXBYsGpQbVCtYCWwmdBE0KJg2VDawFtgm6AlsKKwWVCsoG6Qr0AnYJtgJWCcoKpAvSC9kF3AJtCU0FpQpSC6ULtAW2CVcFlwJLBaMGUgdlC2oFqworBZUMSg2lDcoF1gpXCasESwmlClILagt1BXYCtwhbBFUFqQW0BdoJ3QRuAjYJqgpUDbIN1QXaAlsJqwRVCkkLZAtxC7QFtQpVCiUNkg7JDtQG6QprCasEkwpJDaQNsg25CroEWworBZUKKgtVC1wFvQQ9Ah0JlQpKC1oLbQW2AjsJmwRVBqkGVAdqC2wFrQpVBSkLkgupC9QF2gpaBasKlQVJB2QHqgu1BbYCVgpNDiULUgtqC60FrgIvCZcESwalBqwG1gpdBZ0ETQoWDZUNqgW1BdoCWwmtBJUFygbkBuoK9QS2AlYJqgpUC9IL2QXqAm0JrQSVCkoLpQuyBbUJ1gSXCkcFkwZJB1ULagVrCisFiwpGDaMNygXWCtsEawJLCaUKUgtpC3UFdgG3CFsCKwVlBbQF2gntBG0BtgimClINqQ3UBdoKWwmrBFMGKQdiB6kLsgW1ClUFJQuSDckO0gbpCmsFqwRVCikNVA2qDbUJugQ7CpsETQqqCtUK2gJdCV4ELgqaDFUNsga5BroEXQotBZUKUguoC7QLuQXaAloJSgukDdEO6AZqC20FNQWVBkoNqA3UDdoGWwWdAisGFQtKC5ULqgWuCi4JjwwnBZUGqgbWCl0FnQI=";
let ua, at;
function Pt(r) {
  return oo + at[r - Ce];
}
function dt(r, e) {
  let t = r - Ce, a = 1 << 11 - (e - 1);
  return (ua[t] & a) === 0 ? 29 : 30;
}
function tr(r, e) {
  let t = Pt(r);
  for (let a = 1; a < e; a++) t += dt(r, a);
  return t;
}
function ar(r) {
  return at[r + 1 - Ce] - at[r - Ce];
}
class io extends wa {
  fromJulianDay(e) {
    let t = e - qt, a = Pt(Ce), n = Pt(Ke);
    if (t < a || t > n) return super.fromJulianDay(e);
    {
      let o = Ce - 1, l = 1, s = 1;
      for (; s > 0; ) {
        o++, s = t - Pt(o) + 1;
        let i = ar(o);
        if (s === i) {
          l = 12;
          break;
        } else if (s < i) {
          let d = dt(o, l);
          for (l = 1; s > d; )
            s -= d, l++, d = dt(o, l);
          break;
        }
      }
      return new se(this, o, l, t - tr(o, l) + 1);
    }
  }
  toJulianDay(e) {
    return e.year < Ce || e.year > Ke ? super.toJulianDay(e) : qt + tr(e.year, e.month) + (e.day - 1);
  }
  getDaysInMonth(e) {
    return e.year < Ce || e.year > Ke ? super.getDaysInMonth(e) : dt(e.year, e.month);
  }
  getDaysInYear(e) {
    return e.year < Ce || e.year > Ke ? super.getDaysInYear(e) : ar(e.year);
  }
  constructor() {
    if (super(), this.identifier = "islamic-umalqura", ua || (ua = new Uint16Array(Uint8Array.from(atob(so), (e) => e.charCodeAt(0)).buffer)), !at) {
      at = new Uint32Array(Ke - Ce + 1);
      let e = 0;
      for (let t = Ce; t <= Ke; t++) {
        at[t - Ce] = e;
        for (let a = 1; a <= 12; a++) e += dt(t, a);
      }
    }
  }
}
const rr = 347997, Rr = 1080, Cr = 24 * Rr, uo = 29, co = 12 * Rr + 793, fo = uo * Cr + co;
function We(r) {
  return et(r * 7 + 1, 19) < 7;
}
function Lt(r) {
  let e = Math.floor((235 * r - 234) / 19), t = 12084 + 13753 * e, a = e * 29 + Math.floor(t / 25920);
  return et(3 * (a + 1), 7) < 3 && (a += 1), a;
}
function mo(r) {
  let e = Lt(r - 1), t = Lt(r);
  return Lt(r + 1) - t === 356 ? 2 : t - e === 382 ? 1 : 0;
}
function ft(r) {
  return Lt(r) + mo(r);
}
function Er(r) {
  return ft(r + 1) - ft(r);
}
function ho(r) {
  let e = Er(r);
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
  if (e >= 6 && !We(r) && e++, e === 4 || e === 7 || e === 9 || e === 11 || e === 13) return 29;
  let t = ho(r);
  return e === 2 ? t === 2 ? 30 : 29 : e === 3 ? t === 0 ? 29 : 30 : e === 6 ? We(r) ? 30 : 0 : 30;
}
class vo {
  fromJulianDay(e) {
    let t = e - rr, a = t * Cr / fo, n = Math.floor((19 * a + 234) / 235) + 1, o = ft(n), l = Math.floor(t - o);
    for (; l < 1; )
      n--, o = ft(n), l = Math.floor(t - o);
    let s = 1, i = 0;
    for (; i < l; )
      i += Tt(n, s), s++;
    s--, i -= Tt(n, s);
    let d = l - i;
    return new se(this, n, s, d);
  }
  toJulianDay(e) {
    let t = ft(e.year);
    for (let a = 1; a < e.month; a++) t += Tt(e.year, a);
    return t + e.day + rr;
  }
  getDaysInMonth(e) {
    return Tt(e.year, e.month);
  }
  getMonthsInYear(e) {
    return We(e.year) ? 13 : 12;
  }
  getDaysInYear(e) {
    return Er(e.year);
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
    t.year !== e.year && (We(t.year) && !We(e.year) && t.month > 6 ? e.month-- : !We(t.year) && We(e.year) && t.month > 6 && e.month++);
  }
  constructor() {
    this.identifier = "hebrew";
  }
}
const ca = 1723856, nr = 1824665, da = 5500;
function Ut(r, e, t, a) {
  return r + 365 * e + Math.floor(e / 4) + 30 * (t - 1) + a - 1;
}
function ka(r, e) {
  let t = Math.floor(4 * (e - r) / 1461), a = 1 + Math.floor((e - Ut(r, t, 1, 1)) / 30), n = e + 1 - Ut(r, t, a, 1);
  return [
    t,
    a,
    n
  ];
}
function Ir(r) {
  return Math.floor(r % 4 / 3);
}
function Or(r, e) {
  return e % 13 !== 0 ? 30 : Ir(r) + 5;
}
class Ta {
  fromJulianDay(e) {
    let [t, a, n] = ka(ca, e), o = "AM";
    return t <= 0 && (o = "AA", t += da), new se(this, o, t, a, n);
  }
  toJulianDay(e) {
    let t = e.year;
    return e.era === "AA" && (t -= da), Ut(ca, t, e.month, e.day);
  }
  getDaysInMonth(e) {
    return Or(e.year, e.month);
  }
  getMonthsInYear() {
    return 13;
  }
  getDaysInYear(e) {
    return 365 + Ir(e.year);
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
}
class po extends Ta {
  fromJulianDay(e) {
    let [t, a, n] = ka(ca, e);
    return t += da, new se(this, "AA", t, a, n);
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
}
class go extends Ta {
  fromJulianDay(e) {
    let [t, a, n] = ka(nr, e), o = "CE";
    return t <= 0 && (o = "BCE", t = 1 - t), new se(this, o, t, a, n);
  }
  toJulianDay(e) {
    let t = e.year;
    return e.era === "BCE" && (t = 1 - t), Ut(nr, t, e.month, e.day);
  }
  getDaysInMonth(e) {
    let t = e.year;
    return e.era === "BCE" && (t = 1 - t), Or(t, e.month);
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
}
function yo(r) {
  switch (r) {
    case "buddhist":
      return new to();
    case "ethiopic":
      return new Ta();
    case "ethioaa":
      return new po();
    case "coptic":
      return new go();
    case "hebrew":
      return new vo();
    case "indian":
      return new no();
    case "islamic-civil":
      return new wa();
    case "islamic-tbla":
      return new lo();
    case "islamic-umalqura":
      return new io();
    case "japanese":
      return new eo();
    case "persian":
      return new ro();
    case "roc":
      return new ao();
    case "gregory":
    default:
      return new Ye();
  }
}
let ea = /* @__PURE__ */ new Map();
class zt {
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
    return bo() && (this.resolvedHourCycle || (this.resolvedHourCycle = Mo(e.locale, this.options)), e.hourCycle = this.resolvedHourCycle, e.hour12 = this.resolvedHourCycle === "h11" || this.resolvedHourCycle === "h12"), e.calendar === "ethiopic-amete-alem" && (e.calendar = "ethioaa"), e;
  }
  constructor(e, t = {}) {
    this.formatter = Fr(e, t), this.options = t;
  }
}
const $o = {
  true: {
    // Only Japanese uses the h11 style for 12 hour time. All others use h12.
    ja: "h11"
  },
  false: {}
};
function Fr(r, e = {}) {
  if (typeof e.hour12 == "boolean" && Do()) {
    e = {
      ...e
    };
    let n = $o[String(e.hour12)][r.split("-")[0]], o = e.hour12 ? "h12" : "h23";
    e.hourCycle = n ?? o, delete e.hour12;
  }
  let t = r + (e ? Object.entries(e).sort((n, o) => n[0] < o[0] ? -1 : 1).join() : "");
  if (ea.has(t)) return ea.get(t);
  let a = new Intl.DateTimeFormat(r, e);
  return ea.set(t, a), a;
}
let ta = null;
function Do() {
  return ta == null && (ta = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: !1
  }).format(new Date(2020, 2, 3, 0)) === "24"), ta;
}
let aa = null;
function bo() {
  return aa == null && (aa = new Intl.DateTimeFormat("fr", {
    hour: "numeric",
    hour12: !1
  }).resolvedOptions().hourCycle === "h12"), aa;
}
function Mo(r, e) {
  if (!e.timeStyle && !e.hour) return;
  r = r.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, ""), r += (r.includes("-u-") ? "" : "-u") + "-nu-latn";
  let t = Fr(r, {
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
const ra = dr(), ke = class ke {
  /**
   * 安全地創建日曆實例
   */
  static createSafeCalendar(e) {
    try {
      return yo(e);
    } catch (t) {
      return console.warn(`無法創建日曆 ${e}，回退到西元曆:`, t), new Ye();
    }
  }
  /**
   * 安全地進行日曆轉換
   */
  static safeToCalendar(e, t) {
    try {
      return Ee(e, t);
    } catch (a) {
      return console.warn("日曆轉換失敗，返回原始日期:", a), e;
    }
  }
  /**
   * 安全地生成日曆網格
   */
  static generateCalendarDays(e, t, a, n, o = 0) {
    try {
      const l = this.createSafeCalendar(a), s = new se(e, t, 1), i = a === "gregory" ? s : this.safeToCalendar(s, l), d = In(i, n) ?? 6, g = (mr(i, n) - o + 7) % 7, v = i.subtract({ days: g }), M = [];
      let w = v;
      const m = d * 7;
      for (let f = 0; f < m; f++)
        M.push(w), w = w.add({ days: 1 });
      return M;
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
   * 獲取日曆系統的有效年份範圍
   */
  // static getCalendarYearRange(calendarId: string): { min: number; max: number } {
  //     // 基於實際使用情況的合理範圍
  //     const ranges: Record<string, { min: number; max: number }> = {
  //         'gregory': { min: 1, max: 9999 },        // 西元曆
  //         'roc': { min: 1, max: 500 },             // 民國 1年(1912) 到 500年(2411) - 擴大範圍
  //         'buddhist': { min: 1000, max: 3500 },    // 佛曆實際使用範圍
  //         'japanese': { min: 1, max: 200 },        // 日本年號範圍
  //         'islamic': { min: 1, max: 2000 },        // 伊斯蘭曆
  //         'persian': { min: 1, max: 2000 },        // 波斯曆
  //         'hebrew': { min: 1, max: 8000 },         // 希伯來曆
  //         'indian': { min: 1, max: 2000 },         // 印度曆
  //     };
  //     return ranges[calendarId] || { min: 1, max: 9999 };
  // }
  /**
   * 轉換西元年到目標日曆系統年份
   */
  static convertGregorianYear(e, t) {
    if (t === "gregory")
      return { localYear: e, isValid: !0 };
    try {
      const a = new se(e, 1, 1), n = this.createSafeCalendar(t), o = this.safeToCalendar(a, n), l = this.getCalendarRange(t), s = o.year >= l.min && o.year <= l.max;
      return { localYear: o.year, isValid: s };
    } catch (a) {
      return console.warn(`年份轉換失敗 ${e} -> ${t}:`, a), { localYear: e, isValid: !1 };
    }
  }
  /**
   * 轉換目標日曆年份到西元年
   */
  static convertToGregorianYear(e, t) {
    if (t === "gregory")
      return e;
    try {
      const a = this.createSafeCalendar(t), n = new se(a, e, 1, 1);
      return this.safeToCalendar(n, new Ye()).year;
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
      const o = new se(e, t, a);
      if (n === "gregory") return !0;
      const l = this.createSafeCalendar(n), s = this.safeToCalendar(o, l), i = this.getCalendarRange(n);
      return s.year >= i.min && s.year <= i.max;
    } catch (o) {
      return console.warn("日期驗證失敗:", o), !1;
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
  /**
   * 格式化輸出 - 統一執行順序：插件 → @internationalized/date → dayjs → 基本回退
   * 格式化含日曆系統的格式，如民國XX年XX月XX日 XX時XX分XX秒
   */
  static formatOutput(e, t, a = "gregory", n = "zh-TW") {
    if (!e) return "";
    try {
      switch (a) {
        case "gregory":
          return ue(new Date(
            e.year,
            e.month - 1,
            e.day,
            e.hour || 0,
            e.minute || 0,
            e.second || 0
          )).format(t);
        case "roc":
          if (ra.supportsFormat(t) && ra.canParseInput(t))
            return ra.format(e, t, n);
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
      return ue(l).format(t);
    } catch (o) {
      console.warn("所有格式化方法都失敗，使用基本回退:", o);
      let l = `${e.year}-${e.month.toString().padStart(2, "0")}-${e.day.toString().padStart(2, "0")}`;
      return (e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0) && (l += ` ${(e.hour || 0).toString().padStart(2, "0")}:${(e.minute || 0).toString().padStart(2, "0")}`, e.second !== void 0 && (l += `:${e.second.toString().padStart(2, "0")}`)), l;
    }
  }
};
/**
 * 智能轉換：根據是否有時間資訊自動選擇類型
 */
be(ke, "convertToCalendarDateSmart", (e, t) => e ? e.hour !== void 0 || e.minute !== void 0 || e.second !== void 0 ? ke.convertToCalendarDateTime(e, t) : ke.convertToCalendarDate(e, t) : null), /**
 * 統一的轉換函數：SimpleDateValue → CalendarDate
 */
be(ke, "convertToCalendarDate", (e, t) => {
  if (!e) return null;
  try {
    if (t === "gregory")
      return new se(e.year, e.month, e.day);
    {
      const a = ke.createSafeCalendar(t), n = new se(e.year, e.month, e.day);
      return ke.safeToCalendar(n, a);
    }
  } catch (a) {
    return console.error("轉換為 CalendarDate 失敗:", a), null;
  }
}), /**
 * 統一的轉換函數：SimpleDateValue → CalendarDateTime (日期+時間)
 */
be(ke, "convertToCalendarDateTime", (e, t) => {
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
      const a = ke.createSafeCalendar(t), n = new lt(
        e.year,
        e.month,
        e.day,
        e.hour || 0,
        e.minute || 0,
        e.second || 0
      );
      return Ee(n, a);
    }
  } catch (a) {
    return console.error("轉換為 CalendarDateTime 失敗:", a), null;
  }
}), /**
 * 統一的轉換函數：CalendarDate → SimpleDateValue
 */
be(ke, "convertFromCalendarDate", (e, t) => {
  if (!e) return null;
  try {
    if (e.calendar.identifier === "gregory" || t === "gregory")
      return {
        year: e.year,
        month: e.month,
        day: e.day
      };
    {
      const a = ke.createSafeCalendar("gregory"), n = ke.safeToCalendar(e, a);
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
let de = ke;
const {
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
  isValidDate: oi,
  // parseInput,
  formatOutput: li
} = de;
ue.extend(rn);
ue.extend(sn);
ue.extend(cr);
ue.extend(vn);
ue.extend($n);
function rt() {
  const r = /* @__PURE__ */ new Date();
  return {
    year: r.getFullYear(),
    month: r.getMonth() + 1,
    day: r.getDate()
  };
}
function Qe() {
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
function Ze(r, e, t, a, n, o) {
  const l = { year: r, month: e, day: t };
  return a !== void 0 && (l.hour = a), n !== void 0 && (l.minute = n), o !== void 0 && (l.second = o), l;
}
function ge(r, e = "zh-TW", t = "gregory") {
  if (!r) return null;
  try {
    if (Yo(r))
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
      const a = Mn(r, e, t);
      return a.success ? a.date : null;
    }
    return null;
  } catch (a) {
    return console.error("Failed to parse date:", a), null;
  }
}
function xe(r, e = "YYYY-MM-DD") {
  if (!r) return null;
  try {
    return ue("2000-01-01 00:00:00").year(r.year).month(r.month - 1).date(r.day).hour(r.hour || 0).minute(r.minute || 0).second(r.second || 0).format(e);
  } catch (t) {
    return console.error("Failed to format date:", t), null;
  }
}
function Wt(r, e = "iso", t, a = !1, n = "gregory", o = "zh-TW", l = !1) {
  if (!r) return null;
  try {
    switch (e) {
      case "iso":
        return a ? xe(r, l ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD HH:mm:ss") : xe(r, "YYYY-MM-DD");
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
        return de.formatOutput(r, s, n, o);
      default:
        return console.warn(`不支援的輸出類型: ${e}，回退到 ISO 格式`), xe(r, "YYYY-MM-DD");
    }
  } catch (s) {
    return console.error("formatOutput 失敗:", s), r;
  }
}
function jt(r, e) {
  const t = r.year * 1e4 + r.month * 100 + r.day, a = e.year * 1e4 + e.month * 100 + e.day;
  return t < a ? -1 : t > a ? 1 : 0;
}
function fa(r, e) {
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
function or(r, e) {
  const t = new Date(r.year, r.month - 1, r.day).getTime(), a = new Date(e.year, e.month - 1, e.day).getTime();
  return Math.ceil((a - t) / (1e3 * 60 * 60 * 24));
}
function So() {
  const r = Qe(), e = Ze(r.year, r.month, 1, 0, 0, 0), t = r.month === 12 ? 1 : r.month + 1, a = r.month === 12 ? r.year + 1 : r.year, n = Ze(a, t, 1), o = fa(n, -1);
  return { start: e, end: o };
}
function wo(r) {
  const e = ["YYYY", "YY", "MM", "M", "DD", "D"], t = r.replace(/[^\w]/g, " "), a = t.includes("YYYY") || t.includes("YY"), n = t.includes("MM") || t.includes("M"), o = t.includes("DD") || t.includes("D"), s = t.split(/\s+/).filter(Boolean).some((i) => !!(/^[yY]{1,4}$/.test(i) && !e.includes(i) || /^[mM]{1,2}$/.test(i) && !e.includes(i) || /^[dD]{1,2}$/.test(i) && !e.includes(i)));
  return a && n && o && !s;
}
function ko(r) {
  const e = ["HH", "H", "mm", "m", "ss", "s", "a", "A"], t = r.replace(/[^\w]/g, " "), a = t.includes("HH") || t.includes("H"), n = t.includes("mm") || t.includes("m"), l = t.split(/\s+/).filter(Boolean).some((s) => !!(/^[hH]{1,2}$/.test(s) && !e.includes(s) || /^[mM]{1,2}$/.test(s) && !e.includes(s) || /^[sS]{1,2}$/.test(s) && !e.includes(s)));
  return a && n && !l;
}
function To(r) {
  return r.replace(/yyyy/g, "YYYY").replace(/yy/g, "YY").replace(/mm/g, "MM").replace(/dd/g, "DD");
}
function xo(r) {
  return r.replace(/hh/g, "HH");
}
function Yo(r) {
  return r && typeof r == "object" && typeof r.year == "number" && typeof r.month == "number" && typeof r.day == "number";
}
const Ro = { class: "date-input-container flex items-center justify-start" }, Co = ["placeholder", "aria-invalid", "aria-errormessage"], Eo = ["placeholder", "aria-invalid", "aria-errormessage"], Io = ["placeholder", "aria-invalid", "aria-errormessage"], Oo = {
  key: 3,
  class: "text-gray-400"
}, Fo = /* @__PURE__ */ Re({
  __name: "DateInput",
  props: {
    modelValue: { default: null },
    yearPlaceholder: { default: "" },
    monthPlaceholder: { default: "" },
    dayPlaceholder: { default: "" },
    minDate: { default: null },
    maxDate: { default: null },
    required: { type: Boolean, default: !0 },
    separator: { default: "-" },
    dateFormat: { default: "YYYY-MM-DD" }
  },
  emits: ["update:modelValue", "validation", "complete"],
  setup(r, { expose: e, emit: t }) {
    const a = {
      mounted: Xe.mounted,
      updated: Xe.updated,
      beforeUnmount: Xe.beforeUnmount
    }, n = r, o = t, l = W(""), s = W(""), i = W(""), d = W({}), p = W({}), g = W(null), v = W(!1), M = W(!1), w = W(null), m = W(/* @__PURE__ */ new Map()), f = (R, T) => {
      R && R instanceof HTMLInputElement ? m.value.set(T, R) : m.value.delete(T);
    }, c = (R) => m.value.get(R), D = E(() => {
      const R = {};
      return Object.entries(d.value).forEach(([T, P]) => {
        R[T] = P.key;
      }), R;
    }), b = E(() => Object.keys(d.value).length > 0), Y = E(() => Object.values(D.value)), S = E(() => {
      const R = n.dateFormat.toUpperCase(), T = [];
      return R.split(/[^A-Z]+/).filter(Boolean).forEach((Z) => {
        Z.includes("Y") ? T.push("year") : Z.includes("M") ? T.push("month") : Z.includes("D") && T.push("day");
      }), T.length !== 3 ? (console.warn(`Invalid date format: ${n.dateFormat}, falling back to YYYY-MM-DD`), ["year", "month", "day"]) : T;
    }), I = E(() => {
      if (!l.value || !s.value || !i.value)
        return null;
      const R = l.value.padStart(4, "0"), T = s.value.padStart(2, "0"), P = i.value.padStart(2, "0");
      return `${R}-${T}-${P}`;
    }), u = E(() => {
      if (!I.value) return null;
      const R = ue(I.value);
      return R.isValid() ? R.format(n.dateFormat) : null;
    });
    ye(() => n.modelValue, (R) => {
      if (v.value || (v.value = !0), R) {
        const T = ge(R);
        T && (l.value = T.year.toString(), s.value = T.month.toString().padStart(2, "0"), i.value = T.day.toString().padStart(2, "0"));
      } else
        l.value = "", s.value = "", i.value = "";
      R || (w.value = null, M.value = !1);
    }, { immediate: !0 });
    const h = () => {
      if (S.value.length === 0) return;
      const R = S.value[0], T = c(R);
      if (T && typeof T.focus == "function")
        try {
          T.focus();
        } catch (P) {
          console.warn("無法聚焦到輸入框:", P);
        }
      else
        for (const P of S.value) {
          const Z = c(P);
          if (Z && typeof Z.focus == "function")
            try {
              Z.focus();
              break;
            } catch (j) {
              console.warn("無法聚焦到輸入框:", j);
            }
        }
    }, y = (R) => {
      const T = c(R);
      if (T && typeof T.focus == "function")
        try {
          T.focus();
        } catch (P) {
          console.warn(`無法聚焦到 ${R} 輸入框:`, P);
        }
    }, B = (R, T) => {
      const P = c(R);
      if (P)
        try {
          if (typeof P.focus == "function" && P.focus(), typeof P.setSelectionRange == "function") {
            const Z = T === "end" ? P.value.length : 0;
            P.setSelectionRange(Z, Z);
          }
        } catch (Z) {
          console.warn(`無法聚焦或設置游標位置到 ${R} 輸入框:`, Z);
        }
    }, N = (R, T) => {
      const P = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return T === 2 ? Ia(R) ? 29 : 28 : P[T];
    }, _ = (R, T) => {
      if (!T) return { valid: !0 };
      const P = parseInt(T);
      switch (R) {
        case "year":
          if (T.length < 4) return { valid: !0 };
          const Z = n.maxDate ? ue(n.maxDate).year() : (/* @__PURE__ */ new Date()).getFullYear() + 50, j = n.minDate ? ue(n.minDate).year() : 1;
          if (!Ge(T) || P < j || P > Z)
            return { valid: !1, error: { key: "year.outOfRange", params: { min: j, max: Z } } };
          if (s.value === "02" && i.value === "29" && !Ia(P))
            return { valid: !1, error: { key: "year.notLeapYear", params: { year: P } } };
          break;
        case "month":
          if (!Ge(T) || P < 1 || P > 12)
            return { valid: !1, error: { key: "month.outOfRange" } };
          if (i.value && l.value) {
            const ae = parseInt(l.value), z = N(ae, P);
            if (parseInt(i.value) > z)
              return { valid: !1, error: { key: "day.notExistInMonth", params: { month: T, maxDays: z } } };
          }
          break;
        case "day":
          if (!Ge(T) || P < 1 || P > 31)
            return { valid: !1, error: { key: "day.outOfRange" } };
          if (l.value && s.value) {
            const ae = parseInt(l.value), z = parseInt(s.value), k = N(ae, z);
            if (P > k)
              return z === 2 && P === 29 ? { valid: !1, error: { key: "year.notLeapYear", params: { year: ae } } } : { valid: !1, error: { key: "day.notExistInMonth", params: { month: s.value, maxDays: k } } };
          }
          break;
      }
      return d.value[R] && (delete d.value[R], delete p.value[R]), { valid: !0 };
    }, U = () => {
      if (!v.value) return;
      d.value = {}, p.value = {};
      const R = _("year", l.value), T = _("month", s.value), P = _("day", i.value);
      if (!R.valid && R.error && (d.value.year = R.error, R.error.params && (p.value.year = R.error.params)), !T.valid && T.error && (d.value.month = T.error, T.error.params && (p.value.month = T.error.params)), !P.valid && P.error && (d.value.day = P.error, P.error.params && (p.value.day = P.error.params)), n.required && (l.value || (d.value.year = { key: "year.required" }), s.value || (d.value.month = { key: "month.required" }), i.value || (d.value.day = { key: "day.required" })), I.value && Object.keys(d.value).length === 0) {
        const Z = ue(I.value);
        if (!Z.isValid())
          d.value.day = { key: "day.invalid" };
        else if (n.minDate && Z.isBefore(ue(n.minDate)))
          d.value.day = {
            key: "date.beforeMin",
            params: { minDate: ue(n.minDate).format(n.dateFormat) }
          }, p.value.day = { minDate: ue(n.minDate).format(n.dateFormat) };
        else if (n.maxDate && Z.isAfter(ue(n.maxDate)))
          d.value.day = {
            key: "date.afterMax",
            params: { maxDate: ue(n.maxDate).format(n.dateFormat) }
          }, p.value.day = { maxDate: ue(n.maxDate).format(n.dateFormat) };
        else if (u.value) {
          o("update:modelValue", u.value);
          const j = u.value;
          j !== w.value && !M.value && (w.value = j, o("complete", u.value));
        }
      } else v.value && !l.value && !s.value && !i.value && (o("update:modelValue", null), w.value = null);
      o("validation", !b.value, D.value, p.value);
    }, te = () => {
      l.value = "", s.value = "", i.value = "", d.value = {};
    }, ee = (R) => {
      const T = S.value.findIndex((Z) => Z === R), P = T < S.value.length - 1 ? S.value[T + 1] : null;
      P ? Te(() => {
        y(P);
      }) : U();
    }, C = (R, T, P, Z) => {
      const j = T.replace(/\D/g, "");
      if (j.length === 1 && M.value && (M.value = !1), j.length <= P) {
        if (Z && j.length === 1 && parseInt(j) > Z) {
          const ae = j.padStart(2, "0");
          R === "year" ? l.value = ae : R === "month" ? s.value = ae : R === "day" && (i.value = ae), ee(R);
        } else
          R === "year" ? l.value = j : R === "month" ? s.value = j : R === "day" && (i.value = j);
        j.length === P && ee(R);
      }
    }, F = (R) => {
      const T = R.target;
      C("year", T.value, 4);
    }, $ = (R) => {
      const T = R.target;
      C("month", T.value, 2, 1);
    }, H = (R) => {
      const T = R.target;
      C("day", T.value, 2, 3);
    }, A = () => {
      Te(() => {
        if (S.value.length === 0) return;
        const R = S.value[S.value.length - 1], T = c(R);
        if (T && typeof T.focus == "function")
          try {
            T.focus();
            const P = T.value.length;
            T.setSelectionRange(P, P);
          } catch (P) {
            console.warn("無法聚焦到最後一個輸入框:", P);
          }
      });
    }, X = (R, T) => {
      const P = R.target, Z = S.value.findIndex((z) => z === T), j = Z > 0 ? S.value[Z - 1] : null, ae = Z < S.value.length - 1 ? S.value[Z + 1] : null;
      R.key === "Backspace" && P.value === "" && j && (R.preventDefault(), M.value = !0, B(j, "end")), R.key === "ArrowLeft" && P.selectionStart === 0 && j && (R.preventDefault(), M.value = !0, B(j, "end")), R.key === "ArrowRight" && P.selectionStart === P.value.length && ae && (R.preventDefault(), M.value = !0, B(ae, "start")), R.key === "Enter" && U();
    }, ie = (R) => {
      g.value = R;
    }, ne = (R) => {
      U(), g.value = null;
    };
    return e({
      validate: U,
      reset: () => {
        te(), o("update:modelValue", null);
      },
      getErrors: () => ({ ...d.value }),
      hasErrors: () => b.value,
      errorMessages: () => Y.value,
      focus: h,
      focusLast: A,
      setDate: (R) => {
        if (R) {
          const T = ge(R);
          T && (l.value = T.year.toString(), s.value = T.month.toString().padStart(2, "0"), i.value = T.day.toString().padStart(2, "0"), U());
        } else
          te(), o("update:modelValue", null);
      },
      resetCompletionState: () => {
        M.value = !1, w.value = null;
      }
    }), (R, T) => (L(), q("div", Ro, [
      (L(!0), q(Se, null, Me(S.value, (P, Z) => (L(), q(Se, { key: P }, [
        P === "year" ? Oe((L(), q("input", {
          key: 0,
          ref_for: !0,
          ref: (j) => f(j, "year"),
          "onUpdate:modelValue": T[0] || (T[0] = (j) => l.value = j),
          type: "text",
          inputmode: "numeric",
          placeholder: R.yearPlaceholder,
          maxlength: 4,
          class: "date-input text-sm text-center active:bg-vdt-theme-100",
          onInput: F,
          onKeydown: T[1] || (T[1] = (j) => X(j, "year")),
          onFocus: T[2] || (T[2] = (j) => ie("year")),
          onBlur: T[3] || (T[3] = (j) => ne()),
          "aria-label": "year",
          "aria-invalid": !!D.value.year,
          "aria-errormessage": D.value.year ? "year-error" : void 0
        }, null, 40, Co)), [
          [Je, l.value],
          [a, 20]
        ]) : P === "month" ? Oe((L(), q("input", {
          key: 1,
          ref_for: !0,
          ref: (j) => f(j, "month"),
          "onUpdate:modelValue": T[4] || (T[4] = (j) => s.value = j),
          type: "text",
          inputmode: "numeric",
          placeholder: R.monthPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: $,
          onKeydown: T[5] || (T[5] = (j) => X(j, "month")),
          onFocus: T[6] || (T[6] = (j) => ie("month")),
          onBlur: T[7] || (T[7] = (j) => ne()),
          "aria-label": "month",
          "aria-invalid": !!D.value.month,
          "aria-errormessage": D.value.month ? "month-error" : void 0
        }, null, 40, Eo)), [
          [Je, s.value],
          [a, 20]
        ]) : P === "day" ? Oe((L(), q("input", {
          key: 2,
          ref_for: !0,
          ref: (j) => f(j, "day"),
          "onUpdate:modelValue": T[8] || (T[8] = (j) => i.value = j),
          type: "text",
          inputmode: "numeric",
          placeholder: R.dayPlaceholder,
          maxlength: 2,
          class: "date-input text-sm text-center",
          onInput: H,
          onKeydown: T[9] || (T[9] = (j) => X(j, "day")),
          onFocus: T[10] || (T[10] = (j) => ie("day")),
          onBlur: T[11] || (T[11] = (j) => ne()),
          "aria-label": "day",
          "aria-invalid": !!D.value.day,
          "aria-errormessage": D.value.day ? "day-error" : void 0
        }, null, 40, Io)), [
          [Je, i.value],
          [a, 20]
        ]) : fe("", !0),
        Z < S.value.length - 1 ? (L(), q("span", Oo, oe(R.separator), 1)) : fe("", !0)
      ], 64))), 128))
    ]));
  }
}), qe = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [a, n] of e)
    t[a] = n;
  return t;
}, ma = /* @__PURE__ */ qe(Fo, [["__scopeId", "data-v-6f94f3cd"]]), Vo = { class: "time-input-container flex items-center justify-center" }, Ao = ["placeholder", "aria-invalid", "aria-errormessage"], Po = ["placeholder", "aria-invalid", "aria-errormessage"], Lo = ["placeholder", "aria-invalid", "aria-errormessage"], Bo = /* @__PURE__ */ Re({
  __name: "TimeInput",
  props: {
    modelValue: { default: null },
    hourPlaceholder: { default: "HH" },
    minutePlaceholder: { default: "MM" },
    secondPlaceholder: { default: "SS" },
    enableSeconds: { type: Boolean, default: !1 },
    use24Hour: { type: Boolean, default: !0 },
    required: { type: Boolean, default: !1 },
    locale: { default: "zh-TW" },
    useLocalizedPeriod: { type: Boolean, default: !1 },
    minuteStep: { default: 1 }
  },
  emits: ["update:modelValue", "validation", "complete", "navigate-to-date"],
  setup(r, { expose: e, emit: t }) {
    const a = {
      mounted: Xe.mounted,
      updated: Xe.updated,
      beforeUnmount: Xe.beforeUnmount
    }, n = r, o = t, l = W(""), s = W(""), i = W(""), d = W("AM"), p = W({}), g = W({}), v = W(null), M = W(!1), w = W(), m = W(), f = W(), c = E(() => Object.keys(p.value).length > 0), D = E(() => {
      const C = {};
      return Object.entries(p.value).forEach(([F, $]) => {
        C[F] = $.key;
      }), C;
    }), b = () => {
      l.value = "", s.value = "", i.value = "", d.value = "AM";
    }, Y = E(() => {
      var C, F;
      if (!n.useLocalizedPeriod) return d.value;
      try {
        const $ = /* @__PURE__ */ new Date();
        $.setHours(9, 0, 0);
        const H = /* @__PURE__ */ new Date();
        H.setHours(15, 0, 0);
        const A = new Intl.DateTimeFormat(n.locale, {
          hour: "numeric",
          hour12: !0
        }), X = A.formatToParts($), ie = A.formatToParts(H), ne = ((C = X.find((T) => T.type === "dayPeriod")) == null ? void 0 : C.value) || "AM", R = ((F = ie.find((T) => T.type === "dayPeriod")) == null ? void 0 : F.value) || "PM";
        return d.value === "AM" ? ne : R;
      } catch ($) {
        return console.error("Error getting localized period:", $), d.value;
      }
    }), S = E(() => Y.value), I = E(() => {
      if (l.value === "" || s.value === "" || n.enableSeconds && i.value === "")
        return null;
      let C = parseInt(l.value, 10);
      n.use24Hour || (d.value === "PM" && C < 12 ? C += 12 : d.value === "AM" && C === 12 && (C = 0));
      const F = C.toString().padStart(2, "0"), $ = s.value.padStart(2, "0");
      if (n.enableSeconds) {
        const H = i.value.padStart(2, "0");
        return `${F}:${$}:${H}`;
      } else
        return `${F}:${$}`;
    });
    ye(() => n.modelValue, (C) => {
      if (M.value || (M.value = !0), C) {
        const F = C.split(":");
        let $ = parseInt(F[0] || "0", 10);
        const H = F[1] || "", A = F[2] || "";
        n.use24Hour || ($ >= 12 ? (d.value = "PM", $ = $ === 12 ? 12 : $ - 12) : (d.value = "AM", $ = $ === 0 ? 12 : $)), l.value = $.toString().padStart(2, "0"), s.value = H, n.enableSeconds && (i.value = A);
      } else
        b();
    }, { immediate: !0 });
    const u = (C, F) => {
      if (!F) return { valid: !0 };
      const $ = parseInt(F);
      switch (C) {
        case "hour":
          const H = n.use24Hour ? 23 : 12, A = n.use24Hour ? 0 : 1;
          if (!Ge(F) || $ < A || $ > H)
            return { valid: !1, error: { key: "time.hourOutOfRange", params: { min: A, max: H } } };
          break;
        case "minute":
          if (!Ge(F) || $ < 0 || $ > 59)
            return { valid: !1, error: { key: "time.minuteOutOfRange", params: { min: 0, max: 59 } } };
          if (n.minuteStep > 1 && $ % n.minuteStep !== 0)
            return { valid: !1, error: { key: "time.minuteStepInvalid", params: { step: n.minuteStep } } };
          break;
        case "second":
          if (!Ge(F) || $ < 0 || $ > 59)
            return { valid: !1, error: { key: "time.secondOutOfRange", params: { min: 0, max: 59 } } };
          break;
      }
      return p.value[C] && (delete p.value[C], delete g.value[C]), { valid: !0 };
    }, h = () => {
      d.value = d.value === "AM" ? "PM" : "AM", y();
    }, y = () => {
      if (!M.value) return;
      p.value = {}, g.value = {};
      const C = u("hour", l.value), F = u("minute", s.value), $ = n.enableSeconds ? u("second", i.value) : { valid: !0 };
      !C.valid && C.error && (p.value.hour = C.error, C.error.params && (g.value.hour = C.error.params)), !F.valid && F.error && (p.value.minute = F.error, F.error.params && (g.value.minute = F.error.params)), !$.valid && $.error && (p.value.second = $.error, $.error.params && (g.value.second = $.error.params)), n.required && (l.value || (p.value.hour = { key: "time.hourRequired" }), s.value || (p.value.minute = { key: "time.minuteRequired" }), n.enableSeconds && !i.value && (p.value.second = { key: "time.secondRequired" })), o("validation", !c.value, D.value, g.value), I.value ? (o("update:modelValue", I.value), o("complete", I.value)) : M.value && o("update:modelValue", null);
    }, B = (C) => {
      const $ = C.target.value.replace(/\D/g, "");
      if ($.length <= 2) {
        if (l.value = $, !u("hour", $).valid) return;
        ($.length === 2 || n.use24Hour && parseInt($) > 2 || !n.use24Hour && parseInt($) > 1) && Te(() => {
          var A;
          (A = m.value) == null || A.focus();
        });
      }
    }, N = (C) => {
      const $ = C.target.value.replace(/\D/g, "");
      if ($.length <= 2) {
        if ($.length === 1 && parseInt($) > 5 ? (s.value = $.padStart(2, "0"), Te(() => {
          n.enableSeconds && f.value ? f.value.focus() : y();
        })) : s.value = $, !u("minute", $).valid) return;
        $.length === 2 && Te(() => {
          n.enableSeconds && f.value ? f.value.focus() : y();
        });
      }
    }, _ = (C) => {
      const $ = C.target.value.replace(/\D/g, "");
      if ($.length <= 2) {
        if ($.length === 1 && parseInt($) > 5 ? (i.value = $.padStart(2, "0"), y()) : i.value = $, !u("second", $).valid) return;
        $.length === 2 && y();
      }
    }, U = (C, F) => {
      var H, A, X, ie, ne, R, T, P, Z, j, ae, z;
      const $ = C.target;
      if (C.key === "Backspace" && $.value === "")
        switch (F) {
          case "hour":
            C.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            C.preventDefault(), (H = w.value) == null || H.focus(), (A = w.value) == null || A.setSelectionRange(-1, -1);
            break;
          case "second":
            C.preventDefault(), (X = m.value) == null || X.focus(), (ie = m.value) == null || ie.setSelectionRange(-1, -1);
            break;
        }
      if (C.key === "ArrowLeft" && $.selectionStart === 0)
        switch (F) {
          case "hour":
            C.preventDefault(), o("navigate-to-date");
            break;
          case "minute":
            C.preventDefault(), (ne = w.value) == null || ne.focus(), (R = w.value) == null || R.setSelectionRange(-1, -1);
            break;
          case "second":
            C.preventDefault(), (T = m.value) == null || T.focus(), (P = m.value) == null || P.setSelectionRange(-1, -1);
            break;
        }
      if (C.key === "ArrowRight" && $.selectionStart === $.value.length)
        switch (F) {
          case "hour":
            C.preventDefault(), (Z = m.value) == null || Z.focus(), (j = m.value) == null || j.setSelectionRange(0, 0);
            break;
          case "minute":
            n.enableSeconds && (C.preventDefault(), (ae = f.value) == null || ae.focus(), (z = f.value) == null || z.setSelectionRange(0, 0));
            break;
        }
      C.key === "Enter" && y();
    }, te = (C) => {
      v.value = C;
    }, ee = (C) => {
      v.value = null, y();
    };
    return e({
      validate: y,
      reset: () => {
        b(), p.value = {}, g.value = {}, o("update:modelValue", null);
      },
      getErrors: () => D.value,
      hasErrors: c,
      setTime: (C) => {
        if (C) {
          const [F, $, H] = C.split(":");
          let A = parseInt(F);
          n.use24Hour || (A >= 12 ? (d.value = "PM", A = A === 12 ? 12 : A - 12) : (d.value = "AM", A = A === 0 ? 12 : A)), l.value = A.toString().padStart(2, "0"), s.value = $, n.enableSeconds && H && (i.value = H), y();
        } else
          b(), o("update:modelValue", null);
      },
      focus: () => {
        var C;
        (C = w.value) == null || C.focus();
      },
      focusLast: () => {
        n.enableSeconds && f.value ? (f.value.focus(), f.value.setSelectionRange(0, 0)) : m.value ? (m.value.focus(), m.value.setSelectionRange(0, 0)) : w.value && (w.value.focus(), w.value.setSelectionRange(0, 0));
      }
    }), (C, F) => (L(), q("div", Vo, [
      Oe(J("input", {
        ref_key: "hourRef",
        ref: w,
        "onUpdate:modelValue": F[0] || (F[0] = ($) => l.value = $),
        type: "text",
        inputmode: "numeric",
        placeholder: C.hourPlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: B,
        onKeydown: F[1] || (F[1] = ($) => U($, "hour")),
        onFocus: F[2] || (F[2] = ($) => te("hour")),
        onBlur: F[3] || (F[3] = ($) => ee()),
        "aria-label": "hour",
        "aria-invalid": !!p.value.hour,
        "aria-errormessage": p.value.hour ? "hour-error" : void 0
      }, null, 40, Ao), [
        [Je, l.value],
        [a, 20]
      ]),
      F[13] || (F[13] = J("span", { class: "text-gray-400 mx-1" }, ":", -1)),
      Oe(J("input", {
        ref_key: "minuteRef",
        ref: m,
        "onUpdate:modelValue": F[4] || (F[4] = ($) => s.value = $),
        type: "text",
        inputmode: "numeric",
        placeholder: C.minutePlaceholder,
        maxlength: 2,
        class: "time-input text-sm text-center",
        onInput: N,
        onKeydown: F[5] || (F[5] = ($) => U($, "minute")),
        onFocus: F[6] || (F[6] = ($) => te("minute")),
        onBlur: F[7] || (F[7] = ($) => ee()),
        "aria-label": "minute",
        "aria-invalid": !!p.value.minute,
        "aria-errormessage": p.value.minute ? "minute-error" : void 0
      }, null, 40, Po), [
        [Je, s.value],
        [a, 20]
      ]),
      C.enableSeconds ? (L(), q(Se, { key: 0 }, [
        F[12] || (F[12] = J("span", { class: "text-gray-400 mx-1" }, ":", -1)),
        Oe(J("input", {
          ref_key: "secondRef",
          ref: f,
          "onUpdate:modelValue": F[8] || (F[8] = ($) => i.value = $),
          type: "text",
          inputmode: "numeric",
          placeholder: C.secondPlaceholder,
          maxlength: 2,
          class: "time-input text-sm text-center",
          onInput: _,
          onKeydown: F[9] || (F[9] = ($) => U($, "second")),
          onFocus: F[10] || (F[10] = ($) => te("second")),
          onBlur: F[11] || (F[11] = ($) => ee()),
          "aria-label": "second",
          "aria-invalid": !!p.value.second,
          "aria-errormessage": p.value.second ? "second-error" : void 0
        }, null, 40, Lo), [
          [Je, i.value],
          [a, 20]
        ])
      ], 64)) : fe("", !0),
      C.use24Hour ? fe("", !0) : (L(), q("button", {
        key: 1,
        type: "button",
        class: Fe(["time-period pl-2 text-sm cursor-pointer", l.value ? "text-vdt-content" : "text-gray-400"]),
        onClick: Ie(h, ["stop"])
      }, oe(S.value), 3))
    ]));
  }
}), ha = /* @__PURE__ */ qe(Bo, [["__scopeId", "data-v-c217ec5e"]]), Ho = {
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
}, qo = {
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
}, No = {
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
}, Uo = {
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
}, zo = {
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
}, xt = {
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
class Wo {
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
}
function Dt(r = "en-US") {
  const e = new Wo(), t = ["zh-TW", "zh-CN", "en-US", "ja-JP", "ko-KR"], a = (g) => t.includes(g) ? g : (console.warn(`Locale "${g}" is not supported. Defaulting to "en-US".`), "en-US"), n = a(r), o = W(n);
  e.setLocale(n);
  const l = (g) => {
    o.value = a(g), e.setLocale(o.value);
  }, s = (g, v) => e.getMessage(g, v), i = (g, v) => e.getErrorMessage(g, v), d = (g, v) => e.getPlaceholderMessage(g, v), p = (g, v) => Vr(g, v);
  return {
    currentLocale: E(() => o.value),
    setLocale: l,
    getMessage: s,
    getErrorMessage: i,
    getPlaceholderMessage: d,
    formatText: p
  };
}
const jo = {
  key: 0,
  class: "mt-1 text-sm text-red-500"
}, Jo = { key: 0 }, _o = { key: 1 }, Ko = { key: 2 }, Ar = /* @__PURE__ */ Re({
  __name: "DateErrorMessage",
  props: {
    errors: { default: void 0 },
    errorParams: { default: () => ({}) },
    locale: { default: "zh-TW" },
    useI18n: { type: Boolean, default: !0 },
    customMessages: { default: () => ({}) },
    messageKeyMap: { default: () => ({}) },
    debug: { type: Boolean, default: !1 }
  },
  setup(r, { expose: e }) {
    const t = r, { currentLocale: a, setLocale: n, getErrorMessage: o } = Dt(t.locale);
    ye(() => t.locale, (f) => {
      f && t.useI18n && n(f);
    }, { immediate: !0 });
    const l = W({}), s = W({}), i = E(() => ({
      ...t.customMessages,
      ...l.value
    })), d = E(() => t.errors ? Array.isArray(t.errors) ? t.errors.length > 0 : typeof t.errors == "string" ? t.errors.trim().length > 0 : typeof t.errors == "object" ? Object.values(t.errors).some((f) => f && f.trim().length > 0) : !1 : !1), p = E(() => {
      if (!t.errors) return null;
      if (typeof t.errors == "string")
        return w(t.errors);
      if (Array.isArray(t.errors))
        return t.errors.map((f, c) => ({
          field: `item-${c}`,
          message: w(f),
          originalKey: f
        }));
      if (typeof t.errors == "object") {
        const f = {};
        return Object.entries(t.errors).forEach(([c, D]) => {
          var b;
          if (D) {
            s.value[c] = D;
            const Y = ((b = t.errorParams) == null ? void 0 : b[c]) || {};
            f[c] = w(D, c, Y), t.debug && console.log(`Processing error for field "${c}":`, {
              original: D,
              params: Y,
              translated: f[c],
              field: c,
              slotName: v(c)
            });
          }
        }), f;
      }
      return t.errors;
    });
    function g(f) {
      return s.value[f];
    }
    function v(f) {
      return `error-${f.replace(/^(date|time|range)\./, "")}`;
    }
    function M(f) {
      return f.startsWith("date.") ? "date" : f.startsWith("time.") ? "time" : f.startsWith("range.") ? "range" : "unknown";
    }
    function w(f, c, D = {}) {
      if (t.debug && console.log(`翻譯訊息: "${f}", field: "${c}", params:`, D), i.value[f])
        return i.value[f];
      if (!t.useI18n)
        return f;
      if (/^[a-zA-Z]+\.[a-zA-Z]+$/.test(f))
        try {
          const S = o(f, D);
          if (t.debug && console.log(`Locale key 翻譯: "${f}" -> "${S}" with params:`, D), S && S !== f)
            return S;
        } catch (S) {
          t.debug && console.warn(`Locale key 翻譯失敗: ${f}`, S);
        }
      const Y = t.messageKeyMap[f];
      if (Y)
        try {
          const S = o(Y, D);
          if (t.debug && console.log(`MessageKeyMap 翻譯: "${f}" -> "${S}" with params:`, D), S && S !== Y)
            return S;
        } catch (S) {
          t.debug && console.warn(`MessageKeyMap 翻譯失敗: ${Y}`, S);
        }
      return m(f, c, D);
    }
    function m(f, c, D = {}) {
      t.debug && console.log(`smartTranslateError: "${f}", field: "${c}", params:`, D);
      const b = {
        請選擇日期: "date.required",
        請選擇時間: "time.required",
        請選擇開始日期: "range.startRequired",
        請選擇結束日期: "range.endRequired",
        "Please select a date": "date.required",
        "Please select a time": "time.required",
        "Please select start date": "range.startRequired",
        "Please select end date": "range.endRequired"
      };
      if (b[f])
        try {
          const u = o(b[f], D);
          if (t.debug && console.log(`直接匹配翻譯: "${f}" -> "${u}" with params:`, D), u && u !== b[f])
            return u;
        } catch (u) {
          t.debug && console.warn(`直接匹配翻譯失敗: ${b[f]}`, u);
        }
      function Y(u, h) {
        if (/請輸入|please enter|required/i.test(u)) {
          if (h != null && h.includes("year") || u.includes("年份")) return "year.required";
          if (h != null && h.includes("month") || u.includes("月份")) return "month.required";
          if (h != null && h.includes("day") || u.includes("日期")) return "day.required";
          if (h != null && h.includes("hour") || u.includes("小時")) return "time.hourRequired";
          if (h != null && h.includes("minute") || u.includes("分鐘")) return "time.minuteRequired";
          if (h != null && h.includes("second") || u.includes("秒鐘")) return "time.secondRequired";
          if (h != null && h.includes("startDate") || u.includes("開始日期")) return "range.startRequired";
          if (h != null && h.includes("endDate") || u.includes("結束日期")) return "range.endRequired";
          if (h != null && h.includes("time") || u.includes("時間")) return "time.required";
          if (h != null && h.includes("date") || u.includes("日期")) return "date.required";
        }
        return null;
      }
      const S = Y(f, c);
      if (S)
        try {
          const u = o(S, D);
          if (t.debug && console.log(`智能匹配翻譯: "${f}" -> "${u}" with params:`, D), u && u !== S)
            return u;
        } catch (u) {
          t.debug && console.warn(`智能匹配翻譯失敗: ${S}`, u);
        }
      const I = [
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
      for (const u of I)
        if (u.regex.test(f)) {
          const h = u.handler ? u.handler(c) : u.key;
          if (h)
            try {
              const y = o(h, D);
              if (t.debug && console.log(`模式匹配翻譯: "${f}" -> "${y}" (key: ${h}) with params:`, D), y && y !== h)
                return y;
            } catch (y) {
              t.debug && console.warn(`模式匹配翻譯失敗: ${h}`, y);
            }
        }
      return t.debug && console.log(`無法翻譯，返回原始訊息: "${f}"`), f;
    }
    return e({
      hasErrors: d,
      processedErrors: p,
      translateMessage: w,
      getOriginalKey: g,
      getSlotName: v,
      getFieldType: M,
      setLocale: (f) => {
        n(f);
      },
      addCustomTranslation: (f, c) => {
        l.value[f] = c;
      },
      currentLocale: a
    }), (f, c) => d.value ? (L(), q("div", jo, [
      Array.isArray(p.value) ? (L(), q("div", Jo, [
        (L(!0), q(Se, null, Me(p.value, (D, b) => (L(), q("div", { key: b }, [
          $e(f.$slots, `error-${D.field}`, {
            error: D,
            message: D.message,
            field: D.field
          }, () => [
            J("span", null, oe(D.message), 1)
          ])
        ]))), 128))
      ])) : typeof p.value == "string" ? (L(), q("div", _o, [
        $e(f.$slots, "error-single", {
          error: p.value,
          message: p.value
        }, () => [
          J("span", null, oe(p.value), 1)
        ])
      ])) : typeof p.value == "object" ? (L(), q("div", Ko, [
        (L(!0), q(Se, null, Me(p.value, (D, b) => (L(), q("div", { key: b }, [
          $e(f.$slots, v(b), {
            field: b,
            error: D,
            message: D,
            originalKey: g(b),
            fieldType: M(b)
          }, () => [
            J("span", null, oe(D), 1)
          ])
        ]))), 128))
      ])) : fe("", !0)
    ])) : fe("", !0);
  }
}), Qo = {}, Zo = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};
function Go(r, e) {
  return L(), q("svg", Zo, e[0] || (e[0] = [
    J("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    }, null, -1)
  ]));
}
const Pr = /* @__PURE__ */ qe(Qo, [["render", Go]]), Xo = {}, el = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
};
function tl(r, e) {
  return L(), q("svg", el, e[0] || (e[0] = [
    J("path", {
      "fill-rule": "evenodd",
      d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Lr = /* @__PURE__ */ qe(Xo, [["render", tl]]), al = {}, rl = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
};
function nl(r, e) {
  return L(), q("svg", rl, e[0] || (e[0] = [
    J("path", {
      "fill-rule": "evenodd",
      d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Br = /* @__PURE__ */ qe(al, [["render", nl]]), ol = { class: "p-2 flex items-center justify-between border-b border-vdt-outline" }, ll = ["disabled"], sl = { class: "text-sm font-medium" }, il = ["disabled"], ul = {
  key: 0,
  class: "grid grid-cols-4 gap-1 p-2"
}, cl = ["onClick", "title"], dl = { class: "font-medium" }, fl = { key: 0 }, ml = {
  key: 0,
  class: "text-xs opacity-60 mt-0.5"
}, hl = {
  key: 1,
  class: "p-4 text-center text-sm text-vdt-content-muted"
}, vl = { class: "mb-2" }, pl = { class: "p-2 border-t border-vdt-outline" }, gl = { class: "text-xs text-gray-400 mb-1" }, yl = ["placeholder", "min", "max"], $l = { class: "text-xs text-vdt-content-muted mt-1" }, Dl = /* @__PURE__ */ Re({
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
    const a = r, n = t, { getMessage: o, formatText: l } = Dt(a.locale), s = W(null), i = W(null), d = E(() => de.getCalendarRange(a.calendar)), p = E(() => de.getCalendarDisplayName(a.calendar, a.locale)), g = E(() => a.calendar === "gregory"), v = E(() => a.calendar === "japanese"), M = E(() => I.value[0]), w = E(() => I.value[I.value.length - 1]), m = W(0), f = ($) => {
      const H = Math.floor($ / a.pageSize) * a.pageSize;
      return Math.max(H, d.value.min);
    }, c = () => {
      m.value = f(a.selectedYear);
    }, D = /* @__PURE__ */ new Map(), b = ($, H) => {
      const A = `${$}-${H}`;
      if (!D.has(A))
        try {
          D.set(A, new zt(H, { calendar: $, year: "numeric", era: "short" }));
        } catch {
          D.set(A, new zt(H, { year: "numeric" }));
        }
      return D.get(A);
    }, Y = ($) => {
      var A, X;
      const H = {
        gregorianYear: $,
        displayEra: "",
        displayYear: $.toString(),
        showReference: !1,
        displayWarning: !1
      };
      if (g.value)
        return H;
      try {
        const ie = new se($, 6, 1), ne = de.safeToCalendar(ie, de.createSafeCalendar(a.calendar)), T = b(a.calendar, a.locale).formatToParts(ne.toDate("UTC"));
        H.displayYear = ((A = T.find((j) => j.type === "year")) == null ? void 0 : A.value) || $.toString(), H.displayEra = ((X = T.find((j) => j.type === "era")) == null ? void 0 : X.value) || "";
        const P = !!H.displayEra, Z = H.displayEra !== $.toString();
        (P || Z) && (H.showReference = !0, H.referenceYear = $.toString());
      } catch {
        if (H.displayWarning = !0, H.warningMessage = `無法轉換為${p.value}`, a.calendar === "roc") {
          const ne = $ - 1911;
          H.displayYear = ne > 0 ? ne.toString() : `民國前${Math.abs(ne - 1)}年`;
        }
      }
      return H;
    }, S = ($) => $ >= d.value.min && $ <= d.value.max, I = E(() => {
      const $ = m.value, H = [];
      for (let A = 0; A < a.pageSize; A++) {
        const X = $ + A;
        if (X > d.value.max) break;
        X < d.value.min || H.push(Y(X));
      }
      return H;
    }), u = E(() => {
      const $ = I.value;
      if ($.length === 0) return "";
      const H = $[0], A = $[$.length - 1];
      if (g.value)
        return `${H.displayYear} - ${A.displayYear}`;
      if (H.gregorianYear === A.gregorianYear)
        return H.displayYear;
      const X = H.displayEra, ie = A.displayEra;
      return X && ie && X === ie ? `${X} ${H.displayYear} - ${A.displayYear}` : `${H.displayEra} ${H.displayYear} - ${A.displayEra} ${A.displayYear}`;
    }), h = E(() => m.value > d.value.min), y = E(() => m.value + a.pageSize <= d.value.max), B = () => {
      h.value && (m.value = Math.max(
        m.value - a.pageSize,
        d.value.min
      ));
    }, N = () => {
      y.value && (m.value = Math.min(
        m.value + a.pageSize,
        d.value.max
      ));
    }, _ = ($) => {
      S($) && (n("year-selected", $), n("update:showSelector", !1));
    }, U = () => {
      i.value && (S(i.value) ? (m.value = f(i.value), n("year-selected", i.value), n("update:showSelector", !1), i.value = null) : console.warn(`年份 ${i.value} 超出範圍 ${d.value.min}-${d.value.max}`));
    }, te = () => {
      const $ = Math.max(d.value.min, Math.min((/* @__PURE__ */ new Date()).getFullYear(), d.value.max));
      n("year-selected", $);
    }, ee = ($) => o(`yearSelector.${$}`);
    ye([() => a.selectedYear, () => a.calendar], () => {
      S(a.selectedYear) && (m.value = f(a.selectedYear));
    }, { immediate: !0 });
    const F = ($) => {
      if (a.showSelector && s.value) {
        const H = $.target, A = !!H.closest("[data-year-selector-button]");
        !s.value.contains(H) && !A && n("update:showSelector", !1);
      }
    };
    return Jt(() => {
      c(), document.addEventListener("mousedown", F);
    }), $a(() => {
      document.removeEventListener("mousedown", F);
    }), e({
      getLocalizedText: ee,
      formatText: l,
      goToSpecificYear: U,
      goToValidRange: te
    }), ($, H) => $.showSelector ? (L(), q("div", {
      key: 0,
      ref_key: "yearSelectorRef",
      ref: s,
      class: "absolute top-full mt-1 right-0 min-w-56 max-h-72 overflow-auto bg-vdt-surface-elevated text-vdt-content border border-vdt-outline rounded-md shadow-lg z-20"
    }, [
      J("div", ol, [
        J("button", {
          type: "button",
          onClick: B,
          class: Fe(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !h.value }]),
          disabled: !h.value,
          "aria-label": "previous year"
        }, [
          me(Lr, { class: "h-4 w-4" })
        ], 10, ll),
        J("span", sl, [
          $e($.$slots, "year-range-display", {
            firstYear: M.value,
            lastYear: w.value,
            displayText: u.value
          }, () => [
            Ca(oe(u.value), 1)
          ], !0)
        ]),
        J("button", {
          type: "button",
          onClick: N,
          class: Fe(["p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none", { "opacity-50 cursor-not-allowed": !y.value }]),
          disabled: !y.value,
          "aria-label": "next year"
        }, [
          me(Br, { class: "h-4 w-4" })
        ], 10, il)
      ]),
      I.value.length > 0 ? (L(), q("div", ul, [
        (L(!0), q(Se, null, Me(I.value, (A) => (L(), q("button", {
          type: "button",
          key: A.gregorianYear,
          onClick: (X) => _(A.gregorianYear),
          class: Fe([
            "p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200",
            $.selectedYear === A.gregorianYear ? "bg-vdt-theme-500 text-white" : "hover:bg-vdt-interactive-hover text-vdt-content",
            A.displayWarning ? "ring-1 ring-amber-400" : ""
          ]),
          title: A.warningMessage
        }, [
          $e($.$slots, "year-display", {
            yearData: A,
            isSelected: $.selectedYear === A.gregorianYear
          }, () => [
            J("div", dl, [
              v.value ? (L(), q("div", fl, oe(A.displayEra), 1)) : fe("", !0),
              Ca(" " + oe(A.displayYear), 1)
            ]),
            A.showReference ? (L(), q("div", ml, oe(A.referenceYear), 1)) : fe("", !0)
          ], !0)
        ], 10, cl))), 128))
      ])) : (L(), q("div", hl, [
        $e($.$slots, "no-years-display", {
          calendarRange: d.value,
          goToValidRange: te
        }, () => [
          J("div", vl, oe(ee("noYearsToDisplay")), 1),
          J("button", {
            type: "button",
            onClick: te,
            class: "text-xs bg-vdt-theme-100 hover:bg-vdt-theme-200 px-3 py-1 rounded text-vdt-theme-700"
          }, oe(ee("returnToValidRange")), 1)
        ], !0)
      ])),
      J("div", pl, [
        $e($.$slots, "year-input", {
          yearInput: i.value,
          calendarRange: d.value,
          calendarDisplayName: p.value,
          goToSpecificYear: U,
          getLocalizedText: ee,
          formatText: O(l)
        }, () => [
          J("div", gl, oe(ee("jumpToYear")), 1),
          Oe(J("input", {
            type: "number",
            "onUpdate:modelValue": H[0] || (H[0] = (A) => i.value = A),
            onKeydown: Pe(U, ["enter"]),
            placeholder: ee("inputYearPlaceholder"),
            min: d.value.min,
            max: d.value.max,
            class: "w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500"
          }, null, 40, yl), [
            [Je, i.value]
          ]),
          J("div", $l, oe(O(l)(ee("yearRangeInfo"), {
            calendar: p.value,
            min: d.value.min,
            max: d.value.max
          })), 1)
        ], !0)
      ])
    ], 512)) : fe("", !0);
  }
}), bl = /* @__PURE__ */ qe(Dl, [["__scopeId", "data-v-f14c8987"]]), Ml = { class: "flex justify-between items-center mb-4 gap-2" }, Sl = ["disabled"], wl = { class: "grow grid grid-cols-2 gap-2" }, kl = ["value"], Tl = { class: "relative" }, xl = ["disabled"], Yl = /* @__PURE__ */ Re({
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
    const t = r, a = e, n = W(t.month), o = W(t.year), l = W(!1), s = E(() => t.calendar || "gregory"), i = E(() => de.getCalendarRange(t.calendar));
    ye(() => t.month, (b) => {
      n.value = b;
    }, { immediate: !0 }), ye(() => t.year, (b) => {
      o.value = b;
    }, { immediate: !0 });
    const d = E(() => {
      if (t.calendar === "gregory")
        return o.value.toString();
      try {
        const b = new se(o.value, 6, 1), Y = de.safeToCalendar(
          b,
          de.createSafeCalendar(t.calendar)
        );
        return new zt(t.locale, {
          calendar: t.calendar,
          year: "numeric"
        }).format(Y.toDate("UTC"));
      } catch {
        return o.value.toString();
      }
    }), p = E(() => de.getMonthNames(t.locale, t.calendar)), g = E(() => {
      let b = o.value, Y = n.value - 1;
      return Y < 1 && (Y = 12, b = o.value - 1), b >= i.value.min;
    }), v = E(() => {
      let b = o.value, Y = n.value + 1;
      return Y > 12 && (Y = 1, b = o.value + 1), b <= i.value.max;
    }), M = () => {
      if (!g.value) return;
      let b = n.value - 1, Y = o.value;
      b < 1 && (b = 12, Y -= 1), Y >= i.value.min && c(b, Y);
    }, w = () => {
      if (!v.value) return;
      let b = n.value + 1, Y = o.value;
      b > 12 && (b = 1, Y += 1), Y <= i.value.max && c(b, Y);
    }, m = () => {
      c(n.value, o.value);
    }, f = (b) => {
      b >= i.value.min && b <= i.value.max && (o.value = b, c(n.value, b));
    }, c = (b, Y) => {
      n.value = b, o.value = Y, a("update:month", b), a("update:year", Y);
    }, D = () => {
      l.value = !l.value;
    };
    return (b, Y) => (L(), q("div", Ml, [
      J("button", {
        type: "button",
        onClick: M,
        class: "p-2 hover:bg-gray-100 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "上個月",
        disabled: !g.value
      }, [
        me(Lr, { class: "h-5 w-5" })
      ], 8, Sl),
      J("div", wl, [
        $e(b.$slots, "month-selector", {
          monthNames: p.value,
          selectedMonth: n.value,
          onMonthChange: m
        }, () => [
          Oe(J("select", {
            "onUpdate:modelValue": Y[0] || (Y[0] = (S) => n.value = S),
            onChange: m,
            class: "form-select appearance-none bg-none bg-vdt-surface text-vdt-content py-1 pl-2 w-full border border-vdt-outline rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500",
            "aria-label": "選擇月份",
            role: "combobox"
          }, [
            (L(!0), q(Se, null, Me(p.value, (S, I) => (L(), q("option", {
              key: I,
              value: I + 1
            }, oe(S), 9, kl))), 128))
          ], 544), [
            [Ct, n.value]
          ])
        ], !0),
        J("div", Tl, [
          $e(b.$slots, "year-selector", {
            displayYear: d.value,
            toggleYearSelector: D,
            showYearSelector: l.value
          }, () => [
            J("button", {
              type: "button",
              onClick: D,
              "data-year-selector-button": "",
              class: "inline-flex items-center px-2 py-1 bg-vdt-surface text-vdt-content w-full border border-vdt-outline rounded-sm text-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200",
              "aria-label": "選擇年份"
            }, oe(d.value), 1)
          ], !0),
          me(bl, {
            "selected-year": o.value,
            "show-selector": l.value,
            "onUpdate:showSelector": Y[1] || (Y[1] = (S) => l.value = S),
            calendar: s.value,
            locale: b.locale,
            onYearSelected: f
          }, mt({ _: 2 }, [
            Me(b.$slots, (S, I) => ({
              name: I,
              fn: ht((u) => [
                $e(b.$slots, I, vt(pt(u)), void 0, !0)
              ])
            }))
          ]), 1032, ["selected-year", "show-selector", "calendar", "locale"])
        ])
      ]),
      J("button", {
        type: "button",
        onClick: w,
        class: "p-2 hover:bg-gray-100 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "下個月",
        disabled: !v.value
      }, [
        me(Br, { class: "h-5 w-5" })
      ], 8, xl)
    ]));
  }
}), Rl = /* @__PURE__ */ qe(Yl, [["__scopeId", "data-v-96fd06ce"]]), Cl = { class: "grid grid-cols-7 mb-2" }, El = /* @__PURE__ */ Re({
  __name: "WeekdayHeader",
  props: {
    locale: { default: "en-US" },
    weekStartsOn: { default: 0 },
    calendar: { default: "gregory" }
  },
  setup(r) {
    const e = r, t = E(() => {
      const a = new Intl.DateTimeFormat(e.locale, {
        weekday: "short",
        calendar: e.calendar
      }), n = new Date(2023, 0, 1);
      return Array.from({ length: 7 }, (o, l) => {
        const s = new Date(n);
        return s.setDate(n.getDate() + (l + e.weekStartsOn) % 7), a.format(s);
      });
    });
    return (a, n) => (L(), q("div", Cl, [
      (L(!0), q(Se, null, Me(t.value, (o, l) => (L(), q("div", {
        key: l,
        class: "text-center text-vdt-content text-sm py-2"
      }, oe(o), 1))), 128))
    ]));
  }
}), Il = { class: "calendar-cell text-center relative" }, Ol = ["disabled", "tabindex", "aria-selected", "aria-disabled", "aria-current", "data-in-current-month"], Fl = /* @__PURE__ */ Re({
  __name: "CalendarCell",
  props: {
    date: {},
    currentMonth: {},
    selected: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    isToday: { type: Boolean, default: !1 },
    focusable: { type: Boolean, default: !1 },
    selectionMode: { default: "single" },
    isRangeStart: { type: Boolean, default: !1 },
    isRangeEnd: { type: Boolean, default: !1 },
    isInRange: { type: Boolean, default: !1 }
  },
  emits: ["select", "nav"],
  setup(r, { emit: e }) {
    const t = r, a = e, n = E(() => t.date.month !== t.currentMonth), o = E(() => {
      const s = {};
      return s["flex justify-center items-center w-8 h-8 rounded-md mx-auto relative z-10"] = !0, t.disabled ? (s["opacity-40 cursor-not-allowed"] = !0, s["bg-vdt-surface text-vdt-content"] = !0, s) : (t.selectionMode === "range" ? (t.isRangeStart || t.isRangeEnd ? s["bg-vdt-theme-500 text-white"] = !0 : t.isInRange ? s["bg-vdt-outline text-vdt-content"] = !0 : (s["bg-vdt-surface text-vdt-content"] = !0, s["hover:bg-vdt-interactive-hover cursor-pointer"] = !0), t.isToday && !t.isRangeStart && !t.isRangeEnd && !t.isInRange && (s["ring-2 ring-vdt-theme-500"] = !0)) : (t.selected ? s["bg-vdt-theme-500 text-white"] = !0 : (s["bg-vdt-surface text-vdt-content"] = !0, s["hover:bg-vdt-interactive-hover cursor-pointer"] = !0), t.isToday && !t.selected && (s["ring-2 ring-vdt-theme-500"] = !0)), n.value && !t.selected && !t.isRangeStart && !t.isRangeEnd && (s["text-vdt-content-muted"] = !0, s["text-vdt-content"] = !1), s);
    }), l = () => {
      t.disabled || a("select", t.date);
    };
    return (s, i) => (L(), q("div", Il, [
      J("button", {
        type: "button",
        class: Fe(["calendar-cell-button", o.value]),
        disabled: s.disabled,
        tabindex: s.focusable ? 0 : -1,
        "aria-selected": s.selected || s.isRangeStart || s.isRangeEnd,
        "aria-disabled": s.disabled,
        "aria-current": s.isToday ? "date" : void 0,
        "data-in-current-month": !n.value,
        onClick: l,
        onKeydown: [
          Pe(l, ["enter"]),
          Pe(l, ["space"]),
          i[0] || (i[0] = Pe((d) => a("nav", "up"), ["up"])),
          i[1] || (i[1] = Pe((d) => a("nav", "down"), ["down"])),
          i[2] || (i[2] = Pe((d) => a("nav", "left"), ["left"])),
          i[3] || (i[3] = Pe((d) => a("nav", "right"), ["right"]))
        ]
      }, oe(s.date.day), 43, Ol)
    ]));
  }
}), Vl = /* @__PURE__ */ qe(Fl, [["__scopeId", "data-v-9018b2ca"]]), Al = { class: "grid grid-cols-7 gap-1" }, Pl = /* @__PURE__ */ Re({
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
    const a = r, n = t, o = E(() => a.month), l = E(() => a.year);
    E(() => {
      const m = rt();
      return `${m.year}-${m.month}-${m.day}`;
    });
    const s = E(() => (console.log(`生成 ${a.calendar} 曆 ${a.year}年${a.month}月 的日曆`), de.generateCalendarDays(
      a.year,
      // 西元年
      a.month,
      // 西元月
      a.calendar,
      a.locale,
      a.weekStartsOn
    ))), i = (m) => {
      if (!a.rangeStart || !a.rangeEnd) return !1;
      try {
        return m.compare(a.rangeStart) >= 0 && m.compare(a.rangeEnd) <= 0;
      } catch {
        return !1;
      }
    }, d = (m, f) => {
      if (!m || !f) return !1;
      try {
        return m.compare(f) === 0;
      } catch {
        return !1;
      }
    }, p = (m) => {
      try {
        return !!(a.minDate && m.compare(a.minDate) < 0 || a.maxDate && m.compare(a.maxDate) > 0);
      } catch {
        return !0;
      }
    }, g = (m) => {
      try {
        const f = xn(m.calendar.identifier);
        return m.compare(f) === 0;
      } catch {
        return !1;
      }
    }, v = E(() => s.value.map((m, f) => {
      const c = `${m.year}-${m.month}-${m.day}`, D = g(m), b = m.month !== o.value, Y = p(m), S = a.selectionMode === "single" && d(m, a.selectedDate), I = a.selectionMode === "range" && d(m, a.rangeStart), u = a.selectionMode === "range" && d(m, a.rangeEnd), h = a.selectionMode === "range" && i(m) && !I && !u && !Y, y = m.day === 1 && m.month === o.value, B = [
        c,
        S,
        D,
        Y,
        I,
        u,
        h,
        a.selectionMode,
        a.calendar
      ];
      return {
        key: `${a.calendar}-${l.value}-${o.value}-${c}-${f}`,
        memoKey: B,
        date: m,
        isToday: D,
        isSelected: S,
        isDisabled: Y,
        isOutsideMonth: b,
        isRangeStart: I,
        isRangeEnd: u,
        isInRange: h,
        isFocusable: y
      };
    })), M = (m) => {
      a.selectionMode === "single" ? n("select", m) : a.selectionMode === "range" && n("range-select", m, null);
    }, w = (m) => {
      const f = v.value;
      if (f.length === 0) return;
      const c = f[0], D = f[f.length - 1];
      switch (m) {
        case "left":
          c.date.day < 15 && c.date.month !== o.value && n("navigate", "prev-month");
          break;
        case "right":
          D.date.day > 15 && D.date.month !== o.value && n("navigate", "next-month");
          break;
      }
    };
    return Jt(() => {
      console.log(a.selectedDate);
    }), e({
      getCalendarDays: () => s.value,
      getCellStates: () => v.value
    }), (m, f) => (L(), q("div", Al, [
      (L(!0), q(Se, null, Me(v.value, (c, D, b, Y) => {
        const S = c.memoKey;
        if (Y && Y.key === c.key && Qr(Y, S)) return Y;
        const I = (L(), na(Vl, {
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
          "selection-mode": m.selectionMode,
          onSelect: M,
          onNav: w
        }, null, 8, ["date", "current-month", "selected", "is-today", "disabled", "focusable", "is-range-start", "is-range-end", "is-in-range", "selection-mode"]));
        return I.memo = S, I;
      }, f, 0), 128))
    ]));
  }
}), Ll = { key: 0 }, Bl = { class: "flex flex-row items-center justify-between" }, Hl = { class: "text-sm font-medium text-vdt-content uppercase" }, ql = { class: "flex flex-row items-center gap-1" }, Nl = { class: "time-selector-container pt-1" }, Ul = { class: "flex flex-row items-center gap-1" }, zl = { class: "flex-1" }, Wl = ["value"], jl = { class: "flex-1" }, Jl = ["value"], _l = {
  key: 0,
  class: "flex-1"
}, Kl = ["value"], Ql = {
  key: 1,
  class: "flex-shrink-0"
}, Zl = { class: "isolate inline-flex rounded-md border border-vdt-outline bg-vdt-surface overflow-hidden" }, Gl = /* @__PURE__ */ Re({
  __name: "TimeSelector",
  props: {
    show: { type: Boolean, default: !0 },
    timeValue: { default: null },
    enableSeconds: { type: Boolean, default: !0 },
    use24Hour: { type: Boolean, default: !1 },
    defaultTime: { default: "00:00:00" },
    locale: { default: "zh-TW" },
    selectionMode: { default: "single" }
  },
  emits: ["time-change", "today-click"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, { getPlaceholderMessage: o } = Dt(a.locale), l = W(0), s = W(0), i = W(0), d = W("AM"), p = W(!1), g = E(() => a.use24Hour ? Array.from({ length: 24 }, (u, h) => h) : Array.from({ length: 12 }, (u, h) => h + 1)), v = E(() => Array.from({ length: 60 }, (u, h) => h)), M = E(() => Array.from({ length: 60 }, (u, h) => h)), w = E(() => {
      let u = l.value;
      a.use24Hour || (d.value === "PM" && u < 12 ? u += 12 : d.value === "AM" && u === 12 && (u = 0));
      const h = m(u), y = m(s.value);
      if (a.enableSeconds) {
        const B = m(i.value);
        return `${h}:${y}:${B}`;
      } else
        return `${h}:${y}`;
    }), m = (u) => u.toString().padStart(2, "0"), f = (u) => m(u), c = (u) => {
      if (!u) return;
      const [h, y, B] = u.split(":");
      let N = parseInt(h) || 0;
      a.use24Hour || (N >= 12 ? (d.value = "PM", N = N === 12 ? 12 : N - 12) : (d.value = "AM", N = N === 0 ? 12 : N)), l.value = N, s.value = parseInt(y) || 0, a.enableSeconds && B && (i.value = parseInt(B) || 0), p.value = !0;
    }, D = () => {
      c(a.defaultTime);
    }, b = (u) => {
      d.value = u;
    }, Y = (u) => {
      const h = /* @__PURE__ */ new Date();
      h.setHours(u === "AM" ? 6 : 18, 0, 0, 0);
      const N = new Intl.DateTimeFormat(a.locale || navigator.language, {
        hour12: !0,
        hour: "numeric"
      }).formatToParts(h).find((_) => _.type === "dayPeriod");
      return (N == null ? void 0 : N.value) || u;
    }, S = () => {
      const u = /* @__PURE__ */ new Date();
      if (a.use24Hour)
        l.value = u.getHours();
      else {
        const h = u.getHours();
        d.value = h >= 12 ? "PM" : "AM", l.value = h % 12 || 12;
      }
      s.value = u.getMinutes(), a.enableSeconds && (i.value = u.getSeconds()), p.value = !0;
    }, I = () => {
      n("today-click");
    };
    return ye(() => a.timeValue, (u) => {
      u ? c(u) : !p.value && a.show && D();
    }, { immediate: !0 }), ye(
      [l, s, i, d],
      () => {
        p.value && n("time-change", w.value);
      }
    ), e({
      // 獲取當前時間值
      getCurrentTime: () => w.value,
      // 設置時間
      setTime: (u) => c(u),
      // 重置為預設時間
      resetToDefault: () => D()
    }), (u, h) => u.show ? (L(), q("div", Ll, [
      h[5] || (h[5] = J("hr", { class: "my-2 border-vdt-outline" }, null, -1)),
      J("div", Bl, [
        J("label", Hl, oe(O(o)("general.time")) + ": ", 1),
        J("div", ql, [
          J("button", {
            type: "button",
            onClick: S,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover cursor-pointer"
          }, " Now "),
          u.selectionMode === "single" ? (L(), q("button", {
            key: 0,
            type: "button",
            onClick: I,
            class: "px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover cursor-pointer"
          }, " Today ")) : fe("", !0)
        ])
      ]),
      J("div", Nl, [
        J("div", Ul, [
          J("div", zl, [
            Oe(J("select", {
              "onUpdate:modelValue": h[0] || (h[0] = (y) => l.value = y),
              class: "w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (L(!0), q(Se, null, Me(g.value, (y) => (L(), q("option", {
                key: y,
                value: y
              }, oe(f(y)), 9, Wl))), 128))
            ], 512), [
              [Ct, l.value]
            ])
          ]),
          J("div", jl, [
            Oe(J("select", {
              "onUpdate:modelValue": h[1] || (h[1] = (y) => s.value = y),
              class: "w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (L(!0), q(Se, null, Me(v.value, (y) => (L(), q("option", {
                key: y,
                value: y
              }, oe(m(y)), 9, Jl))), 128))
            ], 512), [
              [Ct, s.value]
            ])
          ]),
          u.enableSeconds ? (L(), q("div", _l, [
            Oe(J("select", {
              "onUpdate:modelValue": h[2] || (h[2] = (y) => i.value = y),
              class: "w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
            }, [
              (L(!0), q(Se, null, Me(M.value, (y) => (L(), q("option", {
                key: y,
                value: y
              }, oe(m(y)), 9, Kl))), 128))
            ], 512), [
              [Ct, i.value]
            ])
          ])) : fe("", !0),
          u.use24Hour ? fe("", !0) : (L(), q("div", Ql, [
            J("div", Zl, [
              J("button", {
                type: "button",
                onClick: h[3] || (h[3] = (y) => b("AM")),
                class: Fe(["px-2 py-1 text-sm transition-colors", d.value === "AM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, oe(Y("AM")), 3),
              J("button", {
                type: "button",
                onClick: h[4] || (h[4] = (y) => b("PM")),
                class: Fe(["px-2 py-1 text-sm transition-colors", d.value === "PM" ? "bg-vdt-theme-500 text-white" : "text-vdt-content hover:bg-vdt-interactive-hover"])
              }, oe(Y("PM")), 3)
            ])
          ]))
        ])
      ])
    ])) : fe("", !0);
  }
}), Xl = { class: "vdt-date-picker calendar-grid w-full max-w-xs rounded-lg shadow p-2" }, va = /* @__PURE__ */ Re({
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
    showTimeSelector: { type: Boolean, default: !1 },
    timeValue: { default: null },
    enableSeconds: { type: Boolean, default: !0 },
    use24Hour: { type: Boolean, default: !1 },
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
      const u = rt();
      return { year: u.year, month: u.month };
    }, { year: l, month: s } = o(), i = W(l), d = W(s), p = W(a.timeValue), g = E(() => de.convertToCalendarDate(a.value, a.calendar)), v = E(() => de.convertToCalendarDate(a.rangeStart, a.calendar)), M = E(() => de.convertToCalendarDate(a.rangeEnd, a.calendar)), w = E(() => de.convertToCalendarDate(a.minDate || null, a.calendar)), m = E(() => de.convertToCalendarDate(a.maxDate || null, a.calendar)), f = E(() => {
      var u;
      return ((u = a.minDate) == null ? void 0 : u.year) || 1900;
    }), c = E(() => {
      var u;
      return ((u = a.maxDate) == null ? void 0 : u.year) || 2100;
    }), D = E(() => {
      if (a.year !== void 0 && a.month !== void 0)
        return { year: a.year, month: a.month };
      const u = a.selectionMode === "range" ? a.rangeStart : a.value;
      return u ? { year: u.year, month: u.month } : { year: i.value, month: d.value };
    });
    ye(D, ({ year: u, month: h }) => {
      i.value = u, d.value = h;
    }, { immediate: !0 }), ye(() => a.timeValue, (u) => {
      p.value = u;
    }, { immediate: !0 });
    const b = (u) => {
      if (a.selectionMode === "single") {
        const h = de.convertFromCalendarDate(u, a.calendar);
        h && (n("select", h, !0), a.showTimeSelector && p.value && n("time-select", p.value));
      }
    }, Y = (u, h) => {
      if (a.selectionMode === "range") {
        const y = de.convertFromCalendarDate(u, a.calendar), B = de.convertFromCalendarDate(h, a.calendar);
        n("range-select", y, B);
      }
    }, S = (u) => {
      p.value = u, n("time-select", u);
    }, I = () => {
      if (a.selectionMode === "single") {
        const u = rt();
        i.value = u.year, d.value = u.month, n("select", u, !1);
      }
    };
    return e({
      // 獲取當前選中的日期（單一模式）
      getSelectedDate: () => a.value,
      // 獲取當前範圍（範圍模式）
      getSelectedRange: () => ({ start: a.rangeStart, end: a.rangeEnd }),
      // 設置顯示的月份
      setDisplayMonth: (u, h) => {
        i.value = u, d.value = h;
      },
      // 導航到上個月
      previousMonth: () => {
        d.value === 1 ? (d.value = 12, i.value -= 1) : d.value -= 1;
      },
      // 導航到下個月
      nextMonth: () => {
        d.value === 12 ? (d.value = 1, i.value += 1) : d.value += 1;
      }
    }), (u, h) => (L(), q("div", Xl, [
      me(Rl, {
        month: d.value,
        "onUpdate:month": h[0] || (h[0] = (y) => d.value = y),
        year: i.value,
        "onUpdate:year": h[1] || (h[1] = (y) => i.value = y),
        locale: u.locale,
        "min-year": f.value,
        "max-year": c.value,
        calendar: u.calendar
      }, mt({ _: 2 }, [
        Me(u.$slots, (y, B) => ({
          name: B,
          fn: ht((N) => [
            $e(u.$slots, B, vt(pt(N)))
          ])
        }))
      ]), 1032, ["month", "year", "locale", "min-year", "max-year", "calendar"]),
      me(El, {
        locale: u.locale,
        "week-starts-on": u.weekStartsOn,
        calendar: u.calendar
      }, null, 8, ["locale", "week-starts-on", "calendar"]),
      me(Pl, {
        year: i.value,
        month: d.value,
        "selected-date": g.value,
        "range-start": v.value,
        "range-end": M.value,
        "selection-mode": u.selectionMode,
        "min-date": w.value,
        "max-date": m.value,
        locale: u.locale,
        "week-starts-on": u.weekStartsOn,
        calendar: u.calendar,
        onSelect: b,
        onRangeSelect: Y
      }, null, 8, ["year", "month", "selected-date", "range-start", "range-end", "selection-mode", "min-date", "max-date", "locale", "week-starts-on", "calendar"]),
      me(Gl, {
        locale: u.locale,
        show: u.showTimeSelector,
        "time-value": p.value,
        "enable-seconds": u.enableSeconds,
        "use24-hour": u.use24Hour,
        "default-time": u.defaultTime,
        selectionMode: u.selectionMode,
        onTimeChange: S,
        onTodayClick: I
      }, null, 8, ["locale", "show", "time-value", "enable-seconds", "use24-hour", "default-time", "selectionMode"])
    ]));
  }
}), es = {}, ts = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor"
};
function as(r, e) {
  return L(), q("svg", ts, e[0] || (e[0] = [
    J("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18L18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const Hr = /* @__PURE__ */ qe(es, [["render", as]]);
function pa(r, e) {
  const { dateInputRef: t, timeInputRef: a } = r, { showTime: n, autoFocusTimeAfterDate: o = !0 } = e;
  return {
    // 基本導航方法
    focusFirstInput: () => {
      Te(() => {
        var g;
        (g = t.value) != null && g.focus && t.value.focus();
      });
    },
    focusLastInput: () => {
      Te(() => {
        var g, v, M;
        n && ((g = a.value) != null && g.focusLast) ? a.value.focusLast() : (v = t.value) != null && v.focusLast ? t.value.focusLast() : (M = t.value) != null && M.focus && t.value.focus();
      });
    },
    // 專門的導航處理
    handleNavigateToTime: (g) => {
      n && Te(() => {
        var v;
        (v = a.value) != null && v.focus && a.value.focus();
      });
    },
    handleNavigateToDate: () => {
      Te(() => {
        var g, v;
        (g = t.value) != null && g.focusLast ? t.value.focusLast() : (v = t.value) != null && v.focus && t.value.focus();
      });
    },
    autoFocusTimeAfterDateComplete: (g, v) => {
      !n || !o || (v && !g.inputTimeValue.value && (g.inputTimeValue.value = v, g.updateFromInputs()), Te(() => {
        var M;
        (M = a.value) != null && M.focus && a.value.focus();
      }));
    }
  };
}
function ga(r = {}) {
  const { required: e = !0, showTime: t = !1, minDate: a, maxDate: n, dateFormat: o = "YYYY-MM-DD" } = r, l = W({}), s = W({}), i = W({}), d = E(() => ({ ...l.value, ...s.value })), p = E(() => ({ ...i.value })), g = E(() => Object.keys(d.value).length > 0), v = (S, I, u = "date", h = {}) => {
    ["date", "year", "month", "day"].forEach((y) => {
      m(`${u}.${y}`), f(`${u}.${y}`);
    }), S || Object.entries(I).forEach(([y, B]) => {
      const N = `${u}.${y}`;
      l.value[N] = B, h[y] && (i.value[N] = h[y]);
    });
  }, M = (S, I, u = "time", h = {}) => (["time", "hour", "minute", "second"].forEach((y) => {
    m(`${u}.${y}`), f(`${u}.${y}`);
  }), S || Object.entries(I).forEach(([y, B]) => {
    const N = `${u}.${y}`;
    l.value[N] = B, h[y] && (i.value[N] = h[y]);
  }), !g.value), w = (S) => {
    if (!S) return !1;
    if (a) {
      const I = ge(a);
      if (I && jt(S, I) < 0)
        return v(!1, {
          date: "date.beforeMin"
        }, "date", {
          date: { minDate: xe(I, o) }
        }), !1;
    }
    if (n) {
      const I = ge(n);
      if (I && jt(S, I) > 0)
        return v(!1, {
          date: "date.afterMax"
        }, "date", {
          date: { maxDate: xe(I, o) }
        }), !1;
    }
    return !0;
  }, m = (S) => {
    Object.keys(l.value).forEach((I) => {
      I.startsWith(S) && delete l.value[I];
    });
  }, f = (S) => {
    Object.keys(i.value).forEach((I) => {
      I.startsWith(S) && delete i.value[I];
    });
  };
  return {
    // 狀態
    errors: l,
    formatErrors: s,
    mergedErrors: d,
    hasErrors: g,
    errorParams: i,
    mergedErrorParams: p,
    // 驗證方法
    handleDateValidation: v,
    handleTimeValidation: M,
    validateDateTime: (S, I) => {
      const u = {
        isValid: !0,
        errors: {}
      };
      return e && (S || (u.errors.date = "date.required", u.isValid = !1), t && !I && (u.errors.time = "time.required", u.isValid = !1)), Object.assign(l.value, u.errors), u.isValid && !g.value;
    },
    validateDateRange: w,
    // 錯誤管理
    clearFieldErrors: m,
    clearFieldParams: f,
    clearAllErrors: () => {
      l.value = {}, s.value = {}, i.value = {};
    },
    setFormatError: (S, I) => {
      s.value[S] = I;
    },
    clearFormatError: (S) => {
      delete s.value[S];
    }
  };
}
function ya(r = {}) {
  const {
    showTime: e = !1,
    dateFormat: t = "YYYY-MM-DD",
    timeFormat: a = "HH:mm:ss",
    outputType: n = "iso",
    defaultTime: o,
    enableSeconds: l = !0
  } = r, s = W(null), i = W(null), d = W(null), p = (u) => {
    if (!u || u.hour === void 0) return null;
    const h = u.hour.toString().padStart(2, "0"), y = (u.minute || 0).toString().padStart(2, "0");
    if (l) {
      const B = (u.second || 0).toString().padStart(2, "0");
      return `${h}:${y}:${B}`;
    } else
      return `${h}:${y}`;
  }, g = (u, h) => {
    if (!u) return null;
    const y = ge(u);
    if (!y) return null;
    if (!h && !e)
      return Ze(y.year, y.month, y.day);
    if (!h)
      if (o) {
        const te = o.split(":").map(Number), ee = te[0] || 0, C = te[1] || 0, F = te[2] || 0;
        return Ze(
          y.year,
          y.month,
          y.day,
          ee,
          C,
          F
        );
      } else
        return Ze(y.year, y.month, y.day);
    const B = h.split(":").map(Number), N = B[0] || 0, _ = B[1] || 0, U = B[2] || 0;
    return Ze(
      y.year,
      y.month,
      y.day,
      N,
      _,
      U
    );
  }, v = (u) => {
    const h = ge(u);
    s.value = h, h ? (i.value = xe(h, t), d.value = p(h)) : (i.value = null, d.value = null);
  }, M = (u, h) => {
    const y = u !== void 0 ? u : i.value, B = h !== void 0 ? h : d.value, N = g(y, B);
    return s.value = N, N;
  }, w = (u) => {
    s.value = u, u ? (i.value = xe(u, t), d.value = p(u)) : (i.value = null, d.value = null);
  }, m = (u) => {
    if (!s.value) return null;
    const h = u.split(":").map(Number), y = {
      ...s.value,
      hour: h[0] || 0,
      minute: h[1] || 0,
      second: h[2] || 0
    };
    return s.value = y, d.value = u, y;
  }, f = (u) => {
    const h = u !== void 0 ? u : s.value, y = e ? `${t} ${a}` : t;
    return Wt(h, n, y);
  }, c = () => {
    s.value = null, i.value = null, d.value = null;
  }, D = E(() => !!(i.value || d.value || s.value)), b = () => e && !d.value && o ? (d.value = o, !0) : !1, Y = E(() => !!i.value), S = E(() => !!d.value), I = E(() => e ? Y.value && S.value : Y.value);
  return {
    // 響應式狀態
    internalDateTime: s,
    inputDateValue: i,
    inputTimeValue: d,
    // 計算屬性
    hasDateValue: Y,
    hasTimeValue: S,
    hasCompleteValue: I,
    hasValue: D,
    // 主要方法
    updateFromInputs: M,
    setInternalDateTime: w,
    updateTimeOnly: m,
    setExternalValue: v,
    // updateDateTime,
    getFormattedOutput: f,
    clearValues: c,
    applyDefaultTime: b,
    // 輔助方法
    getTimeFromDateTime: p,
    createDateTimeFromInputs: g
  };
}
function qr(r, e, t = {}) {
  const { disabled: a, onOutsideClick: n } = t, o = W(!1), l = () => {
    a != null && a.value || (o.value = !o.value, o.value && Te(() => {
      d();
    }));
  }, s = () => {
    a != null && a.value || (o.value = !0, Te(() => {
      d();
    }));
  }, i = () => {
    o.value = !1;
  }, d = () => {
    if (!r.value || !e.value) return;
    const m = r.value.getBoundingClientRect(), f = e.value, c = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    let D = m.height + 5, b = 0;
    const Y = f.getBoundingClientRect();
    m.left + Y.width > c.width && (b = c.width - m.left - Y.width - 10), m.bottom + Y.height > c.height && (D = -Y.height - 5), f.style.position = "absolute", f.style.top = `${D}px`, f.style.left = `${b}px`, f.style.zIndex = "50";
  }, p = (m) => {
    const f = e.value, c = r.value, D = m.target;
    o.value && f && !f.contains(D) && c && !c.contains(D) && (i(), n == null || n());
  }, g = (m, f) => {
    if (a != null && a.value) return;
    const c = m.target;
    c.classList.contains("date-input") || c.classList.contains("time-input") || c.closest("input") || c.closest("button") || (m.preventDefault(), f == null || f());
  }, v = (m) => {
    if (a != null && a.value) return;
    const f = m.target;
    f.classList.contains("date-input") || f.classList.contains("time-input") || f.closest("input") || f.closest("button") || m.preventDefault();
  }, M = () => {
    o.value && d();
  }, w = () => {
    o.value && d();
  };
  return Jt(() => {
    document.addEventListener("mousedown", p), window.addEventListener("resize", M), window.addEventListener("scroll", w);
  }), $a(() => {
    document.removeEventListener("mousedown", p), window.removeEventListener("resize", M), window.removeEventListener("scroll", w);
  }), {
    // 狀態
    showCalendar: o,
    // 主要方法
    toggleCalendar: l,
    showCalendarPopup: s,
    hideCalendar: i,
    updateCalendarPosition: d,
    // 事件處理
    handleContainerClick: g,
    handleContainerMouseDown: v
  };
}
function rs(r = {}) {
  const {
    customDefaultTime: e = "00:00:00",
    enableSeconds: t = !0
  } = r, a = (d) => {
    if (!d) return !1;
    if (!/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])(?::([0-5]?[0-9]))?$/.test(d))
      return console.warn(`時間格式不正確: ${d}，應為 HH:mm:ss 或 HH:mm 格式`), !1;
    const g = d.split(":"), v = parseInt(g[0]), M = parseInt(g[1]), w = g[2] ? parseInt(g[2]) : 0;
    return v < 0 || v > 23 || M < 0 || M > 59 || w < 0 || w > 59 ? (console.warn(`時間值超出範圍: ${d}`), !1) : !0;
  }, n = (d, p = t) => {
    const g = d.split(":"), v = g[0].padStart(2, "0"), M = g[1].padStart(2, "0"), w = g[2] ? g[2].padStart(2, "0") : "00";
    return p ? `${v}:${M}:${w}` : `${v}:${M}`;
  };
  return {
    // 計算屬性
    getValidDefaultTime: E(() => {
      if (e && a(e))
        return n(e, t);
    }),
    // 驗證方法
    validateTimeFormat: a,
    // 格式化方法
    formatTimeString: n,
    getCurrentTimeString: () => {
      const d = /* @__PURE__ */ new Date(), p = d.getHours().toString().padStart(2, "0"), g = d.getMinutes().toString().padStart(2, "0"), v = d.getSeconds().toString().padStart(2, "0");
      return t ? `${p}:${g}:${v}` : `${p}:${g}`;
    },
    parseTimeString: (d) => {
      const p = d.split(":");
      return {
        hours: parseInt(p[0]) || 0,
        minutes: parseInt(p[1]) || 0,
        seconds: parseInt(p[2]) || 0
      };
    },
    buildTimeString: (d, p, g = 0) => {
      const v = d.toString().padStart(2, "0"), M = p.toString().padStart(2, "0"), w = g.toString().padStart(2, "0");
      return t ? `${v}:${M}:${w}` : `${v}:${M}`;
    }
  };
}
function ns(r = {}, e, t) {
  const {
    modelValue: a = null,
    showTime: n = !1,
    required: o = !0,
    disabled: l = !1,
    calendar: s = "gregory",
    // 日曆系統
    dateFormat: i = "YYYY-MM-DD",
    timeFormat: d = "HH:mm:ss",
    outputType: p = "iso",
    useStrictISO: g = !1,
    customDefaultTime: v,
    enableSeconds: M = !0,
    autoFocusTimeAfterDate: w = !0,
    minDate: m,
    maxDate: f,
    locale: c = "zh-TW"
  } = r, { containerRef: D, calendarRef: b, dateInputRef: Y, timeInputRef: S } = e, I = W(l), u = ga({
    required: o,
    showTime: n,
    minDate: m,
    maxDate: f,
    dateFormat: i
  }), h = ya({
    showTime: n,
    dateFormat: i,
    timeFormat: d,
    outputType: p,
    defaultTime: v,
    enableSeconds: M
  }), y = pa(
    { dateInputRef: Y, timeInputRef: S },
    { showTime: n, autoFocusTimeAfterDate: w }
  ), B = qr(
    D,
    b,
    {
      disabled: I,
      onOutsideClick: () => {
      }
    }
  ), N = rs({
    customDefaultTime: v,
    enableSeconds: M
  }), _ = E(() => {
    const z = ge(m, c);
    return z || null;
  }), U = E(() => {
    const z = ge(f, c);
    return z || null;
  });
  let te = null, ee = null, C = null;
  const F = (z) => {
    te = z.update || null, ee = z.change || null, C = z.validation || null;
  }, $ = async (z = h.internalDateTime.value) => {
    let k = null;
    if (z) {
      const ve = n ? `${i} ${d}` : i;
      k = Wt(z, p, ve, n, s, c, g);
    }
    te == null || te(k), ee == null || ee(k);
    const K = !u.hasErrors.value;
    C == null || C(K, u.mergedErrors.value);
  };
  ye(() => a, (z) => {
    const k = ge(z, c, s);
    z && !k ? (u.handleDateValidation(!1, { date: "無效的日期格式" }), h.setExternalValue(null)) : k && !u.validateDateRange(k) ? h.setExternalValue(null) : (u.clearFieldErrors("date"), u.clearFieldErrors("invalidInput"), h.setExternalValue(k));
  }, { immediate: !0 });
  const H = (z, k, K = {}) => {
    u.handleDateValidation(z, k, "date", K), C == null || C(!u.hasErrors.value, u.mergedErrors.value);
  }, A = (z, k, K = {}) => {
    u.handleTimeValidation(z, k, "time", K), C == null || C(!u.hasErrors.value, u.mergedErrors.value);
  }, X = async (z) => {
    h.inputDateValue.value = z;
    const k = h.updateFromInputs();
    if (!k) {
      u.handleDateValidation(!1, { date: "date.invalid" });
      return;
    }
    u.validateDateRange(k) && (await $(k), ["date", "year", "month", "day"].forEach((K) => {
      u.clearFieldErrors(K);
    }), y.autoFocusTimeAfterDateComplete(
      h,
      v ? N.getValidDefaultTime.value : void 0
    ));
  }, ie = async (z) => {
    h.inputTimeValue.value = z;
    const k = h.updateFromInputs();
    await $(k), ["time", "hour", "minute", "second"].forEach((K) => {
      u.clearFieldErrors(K);
    });
  }, ne = async (z, k = !0) => {
    try {
      if (!u.validateDateRange(z))
        return;
      h.setInternalDateTime(z), await $(z), ["date", "year", "month", "day"].forEach((K) => {
        u.clearFieldErrors(K);
      }), k && B.hideCalendar();
    } catch (K) {
      console.error("處理日曆選擇失敗:", K);
    }
  }, R = async (z) => {
    const k = h.updateTimeOnly(z);
    k && await $(k), ["time", "hour", "minute", "second"].forEach((K) => {
      u.clearFieldErrors(K);
    });
  }, T = (z) => {
    B.handleContainerClick(z, () => {
      y.focusFirstInput();
    });
  }, P = () => {
    h.clearValues(), u.clearAllErrors(), $(null);
  }, Z = async () => {
    var he, De;
    const z = await ((he = Y.value) == null ? void 0 : he.validate()), k = n ? await ((De = S.value) == null ? void 0 : De.validate()) : !0;
    let K = !0;
    h.internalDateTime.value && (K = de.isValidDate(
      h.internalDateTime.value.year,
      h.internalDateTime.value.month,
      h.internalDateTime.value.day,
      s
    ), K || u.handleDateValidation(!1, {
      date: "date.invalidInCalendar"
    }, "calendar", {
      calendar: { calendarName: de.getCalendarDisplayName(s, c) }
    }));
    const ve = u.validateDateTime(
      h.inputDateValue.value,
      h.inputTimeValue.value
    ), pe = z && k && K && ve;
    return C == null || C(pe, u.mergedErrors.value), pe;
  }, j = async () => {
    const z = /* @__PURE__ */ new Date(), k = {
      year: z.getFullYear(),
      month: z.getMonth() + 1,
      day: z.getDate(),
      hour: z.getHours(),
      minute: z.getMinutes(),
      second: z.getSeconds()
    };
    try {
      h.setInternalDateTime(k), await $(k), ["date", "year", "month", "day", "time", "hour", "minute", "second"].forEach((K) => {
        u.clearFieldErrors(K);
      });
    } catch (K) {
      console.warn("設置當前時間失敗:", K);
      const ve = `${k.year}-${k.month.toString().padStart(2, "0")}-${k.day.toString().padStart(2, "0")}`, pe = n ? `${(k.hour || 0).toString().padStart(2, "0")}:${(k.minute || 0).toString().padStart(2, "0")}:${(k.second || 0).toString().padStart(2, "0")}` : null;
      h.inputDateValue.value = ve, n && pe && (h.inputTimeValue.value = pe);
      const he = h.updateFromInputs();
      await $(he);
    }
  }, ae = () => {
    y.focusFirstInput();
  };
  return {
    // 狀態
    isDisabled: I,
    // 日曆系統相關
    calendar: W(s),
    // 從各個 composables 暴露的狀態
    ...u,
    ...h,
    ...B,
    // 計算屬性
    calendarMinDate: _,
    calendarMaxDate: U,
    // 預設時間相關
    getValidDefaultTime: N.getValidDefaultTime,
    // 事件處理方法
    setEmitters: F,
    validateDateInput: H,
    validateTimeInput: A,
    handleDateComplete: X,
    handleTimeComplete: ie,
    handleCalendarSelect: ne,
    handleTimeSelect: R,
    handleContainerClick: T,
    handleContainerMouseDown: B.handleContainerMouseDown,
    // 導航方法
    handleNavigateToDate: y.handleNavigateToDate,
    handleNavigateToTime: y.handleNavigateToTime,
    // 主要操作方法
    reset: P,
    validate: Z,
    selectNow: j,
    focus: ae,
    // 直接暴露導航方法（用於 defineExpose）
    focusFirstInput: y.focusFirstInput,
    focusLastInput: y.focusLastInput
  };
}
const xa = {
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
function os(r) {
  r = r.replace(/^#/, ""), r.length === 3 && (r = r.split("").map((n) => n + n).join(""));
  const e = parseInt(r.slice(0, 2), 16) / 255, t = parseInt(r.slice(2, 4), 16) / 255, a = parseInt(r.slice(4, 6), 16) / 255;
  return { r: e, g: t, b: a };
}
function ls(r) {
  const { r: e, g: t, b: a } = r, n = e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4), o = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), l = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), s = 0.4124 * n + 0.3576 * o + 0.1805 * l, i = 0.2126 * n + 0.7152 * o + 0.0722 * l, d = 0.0193 * n + 0.1192 * o + 0.9505 * l, p = 0.95047, g = 1, v = 1.08883, M = s > 8856e-6 ? Math.pow(s / p, 1 / 3) : 7.787 * s / p + 16 / 116, w = i > 8856e-6 ? Math.pow(i / g, 1 / 3) : 7.787 * i / g + 16 / 116, m = d > 8856e-6 ? Math.pow(d / v, 1 / 3) : 7.787 * d / v + 16 / 116, f = 116 * w - 16, c = 500 * (M - w), D = 200 * (w - m);
  return { l: f, a: c, b: D };
}
function ss(r) {
  const { l: e, a: t, b: a } = r, n = Math.sqrt(t * t + a * a);
  let o = Math.atan2(a, t) * 180 / Math.PI;
  return o < 0 && (o += 360), { l: e, c: n, h: o };
}
function is(r) {
  const e = os(r), t = ls(e), a = ss(t);
  return {
    lightness: a.l,
    chroma: Math.min(a.c / 150, 0.4),
    hue: a.h
  };
}
function us(r, e) {
  const t = Math.min(
    Math.abs(r.hue - e.hue),
    360 - Math.abs(r.hue - e.hue)
  ), a = t > 60 ? 30 : 5;
  return Math.sqrt(
    Math.pow((r.lightness - e.lightness) * 1.5, 2) + Math.pow((r.chroma - e.chroma) * 2, 2) + Math.pow(t / 360 * a, 2) * 100
  );
}
function cs(r) {
  return r.startsWith("oklch(");
}
function ds(r) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(r);
}
function fs(r) {
  return r in xa;
}
function sr(r) {
  const e = "violet";
  if (fs(r))
    return r;
  let t = null;
  if (cs(r) ? t = lr(r) : ds(r) && (t = is(r)), !t) return e;
  let a = e, n = 1 / 0;
  for (const [o, l] of Object.entries(xa))
    for (const s of ["300", "400", "500", "600", "700"]) {
      const i = l[s];
      if (!i) continue;
      const d = lr(i);
      if (!d) continue;
      const p = us(t, d);
      p < n && (n = p, a = o);
    }
  return a;
}
function ms(r) {
  return xa[r] || {};
}
class hs {
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
    const n = ms(t.color);
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
      "vdt-datepicker": !0,
      "vdt-themed": !0,
      // 主題色相關類名
      [`vdt-theme-${t.color}`]: !0,
      // 模式相關類名
      [`vdt-mode-${t.currentMode}`]: !0,
      "vdt-mode-auto": t.userPreference === "auto",
      // 實例相關（用於調試，但不應用於 CSS）
      [`vdt-instance-${e}`]: !0
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
}
const Ve = new hs();
function Nr(r = {}) {
  const e = W(
    Ve.createInstance(r.instanceId, {
      defaultColor: r.defaultColor,
      defaultMode: r.defaultMode
    })
  ), t = W(
    Ve.getState(e.value)
  );
  let a = null;
  const n = E(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.currentMode) === "dark";
  }), o = E(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.currentMode) === "light";
  }), l = E(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.userPreference) === "auto";
  }), s = E(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.currentMode) || "light";
  }), i = E(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.userPreference) || "auto";
  }), d = E(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.systemPreference) || "light";
  }), p = E(() => {
    var c;
    return ((c = t.value) == null ? void 0 : c.color) || "violet";
  }), g = E(() => e.value ? Ve.getThemeClasses(e.value) : {}), v = E(() => e.value ? Ve.getContainerAttributes(e.value) : {}), M = (c) => {
    e.value && Ve.setColor(e.value, c);
  }, w = (c) => {
    e.value && Ve.setMode(e.value, c);
  }, m = () => {
    if (t.value)
      if (t.value.userPreference === "auto") {
        const c = t.value.currentMode === "light" ? "dark" : "light";
        w(c);
      } else {
        const c = t.value.currentMode === "light" ? "dark" : "light";
        w(c);
      }
  }, f = E(() => typeof window > "u" ? !1 : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches !== void 0);
  return Jt(async () => {
    await Te(), t.value = Ve.getState(e.value), a = Ve.addListener(e.value, (c) => {
      t.value = c;
    }), setTimeout(() => {
      Ve.reapplyTheme(e.value);
    }, 10);
  }), $a(() => {
    a && a(), e.value && Ve.destroyInstance(e.value);
  }), {
    // 響應式狀態
    instanceId: e,
    themeState: t,
    isDark: n,
    isLight: o,
    isAuto: l,
    currentMode: s,
    userPreference: i,
    systemPreference: d,
    currentColor: p,
    themeClasses: g,
    containerAttributes: v,
    supportsColorScheme: f,
    // 主要方法
    setColor: M,
    setMode: w,
    toggle: m,
    // 便利方法 - 模式設置
    setLightMode: () => w("light"),
    setDarkMode: () => w("dark"),
    setAutoMode: () => w("auto"),
    // 便利方法 - 常用顏色設置
    setRedTheme: () => M("red"),
    setBlueTheme: () => M("blue"),
    setGreenTheme: () => M("green"),
    setVioletTheme: () => M("violet"),
    setPurpleTheme: () => M("purple"),
    setIndigoTheme: () => M("indigo"),
    setTealTheme: () => M("teal"),
    setCyanTheme: () => M("cyan"),
    setSkyTheme: () => M("sky"),
    setEmeraldTheme: () => M("emerald")
  };
}
const vs = { key: 0 }, ps = {
  key: 0,
  class: "text-vdt-content"
}, gs = {
  key: 1,
  class: "text-vdt-content-muted"
}, ys = ["disabled"], $s = { key: 0 }, Ds = /* @__PURE__ */ Re({
  __name: "DatePicker",
  props: {
    modelValue: { default: null },
    customDefaultTime: {},
    autoFocusTimeAfterDate: { type: Boolean, default: !0 },
    placeholderOverrides: { default: () => ({}) },
    mode: { default: "auto" },
    theme: { default: () => "violet" },
    calendar: { default: "gregory" },
    locale: { default: "zh-TW" },
    outputType: { default: "iso" },
    useStrictISO: { type: Boolean, default: !1 },
    weekStartsOn: { default: 0 },
    minDate: {},
    maxDate: {},
    dateSeparator: { default: "-" },
    dateFormat: { default: "YYYY-MM-DD" },
    timeFormat: { default: "HH:mm:ss" },
    showTime: { type: Boolean, default: !0 },
    enableSeconds: { type: Boolean, default: !0 },
    use24Hour: { type: Boolean, default: !1 },
    useLocalizedPeriod: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    inputEnabled: { type: Boolean, default: !0 },
    required: { type: Boolean, default: !1 },
    showClearButton: { type: Boolean, default: !0 },
    showErrorMessage: { type: Boolean, default: !0 },
    useI18n: { type: Boolean, default: !0 },
    customErrorMessages: { default: () => ({}) }
  },
  emits: ["update:modelValue", "change", "validation"],
  setup(r, { expose: e, emit: t }) {
    const a = r, { setLocale: n, getPlaceholderMessage: o } = Dt(a.locale), l = t, s = Zr(), i = E(() => {
      const x = {};
      return ["no-years-display", "month-selector"].forEach((Q) => {
        s[Q] && (x[Q] = s[Q]);
      }), Object.keys(s).forEach((Q) => {
        Q.startsWith("year-") && (x[Q] = s[Q]);
      }), x;
    }), d = W(null), p = W(null), g = W(null), v = W(null), M = W(a.dateFormat), w = W(a.timeFormat), m = W({}), f = ns(
      {
        modelValue: a.modelValue,
        showTime: a.showTime,
        required: a.required,
        disabled: a.disabled,
        calendar: a.calendar,
        dateFormat: M.value,
        timeFormat: w.value,
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
        containerRef: d,
        calendarRef: p,
        dateInputRef: g,
        timeInputRef: v
      }
    );
    f.setEmitters({
      update: (x) => l("update:modelValue", x),
      change: (x) => l("change", x),
      validation: (x, Q) => l("validation", x, Q)
    });
    const {
      themeClasses: c,
      containerAttributes: D,
      setColor: b,
      setMode: Y,
      currentMode: S,
      isDark: I,
      isLight: u
    } = Nr(), h = E(() => {
      const x = ge(a.minDate, a.locale);
      return xe(x);
    }), y = E(() => {
      const x = ge(a.maxDate, a.locale);
      return xe(x);
    }), B = E(() => M.value), N = E(() => a.calendar === "gregory"), _ = E(() => !!($.value && $.value.trim())), U = E(() => {
      var Q, le, ce, Ne, bt, Mt, St;
      const x = {
        selectDate: o("general.selectDate"),
        year: o("date.year"),
        month: o("date.month"),
        day: o("date.day"),
        hour: o("time.hour"),
        minute: o("time.minute"),
        second: o("time.second")
      };
      return {
        selectDate: ((Q = a.placeholderOverrides) == null ? void 0 : Q.selectDate) || x.selectDate,
        // 時間相關
        hour: ((le = a.placeholderOverrides) == null ? void 0 : le.hour) || x.hour,
        minute: ((ce = a.placeholderOverrides) == null ? void 0 : ce.minute) || x.minute,
        second: ((Ne = a.placeholderOverrides) == null ? void 0 : Ne.second) || x.second,
        // 日期相關
        year: ((bt = a.placeholderOverrides) == null ? void 0 : bt.year) || x.year,
        month: ((Mt = a.placeholderOverrides) == null ? void 0 : Mt.month) || x.month,
        day: ((St = a.placeholderOverrides) == null ? void 0 : St.day) || x.day
      };
    }), te = E(() => {
      var x;
      return ((x = a.placeholderOverrides) == null ? void 0 : x.selectDate) || o("general.selectDate");
    }), ee = E(() => ({
      ...f.mergedErrors.value,
      ...m.value
    })), C = E(() => {
      var x;
      return {
        ...((x = f.mergedErrorParams) == null ? void 0 : x.value) || {}
        // 格式錯誤通常不需要參數，但可以擴展
      };
    }), F = E(() => Object.keys(ee.value).length > 0);
    ir(() => {
      if (n(a.locale), !wo(a.dateFormat)) {
        const x = a.dateFormat, Q = To(a.dateFormat);
        m.value.dateFormat = `日期格式不正確: "${x}" 已自動修復為 "${Q}"`, console.warn(`日期格式 "${x}" 不正確，已自動修復為 "${Q}"`), M.value = Q;
      }
      if (a.showTime && !ko(a.timeFormat)) {
        const x = a.timeFormat, Q = xo(a.timeFormat);
        m.value.timeFormat = `時間格式不正確: "${x}" 已自動修復為 "${Q}"`, console.warn(`時間格式 "${x}" 不正確，已自動修復為 "${Q}"`), w.value = Q;
      }
    }), ye(() => a.theme, (x) => {
      x && b(x);
    }, { immediate: !0 }), ye(() => a.mode, (x) => {
      Y(x);
    }, { immediate: !0 }), ye(() => a.locale, (x) => {
      x && n(x);
    }, { immediate: !0 }), e({
      // 基本操作
      focus: f.focus,
      reset: f.reset,
      validate: f.validate,
      selectNow: f.selectNow,
      // 數據獲取
      getDateTime: () => f.internalDateTime.value,
      setDateTime: (x) => {
        f.setExternalValue(x);
      },
      // 主題控制
      setTheme: b,
      setDarkMode: () => Y("dark"),
      setLightMode: () => Y("light"),
      setAutoMode: () => Y("auto"),
      getCurrentMode: () => S.value,
      isDarkMode: () => I.value,
      isLightMode: () => u.value,
      // 錯誤相關
      getErrors: () => ee.value,
      hasErrors: () => F.value
    });
    const {
      // 狀態
      inputDateValue: $,
      inputTimeValue: H,
      showCalendar: A,
      internalDateTime: X,
      calendarMinDate: ie,
      calendarMaxDate: ne,
      getValidDefaultTime: R,
      hasValue: T,
      // 事件處理
      validateDateInput: P,
      validateTimeInput: Z,
      handleDateComplete: j,
      handleTimeComplete: ae,
      handleCalendarSelect: z,
      handleTimeSelect: k,
      handleContainerClick: K,
      handleContainerMouseDown: ve,
      handleNavigateToDate: pe,
      // 日曆控制
      toggleCalendar: he,
      // 清除功能
      reset: De
    } = f;
    return (x, Q) => (L(), q(Se, null, [
      J("div", ur({
        class: ["date-picker-wrapper relative w-full", [O(c), x.showTime ? "min-w-[300px]" : "min-w-[150px]"]]
      }, O(D), {
        ref_key: "containerRef",
        ref: d
      }), [
        J("div", {
          class: Fe(["date-picker-container flex w-full items-center px-2 py-1 border border-gray-200 bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed", [{ "border-red-500 ring-2 ring-red-200": F.value }]])
        }, [
          N.value && x.inputEnabled ? (L(), q("div", {
            key: 0,
            class: Fe(["flex w-full items-center justify-start gap-2", [x.disabled ? "cursor-not-allowed cursor-event-none opacity-50" : ""]]),
            onClick: Q[2] || (Q[2] = Ie(
              //@ts-ignore
              (...le) => O(K) && O(K)(...le),
              ["stop"]
            )),
            onMousedown: Q[3] || (Q[3] = //@ts-ignore
            (...le) => O(ve) && O(ve)(...le))
          }, [
            J("div", null, [
              me(ma, {
                ref_key: "dateInputRef",
                ref: g,
                modelValue: O($),
                "onUpdate:modelValue": Q[0] || (Q[0] = (le) => Ea($) ? $.value = le : null),
                "year-placeholder": U.value.year,
                "month-placeholder": U.value.month,
                "day-placeholder": U.value.day,
                "min-date": h.value,
                "max-date": y.value,
                required: x.required,
                separator: x.dateSeparator,
                "date-format": B.value,
                onValidation: O(P),
                onComplete: O(j)
              }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "required", "separator", "date-format", "onValidation", "onComplete"])
            ]),
            x.showTime ? (L(), q("div", vs, [
              me(ha, {
                ref_key: "timeInputRef",
                ref: v,
                modelValue: O(H),
                "onUpdate:modelValue": Q[1] || (Q[1] = (le) => Ea(H) ? H.value = le : null),
                "hour-placeholder": U.value.hour,
                "minute-placeholder": U.value.minute,
                "second-placeholder": U.value.second,
                "enable-seconds": x.enableSeconds,
                use24Hour: x.use24Hour,
                required: x.required,
                locale: x.locale,
                useLocalizedPeriod: x.useLocalizedPeriod,
                onValidation: O(Z),
                onComplete: O(ae),
                onNavigateToDate: O(pe)
              }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "required", "locale", "useLocalizedPeriod", "onValidation", "onComplete", "onNavigateToDate"])
            ])) : fe("", !0)
          ], 34)) : (L(), q("button", {
            key: 1,
            type: "button",
            class: Fe(["flex w-full h-full items-center justify-start gap-1", {
              "cursor-not-allowed opacity-50": x.disabled
            }]),
            onClick: Q[4] || (Q[4] = Ie((le) => {
              var ce;
              return !x.disabled && ((ce = O(he)) == null ? void 0 : ce());
            }, ["stop"])),
            onKeydown: [
              Q[5] || (Q[5] = Pe(Ie((le) => {
                var ce;
                return !x.disabled && ((ce = O(he)) == null ? void 0 : ce());
              }, ["prevent"]), ["enter"])),
              Q[6] || (Q[6] = Pe(Ie((le) => {
                var ce;
                return !x.disabled && ((ce = O(he)) == null ? void 0 : ce());
              }, ["prevent"]), ["space"]))
            ]
          }, [
            _.value ? (L(), q("span", ps, oe(x.modelValue), 1)) : (L(), q("span", gs, oe(te.value), 1))
          ], 34)),
          J("button", {
            type: "button",
            class: "date-picker-icon text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed",
            disabled: x.disabled,
            onClick: Q[7] || (Q[7] = Ie((le) => {
              var ce;
              return (ce = O(he)) == null ? void 0 : ce();
            }, ["stop", "prevent"]))
          }, [
            me(Pr, { class: "h-5 w-5" })
          ], 8, ys),
          O(T) && !x.disabled && x.showClearButton ? (L(), q("button", {
            key: 2,
            type: "button",
            class: "date-picker-icon text-gray-400 hover:text-red-500 transition-colors duration-200 ml-1 cursor-pointer disabled:cursor-not-allowed",
            onClick: Q[8] || (Q[8] = Ie(
              //@ts-ignore
              (...le) => O(De) && O(De)(...le),
              ["stop"]
            ))
          }, [
            me(Hr, { class: "h-4 w-4" })
          ])) : fe("", !0)
        ], 2),
        O(A) && !x.disabled ? (L(), q("div", {
          key: 0,
          ref_key: "calendarRef",
          ref: p,
          class: "calendar-container absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10",
          onClick: Q[9] || (Q[9] = Ie(() => {
          }, ["stop"])),
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "date-picker"
        }, [
          me(va, {
            value: O(X),
            weekStartsOn: x.weekStartsOn,
            "min-date": O(ie),
            "max-date": O(ne),
            showTimeSelector: x.showTime,
            "time-value": O(H),
            use24Hour: x.use24Hour,
            "default-time": O(R),
            enableSeconds: x.enableSeconds,
            locale: x.locale,
            calendar: x.calendar,
            onSelect: O(z),
            onTimeSelect: O(k)
          }, mt({ _: 2 }, [
            Me(i.value, (le, ce) => ({
              name: ce,
              fn: ht((Ne) => [
                $e(x.$slots, ce, vt(pt(Ne)))
              ])
            }))
          ]), 1032, ["value", "weekStartsOn", "min-date", "max-date", "showTimeSelector", "time-value", "use24Hour", "default-time", "enableSeconds", "locale", "calendar", "onSelect", "onTimeSelect"])
        ], 512)) : fe("", !0)
      ], 16),
      x.showErrorMessage && F.value ? (L(), q("div", $s, [
        $e(x.$slots, "error", {
          errors: ee.value,
          hasErrors: F.value
        }, () => [
          me(Ar, {
            errors: ee.value,
            locale: x.locale,
            "use-i18n": x.useI18n,
            "custom-messages": x.customErrorMessages,
            errorParams: C.value
          }, mt({ _: 2 }, [
            Me(x.$slots, (le, ce) => ({
              name: ce,
              fn: ht((Ne) => [
                $e(x.$slots, ce, vt(pt(Ne)))
              ])
            }))
          ]), 1032, ["errors", "locale", "use-i18n", "custom-messages", "errorParams"])
        ])
      ])) : fe("", !0)
    ], 64));
  }
}), bs = { class: "dual-month-calendar flex flex-col gap-4 min-w-auto md:min-w-[570px] md:flex-row m-1" }, Ms = { class: "calendar-container flex-1 min-w-auto md:min-w-[275px]" }, Ss = { class: "calendar-container flex-1 md:min-w-[275px] min-w-auto" }, ws = /* @__PURE__ */ Re({
  __name: "DualMonthCalendar",
  props: {
    rangeStart: { default: null },
    rangeEnd: { default: null },
    minDate: { default: null },
    maxDate: { default: null },
    locale: { default: "en-US" },
    weekStartsOn: { default: 0 },
    calendar: { default: "gregory" },
    showTimeSelector: { type: Boolean, default: !1 },
    startTimeValue: { default: null },
    endTimeValue: { default: null },
    enableSeconds: { type: Boolean, default: !0 },
    use24Hour: { type: Boolean, default: !0 },
    defaultTime: { default: "00:00:00" },
    initialYear: { default: () => rt().year },
    initialMonth: { default: () => rt().month }
  },
  emits: ["range-select", "time-select"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, o = () => {
      if (a.initialYear && a.initialMonth)
        return { year: a.initialYear, month: a.initialMonth };
      if (a.rangeStart)
        return { year: a.rangeStart.year, month: a.rangeStart.month };
      const c = rt();
      return { year: c.year, month: c.month };
    }, { year: l, month: s } = o(), i = W(l), d = W(s), p = E(() => d.value === 12 ? i.value + 1 : i.value), g = E(() => d.value === 12 ? 1 : d.value + 1), v = W({
      isSelecting: !1,
      tempStart: null
    });
    ye(() => [a.rangeStart, a.rangeEnd], ([c, D]) => {
      c && !a.initialYear && !a.initialMonth && (i.value = c.year, d.value = c.month), c && D ? (v.value.isSelecting = !1, v.value.tempStart = null) : c && !D ? (v.value.isSelecting = !0, v.value.tempStart = c) : (v.value.isSelecting = !1, v.value.tempStart = null);
    }, { immediate: !0, deep: !0 });
    const M = (c, D) => {
      if (!c) {
        v.value.isSelecting = !1, v.value.tempStart = null, n("range-select", null, null);
        return;
      }
      if (!v.value.isSelecting)
        v.value.isSelecting = !0, v.value.tempStart = c, n("range-select", c, null);
      else {
        const b = v.value.tempStart;
        if (b && (c.year !== b.year || c.month !== b.month || c.day !== b.day)) {
          v.value.isSelecting = !1, v.value.tempStart = null;
          const Y = b.year * 1e4 + b.month * 100 + b.day, S = c.year * 1e4 + c.month * 100 + c.day;
          Y <= S ? n("range-select", b, c) : n("range-select", c, b);
        } else
          v.value.tempStart = c, n("range-select", c, null);
      }
    }, w = (c, D) => {
      n("time-select", c, D);
    };
    return e({
      // 獲取當前顯示的月份
      getCurrentDisplay: () => ({
        left: { year: i.value, month: d.value },
        right: { year: p.value, month: g.value }
      }),
      // 設置顯示月份
      setDisplayMonth: (c, D) => {
        i.value = c, d.value = D;
      },
      // 重置範圍選擇狀態
      resetRangeSelection: () => {
        v.value.isSelecting = !1, v.value.tempStart = null;
      },
      // 獲取當前選擇狀態
      getSelectionState: () => ({
        isSelecting: v.value.isSelecting,
        tempStart: v.value.tempStart
      }),
      // 月份導航
      previousMonth: () => {
        d.value === 1 ? (d.value = 12, i.value -= 1) : d.value -= 1;
      },
      nextMonth: () => {
        d.value === 12 ? (d.value = 1, i.value += 1) : d.value += 1;
      }
    }), (c, D) => (L(), q("div", bs, [
      J("div", Ms, [
        me(va, {
          "range-start": c.rangeStart,
          "range-end": c.rangeEnd,
          "selection-mode": "range",
          year: i.value,
          month: d.value,
          "min-date": c.minDate,
          "max-date": c.maxDate,
          locale: c.locale,
          "week-starts-on": c.weekStartsOn,
          calendar: c.calendar,
          showTimeSelector: c.showTimeSelector,
          "time-value": c.startTimeValue,
          "enable-seconds": c.enableSeconds,
          "use24-hour": c.use24Hour,
          "default-time": c.defaultTime,
          onRangeSelect: M,
          onTimeSelect: D[0] || (D[0] = (b) => w(b, "start"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour", "default-time"])
      ]),
      J("div", Ss, [
        me(va, {
          "range-start": c.rangeStart,
          "range-end": c.rangeEnd,
          "selection-mode": "range",
          year: p.value,
          month: g.value,
          "min-date": c.minDate,
          "max-date": c.maxDate,
          locale: c.locale,
          "week-starts-on": c.weekStartsOn,
          calendar: c.calendar,
          showTimeSelector: c.showTimeSelector,
          "time-value": c.endTimeValue,
          "enable-seconds": c.enableSeconds,
          "use24-hour": c.use24Hour,
          "default-time": c.defaultTime,
          onRangeSelect: M,
          onTimeSelect: D[1] || (D[1] = (b) => w(b, "end"))
        }, null, 8, ["range-start", "range-end", "year", "month", "min-date", "max-date", "locale", "week-starts-on", "calendar", "showTimeSelector", "time-value", "enable-seconds", "use24-hour", "default-time"])
      ])
    ]));
  }
}), Yt = "00:00:00", Rt = "23:59:59";
function ks(r = {}, e) {
  const {
    calendar: t = "gregory",
    modelValue: a = null,
    showTime: n = !1,
    required: o = !1,
    disabled: l = !1,
    incomplete: s = !1,
    dateFormat: i = "YYYY-MM-DD",
    timeFormat: d = "HH:mm:ss",
    outputType: p = "iso",
    useStrictISO: g = !1,
    enableSeconds: v = !1,
    minDate: M,
    maxDate: w,
    maxRange: m,
    minRange: f,
    locale: c = "zh-TW"
  } = r, {
    containerRef: D,
    calendarRef: b,
    startDateInputRef: Y,
    endDateInputRef: S,
    startTimeInputRef: I,
    endTimeInputRef: u
  } = e, h = W(l);
  let y = {};
  const B = ga({
    required: o,
    showTime: n,
    minDate: M,
    maxDate: w,
    dateFormat: i
  }), N = ga({
    required: o,
    showTime: n,
    minDate: M,
    maxDate: w,
    dateFormat: i
  }), _ = ya({
    showTime: n,
    dateFormat: i,
    timeFormat: d,
    outputType: p,
    defaultTime: Yt,
    enableSeconds: v
  }), U = ya({
    showTime: n,
    dateFormat: i,
    timeFormat: d,
    outputType: p,
    defaultTime: Rt,
    enableSeconds: v
  }), te = qr(
    D,
    b,
    { disabled: h }
  ), ee = pa(
    { dateInputRef: Y, timeInputRef: I },
    { showTime: n, autoFocusTimeAfterDate: !0 }
  ), C = pa(
    { dateInputRef: S, timeInputRef: u },
    { showTime: n, autoFocusTimeAfterDate: !0 }
  ), F = E(
    () => _.hasValue.value || U.hasValue.value
  ), $ = E(() => {
    const V = {
      ...B.mergedErrors.value,
      ...N.mergedErrors.value
    };
    return _.internalDateTime.value && !U.internalDateTime.value && s && (V["range.endRequired"] = "range.endRequired"), V;
  }), H = E(() => ({
    ...B.mergedErrorParams.value,
    ...N.mergedErrorParams.value
  })), A = E(() => Object.keys($.value).length > 0), X = E(() => {
    const V = _.internalDateTime.value, G = U.internalDateTime.value;
    if (!V || !G || jt(V, G) > 0) return !1;
    if (m || f) {
      const re = or(V, G);
      if (m && re > m)
        return N.handleDateValidation(!1, {
          range: "range.exceedsMaxRange"
        }, "endDate", {
          range: { maxRange: m, actualDays: re }
        }), !1;
      if (f && re < f)
        return N.handleDateValidation(!1, {
          range: "range.belowMinRange"
        }, "endDate", {
          range: { minRange: f, actualDays: re }
        }), !1;
      N.clearFieldErrors("range");
    }
    return !A.value;
  }), ie = E(() => [
    {
      label: "今天",
      getValue: () => {
        const V = Qe();
        return { start: V, end: V };
      }
    },
    {
      label: "最近7天",
      getValue: () => ({
        start: fa(Qe(), -6),
        end: Qe()
      })
    },
    {
      label: "最近30天",
      getValue: () => ({
        start: fa(Qe(), -29),
        end: Qe()
      })
    },
    {
      label: "本月",
      getValue: So
    }
  ]), ne = E(() => ({
    minDate: ge(M, c),
    maxDate: U.internalDateTime.value || ge(w, c)
  })), R = E(() => ({
    minDate: _.internalDateTime.value || ge(M, c),
    maxDate: ge(w, c)
  })), T = E(() => ({
    minDate: ne.value.minDate ? xe(ne.value.minDate, i) : null,
    maxDate: ne.value.maxDate ? xe(ne.value.maxDate, i) : null
  })), P = E(() => ({
    minDate: R.value.minDate ? xe(R.value.minDate, i) : null,
    maxDate: R.value.maxDate ? xe(R.value.maxDate, i) : null
  }));
  function Z(V, G) {
    const re = or(V, G);
    return m && re > m ? {
      valid: !1,
      error: "range.exceedsMaxRange",
      params: { maxRange: m, actualDays: re }
    } : f && re < f ? {
      valid: !1,
      error: "range.belowMinRange",
      params: { minRange: f, actualDays: re }
    } : { valid: !0 };
  }
  function j(V) {
    !V.error || !V.params || N.handleDateValidation(
      !1,
      { range: V.error },
      "endDate",
      { range: V.params }
    );
  }
  function ae() {
    var we, wt, st, Ya, Ra;
    if (!_.internalDateTime.value || !U.internalDateTime.value) {
      (we = y.update) == null || we.call(y, null), (wt = y.change) == null || wt.call(y, null);
      return;
    }
    const V = n ? `${i} ${d}` : i, G = {
      start: Wt(
        _.internalDateTime.value,
        p,
        V,
        n,
        t,
        c,
        g
      ),
      end: Wt(
        U.internalDateTime.value,
        p,
        V,
        n,
        t,
        c,
        g
      )
    };
    (st = y.update) == null || st.call(y, G), (Ya = y.change) == null || Ya.call(y, G);
    const re = X.value && !A.value;
    (Ra = y.validation) == null || Ra.call(y, re, $.value);
  }
  function z(V, G) {
    G.forEach((re) => V.clearFieldErrors(re));
  }
  const k = (V) => {
    y = V;
  }, K = (V, G, re, we, wt) => {
    var st;
    re.handleDateValidation(V, G, we, wt), (st = y.validation) == null || st.call(y, !A.value, $.value);
  }, ve = (V, G, re) => {
    K(V, G, B, "startDate", re);
  }, pe = (V, G, re) => {
    K(V, G, N, "endDate", re);
  }, he = (V, G, re = {}) => {
    var we;
    B.handleTimeValidation(V, G, "startTime", re), (we = y.validation) == null || we.call(y, !A.value, $.value);
  }, De = (V, G, re = {}) => {
    var we;
    N.handleTimeValidation(V, G, "endTime", re), (we = y.validation) == null || we.call(y, !A.value, $.value);
  }, x = (V) => {
    _.inputDateValue.value = V;
    const G = _.updateFromInputs();
    if (!G) {
      B.handleDateValidation(!1, { date: "date.invalid" });
      return;
    }
    B.validateDateRange(G) && (ee.autoFocusTimeAfterDateComplete(
      _,
      Yt
    ), ae(), z(B, ["startDate", "date.year", "date.month", "date.day"]), n || C.focusFirstInput());
  }, Q = (V) => {
    U.inputDateValue.value = V;
    const G = U.updateFromInputs();
    if (!G) {
      N.handleDateValidation(!1, { date: "date.invalid" });
      return;
    }
    N.validateDateRange(G) && (C.autoFocusTimeAfterDateComplete(
      U,
      Rt
    ), ae(), z(N, ["endDate", "date.year", "date.month", "date.day"]));
  }, le = (V) => {
    _.inputTimeValue.value = V, _.updateFromInputs() && ae(), z(B, ["startTime", "time.hour", "time.minute", "time.second"]);
  }, ce = (V) => {
    U.inputTimeValue.value = V, U.updateFromInputs() && ae(), z(N, ["endTime", "time.hour", "time.minute", "time.second"]);
  }, Ne = (V, G) => {
    V && !G ? bt(V) : V && G ? Mt(V, G) : Qt(), ae();
  };
  function bt(V) {
    B.validateDateRange(V) && (_.setInternalDateTime(V), z(B, ["startDate", "date.year", "date.month", "date.day"]), U.clearValues());
  }
  function Mt(V, G) {
    if (!(!B.validateDateRange(V) || !N.validateDateRange(G))) {
      if (m || f) {
        const re = Z(V, G);
        if (!re.valid) {
          j(re);
          return;
        }
      }
      _.setInternalDateTime(V), U.setInternalDateTime(G), n && (_.inputTimeValue.value || (_.inputTimeValue.value = Yt, _.updateFromInputs()), U.inputTimeValue.value || (U.inputTimeValue.value = Rt, U.updateFromInputs())), z(B, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]), z(N, ["startDate", "endDate", "range", "date.year", "date.month", "date.day"]);
    }
  }
  const St = (V, G) => {
    G === "start" && _.internalDateTime.value && le(V), G === "end" && U.internalDateTime.value && ce(V);
  }, Ur = (V) => {
    const G = V.getValue();
    _.setInternalDateTime(G.start), U.setInternalDateTime(G.end), n && (_.inputTimeValue.value || (_.inputTimeValue.value = Yt, _.updateFromInputs()), U.inputTimeValue.value || (U.inputTimeValue.value = Rt, U.updateFromInputs())), ae();
  }, Qt = () => {
    _.clearValues(), U.clearValues(), B.clearAllErrors(), N.clearAllErrors(), ae();
  }, zr = (V) => {
    V ? (_.setExternalValue(V.start), U.setExternalValue(V.end)) : Qt(), ae();
  }, Wr = () => {
    var V, G, re, we;
    return (V = Y.value) == null || V.validate(), (G = S.value) == null || G.validate(), n && ((re = I.value) == null || re.validate(), (we = u.value) == null || we.validate()), X.value;
  }, jr = (V) => {
    te.handleContainerClick(V, () => {
      ee.focusFirstInput();
    });
  }, Jr = (V) => {
    te.handleContainerClick(V, () => {
      C.focusFirstInput();
    });
  };
  return ye(() => a, (V) => {
    if (V && V.start && V.end) {
      const G = ge(V.start, c), re = ge(V.end, c);
      G && re && jt(G, re) > 0 ? (console.warn("Initial date range has start > end, auto-swapping values"), _.setExternalValue(V.end), U.setExternalValue(V.start), setTimeout(() => {
        ae();
      }, 0)) : (_.setExternalValue(V.start), U.setExternalValue(V.end));
    } else V ? (_.setExternalValue(V.start || null), U.setExternalValue(V.end || null)) : (_.clearValues(), U.clearValues());
  }, { immediate: !0 }), {
    // 狀態
    isDisabled: h,
    startDateConstraints: ne,
    endDateConstraints: R,
    startDateConstraintsStr: T,
    endDateConstraintsStr: P,
    // 驗證相關
    hasErrors: A,
    mergedErrors: $,
    mergedErrorParams: H,
    isValidRange: X,
    // 日期時間值
    startDateTime: _,
    endDateTime: U,
    // 顯示值
    hasRangeValue: F,
    // 日曆相關
    ...te,
    // 快捷選項
    shortcuts: ie,
    // 事件設置
    setEmitters: k,
    // 驗證事件處理
    handleStartDateValidation: ve,
    handleEndDateValidation: pe,
    handleStartTimeValidation: he,
    handleEndTimeValidation: De,
    // 完成事件處理
    handleStartDateComplete: x,
    handleEndDateComplete: Q,
    handleStartTimeComplete: le,
    handleEndTimeComplete: ce,
    // 日曆事件處理
    handleCalendarRangeSelect: Ne,
    handleTimeSelect: St,
    // 導航事件處理
    handleStartNavigateToDate: ee.handleNavigateToDate,
    handleEndNavigateToDate: C.handleNavigateToDate,
    // 主要操作
    applyShortcut: Ur,
    clearRange: Qt,
    setRange: zr,
    validate: Wr,
    // 導航方法
    focusStartDate: jr,
    focusEndDate: Jr
  };
}
const Ts = ["disabled"], xs = { class: "flex-1 text-center whitespace-nowrap" }, Ys = {
  key: 0,
  class: "text-vdt-content text-sm"
}, Rs = {
  key: 1,
  class: "text-vdt-content-muted text-sm"
}, Cs = { class: "text-vdt-content-muted text-sm px-1" }, Es = { class: "flex-1 text-center whitespace-nowrap" }, Is = {
  key: 0,
  class: "text-vdt-content text-sm"
}, Os = {
  key: 1,
  class: "text-vdt-content-muted text-sm"
}, Fs = ["disabled", "title"], Vs = ["disabled"], As = { class: "p-2 space-y-2" }, Ps = {
  key: 0,
  class: "w-full flex flex-col md:flex-row flex-justify-between gap-2"
}, Ls = { key: 1 }, Bs = { class: "flex flex-wrap gap-2" }, Hs = ["onClick"], qs = { key: 2 }, Ns = { class: "flex flex-wrap gap-2" }, Us = { class: "calendar-container flex flex-col md:flex-row gap-1 overflow-auto" }, zs = { key: 0 }, Ws = /* @__PURE__ */ Re({
  __name: "DateRange",
  props: {
    modelValue: { default: null },
    placeholderOverrides: { default: () => ({}) },
    separator: { default: " ~ " },
    showShortcuts: { type: Boolean, default: !1 },
    incomplete: { type: Boolean, default: !0 },
    maxRange: { default: void 0 },
    minRange: { default: void 0 },
    mode: { default: "auto" },
    theme: { default: () => "violet" },
    calendar: { default: "gregory" },
    locale: { default: "zh-TW" },
    outputType: { default: "iso" },
    useStrictISO: { type: Boolean, default: !1 },
    weekStartsOn: { default: 0 },
    minDate: { default: void 0 },
    maxDate: { default: void 0 },
    dateSeparator: { default: "-" },
    dateFormat: { default: "YYYY-MM-DD" },
    timeFormat: { default: "HH:mm:ss" },
    showTime: { type: Boolean, default: !0 },
    enableSeconds: { type: Boolean, default: !0 },
    use24Hour: { type: Boolean, default: !0 },
    useLocalizedPeriod: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    inputEnabled: { type: Boolean, default: !0 },
    required: { type: Boolean, default: !1 },
    showClearButton: { type: Boolean, default: !0 },
    showErrorMessage: { type: Boolean, default: !0 },
    useI18n: { type: Boolean, default: !0 },
    customErrorMessages: { default: () => ({}) }
  },
  emits: ["update:modelValue", "change", "validation"],
  setup(r, { expose: e, emit: t }) {
    const a = r, n = t, o = W(null), l = W(null), s = W(null), i = W(null), d = W(null), p = W(null), g = ks(
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
        startTimeInputRef: d,
        endTimeInputRef: p
      }
    ), { setLocale: v, getPlaceholderMessage: M } = Dt(a.locale);
    g.setEmitters({
      update: (k) => n("update:modelValue", k),
      change: (k) => n("change", k),
      validation: (k, K) => n("validation", k, K)
    });
    const {
      themeClasses: w,
      containerAttributes: m,
      setColor: f,
      setMode: c
    } = Nr(), D = E(() => {
      var K, ve, pe, he, De, x, Q, le;
      const k = {
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
        start: ((K = a.placeholderOverrides) == null ? void 0 : K.start) || k.start,
        end: ((ve = a.placeholderOverrides) == null ? void 0 : ve.end) || k.end,
        // 時間相關
        hour: ((pe = a.placeholderOverrides) == null ? void 0 : pe.hour) || k.hour,
        minute: ((he = a.placeholderOverrides) == null ? void 0 : he.minute) || k.minute,
        second: ((De = a.placeholderOverrides) == null ? void 0 : De.second) || k.second,
        // 日期相關
        year: ((x = a.placeholderOverrides) == null ? void 0 : x.year) || k.year,
        month: ((Q = a.placeholderOverrides) == null ? void 0 : Q.month) || k.month,
        day: ((le = a.placeholderOverrides) == null ? void 0 : le.day) || k.day
      };
    }), b = E(() => a.dateFormat), Y = E(() => Object.keys(_.value).length > 0);
    ye(() => a.theme, (k) => {
      k && f(k);
    }, { immediate: !0 }), ye(() => a.mode, (k) => {
      c(k);
    }, { immediate: !0 }), ye(() => a.locale, (k) => {
      k && v(k);
    }, { immediate: !0 }), ir(() => {
      v(a.locale);
    }), e({
      // 基本操作
      reset: g.clearRange,
      validate: g.validate,
      setRange: g.setRange,
      // 聚焦方法
      focusStartDate: g.focusStartDate,
      focusEndDate: g.focusEndDate,
      // 主題控制
      setTheme: f,
      setDarkMode: () => c("dark"),
      setLightMode: () => c("light"),
      setAutoMode: () => c("auto"),
      // 錯誤相關
      getErrors: () => _.value,
      hasErrors: () => Y.value
    });
    const {
      // 狀態
      showCalendar: S,
      startDateConstraintsStr: I,
      endDateConstraintsStr: u,
      shortcuts: h,
      startDateTime: y,
      endDateTime: B,
      hasRangeValue: N,
      mergedErrors: _,
      mergedErrorParams: U,
      // 事件處理方法
      handleStartDateValidation: te,
      handleEndDateValidation: ee,
      handleStartTimeValidation: C,
      handleEndTimeValidation: F,
      handleStartDateComplete: $,
      handleEndDateComplete: H,
      handleStartTimeComplete: A,
      handleEndTimeComplete: X,
      handleCalendarRangeSelect: ie,
      handleStartNavigateToDate: ne,
      handleEndNavigateToDate: R,
      handleTimeSelect: T,
      // 操作方法
      toggleCalendar: P,
      applyShortcut: Z,
      clearRange: j,
      focusStartDate: ae,
      focusEndDate: z
    } = g;
    return (k, K) => {
      var ve, pe, he, De;
      return L(), q(Se, null, [
        J("div", ur({
          class: ["date-range-wrapper md:min-w-auto relative w-full", [O(w), k.showTime ? "min-w-[300px]" : "min-w-[200px]"]]
        }, O(m), {
          ref_key: "containerRef",
          ref: o
        }), [
          J("div", {
            class: Fe(["date-picker-container flex w-full items-center px-2 py-1 border border-gray-200 bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200", [{ "border-red-500 ring-2 ring-red-200": Y.value }]])
          }, [
            J("button", {
              type: "button",
              class: "flex items-center gap-1 flex-1 cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
              disabled: k.disabled,
              onClick: K[0] || (K[0] = //@ts-ignore
              (...x) => O(P) && O(P)(...x))
            }, [
              J("div", xs, [
                (ve = k.modelValue) != null && ve.start ? (L(), q("span", Ys, oe((pe = k.modelValue) == null ? void 0 : pe.start), 1)) : (L(), q("span", Rs, oe(D.value.start), 1))
              ]),
              J("div", Cs, oe(k.separator), 1),
              J("div", Es, [
                (he = k.modelValue) != null && he.end ? (L(), q("span", Is, oe((De = k.modelValue) == null ? void 0 : De.end), 1)) : (L(), q("span", Os, oe(D.value.end), 1))
              ])
            ], 8, Ts),
            O(N) && !k.disabled && k.showClearButton ? (L(), q("button", {
              key: 0,
              type: "button",
              disabled: k.disabled,
              class: "text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed",
              onClick: K[1] || (K[1] = //@ts-ignore
              (...x) => O(j) && O(j)(...x)),
              title: "清除日期" + (k.showTime ? "時間" : "")
            }, [
              me(Hr, { class: "h-4 w-4" })
            ], 8, Fs)) : (L(), q("button", {
              key: 1,
              type: "button",
              class: "text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed",
              disabled: k.disabled,
              onClick: K[2] || (K[2] = //@ts-ignore
              (...x) => O(P) && O(P)(...x))
            }, [
              me(Pr, { class: "h-5 w-5" })
            ], 8, Vs))
          ], 2),
          O(S) && !k.disabled ? (L(), q("div", {
            key: 0,
            ref_key: "calendarRef",
            ref: l,
            class: "absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10 overflow-auto md:min-w-[570px]",
            onClick: K[9] || (K[9] = Ie(() => {
            }, ["stop"])),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "date-range-picker"
          }, [
            J("div", As, [
              k.inputEnabled ? (L(), q("div", Ps, [
                J("div", {
                  onClick: K[5] || (K[5] = Ie(
                    //@ts-ignore
                    (...x) => O(ae) && O(ae)(...x),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center px-2 py-1 gap-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  me(ma, {
                    ref_key: "startDateInputRef",
                    ref: s,
                    modelValue: O(y).inputDateValue.value,
                    "onUpdate:modelValue": K[3] || (K[3] = (x) => O(y).inputDateValue.value = x),
                    "year-placeholder": D.value.year,
                    "month-placeholder": D.value.month,
                    "day-placeholder": D.value.day,
                    "max-date": O(I).maxDate,
                    "min-date": O(I).minDate,
                    "date-format": b.value,
                    onValidation: O(te),
                    onComplete: O($)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "max-date", "min-date", "date-format", "onValidation", "onComplete"]),
                  k.showTime ? (L(), na(ha, {
                    key: 0,
                    ref_key: "startTimeInputRef",
                    ref: d,
                    modelValue: O(y).inputTimeValue.value,
                    "onUpdate:modelValue": K[4] || (K[4] = (x) => O(y).inputTimeValue.value = x),
                    "hour-placeholder": D.value.hour,
                    "minute-placeholder": D.value.minute,
                    "second-placeholder": D.value.second,
                    "enable-seconds": k.enableSeconds,
                    use24Hour: k.use24Hour,
                    locale: k.locale,
                    onValidation: O(C),
                    onComplete: O(A),
                    onNavigateToDate: O(ne)
                  }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])) : fe("", !0)
                ]),
                J("div", {
                  onClick: K[8] || (K[8] = Ie(
                    //@ts-ignore
                    (...x) => O(z) && O(z)(...x),
                    ["stop"]
                  )),
                  class: "flex-1 flex w-full items-center gap-2 px-2 py-1 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200"
                }, [
                  me(ma, {
                    ref_key: "endDateInputRef",
                    ref: i,
                    modelValue: O(B).inputDateValue.value,
                    "onUpdate:modelValue": K[6] || (K[6] = (x) => O(B).inputDateValue.value = x),
                    "year-placeholder": D.value.year,
                    "month-placeholder": D.value.month,
                    "day-placeholder": D.value.day,
                    "min-date": O(u).minDate,
                    "max-date": O(u).maxDate,
                    "date-format": b.value,
                    onValidation: O(ee),
                    onComplete: O(H)
                  }, null, 8, ["modelValue", "year-placeholder", "month-placeholder", "day-placeholder", "min-date", "max-date", "date-format", "onValidation", "onComplete"]),
                  k.showTime ? (L(), na(ha, {
                    key: 0,
                    ref_key: "endTimeInputRef",
                    ref: p,
                    modelValue: O(B).inputTimeValue.value,
                    "onUpdate:modelValue": K[7] || (K[7] = (x) => O(B).inputTimeValue.value = x),
                    "hour-placeholder": D.value.hour,
                    "minute-placeholder": D.value.minute,
                    "second-placeholder": D.value.second,
                    "enable-seconds": k.enableSeconds,
                    use24Hour: k.use24Hour,
                    locale: k.locale,
                    onValidation: O(F),
                    onComplete: O(X),
                    onNavigateToDate: O(R)
                  }, null, 8, ["modelValue", "hour-placeholder", "minute-placeholder", "second-placeholder", "enable-seconds", "use24Hour", "locale", "onValidation", "onComplete", "onNavigateToDate"])) : fe("", !0)
                ])
              ])) : fe("", !0),
              O(h).length > 0 && k.showShortcuts ? (L(), q("div", Ls, [
                J("div", Bs, [
                  (L(!0), q(Se, null, Me(O(h), (x) => (L(), q("button", {
                    key: x.label,
                    type: "button",
                    class: "px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors",
                    onClick: (Q) => O(Z)(x)
                  }, oe(x.label), 9, Hs))), 128)),
                  $e(k.$slots, "shortcuts", {
                    applyShortcut: O(Z),
                    shortcuts: O(h),
                    currentRange: k.modelValue
                  })
                ])
              ])) : k.$slots.shortcuts && k.showShortcuts ? (L(), q("div", qs, [
                J("div", Ns, [
                  $e(k.$slots, "shortcuts", {
                    applyShortcut: O(Z),
                    shortcuts: O(h),
                    currentRange: k.modelValue
                  })
                ])
              ])) : fe("", !0),
              J("div", Us, [
                me(ws, {
                  showTimeSelector: k.showTime,
                  calendar: k.calendar,
                  "range-start": O(y).internalDateTime.value,
                  "range-end": O(B).internalDateTime.value,
                  enableSeconds: k.enableSeconds,
                  use24Hour: k.use24Hour,
                  locale: k.locale,
                  "week-starts-on": k.weekStartsOn,
                  "start-time-value": O(y).inputTimeValue.value,
                  "end-time-value": O(B).inputTimeValue.value,
                  "min-date": O(ge)(k.minDate),
                  "max-date": O(ge)(k.maxDate),
                  onRangeSelect: O(ie),
                  onTimeSelect: O(T)
                }, null, 8, ["showTimeSelector", "calendar", "range-start", "range-end", "enableSeconds", "use24Hour", "locale", "week-starts-on", "start-time-value", "end-time-value", "min-date", "max-date", "onRangeSelect", "onTimeSelect"])
              ])
            ])
          ], 512)) : fe("", !0)
        ], 16),
        k.showErrorMessage && Y.value ? (L(), q("div", zs, [
          $e(k.$slots, "error", {
            errors: O(_),
            hasErrors: Y.value
          }, () => [
            me(Ar, {
              errors: O(_),
              locale: k.locale,
              "use-i18n": k.useI18n,
              "custom-messages": k.customErrorMessages,
              errorParams: O(U)
            }, mt({ _: 2 }, [
              Me(k.$slots, (x, Q) => ({
                name: Q,
                fn: ht((le) => [
                  $e(k.$slots, Q, vt(pt(le)))
                ])
              }))
            ]), 1032, ["errors", "locale", "use-i18n", "custom-messages", "errorParams"])
          ])
        ])) : fe("", !0)
      ], 64);
    };
  }
}), si = {
  install(r) {
    r.component("DatePicker", Ds), r.component("DateRange", Ws);
  }
};
export {
  Ds as DatePicker,
  Ws as DateRange,
  si as VueDatePickerTailwind,
  si as default,
  xe as formatSimpleDate,
  ge as parseInputToSimpleDate
};
