import { IUser } from "../entities/User.js";
import { RegisterUserRequestDTO, UserResponseDTO } from "../dto/AuthDTO.js";

export class UserMapper {
    static toDTO(user: IUser): UserResponseDTO {
        return {
            id: user.id || "",
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }

    static toEntity(dto: RegisterUserRequestDTO): IUser {
        return {
            name: dto.name,
            email: dto.email,
            password: dto.password,
            role: dto.role,
        };
    }
}
