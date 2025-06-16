<template>
  <header class="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
    <h4 class="mb-0">BDM</h4>
    <button class="btn btn-outline-light btn-sm" @click="logout">Logout</button>
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
