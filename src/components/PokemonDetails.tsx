import React from 'react'

import Block from 'src/components/common/Block';
import { useAppSelector } from 'src/hooks';
import {
  selectSinglePokemon,
  selectPokemonStatus,
} from 'src/utils/slices/pokemon';


export default function PokemonDetails({ }: Props) {
  const status = useAppSelector(selectPokemonStatus);
  const currentPokemon = useAppSelector(selectSinglePokemon);
  const { types, moves, abilities } = currentPokemon || {};

  console.log('currentPokemon =========================', currentPokemon)

  return (
    <div>
      {
        status === 'loading' && (
          <div className='text-center' >Loading...</div>
        ) || (
          <div className='flex flex-col md:flex-row'>
            <Block className='md:w-1/3' classNameTitle='decoration-red-400' title='Types'>
              <ul className='mx-2'>
                {
                  types?.map(({ type }) => (
                    <li key={type.name} className='border-b py-1'>
                      {type.name}
                    </li>
                  ))
                }
              </ul>
            </Block>
            <Block className='md:w-1/3' classNameTitle='decoration-green-500' title='Moves'>
              <ul className='mx-2'>
                {
                  moves?.map(({ move }) => (
                    <li key={move.name} className='border-b py-1'>
                      {move.name}
                    </li>
                  ))
                }
              </ul>
            </Block>
            <Block className='md:w-1/3' classNameTitle='decoration-yellow-400' title='Abilities'>
              <ul className='mx-2'>
                {
                  abilities?.map(({ ability }) => (
                    <li key={ability.name} className='border-b py-1'>
                      {ability.name}
                    </li>
                  ))
                }
              </ul>
            </Block>
          </div>
        )
      }

    </div>
  )
}

type Props = {}