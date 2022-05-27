import {reactive} from 'vue'

const store={
  state:reactive({
    navData:[]
  }),
  setNavData(value){
    this.state.navData = value
  }
}
export default store