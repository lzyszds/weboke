export interface httpData {
  code: number
  data: [],
  total?: number,
  message?: string,
  err?: object
}

export interface User {
  uid: string
  uname: string
  token: string,
  username: string,
  password: string,
  power: string,
  createDate: string,
  lastLoginDate: string,
  headImg: string,
  setHeadImg: string,
  date?: any,
  perSign: string,
}
