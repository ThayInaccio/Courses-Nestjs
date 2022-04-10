//export class UpdateCourseDto {
//    readonly name?: string; //? propriedades opcionais
//    readonly description?: string;
//    readonly tags?: string[];
//}
import { PartialType } from "@nestjs/mapped-types";
import {CreateCourseDto} from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto){

}
