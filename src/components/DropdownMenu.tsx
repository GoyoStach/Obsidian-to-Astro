import React, { Fragment } from 'react'

import DropdownMenuItem from './DropdownMenuItem'
import { IoMenu } from 'react-icons/io5/index.js'
import { Menu } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { zoomIn } from '../utils/motion'

interface Props {
  tags: string[]
}

const DropdownMenu = ({ tags }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          aria-label="menu"
          className="inline-flex justify-center rounded-md border border-expresso-400 dark:border-expresso-100 text-expresso-400 dark:text-expresso-100 p-2 text-sm font-medium shadow-sm hover:bg-expresso-200 dark:hover:bg-expresso-300 focus:outline-none focus:ring-2 focus:ring-expresso-200 focus:dark:ring-expresso-300 focus:ring-offset-2 focus:ring-offset-expresso-100 transition-all"
        >
          <IoMenu className="h-5 w-5" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-expresso-300 dark:border-expresso-100 bg-expresso-100 dark:bg-expresso-400 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-expresso-500 dark:divide-expresso-100">
          <div className="py-1">
            <div className="px-3 py-2 uppercase font-bold text-xs ">
              Categories
            </div>
            {tags.map((tag, index) => {
              return (
                <motion.div
                  key={tag}
                  variants={zoomIn(index * 0.1, 0.3)}
                  initial="hidden"
                  whileInView={'show'}
                >
                  <DropdownMenuItem
                    key={tag}
                    href={`/categories/${tag.toLowerCase()}`}
                  >
                    {tag}
                  </DropdownMenuItem>
                </motion.div>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownMenu
