import { createReducer, on } from "@ngrx/store"
import type { Challenge, ChallengeSubmission } from "../../models/challenge.model"
import * as ChallengesActions from "./challenges.actions"

export interface ChallengesState {
  challenges: Challenge[]
  selectedChallenge: Challenge | null
  submissions: ChallengeSubmission[]
  loading: boolean
  error: string | null
}

export const initialState: ChallengesState = {
  challenges: [],
  selectedChallenge: null,
  submissions: [],
  loading: false,
  error: null,
}

export const challengesReducer = createReducer(
  initialState,

  on(ChallengesActions.loadChallenges, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ChallengesActions.loadChallengesSuccess, (state, { challenges }) => ({
    ...state,
    challenges,
    loading: false,
    error: null,
  })),

  on(ChallengesActions.loadChallengesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengesActions.loadChallenge, (state) => ({
    ...state,
    selectedChallenge: null,
    loading: true,
    error: null,
  })),

  on(ChallengesActions.loadChallengeSuccess, (state, { challenge }) => ({
    ...state,
    selectedChallenge: challenge,
    loading: false,
    error: null,
  })),

  on(ChallengesActions.loadChallengeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengesActions.submitSolution, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ChallengesActions.submitSolutionSuccess, (state, { submission }) => ({
    ...state,
    submissions: [submission, ...state.submissions],
    loading: false,
    error: null,
  })),

  on(ChallengesActions.submitSolutionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengesActions.createChallenge, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ChallengesActions.createChallengeSuccess, (state, { challenge }) => ({
    ...state,
    loading: false,
    challenges: [...state.challenges, challenge], // Add new challenge to the list
    error: null
  })),
  
  on(ChallengesActions.createChallengeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
)

