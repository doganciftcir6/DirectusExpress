import Products from "./products";
import Categories from "./categories";

// Many-to-Many junction table
interface Products_Categories {
  id: number;
  products_id: Products;
  categories_id: Categories;
}

export default Products_Categories;
