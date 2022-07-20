<template>
  <div class="edit_container">
    <quill-editor
      rows="10"
      v-model="content"
      aria-placeholder="998"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      content: '', // 富文本编辑器默认内容
      editorOption: {
        height: '500px',
        placeholder: '请输入正文'
      } // 富文本编辑器配置
    }
  },
  methods: {
    // 准备编辑器
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    // 失去焦点事件
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    // 获得焦点事件
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    // 内容改变事件
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>
<style scoped lang='less'>
:deep(.ql-container) {
  height: 300px;
}
</style>
