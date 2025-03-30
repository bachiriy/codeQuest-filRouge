import { createAction, props } from "@ngrx/store"
import type { 
    Challenge,
    ChallengeSubmission,
    ProgrammingLanguage
} from "../../models/challenge.model"

export const loadChallenges = createAction(
    "[Challenges] Load Challenges"
)

export const loadChallengesSuccess = createAction(
    "[Challenges] Load Challenges Success",
    props<{ challenges: Challenge[] }>(),
)

export const loadChallengesFailure = createAction(
    "[Challenges] Load Challenges Failure",
    props<{ error: string }>()
)

export const loadChallenge = createAction(
    "[Challenges] Load Challenge",
    props<{ id: number }>()
)

export const loadChallengeSuccess = createAction(
    "[Challenges] Load Challenge Success",
    props<{ challenge: Challenge }>(),
)

export const loadChallengeFailure = createAction(
    "[Challenges] Load Challenge Failure",
    props<{ error: string }>()
)

export const submitSolution = createAction(
    "[Challenges] Submit Solution",
    props<{
        challengeId: number
        code: string
        language: ProgrammingLanguage
    }>(),
)

export const submitSolutionSuccess = createAction(
    "[Challenges] Submit Solution Success",
    props<{ submission: ChallengeSubmission }>(),
)

export const submitSolutionFailure = createAction(
    "[Challenges] Submit Solution Failure",
    props<{ error: string }>()
)

export const createChallenge = createAction(
  '[Challenges] Create Challenge',
  props<{ challengeData: Omit<Challenge, 'id'> }>() // Exclude id since backend generates it
);

export const createChallengeSuccess = createAction(
  '[Challenges] Create Challenge Success',
  props<{ challenge: Challenge }>() // Includes the backend-generated id
);

export const createChallengeFailure = createAction(
  '[Challenges] Create Challenge Failure',
  props<{ error: string }>()
);
