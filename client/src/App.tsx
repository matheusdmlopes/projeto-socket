import React from "react";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";

const App: React.FC = () => {
  return (
    <div className="container-fluid d-flex flex-column vh-100 bg-light">
      <Header />
      <ChatBox />
    </div>
  )
}

export default App;