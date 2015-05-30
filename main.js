function init() {
    var c, ctx, centerH, centerW, gridH, gridW, height, width;
    c = document.getElementById("retrovirus");
    ctx = c.getContext("2d");
    height = window.innerHeight;
    width = window.innerWidth;
    if (width > height) {

        c.width = width - 18;
        c.height = height - 22;
        cW = c.width;
        cH = c.height;
        centerW = cW / 2;
        centerH = cH / 2;

        ctx.rect(0, 0, cW, cH);
        ctx.fillStyle = "black";
        ctx.fill();

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
            	// ctx.moveTo(pos, 0);
            	// ctx.lineTo(pos, cH);
				// ctx.stroke();
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
        ctx.fillText("Please use landscape mode.", centerW, centerH);
    }

    var RetroVirus = function(x, y) {
		this.x = x;
		this.y = y;
	};

	RetroVirus.prototype = {
			move: function(newX, newY) {
			ctx.moveTo(this.x, this.y);
			return this.x * this.y;
		}
	};

	var virus = new RetroVirus();
    
	virus.x = centerW;
	virus.y = centerH - gridH / 2;
	window.addEventListener('keydown', function(event) {
    	switch (event.keyCode) {
    		case 37: // Left
    			if(virus.x - gridW < 0) {}
    			else {
        			ctx.moveTo(virus.x, virus.y);
        			ctx.lineTo(virus.x -= gridW, virus.y);
        			ctx.strokeStyle = "white";
        			ctx.stroke();
    			}
    			break;
 
    		case 38: // Up             
       			if(virus.y < 0) {}
        		else {
           			ctx.moveTo(virus.x, virus.y);
            		ctx.lineTo(virus.x, virus.y -= gridH);
            		ctx.strokeStyle = "white";
        	   		ctx.stroke();
        		}
    			break;

        	case 39: // Right       
        		if(virus.x + gridW * 2 > cW) {}
       			else {
               		ctx.moveTo(virus.x, virus.y);
           			ctx.lineTo(virus.x += gridW, virus.y);
           			ctx.strokeStyle = "white";
           			ctx.stroke();
       			}
       			break;

       		case 40: // Down
           		if(virus.y + gridH > cH) {}
           		else {
           		ctx.moveTo(virus.x, virus.y);
            	ctx.lineTo(virus.x, virus.y += gridH);
            	ctx.strokeStyle = "white";
            	ctx.stroke();	
            	}
            	break;
    	}
    }, false);
}

document.addEventListener("DOMContentLoaded", init, false);
