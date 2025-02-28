import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// /**
//  * POST /api/chat
//  * Request body: { url: string, question: string }
//  * Response: { hint: string }
//  */
// app.post('/api/chat', async (req, res) => {
//   const { url, question } = req.body;

//   if (!url || !question) {
//     return res.status(400).json({ error: 'LeetCode URL and question are required.' });
//   }

//   const userPrompt = `A student is working on this LeetCode problem: ${url}.
// They asked: "${question}".

// Please answer with **Markdown** formatting and follow this structure exactly:

// 1) **Restate the Problem**  
// (Use 1-2 sentences.)

// 2) **Key Observations**  
// - Use bullet points
// - Separate each bullet on its own line

// 3) **Hints & Approaches**  
// - Again, bullet points
// - Provide short, concise hints

// 4) **Potential Pitfalls**  
// - Bullet points for each potential mistake
// - Include a blank line after each bullet

// Use blank lines between sections, and do not provide a full solution.`;

//   try {
//     const completion = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a helpful teaching assistant for DSA problems. Provide hints without revealing complete solutions.'
//         },
//         {
//           role: 'user',
//           content: userPrompt
//         }
//       ],
//       max_tokens: 200,
//       temperature: 0.7,
//     });

//     const gptResponse = completion.data.choices[0].message.content.trim();
//     return res.json({ hint: gptResponse });
//   } catch (error) {
//     console.error('Error calling OpenAI API:', error.response?.data || error.message);
//     return res.status(500).json({ error: 'Something went wrong with the OpenAI API.' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * POST /api/chat
 * Request body: { conversation: Array<{ role: string, content: string }> }
 * Response: { hint: string }
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { conversation } = req.body;
    if (!Array.isArray(conversation)) {
      return res.status(400).json({ error: 'conversation must be an array of messages' });
    }

    // Optionally, prepend a system message for context
    const systemMessage = {
      role: 'system',
      content: 'You are a helpful teaching assistant. Provide hints without giving full solutions.'
    };

    // Combine the system message + the entire conversation
    const messagesForGPT = [systemMessage, ...conversation];

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messagesForGPT,
      max_tokens: 300,
      temperature: 0.7,
    });

    const gptResponse = completion.data.choices[0].message.content.trim();
    res.json({ hint: gptResponse });
  } catch (error) {
    console.error('Error calling OpenAI API:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Something went wrong with the OpenAI API.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
