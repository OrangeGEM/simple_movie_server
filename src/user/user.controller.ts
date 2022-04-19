import { Body, Controller, Get, Module, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UserResponseInterface } from "./types/userResponse.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { User } from "./decorators/user.decorator";
import { AuthGuard } from "./guards/auth.guard";
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginUserWithGoogleDto } from "./dto/loginUserWithGoogle.dto";


@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService, 
    ) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    @ApiBody({ type: CreateUserDto })
    @ApiTags("User")
    @ApiResponse({ status: 201, description:"User create"})
    @ApiResponse({ status: 400, description:"Validation failed" })
    @ApiResponse({ status: 422, description:"Email are taken" })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    @ApiBody({ type: LoginUserDto })
    @ApiTags("User")
    @ApiResponse({ status: 201, description:"User login"})
    @ApiResponse({ status: 422, description:"Credentials are not valid" })
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.loginUser(loginUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Get()
    @UseGuards(AuthGuard)
    @ApiTags("User")
    @ApiResponse({ status: 200, description:"User get"})
    @ApiResponse({ status: 401, description:"Not authorized" })
    @ApiHeader({
        name:"authorization",
        description:"JWT Token"
    })
    async currentUser(@User() user: UserEntity): Promise<UserEntity> {
        return user;
    }

    @Post('login/google')
    async loginWithGoogle(@Body() loginUserWithGoogleDto: LoginUserWithGoogleDto): Promise<any> { //TODO: delete any
        const user = await this.userService.loginUserWithGoogle(loginUserWithGoogleDto);
        return this.userService.buildUserResponse(user);
    }
} 