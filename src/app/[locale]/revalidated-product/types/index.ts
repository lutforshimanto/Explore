export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  rate: number;
  stock: number;
  createdAt: string;
}

export interface StockData {
  id: string;
  stock: number;
}
