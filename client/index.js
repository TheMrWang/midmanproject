const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Open AI Configuration
const configuration = new Configuration({
	organization: "org-8JzRW8S0HIJpxqQJ2emJ3WAQ",
	apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Express Configuration
const app = express()
const port = 80 // change the port to 80 for HTTP

app.use(bodyParser.json())
app.use(cors())
app.use(require('morgan')('dev'))


// Routing 

// Primary Open AI Route
app.post('/', async (req, res) => {
	const { message, currentModel, temperature } = req.body;
	const response = await openai.createCompletion({
		model: `${currentModel}`,// "text-davinci-003",
		prompt: `${message}`,
		max_tokens: 300,
		temperature: 0
	});
	res.json({
		message: response.data.choices[0].text,
	})
});

// Get Models Route
app.get('/models', async (req, res) => {
	const response = await openai.listEngines();
	res.json({
		models: response.data
	})
});

module.exports = app;
