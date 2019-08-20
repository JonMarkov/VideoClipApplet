<template>
  <div class="body_page">
    <!--添加部分-->
    <div class="add_box">
      <div class="add_video" @click="VideoBegins">
        <img src="../../../static/images/add_video.png">
        <p>做影集</p>
      </div>
    </div>
    <!--模板部分-->
    <div class="board_box">
      <div class="board_title">
        <h1>推荐模板</h1>
        <p>更多</p>
      </div>
      <div class="board_content">
        这里是模板详情部分
      </div>
    </div>
    <!--小工具部分-->
    <div class="books_box">
      <div class="books_title">
        <h1>小工具</h1>
      </div>
      <div class="books_content">
        这里是工具部分
      </div>
    </div>
    <!--弹窗部分-->
    <div class="pop_up_window" :class="popData" @click="cancel">
      <div class="pop_uo_box">
        <div class="upload_photo" @click="uploadPhoto">
          <div><img src="../../../static/images/add_video.png"></div>
          <div>
            <h1>上传照片</h1>
            <p>从手机上传新照片（最多100张）</p>
          </div>
        </div>
        <div class="upload_video" @click="uploadVideo">
          <div><img src="../../../static/images/add_video.png"></div>
          <div>
            <h1>上传视频</h1>
            <p>从手机上传新照片（最多100张）</p>
          </div>
        </div>
        <div class="already_uoload" @click="alreadyUpload">
          <div><img src="../../../static/images/add_video.png"></div>
          <div>
            <h1>已上传</h1>
            <p>从手机上传新照片（最多100张）</p>
          </div>
        </div>
        <div class="cancel" @click="cancel">取消</div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        popData: 'popDataN'
      }
    },
    created () {
    },
    mounted () {

    },
    methods: {
      // 显示上传按钮弹窗
      VideoBegins: function () {
        this.popData = 'popDataY'
      },
      cancel: function () {
        this.popData = 'popDataN'
      },
      // 上传照片
      uploadPhoto () {
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            this.setData({
              src: res.tempFilePaths[0],
              srcChanged: true
            })
          }
        })
      },
      // 上传视频
      uploadVideo () {
        wx.chooseVideo({
          sourceType: ['album', 'camera'],
          maxDuration: 60,
          camera: 'back',
          success (res) {
            console.log(res.tempFilePath)
          }
        })
      },
      // 已经上传
      alreadyUpload () {

      }
    }
  }
</script>

<style scoped>
  /*全局样式*/
  .body_page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px 5px;
  }

  /*添加部分样式*/
  .add_box {
    background: #f0f0f0;
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }

  .add_video {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 30px;
  }

  .add_video img {
    width: 30px;
    height: 30px;
  }

  /*模板部分*/
  .board_box {
    width: 100%;
    padding: 10px 0px;
  }

  .board_title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .board_title h1 {
    font-size: 16px;
    font-weight: bold;
  }

  .board_title p {
    font-size: 14px;
    color: #9d9d9d;
  }

  /*小工具部分*/
  .books_box {
    width: 100%;
    padding: 10px 0px;
  }

  .books_title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .books_box h1 {
    font-size: 16px;
    font-weight: bold;
  }

  /*弹窗部分*/
  .pop_up_window {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0.7;
    background-color: black;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pop_uo_box {
    position: fixed;
    width: 100%;
    bottom: 0%;
    background-color: white;
    z-index: 10000;
    border-radius: 6px;
  }

  /*上传相片*/

  .upload_photo {
    display: flex;
    flex-direction: row;
    padding: 10px 5px;
    align-items: center;
  }

  .upload_photo div {
    margin: 0 7px;
  }

  .upload_photo img {
    width: 30px;
    height: 30px;
  }

  .upload_photo h1 {
    font-size: 16px;
    font-weight: bold;
  }

  .upload_photo p {
    font-size: 12px;
  }

  /*上传视频*/

  .upload_video {
    display: flex;
    flex-direction: row;
    padding: 10px 5px;
    align-items: center;
  }

  .upload_video div {
    margin: 0 7px;
  }

  .upload_video img {
    width: 30px;
    height: 30px;
  }

  .upload_video h1 {
    font-size: 16px;
    font-weight: bold;
  }

  .upload_video p {
    font-size: 12px;
  }

  /*已经上传*/
  .already_uoload {
    display: flex;
    flex-direction: row;
    padding: 10px 5px;
    align-items: center;
  }

  .already_uoload div {
    margin: 0 7px;
  }

  .already_uoload img {
    width: 30px;
    height: 30px;
  }

  .already_uoload h1 {
    font-size: 16px;
    font-weight: bold;
  }

  .already_uoload p {
    font-size: 12px;
  }

  .cancel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    padding: 7px 0;
  }

  /*状态管理*/
  .popDataN {
    display: none;
  }

  .popDataY {
    display: block;
  }
</style>
