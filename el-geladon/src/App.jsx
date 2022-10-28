import { Home } from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./pages/Loading/Loading";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
