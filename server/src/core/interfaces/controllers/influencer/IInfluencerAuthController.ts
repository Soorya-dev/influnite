// Interface for the Influencer Authentication Controller
// Defines the contract for handling HTTP requests
// Strictly coupled to Express (Request/Response) types, with no business logic

// server\src\core\interfaces\controllers\influencer\IInfluencerAuthController.ts
import { Request, Response } from 'express';

export interface IInfluencerAuthController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  forgotPassword(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<void>;
}
