<template>
  <div class="container-fluid mt-3">
    <div class="pb-3 d-flex justify-content-between align-items-center">
      <h4 class="mb-0 fs-2 text-primary">Birlik</h4>
      <button class="btn btn-primary btn-md" @click="$router.push('/product/create')">
        Qo'shish
      </button>
    </div>

    <div class="table-wrapper rounded shadow-sm">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nomi</th>
            <th>Qoldiq</th>
            <th>Tannarx</th>
            <th>Chakana Narx</th>
            <th>Ulgurji narx</th>
            <th>Chakana Narx$</th>
            <th>Ulgurji narx$</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.cost_price }}</td>
            <td>{{ item.price_retail }}</td>
            <td>{{ item.price_wholesale }}</td>
            <td>{{ item.price_retail_usd }}</td>
            <td>{{ item.price_wholesale_usd }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" @click="$router.push('/product/update/' + item.id)">
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
      const res = await this.$axios.get('/api/v1/product');
      this.data = res.data.map(product => ({
        id: product.id,
        name: product.name,
        quantity: product.quantity || 0,
        cost_price: product.cost_price || 0,
        price_retail: product.price_retail || 0,
        price_wholesale: product.price_wholesale || 0,
        price_retail_usd: product.price_retail_usd || 0,
        price_wholesale_usd: product.price_wholesale_usd || 0,
      })).sort((a, b) => a.id - b.id);
    } catch (err) {
      console.error('Yuklashda xatolik:', err);
    }
  },
  methods: {
    async deleteElement(id) {
      try {
        await this.$axios.delete(`/api/v1/product/id/${id}`);
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