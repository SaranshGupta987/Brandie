import express from "express";
import authRouter from "./controllers/AuthController";
import postRouter from "./controllers/PostController";
import followRouter from "./controllers/FollowController";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/users", followRouter);
export default router;