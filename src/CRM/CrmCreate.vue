<template>
  <extra-form :datasend="datas"></extra-form>
  
</template>
<script>
  import ExtraForm from "./FormCrm.vue"
  export default {
  components: {ExtraForm},
    data() {
      return {
        'datas': {
          first_name : "",
	last_name : "",
	middle_name : "",
	phone_number : "",
	work_id : null,
	work_address_id: null,
	found_address_id : null,
	found_datetime : null,
	last_datetime: null,
	contact_datetime: null,
	probability: null,
	status_id : null,
	comment : ""
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