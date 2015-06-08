function init() { // Main function
	// ========== VARIABLE INITIATION v ==========
	var c = document.getElementById("retrovirus"), // Access the canvas
		vImg = document.getElementById("vImg"), // Virus's image
        	abImg1 = document.getElementById("abImg1"),
        	abImg2 = document.getElementById("abImg2"),
        	abImg3 = document.getElementById("abImg3"), // Antibodys are a little redundant, but i can't get around it
        	abImg4 = document.getElementById("abImg4"),
        	abImg5 = document.getElementById("abImg5"),
        	abCount = 5,
        	numbers = [], // Possible array fix
        	abImg = [], // Possible array fix
        abImg1 = document.getElementById("abImg1"),
        abImg2 = document.getElementById("abImg2"),
        abImg3 = document.getElementById("abImg3"),
        abImg4 = document.getElementById("abImg4"),
        abImg5 = document.getElementById("abImg5"),
		ctx = c.getContext("2d"), // 2D Canvas context
		height = window.innerHeight, // Shortcut to window.innerHeight
		width = window.innerWidth, // Shortcut to window.innerWidth
		centerH, // Center of the canvas's height
		centerW, // Center of the canvas's width
		cW, // Shortcut to the canvas's width
		cH, // Shortcut to the canvas's height
		gridH, // For accessing movement distance/grid height
		gridW // For accessing movement distance/grid width
			
		for (i = 0; i < abCount; i++) {
			var j = i + 1
			numbers.push[j.toString()]
			abImg[i + 1] = document.getElementById("abImg" + numbers[i])
		}
 	
	// ========== VARIABLE INITIATION ^ ==========
 	
	// ========== GLOBAL FUNCTIONS v =============

	function writeText(text) { // Text writing function
		ctx.textAlign = "center"
		ctx.font = "12pt ABeeZee"
		ctx.fillText(text, centerW, centerH)
	}
    
	// ========== GLOBAL FUNCTIONS ^ ==========
 	
 	// =============== CLASSES v ==============

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
			ctx.drawImage(vImg, newX, newY)
			for (i = 0; i < abCount; i++) {
				antibody[i + 1].render(i + 1)
			}
			return this.x * this.y
		}
	}

	var Antibody = function(x, y) {
		this.x = x
		this.y = y
	}
	
	var virus = new RetroVirus() // Create new virus with constructor
	var antibody = []
	for (i = 0; i < abCount; i++) {
		antibody[i + 1] = new Antibody()
	}
	
	// ========== CLASSES ^ ==========
    	
   	if (width > height) { // If in landscape mode
   	
   		// ========== SECOND VARIABLE INITIATION v ==========
  
		c.width = width - 18
		c.height = height - 22
		cW = c.width
		cH = c.height
		centerW = cW / 2
		centerH = cH / 2
    	
		// ========== SECOND VARIABLE INITIATION ^ ==========
    	
		// ========== SPECIAL FUNCTIONS v ==========

		function grid(countX) { // Sections where the virus will be
			var pos; // Position to start/end the line
			for (var i = countX - 1; i > 0; i--) {
				gridW = cW / countX
				pos = gridW * i
				ctx.moveTo(pos, 0)
				ctx.lineTo(pos, cH)
				// ctx.strokeStyle = "white"
				ctx.stroke()
			}

			for (var i = countX - 1; i > 0; i--) {
				gridH = gridW // Ensure a square
				pos = gridH * i
				ctx.moveTo(0, pos)
				ctx.lineTo(cW, pos)
				// ctx.strokeStyle = "white"
				ctx.stroke()
			}
		}

		// ========== SPECIAL FUNCTIONS ^ ==========

		grid(20) // 20 squares across
		
		virus.x = centerW // Set the virus's starting position
		virus.y = centerH // - gridH / 2 // To offset image for collision
		
		// We'll let this fly for now
		
		antibody[1].x = gridW * 3
		antibody[1].y = gridW * 6
		
		antibody[2].x = gridW * 15
		antibody[2].y = gridW * 4
		
		antibody[3].x = gridW * 7
		antibody[3].y = gridW * 5
		
		antibody[4].x = gridW * 9
		antibody[4].y = gridW * 2
		
		antibody[5].x = gridW * 8
		antibody[5].y = gridW * 9

		Antibody.prototype.move = function(newX, newY) {
			ctx.clearRect(0, 0, cW, cH)
			ctx.rect(0, 0, cW, cH) // Set the canvas background to black
			ctx.fillStyle = "black"
			ctx.fill()
			for(i = 0; i < abCount; i++) {
				ctx.drawImage(abImg[i + 1], newX, newY)
			}
			virus.render()
			return this.x * this.y 
		}
		
		Antibody.prototype.render = function(toRender) {
			ctx.drawImage(abImg[toRender], antibody[toRender].x, antibody[toRender].y)
			return abImg[toRender]
		}

		Virus.prototype.render = function() {
			ctx.drawImage(vImg, virus.x, virus.y)
			return vImg
		}
	
		ctx.rect(0, 0, cW, cH) // Set the canvas background to black
		ctx.fillStyle = "black"
		ctx.fill()
  	
	} else { // If in portrait mode
		ctx.textAlign = "center"
		ctx.font = "12pt ABeeZee"
		ctx.fillText("Please use landscape mode.", centerW, centerH)
	}
	
	// ========== CRUCIAL FUNDEMENTALS v ==========
	
	setInterval(function() {
		for(i = 0; i < abCount; i++) {
			if (antibody[i + 1].x - virus.x > 0 && antibody[i + 1].x - virus.x > antibody[i + 1].y - virus.y)  {
				antibody[i + 1].move(antibody[i + 1].x -= gridW, antibody[i + 1].y)
			}
		
			else if (antibody[i + 1].y - virus.y < 0 && antibody[i + 1].y - virus.y < antibody[i + 1].x - virus.x) {
				antibody[i + 1].move(antibody[i + 1].x, antibody[i + 1].y += gridW)
			}
			
			else if (antibody[i + 1].x - virus.x < 0 && antibody[i + 1].x - virus.x < antibody[i + 1].y - virus.y) {
				antibody[i + 1].move(antibody[i + 1].x += gridW, antibody[i + 1].y)
			}
			
			else if (antibody[i + 1].y - virus.y > 0 && antibody[i + 1].y - virus.y > antibody[i + 1].x - virus.x) {
				antibody[i + 1].move(antibody[i + 1].x, antibody[i + 1].y -= gridW)
			}
		}
	}, 500)

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
				if(virus.y - gridH  < 0) {}
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
				if(virus.y + gridH * 2 > cH) {}
				else {
					virus.move(virus.x, virus.y + gridH)
					virus.y += gridH
				}
				break
			}
	}, false)
	
	window.addEventListener("load", function () {
		virus.render()
		for(i = 0; i < abCount; i++) {
			antibody[i + 1].render(i + 1)
		}
	}, false)
	
	// ========== CRUCIAL FUNDEMENTALS ^ ==========
}

document.addEventListener("DOMContentLoaded", init, false) // Run when the DOM has loaded
