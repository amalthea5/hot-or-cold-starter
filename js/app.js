
$(document).ready(function(){

	var randomNumber;
	var guessFlag;
	var guessCount;
	var userGuess;
	var won = false;
    
    /*--- Creates a new game on page load ---*/
	newGame();

	/*--- On form submit ---*/
	$("form").submit(function(event){
		event.preventDefault();

		if (!won) {
			userGuess = $('#userGuess').val(); //take input of user guess through val
			console.log("User Choice = "+ userGuess);
			clearText(); //clear input field after each guess
			setFocus(); //reset focus to input field
			guessFlag = checkGuess(userGuess);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userGuess + "</li>");
				guessFlag = checkTemp(Math.abs(randomNumber - userGuess));
			}
		} else {
			setFeedback("You have won the game already! Click new game!");
		};
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- Create new game when button clicked ---*/
  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});

  	/*--- Great new game function ---*/
  	function newGame() {
  		guessFlag = true;
  		guessCount = 0;
  		won = false;
  		$("ul#guessList li").remove();
  		setFeedback("Make your Guess!");
  		setCount(guessCount);
  		randomNumber = generateNumber();
  		setFocus();
  		clearText();
  		//call other functions to reset everything
  	}
  	/*--- Generate random number ---*/
  	function generateNumber(){
  		var gameNumber = Math.floor((Math.random()*100)+1);
  		console.log("Generated Random Number = "+ gameNumber);
  		return gameNumber;
  	}

  	/*--- Set focus to the input box ---*/
  	function setFocus(){
  		document.getElementById("userGuess").focus();
  	}

  	/*--- Clear text box ---*/
  	function clearText(){
  		$('#userGuess').val('');
  	}

  	/*--- Set the guess count ---*/
  	function setCount(count){
  		$('#count').text(guessCount);
  	}

  	/*--- Prompt for a Guess ---*/
  	function getGuess(){
  		var userGuess = prompt("Guess the Number","Your Guess");
  		console.log("User Choice = "+ userGuess);
  		return userGuess;
  	}

  	/*--- Check if guess meets rules ---*/
  	function checkGuess(userGuess){
  		if (isNaN(userGuess)){
  			setFeedback("Please enter a number 1-100!");
  			return true;
  		} else if (userGuess < 1 || userGuess >100) {
  			setFeedback("Your guess must be between 1 and 100!");
  			return true;
  		} else if ($.trim(userGuess) == '') {
  			setFeedback("Please enter your guess!");
  			return true;
  		} else {
  			return false;
  		};
  	}

  	/*--- Check temp of guess for feedback ---*/
  	function checkTemp(guessDifference){
  		if (guessDifference == 0) {
  			setFeedback("Yay! You guessed it!");
  			won = true;
  			return false;
  		} else if (guessDifference <= 10) {
  			setFeedback("Your guess is very hot!");
  			return true;
  		} else if (guessDifference >= 10 && guessDifference <= 20) {
  			setFeedback("Your guess is getting hot!");
  			return true;
  		} else if (guessDifference >= 20 && guessDifference <= 30) {
  			setFeedback("Your guess is getting warm!");
  			return true;
  		} else if (guessDifference >= 30 && guessDifference <= 40) {
  			setFeedback("Your guess is too cold!");
  			return true;
  		} else {
  			setFeedback("Your guess is ice cold!");
  			return true;
  		}
  	}

  	/*--- Set the feedback ---*/
  	function setFeedback(feedback) {
  		$('#feedback').text(feedback);
  	}


});


