// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { PokemonData } from '../../types/types';
// import PokeApi from '../../services/PokeApi';
import { PokeApi } from '../../services/PokeApi';
import Spinner from '../spinner/Spinner';

const PokemonDetails = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const { pokemonName } = useParams();
  // const { getPokemon } = PokeApi();
  // const [pokemon, setPokemon] = useState<PokemonData>();

  const { data, isFetching, isLoading } = PokeApi.useGetPokemonQuery(
    pokemonName!
  );

  // useEffect(() => {
  //   // setIsLoading(true);
  //   fetchPokemon();
  // }, [pokemonName]);

  // const fetchPokemon = async () => {
  //   if (pokemonName) {
  //     // const fetchedPoke = await getPokemon(pokemonName);
  //     // setPokemon(fetchedPoke);
  //     // setPokemon(data);
  //     // setIsLoading(false);
  //   }
  // };

  return (
    <div>
      {(isLoading || isFetching) && <Spinner />}
      {isFetching ? null : (
        <>
          <h2>Pokemon Details for {data?.name}</h2>
          <img src={data?.image} alt={data?.name} />
          <p>Pokemon number: {data?.id}</p>
          <p>Pokemon name: {data?.name}</p>
          <p>Type: {data?.type}</p>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
