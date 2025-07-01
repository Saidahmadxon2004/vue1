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
	payment_date:  Math.floor(Date.now() / 1000)
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