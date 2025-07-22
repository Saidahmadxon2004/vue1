<template>
  <extra-form :datasend="datas"></extra-form>
  
</template>
<script>
  import ExtraForm from "./FormRasxod.vue"
  export default {
  components: {ExtraForm},
    data() {
      return {
        'datas': {
          name: "",
        salary: null,
        bonus: null,
        sklad_id: localStorage.getItem("skladId"),
        tabel_number: 0,
        position: "",
	
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