
<template>
  <div class="sidebar-custom d-flex flex-column">
    <div class="logo-text-container mb-4">
      <img src="@/assets/image.png" alt="Seller Peak 24 Logo" class="logo-image">
    </div>

    <div class="flex-grow-1">
      <div>
        <div @click="toggleMenu('boshSahifa')" class="d-flex align-items-center fw-semibold mb-2 cursor-pointer">
          <span><i class="bi bi-house me-2"></i>Bosh sahifa</span>
        </div>
      </div>

      <div>
        <div @click="toggleMenu('xisobotlar')" class="d-flex align-items-center fw-semibold mb-2 cursor-pointer">
          <span><i class="bi bi-graph-up me-2"></i>Xisobotlar</span>
        </div>
      </div>

      <div>
        <div @click="toggleMenu('hujjatlar')" class="d-flex align-items-center fw-semibold mb-2 cursor-pointer">
          <span><i class="bi bi-folder2-open me-2"></i>Hujjatlar</span>
          <i :class="isOpen.hujjatlar ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
        </div>
        <ul v-show="isOpen.hujjatlar" class="nav flex-column mb-3">
          <li class="nav-item" v-for="item in hujjatMenu" :key="item.title">
            <router-link :to="item.to" class="nav-link rounded small" active-class="active-link">
              <i :class="item.icon + ' me-2'"></i>{{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <div @click="toggleMenu('malumotlar')" class="d-flex align-items-center fw-semibold mb-2 cursor-pointer">
          <span><i class="bi bi-journals me-2"></i>Ma’lumotlar</span>
          <i :class="isOpen.malumotlar ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
        </div>
        <ul v-show="isOpen.malumotlar" class="nav flex-column">
          <li class="nav-item" v-for="(item, index) in malumotMenu" :key="index">
            <router-link :to="item.to" class="nav-link rounded small" active-class="active-link">
              <i :class="item.icon + ' me-2'"></i>{{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: {
        boshSahifa: false,
        xisobotlar: false,
        hujjatlar: true,
        malumotlar: false
      },
      hujjatMenu: [
        { title: "Kirim", to: "/kirim", icon: "bi bi-box-arrow-in-down" },
        { title: "Savdo", to: "/savdo", icon: "bi bi-arrow-up" },
        { title: "Kassoviy order", to: "/kassoviyOrder", icon: "bi bi-receipt" },
        { title: "To‘lov", to: "/tolov", icon: "bi bi-credit-card" },
        { title: "Kalkulatsiya", to: "/kalkulatsiya", icon: "bi bi-calculator" },
        { title: "Ishlab chiqarish", to: "/ishlabChiqarish", icon: "bi bi-tools" },
        { title: "Vozvrat klient", to: "/vozvratKlient", icon: "bi bi-person-x" },
        { title: "Vozvrat yetkazuvchi", to: "/vozvratYetkazuvchi", icon: "bi bi-truck" },
        { title: "Peremesheniya", to: "/peremesheniya", icon: "bi bi-arrow-left-right" },
        { title: "Peremesheniya kassa", to: "/peremesheniyaKassa", icon: "bi bi-currency-dollar" },
        { title: "Reviziya", to: "/reviziya", icon: "bi bi-search" },
        { title: "Boshlang‘ich qoldiq", to: "/boshlangichQoldiq", icon: "bi bi-journal-text" },
        { title: "Boshlang‘ich kontragent qoldig‘i", to: "/boshlangichKontragentQoldigi", icon: "bi bi-people" },
        { title: "Spisaniya", to: "/spisaniya", icon: "bi bi-trash" },
        { title: "Konversiya", to: "/konversiya", icon: "bi bi-arrow-repeat" },
        { title: "Maosh hisoblash", to: "/maoshHisoblash", icon: "bi bi-wallet" },
        { title: "Xodimga to‘lov", to: "/xodimgaTolov", icon: "bi bi-telephone" },
      ],
      malumotMenu: [
        { title: "Mahsulotlar", to: "/products", icon: "bi bi-box" },
        
        { title: "Kurs", to: "/kurs", icon: "bi bi-currency-exchange" },
        { title: "Kontragent", to: "/kontragent", icon: "bi bi-person-lines-fill" },
        { title: "Foydalanuvchi", to: "/users", icon: "bi bi-person" },
        { title: "CRM", to: "/crm", icon: "bi bi-diagram-3" },
        { title: "Xodimlar", to: "/staff", icon: "bi bi-people" },
      ]
    }
  },
  methods: {
    toggleMenu(menu) {
      for (const key in this.isOpen) {
        this.isOpen[key] = (key === menu) ? !this.isOpen[key] : false;
      }
    }
  }
}
</script>

<style scoped>
.sidebar-custom {
  width: 300px;
  height: 100vh;
  background: #1e6bb8;
  color: white;
  border-right: 3px solid #155a99;
  border-radius: 0 15px 15px 0;
  overflow-y: auto;
  padding: 1rem 2rem;
}

.logo-text-container {
  width: 100%;
  text-align: center;
}

.logo-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.nav-link {
  font-size: 1.2rem;
  color: rgb(241, 235, 235);
}
.nav-link:hover {
  background: rgba(247, 246, 246, 0.2);
  color: rgb(241, 235, 235);
  transition: background 0.3s ease;
}
.active-link {
  background: rgba(255,255,255,0.3);
  font-weight: 500;
  color: rgb(241, 235, 235);
}
.fw-semibold {
  font-size: 1.2rem;
}
.cursor-pointer {
  cursor: pointer;
}

.sidebar-custom::-webkit-scrollbar {
  width: 6px;
}
.sidebar-custom::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.1);
}
.sidebar-custom::-webkit-scrollbar-thumb {
  background-color: rgba(255,255,255,0.5);
  border-radius: 3px;
}
</style>
