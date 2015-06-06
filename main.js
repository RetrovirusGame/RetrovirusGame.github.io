function init() { // Main function
	// ========== VARIABLE INITIATION v ==========
	var c = document.getElementById("retrovirus"), // Access the canvas
		vImg = document.getElementById("vImg"), // Virus's image
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
            antibody1.render()
            antibody2.render()
            antibody3.render()
            antibody4.render()
            antibody5.render()
			return this.x * this.y
		}
	}

    var Antibody = function(x, y) {
        this.x = x
        this.y = y
    }
	
	var virus = new RetroVirus() // Create new virus with constructor
    var antibody1 = new Antibody()
    var antibody2 = new Antibody()
    var antibody3 = new Antibody()
    var antibody4 = new Antibody()
    var antibody5 = new Antibody()
	
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
		
        antibody1.x = gridW * 3
        antibody1.y = gridW * 6

        antibody2.x = gridW * 15
        antibody2.y = gridW * 4

        antibody3.x = gridW * 7
        antibody3.y = gridW * 5
        
        antibody4.x = gridW * 9
        antibody4.y = gridW * 2

        antibody5.x = gridW * 8
        antibody5.y = gridW * 9

        antibody1.move = function(newX, newY) {
            ctx.clearRect(0, 0, cW, cH)
            ctx.rect(0, 0, cW, cH) // Set the canvas background to black
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.drawImage(abImg1, newX, newY)
            virus.render()
            antibody2.render()
            antibody3.render()
            antibody4.render()
            antibody5.render()
            return this.x * this.y 
        }

        antibody2.move = function(newX, newY) {
            ctx.clearRect(0, 0, cW, cH)
            ctx.rect(0, 0, cW, cH) // Set the canvas background to black
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.drawImage(abImg2, newX, newY)
            virus.render()
            antibody1.render()
            antibody3.render()
            antibody4.render()
            antibody5.render()
            return this.x * this.y 
        }

        antibody3.move = function(newX, newY) {
            ctx.clearRect(0, 0, cW, cH)
            ctx.rect(0, 0, cW, cH) // Set the canvas background to black
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.drawImage(abImg3, newX, newY)
            virus.render()
            antibody1.render()
            antibody2.render()
            antibody4.render()
            antibody5.render()
            return this.x * this.y 
        }

        antibody4.move = function(newX, newY) {
            ctx.clearRect(0, 0, cW, cH)
            ctx.rect(0, 0, cW, cH) // Set the canvas background to black
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.drawImage(abImg4, newX, newY)
            virus.render()
            antibody1.render()
            antibody2.render()
            antibody3.render()
            antibody5.render()
            return this.x * this.y 
        }

        antibody5.move = function(newX, newY) {
            ctx.clearRect(0, 0, cW, cH)
            ctx.rect(0, 0, cW, cH) // Set the canvas background to black
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.drawImage(abImg5, newX, newY)
            virus.render()
            antibody1.render()
            antibody2.render()
            antibody3.render()
            antibody4.render()
            return this.x * this.y 
        }

        antibody1.render = function() {
            ctx.drawImage(abImg1, antibody1.x, antibody1.y)
            return abImg1
        }

        antibody2.render = function() {
            ctx.drawImage(abImg2, antibody2.x, antibody2.y)
            return abImg2
        }

        antibody3.render = function() {
            ctx.drawImage(abImg3, antibody3.x, antibody3.y)
            return abImg3
        }

        antibody4.render = function() {
            ctx.drawImage(abImg4, antibody4.x, antibody4.y)
            return abImg4
        }

        antibody5.render = function() {
            ctx.drawImage(abImg5, antibody5.x, antibody5.y)
            return abImg5
        }

		virus.render = function() {
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
            if (antibody1.x - virus.x > 0 && antibody1.x - virus.x > antibody1.y - virus.y)  {
                antibody1.move(antibody1.x -= gridW, antibody1.y)
            }

            else if (antibody1.y - virus.y < 0 && antibody1.y - virus.y < antibody1.x - virus.x) {
                antibody1.move(antibody1.x, antibody1.y += gridW)
            }

            else if (antibody1.x - virus.x < 0 && antibody1.x - virus.x < antibody1.y - virus.y) {
                antibody1.move(antibody1.x += gridW, antibody1.y)
            }

            else if (antibody1.y - virus.y > 0 && antibody1.y - virus.y > antibody1.x - virus.x) {
                antibody1.move(antibody1.x, antibody1.y -= gridW)
            }

    }, 500)

    setInterval(function() {
            if (antibody2.x - virus.x > 0 && antibody2.x - virus.x > antibody2.y - virus.y) {
                antibody2.move(antibody2.x -= gridW, antibody2.y)
            }

            else if (antibody2.y - virus.y < 0 && antibody2.y - virus.y < antibody2.x - virus.x) {
                antibody2.move(antibody2.x, antibody2.y += gridW)
            }

            else if (antibody2.x - virus.x < 0 && antibody2.x - virus.x < antibody2.y - virus.y) {
                antibody2.move(antibody2.x += gridW, antibody2.y)
            }

            else if (antibody2.y - virus.y > 0 && antibody2.y - virus.y > antibody2.x - virus.x) {
                antibody2.move(antibody2.x, antibody2.y -= gridW)
            }

    }, 500)

    setInterval(function() {
            if (antibody3.x - virus.x > 0 && antibody3.x - virus.x > antibody3.y - virus.y) {
                antibody3.move(antibody3.x -= gridW, antibody3.y)
            }

            else if (antibody3.y - virus.y < 0 && antibody3.y - virus.y < antibody3.x - virus.x) {
                antibody3.move(antibody3.x, antibody3.y += gridW)
            }

            else if (antibody3.x - virus.x < 0 && antibody3.x - virus.x < antibody3.y - virus.y) {
                antibody3.move(antibody3.x += gridW, antibody3.y)
            }

            else if (antibody3.y - virus.y > 0 && antibody3.y - virus.y > antibody3.x - virus.x) {
                antibody3.move(antibody3.x, antibody3.y -= gridW)
            }

    }, 500)

    setInterval(function() {
            if (antibody4.x - virus.x > 0 && antibody4.x - virus.x > antibody4.y - virus.y) {
                antibody4.move(antibody4.x -= gridW, antibody4.y)
            }

            else if (antibody4.y - virus.y < 0 && antibody4.y - virus.y < antibody4.x - virus.x) {
                antibody4.move(antibody4.x, antibody4.y += gridW)
            }

            else if (antibody4.x - virus.x < 0 && antibody4.x - virus.x < antibody4.y - virus.y) {
                antibody4.move(antibody4.x += gridW, antibody4.y)
            }

            else if (antibody4.y - virus.y > 0 && antibody4.y - virus.y > antibody4.x - virus.x) {
                antibody4.move(antibody4.x, antibody4.y -= gridW)
            }

    }, 500)

    setInterval(function() {
            if (antibody5.x - virus.x > 0 && antibody5.x - virus.x > antibody5.y - virus.y) {
                antibody5.move(antibody5.x -= gridW, antibody5.y)
            }

            else if (antibody5.y - virus.y < 0 && antibody5.y - virus.y < antibody5.x - virus.x) {
                antibody5.move(antibody5.x, antibody5.y += gridW)
            }

            else if (antibody5.x - virus.x < 0 && antibody5.x - virus.x < antibody5.y - virus.y) {
                antibody5.move(antibody5.x += gridW, antibody5.y)
            }

            else if (antibody5.y - virus.y > 0 && antibody5.y - virus.y > antibody5.x - virus.x) {
                antibody5.move(antibody5.x, antibody5.y -= gridW)
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
        antibody1.render()
        antibody2.render()
        antibody3.render()
        antibody4.render()
        antibody5.render()
    }, false)
	
	// ========== CRUCIAL FUNDEMENTALS ^ ==========
}

document.addEventListener("DOMContentLoaded", init, false) // Run when the DOM has loaded
