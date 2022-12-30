const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;
const configuration = new Configuration({
  organization: "org-KcJ0Hk2SLWQzlobDDwIqi4c5",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.getResponseFromChatbot = async (req, res, next) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      max_tokens: 4000,
      temperature: 0,
    });
    res.status(200).json({
      message: response.data.choices[0].text.slice(2),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
