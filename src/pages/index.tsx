/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import cn from 'classnames'
import 'animate.css';

import Container from 'src/components/common/Container'
import Button from 'src/components/common/Button'
import Slider from 'src/components/common/Slider'
import PokemonList from 'src/components/PokemonList'
import { useAppDispatch, useAppSelector } from 'src/hooks';
import {
  getAllPokemon,
  selectMyPokemon
} from 'src/utils/slices/pokemon';
import PokemonSearch from 'src/components/PokemonSearch'

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
        <PokemonSearch />
        <PokemonList onChangePagination={(pagination) => dispatch(getAllPokemon(pagination))} />

        {/* <Slider items={[
          <div className="bg-red-500 p-9">1</div>,
          <div className="bg-red-500">2</div>,
          <div className="bg-red-500">3</div>,
          <div className="bg-red-500">4</div>,
          <div className="bg-red-500">5</div>
        ]}>
        </Slider> */}

      </Container>
    </div>
  )
}

export default Home
