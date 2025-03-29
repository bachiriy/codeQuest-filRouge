import { Component, Inject, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { Store } from "@ngrx/store"
import { of, type Observable } from "rxjs"
import { map } from "rxjs/operators"
import type { Challenge } from "../../../core/models/challenge.model"
import { addChallenge, loadChallenges } from "../../../core/store/challenges/challenges.actions"
import { selectAllChallenges, selectChallengesLoading } from "../../../core/store/challenges/challenges.selectors"
import { AuthService } from "@app/core/services/auth.service"
import { ChallengeCreateFormComponent } from "../challenge-create-form/challenge-create-form.component"

@Component({
    selector: "app-challenge-list",
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ChallengeCreateFormComponent],
    templateUrl: './challenge-list.component.html'
})
export class ChallengeListComponent implements OnInit {
    challenges$: Observable<Challenge[]> = of([])
    filteredChallenges$: Observable<Challenge[]>
    loading$: Observable<boolean>
    showCreateForm: boolean = false;
    searchQuery = ""
    selectedDifficulty = "all"
    selectedCategory = "all"

    isAdmin$: Observable<boolean>

    categories: string[] = []

    constructor(private store: Store, private authService: AuthService) {
        this.challenges$ = this.store.select(selectAllChallenges)
        this.loading$ = this.store.select(selectChallengesLoading)
        this.filteredChallenges$ = this.challenges$
        this.isAdmin$ = this.authService.hasRole('ROLE_ADMIN')
    }

    ngOnInit(): void {
        this.store.dispatch(loadChallenges());
        // Extract unique categories
        this.challenges$.subscribe((challenges) => {
            this.categories = [...new Set(challenges.map((c) => c.category))]
        })
        this.applyFilters()
    }

    applyFilters(): void {
        this.filteredChallenges$ = this.challenges$.pipe(
            map((challenges) => {
                return challenges.filter((challenge) => {
                    // Filter by search query
                    const matchesSearch =
                        this.searchQuery === "" ||
                        challenge.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        challenge.description.toLowerCase().includes(this.searchQuery.toLowerCase())

                    // Filter by difficulty
                    const matchesDifficulty =
                        this.selectedDifficulty === "all" || challenge.difficulty === this.selectedDifficulty

                    // Filter by category
                    const matchesCategory = this.selectedCategory === "all" || challenge.category === this.selectedCategory

                    return matchesSearch && matchesDifficulty && matchesCategory
                })
            }),
        )
    }

    onChallengeCreate(newChallenge: Challenge) {
        this.store.dispatch(addChallenge({ challenge: newChallenge }));
        console.log('New challenge to create:', newChallenge);
        this.showCreateForm = false;
    }
}

