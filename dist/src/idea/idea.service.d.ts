import { Repository } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { IdeaDTO } from './idea.dto';
export declare class IdeaService {
    private ideaRepository;
    constructor(ideaRepository: Repository<IdeaEntity>);
    showAll(): Promise<IdeaEntity[]>;
    create(data: IdeaDTO): Promise<IdeaEntity>;
    read(id: string): Promise<IdeaEntity>;
    update(id: string, data: Partial<IdeaDTO>): Promise<IdeaEntity>;
    destroy(id: string): Promise<IdeaEntity>;
}
