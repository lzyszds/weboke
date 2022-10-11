<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const fromTool = reactive({
  usernamelable: false,
  passwordlable: false,
  button: false
})
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  password: '',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 6, max: 16, message: '账号长度应该是6到16', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '密码长度应该是8到16', trigger: 'blur' },
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  fromTool.button = true
  setTimeout(() => {
    formEl.validate((valid, fields) => {
      fromTool.button = false
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }, 2000)
}

const blurUsername = () => {

  if (ruleForm.name === '') {
    fromTool.usernamelable = false
  } else {
    fromTool.usernamelable = true
  }
}
blurUsername()
const blurPassword = (() => {
  if (ruleForm.password === '') {
    fromTool.passwordlable = false
  } else {
    fromTool.passwordlable = true
  }
})
blurPassword()
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
        <p><img src="http://localhost:1024/img/lzjy.png" alt=""></p>
        <p>Sign In</p>
      </div>
      <div class="input-group">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" status-icon>
          <el-form-item prop="name">
            <el-input class="input" v-model="ruleForm.name" @focus="fromTool.usernamelable = true"
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
  right: -206px;
  opacity: 1;
}

.login.loaded {
  opacity: 1 !important;
}

.login {
  opacity: 0;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/image/login.jpg') center center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login .content {
  z-index: 3;
  position: relative;
  width: 45rem;
  height: 50rem;
  /* background: var(--themeColor); */
  background: rgba(159, 179, 217, 0.9);
  /* opacity: .8; */
  border-radius: 1rem;
  box-shadow: 0 0 2rem 1px rgb(0, 0, 0)
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

.input>>>.el-icon {
  color: #fff
}

.input .el-input .el-input__clear:hover,
.input .el-input .el-input__password:hover {
  color: #fff !important;
}

.input-group .input>>>.el-input__wrapper {
  border-color: transparent;
  background: transparent;
  box-shadow: none;
  color: #fff;
  padding: 0;
}

.input-group .input>>>.el-input__wrapper input {
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

button {
  width: 50%;
  height: 50px;
  background: #ffffff;
  border: none;
  border-radius: 1rem;
  font-size: 20px;
  color: #000;
  margin-top: 20px;
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

.el-form-item>>>.el-form-item__content {
  flex-wrap: nowrap;
  flex: initial;
  margin-top: 15px;
}

.input>>>.el-input__wrapper input {
  height: 20px !important;
}

.el-form-item>>>.el-form-item__content {
  width: 100%;
}

.el-form-item__content button {
  width: 100%;
  overflow: hidden;
  transition: .3s;
}

.el-form-item__content button::before {
  content: 'Submit';
  transition: .3s;
  opacity: 1;
}

.el-form-item__content button::after {
  content: '';
  position: absolute;
  opacity: 0;
}

.el-form-item__content button.down::before {
  content: 'Submit';
  transform: translateY(30px) scale(.6);
  opacity: 0;
}

.el-form-item__content button.down::after {
  content: '';
  position: absolute;
  border: 3px solid hsla(185, 100%, 62%, 0.2);
  border-top-color: #fff;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: spin 1s linear infinite;
  opacity: 1;
}

.el-form-item>>>.el-form-item__error {
  text-shadow: 1px 1px 3px #000;
  margin-top: 3px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>  
