<template>
    <div class="hafuman-index">
      <hfm-table :list="this.list" @getMazi ="this.code = $event" @getWord="this.wordtocode = $event" v-if="active==1"></hfm-table>
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
import HfmTable from '../components/hftable.vue'
import MaZi from '../components/mazi.vue'
import ReMake from '../components/remake.vue'
import { useStore } from '/src/stores/index.js'
export default {
  name: 'HaFuman',
  components: {
    HfmTable,
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
  computed: {
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
          times: Math.round(value*length),
          len: '',
          code: ''
        })
      })
      if(this.sorted)
      this.onCode()
    }
  },
  methods: {
  },
}
</script>
<style scoped lang='less'>
  .hafuman-index{
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
