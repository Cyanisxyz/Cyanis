import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

let openai;
try {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured in .env file');
  }
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
} catch (error) {
  console.error('Error initializing OpenAI:', error);
  process.exit(1);
}

// CORS configuration
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(join(__dirname, '../dist')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Invalid request format',
        details: 'Messages must be an array'
      });
    }

    const completion = await openai.chat.completions.create({
      model: "ft:gpt-4o-2024-08-06:cyanis:cyanis:Avmww0lF",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    if (!completion.choices || !completion.choices[0]) {
      throw new Error('Invalid response from OpenAI API');
    }

    res.json({
      message: completion.choices[0].message,
      usage: completion.usage
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    
    if (error.response) {
      const status = error.response.status || 500;
      res.status(status).json({
        error: 'OpenAI API error',
        details: error.response.data
      });
    } else if (error.message === 'OPENAI_API_KEY is not configured in .env file') {
      res.status(500).json({
        error: 'Server configuration error',
        details: 'OpenAI API key is not configured'
      });
    } else {
      res.status(500).json({ 
        error: 'Internal server error',
        details: error.message 
      });
    }
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('OpenAI API key configured:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');
});