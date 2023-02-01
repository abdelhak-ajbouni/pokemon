/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import cn from 'classnames'
import 'animate.css';

import Container from 'src/components/common/Container'
import Button from 'src/components/common/Button'
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { store } from 'src/utils/store'
import {
  getAllCapturedPokemon,
  selectAllCapturedPokemon,
  selectPokemonStatus
} from 'src/utils/slices/pokemon';
// import PokemonSearch from 'src/components/PokemonSearch'
import Slider from 'src/components/common/Slider'
import PokemonSearch from 'src/components/PokemonSearch'
import PokemonCard from 'src/components/PokemonCard'

const Home: NextPage = ({ allCapturedPokemon }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const pokemonStatus = useAppSelector(selectPokemonStatus);
  const allCapturedPokemon = useAppSelector(selectAllCapturedPokemon);


  useEffect(() => {
      
  }, []);

  console.log('allCapturedPokemon =========================', allCapturedPokemon)

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container
          title='Home'
          actions={
            <Button
              label={'Your Pokemon List (' + allCapturedPokemon.length + ")"}
              onClick={() => router.push("/pokemon/captured")}
            />
          }
        >
          <h1 className={cn(
            'text-neutral-800 font-bold decoration-dashed underline decoration-cyan-500',
            'text-center mt-10 mb-8',
            "text-3xl md:text-5xl"
          )}>

          </h1>
          <div className='grid grid-cols-2'>
            <PokemonSearch />
            <Slider>
              {allCapturedPokemon.map((pokemon, index) => (
                <div key={index} className='w-60 h-64 m-auto'>
                  <PokemonCard data={pokemon.doc} />
                </div>
              ))}
            </ Slider>
          </div>
        </Container>
      </main >
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  await store.dispatch(getAllCapturedPokemon())
  return {
    props: {
      allCapturedPokemon: store.getState().pokemon.allCapturedPokemon,
    },
  }
}

export default Home
