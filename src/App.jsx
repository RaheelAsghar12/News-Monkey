import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import News from './components/News';
import Navbar from './components/navbar';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.body.classList.add('bg-dark', 'text-light');
    else document.body.classList.remove('bg-dark', 'text-light');
  }, [darkMode]);

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Routes>
        <Route path="/" element={<News key="general" category="general" darkMode={darkMode} />} />
        <Route path="/business" element={<News key="business" category="business" darkMode={darkMode} />} />
        <Route path="/technology" element={<News key="technology" category="technology" darkMode={darkMode} />} />
        <Route path="/sports" element={<News key="sports" category="sports" darkMode={darkMode} />} />
        <Route path="/entertainment" element={<News key="entertainment" category="entertainment" darkMode={darkMode} />} />
        <Route path="/science" element={<News key="science" category="science" darkMode={darkMode} />} />
        <Route path="/health" element={<News key="health" category="health" darkMode={darkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;
