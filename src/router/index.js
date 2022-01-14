import Vue from "vue";
import VueRouter from "vue-router";
import { getGlobalData } from "utils/globalData";

Vue.use(VueRouter)

const Login = () => import('../views/login.vue')
const Home = () => import('../views/Home/home.vue')
const Service = () => import('../views/Home/service.vue')
const Product = () => import('../views/Home/Product/product.vue')
const ProductList = () => import('../views/Home/Product/productList')
const ProductEdit = () =>import('../views/Home/Product/productEdit')

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: "/service",
                    name: 'Service',
                    component: Service
                },
                {
                    path: "/product",
                    name: 'Product',
                    component: Product,
                    children: [
                        {
                            path: "/list",
                            name: 'ProductList',
                            component: ProductList
                        },
                        {
                            path: "/edit",
                            name: 'ProductEdit',
                            component: ProductEdit
                        }
                    ]
                }
            ]
        }
    ]

})

router.beforeEach((to, from, next) => {
    if (to.name !== "Login") {
      // 非 login 页面，检查是否登录
      // 这里简单前端模拟是否填写了用户名，真实环境需要走后台登录，缓存到本地
      if (!getGlobalData("username")) {
        next({ name: "Login" });
      }
    }
    // 其他情况正常执行
    next();
  });

// 3. 导出 router
export default router
