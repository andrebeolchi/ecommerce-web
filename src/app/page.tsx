import { getAllProducts } from '~/adapters/api/catalog'
import { ProductList } from '~/components/kit/product-list'

export default async function Home() {
  const products = await getAllProducts()

  return (
    <div className="flex flex-col flex-1 p-3 py-12 gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Catálogo de Produtos</h1>
        <p className="text-muted-foreground text-lg">Explore nossa coleção de produtos disponíveis</p>
      </div>

      <div className="max-w-6xl">
        <ProductList products={products} />
      </div>
    </div>
  )
}
