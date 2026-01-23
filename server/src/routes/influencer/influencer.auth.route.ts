import express from "express";
import { InfluencerAuthController } from "../../controllers/influencer/influencer.auth.controller";

const router = express.Router();
const controller = new InfluencerAuthController();

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;