import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Top from "./pages/Top";
import MINUTES_SUMMARY from "./pages/001_MINUTES_SUMMARY";
import EMAIL_REPLY from "./pages/002_EMAIL_REPLY";
import SURVEY_DESIGN from "./pages/003_SURVEY_DESIGN";
import ICH_CHAT from "./pages/004_ICH_CHAT";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Top />} />
          <Route path="/001_MINUTES_SUMMARY" element={<MINUTES_SUMMARY />} />
          <Route path="/002_EMAIL_REPLY" element={<EMAIL_REPLY />} />
          <Route path="/003_SURVEY_DESIGN" element={<SURVEY_DESIGN />} />
          <Route path="/004_ICH_CHAT" element={<ICH_CHAT />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
