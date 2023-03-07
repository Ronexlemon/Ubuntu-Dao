import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../helpers/Dashboard";
import CreatePost from "../pages/CreatePost";
import Home from "../pages/Home";
import Trending from "../pages/Trending/Trending";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create_post" element={<CreatePost />} />  
        <Route path="/trending" element={<Trending />} />  
      </Routes>
    </Router>
  );
}

export default App;
