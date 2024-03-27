const express = require("express");
const app = express();

const connectDB = require("./db");
const {
  getMessages,
  renderMessages,
  addMessage,
  deleteAllMessages,
} = require("./controller");

//Important: will be discussed next week
app.use(express.json());

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// Routes

// Route to render index.html with Messages using EJS
app.get("/", renderMessages);

// GET all Messages
app.get("/api/Messages", getMessages);
// Add a new Message
app.post("/api/Messages", addMessage);
// DELETE all Message
app.delete("/api/Messages", deleteAllMessages);

const PORT = 7000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
