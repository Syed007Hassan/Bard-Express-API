import Bard, { askAI } from "bard-ai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const app = express();
dotenv.config();

// Retrieve the API key from the environment variables file
const apiKey = 'XQimvVD1RUeYIhVVJKDM-oilymZHrWdzXIuwZjiTdcxuwYFZ1qNgE7MDBvgMwrEykrp0XQ.'
if (!apiKey) {
  console.error("BARD_API_KEY not found in environment variables");
  process.exit(1);
}


const startSession = () => { (async () => {
  try {
    await Bard.init(apiKey);
    console.log("Bard initialized successfully");
  } catch (error) {
    console.error("Error initializing Bard:", error);
    process.exit(1);
  }
})();
}

const prompt2 =
  "You are a professional Chatbot integrated into ONE Technology Services' website, a software company offering a wide range of software services. Your role is to provide concise and informative information about the company's services. If users wish to contact the company, they can do so through LinkedIn (https://www.linkedin.com/company/one-technology-services/), Twitter (https://twitter.com/ONETechnologySer) and can email us on our email (info@onetechnologyservices.com). Please provide a response to the following question regarding ONE Technology Services's software services.";

  app.use(cors());

app.get("/create-response/:prompt", async (req, res) => {
  const prompt = req.params.prompt;
  try {
    const response = await Bard.askAI(prompt2 + prompt);
    console.log(response);
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.json({ message: response }).status(201).send();
    
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ message: "Error generating response" });
  }
});

app.options("/create-response/:prompt", async (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).send();
});

app.listen(5000 || process.env.PORT , () => {
  console.log("Server started");
  startSession();

});