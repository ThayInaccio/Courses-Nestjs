import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import{ CreateCourseDto} from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto'

@Injectable()
export class CoursesService {
   // private courses: Course[] = [
   //     {
   //         id:1,
   //         name: "Fundamentos do framework Nestjs",
   //         description: "Fundamentos do framework Nestjs",
   //         tags: ["node.js", "javascript"]
   //     }
   // ];
   constructor(
       @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
   ){}

    findAll(){
        return this.courseRepository.find();
    }

    findOne(id: string){
       // const course = this.courses.find((course) => course.id === Number(id));
       //usando o typeOrm 
       const course = this.courseRepository.findOne(id);
        
        if(!course){
            throw new NotFoundException(
                `Course ID ${id} not found`
            );
        }
    }

    create(createCourseDto: CreateCourseDto){
        const course = this.courseRepository.create(createCourseDto);
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto){
        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
        });
        if(!course){
            throw new NotFoundException(`Course ID ${id} not found`)
        }

        return this.courseRepository.save(course);
        //const indexCourse = this.courses.findIndex(course => course.id === Number(id));
        //this.courses[indexCourse] = updateCourseDto;
    }

    async remove(id: string){
      //  const indexCourse = this.courses.findIndex((course: Course) => course.id === Number(id),);
     
      const course = await this.courseRepository.findOne(id);
      if(!course){
        throw new NotFoundException(`Course ID ${id} not found`);
    }
    return this.courseRepository.remove(course);


        //if(indexCourse > 0){
        //    this.courses.splice(indexCourse, 1);
        //}
    }
}
