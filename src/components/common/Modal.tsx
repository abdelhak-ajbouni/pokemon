import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Button from 'src/components/common/Button'
import TextField from 'src/components/common/TextField'
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { setIsOpen, selectIsOpen } from 'src/utils/slices/modal';
import { capturePokemon } from 'src/utils/slices/pokemon';

export default function Modal({ name }: Props) {
  const [nickname, setNickname] = useState<string>("")
  const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setIsOpen(false));
    setNickname("");
  }

  const handleCatch = () => {
    dispatch(capturePokemon({ name, nickname }));
  }

  return (

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center my-32 p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Nice you caught it!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Give your pokemon a nickname and you will be able to add it to your list.
                  </p>
                  <TextField className='mt-4 mb-8 ' onChange={setNickname} value={nickname} placeholder='nickname' />
                </div>

                <div className="mt-4">
                  <Button className='mx-1' onClick={handleClose} secondary>Cancel</Button>
                  <Button className='mx-1' onClick={() => { handleCatch(); handleClose() }} disabled={!nickname}>Add</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

type Props = {
  name: string
}