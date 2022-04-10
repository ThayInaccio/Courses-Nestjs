import { Body, Controller, Get, HttpCode, Param, Post, HttpStatus, Res, Patch, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import {CreateCourseDto} from './dto/create-course.dto';
import { UpdateCourseDto} from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService){}


    @Get()
    findAll(){
        return this.coursesService.findAll();
    }

    //pegar vários parametros 
    // @Get(':id')
    //  findOne(@Param() params) {
    //      return `Curso #${params.id}`
    //}

    //pegar um parametro especifico de uma lista de parametros
    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.coursesService.findOne(id);
    }

    //const apiURL: string =
    //pegar body inteiro
    //@Post()
    // create(@Body() body){
    //   return body;
    // }

   //pegar info especifica
    @Post()
    //@HttpCode(HttpStatus.NO_CONTENT)
    create(@Body() createCourseDto: CreateCourseDto){
        return this.coursesService.create(createCourseDto);
    }

    //update
    @Patch(':id')
    update(@Param('id') id:string, @Body() updateCourseDto: UpdateCourseDto){
        return this.coursesService.update(id, updateCourseDto);
    }

    //delete
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.coursesService.remove(id);
    }
}
