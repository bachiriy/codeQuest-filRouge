import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators"
import * as ChallengesActions from "./challenges.actions"
import type { Challenge } from "../../models/challenge.model"
import { ChallengeService } from "@app/core/services/challenge.service"

@Injectable()
export class ChallengesEffects {
  constructor(
    private actions$: Actions,
    private challengeService: ChallengeService
  ) {}

    private mockChallenges: Challenge[] = [
    {
      id: 4,
      title: "Merge Two Sorted Lists",
      description:
        "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
      difficulty: "EASY",
      category: "Linked List",
      points: 110,
      supportedLanguages: ["Java", "Python", "JavaScript", "C++"],
      testCases: [
        {
          id: 1,
          input: "[1,2,4], [1,3,4]",
          expected_output: "[1,1,2,3,4,4]",
          isHidden: false,
        },
        {
          id: 2,
          input: "[], []",
          expected_output: "[]",
          isHidden: false,
        },
      ],
      createdAt: new Date("2023-01-18"),
      completedBy: 870,
      successRate: 70.1,
    },
    {
      id: 6,
      title: "Median of Two Sorted Arrays",
      description:
        "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
      difficulty: "HARD",
      category: "Arrays",
      points: 350,
      supportedLanguages: ["Java", "Python", "JavaScript", "C++"],
      testCases: [
        {
          id: 1,
          input: "[1,3], [2]",
          expected_output: "2.00000",
          isHidden: false,
        },
        {
          id: 2,
          input: "[1,2], [3,4]",
          expected_output: "2.50000",
          isHidden: false,
        },
      ],
      createdAt: new Date("2023-01-25"),
      completedBy: 320,
      successRate: 32.4,
    },
  ]

  loadChallenges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengesActions.loadChallenges),
      exhaustMap(() => {
        return this.challengeService.getChallenges().pipe(
          map(challenges => ChallengesActions.loadChallengesSuccess({ 
            challenges: challenges || [] 
          })),
          catchError(error => of(ChallengesActions.loadChallengesFailure({ error })))
        );
      })
    )
  );

  loadChallenge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengesActions.loadChallenge),
      switchMap(({ id }) =>
        this.challengeService.getChallengeById(id).pipe(
          map(challenge => ChallengesActions.loadChallengeSuccess({ challenge })),
          catchError(error => of(ChallengesActions.loadChallengeFailure({ error })))
        )
      )
    )
  );

  submitSolution$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengesActions.submitSolution),
      exhaustMap((action) => {
        // Simulate API call
        // Randomly determine if the solution is correct
        const isCorrect = Math.random() > 0.3

        if (isCorrect) {
          return of(
            ChallengesActions.submitSolutionSuccess({
              submission: {
                id: Math.floor(Math.random() * 10000),
                challengeId: action.challengeId,
                userId: 1, // Mock user ID
                language: action.language,
                code: action.code,
                status: "Accepted",
                executionTime: Math.random() * 200 + 50, // Between 50-250ms
                memoryUsed: Math.random() * 10 + 5, // Between 5-15MB
                submittedAt: new Date(),
              },
            }),
          )
        } else {
          const errors = ["Wrong Answer", "Time Limit Exceeded", "Runtime Error"]
          const randomError = errors[Math.floor(Math.random() * errors.length)]

          return of(
            ChallengesActions.submitSolutionSuccess({
              submission: {
                id: Math.floor(Math.random() * 10000),
                challengeId: action.challengeId,
                userId: 1, // Mock user ID
                language: action.language,
                code: action.code,
                status: randomError as any,
                executionTime: Math.random() * 200 + 50, // Between 50-250ms
                memoryUsed: Math.random() * 10 + 5, // Between 5-15MB
                submittedAt: new Date(),
              },
            }),
          )
        }
      }),
    ),
  );

  createChallenge$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengesActions.createChallenge),
      exhaustMap(({ challengeData }) => 
        this.challengeService.createChallenge(challengeData).pipe(
          map(challenge => ChallengesActions.createChallengeSuccess({ challenge })),
          catchError(error => of(ChallengesActions.createChallengeFailure({ 
            error: error.message || 'Failed to create challenge'
          })))
        )
      )
    )
  );
}

