import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { readFileSync } from "fs";
import { ExtractJwt, Strategy } from "passport-jwt";
import { join } from "path";
import { JWTPayload } from "../dtos/jwt-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: readFileSync(join(process.cwd(), 'private.key')),
            algorithms: ['RS256'],
        })
    }

    validate(payload: JWTPayload) {
        return payload;
    }
}