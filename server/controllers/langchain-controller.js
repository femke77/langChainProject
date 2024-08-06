const apiKey = process.env.OPENAI_API_KEY;
const {ChatOpenAI} = require( '@langchain/openai');
const model = new ChatOpenAI({ temperature: 0, openAIApiKey: apiKey, modelName: 'gpt-3.5-turbo' });

if (!apiKey) {
  console.error('OpenAI api key is not defined.');
  process.exit(1);
}

module.exports = {
    async chat(req, res) {
        try {
            const { data } = await model.complete(req.body.prompt);
            res.json(data.choices[0].text);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }


}