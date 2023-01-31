import { Router } from "express";
import PersonController from "./controllers/PersonController";

const router = Router();

const personController = new PersonController();

router.post("/api/persons", personController.create);
router.get("/api/persons", personController.getAll);
router.get("/api/persons/:id", personController.getById);
router.get("/api/info", personController.getInfo);
router.put("/api/persons/:id", personController.update);
router.delete("/api/persons/:id", personController.delete);

export { router };
