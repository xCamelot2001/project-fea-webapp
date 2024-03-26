import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  const { emotion} = req.body;
  
  const messages = `I feel ${emotion} . What content can you generate for me?`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // or another available model
      messages: messages,
      max_tokens: 150
    });

    res.json({ generatedContent: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating content', error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});