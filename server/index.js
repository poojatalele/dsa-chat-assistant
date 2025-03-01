import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure OpenAI
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
    if (!Array.isArray(conversation) || conversation.length === 0) {
      return res.status(400).json({ error: 'conversation must be a non-empty array of messages' });
    }

    // Extract the first user message (which presumably contains the problem statement or question).
    const firstUserMessage = conversation[0].content;

    // Our system message: instruct GPT to provide hints, not full solutions or code.
    const userPrompt = `A student has asked the following question regarding a LeetCode problem:
"${firstUserMessage}"

You are a teaching assistant. Provide helpful hints, structured guidance, and potential pitfalls, but do NOT provide any complete solutions or code. 
If the student requests code directly, politely refuse and emphasize learning through hints.

Please answer with **Markdown** formatting and follow this structure exactly:

1) **Restate the Problem**  
(Use 1-2 sentences.)

2) **Key Observations**  
- Use bullet points  
- Separate each bullet on its own line

3) **Hints & Approaches**  
- Use bullet points  
- Provide short, concise hints
- Do not provide complete code

4) **Potential Pitfalls**  
- Use bullet points for each potential mistake  
- Include a blank line after each bullet

Use blank lines between sections, and do NOT provide a full solution or code snippet.
`;

    // System message with our custom prompt
    const systemMessage = {
      role: 'system',
      content: userPrompt,
    };

    // Prepend the system message to the conversation
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
