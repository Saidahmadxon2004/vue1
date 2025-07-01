<template>
  <extra-form :datasend="datas"></extra-form>
  
</template>
<script>
  import ExtraForm from "./FormColour.vue"
  export default {
  components: {ExtraForm},
    data() {
      return {
        'datas': {
          name: ""
        }
      }
    },
    mounted() {
    },
    created() {
    },
    methods: {
      
    }
  }
</script>