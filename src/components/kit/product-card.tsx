import { Package } from 'lucide-react'

import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(product.price / 100)

  const isLowStock = product.stock < 10

  return (
    <Card className="flex flex-col transition-all hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="mb-2 text-xl">{product.name}</CardTitle>
            <CardDescription className="line-clamp-2">{product.description}</CardDescription>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary">
            <Package className="w-6 h-6 text-muted-foreground" />
          </div>
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
