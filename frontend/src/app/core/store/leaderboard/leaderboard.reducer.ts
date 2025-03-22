import { createReducer, on } from "@ngrx/store"
import type { LeaderboardEntry } from "../../models/leaderboard.model"
import * as LeaderboardActions from "./leaderboard.actions"

export interface LeaderboardState {
  entries: LeaderboardEntry[]
  period: "all-time" | "weekly" | "monthly"
  loading: boolean
  error: string | null
}

export const initialState: LeaderboardState = {
  entries: [],
  period: "all-time",
  loading: false,
  error: null,
}

export const leaderboardReducer = createReducer(
  initialState,

  on(LeaderboardActions.loadLeaderboard, (state, { period }) => ({
    ...state,
    period,
    loading: true,
    error: null,
  })),

  on(LeaderboardActions.loadLeaderboardSuccess, (state, { entries, period }) => ({
    ...state,
    entries,
    period,
    loading: false,
    error: null,
  })),

  on(LeaderboardActions.loadLeaderboardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
)

