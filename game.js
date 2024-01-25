var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;  


$(".btn").click(function () {
    var userChosenColour = $(this).attr('id');
    
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

nextSequence = () => {
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`.${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    $("h1").text(`Level ${++level}`);
}

playSound = (name) => {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

animatePress = (currentColor) => {
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}  

$(document).keypress(function() {
    if (level < 1) {
        nextSequence();
    }
});


checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();}, 600);
            userClickedPattern = [];
        }
    } else {
        console.log("wrong");
        playSound("wrong"); 

        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 300);

        startOver(); 
    }
}

startOver = () => {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;  
}

