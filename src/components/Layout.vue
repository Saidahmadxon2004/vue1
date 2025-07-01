<template>
  <div>
    <Header />
    <div class="d-flex">
      <Sidebar />
      <main class="flex-grow-1 p-4 bg-light min-vh-100">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'

export default {
  components: {
    Header,
    Sidebar
  }
}
</script>
