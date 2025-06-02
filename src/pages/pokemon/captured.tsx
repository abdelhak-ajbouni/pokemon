import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/common/Container'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { loadMyPokemon, selectMyPokemon } from '../../utils/slices/pokemon'
import PokemonCapturedList from '../../components/PokemonCapturedList'

export default function Captured() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const myPokemon = useAppSelector(selectMyPokemon)

  useEffect(() => {
    dispatch(loadMyPokemon())
  }, [dispatch])

  return (
    <div>
      <Container title="Captured pokemon" onGoBack={() => navigate('/')}>
        <h1 className='text-neutral-800 font-bold decoration-dashed underline decoration-cyan-500 text-center mt-10 mb-8 text-3xl md:text-5xl'>
          You have {myPokemon.length} captured pokemon!
        </h1>
        <PokemonCapturedList />
      </Container>
    </div>
  )
}