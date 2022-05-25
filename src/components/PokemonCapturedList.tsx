import React from 'react'
import cn from 'classnames';

import Button from './common/Button';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { selectMyPokemon, releasePokemon } from 'src/utils/slices/pokemon';

export default function PokemonCapturedList({ }: Props) {
  const dispatch = useAppDispatch();
  const myPokemon = useAppSelector(selectMyPokemon);

  return (
    <ul>
      <li className='bg-neutral-800 text-neutral-100 py-2 px-4 flex justify-between items-center'>
        <div>Name</div>
        <div>Nickname</div>
        <div>Action</div>
      </li>
      {
        myPokemon.map((pokemon, index) => (
          <li key={pokemon.name} className={cn(
            'text-neutral-800 py-2 px-4 flex justify-between items-center',
            index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
          )}>
            <div>{pokemon.name}</div>
            <div>{pokemon.nickname}</div>
            <Button label='Release' onClick={() => dispatch(releasePokemon(pokemon))} />
          </li>
        ))
      }
    </ul>
  )
}

type Props = {}