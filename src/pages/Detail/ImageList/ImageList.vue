<template>
  <div class="swiper-container" ref="imageSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in imageList" :key="item.id"
      
      >
         <img
          :src="item.imgUrl"
          :class="{ active: defaultIndex === index }"
          @click="changeColor(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['imageList'],
    data(){
      return {
        defaultIndex:0
      }
    },
    methods: {
      changeColor(index){
        this.defaultIndex=index
        //将索引传给大图控制大图的显示
        this.$bus.$emit('changeIndex',index)
      }
    },
   watch: {
    imageList: {
      immediate: true, //立即执行没意思，仅仅为了和floor内部轮播代码保持一致
      handler(newVal, oldVal) {
        //监视bannerList数据是不是请求回来了（0-4）、
        //直接new不行，虽然我们把数据拿回来了，但是上面的结构是通过vfor遍历数据动态创建div结构，也需要时间
        this.$nextTick(() => {
          //等待页面最近的一次更新完成之后自动调用
          //通常用在当数据更新后需要做一些操作，而这些操作又需要等待页面更新完成才有效，此时就要用nextTick
          new Swiper(this.$refs.imageSwiper, {
            // direction: "vertical", // 垂直切换选项
            // loop: true, // 循环模式选项
            // 如果需要分页器
            // pagination: {
            //   el: ".swiper-pagination",
            // },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView:3,  //每屏三个
            slidesPerGroup:2  //每组三个（切换的组）
            // // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar",
            // },
          });
        });
      },
    },
  },
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>