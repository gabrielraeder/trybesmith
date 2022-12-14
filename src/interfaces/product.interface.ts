export interface Product {
  id?: number,
  name: string,
  amount: string,
  order_id?: number,
}

export interface ProductObjReturn {
  type: string | null,
  message: Product | string,
}