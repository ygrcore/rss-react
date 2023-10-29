import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import PokeSearchForm from './components/PokeSearchForm/PokeSearchForm';
import ForceError from './components/forceError/ForceError';

function App() {


  return (
    <div>
      <ForceError />
      <ErrorBoundary>
        <PokeSearchForm />
      </ErrorBoundary>
    </div>
  );
}

export default App;
