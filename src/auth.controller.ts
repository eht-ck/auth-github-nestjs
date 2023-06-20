import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    @Get('github')
    @UseGuards(AuthGuard('github'))
    githubAuth() {
        // This method redirects the user to the GitHub authentication page
        // No code changes needed here
    }

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    githubAuthCallback(@Req() req: Request, @Res() res: Response) {
        // This method is the callback URL for GitHub authentication
        // You can access the user data from req.user and proceed with repository creation
        res.redirect('http://localhost:3000/create-repo.html'); // Replace with your frontend URL
    }
}
