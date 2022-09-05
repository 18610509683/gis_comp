<template>
  <div class="mapParent">
    <div id="map">
      <div class="btn-container">
        <el-button size="small" type="primary" round @click="addPolygon">添加面标记</el-button>
        <el-button size="small" type="primary" round @click="zoomToPolygon">缩放至面标记</el-button>
        <el-button size="small" type="primary" round @click="removePolygon">删除面标记</el-button>
        <el-button size="small" type="primary" round @click="showPolygon">显示面标记</el-button>
        <el-button size="small" type="primary" round @click="hidePolygon">隐藏面标记</el-button>
        <el-button size="small" type="primary" round @click="addCircle">添加圆标记</el-button>
        <el-button size="small" type="primary" round @click="removeCircle">删除圆标记</el-button>
        <el-button size="small" type="primary" round @click="showCircle">显示圆标记</el-button>
        <el-button size="small" type="primary" round @click="hideCircle">隐藏圆标记</el-button>
      </div>
    </div>
  </div>
</template>
<script src="./polygon.js"></script>
<style src="./polygon.scss" lang="scss" scoped></style>
