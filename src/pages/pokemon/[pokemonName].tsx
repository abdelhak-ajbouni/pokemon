/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from 'src/components/common/Container'
import Modal from 'src/components/common/Modal'
import PokemonDetails from 'src/components/PokemonDetails'
import PokemonInfo from 'src/components/PokemonInfo'
import { useAppDispatch } from 'src/hooks';
import { getSinglePokemon } from 'src/utils/slices/pokemon';


const Home: NextPage = ({ }) => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const { pokemonName } = router.query

  useEffect(() => {
    (() => {
      if (pokemonName) dispatch(getSinglePokemon(pokemonName as string));
    })();
  }, [pokemonName]);

  return (
    <div>
      <Head>
        <title>{pokemonName}</title>
        <meta name="description" content={pokemonName + " page"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container title={pokemonName as string} onGoBack={() => router.push('/')}>
        <PokemonInfo />
        <PokemonDetails />
      </Container>

      <Modal name={pokemonName as string}></Modal>
    </div>
  )
}

export default Home
