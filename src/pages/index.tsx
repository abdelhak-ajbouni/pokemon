/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import cn from 'classnames'
import 'animate.css';

import Container from 'src/components/common/Container'
import Button from 'src/components/common/Button'
import { useAppDispatch, useAppSelector } from 'src/hooks';
import {
  getAllCapturedPokemon,
  selectCapturedPokemon,
  capturePokemon
} from 'src/utils/slices/pokemon';
import PokemonSearch from 'src/components/PokemonSearch'

const Home: NextPage = () => {
  const capturedPokemon = useAppSelector(selectCapturedPokemon);
  const dispatch = useAppDispatch();
  const router = useRouter()

  useEffect(() => {
    (() => {
      dispatch(getAllCapturedPokemon())
    })();
  }, []);

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
              label={'Your Pokemon List (' + capturedPokemon.length + ")"}
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
          <Button onClick={() => dispatch(capturePokemon({ id: 'cc', name: "dd", }))}>sss</Button>
        </Container>
      </main >
    </>
  )
}

export default Home
