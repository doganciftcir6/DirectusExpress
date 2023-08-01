import {
  createItem,
  deleteItem,
  readItem,
  readItems,
  updateItem,
} from "@directus/sdk";
import { client } from "../util/directus";
import { Request, Response } from "express";

//GetAll
const getAllCategories = (req: Request, res: Response) => {
  client
    .request(readItems("categories"))
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
};

//GetById
const getByIdCategory = (req: Request, res: Response) => {
  const { id } = req.params;

  client
    .request(readItem("categories", id))
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    })
    .catch((err) => {
      res.status(500).json({ message: `${err}` });
    });
};

//Insert
const insertCategory = (req: Request, res: Response) => {
  const newCategory = req.body;

  client
    .request(createItem("categories", newCategory))
    .then((createdCategory) => {
      res
        .status(200)
        .json(`${createdCategory.id} Category with ID successfully added.`);
    })
    .catch((err) => {
      res.status(500).json(`${err}`);
    });
};

//Update
const updateCategory = (req: Request, res: Response) => {
  const { id, ...updatedCategoryData } = req.body;

  client
    .request(readItem("categories", id))
    .then((category) => {
      if (!category) {
        return res.status(404).json("Category not found.");
      }

      client
        .request(updateItem("categories", id, updatedCategoryData))
        .then(() => {
          res.status(200).json(`Category with ID ${id} successfully updated.`);
        })
        .catch((err) => {
          res.status(500).json(`${err}`);
        });
    })
    .catch((err) => {
      res.status(500).json(`${err}`);
    });
};

//Delete
const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;

  client
    .request(readItem("categories", id))
    .then((category) => {
      if (!category) {
        return res.status(404).json("Category not found.");
      }

      client
        .request(deleteItem("categories", id))
        .then(() => {
          res.status(200).json(`Category with ID ${id} successfully deleted.`);
        })
        .catch((err) => {
          res.status(500).json(`${err}`);
        });
    })
    .catch((err) => {
      res.status(500).json(`${err}`);
    });
};

export default {
  getAllCategories,
  getByIdCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
};
