<template>
  <extra-form :datasend="datas"></extra-form>
</template>
<script>
  import ExtraForm from "./FormKontragent.vue"
  export default {
  components: {ExtraForm},
    data() {
      return {
        'datas': {
          name :"",
	phone_number : "",
	account_number : "",
	inn : "",
	mfo_id : null,
	okonx : '',
	address : "",
	firma_id : null,
	sklad_id : null,
	is_folder: false,
	type : null,
	comment : "",
    parent_id:0,
	payment_date: 0
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
          url: "api/v1/kontragent/id/"+self.$route.params.id
        }).then(function (response) {
          self.datas = response.data;
        });
      },
    }
  }
</script>