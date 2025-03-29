import { createSelector, createFeatureSelector } from "@ngrx/store"
import type { ChallengesState } from "./challenges.reducer"

export const selectChallengesState = createFeatureSelector<ChallengesState>("challenges")
export const selectAllChallenges = createSelector(selectChallengesState, (state) => state.challenges)
export const selectSelectedChallenge = createSelector(selectChallengesState, (state) => state.selectedChallenge)
export const selectChallengesLoading = createSelector(selectChallengesState, (state) => state.loading)
export const selectChallengesError = createSelector(selectChallengesState, (state) => state.error)
export const selectSubmissions = createSelector(selectChallengesState, (state) => state.submissions)

