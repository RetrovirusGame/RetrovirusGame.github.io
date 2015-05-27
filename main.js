function init() {
 	var c, ctx, centerH, centerW, gridH, gridW, height, width;
 	c = document.getElementById("retrovirus");
	ctx = c.getContext("2d");
	height = window.innerHeight;
	width = window.innerWidth;

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	    c.width = window.innerWidth / 2
	    c.width = window.innerHeight / 3
	} else {
	    c.width = window.innerWidth / 2;
	    c.height = window.innerHeight / 2;
	}

	cW = c.width;
	cH = c.height;
	centerW = cW / 2;
	centerH = cH / 2;

	function writeText() {
		ctx.textAlign = "center";
		ctx.font = "12pt Arial";
		ctx.fillText("Canvas!", centerW, centerH);
	};

	function grid(width, height) {
		var pos;
		for(var i = width - 1; i > 0; i--) {
			gridW = cW / width;
			pos = gridW * i;
			ctx.moveTo(pos, 0);
			ctx.lineTo(pos, cH);
			ctx.stroke();
		}
		for(var i = height - 1; i > 0; i--) {
			gridH = cH / height;
			pos = gridH * i;
			ctx.moveTo(0, pos);
			ctx.lineTo(cW, pos);
			ctx.stroke();
		}
	};
	grid(5, 5);
	// Grid for future helpfulness. 
	writeText()
}

document.addEventListener("DOMContentLoaded", init, false);