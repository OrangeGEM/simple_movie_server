import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { sign, decode} from 'jsonwebtoken';
import { JWT_SECRET } from "@app/config";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";
import { comparePassword, hashPassword } from "@app/common/utils";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    //Register user
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            email: createUserDto.email,
        })
        if(userByEmail) {
            throw new HttpException('Email are taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        createUserDto.password = hashPassword(createUserDto.password);
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        
        return await this.userRepository.save(newUser);
    }

    //Login user
    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne(
            { email: loginUserDto.email, },
            { select: ['id', 'email', 'password'] }
        )
        if(!user) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const isPassEquels = await comparePassword(loginUserDto.password, user.password)
        if(!isPassEquels) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        delete user.password;

        return user;
    }

    findById(id: number, options?): Promise<UserEntity> {
        return this.userRepository.findOne(id, options);
    }

    findByParams(params?): Promise<UserEntity> {
        return this.userRepository.findOne(params)
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }

    public generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            email: user.email
        }, JWT_SECRET);
    }

    public decodeJwt(token: string): any {
        return decode(token);
    }

}