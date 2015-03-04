
	var ytcsi = {
		gt: function(n) {
			n = (n || '') + 'data_';
			return ytcsi[n] || (ytcsi[n] = {
				tick: {},
				span: {},
				info: {}
			});
		},
		tick: function(l, t, n) {
			ytcsi.gt(n).tick[l] = t || +new Date();
		},
		span: function(l, s, e, n) {
			ytcsi.gt(n).span[l] = (e ? e : +new Date()) - ytcsi.gt(n).tick[s];
		},
		setSpan: function(l, s, n) {
			ytcsi.gt(n).span[l] = s;
		},
		info: function(k, v, n) {
			ytcsi.gt(n).info[k] = v;
		},
		setStart: function(s, t, n) {
			ytcsi.info('yt_sts', s, n);
			ytcsi.tick('_start', t, n);
		}
	};
	(function(w, d) {
		ytcsi.perf = w.performance || w.mozPerformance || w.msPerformance || w.webkitPerformance;
		ytcsi.setStart('dhs', ytcsi.perf ? ytcsi.perf.timing.responseStart : null);
		var isPrerender = (d.visibilityState || d.webkitVisibilityState) == 'prerender';
		var vName = d.webkitVisibilityState ? 'webkitvisibilitychange' : 'visibilitychange';
		if (isPrerender) {
			ytcsi.info('prerender', 1);
			var startTick = function() {
				ytcsi.setStart('dhs');
				d.removeEventListener(vName, startTick);
			};
			d.addEventListener(vName, startTick, false);
		}
		if (d.addEventListener) {
			d.addEventListener(vName, function() {
				ytcsi.tick('vc');
			}, false);
		}
	})(window, document);
