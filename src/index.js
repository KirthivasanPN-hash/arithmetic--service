const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const { add } = require("./arithmetica");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Arithmetic service - Hello world!");
});

// New route for adding two numbers
app.get("/add", (req, res) => {
  // Extracting two numbers from query parameters
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  // Check if the numbers are valid
  if (!isNaN(num1) && !isNaN(num2)) {
    // Calculate the sum
    const sum = num1 + num2;
    res.send(`Sum: ${sum}`);
  } else {
    // Send an error message for invalid input
    res.status(400).send("Invalid input. Please provide valid numbers.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
