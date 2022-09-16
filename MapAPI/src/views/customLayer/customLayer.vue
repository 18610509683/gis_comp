<template>
  <div class="mapParent">
    <div id="map">
      <div class="btn-container">
        <!-- <el-button size="small" type="primary" round @click="addLayer">添加自定义图层(WGS84)</el-button>
        <el-button size="small" type="primary" round @click="addBaiDuLayer">添加自定义图层(百度)</el-button>
        <el-button size="small" type="primary" round @click="hideLayer">隐藏图层</el-button>
        <el-button size="small" type="primary" round @click="showLayer">显示图层</el-button>
        <el-button size="small" type="primary" round @click="removeLayer">移除图层</el-button> -->
      </div>
    </div>
  </div>
</template>
<script src="./customLayer.js"></script>
<style lang="scss">
  .infoBox{
    width:300px;
    height:200px;
    background-color: rgb(151, 160, 112);
  }
</style>
<style src="./customLayer.scss" lang="scss" scoped></style>