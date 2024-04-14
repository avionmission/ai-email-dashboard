## Test the Application

- Add API keys to a `.env` file in your project
```text
GEMINI_API_KEY=[YOUR GEMINI API KEY]
SENDGRID_API_KEY=[YOUR SENDGRID API KEY]
```

- Set the Sender and Recipient email in `server.js`:
```js
app.post("/send-email",(req, res) => {
    transporter.sendMail({
        from: "[SENDER EMAIL]",
        to: "[RECIPIENT EMAIL]",
```
- Run the backend, in the root directory
```bash
npm install
npx nodemon server.js
```
- Run the react frontend in another terminal:
```bash
npm start
```