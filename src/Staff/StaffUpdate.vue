<template>
  <extra-form :datasend="datas"></extra-form>
</template>
<script>
  import ExtraForm from "./FormStaff.vue"
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
      this.Data();
    },
    methods: {
      Data() {
        let self = this;
        self.$axios({
          method: "get",
          url: "api/v1/staff/id/"+self.$route.params.id
        }).then(function (response) {
          self.datas = response.data;
        });
      },
    }
  }
</script>