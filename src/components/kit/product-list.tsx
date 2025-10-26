import { CatalogProduct } from '~/models/catalog'

import { ProductCard } from './product-card'

interface ProductListProps {
  products: CatalogProduct[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
