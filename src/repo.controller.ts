import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from './types'; // Create this file to define the RequestWithUser interface
import { Request, Response } from 'express';
import * as path from 'path';
import { Octokit } from '@octokit/rest';

@Controller('repo')
export class RepoController {
    @Post('create')
    @UseGuards(AuthGuard('github'))
    async createRepo(@Req() req: RequestWithUser) {
        const user = req.user;
        if (!user || !user.accessToken) {
            throw new Error('User is not authenticated or access token is missing');
        }
        const accessToken = user.accessToken;
        try {
            const octokit = new Octokit({ auth: accessToken });
            const { data } = await octokit.repos.createForAuthenticatedUser({
                name: 'sample-repo', // Provide a name for the new repository
                description: 'This is a sample repository', // Provide a description for the new repository
            });
            console.log('New repository created:', data.html_url);
            return { message: 'Repository created successfully', url: data.html_url };
        } catch (error) {
            console.error('Error creating repository:', error);
            throw new Error('Failed to create repository');
        }
    }

    @Get('create-repo.html')
    getCreateRepoPage(@Res() res: Response) {
        const filePath = path.resolve(__dirname, '..', 'public', 'create-repo.html');
        return res.sendFile(filePath);
    }

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    githubAuthCallback(@Req() req: Request, @Res() res: Response) {
        // This method is the callback URL for GitHub authentication
        // You can access the user data from req.user and proceed with repository creation
        res.redirect('/repo/create-repo.html');
    }
}
