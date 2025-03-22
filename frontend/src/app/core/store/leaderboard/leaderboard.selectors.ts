import { createSelector, createFeatureSelector } from "@ngrx/store"
import type { LeaderboardState } from "./leaderboard.reducer"

export const selectLeaderboardState = createFeatureSelector<LeaderboardState>("leaderboard")

export const selectLeaderboardEntries = createSelector(selectLeaderboardState, (state) => state.entries)

export const selectLeaderboardPeriod = createSelector(selectLeaderboardState, (state) => state.period)

export const selectLeaderboardLoading = createSelector(selectLeaderboardState, (state) => state.loading)

export const selectLeaderboardError = createSelector(selectLeaderboardState, (state) => state.error)

