<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="(cart,index) in shopCartList" :key="index">
        <ul class="cart-list" v-for="cartList in cart.cartInfoList" :key="cartList.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked='cartList.isChecked' @click="changeischecked(cartList)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartList.imgUrl">
            <div class="item-msg">{{cartList.skuName}}</div>
          </li>
          
          <li class="cart-list-con4">
            <span class="price">{{cartList.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum(cartList,-1)">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt" v-model="cartList.skuNum" @change="changeNum(cartList,$event.target.value*1-cartList.skuNum)">
            <a href="javascript:void(0)" class="plus" @click="changeNum(cartList,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartList.skuNum*cartList.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteone(cartList)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
  export default {
    name: 'ShopCart',
    computed:{
      ...mapState({
        shopCartList:state=>state.addshopcart.shopCartList
      }),
      ...mapGetters(['checkedNum','allMoney']),
      isAllChecked:{
        get(){
          return this.shopCartList.every(item=>item.cartInfoList.every(item1=>item1.isChecked===1))&&this.shopCartList.length>0
        },
       async set(val){
          let isChecked=val?1:0
          let skuIds=[]
         
         this.shopCartList.forEach(item=>{
            skuIds=skuIds.concat(item.cartInfoList.map(item1=>{
              if(item1.isChecked!==isChecked){
                return item1.skuId
              }
            }))
          })
          try {
           await this.$store.dispatch('updateCartCheckedAll',{
              isChecked,skuIds
            })
            this.getShopCartList()
          } catch (error) {
            alert(error.message)
          }
       }
        
      }
    },
    mounted() {
      this.getShopCartList()
    },
    methods: {
      getShopCartList(){
        this.$store.dispatch('getShopCartList')
      },
      //修改数量
     async changeNum(cartList,disNum){
        //如果本身数量加变动数小于1就让本身数量等于1就要修正变动数
        if(cartList.skuNum+disNum<1){
          // disNum=1-cartList.skuNum
          disNum=1-cartList.skuNum
        }
       try {
          await this.$store.dispatch('getaddshop',{
          skuId:cartList.skuId,
          skuNum:disNum
        })
        this.getShopCartList()
       } catch (error) {
         alert(erroe.message)
       }

      },
      //更新单个状态
      async changeischecked(cartList){
        try {
          await this.$store.dispatch('updataOne',{
            skuId:cartList.skuId,
            isChecked:cartList.isChecked?0:1
            
          })
          this.getShopCartList()
        } catch (error) {
          alert(error.message)
        }
      },
      //删除单商品
      async deleteone(cartList){
        try {
         await this.$store.dispatch('deleteOne',cartList.skuId)
          this.getShopCartList()
        } catch (error) {
          alert(error.message)
        }
      },
      //删除全部商品
      async deleteAll(){
        let skuIds = []
      this.shopCartList.forEach(item => {
        skuIds = skuIds.concat(item.cartInfoList.map(item1 => {
          if(item1.isChecked){
            return item1.skuId
          }
        }))
      })
        try {
        await this.$store.dispatch('deleteAllCart',skuIds)
          this.getShopCartList()
        } catch (error) {
          alert(error.message)
        }      
      }
    
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

       
          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>