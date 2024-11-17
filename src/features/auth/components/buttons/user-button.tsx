'use client'

import { useCurrent, useLogout } from '@/features/auth/api'
import { createAvatarFallback } from '@/features/auth/utils'
import { LoaderIcon, LogOutIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DottedSeparator } from '@/components/separators'
import React, { useCallback } from 'react'
import { toast } from 'sonner'

type Props = {
  align?: 'start' | 'center' | 'end'
}

export function UserButton({ align = 'end' }: Props) {
  const { data: user, isLoading } = useCurrent()
  const { mutate: logout } = useLogout()

  const onLogout = useCallback(() => {
    toast.info('Logging out...')
    logout()
  }, [logout])

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) return null

  const { name, email } = user
  const avatarFallback = createAvatarFallback(name, email)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 border hover:opacity-75">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center select-none">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border hover:opacity-75">
            <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center select-none">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || 'User'}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          onClick={onLogout}
          className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
        >
          <LogOutIcon className="siz-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
