import { useEffect } from 'react'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import useSound from '../hooks/useSound'
import { Pokemon } from '../utils/types'

export default function PokemonCard({ data }: { data: Pokemon | null }) {
  const { name, sprites, stats } = data || {}
  const [isPlaying, play, stop] = useSound('/sounds/coin.mp3', { delay: 500 })

  useEffect(() => {
    if (!isPlaying) {
      play()
    } else {
      stop()
      play()
    }
  }, [])

  const pokemonScore = stats?.reduce((acc, { base_stat }) => acc + base_stat, 0) || 0
  const getScoreTagColor = (score: number) => {
    if (score < 300) return 'bg-green-600'
    if (score < 500) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  return (
    <div className='inline-block m-auto animate__animated animate__jackInTheBox'>
      <div className='flex justify-between bg-neutral-800 py-2 px-4'>
        <div className='flex items-center'>
          <MdOutlineCatchingPokemon className='text-red-700 bg-white rounded-full' />
          <h2 className='text-gray-100 mx-2 capitalize'>{name}</h2>
        </div>
        <span className={`text-gray-100 px-1 ${getScoreTagColor(pokemonScore)}`}>{pokemonScore}</span>
      </div>
      <div className='border border-neutral-800 rounded-b'>
        <img
          className='animate__animated animate__flash'
          src={sprites?.front_default || "/default.png"}
          alt={name}
          width={250}
          height={250}
        />

        <ul>
          {stats?.map(({ stat, base_stat }) => (
            <li key={stat.name} className='grid grid-cols-2'>
              <span className='text-sm p-2 mt-1 bg-slate-300'>{stat.name}</span>
              <span className='text-sm p-2 mt-1 bg-slate-300'>{base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}