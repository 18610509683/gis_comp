<template>
  <div class="mapParent">
    <div id="map">
      <div class="btn-container">
        <el-button size="small" type="primary" round @click="addJson">添加JSON图层</el-button>
      </div>
    </div>
  </div>
</template>
<script src="./jsonLayer.js"></script>
<style lang="scss">
  .infoBox{
    width:300px;
    height:200px;
    background-color: rgb(151, 160, 112);
  }
</style>
<style src="./jsonLayer.scss" lang="scss" scoped></style>