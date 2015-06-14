function init() { // Main function
    
    ///////////////// VARIABLE INITIATION /////////////////
    
    var c = document.getElementById("retrovirus"), // Access the canvas
        numAnti = 5,                               // Number of Antibodies
        abImgArray = [numAnti],                    // Array of antibody images
        antiArray = [numAnti],                     // Array of antibodies
        ctx = c.getContext("2d"),                  // 2D Canvas context
        height = window.innerHeight,               // Shortcut to window.innerHeight
        width = window.innerWidth,                 // Shortcut to window.innerWidth
        centerH,                                   // Center of the canvas's height
        centerW,                                   // Center of the canvas's width
        cW,                                        // Shortcut to the canvas's width
        cH,                                        // Shortcut to the canvas's height
        gridH,                                     // For accessing movement distance/grid height
        gridW,                                     // For accessing movement distance/grid width
        gridCount = 20,
        counter = 0.
        yCount = 0
    
    c.width = width
    c.height = height
    cW = c.width
    cH = c.height
    centerW = cW / 2
    centerH = cH / 2
    
    ////////////////////// FUNCTIONS //////////////////////
    
    function writeText(text) { // Text writing function
        ctx.textAlign = "center"
        ctx.font = "12pt ABeeZee"
        ctx.fillStyle = "white"
        ctx.fillText(text, centerW, centerH)
    }
    
    function grid(countX) { // Sections where the virus will be
        var pos // Position to start/end the line
        for (var i = countX - 1 ; i > 0 ; i--) {
            gridW = Math.round(cW / countX)
            pos = gridW * i
            ctx.moveTo(pos, 0)
            ctx.lineTo(pos, cH)
            // ctx.strokeStyle = "white"
            ctx.stroke()
        }
        counter = 0
        for (var i = countX - 1 ; i > 0 ; i--) {
            gridH = gridW // Ensure a square
            pos = gridH * i
            ctx.moveTo(0, pos)
            ctx.lineTo(cW, pos)
            // ctx.strokeStyle = "white"
            ctx.stroke()
            counter += 1
            if (counter * gridH < c.height) { // So we can find the number of grid lengths up/down
                yCount += 1
            }
        }
    }
    yCount = yCount - 1
    grid(gridCount) // 20 squares across
    
    /////////////////////// CLASSES ///////////////////////
    
    var RetroVirus = function (x, y, img) { // Virus constructor
        this.x = x
        this.y = y
        this.img = img
        this.health = 20
    }
    
    RetroVirus.prototype = { // Virus prototype functions
        render: function (x, y) { // draws the virus where it already is, unless otherwise specified
            if (x === undefined) {
                x = this.x
            }
        
            if (y === undefined) {
                y = this.y
            }
        
            ctx.drawImage(this.img, x, y)
        },
        
        move: function (newX, newY) { // move virus to new location
            ctx.clearRect(0, 0, cW, cH)
            ctx.rect(0, 0, cW, cH) // Set the canvas background to black
            ctx.fillStyle = "black"
            ctx.fill()
            if (newX >= 1 && newY >= 1) {
                ctx.drawImage(this.img, newX, newY)
            } else if (newX < 1 && newY < 1) {
                newX = 1
                newY = 1
                ctx.drawImage(this.img, newX, newY)
            } else if (newX < 1) {
                newX = 1
                ctx.drawImage(this.img, newX, newY)
            } else if (newY < 1) {
                newY = 1
                ctx.drawImage(this.img, newX, newY)
            }
            for (var i in antiArray) antiArray[i].render()
            return this.x + ", " + this.y
        }
    }
    
    var Antibody = function (x, y, img) { //antibody constructor
        this.x = x
        this.y = y
        this.img = img
    }
    
    Antibody.prototype = {
        render: function (x, y) { // same as other
            if (x === undefined) {
                x = this.x
            }
        
            if (y === undefined) {
                y = this.y
            }
        
            ctx.drawImage(this.img, x + gridW / 2 - 4, y + gridH / 2 - 4) // The virus is 8x8, and 8 / 2 = 4
        },
        
        move: function (newX, newY) { // same as the other one
            ctx.clearRect(0, 0, cW, cH)
            ctx.rect(0, 0, cW, cH) // Set the canvas background to black
            ctx.fillStyle = "black"
            ctx.fill()
            this.x = newX
            this.y = newY
            virus.render()
            for (var i in antiArray) antiArray[i].render()
            return this.x * this.y
        },
        
        track: function (v) { // antibody AI
            if (this.x - v.x > 0 && this.x - v.x > this.y - v.y) {
                this.move(this.x -= gridW, this.y)
            } else if (this.y - v.y < 0 && this.y - v.y < this.x - v.x) {
                this.move(this.x, this.y += gridH)
            } else if (this.x - v.x < 0 && this.x - v.x < this.y - v.y) {
                this.move(this.x += gridW, this.y)
            } else if (this.y - v.y > 0 && this.y - v.y > this.x - v.x) {
                this.move(this.x, this.y -= gridH)
            } else if (this.x - v.x > 0 && this.y - v.y > 0 && this.x - v.x == this.y - v.y) {
                this.move(this.x -= gridW, this.y -= gridH)
            } else if (this.x - v.x < 0 && this.y - v.y < 0 && this.x - v.x == this.y - v.y) {
                this.move(this.x += gridW, this.y += gridH)
            } else if (this.x - v.x > 0 && this.y - v.y < 0 && this.x - v.x == this.y - v.y) {
                this.move(this.x -= gridW, this.y += gridH)
            } else if (this.x - v.x < 0 && this.y - v.y > 0 && this.x - v.x == this.y - v.y) {
                this.move(this.x += gridW, this.y -= gridH)
            }
        }
    }
    
    var virus = new RetroVirus() // Create new virus with constructor
    virus.img = document.getElementById("vImg")
    
    for (var i = 0 ; i < numAnti ; i++) { // fill antibody array
        antiArray[i] = new Antibody()
    }
    
    for (var i = 0 ; i < numAnti ; i++) { // fill image array
        abImgArray[i] = document.getElementById("abImg" + String(i))
    }
    
    for (var i = 0 ; i < numAnti ; i++) { // set image elements in antibody array
        antiArray[i].img = abImgArray[i]
    }
    
    virus.x = gridW * gridCount / 2 - gridW // Set the virus's starting position
    virus.y = gridH * 4 // To offset image for collision
    
    function getRandomY() {
        return Math.round(Math.random() * (yCount))
    }

    function getRandomX() {
        console.log(Math.round(Math.random() * (gridCount - 1)))
        return Math.round(Math.random() * (gridCount - 1))
    }

    for (var i = 0; i < numAnti; i++) {
        antiArray[i].x = gridW * getRandomX()
        if (antiArray[i].x == virus.x) {
            antiArray[i].x = gridW * getRandomX()
        }
        antiArray[i].y = gridH * getRandomY()
        if (antiArray[i].y == virus.y) {
            antiArray[i].y = gridH * getRandomY()
        }
        console.log(antiArray[i].x + ", " + antiArray[i].y)
    }
    
    ctx.rect(0, 0, cW, cH) // Set the canvas background to black
    ctx.fillStyle = "black"
    ctx.fill()
    
    /////////////////// EVENT LISTENERS ///////////////////
    
    setInterval(function () { // allow antibody to track the virus every 500 milliseconds
        for (var i = 0 ; i < numAnti ; i++) {
            if (antiArray[i].x == virus.x && antiArray[i].y == virus.y) { // Margin of error
                virus.health -= 1
                console.log(virus.health)
            } else {
                antiArray[i].track(virus)
            }
        }
    }, 500);
    
    window.addEventListener("keydown", function (event) { // Key listener | Moves virus in specified direction
        switch (event.keyCode) {
            case 37: // Left
                if (virus.x - gridW < 0) { return false } // For edge collision
                else { // Print image at new position
                    virus.move(virus.x - gridW, virus.y)
                    virus.x -= gridW
                    return 37 //Last key
                }
                break
                            
            case 65: // 'a'
                if (virus.x - gridW < 0) { return false } // For edge collision
                else { // Print image at new position
                    virus.move(virus.x - gridW, virus.y)
                    virus.x -= gridW
                    return 37 //Last key
                }
                break
                            
            case 38: // Up
                if (virus.y - gridH < 0) { return false }
                else {
                    virus.move(virus.x, virus.y - gridH)
                    virus.y -= gridH
                    return 38
                }
                break
            
            case 87: // 'w'
                if (virus.y - gridH < 0) { return false }
                else {
                    virus.move(virus.x, virus.y - gridH)
                    virus.y -= gridH
                    return 38
                }
                break
                            
            case 39: // Right
                if (virus.x + gridW * 2 > cW) { return false }
                else {
                    virus.move(virus.x + gridW, virus.y)
                    virus.x += gridW
                    return 39
                }
                break
            
            case 68: // 'd'
                if (virus.x + gridW * 2 > cW) { return false }
                else {
                    virus.move(virus.x + gridW, virus.y)
                    virus.x += gridW
                    return 39
                }
                break
                            
            case 40: // Down
                if (virus.y + gridH * 2 > cH) { return false }
                else {
                    virus.move(virus.x, virus.y + gridH)
                    virus.y += gridH
                    return 40
                }
                break
            
            case 83: // 's'
                if (virus.y + gridH * 2 > cH) { return false }
                else {
                    virus.move(virus.x, virus.y + gridH)
                    virus.y += gridH
                    return 40
                }
                break
        }
    }, false);
    
    window.addEventListener("load", function () { // runs when page loads, sets scene
        virus.render()
        for (var i in antiArray) antiArray[i].render()
    }, false);
    
    window.addEventListener('resize', function() {
        c.width = window.innerWidth
        c.height = window.innerHeight
    });
}

document.addEventListener("DOMContentLoaded", init, false) // Run when the DOM has loaded