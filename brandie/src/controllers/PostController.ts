import { Router } from "express";
import { PostService } from "../services/PostService";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateDto } from "../middlewares/validateDto";
import { CreatePostDto } from "../dto/CreatePostDto";

const postRouter = Router();

postRouter.post("/", validateDto(CreatePostDto), authMiddleware, async (req, res) => {
  const { text, mediaUrl } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Post text cannot be empty" });
  }

  try {
    const post = await PostService.create(req.user.id, text, mediaUrl);
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

postRouter.get("/feed", authMiddleware, async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const feed = await PostService.getFeed(req.user.id, limit, offset);
    res.json(feed);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

postRouter.get("/user/:id", authMiddleware, async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const posts = await PostService.getUserPosts(req.params.id, limit, offset);
    res.json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default postRouter;