'use client'

import { ShoppingCart } from 'lucide-react'

import { AddButton } from '~/components/kit/add-to-cart-button/button'
import { RemoveFromCartButton } from '~/components/kit/remove-from-cart-button'
import { Button } from '~/components/ui/button'
import { Sheet as CNSheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'
import { LineItem } from '~/models/order'

interface CartSheetProps {
  items: LineItem[]
}

export function Sheet({ items }: CartSheetProps) {
  const total = items.reduce((sum, item) => sum + +item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CNSheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent cursor-pointer">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl">Carrinho de Compras</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-12rem)]">
          {items.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <p className="text-lg font-medium text-foreground">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground">Adicione produtos para começar</p>
            </div>
          )}

          {items.length > 0 && (
            <>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex flex-col gap-3 p-3 rounded-lg border bg-card">
                    <div className="flex-1 flex flex-row">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{item.itemName}</h3>
                        <p className="text-lg font-bold text-primary">R$ {(+item.price / 100).toFixed(2)}</p>
                      </div>

                      <RemoveFromCartButton id={item.id} />
                    </div>

                    <AddButton product={{ id: item.productId, stock: item.availability }} cartItem={item} />
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 mt-3 space-y-3">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-2xl text-primary">R$ {(total / 100).toFixed(2)}</span>
                </div>

                {/* <ProceedToCheckoutButton /> */}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </CNSheet>
  )
}
