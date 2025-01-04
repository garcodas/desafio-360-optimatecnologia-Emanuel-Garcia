interface UserSession {
  Token: string;
  UserId: number;
  ExpiresAt: Date;
}

export type { UserSession };
