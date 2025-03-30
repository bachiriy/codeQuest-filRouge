import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Challenge, ProgrammingLanguage } from '../../../core/models/challenge.model';
import { loadChallenge, submitSolution } from '../../../core/store/challenges/challenges.actions';
import { 
  selectSelectedChallenge,
  selectChallengesLoading,
  selectSubmissions
} from '../../../core/store/challenges/challenges.selectors';
import { CodeEditorComponent } from '../code-editor/code-editor.component';

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
  editorTheme: 'dark' | 'light' = 'dark';
  code = '';
  isSubmitting = false;

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

    // Update code template when language changes
    this.challenge$.subscribe(challenge => {
      if (challenge) {
        this.selectedLanguage = challenge.supportedLanguages[0];
        this.setCodeTemplate();
      }
    });
    console.log(this.challenge$);
    
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

    // Reset submission state after completion (you might want to do this in an effect instead)
    setTimeout(() => {
      this.isSubmitting = false;
    }, 2000);
  }

  private setCodeTemplate() {
    const templates: Record<ProgrammingLanguage, string> = {
      'JavaScript': `function solution(input) {
    // Your code here
    return result;
  }`,
      'Python': `def solution(input):
      # Your code here
      return result`,
      'Java': `public class Solution {
      public int[] solution(int[] input) {
          // Your code here
          return result;
      }
  }`,
      'C++': `class Solution {
  public:
      vector<int> solution(vector<int>& input) {
          // Your code here
          return result;
      }
  };`,
      'C#': `public class Solution {
      public int[] Solution(int[] input) {
          // Your code here
          return result;
      }
  }`,
      'Ruby': `def solution(input)
    # Your code here
    result
  end`,
      'Go': `func solution(input []int) []int {
      // Your code here
      return result
  }`
    };
  
    this.code = templates[this.selectedLanguage] || '// Write your solution here';
  }
}
