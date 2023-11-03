import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
// import PokeSearchForm from './components/PokeSearchForm/PokeSearchForm';
import Pokedex from './components/PokeSearchForm/Pokedex';

import './App.css';

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        {/* <PokeSearchForm /> */}
        <Pokedex />
      </ErrorBoundary>
    </div>
  );
}

export default App;
