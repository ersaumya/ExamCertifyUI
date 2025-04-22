import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.loadCourse();
  }
  loadCourse() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }
}
