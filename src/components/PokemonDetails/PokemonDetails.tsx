// import { useParams } from 'react-router-dom';
import { PokeApi } from '../../services/PokeApi';
import Spinner from '../spinner/Spinner';

const PokemonDetails = () => {
  // const { pokemonName } = useParams();
  const pokemonName = 'pikachu';

  const { data, isFetching, isLoading } = PokeApi.useGetPokemonQuery(
    pokemonName!
  );

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
