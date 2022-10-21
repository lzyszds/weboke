<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import http from '@/http/http'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
const router = useRouter()


interface getLoginData {
  error: number
  token: string
  message: string
  code: number
}

//表单样式属性捆绑
const fromTool = reactive({
  usernamelable: false,
  passwordlable: false,
  button: false
})
// 表单验证 需要捆绑的ref项，需要验证的表单项
const ruleFormRef = ref<FormInstance>()
// 账号密码数据，用于提交
const ruleForm = reactive({
  username: '',
  password: '',
})
// 表单验证规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 6, max: 16, message: '账号长度应该是6到16', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度应该是6到16', trigger: 'blur' },
  ]
})

// 表单验证 通过后执行 登陆请求
const submitForm = (formEl: FormInstance | undefined) => {
  // fromtool 防止重复提交 以及 按钮提交之后样式
  if (!formEl || fromTool.button) return
  fromTool.button = true
  formEl.validate((valid, fields) => {
    if (valid) {
      http('post', '/admin/login', ruleForm).then((res: getLoginData) => {
        setTimeout(() => {
          fromTool.button = false
          if (res.error === 0 || res.code === 200) {
            localStorage.setItem('lzy_token', res.token)
            router.push('/userAdmin/User')
          } else {
            ElNotification({
              title: 'Error',
              message: '账号密码输入错误！',
              type: 'error',
            })
          }
        }, 2000)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 获取用户名输入框焦点时，修改样式
const blurUsername = () => {
  if (ruleForm.username === '') {
    fromTool.usernamelable = false
  } else {
    fromTool.usernamelable = true
  }
}
//初始进入就执行一次
blurUsername()

// 获取密码输入框焦点时，修改样式
const blurPassword = (() => {
  if (ruleForm.password === '') {
    fromTool.passwordlable = false
  } else {
    fromTool.passwordlable = true
  }
})
//初始进入就执行一次
blurPassword()

//提交按钮的加载动画 
const load = ref()
setTimeout(() => {
  load.value!.classList.add('loaded')
}, 500)
</script>

<template>
  <div class="login" ref="load">
    <div class="content">
      <img class="lovelyImg" :class="{lock:fromTool.usernamelable||fromTool.passwordlable}"
        src="../../assets/image/10.svg" alt="">
      <div class="content_header">
        <p><img src="http://localhost:1027/public/img/lzjy.png" alt=""></p>
        <p>Sign In</p>
      </div>
      <div class="input-group">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" status-icon>
          <el-form-item prop="username">
            <el-input class="input" v-model="ruleForm.username" @focus="fromTool.usernamelable = true"
              @blur="blurUsername" />
            <label class="user-label" :class="{'lableActive':fromTool.usernamelable}">UserName</label>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input" type="password" v-model="ruleForm.password" @focus="fromTool.passwordlable = true"
              @blur="blurPassword" show-password />
            <label class="user-label" :class="{'lableActive':fromTool.passwordlable}">Password</label>
          </el-form-item>

          <el-form-item>
            <el-button :class="{down:fromTool.button}" type="primary" @click="submitForm(ruleFormRef)"></el-button>
          </el-form-item>
          <router-link to='/'>
            <el-button type="primary">返回首页</el-button>
          </router-link>
        </el-form>
      </div>
    </div>

  </div>
</template>

<style scoped>
.lovelyImg {
  position: absolute;
  top: -20px;
  right: 0px;
  width: 300px;
  transition: .3s;
  opacity: 0;
}

.lovelyImg.lock {
  right: -209px;
  opacity: 1;
}

.login.loaded {
  opacity: 1 !important;
}

.login {
  opacity: 0;
  width: 100vw;
  height: 100vh;
  background: url('http://localhost:1027/public/img/94175072_p0.jpg') no-repeat;
  display: flex;
  background-repeat: round;
  align-items: center;
  justify-content: right;
}

.login ::selection {
  background: #fff;
  color: #000;
  text-shadow: none;
}

.login .content {
  z-index: 3;
  position: relative;
  width: 45rem;
  height: 55rem;
  background: rgb(26 26 26 / 73%);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  transform: translateX(-230px);
  transition: .5s;
}

.login .content:hover {
  backdrop-filter: blur(0px);
}

p {
  margin: 0;
}

.content .content_header {
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 40px;
  color: #fff;
  user-select: none;
}

.content_header img {
  width: 30%;
  border-radius: 1rem;
  margin: 0 auto;
}


/* From uiverse.io by @alexruix */
.input-group {
  margin-top: 30px;
  font-size: 19px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
}

.input-group span {
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 0;
}

.input-group-item {
  position: relative;
  margin-bottom: 20px;
}

.input-group .input {
  border-color: transparent;
  border-bottom: 1px solid #ffffff;
  /* border-radius: 1rem; */
  background: none;
  width: 250px;
  padding: 3px 0;
  font-size: 19px;
  color: #fff;
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: none;
}

.input :deep(.el-icon) {
  color: #fff
}

.input .el-input .el-input__clear:hover,
.input .el-input .el-input__password:hover {
  color: #fff !important;
}

.input-group .input :deep(.el-input__wrapper) {
  border-color: transparent;
  background: transparent;
  box-shadow: none;
  color: #fff;
  padding: 0;
}

.input-group .input :deep(.el-input__wrapper) input {
  color: #fff;
}


.user-label {
  font-size: 19px;
  position: absolute;
  left: 0;
  color: #e8e8e8;
  padding-left: 0;
  pointer-events: none;
  transform: translateY(0);
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

.input:focus,
input:valid {
  outline: none;
  /* border: 1.5px solid #1a73e8; */
}

.lableActive {
  transform: translate(0px, -20px);
  background-color: transparent;
  padding-left: 0;
  font-size: 16px;
}

button:nth-child(1) {
  background: #79bbfe;
  color: #fff;
}

button {
  width: 100%;
  height: 50px;
  background: #fff;
  border: none;
  border-radius: 1rem;
  font-size: 20px;
  color: #000;
  transition: .3s;
}

button.activebtn {
  background: #85cbed;
  color: #fff;
  opacity: 1;
}


.el-form-item {
  width: 100%;
  justify-content: center;
  margin-top: 10px;
}

.el-form-item :deep(.el-form-item__content) {
  flex-wrap: nowrap;
  flex: initial;
  margin-top: 15px;
}

.input :deep(.el-input__wrapper) input {
  height: 20px !important;
}

.el-form-item :deep(.el-form-item__content) {
  width: 100%;
}

.el-form-item__content button {
  width: 100%;
  overflow: hidden;
  transition: .3s;
}

.el-form-item__content button::before {
  content: '登陆';
  transition: .3s;
  opacity: 1;
}

.el-form-item__content button::after {
  content: '';
  position: absolute;
  opacity: 0;
}

.el-form-item__content button.down::before {
  content: '登陆';
  transform: translateY(30px) scale(.6);
  opacity: 0;
}

.el-form-item__content button.down::after {
  content: '';
  position: absolute;
  border: 3px solid rgb(115, 0, 255);
  border-top-color: #fff;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: spin 1s linear infinite;
  opacity: 1;
}

.el-form-item :deep(.el-form-item__error) {
  text-shadow: 1px 1px 3px #000;
  margin-top: 3px;
  user-select: none;
}

.el-form-item__content :deep(.el-button):active {
  color: #000;
  border-color: none;
  background-color: #fff;
  outline: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>  
<style>
input:-webkit-autofill {
  -webkit-text-fill-color: #fff !important;
  transition: background-color 5000s ease-in-out 0s;
}

input:-internal-autofill-selected {
  -webkit-text-fill-color: #999 !important;
  background-color: rgb(98, 144, 222) !important;
  background-image: none !important;
  color: -internal-light-dark(black, white) !important;
}
</style>
