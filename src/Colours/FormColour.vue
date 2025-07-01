<template>
  <form class="card p-4 shadow-sm border rounded-3">
    <h5 class="mb-4">Colour Qo‘shish / Tahrirlash</h5>

    <div class="row mb-3">
      <div class="col-md-6">
        <label for="name" class="form-label">Nomi</label>
        <input
          type="text"
          id="name"
          v-model="datasend.name"
          class="form-control"
          placeholder="Colour birlik nomini yozing ..."
          required
        />
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary" @click="Send()">Saqlash</button>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: ["datasend"],
    mounted() {
    },
    created() {
    },
    methods: {
      Send() {
        let self = this;
        let method='post';
        var url='api/v1/colour';
        if(self.$route.params.id){
        method='patch';
        url='api/v1/colour/id/'+self.$route.params.id;
        }
        self.$axios({
          method: method,
          url: url,
          data: self.datasend
        }).then(function (response) {
          self.$router.push({ path: "/colours" });
        }).catch(error => {
          if (error.response) {
            console.error('Xato javob:', error.response.data);
          } else if (error.request) {
            console.error('Serverdan javob kelmadi:', error.request);
          } else {
            console.error('So‘rov xatosi:', error.message);
          }
        });
      },
    }
  }
</script>