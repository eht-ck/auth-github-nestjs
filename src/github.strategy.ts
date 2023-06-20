import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: 'e47f7060759034727d7b',
      clientSecret: 'd36d9b22710ba28913f35179b375231683836f9a',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: 'repo', // Request permission to create repositories
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // You can perform additional validations or store user data here
    return { accessToken, refreshToken, profile };
  }
}
