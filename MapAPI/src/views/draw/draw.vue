<template>
  <div class="mapParent">
    <div id="map">
      <div class="btn-container">
        <el-button size="small" type="primary" round @click="draw('Point')">画点</el-button>
        <el-button size="small" type="primary" round @click="draw('LineString')">画线</el-button>
        <el-button size="small" type="primary" round @click="draw('Polygon')">画面</el-button>
        <el-button size="small" type="primary" round @click="draw('Circle')">画圆</el-button>
        <el-button size="small" type="primary" round @click="clear">清空</el-button>
        <el-button size="small" type="primary" round @click="destory">销毁</el-button>
        <el-button size="small" type="primary" round @click="deactive">失效</el-button>
        <el-button size="small" type="primary" round @click="active">激活</el-button>
      </div>
    </div>
  </div>
</template>
<script src="./draw.js"></script>
<style src="./draw.scss" lang="scss" scoped></style>
