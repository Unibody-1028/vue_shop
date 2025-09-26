<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>商品统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="main" style="width: 600px;height: 400px;"></div>
    </el-card>
  </div>
</template>
<script >
import * as echarts from 'echarts'
export default {
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    var option = {
      title: {
        text: 'ECharts Getting Started Example'
      },
      tooltip: {},
      legend: {
        data: ['sales']
      },
      xAxis: {
        data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
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
