<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>增加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="height: auto">
      <el-alert title="增加商品信息" type="success" center show-icon
                style="margin: 0 auto 10px;width: 600px;"></el-alert>

      <el-steps :prop="active" finish-status="success" align-center>
        <el-step title="商品静态参数"></el-step>
        <el-step title="商品动态参数"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form :model="addForm" ref="addRef" :rules="addRules" label-position="top">
        <el-tabs v-model="active" :tab-position="'left'" style="margin-top: 20px;margin-left:-10px"
                 :before-leave="beforeleave">
          <el-tab-pane label="基本信息" name="1">
            <el-form-item label="商品分类" prop="cid">
              <el-cascader
                v-model="selectKeys"
                :options="cateIdList"
                :props="{ expandTrigger: 'hover',label: 'name',value: 'id'}"
                clearable separator=">"
                @change="changeSeletor"
                style="margin-left: 20px;width:20%">
              </el-cascader>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="addForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="number">
              <el-input v-model="addForm.number"></el-input>
            </el-form-item>
            <el-form-item label="商品权重" prop="weight">
              <el-input v-model="addForm.weight"></el-input>
            </el-form-item>

          </el-tab-pane>

          <el-tab-pane label="商品静态参数" name="2">
            <el-form-item :label="s.name" v-for="s in attr_static" :key="s.id">
              <el-input v-model="s.val"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品动态参数" name="3">
            <el-form-item :label="d.name" v-for="d in attr_dynamic" :key="d.id">
              <el-checkbox-group v-model="d.val">
                <el-checkbox :label="dv" v-for="(dv,i) in d.val" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="4">商品图片
            <el-upload
              class="upload-demo"
              action="/upload_img"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/jepg文件</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="5">商品内容
            <quill-editor v-model="addForm.intorduce">
            </quill-editor>
          </el-tab-pane>
          <el-button type="primary" @click="goodsAdd" class="btnAdd">添加商品</el-button>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog title="图片预览" :visible.sync="previewVisable" width="50%">
      <img :src="previewSrc" alt="" style="width: 100% ">
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: '1',
      addForm: {
        name: '',
        price: 0,
        number: 0,
        weight: 0,
        cid_one: 0,
        cid_two: 0,
        cid_three: 0,
        pics: [],
        intorduce: ''
      },
      addRules: {
        name: [{required: true, message: '请填写商品名称', tirgger: 'blur'}],
        price: [{required: true, message: '请填写商品价格', tirgger: 'blur'}],
        number: [{required: true, message: '请填写商品数量', tirgger: 'blur'}],
        weight: [{required: true, message: '请填写商品权重', tirgger: 'blur'}]
      },
      cateIdList: [],
      selectKeys: [],
      attr_static: [],
      attr_dynamic: [],
      previewVisable: false,
      previewSrc: ''
    }
  },
  created() {
    this.getCateIdList()
  },
  methods: {
    async getCateIdList() {
      const {data: resp} = await this.$axios.get('/category_list')
      // console.log(resp)
      this.cateIdList = resp.data.data
    },
    changeSeletor() {
      if (this.selectKeys.length < 3) return
      this.addForm.cid_one = this.selectKeys[0]
      this.addForm.cid_two = this.selectKeys[1]
      this.addForm.cid_three = this.selectKeys[2]
    },
    beforeleave(activeName, oldActiveName) {
      if (this.selectKeys.length < 3) {
        this.$msg.error('请选择商品分类!!!')
        return false
      }
      if (activeName === '2') this.getAttribute('static')
      else if (activeName === '3') this.getAttribute('dynamic')
    },
    async getAttribute(type) {
      const {data: resp} = await this.$axios.get('/category/attr_list',
        {params: {cid: this.selectKeys[2], type: type}})
      if (resp.status !== 200) return this.$msg.error(resp.msg)
      if (type === 'static') {
        this.attr_static = resp.data
      } else {
        resp.data.forEach(item => {
          item.val = item.val ? item.val.split(',') : []
        })
        this.attr_dynamic = resp.data
      }
    },
    // 图片添加函数
    handleSuccess(resp) {
      this.addForm.pics.push(resp.data.path)
    },
    // 图片删除函数
    handleRemove(file) {
      // console.log(file)
      // console.log(this.addForm.pics)
      const i = this.addForm.pics.findIndex(x => x === file.response.data.path)
      this.addForm.pics.splice(i, 1)
      // console.log(this.addForm.pics)
    },
    // 图片预览函数
    handlePreview(file) {
      this.previewVisable = true
      this.previewSrc = file.response.data.url
    },
    goodsAdd() {
      console.log(this.addForm)
    }
  }
}
</script>
<style>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.ql-editor {
  min-height: 400px;
}

.btnAdd {
  margin-top: 10px!important;
}
</style>
