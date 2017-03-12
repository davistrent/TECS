#!/usr/bin/env node 

const fs = require('fs');
const minimist = require('minimist');

const options = {
    string: 'fileName'
}

const args = minimist(process.argv.slice(2), options);
const fileName = args.fileName;
let symbolTable = {};
let symbolCounter = 16; // Start Hack symbol storage at register 16

var tokenizedInstructions = removeBlankLinesAndComments(fileName);

//tokenizedInstructions.map(token => console.log(`${token}`));

tokenizedInstructions.map(token => {
  var processedToken = processToken(token);
  //console.log(processedToken);
});















// ### Utility Functions ###

function removeBlankLinesAndComments(fileName) {
  const contents = fs.readFileSync(fileName);

  let tokens = contents.toString().split('\n');

  tokens = tokens.map(token => token.trim());

  tokens = tokens.filter(function (token) {
    return !token.startsWith('//') && token.length > 0; 
  });

  return tokens;
}

function processToken(token) {
  // Check to see if we have an identifier or a number constant
  if(token.startsWith('@')) {
      item = token.substring(1);

      if(isNaN(item)) { // not a constant, process symbol
       if(!symbolTable[item]) {
          symbolTable[item] = symbolCounter;
          symbolCounter++;
       }

       console.log(symbolTable[item].toString(2));
      } else { // constant, load the address
        console.log(new Number(item).toString(2));
      }
  }
}

// ### End Utility Functions ###
