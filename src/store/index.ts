/**
 * 一般在容器中做这4件事
 *    1. 定义容器并导出
 *    2. 使用容器中的state
 *    3. 修改容器中的state
 *    4. 使用容器中的action
 */
import { defineStore } from "pinia";
import { get, post } from "../http/http";
import _ from "lodash";
/**
 * 1. 定义容器并导出
 * 参数一: 容器ID, 唯一, 将来 Pinia 会把所有的容器挂载到根容器
 * 参数二: 选项对象
 * 返回值: 函数, 调用的时候要空参调用, 返回容器实例
 */
export const useStore = defineStore('main', {
  /**
   * 类似组件的 data, 用于存储全局的的状态
   * 注意:
   *    1.必须是函数, 为了在服务端渲染的时候避免交叉请求导致的数据交叉污染
   *    2.必须是箭头函数, 为了更好的 TS 类型推导
   */
  state: () => {
    return {
      musicPlayData: {},
      musicData: {}
    }
  },
  /**
   * 类似组件的 computed, 用来封装计算属性, 具有缓存特性
   */
  getters: {

  },
  /**
   * 类似组件的 methods, 封装业务逻辑, 修改state
   * 注意: 里面的函数不能定义成箭头函数(函数体中会用到this)
   */
  actions: {
    getMusicDetails(id: [], commit: boolean) {
      return post("/music/song/url?id=" + id, null).then((res: any) => {
        return get('/music/song/detail?ids=' + id, null).then((item: any) => {
          if (commit) {
            return this.musicPlayData = {
              url: res.data[0].url, // 音乐地址
              picUrl: item.songs[0].al.picUrl, // 封面图片
              name: item.songs[0].name,   // 音乐名称
              artist: item.songs[0].ar[0].name // 歌手名称
            }
          } else {
            let resNew: any = []
            let itemNew: any = []
            id.forEach((result) => {
              const resNewlog: any = _.filter(res.data, ['id', result])
              const itemNewlog: any = _.filter(item.songs, ['id', result])
              resNew.push(...resNewlog)
              itemNew.push(...itemNewlog)
            })
            return { res: resNew, item: itemNew }
          }
        })
      })
    },
  }
})

