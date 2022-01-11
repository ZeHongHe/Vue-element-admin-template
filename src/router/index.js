import Vue from "vue";
import VueRouter from "vue-router";

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
            component: Login
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: "/service",
                    component: Service
                },
                {
                    path: "/product",
                    component: Product,
                    children: [
                        {
                            path: "/list",
                            component: ProductList
                        },
                        {
                            path: "/edit",
                            component: ProductEdit
                        }
                    ]
                }
            ]
        }
    ]

})

// 3. 导出 router
export default router
