/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io"

import Button from './common/Button';
import { useAppSelector } from 'src/hooks';
import {
  selectAllPokemon
} from 'src/utils/slices/pokemon';

export default function PokemonList({ onChangePagination }: Props) {
  const [pagination, setPagination] = useState<Pagination>({ offset: 0, limit: 10 });
  const router = useRouter()
  const allPokemon = useAppSelector(selectAllPokemon);

  useEffect(() => {
    if (pagination.offset !== 0) {
      onChangePagination(pagination);
    }
  }, [pagination]);

  const handleClick = (name: string) => {
    router.push('/pokemon/' + name)
  }

  const handleChangePagination = (direction: string) => {
    if (direction === 'next') {
      setPagination({ ...pagination, offset: pagination.offset + pagination.limit });
    } else if (direction === 'prev' && pagination.offset > 0) {
      setPagination({ ...pagination, offset: pagination.offset - pagination.limit });
    }
  }

  return (
    <div>
      <ul className='border'>
        {allPokemon?.map(({ name }, index) => (
          <li id={name} key={name} className={cn(
            'text-neutral-800 py-2 px-4 flex justify-between items-center',
            index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
          )}>
            <span>{name}</span>
            <Button onClick={() => handleClick(name)} label='Details' />
          </li>
        ))}
      </ul>
      <div className='flex justify-end mx-4'>
        <IoMdArrowRoundBack className='my-2 mx-1 bg-neutral-200 p-1 rounded-full cursor-pointer' size={20} onClick={() => handleChangePagination("prev")} />
        <IoMdArrowRoundForward className='my-2 mx-1 bg-neutral-200 p-1 rounded-full cursor-pointer' size={20} onClick={() => handleChangePagination("next")} />
      </div>
    </div>
  )
}

type Props = {
  onChangePagination: (pagination: Pagination) => void
}
type Pagination = {
  offset: number;
  limit: number;
}