import { Component } from 'react';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import PokeSearchForm from './components/PokeSearchForm/PokeSearchForm';
import ForceError from './components/forceError/ForceError';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <ForceError />
        <ErrorBoundary>
          <PokeSearchForm />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

