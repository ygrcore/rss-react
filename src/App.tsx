import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

import './App.css';

function App() {
  return (
    <h1>Hello World</h1>
    // <Router>
    //   <div className="app">
    //     <Routes>
    //       <Route path="*" element={<MainPage />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
