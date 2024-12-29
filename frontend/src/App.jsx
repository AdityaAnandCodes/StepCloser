import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateGoals from "./pages/CreateGoals";
import Goals from "./pages/Goals";
import Authentication from "./pages/Authentication";
import MyGoals from "./pages/MyGoals";

const App = () => {
  return (
    <Router>
      <main className="w-full min-h-screen inset-0">
        <Routes>
          {/* Define routes for your pages */}
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateGoals />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/authenticate" element={<Authentication />} />
          <Route path="/mygoals" element = {<MyGoals />}/>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
