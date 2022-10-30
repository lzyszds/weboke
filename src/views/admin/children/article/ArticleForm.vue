<script setup lang='ts'>
import { ref, defineProps, getCurrentInstance, defineEmits, h } from 'vue'
import { ElMessageBox, } from 'element-plus'
import http from '@/http/http'
import toolbar from './toolbar'
const { proxy } = getCurrentInstance() as any
const emit = defineEmits(['switchMod'])
const orderTool = `emoji undo redo clear |h bold italic strikethrough quote addTag test |left center right ul ol table hr | link image  code tip | save tips`
const props = defineProps({
  type: String,
  data: Object,
})
interface storageType {
  text: string,
  html: string,
}
const storage = ref<storageType>({ text: '', html: '' })
const text = ref<any>(props.data?.content)
const html = ref<any>(props.data?.html)
const title = ref<string>(props.data?.title || '')

//确认提交
const submitForm = () => {
  const data = {
    author: 'lzy',
    title: title.value,
    content: storage.value.text,
    main: storage.value.html,
    coverImg: 'http://localhost:1027/public/img/bg.jpg',
    aid: props.type === 'modify' ? props.data?.aid : null,
  }
  const url = props.type === 'modify' ? 'updateArticle' : 'addArticle'
  //当前是否保存
  if (storage.value.text === text.value || storage.value.html === html.value) {
    http('post', `/admin/${url}`, data).then((res: any) => {
      if (res.code === 200) {
        emit('switchMod', false)
      }
    })
  } else {
    ElMessageBox({
      title: '提示',
      message: h('p', null, [
        h('span', null, '输入内容还未保存，是否需要保存 '),
      ]),
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
      .then(() => {
        const save = document.querySelector('.v-md-icon-save') as HTMLLIElement
        save.click()
        submitForm()
      })
  }
  // http('post', '/admin/' + url, data).then((res: any) => {
  //   if (res.code === 200) {
  //     emit('switchMod', false)
  //   } else {
  //     emit('switchMod', true)
  //   }
  // })
}
//暂存按钮
const resetForm = () => {

}
//本地图片上传到线上，并返回当前文件在线上的path
const handleUploadImage = (event, insertImage, files) => {
  console.log(`lzy ~ event`, event)
  proxy.$common.compressPic(files[0], 0.5).then(({ fileCompress }) => {
    // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
    let formData = new FormData();

    formData.append('upload-image', fileCompress);

    let headers = {
      'Content-Type': 'multipart/form-data',
    }
    // 此处即为向编辑框中插入的内容，url即为图片上传后返回的链接
    http('post', '/admin/uploadArticleImg', formData, headers)
      .then((res: { code: Number, message }) => {
        if (res.code === 200) {
          insertImage({
            url: 'http://localhost:1027' + res.message,
            desc: '点击放大',
          });
        } else {
        }
      })
  })
}
const clicks = (text, html) => {
  storage.value = { text, html, }
  console.log(text, html)
}

</script>

<template>

  <div>
    <div class="headelement">
      <div class="markDowmInput">
        <span>文章标题：</span>
        <input type="text" v-model="title" />
      </div>
      <v-md-editor class="markDowmLzy" v-model="text" :disabled-menus="[]" :left-toolbar="orderTool" @save="clicks"
        @upload-image="handleUploadImage" height="650px" :toolbar="toolbar">
      </v-md-editor>
    </div>
    <div class="btnTool">
      <el-button class="card-button" type="primary" @click="submitForm()">发布内容</el-button>
      <el-button class="card-button" @click="resetForm()">暂存内容</el-button>
    </div>
  </div>

</template>

<style lang="less" scoped>
.headelement {
  box-shadow: 0 0px 10px 1px rgb(0 0 0 / 10%);

  &.markDowmLzy {
    & .v-md-editor {
      box-shadow: none;
    }
  }

  .markDowmInput {
    width: 100%;
    height: 40px;
    display: flex;
    font-size: 20px;
    align-items: center;
    background-color: #fff;
    color: #000;
    // border-radius: 5px;
    font-family: 'almama';
    // border: 1px solid var(--themeColor);
    padding: 0 0 0 20px;
    border-bottom: 2px solid #000;


    input {
      width: calc(100% - 100px);
      border: none;
      outline: none;
      font-size: 20px;
      // border-left: 3px solid #000;
      // margin-left: 30px;
    }
  }

  :deep(.v-md-editor__menu)::-webkit-scrollbar {
    background-color: #fff !important;
  }

  ::-webkit-scrollbar {
    background-color: rgb(40, 44, 52, ) !important;
  }
}

.btnTool {
  display: flex;
  justify-content: flex-end;

  .card-button {
    transform: translate(-50%, 100%);
    width: 100px;
    border-radius: 1rem;
    border: none;
    background-color: var(--themeColor);
    color: #fff;
    font-size: 1rem;
    padding: .5rem 1rem;
    transition: 0.3s ease-out;

    &:nth-child(2) {
      background-color: #fff;
      color: var(--themeColor);
      border: 2px solid var(--themeColor);
    }

    &:hover {
      transform: translate(-50%, 100%) scale(1.1);
    }
  }
}
</style>
