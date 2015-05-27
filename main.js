function init() {
 	var c = document.getElementById("retrovirus");
	var ctx = c.getContext("2d");
	ctx.font = "12pt Arial";
	ctx.fillText("Canvas!", 10, 50);
}

document.addEventListener("DOMContentLoaded", init, false);