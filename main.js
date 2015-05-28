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
    
		window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 37: // Left
          if(x-5 < 72) break; // This sets border
          else {
            c = document.getElementById("gameCanvas");
            ctx = c.getContext("2d");  // Used to draw on canvas
            ctx.moveTo(x,y);           // Draws line left
            ctx.lineTo(x-=5,y);
            ctx.stroke();
            break;
          }
 
        case 38: // Up
          if(y-5 < 70) break;
          else {        
            c = document.getElementById("gameCanvas");
            ctx = c.getContext("2d");        
            ctx.moveTo(x,y);
            ctx.lineTo(x,y-=5);         // Draws line up
            ctx.stroke();
            break;
          }

        case 39: // Right
          if(x+5 > 390) break;
          else {       
            c = document.getElementById("gameCanvas");
            ctx = c.getContext("2d");        
            ctx.moveTo(x,y);
            ctx.lineTo(x+=5,y);         // Draws line right
            ctx.stroke();
            break;
          }

        case 40: // Down
          if(y+5 > 300) break;
          else {
            c = document.getElementById("gameCanvas");
            ctx = c.getContext("2d");       
            ctx.moveTo(x,y);
            ctx.lineTo(x,y+=5);         // Draws line down
            ctx.stroke();
            break;
          }

        case 32: //Space      
          location.reload();            // Reloads page to erase
      }      // switch
  }, false); // end of function


}

document.addEventListener("DOMContentLoaded", init, false);
