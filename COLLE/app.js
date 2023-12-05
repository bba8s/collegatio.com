const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const app = express();

// OpenAI API Key
const apiKey = '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'; // Ersetze mit deinem API-Schlüssel

// OpenAI Client
const openai = new OpenAI({
  apiKey: apiKey,
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/ask', async (req, res) => {
  const userMessage = req.body.userMessage;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "antworte auf die Frage aber dichte erfundene Fakten hinzu." },
        { role: "user", content: userMessage },
      ],
    });

    res.render('index', { response: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.render('index', { response: 'Es ist ein Fehler aufgetreten.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server läuft auf Port ${PORT}'));