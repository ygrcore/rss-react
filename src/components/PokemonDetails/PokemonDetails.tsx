import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonData } from '../../types/types';
import PokeApi from '../../services/PokeApi';
import Spinner from '../spinner/Spinner';

const PokemonDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { pokemonName } = useParams();
  const { getPokemon } = PokeApi();
  const [pokemon, setPokemon] = useState<PokemonData>();

  useEffect(() => {
    setIsLoading(true);
    fetchPokemon();
  }, [pokemonName]);

  const fetchPokemon = async () => {
    if (pokemonName) {
      const fetchedPoke = await getPokemon(pokemonName);
      setPokemon(fetchedPoke);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2>Pokemon Details for {pokemonName}</h2>
          <img src={pokemon?.image} alt={pokemon?.name} />
          <p>Pokemon number: {pokemon?.id}</p>
          <p>Pokemon name: {pokemon?.name}</p>
          <p>Type: {pokemon?.type}</p>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
