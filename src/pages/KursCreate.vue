<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h3 class="mb-4 fw-bold text-center">💵 Yangi Kurs Qo‘shish</h3>

    <div class="card shadow-sm p-4">
      <div class="mb-3">
        <label for="rate" class="form-label">Kurs miqdori (so‘mda)</label>
        <input
          type="number"
          id="rate"
          v-model="rate"
          class="form-control"
          placeholder="Masalan: 12000"
          required
        />
      </div>

      <div class="d-flex justify-content-between">
        <router-link to="/kurs" class="btn btn-secondary">
          ← Orqaga
        </router-link>
        <button class="btn btn-success" @click="submitRate">
          Saqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rate: ''
    };
  },
  methods: {
    async submitRate() {
      if (!this.rate) {
        alert("Iltimos, kurs miqdorini kiriting.");
        return;
      }

      const payload = {
        rate: Number(this.rate),
        datetime: Math.floor(Date.now() / 1000) // hozirgi timestamp avtomatik
      };

      try {
        await this.$axios.post('/api/v1/dollar-exchange-rate', payload);
        this.$router.push('/kurs'); // muvaffaqiyatli bo‘lsa qaytadi
      } catch (error) {
        console.error('Kursni saqlashda xatolik:', error);
        alert("Kursni qo‘shishda xatolik yuz berdi.");
      }
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #f8f9fa;
  border-radius: 12px;
}
</style>
