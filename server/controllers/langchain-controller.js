const apiKey = process.env.OPENAI_API_KEY;
const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const model = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: apiKey,
  modelName: "gpt-3.5-turbo",
});

if (!apiKey) {
  console.error("OpenAI api key is not defined.");
  process.exit(1);
}

module.exports = {
  async chat(req, res) {
    try {
      const prompt_template = PromptTemplate.fromTemplate(
        "Give me a strength training workout for my {body_part}."
      );
      const formatted_prompt = await prompt_template.format({
        body_part: req.body.prompt,
      });
      const data = await model.invoke(formatted_prompt);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  },
};
