export type Difficulty = "Easy" | "Medium" | "Hard"
export type ProgrammingLanguage = "Java" | "Python" | "JavaScript" | "C++" | "C#" | "Ruby" | "Go"

export interface TestCase {
  id: number
  input: string
  expectedOutput: string
  isHidden: boolean
}

export interface Challenge {
  id: number
  title: string
  description: string
  difficulty: Difficulty
  category: string
  points: number
  supportedLanguages: ProgrammingLanguage[]
  testCases: TestCase[]
  createdAt: Date
  completedBy: number
  successRate: number
  tags?: string
}

export interface ChallengeSubmission {
  id: number
  challengeId: number
  userId: number
  language: ProgrammingLanguage
  code: string
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Runtime Error"
  executionTime: number
  memoryUsed: number
  submittedAt: Date
}

