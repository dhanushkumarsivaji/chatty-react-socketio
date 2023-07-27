import "./App.css";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

// no dotenv
const socket = io.connect("https://socketioeventgrid.azurewebsites.net");
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // function fetchData() {
  //   fetch('https://c9ae-117-216-50-195.ngrok-free.app/eventgrid', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       firstParam: 'yourValue',
  //       secondParam: 'yourOtherValue',
  //     }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.text(); // If you are expecting a text response
  //     })
  //     .then((responseText) => {
  //       console.log(responseText); // Logging the response text
  //     })
  //     .catch((error) => {
  //       console.error('Fetch error:', error);
  //     });
  // }

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });

    socket.on("message", () => {
      console.log("message");
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty app</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.message}: <span>id: {payload.userName}</span>
            </p>
          );
        })}

        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
