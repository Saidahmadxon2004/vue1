<template>
  <extra-form :datasend="datas"></extra-form>
</template>
<script>
  import ExtraForm from "./FormUser.vue"
  export default {
  components: {ExtraForm},
    data() {
      return {
        'datas': {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  first_name: "",
  last_name: "",
  salary:null,
  percent:0,
  staff_id:null,
  sklad_id: 0,
  mobile_prixod: false,
  mobile_rasxod: false,
   mobile_tan_narx:false,
  rules: [
    {
      id: 32,
      doc_for_rule_id: 1,
      doc_for_rule: {
        id: 1,
        type: "document",
        name: "Кирим",
        icon: "arrow-down",
        path: "/kirim/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 33,
      doc_for_rule_id: 2,
      doc_for_rule: {
        id: 2,
        type: "document",
        name: "Чиқим",
        icon: "arrow-up",
        path: "/chiqim/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 34,
      doc_for_rule_id: 3,
      doc_for_rule: {
        id: 3,
        type: "document",
        name: "Кассовий ордер",
        icon: "calendar3-range",
        path: "/kassaorder/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 35,
      doc_for_rule_id: 4,
      doc_for_rule: {
        id: 4,
        type: "document",
        name: "Тўлов",
        icon: "cash-coin",
        path: "/oplata/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 36,
      doc_for_rule_id: 5,
      doc_for_rule: {
        id: 5,
        type: "document",
        name: "Калкулация",
        icon: "calculator-fill",
        path: "/calculation/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 37,
      doc_for_rule_id: 6,
      doc_for_rule: {
        id: 6,
        type: "document",
        name: "Ишлаб чиқариш",
        icon: "pin-map",
        path: "/production/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 38,
      doc_for_rule_id: 7,
      doc_for_rule: {
        id: 7,
        type: "document",
        name: "Возврат клиент",
        icon: "arrow-down-right-circle-fill",
        path: "/refund/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 39,
      doc_for_rule_id: 8,
      doc_for_rule: {
        id: 8,
        type: "document",
        name: "Возврат поставшик",
        icon: "arrow-up-right-circle-fill",
        path: "/refundsuplier/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 40,
      doc_for_rule_id: 9,
      doc_for_rule: {
        id: 9,
        type: "document",
        name: "Перемешения",
        icon: "arrow-left-right",
        path: "/transfer/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 41,
      doc_for_rule_id: 10,
      doc_for_rule: {
        id: 10,
        type: "document",
        name: "Перемешения касса",
        icon: "currency-exchange",
        path: "/money-transfer/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 42,
      doc_for_rule_id: 11,
      doc_for_rule: {
        id: 11,
        type: "document",
        name: "Ревизия",
        icon: "zoom-in",
        path: "/revision/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 43,
      doc_for_rule_id: 12,
      doc_for_rule: {
        id: 12,
        type: "document",
        name: "Бошланғич қолдиқ",
        icon: "union",
        path: "/initial/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 44,
      doc_for_rule_id: 13,
      doc_for_rule: {
        id: 13,
        type: "document",
        name: "Kontragentinitial",
        icon: "person-lines-fill",
        path: "/kontragentinitial/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 45,
      doc_for_rule_id: 14,
      doc_for_rule: {
        id: 14,
        type: "catalog",
        name: "Курс",
        icon: "currency-dollar",
        path: "/malumot/dollar/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 46,
      doc_for_rule_id: 15,
      doc_for_rule: {
        id: 15,
        type: "catalog",
        name: "Товар",
        icon: "newspaper",
        path: "/malumot/product/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 47,
      doc_for_rule_id: 16,
      doc_for_rule: {
        id: 16,
        type: "catalog",
        name: "Филиал",
        icon: "shop",
        path: "/malumot/sklad/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 48,
      doc_for_rule_id: 17,
      doc_for_rule: {
        id: 17,
        type: "catalog",
        name: "Контрагент",
        icon: "person-lines-fill",
        path: "/malumot/kontragent/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 49,
      doc_for_rule_id: 18,
      doc_for_rule: {
        id: 18,
        type: "catalog",
        name: "Фойдаланувчи",
        icon: "person-bounding-box",
        path: "/malumot/user/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 50,
      doc_for_rule_id: 19,
      doc_for_rule: {
        id: 19,
        type: "catalog",
        name: "Crm",
        icon: "pin-fill",
        path: "/malumot/crm-client/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 51,
      doc_for_rule_id: 20,
      doc_for_rule: {
        id: 20,
        type: "report",
        name: "Харажат хисобот",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/xarajat/"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 52,
      doc_for_rule_id: 21,
      doc_for_rule: {
        id: 21,
        type: "report",
        name: "Кунлик айланма",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/rasxod/"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 53,
      doc_for_rule_id: 22,
      doc_for_rule: {
        id: 22,
        type: "report",
        name: "Баланс хисобот",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/balance/"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 54,
      doc_for_rule_id: 23,
      doc_for_rule: {
        id: 23,
        type: "report",
        name: "Касса сверкаси",
        icon: "file-text-fill",
        path: "/xisobot/sverka/kassa/"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 55,
      doc_for_rule_id: 24,
      doc_for_rule: {
        id: 24,
        type: "report",
        name: "Товар хисоботи",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/product/"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 56,
      doc_for_rule_id: 25,
      doc_for_rule: {
        id: 25,
        type: "report",
        name: "Товар сверкаси",
        icon: "file-text-fill",
        path: "/xisobot/sverka/product/null/null/null/null"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 57,
      doc_for_rule_id: 26,
      doc_for_rule: {
        id: 26,
        type: "report",
        name: "Фойда хисоботи",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/foyda/"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 58,
      doc_for_rule_id: 27,
      doc_for_rule: {
        id: 27,
        type: "report",
        name: "Фойда сверкаси",
        icon: "file-text-fill",
        path: "/xisobot/sverka/foyda/null/null/null/null"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 59,
      doc_for_rule_id: 28,
      doc_for_rule: {
        id: 28,
        type: "report",
        name: "Контрагент хисоботи",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/kontragent/"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 60,
      doc_for_rule_id: 29,
      doc_for_rule: {
        id: 29,
        type: "report",
        name: "Контрагент сверкаси",
        icon: "file-text-fill",
        path: "/xisobot/sverka/kontragent/null/null/null/null/dollar"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 78,
      doc_for_rule_id: 30,
      doc_for_rule: {
        id: 30,
        type: "report",
        name: "Товар абс",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/product_abc"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 79,
      doc_for_rule_id: 31,
      doc_for_rule: {
        id: 31,
        type: "report_rester",
        name: "Приход реeстер",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/rester_kirim"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 80,
      doc_for_rule_id: 32,
      doc_for_rule: {
        id: 32,
        type: "report_rester",
        name: "Продажа реeстер",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/rester_chiqim"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 81,
      doc_for_rule_id: 33,
      doc_for_rule: {
        id: 33,
        type: "report_rester",
        name: "Оплата реeстер",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/rester_oplata"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 82,
      doc_for_rule_id: 34,
      doc_for_rule: {
        id: 34,
        type: "report_rester",
        name: "Возврат реeстер",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/rester_refund"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 83,
      doc_for_rule_id: 35,
      doc_for_rule: {
        id: 35,
        type: "report_rester",
        name: "Возврат поставшик реeстер",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/rester_refund_suplier"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 84,
      doc_for_rule_id: 36,
      doc_for_rule: {
        id: 36,
        type: "catalog",
        name: "Панел",
        icon: "columns",
        path: "/malumot/panel/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 85,
      doc_for_rule_id: 37,
      doc_for_rule: {
        id: 37,
        type: "document",
        name: "Списания",
        icon: "trash",
        path: "/write-off/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 94,
      doc_for_rule_id: 38,
      doc_for_rule: {
        id: 38,
        type: "document",
        name: "Конверсия",
        icon: "arrow-left-right",
        path: "/convertion/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 95,
      doc_for_rule_id: 39,
      doc_for_rule: {
        id: 39,
        type: "report_rester",
        name: "Перемешения рестер",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/rester_transfer"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 96,
      doc_for_rule_id: 40,
      doc_for_rule: {
        id: 40,
        type: "report_rester",
        name: "Cписания рестер",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/rester_writeoff"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 99,
      doc_for_rule_id: 41,
      doc_for_rule: {
        id: 41,
        type: "report_user",
        name: "Ходим хисоботи",
        icon: "file-text-fill",
        path: "/xisobot/xisobot/user"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 100,
      doc_for_rule_id: 42,
      doc_for_rule: {
        id: 42,
        type: "report_user",
        name: "Ходим сверкаси",
        icon: "file-text-fill",
        path: "/xisobot/sverka/user/null/null/null/null"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 101,
      doc_for_rule_id: 43,
      doc_for_rule: {
        id: 43,
        type: "document",
        name: "Маош хисоблаш",
        icon: "journal-bookmark",
        path: "/salary/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 102,
      doc_for_rule_id: 44,
      doc_for_rule: {
        id: 44,
        type: "document",
        name: "Ходимга тўлов",
        icon: "cash-coin",
        path: "/user_pay/index"
      },
      see: false,
      open: false,
      change: false
    },
    {
      id: 107,
      doc_for_rule_id: 45,
      doc_for_rule: {
        id: 45,
        type: "catalog",
        name: "Ходим",
        icon: "file-text-fill",
        path: "/malumot/staff/index"
      },
      see: false,
      open: false,
      change: false
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
          url: "api/v1/users/id/"+self.$route.params.id
        }).then(function (response) {
          self.datas = response.data;
        });
      },
    }
  }
</script>