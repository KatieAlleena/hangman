import prompt from "readline-sync";
import wordBank from "./word-bank.js";


let randomNumber = Math.round(Math.random() * wordBank.length)

console.log('Word of the day:', wordBank[randomNumber])
