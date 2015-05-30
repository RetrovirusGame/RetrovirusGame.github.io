function init() { // Main function
    var c = document.getElementById("retrovirus"), // Acess the canvas
    	ctx = c.getContext("2d"), // 2D Canvas context
    	height = window.innerHeight, // Shortcut to window.innerHeight
    	width = window.innerWidth, // Shortcut to window.innerWidth
    	centerH, // Center of the canvas's height
    	centerW, // Center of the canvas's width
    	cW, // Shortcut to the canvas's width
    	cH, // Shortcut to the canvas's height
    	gridH, // For accessing movement distance/grid height
    	gridW; // For accessing movement distance/grid width
    	
    if (width > height) { // If in landscape mode
        c.width = width - 18;
        c.height = height - 22;
        cW = c.width;
        cH = c.height;
        centerW = cW / 2;
        centerH = cH / 2;

        ctx.rect(0, 0, cW, cH); // Set the canvas background to black
        ctx.fillStyle = "black";
        ctx.fill();

        function writeText(text) { // Text writing function
            ctx.textAlign = "center";
            ctx.font = "12pt ABeeZee";
            ctx.fillText(text, centerW, centerH);
        };

        function grid(square) { // Sections where the virus will be
            var pos; // Position to start/end the line
            for (var i = square - 1; i > 0; i--) {
                gridW = cW / square;
                pos = gridW * i;
            	// ctx.moveTo(pos, 0);
            	// ctx.lineTo(pos, cH);
				// ctx.stroke();
            }

            for (var i = square - 1; i > 0; i--) {
                gridH = gridW; // Ensure a square
                pos = gridH * i;
                // ctx.moveTo(0, pos);
                // ctx.lineTo(cW, pos);
                // ctx.stroke();
            }
        };
				
        grid(20); // 20 squares across
        
    } else { // If in portrait mode
        ctx.textAlign = "center";
        ctx.font = "12pt ABeeZee";
        ctx.fillText("Please use landscape mode.", centerW, centerH);
    }

    var RetroVirus = function(x, y) { // Virus constructor
		this.x = x;
		this.y = y;
	};

	RetroVirus.prototype = { // Virus prototype functions
			move: function(newX, newY) {
			ctx.moveTo(this.x, this.y);
			return this.x * this.y;
		}
	};

	var virus = new RetroVirus(); // Create new virus with constructor
    
	virus.x = centerW; // Set the virus's starting position
	virus.y = centerH - gridH / 2;
	
	window.addEventListener('keydown', function(event) { // Key listener
    	switch (event.keyCode) {
    		case 37: // Left
    			if(virus.x - gridW < 0) {} // For edge collision
    			else { // Create a line to new position
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

document.addEventListener("DOMContentLoaded", init, false); // Run when the DOM has loaded
