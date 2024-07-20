export interface LoginPayload {
  name: string;
  pass: string;
}

export interface SignUpPayload extends LoginPayload {

}

export interface User {
  id: number;
  name: string;
  photo: string | null;
}

export interface SignUpInResponse {
  user: User;
  token: string;
}

