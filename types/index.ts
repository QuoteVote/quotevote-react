export interface User {
  id: string
  username: string
  email: string
  avatar: string
  bio: string
}

export interface Quote {
  id: string
  text: string
  author: string
  votes: number
  user: {
    name: string
    avatar: string
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface Settings {
  siteName: string
  siteDescription: string
  allowRegistration: boolean
  requireInvite: boolean
  maxQuotesPerUser: number
  maxVotesPerDay: number
  maintenanceMode: boolean
  emailNotifications: boolean
} 