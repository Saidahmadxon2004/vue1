<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center bg-light">
    <div class="card shadow p-4" style="min-width: 350px;">
      <h3 class="text-center mb-4">Admin Login</h3>
      <form @submit.prevent="handleLogin">
        
        <!-- Sklad select -->
        <Vue3Select
          v-model="selectedSklad"
          :options="options"
          label="name"
          :reduce="option => option.id"
          placeholder="Sklad tanlang"
        />

        <!-- Admin select (doim ko‘rinadi) -->
        <Vue3Select
          v-model="selectedAdmin"
          :options="filteredAdmins"
          label="username"
          :reduce="admin => admin.username"
          placeholder="Admin tanlang"
          :disabled="!selectedSklad"
          class="mt-3"
        />

        <!-- Parol -->
        <div class="mb-3 mt-3">
          <input
            type="password"
            v-model="parol"
            class="form-control"
            placeholder="Parol"
            required
          />
        </div>

        <!-- Xato -->
        <div v-if="showErr" class="alert alert-danger py-2 px-3" role="alert">
          Parol xato yoki admin tanlanmagan
        </div>

        <!-- Button -->
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
      admins: []
    }
  },
  computed: {
    filteredAdmins() {
      if (!this.selectedSklad) return []
      return this.admins.filter(admin => admin.skladId === this.selectedSklad)
    }
  },
  mounted() {
    this.loadSkladOptions()
    this.loadAdmins()
  },
  methods: {
    async loadSkladOptions() {
      try {
        const res = await axios.get('/api/v1/sklads/skladnames')
        this.options = res.data.map((item, index) => ({
          id: index + 1,
          name: item.name
        }))
      } catch (error) {
        console.error('Skladlarni olishda xatolik:', error)
      }
    },
    async loadAdmins() {
      try {
        const res = await axios.get('/api/v1/users')
        this.admins = res.data.map(user => ({
          username: user.username,
          skladId: user.sklad_id
        }))
      } catch (error) {
        console.error('Adminlarni olishda xatolik:', error)
       
      }
    },
    async handleLogin() {
      if (!this.selectedAdmin || !this.parol || !this.selectedSklad) {
        this.showErr = true
        setTimeout(() => (this.showErr = false), 3000)
        return
      }

      try {
        const response = await axios.post(
          '/api/v1/users/login',
          {
            username: this.selectedAdmin,
            password: this.parol,
            sklad_id: this.selectedSklad
          },
          {
            headers: {
              'Content-Type': 'application/json',
              mobile: '1'
            }
          }
        )
        const token = response.data.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('auth', 'true')
        localStorage.setItem('skladId', this.selectedSklad)
        localStorage.setItem('username', this.selectedAdmin)
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Login xatoligi:', error)
        this.showErr = true
        this.parol = ''
        setTimeout(() => (this.showErr = false), 3000)
      }
    }
  }
}
</script>

<style scoped>
/* xohlasang style qo‘shib bezatsang bo‘ladi */
</style>
