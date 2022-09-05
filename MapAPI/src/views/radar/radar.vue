<template>
  <div class="mapParent">
    <div id="map">
      <div class="btn-container">
        <el-button size="small" type="primary" round @click="addRadar">添加雷达图</el-button>
        <!-- <el-button size="small" type="primary" round @click="removeOverView">移除鹰眼控件</el-button> -->
      </div>
    </div>
  </div>
</template>
<script src="./radar.js"></script>
<style src="./radar.scss" lang="scss" scoped></style>
