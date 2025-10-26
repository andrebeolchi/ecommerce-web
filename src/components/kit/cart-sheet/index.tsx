import { getCart } from '~/adapters/api/order'

import { Sheet } from './sheet'

export async function CartSheet() {
  const cart = await getCart()

  const items = cart?.lineItems?.sort((a, b) => a.id - b.id) || []

  return <Sheet items={items} />
}
