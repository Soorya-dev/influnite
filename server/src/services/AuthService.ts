import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RegisterUserRequestDTO, LoginUserRequestDTO, UserResponseDTO } from "../dto/AuthDTO.js";
import { IUser } from "../entities/User.js";
import { UserMapper } from "../mappers/UserMapper.js";
import { IUserRepository } from "../repositories/interfaces/IUserRepository.js";
import { UserRepository } from "../repositories/implementations/UserRepository.js";

export class AuthService {
    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository(); // Dependency injection could be better here (inject interface)
    }

    async register(data: RegisterUserRequestDTO): Promise<UserResponseDTO> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const userCandidate: IUser = UserMapper.toEntity({
            ...data,
            password: hashedPassword,
        });

        const newUser = await this.userRepository.create(userCandidate);
        return UserMapper.toDTO(newUser);
    }

    async login(data: LoginUserRequestDTO): Promise<{ user: UserResponseDTO; token: string }> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user || !user.password) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return { user: UserMapper.toDTO(user), token };
    }
}
