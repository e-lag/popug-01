export type UserStreamDto = {
  id: string;
  email: string;
  role: string;
  nikName?: string | undefined;
  phone?: string | undefined;
  avatar?: string | undefined;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
