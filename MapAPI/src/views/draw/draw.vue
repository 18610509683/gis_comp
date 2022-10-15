<template>
  <div class="mapParent">
    <div id="map">
      <div class="btn-container">
        <el-button size="small" type="primary" round @click="draw('Point')">画点</el-button>
        <el-button size="small" type="primary" round @click="draw('LineString')">画线</el-button>
        <el-button size="small" type="primary" round @click="draw('Polygon')">画多边形</el-button>
        <!-- <el-button size="small" type="primary" round @click="draw('Circle')">画圆</el-button> -->
        <el-button size="small" type="primary" round @click="clear">清空画的图形</el-button>
        <el-button size="small" type="primary" round @click="deactive">停止画图</el-button>
        <el-button size="small" type="primary" round @click="active">开始画图</el-button>
        <el-button size="small" type="primary" round @click="clearUserAdd">清空加载的点线面</el-button>
      </div>
    </div>
  </div>
</template>
<script src="./draw.js"></script>
<style src="./draw.scss" lang="scss" scoped></style>
