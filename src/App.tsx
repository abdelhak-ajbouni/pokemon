import { Routes, Route, useNavigate } from 'react-router-dom'
import Container from './components/common/Container'
import Button from './components/common/Button'
import { useAppSelector } from './hooks'
import { selectAllCapturedPokemon } from './utils/slices/pokemon'
import PokemonSearch from './components/PokemonSearch'
import Slider from './components/common/Slider'
import PokemonCard from './components/PokemonCard'
import PokemonDetails from './pages/pokemon/[pokemonName]'
import Captured from './pages/pokemon/captured'

function App() {
  const navigate = useNavigate()
  const allCapturedPokemon = useAppSelector(selectAllCapturedPokemon)

  return (
    <Routes>
      <Route path="/" element={
        <Container
          title='Home'
          actions={
            <Button
              label={'Your Pokemon List (' + allCapturedPokemon.length + ")"}
              onClick={() => navigate("/pokemon/captured")}
            />
          }
        >
          <h1 className='text-neutral-800 font-bold decoration-dashed underline decoration-cyan-500 text-center mt-10 mb-8 text-3xl md:text-5xl'>
            Gotta Catch 'Em All!
          </h1>
          <div className='grid grid-cols-2'>
            <PokemonSearch />
            <Slider>
              {allCapturedPokemon.map((pokemon, index) => (
                <div key={index} className='w-60 h-64 m-auto'>
                  <PokemonCard data={pokemon.doc} />
                </div>
              ))}
            </Slider>
          </div>
        </Container>
      } />
      <Route path="/pokemon/:pokemonName" element={<PokemonDetails />} />
      <Route path="/pokemon/captured" element={<Captured />} />
    </Routes>
  )
}

export default App