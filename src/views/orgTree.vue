<template>
    <div class="tree-box">
        <el-select v-model="ipValue" style="width: 240px" @change="changeVal" clearable>
         <el-option v-for="(item, index) in treeData" :label="item.name" :value="item.id" :key="index" placeholder="请选择" />
        </el-select>
        <el-input v-model="searchValue" style="width: 240px" @input="changeSearch" clearable />
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue"
import orgApi from '../api/org'

import EventBus from "./event-bus"
const treeData = ref([])
const ipValue = ref()
const searchValue = ref('')
// 获取树形数据
const getTree = ()=>{
    orgApi.query('1').then((users) => {
        treeData.value = users
    })
}

// 树形筛选
const changeVal=(val)=>{
    // 发送消息
    EventBus.emit('on-click', val)
}
// 输入框改变
const changeSearch = debounce(val =>{
    searchValue.value = val
    EventBus.emit('on-click', val)
},1000)
onMounted(()=>{
   getTree() 
})
// 防抖
function debounce(cb, delay){
    let timer
    return function(...args){
      if (timer){
        clearTimeout(timer)
      }
      timer = setTimeout(() =>{
        cb.call(this,...args)
      },delay)
    }
}

</script>
<style scope>
.tree-box{
    height:200px;
    width:100%;
    border:1px solid #ccc;
    display:flex;
    align-items:center;
    gap:20px;
}
</style>