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
const common_1 = require("@nestjs/common");
const idea_service_1 = require("./idea.service");
let IdeaController = class IdeaController {
    constructor(ideaService) {
        this.ideaService = ideaService;
    }
    showAllIdeas() { }
    readIdea() { }
    createIdea() { }
    updateIdea() { }
    deleteIdea() { }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "showAllIdeas", null);
__decorate([
    common_1.Get(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "readIdea", null);
__decorate([
    common_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "createIdea", null);
__decorate([
    common_1.Put(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "updateIdea", null);
__decorate([
    common_1.Delete(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "deleteIdea", null);
IdeaController = __decorate([
    common_1.Controller('idea'),
    __metadata("design:paramtypes", [idea_service_1.IdeaService])
], IdeaController);
exports.IdeaController = IdeaController;
//# sourceMappingURL=idea.controller.js.map