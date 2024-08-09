// https://js.langchain.com/v0.1/docs/modules/model_io/prompts/quick_start/
const apiKey = process.env.OPENAI_API_KEY;
const { ChatOpenAI } = require("@langchain/openai");
const {
  PromptTemplate,
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} = require("@langchain/core/prompts");
const {
  AIMessage,
  HumanMessage,
  SystemMessage,
} = require("@langchain/core/messages");

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
  // simple template takes user input
  async chatWithPromptTemplate(req, res) {
    try {
      const template = PromptTemplate.fromTemplate(
        "You are a fitness guru who loves to enthusiastically help clients get in shape. Give me a strength training workout for my {body_part}."
      );
      const formattedPrompt = await template.format({
        body_part: req.body.prompt,
      });
      const data = await model.invoke(formattedPrompt);

      res.json(data.kwargs.content || "There was a problem completing your request");
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err.message);
    }
  },
  async chatWithChatPromptTemplate(req, res) {
    try {
      const systemTemplate =
        "You are a helpful assistant that translates {input_language} to {output_language}.";
      const humanTemplate = "{text}";
      const chatPrompt = ChatPromptTemplate.fromMessages([
        ["system", systemTemplate],
        ["human", humanTemplate],
      ]);
      const formattedChatPrompt = await chatPrompt.formatMessages({
        input_language: req.body.input_lang,
        output_language: req.body.output_lang,
        text: req.body.text,
      });
      const data = await model.invoke(formattedChatPrompt);

      res.json(data || "There was a problem completing your request");
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err.message);
    }
  },
};
