function init() {
    var c, ctx, centerH, centerW, gridH, gridW, height, width;
    c = document.getElementById("retrovirus");
    ctx = c.getContext("2d");
    height = window.innerHeight;
    width = window.innerWidth;
    if (window.innerWidth > window.innerHeight) {

        c.width = window.innerWidth - 18;
        c.height = window.innerHeight - 22;

        ctx.rect(0,0,c.width,c.height);
        ctx.fillStyle="black";
        ctx.fill();

        cW = c.width;
        cH = c.height;
        centerW = cW / 2;
        centerH = cH / 2;

        function writeText() {
            ctx.textAlign = "center";
            ctx.font = "12pt ABeeZee";
            ctx.fillText("Canvas!", centerW, centerH);
        };

        function grid(square) {
            var pos;
            for (var i = square - 1; i > 0; i--) {
                gridW = cW / square;
                pos = gridW * i;
            //    ctx.moveTo(pos, 0);
            //    ctx.lineTo(pos, cH);
			//	  ctx.stroke();
            }

            for (var i = square - 1; i > 0; i--) {
                gridH = gridW;
                pos = gridH * i;
                // ctx.moveTo(0, pos);
                // ctx.lineTo(cW, pos);
                // ctx.stroke();
            }
        };
				
        grid(20);
        // Grid for future helpfulness.
    } else {
        ctx.textAlign = "center";
        ctx.font = "12pt ABeeZee";
        ctx.fillText("Please use landscape mode.", c.width / 2, c.height / 2);
    }

    	var Virus = function(x, y) {
			this.x = x;
			this.y = y;
		};

		Virus.prototype = {
			move: function(newX, newY) {
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(newX, newY);
				ctx.strokeStyle = "white";
				ctx.stroke();
				return this;
			}
		};

		var blah = new Virus();
    
		var startX = centerW;
		var startY = centerH - gridH / 2;
		blah.x = startX;
		blah.y = startY;
		window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 37: // Left
            if(blah.x - gridW < 0) {}
            else {
            	ctx.moveTo(blah.x,blah.y);           // Draws line left
            	ctx.lineTo(blah.x-=gridW,blah.y);
            	ctx.strokeStyle = "white";
            	ctx.stroke();
        	}
        	break;
 
        case 38: // Up             
            if(blah.y < 0) {}
           	else {
           		ctx.moveTo(blah.x,blah.y);
            	ctx.lineTo(blah.x,blah.y-=gridW);
            	ctx.strokeStyle = "white";         // Draws line up
            	ctx.stroke();
           	}
            break;

        case 39: // Right       
        	if(blah.x + gridW + gridW > c.width) {}
        	else {
                ctx.moveTo(blah.x,blah.y);
            	ctx.lineTo(blah.x+=gridW,blah.y);
            	ctx.strokeStyle = "white";         // Draws line right
            	ctx.stroke();
        	}
            break;

        case 40: // Down
            if(blah.y + gridH > c.height) {}
            else {
            	ctx.moveTo(blah.x, blah.y);
            	ctx.lineTo(blah.x, blah.y += gridH);
            	ctx.strokeStyle = "white";
            	ctx.stroke();	
            }
            break;
					
      }      // switch
    }, false); // end of function
}

document.addEventListener("DOMContentLoaded", init, false);
