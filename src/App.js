import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Top from './pages/Top';
import Function1 from './pages/Function1';
import Function2 from './pages/Function2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Top />} />
          <Route path="/function1" element={<Function1 />} />
          <Route path="/function2" element={<Function2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;