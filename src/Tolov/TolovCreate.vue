<template>
  <extra-form :datasend="datas"></extra-form>
  
</template>
<script>
import moment from 'moment';
  import ExtraForm from "./FormTolov.vue"
  export default {
  components: {ExtraForm},
    data() {
      return {
        'datas': 
          {
  datetime: Math.floor(Date.now() / 1000),
  sklad_id: 1,
  kontragent_id: 1,
  pay_type_id: 1,
  summa: 0,
  current_total: 0,
  type: true,
  comment: "",
  number: null,
  dollar_rate: 1,
  pay_type_kassa: 2,
  kassa_summa: 0,
  current_total_dollar: 2,
  user_id: 1,
  z_report: false,
  dollar_summa: 0,
  cash_summa: 0,
  plastic_summa: 1000,
  shot_summa: 0,
  qaytim_dollar: 0,
  qaytim_som: 0
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