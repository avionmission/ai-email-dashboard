import React, { useState } from "react";

const App = () => {

  const [subject, setSubject] = useState("Example Email - Craft Compelling Emails with AI")
  const [body, setBody] = useState(`Hi there,

Are you tired of writer's block when it comes to crafting emails? Do you ever wish you could write clear, concise, and impactful emails faster?
  
This AI-powered email generation tool can helps you write better emails in less time.`
              )
  const [prompt, setPrompt] = useState("")

  const generateEmail = () => {
    if(!prompt) {
      return
    }

    try {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          prompt: prompt,
        })
      }

      fetch('http://localhost:8000/generate', options)
        .then(res => res.json())
        .then(data => {
          const lines = data.text.split("\n")
          setSubject(lines[0])
          setBody(lines.slice(1).join('\n'))
        })
        .catch(error => {
          console.error(error);
        });

      setPrompt("")

    } catch (error) {
      console.error(error)
      setError("Something went wrong! Please try again later.")
    }
  }

  const sendEmail = () => {
    if (!subject || !body) {
      return
    }

    try {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          subject: subject,
          body: body,
        })
      }

      fetch('http://localhost:8000/send-email', options)
        .then(res => res.json())
        .then(data => {
          console.log(data.status)
        })
        .catch(error => {
          console.error(error);
        });

      setPrompt("")

    } catch (error) {
      console.error(error)
      setError("Something went wrong! Please try again later.")
    }
  }

  return (
    <>
      <div className="app">
        <h1>✎ Dashboard</h1>

        <div className="input-container">
          <input 
            placeholder="Write a prompt..."
            onChange={(e) => setPrompt(e.target.value)}/>
          <button onClick={generateEmail}>Generate</button>
        </div>

        <div className="preview">
          <p>Edit:</p>

          <div className="subject-line">
            Subject: <input 
            className="subject-input" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}/>
            
          </div>

          <textarea className="body-text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <p><b>Email List: </b>testuser@gmail.com, testuser2@gmail.com</p>

        <button className="send" onClick={sendEmail}>Send Email</button>

      </div>
    </>
  )
}

export default App;