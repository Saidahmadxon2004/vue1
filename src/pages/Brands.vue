<template>
  <div class="container-fluid mt-3">
    

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
            <<td>
  <div class="action-buttons-container">
    <button class="action-btn btn-edit" @click="$router.push('/brand/update/' + item.id)">
      <i class="bi bi-pencil-square"></i>
    </button>
    <button class="action-btn btn-delete" @click="deleteElement(item.id)">
      <i class="bi bi-trash"></i>
    </button>
  </div>
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
      const res = await this.$axios.get('/api/v1/brand');
      console.log(res);
      this.data = res.data;
      console.log(res.data);
      console.log('✅ Brendlar yuklandi:', this.data);
    } catch (err) {
      console.error('❌ Brendlarni yuklashda xatolik:', err);
    }
  },

  methods: {
    async deleteElement(id) {
      try {
        await this.$axios.delete(`/api/v1/brand/id/${id}`);
        alert(`🗑️ ID: ${id} brend muvaffaqiyatli o‘chirildi`);
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
  max-height: 700px; /* Jadval maksimal balandligi, cheksiz o'sib ketmasligi uchun */
  overflow-y: auto; /* Agar kontent balandlikdan oshib ketsa, skroll paydo bo'ladi */
  border: 1px solid #dee2e6; /* Jadval atrofidagi chegara */
}

table thead th {
  position: sticky; /* Sarlavhani skroll qilinganda ham o'z joyida ushlab turish */
  top: 0; /* Yuqori qismga yopishadi */
  z-index: 10; /* Boshqa elementlardan ustun turishi uchun */
  background-color: #eef2f7; /* Sarlavha fon rangi */
  color: #333; /* Sarlavha matn rangi */
  font-weight: 600; /* Qalinroq shrift */
  border-bottom: 2px solid #dee2e6; /* Sarlavha ostidagi chegara */
}

table tbody tr:nth-child(even) {
  background-color: #f8f9fa; /* Juft qatorlar uchun och rang */
}

table tbody tr:nth-child(odd) {
  background-color: #e2eaf4; /* Toq qatorlar uchun biroz to'qroq rang */
}

table th,
table td {
  vertical-align: middle; /* Matnni vertikal markazga joylash */
  text-align: center; /* Matnni gorizontal markazga joylash */
  padding: 0.75rem; /* Hujayralar ichidagi bo'sh joy */
}
</style>