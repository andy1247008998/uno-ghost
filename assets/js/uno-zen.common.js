/**
 * uno-zen - Minimalist and Elegant theme for Ghost
 * @version 2.9.8
 * @link    https://github.com/kikobeats/uno-zen
 * @author  Kiko Beats (https://github.com/kikobeats)
 * @license MIT
 */
! function () {
	"use strict";

	function t(e, r) {
		var i;
		if (r = r || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = r.touchBoundary || 10, this.layer = e, this.tapDelay = r.tapDelay || 200, this.tapTimeout = r.tapTimeout || 700, !t.notNeeded(e)) {
			for (var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, a = 0, c = o.length; a < c; a++) s[o[a]] = function (t, e) {
				return function () {
					return t.apply(e, arguments)
				}
			}(s[o[a]], s);
			n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, n, r) {
				var i = Node.prototype.removeEventListener;
				"click" === t ? i.call(e, t, n.hijacked || n, r) : i.call(e, t, n, r)
			}, e.addEventListener = function (t, n, r) {
				var i = Node.prototype.addEventListener;
				"click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function (t) {
					t.propagationStopped || n(t)
				}), r) : i.call(e, t, n, r)
			}), "function" == typeof e.onclick && (i = e.onclick, e.addEventListener("click", function (t) {
				i(t)
			}, !1), e.onclick = null)
		}
	}
	var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
		n = navigator.userAgent.indexOf("Android") > 0 && !e,
		r = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
		i = r && /OS 4_\d(_\d)?/.test(navigator.userAgent),
		o = r && /OS [6-7]_\d/.test(navigator.userAgent),
		s = navigator.userAgent.indexOf("BB10") > 0;
	t.prototype.needsClick = function (t) {
		switch (t.nodeName.toLowerCase()) {
		case "button":
		case "select":
		case "textarea":
			if (t.disabled) return !0;
			break;
		case "input":
			if (r && "file" === t.type || t.disabled) return !0;
			break;
		case "label":
		case "iframe":
		case "video":
			return !0
		}
		return /\bneedsclick\b/.test(t.className)
	}, t.prototype.needsFocus = function (t) {
		switch (t.nodeName.toLowerCase()) {
		case "textarea":
			return !0;
		case "select":
			return !n;
		case "input":
			switch (t.type) {
			case "button":
			case "checkbox":
			case "file":
			case "image":
			case "radio":
			case "submit":
				return !1
			}
			return !t.disabled && !t.readOnly;
		default:
			return /\bneedsfocus\b/.test(t.className)
		}
	}, t.prototype.sendClick = function (t, e) {
		var n, r;
		document.activeElement && document.activeElement !== t && document.activeElement.blur(), r = e.changedTouches[0], (n = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(t), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
	}, t.prototype.determineEventType = function (t) {
		return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
	}, t.prototype.focus = function (t) {
		var e;
		r && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
	}, t.prototype.updateScrollParent = function (t) {
		var e, n;
		if (!(e = t.fastClickScrollParent) || !e.contains(t)) {
			n = t;
			do {
				if (n.scrollHeight > n.offsetHeight) {
					e = n, t.fastClickScrollParent = n;
					break
				}
				n = n.parentElement
			} while (n)
		}
		e && (e.fastClickLastScrollTop = e.scrollTop)
	}, t.prototype.getTargetElementFromEventTarget = function (t) {
		return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
	}, t.prototype.onTouchStart = function (t) {
		var e, n, o;
		if (t.targetTouches.length > 1) return !0;
		if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], r) {
			if ((o = window.getSelection()).rangeCount && !o.isCollapsed) return !0;
			if (!i) {
				if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
				this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
			}
		}
		return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
	}, t.prototype.touchHasMoved = function (t) {
		var e = t.changedTouches[0],
			n = this.touchBoundary;
		return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n
	}, t.prototype.onTouchMove = function (t) {
		return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0)
	}, t.prototype.findControl = function (t) {
		return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
	}, t.prototype.onTouchEnd = function (t) {
		var e, s, a, c, u, l = this.targetElement;
		if (!this.trackingClick) return !0;
		if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
		if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
		if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, s = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, o && (u = t.changedTouches[0], (l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (a = l.tagName.toLowerCase())) {
			if (e = this.findControl(l)) {
				if (this.focus(l), n) return !1;
				l = e
			}
		} else if (this.needsFocus(l)) return t.timeStamp - s > 100 || r && window.top !== window && "input" === a ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), r && "select" === a || (this.targetElement = null, t.preventDefault()), !1);
		return !(!r || i || !(c = l.fastClickScrollParent) || c.fastClickLastScrollTop === c.scrollTop) || (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
	}, t.prototype.onTouchCancel = function () {
		this.trackingClick = !1, this.targetElement = null
	}, t.prototype.onMouse = function (t) {
		return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1))))
	}, t.prototype.onClick = function (t) {
		var e;
		return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail || ((e = this.onMouse(t)) || (this.targetElement = null), e)
	}, t.prototype.destroy = function () {
		var t = this.layer;
		n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
	}, t.notNeeded = function (t) {
		var e, r, i;
		if (void 0 === window.ontouchstart) return !0;
		if (r = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
			if (!n) return !0;
			if (e = document.querySelector("meta[name=viewport]")) {
				if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
				if (r > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
			}
		}
		if (s && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]"))) {
			if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
			if (document.documentElement.scrollWidth <= window.outerWidth) return !0
		}
		return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction || (!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] >= 27 && (e = document.querySelector("meta[name=viewport]")) && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || "none" === t.style.touchAction || "manipulation" === t.style.touchAction)
	}, t.attach = function (e, n) {
		return new t(e, n)
	}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
		return t
	}) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}(),
function () {
	"use strict";
	! function () {
		var t, e;
		e = document.body, window.Uno = t = {
			version: "2.9.0",
			is: function (t, n) {
				return Array.isArray(n) ? n.some(function (n) {
					return e.dataset[t] === n
				}) : e.dataset[t] === n
			},
			attr: function (t, n) {
				return null != n ? e.dataset[t] = n : e.dataset[t]
			},
			context: function () {
				var t;
				return "" === (t = document.body.className.split(" ")[0].split("-")[0]) ? "error" : t
			},
			linkify: function (t) {
				return $(t).each(function () {
					var t, e, n;
					return t = $(this), n = t.text(), e = t.attr("id"), t.html(""), t.addClass("deep-link"), t.append("<a href=#" + e + ' class="title-link">' + n + "</a>")
				})
			},
			timeAgo: function (t) {
				return $(t).each(function () {
					var t, e;
					return t = $(this).html(), 0 === (e = Math.floor((Date.now() - new Date(t)) / 864e5)) ? e = "today" : 1 === e ? e = "yesterday" : e += " days ago", $(this).html(e), $(this).mouseover(function () {
						return $(this).html(t)
					}), $(this).mouseout(function () {
						return $(this).html(e)
					})
				})
			},
			device: function () {
				var t;
				return t = window.innerWidth, window.innerHeight, t <= 480 ? "mobile" : t <= 1024 ? "tablet" : "desktop"
			}
		}, t.attr("page", t.context()), t.attr("device", t.device()), window.profile_title && $("#profile-title").text(window.profile_title), window.profile_resume && $("#profile-resume").text(window.profile_resume), window.posts_headline && $("#posts-headline").text(window.posts_headline), window.open_button = window.open_button || ".nav-posts > a"
	}()
}.call(this);
var InstantClick = function (t, e) {
	function n(t) {
		var e = t.indexOf("#");
		return e < 0 ? t : t.substr(0, e)
	}

	function r(t) {
		for (; t && "A" != t.nodeName;) t = t.parentNode;
		return t
	}

	function o(t) {
		do {
			if (!t.hasAttribute) break;
			if (t.hasAttribute("data-instant")) return !1;
			if (t.hasAttribute("data-no-instant")) return !0
		} while (t = t.parentNode);
		return !1
	}

	function s(t) {
		do {
			if (!t.hasAttribute) break;
			if (t.hasAttribute("data-no-instant")) return !1;
			if (t.hasAttribute("data-instant")) return !0
		} while (t = t.parentNode);
		return !1
	}

	function a(t) {
		var r = e.protocol + "//" + e.host;
		return !(t.target || t.hasAttribute("download") || 0 != t.href.indexOf(r + "/") || t.href.indexOf("#") > -1 && n(t.href) == k || (x ? !s(t) : o(t)))
	}

	function c(t, e, n, r) {
		for (var i = !1, o = 0; o < Y[t].length; o++)
			if ("receive" == t) {
				var s = Y[t][o](e, n, r);
				s && ("body" in s && (n = s.body), "title" in s && (r = s.title), i = s)
			} else Y[t][o](e, n, r);
		return i
	}

	function u(e, r, i, o) {
		if (t.documentElement.replaceChild(r, t.body), i) {
			history.pushState(null, null, i);
			var s = i.indexOf("#"),
				a = s > -1 && t.getElementById(i.substr(s + 1)),
				u = 0;
			if (a)
				for (; a.offsetParent;) u += a.offsetTop, a = a.offsetParent;
			scrollTo(0, u), k = n(i)
		} else scrollTo(0, o);
		O && t.title == e ? t.title = e + String.fromCharCode(160) : t.title = e, y(), I.done(), c("change", !1);
		var l = t.createEvent("HTMLEvents");
		l.initEvent("instantclick:newpage", !0, !0), dispatchEvent(l)
	}

	function l() {
		R = !1, F = !1
	}

	function d(t) {
		return t.replace(/<noscript[\s\S]+<\/noscript>/gi, "")
	}

	function h(t) {
		if (!(C > +new Date - 500)) {
			var e = r(t.target);
			e && a(e) && w(e.href)
		}
	}

	function f(t) {
		if (!(C > +new Date - 500)) {
			var e = r(t.target);
			e && a(e) && (e.addEventListener("mouseout", m), M ? (T = e.href, E = setTimeout(w, M)) : w(e.href))
		}
	}

	function p(t) {
		C = +new Date;
		var e = r(t.target);
		e && a(e) && (L ? e.removeEventListener("mousedown", h) : e.removeEventListener("mouseover", f), w(e.href))
	}

	function g(t) {
		var e = r(t.target);
		e && a(e) && (t.which > 1 || t.metaKey || t.ctrlKey || (t.preventDefault(), b(e.href)))
	}

	function m() {
		if (E) return clearTimeout(E), void(E = !1);
		R && !F && (S.abort(), l())
	}

	function v() {
		if (!(S.readyState < 4) && 0 != S.status) {
			if (_.ready = +new Date - _.start, S.getResponseHeader("Content-Type").match(/\/(x|ht|xht)ml/)) {
				var e = t.implementation.createHTMLDocument("");
				e.documentElement.innerHTML = d(S.responseText), $ = e.title, U = e.body;
				var r = c("receive", q, U, $);
				r && ("body" in r && (U = r.body), "title" in r && ($ = r.title));
				var i = n(q);
				N[i] = {
					body: U,
					title: $,
					scrollY: i in N ? N[i].scrollY : 0
				};
				for (var o, s, a = e.head.children, u = 0, l = a.length - 1; l >= 0; l--)
					if ((o = a[l]).hasAttribute("data-instant-track")) {
						s = o.getAttribute("href") || o.getAttribute("src") || o.innerHTML;
						for (var h = H.length - 1; h >= 0; h--) H[h] == s && u++
					}
				u != H.length && (D = !0)
			} else D = !0;
			F && (F = !1, b(q))
		}
	}

	function y(e) {
		if (t.body.addEventListener("touchstart", p, !0), L ? t.body.addEventListener("mousedown", h, !0) : t.body.addEventListener("mouseover", f, !0), t.body.addEventListener("click", g, !0), !e) {
			var n, r, o, s, a = t.body.getElementsByTagName("script");
			for (i = 0, j = a.length; i < j; i++)(n = a[i]).hasAttribute("data-no-instant") || (r = t.createElement("script"), n.src && (r.src = n.src), n.innerHTML && (r.innerHTML = n.innerHTML), o = n.parentNode, s = n.nextSibling, o.removeChild(n), o.insertBefore(r, s))
		}
	}

	function w(t) {
		!L && "display" in _ && +new Date - (_.start + _.display) < 100 || (E && (clearTimeout(E), E = !1), t || (t = T), R && (t == q || F) || (R = !0, F = !1, q = t, U = !1, D = !1, _ = {
			start: +new Date
		}, c("fetch"), S.open("GET", t), S.send()))
	}

	function b(t) {
		if ("display" in _ || (_.display = +new Date - _.start), E || !R) return E && q && q != t ? void(e.href = t) : (w(t), I.start(0, !0), c("wait"), void(F = !0));
		if (F) e.href = t;
		else if (D) e.href = q;
		else {
			if (!U) return I.start(0, !0), c("wait"), void(F = !0);
			N[k].scrollY = pageYOffset, l(), u($, U, q)
		}
	}
	var k, T, E, C, S, x, L, M, A = navigator.userAgent,
		O = A.indexOf(" CriOS/") > -1,
		P = "createTouch" in t,
		N = {},
		q = !1,
		$ = !1,
		D = !1,
		U = !1,
		_ = {},
		R = !1,
		F = !1,
		H = [],
		Y = {
			fetch: [],
			receive: [],
			wait: [],
			change: []
		},
		I = function () {
			function e(e, o) {
				l = e, t.getElementById(a.id) && t.body.removeChild(a), a.style.opacity = "1", t.getElementById(a.id) && t.body.removeChild(a), i(), o && setTimeout(n, 0), clearTimeout(d), d = setTimeout(r, 500)
			}

			function n() {
				l = 10, i()
			}

			function r() {
				(l += 1 + 2 * Math.random()) >= 98 ? l = 98 : d = setTimeout(r, 500), i()
			}

			function i() {
				c.style[u] = "translate(" + l + "%)", t.getElementById(a.id) || t.body.appendChild(a)
			}

			function o() {
				if (t.getElementById(a.id)) return clearTimeout(d), l = 100, i(), void(a.style.opacity = "0");
				e(100 == l ? 0 : l), setTimeout(o, 0)
			}

			function s() {
				a.style.left = pageXOffset + "px", a.style.width = innerWidth + "px", a.style.top = pageYOffset + "px";
				var t = "orientation" in window && 90 == Math.abs(orientation),
					e = innerWidth / screen[t ? "height" : "width"] * 2;
				a.style[u] = "scaleY(" + e + ")"
			}
			var a, c, u, l, d;
			return {
				init: function () {
					(a = t.createElement("div")).id = "instantclick", (c = t.createElement("div")).id = "instantclick-bar", c.className = "instantclick-bar", a.appendChild(c);
					var e = ["Webkit", "Moz", "O"];
					if (!((u = "transform") in c.style))
						for (r = 0; r < 3; r++) e[r] + "Transform" in c.style && (u = e[r] + "Transform");
					var n = "transition";
					if (!(n in c.style))
						for (var r = 0; r < 3; r++) e[r] + "Transition" in c.style && (n = "-" + e[r].toLowerCase() + "-" + n);
					var i = t.createElement("style");
					i.innerHTML = "#instantclick{position:" + (P ? "absolute" : "fixed") + ";top:0;left:0;width:100%;pointer-events:none;z-index:2147483647;" + n + ":opacity .25s .1s}.instantclick-bar{background:#29d;width:100%;margin-left:-100%;height:2px;" + n + ":all .25s}", t.head.appendChild(i), P && (s(), addEventListener("resize", s), addEventListener("scroll", s))
				},
				start: e,
				done: o
			}
		}(),
		W = "pushState" in history && (!A.match("Android") || A.match("Chrome/")) && "file:" != e.protocol;
	return {
		supported: W,
		init: function () {
			if (!k)
				if (W) {
					for (a = arguments.length - 1; a >= 0; a--) {
						var r = arguments[a];
						!0 === r ? x = !0 : "mousedown" == r ? L = !0 : "number" == typeof r && (M = r)
					}
					k = n(e.href), N[k] = {
						body: t.body,
						title: t.title,
						scrollY: pageYOffset
					};
					for (var i, o, s = t.head.children, a = s.length - 1; a >= 0; a--)(i = s[a]).hasAttribute("data-instant-track") && (o = i.getAttribute("href") || i.getAttribute("src") || i.innerHTML, H.push(o));
					(S = new XMLHttpRequest).addEventListener("readystatechange", v), y(!0), I.init(), c("change", !0), addEventListener("popstate", function () {
						var t = n(e.href);
						t != k && (t in N ? (N[k].scrollY = pageYOffset, k = t, u(N[t].title, N[t].body, !1, N[t].scrollY)) : e.href = e.href)
					})
				} else c("change", !0)
		},
		on: function (t, e) {
			Y[t].push(e)
		}
	}
}(document, location);
(function () {
	"use strict";
	$(function () {
		return InstantClick.init(), Uno.is("device", "desktop") ? $("a").not('[href*="mailto:"]').click(function () {
			if (-1 === this.href.indexOf(location.hostname)) return window.open($(this).attr("href")), !1
		}) : FastClick.attach(Uno.app), (Uno.is("page", "home") || Uno.is("page", "paged") || Uno.is("page", "tag")) && Uno.timeAgo("#posts-list time"), Uno.is("page", "post") && (Uno.timeAgo(".post.meta > time"), $("main").readingTime({
			readingTimeTarget: ".post.reading-time > span"
		}), Uno.linkify($("#post-content").children("h1, h2, h3, h4, h5, h6")), $(".content").fitVids()), Uno.is("page", "error") && $("#panic-button").click(function () {
			var t;
			return (t = document.createElement("script")).setAttribute("src", "https://nthitz.github.io/turndownforwhatjs/tdfw.js"), document.body.appendChild(t)
		}), $("#search-input").keyup(function (t) {
			return $("#search-form").attr("action", Uno.search.url + "+" + encodeURIComponent(t.target.value))
		})
	})
}).call(this),
function () {
	var t, e, n, r, i, o, s, a, c, u, l, d, h, f, p, g, m, v, y, w, b, k, T, E, C, S, x, L, M, A, O, P, N, q, $, D, U, _, R, j, F, H, Y, I, W, X, B, z, G, K = [].slice,
		V = {}.hasOwnProperty,
		J = function (t, e) {
			function n() {
				this.constructor = t
			}
			for (var r in e) V.call(e, r) && (t[r] = e[r]);
			return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
		},
		Q = [].indexOf || function (t) {
			for (var e = 0, n = this.length; n > e; e++)
				if (e in this && this[e] === t) return e;
			return -1
		};
	for (b = {
		catchupTime: 100,
		initialRate: .03,
		minTime: 250,
		ghostTime: 100,
		maxProgressPerFrame: 20,
		easeFactor: 1.25,
		startOnPageLoad: !0,
		restartOnPushState: !0,
		restartOnRequestAfter: 500,
		target: "body",
		elements: {
			checkInterval: 100,
			selectors: ["body"]
		},
		eventLag: {
			minSamples: 10,
			sampleCount: 3,
			lagThreshold: 3
		},
		ajax: {
			trackMethods: ["GET"],
			trackWebSockets: !0,
			ignoreURLs: []
		}
	}, M = function () {
		var t;
		return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date
	}, O = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, w = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == O && (O = function (t) {
		return setTimeout(t, 50)
	}, w = function (t) {
		return clearTimeout(t)
	}), N = function (t) {
		var e, n;
		return e = M(), (n = function () {
			var r;
			return (r = M() - e) >= 33 ? (e = M(), t(r, function () {
				return O(n)
			})) : setTimeout(n, 33 - r)
		})()
	}, P = function () {
		var t, e, n;
		return n = arguments[0], e = arguments[1], t = 3 <= arguments.length ? K.call(arguments, 2) : [], "function" == typeof n[e] ? n[e].apply(n, t) : n[e]
	}, k = function () {
		var t, e, n, r, i, o, s;
		for (e = arguments[0], o = 0, s = (r = 2 <= arguments.length ? K.call(arguments, 1) : []).length; s > o; o++)
			if (n = r[o])
				for (t in n) V.call(n, t) && (i = n[t], null != e[t] && "object" == typeof e[t] && null != i && "object" == typeof i ? k(e[t], i) : e[t] = i);
		return e
	}, m = function (t) {
		var e, n, r, i, o;
		for (n = e = 0, i = 0, o = t.length; o > i; i++) r = t[i], n += Math.abs(r), e++;
		return n / e
	}, E = function (t, e) {
		var n, r, i;
		if (null == t && (t = "options"), null == e && (e = !0), i = document.querySelector("[data-pace-" + t + "]")) {
			if (n = i.getAttribute("data-pace-" + t), !e) return n;
			try {
				return JSON.parse(n)
			} catch (t) {
				return r = t, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", r) : void 0
			}
		}
	}, s = function () {
		function t() {}
		return t.prototype.on = function (t, e, n, r) {
			var i;
			return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (i = this.bindings)[t] && (i[t] = []), this.bindings[t].push({
				handler: e,
				ctx: n,
				once: r
			})
		}, t.prototype.once = function (t, e, n) {
			return this.on(t, e, n, !0)
		}, t.prototype.off = function (t, e) {
			var n, r, i;
			if (null != (null != (r = this.bindings) ? r[t] : void 0)) {
				if (null == e) return delete this.bindings[t];
				for (n = 0, i = []; n < this.bindings[t].length;) i.push(this.bindings[t][n].handler === e ? this.bindings[t].splice(n, 1) : n++);
				return i
			}
		}, t.prototype.trigger = function () {
			var t, e, n, r, i, o, s, a, c;
			if (n = arguments[0], t = 2 <= arguments.length ? K.call(arguments, 1) : [], null != (s = this.bindings) ? s[n] : void 0) {
				for (i = 0, c = []; i < this.bindings[n].length;) a = this.bindings[n][i], r = a.handler, e = a.ctx, o = a.once, r.apply(null != e ? e : this, t), c.push(o ? this.bindings[n].splice(i, 1) : i++);
				return c
			}
		}, t
	}(), u = window.Pace || {}, window.Pace = u, k(u, s.prototype), A = u.options = k({}, b, window.paceOptions, E()), Y = 0, W = (B = ["ajax", "document", "eventLag", "elements"]).length; W > Y; Y++) U = B[Y], !0 === A[U] && (A[U] = b[U]);
	c = function (t) {
		function e() {
			return z = e.__super__.constructor.apply(this, arguments)
		}
		return J(e, t), e
	}(Error), e = function () {
		function t() {
			this.progress = 0
		}
		return t.prototype.getElement = function () {
			var t;
			if (null == this.el) {
				if (!(t = document.querySelector(A.target))) throw new c;
				this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el)
			}
			return this.el
		}, t.prototype.finish = function () {
			var t;
			return t = this.getElement(), t.className = t.className.replace("pace-active", ""), t.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
		}, t.prototype.update = function (t) {
			return this.progress = t, this.render()
		}, t.prototype.destroy = function () {
			try {
				this.getElement().parentNode.removeChild(this.getElement())
			} catch (t) {
				c = t
			}
			return this.el = void 0
		}, t.prototype.render = function () {
			var t, e, n, r, i, o, s;
			if (null == document.querySelector(A.target)) return !1;
			for (t = this.getElement(), r = "translate3d(" + this.progress + "%, 0, 0)", i = 0, o = (s = ["webkitTransform", "msTransform", "transform"]).length; o > i; i++) e = s[i], t.children[0].style[e] = r;
			return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"), this.progress >= 100 ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + n)), this.lastRenderedProgress = this.progress
		}, t.prototype.done = function () {
			return this.progress >= 100
		}, t
	}(), a = function () {
		function t() {
			this.bindings = {}
		}
		return t.prototype.trigger = function (t, e) {
			var n, r, i, o, s;
			if (null != this.bindings[t]) {
				for (s = [], r = 0, i = (o = this.bindings[t]).length; i > r; r++) n = o[r], s.push(n.call(this, e));
				return s
			}
		}, t.prototype.on = function (t, e) {
			var n;
			return null == (n = this.bindings)[t] && (n[t] = []), this.bindings[t].push(e)
		}, t
	}(), H = window.XMLHttpRequest, F = window.XDomainRequest, j = window.WebSocket, T = function (t, e) {
		var n, r;
		r = [];
		for (n in e.prototype) try {
			r.push(null == t[n] && "function" != typeof e[n] ? "function" == typeof Object.defineProperty ? Object.defineProperty(t, n, {
				get: function () {
					return e.prototype[n]
				},
				configurable: !0,
				enumerable: !0
			}) : t[n] = e.prototype[n] : void 0)
		} catch (t) {
			t
		}
		return r
	}, x = [], u.ignore = function () {
		var t, e, n;
		return e = arguments[0], t = 2 <= arguments.length ? K.call(arguments, 1) : [], x.unshift("ignore"), n = e.apply(null, t), x.shift(), n
	}, u.track = function () {
		var t, e, n;
		return e = arguments[0], t = 2 <= arguments.length ? K.call(arguments, 1) : [], x.unshift("track"), n = e.apply(null, t), x.shift(), n
	}, D = function (t) {
		var e;
		if (null == t && (t = "GET"), "track" === x[0]) return "force";
		if (!x.length && A.ajax) {
			if ("socket" === t && A.ajax.trackWebSockets) return !0;
			if (e = t.toUpperCase(), Q.call(A.ajax.trackMethods, e) >= 0) return !0
		}
		return !1
	}, l = function (t) {
		function e() {
			var t, n = this;
			e.__super__.constructor.apply(this, arguments), t = function (t) {
				var e;
				return e = t.open, t.open = function (r, i) {
					return D(r) && n.trigger("request", {
						type: r,
						url: i,
						request: t
					}), e.apply(t, arguments)
				}
			}, window.XMLHttpRequest = function (e) {
				var n;
				return n = new H(e), t(n), n
			};
			try {
				T(window.XMLHttpRequest, H)
			} catch (t) {}
			if (null != F) {
				window.XDomainRequest = function () {
					var e;
					return e = new F, t(e), e
				};
				try {
					T(window.XDomainRequest, F)
				} catch (t) {}
			}
			if (null != j && A.ajax.trackWebSockets) {
				window.WebSocket = function (t, e) {
					var r;
					return r = null != e ? new j(t, e) : new j(t), D("socket") && n.trigger("request", {
						type: "socket",
						url: t,
						protocols: e,
						request: r
					}), r
				};
				try {
					T(window.WebSocket, j)
				} catch (t) {}
			}
		}
		return J(e, a), e
	}(), I = null, $ = function (t) {
		var e, n, r, i;
		for (n = 0, r = (i = A.ajax.ignoreURLs).length; r > n; n++)
			if ("string" == typeof (e = i[n])) {
				if (-1 !== t.indexOf(e)) return !0
			} else if (e.test(t)) return !0;
		return !1
	}, (C = function () {
		return null == I && (I = new l), I
	})().on("request", function (e) {
		var n, r, i, o, s;
		return o = e.type, i = e.request, s = e.url, $(s) ? void 0 : u.running || !1 === A.restartOnRequestAfter && "force" !== D(o) ? void 0 : (r = arguments, "boolean" == typeof (n = A.restartOnRequestAfter || 0) && (n = 0), setTimeout(function () {
			var e, n, s, a, c;
			if ("socket" === o ? i.readyState < 2 : 0 < (s = i.readyState) && 4 > s) {
				for (u.restart(), c = [], e = 0, n = (a = u.sources).length; n > e; e++) {
					if ((U = a[e]) instanceof t) {
						U.watch.apply(U, r);
						break
					}
					c.push(void 0)
				}
				return c
			}
		}, n))
	}), t = function () {
		function t() {
			var t = this;
			this.elements = [], C().on("request", function () {
				return t.watch.apply(t, arguments)
			})
		}
		return t.prototype.watch = function (t) {
			var e, n, r, i;
			return r = t.type, e = t.request, i = t.url, $(i) ? void 0 : (n = "socket" === r ? new f(e) : new p(e), this.elements.push(n))
		}, t
	}(), p = function () {
		return function (t) {
			var e, n, r, i, o, s = this;
			if (this.progress = 0, null != window.ProgressEvent)
				for (t.addEventListener("progress", function (t) {
					return s.progress = t.lengthComputable ? 100 * t.loaded / t.total : s.progress + (100 - s.progress) / 2
				}, !1), o = ["load", "abort", "timeout", "error"], n = 0, r = o.length; r > n; n++) e = o[n], t.addEventListener(e, function () {
					return s.progress = 100
				}, !1);
			else i = t.onreadystatechange, t.onreadystatechange = function () {
				var e;
				return 0 === (e = t.readyState) || 4 === e ? s.progress = 100 : 3 === t.readyState && (s.progress = 50), "function" == typeof i ? i.apply(null, arguments) : void 0
			}
		}
	}(), f = function () {
		return function (t) {
			var e, n, r, i, o = this;
			for (this.progress = 0, n = 0, r = (i = ["error", "open"]).length; r > n; n++) e = i[n], t.addEventListener(e, function () {
				return o.progress = 100
			}, !1)
		}
	}(), r = function () {
		return function (t) {
			var e, n, r, o;
			for (null == t && (t = {}), this.elements = [], null == t.selectors && (t.selectors = []), n = 0, r = (o = t.selectors).length; r > n; n++) e = o[n], this.elements.push(new i(e))
		}
	}(), i = function () {
		function t(t) {
			this.selector = t, this.progress = 0, this.check()
		}
		return t.prototype.check = function () {
			var t = this;
			return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
				return t.check()
			}, A.elements.checkInterval)
		}, t.prototype.done = function () {
			return this.progress = 100
		}, t
	}(), n = function () {
		function t() {
			var t, e, n = this;
			this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function () {
				return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0
			}
		}
		return t.prototype.states = {
			loading: 0,
			interactive: 50,
			complete: 100
		}, t
	}(), o = function () {
		return function () {
			var t, e, n, r, i, o = this;
			this.progress = 0, t = 0, i = [], r = 0, n = M(), e = setInterval(function () {
				var s;
				return s = M() - n - 50, n = M(), i.push(s), i.length > A.eventLag.sampleCount && i.shift(), t = m(i), ++r >= A.eventLag.minSamples && t < A.eventLag.lagThreshold ? (o.progress = 100, clearInterval(e)) : o.progress = 3 / (t + 3) * 100
			}, 50)
		}
	}(), h = function () {
		function t(t) {
			this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = A.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = P(this.source, "progress"))
		}
		return t.prototype.tick = function (t, e) {
			var n;
			return null == e && (e = P(this.source, "progress")), e >= 100 && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / A.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), n = 1 - Math.pow(this.progress / 100, A.easeFactor), this.progress += n * this.rate * t, this.progress = Math.min(this.lastProgress + A.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
		}, t
	}(), _ = null, q = null, v = null, R = null, g = null, y = null, u.running = !1, S = function () {
		return A.restartOnPushState ? u.restart() : void 0
	}, null != window.history.pushState && (X = window.history.pushState, window.history.pushState = function () {
		return S(), X.apply(window.history, arguments)
	}), null != window.history.replaceState && (G = window.history.replaceState, window.history.replaceState = function () {
		return S(), G.apply(window.history, arguments)
	}), d = {
		ajax: t,
		elements: r,
		document: n,
		eventLag: o
	}, (L = function () {
		var t, n, r, i, o, s, a, c;
		for (u.sources = _ = [], n = 0, i = (s = ["ajax", "elements", "document", "eventLag"]).length; i > n; n++) t = s[n], !1 !== A[t] && _.push(new d[t](A[t]));
		for (r = 0, o = (c = null != (a = A.extraSources) ? a : []).length; o > r; r++) U = c[r], _.push(new U(A));
		return u.bar = v = new e, q = [], R = new h
	})(), u.stop = function () {
		return u.trigger("stop"), u.running = !1, v.destroy(), y = !0, null != g && ("function" == typeof w && w(g), g = null), L()
	}, u.restart = function () {
		return u.trigger("restart"), u.stop(), u.start()
	}, u.go = function () {
		var t;
		return u.running = !0, v.render(), t = M(), y = !1, g = N(function (e, n) {
			var r, i, o, s, a, c, l, d, f, p, g, m, w, b, k;
			for (100 - v.progress, i = p = 0, o = !0, c = g = 0, w = _.length; w > g; c = ++g)
				for (U = _[c], f = null != q[c] ? q[c] : q[c] = [], a = null != (k = U.elements) ? k : [U], l = m = 0, b = a.length; b > m; l = ++m) s = a[l], d = null != f[l] ? f[l] : f[l] = new h(s), o &= d.done, d.done || (i++, p += d.tick(e));
			return r = p / i, v.update(R.tick(e, r)), v.done() || o || y ? (v.update(100), u.trigger("done"), setTimeout(function () {
				return v.finish(), u.running = !1, u.trigger("hide")
			}, Math.max(A.ghostTime, Math.max(A.minTime - (M() - t), 0)))) : n()
		})
	}, u.start = function (t) {
		k(A, t), u.running = !0;
		try {
			v.render()
		} catch (t) {
			c = t
		}
		return document.querySelector(".pace") ? (u.trigger("start"), u.go()) : setTimeout(u.start, 50)
	}, "function" == typeof define && define.amd ? define(["pace"], function () {
		return u
	}) : "object" == typeof exports ? module.exports = u : A.startOnPageLoad && u.start()
}.call(this),
function (t) {
	t.fn.readingTime = function (e) {
		if (!this.length) return this;
		var n = {
				readingTimeTarget: ".eta",
				wordCountTarget: null,
				wordsPerMinute: 270,
				round: !0,
				lang: "en",
				remotePath: null,
				remoteTarget: null
			},
			r = this,
			i = t(this);
		r.settings = t.extend({}, n, e);
		var o = r.settings.readingTimeTarget,
			s = r.settings.wordCountTarget,
			a = r.settings.wordsPerMinute,
			c = r.settings.round,
			u = r.settings.lang,
			l = r.settings.remotePath,
			d = r.settings.remoteTarget;
		if ("fr" == u) var h = "Moins d'une minute",
			f = "min";
		else if ("de" == u) var h = "Weniger als eine Minute",
			f = "min";
		else if ("es" == u) var h = "Menos de un minuto",
			f = "min";
		else var h = "Less than a minute",
			f = "min";
		var p = function (t) {
			var e = t.split(" ").length,
				n = e / (a / 60),
				r = Math.round(n / 60),
				u = Math.round(n - 60 * r);
			if (!0 === c) r > 0 ? i.find(o).text(r + " " + f) : i.find(o).text(h);
			else {
				var l = r + ":" + u;
				i.find(o).text(l)
			}
			"" !== s && void 0 !== s && i.find(s).text(e)
		};
		i.each(function () {
			null != l && null != d ? t.get(l, function (e) {
				p(t(e).children().text())
			}) : p(i.text())
		})
	}
}(jQuery),
function () {
	"use strict";
	$(function () {
		var t, e;
		if (t = function () {
			return setTimeout(function () {
				return $(".cover").addClass("animated")
			}, 1e3)
		}, e = function (t) {
			return $("main, .cover, .links > li, html").toggleClass("expanded"), Uno.search.form(t.form)
		}, $("#menu-button").click(function () {
			return $(".cover, main, #menu-button, html").toggleClass("expanded")
		}), $(window.open_button + ", #avatar-link").click(function (t) {
			if (Uno.is("page", "home")) return t.preventDefault(), location.hash = "" === location.hash ? "#open" : "", Uno.is("device", "desktop") ? e({
				form: "toggle"
			}) : $("#menu-button").trigger("click")
		}), Uno.is("device", "desktop") && Uno.is("page", "home") && (t(), "#open" !== location.hash)) return e({
			form: "hide"
		})
	})
}.call(this);
