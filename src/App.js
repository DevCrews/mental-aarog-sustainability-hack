import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import PHQ9 from "./pages/PHQ9";
import PHQ9Test from "./pages/PHQ9Test";
import PHQ9Result from "./pages/PHQ9Result";
// import DailyFacts from "./pages/DailyFacts";
import Thoughts from "./pages/Thoughts";
import SmartSuggest from "./pages/SmartSuggest";
import Music from "./pages/Music";
import Food from "./pages/Food";
import Travel from "./pages/Travel";
import Reading from "./pages/Reading";
import Movies from "./pages/Movies";
import Connect from "./pages/Connect";
import Patients from "./pages/Patients";
import Consultant from "./pages/Consultant";
import ConsultingDetails from "./pages/ConsultingDetails";
import TwitterAnalysis from "./pages/TwitterAnalysis";
import Activities from "./pages/Activities";
import SmartWatch from "./pages/SmartWatch";
import Meditation from "./pages/Meditation";
import Chat from "./pages/Chat";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/phq9" element={<PHQ9 />} />
        <Route path="/phq9/test" element={<PHQ9Test />} />
        <Route path="/phq9/test/result" element={<PHQ9Result />} />
        {/* <Route path="/daily-facts" element={<DailyFacts />} /> */}
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/smart-suggest" element={<SmartSuggest />} />
        <Route path="/smart-suggest/music" element={<Music />} />
        <Route path="/smart-suggest/food" element={<Food />} />
        <Route path="/smart-suggest/travel" element={<Travel />} />
        <Route path="/smart-suggest/reading" element={<Reading />} />
        <Route path="/smart-suggest/movies" element={<Movies />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/consultation" element={<Consultant />} />
        <Route path="/consultation/:email" element={<ConsultingDetails />} />
        <Route path="/twitter-analysis" element={<TwitterAnalysis />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/smart-watch" element={<SmartWatch />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
