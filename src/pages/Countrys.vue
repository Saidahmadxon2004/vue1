
<template>
  <div class="container-fluid mt-3">
    <div class="pb-3 d-flex justify-content-between align-items-center">
      <h4 class="mb-0 fs-2 text-primary">Country</h4>
      <button class="btn btn-primary btn-md" @click="$router.push('/addCountry')">Qo'shish</button>
    </div>

    <div class="table-wrapper rounded shadow-sm">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nomi</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" @click="$router.push('/country/update/' + item.id)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteElement(item.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },

  async mounted() {
    try {
      const res = await this.$axios.get('/api/v1/country');
      console.log(res);
      this.data = res.data;
      console.log(res.data);
      console.log('✅ Ma’lumotlar yuklandi:', this.data); // Xabarni "Tolovlar"dan "Ma'lumotlar"ga o'zgartirdim
    } catch (err) {
      console.error('❌ Ma’lumotlarni yuklashda xatolik:', err); // Xabarni "Tolovlar"dan "Ma'lumotlar"ga o'zgartirdim
    }
  },

  methods: {
    async deleteElement(id) {
      try {
        await this.$axios.delete(`/api/v1/country/id/${id}`);
        alert(`🗑️ ID: ${id} muvaffaqiyatli o‘chirildi`); // Xabarni umumiyroq qilib o'zgartirdim
        window.location.reload();
      } catch (err) {
        console.error('❌ O‘chirishda xatolik:', err);
        alert('Xatolik: o‘chirish bajarilmadi');
      }
    }
  }
};
</script>

<style scoped>
.table-wrapper {
  max-height: 700px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
}

table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #eef2f7;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
}

table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

table tbody tr:nth-child(odd) {
  background-color: #e2eaf4;
}

table th,
table td {
  vertical-align: middle;
  text-align: center;
  padding: 0.75rem;
}
</style>
