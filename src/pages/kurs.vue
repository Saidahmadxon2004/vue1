<template>
  <div class="container-fluid mt-3">
   

    <div class="table-wrapper rounded shadow-sm">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nomi</th>
            <th>Vaqt</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.rate }}</td>
            <td>{{ Dates(item.datetime) }}</td>
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
      const res = await this.$axios.get('/api/v1/dollar-exchange-rate');
      console.log(res);
      this.data = res.data;
      console.log(res.data);
      console.log('✅ Valyuta kurslari yuklandi:', this.data);
    } catch (err) {
      console.error('❌ Valyuta kurslarini yuklashda xatolik:', err);
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
  },
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