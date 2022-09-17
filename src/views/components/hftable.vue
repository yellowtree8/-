<template>
    <div class="hfmtable-container">
      <div class="top">
        <a href="javascript:;" class="btn-1" @click="onSort">排序</a>
        <a href="javascript:;" class="btn-2" @click="onCode">计算码字</a>
      </div>
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>出现次数</th>
              <th>概率</th>
              <th>码长</th>
              <th>码字</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in list" :key="item">
              <td>{{item.str}}</td>
              <td>{{item.times}}</td>
              <td>{{item.prob}}</td>
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
  name: 'HfmTable',
  components: {},
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sorted: false,
      mazibiao : new Map(),
      wordtocode: new Map()
    }
  },
  watch: {},
  created () {
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
    onCode(){
      if(!this.sorted)
      this.onSort()
      var timearr = []
      this.list.forEach(item => {
        timearr.push(item.times)
      })
      console.log(timearr)
      this.dfs(timearr,null,null)
      this.list.forEach(item => {
        item.len = item.code.length
        this.mazibiao.set(item.code,item.str)
        this.wordtocode.set(item.str,item.code)
      })
      this.$emit('getMazi',this.mazibiao)
      this.$emit('getWord',this.wordtocode)
    },
    dfs(arr,id,num){

      if(id!=null)
      arr.splice(id+1,0,num)
      var length = arr.length
      if(arr.length==1)
      return 
      var a = arr[length-1]
      var b = arr[length-2]
      var index = length-3
      while(index>=0&&arr[index]<a+b)
      {
        index--
      }
      this.dfs(arr.slice(0,length-2),index,a+b)
      var c  = this.list[index+1].code
      for(let i = 0;i<arr.length-2;i++)
      {
        if(i>=index+1)
        this.list[i].code = this.list[i+1].code
        else{
          this.list[i].code = this.list[i].code
        } 
      }
      this.list[arr.length-2].code = c + '0'
      this.list[arr.length-1].code = c + '1'
    }
  },
}
</script>
<style scoped lang='less'>
  .hfmtable-container{
    height: 100vh;
    width: 100%;
  }
*{
  box-sizing: border-box;
}
    .top{
      width: 100%;
      height: 100px;
      padding-top: 40px;
      position: relative;
      .btn-1{
        position: absolute;
        left: 24%;
      }
      .btn-2{
        position: absolute;
        left: 44%;
      }
    }
  .container{
    height: 500px;
    overflow: auto;
    background-color: rgb(222, 222, 222);
    box-shadow: 0 0 50px rgba(0, 0, 0,0.5);
    margin: 0 auto;
    padding: 0;
    border: 1px solid black;
    border-radius: 30px;
    display: flex;
    justify-content: center;
  }
    .container table{
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
    border-radius: 25px;
    z-index: 1;
  }
  a:nth-child(1){
    width: 80px;
    height: 50px;
    line-height: 50px;
  }
  a:nth-child(2){
    width: 160px;
    height: 50px;
    line-height: 50px;
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
</style>
