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
        counter = 0,
        yCount = 0,
        ab = [numAnti],
        lastKey,
        lastDir,
        end = false,
        lostText = "",
        speed = 150
    
    c.width = width
    c.height = height
    cW = c.width
    cH = c.height
    centerW = cW / 2
    centerH = cH / 2

    for (var i = 0; i < numAnti; i++) {
        ab[i] = document.createElement("img")
        ab[i].id = "abImg" + String(i)
        ab[i].src = "antibody.png"
        c.appendChild(ab[i])
    }
    
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
    yCount -= 1
    grid(Math.round(cW / (16 * 4))) // 20 squares across
    
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
        
            ctx.drawImage(this.img, x * gridW, y * gridH)
        },
        
        move: function (newX, newY) { // move virus to new location
            ctx.clearRect(0, 0, cW, cH)
            ctx.rect(0, 0, cW, cH) // Set the canvas background to black
            ctx.fillStyle = "black"
            ctx.fill()
            if (newX < 0) {
                newX = 0
            } 
            if (newY < 0) {
                newY = 0
            }
            if (newX > gridCount) {
                newX = gridCount
                console.log("nuuh")
            }
            if (newY > yCount) {
                newY = yCount
            }
            ctx.drawImage(this.img, newX * gridW, newY * gridH)
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
        
            ctx.drawImage(this.img, x * gridW + getRandom(gridW), y * gridH + getRandom(gridH)) // The virus is 8x8, and 8 / 2 = 4
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
                this.move(this.x -= 1, this.y)
                lastDir = "right"
            } else if (this.y - v.y < 0 && this.y - v.y < this.x - v.x) {
                this.move(this.x, this.y += 1)
                lastDir = "down"
            } else if (this.x - v.x < 0 && this.x - v.x < this.y - v.y) {
                this.move(this.x += 1, this.y)
                lastDir = "left"
            } else if (this.y - v.y > 0 && this.y - v.y > this.x - v.x) {
                this.move(this.x, this.y -= 1)
                lastDir = "up"
            } else if (this.x - v.x > 0 && this.y - v.y > 0 && this.x - v.x == this.y - v.y) {
                for (var i in antiArray) setTimeout(function () { antiArray[i].move(antiArray[i].x -= 1, antiArray[i].y); lastDir = "left" }, speed)
                this.move(this.x, this.y -= 1)
                lastDir = "up"
            } else if (this.x - v.x < 0 && this.y - v.y < 0 && this.x - v.x == this.y - v.y) {
                for (var i in antiArray) setTimeout(function () { antiArray[i].move(antiArray[i].x += 1, antiArray[i].y); lastDir = "right" }, speed)
                this.move(this.x, this.y += 1)
                lastDir = "down"
            } else if (this.x - v.x > 0 && this.y - v.y < 0 && this.x - v.x == this.y - v.y) {
                for (var i in antiArray) setTimeout(function () { antiArray[i].move(antiArray[i].x -= 1, antiArray[i].y); lastDir = "left" }, speed)
                this.move(this.x, this.y += 1)
                lastDir = "down"
            } else if (this.x - v.x < 0 && this.y - v.y > 0 && this.x - v.x == this.y - v.y) {
                for (var i in antiArray) setTimeout(function () { antiArray[i].move(antiArray[i].x += 1, antiArray[i].y); lastDir = "right" }, speed)
                this.move(this.x, this.y -= 1)
                lastDir = "up"
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
    
    virus.x = Math.round(gridCount / 2) // Set the virus's starting position
    virus.y = Math.round(yCount / 2) // To offset image for collision
    
    function getRandomRange(a, b) {
        return Math.round(Math.random * (b - a)) + a)
    }
    
    function getRandom(a) {
        return getRandomRange(0, a)   
    }
    
    function getRandomY() {
        return getRandom(yCount)
    }

    function getRandomX() {
        return getRandom(gridCount - 1)
    }

    for (var i = 0; i < numAnti; i++) {
        antiArray[i].x = getRandomX()
        if (antiArray[i].x == virus.x || antiArray[i].x + 1 == virus.x || antiArray[i].x - 1 == virus.x) {
            antiArray[i].x = getRandomX()
        }
        antiArray[i].y = getRandomY()
        if (antiArray[i].y == virus.y || antiArray[i].y + 1 == virus.y || antiArray[i].y - 1 == virus.y) {
            antiArray[i].y = getRandomY()
        }
    }
    
    /////////////////// EVENT LISTENERS ///////////////////
    
    setInterval(function () { // allow antibody to track the virus every 300 milliseconds
        for (var i = 0 ; i < numAnti ; i++) {
            if (antiArray[i].x == virus.x && antiArray[i].y == virus.y) {
                virus.health -= 1
                if (virus.health <= 0) {
                    virus.health = ""
                    end = true
                    ctx.textAlign = "center"
    				ctx.font = "12pt ABeeZee"
    				ctx.fillStyle = "white"
    				ctx.fillText(lostText, centerW, centerH)
                }
            } else {
                for (var j = 0; j < numAnti; j++) {
                    if (i != j) {
                        if (antiArray[i].x == antiArray[j].x) {
                            if (antiArray[i].y == antiArray[j].y) {
                                switch (lastDir) {
                                    case "up": antiArray[i].move(antiArray[i].x, antiArray[i].y += gridH); antiArray[j].move(antiArray[j].x, antiArray[j].y -= gridH); break
                                    case "down": antiArray[i].move(antiArray[i].x, antiArray[i].y -= gridH); antiArray[j].move(antiArray[j].x, antiArray[j].y += gridH); break
                                    case "left": antiArray[i].move(antiArray[i].x += gridW, antiArray[i].y); antiArray[j].move(antiArray[j].x -= gridW, antiArray[j].y); break
                                    case "right": antiArray[i].move(antiArray[i].x -= gridW, antiArray[i].y); antiArray[j].move(antiArray[j].x += gridW, antiArray[j].y); break
                                }
                            }
                        }
                    }
                }
                antiArray[i].track(virus)
            }
        }
    }, speed);

    setInterval(function () {
        ctx.textAlign = "center"
        ctx.font = "12pt ABeeZee"
        ctx.fillStyle = "white"
        ctx.fillText(virus.health, 20, 20)
        if (virus.health <= 0) {
            virus.health = ""
            end = true
            for (var i in antiArray) antiArray[i].x = 10000; antiArray[i].y = 10000
            virus.x = 10000
            virus.y = 10000
        }
    }, 1)

    var map = []
    onkeydown = onkeyup = function(e) {
        e = e || event
        map[e.keyCode] = e.type == 'keydown'
        var up, down, left, right
        if (map[38] || map[87]) {
            if (map[38] != map[87]) {
                up = true
            }
        }
        if (map[37] || map[65]) {
            if (map[37] != map[65]) {
                left = true
            }
        }
        if (map[40] || map[83]) {
            if (map[40] != map[83]) {
                down = true
            }
        }
        if (map[39] || map[68]) {
            if (map[39] != map[68]) {
                right = true
            }
        }
        if (left && up && !end) { // Left and Up
            if (virus.x - 1 < 0 || virus.y - 1 < 0) { return false } // For edge collision
            else { // Print image at new position
                virus.move(virus.x - 1, virus.y - 1)
                virus.x -= 1
                virus.y -= 1
                lastKey = "leftup" //Last key
            }
        }
        
        else if (right && up && !end) { // Right and Up
            if (virus.x +  2 > cW || virus.y - 1 < 0) { return false } // For edge collision
            else { // Print image at new position
                virus.move(virus.x + 1, virus.y - 1)
                virus.x += 1
                virus.y -= 1
                lastKey = "rightup" //Last key
            }
        }
        
        else if (left && down && !end) { // Left and Down
            if (virus.x - 1 < 0 || virus.y + 2 > cH) { return false } // For edge collision
            else { // Print image at new position
                virus.move(virus.x - 1, virus.y + 1)
                virus.x -= 1
                virus.y += 1
                lastKey = "leftdown" //Last key
            }
        }
        
        else if (right && down && !end) { // Right and Down
            if (virus.x + 2 > cW || virus.y + 2 > cH) { return false } // For edge collision
            else { // Print image at new position
                virus.move(virus.x + 1, virus.y + 1)
                virus.x += 1
                virus.y += 1
                lastKey = "rightdown" //Last key
            }
        }

        else if (left && !end) { // Left
            if (virus.x - 1 < 0) { return false } // For edge collision
            else { // Print image at new position
                virus.move(virus.x - 1, virus.y)
                virus.x -= 1
                lastKey = "left" //Last key
            }
        }
        
        else if (up && !end) { // Up
            if (virus.y - 1 < 0) { return false }
            else {
                virus.move(virus.x, virus.y - 1)
                virus.y -= 1
                lastKey = "up"
            }
        }
        
        else if (right && !end) { // Right
            if (virus.x + 2 > cW) { return false }
            else {
                virus.move(virus.x + 1, virus.y)
                virus.x += 1
                lastKey = "right"
            }
        }
                
        else if (down && !end) { // Down
            if (virus.y + 2 > cH) { return false }
            else {
                virus.move(virus.x, virus.y + 1)
                virus.y += 1
                lastKey = "down"
            }
        }
    }
    
    window.addEventListener("load", function () { // runs when page loads, sets scene
        virus.render()
        for (var i in antiArray) antiArray[i].render()
    }, false)
    
    window.addEventListener('resize', function() {
        c.width = window.innerWidth
        c.height = window.innerHeight
    })
}

document.addEventListener("DOMContentLoaded", init, false) // Run when the DOM has loaded
