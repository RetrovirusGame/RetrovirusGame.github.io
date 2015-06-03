function init() { // Main function
	// ========== VARIABLE INITIATION v ==========
	var c = document.getElementById("retrovirus"), // Access the canvas
		img = document.getElementById("img"), // Virus's image
		ctx = c.getContext("2d"), // 2D Canvas context
		height = window.innerHeight, // Shortcut to window.innerHeight
		width = window.innerWidth, // Shortcut to window.innerWidth
		centerH, // Center of the canvas's height
		centerW, // Center of the canvas's width
		cW, // Shortcut to the canvas's width
		cH, // Shortcut to the canvas's height
		gridH, // For accessing movement distance/grid height
		gridW // For accessing movement distance/grid width
 	
	// ========== VARIABLE INITIATION ^ ==========
 	
	// ========== GLOBAL FUNCTIONS v ==========

	function writeText(text) { // Text writing function
		ctx.textAlign = "center"
		ctx.font = "12pt ABeeZee"
		ctx.fillText(text, centerW, centerH)
	}
    
	// ========== GLOBAL FUNCTIONS ^ ==========
 	
 	// ========== CLASSES v ==========
 	
	var RetroVirus = function(x, y) { // Virus constructor
		this.x = x
		this.y = y
	}

	RetroVirus.prototype = { // Virus prototype functions
		move : function(newX, newY) {
			ctx.clearRect(0, 0, cW, cH)
			ctx.rect(0, 0, cW, cH) // Set the canvas background to black
			ctx.fillStyle = "black"
			ctx.fill()
			ctx.drawImage(img, newX, newY)
			return this.x * this.y
		}
	}
	
	var virus = new RetroVirus() // Create new virus with constructor
	
	// ========== CLASSES ^ ==========
    	
   	if (width > height) { // If in landscape mode
   	
   		// ========== CANVAS INITIATION v ==========
  
		c.width = width - 18
		c.height = height - 22
		cW = c.width
		cH = c.height
		centerW = cW / 2
		centerH = cH / 2
			
		ctx.rect(0, 0, cW, cH) // Set the canvas background to black
		ctx.fillStyle = "black"
		ctx.fill()
    	
		// ========== CANVAS INITIATION ^ ==========
    	
		// ========== SPECIAL FUNCTIONS v ==========

		function grid(countX) { // Sections where the virus will be
			var pos; // Position to start/end the line
			for (var i = countX - 1; i > 0; i--) {
				gridW = cW / countX
				pos = gridW * i
				ctx.moveTo(pos, 0)
				ctx.lineTo(pos, cH)
				ctx.stroke()
			}

			for (var i = countX - 1; i > 0; i--) {
				gridH = gridW // Ensure a square
				pos = gridH * i
				ctx.moveTo(0, pos)
				ctx.lineTo(cW, pos)
				ctx.stroke()
			}
		}

		// ========== SPECIAL FUNCTIONS ^ ==========

		grid(20) // 20 squares across
  	
	} else { // If in portrait mode
		ctx.textAlign = "center"
		ctx.font = "12pt ABeeZee"
		ctx.fillText("Please use landscape mode.", centerW, centerH)
	}
    
	virus.x = centerW // Set the virus's starting position
	virus.y = (centerH + gridH * 2) - gridH / 2 // To offset image for collision
	
	virus.move(virus.x, virus.y) // Render on load
	
	// ========== CRUCIAL FUNDEMENTALS v ==========
	
	window.addEventListener("keydown", function(event) { // Key listener
		switch (event.keyCode) {
			case 37: // Left
				if(virus.x < 0) {} // For edge collision
				else { // Print image at new position
					virus.move(virus.x - gridW, virus.y)
					virus.x -= gridW
				}
				break
 
			case 38: // Up             
				if(virus.y < 0) {}
				else {
					virus.move(virus.x, virus.y - gridH)
					virus.y -= gridH
				}
				break

			case 39: // Right       
				if(virus.x + gridW * 2 > cW) {}
				else {
					virus.move(virus.x + gridW, virus.y)
					virus.x += gridW
				}
				break

			case 40: // Down
				if(virus.y + gridH > cH) {}
				else {
					virus.move(virus.x, virus.y + gridH)
					virus.y += gridH
				}
				break
			}
	}, false)
	
	// ========== CRUCIAL FUNDEMENTALS ^ ==========
}

document.addEventListener("DOMContentLoaded", init, false) // Run when the DOM has loaded
