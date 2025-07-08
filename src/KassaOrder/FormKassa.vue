<template>
  <div class="container-fluid d-flex flex-column custom-full-height">
    <div class="card p-4 shadow-sm rounded-3 custom-card-border flex-grow-1 d-flex flex-column">
      <div class="d-flex justify-content-between align-items-center pb-3 mb-4 custom-header-border flex-shrink-0">
        <h5 class="mb-0 fs-4 text-primary fw-bold">Kassa order qo'shish</h5>
        <button class="btn-close" @click="$router.back()" aria-label="Close"></button>
      </div>

      <div class="row mb-4 gx-3 align-items-end flex-shrink-0 header-info-row">
        <div class="col-md-1">
          <div class="info-box">
            <label class="info-label">Факт №</label>
            <p class="info-value">{{ datasend.fact_number }}</p>
          </div>
        </div>
        <div class="col-md-2">
          <div class="info-box">
            <label class="info-label">Вақт</label>
            <p class="info-value">{{ currentDateTime }}</p>
          </div>
        </div>
        
        <div class="col-md-2">
          <div class="info-box-select">
            <label class="info-label">Склад</label>
            <v-select 
              v-model="datasend.sklad_id"
              :options="skladOptions"
              label="name"
              :reduce="s => s.id"
              placeholder="Sklad tanlang..."
              class="custom-v-select custom-v-select-in-info-box"
              :clearable="false"
            ></v-select>
          </div>
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
        <div class="col-md-2">
          <div class="info-box-input">
            <label class="info-label">Курс</label>
            <input 
              type="number" 
              class="form-control custom-input custom-input-in-info-box" 
              v-model.number="datasend.dollar_rate" 
              @input="updateTotals" 
              min="0"
            />
          </div>
        </div>
      </div>

      <div class="table-responsive custom-table-wrapper flex-grow-1 d-flex flex-column mb-4">
        <table class="table table-bordered table-hover align-middle flex-grow-1">
          <thead class="custom-table-thead flex-shrink-0">
            <tr>
              <th style="width: 50px;">№</th>
              <th style="min-width: 220px;">Асос</th>
              <th style="min-width: 180px;">Тўлов тури</th>
              <th style="width: 120px;">Тури</th>
              <th style="width: 150px;">Сумма</th>
              <th style="min-width: 250px;">Комментарий</th>
              <th style="width: 80px;" class="text-center">
                <button class="btn btn-success btn-add-row" @click="addRow" title="Qator qo'shish">
                  <i class="bi bi-plus-lg"></i>
                </button>
              </th>
            </tr>
          </thead>
          <tbody class="flex-grow-1 custom-table-body">
            <tr v-for="(row, index) in datasend.kassa_order_table" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>
                <div class="input-with-button">
                  <v-select 
                    v-model="row.base_id"
                    :options="baseOptions"
                    label="name"
                    :reduce="b => b.id"
                    placeholder="Asos tanlang..."
                    class="custom-v-select custom-v-select-in-table"
                    :clearable="false"
                  ></v-select>
                  <button class="btn-ellipsis" @click.prevent="openAsosModal(index)" title="Asosni tahrirlash/tanlash">
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
  @change="onPayTypeChange(row)"
  :clearable="false"
/>
              </td>
              <td>
                <select v-model="row.type" 
  class="form-select custom-select custom-table-select"
  @change="onTypeChange(row)">
  <option :value="false">Кирим</option>
  <option :value="true">Чиким</option>
</select>
              </td>
              <td>
                <input 
                  type="number" 
                  class="form-control text-end custom-table-input" 
                  v-model.number="row.summa" 
                  @input="updateTotals" 
                  min="0"
                />
              </td>
              <td>
                <input type="text" class="form-control custom-table-input" v-model="row.comment" placeholder="Izoh..." />
              </td>
              <td class="text-center">
                <button class="btn btn-danger btn-sm btn-delete-row" @click="removeRow(index)" title="Qatorni o'chirish">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="datasend.kassa_order_table.length === 0">
              <td colspan="7" class="text-center empty-row-text">Jadvalda ma'lumotlar mavjud emas. Qator qo'shish uchun '+' tugmasini bosing.</td>
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
        dollar_rate: 13000, 
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

  // =====================
  // 🔥 Asosiy metodlar
  // =====================
  onPayTypeChange(row) {
    this.adjustRowSum(row);
    this.updateTotals();
  },
  onTypeChange(row) {
    this.adjustRowSum(row);
    this.updateTotals();
  },
  adjustRowSum(row) {
    // type bo'yicha to'g'ri ishorani qo'yamiz
    let s = parseFloat(row.summa) || 0;
    s = row.type ? -Math.abs(s) : Math.abs(s); // chiqim bo‘lsa manfiy

    // hech narsa o‘zgartirmaymiz, updateTotals uni avtomatik hisoblaydi
  },
  updateTotals() {
    let totalSumma = 0;
    let totalDollar = 0;
    this.datasend.kassa_order_table.forEach(row => {
      let s = parseFloat(row.summa) || 0;
      s = row.type ? -Math.abs(s) : Math.abs(s);

      let payType = this.payTypeList.find(p => p.id === row.pay_type_id);

      if (payType?.name === 'Доллар') {
        totalDollar += s;
      } else {
        totalSumma += s;
      }
    });
    this.datasend.summa = totalSumma;
    this.datasend.dollar_summa = totalDollar;
  },

  // =====================
  // 🔥 Asos modal metodi
  // =====================
  openAsosModal(index) {
    this.selectedRowIndex = index;
    this.showAsosModal = true;
  },
  setAsos(selectedBase) {
    const exists = this.asosList.some(a => a.id === selectedBase.id);
    if (!exists) {
      this.asosList.push({ id: selectedBase.id, name: selectedBase.name });
    }
    if (this.selectedRowIndex !== null) {
      this.datasend.kassa_order_table[this.selectedRowIndex].base_id = selectedBase.id;
    }
    this.showAsosModal = false;
  },

  // =====================
  // 🔥 Saqlash
  // =====================
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
      this.$router.push('/kassoviyOrder');
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
  background-color: #EAEFF6; 
  border: none; 
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 8px; 
}

.custom-card-border {
  border: 1px solid #dcdcdc !important; 
}

.custom-header-border {
  border-bottom: 1px solid #D9E2ED; 
  padding-bottom: 15px !important;
  margin-bottom: 25px !important;
}

.custom-header-border h5 {
  color: #2C3E50; 
  font-weight: 600;
  font-size: 22px !important;
}

.header-info-row {
  align-items: flex-start !important; 
}

.col-md-1, .col-md-2, .col-md-3 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}

.info-box {
  background-color: #F8F9FA; 
  border: 1px solid #D9E2ED; 
  border-radius: 8px; 
  padding: 10px 15px; 
  text-align: left; 
  height: 100%; 
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
  min-height: 90px; /* Minimal balandlikni saqlash */
}

.info-box-select,
.info-box-input {
  background-color: #F8F9FA; 
  border: 1px solid #D9E2ED; 
  border-radius: 8px; 
  padding: 10px 15px; 
  text-align: left; 
  height: 100%; 
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
  min-height: 90px; /* Minimal balandlikni saqlash */
}


.info-label {
  font-size: 13px; 
  color: #607289; 
  margin-bottom: 0px; /* Bo'shliqni kamaytirish */
  padding-bottom: 5px; /* Pastdan padding berish */
  font-weight: 500;
}

.info-value {
  font-size: 16px; 
  font-weight: 600;
  color: #334A62; 
  margin-bottom: 0;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.1rem;
}

.custom-select-label {
  margin-left: 5px; 
  margin-bottom: 8px !important;
  display: block;
  font-size: 14px;
  color: #607289;
}

.custom-input {
  background-color: #F8F9FA;
  border: 1px solid #D9E2ED;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 15px;
  color: #334A62;
  height: 38px; 
}

.custom-input:focus {
  border-color: #8dbde7;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
  outline: none; 
}

.custom-input-in-info-box {
  border: none; 
  background-color: transparent; 
  padding: 0; 
  font-size: 16px; 
  font-weight: 600;
  color: #334A62;
  height: auto; 
  width: 100%; /* Kenglikni to'liq egallashi uchun */
}
.custom-input-in-info-box:focus {
  box-shadow: none; 
}


.custom-v-select.vs--single .vs__dropdown-toggle,
.custom-v-select.vs--multiple .vs__dropdown-toggle {
  background-color: #F8F9FA; 
  border: 1px solid #D9E2ED; 
  border-radius: 6px; 
  padding: 5px 12px; 
  min-height: 38px; 
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
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
  color: #334A62; 
  font-size: 15px; 
}

.custom-v-select .vs__actions {
  padding: 0 0 0 8px;
}

.custom-v-select .vs__clear,
.custom-v-select .vs__open-indicator {
  fill: #9CA8B9; 
}

.custom-v-select.vs--open .vs__dropdown-toggle {
  border-color: #8dbde7;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
}

.custom-v-select-in-info-box.vs--single .vs__dropdown-toggle,
.custom-v-select-in-info-box.vs--multiple .vs__dropdown-toggle {
    border: none; 
    background-color: transparent; 
    padding: 0; 
    min-height: auto; 
    box-shadow: none; 
    align-items: center; /* Markazga tekislash */
}
.custom-v-select-in-info-box .vs__selected {
    font-size: 16px; 
    font-weight: 600;
    color: #334A62;
    margin-top: 0px; 
}
.custom-v-select-in-info-box .vs__open-indicator {
    transform: scale(1.2); 
    margin-top: 0px; 
}
.custom-v-select-in-info-box.vs--open .vs__dropdown-toggle {
    box-shadow: none; 
}

.custom-v-select-in-table .vs__dropdown-toggle {
  min-height: 34px; 
  padding: 4px 10px;
  border-radius: 4px;
}

.custom-v-select-in-table .vs__selected {
  font-size: 14px;
}

.custom-table-wrapper {
  border: 1px solid #D9E2ED; 
  border-radius: 8px; 
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 0 !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
}

.table {
  width: 100%;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  border-collapse: collapse; 
}

.table thead, .table tbody {
  display: block;
}

.table tbody {
  height: auto;
  min-height: 150px; 
  max-height: calc(100vh - 450px); 
  overflow-y: auto;
}

.custom-table-thead th {
  background-color: #E5EEF7; 
  color: #334A62; 
  font-weight: 600;
  border-bottom: 1px solid #D9E2ED; 
  position: sticky;
  top: 0;
  z-index: 10;
  text-align: center;
  vertical-align: middle;
  padding: 10px 15px; 
  font-size: 14px;
}

.table th,
.table td {
  vertical-align: middle;
  padding: 8px 15px; 
  border-color: #EBF2F8; 
  box-sizing: border-box;
}

.table tbody tr {
    background-color: #FFFFFF; 
    border-bottom: 1px solid #EBF2F8; 
}
.table tbody tr:last-child {
    border-bottom: none; 
}

.table thead tr, .table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}

.empty-row-text {
    padding: 2rem !important;
    color: #A0A0A0 !important;
    font-style: italic;
    background-color: #FFFFFF;
}

.custom-table-select,
.custom-table-input {
  height: 34px; 
  padding: 4px 10px;
  font-size: 14px;
  background-color: #F8F9FA;
  border-color: #D9E2ED;
  border-radius: 4px;
}

.input-with-button {
  display: flex;
  .custom-v-select {
    flex-grow: 1;
    .vs__dropdown-toggle {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .btn-ellipsis {
    width: 38px;
    height: 38px; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F8F9FA; 
    border: 1px solid #D9E2ED;
    border-left: none; 
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    color: #607289;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #E5EEF7;
    }
  }
}


.btn-add-row {
  background-color: #28a745; 
  border-color: #28a745;
  color: white;
  width: 38px; 
  height: 38px;
  border-radius: 50%; 
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px; 
  padding: 0;
}
.btn-add-row:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-delete-row {
  background-color: #dc3545; 
  border-color: #dc3545;
  color: white;
  width: 30px; 
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 0;
}
.btn-delete-row:hover {
  background-color: #c82333;
  border-color: #bd2130;
}


.custom-footer-border {
  border-top: 1px solid #D9E2ED; 
  padding-top: 20px !important;
}

.btn {
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  padding: 10px 20px; 
  font-size: 16px;
  border-radius: 6px;
}

.btn-primary {
  background-color: #4A90E2; 
  border-color: #4A90E2;
}

.btn-primary:hover {
  background-color: #357ABD;
  border-color: #357ABD;
}

.btn-secondary {
  background-color: #A0A0A0; 
  border-color: #A0A0A0;
}

.btn-secondary:hover {
  background-color: #8C8C8C;
  border-color: #8C8C8C;
}
</style>