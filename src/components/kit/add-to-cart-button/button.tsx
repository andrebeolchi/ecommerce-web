'use client'

import { LucideShoppingBasket, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { cn } from '~/lib/utils'

import { InvisibleInput } from '~/components/kit/invisible-input'
import { Button } from '~/components/ui/button'
import { LineItem } from '~/models/order'

import { addToCartAction, updateCartItemAction } from './action'

interface AddButtonProps {
  product: {
    id: number
    stock: number
  }
  cartItem?: LineItem
}

export function AddButton({ product, cartItem }: AddButtonProps) {
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1)

  const handleUpsertCart = async () => {
    if (product.stock === 0) return

    if (cartItem?.id) {
      await updateCartItemAction(cartItem.id, quantity)
      return
    }

    await addToCartAction(product.id, quantity)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    let value = parseInt(e.target.value, 10)

    if (isNaN(value) || value < 1) {
      value = 1
    }

    if (value > product.stock) {
      value = product.stock
    }

    setQuantity(value)
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center gap-2 border rounded-md">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => decrementQuantity()}
          disabled={quantity <= 1 || product.stock === 0}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <InvisibleInput
          value={quantity}
          onChange={handleInputChange}
          className="w-12 text-center font-medium"
          aria-label="Quantity"
          disabled={product.stock === 0}
        />

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => incrementQuantity()}
          disabled={quantity >= product.stock || product.stock === 0}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <Button
        className={cn('w-full cursor-pointer')}
        disabled={product.stock === 0 || quantity === cartItem?.quantity}
        onClick={handleUpsertCart}
      >
        <LucideShoppingBasket className="h-3 w-3" />
      </Button>
    </div>
  )
}
