/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import cn from 'classnames'

import Container from 'src/components/common/Container'
import Modal from 'src/components/common/Modal'
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { loadMyPokemon, selectMyPokemon } from 'src/utils/slices/pokemon';
import PokemonCapturedList from 'src/components/PokemonCapturedList'


const Captured: NextPage = ({ }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const myPokemon = useAppSelector(selectMyPokemon);


  useEffect(() => {
    (() => {
      dispatch(loadMyPokemon());
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>My Pokemon</title>
        <meta name="description" content={"my pokemon page"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container title={"Captured pokemon"} onGoBack={() => router.push('/')}>
        <h1 className={cn(
          'text-neutral-800 font-bold decoration-dashed underline decoration-cyan-500',
          'text-center mt-10 mb-8',
          "text-3xl md:text-5xl"
        )}>
          You have {myPokemon.length} captured pokemon!
        </h1>
        <PokemonCapturedList />
      </Container>

      <Modal></Modal>
    </div>
  )
}

export default Captured
