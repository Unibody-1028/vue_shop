<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>商品统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="main" style="width: 1080px;height: 810px;margin:0 auto"></div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  async mounted() {
    const {data: resp} = await this.$axios.get('/cate_group_level')
    if (resp.status !== 200) return this.$msg.error(resp.msg)
    var myChart = echarts.init(document.getElementById('main'))
    var option = {
      title: {
        text: '商品分类级别统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis', // 鼠标悬浮时显示提示框
        axisPointer: {type: 'shadow'} // 柱状图提示线样式
      },
      legend: {
        data: [resp.data.name]
      },
      xAxis: {
        name: '分类级别',
        data: resp.data.xAxis
      },
      yAxis: {
        name: '数量(个)'
      },
      series: [
        {
          name: resp.data.name,
          type: 'bar',
          data: resp.data.series_data
        }
      ]
    }
    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option)
  }
}
</script>
<style>

</style>
