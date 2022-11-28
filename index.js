import prompt from "readline-sync";
import wordBank from "./word-bank.js";

// Variables to track wins vs losses
let wins = 0;
let losses = 0;

/* Here's how the game might reset after playing a round, and also creates a variable or two for some arrays we will need. */
const resetGame = () => {
  let answerList = [];
  let guesses = 7;
  let letterList = [];

  /* This should be the game itself. Here it's using the wordbank file to to pick a random word (math.floor/math.random) */
 const gameOfHangman = () => {
  const word = wordBank[Math.floor(Math.random() * wordBank.length)];
  const letters = word.split("");
  let lettersLeft = word.length;
  
  const getAnswerList = () => {
    letters.forEach((_, index) => {
      answerList[index] = "_"
    });
  };
    
  getAnswerList();
    
  console.log(`
  Let's Play Hangman!
  Press ctrl+c to stop`);
    
  while (lettersLeft > 0 && guesses > 0) {
    console.log(answerList.join(" "));
    let guess = prompt.question(`
    Try and guess a letter: `).toLowerCase();


    /* In this game, the ideal input is a string which is one letter. If it's anything else, we want the game to keep going. 
    Instead of using the alphabet as a variable, we're using regular expressions. See readme for my sources because I don't *really* get it either lol */     
      
    const checkInput = () => {
      if (guess === "") {
        console.log(`
        Please type in a letter.`)
      } else if (/[^a-zA-Z]/.test(guess[0])) {
        console.log(`
        Please type in a letter.`)
      } else if (/[a-zA-Z]/.test(guess[0])) {
        letters.forEach((letter, index) => {
          if (guess[0] === letter) {
            if (answerList[index] === "_") {
              answerList[index] = guess[0];
              lettersLeft--;
            };
          };
        });
        if (!letterList.includes(guess[0]) && !letters.includes(guess[0])) {
          guesses--
        };
        if (!letterList.includes(guess[0])) {
          letterList.push(guess[0]);
        };
      };
    };

    checkInput();

    /* This, in theory, should write H A N G M A N in console as the player guess letters, and should also let the player know how many more times they can make a guess. */
    const gameDraw = () => {
      if (guesses === 7) {
        console.log(`
        You've got ${guesses} lives left.`)
      } else if (guesses === 6) {
        console.log(`H 
        `);
        console.log(`
        You've got ${guesses} lives left.`)
      } else if (guesses === 5) {
        console.log(`H A 
        `)
        console.log(`
        You've got ${guesses} lives left.`)
      } else if (guesses === 4) {
        console.log(`H A N 
        `)
        console.log(`
        You've got ${guesses} lives left.`)
      } else if (guesses === 3) {
        console.log(`H A N G 
        `)
        console.log(`
        You've got ${guesses} lives left.`)
      } else if (guesses === 2) {
        console.log(`H A N G M 
        `)
        console.log(`
        You've got ${guesses} lives left.`)
      } else if (guesses === 1) {
        console.log(`H A N G M A 
        `)
        console.log(`
        You've got ${guesses} lives left.`)
      } else if (guesses === 0) {
        console.log(`H A N G M A N
        `)
        console.log(`
        You've got ${guesses} lives left.`)
      };
      console.log(`You've tried these letters so far: ${letterList}.
      `);
    };

    gameDraw();
    
  };

  /* This should show a message if the answer was either wrong or right and update the counters so the player can see. Maybe. Probably. */
  const showResults = () => {
    if (lettersLeft > 0) {
      console.log(answerList.join(" "));
      console.log(`
      
      HANGMAN!
      You're out of lives.
      The word you were trying to guess is: ${word}.
      `)
      losses++;
    } else {
      console.log(answerList.join(" "));
      console.log(`
      
      You survived!
      The answer was ${word}.
      `)  
       wins++;
    };
    console.log(`
    You survived ${wins} times and have lost ${losses} times.
    `)
  };
    
  showResults();
  
};
  
gameOfHangman();
};

//This should allow another reset after each game.

while(true) {
  resetGame();
};

/* This maybe isn't the cleanest code ever but when I typed in node index.js and IT RAN without a wall of errors, it was a really cool feeling. Do I get it? Sorta. Do I wish I really truly UNDERSTOOD all of it? Maybe. Am I glad this thing is done? Absolutely. (: */