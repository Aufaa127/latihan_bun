import { Hono } from "hono";

import SchoolController from "../controllers/school.controller";
import ClassesController from "../controllers/classes.controller";

const web = new Hono();

const schoolController = new SchoolController();
const classesController = new ClassesController();

web.get("/schools", schoolController.getList);
web.get("/schools/:id", schoolController.getDetail);
web.get("/class", classesController.getList);
web.get("/class/:id", classesController.getDetail);

export default web;
