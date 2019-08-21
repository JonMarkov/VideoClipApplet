<template>
  <div>

  </div>
</template>

<script>
  import {post} from '@/utils/http.js'

  export default {
    data () {
      return {
        microid: ''
      }
    },
    created () {

    },
    mounted () {
      // 获取到携带的参数
      this.microid = this.$root.$mp.query.microid
      // 函数执行 请求接口--POST（测试）
      this.postCategory()
    },
    methods: {
      // 函数定义 请求接口--POST(测试)
      async postCategory () {
        let header = {
          'content-type': 'application/json' // 默认值
        }
        // 封装参数集合
        let params = {}
        const newparams = Object.assign(params)
        // 开始执行封装的请求
        const data = await post('/microvision/doLike', newparams, header)
        // 打印出返回的数据
        console.log(data)
      }
    }
  }
</script>

<style scoped>
</style>
