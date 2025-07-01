<template>
  <extra-form :datasend="datas"></extra-form>
</template>
<script>
  import ExtraForm from "./FormBrand.vue"
  export default {
  components: {ExtraForm},
    data() {
      return {
        'datas': {
          name: ""
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
          url: "api/v1/brand/id/"+self.$route.params.id
        }).then(function (response) {
          self.datas = response.data;
        });
      },
    }
  }
</script>