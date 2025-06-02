import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '../../components/common/Container'
import Modal from '../../components/common/Modal'
import PokemonDetails from '../../components/PokemonDetails'
import PokemonInfo from '../../components/PokemonInfo'
import { useAppDispatch } from '../../hooks'
import { getSinglePokemon } from '../../utils/slices/pokemon'

export default function PokemonDetailsPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pokemonName } = useParams()

  useEffect(() => {
    if (pokemonName) {
      dispatch(getSinglePokemon(pokemonName))
    }
  }, [pokemonName, dispatch])

  return (
    <div>
      <Container title={pokemonName} onGoBack={() => navigate('/')}>
        <PokemonInfo />
        <PokemonDetails />
      </Container>

      <Modal name={pokemonName || ''} />
    </div>
  )
}