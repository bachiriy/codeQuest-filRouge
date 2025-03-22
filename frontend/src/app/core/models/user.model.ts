export interface User {
  id: number
  username: string
  email: string
  profilePic?: string
  bio?: string
  joinDate: Date
  stats: {
    challengesCompleted: number
    rank: number
    xpPoints: number
    favoriteLanguage?: string
  }
}

