import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";
import AppContext from "./Context";
import { useState } from "react";

function App() {
  const [data_obj, setDataObj] = useState({});
  return (
    <AppContext.Provider value={{data_obj, setDataObj}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
