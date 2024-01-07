"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSemesterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_semester_dto_1 = require("./create-semester.dto");
class UpdateSemesterDto extends (0, mapped_types_1.PartialType)(create_semester_dto_1.CreateSemesterDto) {
}
exports.UpdateSemesterDto = UpdateSemesterDto;
//# sourceMappingURL=update-semester.dto.js.map