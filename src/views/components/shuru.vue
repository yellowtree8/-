<template>
    <div class="shuru-index">
      <div class="wrap">
        <div class="tishi"><span>上传txt文件进行编码：</span></div>
        <div class="upload">
          <input ref="txtipt" type="file" name="upload" id="file" @change="onChange" accept=".txt">
          <label for="file">+</label>
        </div>    
        <div class="detail">
          <i class="iconfont icon-wenbenwenjian" v-if="isfile"></i>
          <i class="iconfont icon-zanwuxinxi" v-else></i>
          <span v-if="isfile">{{filename}}</span>
          <span v-else>暂无文件</span>
        </div>  
      </div>

      <div class="chart-wrap">
        <div class="mychart" ref="mychart"></div>
      </div>
    </div>

</template>
<script>
import jQuery from 'jquery'
import * as echarts from 'echarts'
import { useStore } from '/src/stores/index.js'
export default {
  name: 'ShuRu',
  components: {},
  props: {},
  data () {
    return {
      mapobj: null,
      file: null,
      word: '',
      isfile: false,
      filename: ''
    }
  },
  watch: {},
  setup () {
    let store = useStore()
    function editfile(data) {
      store.setfile(data)
    }
    function editobj(data){
      store.setobj(data)
    }
    function editword(data){
      store.setword(data)
    }
    return {
      store,
      editfile,
      editobj,
      editword
    }

  },
  created () {
  },
  mounted(){
    this.$refs.txtipt.files = this.store.curfile
    if(this.store.curfile)
    {
      this.filename = this.store.curfile[0].name
      this.isfile = true
    }
    if(this.store.curobj)
    this.drawpic(this.store.curobj)
  },
  computed: {
  },
  methods: {
    onChange () {
      var mapobj = new Map()
      var a = ''
      this.getFileContent(this.$refs.txtipt, function (str) {
        str=str.replace(/\n/g,"<br/>"); //格式保留，追加换行
        var len = str.length
        a = str
        for(let i = 0;i<str.length;i++)
        {
          if(mapobj.has(str.charAt(i)))
          mapobj.set(str.charAt(i),mapobj.get(str.charAt(i))+1/len)
          else
          mapobj.set(str.charAt(i),1/len)
        }

      });
      setTimeout(() => {
        this.editword(a)
        this.drawpic(mapobj)  
        this.editobj(mapobj)
      }, 200);
    },
    getFileContent(fileInput, callback) {
      this.editfile(fileInput.files)
      this.filename = fileInput.files[0].name
      this.isfile = true
      if (fileInput.files && fileInput.files.length > 0 && fileInput.files[0].size > 0) {
          var file = fileInput.files[0];
          if (window.FileReader) {
              var reader = new FileReader();
              reader.onloadend = function (evt) {
                  if (evt.target.readyState == FileReader.DONE) {
                      callback(evt.target.result);
                  }
              };
              // 包含中文内容用gbk编码
              reader.readAsText(file, 'utf-8');
          }
      }
    },
    drawpic (obj) {
    var mychart = echarts.init(this.$refs.mychart)
    var option = {
      title: {
        text: '概率分布直方图'
      },
      xAxis: {
        data: Array.from(obj.keys())
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: Array.from(obj.values())
        }
      ]
    }
    mychart.setOption(option)
    }
  }
}
</script>
<style scoped lang='less'>
.shuru-index{
  height: 100vh;
  background-image: url('/src/images/CSDN.gif');
  background-repeat: repeat !important;
  background-color: #0a0a0a !important;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.wrap{
  flex-basis: 80px;
  height: 80px;
  // position: relative;
  // margin-left: 200px;
  // padding-top: 20px;
  // display: inline-block;
  transition: 1s;
  width: 400px;
  display: flex;
  justify-content: left;
}
.wrap:hover{
  width: 380px;
}
.wrap:hover .detail{
  opacity: 1;

}
.tishi{
  width: 250px;
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  color: rgb(222,222,222);
  span{

  }
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
    // left: 285px;
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
  .chart-wrap{
    width: 90%;
    height: 80%;
    background-color: rgb(211, 211, 211);
    border: 1px solid black;
    // position: absolute;
    // left: 50%;
    // margin-top: 10px;
    // transform: translate(-50%);
    border-radius: 50px;
    display: flex;
    justify-content: center;
  }
  .mychart{
    width: 90%;
    height: 100%;
  }
  @media (max-width: 765px){
    .chart-wrap{
      width: 500px;
    }
  }
</style>
