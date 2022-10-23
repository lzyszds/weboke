<script setup lang='ts'>
import { reactive, ref, getCurrentInstance, defineProps, defineEmits } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import http from '@/http/http';
const emit = defineEmits(['switchAdd', 'switchMod'])
const props = defineProps({
  type: String,
  data: Object,
})
const { proxy } = getCurrentInstance() as any
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const rangeDate = () => {
  return (Math.random() * 1e-4).toString(36).slice(-8)
}
//随机推荐头像
const randomAvatar = () => {
  const arr: string[] = [
    'http://localhost:1027/public/img/updataImg/put1.jpg',
    'http://localhost:1027/public/img/updataImg/put2.jpg',
    'http://localhost:1027/public/img/updataImg/put3.jpg',
    'http://localhost:1027/public/img/updataImg/put4.jpg',
    'http://localhost:1027/public/img/updataImg/put5.jpg',
    'http://localhost:1027/public/img/updataImg/put6.jpg',
    'http://localhost:1027/public/img/updataImg/put7.jpg',
  ]
  const random = Math.floor(Math.random() * arr.length) as any
  if (localStorage.getItem('randomAvatar') == random) {
    return randomAvatar()
  } else {
    localStorage.setItem('randomAvatar', random)
    return arr[random]
  }
}
const ruleForm: any = ref()
if (props.type == 'modify') {
  ruleForm.value = {
    headImg: 'http://localhost:1027' + props.data?.headImg,
    setHeadImg: 'http://localhost:1027' + props.data?.headImg,
    name: props.data?.uname,
    username: props.data?.username,
    password: props.data?.pwd,
    power: props.data?.power,
    date: props.data?.date,
    token: props.data?.token,
    uid: props.data?.uid,
  }
} else {
  const random = randomAvatar()
  ruleForm.value = {
    headImg: random,
    setHeadImg: random,
    name: '',
    username: '',
    password: '',
    power: 'user',
    date: Date.now(),
    token: rangeDate() + rangeDate(), // 生成随机token
  }
}
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '名称不能为空,请输入名称', trigger: 'blur' },
    { min: 3, max: 16, message: '名称要求不符合(3-16位)', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '账号名不能为空,请输入账号名', trigger: 'blur' },
    { min: 3, max: 16, message: '账号名要求不符合(3-16位)', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空,请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码要求不符合(6-16位)', trigger: 'blur' },
  ],
})

const onAddUser = () => {
  ruleForm.value.setHeadImg = ruleForm.value.headImg.replace('http://localhost:1027', '');
  http('POST', '/admin/addUserLzy', ruleForm.value)
    .then(() => {
      emit('switchAdd', false)
    })
    .catch((err) => {
      console.log(err)
    })
}
const onmodifyUser = () => {
  ruleForm.value.setHeadImg = ruleForm.value.headImg.replace('http://localhost:1027', '');
  http('POST', '/admin/updateUserLzy', ruleForm.value)
    .then(() => {
      emit('switchMod', false)
    })
    .catch((err) => {
      console.log(err)
    })
}

//提交表单入后台
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (props.type === 'modify') onmodifyUser() //修改用户数据
      else onAddUser()  //新增用户
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const handleExceed = () => {
  const random = randomAvatar()
  ruleForm.value.headImg = random;
  ruleForm.value.setHeadImg = random?.replace('http://localhost:1027', '');
}
const messagetxt = ref('limit 1 file, new file will cover the old file')
const upClick = () => {
  const file = document.getElementById('xFile') as HTMLInputElement
  file.click()
}

//头像上传按钮 逻辑块
const submitUpload = () => {
  const xFile: any = document.getElementById('xFile') as HTMLInputElement
  let reader = new FileReader();
  reader.readAsDataURL(xFile.files[0]);
  reader.onload = function (e) {
    //e代表事件,可以通过e.target获取FileReader对象然后在获取readAsDataURL读取的base64字符
    const base64 = e.target?.result as string
    const blob = proxy.$common.base64toBlob(base64)
    //下面是将blob转换为file 用于上传
    let formData = new FormData();
    formData.append('headImg', xFile.files[0]);
    let headers = {
      'Content-Type': 'multipart/form-data',
    }
    //给后台上传头像图片，并获取后台返回新的图片地址
    http('post', '/admin/uploadHead', formData, headers)
      .then((res: { code: Number, message }) => {
        if (res.code === 200) {
          const objectURL = URL.createObjectURL(blob);
          ruleForm.value.headImg = objectURL;//显示的头像blob转化为可图片显示的src
          ruleForm.value.setHeadImg = res.message; //放入数据库中的图片路径
          messagetxt.value = 'limit 1 file, new file will cover the old file'
        } else {
          messagetxt.value = res.message
        }
      })
  }
}
</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="140px" class="demo-ruleForm" :size="formSize"
    status-icon>
    <div class="headelement">
      <el-avatar :size="100" :src="ruleForm.headImg" />
      <div class="upload-demo">
        <div class="fileBtn">
          <div class="fileUpload">
            <label class="ui_button ui_button_primary" for="xFile">
              <el-button type="primary" @click="upClick">上传本地</el-button>
            </label>
            <form action="" method="post">
              <input class="fileInput" name="headImg" type="file" @change="submitUpload" id="xFile" />
            </form>

          </div>
          <el-button class="recommended" @click="handleExceed"> 系统推荐 </el-button>
        </div>
        <div class="el-upload__tip text-red" :class="{grey:messagetxt.indexOf('limit')!=-1}">
          {{messagetxt}}
        </div>
      </div>
    </div>
    <el-form-item label="Name(名称)" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="power(权限)" prop="power">
      <el-select v-model="ruleForm.power" placeholder="Activity power">
        <el-option label="admin" value="admin" />
        <el-option label="user" value="user" />
      </el-select>
    </el-form-item>
    <el-form-item label="create(创建)" prop="date">
      <el-date-picker v-model="ruleForm.date" type="date" placeholder="Pick a day" disabled />
    </el-form-item>
    <el-form-item label="token(凭借)" prop="delivery">
      <el-input v-model="ruleForm.token" disabled />
    </el-form-item>
    <el-form-item label="UserName(账号)" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="PassWord(密码)" prop="password">
      <el-input v-model="ruleForm.password" type="password" show-password />
    </el-form-item>
    <el-form-item>
      <el-button class="card-button" type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
      <el-button class="card-button" @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
.headelement {
  text-align: center;

  :deep(.el-form-item__content) {
    display: block;
  }

  .text-red {
    margin-bottom: 20px;
    color: #f56c6c;

    &.grey {
      color: #606266;
    }
  }

  .fileBtn {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      height: 27px;
    }

    .fileUpload {
      width: 85px;
      position: relative;
      overflow: hidden;
      background-color: #f56c6c;
      border-radius: 5px;

      button {
        background: transparent;
        border: none;
      }

      .ui_button {
        cursor: pointer !important;
      }

      .fileInput {
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer !important;
        display: none;
      }
    }

    :deep(.recommended) {
      margin-left: 10px;
      background-color: var(--themeColor);
      border: none;
      color: #fff;
    }
  }
}
</style>
