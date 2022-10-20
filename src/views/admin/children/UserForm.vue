<script setup lang='ts'>
import { reactive, ref, nextTick, getCurrentInstance } from 'vue'
import { FormInstance, FormRules } from 'element-plus'

import { useNow } from '@vueuse/core'
import http from '@/http/http';
const { proxy } = getCurrentInstance() as any
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const rangeDate = () => {
  return (Math.random() * 1e-4).toString(36).slice(-8)
}
const ruleForm = reactive({
  headImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  setHeadImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  name: '',
  username: '',
  password: '',
  power: 'user',
  date: useNow(),
  token: rangeDate() + rangeDate(), // 生成随机token
})
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
    { min: 8, max: 16, message: '密码要求不符合(8-16位)', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      http('POST', '/admin/addUserLzy', ruleForm)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
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

}
const messagetxt = ref('limit 1 file, new file will cover the old file')
const submitUpload = () => {
  nextTick(() => {
    const xFile: any = document.getElementById('xFile') as HTMLInputElement
    let reader = new FileReader();
    reader.readAsDataURL(xFile.files[0]);
    // console.log(`lzy ~ xFile.files[0]`, xFile.files[0])
    reader.onload = function (e) {
      //e代表事件,可以通过e.target获取FileReader对象然后在获取readAsDataURL读取的base64字符
      const base64 = e.target?.result as string
      const blob = proxy.$common.base64toBlob(base64)
      //下面是将blob转换为file 用于上传
      let formData = new FormData();
      formData.append('headImg', xFile.files[0]);

      let headers = {
        'Content-Type': 'multipart/form-data'
      }

      // const file: any = new File([blob], 'headImg.png', { type: 'image/png' })
      http('post', '/admin/uploadHead', formData, headers)
        .then((res: { code: Number, message }) => {
          if (res.code === 200) {
            const objectURL = URL.createObjectURL(blob);
            ruleForm.headImg = objectURL;
            ruleForm.setHeadImg = res.message;
            messagetxt.value = 'limit 1 file, new file will cover the old file'
          } else {
            messagetxt.value = res.message
          }
        })


    }
  })
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
              <el-button type="primary">上传本地</el-button>
            </label>
            <form action="" method="post">
              <input class="fileInput" name="headImg" type="file" id="xFile" @change="submitUpload" />
            </form>

          </div>
          <el-button class="ml-3" type="success" @click="handleExceed"> 系统推荐 </el-button>
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

      .fileInput {
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        opacity: 0;
      }


    }
  }


}
</style>
