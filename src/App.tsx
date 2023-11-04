import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
// import PokeSearchForm from './components/PokeSearchForm/PokeSearchForm';
import Pokedex from './components/PokeSearchForm/Pokedex';
import MainPage from './pages/MainPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
