<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="reveal" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="tosearch">
              <div
                class="item bo"
                v-for="(item, index) in categoryList"
                :key="item.categoryId"
                :class="{ moveItem: current === index }"
                @mouseenter="moveindex(index)"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-categoryName="item.categoryName"
                    :data-category1Id="item.categoryId"
                    >{{ item.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="c1 in item.categoryChild"
                    :key="c1.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryName="c1.categoryName"
                          :data-category2Id="c1.categoryId"
                          >{{ c1.categoryName }}</a
                        >
                      </dt>
                      <dd v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                        <em>
                          <a
                            href="javascript:;"
                            :data-categoryName="c2.categoryName"
                            :data-category3Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      current: -1,
      isShow: true,
    };
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    //节流函数
    moveindex: throttle(
      function (index) {
        this.current = index;
      },
      20,
      { trailing: false }
    ),
    //事件委托跳转
    tosearch(event) {
     let target=event.target
     let dataset=target.dataset
     let {categoryname,category1id,category2id,category3id}=dataset
      if (categoryname) {
        let location = {
          name: "search",
        };
        let query = {
          categoryName: categoryname,
        };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        location.query = query;
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
    //鼠标移除全部分类时判断是否是home组件，如果不是就隐藏sort
    reveal() {
      this.current = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.sort-enter {
        opacity: 0;
        height: 0;
      }
      &.sort-enter-on {
        opacity: 1;
        height: 461px;
      }
      &.sort-enter-active {
        transition: all 0.6s;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              &:hover {
                color: skyblue;
              }
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 750px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                  color: red;
                  & a:hover {
                    color: red;
                  }
                }

                dd {
                  float: left;
                  width: 54px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  & a:hover {
                    color: red;
                  }
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.moveItem {
            background-color: orange;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
