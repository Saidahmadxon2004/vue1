<template>
  <div class="container-fluid mt-3">
    
    <div class="table-wrapper rounded shadow-sm">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Vaqt</th>
            <th>Yetkazuvchi</th>
            <th>Sklad</th>
            <th>Soni</th>
            <th>Summa</th>
            
            <th>To'lov </th>
            <th>Foydalanuvchi</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
             <td>{{ Dates(item.created_at) }}</td> 
             <td>{{ item.kontragent?.name }}</td>
             <td>{{ item.sklad?.name }}</td>
             <td>{{ item.count_all }}</td>
             <td>{{ item.summa }}</td>
               <td>{{ item.summa}}</td>
                <td>{{ item.user?.first_name}}</td>
               
            <!-- \
              -->
            <td>
  <div class="action-buttons-container">
    <button class="action-btn btn-edit" @click="$router.push('/rasxod/update/' + item.id)">
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
      const res = await this.$axios.get('/api/v1/rasxod');
      this.data = res.data
      console.log(this.data)
    } catch (err) {
      console.error('Yuklashda xatolik:', err);
    }
  },
  methods: {Dates(date) {
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
        await this.$axios.delete(`/api/v1/rasxod/id/${id}`);
        window.location.reload();
      } catch (err) {
        console.error('O‘chirishda xatolik:', err);
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
  background-color: #c6d5e8;
}

table th, table td {
  vertical-align: middle;
  text-align: center;
  padding: 0.75rem;
}
</style>