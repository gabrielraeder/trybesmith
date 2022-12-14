export interface Order {
  id: number,
  user_id: number,
}

export interface OrderProducts {
  id: number,
  userId: number,
  productsIds?: (number | undefined)[],
}