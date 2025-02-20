import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lesson-generator',
  templateUrl: './lesson-generator.component.html',
  styleUrls: ['./lesson-generator.component.css']
})
export class LessonGeneratorComponent {
  gradeLevels: string[] = [];
  subjects: string[] = [];

  selectedGrade: string = '';
  selectedSubject: string = '';
  interests: string = '';
  learningStyle: string = '';
  duration: number | null = null;

  generatedLesson: any = null; // will store the returned lesson

  loading = false;
  errorMsg = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Get grades and subjects from the API
    this.http.get<string[]>('/api/lessons/grades').subscribe(
      (data) => this.gradeLevels = data,
      (error) => console.error(error)
    );

    this.http.get<string[]>('/api/lessons/subjects').subscribe(
      (data) => this.subjects = data,
      (error) => console.error(error)
    );
  }

  generateLesson() {
    this.loading = true;
    this.errorMsg = '';
    this.generatedLesson = null;

    const body = {
      grade: this.selectedGrade,
      subject: this.selectedSubject,
      interests: this.interests.split(',').map(s => s.trim()),
      learningStyle: this.learningStyle,
      duration: this.duration
    };

    this.http.post<any>('/api/lessons/generate', body).subscribe(
      (result) => {
        this.loading = false;
        this.generatedLesson = result;
      },
      (error) => {
        this.loading = false;
        this.errorMsg = 'Error generating lesson!';
        console.error(error);
      }
    );
  }
}
