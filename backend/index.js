// server.js
const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/convert", async (req, res) => {
  try {
    const { sourceCode, sourceLanguage, targetLanguage } = req.body;

    // Add language-specific identifiers to the prompt
    const prompt = `
      Translate the following code from ${sourceLanguage} to ${targetLanguage}:
      \`\`\`${sourceLanguage}
      ${sourceCode}
      \`\`\`
    `;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

app.post("/correctCode", async (req, res) => {
  try {
    const { code } = req.body;

    // Prepare the prompt for the GPT-3.5 turbo API
    const prompt = `Please correct the following code:\n\`\`\`\n${code}\n\`\`\`\n`;

    // Make the request to GPT-3.5 turbo to correct the code
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Or use the appropriate GPT-3.5 turbo model name
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    // Extract the corrected code from the API response
    const correctedCode = response.data.choices[0].text;

    res.status(200).json({
      success: true,
      correctedCode: correctedCode,
    });
  } catch (error) {
    console.error("Error occurred during code correction:", error);
    res.status(500).json({
      success: false,
      error: "Error occurred during code correction.",
    });
  }
});

app.post("/debugCode", async (req, res) => {
  try {
    const { code } = req.body;

    // Prepare the prompt for the GPT-3.5 turbo API
    const prompt = `
      You provided the following code:
      
      \`\`\`
      ${code}
      \`\`\`
      
      Please provide suggestions to debug the code.
    `;

    // Make the request to GPT-3.5 turbo to generate debugging suggestions
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Or use the appropriate GPT-3.5 turbo model name
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    // Extract the debugging suggestions from the API response
    const debuggingSuggestions = response.data.choices[0].text;

    res.status(200).json({
      success: true,
      debuggingSuggestions: debuggingSuggestions,
    });
  } catch (error) {
    console.error("Error occurred during code debugging:", error);
    res.status(500).json({
      success: false,
      error: "Error occurred during code debugging.",
    });
  }
});



const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening on port ${port}`));
