import { Hono } from "hono";
import { getAllUsers } from "../controllers/example.controller";
import SchoolController from "../controllers/school.controller";
const api = new Hono();
const schoolController = new SchoolController()

api.get("/users", getAllUsers)

export default api;
