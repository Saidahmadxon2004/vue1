<template>
  <extra-form :datas="datas"></extra-form>
</template>

<script>
import { reactive } from 'vue';
import ExtraForm from './FormKirim.vue';

export default {
  components: { ExtraForm },
  setup() {
    const datas = reactive({
      created_at: Math.floor(Date.now() / 1000),
      updated_at: Math.floor(Date.now() / 1000),
      sklad_id: 3,
      kontragent_id: 1,
      pay_type_id: 1,
      rasxod_summa: 0.00,
      skidka_summa: 0.00,
      summa: 0,
      debit_summa: 0,
      comment: '',
      count_all: 0,
      dollar_rate: 11000,
      prixod_summa: 0,
      prixod_table: [
        {
          product_id: null,
          current_balance: 0,
          count: 0,
          debit_price: 0,
          debit_summa: 0,
          kontragent_price: 0,
          kontragent_summa: 0,
          chakana_percent: 0,
          optom_percent: 0,
          chakana_price: 0,
          optom_price: 0,
          chakana_summa: 0,
          optom_summa: 0,
          chakana_dollar_price: 0,
          optom_dollar_price: 0,
          shtrix_kod: '',
          pack_count: 0,
          pack_price: 0,
          pack_norma: 0,
        },
      ],
    });

    return { datas };
  },
};
</script>