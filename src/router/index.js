import Vue from 'vue'

import VueRouter from 'vue-router'

//引入Home
import Home from '../views/Home.vue'

//引入login
import Login from '../views/Login.vue'

//引入验证token
import { checktoken } from '@/api/apis'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            //登录
            path: '/',
            name: 'login',
            component: Login,
        },

        //大布局首页
        {
            //Home
            path: '/home',
            name: "Home",
            component: Home,

            //二级路由
            children: [{
                //二级首页
                path: "/home/index",
                name: "/home/index",
                component: () => import("../views/Home/Index.vue"),
                meta: { datalist: ['首页'] }
            },
            //订单管理
            {
                path: "/home/ordermanagement",
                name: "/home/OrderManagement",
                component: () => import("../views/Home/OrderManagement.vue"),
                meta: { datalist: ['订单管理'] }
            },

            //订单编辑
            {
                path: "/home/orderedit",
                name: "/home/OrderEdit",
                component: () => import("../views/Home/OrderEdit.vue"),
                meta: { datalist: ['订单管理', '订单编辑'] }
            },
            //商品列表
            {
                path: "/home/goods/goodslist",
                name: "/home/goods/goodslist",
                component: () => import("../views/Home/goods/GoodsList.vue"),
                // redirect: '/goods/goodslist',//重置
                meta: { datalist: ['商品管理', '商品列表'] }
            },

            {
                //商品分类
                path: "/home/goods/goodscategory",
                name: "/home/goods/goodscategory",
                component: () => import("../views/Home/goods/GoodsCategory.vue"),
                meta: { datalist: ['商品管理', '商品分类'] }

            },


            {
                //添加商品
                path: "/home/goods/goodsadd",
                name: "/home/goods/goodsadd",
                component: () => import("../views/Home/goods/GoodsAdd.vue"),
                meta: { datalist: ['商品管理', '商品添加'] }
            },





            //店铺管理
            {
                path: "/home/shop",
                name: "/home/shop",
                component: () => import("../views/Home/Shop.vue"),
                meta: { datalist: ['店铺管理'] }


            },


            // 账号管理
            {
                //账号列表
                path: "/home/account/accountlist",
                name: '/home/account/accountlist',
                component: () => import("@/views/Home/Account/AccountList.vue"),
                meta: { datalist: ['账号管理', '账号列表'] }
            },
            {
                //添加账号
                path: '/home/account/addaccount',
                name: '/home/account/addaccount',
                component: () => import("@/views/Home/Account/AddAccount.vue"),
                meta: { datalist: ['账号管理', '添加账号'] }
            },
            {
                //更改密码
                path: '/home/account/changepassword',
                name: '/home/account/changepassword',
                component: () => import("@/views/Home/Account/ChangePassword.vue"),
                meta: { datalist: ['账号管理', '修改密码'] }

            },
            {
                //个人中心
                path: '/home/account/personal',
                name: '/home/account/Personal',
                component: () => import("@/views/Home/Account/Personal.vue")


            },





            //销售统计
            {
                //商品统计
                path: '/home/total/goodsstatistics',
                name: '/home/total/goodsstatistics',
                component: () => import("@/views/Home/Total/GoodsStatistics.vue"),
                meta: { datalist: ['销售统计', '商品统计'] }

            },
            {
                //订单统计
                path: '/home/total/ordersstatistics',
                name: '/home/total/ordersstatistics',
                component: () => import("@/views/Home/Total/OrdersStatistics.vue"),
                meta: { datalist: ['销售统计', '订单统计'] }

            }




            ]
        },



















    ]

})
//to:跳到哪里去  from:从哪里来   next:放行
router.beforeEach((to, from, next) => {
    if (to.path != '/') {//如果不等于/发送ajax验证是否有token
        checktoken(localStorage.token).then((res) => {
            if (res.data.code == 0) {//如果有token就是登陆状态放行
                next()
            } else {//没有token就是没登陆状态不放行
                next('/')//q强行跳转去登陆
            }

        })
    } else
        next()//放行
})



export default router