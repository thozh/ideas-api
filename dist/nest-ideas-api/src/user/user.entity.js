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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const idea_entity_1 = require("../idea/idea.entity");
let UserEntity = class UserEntity {
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    async comparePassword(attempt) {
        return await bcrypt.compare(attempt, this.password);
    }
    toResponseObject(showToken = true) {
        const { id, created, username, token } = this;
        const responseObject = {
            id,
            created,
            username,
        };
        if (this.ideas) {
            responseObject.ideas = this.ideas;
        }
        if (this.bookmarks) {
            responseObject.bookmarks = this.bookmarks;
        }
        if (showToken) {
            responseObject.token = token;
        }
        return responseObject;
    }
    get token() {
        const { id, username } = this;
        return jwt.sign({
            id,
            username,
        }, process.env.SECRET, { expiresIn: '7d' });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(type => idea_entity_1.IdeaEntity, idea => idea.author, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "ideas", void 0);
__decorate([
    typeorm_1.ManyToMany(type => idea_entity_1.IdeaEntity, { cascade: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], UserEntity.prototype, "bookmarks", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPassword", null);
UserEntity = __decorate([
    typeorm_1.Entity('user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map