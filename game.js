


let buttonColors = ["red", "blue", "green", "yellow"]

let userClickedPattern = []

let gamePattern = []

let started = false

var level = 0





$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)

    playSound(userChosenColor)
    animatePress(userChosenColor)
    console.log(userClickedPattern)
    checkAnswer(userClickedPattern.length-1)
    
})



$(document).keypress(function(){

    if(!started){
        console.log("start game")
        setTimeout(()=>{
            nextSequence()
        },500)
        started = true 
    }
    
})




function checkAnswer(currentLevel){
    console.log(userClickedPattern)
    console.log(gamePattern)
    if( userClickedPattern[currentLevel] == gamePattern[currentLevel] ){
        
        if( userClickedPattern.length == gamePattern.length){
            setTimeout(()=>{
                nextSequence()
            },1000)
        }
       

    }else{
        
        playSound("wrong")
        $("body").addClass("game-over")
        $("h1").text("Game Over, Press Any Key to Restart")

        setTimeout(()=>{
            $("body").removeClass("game-over")
        },200)

        level = 0
        started = false
        gamePattern = []
       
    }
}





function nextSequence() {


    userClickedPattern = []

    $("h1").text("Level " + level )

    var randomNumber = getRandomInt(0, 4)

    var randomChosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChosenColor)


    $("#" + randomChosenColor).fadeOut(100).fadeIn(100)

    playSound(randomChosenColor)

    level ++

}


function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")

    setTimeout(()=>{
        $("#" + currentColor).removeClass("pressed")
    },100)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}