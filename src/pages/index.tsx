/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import cn from 'classnames'

import Container from 'src/components/common/Container'
import Button from 'src/components/common/Button'
import PokemonList from 'src/components/PokemonList'
import { useAppDispatch, useAppSelector } from 'src/hooks';
import {
  getAllPokemon,
  selectMyPokemon
} from 'src/utils/slices/pokemon';

const Home: NextPage = () => {
  const myPokemon = useAppSelector(selectMyPokemon);
  const dispatch = useAppDispatch();
  const router = useRouter()

  useEffect(() => {
    (() => {
      dispatch(getAllPokemon({ limit: 10, offset: 0 }));
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        title='Home'
        actions={
          <Button
            label={'Your Pokemon List (' + myPokemon.length + ")"}
            onClick={() => router.push("/pokemon/captured")}
          />
        }
      >
        <h1 className={cn(
          'text-neutral-800 font-bold decoration-dashed underline decoration-cyan-500',
          'text-center mt-10 mb-8',
          "text-3xl md:text-5xl"
        )}>
          Gotta Catch &apos;Em All!
        </h1>
        <PokemonList onChangePagination={(pagination) => dispatch(getAllPokemon(pagination))} />
      </Container>
    </div>
  )
}

export default Home
