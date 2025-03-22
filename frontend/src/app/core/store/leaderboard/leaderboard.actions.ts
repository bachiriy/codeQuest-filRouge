import { createAction, props } from "@ngrx/store"
import type { LeaderboardEntry } from "../../models/leaderboard.model"

export const loadLeaderboard = createAction(
  "[Leaderboard] Load Leaderboard",
  props<{ period: "all-time" | "weekly" | "monthly" }>(),
)

export const loadLeaderboardSuccess = createAction(
  "[Leaderboard] Load Leaderboard Success",
  props<{ entries: LeaderboardEntry[]; period: "all-time" | "weekly" | "monthly" }>(),
)

export const loadLeaderboardFailure = createAction("[Leaderboard] Load Leaderboard Failure", props<{ error: string }>())

