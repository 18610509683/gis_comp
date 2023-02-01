<template>
  <div class="mapParent">
    <div id="map">
      <div class="btn-container">
        <el-button size="small" type="primary" round @click="addPolyLine">添加线标记</el-button>
        <el-button size="small" type="primary" round @click="zoomToPolyLine">缩放线标记</el-button>
        <el-button size="small" type="primary" round @click="zoomToPolyLineList">缩放线标记组</el-button>
        <el-button size="small" type="primary" round @click="removePolyLine">删除线标记</el-button>
        <el-button size="small" type="primary" round @click="showPolyLine">显示线标记</el-button>
        <el-button size="small" type="primary" round @click="hidePolyLine">隐藏线标记</el-button>
        <el-button size="small" type="primary" round @click="infoWindow">线标记弹窗</el-button>
        <el-button size="small" type="primary" round @click="setLineDashOffset">流动线样式</el-button>
      </div>
    </div>
  </div>
</template>
<script src="./polyline.js"></script>
<style src="./polyline.scss" lang="scss" scoped></style>
