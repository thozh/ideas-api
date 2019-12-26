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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const votes_enum_1 = require("../shared/votes.enum");
const idea_entity_1 = require("./idea.entity");
const app_gateway_1 = require("app.gateway");
let IdeaService = class IdeaService {
    constructor(ideaRepository, userRepository, gateway) {
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
        this.gateway = gateway;
    }
    ideaToResponseObject(idea) {
        const responseObject = Object.assign(Object.assign({}, idea), { author: idea.author ? idea.author.toResponseObject(false) : null });
        if (idea.upvotes) {
            responseObject.upvotes = idea.upvotes.length;
        }
        if (idea.downvotes) {
            responseObject.downvotes = idea.downvotes.length;
        }
        return responseObject;
    }
    ensureOwnership(idea, userId) {
        if (idea.author.id !== userId) {
            throw new common_1.HttpException('Incorrect User', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async vote(idea, user, vote) {
        const opposite = vote === votes_enum_1.Votes.UP ? votes_enum_1.Votes.DOWN : votes_enum_1.Votes.UP;
        if (idea[opposite].filter(voter => voter.id === user.id).length > 0 ||
            idea[vote].filter(voter => voter.id === user.id).length > 0) {
            idea[opposite] = idea[opposite].filter(voter => voter.id !== user.id);
            idea[vote] = idea[vote].filter(voter => voter.id !== user.id);
            await this.ideaRepository.save(idea);
        }
        else if (idea[vote].filter(voter => voter.id === user.id).length < 1) {
            idea[vote].push(user);
            await this.ideaRepository.save(idea);
        }
        else {
            throw new common_1.HttpException('Unable to cast vote', common_1.HttpStatus.BAD_REQUEST);
        }
        return idea;
    }
    async showAll(page = 1, newest) {
        const ideas = await this.ideaRepository.find({
            relations: ['author', 'upvotes', 'downvotes', 'comments'],
            take: 25,
            skip: 25 * (page - 1),
            order: newest && { created: 'DESC' },
        });
        return ideas.map(idea => this.ideaToResponseObject(idea));
    }
    async read(id) {
        const idea = await this.ideaRepository.findOne({
            where: { id },
            relations: ['author', 'upvotes', 'downvotes', 'comments'],
        });
        if (!idea) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.ideaToResponseObject(idea);
    }
    async create(userId, data) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const idea = await this.ideaRepository.create(Object.assign(Object.assign({}, data), { author: user }));
        await this.ideaRepository.save(idea);
        this.gateway.wss.emit('newIdea', idea);
        return this.ideaToResponseObject(idea);
    }
    async update(id, userId, data) {
        let idea = await this.ideaRepository.findOne({
            where: { id },
            relations: ['author', 'upvotes', 'downvotes', 'comments'],
        });
        if (!idea) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        this.ensureOwnership(idea, userId);
        await this.ideaRepository.update({ id }, data);
        idea = await this.ideaRepository.findOne({
            where: { id },
            relations: ['author', 'upvotes', 'downvotes', 'comments'],
        });
        return this.ideaToResponseObject(idea);
    }
    async destroy(id, userId) {
        const idea = await this.ideaRepository.findOne({
            where: { id },
            relations: ['author'],
        });
        if (!idea) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        this.ensureOwnership(idea, userId);
        await this.ideaRepository.remove(idea);
        return this.ideaToResponseObject(idea);
    }
    async upvote(id, userId) {
        let idea = await this.ideaRepository.findOne({
            where: { id },
            relations: ['author', 'upvotes', 'downvotes', 'comments'],
        });
        const user = await this.userRepository.findOne({ where: { id: userId } });
        idea = await this.vote(idea, user, votes_enum_1.Votes.UP);
        return this.ideaToResponseObject(idea);
    }
    async downvote(id, userId) {
        let idea = await this.ideaRepository.findOne({
            where: { id },
            relations: ['author', 'upvotes', 'downvotes', 'comments'],
        });
        const user = await this.userRepository.findOne({ where: { id: userId } });
        idea = await this.vote(idea, user, votes_enum_1.Votes.DOWN);
        return this.ideaToResponseObject(idea);
    }
    async bookmark(id, userId) {
        const idea = await this.ideaRepository.findOne({ where: { id } });
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['bookmarks'],
        });
        if (user.bookmarks.filter(bookmark => bookmark.id === idea.id).length < 1) {
            user.bookmarks.push(idea);
            await this.userRepository.save(user);
        }
        else {
            throw new common_1.HttpException('Idea already bookmarked ', common_1.HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject(false);
    }
    async unbookmark(id, userId) {
        const idea = await this.ideaRepository.findOne({ where: { id } });
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['bookmarks'],
        });
        if (user.bookmarks.filter(bookmark => bookmark.id === idea.id).length > 0) {
            user.bookmarks = user.bookmarks.filter(bookmark => bookmark.id !== idea.id);
            await this.userRepository.save(user);
        }
        else {
            throw new common_1.HttpException('Cannot remove bookmark', common_1.HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject(false);
    }
};
IdeaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(idea_entity_1.IdeaEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, typeof (_a = typeof app_gateway_1.AppGateway !== "undefined" && app_gateway_1.AppGateway) === "function" ? _a : Object])
], IdeaService);
exports.IdeaService = IdeaService;
//# sourceMappingURL=idea.service.js.map