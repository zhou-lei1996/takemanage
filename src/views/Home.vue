<template>
  <div class="home">
    <el-container>
      <!--左侧导航-->
      <el-aside width="200px">
        <h1 class="title">
          <img src="../assets/imgs/a.png" alt width="35px" height="35px" />
          外卖商家中心
        </h1>
        <el-menu
          keep-alive
          unique-opened
          router
          :default-active="curActive"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!--后台首页-->
          <!--<el-menu-item index="/home/index">
            <i class="iconfont icon-houtaishouye"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>-->

          <!--订单管理-->
          <!--   <el-menu-item index="/home/ordermanagement">
            <i class="iconfont icon-dingdan"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>-->
          <!--商品管理-->
          <!-- <el-submenu index="/home/goods/goodslist">
            <template slot="title">
              <i class="iconfont icon-shangpinguanli"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/home/goods/goodslist">商品列表</el-menu-item>
            <el-menu-item index="/home/goods/goodsadd">商品添加</el-menu-item>
            <el-menu-item index="/home/goods/goodscategory">商品分类</el-menu-item>
          </el-submenu>-->
          <!--店铺管理-->
          <!--  <el-menu-item index="/home/shop">
            <i class="iconfont icon-dianpuguanli"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>-->
          <!--账号管理-->
          <!-- <el-submenu index="/home/account/accountlist">
            <template slot="title">
              <i class="iconfont icon-dianpu"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item index="/home/account/accountlist">账号列表</el-menu-item>
            <el-menu-item index="/home/account/addaccount">添加账号</el-menu-item>
            <el-menu-item index="/home/account/changepassword">修改密码</el-menu-item>
            <el-menu-item index="/home/account/personal">个人中心</el-menu-item>
          </el-submenu>-->
          <!--销售统计-->
          <!-- <el-submenu index="/home/total/goodsstatistics">
            <template slot="title">
              <i class="iconfont icon-xiaoshoutongji"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item index="/home/total/goodsstatistics">商品统计</el-menu-item>
            <el-menu-item index="/home/total/ordersstatistics">订单统计</el-menu-item>
          </el-submenu>-->

          <div v-for="(item,index) in newarr" :key="index">
            <!--后台首页-->
            <el-menu-item v-if="!item.children" :index="item.index">
              <i :class="item.class"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>

            <!--销售统计-->
            <el-submenu v-else :index="item.index">
              <template slot="title">
                <i :class="item.class"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="v in item.children" :key="v.name" :index="v.index">{{v.name}}</el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>

      <!--右边-->
      <el-container>
        <!--面包屑-->
        <el-header>
          <el-row>
            <!--面包屑左边-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="item in datalist" :key="item">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-row>
          <p class="right">
            <el-dropdown @command="handleCommand">
              <!--面包屑右边-->
              <span class="el-dropdown-link">
                欢迎你，{{name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 头像 -->
            <el-avatar size="medium">
              <router-link to="/home/account/personal">
                <img :src="imgUrl" alt height="100%" width="100%" />
              </router-link>
            </el-avatar>
          </p>
        </el-header>

        <!--右边内容-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入token接口
import { checktoken, editAvatar } from "@/api/apis";
export default {
  data() {
    return {
      name: "",
      list: [
        {
          index: "/home/index",
          class: "iconfont icon-houtaishouye",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          index: "/home/ordermanagement",
          class: "iconfont icon-dingdan",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          index: "/home/goods",
          class: "iconfont icon-shangpinguanli",
          name: "商品管理",
          children: [
            {
              index: "/home/goods/goodslist",
              name: "商品列表",
            },
            { index: "/home/goods/goodsadd", name: "商品添加" },
            { index: "/home/goods/goodscategory", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },

        {
          index: "/home/shop",
          class: "iconfont icon-dianpuguanli",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          index: "/home/account",
          class: "iconfont icon-dianpu",
          name: "账号管理",
          children: [
            { index: "/home/account/accountlist", name: "账号列表" },
            { index: "/home/account/addaccount", name: "添加账号" },
            { index: "/home/account/changepassword", name: "修改密码" },
            // { index: "/home/account/personal", name: "个人中心" },
          ],
          roles: ["super"],
        },

        {
          index: "/home/total",
          class: "iconfont icon-xiaoshoutongji",
          name: "销售统计",
          children: [
            { index: "/home/total/goodsstatistics", name: "商品统计" },
            { index: "/home/total/ordersstatistics", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      datalist: [], //面包屑数组

      imgUrl: "", //头像地址
    };
  },
  computed: {
    // 当前激活
    curActive() {
      if (this.$route.path === "/home") return "/home/index";
      if (this.$route.path === "/home/orderedit")
        return "/home/ordermanagement";
      return this.$route.path;
    },
    //计算有多少权限
    newarr() {
      return this.list.filter((v) => v.roles.includes(localStorage.role));
    },
  },
  methods: {
    //发送验证获取个人中心接口
    forpersonal() {
      editAvatar(localStorage.id).then((res) => {
        this.imgUrl = res.data.accountInfo.imgUrl;
      });
    },

    handleCommand(cmd) {
      if (cmd == "personal") {
        this.$router.push("/home/account/personal");
      } else {
        this.$message({ message: "记得回来哦", type: "success" });
        localStorage.clear(); // 清除本地
        this.$router.push("/"); // 跳转到登录
        location.reload();
      }
    },
  },

  created() {
    //发送验证token接口
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.name = localStorage.account;
      } else {
        this.name = "请先登录";
      }
    });

    this.$bus.$on("update_avatar", () => {
      this.forpersonal();
    }),
      //调用获取个人中心数据
      this.forpersonal();

    //初始化给二级导航赋值
    this.datalist = this.$route.meta.datalist;
  },

  //观察hash变化
  watch: {
    $route(to) {
      this.datalist = to.meta.datalist;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  background-color: #545c64;
  .title {
    width: 200px !important;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 4px;
    }
  }
  .el-menu {
    border-right: 0;
  }
  .iconfont {
    font-size: 22px;
    margin-right: 4px;
  }
  .el-container {
    background-color: #545c64;
    height: 100%;
    .title {
      width: 50px;
      height: 50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-header {
      background-color: #fff;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px !important;
      .right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-avatar {
          margin-left: 10px;
        }
      }
    }

    .el-aside {
      color: #333;
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
    }
  }
}
</style>