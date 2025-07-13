import { ENV_CONFIG } from '@config/default';
import { LoginCredentialsDto } from '@shared/DTO/auth.dto';
import { JwtAuthenticatedUserDto, UserDto } from '@shared/DTO/user.dto';
import { NextFunction, Request, Response, Router } from 'express';
import { AuthService } from '@services/auth-service';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '@middleware/auth-middleware';

// --------------------------------------------------------------

export class AuthController {
    private readonly authService;
    public readonly authRouter;
    private readonly authMiddleware = authMiddleware; //TODO istestirat tokene

    constructor() {
        this.authRouter = Router();
        this.authService = new AuthService();

        this.authRouter.post('/register', this.register.bind(this));
        this.authRouter.post('/login', this.login.bind(this));
        this.authRouter.post('/logout', this.authMiddleware, this.logout.bind(this));
        this.authRouter.get('/refresh-token', this.refreshToken.bind(this));
        this.authRouter.get('/check', this.checkIsAuthenticated.bind(this));
    }

    private async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: UserDto = req.body;
            const user = await this.authService.register(userData);

            // after creating user from registration process, log him in
            const authData: LoginCredentialsDto = { username: userData.username, password: userData.password };
            const { accessToken, refreshToken } = await this.authService.login(authData);

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // maxAge is in milliseconds, so it is 1 day
            res.status(201).json({ message: 'Korisnik uspješno kreiran', accessToken, user });
        } catch (error) {
            next(error);
        }
    }

    private async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userAuthData: LoginCredentialsDto = req.body;
            const { user, accessToken, refreshToken } = await this.authService.login(userAuthData);

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // maxAge is in milliseconds, so it is 1 day
            res.status(200).json({ user, accessToken });
        } catch (error) {
            next(error);
        }
    }

    private logout(req: Request, res: Response, next: NextFunction) {
        try {
            const cookies = req.cookies;
            if (!cookies?.jwt) {
                res.sendStatus(204);
                return;
            }

            res.clearCookie('jwt', { httpOnly: true });
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    private refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const cookies = req.cookies;
            if (!cookies?.jwt) {
                res.sendStatus(403);
                return;
            }

            const refreshToken = cookies.jwt;

            jwt.verify(
                refreshToken,
                ENV_CONFIG.REFRESH_TOKEN_SECRET,
                // @ts-ignore
                (err: Error, decoded: JwtAuthenticatedUserDto) => {
                    if (err) {
                        return res.sendStatus(403);
                    }
                    const accessToken = jwt.sign({
                        id: decoded.id,
                        role_id: decoded.role_id,
                    }, ENV_CONFIG.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                    res.json({ accessToken });
                }
            );
        } catch (error) {
            next(error);
        }
    }

    private checkIsAuthenticated(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];

            if (!authHeader) {
                res.sendStatus(401);

                return;
            }

            const token = authHeader?.split(' ')[1];

            jwt.verify(
                token,
                ENV_CONFIG.ACCESS_TOKEN_SECRET,
                // @ts-ignore
                async (err: Error, decoded: JwtAuthenticatedUserDto) => {
                    if (err) {
                        return res.sendStatus(401);
                    }

                    req.user = decoded;

                    const userId = decoded.id;
                    const user = await this.authService.checkIsAuthenticated(userId);

                    res.json({ user });
                },
            );
        } catch (error) {
            next(error);
        }
    }
}
