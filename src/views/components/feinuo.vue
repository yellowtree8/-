<template>
    <div class="feinuo-index">
      <fn-table :list="list" @getCode="this.code=$event" @getWord="this.wordtocode=$event" v-if="active==1"></fn-table>
      <ma-zi :code="this.code" v-else-if="active==2"></ma-zi>
      <re-make :codetoword="code" :wordtocode="wordtocode" :word="word" v-else-if="active==3"></re-make>
    </div>
    <div class="tabbar">
      <a href="javascript:;" @click="active=1" class="item iconfont icon-zhifangtu" :class="active==1?'item-active':''"></a>
      <a href="javascript:;" @click="active=2" class="item iconfont icon-shuzhuangtu_o" :class="active==2?'item-active':''"></a>
      <a href="javascript:;" @click="active=3" class="item iconfont icon-jiema"  :class="active==3?'item-active':''"></a>
    </div>
</template>
<script>
import FnTable from '../components/fntable.vue'
import MaZi from '../components/mazi.vue'
import ReMake from '../components/remake.vue'
import { useStore } from '/src/stores/index.js'
export default {
  name: 'FeiNuo',
  components: {
    FnTable,
    MaZi,
    ReMake
  },
  props: {},
  data () {
    return {
      word: '',
      list: [],
      active: 1,
      code: null,
      wordtocode: null
    }
  },
  watch: {},
  setup () {
      var store = useStore()
      return {
        store
        }
  },    
  created () {
  },
  mounted () {
    if(this.store.curobj)
    {
      this.word = this.store.word
      var length = this.word.length
      var obj = this.store.curobj
      obj.forEach((value,key) => {
        this.list.push({
          str: key,
          prob: value,
          len: '',
          code: ''
        })
      })
      if(this.sorted)
      this.onCode()
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>
<style scoped lang='less'>
  .feinuo-index{
    background-color: rgb(44, 44, 44);
  }
  .tabbar{
    display: flex;
    height: 99px;
    width: 40px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(107, 103, 103);
    position: fixed;
    bottom: 50px;
    right: 30px;
    a{
      text-align: center;
      width: 40px;
      height: 33px;
      line-height: 33px;
      text-decoration: none;
      color: rgb(222, 222, 222);
      border: 1px solid black;
      font-size: 22px;
    }
    a:nth-child(2){
      border-top: none;
      border-bottom: none;
    }
  }
  .item-active{
    background-color: red;
    color: black;
  }
</style>
