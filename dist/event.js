function Vt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let s = 0; s < o.length; s++)
    n[o[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function po(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = Z(o) ? Rr(o) : po(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else {
    if (Z(e))
      return e;
    if (B(e))
      return e;
  }
}
const Ar = /;(?![^(]*\))/g, Sr = /:([^]+)/, Mr = /\/\*.*?\*\//gs;
function Rr(e) {
  const t = {};
  return e.replace(Mr, "").split(Ar).forEach((n) => {
    if (n) {
      const o = n.split(Sr);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function ho(e) {
  let t = "";
  if (Z(e))
    t = e;
  else if (T(e))
    for (let n = 0; n < e.length; n++) {
      const o = ho(e[n]);
      o && (t += o + " ");
    }
  else if (B(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Fr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", jr = /* @__PURE__ */ Vt(Fr);
function vs(e) {
  return !!e || e === "";
}
const Qe = (e) => Z(e) ? e : e == null ? "" : T(e) || B(e) && (e.toString === ws || !I(e.toString)) ? JSON.stringify(e, bs, 2) : String(e), bs = (e, t) => t && t.__v_isRef ? bs(e, t.value) : it(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [o, s]) => (n[`${o} =>`] = s, n), {})
} : Os(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : B(t) && !T(t) && !Ds(t) ? String(t) : t, W = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, wt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], oe = () => {
}, ys = () => !1, Lr = /^on[^a-z]/, Wt = (e) => Lr.test(e), an = (e) => e.startsWith("onUpdate:"), X = Object.assign, _o = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Hr = Object.prototype.hasOwnProperty, R = (e, t) => Hr.call(e, t), T = Array.isArray, it = (e) => En(e) === "[object Map]", Os = (e) => En(e) === "[object Set]", I = (e) => typeof e == "function", Z = (e) => typeof e == "string", mo = (e) => typeof e == "symbol", B = (e) => e !== null && typeof e == "object", go = (e) => B(e) && I(e.then) && I(e.catch), ws = Object.prototype.toString, En = (e) => ws.call(e), Eo = (e) => En(e).slice(8, -1), Ds = (e) => En(e) === "[object Object]", No = (e) => Z(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, on = /* @__PURE__ */ Vt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), kr = /* @__PURE__ */ Vt("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), Nn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Br = /-(\w)/g, je = Nn((e) => e.replace(Br, (t, n) => n ? n.toUpperCase() : "")), Ur = /\B([A-Z])/g, he = Nn((e) => e.replace(Ur, "-$1").toLowerCase()), vn = Nn((e) => e.charAt(0).toUpperCase() + e.slice(1)), tt = Nn((e) => e ? `on${vn(e)}` : ""), jt = (e, t) => !Object.is(e, t), $t = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, dn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Kr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, ko = (e) => {
  const t = Z(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Bo;
const xs = () => Bo || (Bo = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Kn(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Ne;
class Wr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Ne, !t && Ne && (this.index = (Ne.scopes || (Ne.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Ne;
      try {
        return Ne = this, t();
      } finally {
        Ne = n;
      }
    } else
      process.env.NODE_ENV !== "production" && Kn("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Ne = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Ne = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function zr(e, t = Ne) {
  t && t.active && t.effects.push(e);
}
function qr() {
  return Ne;
}
const Lt = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Vs = (e) => (e.w & Xe) > 0, Cs = (e) => (e.n & Xe) > 0, Jr = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Xe;
}, Yr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let o = 0; o < t.length; o++) {
      const s = t[o];
      Vs(s) && !Cs(s) ? s.delete(e) : t[n++] = s, s.w &= ~Xe, s.n &= ~Xe;
    }
    t.length = n;
  }
}, Wn = /* @__PURE__ */ new WeakMap();
let At = 0, Xe = 1;
const zn = 30;
let fe;
const ct = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), qn = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class vo {
  constructor(t, n = null, o) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, zr(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = fe, n = Ye;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = fe, fe = this, Ye = !0, Xe = 1 << ++At, At <= zn ? Jr(this) : Uo(this), this.fn();
    } finally {
      At <= zn && Yr(this), Xe = 1 << --At, fe = this.parent, Ye = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    fe === this ? this.deferStop = !0 : this.active && (Uo(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Uo(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Ye = !0;
const Ts = [];
function ht() {
  Ts.push(Ye), Ye = !1;
}
function _t() {
  const e = Ts.pop();
  Ye = e === void 0 ? !0 : e;
}
function ue(e, t, n) {
  if (Ye && fe) {
    let o = Wn.get(e);
    o || Wn.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || o.set(n, s = Lt());
    const r = process.env.NODE_ENV !== "production" ? { effect: fe, target: e, type: t, key: n } : void 0;
    Jn(s, r);
  }
}
function Jn(e, t) {
  let n = !1;
  At <= zn ? Cs(e) || (e.n |= Xe, n = !Vs(e)) : n = !e.has(fe), n && (e.add(fe), fe.deps.push(e), process.env.NODE_ENV !== "production" && fe.onTrack && fe.onTrack(Object.assign({ effect: fe }, t)));
}
function He(e, t, n, o, s, r) {
  const i = Wn.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && T(e)) {
    const a = Number(o);
    i.forEach((h, d) => {
      (d === "length" || d >= a) && l.push(h);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        T(e) ? No(n) && l.push(i.get("length")) : (l.push(i.get(ct)), it(e) && l.push(i.get(qn)));
        break;
      case "delete":
        T(e) || (l.push(i.get(ct)), it(e) && l.push(i.get(qn)));
        break;
      case "set":
        it(e) && l.push(i.get(ct));
        break;
    }
  const f = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: o, oldValue: s, oldTarget: r } : void 0;
  if (l.length === 1)
    l[0] && (process.env.NODE_ENV !== "production" ? vt(l[0], f) : vt(l[0]));
  else {
    const a = [];
    for (const h of l)
      h && a.push(...h);
    process.env.NODE_ENV !== "production" ? vt(Lt(a), f) : vt(Lt(a));
  }
}
function vt(e, t) {
  const n = T(e) ? e : [...e];
  for (const o of n)
    o.computed && Ko(o, t);
  for (const o of n)
    o.computed || Ko(o, t);
}
function Ko(e, t) {
  (e !== fe || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(X({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Xr = /* @__PURE__ */ Vt("__proto__,__v_isRef,__isVue"), $s = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(mo)
), Zr = /* @__PURE__ */ bn(), Qr = /* @__PURE__ */ bn(!1, !0), Gr = /* @__PURE__ */ bn(!0), ei = /* @__PURE__ */ bn(!0, !0), Wo = /* @__PURE__ */ ti();
function ti() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = P(this);
      for (let r = 0, i = this.length; r < i; r++)
        ue(o, "get", r + "");
      const s = o[t](...n);
      return s === -1 || s === !1 ? o[t](...n.map(P)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ht();
      const o = P(this)[t].apply(this, n);
      return _t(), o;
    };
  }), e;
}
function ni(e) {
  const t = P(this);
  return ue(t, "has", e), t.hasOwnProperty(e);
}
function bn(e = !1, t = !1) {
  return function(o, s, r) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_isShallow")
      return t;
    if (s === "__v_raw" && r === (e ? t ? js : Fs : t ? Rs : Ms).get(o))
      return o;
    const i = T(o);
    if (!e) {
      if (i && R(Wo, s))
        return Reflect.get(Wo, s, r);
      if (s === "hasOwnProperty")
        return ni;
    }
    const l = Reflect.get(o, s, r);
    return (mo(s) ? $s.has(s) : Xr(s)) || (e || ue(o, "get", s), t) ? l : te(l) ? i && No(s) ? l : l.value : B(l) ? e ? Ls(l) : yo(l) : l;
  };
}
const oi = /* @__PURE__ */ Is(), si = /* @__PURE__ */ Is(!0);
function Is(e = !1) {
  return function(n, o, s, r) {
    let i = n[o];
    if (Ze(i) && te(i) && !te(s))
      return !1;
    if (!e && (!pn(s) && !Ze(s) && (i = P(i), s = P(s)), !T(n) && te(i) && !te(s)))
      return i.value = s, !0;
    const l = T(n) && No(o) ? Number(o) < n.length : R(n, o), f = Reflect.set(n, o, s, r);
    return n === P(r) && (l ? jt(s, i) && He(n, "set", o, s, i) : He(n, "add", o, s)), f;
  };
}
function ri(e, t) {
  const n = R(e, t), o = e[t], s = Reflect.deleteProperty(e, t);
  return s && n && He(e, "delete", t, void 0, o), s;
}
function ii(e, t) {
  const n = Reflect.has(e, t);
  return (!mo(t) || !$s.has(t)) && ue(e, "has", t), n;
}
function ci(e) {
  return ue(e, "iterate", T(e) ? "length" : ct), Reflect.ownKeys(e);
}
const Ps = {
  get: Zr,
  set: oi,
  deleteProperty: ri,
  has: ii,
  ownKeys: ci
}, As = {
  get: Gr,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Kn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Kn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, li = /* @__PURE__ */ X({}, Ps, {
  get: Qr,
  set: si
}), fi = /* @__PURE__ */ X({}, As, {
  get: ei
}), bo = (e) => e, yn = (e) => Reflect.getPrototypeOf(e);
function Zt(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const s = P(e), r = P(t);
  n || (t !== r && ue(s, "get", t), ue(s, "get", r));
  const { has: i } = yn(s), l = o ? bo : n ? Oo : Ht;
  if (i.call(s, t))
    return l(e.get(t));
  if (i.call(s, r))
    return l(e.get(r));
  e !== s && e.get(t);
}
function Qt(e, t = !1) {
  const n = this.__v_raw, o = P(n), s = P(e);
  return t || (e !== s && ue(o, "has", e), ue(o, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function Gt(e, t = !1) {
  return e = e.__v_raw, !t && ue(P(e), "iterate", ct), Reflect.get(e, "size", e);
}
function zo(e) {
  e = P(e);
  const t = P(this);
  return yn(t).has.call(t, e) || (t.add(e), He(t, "add", e, e)), this;
}
function qo(e, t) {
  t = P(t);
  const n = P(this), { has: o, get: s } = yn(n);
  let r = o.call(n, e);
  r ? process.env.NODE_ENV !== "production" && Ss(n, o, e) : (e = P(e), r = o.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), r ? jt(t, i) && He(n, "set", e, t, i) : He(n, "add", e, t), this;
}
function Jo(e) {
  const t = P(this), { has: n, get: o } = yn(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && Ss(t, n, e) : (e = P(e), s = n.call(t, e));
  const r = o ? o.call(t, e) : void 0, i = t.delete(e);
  return s && He(t, "delete", e, void 0, r), i;
}
function Yo() {
  const e = P(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? it(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && He(e, "clear", void 0, void 0, n), o;
}
function en(e, t) {
  return function(o, s) {
    const r = this, i = r.__v_raw, l = P(i), f = t ? bo : e ? Oo : Ht;
    return !e && ue(l, "iterate", ct), i.forEach((a, h) => o.call(s, f(a), f(h), r));
  };
}
function tn(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = P(s), i = it(r), l = e === "entries" || e === Symbol.iterator && i, f = e === "keys" && i, a = s[e](...o), h = n ? bo : t ? Oo : Ht;
    return !t && ue(r, "iterate", f ? qn : ct), {
      // iterator protocol
      next() {
        const { value: d, done: g } = a.next();
        return g ? { value: d, done: g } : {
          value: l ? [h(d[0]), h(d[1])] : h(d),
          done: g
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ke(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${vn(e)} operation ${n}failed: target is readonly.`, P(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function ui() {
  const e = {
    get(r) {
      return Zt(this, r);
    },
    get size() {
      return Gt(this);
    },
    has: Qt,
    add: zo,
    set: qo,
    delete: Jo,
    clear: Yo,
    forEach: en(!1, !1)
  }, t = {
    get(r) {
      return Zt(this, r, !1, !0);
    },
    get size() {
      return Gt(this);
    },
    has: Qt,
    add: zo,
    set: qo,
    delete: Jo,
    clear: Yo,
    forEach: en(!1, !0)
  }, n = {
    get(r) {
      return Zt(this, r, !0);
    },
    get size() {
      return Gt(this, !0);
    },
    has(r) {
      return Qt.call(this, r, !0);
    },
    add: Ke(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Ke(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Ke(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Ke(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: en(!0, !1)
  }, o = {
    get(r) {
      return Zt(this, r, !0, !0);
    },
    get size() {
      return Gt(this, !0);
    },
    has(r) {
      return Qt.call(this, r, !0);
    },
    add: Ke(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Ke(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Ke(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Ke(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: en(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = tn(r, !1, !1), n[r] = tn(r, !0, !1), t[r] = tn(r, !1, !0), o[r] = tn(r, !0, !0);
  }), [
    e,
    n,
    t,
    o
  ];
}
const [ai, di, pi, hi] = /* @__PURE__ */ ui();
function On(e, t) {
  const n = t ? e ? hi : pi : e ? di : ai;
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(R(n, s) && s in o ? n : o, s, r);
}
const _i = {
  get: /* @__PURE__ */ On(!1, !1)
}, mi = {
  get: /* @__PURE__ */ On(!1, !0)
}, gi = {
  get: /* @__PURE__ */ On(!0, !1)
}, Ei = {
  get: /* @__PURE__ */ On(!0, !0)
};
function Ss(e, t, n) {
  const o = P(n);
  if (o !== n && t.call(e, o)) {
    const s = Eo(e);
    console.warn(`Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Ms = /* @__PURE__ */ new WeakMap(), Rs = /* @__PURE__ */ new WeakMap(), Fs = /* @__PURE__ */ new WeakMap(), js = /* @__PURE__ */ new WeakMap();
function Ni(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function vi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ni(Eo(e));
}
function yo(e) {
  return Ze(e) ? e : wn(e, !1, Ps, _i, Ms);
}
function bi(e) {
  return wn(e, !1, li, mi, Rs);
}
function Ls(e) {
  return wn(e, !0, As, gi, Fs);
}
function bt(e) {
  return wn(e, !0, fi, Ei, js);
}
function wn(e, t, n, o, s) {
  if (!B(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = s.get(e);
  if (r)
    return r;
  const i = vi(e);
  if (i === 0)
    return e;
  const l = new Proxy(e, i === 2 ? o : n);
  return s.set(e, l), l;
}
function lt(e) {
  return Ze(e) ? lt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ze(e) {
  return !!(e && e.__v_isReadonly);
}
function pn(e) {
  return !!(e && e.__v_isShallow);
}
function Yn(e) {
  return lt(e) || Ze(e);
}
function P(e) {
  const t = e && e.__v_raw;
  return t ? P(t) : e;
}
function Hs(e) {
  return dn(e, "__v_skip", !0), e;
}
const Ht = (e) => B(e) ? yo(e) : e, Oo = (e) => B(e) ? Ls(e) : e;
function ks(e) {
  Ye && fe && (e = P(e), process.env.NODE_ENV !== "production" ? Jn(e.dep || (e.dep = Lt()), {
    target: e,
    type: "get",
    key: "value"
  }) : Jn(e.dep || (e.dep = Lt())));
}
function Bs(e, t) {
  e = P(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? vt(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : vt(n));
}
function te(e) {
  return !!(e && e.__v_isRef === !0);
}
function yi(e) {
  return Oi(e, !1);
}
function Oi(e, t) {
  return te(e) ? e : new wi(e, t);
}
class wi {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : P(t), this._value = n ? t : Ht(t);
  }
  get value() {
    return ks(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || pn(t) || Ze(t);
    t = n ? t : P(t), jt(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Ht(t), Bs(this, t));
  }
}
function ot(e) {
  return te(e) ? e.value : e;
}
const Di = {
  get: (e, t, n) => ot(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return te(s) && !te(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Us(e) {
  return lt(e) ? e : new Proxy(e, Di);
}
var Ks;
class xi {
  constructor(t, n, o, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Ks] = !1, this._dirty = !0, this.effect = new vo(t, () => {
      this._dirty || (this._dirty = !0, Bs(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = o;
  }
  get value() {
    const t = P(this);
    return ks(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Ks = "__v_isReadonly";
function Vi(e, t, n = !1) {
  let o, s;
  const r = I(e);
  r ? (o = e, s = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : oe) : (o = e.get, s = e.set);
  const i = new xi(o, s, r || !s, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const ft = [];
function sn(e) {
  ft.push(e);
}
function rn() {
  ft.pop();
}
function b(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  ht();
  const n = ft.length ? ft[ft.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = Ci();
  if (o)
    Le(o, n, 11, [
      e + t.join(""),
      n && n.proxy,
      s.map(({ vnode: r }) => `at <${In(n, r.type)}>`).join(`
`),
      s
    ]);
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...Ti(s)), console.warn(...r);
  }
  _t();
}
function Ci() {
  let e = ft[ft.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function Ti(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...$i(n));
  }), t;
}
function $i({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${In(e.component, e.type, o)}`, r = ">" + n;
  return e.props ? [s, ...Ii(e.props), r] : [s + r];
}
function Ii(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Ws(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Ws(e, t, n) {
  return Z(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : te(t) ? (t = Ws(e, P(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : I(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = P(t), n ? t : [`${e}=`, t]);
}
const wo = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Le(e, t, n, o) {
  let s;
  try {
    s = o ? e(...o) : e();
  } catch (r) {
    Dn(r, t, n);
  }
  return s;
}
function ge(e, t, n, o) {
  if (I(e)) {
    const r = Le(e, t, n, o);
    return r && go(r) && r.catch((i) => {
      Dn(i, t, n);
    }), r;
  }
  const s = [];
  for (let r = 0; r < e.length; r++)
    s.push(ge(e[r], t, n, o));
  return s;
}
function Dn(e, t, n, o = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy, l = process.env.NODE_ENV !== "production" ? wo[n] : n;
    for (; r; ) {
      const a = r.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](e, i, l) === !1)
            return;
      }
      r = r.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      Le(f, null, 10, [e, i, l]);
      return;
    }
  }
  Pi(e, n, s, o);
}
function Pi(e, t, n, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = wo[t];
    if (n && sn(n), b(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && rn(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let kt = !1, Xn = !1;
const ie = [];
let Te = 0;
const Dt = [];
let Ve = null, We = 0;
const zs = /* @__PURE__ */ Promise.resolve();
let Do = null;
const Ai = 100;
function qs(e) {
  const t = Do || zs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Si(e) {
  let t = Te + 1, n = ie.length;
  for (; t < n; ) {
    const o = t + n >>> 1;
    Bt(ie[o]) < e ? t = o + 1 : n = o;
  }
  return t;
}
function xn(e) {
  (!ie.length || !ie.includes(e, kt && e.allowRecurse ? Te + 1 : Te)) && (e.id == null ? ie.push(e) : ie.splice(Si(e.id), 0, e), Js());
}
function Js() {
  !kt && !Xn && (Xn = !0, Do = zs.then(Zs));
}
function Mi(e) {
  const t = ie.indexOf(e);
  t > Te && ie.splice(t, 1);
}
function Ys(e) {
  T(e) ? Dt.push(...e) : (!Ve || !Ve.includes(e, e.allowRecurse ? We + 1 : We)) && Dt.push(e), Js();
}
function Xo(e, t = kt ? Te + 1 : 0) {
  for (process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()); t < ie.length; t++) {
    const n = ie[t];
    if (n && n.pre) {
      if (process.env.NODE_ENV !== "production" && xo(e, n))
        continue;
      ie.splice(t, 1), t--, n();
    }
  }
}
function Xs(e) {
  if (Dt.length) {
    const t = [...new Set(Dt)];
    if (Dt.length = 0, Ve) {
      Ve.push(...t);
      return;
    }
    for (Ve = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ve.sort((n, o) => Bt(n) - Bt(o)), We = 0; We < Ve.length; We++)
      process.env.NODE_ENV !== "production" && xo(e, Ve[We]) || Ve[We]();
    Ve = null, We = 0;
  }
}
const Bt = (e) => e.id == null ? 1 / 0 : e.id, Ri = (e, t) => {
  const n = Bt(e) - Bt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Zs(e) {
  Xn = !1, kt = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ie.sort(Ri);
  const t = process.env.NODE_ENV !== "production" ? (n) => xo(e, n) : oe;
  try {
    for (Te = 0; Te < ie.length; Te++) {
      const n = ie[Te];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        Le(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    Te = 0, ie.length = 0, Xs(e), kt = !1, Do = null, (ie.length || Dt.length) && Zs(e);
  }
}
function xo(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Ai) {
      const o = t.ownerInstance, s = o && Vr(o.type);
      return b(`Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
let ut = !1;
const Nt = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (xs().__VUE_HMR_RUNTIME__ = {
  createRecord: Rn(Qs),
  rerender: Rn(Li),
  reload: Rn(Hi)
});
const pt = /* @__PURE__ */ new Map();
function Fi(e) {
  const t = e.type.__hmrId;
  let n = pt.get(t);
  n || (Qs(t, e.type), n = pt.get(t)), n.instances.add(e);
}
function ji(e) {
  pt.get(e.type.__hmrId).instances.delete(e);
}
function Qs(e, t) {
  return pt.has(e) ? !1 : (pt.set(e, {
    initialDef: Mt(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Mt(e) {
  return Cr(e) ? e.__vccOpts : e;
}
function Li(e, t) {
  const n = pt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Mt(o.type).render = t), o.renderCache = [], ut = !0, o.update(), ut = !1;
  }));
}
function Hi(e, t) {
  const n = pt.get(e);
  if (!n)
    return;
  t = Mt(t), Zo(n.initialDef, t);
  const o = [...n.instances];
  for (const s of o) {
    const r = Mt(s.type);
    Nt.has(r) || (r !== n.initialDef && Zo(r, t), Nt.add(r)), s.appContext.optionsCache.delete(s.type), s.ceReload ? (Nt.add(r), s.ceReload(t.styles), Nt.delete(r)) : s.parent ? xn(s.parent.update) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Ys(() => {
    for (const s of o)
      Nt.delete(Mt(s.type));
  });
}
function Zo(e, t) {
  X(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Rn(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let $e, St = [], Zn = !1;
function zt(e, ...t) {
  $e ? $e.emit(e, ...t) : Zn || St.push({ event: e, args: t });
}
function Gs(e, t) {
  var n, o;
  $e = e, $e ? ($e.enabled = !0, St.forEach(({ event: s, args: r }) => $e.emit(s, ...r)), St = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !(!((o = (n = window.navigator) === null || n === void 0 ? void 0 : n.userAgent) === null || o === void 0) && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    Gs(r, t);
  }), setTimeout(() => {
    $e || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Zn = !0, St = []);
  }, 3e3)) : (Zn = !0, St = []);
}
function ki(e, t) {
  zt("app:init", e, t, {
    Fragment: pe,
    Text: Jt,
    Comment: se,
    Static: Rt
  });
}
function Bi(e) {
  zt("app:unmount", e);
}
const Ui = /* @__PURE__ */ Vo(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
), er = /* @__PURE__ */ Vo(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
), Ki = /* @__PURE__ */ Vo(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
), Wi = (e) => {
  $e && typeof $e.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !$e.cleanupBuffer(e) && Ki(e);
};
function Vo(e) {
  return (t) => {
    zt(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
  };
}
const zi = /* @__PURE__ */ tr(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
), qi = /* @__PURE__ */ tr(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function tr(e) {
  return (t, n, o) => {
    zt(e, t.appContext.app, t.uid, t, n, o);
  };
}
function Ji(e, t, n) {
  zt("component:emit", e.appContext.app, e, t, n);
}
function Yi(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const o = e.vnode.props || W;
  if (process.env.NODE_ENV !== "production") {
    const { emitsOptions: h, propsOptions: [d] } = e;
    if (h)
      if (!(t in h))
        (!d || !(tt(t) in d)) && b(`Component emitted event "${t}" but it is neither declared in the emits option nor as an "${tt(t)}" prop.`);
      else {
        const g = h[t];
        I(g) && (g(...n) || b(`Invalid event arguments: event validation failed for event "${t}".`));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && t.slice(7);
  if (i && i in o) {
    const h = `${i === "modelValue" ? "model" : i}Modifiers`, { number: d, trim: g } = o[h] || W;
    g && (s = n.map((D) => Z(D) ? D.trim() : D)), d && (s = n.map(Kr));
  }
  if (process.env.NODE_ENV !== "production" && Ji(e, t, s), process.env.NODE_ENV !== "production") {
    const h = t.toLowerCase();
    h !== t && o[tt(h)] && b(`Event "${h}" is emitted in component ${In(e, e.type)} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${he(t)}" instead of "${t}".`);
  }
  let l, f = o[l = tt(t)] || // also try camelCase event handler (#2249)
  o[l = tt(je(t))];
  !f && r && (f = o[l = tt(he(t))]), f && ge(f, e, 6, s);
  const a = o[l + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, ge(a, e, 6, s);
  }
}
function nr(e, t, n = !1) {
  const o = t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, l = !1;
  if (!I(e)) {
    const f = (a) => {
      const h = nr(a, t, !0);
      h && (l = !0, X(i, h));
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  return !r && !l ? (B(e) && o.set(e, null), null) : (T(r) ? r.forEach((f) => i[f] = null) : X(i, r), B(e) && o.set(e, i), i);
}
function Vn(e, t) {
  return !e || !Wt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), R(e, t[0].toLowerCase() + t.slice(1)) || R(e, he(t)) || R(e, t));
}
let _e = null, or = null;
function hn(e) {
  const t = _e;
  return _e = e, or = e && e.type.__scopeId || null, t;
}
function Xi(e, t = _e, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && ls(-1);
    const r = hn(t);
    let i;
    try {
      i = e(...s);
    } finally {
      hn(r), o._d && ls(1);
    }
    return process.env.NODE_ENV !== "production" && er(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
let Qn = !1;
function _n() {
  Qn = !0;
}
function Fn(e) {
  const { type: t, vnode: n, proxy: o, withProxy: s, props: r, propsOptions: [i], slots: l, attrs: f, emit: a, render: h, renderCache: d, data: g, setupState: D, ctx: A, inheritAttrs: C } = e;
  let H, G;
  const Y = hn(e);
  process.env.NODE_ENV !== "production" && (Qn = !1);
  try {
    if (n.shapeFlag & 4) {
      const U = s || o;
      H = ve(h.call(U, U, d, r, D, g, A)), G = f;
    } else {
      const U = t;
      process.env.NODE_ENV !== "production" && f === r && _n(), H = ve(U.length > 1 ? U(r, process.env.NODE_ENV !== "production" ? {
        get attrs() {
          return _n(), f;
        },
        slots: l,
        emit: a
      } : { attrs: f, slots: l, emit: a }) : U(
        r,
        null
        /* we know it doesn't need it */
      )), G = t.props ? f : Qi(f);
    }
  } catch (U) {
    Ft.length = 0, Dn(
      U,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), H = Ie(se);
  }
  let q = H, S;
  if (process.env.NODE_ENV !== "production" && H.patchFlag > 0 && H.patchFlag & 2048 && ([q, S] = Zi(H)), G && C !== !1) {
    const U = Object.keys(G), { shapeFlag: ye } = q;
    if (U.length) {
      if (ye & 7)
        i && U.some(an) && (G = Gi(G, i)), q = Pe(q, G);
      else if (process.env.NODE_ENV !== "production" && !Qn && q.type !== se) {
        const Oe = Object.keys(f), M = [], z = [];
        for (let J = 0, re = Oe.length; J < re; J++) {
          const ne = Oe[J];
          Wt(ne) ? an(ne) || M.push(ne[2].toLowerCase() + ne.slice(3)) : z.push(ne);
        }
        z.length && b(`Extraneous non-props attributes (${z.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`), M.length && b(`Extraneous non-emits event listeners (${M.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Qo(q) && b("Runtime directive used on component with non-element root node. The directives will not function as intended."), q = Pe(q), q.dirs = q.dirs ? q.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Qo(q) && b("Component inside <Transition> renders non-element root node that cannot be animated."), q.transition = n.transition), process.env.NODE_ENV !== "production" && S ? S(q) : H = q, hn(Y), H;
}
const Zi = (e) => {
  const t = e.children, n = e.dynamicChildren, o = sr(t);
  if (!o)
    return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [ve(o), i];
};
function sr(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    if (Ao(o)) {
      if (o.type !== se || o.children === "v-if") {
        if (t)
          return;
        t = o;
      }
    } else
      return;
  }
  return t;
}
const Qi = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Wt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Gi = (e, t) => {
  const n = {};
  for (const o in e)
    (!an(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, Qo = (e) => e.shapeFlag & 7 || e.type === se;
function ec(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: f } = t, a = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && ut || t.dirs || t.transition)
    return !0;
  if (n && f >= 0) {
    if (f & 1024)
      return !0;
    if (f & 16)
      return o ? Go(o, i, a) : !!i;
    if (f & 8) {
      const h = t.dynamicProps;
      for (let d = 0; d < h.length; d++) {
        const g = h[d];
        if (i[g] !== o[g] && !Vn(a, g))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? Go(o, i, a) : !0 : !!i;
  return !1;
}
function Go(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (t[r] !== e[r] && !Vn(n, r))
      return !0;
  }
  return !1;
}
function tc({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const nc = (e) => e.__isSuspense;
function oc(e, t) {
  t && t.pendingBranch ? T(e) ? t.effects.push(...e) : t.effects.push(e) : Ys(e);
}
function sc(e, t) {
  if (!Q)
    process.env.NODE_ENV !== "production" && b("provide() can only be used inside setup().");
  else {
    let n = Q.provides;
    const o = Q.parent && Q.parent.provides;
    o === n && (n = Q.provides = Object.create(o)), n[e] = t;
  }
}
function cn(e, t, n = !1) {
  const o = Q || _e;
  if (o) {
    const s = o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && I(t) ? t.call(o.proxy) : t;
    process.env.NODE_ENV !== "production" && b(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && b("inject() can only be used inside setup() or functional components.");
}
function rc(e, t) {
  return Co(e, null, process.env.NODE_ENV !== "production" ? Object.assign(Object.assign({}, t), { flush: "post" }) : { flush: "post" });
}
const nn = {};
function jn(e, t, n) {
  return process.env.NODE_ENV !== "production" && !I(t) && b("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), Co(e, t, n);
}
function Co(e, t, { immediate: n, deep: o, flush: s, onTrack: r, onTrigger: i } = W) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && b('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), o !== void 0 && b('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const l = (S) => {
    b("Invalid watch source: ", S, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, f = qr() === (Q == null ? void 0 : Q.scope) ? Q : null;
  let a, h = !1, d = !1;
  if (te(e) ? (a = () => e.value, h = pn(e)) : lt(e) ? (a = () => e, o = !0) : T(e) ? (d = !0, h = e.some((S) => lt(S) || pn(S)), a = () => e.map((S) => {
    if (te(S))
      return S.value;
    if (lt(S))
      return yt(S);
    if (I(S))
      return Le(
        S,
        f,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && l(S);
  })) : I(e) ? t ? a = () => Le(
    e,
    f,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : a = () => {
    if (!(f && f.isUnmounted))
      return g && g(), ge(e, f, 3, [D]);
  } : (a = oe, process.env.NODE_ENV !== "production" && l(e)), t && o) {
    const S = a;
    a = () => yt(S());
  }
  let g, D = (S) => {
    g = Y.onStop = () => {
      Le(
        S,
        f,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, A;
  if (Kt)
    if (D = oe, t ? n && ge(t, f, 3, [
      a(),
      d ? [] : void 0,
      D
    ]) : a(), s === "sync") {
      const S = pl();
      A = S.__watcherHandles || (S.__watcherHandles = []);
    } else
      return oe;
  let C = d ? new Array(e.length).fill(nn) : nn;
  const H = () => {
    if (Y.active)
      if (t) {
        const S = Y.run();
        (o || h || (d ? S.some((U, ye) => jt(U, C[ye])) : jt(S, C))) && (g && g(), ge(t, f, 3, [
          S,
          // pass undefined as the old value when it's changed for the first time
          C === nn ? void 0 : d && C[0] === nn ? [] : C,
          D
        ]), C = S);
      } else
        Y.run();
  };
  H.allowRecurse = !!t;
  let G;
  s === "sync" ? G = H : s === "post" ? G = () => de(H, f && f.suspense) : (H.pre = !0, f && (H.id = f.uid), G = () => xn(H));
  const Y = new vo(a, G);
  process.env.NODE_ENV !== "production" && (Y.onTrack = r, Y.onTrigger = i), t ? n ? H() : C = Y.run() : s === "post" ? de(Y.run.bind(Y), f && f.suspense) : Y.run();
  const q = () => {
    Y.stop(), f && f.scope && _o(f.scope.effects, Y);
  };
  return A && A.push(q), q;
}
function ic(e, t, n) {
  const o = this.proxy, s = Z(e) ? e.includes(".") ? rr(o, e) : () => o[e] : e.bind(o, o);
  let r;
  I(t) ? r = t : (r = t.handler, n = t);
  const i = Q;
  xt(this);
  const l = Co(s, r.bind(o), n);
  return i ? xt(i) : dt(), l;
}
function rr(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
function yt(e, t) {
  if (!B(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), te(e))
    yt(e.value, t);
  else if (T(e))
    for (let n = 0; n < e.length; n++)
      yt(e[n], t);
  else if (Os(e) || it(e))
    e.forEach((n) => {
      yt(n, t);
    });
  else if (Ds(e))
    for (const n in e)
      yt(e[n], t);
  return e;
}
function cc() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Tn(() => {
    e.isMounted = !0;
  }), fr(() => {
    e.isUnmounting = !0;
  }), e;
}
const me = [Function, Array], lc = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: me,
    onEnter: me,
    onAfterEnter: me,
    onEnterCancelled: me,
    // leave
    onBeforeLeave: me,
    onLeave: me,
    onAfterLeave: me,
    onLeaveCancelled: me,
    // appear
    onBeforeAppear: me,
    onAppear: me,
    onAfterAppear: me,
    onAppearCancelled: me
  },
  setup(e, { slots: t }) {
    const n = wr(), o = cc();
    let s;
    return () => {
      const r = t.default && cr(t.default(), !0);
      if (!r || !r.length)
        return;
      let i = r[0];
      if (r.length > 1) {
        let C = !1;
        for (const H of r)
          if (H.type !== se) {
            if (process.env.NODE_ENV !== "production" && C) {
              b("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            if (i = H, C = !0, process.env.NODE_ENV === "production")
              break;
          }
      }
      const l = P(e), { mode: f } = l;
      if (process.env.NODE_ENV !== "production" && f && f !== "in-out" && f !== "out-in" && f !== "default" && b(`invalid <transition> mode: ${f}`), o.isLeaving)
        return Ln(i);
      const a = es(i);
      if (!a)
        return Ln(i);
      const h = Gn(a, l, o, n);
      eo(a, h);
      const d = n.subTree, g = d && es(d);
      let D = !1;
      const { getTransitionKey: A } = a.type;
      if (A) {
        const C = A();
        s === void 0 ? s = C : C !== s && (s = C, D = !0);
      }
      if (g && g.type !== se && (!st(a, g) || D)) {
        const C = Gn(g, l, o, n);
        if (eo(g, C), f === "out-in")
          return o.isLeaving = !0, C.afterLeave = () => {
            o.isLeaving = !1, n.update.active !== !1 && n.update();
          }, Ln(i);
        f === "in-out" && a.type !== se && (C.delayLeave = (H, G, Y) => {
          const q = ir(o, g);
          q[String(g.key)] = g, H._leaveCb = () => {
            G(), H._leaveCb = void 0, delete h.delayedLeave;
          }, h.delayedLeave = Y;
        });
      }
      return i;
    };
  }
}, fc = lc;
function ir(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || (o = /* @__PURE__ */ Object.create(null), n.set(t.type, o)), o;
}
function Gn(e, t, n, o) {
  const { appear: s, mode: r, persisted: i = !1, onBeforeEnter: l, onEnter: f, onAfterEnter: a, onEnterCancelled: h, onBeforeLeave: d, onLeave: g, onAfterLeave: D, onLeaveCancelled: A, onBeforeAppear: C, onAppear: H, onAfterAppear: G, onAppearCancelled: Y } = t, q = String(e.key), S = ir(n, e), U = (M, z) => {
    M && ge(M, o, 9, z);
  }, ye = (M, z) => {
    const J = z[1];
    U(M, z), T(M) ? M.every((re) => re.length <= 1) && J() : M.length <= 1 && J();
  }, Oe = {
    mode: r,
    persisted: i,
    beforeEnter(M) {
      let z = l;
      if (!n.isMounted)
        if (s)
          z = C || l;
        else
          return;
      M._leaveCb && M._leaveCb(
        !0
        /* cancelled */
      );
      const J = S[q];
      J && st(e, J) && J.el._leaveCb && J.el._leaveCb(), U(z, [M]);
    },
    enter(M) {
      let z = f, J = a, re = h;
      if (!n.isMounted)
        if (s)
          z = H || f, J = G || a, re = Y || h;
        else
          return;
      let ne = !1;
      const Ae = M._enterCb = (Yt) => {
        ne || (ne = !0, Yt ? U(re, [M]) : U(J, [M]), Oe.delayedLeave && Oe.delayedLeave(), M._enterCb = void 0);
      };
      z ? ye(z, [M, Ae]) : Ae();
    },
    leave(M, z) {
      const J = String(e.key);
      if (M._enterCb && M._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return z();
      U(d, [M]);
      let re = !1;
      const ne = M._leaveCb = (Ae) => {
        re || (re = !0, z(), Ae ? U(A, [M]) : U(D, [M]), M._leaveCb = void 0, S[J] === e && delete S[J]);
      };
      S[J] = e, g ? ye(g, [M, ne]) : ne();
    },
    clone(M) {
      return Gn(M, t, n, o);
    }
  };
  return Oe;
}
function Ln(e) {
  if (qt(e))
    return e = Pe(e), e.children = null, e;
}
function es(e) {
  return qt(e) ? e.children ? e.children[0] : void 0 : e;
}
function eo(e, t) {
  e.shapeFlag & 6 && e.component ? eo(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function cr(e, t = !1, n) {
  let o = [], s = 0;
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : r);
    i.type === pe ? (i.patchFlag & 128 && s++, o = o.concat(cr(i.children, t, l))) : (t || i.type !== se) && o.push(l != null ? Pe(i, { key: l }) : i);
  }
  if (s > 1)
    for (let r = 0; r < o.length; r++)
      o[r].patchFlag = -2;
  return o;
}
function uc(e) {
  return I(e) ? { setup: e, name: e.name } : e;
}
const ln = (e) => !!e.type.__asyncLoader, qt = (e) => e.type.__isKeepAlive;
function ac(e, t) {
  lr(e, "a", t);
}
function dc(e, t) {
  lr(e, "da", t);
}
function lr(e, t, n = Q) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Cn(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      qt(s.parent.vnode) && pc(o, t, n, s), s = s.parent;
  }
}
function pc(e, t, n, o) {
  const s = Cn(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  To(() => {
    _o(o[t], s);
  }, n);
}
function Cn(e, t, n = Q, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      ht(), xt(n);
      const l = ge(t, n, e, i);
      return dt(), _t(), l;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = tt(wo[e].replace(/ hook$/, ""));
    b(`${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const ke = (e) => (t, n = Q) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Kt || e === "sp") && Cn(e, (...o) => t(...o), n)
), hc = ke(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), Tn = ke(
  "m"
  /* LifecycleHooks.MOUNTED */
), _c = ke(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), mc = ke(
  "u"
  /* LifecycleHooks.UPDATED */
), fr = ke(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), To = ke(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), gc = ke(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), Ec = ke(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), Nc = ke(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function vc(e, t = Q) {
  Cn("ec", e, t);
}
function ur(e) {
  kr(e) && b("Do not use built-in directive ids as custom directive id: " + e);
}
function Ge(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let f = l.dir[o];
    f && (ht(), ge(f, n, 8, [
      e.el,
      l,
      e,
      t
    ]), _t());
  }
}
const bc = Symbol();
function yc(e, t, n, o) {
  let s;
  const r = n && n[o];
  if (T(e) || Z(e)) {
    s = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      s[i] = t(e[i], i, void 0, r && r[i]);
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && b(`The v-for range expect an integer value but got ${e}.`), s = new Array(e);
    for (let i = 0; i < e; i++)
      s[i] = t(i + 1, i, void 0, r && r[i]);
  } else if (B(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (i, l) => t(i, l, void 0, r && r[l]));
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let l = 0, f = i.length; l < f; l++) {
        const a = i[l];
        s[l] = t(e[a], a, l, r && r[l]);
      }
    }
  else
    s = [];
  return n && (n[o] = s), s;
}
const to = (e) => e ? Dr(e) ? Mo(e) || e.proxy : to(e.parent) : null, at = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ X(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? bt(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? bt(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? bt(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? bt(e.refs) : e.refs,
    $parent: (e) => to(e.parent),
    $root: (e) => to(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Io(e),
    $forceUpdate: (e) => e.f || (e.f = () => xn(e.update)),
    $nextTick: (e) => e.n || (e.n = qs.bind(e.proxy)),
    $watch: (e) => ic.bind(e)
  })
), $o = (e) => e === "_" || e === "$", Hn = (e, t) => e !== W && !e.__isScriptSetup && R(e, t), ar = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: f } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let a;
    if (t[0] !== "$") {
      const D = i[t];
      if (D !== void 0)
        switch (D) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Hn(o, t))
          return i[t] = 1, o[t];
        if (s !== W && R(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && R(a, t)
        )
          return i[t] = 3, r[t];
        if (n !== W && R(n, t))
          return i[t] = 4, n[t];
        no && (i[t] = 0);
      }
    }
    const h = at[t];
    let d, g;
    if (h)
      return t === "$attrs" && (ue(e, "get", t), process.env.NODE_ENV !== "production" && _n()), h(e);
    if (
      // css module (injected by vue-loader)
      (d = l.__cssModules) && (d = d[t])
    )
      return d;
    if (n !== W && R(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = f.config.globalProperties, R(g, t)
    )
      return g[t];
    process.env.NODE_ENV !== "production" && _e && (!Z(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== W && $o(t[0]) && R(s, t) ? b(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === _e && b(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return Hn(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && R(s, t) ? (b(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== W && R(o, t) ? (o[t] = n, !0) : R(e.props, t) ? (process.env.NODE_ENV !== "production" && b(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && b(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: r } }, i) {
    let l;
    return !!n[i] || e !== W && R(e, i) || Hn(t, i) || (l = r[0]) && R(l, i) || R(o, i) || R(at, i) || R(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : R(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (ar.ownKeys = (e) => (b("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function Oc(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(at).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => at[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: oe
    });
  }), t;
}
function wc(e) {
  const { ctx: t, propsOptions: [n] } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: oe
    });
  });
}
function Dc(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(P(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if ($o(o[0])) {
        b(`setup() return property ${JSON.stringify(o)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: oe
      });
    }
  });
}
function xc() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? b(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let no = !0;
function Vc(e) {
  const t = Io(e), n = e.proxy, o = e.ctx;
  no = !1, t.beforeCreate && ts(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: l,
    provide: f,
    inject: a,
    // lifecycle
    created: h,
    beforeMount: d,
    mounted: g,
    beforeUpdate: D,
    updated: A,
    activated: C,
    deactivated: H,
    beforeDestroy: G,
    beforeUnmount: Y,
    destroyed: q,
    unmounted: S,
    render: U,
    renderTracked: ye,
    renderTriggered: Oe,
    errorCaptured: M,
    serverPrefetch: z,
    // public API
    expose: J,
    inheritAttrs: re,
    // assets
    components: ne,
    directives: Ae,
    filters: Yt
  } = t, Be = process.env.NODE_ENV !== "production" ? xc() : null;
  if (process.env.NODE_ENV !== "production") {
    const [j] = e.propsOptions;
    if (j)
      for (const L in j)
        Be("Props", L);
  }
  if (a && Cc(a, o, Be, e.appContext.config.unwrapInjectedRef), i)
    for (const j in i) {
      const L = i[j];
      I(L) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, j, {
        value: L.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[j] = L.bind(n), process.env.NODE_ENV !== "production" && Be("Methods", j)) : process.env.NODE_ENV !== "production" && b(`Method "${j}" has type "${typeof L}" in the component definition. Did you reference the function correctly?`);
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !I(s) && b("The data option must be a function. Plain object usage is no longer supported.");
    const j = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && go(j) && b("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."), !B(j))
      process.env.NODE_ENV !== "production" && b("data() should return an object.");
    else if (e.data = yo(j), process.env.NODE_ENV !== "production")
      for (const L in j)
        Be("Data", L), $o(L[0]) || Object.defineProperty(o, L, {
          configurable: !0,
          enumerable: !0,
          get: () => j[L],
          set: oe
        });
  }
  if (no = !0, r)
    for (const j in r) {
      const L = r[j], we = I(L) ? L.bind(n, n) : I(L.get) ? L.get.bind(n, n) : oe;
      process.env.NODE_ENV !== "production" && we === oe && b(`Computed property "${j}" has no getter.`);
      const Pn = !I(L) && I(L.set) ? L.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        b(`Write operation failed: computed property "${j}" is readonly.`);
      } : oe, Ct = Je({
        get: we,
        set: Pn
      });
      Object.defineProperty(o, j, {
        enumerable: !0,
        configurable: !0,
        get: () => Ct.value,
        set: (mt) => Ct.value = mt
      }), process.env.NODE_ENV !== "production" && Be("Computed", j);
    }
  if (l)
    for (const j in l)
      dr(l[j], o, n, j);
  if (f) {
    const j = I(f) ? f.call(n) : f;
    Reflect.ownKeys(j).forEach((L) => {
      sc(L, j[L]);
    });
  }
  h && ts(
    h,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function ae(j, L) {
    T(L) ? L.forEach((we) => j(we.bind(n))) : L && j(L.bind(n));
  }
  if (ae(hc, d), ae(Tn, g), ae(_c, D), ae(mc, A), ae(ac, C), ae(dc, H), ae(vc, M), ae(Nc, ye), ae(Ec, Oe), ae(fr, Y), ae(To, S), ae(gc, z), T(J))
    if (J.length) {
      const j = e.exposed || (e.exposed = {});
      J.forEach((L) => {
        Object.defineProperty(j, L, {
          get: () => n[L],
          set: (we) => n[L] = we
        });
      });
    } else
      e.exposed || (e.exposed = {});
  U && e.render === oe && (e.render = U), re != null && (e.inheritAttrs = re), ne && (e.components = ne), Ae && (e.directives = Ae);
}
function Cc(e, t, n = oe, o = !1) {
  T(e) && (e = oo(e));
  for (const s in e) {
    const r = e[s];
    let i;
    B(r) ? "default" in r ? i = cn(
      r.from || s,
      r.default,
      !0
      /* treat default function as factory */
    ) : i = cn(r.from || s) : i = cn(r), te(i) ? o ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : (process.env.NODE_ENV !== "production" && b(`injected property "${s}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`), t[s] = i) : t[s] = i, process.env.NODE_ENV !== "production" && n("Inject", s);
  }
}
function ts(e, t, n) {
  ge(T(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function dr(e, t, n, o) {
  const s = o.includes(".") ? rr(n, o) : () => n[o];
  if (Z(e)) {
    const r = t[e];
    I(r) ? jn(s, r) : process.env.NODE_ENV !== "production" && b(`Invalid watch handler specified by key "${e}"`, r);
  } else if (I(e))
    jn(s, e.bind(n));
  else if (B(e))
    if (T(e))
      e.forEach((r) => dr(r, t, n, o));
    else {
      const r = I(e.handler) ? e.handler.bind(n) : t[e.handler];
      I(r) ? jn(s, r, e) : process.env.NODE_ENV !== "production" && b(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else
    process.env.NODE_ENV !== "production" && b(`Invalid watch option: "${o}"`, e);
}
function Io(e) {
  const t = e.type, { mixins: n, extends: o } = t, { mixins: s, optionsCache: r, config: { optionMergeStrategies: i } } = e.appContext, l = r.get(t);
  let f;
  return l ? f = l : !s.length && !n && !o ? f = t : (f = {}, s.length && s.forEach((a) => mn(f, a, i, !0)), mn(f, t, i)), B(t) && r.set(t, f), f;
}
function mn(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && mn(e, r, n, !0), s && s.forEach((i) => mn(e, i, n, !0));
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && b('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const l = Tc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Tc = {
  data: ns,
  props: nt,
  emits: nt,
  // objects
  methods: nt,
  computed: nt,
  // lifecycle
  beforeCreate: le,
  created: le,
  beforeMount: le,
  mounted: le,
  beforeUpdate: le,
  updated: le,
  beforeDestroy: le,
  beforeUnmount: le,
  destroyed: le,
  unmounted: le,
  activated: le,
  deactivated: le,
  errorCaptured: le,
  serverPrefetch: le,
  // assets
  components: nt,
  directives: nt,
  // watch
  watch: Ic,
  // provide / inject
  provide: ns,
  inject: $c
};
function ns(e, t) {
  return t ? e ? function() {
    return X(I(e) ? e.call(this, this) : e, I(t) ? t.call(this, this) : t);
  } : t : e;
}
function $c(e, t) {
  return nt(oo(e), oo(t));
}
function oo(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function nt(e, t) {
  return e ? X(X(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Ic(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = X(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = le(e[o], t[o]);
  return n;
}
function Pc(e, t, n, o = !1) {
  const s = {}, r = {};
  dn(r, $n, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), pr(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && _r(t || {}, s, e), n ? e.props = o ? s : bi(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function Ac(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function Sc(e, t, n, o) {
  const { props: s, attrs: r, vnode: { patchFlag: i } } = e, l = P(s), [f] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Ac(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const h = e.vnode.dynamicProps;
      for (let d = 0; d < h.length; d++) {
        let g = h[d];
        if (Vn(e.emitsOptions, g))
          continue;
        const D = t[g];
        if (f)
          if (R(r, g))
            D !== r[g] && (r[g] = D, a = !0);
          else {
            const A = je(g);
            s[A] = so(
              f,
              l,
              A,
              D,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          D !== r[g] && (r[g] = D, a = !0);
      }
    }
  } else {
    pr(e, t, s, r) && (a = !0);
    let h;
    for (const d in l)
      (!t || // for camelCase
      !R(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = he(d)) === d || !R(t, h))) && (f ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[h] !== void 0) && (s[d] = so(
        f,
        l,
        d,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete s[d]);
    if (r !== l)
      for (const d in r)
        (!t || !R(t, d)) && (delete r[d], a = !0);
  }
  a && He(e, "set", "$attrs"), process.env.NODE_ENV !== "production" && _r(t || {}, s, e);
}
function pr(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let f in t) {
      if (on(f))
        continue;
      const a = t[f];
      let h;
      s && R(s, h = je(f)) ? !r || !r.includes(h) ? n[h] = a : (l || (l = {}))[h] = a : Vn(e.emitsOptions, f) || (!(f in o) || a !== o[f]) && (o[f] = a, i = !0);
    }
  if (r) {
    const f = P(n), a = l || W;
    for (let h = 0; h < r.length; h++) {
      const d = r[h];
      n[d] = so(s, f, d, a[d], e, !R(a, d));
    }
  }
  return i;
}
function so(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const l = R(i, "default");
    if (l && o === void 0) {
      const f = i.default;
      if (i.type !== Function && I(f)) {
        const { propsDefaults: a } = s;
        n in a ? o = a[n] : (xt(s), o = a[n] = f.call(null, t), dt());
      } else
        o = f;
    }
    i[
      0
      /* BooleanFlags.shouldCast */
    ] && (r && !l ? o = !1 : i[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (o === "" || o === he(n)) && (o = !0));
  }
  return o;
}
function hr(e, t, n = !1) {
  const o = t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let f = !1;
  if (!I(e)) {
    const h = (d) => {
      f = !0;
      const [g, D] = hr(d, t, !0);
      X(i, g), D && l.push(...D);
    };
    !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !f)
    return B(e) && o.set(e, wt), wt;
  if (T(r))
    for (let h = 0; h < r.length; h++) {
      process.env.NODE_ENV !== "production" && !Z(r[h]) && b("props must be strings when using array syntax.", r[h]);
      const d = je(r[h]);
      os(d) && (i[d] = W);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !B(r) && b("invalid props options", r);
    for (const h in r) {
      const d = je(h);
      if (os(d)) {
        const g = r[h], D = i[d] = T(g) || I(g) ? { type: g } : Object.assign({}, g);
        if (D) {
          const A = rs(Boolean, D.type), C = rs(String, D.type);
          D[
            0
            /* BooleanFlags.shouldCast */
          ] = A > -1, D[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = C < 0 || A < C, (A > -1 || R(D, "default")) && l.push(d);
        }
      }
    }
  }
  const a = [i, l];
  return B(e) && o.set(e, a), a;
}
function os(e) {
  return e[0] !== "$" ? !0 : (process.env.NODE_ENV !== "production" && b(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function ro(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function ss(e, t) {
  return ro(e) === ro(t);
}
function rs(e, t) {
  return T(t) ? t.findIndex((n) => ss(n, e)) : I(t) && ss(t, e) ? 0 : -1;
}
function _r(e, t, n) {
  const o = P(t), s = n.propsOptions[0];
  for (const r in s) {
    let i = s[r];
    i != null && Mc(r, o[r], i, !R(e, r) && !R(e, he(r)));
  }
}
function Mc(e, t, n, o) {
  const { type: s, required: r, validator: i } = n;
  if (r && o) {
    b('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !n.required)) {
    if (s != null && s !== !0) {
      let l = !1;
      const f = T(s) ? s : [s], a = [];
      for (let h = 0; h < f.length && !l; h++) {
        const { valid: d, expectedType: g } = Fc(t, f[h]);
        a.push(g || ""), l = d;
      }
      if (!l) {
        b(jc(e, t, a));
        return;
      }
    }
    i && !i(t) && b('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Rc = /* @__PURE__ */ Vt("String,Number,Boolean,Function,Symbol,BigInt");
function Fc(e, t) {
  let n;
  const o = ro(t);
  if (Rc(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else
    o === "Object" ? n = B(e) : o === "Array" ? n = T(e) : o === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function jc(e, t, n) {
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(vn).join(" | ")}`;
  const s = n[0], r = Eo(t), i = is(t, s), l = is(t, r);
  return n.length === 1 && cs(s) && !Lc(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, cs(r) && (o += `with value ${l}.`), o;
}
function is(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function cs(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function Lc(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const mr = (e) => e[0] === "_" || e === "$stable", Po = (e) => T(e) ? e.map(ve) : [ve(e)], Hc = (e, t, n) => {
  if (t._n)
    return t;
  const o = Xi((...s) => (process.env.NODE_ENV !== "production" && Q && b(`Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`), Po(t(...s))), n);
  return o._c = !1, o;
}, gr = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (mr(s))
      continue;
    const r = e[s];
    if (I(r))
      t[s] = Hc(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && b(`Non-function value encountered for slot "${s}". Prefer function slots for better performance.`);
      const i = Po(r);
      t[s] = () => i;
    }
  }
}, Er = (e, t) => {
  process.env.NODE_ENV !== "production" && !qt(e.vnode) && b("Non-function value encountered for default slot. Prefer function slots for better performance.");
  const n = Po(t);
  e.slots.default = () => n;
}, kc = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = P(t), dn(t, "_", n)) : gr(t, e.slots = {});
  } else
    e.slots = {}, t && Er(e, t);
  dn(e.slots, $n, 1);
}, Bc = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = W;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && ut ? X(s, t) : n && l === 1 ? r = !1 : (X(s, t), !n && l === 1 && delete s._) : (r = !t.$stable, gr(t, s)), i = t;
  } else
    t && (Er(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !mr(l) && !(l in i) && delete s[l];
};
function Nr() {
  return {
    app: null,
    config: {
      isNativeTag: ys,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Uc = 0;
function Kc(e, t) {
  return function(o, s = null) {
    I(o) || (o = Object.assign({}, o)), s != null && !B(s) && (process.env.NODE_ENV !== "production" && b("root props passed to app.mount() must be an object."), s = null);
    const r = Nr(), i = /* @__PURE__ */ new Set();
    let l = !1;
    const f = r.app = {
      _uid: Uc++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: as,
      get config() {
        return r.config;
      },
      set config(a) {
        process.env.NODE_ENV !== "production" && b("app.config cannot be replaced. Modify individual options instead.");
      },
      use(a, ...h) {
        return i.has(a) ? process.env.NODE_ENV !== "production" && b("Plugin has already been applied to target app.") : a && I(a.install) ? (i.add(a), a.install(f, ...h)) : I(a) ? (i.add(a), a(f, ...h)) : process.env.NODE_ENV !== "production" && b('A plugin must either be a function or an object with an "install" function.'), f;
      },
      mixin(a) {
        return r.mixins.includes(a) ? process.env.NODE_ENV !== "production" && b("Mixin has already been applied to target app" + (a.name ? `: ${a.name}` : "")) : r.mixins.push(a), f;
      },
      component(a, h) {
        return process.env.NODE_ENV !== "production" && co(a, r.config), h ? (process.env.NODE_ENV !== "production" && r.components[a] && b(`Component "${a}" has already been registered in target app.`), r.components[a] = h, f) : r.components[a];
      },
      directive(a, h) {
        return process.env.NODE_ENV !== "production" && ur(a), h ? (process.env.NODE_ENV !== "production" && r.directives[a] && b(`Directive "${a}" has already been registered in target app.`), r.directives[a] = h, f) : r.directives[a];
      },
      mount(a, h, d) {
        if (l)
          process.env.NODE_ENV !== "production" && b("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
        else {
          process.env.NODE_ENV !== "production" && a.__vue_app__ && b("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
          const g = Ie(o, s);
          return g.appContext = r, process.env.NODE_ENV !== "production" && (r.reload = () => {
            e(Pe(g), a, d);
          }), h && t ? t(g, a) : e(g, a, d), l = !0, f._container = a, a.__vue_app__ = f, process.env.NODE_ENV !== "production" && (f._instance = g.component, ki(f, as)), Mo(g.component) || g.component.proxy;
        }
      },
      unmount() {
        l ? (e(null, f._container), process.env.NODE_ENV !== "production" && (f._instance = null, Bi(f)), delete f._container.__vue_app__) : process.env.NODE_ENV !== "production" && b("Cannot unmount an app that is not mounted.");
      },
      provide(a, h) {
        return process.env.NODE_ENV !== "production" && a in r.provides && b(`App already provides property with key "${String(a)}". It will be overwritten with the new value.`), r.provides[a] = h, f;
      }
    };
    return f;
  };
}
function io(e, t, n, o, s = !1) {
  if (T(e)) {
    e.forEach((g, D) => io(g, t && (T(t) ? t[D] : t), n, o, s));
    return;
  }
  if (ln(o) && !s)
    return;
  const r = o.shapeFlag & 4 ? Mo(o.component) || o.component.proxy : o.el, i = s ? null : r, { i: l, r: f } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    b("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
    return;
  }
  const a = t && t.r, h = l.refs === W ? l.refs = {} : l.refs, d = l.setupState;
  if (a != null && a !== f && (Z(a) ? (h[a] = null, R(d, a) && (d[a] = null)) : te(a) && (a.value = null)), I(f))
    Le(f, l, 12, [i, h]);
  else {
    const g = Z(f), D = te(f);
    if (g || D) {
      const A = () => {
        if (e.f) {
          const C = g ? R(d, f) ? d[f] : h[f] : f.value;
          s ? T(C) && _o(C, r) : T(C) ? C.includes(r) || C.push(r) : g ? (h[f] = [r], R(d, f) && (d[f] = h[f])) : (f.value = [r], e.k && (h[e.k] = f.value));
        } else
          g ? (h[f] = i, R(d, f) && (d[f] = i)) : D ? (f.value = i, e.k && (h[e.k] = i)) : process.env.NODE_ENV !== "production" && b("Invalid template ref type:", f, `(${typeof f})`);
      };
      i ? (A.id = -1, de(A, n)) : A();
    } else
      process.env.NODE_ENV !== "production" && b("Invalid template ref type:", f, `(${typeof f})`);
  }
}
let It, qe;
function Me(e, t) {
  e.appContext.config.performance && gn() && qe.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && zi(e, t, gn() ? qe.now() : Date.now());
}
function Re(e, t) {
  if (e.appContext.config.performance && gn()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end";
    qe.mark(o), qe.measure(`<${In(e, e.type)}> ${t}`, n, o), qe.clearMarks(n), qe.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && qi(e, t, gn() ? qe.now() : Date.now());
}
function gn() {
  return It !== void 0 || (typeof window < "u" && window.performance ? (It = !0, qe = window.performance) : It = !1), It;
}
function Wc() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(`Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const de = oc;
function zc(e) {
  return qc(e);
}
function qc(e, t) {
  Wc();
  const n = xs();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Gs(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const { insert: o, remove: s, patchProp: r, createElement: i, createText: l, createComment: f, setText: a, setElementText: h, parentNode: d, nextSibling: g, setScopeId: D = oe, insertStaticContent: A } = e, C = (c, u, p, m = null, _ = null, v = null, O = !1, N = null, y = process.env.NODE_ENV !== "production" && ut ? !1 : !!u.dynamicChildren) => {
    if (c === u)
      return;
    c && !st(c, u) && (m = Xt(c), Ue(c, _, v, !0), c = null), u.patchFlag === -2 && (y = !1, u.dynamicChildren = null);
    const { type: E, ref: x, shapeFlag: w } = u;
    switch (E) {
      case Jt:
        H(c, u, p, m);
        break;
      case se:
        G(c, u, p, m);
        break;
      case Rt:
        c == null ? Y(u, p, m, O) : process.env.NODE_ENV !== "production" && q(c, u, p, O);
        break;
      case pe:
        Ae(c, u, p, m, _, v, O, N, y);
        break;
      default:
        w & 1 ? ye(c, u, p, m, _, v, O, N, y) : w & 6 ? Yt(c, u, p, m, _, v, O, N, y) : w & 64 || w & 128 ? E.process(c, u, p, m, _, v, O, N, y, gt) : process.env.NODE_ENV !== "production" && b("Invalid VNode type:", E, `(${typeof E})`);
    }
    x != null && _ && io(x, c && c.ref, v, u || c, !u);
  }, H = (c, u, p, m) => {
    if (c == null)
      o(u.el = l(u.children), p, m);
    else {
      const _ = u.el = c.el;
      u.children !== c.children && a(_, u.children);
    }
  }, G = (c, u, p, m) => {
    c == null ? o(u.el = f(u.children || ""), p, m) : u.el = c.el;
  }, Y = (c, u, p, m) => {
    [c.el, c.anchor] = A(c.children, u, p, m, c.el, c.anchor);
  }, q = (c, u, p, m) => {
    if (u.children !== c.children) {
      const _ = g(c.anchor);
      U(c), [u.el, u.anchor] = A(u.children, p, _, m);
    } else
      u.el = c.el, u.anchor = c.anchor;
  }, S = ({ el: c, anchor: u }, p, m) => {
    let _;
    for (; c && c !== u; )
      _ = g(c), o(c, p, m), c = _;
    o(u, p, m);
  }, U = ({ el: c, anchor: u }) => {
    let p;
    for (; c && c !== u; )
      p = g(c), s(c), c = p;
    s(u);
  }, ye = (c, u, p, m, _, v, O, N, y) => {
    O = O || u.type === "svg", c == null ? Oe(u, p, m, _, v, O, N, y) : J(c, u, _, v, O, N, y);
  }, Oe = (c, u, p, m, _, v, O, N) => {
    let y, E;
    const { type: x, props: w, shapeFlag: V, transition: $, dirs: F } = c;
    if (y = c.el = i(c.type, v, w && w.is, w), V & 8 ? h(y, c.children) : V & 16 && z(c.children, y, null, m, _, v && x !== "foreignObject", O, N), F && Ge(c, null, m, "created"), M(y, c, c.scopeId, O, m), w) {
      for (const k in w)
        k !== "value" && !on(k) && r(y, k, null, w[k], v, c.children, m, _, Se);
      "value" in w && r(y, "value", null, w.value), (E = w.onVnodeBeforeMount) && xe(E, m, c);
    }
    process.env.NODE_ENV !== "production" && (Object.defineProperty(y, "__vnode", {
      value: c,
      enumerable: !1
    }), Object.defineProperty(y, "__vueParentComponent", {
      value: m,
      enumerable: !1
    })), F && Ge(c, null, m, "beforeMount");
    const K = (!_ || _ && !_.pendingBranch) && $ && !$.persisted;
    K && $.beforeEnter(y), o(y, u, p), ((E = w && w.onVnodeMounted) || K || F) && de(() => {
      E && xe(E, m, c), K && $.enter(y), F && Ge(c, null, m, "mounted");
    }, _);
  }, M = (c, u, p, m, _) => {
    if (p && D(c, p), m)
      for (let v = 0; v < m.length; v++)
        D(c, m[v]);
    if (_) {
      let v = _.subTree;
      if (process.env.NODE_ENV !== "production" && v.patchFlag > 0 && v.patchFlag & 2048 && (v = sr(v.children) || v), u === v) {
        const O = _.vnode;
        M(c, O, O.scopeId, O.slotScopeIds, _.parent);
      }
    }
  }, z = (c, u, p, m, _, v, O, N, y = 0) => {
    for (let E = y; E < c.length; E++) {
      const x = c[E] = N ? ze(c[E]) : ve(c[E]);
      C(null, x, u, p, m, _, v, O, N);
    }
  }, J = (c, u, p, m, _, v, O) => {
    const N = u.el = c.el;
    let { patchFlag: y, dynamicChildren: E, dirs: x } = u;
    y |= c.patchFlag & 16;
    const w = c.props || W, V = u.props || W;
    let $;
    p && et(p, !1), ($ = V.onVnodeBeforeUpdate) && xe($, p, u, c), x && Ge(u, c, p, "beforeUpdate"), p && et(p, !0), process.env.NODE_ENV !== "production" && ut && (y = 0, O = !1, E = null);
    const F = _ && u.type !== "foreignObject";
    if (E ? (re(c.dynamicChildren, E, N, p, m, F, v), process.env.NODE_ENV !== "production" && p && p.type.__hmrId && fn(c, u)) : O || we(c, u, N, null, p, m, F, v, !1), y > 0) {
      if (y & 16)
        ne(N, u, w, V, p, m, _);
      else if (y & 2 && w.class !== V.class && r(N, "class", null, V.class, _), y & 4 && r(N, "style", w.style, V.style, _), y & 8) {
        const K = u.dynamicProps;
        for (let k = 0; k < K.length; k++) {
          const ee = K[k], Ee = w[ee], Et = V[ee];
          (Et !== Ee || ee === "value") && r(N, ee, Ee, Et, _, c.children, p, m, Se);
        }
      }
      y & 1 && c.children !== u.children && h(N, u.children);
    } else
      !O && E == null && ne(N, u, w, V, p, m, _);
    (($ = V.onVnodeUpdated) || x) && de(() => {
      $ && xe($, p, u, c), x && Ge(u, c, p, "updated");
    }, m);
  }, re = (c, u, p, m, _, v, O) => {
    for (let N = 0; N < u.length; N++) {
      const y = c[N], E = u[N], x = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (y.type === pe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !st(y, E) || // - In the case of a component, it could contain anything.
        y.shapeFlag & 70) ? d(y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          p
        )
      );
      C(y, E, x, null, m, _, v, O, !0);
    }
  }, ne = (c, u, p, m, _, v, O) => {
    if (p !== m) {
      if (p !== W)
        for (const N in p)
          !on(N) && !(N in m) && r(c, N, p[N], null, O, u.children, _, v, Se);
      for (const N in m) {
        if (on(N))
          continue;
        const y = m[N], E = p[N];
        y !== E && N !== "value" && r(c, N, E, y, O, u.children, _, v, Se);
      }
      "value" in m && r(c, "value", p.value, m.value);
    }
  }, Ae = (c, u, p, m, _, v, O, N, y) => {
    const E = u.el = c ? c.el : l(""), x = u.anchor = c ? c.anchor : l("");
    let { patchFlag: w, dynamicChildren: V, slotScopeIds: $ } = u;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (ut || w & 2048) && (w = 0, y = !1, V = null), $ && (N = N ? N.concat($) : $), c == null ? (o(E, p, m), o(x, p, m), z(u.children, p, x, _, v, O, N, y)) : w > 0 && w & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (re(c.dynamicChildren, V, p, _, v, O, N), process.env.NODE_ENV !== "production" && _ && _.type.__hmrId ? fn(c, u) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (u.key != null || _ && u === _.subTree) && fn(
        c,
        u,
        !0
        /* shallow */
      )
    )) : we(c, u, p, x, _, v, O, N, y);
  }, Yt = (c, u, p, m, _, v, O, N, y) => {
    u.slotScopeIds = N, c == null ? u.shapeFlag & 512 ? _.ctx.activate(u, p, m, O, y) : Be(u, p, m, _, v, O, y) : ae(c, u, y);
  }, Be = (c, u, p, m, _, v, O) => {
    const N = c.component = sl(c, m, _);
    if (process.env.NODE_ENV !== "production" && N.type.__hmrId && Fi(N), process.env.NODE_ENV !== "production" && (sn(c), Me(N, "mount")), qt(c) && (N.ctx.renderer = gt), process.env.NODE_ENV !== "production" && Me(N, "init"), il(N), process.env.NODE_ENV !== "production" && Re(N, "init"), N.asyncDep) {
      if (_ && _.registerDep(N, j), !c.el) {
        const y = N.subTree = Ie(se);
        G(null, y, u, p);
      }
      return;
    }
    j(N, c, u, p, _, v, O), process.env.NODE_ENV !== "production" && (rn(), Re(N, "mount"));
  }, ae = (c, u, p) => {
    const m = u.component = c.component;
    if (ec(c, u, p))
      if (m.asyncDep && !m.asyncResolved) {
        process.env.NODE_ENV !== "production" && sn(u), L(m, u, p), process.env.NODE_ENV !== "production" && rn();
        return;
      } else
        m.next = u, Mi(m.update), m.update();
    else
      u.el = c.el, m.vnode = u;
  }, j = (c, u, p, m, _, v, O) => {
    const N = () => {
      if (c.isMounted) {
        let { next: x, bu: w, u: V, parent: $, vnode: F } = c, K = x, k;
        process.env.NODE_ENV !== "production" && sn(x || c.vnode), et(c, !1), x ? (x.el = F.el, L(c, x, O)) : x = F, w && $t(w), (k = x.props && x.props.onVnodeBeforeUpdate) && xe(k, $, x, F), et(c, !0), process.env.NODE_ENV !== "production" && Me(c, "render");
        const ee = Fn(c);
        process.env.NODE_ENV !== "production" && Re(c, "render");
        const Ee = c.subTree;
        c.subTree = ee, process.env.NODE_ENV !== "production" && Me(c, "patch"), C(
          Ee,
          ee,
          // parent may have changed if it's in a teleport
          d(Ee.el),
          // anchor may have changed if it's in a fragment
          Xt(Ee),
          c,
          _,
          v
        ), process.env.NODE_ENV !== "production" && Re(c, "patch"), x.el = ee.el, K === null && tc(c, ee.el), V && de(V, _), (k = x.props && x.props.onVnodeUpdated) && de(() => xe(k, $, x, F), _), process.env.NODE_ENV !== "production" && er(c), process.env.NODE_ENV !== "production" && rn();
      } else {
        let x;
        const { el: w, props: V } = u, { bm: $, m: F, parent: K } = c, k = ln(u);
        if (et(c, !1), $ && $t($), !k && (x = V && V.onVnodeBeforeMount) && xe(x, K, u), et(c, !0), w && Mn) {
          const ee = () => {
            process.env.NODE_ENV !== "production" && Me(c, "render"), c.subTree = Fn(c), process.env.NODE_ENV !== "production" && Re(c, "render"), process.env.NODE_ENV !== "production" && Me(c, "hydrate"), Mn(w, c.subTree, c, _, null), process.env.NODE_ENV !== "production" && Re(c, "hydrate");
          };
          k ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !c.isUnmounted && ee()
          ) : ee();
        } else {
          process.env.NODE_ENV !== "production" && Me(c, "render");
          const ee = c.subTree = Fn(c);
          process.env.NODE_ENV !== "production" && Re(c, "render"), process.env.NODE_ENV !== "production" && Me(c, "patch"), C(null, ee, p, m, c, _, v), process.env.NODE_ENV !== "production" && Re(c, "patch"), u.el = ee.el;
        }
        if (F && de(F, _), !k && (x = V && V.onVnodeMounted)) {
          const ee = u;
          de(() => xe(x, K, ee), _);
        }
        (u.shapeFlag & 256 || K && ln(K.vnode) && K.vnode.shapeFlag & 256) && c.a && de(c.a, _), c.isMounted = !0, process.env.NODE_ENV !== "production" && Ui(c), u = p = m = null;
      }
    }, y = c.effect = new vo(
      N,
      () => xn(E),
      c.scope
      // track it in component's effect scope
    ), E = c.update = () => y.run();
    E.id = c.uid, et(c, !0), process.env.NODE_ENV !== "production" && (y.onTrack = c.rtc ? (x) => $t(c.rtc, x) : void 0, y.onTrigger = c.rtg ? (x) => $t(c.rtg, x) : void 0, E.ownerInstance = c), E();
  }, L = (c, u, p) => {
    u.component = c;
    const m = c.vnode.props;
    c.vnode = u, c.next = null, Sc(c, u.props, m, p), Bc(c, u.children, p), ht(), Xo(), _t();
  }, we = (c, u, p, m, _, v, O, N, y = !1) => {
    const E = c && c.children, x = c ? c.shapeFlag : 0, w = u.children, { patchFlag: V, shapeFlag: $ } = u;
    if (V > 0) {
      if (V & 128) {
        Ct(E, w, p, m, _, v, O, N, y);
        return;
      } else if (V & 256) {
        Pn(E, w, p, m, _, v, O, N, y);
        return;
      }
    }
    $ & 8 ? (x & 16 && Se(E, _, v), w !== E && h(p, w)) : x & 16 ? $ & 16 ? Ct(E, w, p, m, _, v, O, N, y) : Se(E, _, v, !0) : (x & 8 && h(p, ""), $ & 16 && z(w, p, m, _, v, O, N, y));
  }, Pn = (c, u, p, m, _, v, O, N, y) => {
    c = c || wt, u = u || wt;
    const E = c.length, x = u.length, w = Math.min(E, x);
    let V;
    for (V = 0; V < w; V++) {
      const $ = u[V] = y ? ze(u[V]) : ve(u[V]);
      C(c[V], $, p, null, _, v, O, N, y);
    }
    E > x ? Se(c, _, v, !0, !1, w) : z(u, p, m, _, v, O, N, y, w);
  }, Ct = (c, u, p, m, _, v, O, N, y) => {
    let E = 0;
    const x = u.length;
    let w = c.length - 1, V = x - 1;
    for (; E <= w && E <= V; ) {
      const $ = c[E], F = u[E] = y ? ze(u[E]) : ve(u[E]);
      if (st($, F))
        C($, F, p, null, _, v, O, N, y);
      else
        break;
      E++;
    }
    for (; E <= w && E <= V; ) {
      const $ = c[w], F = u[V] = y ? ze(u[V]) : ve(u[V]);
      if (st($, F))
        C($, F, p, null, _, v, O, N, y);
      else
        break;
      w--, V--;
    }
    if (E > w) {
      if (E <= V) {
        const $ = V + 1, F = $ < x ? u[$].el : m;
        for (; E <= V; )
          C(null, u[E] = y ? ze(u[E]) : ve(u[E]), p, F, _, v, O, N, y), E++;
      }
    } else if (E > V)
      for (; E <= w; )
        Ue(c[E], _, v, !0), E++;
    else {
      const $ = E, F = E, K = /* @__PURE__ */ new Map();
      for (E = F; E <= V; E++) {
        const ce = u[E] = y ? ze(u[E]) : ve(u[E]);
        ce.key != null && (process.env.NODE_ENV !== "production" && K.has(ce.key) && b("Duplicate keys found during update:", JSON.stringify(ce.key), "Make sure keys are unique."), K.set(ce.key, E));
      }
      let k, ee = 0;
      const Ee = V - F + 1;
      let Et = !1, jo = 0;
      const Tt = new Array(Ee);
      for (E = 0; E < Ee; E++)
        Tt[E] = 0;
      for (E = $; E <= w; E++) {
        const ce = c[E];
        if (ee >= Ee) {
          Ue(ce, _, v, !0);
          continue;
        }
        let De;
        if (ce.key != null)
          De = K.get(ce.key);
        else
          for (k = F; k <= V; k++)
            if (Tt[k - F] === 0 && st(ce, u[k])) {
              De = k;
              break;
            }
        De === void 0 ? Ue(ce, _, v, !0) : (Tt[De - F] = E + 1, De >= jo ? jo = De : Et = !0, C(ce, u[De], p, null, _, v, O, N, y), ee++);
      }
      const Lo = Et ? Jc(Tt) : wt;
      for (k = Lo.length - 1, E = Ee - 1; E >= 0; E--) {
        const ce = F + E, De = u[ce], Ho = ce + 1 < x ? u[ce + 1].el : m;
        Tt[E] === 0 ? C(null, De, p, Ho, _, v, O, N, y) : Et && (k < 0 || E !== Lo[k] ? mt(
          De,
          p,
          Ho,
          2
          /* MoveType.REORDER */
        ) : k--);
      }
    }
  }, mt = (c, u, p, m, _ = null) => {
    const { el: v, type: O, transition: N, children: y, shapeFlag: E } = c;
    if (E & 6) {
      mt(c.component.subTree, u, p, m);
      return;
    }
    if (E & 128) {
      c.suspense.move(u, p, m);
      return;
    }
    if (E & 64) {
      O.move(c, u, p, gt);
      return;
    }
    if (O === pe) {
      o(v, u, p);
      for (let w = 0; w < y.length; w++)
        mt(y[w], u, p, m);
      o(c.anchor, u, p);
      return;
    }
    if (O === Rt) {
      S(c, u, p);
      return;
    }
    if (m !== 2 && E & 1 && N)
      if (m === 0)
        N.beforeEnter(v), o(v, u, p), de(() => N.enter(v), _);
      else {
        const { leave: w, delayLeave: V, afterLeave: $ } = N, F = () => o(v, u, p), K = () => {
          w(v, () => {
            F(), $ && $();
          });
        };
        V ? V(v, F, K) : K();
      }
    else
      o(v, u, p);
  }, Ue = (c, u, p, m = !1, _ = !1) => {
    const { type: v, props: O, ref: N, children: y, dynamicChildren: E, shapeFlag: x, patchFlag: w, dirs: V } = c;
    if (N != null && io(N, null, p, c, !0), x & 256) {
      u.ctx.deactivate(c);
      return;
    }
    const $ = x & 1 && V, F = !ln(c);
    let K;
    if (F && (K = O && O.onVnodeBeforeUnmount) && xe(K, u, c), x & 6)
      Pr(c.component, p, m);
    else {
      if (x & 128) {
        c.suspense.unmount(p, m);
        return;
      }
      $ && Ge(c, null, u, "beforeUnmount"), x & 64 ? c.type.remove(c, u, p, _, gt, m) : E && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== pe || w > 0 && w & 64) ? Se(E, u, p, !1, !0) : (v === pe && w & 384 || !_ && x & 16) && Se(y, u, p), m && An(c);
    }
    (F && (K = O && O.onVnodeUnmounted) || $) && de(() => {
      K && xe(K, u, c), $ && Ge(c, null, u, "unmounted");
    }, p);
  }, An = (c) => {
    const { type: u, el: p, anchor: m, transition: _ } = c;
    if (u === pe) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && _ && !_.persisted ? c.children.forEach((O) => {
        O.type === se ? s(O.el) : An(O);
      }) : Ir(p, m);
      return;
    }
    if (u === Rt) {
      U(c);
      return;
    }
    const v = () => {
      s(p), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (c.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: O, delayLeave: N } = _, y = () => O(p, v);
      N ? N(c.el, v, y) : y();
    } else
      v();
  }, Ir = (c, u) => {
    let p;
    for (; c !== u; )
      p = g(c), s(c), c = p;
    s(u);
  }, Pr = (c, u, p) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && ji(c);
    const { bum: m, scope: _, update: v, subTree: O, um: N } = c;
    m && $t(m), _.stop(), v && (v.active = !1, Ue(O, c, u, p)), N && de(N, u), de(() => {
      c.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve()), process.env.NODE_ENV !== "production" && Wi(c);
  }, Se = (c, u, p, m = !1, _ = !1, v = 0) => {
    for (let O = v; O < c.length; O++)
      Ue(c[O], u, p, m, _);
  }, Xt = (c) => c.shapeFlag & 6 ? Xt(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : g(c.anchor || c.el), Fo = (c, u, p) => {
    c == null ? u._vnode && Ue(u._vnode, null, null, !0) : C(u._vnode || null, c, u, null, null, null, p), Xo(), Xs(), u._vnode = c;
  }, gt = {
    p: C,
    um: Ue,
    m: mt,
    r: An,
    mt: Be,
    mc: z,
    pc: we,
    pbc: re,
    n: Xt,
    o: e
  };
  let Sn, Mn;
  return t && ([Sn, Mn] = t(gt)), {
    render: Fo,
    hydrate: Sn,
    createApp: Kc(Fo, Sn)
  };
}
function et({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function fn(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (T(o) && T(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = ze(s[r]), l.el = i.el), n || fn(i, l)), l.type === Jt && (l.el = i.el), process.env.NODE_ENV !== "production" && l.type === se && !l.el && (l.el = i.el);
    }
}
function Jc(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, l;
  const f = e.length;
  for (o = 0; o < f; o++) {
    const a = e[o];
    if (a !== 0) {
      if (s = n[n.length - 1], e[s] < a) {
        t[o] = s, n.push(o);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        l = r + i >> 1, e[n[l]] < a ? r = l + 1 : i = l;
      a < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), n[r] = o);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
const Yc = (e) => e.__isTeleport, pe = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Jt = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), se = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0), Rt = Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0), Ft = [];
let be = null;
function Ce(e = !1) {
  Ft.push(be = e ? null : []);
}
function Xc() {
  Ft.pop(), be = Ft[Ft.length - 1] || null;
}
let Ut = 1;
function ls(e) {
  Ut += e;
}
function vr(e) {
  return e.dynamicChildren = Ut > 0 ? be || wt : null, Xc(), Ut > 0 && be && be.push(e), e;
}
function Fe(e, t, n, o, s, r) {
  return vr(Ot(
    e,
    t,
    n,
    o,
    s,
    r,
    !0
    /* isBlock */
  ));
}
function Zc(e, t, n, o, s) {
  return vr(Ie(
    e,
    t,
    n,
    o,
    s,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function Ao(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function st(e, t) {
  return process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && Nt.has(t.type) ? (e.shapeFlag &= -257, t.shapeFlag &= -513, !1) : e.type === t.type && e.key === t.key;
}
const Qc = (...e) => yr(...e), $n = "__vInternal", br = ({ key: e }) => e ?? null, un = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? Z(e) || te(e) || I(e) ? { i: _e, r: e, k: t, f: !!n } : e : null;
function Ot(e, t = null, n = null, o = 0, s = null, r = e === pe ? 0 : 1, i = !1, l = !1) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && br(t),
    ref: t && un(t),
    scopeId: or,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: _e
  };
  return l ? (So(f, n), r & 128 && e.normalize(f)) : n && (f.shapeFlag |= Z(n) ? 8 : 16), process.env.NODE_ENV !== "production" && f.key !== f.key && b("VNode created with invalid key (NaN). VNode type:", f.type), Ut > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  be && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (f.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  f.patchFlag !== 32 && be.push(f), f;
}
const Ie = process.env.NODE_ENV !== "production" ? Qc : yr;
function yr(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === bc) && (process.env.NODE_ENV !== "production" && !e && b(`Invalid vnode type when creating vnode: ${e}.`), e = se), Ao(e)) {
    const l = Pe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && So(l, n), Ut > 0 && !r && be && (l.shapeFlag & 6 ? be[be.indexOf(e)] = l : be.push(l)), l.patchFlag |= -2, l;
  }
  if (Cr(e) && (e = e.__vccOpts), t) {
    t = Gc(t);
    let { class: l, style: f } = t;
    l && !Z(l) && (t.class = ho(l)), B(f) && (Yn(f) && !T(f) && (f = X({}, f)), t.style = po(f));
  }
  const i = Z(e) ? 1 : nc(e) ? 128 : Yc(e) ? 64 : B(e) ? 4 : I(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Yn(e) && (e = P(e), b("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), Ot(e, t, n, o, s, i, r, !0);
}
function Gc(e) {
  return e ? Yn(e) || $n in e ? X({}, e) : e : null;
}
function Pe(e, t, n = !1) {
  const { props: o, ref: s, patchFlag: r, children: i } = e, l = t ? tl(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && br(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? T(s) ? s.concat(un(t)) : [s, un(t)] : un(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && r === -1 && T(i) ? i.map(Or) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== pe ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Pe(e.ssContent),
    ssFallback: e.ssFallback && Pe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Or(e) {
  const t = Pe(e);
  return T(e.children) && (t.children = e.children.map(Or)), t;
}
function el(e = " ", t = 0) {
  return Ie(Jt, null, e, t);
}
function Pt(e = "", t = !1) {
  return t ? (Ce(), Zc(se, null, e)) : Ie(se, null, e);
}
function ve(e) {
  return e == null || typeof e == "boolean" ? Ie(se) : T(e) ? Ie(
    pe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? ze(e) : Ie(Jt, null, String(e));
}
function ze(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Pe(e);
}
function So(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (T(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), So(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !($n in t) ? t._ctx = _e : s === 3 && _e && (_e.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    I(t) ? (t = { default: t, _ctx: _e }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [el(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function tl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = ho([t.class, o.class]));
      else if (s === "style")
        t.style = po([t.style, o.style]);
      else if (Wt(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(T(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else
        s !== "" && (t[s] = o[s]);
  }
  return t;
}
function xe(e, t, n, o = null) {
  ge(e, t, 7, [
    n,
    o
  ]);
}
const nl = Nr();
let ol = 0;
function sl(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || nl, r = {
    uid: ol++,
    vnode: e,
    type: o,
    parent: t,
    appContext: s,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Wr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: hr(o, s),
    emitsOptions: nr(o, s),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: W,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: W,
    data: W,
    props: W,
    attrs: W,
    slots: W,
    refs: W,
    setupState: W,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? r.ctx = Oc(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Yi.bind(null, r), e.ce && e.ce(r), r;
}
let Q = null;
const wr = () => Q || _e, xt = (e) => {
  Q = e, e.scope.on();
}, dt = () => {
  Q && Q.scope.off(), Q = null;
}, rl = /* @__PURE__ */ Vt("slot,component");
function co(e, t) {
  const n = t.isNativeTag || ys;
  (rl(e) || n(e)) && b("Do not use built-in or reserved HTML elements as component id: " + e);
}
function Dr(e) {
  return e.vnode.shapeFlag & 4;
}
let Kt = !1;
function il(e, t = !1) {
  Kt = t;
  const { props: n, children: o } = e.vnode, s = Dr(e);
  Pc(e, n, s, t), kc(e, o);
  const r = s ? cl(e, t) : void 0;
  return Kt = !1, r;
}
function cl(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && co(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        co(r[i], e.appContext.config);
    }
    if (o.directives) {
      const r = Object.keys(o.directives);
      for (let i = 0; i < r.length; i++)
        ur(r[i]);
    }
    o.compilerOptions && ll() && b('"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.');
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Hs(new Proxy(e.ctx, ar)), process.env.NODE_ENV !== "production" && wc(e);
  const { setup: s } = o;
  if (s) {
    const r = e.setupContext = s.length > 1 ? fl(e) : null;
    xt(e), ht();
    const i = Le(s, e, 0, [process.env.NODE_ENV !== "production" ? bt(e.props) : e.props, r]);
    if (_t(), dt(), go(i)) {
      if (i.then(dt, dt), t)
        return i.then((l) => {
          fs(e, l, t);
        }).catch((l) => {
          Dn(
            l,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      if (e.asyncDep = i, process.env.NODE_ENV !== "production" && !e.suspense) {
        const l = (n = o.name) !== null && n !== void 0 ? n : "Anonymous";
        b(`Component <${l}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
      }
    } else
      fs(e, i, t);
  } else
    xr(e, t);
}
function fs(e, t, n) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : B(t) ? (process.env.NODE_ENV !== "production" && Ao(t) && b("setup() should not return VNodes directly - return a render function instead."), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Us(t), process.env.NODE_ENV !== "production" && Dc(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && b(`setup() should return an object. Received: ${t === null ? "null" : typeof t}`), xr(e, n);
}
let lo;
const ll = () => !lo;
function xr(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && lo && !o.render) {
      const s = o.template || Io(e).template;
      if (s) {
        process.env.NODE_ENV !== "production" && Me(e, "compile");
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config, { delimiters: l, compilerOptions: f } = o, a = X(X({
          isCustomElement: r,
          delimiters: l
        }, i), f);
        o.render = lo(s, a), process.env.NODE_ENV !== "production" && Re(e, "compile");
      }
    }
    e.render = o.render || oe;
  }
  xt(e), ht(), Vc(e), _t(), dt(), process.env.NODE_ENV !== "production" && !o.render && e.render === oe && !t && (o.template ? b(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
    /* should not happen */
  ) : b("Component is missing template or render function."));
}
function us(e) {
  return new Proxy(e.attrs, process.env.NODE_ENV !== "production" ? {
    get(t, n) {
      return _n(), ue(e, "get", "$attrs"), t[n];
    },
    set() {
      return b("setupContext.attrs is readonly."), !1;
    },
    deleteProperty() {
      return b("setupContext.attrs is readonly."), !1;
    }
  } : {
    get(t, n) {
      return ue(e, "get", "$attrs"), t[n];
    }
  });
}
function fl(e) {
  const t = (o) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && b("expose() should be called only once per setup()."), o != null)) {
      let s = typeof o;
      s === "object" && (T(o) ? s = "array" : te(o) && (s = "ref")), s !== "object" && b(`expose() should be passed a plain object, received ${s}.`);
    }
    e.exposed = o || {};
  };
  let n;
  return process.env.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return n || (n = us(e));
    },
    get slots() {
      return bt(e.slots);
    },
    get emit() {
      return (o, ...s) => e.emit(o, ...s);
    },
    expose: t
  }) : {
    get attrs() {
      return n || (n = us(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Mo(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Us(Hs(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in at)
          return at[n](e);
      },
      has(t, n) {
        return n in t || n in at;
      }
    }));
}
const ul = /(?:^|[-_])(\w)/g, al = (e) => e.replace(ul, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Vr(e, t = !0) {
  return I(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function In(e, t, n = !1) {
  let o = Vr(t);
  if (!o && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (o = s[1]);
  }
  if (!o && e && e.parent) {
    const s = (r) => {
      for (const i in r)
        if (r[i] === t)
          return i;
    };
    o = s(e.components || e.parent.type.components) || s(e.appContext.components);
  }
  return o ? al(o) : n ? "App" : "Anonymous";
}
function Cr(e) {
  return I(e) && "__vccOpts" in e;
}
const Je = (e, t) => Vi(e, t, Kt), dl = Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : ""), pl = () => {
  {
    const e = cn(dl);
    return e || process.env.NODE_ENV !== "production" && b("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."), e;
  }
};
function kn(e) {
  return !!(e && e.__v_isShallow);
}
function hl() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, o = { style: "color:#9d288c" }, s = {
    header(d) {
      return B(d) ? d.__isVue ? ["div", e, "VueInstance"] : te(d) ? [
        "div",
        {},
        ["span", e, h(d)],
        "<",
        l(d.value),
        ">"
      ] : lt(d) ? [
        "div",
        {},
        ["span", e, kn(d) ? "ShallowReactive" : "Reactive"],
        "<",
        l(d),
        `>${Ze(d) ? " (readonly)" : ""}`
      ] : Ze(d) ? [
        "div",
        {},
        ["span", e, kn(d) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(d),
        ">"
      ] : null : null;
    },
    hasBody(d) {
      return d && d.__isVue;
    },
    body(d) {
      if (d && d.__isVue)
        return [
          "div",
          {},
          ...r(d.$)
        ];
    }
  };
  function r(d) {
    const g = [];
    d.type.props && d.props && g.push(i("props", P(d.props))), d.setupState !== W && g.push(i("setup", d.setupState)), d.data !== W && g.push(i("data", P(d.data)));
    const D = f(d, "computed");
    D && g.push(i("computed", D));
    const A = f(d, "inject");
    return A && g.push(i("injected", A)), g.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: d }]
    ]), g;
  }
  function i(d, g) {
    return g = X({}, g), Object.keys(g).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        d
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(g).map((D) => [
          "div",
          {},
          ["span", o, D + ": "],
          l(g[D], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(d, g = !0) {
    return typeof d == "number" ? ["span", t, d] : typeof d == "string" ? ["span", n, JSON.stringify(d)] : typeof d == "boolean" ? ["span", o, d] : B(d) ? ["object", { object: g ? P(d) : d }] : ["span", n, String(d)];
  }
  function f(d, g) {
    const D = d.type;
    if (I(D))
      return;
    const A = {};
    for (const C in d.ctx)
      a(D, C, g) && (A[C] = d.ctx[C]);
    return A;
  }
  function a(d, g, D) {
    const A = d[D];
    if (T(A) && A.includes(g) || B(A) && g in A || d.extends && a(d.extends, g, D) || d.mixins && d.mixins.some((C) => a(C, g, D)))
      return !0;
  }
  function h(d) {
    return kn(d) ? "ShallowRef" : d.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const as = "3.2.47", _l = "http://www.w3.org/2000/svg", rt = typeof document < "u" ? document : null, ds = rt && /* @__PURE__ */ rt.createElement("template"), ml = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t ? rt.createElementNS(_l, e) : rt.createElement(e, n ? { is: n } : void 0);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => rt.createTextNode(e),
  createComment: (e) => rt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => rt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, s, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (s && (s === r || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); )
        ;
    else {
      ds.innerHTML = o ? `<svg>${e}</svg>` : e;
      const l = ds.content;
      if (o) {
        const f = l.firstChild;
        for (; f.firstChild; )
          l.appendChild(f.firstChild);
        l.removeChild(f);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function gl(e, t, n) {
  const o = e._vtc;
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function El(e, t, n) {
  const o = e.style, s = Z(n);
  if (n && !s) {
    if (t && !Z(t))
      for (const r in t)
        n[r] == null && fo(o, r, "");
    for (const r in n)
      fo(o, r, n[r]);
  } else {
    const r = o.display;
    s ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (o.display = r);
  }
}
const Nl = /[^\\];\s*$/, ps = /\s*!important$/;
function fo(e, t, n) {
  if (T(n))
    n.forEach((o) => fo(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Nl.test(n) && b(`Unexpected semicolon at the end of '${t}' style value: '${n}'`), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = vl(e, t);
    ps.test(n) ? e.setProperty(he(o), n.replace(ps, ""), "important") : e[o] = n;
  }
}
const hs = ["Webkit", "Moz", "ms"], Bn = {};
function vl(e, t) {
  const n = Bn[t];
  if (n)
    return n;
  let o = je(t);
  if (o !== "filter" && o in e)
    return Bn[t] = o;
  o = vn(o);
  for (let s = 0; s < hs.length; s++) {
    const r = hs[s] + o;
    if (r in e)
      return Bn[t] = r;
  }
  return t;
}
const _s = "http://www.w3.org/1999/xlink";
function bl(e, t, n, o, s) {
  if (o && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(_s, t.slice(6, t.length)) : e.setAttributeNS(_s, t, n);
  else {
    const r = jr(t);
    n == null || r && !vs(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function yl(e, t, n, o, s, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    o && i(o, s, r), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const f = n ?? "";
    (e.value !== f || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = f), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean" ? n = vs(n) : n == null && f === "string" ? (n = "", l = !0) : f === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch (f) {
    process.env.NODE_ENV !== "production" && !l && b(`Failed setting prop "${t}" on <${e.tagName.toLowerCase()}>: value ${n} is invalid.`, f);
  }
  l && e.removeAttribute(t);
}
function Ol(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function wl(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
function Dl(e, t, n, o, s = null) {
  const r = e._vei || (e._vei = {}), i = r[t];
  if (o && i)
    i.value = o;
  else {
    const [l, f] = xl(t);
    if (o) {
      const a = r[t] = Tl(o, s);
      Ol(e, l, a, f);
    } else
      i && (wl(e, l, i, f), r[t] = void 0);
  }
}
const ms = /(?:Once|Passive|Capture)$/;
function xl(e) {
  let t;
  if (ms.test(e)) {
    t = {};
    let o;
    for (; o = e.match(ms); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : he(e.slice(2)), t];
}
let Un = 0;
const Vl = /* @__PURE__ */ Promise.resolve(), Cl = () => Un || (Vl.then(() => Un = 0), Un = Date.now());
function Tl(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    ge($l(o, n.value), t, 5, [o]);
  };
  return n.value = e, n.attached = Cl(), n;
}
function $l(e, t) {
  if (T(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((o) => (s) => !s._stopped && o && o(s));
  } else
    return t;
}
const gs = /^on[a-z]/, Il = (e, t, n, o, s = !1, r, i, l, f) => {
  t === "class" ? gl(e, o, s) : t === "style" ? El(e, n, o) : Wt(t) ? an(t) || Dl(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Pl(e, t, o, s)) ? yl(e, t, o, r, i, l, f) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), bl(e, t, o, s));
};
function Pl(e, t, n, o) {
  return o ? !!(t === "innerHTML" || t === "textContent" || t in e && gs.test(t) && I(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || gs.test(t) && Z(n) ? !1 : t in e;
}
function Tr(e, t) {
  const n = uc(e);
  class o extends Ro {
    constructor(r) {
      super(n, r, t);
    }
  }
  return o.def = n, o;
}
const Al = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Ro extends Al {
  constructor(t, n = {}, o) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && o ? o(this._createVNode(), this.shadowRoot) : (process.env.NODE_ENV !== "production" && this.shadowRoot && b("Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineSSRCustomElement`."), this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, qs(() => {
      this._connected || (Ns(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let o = 0; o < this.attributes.length; o++)
      this._setAttr(this.attributes[o].name);
    new MutationObserver((o) => {
      for (const s of o)
        this._setAttr(s.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (o, s = !1) => {
      const { props: r, styles: i } = o;
      let l;
      if (r && !T(r))
        for (const f in r) {
          const a = r[f];
          (a === Number || a && a.type === Number) && (f in this._props && (this._props[f] = ko(this._props[f])), (l || (l = /* @__PURE__ */ Object.create(null)))[je(f)] = !0);
        }
      this._numberProps = l, s && this._resolveProps(o), this._applyStyles(i), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((o) => t(o, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, o = T(n) ? n : Object.keys(n || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && o.includes(s) && this._setProp(s, this[s], !0, !1);
    for (const s of o.map(je))
      Object.defineProperty(this, s, {
        get() {
          return this._getProp(s);
        },
        set(r) {
          this._setProp(s, r);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const o = je(t);
    this._numberProps && this._numberProps[o] && (n = ko(n)), this._setProp(o, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, o = !0, s = !0) {
    n !== this._props[t] && (this._props[t] = n, s && this._instance && this._update(), o && (n === !0 ? this.setAttribute(he(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(he(t), n + "") : n || this.removeAttribute(he(t))));
  }
  _update() {
    Ns(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ie(this._def, X({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0, process.env.NODE_ENV !== "production" && (n.ceReload = (r) => {
        this._styles && (this._styles.forEach((i) => this.shadowRoot.removeChild(i)), this._styles.length = 0), this._applyStyles(r), this._instance = null, this._update();
      });
      const o = (r, i) => {
        this.dispatchEvent(new CustomEvent(r, {
          detail: i
        }));
      };
      n.emit = (r, ...i) => {
        o(r, i), he(r) !== r && o(he(r), i);
      };
      let s = this;
      for (; s = s && (s.parentNode || s.host); )
        if (s instanceof Ro) {
          n.parent = s._instance, n.provides = s._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const o = document.createElement("style");
      o.textContent = n, this.shadowRoot.appendChild(o), process.env.NODE_ENV !== "production" && (this._styles || (this._styles = [])).push(o);
    });
  }
}
function Sl(e) {
  const t = wr();
  if (!t) {
    process.env.NODE_ENV !== "production" && b("useCssVars is called without current active component instance.");
    return;
  }
  const n = t.ut = (s = e(t.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((r) => ao(r, s));
  }, o = () => {
    const s = e(t.proxy);
    uo(t.subTree, s), n(s);
  };
  rc(o), Tn(() => {
    const s = new MutationObserver(o);
    s.observe(t.subTree.el.parentNode, { childList: !0 }), To(() => s.disconnect());
  });
}
function uo(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      uo(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    ao(e.el, t);
  else if (e.type === pe)
    e.children.forEach((n) => uo(n, t));
  else if (e.type === Rt) {
    let { el: n, anchor: o } = e;
    for (; n && (ao(n, t), n !== o); )
      n = n.nextSibling;
  }
}
function ao(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const o in t)
      n.setProperty(`--${o}`, t[o]);
  }
}
const Ml = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
fc.props;
const Rl = /* @__PURE__ */ X({ patchProp: Il }, ml);
let Es;
function Fl() {
  return Es || (Es = zc(Rl));
}
const Ns = (...e) => {
  Fl().render(...e);
};
function jl() {
  hl();
}
process.env.NODE_ENV !== "production" && jl();
const Ll = `.event-list[data-v-164a734f]{display:flex;flex-direction:column;gap:4px}
`, $r = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, Hl = { class: "event-list" }, kl = ["event"], Bl = {
  __name: "EventList.ce",
  props: {
    calendarIds: {
      type: Array,
      required: !0
    }
  },
  setup(e) {
    const t = e, n = Je(() => t.calendarIds.split(",").map((i, l) => `${l !== 0 && "&"}calendarId=${i}`).join("")), o = yi({});
    Tn(async () => {
      o.value = await fetch(`https://cve-events.deno.dev/?${n.value}&timeMin=${new Date().toISOString()}`).then((i) => i.json());
    });
    const s = Je(() => Object.values(o.value)), r = Je(() => s.value.map((i) => i.items).flat().sort((i, l) => new Date(i.start.date) - new Date(l.start.date)));
    return (i, l) => (Ce(), Fe("section", Hl, [
      (Ce(!0), Fe(pe, null, yc(ot(r), (f) => (Ce(), Fe("event-item", {
        key: f.id,
        event: f
      }, null, 8, kl))), 128))
    ]));
  }
}, Ul = /* @__PURE__ */ $r(Bl, [["styles", [Ll]], ["__scopeId", "data-v-164a734f"]]), Kl = `@import"https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@700&display=swap";h3[data-v-8f9be34a],h4[data-v-8f9be34a],h5[data-v-8f9be34a]{font-family:Poppins,sans-serif;margin:0}p[data-v-8f9be34a]{font-family:Open Sans,sans-serif;margin:0}.date-frame[data-v-8f9be34a]{display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f5f5f5;margin-right:1rem;text-transform:uppercase;width:100px;padding:8px}.date-frame .date[data-v-8f9be34a]{font-size:2rem;margin:-12px 0}.date-frame .end-date[data-v-8f9be34a]{color:#999}.content-frame[data-v-8f9be34a]{display:flex;flex-direction:column;justify-content:center;width:100%;color:#fff;padding:8px}.content-frame .title[data-v-8f9be34a]{font-size:1.5rem;margin-bottom:8px;text-transform:uppercase}.event[data-v-8f9be34a]{padding:4px;background:hsl(var(--58c0424c),50%,50%);display:flex;position:relative}.event[data-v-8f9be34a]:not(:last-child){margin-bottom:4px}.type-frame[data-v-8f9be34a]{position:absolute;top:8px;right:8px;color:#fff;opacity:.3}
`, Wl = { class: "event" }, zl = { class: "date-frame" }, ql = { class: "date" }, Jl = {
  key: 0,
  class: "end-date"
}, Yl = { class: "content-frame" }, Xl = {
  key: 0,
  class: "title"
}, Zl = { key: 1 }, Ql = { key: 2 }, Gl = {
  key: 0,
  class: "type-frame"
}, ef = {
  __name: "EventItem.ce",
  props: ["event"],
  setup(e) {
    const t = e;
    Sl((l) => ({
      "58c0424c": ot(i)
    }));
    const n = Je(() => new Date(t.event.start.date)), o = Je(() => new Date(t.event.end.date)), s = Je(() => o.value.getTime() - n.value.getTime() <= 864e5), r = {
      Régates: "250deg"
    }, i = Je(() => r[t.event.organizer.displayName] || "0deg");
    return (l, f) => (Ce(), Fe("article", Wl, [
      Ot("div", zl, [
        Ot("h5", null, Qe(ot(n).toLocaleString("default", { month: "short" })), 1),
        Ot("h4", ql, Qe(ot(n).getDate()), 1),
        ot(s) ? Pt("", !0) : (Ce(), Fe("h5", Jl, " →" + Qe(ot(o).toLocaleDateString("default", { month: "short", day: "numeric" })), 1))
      ]),
      Ot("div", Yl, [
        e.event.summary ? (Ce(), Fe("h3", Xl, Qe(e.event.summary), 1)) : Pt("", !0),
        e.event.description ? (Ce(), Fe("p", Zl, Qe(e.event.description), 1)) : Pt("", !0),
        e.event.location ? (Ce(), Fe("p", Ql, Qe(e.event.location), 1)) : Pt("", !0)
      ]),
      e.event.organizer.displayName ? (Ce(), Fe("h5", Gl, Qe(e.event.organizer.displayName), 1)) : Pt("", !0)
    ]));
  }
}, tf = /* @__PURE__ */ $r(ef, [["styles", [Kl]], ["__scopeId", "data-v-8f9be34a"]]), nf = Tr(Ul), of = Tr(tf);
function sf() {
  customElements.define("event-list", nf), customElements.define("event-item", of);
}
export {
  of as EventItemElement,
  nf as EventListElement,
  sf as register
};
