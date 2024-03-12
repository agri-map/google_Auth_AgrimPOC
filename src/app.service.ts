import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  // constructor(
  //   private userService: UserService,
  //   private authService: AuthService,
  // ) {}
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async findOrCreate(userDetails: Partial<User>): Promise<User> {
    let user = await this.userRepository.findOne({where:{ email: userDetails.email }});
    if (!user) {
      user = this.userRepository.create(userDetails);
      user = await this.userRepository.save(user);
    }
    return user;
  }
  async generateToken(user: any): Promise<string> {
    const payload = { 
        email: user.email, 
        id: user.id 
    };
    return this.jwtService.sign(payload);
  }
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    const {email, firstName, lastName, picture, accessToken} = req.user;
    const new_user = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      picture: picture,
    }
    const user = await this.findOrCreate(new_user);
    return this.generateToken(user)
  }
}
