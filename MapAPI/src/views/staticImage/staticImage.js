import * as KMap from '@/kmap/ol-map/KMap'
export default {
  name: 'staticImage',
  data() {
    return {
      imgUrl:require('@/kmap/api-resource/images/staticImage.png'),
    }
  },
  mounted() {
    this.createMap()
  },
  created() {
  },
  methods: {
    createMap() {
      KMap.Common.UseGaoDeOnlineLayer = true;
      KMap.Common.ShowLevel = [1,15];
      KMap.Common.ShowToolbarControl = false;
      // KMap.Common.BaseLayerZoom = [1,12]
      window.map = new KMap.Map("map",8,114,32);
    },
    addStatic(){
      const vm = this
      const staticLayer = new KMap.StaticImageLayer(this.imgUrl,{extent:[111,30.0,117,34.0],minZoom:2,maxZoom:14})
    }
  }
}
