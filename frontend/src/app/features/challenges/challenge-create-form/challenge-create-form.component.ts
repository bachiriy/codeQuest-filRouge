// challenge-create-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Challenge } from '../../../core/models/challenge.model';

@Component({
  selector: 'app-challenge-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './challenge-create-form.component.html'
})
export class ChallengeCreateFormComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Challenge>();

  challengeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.challengeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      difficulty: ['Easy', Validators.required],
      category: ['', Validators.required],
      points: [100, [Validators.required, Validators.min(1)]],
      supportedLanguages: ['Java,Python,JavaScript,C++', Validators.required]
    });
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.challengeForm.valid) {
      const newChallenge: Challenge = {
        ...this.challengeForm.value,
        supportedLanguages: this.challengeForm.value.supportedLanguages.split(',').map((lang: string) => lang.trim()),
        id: 0, // Temporary, will be assigned by backend
        testCases: [], // Can be added later
        createdAt: new Date(),
        completedBy: 0,
        successRate: 0
      };
      this.create.emit(newChallenge);
    }
  }
}
