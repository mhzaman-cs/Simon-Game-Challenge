// Sets all initial variables

const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var blue = new Audio('sounds/blue.mp3');
var green = new Audio('sounds/green.mp3');
var red = new Audio('sounds/red.mp3');
var yellow = new Audio('sounds/yellow.mp3');
var wrong = new Audio('sounds/wrong.mp3');


// Function used to initate teh function

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Waht occurs when moving to next level

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

// Action that happens when a button is clicked

$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  check_response(userClickedPattern.length-1);
})

// Animates the button being pressed

function animatePress(randomChosenColour) {
  $("." + randomChosenColour).addClass("pressed");
  playSound(randomChosenColour);

  setTimeout(function() {
    $("." + randomChosenColour).removeClass("pressed");
  }, 100);
}


// Function that checks response

function check_response(level) {
  if (gamePattern[level] === userClickedPattern[level]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// Function that plays sound

function playSound(name) {
  if (name === "red") {
    red.play();
  } else if (name === "blue") {
    blue.play();
  } else if (name === "green") {
    green.play();
  } else if (name === "yellow") {
    yellow.play();
  } else {
    wrong.play();
  }
}

// Function that resets all of the values

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
