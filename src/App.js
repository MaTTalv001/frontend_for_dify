import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './pages/Top';
import Function1 from './pages/Function1';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-100">
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/function1" element={<Function1 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;