import "./App.css";
import Create from "./Components/create";
import Home from "./Components/home";
import View from "./Components/view";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/edit/:id" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
