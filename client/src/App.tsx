import React from "react";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import './styles/App.css'

const App: React.FC = () => {
  return (
    <div className="container-fluid d-flex flex-column vh-100 bg-secondary">
      <Header />
      <ChatBox />
    </div>
  )
}

export default App;