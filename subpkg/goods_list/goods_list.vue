<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        // 节流阀
        isloading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb) {
        // 打开节流阀
        this.isloading = true
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isloading = false
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(goods) {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      },
      onReachBottom() {
        if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
        if(this.isloading) return
        // 让页码自增
        this.queryObj.pagenum ++  /* 可优化往上拉的时候,页面自减 ，但又似乎没有必要，因为前台并不显示*/
        this.getGoodsList()
      },
      onPullDownRefresh() {
        // 重置关键数据
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
        
        // 重新发起数据请求
        this.getGoodsList(() => uni.stopPullDownRefresh())
      }
    }
  }
</script>

<style lang="scss">

</style>
