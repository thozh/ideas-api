import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
export declare class IdeaController {
    private readonly ideaService;
    constructor(ideaService: IdeaService);
    showAllIdeas(): Promise<import("./idea.entity").IdeaEntity[]>;
    createIdea(data: IdeaDTO): Promise<import("./idea.entity").IdeaEntity>;
    readIdea(id: string): Promise<import("./idea.entity").IdeaEntity>;
    updateIdea(id: string, data: Partial<IdeaDTO>): Promise<import("./idea.entity").IdeaEntity>;
    deleteIdea(id: string): Promise<{
        deleted: boolean;
    }>;
}
