<template>
  <div>
    <div class="y-tab-container">
      <span v-for="(tab,index) in tabList" :key="index"
            class="y-tab" :class="{'selected': selectedTabIndex === index}"
            @click="handleTab(index)">
        {{tabKey ? tab[tabKey] : tab}}
      </span>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  name: 'Tab',
  props: {
    tabList:{
      type: Array,
      default: function () {
        return [];
      }
    },
    tabKey:{
      type: String,
      default: ''
    },
  },
  data(){
    return {
      selectedTabIndex: 0
    }
  },
  methods:{
    handleTab(index){
      this.selectedTabIndex = index;
      this.$emit('change',index);
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  .y-tab-container{
    width: 100%;
    white-space: nowrap;
    .y-tab{
      display: inline-block;
      padding: 10px;
    }
    .y-tab:hover{
      cursor: pointer;
    }
    .y-tab.selected{
      font-weight: bold;
    }
  }
</style>
