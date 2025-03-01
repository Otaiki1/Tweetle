import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import Friends from "./pages/Friends";
import Leaderboard from "./pages/Leaderboard";
import Play from "./pages/Play";
import ClassicPlay from "./pages/ClassicPlay";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="friends" element={<Friends />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="play" element={<Play />} />
                    <Route path="classic" element={<ClassicPlay />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
