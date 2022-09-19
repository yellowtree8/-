<template>
    <div class="biaoge-index">
      <div class="top">
        <a href="javascript:;" class="btn-1" @click="onSort">排序</a>
        <a href="javascript:;" class="btn-2" @click="onSum">计算累加概率</a>
        <a href="javascript:;" class="btn-3" @click="onInfo">计算信息熵</a>
        <a href="javascript:;" class="btn-4" @click="onLen">计算码长</a>
        <a href="javascript:;" class="btn-5" @click="onCode">计算码字</a>
      </div>
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>概率</th>
              <th>累加概率</th>
              <th>信息熵</th>
              <th>码长</th>
              <th>码字</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in list" :key="item">
              <td>{{item.str}}</td>
              <td>{{item.prob}}</td>
              <td>{{item.sumprob}}</td>
              <td>{{item.info}}</td>
              <td>{{item.len}}</td>
              <td>{{item.code}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
</template>
<script>

import { sortItem } from '/src/utils/paixu.js'
export default {
  name: 'BiaoGe',
  components: {},
  props: {
    list: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      sorted: false,
      mazibiao: new Map(),
      wordtocode: new Map()
    }
  },
  watch: {
  },

  created () {
  },
  mounted () {

  },
  computed: {
  },
  methods: {
    onSort (){
      if(!this.sorted)
      {
        sortItem(this.list)
        this.sorted = true
      }
    },
    onSum () {
      if(!this.sorted)
      this.onSort()
      this.list[0].sumprob = 0
      for(let i = 1;i<this.list.length;i++)
      {
        this.list[i].sumprob = this.list[i-1].sumprob + this.list[i-1].prob
      }
    },
    onInfo () {
      if(!this.sorted)
      this.onSort()
      for(let i = 0;i<this.list.length;i++)
      {
        this.list[i].info = Math.log2(1/this.list[i].prob).toFixed(2)
      }
    },
    onLen () {
      if(this.list[0].info=='')
      this.onInfo()
      for(let i =0;i<this.list.length;i++)
      {
        this.list[i].len = Math.ceil(this.list[i].info)
      }
    },
    onCode(){
      if(this.list[0].sumprob=='')
      this.onSum()
      if(this.list[0].len=='')
      this.onLen()
      for(let i = 0;i<this.list.length;i++)
      {
        var str = ''
        var sum = this.list[i].sumprob
        for(let j = 0;j<this.list[i].len;j++)
        {
          if(sum*2>=1)
          {
            str = str+'1'
            sum = sum*2-1
          }
          else{
            str = str + '0'
            sum = sum*2
          }
        }

        this.list[i].code = str
        this.mazibiao.set(this.list[i].code,this.list[i].str)
        this.wordtocode.set(this.list[i].str,this.list[i].code)
      }
    this.$emit('getCode',this.mazibiao)
    this.$emit('getWord',this.wordtocode)
    }
  }
}
</script>
<style scoped lang='less'>
*{
  box-sizing: border-box;
}
  .biaoge-index{
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .top{
      width: 100%;
      height: 100px;
      padding-top: 35px;
      position: relative;
      display: flex;
      justify-content: space-around;
      .btn-1{
        position: absolute;
        left: 24%;
      }
      .btn-2{
        position: absolute;
        left: 44%;
      }
      .btn-3{
        position: absolute;
        left: 60%;
      }
      .btn-4{
        position: absolute;
        left: 71%;
      }
      .btn-5{
        position: absolute;
        left: 80%;
      }
    }
  }
  .container{
    width: 90%;
    height: 80%;
    overflow: auto;
    background-color: rgb(222, 222, 222);
    box-shadow: 0 0 50px rgba(0, 0, 0,0.5);
    margin: 0 auto;
    padding: 0;
    display: flex;
    justify-content: center;
  }
    .container table{
      width: 95%;
    // 让边框合并
    border-collapse: collapse;
  }
      // PC端兼容
    .container table thead{
      position: sticky;
      top: 0px;
    }
    .container table thead tr th{
      background-color: #4fc3a1;
      color: #fff;
    }
    .container table thead tr th:nth-child(odd){
      background-color: #324960;
    }
    .container table thead tr th:nth-child(2),.container table tbody tr td:nth-child(2){
      width: 314.188px;
    }
    .container table thead tr th:nth-child(3),.container table tbody tr td:nth-child(3){
      width: 300.125px;
    }
    .container table thead tr th:nth-child(6),.container table tbody tr td:nth-child(3){
      width: 160px;
    }
    .container table thead tr th,.container table tbody tr td{
      text-align: center;
      padding: 10px 20px;
    }
    .container table tbody tr td{
      border: 1px solid rgb(200, 200, 200);
    }
    .container table tbody tr:nth-child(odd){
      background-color: #f8f8f8;
    }

    a{
    text-decoration: none;
    font-size: 20px;
    background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4 );
    background-size: 400%;
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: rgb(222, 222, 222);
    text-transform: uppercase;
    border-radius: 15px;
    z-index: 1;
  }
  a:nth-child(1){
    width: 80px;
    height: 40px;
    line-height: 40px;
  }
  a:nth-child(2){
    width: 160px;
    height: 40px;
    line-height: 40px;
  }
  a:nth-child(3){
    width: 130px;
    height: 40px;
    line-height: 40px;
  }
  a:nth-child(4){
    width: 100px;
    height: 40px;
    line-height: 40px;
  }
  a:nth-child(5){
    width: 100px;
    height: 40px;
    line-height: 40px;
  }
  a::before{
    content: "";
    position: absolute;
    left: -5px;
    right: -5px;
    top: -5px;
    bottom: -5px;
    background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4 );
    background-size: 400%;
    border-radius: 50px;
    filter: blur(20px);
    z-index: -1;
  }

  a:hover{
    animation: sun 8s infinite;
  }

  a:hover::before{
    animation: sun 8s infinite;
  }

  @keyframes sun{
    100%{
      background-position: -400% 0;
    }
  }

    // 移动端兼容
    //媒体查询
    @media (max-width: 765px) {
      .container table{
        display: flex;
      }
      .container table thead tr{
        display: flex;
        flex-direction: column;
      }
      .container table tbody {
        display: flex;
        overflow: auto;
      }
      .container table tbody tr{
        display: flex;
        flex-direction: column;
      }
      .container table thead tr th,.container table tbody tr td{
        text-align: left;
        width: 120px;
        padding: 20px;
        border: 0;
        border-bottom:1px solid rgb(200, 200, 200);
        border-right: 1px solid rgb(200, 200, 200);
      }
      .container table thead tr th:last-child,.container table tbody tr td:last-child{
        border-bottom: 0;
      }
      .container table tbody tr td:nrh-child(odd){
        background-color: #f8f8f8;
      }
      .container table tbody tr:nth-child(odd){
        background-color: transparent;
      }
    }
</style>
