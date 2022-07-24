import express from "express";
import {
  getAllCharacters,
  getOneCharacther,
  addCharacther,
  updateCharacther,
  deleteCharacther,
} from "../controllers/characters.controller.js";

const charactersRouter = express.Router();

charactersRouter.get("/", getAllCharacters);
charactersRouter.get("/:characterId", getOneCharacther);
charactersRouter.post("/create", addCharacther);
charactersRouter.put("/update/:characterId", updateCharacther);
charactersRouter.delete("/delete/:characterId", deleteCharacther);

export default charactersRouter;
