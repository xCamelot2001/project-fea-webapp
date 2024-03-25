import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const app = express();
app.use(bodyParser.json());

const openai = new OpenAI(process.env.OPENAI_API_KEY); // Make sure to set this in your .env

app.post('/', async (req, res) => {
  const { emotion } = req.body;
  
  // Replace the messages below with the context you want to send to OpenAI API based on the emotion
  const messages = [
    {"role": "user", "content": `I feel ${emotion}. What content can you generate for me?`},
    // Add more context if necessary
  ];
  
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4-turbo-preview",
      messages: messages,
    });

    res.json({ generatedContent: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating content');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});