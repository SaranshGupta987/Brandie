import { Router } from "express";
import { AuthService } from "../services/AuthService";
import { validateDto } from "../middlewares/validateDto";
import { CreateUserDto } from "../dto/CreateUserDto";
import { LoginDto } from "../dto/LoginDto";

const router = Router();

router.post("/register", validateDto(CreateUserDto), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
    const result = await AuthService.register(name, email, password);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Registration failed" });
  }
});

router.post("/login", validateDto(LoginDto), async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message || "Login failed" });
  }
});

export default router;