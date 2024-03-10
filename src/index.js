// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to add two numbers
app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (!isNaN(num1) && !isNaN(num2)) {
    const sum = num1 + num2;
    res.json({ result: sum });
  } else {
    res
      .status(400)
      .json({ error: " goo Invalid input. Please provide valid numbers." });
  }
});

app.get("/cipher", (req, res) => {
  const word = req.query.word;
  const shift = parseInt(req.query.shift);

  if (!word || isNaN(shift)) {
    return res
      .status(400)
      .json({ error: "boo Invalid input. Please provide valid parameters." });
  }

  // Implement cipher logic based on the cipher type (e.g., Caesar cipher)
  // For demonstration purposes, let's use a simple Caesar cipher implementation
  const encodedWord = caesarCipher(word, shift);
  res.json({ encodedWord });
});

// Caesar cipher implementation
function caesarCipher(word, shift) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const shiftedAlphabet = alphabet.slice(shift) + alphabet.slice(0, shift);
  return word
    .split("")
    .map((char) => {
      const lowerCaseChar = char.toLowerCase();
      const index = alphabet.indexOf(lowerCaseChar);
      if (index === -1) {
        return char;
      }
      const isUpperCase = char === char.toUpperCase();
      const shiftedChar = shiftedAlphabet[index];
      return isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
    })
    .join("");
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
