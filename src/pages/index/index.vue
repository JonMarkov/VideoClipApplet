<template>
  <div class="body_page">
    <!-- 列表筛选部分 -->
    <div class='list_title'>
      <!-- 默认 -->
      <div @click='defaultSort' class='list_title_screen'>
        <p :style="{opacity:(default_state?'0.5':'1')}">默认</p>
        <!-- 未选中 -->
        <img class='show_icon' src='../../../static/images/present_0@3x.png' v-if="default_state">
        <!-- 已选中 -->
        <img class='hide_icon' src='../../../static/images/present_1@3x.png' v-else>
      </div>
      <!-- 更新 -->
      <div @click='updateSort' class='list_title_screen'>
        <p :style="{opacity:(update_state?'0.5':'1')}">更新</p>
        <!-- 未选中 -->
        <img class='show_icon' src='../../../static/images/present_0@3x.png' v-if="update_state">
        <!-- 已选中 -->
        <img class='hide_icon' src='../../../static/images/present_1@3x.png' v-else>
      </div>
      <!-- 观看 -->
      <div @click='viewSort' class='list_title_screen'>
        <p :style="{opacity:(view_state?'0.5':'1')}">观看</p>
        <!-- 未选中 -->
        <img class='show_icon' src='../../../static/images/present_0@3x.png' v-if="view_state">
        <!-- 已选中 -->
        <img class='hide_icon' src='../../../static/images/present_1@3x.png' v-else>
      </div>
      <!-- 点赞 -->
      <div @click='likesSort' class='list_title_screen'>
        <p :style="{opacity:(like_state?'0.5':'1')}">默认</p>
        <!-- 未选中 -->
        <img class='show_icon' src='../../../static/images/present_0@3x.png' v-if="like_state">
        <!-- 已选中 -->
        <img class='hide_icon' src='../../../static/images/present_1@3x.png' v-else>
      </div>
    </div>
    <!-- 列表内容部分 -->
    <div class="list_box">
      <div class="list_box_details" v-for="item in Data_Arr" wx:key="index" @click="jumpPlay"
           :data-microId="item.microId">
        <div class="list_box_details_img">
          <img :src="item.screensHotUrl"/>
        </div>
        <div class="list_box_details_desc">
          <div class="desc">
            <p class="desc_title">{{item.name}}</p>
            <p class="desc_info">
              <span v-if="item.updateStatus === 0">更新至{{item.setNum}}集</span>
              <span v-else>已完结</span></p>
          </div>
          <div class="list_box_details_operator">
            <div class="operator_look"><img src="../../../static/images/watch@3x.png"/>{{item.playCount}}</div>
            <div class="operator_like"><img src="../../../static/images/like@3x.png"/>{{item.likeCount}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {get} from '@/utils/http.js'

  export default {
    data () {
      return {
        default_state: false,
        update_state: true,
        view_state: true,
        like_state: true,
        Data_Arr: []
      }
    },
    created () {
      // 函数执行 默认排序-请求接口--微剧列表（GET）
      this.getCategory(1, 0, 40)
    },
    mounted () {

    },
    methods: {
      // 函数定义 请求接口--GET
      async getCategory (sortType, startId, pageSize) {
        let header = {
          'content-type': 'application/json' // 默认值
        }
        // 封装参数集合
        let params = {
          sortType: sortType,
          startId: startId,
          pageSize: pageSize
        }
        const newparams = Object.assign(params)
        // 开始执行封装的请求
        const data = await get('/microvision/getMicrovisionListForSquare', newparams, header)
        // 打印出返回的数据
        let resData = data.data
        let DataArr = []
        for (let i in resData) {
          let playCountState = resData[i].playCount
          let likeCountState = resData[i].likeCount
          let playCount = this.calculate(playCountState)
          let likeCount = this.calculate(likeCountState)
          let temp = {
            name: resData[i].name,
            screensHotUrl: resData[i].screensHotUrl,
            updateStatus: resData[i].updateStatus,
            setNum: resData[i].setNum,
            playCount: playCount,
            likeCount: likeCount,
            microId: resData[i].id
          }
          DataArr.push(temp)
        }
        this.Data_Arr = DataArr
      },
      // 函数定义 默认排序
      defaultSort () {
        this.default_state = false
        this.update_state = true
        this.view_state = true
        this.like_state = true
        // 函数执行 默认排序-请求接口--微剧列表（GET）
        this.getCategory(1, 0, 40)
      },
      // 函数定义 更新排序
      updateSort () {
        this.default_state = true
        this.update_state = false
        this.view_state = true
        this.like_state = true
        // 函数执行 更新排序-请求接口--微剧列表（GET）
        this.getCategory(2, 0, 40)
      },
      // 函数定义 观看排序
      viewSort () {
        this.default_state = true
        this.update_state = true
        this.view_state = false
        this.like_state = true
        // 函数执行 观看-请求接口--微剧列表（GET）
        this.getCategory(3, 0, 40)
      },
      // 函数定义 喜欢排序
      likesSort () {
        this.default_state = true
        this.update_state = true
        this.view_state = true
        this.like_state = false
        // 函数执行 点赞排序-请求接口--微剧列表（GET）
        this.getCategory(4, 0, 40)
      },
      // 函数定义 如果到“万”则换算
      calculate (res) {
        if (res > 9999) {
          res = (res / 10000).toFixed(0) + 'W'
        }
        return res
      },
      // 函数定义 跳转到播放页
      jumpPlay (e) {
        let microid = e.currentTarget.dataset.microid
        const url = '../player/main?microid=' + microid
        wx.navigateTo({url})
      }
    }
  }
</script>

<style scoped>
  /*全局背景色*/
  .body_page {
    background: #000000;
  }

  /* H1 列表筛选部分 */
  .list_title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    width: 100%;
  }

  /* 列表筛选小板块内容 */
  .list_title_screen {
    width: 24.8%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    background: #121212
  }

  /* 列表小版块图标 */
  .list_title_screen image {
    width: 5px;
    height: 11px;
    opacity: 1;
    margin-left: 5px;
  }

  /*列表小版块文字*/
  .list_title_screen p {
    width: 26px;
    height: 18px;
    opacity: 1;
    font-size: 13px;
    color: rgba(255, 255, 255, 1);
    line-height: 18px;
    letter-spacing: 0px;
  }

  /*列表内容部分*/
  .list_box {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    color: #ffffff;
    width: 100%;
    padding-top: 37px;
  }

  /*列表详情模块*/
  .list_box_details {
    width: 48%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 1.5%;
    margin-bottom: 0.5%;
  }

  /*列表详情头图*/
  .list_box_details_img img {
    width: 180px;
    height: 240px;
  }

  /*列表详情数据*/
  .list_box_details_desc {
  }

  /*列表描述数据*/
  .desc {
  }

  /*列表描述数据标题*/
  .desc_title {
    opacity: 1;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0px;
  }

  /*列表描述数据更新进度*/
  .desc_info {
    opacity: 0.5;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: 0px;
  }

  /*  列表交互数据*/
  .list_box_details_operator {
    display: flex;
    flex-direction: row;
    opacity: 1;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: 0px;
    align-content: center;
  }

  .list_box_details_operator img {
    width: 25px;
    height: 25px;
    opacity: 1;
  }

  /*  列表交互数据观看*/
  .operator_look {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;

  }

  /*列表交互数据喜欢*/
  .operator_like {
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
