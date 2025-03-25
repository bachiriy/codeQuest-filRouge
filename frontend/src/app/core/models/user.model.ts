export interface User {
  id: number
  firstName: string
  lastName: string
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

