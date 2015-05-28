function init() {
    var c, ctx, centerH, centerW, gridH, gridW, height, width;
    c = document.getElementById("retrovirus");
    ctx = c.getContext("2d");
    height = window.innerHeight;
    width = window.innerWidth;
    if (window.innerWidth > window.innerHeight) {

        c.width = window.innerWidth / 2;
        c.height = window.innerHeight / 2;

        cW = c.width;
        cH = c.height;
        centerW = cW / 2;
        centerH = cH / 2;

        function writeText() {
            ctx.textAlign = "center";
            ctx.font = "12pt ABeeZee";
            ctx.fillText("Canvas!", centerW, centerH);
        };

        function grid(width, height) {
            var pos;
            for (var i = width - 1; i > 0; i--) {
                gridW = cW / width;
                pos = gridW * i;
                ctx.moveTo(pos, 0);
                ctx.lineTo(pos, cH);
			          ctx.stroke();
            }
					
            for (var i = height - 1; i > 0; i--) {
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
    } else {
        ctx.textAlign = "center";
        ctx.font = "12pt ABeeZee";
        ctx.fillText("Please use landscape mode.", c.width / 2, c.height / 2);
    }
    
		var startX = 0;
		var startY = 0;
		window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 37: // Left
            ctx.moveTo(startX,startY);           // Draws line left
            ctx.lineTo(startX-=5,startY);
            ctx.stroke();
            break;
 
        case 38: // Up             
            ctx.moveTo(startX,startY);
            ctx.lineTo(startX,startY-=5);         // Draws line up
            ctx.stroke();
            break;

        case 39: // Right       
            ctx.moveTo(startX,startY);
            ctx.lineTo(startX+=5,startY);         // Draws line right
            ctx.stroke();
            break;

        case 40: // Down
            ctx.moveTo(startX,startY);
            ctx.lineTo(startX,startY+=5);         // Draws line down
            ctx.stroke();
            break;
					
      }      // switch
    }, false); // end of function
}

document.addEventListener("DOMContentLoaded", init, false);
