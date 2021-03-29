<template>
  <div class="pagination">
    <button :disabled='pageNo===1' @click="$emit('changePage',pageNo-1)">上一页</button>
    <button v-if="startEnd.start!==1" @click="$emit('changePage',1)">1</button>
    <button v-if="startEnd.start>2">···</button>
    <button 
      v-for="page in startEnd.end"
      v-if="page>=startEnd.start"
      :class="{active:page===pageNo}"
      @click="$emit('changePage',page)"
    >
     {{page}}
    </button>

    <button v-if="startEnd.end<totalNum-1">···</button>
    <button v-if="totalNum!==pageNo" @click="$emit('changePage',totalNum)">
     {{totalNum}}
    </button>
    <button :disabled='pageNo===totalNum'
     @click="$emit('changePage',pageNo+1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{totalNum}}页</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:{
    pageNo:{
      type:Number,
      default:1
    },
    pageSize:{
      type:Number,
      default:3
    },
    total:{
      type:Number,
      default:1
    },
    connective:{
      type:Number,
      default:5
    }
  },
  computed: {
   //计算总页数
  totalNum(){
    let {total,pageSize}=this
    return Math.ceil(total/pageSize)
  },
  //计算循环开始结束位置

  startEnd(){
    let start=0
    let end=0;
    let {totalNum,pageNo,connective}=this
    if(totalNum<=connective){
      start=1;
      end=totalNum
    }else{
       start =pageNo-Math.floor(connective/2)
       end=pageNo+Math.floor(connective/2)
      if(start<=1){
        start=1;
        end=connective
      }
      if(end>=totalNum){
        end=totalNum;
        start=totalNum-connective+1
      }
    }
    return {start,end}
  }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>