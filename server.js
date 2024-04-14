const express = require('express')
const nodemailer = require("nodemailer")
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const PORT = 8000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config()

const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    }
})

app.post("/send-email",(req, res) => {
    transporter.sendMail({
        from: "[SENDER EMAIL]",
        to: "[RECIPIENT EMAIL]",
        subject: req.body.subject,
        text: req.body.body,
    }, function(error, info) {
        if (error) {
            console.log(error);
            req.send({'status': `Error ${error}`})
        } else {
            console.log('Email sent: ' + info.response)
            req.send({'status': "Success! Email Sent: " + info.response})
        }
    })
})

app.post("/generate", async(req, res) => {
    const model = genAI.getGenerativeModel({model: "gemini-pro"})

    console.log(req.body.prompt)
    const prompt = req.body.prompt + " Make the first line the subject line (but no need to start with 'Subject: ') and rest of the text the body of the email."

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.send({'text': text})
})

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)
})

