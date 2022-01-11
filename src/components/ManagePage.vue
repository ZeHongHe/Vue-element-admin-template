<template>
<div>
    <el-container style="border: 1px solid #eee">
        <el-aside style="background-color: #545c64;width:auto;">
            <el-menu :default-openeds="['0', '1', '2']" class="el-menu-vertical-demo"
                :collapse= isMenuCollapse
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
                            <el-menu-item
                            v-for="subMenu in menu.subMenus"
                            :key="subMenu.index"
                            :index="subMenu.index">
                            {{subMenu.text}}
                            </el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>

                    <!-- 无子菜单的时候，就用 el-menu-item，也要绑个序号 index -->
                    <el-menu-item v-else :index="menu.index" :key="menu.index">
                        <i :class="menu.icon"></i>
                        <span slot="title">{{menu.text}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="background-color: #ededed">
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
                <!-- 点击时弹出表单，并初始化表单内容 -->
                <el-button v-if="!showDeleteCheckBox" type="primary" @click="dialogFormVisible = true; form = {};">新增</el-button>
                <!-- 点击时出现复选框，多选删除 -->
                <el-button v-if="!showDeleteCheckBox" type="danger" @click="showDeleteCheckBox = true">删除</el-button>
                <el-button v-if="showDeleteCheckBox" type="danger" @click="deleteTabelItem(chosenItem); chosenItem = []; showDeleteCheckBox = false">确认删除</el-button>
                <el-button v-if="showDeleteCheckBox" type="primary" @click="showDeleteCheckBox = false">取消</el-button>
                <el-table
                stripe
                :data="tableData">
                    <el-table-column prop="id" label="id" width="100">
                        <template slot-scope="scope">
                            <el-checkbox v-if="showDeleteCheckBox" :checked="chosenItem.indexOf(scope.row.id) > -1" @change="toggleChosenItem(scope.row.id)" style="margin: 6px"></el-checkbox>
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="日期" width="150"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                    <el-table-column prop="phone" label="电话" width="200"></el-table-column>
                    <el-table-column prop="address" label="地址" width="200"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button @click="editTableItem(scope.row.id)" :disabled="showDeleteCheckBox" type="info" size="small">编辑</el-button>
                            <!-- 删除按钮，绑定 deleteTableItem，传入参数 id -->
                            <el-button @click="deleteTableItem([scope.row.id])" :disabled="showDeleteCheckBox" type="danger" size="small">删除</el-button>
                            <!-- 上移和下移按钮，绑定 moveTableItem，传入参数 id 和移动方向 -->
                            <el-button @click="moveTableItem(scope.row.id, 'up')" :disabled="showDeleteCheckBox" size="small">上移</el-button>
                            <el-button @click="moveTableItem(scope.row.id, 'down')" :disabled="showDeleteCheckBox" size="small">下移</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
    <!-- Form -->
    <!-- el-dialog 是弹窗样式，title 绑定弹窗的标题内容，visible 绑定弹窗是否展示 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <!-- el-form-item 绑定表单样式，label 表单的名称，formLabelWidth 设置 label 的宽度 -->
            <el-form-item label="日期" :label-width="formLabelWidth">
                <!-- 里面装载表单元素，这里装了个选择日期的组件，v-model 绑定选择值，value-format设置绑定值的格式，type 设置选择的范围，这里 date 表示到天 -->
                <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.phone" type="tel"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <!-- 点击取消的时候，设置弹窗不可见 -->
            <el-button @click="dialogFormVisible = false">取 消</el-button>
           <!-- 点击确定的时候，设置弹窗不可见，同时添加一项内容 -->
           <el-button type="primary" @click="dialogFormVisible = false; addTableItem(form)">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
const menus = [
    {
        text: "服务管理", // 父菜单
        icon: "el-icon-setting",
        subMenus: [{ text: "服务信息" }, {text: "新增" }] // 子菜单列表
    },
    {
        text: "产品管理",
        icon: "el-icon-menu",
        subMenus: [{ text: "产品信息" }]
    },
    {
        text: "日志管理",
        icon: "el-icon-message",
        // subMenus: [{ text: '日志信息'}]
    }
].map((x, i) => {
    return {
        ...x,
        // 子菜单拼接 ${父菜单index} - ${子菜单index}
        subMenus: (x.subMenus || []).map((y, j) => {
            return { ...y, index: `${i}-${j}` };
        }),
        // 父菜单 ${父菜单index}
        index: `${i}`
    };
});

const tableItem = {
    date: "2022-01-01", // 日期
    name: "李华", // 姓名
    phone: "1234567890", // 电话
    address: "深圳市南山区滨海大道 64 号" // 地址
};

const tableData = Array(10)
    .fill(tableItem)
    .map((x, i) => { return { id: i + 1, ...x } });


// ManagePage 组件暴露的接口
export default {
    data() {
        return {
            menus: menus,
            tableData: tableData,
            dialogFormVisible: false, // 弹窗是否出现
            form: {}, // 用作表单绑定的内容
            formLabelWidth: "120px", // 表单 label 的宽度
            adminName: "Wouter",
            isMenuCollapse: false, // 菜单是否折叠
            showDeleteCheckBox: false, // 批量删除
            chosenItem: [], // 复选框选中的选项
        }
    },
    methods: {
        addTableItem(item = {}) {
            this.tableData.push({ ...item, id: this.tableData.length + 1 });
        },

        editTableItem(id) {
            this.dialogFormVisible = true;
            const index = this.tableData.findIndex(x => x.id === id);
            this.form = tableData[index];
        },

        deleteTabelItem(idArray) {
            // 另一个写法：
            // const index = this.tableData.findIndex(x => x.id === id); // 找到指定 id 对应的索引
            // this.tableData.splice(index, 1); //删除指定 id 的 data
            const tableData = this.tableData.filter(x => idArray.indexOf(x.id) === -1);
            this.tableData = tableData;
        },
        
        moveTableItem(id, direction) {
            const dataLength = this.tableData.length;
            const index = this.tableData.findIndex(x => x.id === id); // 找到指定 id 对应的索引
            switch (direction) {
                case "up":
                if (index > 0) {
                    const item = this.tableData.splice(index, 1)[0];
                    this.tableData.splice(index - 1, 0, item); // 在 index - 1 处插入 item
                }
                break;

                case "down":
                if (index < dataLength - 1) {
                    const item = this.tableData.splice(index, 1)[0];
                    this.tableData.splice(index + 1, 0, item); // 在 index + 1 处插入item
                }
                break;
            }
        },
        toggleChosenItem(id) {
            const index = this.chosenItem.findIndex(x => x.id === id);
            if(index > -1){
                // 有该选项则删除
                this.chosenItem.splice(index, 1);
            }else{
                // 无该选项则添加
                this.chosenItem.push(id);
            }
        }
    },
}
</script>

<style scoped>
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

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-container {
    border: 1px solid #eee
}

.el-table {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    margin-top: 10px
}

.el-header {
    background-color: #ededed;
}

</style>