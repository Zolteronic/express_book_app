import userData from "../Data/users.json" assert { type: "json" };
import jwt from "jsonwebtoken";
import { Router } from "express";

const router = Router();

router.post(`/`, (req, res) => {
  const secretKey = `my-secret-key`;
  const { username, password } = req.body;
  const { users } = userData;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: `Invalid username or password` });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: `Login successful`, token });
});

export default router;
