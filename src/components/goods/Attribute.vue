<template>
  <div>    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="注意:只允许修改第三级商品的详细信息"
                type="warning"
                close-text="我已阅读" style="margin-bottom: 20px;width: 350px">
      </el-alert>
      <el-row>
        <el-col>
          <span>选择商品分类</span>
          <el-cascader
            v-model="selectKeys"
            :options="cateIdList"
            :props="{ expandTrigger: 'hover',label: 'name',value: 'id'}"
            clearable separator=">"
            @change="changeSeletor"
            style="margin-left: 20px;width:20%">
          </el-cascader>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="静态参数" name="static">静态参数
              <el-button type="primary" size="mini" @click="addDialogVisible=true">增加参数</el-button>
              <el-table :data="staticAttr">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="参数名称" prop="name"></el-table-column>
                <el-table-column label="操作" prop="name">
                  <template slot-scope="">
                    <el-button type="success" size="mini">编辑参数</el-button>
                    <el-button type="danger" size="mini">删除参数</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="动态参数" name="dynamic">动态参数
              <el-button type="primary" size="mini" @click="addDialogVisible=true">增加参数</el-button>
              <el-table :data="dynamicAttr">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="参数名称" prop="name"></el-table-column>
                <el-table-column label="操作" prop="name">
                  <template slot-scope="">
                    <el-button type="success" size="mini">编辑参数</el-button>
                    <el-button type="danger" size="mini">删除参数</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :title="'添加'+titleText" :visible.sync="addDialogVisible" width="30%" @close="addDialogClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item :label="titleText" prop="name">
          <el-input v-model="addForm.name" ></el-input>
        </el-form-item>
        <el-button type="primary" @click="addAttr">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form>
    </el-dialog>

  </div>

</template>

<script>
export default {
  data() {
    return {
      cateIdList: [],
      selectKeys: [],
      activeName: 'static',
      staticAttr: [],
      dynamicAttr: [],
      dynamicFlag: false,
      staticFlag: false,
      addDialogVisible: false,
      addForm: {
        name: ''
      },
      addFormRules: {
        name: [{required: true, message: '请填写参数名称', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.getCateIdList()
  },
  methods: {
    async getCateIdList() {
      const {data: resp} = await this.$axios.get('/category_list')
      console.log(resp)
      this.cateIdList = resp.data.data
    },
    changeSeletor() {
      this.staticFlag = true
      this.dynamicFlag = true
      // console.log(this.selectKeys)
      this.getAttribute()
    },
    handleClick() {
      // console.log(this.activeName)
      if (!this.staticFlag && this.activeName === 'static') return
      if (!this.dynamicFlag && this.activeName === 'dynamic') return
      if (this.selectKeys < 3) return
      // console.log(this.selectKeys[2])
      this.getAttribute()
    },
    async getAttribute() {
      const {data: resp} = await this.$axios.get('/category/attr_list',
        {params: {cid: this.selectKeys[2], type: this.activeName}})
      if (resp.status !== 200) return this.$msg.error(resp.msg)
      if (this.activeName === 'static') {
        this.staticAttr = resp.data
        this.staticFlag = false
      } else {
        this.dynamicAttr = resp.data
        this.dynamicFlag = false
      }
    },
    addAttr() {

    },
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    }
  },
  computed: {
    titleText() {
      if (this.activeName === 'static') {
        return '静态参数'
      } else {
        return '动态参数'
      }
    }
  }
}
</script>

<style scoped>

</style>
