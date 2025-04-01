import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Challenge, ProgrammingLanguage } from '../../../core/models/challenge.model';
import { loadChallenge, runTests, submitSolution } from '../../../core/store/challenges/challenges.actions';
import { 
  selectSelectedChallenge,
  selectChallengesLoading,
  selectSubmissions
} from '../../../core/store/challenges/challenges.selectors';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { MonacoEditorTheme } from '../../../core/models/editor.model';

@Component({
  selector: 'app-challenge-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, CodeEditorComponent],
  templateUrl: './challenge-detail.component.html'
})
export class ChallengeDetailComponent implements OnInit {
  challenge$: Observable<Challenge | null>;
  loading$: Observable<boolean>;
  submissions$: Observable<any[]>;

  selectedLanguage: ProgrammingLanguage = 'JavaScript';
  editorTheme: MonacoEditorTheme = 'vs-dark';
  code = '';
  isSubmitting = false;
  editorReady = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.challenge$ = this.store.select(selectSelectedChallenge);
    this.loading$ = this.store.select(selectChallengesLoading);
    this.submissions$ = this.store.select(selectSubmissions);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.store.dispatch(loadChallenge({ id }));
      }
    });

    this.challenge$.subscribe(challenge => {
      if (challenge) {
        this.selectedLanguage = challenge.supportedLanguages[0];
        this.setCodeTemplate();
      }
    });
  }

  getVisibleTestCases(challenge: Challenge) {
    return challenge.testCases.filter(testCase => !testCase.isHidden);
  }

  onReset() {
    this.setCodeTemplate();
  }

  onSubmit(challengeId: number) {
    if (!this.code.trim()) return;
    
    this.isSubmitting = true;
    this.store.dispatch(submitSolution({
      challengeId,
      code: this.code,
      language: this.selectedLanguage
    }));

    // Handle submission completion in effects instead
  }

  onRunTests(challengeId: number) {
    if (!this.code.trim()) return;

    this.isSubmitting = true;
    this.store.dispatch(runTests({
      challengeId,
      code: this.code,
      language: this.selectedLanguage
    }));
  }

  public setCodeTemplate() {
    const templates: Record<ProgrammingLanguage, string> = {
      'JavaScript': `function solution(input) {\n  // Your code here\n  return result;\n}`,
      'Python': `def solution(input):\n    # Your code here\n    return result`,
      'Java': `public class Solution {\n    public int[] solution(int[] input) {\n        // Your code here\n        return result;\n    }\n}`,
      'C++': `class Solution {\npublic:\n    vector<int> solution(vector<int>& input) {\n        // Your code here\n        return result;\n    }\n};`,
      'C#': `public class Solution {\n    public int[] Solution(int[] input) {\n        // Your code here\n        return result;\n    }\n}`,
      'Ruby': `def solution(input)\n    # Your code here\n    result\nend`,
      'Go': `func solution(input []int) []int {\n    // Your code here\n    return result\n}`
    };
  
    this.code = templates[this.selectedLanguage] || '// Write your solution here';
  }
}
