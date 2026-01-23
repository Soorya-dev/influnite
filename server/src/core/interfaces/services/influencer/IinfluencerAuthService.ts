import { IInfluencer } from "../../../entities/Influencer.entity";
import { AuthDTO } from "../../../../../dto/AuthDTO";

export interface IInfluencerAuthService {
    register(data: AuthDTO): Promise<IInfluencer>;
    login(data: AuthDTO): Promise<{ influencer: IInfluencer; token: string }>;
}
