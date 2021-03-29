<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorsList" :key="floor.id" :floor='floor'></Floor>
    
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
// import {getFloorsList} from '@/store/home'
export default {
  name: 'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState({
      floorsList:state=>state.home.floorsList
    })
  },
  mounted() {
    this.getFloorsList()
  },
  methods: {
    getFloorsList(){
      this.$store.dispatch('getFloorsList')
    }
  },
  
}
</script>

<style lang="less" scoped>

</style>
