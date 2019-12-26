import { IdeaEntity } from '../idea/idea.entity';
import { UserRO } from './user.dto';
export declare class UserEntity {
    id: string;
    created: Date;
    username: string;
    password: string;
    ideas: IdeaEntity[];
    bookmarks: IdeaEntity[];
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
    toResponseObject(showToken?: boolean): UserRO;
    private get token();
}
