export interface commentsType {
  content: string,
  aid: number,
  replyId: number,
  groundId: number,
  email: string,
  name: string,
  userIp: string,
  webSite?: string,
  imgIndex: number,
}

export interface Replydata {
  commentId: number,
  headImg: string,
  userName: string,
  createDate: string,
  content: string,
  replyPeople: string,
  replyId: number,
  groundId: number,
  children: Replydata[],
  browserSystem: string,
  deviceSystem: string,
  userIp: string
}
