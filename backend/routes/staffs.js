import express from "express";
import {
    addStaffs,
    deleteStaffs,
    getStaffs,
    updateStaffs,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getStaffs);
router.post("/", addStaffs);
router.put("/", updateStaffs);
router.delete("/:id", deleteStaffs);