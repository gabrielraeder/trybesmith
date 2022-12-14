export interface User {
  id?: number,
  username: string,
  vocation: string,
  level: number,
  password: string,
}

export interface Login {
  username: string,
  password: string,
}

export interface LoginReturn {
  type: string | null,
  message: string,
}

export interface UserReturn {
  type: string | null,
  message: string,
}