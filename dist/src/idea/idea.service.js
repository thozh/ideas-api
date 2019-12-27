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
const idea_entity_1 = require("./idea.entity");
let IdeaService = class IdeaService {
    constructor(ideaRepository) {
        this.ideaRepository = ideaRepository;
    }
    async showAll() {
        return await this.ideaRepository.find();
    }
    async create(data) {
        const idea = this.ideaRepository.create(data);
        await this.ideaRepository.save(idea);
        return idea;
    }
    async read(id) {
        const idea = await this.ideaRepository.findOne({ where: { id } });
        if (!idea) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        return idea;
    }
    async update(id, data) {
        let idea = await this.ideaRepository.findOne({ id });
        if (!idea) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.ideaRepository.update({ id }, data);
        idea = await this.ideaRepository.findOne({ id });
        return idea;
    }
    async destroy(id) {
        const idea = await this.ideaRepository.findOne({ id });
        if (!idea) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.ideaRepository.delete({ id });
        return idea;
    }
};
IdeaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(idea_entity_1.IdeaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IdeaService);
exports.IdeaService = IdeaService;
//# sourceMappingURL=idea.service.js.map