<template>
    <div class="huatu-index">

    </div>
</template>
<script>

export default {
  name: 'HuaTu',
  components: {},
  props: {
    width: {
      type: String,
      require: true
    },
    height: {
      type: String,
      require : true
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  created () {
  },
  mounted(){
    this.drawdata()
  }
  computed: {
  },
  methods: {

  },
}
</script>
<style scoped lang='less'>

</style>
