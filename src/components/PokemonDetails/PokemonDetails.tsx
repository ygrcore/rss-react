import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonData } from '../../types/types';
import PokeApi from '../../services/PokeApi';

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const { getPokemon } = PokeApi();
  const [pokemon, setPokemon] = useState<PokemonData>();

  useEffect(() => {
    fetchPokemon();
  }, [pokemonName]);

  const fetchPokemon = async () => {
    if (pokemonName) {
      const fetchedPoke = await getPokemon(pokemonName);
      setPokemon(fetchedPoke);
    }
  };

  return (
    <div>
      <h2>Pokemon Details for {pokemonName}</h2>
      <img src={pokemon?.image} alt={pokemon?.name} />
      <p>Pokemon number: {pokemon?.id}</p>
      <p>Pokemon name: {pokemon?.name}</p>
      <p>Type: {pokemon?.type}</p>
    </div>
  );
};

export default PokemonDetails;
