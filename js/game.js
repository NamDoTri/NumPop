var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var score = 0;

//generate invisible 4x5 grid
let grid = [ 
    {x: 40, y: 120 },
];
for(let x = 0; x < 4; x++)
{
    for(let y = 0; y < 5; y++)
    {
        grid.push( {x: grid[0].x + 80*x, y: grid[0].y + 80*y} );
    }
}
grid = grid.splice(1,20);

//print score
function printScore(score)
{
    ctx.font = "16px serif";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 20);
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
//print numbers
function drawNumber(dotX, dotY, numberToBePrint)
{
    ctx.beginPath();
    ctx.arc(dotX, dotY, 40, 0, 360);
    ctx.closePath();
    ctx.fillStyle="White";
    ctx.fill();

    /*ctx.strokeStyle = "Light Gray";
    ctx.moveTo(dotX - 40, dotY);
    ctx.lineTo(dotX + 40, dotY);
    ctx.stroke();*/

    ctx.fillStyle = "Black";
    ctx.font = "16px serif";
    ctx.fillText(String(numberToBePrint), dotX - ctx.measureText(String(numberToBePrint)).width/2, dotY + 8, 57);
}

function draw()
{
    //background color
    ctx.fillStyle = "#def3fd";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    //print numbers to the screen
    var currentRound = generateNumbers(1,20,3);
    for ( number of currentRound)
    {
        drawNumber(grid[Math.round(Math.random()*18)].x, grid[Math.round(Math.random()*18)].y, String(number));
    }

    //print current score
    printScore(score);
}

draw();
