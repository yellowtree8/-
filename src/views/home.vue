<template>
    <div class="home-index">
      <router-view></router-view> 
      <div class="shell">
        <a href="javascript:;" class="box" :class="active==0?'item-active':''" @click="this.$router.push('/shuru');active = 0"><i class="iconfont icon-shuru"></i><span>编码输入</span></a>
        <a href="javascript:;" class="box" :class="active==1?'item-active':''" @click="this.$router.push('/xiangnong');active = 1"><i class="iconfont icon-navicon-bmfa"></i><span>香农编码</span></a>
        <a href="javascript:;" class="box" :class="active==2?'item-active':''" @click="this.$router.push('/feinuo');active = 2"><i class="iconfont icon-bianma"></i><span>费诺编码</span></a>
        <a href="javascript:;" class="box" :class="active==3?'item-active':''" @click="this.$router.push('/hafuman');active = 3"><i class="iconfont icon-agora_-duobianmageshizhichi"></i><span>哈夫曼编码</span></a>
        <a href="javascript:;" class="box" :class="active==4?'item-active':''" @click="this.$router.push('/jisuan');active = 4"><i class="iconfont icon-bianmaguize"></i><span>计算器</span></a>
        <a href="javascript:;" class="box" :class="active==5?'item-active':''" @click="this.$router.push('/dianming');active=5"><i class="iconfont icon-jisuanqi"></i><span>点名</span></a>
        <!-- <a href="javascript:;" class="box" :class="active==6?'item-active':''" @click="this.$router.push('/taolun');active=6"><i class="iconfont icon-dianming"></i><span>讨论区</span></a> -->
      </div>   

    </div>
</template>
<script>
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
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
  *{
    text-decoration: none; 
  }
  .home-index{
    margin-left: 50px;
    .shell{
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100vh;
      width: 50px;
      background-color: rgb(17, 24, 39);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: .3s;
      overflow: hidden;
    }
    .box{
      display: block;
      height: 15%;
      width: 100%;
      transition: all .3s;
      border-radius: 5px;
      position: relative;
      color: rgb(160, 160, 175);
    }
    .box i{
      font-size: 30px;
      position: absolute;
      margin: 24px 0 0 7px;
    }
    .box:nth-child(4)::before{
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: rgb(55, 65, 81);
        position: absolute;
        bottom: -10px;
    }
    .box span{
        position: relative;
        top: 22px;
        left: 80px;
        font: 500 20px '';
        opacity: 0;
        transition: .1s;
    }
    .shell:hover{
        width: 270px;
    }
    .box:hover{
        background-color: rgb(55, 65, 81);
    }
    .shell:hover span{
        opacity: 1;
    }
    .box:hover{
        color: #fff;
    }
    // .shell:nth-child(2) {
    //     background-color: rgb(243, 244, 246);
    // }
    // .shell:nth-child(2) .box:hover{
    //     background-color: rgb(209, 213, 219);
    //     color: rgb(241, 159, 159);
    // }
    // .shell:nth-child(2) .box{
    //     color: #000;
    // }

    // .shell:nth-child(3) {
    //     background-color: rgb(49,46,129);
    // }
    // .shell:nth-child(3) .box:hover{
    //     background-color: rgb(67, 56, 202);
    // }
    // .shell:nth-child(3) .box{
    //     color: rgb(140, 120, 240);
    // }
    .item-active{
      background-color: rgb(241, 159, 159);
    }
  }
</style>
