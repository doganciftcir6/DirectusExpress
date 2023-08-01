// Directus.ts
import { createDirectus, login, rest, authentication } from "@directus/sdk";
import dotenv from "dotenv";
import Products from "../models/products";
import Categories from "../models/categories";
import Products_Categories from "../models/products_categories";

dotenv.config();

// The main schema type containing all collections available
interface DirectusSchema {
  products: Products[]; // regular collections are array types
  categories: Categories[];
  // junction collections are collections too
  products_categories: Products_Categories[];
}

const directusUrl = process.env.DIRECTUS_URL;
const directusEmail = process.env.DIRECTUS_EMAIL;
const directusPassword = process.env.DIRECTUS_PASSWORD;
if (!directusUrl) {
  throw new Error("Please include a url");
}
if (!directusEmail) {
  throw new Error("Please include a email");
}
if (!directusPassword) {
  throw new Error("Please include a password");
}

export const client = createDirectus<DirectusSchema>(directusUrl)
  .with(rest())
  .with(authentication("json"));

login(directusEmail, directusPassword);
