<template>
    <div class="remake-container">
      <div class="code-wrap">
        <span style="color: rgb(255,140,172)">编码结果为：</span>
        <span class="code" v-html="mazi"></span>
      </div>
      <a href="javascript:;" @click="onRemake">解码</a>
      <div class="word-wrap">
        <span style="color: rgb(255,140,172)">解码结果为：</span>
        <span class="word" v-html="reword"></span>
      </div>
    </div>
</template>
<script>
export default {
  name: 'ReMake',
  components: {},
  props: {
    codetoword: {
      type: Map,
      required: true
    },
    wordtocode: {
      type: Map,
      required: true
    },
    word: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      mazi:'',
      code: '',
      reword: ''
    }
  },
  watch: {
  },

  created () {
  },
  computed: {
  },
  mounted(){
    var a = true
      for(let i = 0;i<this.word.length;i++)
      {
        this.code+=this.wordtocode.get(this.word.charAt(i))
        if(a)
        this.mazi+= '<span style = "color:white">'+this.wordtocode.get(this.word.charAt(i))+'</span>'
        else
        this.mazi+= '<span style = "color:black">'+this.wordtocode.get(this.word.charAt(i))+'</span>'
        a = !a
      }
  },
  methods: {
    onRemake(){
      var s = ''
      for(let i = 0;i<this.code.length;i++)
      {
        s+=this.code.charAt(i)
        if(this.codetoword.has(s))
        {
          this.reword+=this.codetoword.get(s)
          s=''
        }
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .remake-container{
    height: 100vh;
    width: 100%;
    background-color: rgb(43, 43, 43);
  }
  .code{
    word-wrap: break-word;
  }
  .code-wrap{
    padding: 10px;
    width:1142px;
    max-width: 1142px;
    height: 250px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 20px;
    overflow: auto;
    // position: absolute;
    // left: 50%;
    // transform: translate(-50%);
    border: 1px solid black;
    border-radius: 20px;
    background-color: rgb(211, 211, 211);
  }
  .word-wrap{
    padding: 10px;
    width:1142px;
    max-width: 1142px;
    height: 250px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 370px;
    overflow: auto;
    // position: absolute;
    // left: 50%;
    // transform: translate(-50%);
    border: 1px solid black;
    border-radius: 20px;
    background-color: rgb(211, 211, 211);
  }
a{
  text-decoration: none;
  position: absolute;
  top: 295px;
  left: 50%;
  transform: translate(-50%);
  font-size: 24px;
  background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4 );
  background-size: 400%;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  border-radius: 20px;
  z-index: 1;
}

a::before{
  content: "";
  position: absolute;
  left: -460px;
  right: -460px;
  top: -5px;
  bottom: -5px;
  background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4 );
  background-size: 400%;
  // border-radius: 10px;
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
