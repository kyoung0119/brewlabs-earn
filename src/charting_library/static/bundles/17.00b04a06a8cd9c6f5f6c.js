(window.webpackJsonp = window.webpackJsonp || []).push([
  [17],
  {
    bR4N: function (t, e, a) {
      "use strict";
      var n,
        o = a("wmOI").ESC,
        s = a("0waE").guid,
        i = a("jAh7").getRootOverlapManager,
        p = function (t, e, n) {
          var l,
            c,
            r,
            u,
            d,
            h,
            f = ".popup-menu";
          (t = $(t)),
            ((n = n || {}).activeClass = n.activeClass || ""),
            (l = (n.event || "click") + f),
            n.hideEvent && (c = n.hideEvent + f),
            (u = r = function () {}),
            (d = {}),
            (h = function (l, h, v) {
              function m(e) {
                var a = $(e.target).parents().andSelf();
                a.is(w) || a.is(t) || a.is(".charts-popup-tab-headers, .charts-popup-itemheader") || u();
              }
              function g(t) {
                if (d.preventFirstProcessClick) d.preventFirstProcessClick = !1;
                else {
                  var e = $(t.target).parents().andSelf();
                  e.is(".charts-popup-tab-headers, .charts-popup-itemheader") ||
                    (n.notCloseOnButtons && e.is(".icon-delete")) ||
                    u();
                }
              }
              function b(t) {
                t.keyCode === o && u();
              }
              var C,
                w,
                y,
                T,
                x,
                D,
                _,
                k,
                S,
                M,
                A,
                I,
                N,
                L,
                E,
                O,
                W,
                P,
                R,
                z,
                B,
                F,
                G,
                H = s(),
                J = l.target.ownerDocument,
                U = J.defaultView,
                V = i(J),
                K = h || e;
              if (("function" == typeof K && (K = K()), $(this).hasClass("open") || $(this).hasClass("active")))
                return l.preventDefault(), u(), void (C = d.scrollTop);
              switch (
                ((u = function () {
                  (d.scrollTop = w.scrollTop()),
                    w.remove(),
                    V.removeWindow(H),
                    t.removeClass("active open " + n.activeClass),
                    t.data("popup-menu", null),
                    $(J).off("click", g),
                    $(J).off("mousedown", m),
                    Modernizr.mobiletouch && $(J).off("touchstart.chartgui", m),
                    $(J).off("selectstart." + f),
                    J.removeEventListener("keydown", b, !1),
                    (u = r),
                    n.onRemove && n.onRemove();
                }),
                t.addClass("active open " + n.activeClass),
                (w = $('<div class="charts-popup-list">')),
                n.addClass && w.addClass(n.addClass),
                n.zIndex && w.css("z-index", n.zIndex),
                (y = w),
                n.listInner && (y = $('<div class="list-inner">').appendTo(y)),
                n.listTable && (y = $('<div class="list-table">').appendTo(y)),
                $.each(K, function (e) {
                  !(function e(o, s, i) {
                    var l, c, r, u, d, h, f, v, m, g, b, C, y, T, x;
                    if (o instanceof p.TabGroup) {
                      if (!o.tabs || !o.tabs.length) return;
                      return 1 !== o.tabs.length || o.tabs[0].title
                        ? ((l = $('<div class="charts-popup-tab-group"></div>').appendTo(i)),
                          (c = $('<div class="charts-popup-tab-headers"></div>').appendTo(l)),
                          (r = null),
                          void $.each(o.tabs || [], function (t, a) {
                            var n, s;
                            a.items &&
                              a.items.length &&
                              ((n = $('<div class="charts-popup-tab"></div>').hide().appendTo(l)),
                              $.each(a.items, function () {
                                e(this, void 0, n);
                              }),
                              (s = $('<span class="charts-popup-tab-header">')
                                .append(
                                  $('<a href="javascript://" class="charts-popup-tab-header-label">').text(a.name)
                                )
                                .appendTo(c)).on("click", function (t) {
                                s.is(".active") ||
                                  (c.find(".charts-popup-tab-header.active").removeClass("active"),
                                  s.addClass("active"),
                                  l.find(".charts-popup-tab").hide(),
                                  n.show(),
                                  t && t.preventDefault(),
                                  "function" == typeof o.onChange && o.onChange.call(o, a.name));
                              }),
                              (r && !a.active) ||
                                ((r = s),
                                c.find(".charts-popup-tab-header.active").removeClass("active"),
                                s.addClass("active"),
                                l.find(".charts-popup-tab").hide(),
                                n.show()));
                          }))
                        : void $.each(o.tabs[0].items, function () {
                            e(this, void 0, i);
                          });
                    }
                    if (o instanceof p.Group)
                      return (
                        (u = $('<div class="charts-popup-group"></div>').appendTo(i)),
                        o.title &&
                          ((d = $('<div class="charts-popup-itemheader"></div>')
                            .text(o.title)
                            .prepend($('<span class="charts-popup-itemheader-icon"></span>'))),
                          o.collapsible &&
                            (u.addClass("charts-popup-group-collapsible"),
                            u.toggleClass("collapsed", o.collapsed),
                            d.on("click", function () {
                              u.toggleClass("collapsed"),
                                "function" == typeof o.onChange && o.onChange(u.hasClass("collapsed")),
                                w.height() === parseInt(w.css("max-height"))
                                  ? w.addClass("popup-menu-scroll-y")
                                  : w.height() < parseInt(w.css("max-height")) && w.removeClass("popup-menu-scroll-y");
                            })),
                          u.append(d)),
                        void $.each(o.items, function (t) {
                          e(this, 1, u);
                        })
                      );
                    if (o instanceof p.Header) i.append($('<div class="charts-popup-itemheader"></div>').text(o.title));
                    else {
                      if (o.separator) return (h = $('<span class="separator"></span>')), void i.append(h);
                      (h = $('<a class="item">')),
                        o.url && h.attr("href", o.url),
                        o.target && h.attr("target", o.target),
                        s || h.addClass("first"),
                        "function" == typeof o.active
                          ? o.active(o) && h.addClass("active")
                          : o.active && h.addClass("active"),
                        o.addClass && h.addClass(o.addClass),
                        o.addData && h.data(o.addData),
                        o.disabled && h.addClass("disabled"),
                        "function" == typeof o.action &&
                          ((f = o.action),
                          (v = function (t) {
                            $(t.target).parents().andSelf().is(T) ||
                              (f.apply(h, arguments),
                              !o.url && t && "function" == typeof t.preventDefault && t.preventDefault());
                          }),
                          n.upAction ? h.bind("mouseup", v) : h.bind("click", v)),
                        o.date
                          ? ((m = $('<span class="title"></span>').appendTo(h)),
                            $('<span class="date"></span>')
                              .text(o.date || "")
                              .appendTo(h))
                          : o.icon && !n.svg
                          ? ((g = $('<span class="icon"></span>').appendTo(h)).css(
                              "background-image",
                              o.icon.image || ""
                            ),
                            o.icon.offset &&
                              g.css(
                                "background-position",
                                "string" == typeof o.icon.offset
                                  ? o.icon.offset
                                  : o.icon.offset.x + "px " + o.icon.offset.y + "px"
                              ),
                            (m = $('<span class="title"></span>').appendTo(h)))
                          : !0 === n.svg && o.svg
                          ? (n.wrapIcon
                              ? h.append($('<span class="icon-wrap">').addClass(o.iconClass).append(o.svg))
                              : h.append(o.svg),
                            (m = $('<span class="title"></span>').appendTo(h)))
                          : o.iconClass
                          ? (h.append($('<span class="icon"></span>').addClass(o.iconClass)),
                            (m = $('<span class="title"></span>').appendTo(h)))
                          : (m = $('<span class="title-expanded"></span>').appendTo(h)),
                        o.html ? m.html(o.html) : m.text(TradingView.clean(o.title, !0) || ""),
                        (b = $('<span class="shortcut"></span>').appendTo(h)),
                        o.shortcut && b.text(o.shortcut.keys),
                        "function" == typeof o.deleteAction &&
                          ((C = o.deleteAction),
                          (y = o.deleteAction.title || $.t("Delete")),
                          (T = $('<span class="icon-delete">')).html(a("uo4K")),
                          T.attr("title", y),
                          T.on("click", function (t) {
                            C.apply(h, arguments), t.preventDefault();
                          }),
                          h.append(T)),
                        o.buttons instanceof Array &&
                          o.buttons.length &&
                          o.buttons.forEach(function (t) {
                            t.el instanceof $ || (t.el = $(t.el)),
                              t.el.appendTo(h),
                              t.handler &&
                                t.el.on("click", function (e) {
                                  t.handler.apply(h, arguments);
                                });
                          }),
                        void 0 !== o.counter &&
                          ("function" == typeof o.counter
                            ? $('<span class="counter"></span>').html(o.counter()).appendTo(h)
                            : ((x = o.counterBlue ? "blue" : ""),
                              $('<span class="counter"></span>')
                                .text(o.counter + "")
                                .addClass(x)
                                .appendTo(h))),
                        i.append(h),
                        t.data("popup-menu", i);
                    }
                  })(this, e, y);
                }),
                c || (d.preventFirstProcessClick = !0),
                $(J).on("click", g),
                $(J).on("mousedown", m),
                J.addEventListener("keydown", b, !1),
                Modernizr.mobiletouch && $(J).on("touchstart.chartgui", m),
                n.upAction &&
                  $(J).on("selectstart.popup-menu", function () {
                    return !1;
                  }),
                w.appendTo(V.ensureWindow(H)),
                (T = J.documentElement.clientWidth),
                (x = J.documentElement.clientHeight),
                (D = t.outerWidth()),
                (_ = t.outerHeight()),
                (k = t.offset()),
                (C = $(U).scrollTop() || 0),
                (k.top -= C),
                (k.top = Math.round(k.top)),
                (k.left = Math.round(k.left)),
                (S = w.outerWidth()),
                (M = w.outerHeight()),
                (A = void 0 !== n.viewportSpacing ? n.viewportSpacing : 10),
                (I = n.popupSpacing ? ~~n.popupSpacing : 1),
                (N = n.popupDrift ? ~~n.popupDrift : 0),
                (L = M - w.height()),
                (E = "down"),
                n.direction && (E = "function" == typeof n.direction ? n.direction() : n.direction),
                (O = !!n.reverse),
                "down" === E
                  ? ((W = x - k.top - _ - I - A - L),
                    (P = k.top - I - A - L),
                    W < Math.max(M || 0, 100) && P > W && (E = "up"))
                  : "right" === E &&
                    ((R = T - k.left - D - I - A - L),
                    (z = k.left - I - A - L),
                    R < Math.max(S || 0, 100) && z > R && (E = "left")),
                E)
              ) {
                case "down":
                case "up":
                  "down" === E
                    ? w.css("top", k.top + _ + I + "px")
                    : w.css("bottom", x - k.top + I + "px").css("top", "auto"),
                    O
                      ? w.css("left", Math.max(k.left + N + D - S, A) + "px").css("right", "auto")
                      : w.css("left", k.left + N + "px").css("right", "auto");
                  break;
                case "right":
                case "left":
                  (I = Math.max(I, 4)),
                    "right" === E
                      ? w.css("left", Math.floor(k.left + D + I) + "px").css("right", "auto")
                      : w.css("left", Math.floor(Math.max(k.left - S - I, A)) + "px").css("right", "auto"),
                    O
                      ? w.css("top", Math.floor(Math.max(k.top + N + _ - M, A)) + "px")
                      : w.css("top", Math.floor(k.top + N) + "px");
              }
              w.show(),
                (B = k.top),
                "up" === E || ({ left: 1, right: 1 }[E] && O)
                  ? "up" !== E
                    ? (B += _)
                    : (B -= _ + I + L + A)
                  : (B = x - B - _ - 2 * I - L),
                w.height() > B && w.addClass("popup-menu-scroll-y"),
                w.css("max-height", B + "px"),
                n.careRightBorder &&
                  ((F = T + $(U).scrollLeft()),
                  parseInt(w.css("left")) + w.width() + A > F &&
                    w.css("left", F - w.width() - A + "px").css("right", "auto")),
                n.careBottomBorder &&
                  parseInt(w.css("top")) + w.height() + A > x + C &&
                  w.css("top", x - w.height() - A + C + "px"),
                (G = w.offset()),
                w.css({ position: "fixed", left: G.left - $(J).scrollLeft(), right: "auto" }),
                w[0].scrollHeight > w.height() && w.addClass("popup-with-scroll"),
                l && l.preventDefault();
            }),
            l && t.bind(l, h),
            c &&
              t.bind(c, function () {
                u();
              }),
            n.runOpened && h();
        };
      (p.TabGroup = function t(e) {
        if (!(this instanceof t)) return new t(e);
        (e = e || {}), (this.tabs = []), "function" == typeof e.onChange && (this.onChange = e.onChange);
      }),
        (p.TabGroup.prototype.appendTab = function (t, e, a) {
          if ((null == t ? (t = "") : (t += ""), e || (e = []), a || (a = {}), !Array.isArray(e)))
            throw new TypeError("items must be an array");
          return this.tabs.push({ name: t, items: e, active: !!a.active }), e;
        }),
        (p.Header = function t(e) {
          if (!(this instanceof t)) return new t(e);
          this.title = e;
        }),
        (p.Group = function t(e) {
          if (!(this instanceof t)) return new t(e);
          (e = e || {}),
            (this.items = []),
            (this.title = null == e.title ? "" : e.title + ""),
            (this.collapsible = !!e.collapsible),
            (this.collapsed = !!e.collapsed),
            "function" == typeof e.onChange && (this.onChange = e.onChange);
        }),
        (p.Group.prototype.push = function () {
          this.items.push.apply(this.items, arguments);
        }),
        (e.bindPopupMenu = p),
        (n = function (t) {
          (t = $(t)).unbind(".popup-menu"), t.removeData("popup-menu");
        }),
        (e.unbindPopupMenu = n);
    },
    guTw: function (t, e, a) {
      "use strict";
      (function (e) {
        function n(t, a, n) {
          var o = { saveAsText: $.t("Save As..."), applyDefaultText: $.t("Apply Defaults") };
          (this._toolName = t),
            (this._applyTemplate = a),
            (this._options = $.extend(o, n || {})),
            (this._list = []),
            e.enabled("charting_library_base") || (this.templatesDeferred = this.loadData());
        }
        var o = a("bR4N").bindPopupMenu,
          s = a("UJLt").SaveRenameDialog,
          i = a("hkLy").InputField,
          p = a("oNDq").createConfirmDialog,
          l = a("uOxu").getLogger("Chart.LineToolTemplatesList");
        (n._cache = {}),
          (n.prototype.getData = function () {
            return this._list;
          }),
          (n.prototype.loadData = function () {
            var t = this;
            return this._toolName in n._cache
              ? ((this._list = n._cache[this._toolName]), $.Deferred().resolve())
              : $.get("/drawing-templates/" + this._toolName + "/", function (e) {
                  (t._list = e), (n._cache[t._toolName] = e);
                }).error(function () {
                  l.logWarn("Failed to load drawing template: " + t._toolName);
                });
          }),
          (n.prototype.templatesLoaded = function () {
            return this.templatesDeferred;
          }),
          (n.prototype.invalidateToolCache = function () {
            delete n._cache[this._toolName];
          }),
          (n.prototype.createButton = function (t) {
            var e,
              a = this;
            return (
              (t = $.extend({}, t, a._options)),
              (e = $("<a></span></a>")
                .addClass(t.buttonClass ? t.buttonClass : "_tv-button")
                .html(t.buttonInner ? t.buttonInner : $.t("Template") + '<span class="icon-dropdown">')),
              o(e, null, {
                event: "button-popup",
                hideEvent: "hide-popup",
                zIndex: t.popupZIndex,
                activeClass: t.popupActiveClass,
                direction: t.popupDirection,
              }),
              e.bind("click", function (e) {
                var n, o, s;
                e.stopPropagation(),
                  $(this).is("active") ||
                    ((n = []),
                    "function" == typeof t.getDataForSaveAs &&
                      ((o = function (e) {
                        var n = JSON.stringify(t.getDataForSaveAs());
                        a.saveTemplate(e, n);
                      }),
                      n.push({ title: t.saveAsText, action: a.showSaveDialog.bind(a, o), addClass: "special" })),
                    "function" == typeof t.defaultsCallback &&
                      n.push({ title: t.applyDefaultText, action: t.defaultsCallback, addClass: "special" }),
                    (s = []),
                    $.each(a._list, function (e, n) {
                      s.push({
                        title: n,
                        action: function () {
                          a.loadTemplate.call(a, n, t.loadTemplateCallback);
                        },
                        deleteAction: function () {
                          runOrSignIn(
                            function () {
                              var t = $.t("Do you really want to delete Drawing Template '{0}' ?").format(n);
                              p({ type: "modal", content: t }).then(function (t) {
                                t.on("action:yes", function (t) {
                                  a.removeTemplate.call(a, n), t.close();
                                }),
                                  t.open();
                              });
                            },
                            { source: "Delete line tool template" }
                          );
                        },
                      });
                    }),
                    s.length &&
                      (s.sort(function (t, e) {
                        return (t = t.title.toUpperCase()) === (e = e.title.toUpperCase()) ? 0 : t > e ? 1 : -1;
                      }),
                      n.push({ separator: !0 }),
                      (n = n.concat(s))),
                    $(this).trigger("button-popup", [n]));
              }),
              e
            );
          }),
          (n.prototype.loadTemplate = function (t, e) {
            var a = this;
            return $.get(
              "/drawing-template/" + this._toolName + "/?templateName=" + encodeURIComponent(t),
              function (t) {
                a._applyTemplate(JSON.parse(t.content)), e && e();
              }
            ).error(function (t) {
              l.logWarn(t.responseText);
            });
          }),
          (n.prototype.removeTemplate = function (t) {
            if (t) {
              $.post("/remove-drawing-template/", { name: t, tool: this._toolName }).error(function (t) {
                l.logWarn(t.responseText);
              }),
                this.invalidateToolCache(),
                (this._list = $.grep(this._list, function (e) {
                  return e !== t;
                }));
            }
          }),
          (n.prototype.saveTemplate = function (t, e) {
            var a,
              n = this;
            t &&
              e &&
              ((t = TradingView.clean(t)),
              (a = -1 !== $.inArray(t, n._list)),
              (function () {
                var o = { name: t, tool: n._toolName, content: e },
                  s = function () {
                    a || n._list.push(t);
                  };
                $.post("/save-drawing-template/", o, s).error(function (t) {
                  l.logWarn(t.responseText);
                }),
                  n.invalidateToolCache();
              })());
          }),
          (n.prototype.deleteAction = function (t) {
            var e = t,
              a = this;
            runOrSignIn(
              function () {
                var t = $.t(" Do you really want to delete Drawing Template '{0}' ?").format(e);
                p({ type: "modal", content: t }).then(function (t) {
                  t.on("action:yes", function (t) {
                    a.removeTemplate.call(a, e), t.close();
                  }),
                    t.open();
                });
              },
              { source: "Delete line tool template" }
            );
          }),
          (n.prototype.showSaveDialog = function (t) {
            var e = this,
              a = "text",
              n = function (t) {
                return TradingView.clean(t[a]);
              },
              o = new s({
                fields: [
                  new i({
                    name: a,
                    label: $.t("Template name") + ":",
                    maxLength: 64,
                    error: $.t("Please enter template name"),
                  }),
                ],
                title: $.t("Save Drawing Template As"),
                confirm: {
                  shouldShowDialog: function (t) {
                    return -1 !== e._list.indexOf(n(t));
                  },
                  getMessage: function (t) {
                    return $.t("Drawing Template '{0}' already exists. Do you really want to replace it?").format(n(t));
                  },
                },
              });
            runOrSignIn(
              function () {
                o.show().then(function (e) {
                  t(e[a]);
                });
              },
              { source: "Save line tool template", sourceMeta: "Chart" }
            );
          }),
          (t.exports = n);
      }.call(this, a("Kxc7")));
    },
    uo4K: function (t, e) {
      t.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="13" height="13"><path d="M5.182 6.596L1.293 2.707.586 2 2 .586l.707.707 3.889 3.889 3.889-3.889.707-.707L12.606 2l-.707.707L8.01 6.596l3.889 3.889.707.707-1.414 1.414-.707-.707L6.596 8.01l-3.889 3.889-.707.707-1.414-1.414.707-.707 3.889-3.889z"/></svg>';
    },
  },
]);
