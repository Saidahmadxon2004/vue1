<template>
  <extra-form :datas="datas"></extra-form>
</template>
<script>
  import ExtraForm from "./FormKirim.vue"
  export default {
  components: {ExtraForm},
    data() {
      return {
        'datas': {      
  created_at: Math.floor(Date.now() / 1000),
  updated_at: Math.floor(Date.now() / 1000),
  sklad_id: 1,
  kontragent_id: 1,
  pay_type_id: 1,
  rasxod_summa: 0.00,
  skidka_summa: 0.00,
  summa: 50000,
  debit_summa: 50000,
  comment: "dastlabki kirim",
  count_all: 10,
  dollar_rate: 11000,
  prixod_summa: 50000,
  user_id: 1,
  prixod_table: [
    {
      product_id: 2,
      current_balance: 0,
      count: 10,
      debit_price: 5000,
      debit_summa: 50000,
      kontragent_price: 5000,
      kontragent_summa: 50000,
      chakana_percent: 10,
      optom_percent: 5,
      chakana_price: 5500,
      optom_price: 5250,
      chakana_summa: 55000,
      optom_summa: 52500,
      chakana_dollar_price: 0.5,
      optom_dollar_price: 0.477
    }
  ]
        }
      }
    },
    mounted() {
    },
    created() {
      this.Data();
    },
    methods: {
      Data() {
        let self = this;
        self.$axios({
          method: "get",
          url: "api/v1/prixod/id/"+self.$route.params.id
        }).then(function (response) {
          self.datas = response.data;
          console.log(self.datas)
        });
      },
    }
  }
</script>