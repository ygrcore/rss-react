import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import PokeSearchForm from './components/PokeSearchForm/PokeSearchForm';

function App() {


  return (
    <div>
      <ErrorBoundary>
        <PokeSearchForm />
      </ErrorBoundary>
    </div>
  );
}

export default App;
