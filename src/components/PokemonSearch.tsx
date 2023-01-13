import { useState, useEffect } from 'react';

import PokemonCard from './PokemonCard';
import Button from './common/Button';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { selectRandomPokemon, getRandomPokemon } from 'src/utils/slices/pokemon';

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
    <div className='w-60 m-auto'>
      <Button label='Search' onClick={() => { setIsNew(false); dispatch(getRandomPokemon()) }} />
      {hidden && <PokemonCard data={randomPokemon} />} 
    </div>
  )
}

type Props = {}