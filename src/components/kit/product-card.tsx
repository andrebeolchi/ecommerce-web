import { Package } from 'lucide-react'

import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

import { Image } from './image'

interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  promotionalPrice: null
  promotionStartsAt: null
  promotionEndsAt: null
  stock: number
  createdAt: Date
  updatedAt: Date
}

interface ProductCardProps {
  product: Product
}

const formatPrice = (priceInCents: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(priceInCents / 100)
}

const getValidPrice = (product: Product) => {
  if (!product.promotionalPrice) {
    return product.price
  }

  if (!product.promotionStartsAt || !product.promotionEndsAt) {
    return product.price
  }

  const now = new Date()

  if (now >= new Date(product.promotionStartsAt) && now <= new Date(product.promotionEndsAt)) {
    return product.promotionalPrice
  }

  return product.price
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = formatPrice(getValidPrice(product))

  const isLowStock = product.stock < 10

  return (
    <Card className="flex flex-col transition-all hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="mb-2 text-xl">{product.name}</CardTitle>
            <CardDescription className="line-clamp-2">{product.description}</CardDescription>
          </div>

          <Image
            src={product.imageUrl}
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg bg-secondary items-center justify-center flex"
          >
            <Package className="w-6 h-6 text-muted-foreground" />
          </Image>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-3">
          <div>
            <p className="text-3xl font-bold text-foreground">{formattedPrice}</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={isLowStock ? 'destructive' : 'secondary'} className="font-mono">
              {product.stock} {product.stock === 1 ? 'unidade' : 'unidades'}
            </Badge>
            {isLowStock && <span className="text-xs text-muted-foreground">Estoque baixo</span>}
          </div>
        </div>
      </CardContent>

      {/* <CardFooter>
        <AddToCartButton product={product} />
      </CardFooter> */}
    </Card>
  )
}
