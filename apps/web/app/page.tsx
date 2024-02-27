'use client'

import { useState } from "react";
import { useSocket } from "../context/SocketProvider"

export default function Page() {
  const { sendMessage, messages} = useSocket();
  const [message, setMessage] = useState('');

  return (
    <div>
      <div>
        <input placeholder="message" onChange={(e) => setMessage(e.target.value)} />
        <button onClick={(e) => sendMessage(message)}>Send</button>
      </div>
      <div>
        {messages.map((e) => (
          <li>{e}</li>
        ))}
      </div>
    </div>
  )
}