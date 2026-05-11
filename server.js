const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(req.body.message);

    res.json({
        reply: result.response.text()
    });
});

app.listen(3000);