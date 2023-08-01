// Directus.ts
import { createDirectus, login, rest, authentication } from "@directus/sdk";
import dotenv from "dotenv";

dotenv.config();

// The main schema type containing all collections available
interface DirectusSchema {
  products: Products[]; // regular collections are array types
  categories: Categories[];
  // junction collections are collections too
  products_categories: Products_Categories[];
}

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

// Many-to-Many junction table
interface Products_Categories {
  id: number;
  products_id: Products;
  categories_id: Categories;
}

const directusUrl = process.env.DIRECTUS_URL;
const directusEmail = process.env.DIRECTUS_EMAIL;
const directusPassword = process.env.DIRECTUS_PASSWORD;
if(!directusUrl){
    throw new Error("Please include a url");
}
if(!directusEmail){
    throw new Error("Please include a email");
}
if(!directusPassword){
    throw new Error("Please include a password");
}



export const client = createDirectus<DirectusSchema>(directusUrl)
  .with(rest())
  .with(authentication("json"));

login(directusEmail, directusPassword);
