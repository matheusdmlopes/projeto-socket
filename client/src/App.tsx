import React from "react";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import './styles/App.css'

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="chat-content">
        <ChatBox />
      </div>
    </div>
  )
}

export default App;