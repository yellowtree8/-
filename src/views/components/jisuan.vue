<template>
    <div class="jisuan-index">
      <div class="shuoming">
        <span>暂未开发，请先使用编码与点名功能</span>
      </div>
    </div>
</template>
<script>
export default {
  name: 'JiSuan',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
  },
}
</script>
<style scoped lang='less'>
  .jisuan-index{
    height: 100vh;
  background-image: url('/src/images/CSDN.gif');
  background-repeat: repeat !important;
  background-color: #0a0a0a !important;
    display: flex;
    justify-content: center;
    align-items: center;
    .shuoming{
      width: 400px;
      height: 200px;
      background-color: rgb(211, 211, 211);
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        width: 300px;
      }
    }
  }
</style>
