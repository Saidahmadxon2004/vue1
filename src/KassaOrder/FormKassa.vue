<template>
  <div class="container-fluid d-flex flex-column custom-full-height">
    <div class="card p-4 shadow-sm rounded-3 custom-card-border flex-grow-1 d-flex flex-column">
      <div class="d-flex justify-content-between align-items-center pb-3 mb-4 custom-header-border flex-shrink-0">
        <h5 class="mb-0 fs-4 text-primary fw-bold">Kassa order qo'shish</h5>
        <button class="btn-close" @click="$router.back()" aria-label="Close"></button>
      </div>

      <div class="row mb-4 gx-3 align-items-end flex-shrink-0">
        <div class="col-md-2">
          <div class="info-box">
            <label class="info-label">Факт №</label>
            <p class="info-value">{{ datasend.fact_number }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="info-box">
            <label class="info-label">Вақт</label>
            <p class="info-value">{{ currentDateTime }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <label class="form-label mb-1">Склад</label>
          <v-select 
            v-model="datasend.sklad_id"
            :options="skladOptions"
            label="name"
            :reduce="s => s.id"
            placeholder="Sklad tanlang..."
            class="custom-v-select"
            :clearable="false"
          ></v-select>
        </div>
        <div class="col-md-2">
          <div class="info-box">
            <label class="info-label">Сумма</label>
            <p class="info-value">{{ datasend.summa.toLocaleString('uz-UZ') }}</p>
          </div>
        </div>
        <div class="col-md-2">
          <div class="info-box">
            <label class="info-label">Доллар Сумма</label>
            <p class="info-value">{{ datasend.dollar_summa.toLocaleString('uz-UZ') }}</p>
          </div>
        </div>
      </div>

      <div class="row mb-4 flex-shrink-0">
        <div class="col-md-3 offset-md-9">
          <label class="form-label mb-1">Курс</label>
          <input 
            type="number" 
            class="form-control" 
            v-model.number="datasend.dollar_rate" 
            @input="updateTotals" 
            min="0"
          />
        </div>
      </div>

      <div class="table-responsive custom-table-wrapper flex-grow-1 d-flex flex-column mb-4">
        <table class="table table-bordered table-hover align-middle flex-grow-1">
          <thead class="custom-table-thead flex-shrink-0">
            <tr>
              <th style="width: 50px;">№</th>
              <th style="min-width: 200px;">Асос</th>
              <th style="min-width: 180px;">Тўлов тури</th>
              <th style="width: 120px;">Тури</th>
              <th style="width: 150px;">Сумма</th>
              <th style="min-width: 200px;">Комментарий</th>
              <th style="width: 80px;" class="text-center">
                <button class="btn btn-sm btn-success w-100" @click="addRow" title="Qator qo'shish">
                  <i class="bi bi-plus-lg"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody class="flex-grow-1 custom-table-body">
            <tr v-for="(row, index) in datasend.kassa_order_table" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>
                <div class="d-flex align-items-center">
                  <v-select 
                    v-model="row.base_id"
                    :options="baseOptions"
                    label="name"
                    :reduce="b => b.id"
                    placeholder="Asos tanlang..."
                    class="flex-grow-1 me-2 custom-v-select custom-v-select-in-table"
                    :clearable="false"
                  ></v-select>
                  <button class="btn btn-outline-secondary btn-sm custom-dots-btn" @click.prevent="openAsosModal(index)" title="Asosni tahrirlash/tanlash">
                    <i class="bi bi-three-dots"></i>
                  </button>
                </div>
              </td>
              <td>
                <v-select 
                  v-model="row.pay_type_id"
                  :options="payTypeOptions"
                  label="name"
                  :reduce="p => p.id"
                  placeholder="To'lov turini tanlang..."
                  class="custom-v-select custom-v-select-in-table"
                  @input="updateTotals"
                  :clearable="false"
                ></v-select>
              </td>
              <td>
                <select v-model="row.type" class="form-select custom-select">
                  <option :value="false">Кирим</option>
                  <option :value="true">Чиким</option>
                </select>
              </td>
              <td>
                <input 
                  type="number" 
                  class="form-control text-end" 
                  v-model.number="row.summa" 
                  @input="updateTotals" 
                  min="0"
                />
              </td>
              <td>
                <input type="text" class="form-control" v-model="row.comment" placeholder="Izoh..." />
              </td>
              <td class="text-center">
                <button class="btn btn-sm btn-danger" @click="removeRow(index)" title="Qatorni o'chirish">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-end mt-auto pt-3 custom-footer-border flex-shrink-0">
        <button type="button" class="btn btn-primary me-2 px-4 py-2" @click="Send">
          <i class="bi bi-save me-2"></i>Saqlash
        </button>
        <button type="button" class="btn btn-secondary px-4 py-2" @click="$router.back()">
          <i class="bi bi-x-circle me-2"></i>Chiqish
        </button>
      </div>
    </div>

    <AsosModal
      :firmaList="asosList" 
      :showFirmaModal="showAsosModal"
      @update:showFirmaModal="showAsosModal = $event"
      @refresh="fetchAsosList"
      @select="setAsos"
    />
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import AsosModal from './AsosModal.vue'

export default {
  components: { vSelect, AsosModal },
  props: {
    datasend: {
      type: Object,
      default: () => ({
        fact_number: 1,
        sklad_id: null,
        dollar_rate: 12900,
        summa: 0,
        dollar_summa: 0,
        kassa_order_table: []
      })
    }
  },
  data() {
    return {
      payTypeList: [],
      skladList: [],
      asosList: [],
      showAsosModal: false,
      selectedRowIndex: null,
      currentDateTime: ''
    }
  },
  computed: {
    payTypeOptions() {
      return this.payTypeList
    },
    skladOptions() {
      return this.skladList
    },
    baseOptions() {
      return this.asosList
    }
  },
  mounted() {
    this.fetchPayTypes()
    this.fetchSklads()
    this.fetchAsosList()
    this.updateDateTime()
    setInterval(this.updateDateTime, 1000);

    if (!this.datasend.kassa_order_table || this.datasend.kassa_order_table.length === 0) {
      this.addRow()
    }
    this.updateTotals();
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      this.currentDateTime = now.toLocaleString('en-GB', options).replace(/\//g, '.').replace(',', '');
    },
    fetchPayTypes() {
      this.$axios.get('/api/v1/pay-type').then(res => this.payTypeList = res.data)
    },
    fetchSklads() {
      this.$axios.get('/api/v1/sklads/skladnames').then(res => this.skladList = res.data)
    },
    fetchAsosList() {
      this.$axios.get('/api/v1/base').then(res => this.asosList = res.data)
    },
    addRow() {
      this.datasend.kassa_order_table.push({
        base_id: null,
        summa: 0,
        pay_type_id: null,
        type: true,
        comment: ''
      });
      this.updateTotals();
    },
    removeRow(index) {
      if (this.datasend.kassa_order_table.length > 1) {
        this.datasend.kassa_order_table.splice(index, 1);
      } else {
        alert("Kamida bitta qator bo'lishi kerak!");
      }
      this.updateTotals();
    },
    updateTotals() {
      let totalSumma = 0;
      let totalDollar = 0;
      this.datasend.kassa_order_table.forEach(row => {
        let s = parseFloat(row.summa) || 0;
        let payType = this.payTypeList.find(p => p.id === row.pay_type_id);
        
        if (row.type === true) {
          s = -s;
        }

        if (payType?.name === 'Доллар') {
          totalDollar += s;
        } else {
          totalSumma += s;
        }
      });
      this.datasend.summa = totalSumma;
      this.datasend.dollar_summa = totalDollar;
    },
    openAsosModal(index) {
      this.selectedRowIndex = index;
      this.showAsosModal = true;
    },
    setAsos(selectedBase) {
      if (this.selectedRowIndex !== null) {
        this.datasend.kassa_order_table[this.selectedRowIndex].base_id = selectedBase.id;
      }
      this.showAsosModal = false;
    },
    Send() {
      let url = this.$route.params.id
        ? `/api/v1/kassa-order/id/${this.$route.params.id}`
        : '/api/v1/kassa-order';
      let method = this.$route.params.id ? 'patch' : 'post';

      if (!this.datasend.sklad_id) {
        alert("Skladni tanlash majburiy!");
        return;
      }
      for (const row of this.datasend.kassa_order_table) {
        if (!row.base_id || !row.pay_type_id || row.summa <= 0) {
          alert("Jadvaldagi barcha maydonlar to'ldirilishi va summa noldan katta bo'lishi kerak!");
          return;
        }
      }

      this.$axios({
        method,
        url,
        data: this.datasend
      }).then(() => {
        this.$router.push('/kassaOrder');
      }).catch(err => {
        console.error('Xato:', err.response ? err.response.data : err);
        alert('Ma\'lumotlarni saqlashda xatolik yuz berdi: ' + (err.response?.data?.message || err.message));
      });
    }
  }
}
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.custom-full-height {
  min-height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
}

.card {
  background-color: #ffffff;
  border-color: #e0e0e0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.custom-card-border {
  border: 1px solid #dcdcdc !important;
}

.custom-header-border {
  border-bottom: 1px solid #e0e0e0;
}

.info-box {
  background-color: #eef2f7;
  border: 1px solid #dcdcdc;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-label {
  font-size: 0.85rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.1rem;
}

.form-control, .custom-select {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  height: calc(1.5em + 0.75rem + 2px);
  box-shadow: none;
}

.form-control:focus, .custom-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.custom-v-select.vs--single .vs__dropdown-toggle,
.custom-v-select.vs--multiple .vs__dropdown-toggle {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  min-height: calc(1.5em + 0.75rem + 2px);
  display: flex;
  align-items: center;
}

.custom-v-select .vs__selected-options {
  padding: 0;
  display: flex;
  flex-grow: 1;
  align-items: center;
}

.custom-v-select .vs__selected {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  margin: 0;
  color: #212529;
}

.custom-v-select .vs__actions {
  padding: 0 0 0 8px;
}

.custom-v-select .vs__clear,
.custom-v-select .vs__open-indicator {
  fill: #6c757d;
}

.custom-v-select.vs--open .vs__dropdown-toggle {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.custom-v-select-in-table .vs__dropdown-menu {
  position: absolute;
  z-index: 9999;
  max-width: 300px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.custom-table-wrapper {
  border: 1px solid #e0e0e0;
  border-radius: 0.3rem;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 0 !important;
}

.custom-table-thead th {
  background-color: #eef2f7;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #dcdcdc;
  position: sticky;
  top: 0;
  z-index: 10;
  text-align: center;
  vertical-align: middle;
  padding: 0.75rem;
}

.table {
  width: 100%;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
}

.table thead, .table tbody {
  display: block;
}

.table tbody {
  height: auto;
  min-height: 200px;
  max-height: calc(100vh - 450px);
  overflow-y: auto;
}

.table th,
.table td {
  vertical-align: middle;
  padding: 0.5rem 0.75rem;
  border-color: #e9ecef;
  box-sizing: border-box;
}

.table thead tr, .table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}

.empty-row-text {
    padding: 2rem !important;
    color: #a0a0a0 !important;
    font-style: italic;
}

.table td .btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

.custom-dots-btn {
  width: 38px;
  flex-shrink: 0;
  height: calc(1.5em + 0.75rem + 2px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-footer-border {
  border-top: 1px solid #e0e0e0;
}

.btn {
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5c636a;
  border-color: #565e64;
}
</style>