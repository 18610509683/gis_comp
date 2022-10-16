<template>
  <div class="mapParent">
    <div id="map">
    </div>
    <div class="btn-container">
      <el-button size="small" type="primary" round @click="addGaoDeOffline">高德在线</el-button>
      <el-button size="small" type="primary" round @click="addBaiduOffline">百度离线</el-button>
      <el-button size="small" type="primary" round @click="addWGS84Offline">WGS84 wmts 离线</el-button>
    </div>
  </div>
</template>
<script src="./zonghe.js"></script>
<style lang="scss">
  .infoBox{
    width:300px;
    height:200px;
    background-color: rgb(151, 160, 112);
  }
</style>
<style src="./zonghe.scss" lang="scss" scoped></style>