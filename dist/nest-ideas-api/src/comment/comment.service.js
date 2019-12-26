"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const idea_entity_1 = require("../idea/idea.entity");
const user_entity_1 = require("../user/user.entity");
const comment_entity_1 = require("./comment.entity");
let CommentService = class CommentService {
    constructor(commentRepository, ideaRepository, userRepository) {
        this.commentRepository = commentRepository;
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
    }
    toResponseObject(comment) {
        return Object.assign(Object.assign({}, comment), { author: comment.author && comment.author.toResponseObject() });
    }
    async showByIdea(ideaId, page = 1) {
        const comments = await this.commentRepository.find({
            where: { idea: { id: ideaId } },
            relations: ['author', 'idea'],
            take: 25,
            skip: 25 * (page - 1),
        });
        return comments.map(comment => this.toResponseObject(comment));
    }
    async showByUser(userId, page = 1) {
        const comments = await this.commentRepository.find({
            where: { author: { id: userId } },
            relations: ['author', 'idea'],
            take: 25,
            skip: 25 * (page - 1),
        });
        return comments.map(comment => this.toResponseObject(comment));
    }
    async show(id) {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['author', 'idea'],
        });
        return this.toResponseObject(comment);
    }
    async create(ideaId, userId, data) {
        const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const comment = await this.commentRepository.create(Object.assign(Object.assign({}, data), { idea, author: user }));
        await this.commentRepository.save(comment);
        return this.toResponseObject(comment);
    }
    async destroy(id, userId) {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['author', 'idea'],
        });
        if (comment.author.id !== userId) {
            throw new common_1.HttpException('You do not own this comment', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.commentRepository.remove(comment);
        return this.toResponseObject(comment);
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(comment_entity_1.CommentEntity)),
    __param(1, typeorm_1.InjectRepository(idea_entity_1.IdeaEntity)),
    __param(2, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map