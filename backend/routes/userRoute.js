import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getProfile,
  followUnFollowUser,
  getSuggestedUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:username", getProfile, protectRoute);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.get("/suggested", protectRoute, getSuggestedUser);
router.post("/update", protectRoute, updateUser);

export default router;
