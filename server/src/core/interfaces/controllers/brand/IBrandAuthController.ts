// core/interfaces/controllers/brand/IBrandAuthController.ts
import type { Request, Response } from 'express';

export interface IBrandAuthController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    forgotPassword(req: Request, res: Response): Promise<void>;
    resetPassword(req: Request, res: Response): Promise<void>;
}
