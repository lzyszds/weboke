import { library } from '@fortawesome/fontawesome-svg-core' // 引入awesome字体图标
import { faUserSecret } from '@fortawesome/free-solid-svg-icons' // 引入awesome字体图标
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // 引入awesome字体图标
import 'font-awesome/css/font-awesome.css' // 引入图标字体

// 引入组建初始化
library.add(faUserSecret)
export default FontAwesomeIcon
