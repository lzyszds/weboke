<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import http from '@/http/http'
import { useRouter } from 'vue-router'
const router = useRouter()
//进入页面先判断是否登陆着,localStorage.getItem('token')是登陆时候存的token
if (localStorage.getItem('lzy_token')) {
  router.push('/userAdmin/User')
}
interface getLoginData {
  error: number
  token: string
  message: string
  code: number
}
const tipsText = ref('')
const load = ref(false)

// 表单验证 需要捆绑的ref项，需要验证的表单项
const ruleFormRef = ref<FormInstance>()
// 账号密码数据，用于提交
const ruleForm = reactive({
  username: '',
  password: '',
})
// 表单验证规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 16, message: '账号长度应该是6到16', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度应该是6到16', trigger: 'blur' },
  ]
})
const submitForm = (formEl: FormInstance | undefined) => {
  tipsText.value = ''
  load.value = true
  setTimeout(() => {
    load.value = false

  }, 2000)
  // fromtool 防止重复提交 以及 按钮提交之后样式
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      http('post', '/adminApi/admin/login', ruleForm).then((res: getLoginData) => {
        setTimeout(() => {
          if (res.error === 0 || res.code === 200) {
            localStorage.setItem('lzy_token', res.token)
            router.push('/userAdmin/User')
          } else {
            tipsText.value = '账号或密码错误'
          }
        }, 2000)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
const back = () => {
  router.push('/')
}
</script>   

<template>
  <div class="login">
    <div class="card">
      <!-- <div class="item top">
        <img src="http://localhost:1027/public/img/lzjyBlack.png" alt="">
        <p>Sign In</p>
      </div> -->
      <div class="item center">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" status-icon>
          <el-form-item prop="username">
            <el-input @keydown.enter="submitForm(ruleFormRef)" class="input" v-model="ruleForm.username">
              <template #prepend>账号</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input @keydown.enter="submitForm(ruleFormRef)" class="input" type="password" v-model="ruleForm.password"
              show-password>
              <template #prepend>密码</template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button :class="{ 'loadBtn': load }" type="primary" @click="submitForm(ruleFormRef)">
              <span class="loadingtext">登陆中...</span>
              <span class="sunb">
                <el-icon>
                  <Promotion />
                </el-icon>
                <span class="spanTEXT">登陆</span>
              </span>
            </el-button>
            <el-button type="primary" @click="back">
              <el-icon>
                <Back />
              </el-icon> <span>返回</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <p class="pwdTips" :class="{ 'error': tipsText.length }">{{ tipsText }}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/image/login/dark-l1.png') center; //var(--themeColor);
  background-position: center;
  background-size: 105%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;

  .card {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .3);
    backdrop-filter: blur(3px);
    border-radius: 10px;
    box-shadow: 0 1px 8px 10px rgba(0, 0, 0, .2);
    transition: .6s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: 'almama';

    &:focus-within {
      box-shadow: 0 10px 10px rgba(0, 0, 0, .1),
        0px -30px 4px -10px rgba(255, 255, 255, .3),
        0px -60px 4px -20px rgba(255, 255, 255, .2),
        0px -90px 4px -30px rgba(255, 255, 255, .1),
    }

    .item {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.top {
        height: 40%;

        p {
          font-size: 40px;
          font-weight: 600;
          color: #000;
          flex: 3;
        }

        img {
          flex: 1;
          width: 100px;
          height: 75px;
          margin-left: 45px;
        }
      }

      &.center {
        padding: 20px 20px 0;
        margin-top: 10px;
        width: 300px;

        & :deep(.el-form-item) {
          & .el-form-item__content {
            justify-content: center;
          }

          .loadBtn {

            &>span {
              transition: 1s;
              transform: translateY(50px) !important;
            }
          }

          .el-input .el-input__icon {
            color: var(--themeColor);
          }

          &.is-error .el-input__icon {
            color: var(--el-color-danger) !important;
          }

          .el-form-item__error {
            user-select: none;
          }

          .el-input-group__prepend {
            background-color: var(--themeColor);
            box-shadow: none;
            border: 1px solid var(--themeColor);
            border-radius: 15px 0 0 15px;
            color: #fff;
            user-select: none;
            transition: .6s;

          }

          .el-input__wrapper {
            box-shadow: none;
            border: 1px solid var(--themeColor);
            border-left: transparent;
            border-radius: 0 15px 15px 0;

            input {
              font-weight: 600;
              font-family: 'firaCode';
              color: #000;
            }
          }

          .el-button {
            text-align: center;
            margin: 20px 10px 0;
            font-size: 16px;
            width: 110px;
            height: 35px;
            background-color: var(--themeColor);
            display: flex;
            overflow: hidden;
            border: none;

            &:nth-child(1) span:nth-child(1) {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              transform: translateY(-23px);
            }

            .sunb {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              margin-top: 30px;
            }

            i {
              font-size: 12px;
              margin-right: 6px;
              background-color: rgba(255, 255, 255, 0.2);
              backdrop-filter: blur(10px);
              border-radius: 50%;
              padding: 4px;
            }
          }
        }

      }

    }

    .pwdTips {
      color: #000;
      font-size: 14px;
      font-weight: 600;
      user-select: none;

      &.error {
        animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
      }
    }
  }
}

@keyframes loadToLeft {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
