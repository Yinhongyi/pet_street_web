<template>
  <div>
    add commodity
  </div>
</template>
<script>
/*eslint-disable*/
export default {
  props:{
    commodityData: {
      type: '',
      default: function (){
        return {}
      }
    }
  },
  components: {},
  data(){
    return {

    }
  },
  methods:{

  },
  created(){
    let params = {
      "channelId": "string",
      "channelType": "iOS001",
      "deviceModel": "iPhone 5s / 小米4A",
      "deviceToken": "string",
      "deviceType": "iPhone",
      "idfa": "string",
      "imei": "string",
      "latitude": "39.961405",
      "longitude": "116.400819",
      "mobile": "string",
      "sysVersion": "iOS 8.0",
      "version": "1.0.0"
    };
    this.$http.post('api/v2/msg/send/smscode', params).then((res)=>{
      console.log(res)
    })
  },
}
</script>
