export interface User {
  id: string;
  name: string;
  email: string;
  currentWeight: number;
  targetWeight: number;
  fitnessGoal: string;
  xp: number;
  streak: number;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
}

export interface FeedItem {
  id: string;
  userId: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
  comments: Comment[];
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  progress: number;
  endIn: string;
}

export interface Group {
  id: string;
  name: string;
  members: string[];
  inviteCode: string;
}

export interface DashboardData {
  user: User;
  feed: FeedItem[];
  activeChallenges: Challenge[];
  groupActivity: string;
}
