import { useState, useEffect } from 'react';

import PokemonCard from './PokemonCard';
import Button from './common/Button';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { getRandomPokemon, selectRandomPokemon, capturePokemon } from 'src/utils/slices/pokemon';

export default function PokemonCapturedList({ }: Props) {
  const [isNew, setIsNew] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const randomPokemon = useAppSelector(selectRandomPokemon);
  const { id } = randomPokemon || {};
  const hidden = isNew && id;

  useEffect(() => {
    setIsNew(true)
  }, [id]);

  return (
    <div className='w-60 h-64 m-auto'>
      <Button label='Search' onClick={() => { setIsNew(false); dispatch(getRandomPokemon()) }} />
      {hidden && <PokemonCard data={randomPokemon} />}
      <Button label='Try to capture' onClick={() => { setIsNew(false); dispatch(capturePokemon(randomPokemon)) }} />
    </div>
  )
}

type Props = {}