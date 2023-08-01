import Products_Categories from "./products_categories";

// collection A
interface Products {
  id: number;
  status: string;
  sort: number;
  date_created: Date;
  date_updated: Date;
  name: string;
  description: string;
  price: number;

  // relations
  m2m: number[] | Products_Categories[];
}

export default Products;
