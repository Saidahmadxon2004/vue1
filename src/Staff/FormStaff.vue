<template>
  <div class="user-form-container">
    <form class="user-form-card">
      <div class="form-header-actions">
        <button type="button" class="btn btn-save" @click="Send">
          <i class="bi bi-save me-2"></i>Сақлаш<sup>ctrl+enter</sup>
        </button>
        <button type="button" class="btn btn-cancel" @click="$router.back()">
          <i class="bi bi-x-circle me-2"></i>Чиқиш<sup>esc</sup>
        </button>
      </div>

      <h5 class="section-title text-center">Xodim Qo‘shish / Tahrirlash</h5>

      <div class="form-content-grid single-column">
        <div class="form-section-left">
          <div class="form-row-item">
            <label class="form-label">Nomi</label>
            <input type="text" class="form-control" v-model="datasend.name" required />
          </div>

          <div class="form-row-item">
            <label class="form-label">Maosh</label>
            <input type="text" class="form-control" v-model="datasend.salary" />
          </div>

          <div class="form-row-item">
            <label class="form-label">Bonus %</label>
            <input type="text" class="form-control" v-model="datasend.bonus" />
          </div>

          <div class="form-row-item">
            <label class="form-label">Lavozimi</label>
            <input type="text" class="form-control" v-model="datasend.position" />
          </div>
          <div class="form-row-item">
            <label class="form-label">Tabel raqami</label>
            <input type="text" class="form-control" v-model="datasend.tabel_number" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ["datasend"],
  data() {
    return {};
  },
  mounted() {},
  created() {},
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
      })
        .then(() => {
          this.$router.push({ path: "/staff" });
        })
        .catch(error => {
          console.error('Xato:', error.response?.data || error.message);
          const errorMessage = error.response?.data?.message || "Ma'lumotlarni saqlashda xatolik yuz berdi!";
          this.$toast.error(errorMessage);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-form-container {
  background-color: #f0f2f5;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-form-card {
  background-color: #e9eff6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 40px 60px;
  width: 100%;
  max-width: 1000px; /* Kenglikni yanada oshirish */
  position: relative;
}

.form-header-actions {
  position: absolute;
  top: 25px;
  right: 25px;
  display: flex;
  gap: 12px;
}

.btn-save {
  background-color: #2196F3;
  border-color: #2196F3;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.btn-save:hover {
  background-color: #1976D2;
  border-color: #1976D2;
  transform: translateY(-1px);
}

.btn-cancel {
  background-color: #9E9E9E;
  border-color: #9E9E9E;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.btn-cancel:hover {
  background-color: #757575;
  border-color: #757575;
  transform: translateY(-1px);
}

.section-title {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 40px;
  font-size: 24px;
}

.form-content-grid {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.form-content-grid.single-column {
  grid-template-columns: 1fr;
  width: 100%;
}

.form-section-left {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 650px; /* Ichki elementlar kengligini oshirish */
}

.form-row-item {
  display: grid;
  grid-template-columns: 180px 1fr; /* Label va input o'lchamlarini sozlash */
  align-items: center;
  gap: 25px;
}

.form-label {
  color: #555;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  font-size: 16px;
}

.form-control {
  width: 100%;
  padding: 10px 15px;
  height: 40px;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  font-size: 15px;
  color: #333;
  background-color: #fcfdfe;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  border-color: #8dbde7;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
  outline: none;
}

.custom-v-select .vs__dropdown-toggle {
  min-height: 40px;
  padding: 10px 15px;
}
.custom-v-select .vs__selected {
  font-size: 15px;
}
.custom-v-select .vs__dropdown-menu {
  font-size: 15px;
}
</style>