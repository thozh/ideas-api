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
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const auth_gaurd_1 = require("shared/auth.gaurd");
let CommentResolver = class CommentResolver {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async comment(id) {
        return await this.commentService.show(id);
    }
    async createComment(ideaId, comment, user) {
        const { id: userId } = user;
        const data = { comment };
        return await this.commentService.create(ideaId, userId, data);
    }
    async deleteComment(id, user) {
        const { id: userId } = user;
        return await this.commentService.destroy(id, userId);
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "comment", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, graphql_1.Args('idea')),
    __param(1, graphql_1.Args('comment')),
    __param(2, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createComment", null);
__decorate([
    graphql_1.Mutation(),
    common_1.UseGuards(new auth_gaurd_1.AuthGuard()),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Context('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "deleteComment", null);
CommentResolver = __decorate([
    graphql_1.Resolver('Comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentResolver);
exports.CommentResolver = CommentResolver;
//# sourceMappingURL=comment.resolver.js.map