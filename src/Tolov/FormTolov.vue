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
            v-model="formData.sklad_id"
            :options="warehouseOptions"
            :reduce="option => option.id"
            label="name"
            placeholder="Складни танланг..."
            required
            :class="{'is-invalid': !formData.sklad_id && formSubmitted}"
          ></v-select>
          <div class="invalid-feedback" v-if="!formData.sklad_id && formSubmitted">
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
                v-model="formData.counterparty_id"
                :options="kontragentOptions"
                :reduce="option => option.id"
                label="name"
                placeholder="Контрагентни танланг..."
                required
                :class="{'is-invalid': !formData.counterparty_id && formSubmitted, 'custom-vs-select': true}"
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
              <div class="invalid-feedback" v-if="!formData.counterparty_id && formSubmitted">
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
              v-model="formData.payment_type_id"
              :options="paymentTypeOptions"
              :reduce="option => option.id"
              label="name"
              placeholder="Тўлов турини танланг..."
              required
              :class="{'is-invalid': !formData.payment_type_id && formSubmitted}"
              @option:selected="handlePaymentTypeChange"
            ></v-select>
            <div class="invalid-feedback" v-if="!formData.payment_type_id && formSubmitted">
              Тўлов тури танланиши шарт.
            </div>
          </div>
          <div class="mb-3">
            <label for="amount" class="form-label">Умумий Сумма</label>
            <input
              type="number"
              id="amount"
              :value="calculatedTotalAmount"
              class="form-control"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="paymentTime" class="form-label">Тўлов вақти <span class="text-danger">*</span></label>
            <input
              type="date"
              id="paymentTime"
              v-model="formData.payment_date"
              class="form-control"
              required
              :class="{'is-invalid': !formData.payment_date && formSubmitted}"
            />
            <div class="invalid-feedback" v-if="!formData.payment_date && formSubmitted">
              Тўлов вақти киритилиши шарт.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="comment" class="form-label">Комментарий</label>
          <textarea id="comment" v-model="formData.comment" class="form-control" rows="3"></textarea>
        </div>
      </div>

      <div class="col-md-6">
        <div class="mb-3">
          <label for="type" class="form-label">Тури <span class="text-danger">*</span></label>
          <select id="type" v-model="formData.transaction_type" class="form-select" required>
            <option value="income">Кирим</option>
            <option value="expense">Чиқим</option>
          </select>
        </div>

        <div class="card p-3 mb-3 border-light bg-light">
          <h6>Касса</h6>
          <div class="mb-3">
            <label for="cashDollar" class="form-label">Нақд$</label>
            <input
              type="number"
              id="cashDollar"
              v-model.number="formData.cash_dollar"
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
              v-model.number="formData.cash_sum"
              class="form-control"
              @input="updateTotalAmount"
            />
          </div>
          <div class="mb-3">
            <label for="plastic" class="form-label">Пластик</label>
            <input
              type="number"
              id="plastic"
              v-model.number="formData.plastic"
              class="form-control"
              @input="updateTotalAmount"
            />
          </div>
          <div class="mb-3">
            <label for="transfer" class="form-label">Перечесления</label>
            <input
              type="number"
              id="transfer"
              v-model.number="formData.transfer"
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
                v-model.number="formData.change_sum"
                class="form-control"
                @input="updateTotalAmount"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="changeDollar" class="form-label">Қайтйм $</label>
              <input
                type="number"
                id="changeDollar"
                v-model.number="formData.change_dollar"
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
            v-model.number="formData.dollar_rate"
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
  props: {
    datasend: {
      type: Object,
      default: () => ({
        sklad_id: null,
        counterparty_id: null,
        counterparty_name: '',
        balance_usd: 0,
        balance_uzs: 0,
        payment_type_id: null,
        amount: 0,
        payment_date: moment().format('YYYY-MM-DD'),
        comment: '',
        transaction_type: 'income',
        cash_dollar: 0,
        cash_sum: 0,
        plastic: 0,
        transfer: 0,
        change_sum: 0,
        change_dollar: 0,
        dollar_rate: 13000,
      }),
    },
  },
  data() {
    return {
      formData: { ...this.datasend },
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
      const usdBalance = parseFloat(this.formData.balance_usd) || 0;
      const uzsBalance = parseFloat(this.formData.balance_uzs) || 0;
      return `${usdBalance.toFixed(2)} $ || ${uzsBalance.toLocaleString('en-US')}`;
    },
    calculatedTotalAmount() {
      let total = 0;
      const rate = this.formData.dollar_rate || 1;

      const cashDollar = this.formData.cash_dollar || 0;
      const cashSum = this.formData.cash_sum || 0;
      const plastic = this.formData.plastic || 0;
      const transfer = this.formData.transfer || 0;
      const changeDollar = this.formData.change_dollar || 0;
      const changeSum = this.formData.change_sum || 0;

      let cashDollarConverted = cashDollar;
      let cashSumConverted = cashSum;
      let plasticConverted = plastic;
      let transferConverted = transfer;
      let changeDollarConverted = changeDollar;
      let changeSumConverted = changeSum;

      if (this.formData.payment_type_id === this.dollarPaymentTypeId) {
        if (rate !== 0) {
          cashSumConverted = cashSum / rate;
          plasticConverted = plastic / rate;
          transferConverted = transfer / rate;
          changeSumConverted = changeSum / rate;
        } else {
          cashSumConverted = plasticConverted = transferConverted = changeSumConverted = 0;
        }
        total = (cashDollarConverted + cashSumConverted + plasticConverted + transferConverted) -
                (changeDollarConverted + changeSumConverted);
        return parseFloat(total.toFixed(2));
      } else {
        cashDollarConverted = cashDollar * rate;
        changeDollarConverted = changeDollar * rate;
        total = (cashDollarConverted + cashSumConverted + plasticConverted + transferConverted) -
                (changeDollarConverted + changeSumConverted);
        return parseFloat(total.toFixed(0));
      }
    }
  },
  watch: {
    datasend: {
      handler(newVal) {
        if (newVal) {
          this.formData = { ...newVal };
          if (this.formData.payment_date) {
            this.formData.payment_date = moment.unix(this.formData.payment_date).format('YYYY-MM-DD');
          }
          if (this.formData.counterparty_id) {
            this.fetchKontragentBalance(this.formData.counterparty_id);
            this.fetchKontragentNameById(this.formData.counterparty_id);
          }
        }
      },
      deep: true,
      immediate: true,
    },
    'formData.dollar_rate': {
      handler() {
        this.updateTotalAmount();
      }
    },
    calculatedTotalAmount: {
      handler(newVal) {
        this.formData.amount = newVal;
      },
      immediate: true,
    }
  },
  created() {
    if (!this.$route.params.id) {
      this.formData.payment_date = moment().format('YYYY-MM-DD');
    }
  },
  mounted() {
    this.fetchWarehouses();
    this.fetchPaymentTypes();
    this.fetchKontragents();
    this.fetchLatestDollarRate();
  },
  methods: {
     async handleKontragentSelection(kontragentId) {
    await this.fetchKontragentBalance(kontragentId);
    await this.fetchKontragentNameById(kontragentId);
    this.formData.counterparty_id = kontragentId;
  },
    async fetchWarehouses() {
      try {
        const response = await this.$axios.get('/api/v1/sklads/skladnames');
        this.warehouses = response.data;
        if (this.warehouses.length > 0 && !this.formData.sklad_id) {
          this.formData.sklad_id = this.warehouses[0].id;
        }
      } catch (error) {
        console.error('Error fetching warehouses:', error);
        alert('Складларни юклашда хатолик юз берди.');
      }
    },
    async fetchPaymentTypes() {
      try {
        const response = await this.$axios.get('/api/v1/pay-type');
        this.paymentTypes = response.data;
        const dollarType = this.paymentTypes.find(type => type.name === 'Доллар');
        if (dollarType) {
          this.dollarPaymentTypeId = dollarType.id;
        }
      } catch (error) {
        console.error('Error fetching payment types:', error);
        alert('Тўлов турларини юклашда хатолик юз берди.');
      }
    },
    async fetchKontragents() {
      try {
        const response = await this.$axios.get('/api/v1/kontragent');
        this.kontragents = response.data;
      } catch (error) {
        console.error('Error fetching kontragents:', error);
        alert('Контрагентларни юклашда хатолик юз берди.');
      }
    },async fetchKontragentBalance(kontragentId) {
  const self = this;
  if (!kontragentId) {
    this.formData.balance_usd = 0;
    this.formData.balance_uzs = 0;
    return;
  }
  try {
    const response = await this.$axios({
      method: "post",
      url: "/api/v1/kontragent/total",
      data: {
        kontragent_id: kontragentId,
        sklad_id: self.formData.sklad_id,
        datetime: moment(self.formData.payment_date, "YYYY-MM-DD").unix()
      }
    });

    // Default balanslarni nolga qo'yib chiqamiz
    this.formData.balance_usd = 0;
    this.formData.balance_uzs = 0;

    response.data.forEach(element => {
      if (element.pay_type_id === 3) {
        this.formData.balance_usd = parseFloat(element.total.toFixed(3));
      } else {
        this.formData.balance_uzs += parseFloat(element.total.toFixed(3));
      }
    });

  } catch (error) {
    console.error("Kontragent balansi olishda xatolik:", error);
    alert("Kontagent balansini olishda xatolik yuz berdi.");
    this.formData.balance_usd = 0;
    this.formData.balance_uzs = 0;
  }
},

    async fetchKontragentNameById(kontragentId) {
      if (!kontragentId) {
        this.formData.counterparty_name = '';
        return;
      }
      const kontragent = this.kontragents.find(k => k.id === kontragentId);
      if (kontragent) {
        this.formData.counterparty_name = kontragent.name;
      } else {
        try {
          const response = await this.$axios.get(`/api/v1/kontragent/id/${kontragentId}`);
          if (response.data && response.data.data) {
            this.formData.counterparty_name = response.data.data.name;
            if (!this.kontragents.some(k => k.id === kontragentId)) {
              this.kontragents.push(response.data.data);
            }
          }
        } catch (error) {
          console.error('Error fetching kontragent name by ID:', error);
          this.formData.counterparty_name = 'Номаълум Контрагент';
        }
      }
    },
    async handleKontragentSelectChange(selectedKontragentId) {
      if (selectedKontragentId) {
        await this.fetchKontragentBalance(selectedKontragentId);
        await this.fetchKontragentNameById(selectedKontragentId);
      } else {
        this.formData.counterparty_name = '';
        this.formData.balance_usd = 0;
        this.formData.balance_uzs = 0;
      }
    },
    async fetchLatestDollarRate() {
      try {
        const response = await this.$axios.get('/api/v1/dollar-exchange-rate/last');
        if (response.data && response.data.rate) {
          this.formData.dollar_rate = response.data.rate;
        }
      } catch (error) {
        console.error("Error fetching dollar exchange rate:", error);
        alert('Доллар курсини юклашда хатолик юз берди. Дефолт курс ишлатилади.');
      }
    },
    updateTotalAmount() {
      // Trigger recompute
      this.formData.amount = this.calculatedTotalAmount;
    },
    async send() {
      this.formSubmitted = true;
      if (!this.formData.sklad_id || !this.formData.counterparty_id || !this.formData.payment_type_id || !this.formData.payment_date) {
        alert('Илтимос, барча мажбурий майдонларни тўлдиринг: Склад, Контрагент, Тўлов тури, Тўлов вақти.');
        return;
      }

      let method = 'post';
      let url = 'api/v1/kontragent-pay';

      const sanitizedData = {
        datetime: moment(this.formData.payment_date).unix(),
        sklad_id: this.formData.sklad_id,
        kontragent_id: this.formData.counterparty_id,
        pay_type_id: this.formData.payment_type_id,
        summa: this.calculatedTotalAmount,
        current_total: parseFloat(this.formData.balance_uzs) || 0,
        type: this.formData.transaction_type === 'income',

        comment: this.formData.comment || '',
        dollar_rate: this.formData.dollar_rate || 1,
        pay_type_kassa: this.formData.payment_type_id || 1,
        kassa_summa: this.formData.cash_sum || 0,
        current_total_dollar: parseFloat(this.formData.balance_usd) || 0,
        z_report: false,
        dollar_summa: this.formData.cash_dollar || 0,
        cash_summa: this.formData.cash_sum || 0,
        plastic_summa: this.formData.plastic || 0,
        shot_summa: this.formData.transfer || 0,
        qaytim_dollar: this.formData.change_dollar || 0,
        qaytim_som: this.formData.change_sum || 0
      };

      if (this.$route.params.id) {
        method = 'patch';
        url = 'api/v1/kontragent-pay/id/' + this.$route.params.id;
      }

      try {
        await this.$axios({
          method,
          url,
          data: sanitizedData,
        });
        this.$router.push({ path: '/tolov' });
        alert('Тўлов муваффақиятли сақланди!');
      } catch (error) {
        console.error("Xato:", error);
        alert("Тўловни сақлашда хатолик юз берди.");
      }
    }
  }
}
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
