import React from 'react'
import Image from 'next/image'

import Button from 'src/components/common/Button'
import { useAppSelector, useAppDispatch } from 'src/hooks';
import {
  selectSinglePokemon,
  selectPokemonStatus,
  selectMyPokemon,
  releasePokemon
} from 'src/utils/slices/pokemon';
import { setIsOpen } from 'src/utils/slices/modal';

export default function PokemonInfo({ }: Props) {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectPokemonStatus);
  const currentPokemon = useAppSelector(selectSinglePokemon);
  const myPokemon = useAppSelector(selectMyPokemon);
  const { name, base_experience, weight, height, sprites } = currentPokemon || {};

  const handleCatch = () => {
    const pokemonFound = myPokemon.find(pokemon => pokemon.name === name)
    if (pokemonFound) {
      dispatch(releasePokemon(pokemonFound));
    } else {
      dispatch(setIsOpen(true));
    }
  }

  const getLabel = () => {
    if (myPokemon.find(pokemon => pokemon.name === name)) {
      return 'Release';
    }
    return 'Catch';
  }

  return (
    <div className='flex flex-col m-2 md:flex-row'>

      <div className='border-2 text-center rounded'>
        <Image src={sprites?.front_default || "/default.png"} alt={name} width={150} height={150} />
      </div>
      <div className='py-2 px-4'>
        <h2><span className='font-bold'>Name:</span> {name}</h2>
        <p><span className='font-bold'>Base experience:</span> {base_experience}</p>
        <p><span className='font-bold'>Weight:</span> {weight}</p>
        <p><span className='font-bold'>Height:</span> {height}</p>
        <Button className='w-full my-1' label={getLabel()} onClick={handleCatch} loading={status === "loading"} />
      </div>
    </div>
  )
}

type Props = {}