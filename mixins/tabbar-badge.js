  import {mapGetters} from 'vuex'


export default{
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
    watch: {
      total() {
        this.setBadge()
      }
    },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      if(this.total === 0) {
        uni.removeTabBarBadge({index:2})
      } else {
        uni.setTabBarBadge({
          index:2,
          text:this.total + '',
        })
      }

    }
  }
}