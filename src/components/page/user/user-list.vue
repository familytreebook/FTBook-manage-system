<template>
    <div class="container">
        <div class="handle-box">
            <el-button
                type="primary"
                icon="el-icon-lx-friendaddfill"
                class="handle-del mr10"
                @click="addUser"
            >添加</el-button>
             状态：<el-select v-model="query.userstatus" value-key="code" placeholder="状态" class="handle-select mr10">
                <el-option key="" label="全部" value=""></el-option>
                <el-option
                v-for="item in userStatusData"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
             性别：<el-select v-model="query.sex" placeholder="性别" class="handle-select mr10">
                <el-option key="" label="全部" value=""></el-option>
                <el-option key="1" label="男" value="1"></el-option>
                <el-option key="0" label="女" value="0"></el-option>
                <el-option key="3" label="未知" value="3"></el-option>               
            </el-select>
            <el-input v-model="query.usernameLikeLeft" placeholder="账号" class="handle-input mr10"></el-input>
            <el-input v-model="query.nicknameLikeLeft" placeholder="用户名" class="handle-input mr10"></el-input>
            <el-input v-model="query.phoneLikeLeft" placeholder="手机号" class="handle-input mr10"></el-input>
            <el-input v-model="query.emailLikeLeft" placeholder="邮箱" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="username" label="账号" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nickname" label="用户名" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="phone" label="手机号" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" label="邮箱" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
                <template slot-scope="scope" >
                    <el-tag v-if="scope.row.sex==1">男</el-tag>
                    <el-tag v-else-if="scope.row.sex==0" type="danger">女</el-tag>
                    <el-tag v-else-if="scope.row.sex==3" type="info">未知</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="头像(查看大图)" align="center">
                <template slot-scope="scope">
                    <el-image
                        class="table-td-thumb"
                        :src="scope.row.avatar"
                        :preview-src-list="[scope.row.avatar]"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="userstatus" :formatter="userStatusFormatter"></el-table-column>
            <el-table-column prop="regtime" label="注册时间" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updatetime" label="更新时间" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lastlogintime" label="最后登录时间" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="words" label="铭言" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page="query.pageNum"
                :page-size="query.pageSize"
                :total="pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
//import { fetchData } from '../../api/index';
import formatters from '../../../utils/formatters'
export default {
    name: 'user-list',
    data() {
        return {
            query: {
                userstatus:'',
                sex: '',
                usernameLikeLeft:'',
                nicknameLikeLeft:'',
                phoneLikeLeft:'',
                emailLikeLeft:'',
                pageNum: 1,
                pageSize: 10
            },
            userStatusData:[],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.initStaticData();
        this.getData(this);
    },
    methods: {
        initStaticData(){
            let arr = [];
            for(var item in formatters.userStatusData){
                arr.push({code:item,name:formatters.userStatusData[item]});  
            }
            this.userStatusData = arr;
        },
        userStatusFormatter(row, column, cellValue, index){
            return formatters.userStatus(cellValue);
        },
        userSexFormatter(){
            return formatters.sex(cellValue);
        },
        addUser(){
            this.editVisible = true;
        },
        getData(that) {
            that.$ajax.get(that.$config.baseUrl + that.$config.getUserListUri,{
                params:that.query     
            }).then(function(res){
                console.log(res);
                that.tableData = res.data.result.records;
                that.pageTotal = res.data.result.total || 0;
                that.pageNum = res.data.result.current;
            });

        },
        // 触发搜索按钮
        handleSearch() {
            console.log(this.query);
            this.$set(this.query, 'pageNum', 1);
            this.getData(this);
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageNum', val);
            this.getData(this);
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 120px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
