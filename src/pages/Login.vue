<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center bg-light">
    <div class="card shadow p-4" style="min-width: 350px;">
      <h3 class="text-center mb-4">Admin Login</h3>
      <form @submit.prevent="handleLogin">
        
        <Vue3Select
          v-model="selectedSklad"
          :options="options"
          label="name"
          :reduce="option => option.id"
          placeholder="Sklad tanlang"
        />

        
        <Vue3Select
          v-if="selectedSklad"
          v-model="selectedAdmin"
          :options="filteredAdmins"
          label="username"
          :reduce="admin => admin.username"
          placeholder="Admin tanlang"
          class="mt-3"
        />

        
        <div class="mb-3 mt-3">
          <input
            type="password"
            v-model="parol"
            class="form-control"
            placeholder="Parol"
            required
          />
        </div>

        <div v-if="showErr" class="alert alert-danger py-2 px-3" role="alert">
          Parol xato yoki admin tanlanmagan
        </div>

        <button type="submit" class="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue3Select from 'vue3-select'

export default {
  components: {
    Vue3Select
  },
  data() {
    return {
      selectedSklad: null,
      selectedAdmin: null,
      parol: '',
      showErr: false,
      options: [],
      admins: [],
    }
  },
  computed: {
    filteredAdmins() {
      
      return this.admins.filter(admin => admin.skladId === this.selectedSklad)
    }
  },
  mounted() {
    this.loadSkladOptions()
  },
  methods: {
    async loadSkladOptions() {
      try {
        const res = await axios.get('http://185.76.13.223:3084/api/v1/sklads/skladnames')
        console.log('Skladlar:', res.data)

        this.options = res.data.map((item, index) => ({
          id: index + 1,
          name: item.name
        }))

        
        this.admins = [
          { username: 'admin1', parol: '123456', skladId: 1 },
          { username: 'admin2', parol: '12345', skladId: 1 },
          { username: 'admin3', parol: '1234', skladId: 2 },
          { username: 'admin4', parol: '123', skladId: 2 }
          
        ]
      } catch (error) {
        console.error('Xatolik:', error)
      }
    },
    handleLogin() {
      const admin = this.admins.find(
        a => a.username === this.selectedAdmin && a.skladId === this.selectedSklad
      )

      if (admin && this.parol === admin.parol) {
        localStorage.setItem('auth', 'true')
        localStorage.setItem('skladId', this.selectedSklad)
        this.$router.push('/dashboard')
      } else {
        this.showErr = true
        this.parol = ''
        setTimeout(() => {
          this.showErr = false
        }, 3000)
      }
    }
  }
}
</script>
