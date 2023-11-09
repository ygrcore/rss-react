import Pokedex from '../components/PokeSearchForm/Pokedex';
import { PokedexProvider } from '../components/PokedexContext/PokedexContext';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';

const MainPage = () => {
  return (
    <>
      <PokedexProvider>
        <ErrorBoundary>
          <Pokedex />
        </ErrorBoundary>
      </PokedexProvider>
    </>
  );
};

export default MainPage;
