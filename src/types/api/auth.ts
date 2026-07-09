export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
}
