import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Challenge, ProgrammingLanguage, Difficulty } from '../../../core/models/challenge.model';
import { Store } from '@ngrx/store';
import * as ChallengesActions from '../../../core/store/challenges/challenges.actions';

@Component({
  selector: 'app-challenge-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './challenge-create-form.component.html'
})
export class ChallengeCreateFormComponent {
  @Output() close = new EventEmitter<void>();

  challengeForm: FormGroup;

  programmingLanguages: ProgrammingLanguage[] = [
    'Java', 'Python', 'JavaScript', 'C++', 'C#', 'Ruby', 'Go'
  ];

  difficulties: Difficulty[] = ['EASY', 'MEDIUM', 'HARD', 'EXPERT'];

  constructor(private fb: FormBuilder, private store: Store) {
    this.challengeForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      difficulty: ['EASY', Validators.required],
      category: ['', Validators.required],
      points: [100, [Validators.required, Validators.min(1), Validators.max(1000)]],
      supported_languages: [[], Validators.required],
      tags: [''],
      test_cases: this.fb.array([]) // For dynamic test cases
    });
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.challengeForm.valid) {
      const formValue = this.challengeForm.value;
      
      const newChallenge = {
        ...formValue,
        // Send as array instead of comma-separated string
        supported_languages: formValue.supported_languages, // Already an array
        test_cases: formValue.test_cases.map((testCase: any) => ({
          input: testCase.input,
          expected_output: testCase.expected_output,
          is_hidden: testCase.is_hidden || false
        }))
      };
      
      this.store.dispatch(ChallengesActions.createChallenge({ 
        challengeData: newChallenge 
      }));
      this.close.emit();
    }
  }
  onLanguageChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value as ProgrammingLanguage;
    const currentLanguages = [...this.challengeForm.get('supported_languages')?.value];
    
    if (checkbox.checked) {
      currentLanguages.push(value);
    } else {
      const index = currentLanguages.indexOf(value);
      if (index > -1) {
        currentLanguages.splice(index, 1);
      }
    }
    
    this.challengeForm.get('supported_languages')?.setValue(currentLanguages);
  }

  get testCases() {
     return this.challengeForm.get('test_cases') as FormArray;
   }
   addTestCase() {
     this.testCases.push(this.fb.group({
       input: ['', Validators.required],
       expected_output: ['', Validators.required],
       is_hidden: [false]
     }));
   }
   
   removeTestCase(index: number) {
     this.testCases.removeAt(index);
   }
   ngOnInit() {
     this.addTestCase();
   }
}
