import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePost from "../pages/CreatePost";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create_post" element={<CreatePost />} />  
      </Routes>
    </Router>
  );
}

export default App;
