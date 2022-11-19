<template>
  <div class="mapParent">
    <div id="map">
    </div>
    <div class="btn-container">
      <el-button size="small" type="primary" round @click="getCenterAndZoom">获取中心点坐标与层级</el-button>
      <el-button size="small" type="primary" round @click="setZoomAndCenter">设置中心点坐标与层级</el-button>
      <el-button size="small" type="primary" round @click="GetCoordinates">{{text}}</el-button>
      <el-button size="small" type="primary" round @click="getCenter">获取中心点</el-button>
      <el-button size="small" type="primary" round @click="getZoom">获取层级</el-button>
      <el-button size="small" type="primary" round @click="setWheelZoomSize">设置每次缩放zoom的改变量(1)</el-button>
    </div>
  </div>
</template>
<script src="./info.js"></script>
<style lang="scss">
  .infoBox{
    width:300px;
    height:200px;
    background-color: rgb(151, 160, 112);
  }
</style>
<style src="./info.scss" lang="scss" scoped></style>