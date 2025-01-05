import express from "express";
import { queryForm } from "./query.controller.js";
const router = express.Router();

router.route("/query-form").post(queryForm);

export default router;