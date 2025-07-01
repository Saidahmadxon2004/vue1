<template>
  <header class="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm">
    <h4 class="mb-0 fw-bold text-primary">BDM</h4>
    <button class="btn btn-outline-primary btn-sm rounded-pill px-4 logout-btn"
      @click="logout">
      Logout
    </button>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('auth');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.logout-btn {
  transition: all 0.3s ease;
}
.logout-btn:hover {
  background: #0d6efd;
  color: white;
  border-color: #0d6efd;
}
</style>
