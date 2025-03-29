import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, exhaustMap, map } from "rxjs/operators"
import * as ChallengesActions from "./challenges.actions"
import type { Challenge } from "../../models/challenge.model"
import { ChallengeService } from "@app/core/services/challenge.service"

@Injectable()
export class ChallengesEffects {
  constructor(
    private actions$: Actions,
    private challengeService: ChallengeService
  ) {}

  // Mock data for challenges
  private mockChallenges: Challenge[] = [
    {
      id: 1,
      title: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      difficulty: "Easy",
      category: "Arrays",
      points: 100,
      supportedLanguages: ["Java", "Python", "JavaScript", "C++"],
      testCases: [
        {
          id: 1,
          input: "[2,7,11,15], target = 9",
          expectedOutput: "[0,1]",
          isHidden: false,
        },
        {
          id: 2,
          input: "[3,2,4], target = 6",
          expectedOutput: "[1,2]",
          isHidden: false,
        },
      ],
      createdAt: new Date("2023-01-10"),
      completedBy: 1250,
      successRate: 75.3,
    },
    {
      id: 2,
      title: "Valid Parentheses",
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.",
      difficulty: "Easy",
      category: "Stack",
      points: 120,
      supportedLanguages: ["Java", "Python", "JavaScript", "C++"],
      testCases: [
        {
          id: 1,
          input: "()",
          expectedOutput: "true",
          isHidden: false,
        },
        {
          id: 2,
          input: "()[]{}",
          expectedOutput: "true",
          isHidden: false,
        },
      ],
      createdAt: new Date("2023-01-12"),
      completedBy: 980,
      successRate: 68.2,
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      difficulty: "Medium",
      category: "String",
      points: 200,
      supportedLanguages: ["Java", "Python", "JavaScript", "C++"],
      testCases: [
        {
          id: 1,
          input: '"abcabcbb"',
          expectedOutput: "3",
          isHidden: false,
        },
        {
          id: 2,
          input: '"bbbbb"',
          expectedOutput: "1",
          isHidden: false,
        },
      ],
      createdAt: new Date("2023-01-15"),
      completedBy: 745,
      successRate: 52.6,
    },
    {
      id: 4,
      title: "Merge Two Sorted Lists",
      description:
        "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
      difficulty: "Easy",
      category: "Linked List",
      points: 110,
      supportedLanguages: ["Java", "Python", "JavaScript", "C++"],
      testCases: [
        {
          id: 1,
          input: "[1,2,4], [1,3,4]",
          expectedOutput: "[1,1,2,3,4,4]",
          isHidden: false,
        },
        {
          id: 2,
          input: "[], []",
          expectedOutput: "[]",
          isHidden: false,
        },
      ],
      createdAt: new Date("2023-01-18"),
      completedBy: 870,
      successRate: 70.1,
    },
    {
      id: 5,
      title: "Maximum Subarray",
      description:
        "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
      difficulty: "Medium",
      category: "Dynamic Programming",
      points: 180,
      supportedLanguages: ["Java", "Python", "JavaScript", "C++"],
      testCases: [
        {
          id: 1,
          input: "[-2,1,-3,4,-1,2,1,-5,4]",
          expectedOutput: "6",
          isHidden: false,
        },
        {
          id: 2,
          input: "[1]",
          expectedOutput: "1",
          isHidden: false,
        },
      ],
      createdAt: new Date("2023-01-20"),
      completedBy: 625,
      successRate: 58.9,
    },
    {
      id: 6,
      title: "Median of Two Sorted Arrays",
      description:
        "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
      difficulty: "Hard",
      category: "Arrays",
      points: 350,
      supportedLanguages: ["Java", "Python", "JavaScript", "C++"],
      testCases: [
        {
          id: 1,
          input: "[1,3], [2]",
          expectedOutput: "2.00000",
          isHidden: false,
        },
        {
          id: 2,
          input: "[1,2], [3,4]",
          expectedOutput: "2.50000",
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
      exhaustMap((action) => {
        // Simulate API call
        const challenge = this.mockChallenges.find((c) => c.id === action.id)

        if (challenge) {
          return of(ChallengesActions.loadChallengeSuccess({ challenge }))
        } else {
          return of(
            ChallengesActions.loadChallengeFailure({
              error: `Challenge with ID ${action.id} not found`,
            }),
          )
        }
      }),
    ),
  )

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
  )
}

