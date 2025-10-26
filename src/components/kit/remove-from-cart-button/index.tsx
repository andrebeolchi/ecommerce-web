'use client'

import { LucideTrash2 } from 'lucide-react'

import { Button } from '~/components/ui/button'

import { removeFromCartAction } from './action'

export const RemoveFromCartButton = ({ id }: { id: number }) => {
  const handleRemove = () => removeFromCartAction(id)

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" onClick={() => handleRemove()}>
      <LucideTrash2 className="h-4 w-4 text-destructive" />
    </Button>
  )
}
