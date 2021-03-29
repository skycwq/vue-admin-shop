<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
           
            <li class="with-x" v-if="initial.categoryName">{{initial.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="initial.keyword">{{initial.keyword}}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="initial.trademark">{{initial.trademark.split(':')[1]}}<i @click="removeBrandInfo">×</i></li>
            <li class="with-x" v-for="(prop, index) in initial.props" :key="index">{{prop.split(':')[1]}}<i @click="removeNative(index)">×</i></li>

            
            
          </ul>
        </div>

        <!--selector-->
        <!-- 按品牌搜索 -->
        <SearchSelector @toBrandInfo='toBrandInfo' @tonative='tonative'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:orderflage==='1'}" >
                  <a href="#" @click="changesort('1')" >
                    综合
                    <i class="iconfont"
                       v-if="orderflage==='1'" 
                       :class="{iconup:ordertype==='asc',icondown:ordertype==='desc'}" 
                    ></i>
                  </a>
                </li>
                <li :class="{active:orderflage==='2'}">
               
                  <a href="#" @click="changesort('2')">
                    价格
                        <i class="iconfont" 
                         v-if="orderflage==='2'"
                        :class="{iconup:ordertype==='asc',icondown:ordertype==='desc'}"></i>
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/'+goods.id">
                    <img v-lazy="goods.defaultImg"
                    /></router-link>
                  
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="'/detail/'+goods.id"> {{ goods.title }}</router-link>
                  
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        <Pagination 
         :pageNo='initial.pageNo'
         :total='searchInfo.total'
         :connective='5'
         :pageSize='initial.pageSize'
         @changePage='changePage'
        ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from '@/components/Pagination'
export default {
  name: "Search",
  data(){
    return {
      initial:{
        category1Id:'',
        category2Id:'',
        category3Id:'',
        categoryName:'',
        keyword:'',
        props:[],
        trademark:'',
        order:'1:desc',
        pageNo:1,
        pageSize:3,
        
      }
    }
  },
  computed:{
    ...mapGetters(['goodsList']),
    ...mapState({
      searchInfo:state=>state.search.searchInfo
    }),
    orderflage(){
      return this.initial.order.split(':')[0]
    },
    ordertype(){
      return this.initial.order.split(':')[1]
    }
  },
    beforeMount() {
   this.updataInfo()
  },
    mounted() {
    this.getSearchInfo()
   
  },
  methods: {
    getSearchInfo(){
      this.$store.dispatch('getSearchInfo',this.initial)
    },
    //解决二次请求不发送数据，需要监视路径变化
    updataInfo(){
      //从当前route中结构出来参数
       let {category1Id,category2Id,category3Id,categoryName}=this.$route.query
       let {keyword}=this.$route.params
       let obj={
      ...this.initial,
      categoryName,
      category1Id,
      category2Id,
      category3Id,
      keyword
    }
    Object.keys(obj).forEach(item=>{
      if(obj[item]===''){
        delete obj[item]
      }
    })
    this.initial=obj
    },
    //删除选中条件
    removeCategoryName(){
      this.initial.categoryName=undefined
      //这种方法路径不会改变但是页面会刷新
      // this.getSearchInfo()
      this.initial.pageNo=1
      this.$router.replace({name:'search',params:this.$route.params})
    },
    //删除选中条件params参数
    removeKeyword(){
      this.initial.keyword=undefined
      this.$bus.$emit('clearKeyword')
      this.initial.pageNo=1
      this.$router.replace({name:'search',query:this.$route.query})
     
    },
    //根据品牌搜索
    toBrandInfo(tm){
      this.initial.trademark=`${tm.tmId}:${tm.tmName}`
      this.initial.pageNo=1
      this.getSearchInfo()
    },
    //删除根据品牌搜索
    removeBrandInfo(){
      this.initial.trademark=undefined
      this.initial.pageNo=1
      this.getSearchInfo()
    },
    //根据属性添加
    tonative(attr,attrValue){
      let prop=`${attr.attrId}:${attrValue}:${attr.attrName}`
      let isExist=this.initial.props.some(item=>item===prop)
      if(isExist){return}
      this.initial.props.push(prop)
      this.initial.pageNo=1
      this.getSearchInfo()
    },
    //删除属性添加
    removeNative(index){
      this.initial.props.splice(index,1)
      this.initial.pageNo=1
      this.getSearchInfo()
    },
    //点击切换排序状态
    changesort(orderflage){
      let originflage=this.initial.order.split(':')[0];
      let origintype=this.initial.order.split(':')[1];
      let neworder='';
      if(orderflage===originflage){
        neworder=`${orderflage}:${origintype==='asc'?'desc':'asc'}`
      }else{
        neworder=`${orderflage}:${origintype='desc'}`
      }
      this.initial.order=neworder
      this.getSearchInfo()
    },
    //分页跳转
    changePage(page){
      this.initial.pageNo=page
      this.getSearchInfo()
    }
  },
  components: {
    SearchSelector,
    Pagination
  },
  watch:{
    //监视路径变化
    $route:{
      handler(newVal,oldVal){
        this.updataInfo()
        this.getSearchInfo()
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>