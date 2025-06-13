import express from "express";

import { updateUser } from "../controllers/user.controller.js";
// import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/:id", updateUser);

// router.post("/login", loginUser);
// router.get("/me", authenticate, getUser);

export default router;
