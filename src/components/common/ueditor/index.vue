<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
/*eslint-disable*/
import '../../../../static/lib/ueditor/ueditor.config.js'
import '../../../../static/lib/ueditor/ueditor.all.js'
import '../../../../static/lib/ueditor/lang/zh-cn/zh-cn.js'
import '../../../../static/lib/ueditor/ueditor.parse.js'

export default {
  name: "ueditor",
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: function () {
        return {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    //初始化UE
    this.editor = UE.getEditor('editor',this.config);
    this.editor.addListener("ready", ()=>{
      this.editor.setContent(this.value); // 确保UE加载完成后，放入内容。

      this.editor.addListener("contentChange",()=>{
        this.$emit('on-change',this.editor.getContent())   //内容发生变化，触发input事件，此处是为了实现v-mode功能
      })
    });
  },
  destroyed() {
    this.editor.destroy();
  },
  methods:{
    getUEContent: function(){
      return this.editor.getContent();
    }
  }
}
</script>
