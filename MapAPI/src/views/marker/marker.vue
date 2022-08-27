<template>
  <div class="mapParent">
    <div id="map">
      <div class="btn-container">
        <el-button size="small" type="primary" round @click="addMarker">添加点标记</el-button>
        <el-button size="small" type="primary" round @click="removeMarker">删除点标记</el-button>
        <el-button size="small" type="primary" round @click="addContentDOM">添加附属窗体(DOM元素只支持offsetY)</el-button>
        <el-button size="small" type="primary" round @click="addContentDOM1">添加附属窗体(DOM元素支持offsetX,offsetY)</el-button>
        <el-button size="small" type="primary" round @click="hideContent">隐藏附属窗体</el-button>
        <el-button size="small" type="primary" round @click="showContent">显示附属窗体</el-button>
        <el-button size="small" type="primary" round @click="openWindow">Marker点击弹窗</el-button>
        <el-button size="small" type="primary" round @click="mouseWindow">鼠标移动到Marker位置弹窗</el-button>
        <el-button size="small" type="primary" round @click="markerText">Marker设置文字</el-button>
        <el-button size="small" type="primary" round @click="closeWindow">关闭弹窗</el-button>
      </div>
    </div>
  </div>
</template>
<script src="./marker.js"></script>
<style lang="scss">
  .infoBox{
    width:300px;
    height:200px;
    background-color: rgb(151, 160, 112);
  }
</style>
<style src="./marker.scss" lang="scss" scoped></style>