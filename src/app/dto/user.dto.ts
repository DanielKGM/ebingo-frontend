export interface UserDTO {
  id?: string;
  nickname: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface RankingDTO {
  id?: string;
  nickname: string;
  marked: number;
}
