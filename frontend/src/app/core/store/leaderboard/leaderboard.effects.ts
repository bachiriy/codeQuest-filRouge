import { Injectable } from "@angular/core"
import { type Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { exhaustMap } from "rxjs/operators"
import * as LeaderboardActions from "./leaderboard.actions"
import type { LeaderboardEntry } from "../../models/leaderboard.model"

@Injectable()
export class LeaderboardEffects {
  constructor(private actions$: Actions) {}

  // Mock data for leaderboard
  private mockLeaderboardAllTime: LeaderboardEntry[] = [
    {
      userId: 1,
      username: "john_doe",
      profilePic: "/assets/profile-pics/user1.jpg",
      rank: 1,
      xpPoints: 7850,
      challengesCompleted: 86,
      streak: 15,
    },
    {
      userId: 2,
      username: "alice_wonder",
      profilePic: "/assets/profile-pics/user2.jpg",
      rank: 2,
      xpPoints: 7200,
      challengesCompleted: 79,
      streak: 9,
    },
    {
      userId: 3,
      username: "coding_master",
      profilePic: "/assets/profile-pics/user3.jpg",
      rank: 3,
      xpPoints: 6900,
      challengesCompleted: 74,
      streak: 12,
    },
    {
      userId: 4,
      username: "dev_ninja",
      profilePic: "/assets/profile-pics/user4.jpg",
      rank: 4,
      xpPoints: 6750,
      challengesCompleted: 71,
      streak: 7,
    },
    {
      userId: 5,
      username: "bug_hunter",
      profilePic: "/assets/profile-pics/user5.jpg",
      rank: 5,
      xpPoints: 6600,
      challengesCompleted: 68,
      streak: 5,
    },
    {
      userId: 6,
      username: "syntax_error",
      profilePic: "/assets/profile-pics/user6.jpg",
      rank: 6,
      xpPoints: 6450,
      challengesCompleted: 65,
      streak: 3,
    },
    {
      userId: 7,
      username: "code_wizard",
      profilePic: "/assets/profile-pics/user7.jpg",
      rank: 7,
      xpPoints: 6300,
      challengesCompleted: 63,
      streak: 8,
    },
    {
      userId: 8,
      username: "algorithm_guru",
      profilePic: "/assets/profile-pics/user8.jpg",
      rank: 8,
      xpPoints: 6150,
      challengesCompleted: 61,
      streak: 6,
    },
    {
      userId: 9,
      username: "tech_explorer",
      profilePic: "/assets/profile-pics/user9.jpg",
      rank: 9,
      xpPoints: 6000,
      challengesCompleted: 59,
      streak: 4,
    },
    {
      userId: 10,
      username: "byte_builder",
      profilePic: "/assets/profile-pics/user10.jpg",
      rank: 10,
      xpPoints: 5850,
      challengesCompleted: 57,
      streak: 2,
    },
  ]

  private mockLeaderboardWeekly: LeaderboardEntry[] = [
    {
      userId: 3,
      username: "coding_master",
      profilePic: "/assets/profile-pics/user3.jpg",
      rank: 1,
      xpPoints: 1250,
      challengesCompleted: 12,
      streak: 7,
    },
    {
      userId: 7,
      username: "code_wizard",
      profilePic: "/assets/profile-pics/user7.jpg",
      rank: 2,
      xpPoints: 1100,
      challengesCompleted: 10,
      streak: 6,
    },
    {
      userId: 1,
      username: "john_doe",
      profilePic: "/assets/profile-pics/user1.jpg",
      rank: 3,
      xpPoints: 950,
      challengesCompleted: 9,
      streak: 5,
    },
    {
      userId: 2,
      username: "alice_wonder",
      profilePic: "/assets/profile-pics/user2.jpg",
      rank: 4,
      xpPoints: 800,
      challengesCompleted: 8,
      streak: 4,
    },
    {
      userId: 5,
      username: "bug_hunter",
      profilePic: "/assets/profile-pics/user5.jpg",
      rank: 5,
      xpPoints: 750,
      challengesCompleted: 7,
      streak: 3,
    },
  ]

  private mockLeaderboardMonthly: LeaderboardEntry[] = [
    {
      userId: 1,
      username: "john_doe",
      profilePic: "/assets/profile-pics/user1.jpg",
      rank: 1,
      xpPoints: 3850,
      challengesCompleted: 36,
      streak: 15,
    },
    {
      userId: 3,
      username: "coding_master",
      profilePic: "/assets/profile-pics/user3.jpg",
      rank: 2,
      xpPoints: 3500,
      challengesCompleted: 32,
      streak: 12,
    },
    {
      userId: 2,
      username: "alice_wonder",
      profilePic: "/assets/profile-pics/user2.jpg",
      rank: 3,
      xpPoints: 3200,
      challengesCompleted: 29,
      streak: 9,
    },
    {
      userId: 4,
      username: "dev_ninja",
      profilePic: "/assets/profile-pics/user4.jpg",
      rank: 4,
      xpPoints: 2900,
      challengesCompleted: 26,
      streak: 7,
    },
    {
      userId: 7,
      username: "code_wizard",
      profilePic: "/assets/profile-pics/user7.jpg",
      rank: 5,
      xpPoints: 2600,
      challengesCompleted: 23,
      streak: 8,
    },
  ]

  loadLeaderboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeaderboardActions.loadLeaderboard),
      exhaustMap((action) => {
        // Simulate API call
        let leaderboardData: LeaderboardEntry[]

        switch (action.period) {
          case "weekly":
            leaderboardData = this.mockLeaderboardWeekly
            break
          case "monthly":
            leaderboardData = this.mockLeaderboardMonthly
            break
          case "all-time":
          default:
            leaderboardData = this.mockLeaderboardAllTime
            break
        }

        return of(
          LeaderboardActions.loadLeaderboardSuccess({
            entries: leaderboardData,
            period: action.period,
          }),
        )
      }),
    ),
  )
}

