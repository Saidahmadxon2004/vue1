<template>
  <div class="vh-100 p-3 sidebar-custom">
    <!-- Hujjatlar -->
    <div>
      <div @click="toggleMenu('hujjatlar')" class="d-flex justify-content-between align-items-center fw-semibold mb-2 cursor-pointer">
        <span><i class="bi bi-folder2-open me-2"></i>Hujjatlar</span>
        <i :class="isOpen.hujjatlar ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
      </div>
      <ul v-show="isOpen.hujjatlar" class="nav flex-column mb-3">
        <li class="nav-item" v-for="item in hujjatMenu" :key="item.title">
          <router-link :to="item.to" class="nav-link rounded small"
            active-class="active-link">
            <i :class="item.icon + ' me-2'"></i>{{ item.title }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Ma’lumotlar -->
    <div>
      <div @click="toggleMenu('malumotlar')" class="d-flex justify-content-between align-items-center fw-semibold mb-2 cursor-pointer">
        <span><i class="bi bi-journals me-2"></i>Ma’lumotlar</span>
        <i :class="isOpen.malumotlar ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
      </div>
      <ul v-show="isOpen.malumotlar" class="nav flex-column">
        <li class="nav-item" v-for="(item, index) in malumotMenu" :key="index">
          <router-link :to="item.to" class="nav-link rounded small"
            active-class="active-link">
            <i :class="item.icon + ' me-2'"></i>{{ item.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: {
        hujjatlar: true,
        malumotlar: true
      },
      hujjatMenu: [
        { title: "Kirim", to: "/kirim", icon: "bi bi-box-arrow-in-down" },
        { title: "Chiqim", to: "/chiqim", icon: "bi bi-box-arrow-up" },
        { title: "Kassa Order", to: "/kassaOrder", icon: "bi bi-box-arrow-up" },
        { title: "To‘lov", to: "/tolov", icon: "bi bi-credit-card" },
      ],
      malumotMenu: [
        { title: "Mahsulotlar", to: "/products", icon: "bi bi-box" },
        { title: "Birliklar", to: "/units", icon: "bi bi-rulers" },
        { title: "Qo‘shimcha Birliklar", to: "/extraunits", icon: "bi bi-plus-circle" },
        { title: "Brands", to: "/brands", icon: "bi bi-tags" },
        { title: "Models", to: "/models", icon: "bi bi-puzzle" },
        { title: "Colours", to: "/colours", icon: "bi bi-palette" },
        { title: "Countrys", to: "/countrys", icon: "bi bi-globe2" },
        { title: "Kurs", to: "/kurs", icon: "bi bi-currency-exchange" },
        { title: "Kontragent", to: "/kontragent", icon: "bi bi-person-lines-fill" },
        { title: "Foydalanuvchi", to: "/users", icon: "bi bi-person" },
        { title: "CRM", to: "/crm", icon: "bi bi-diagram-3-fill" },
        { title: "Xodimlar", to: "/staff", icon: "bi bi-people" },
      ]
    }
  },
  methods: {
    toggleMenu(menu) {
      this.isOpen[menu] = !this.isOpen[menu];
    }
  }
}
</script>

<style scoped>
.sidebar-custom {
  background: #1e6bb8; /* to‘q ko‘k */
  color: white;
  border-right: 3px solid #155a99;
  border-radius: 0 15px 15px 0;
}
.nav-link {
  color: white;
}
.nav-link:hover {
  background: rgba(255,255,255,0.2);
}
.active-link {
  background: rgba(255,255,255,0.3);
  font-weight: 500;
}
.cursor-pointer { cursor: pointer; }
</style>
