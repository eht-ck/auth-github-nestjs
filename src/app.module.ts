import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github.strategy';
import { RepoController } from './repo.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'github' }),
  ],
  controllers: [AuthController, RepoController],
  providers: [GithubStrategy],
})
export class AppModule {}
