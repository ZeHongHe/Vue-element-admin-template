<template>
    <el-container>
        <el-aside style="background-color: #545c64;width:auto;">
            <Menu :isMenuCollapse="isMenuCollapse"></Menu>
        </el-aside>

        <el-container>
            <el-header>
                <el-button @click="isMenuCollapse = !isMenuCollapse" style="font-size: 24px; padding: 5px 8px">
                    <i :class="isMenuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
                </el-button>
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"><span>欢迎回来，{{adminName}}</span></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Menu from "components/menu.vue"

export default {
    name: "app",
    data() {
        return { }
    },
    methods: {

    }
}
</script>

<style scoped>
body {
    margin: 0px
}

.el-header {
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  font-size: 12px;
  background-color: #ededed;
}

.el-aside {
  color: #333;
}

.el-container {
    border: 1px solid #eee
}

.el-header {
    background-color: #ededed;
}

</style>