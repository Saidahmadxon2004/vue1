<template>
  <div class="d-flex">
    <Sidebar />

    <main class="flex-grow-1 p-4 bg-light min-vh-100">
      <div class="d-flex justify-content-between align-items-center page-header mb-4 px-3 py-2 rounded">
        <h4 class="mb-0">{{ pageTitle }}</h4>

        <div class="d-flex align-items-center position-relative">
          <button v-if="addButtonLabel" class="btn add-btn me-3" @click="goToAddPage">
            <i class="bi bi-plus me-1"></i> {{ addButtonLabel }}
          </button>

          <div class="position-relative">
            <button class="btn admin-btn" @click="showDropdown = !showDropdown">
              <i class="bi bi-person"></i> Admin
            </button>
            <div v-if="showDropdown" class="dropdown-menu-custom">
              <a class="dropdown-item" href="#" @click="logout">Logout</a>
            </div>
          </div>
        </div>
      </div>

      <router-view />
    </main>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'

export default {
  components: { Sidebar },
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    pageTitle() {
      switch (this.$route.path) {
        case '/products': return 'Mahsulotlar'
        case '/units': return 'Birliklar'
        case '/extraunits': return 'Qo‘shimcha birliklar'
        case '/brands': return 'Brendlar'
        case '/models': return 'Model'
        case '/colours': return 'Ranglar'
        case '/countrys': return 'Mamlakatlar'
        case '/kurs': return 'Kurs'
        case '/kontragent': return 'Kontragent'
        case '/crm': return 'CRM'
        case '/staff': return 'Xodimlar'
        case '/users': return 'Foydalanuvchilar'
        case '/kassoviyOrder': return 'Kassa Order'
        case '/tolov': return 'To‘lov'
        case '/kirim': return 'Kirim'
        case '/chiqim': return 'Chiqim'
        default: return ''
      }
    },
    addButtonLabel() {
      if (!this.addButtonRoute) return ''
      return 'Qo‘shish'
    },
    addButtonRoute() {
      switch (this.$route.path) {
        case '/products': return '/product/create'
        case '/units': return '/addUnit'
        case '/extraunits': return '/addExtraUnit'
        case '/brands': return '/addBrand'
        case '/models': return '/addModel'
        case '/colours': return '/addColour'
        case '/countrys': return '/addCountry'
        case '/kurs': return '/kurs/create'
        case '/kontragent': return '/kontragent/create'
        case '/crm': return '/crm/create'
        case '/staff': return '/staff/create'
        case '/users': return '/user/create'
        case '/kassoviyOrder': return '/kassaOrder/create'
        case '/tolov': return '/addTolov'
        case '/kirim':return '/kirim/create'
        default: return ''
      }
    }
  },
  methods: {
    goToAddPage() {
      if (this.addButtonRoute) {
        this.$router.push(this.addButtonRoute)
      }
    },
    logout() {
      localStorage.removeItem('auth');
      this.$router.push('/');
      this.showDropdown = false
      
    }
  },
  watch: {
    
    '$route'() {
      this.showDropdown = false
    }
  }
}
</script>

<style scoped>
.page-header {
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
h4 {
  color: #515151;
}
.add-btn {
  background: #1e6bb8;
  color: #f8f9fa;
}
.add-btn:hover {
  background: #155a99;
  color: #ffffff;
  transition: 0.3s;
}
.admin-btn {
  background: #1e6bb8;
  color: #f8f9fa;
}
.admin-btn:hover {
  background: #155a99;
  transition: 0.3s;
}

.dropdown-menu-custom {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #ddd;
  min-width: 140px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 1000;
  border-radius: 5px;
}
.dropdown-item {
  display: block;
  padding: 8px 12px;
  color: #333;
  cursor: pointer;
}
.dropdown-item:hover {
  background: #f8f9fa;
}
</style>
