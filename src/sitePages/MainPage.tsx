import Pokedex from '../components/PokeSearchForm/Pokedex';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import pokemonLogo from '../assets/pokemonLogo.svg';

const MainPage = () => {
  return (
    <>
      <div>
        <img src={pokemonLogo} alt="Pokemon Logo" />
      </div>
      <ErrorBoundary>
        <Pokedex />
      </ErrorBoundary>
    </>
  );
};

export default MainPage;
