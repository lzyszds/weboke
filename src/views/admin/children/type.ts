export interface httpData {
  code: number
  data: [],
  total?: number,
  message?: string,
  err?: object
}

export interface User {
  id: string
  name: string
  token: string,
  username: string,
  password: string,
  power: string,
  createDate: string,
  lastLoginDate: string,
  headImg: string,
  setHeadImg: string,
  date?: any,
  uid: string
}
