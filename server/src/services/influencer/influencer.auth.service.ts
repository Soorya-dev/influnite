import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Influencer } from "../../models/Influencer.model";
import { AuthDTO } from "../../dto/AuthDTO";
import { IInfluencerAuthService } from "../../core/interfaces/services/influencer/IinfluencerAuthService";
import { IInfluencer } from "../../entities/Influencer.entity";

export class InfluencerAuthService implements IInfluencerAuthService {
    async register(data: AuthDTO): Promise<IInfluencer> {
        const { email, password, name } = data;

        const existingInfluencer = await Influencer.findOne({ email });
        if (existingInfluencer) {
            throw new Error("Influencer with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newInfluencer = new Influencer({
            email,
            password: hashedPassword,
            name: name || "Influencer",
            niche: "Tech", // Default or required field, simplifying for now as per "simple just working"
        });

        return await newInfluencer.save();
    }

    async login(data: AuthDTO): Promise<{ influencer: IInfluencer; token: string }> {
        const { email, password } = data;

        const influencer = await Influencer.findOne({ email });
        if (!influencer) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, influencer.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            { id: influencer._id, role: "influencer" },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1d" }
        );

        return { influencer, token };
    }
}
