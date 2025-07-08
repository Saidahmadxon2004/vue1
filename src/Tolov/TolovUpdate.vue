<template>
  <extra-form :datasend="datas"></extra-form>
</template>

<script>
import moment from 'moment';
import ExtraForm from "./FormTolov.vue";

export default {
  components: { ExtraForm },
  data() {
    return {
      datas: {
        sklad_id: null,
        counterparty_id: null,
        counterparty_name: '',
        balance_usd: 0,
        balance_uzs: 0,
        payment_type_id: 1,
        amount: 0,
        payment_date: moment().format('YYYY-MM-DD'),
        comment: '',
        transaction_type: 'income',
        cash_dollar: 0,
        cash_sum: 0,
        plastic: 0,
        transfer: 0,
        change_sum: 0,
        change_dollar: 0,
        dollar_rate: 13000,
      }
    };
  },
  created() {
    this.fetchPaymentData();
  },
  methods: {
    async fetchPaymentData() {
      try {
        const response = await this.$axios.get("api/v1/kontragent-pay/id/" + this.$route.params.id);
        const backendData = response.data;

        this.datas = {
          id: backendData.id,
          sklad_id: backendData.sklad_id,
          counterparty_id: backendData.kontragent_id,
          counterparty_name: backendData.kontragent ? backendData.kontragent.name : '',
          balance_usd: backendData.current_total_dollar || 0,
          balance_uzs: backendData.current_total || 0,
          payment_type_id: backendData.pay_type_id,
          amount: backendData.summa || 0,
          payment_date: moment.unix(backendData.datetime).format('YYYY-MM-DD'),
          comment: backendData.comment || '',
          transaction_type: backendData.type === true ? 'income' : 'expense',
          cash_dollar: backendData.dollar_summa || 0,
          cash_sum: backendData.cash_summa || 0,
          plastic: backendData.plastic_summa || 0,
          transfer: backendData.shot_summa || 0,
          change_sum: backendData.qaytim_som || 0,
          change_dollar: backendData.qaytim_dollar || 0,
          dollar_rate: backendData.dollar_rate || 1,
        };
      } catch (err) {
        console.error('Xatolik:', err);
        alert('Tolov ma\'lumotlarini yuklashda xatolik yuz berdi.');
      }
    },
  }
};
</script>
