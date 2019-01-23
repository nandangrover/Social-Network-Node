var scaleVal = 1;
function onResizeFn() {
	var shellWidth = 1000;
	var shellHeight = 750;
	var newShellHeight;
	var newShellWidth;
	var agent = navigator.userAgent.toLowerCase();
	var is_ipad = ((agent.indexOf('ipad') != -1));

	var actWid = Number($(window).width());
	var actHgt = Number($(window).height())
		if (actHgt < actWid) {
			newShellHeight = actHgt;
			var scale = Number(shellHeight / newShellHeight).toFixed(2);
			newShellWidth = (shellWidth / shellHeight) * newShellHeight;
			var _aleft = ($(window).width() / 2) - (Number(newShellWidth) / 2);
			if (_aleft < 0) {
				newShellWidth = actWid;
				scale = Number(shellWidth / newShellWidth).toFixed(2);
				newShellHeight = (shellHeight / shellWidth) * newShellWidth;
			}
			$('#shellFrame').css({
				"transform-origin": "left top",
				"-ms-transform-origin": "left top",
				"-webkit-transform-origin": "left top",

				"transform": "scale(" + (1 / scale) + "," + (1 / scale) + ")",
				"-ms-transform": "scale(" + (1 / scale) + "," + (1 / scale) + ")",
				"-webkit-transform": "scale(" + (1 / scale) + "," + (1 / scale) + ")"
			});
		} else {
			newShellWidth = actWid;
			var scale = Number(shellWidth / newShellWidth).toFixed(2);
			newShellHeight = (shellHeight / shellWidth) * newShellWidth;
			$('#shellFrame').css({
				"transform-origin": "left top",
				"-ms-transform-origin": "left top",
				"-webkit-transform-origin": "left top",

				"transform": "scale(" + (1 / scale) + "," + (1 / scale) + ")",
				"-ms-transform": "scale(" + (1 / scale) + "," + (1 / scale) + ")",
				"-webkit-transform": "scale(" + (1 / scale) + "," + (1 / scale) + ")"
			});
		}
		scaleVal = scale;
	var _left = ($(window).width() / 2) - (Number(newShellWidth) / 2);
	var _top = ($(window).height() / 2) - (Number(newShellHeight) / 2);
	$('#shellFrame').css("left", _left);
	$('#shellFrame').css("top", _top);
}

//$(document).ready(function(e) { onResizeFn(); $(window).resize(onResizeFn); });
