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
              <el-button type="primary" size="mini">增加参数</el-button>
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
              <el-button type="primary" size="mini">增加参数</el-button>
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
      dynamicAttr: []
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
      console.log(this.selectKeys)
    },
    handleClick() {
      // console.log(this.activeName)
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
      } else {
        this.dynamicAttr = resp.data
      }
    }
  }
}
</script>

<style scoped>

</style>
