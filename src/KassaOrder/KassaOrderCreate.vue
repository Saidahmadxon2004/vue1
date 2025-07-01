<template>
  <extra-form :datasend="datas"></extra-form>
  
</template>
<script>
  import ExtraForm from "./FormKassa.vue"
  export default {
  components: {ExtraForm},
    data() {
      return {
        'datas': {
           datetime: Math.floor(Date.now() / 1000),
        sklad_id: null,
        summa: 0,
        dollar_rate: 11000,
        dollar_summa: 0,
        kassa_order_table: []
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