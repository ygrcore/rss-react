import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import PokeSearchForm from './components/PokeSearchForm/PokeSearchForm';

import './App.css';

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <PokeSearchForm />
      </ErrorBoundary>
    </div>
  );
}

export default App;
