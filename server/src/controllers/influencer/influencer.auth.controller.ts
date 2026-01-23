import { Request, Response } from "express";
import { InfluencerAuthService } from "../../services/influencer/influencer.auth.service";

export class InfluencerAuthController {
    private authService: InfluencerAuthService;

    constructor() {
        this.authService = new InfluencerAuthService();
    }

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const influencer = await this.authService.register(req.body);
            res.status(201).json(influencer);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { influencer, token } = await this.authService.login(req.body);
            res.status(200).json({ influencer, token });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    };
}
