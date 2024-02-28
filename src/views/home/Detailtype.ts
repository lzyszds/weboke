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
  comment_id: number,
  head_img: string,
  user_name: string,
  time: string,
  content: string,
  replyPeople: string,
  reply_id: number,
  ground_id: number,
  reply: Replydata[]
}
