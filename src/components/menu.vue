<template>
    <el-menu class="el-menu-vertical-demo"
        :default-openeds="['0', '1', '2']"
        :collapse= isMenuCollapse
        :default-active="activeIndex"
        background-color="#545c64"
        text-color= "#fff"
        active-text-color= "#ffd04b">
        <template v-for="menu in menus">
            <!-- 子菜单 submenu，且绑定序号 index -->
            <el-submenu
                v-if="menu.subMenus && menu.subMenus.length" 
                :index="menu.index"
                :key="menu.index">

                <template slot="title">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.text}}</span>
                </template>

                <el-menu-item-group>
                    <router-link 
                        tag="div"
                        v-for="subMenu in menu.subMenus"
                        :key="subMenu.index"
                        :to="{path: subMenu.routerName}">
                        <el-menu-item :index="subMenu.index">{{subMenu.text}}</el-menu-item>
                    </router-link>
                </el-menu-item-group>

            </el-submenu>
            <router-link v-else tag="div" :key="menu.index" :to="{path: menu.routerName}">
                <el-menu-item :index="menu.index">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.text}}</span>
                </el-menu-item>
            </router-link>
            <!-- 无子菜单的时候，就用 el-menu-item，也要绑个序号 index -->
        </template>
    </el-menu>
</template>

<script>
const menus = [
    {
        text: "服务管理", // 父菜单
        icon: "el-icon-setting",
        subMenus: [{ text: "服务信息", routerName: "Service" }] // 子菜单列表
    },
    {
        text: "产品管理",
        icon: "el-icon-menu",
        subMenus: [{ text: "产品信息", routerName: "productList" }, {text: "新增", routerName: "productAdd"}]
    },
    {
        text: "日志管理",
        icon: "el-icon-message",
        routerName: ""
    }
].map((x, i) => {
    return {
        ...x,
        subMenus: (x.subMenus || []).map((y, j) => {
            return { ...y, index: `${i}-${j}` };
        }),
        index: `${i}`
    }
})

export default {
    data() {
        return {
            menus: menus,
            activeIndex: ""
        }
    },
    props: {
        isMenuCollapse: Boolean
    },
    methods: { },
    watch: {
        '$route'(to) {
            let activeIndex = 0;
            this.menus.forEach(x => {
                if (routerName === to.name) {
                    activeIndex = x.index;
                } else {
                    const subMenuItem = x.subMenus.find(y => y.routerName === to.name);
                    if(subMenuItem){ activeIndex = subMenuItem.index; }
                }
            });
            if (activeIndex) {
                this.activeIndex = activeIndex;
            }
        }
    }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>