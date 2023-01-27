import React, { ReactNode } from 'react'

import { Menu } from '@headlessui/react'

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  href: string
  children: ReactNode
}

const DropdownMenuItem = ({ href, children }: Props) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={href}
          className={classNames(
            active ? 'bg-expresso-200 dark:bg-expresso-300' : '',
            'block px-4 py-2 text-sm'
          )}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  )
}

export default DropdownMenuItem
