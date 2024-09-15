const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const Blog = require('./models/blog');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Allow cross-origin requests

// MongoDB Connection
const uri = "mongodb+srv://manandraj20:manandraj20@simpleblogdb.6td4s.mongodb.net/?retryWrites=true&w=majority&appName=simpleBlogDB";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectToDatabase();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Simple Blog API');
});

// Create a new blog post
app.post('/blogs', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = { title, content, date: new Date() };
    const result = await client.db("simpleBlogDB").collection("blogs").insertOne(newBlog);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post' });
  }
});

// Get all blog posts
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await client.db("simpleBlogDB").collection("blogs").find().toArray();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
