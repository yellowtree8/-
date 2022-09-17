<template>
    <div class="mazi-container">
    <a href="javascript:;" @click="drawTree">绘制树</a>
    <div class="wrap">
      <div id="container" ref="chart"></div>
    </div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'MaZi',
  components: {},
  props: {
    code: {
      type: Map,
      require: true
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  created () {
  },
  computed: {
 
  },
  mounted(){

  },
  methods: {
    drawTree () {
      var arr = Array.from(this.code.keys())
      console.log(arr)
      var chart = echarts.init(this.$refs.chart)
      chart.resize({height:arr.length*40})
      var data = {
        name: '根节点',
        children: this.dfs(arr,'')
      }

      chart.setOption({ 
        title: {
          text: '编码树'
        },
        series: [{
          layout: 'orthogonal',
          data: [data],
          top: '2%',
          right:'2%',
          bottom: '2%',
          right: '50%',
          type: 'tree',
          edgeShape: 'curve',
          symbol: 'rect',
          initialTreeDepth: 8,
          itemStyle: {
            color: 'cyan'
          },
          lineStyle: {
            color: 'red',
            curveness: 0
          },
          emphasis: {
            focus: 'ancestor',
            blurScope: 'coordinateSystem'
          },
        }]
      })

    },
      dfs (arr,b) {
      var d =''
      var c = ''
      var f
      if(arr.length==0)
      return null
      if(arr.length==1&&arr[0]=='')
      return null
      var left = arr.filter((value)=>{return value.charAt(0)=='0'})
      var right = arr.filter((value) =>{return value.charAt(0)=='1'})
      if(left.length&&left[0].length==1)
      d = b+left[0]+'('+this.code.get(b+left[0])+')'
      if(right.length&&right[0].length==1)
      c = b+right[0]+'('+this.code.get(b+right[0])+')'
      return [{
        name: d,
        children: f = this.dfs(left.map((item)=>{return item.slice(1)}),b+'0'),
        lineStyle: {
          opacity:  f === null&&d==''?0:1
        },
        itemStyle: {
          opacity:  f === null&&d==''?0:1
        }
      },
      {
        name: c,
        children: f = this.dfs(right.map((item)=>{return item.slice(1)}),b+'1'),
        lineStyle: {
          opacity:  f === null&&c==''?0:1
        },
        itemStyle: {
          opacity:  f === null&&c==''?0:1
        }
      }] 
    }

  }

}
</script>
<style scoped lang='less'>
*{
  margin: 0;
  padding: 0;
}
  .mazi-container{
    height: 100vh;
    width: 100%;
    position: relative;
    background-color: rgb(44, 44, 44);
  }
  .wrap{
    height: 540px;
    width: 1142px;
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%,-50%);
    overflow: auto;
    border: 1px solid black;
    border-radius: 20px;
    background-color: rgb(211, 211, 211);
  }
  #container{
    width: 1120px;
    // height: 3600px;
  }
a{
  text-decoration: none;
  position: absolute;
  top: 20px;
  left: 50%;
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
  border-radius: 20px;
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
</style>
