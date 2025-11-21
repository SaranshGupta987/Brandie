import { Router } from "express";
import { FollowService } from "../services/FollowService";
import { authMiddleware } from "../middlewares/authMiddleware";

const followRouter = Router();

followRouter.post("/:id/follow", authMiddleware, async (req, res) => {
  try {
    const result = await FollowService.follow(req.user.id, req.params.id);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

followRouter.delete("/:id/follow", authMiddleware, async (req, res) => {
  try {
    const result = await FollowService.unfollow(req.user.id, req.params.id);
    res.status(201).send(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

followRouter.get("/:id/followers", authMiddleware, async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const followers = await FollowService.getFollowers(req.params.id, limit, offset);
    res.json(followers);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

followRouter.get("/:id/following", authMiddleware, async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const following = await FollowService.getFollowing(req.params.id, limit, offset);
    res.json(following);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default followRouter;