<template>
  <div class="mapParent">
    <div id="map">
      <div class="btn-container">
        <el-button size="small" type="primary" round @click="addOverView">鹰眼控件</el-button>
        <el-button size="small" type="primary" round @click="removeOverView">移除鹰眼控件</el-button>
        <el-button size="small" type="primary" round @click="showMouseTool">显示鼠标控件</el-button>
        <el-button size="small" type="primary" round @click="removeMouseTool">移除鼠标控件</el-button>
      </div>
    </div>
  </div>
</template>
<script src="./control.js"></script>
<style src="./control.scss" lang="scss" scoped></style>
