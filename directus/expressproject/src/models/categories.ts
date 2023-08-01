import Products_Categories from "./products_categories";

// collection B
interface Categories {
  id: number;
  status: string;
  sort: number;
  date_created: Date;
  date_updated: Date;
  name: string;

  // relations
  m2m: number[] | Products_Categories[];
}

export default Categories;
