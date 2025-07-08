
<template>
  <div class="container-fluid mt-3">
    

    <div class="table-wrapper rounded shadow-sm">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nomi</th>
            <th>Ish faoliyati</th>
            <th>Ish joyi qayerda joylashgan</th>
            <th>Bizni qayerdan topgan</th>
            <th>Status</th>
            <th>Murojaat vaqti</th>
            <th>Oxirgi suhbat vaqti</th>
            <th>Aloqaga chiqish vaqti</th>
            <th>Sotib olish ehtimolligi</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.first_name }}</td>
            <td>{{ item.crm_work?.name }}</td>
            <td>{{ item.crm_work_address?.name }}</td>
            <td>{{ item.crm_found_address?.name }}</td>
            <td>{{ item.crm_status?.name }}</td>
            <td>{{ Dates(item.found_datetime) }}</td>
            <td>{{ Dates(item.last_datetime) }}</td>
            <td>{{ Dates(item.contact_datetime) }}</td>
            <td>{{ item.probability }}</td>
            <td>
  <div class="action-buttons-container">
    <button class="action-btn btn-edit" @click="$router.push('/crm/update/' + item.id)">
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
      const res = await this.$axios.get('/api/v1/crm-client');
      console.log(res);
      this.data = res.data;
      console.log(res.data);
      console.log('✅ CRM mijozlari yuklandi:', this.data);
    } catch (err) {
      console.error('❌ CRM mijozlarini yuklashda xatolik:', err);
    }
  },

  methods: {
    Dates(date) {
      var d = new Date(date * 1000);
      var dt = d.getDate();
      var month = d.getMonth() + 1;
      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      var sec = d.getSeconds();
      if (sec < 10) {
        sec = "0" + sec;
      }
      var min = d.getMinutes();
      if (min < 10) {
        min = "0" + min;
      }
      var hour = d.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      return (
        dt +
        "-" +
        month +
        "-" +
        d.getFullYear() +
        " " +
        hour +
        ":" +
        min +
        ":" +
        sec
      );
    },

    async deleteElement(id) {
      try {
        await this.$axios.delete(`/api/v1/crm-client/id/${id}`);
        alert(`🗑️ ID: ${id} CRM mijoz muvaffaqiyatli o‘chirildi`);
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
