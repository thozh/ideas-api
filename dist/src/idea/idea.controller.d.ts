import { IdeaService } from './idea.service';
export declare class IdeaController {
    private readonly ideaService;
    constructor(ideaService: IdeaService);
    showAllIdeas(): void;
    readIdea(): void;
    createIdea(): void;
    updateIdea(): void;
    deleteIdea(): void;
}
