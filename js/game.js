var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var score = 0;
var currentRound = [];
var currentNumbers;
var roundOver = false;
var timeBarInterval;
var timeLeft = canvas.width;
//generate invisible 4x5 grid
let grid = [];
for(let x = 0; x < 4; x++)
{
    for(let y = 0; y < 5; y++)
    {
        grid.push( {x: 40 + 80*x, y: 120 + 80*y} );
    }
}

//print score
function printScore(score)
{
    ctx.font = "16px serif";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 30);
}

//generate numbers for each round
function generateNumbers(from, to, length)
{
    let numbers = [];
    while (numbers.length < length)
    {
        let newNumber =  Math.floor(Math.random() * (to-from) + from) ;
        if(numbers.indexOf(newNumber) == -1 )
        {
            numbers.push(newNumber);
        }
    }
    return numbers.sort(function(a,b){ return a-b }); //sort the array in an ascending order
}

//print a number in the center of the ball
function drawNumber(dotX, dotY, numberToBePrint)
{
    //print the ball
    ctx.beginPath();
    ctx.arc(dotX, dotY, 40, 0, 360);
    ctx.closePath();
    ctx.fillStyle="White";
    ctx.fill();
    //print number inside
    ctx.fillStyle = "Black";
    ctx.font = "16px serif";
    ctx.fillText(String(numberToBePrint), dotX - ctx.measureText(String(numberToBePrint)).width/2, dotY + 8, 57);
}

//check if user clicks on the correct number
function mouseDownHandler(e)
{
    var clickedX = e.offsetX;
    var clickedY = e.offsetY;
    if (Math.sqrt( Math.pow(clickedX - currentRound[0].coorX,2) + Math.pow(clickedY - currentRound[0].coorY,2) ) < 40)
    {
        currentNumbers = currentNumbers.splice(1,currentNumbers.length-1);
        currentRound = currentRound.splice(1, currentRound.length-1);
        score += 10;
        if(currentNumbers.length == 0)
        {
            roundOver = true;
        }
        draw();
    }
}

function draw()
{
    //background color
    ctx.fillStyle = "#def3fd";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    //print time bar
    ctx.fillStyle = "#6fc0ab";
    ctx.fillRect(0,0, timeLeft, 10);

     //print current score
     printScore(score);

    if(roundOver == true)
    {
        //reset stats
        currentNumbers = generateNumbers(1,20,3);
        currentRound = [];
        //First check if the coordinates are duplicated or not
        while (currentRound.length < currentNumbers.length)
        {
            let coordinates = {
                coorX: grid[Math.round(Math.random()*19)].x,
                coorY: grid[Math.round(Math.random()*19)].y
            };
            let isDuplicated = false;
            for(i of currentRound)
            {
                if(i.coorX == coordinates.coorX || i.coorY == coordinates.coorY)
                {
                    isDuplicated = true;
                }
            }
            if(isDuplicated == false)
            {
                currentRound.push(coordinates);
            }
        }
        //then print the balls out
        for ( number in currentNumbers)
        {
            drawNumber(currentRound[number].coorX, currentRound[number].coorY, currentNumbers[number]);
        }
        roundOver = false;
    }else{
        for ( number in currentNumbers)
        {
            drawNumber(currentRound[number].coorX, currentRound[number].coorY, currentNumbers[number]);
        }
    }
}

function initGame(button)
{
    if(button.textContent == "Start")
    {
        roundOver = true;
        draw();
        button.textContent = "Reset";
        setTimeout(gameOver, 60000); //this is a minute
        timeBarInterval = setInterval( function()
        {
            timeLeft -= 20/375;
            draw();
        }, 10);
    }else{
        ctx.fillStyle = "#def3fd";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        score = 0;
        button.textContent = "Start";
    }
}

function gameOver()
{
   //background color
    ctx.fillStyle = "#def3fd";
    ctx.fillRect(0,0,canvas.width, canvas.height); 
    //print text
    ctx.fillStyle = "Black";
    ctx.font = "40px serif";
    ctx.fillText('GAME OVER', (canvas.width - ctx.measureText('GAME OVER').width)/2, 100);
    ctx.font = "30px serif";
    ctx.fillText( `Score: ${score}`, (canvas.width - ctx.measureText(`Score: ${score}`).width)/2, 180);
    //clear Interval
    clearInterval(timeBarInterval);
    //reset stats
    score = 0;
    currentRound = [];
    currentNumbers = [];
}

//background color
ctx.fillStyle = "#def3fd";
ctx.fillRect(0,0,canvas.width, canvas.height);
document.addEventListener("mousedown", mouseDownHandler, false);

