<template>
  <form class="card p-4 shadow-sm border rounded-3">
    <h5 class="mb-4">Xodim Qo‘shish / Tahrirlash</h5>

    <!-- Basic Info Fields -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Nomi</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.name" required />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Maosh</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.salary" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Bonus %</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.bonus" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Lavozimi</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.position" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Tabel raqami</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.tabel_number" />
      </div>
    </div>
    
    <div class="d-flex justify-content-end mt-4">
      <button type="button" class="btn btn-primary me-2" @click="Send">Saqlash</button>
      <button type="button" class="btn btn-secondary" @click="$router.back()">Chiqish</button>
    </div>
    
   

    
    <!-- Modals for each select -->
    
  </form>
  
</template>

<script>

export default {
  
  props: ["datasend"],
  data() {
    return { 
      
    }
  },
  
  mounted() {
    
  },
  created(){},
  methods: {
    
    Send() {
      let method = this.$route.params.id ? 'patch' : 'post';
      let url = this.$route.params.id
        ? `/api/v1/staff/id/${this.$route.params.id}`
        : '/api/v1/staff';

      this.$axios({
        method,
        url,
        data: this.datasend
      }).then(() => {
        this.$router.push({ path: "/staff" });
      }).catch(error => {
        console.error('Xato:', error.response?.data || error.message);
      });
    }
  }
}
</script>