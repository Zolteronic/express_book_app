import getUserOrders from "../Services/users/getUserOrders.js";
import NotFoundErrorHandler from "../Middleware/notFoundErrorHandler.js";
import { Router } from "express";

const router = Router();

router.get(
  "/:id/orders",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userOrders = await getUserOrders(id);

      res.status(200).json(userOrders);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

export default router;
