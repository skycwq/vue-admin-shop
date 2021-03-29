<template>
  
        <div class="swiper-container" :ref="refName">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="banner in bannersList"
              :key="banner.id"
            >
              <img :src="banner.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
  
</template>

<script>
import Swiper from 'swiper/js/swiper'
export default {
name: 'Carouseloop',
props:['bannersList','refName'],
 watch: {
    bannersList: {
      immediate:true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          new Swiper(this.$refs[this.refName], {
            autoplay:true,
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
}

</script>
<style lang="less" scoped>
</style>