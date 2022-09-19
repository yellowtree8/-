<template>
    <div class="dianming-index">
      <div class="top">
        <div class="wrap">
          <span class="tishi">上传点名册(.xlsx)：</span>
          <div class="upload">
          
            <input ref="txtipt" type="file" name="upload" id="file" @change="importf(this.$refs.txtipt)" accept=".xlsx">
            <label for="file">+</label>
          </div>    
          <div class="detail">
            <i class="iconfont icon-wenbenwenjian" v-if="isfile"></i>
            <i class="iconfont icon-zanwuxinxi" v-else></i>
            <span v-if="isfile">{{filename}}</span>
            <span v-else>暂无文件</span>
          </div>  
        </div> 
        <a href="javascript:;" @click="onCall">点名</a>
      </div>
      <div class="data-wrap">
        <div class="rectangle" :class="isgo?'active':''" :style="letsgo" @animationend="onEnd">
          <div class="rec-item" v-for="item in cur" :key="item">
            <span>{{item.学号}}</span>
            <span>{{item.姓名}}</span>
          </div>

        </div>
        <div class="username" ref="listwrap" :class="isshow?'username-active':''" @mousewheel="onwheel" @scroll="onScroll">
          <div class="useritem" v-for="(item,index) in list" :key="index">
            <span>{{item.学号}}</span>
            <span>{{item.姓名}}</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import XLSX from 'xlsx'
import * as jQuery from 'jquery'
export default {
  name: 'DianMing',
  components: {},
  props: {},
  data () {
    return {
      isfile: false,
      list: [],
      wb: '',
      rABS: false,
      len: 0,
      cur: new Array(6).fill({姓名:'',学号:''}),
      letsgo: {},
      isgo: true,
      isshow: false,
      filename: '',
      a: -1

    }
  },
  watch: {},
  created () {
  },
  computed: {
  },
  methods: {
    onScroll (e){ 
      var father = this.$refs.listwrap
      if(father.scrollHeight-father.scrollTop==father.clientHeight)
      {
        father.scrollTop = 0

      }

        if(this.a == Math.round(father.scrollTop/50))
        {
          return
        } else{
          this.a = Math.round(father.scrollTop/50)
          this.cur = this.list.slice(this.a,this.a+6)
        }
        
      // if(father.scrollTop%50==0)
      // {
      //   var a = father.scrollTop/50
      //   this.cur = this.list.slice(a,a+6)
      // }
    },
    onEnd(){
      this.isgo = false
    },
    onCall(){
      var father = this.$refs.listwrap
      var len = this.list.length-6
      var duration = Math.floor(Math.random()*len)+len
      this.isgo = true
      this.letsgo.animationDuration= duration*100+'ms'
      this.letsgo.animationPlayState = 'running'
      
      var temp = 0
      var timer = setInterval(()=>{
        console.log(father.scrollTop)
        father.scrollTop = Math.round((father.scrollTop+50)/50)*50
        temp += 1
        if(duration==temp)
        {
          clearInterval(timer)
        }
      },100)
    },
      // var wb;//读取完成的数据
      // var rABS = false; //是否将文件读取为二进制字符串
      importf(obj) {//导入
          if(!obj.files) {
              return;
          }
          var f = obj.files[0];
          this.filename = f.name
          this.isfile = true
          var reader = new FileReader();
          reader.onload = (e)=> {
              var data = e.target.result;
              if(this.rABS) {
                  this.wb = XLSX.read(btoa(this.fixdata(data)), {//手动转化
                      type: 'base64'
                  });
              } else {
                  this.wb = XLSX.read(data, {
                      type: 'binary'
                  });
              }
              //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
              //wb.Sheets[Sheet名]获取第一个Sheet的数据
          this.list = XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]) 
              //行数

          this.list = this.list.concat(this.list.slice(0,6))
          this.len = this.list.length
          this.cur = this.list.slice(0,6)
          this.isshow = true
          };

          if(this.rABS) {
              reader.readAsArrayBuffer(f);
          } else {
              reader.readAsBinaryString(f);
          }
      },
  
      fixdata(data) { //文件流转BinaryString
          var o = "",
              l = 0,
              w = 10240;
          for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
          return o;
      }      
  },
}
</script>
<style scoped lang='less'>
  .dianming-index{
   height: 100vh;
  background-image: url('/src/images/CSDN.gif');
  background-repeat: repeat !important;
  background-color: #0a0a0a !important;
         perspective: 800px;
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         align-items: center;
  }
  .top{
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
.wrap{
  margin-right: 100px;

  transition: 1s;
  width: 400px;
  display: flex;
  height: 80px;
  justify-content: center;
  .tishi{
    font-size: 20px;
    color: rgb(222,222,222);
    line-height: 80px;
  }
}

.wrap:hover .detail{
  opacity: 1;

}

  #file{position: absolute;clip: rect(0,0,0,0);}
  .upload label{
      width: 80px;
      height: 80px;
      border: 1px solid #00a5e0;
      background-color: #00a5e0;
      color: #fff;
      display: inline-block;
      line-height: 75px;
      font-size: 50px;
      text-align: center;
      cursor: pointer;
      z-index: 2;
      border-radius: 4px;
  }
  .detail{
    transition: 1s;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // position: absolute;
    // top: 20px;
    // left: 200px;
    width: 80px;
    height: 80px;
    border: 1px solid #00a5e0;
    background-color: #00a5e0;
    border-radius: 4px;
    i{
      font-size: 32px;
      color: rgb(211, 211, 211);
    }
    span{
      font-size: 8px;
      text-align: center;
      color: rgb(211, 211, 211);
    }
  }
a{
  text-decoration: none;
  // position: absolute;
  // top: 30px;
  // margin-left: 700px;
  transform: translate(-50%);
  font-size: 24px;
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
  .data-wrap{
    background-color: rgb(211, 211, 211);
    border-radius: 40px;
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .rectangle{
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
      div{
        width: 200px;
        height: 200px;
        border: 1px solid rgb(100,100,100);  
        float: left;
        position:absolute;

      // background: linear-gradient(to right,#1f4037,#99f2c8);
        background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4 );
      // background: linear-gradient(90deg,#C4E759,#6DE195,#41C7AF, #54a3e3);
      background-size: 400%;
      animation: sun 16s infinite;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span{
      }
      }
  }
  .active{
      animation-name: cube;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      animation-duration: 5s;
  }
  .rec-item:nth-child(1){
                transform: rotateX(90deg) translateZ(100px);

  }
  .rec-item:nth-child(2){
                transform: rotateX(-90deg) translateZ(100px);
  }
  .rec-item:nth-child(3){
                transform: rotateZ(0deg) translateZ(100px);          
                color: white;
  }
  .rec-item:nth-child(4){
                transform: rotateY(-90deg) translateZ(100px);
  }
  .rec-item:nth-child(5){
                transform: rotateY(90deg) translateZ(100px);
  }
  .rec-item:nth-child(6){
                transform: rotateZ(180deg) translateZ(-100px);
  }
  @keyframes cube{
      from{
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
      }
      to{
          transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
      }
  }

  .username{
    box-sizing: content-box;
    width:400px;
    height: 300px;
    box-shadow: 10px 10px 5px rgb(80, 80, 80);
    border: 1px solid rgb(80, 80, 80);
    border-radius: 10px;
    overflow: auto;
    position: relative;
  }
  .username-active{
    background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4 );
    background-size: 400% 16.7%;
    background-position: 0 100px;
    background-repeat: repeat-x;    
    animation: go 16s infinite;
  }

  @keyframes go{
    100%{
      background-position-x: -400%;
    }
  }
  .username::-webkit-scrollbar { width: 0 !important }
  .useritem{
    // box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    // padding-left: 10px;
    width: 400px;
    // border: 1px solid black;
    span{
      padding: 0 10px;
    }
  }
</style>
