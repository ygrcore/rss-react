import Pokedex from '../components/PokeSearchForm/Pokedex';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

const MainPage = () => {
  return (
    <>
      <ErrorBoundary>
        <Pokedex />
      </ErrorBoundary>
    </>
  );
};

export default MainPage;
