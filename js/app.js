
//global variable
var count = 0;
var cond = false;
var prevGuess = -1;
var newGuess;


//function declarations


//function to generate random nuber 1-100
function genNum() {
    var num = Math.floor((Math.random() * 100) + 1);
    return num;
}
//function to verify guess is 1-100
function verifyGuess(x) {
    var val = +x;
    if (typeof val === "number" && val % 1 === 0 && val <= 100 && val >= 1) {
        return true;
    } else {
        return false;
    }
}

//function for first guess, checks to if hot of cold and adds li with guess and hot or cold
function checkGuess(est, act) {
    count++;
    var dist;
    var diff = Math.abs(est - act);
    if (est == act) {
        dist = "You got it!"
        cond = true;
    } else if (prevGuess == -1) {
        if (diff < 10) {
            dist = "Hot";
        } else if (diff < 20) {
            dist = "Warm"
        } else if (diff < 30) {
            dist = "Cold";
        } else {
            dist = "Ice Cold"
        }
    } else {
        if (prevGuess < diff) {
            dist = "Colder";
        } else if (prevGuess > diff) {
            dist = "Hotter"
        } else {
            dist = "The temperature is unchanged"
        }

    }
    $("#feedback").text(dist);
    $("#count").text(count);
    prevGuess = diff;
}




$(document).ready(function() {

    /*--- Display information modal box ---*/
    $(".what").click(function() {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });

    //Generate random number
    rand = genNum();
    //initialize game on click guess button
    $("#guessForm").submit(function(evt) {
        if (!cond) {
            evt.preventDefault();
            guess = $("#userGuess").val();
            if (verifyGuess(guess)) {
                checkGuess(guess, rand);
                var li = "<li>" + guess + "</li>";
                $("#guessList").append(li);
                $("#userGuess").val(" ");
            } else {
                alert("Your entry was not an integer between 1 and 100. Please try again");
            }
        } else {
            $("#userGuess").prop("disabled", true);
            $("#guessButon").prop("disabled", true);
        }
    });

    //start new game when box is clicked
    $(".new").click(function() {
        rand = genNum();
        $("#feedback").text("Make Your Guess");
        count = 0;
        $("#count").text(count);
        $("#userGuess").val(" ");
        cond = false;
        $("#guessList").empty();


    });

});