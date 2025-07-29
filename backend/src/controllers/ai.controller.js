import aiService from "../services/ai.service.js";

export default async function getReview(req, res) {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).send("❌Code is required!!");
    }

    const response = await aiService(code);

    res.status(200).send(response);
  } catch (error) {
    console.error("❌ AI Service Error:", error.message || error);
    res.status(500).send("Internal Server Error while generating response");
  }
}
