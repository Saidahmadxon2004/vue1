<template>
  <form class="card p-4 shadow-sm border rounded-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0">Тўлов қўшиш</h5>
      <div class="d-flex">
        <button type="button" class="btn btn-outline-secondary me-2">
          <i class="bi bi-receipt"></i> Чек
        </button>
        <button type="submit" class="btn btn-primary me-2" @click.prevent="send()">
          <i class="bi bi-save"></i> Сақлаш ва беркитиш
        </button>
        <button type="button" class="btn btn-danger" @click="$router.go(-1)">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="mb-3">
          <label for="warehouse" class="form-label">Склад <span class="text-danger">*</span></label>
          <v-select
            id="warehouse"
            v-model="datasend.sklad_id"
            :options="warehouseOptions"
            :reduce="option => option.id"
            label="name"
            placeholder="Складни танланг..."
            required
            :class="{'is-invalid': !datasend.sklad_id && formSubmitted}"
          ></v-select>
          <div class="invalid-feedback" v-if="!datasend.sklad_id && formSubmitted">
            Склад танланиши шарт.
          </div>
        </div>

        <div class="card p-3 mb-3 border-light bg-light">
          <h6>Контрагент</h6>
          <div class="mb-3">
            <label for="counterparty" class="form-label">Контрагент <span class="text-danger">*</span></label>
            <div class="input-group">
              <v-select
                id="counterparty"
                v-model="datasend.kontragent_id"
                :options="kontragentOptions"
                :reduce="option => option.id"
                label="name"
                placeholder="Контрагентни танланг..."
                required
                :class="{'is-invalid': !datasend.kontragent_id && formSubmitted, 'custom-vs-select': true}"
                @update:modelValue="handleKontragentSelectChange"
                :filterable="true"
              >
                <template #selected-option="{ name }">
                  {{ name }}
                </template>
                <template #no-options>
                  Контрагент топилмади.
                </template>
              </v-select>
              <button class="btn btn-outline-secondary btn-more" type="button" @click="showKontragentSelectModal = true">
                ...
              </button>
              <div class="invalid-feedback" v-if="!datasend.kontragent_id && formSubmitted">
                Контрагент танланиши шарт.
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="balance" class="form-label">Қолдиқ</label>
            <input
              type="text"
              id="balance"
              v-model="formattedBalance"
              class="form-control"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="paymentType" class="form-label">Тўлов тури <span class="text-danger">*</span></label>
            <v-select
              id="paymentType"
              v-model="datasend.pay_type_id"
              :options="paymentTypeOptions"
              :reduce="option => option.id"
              label="name"
              placeholder="Тўлов турини танланг..."
              required
              :class="{'is-invalid': !datasend.pay_type_id && formSubmitted}"
              @option:selected="handlePaymentTypeChange"
            ></v-select>
            <div class="invalid-feedback" v-if="!datasend.pay_type_id && formSubmitted">
              Тўлов тури танланиши шарт.
            </div>
          </div>
          <div class="mb-3">
            <label for="amount" class="form-label">Умумий Сумма</label>
            <input
              type="number"
              id="amount"
              v-model="datasend.summa"
           
              class="form-control"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="paymentTime" class="form-label">Тўлов вақти <span class="text-danger">*</span></label>
            <input
              type="date"
              id="paymentTime"
              v-model="datasend.datetime"
              class="form-control"
              required
              :class="{'is-invalid': !datasend.datetime && formSubmitted }"
            />
            <div class="invalid-feedback" v-if="!datasend.datetime">
              Тўлов вақти киритилиши шарт.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="comment" class="form-label">Комментарий</label>
          <textarea id="comment" v-model="datasend.comment" class="form-control" rows="3"></textarea>
        </div>
      </div>

      <div class="col-md-6">
        <div class="mb-3">
          <label for="type" class="form-label">Тури <span class="text-danger">*</span></label>
          <select id="type" v-model="datasend.type" class="form-select" required>
            <option value=true>Кирим</option>
            <option value=false>Чиқим</option>
          </select>
        </div>

        <div class="card p-3 mb-3 border-light bg-light">
          <h6>Касса</h6>
          <div class="mb-3">
            <label for="cashDollar" class="form-label">Нақд$</label>
            <input
              type="number"
              id="cashDollar"
              v-model.number="datasend.dollar_summa"
              class="form-control"
              step="0.01"
              @input="updateTotalAmount"
            />
          </div>
          <div class="mb-3">
            <label for="cashSum" class="form-label">Нақд (UZS)</label>
            <input
              type="number"
              id="cashSum"
              v-model.number="datasend.kassa_summa"
              class="form-control"
              @input="updateTotalAmount"
            />
          </div>
          <div class="mb-3">
            <label for="plastic" class="form-label">Пластик</label>
            <input
              type="number"
              id="plastic"
              v-model.number="datasend.plastic_summa"
              class="form-control"
              @input="updateTotalAmount"
            />
          </div>
          <div class="mb-3">
            <label for="transfer" class="form-label">Перечесления</label>
            <input
              type="number"
              id="transfer"
              v-model.number="datasend.shot_summa"
              class="form-control"
              @input="updateTotalAmount"
            />
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="changeSum" class="form-label">Қайтйм (UZS)</label>
              <input
                type="number"
                id="changeSum"
                v-model.number="datasend.qaytim_som"
                class="form-control"
                @input="updateTotalAmount"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="changeDollar" class="form-label">Қайтйм $</label>
              <input
                type="number"
                id="changeDollar"
                v-model.number="datasend.qaytim_dollar"
                class="form-control"
                step="0.01"
                @input="updateTotalAmount"
              />
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="exchangeRate" class="form-label">Курс</label>
          <input
            type="number"
            id="exchangeRate"
            v-model.number="datasend.dollar_rate"
            class="form-control"
            @input="updateTotalAmount"
          />
        </div>
      </div>
    </div>
  </form>

  <TolovModal
    :show-modal="showKontragentSelectModal"
    @close="showKontragentSelectModal = false"
    @select-kontragent="handleKontragentSelection"
  />
</template>

<script>
import moment from 'moment';
import Vue3Select from 'vue3-select';
import 'vue-select/dist/vue-select.css';
import TolovModal from './TolovModal.vue';

export default {
  components: {
    Vue3Select,
    TolovModal,
  },
  props: ["datasend"],
  data() {
    return {
      warehouses: [],
      paymentTypes: [],
      kontragents: [],
      dollarPaymentTypeId: null,
      showKontragentSelectModal: false,
      formSubmitted: false,
    };
  },
  computed: {
    warehouseOptions() {
      return this.warehouses.map(w => ({ id: w.id, name: w.name }));
    },
    paymentTypeOptions() {
      return this.paymentTypes.map(p => ({ id: p.id, name: p.name }));
    },
    kontragentOptions() {
      return this.kontragents.map(k => ({ id: k.id, name: k.name }));
    },

    formattedBalance() {
     this.fetchKontragentBalance(this.datasend.kontragent_id)
      const usd = parseFloat(this.datasend.current_total_dollar) || 0;
      const uzs = parseFloat(this.datasend.current_total) || 0;
      return `${usd.toFixed(2)} $ || ${uzs.toLocaleString('en-US')}`;
      
     
    },
  },
  mounted() {
    this.fetchWarehouses();
    this.fetchPaymentTypes();
    this.fetchKontragents();
    this.fetchLatestDollarRate();
    
   
    if (!this.datasend.datetime) {
      this.datasend.datetime = moment().format('YYYY-MM-DD');
    }
  },
  methods: {
    async handleKontragentSelection(id) {
      await this.fetchKontragentBalance(id);
      await this.fetchKontragentNameById(id);
      this.datasend.kontragent_id = id;
      console.log("ishladiyov" +id)
    },
    async fetchWarehouses() {
      try {
        const res = await this.$axios.get('/api/v1/sklads/skladnames');
        this.warehouses = res.data;
        if (!this.datasend.sklad_id && this.warehouses.length > 0) {
          this.datasend.sklad_id = this.warehouses[0].id;
        }
      } catch (err) {
        alert('Склад юклашда хатолик');
      }
    },

    async fetchPaymentTypes() {
      try {
        const res = await this.$axios.get('/api/v1/pay-type');
        this.paymentTypes = res.data;
        const dollar = this.paymentTypes.find(p => p.name === 'Доллар');
        if (dollar) this.dollarPaymentTypeId = dollar.id;
      } catch (err) {
        alert('Тўлов турлари юкланмади');
      }
    },
    async fetchKontragents() {
      try {
        const res = await this.$axios.get('/api/v1/kontragent');
        this.kontragents = res.data;
      } catch (err) {
        alert('Контрагент юкланмади');
      }
    },

    async fetchKontragentBalance(id) {
      try {
        const res = await this.$axios.post('/api/v1/kontragent/total', {
          kontragent_id: id,
          sklad_id: this.datasend.sklad_id,
          datetime: moment(this.datasend.datetime, 'YYYY-MM-DD').unix(),
        });
        this.datasend.current_total = 0;
        this.datasend.current_total_dollar = 0;
        res.data.forEach(el => {
          if (el.pay_type_id === 3) {
            this.datasend.current_total_dollar = parseFloat(el.total.toFixed(3));
            console.log( this.datasend.current_total_dollar)
          } else {
            this.datasend.current_total += parseFloat(el.total.toFixed(3));
          }
        });
      } catch (err) {
        alert('Контрагент балансида хатолик');
      }
    },
    async fetchKontragentNameById(id) {
      const found = this.kontragents.find(k => k.id === id);
      if (found) {
        this.datasend.kontragent_name = found.name;
      } else {
        try {
          const res = await this.$axios.get(`/api/v1/kontragent/id/${id}`);
          if (res.data?.data) {
            this.datasend.kontragent_name = res.data.data.name;
            this.kontragents.push(res.data.data);
          }
        } catch (err) {
          this.datasend.kontragent_name= 'Номаълум Контрагент';
        }
      }
    },
    
    async fetchLatestDollarRate() {
      try {
        const res = await this.$axios.get('/api/v1/dollar-exchange-rate/last');
        if (res.data?.rate) {
          this.datasend.dollar_rate = res.data.rate;
        }
      } catch (err) {
        alert('Доллар курси юкланмади');
      }
    },
    updateTotalAmount() {
      const d = this.datasend;
      if(d.pay_type_id===3){
        d.summa=((parseFloat(d.kassa_summa) || 0) +
        (parseFloat(d.plastic_summa) || 0) +
        (parseFloat(d.shot_summa) || 0) -(parseFloat(d.qaytim_som) || 0))/(parseFloat(d.dollar_rate) || 1) +(parseFloat(d.dollar_summa) || 1)-(parseFloat(d.qaytim_dollar) || 0)
      }
      else{const total =
        (parseFloat(d.kassa_summa) || 0) +
        (parseFloat(d.plastic_summa) || 0) +
        (parseFloat(d.shot_summa) || 0) +
        ((parseFloat(d.dollar_summa) || 0) * (parseFloat(d.dollar_rate) || 1)) -
        ((parseFloat(d.qaytim_som) || 0) + ((parseFloat(d.qaytim_dollar) || 0) * (parseFloat(d.dollar_rate) || 1)));
      d.summa = parseFloat(total.toFixed(2));}
    },
    async send() {
      this.formSubmitted = true;
      const d = this.datasend;
      if (!d.sklad_id || !d.kontragent_id || !d.pay_type_id || !d.datetime) {
        alert('Барча мажбурий майдонларни тўлдиринг');
        return;
      }

      const data = {
        sklad_id: d.sklad_id,
        kontragent_id: d.kontragent_id,
        pay_type_id: d.pay_type_id,
        datetime: moment(d.datetime, 'YYYY-MM-DD').unix(),
        summa: d.summa || 0,
        dollar_rate: d.dollar_rate || 1,
        kassa_summa: d.kassa_summa || 0,
        plastic_summa: d.plastic_summa || 0,
        shot_summa: d.shot_summa || 0,
        qaytim_dollar: d.qaytim_dollar || 0,
        qaytim_som: d.qaytim_som || 0,
        current_total: parseFloat(d.current_total) || 0,
        current_total_dollar: parseFloat(d.current_total_dollar) || 0,
        comment: d.comment || '',
        type: d.type,
        z_report: false,
      };

      let method = 'post';
      let url = '/api/v1/kontragent-pay';
      if (this.$route.params.id) {
        method = 'patch';
        url = `/api/v1/kontragent-pay/id/${this.$route.params.id}`;
      }

      try {
        await this.$axios({ method, url, data });
        alert('Сақланди!');
        this.$router.push({ path: '/tolov' });
      } catch (err) {
        alert('Сақлашда хатолик юз берди');
      }
    },
  },
};
</script>



<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #F5F7FA;
  color: #333;
}

.card {
  max-width: 1000px;
  margin: 2rem auto;
  border: none;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem; /* ichki joy keng */
}

.card-header {
  background-color: #f7f9fc;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 1.5rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

h5 {
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.25rem;
}

.form-label {
  font-weight: 500;
  color: #555;
  margin-bottom: 0.4rem;
}

.form-control,
.form-select {
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
  background-color: #fdfdfd;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus,
.form-select:focus {
  border-color: #6a96e8;
  box-shadow: 0 0 0 0.2rem rgba(106, 150, 232, 0.2);
  outline: none;
}

/* V-Select styles */
.v-select .vs__dropdown-toggle {
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  padding: 0.5rem 0.75rem;
  background-color: #fdfdfd;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.v-select.vs--open .vs__dropdown-toggle {
  border-color: #6a96e8;
  box-shadow: 0 0 0 0.2rem rgba(106, 150, 232, 0.2);
}

.vs__dropdown-menu {
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  z-index: 1000;
}

.vs__option {
  padding: 0.65rem 0.85rem;
  color: #333;
}

.vs__option--highlight {
  background-color: #e6f7ff;
}

.vs__option--selected {
  background-color: #d1ecf1;
}

/* Input group tweaks */
.input-group .v-select.custom-vs-select .vs__dropdown-toggle {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}

.input-group .btn-more {
  background-color: #f0f0f0;
  border-color: #dcdcdc;
  color: #666;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Button tweaks */
.btn {
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

/* Colors */
.btn-primary {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

.btn-primary:hover {
  background-color: #43A047;
}

.btn-outline-secondary {
  border-color: #90A4AE;
  color: #546E7A;
}

.btn-outline-secondary:hover {
  background-color: #CFD8DC;
}

.btn-danger {
  background-color: #F44336;
  border-color: #F44336;
}

.btn-danger:hover {
  background-color: #E53935;
}

/* Validation feedback */
.is-invalid {
  border-color: #e74c3c !important;
}

.invalid-feedback {
  color: #e74c3c;
  font-size: 0.85rem;
}

/* Spacing tweaks to fit page */
.row > div {
  margin-bottom: 1rem;
}

/* Responsive padding & margin */
@media (max-width: 768px) {
  .card {
    margin: 1rem;
    padding: 1.2rem;
  }
}

/* Ensure page top & bottom margin */
body {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
