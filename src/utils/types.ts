export type User = {
  email: string;
  name: string;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};
