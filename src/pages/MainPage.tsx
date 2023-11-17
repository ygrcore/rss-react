import Pokedex from '../components/PokeSearchForm/Pokedex';
// import { PokedexProvider } from '../components/PokedexContext/PokedexContext';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import pokemonLogo from '../assets/pokemonLogo.svg';

const MainPage = () => {
  return (
    <>
      <div>
        <img src={pokemonLogo} alt="Pokemon Logo" />
      </div>
      {/* <PokedexProvider> */}
      <ErrorBoundary>
        <Pokedex />
      </ErrorBoundary>
      {/* </PokedexProvider> */}
    </>
  );
};

export default MainPage;
