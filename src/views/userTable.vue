<template>
    <div class="table-box">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" />
            <el-table-column prop="name" label="名称" />
        </el-table>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue"
import userApi from '../api/user'
import EventBus from "./event-bus"
const tableData = ref([])
// 获取表格数据
const getTable = (params)=>{
    userApi.query(params).then((users) => {
        tableData.value = users
    })
}
onMounted(()=>{
   getTable() 
})
// 接收消息函数
const fn = (val) => {
    // 参数查询
    getTable(val)
}
// 接收消息
EventBus.on('on-click', fn)
</script>
<style scope>
.table-box{
    min-height:200px;
    width:100%;
    border:1px solid #ccc;
    margin-top:10px;
}
</style>