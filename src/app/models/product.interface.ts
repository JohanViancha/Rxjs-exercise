export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: Rating
  description: string;
  image: string;
}

export interface Rating {
  rate: number;
  count: number;
}
