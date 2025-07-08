<template>
  <div class="container-fluid mt-3">
    

    <div class="table-wrapper rounded shadow-sm">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Sklad</th>
            <th>Nomi</th>
            <th>Maosh</th>
            <th>Bonus</th>
            <th>Lavozimi</th>
            <th>Tabel raqami</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.sklad?.name }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.salary }}</td>
            <td>{{ item.bonus }}</td>
            <td>{{ item.position }}</td>
            <td>{{ item.tabel_number }}</td>
            <td>
  <div class="action-buttons-container">
    <button class="action-btn btn-edit" @click="$router.push('/staff/update/' + item.id)">
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
      const res = await this.$axios.get('/api/v1/staff');
      console.log(res);
      this.data = res.data;
      console.log(res.data);
      console.log('✅ Xodimlar yuklandi:', this.data);
    } catch (err) {
      console.error('❌ Xodimlarni yuklashda xatolik:', err);
    }
  },

  methods: {
    async deleteElement(id) {
      try {
        await this.$axios.delete(`/api/v1/staff/id/${id}`);
        alert(`🗑️ ID: ${id} xodim muvaffaqiyatli o‘chirildi`);
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