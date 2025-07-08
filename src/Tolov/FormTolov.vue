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
          <label for="warehouse" class="form-label">Склад</label>
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
            <label for="counterparty" class="form-label">Контрагент</label>
            <div class="input-group">
              <v-select
                id="counterparty"
                v-model="formData.counterparty_id"
                :options="kontragentOptions"
                :reduce="option => option.id"
                label="name"
                placeholder="Контрагентни танланг..."
                required
                :class="{'is-invalid': !formData.counterparty_id && formSubmitted}"
                @update:modelValue="handleKontragentSelectChange"
                :filterable="false"
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
            <label for="paymentType" class="form-label">Тўлов тури</label>
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
            <label for="paymentTime" class="form-label">Тўлов вақти</label>
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
          <label for="type" class="form-label">Тури</label>
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
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import TolovModal from './TolovModal.vue'; 

export default {
  components: {
    vSelect,
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
            cashSumConverted = 0;
            plasticConverted = 0;
            transferConverted = 0;
            changeSumConverted = 0;
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
  },
  methods: {
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

        const naqdType = this.paymentTypes.find(type => type.name === 'Нақд');
        if (this.paymentTypes.length > 0 && !this.formData.payment_type_id) {
          this.formData.payment_type_id = naqdType ? naqdType.id : this.paymentTypes[0].id;
        }
        this.updateTotalAmount();
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
                    // Add to kontragents list if not already there
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
    handleWarehouseChange(selectedOption) {
    },
    handlePaymentTypeChange(selectedOption) {
      this.updateTotalAmount();
    },
    handleKontragentSelection(selectedKontragent) {
      this.formData.counterparty_id = selectedKontragent.id;
      this.formData.counterparty_name = selectedKontragent.name;
      this.fetchKontragentBalance(selectedKontragent.id);
      this.showKontragentSelectModal = false;
    },
    handleKontragentSelectChange(selectedKontragentId) {
        if (selectedKontragentId) {
            this.fetchKontragentBalance(selectedKontragentId);
            this.fetchKontragentNameById(selectedKontragentId);
        } else {
            this.formData.counterparty_name = '';
            this.formData.balance_usd = 0;
            this.formData.balance_uzs = 0;
        }
    },
    async fetchKontragentBalance(kontragentId) {
      if (!kontragentId) {
        this.formData.balance_usd = 0;
        this.formData.balance_uzs = 0;
        return;
      }
      try {
        const response = await this.$axios.get(`/api/v1/kontragent/${kontragentId}/balance`);
        this.formData.balance_usd = response.data.usd_balance || 0;
        this.formData.balance_uzs = response.data.uzs_balance || 0;
      } catch (error) {
        console.error("Kontragent balansi olinmadi:", error);
        this.formData.balance_usd = 0;
        this.formData.balance_uzs = 0;
        alert('Контрагент балансини олишда хатолик юз берди.');
      }
    },
    updateTotalAmount() {
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
    number: null,
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
          method: method,
          url: url,
          data: sanitizedData,
        });
        this.$router.push({ path: '/tolov' });
        alert('Тўлов муваффақиятли сақланди!');
      } catch (error) {
        if (error.response) {
          console.error('Xato javob:', error.response.data);
          let errorMessage = "Xato: Ma'lumotlarni yuborishda muammo yuz berdi.";
          if (error.response.data && error.response.data.errors && error.response.data.errors.length > 0) {
            errorMessage += "\nDetallar:\n";
            error.response.data.errors.forEach(err => {
              errorMessage += `- ${err.msg} (Maydon: ${err.param})\n`;
            });
          } else if (error.response.data && error.response.data.message) {
              errorMessage = "Xato: " + error.response.data.message;
          }
          alert(errorMessage);
        } else if (error.request) {
          console.error('Сервердан жавоб келмади:', error.request);
          alert('Xato: Серверга уланишда муаммо юз берди. Илтиmos, интернет уланишингизни текширинг.');
        } else {
          console.error('Сўров хатоси:', error.message);
          alert('Xato: Сўров юборишда хатолик юз берди.');
        }
      }
    },
  },
};
</script>

<style>
/* Base Styles for a clean look */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5; /* Light gray background */
  color: #333;
}

.card {
  max-width: 1200px;
  margin: 2rem auto;
  border: none;
  border-radius: 12px;
  background-color: #ffffff; /* White card background */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Soft shadow */
}

.card-header {
  background-color: #f7f9fc; /* Light header background */
  border-bottom: 1px solid #e0e0e0;
  padding: 1.25rem 1.5rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

h5 {
  color: #2c3e50; /* Darker heading color */
  font-weight: 600;
}

.form-label {
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
}

.form-control, .form-select, .vs__search, .vs__selected, .vs__dropdown-toggle {
  border-radius: 8px;
  border: 1px solid #dcdcdc; /* Light border for inputs */
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fdfdfd;
}

.form-control:focus, .form-select:focus, .vs__search:focus, .vs__dropdown-toggle:focus-within {
  border-color: #a7d9f7; /* Soft blue on focus */
  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.25); /* Adjusted focus shadow */
  outline: none;
}

/* Specific styles for vue-select */
.vs--single .vs__selected-options {
  padding-left: 0.75rem;
}

.vs__dropdown-toggle {
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  height: auto;
  min-height: 44px;
}

.vs__search::placeholder,
.vs__dropdown-toggle .vs__selected {
  color: #888;
}

.vs__dropdown-menu {
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  z-index: 1000;
}

.vs__option {
  padding: 0.75rem 1rem;
  color: #333;
}

.vs__option--highlight {
  background-color: #e6f7ff; /* Light blue for highlight */
  color: #2c3e50;
}

.vs__option--selected {
  background-color: #d1ecf1; /* Slightly darker blue for selected */
  color: #2c3e50;
}

/* Action buttons */
.btn {
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #4CAF50; /* Green */
  border-color: #4CAF50;
}

.btn-primary:hover {
  background-color: #45a049;
  border-color: #45a049;
}

.btn-outline-secondary {
  border-color: #b0c4de; /* Light steel blue */
  color: #5d6d7e;
}

.btn-outline-secondary:hover {
  background-color: #e6f2ff;
  color: #465a6b;
  border-color: #b0c4de;
}

.btn-danger {
  background-color: #e74c3c; /* Red */
  border-color: #e74c3c;
}

.btn-danger:hover {
  background-color: #c0392b;
  border-color: #c0392b;
}

.btn-more {
  background-color: #f0f0f0;
  border-color: #dcdcdc;
  color: #666;
  width: 44px; /* Fixed width for the button */
  flex-shrink: 0; /* Prevent it from shrinking */
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-weight: bold;
  font-size: 1.2rem;
}

.btn-more:hover {
  background-color: #e0e0e0;
}

/* Invalid feedback for validation */
.is-invalid {
  border-color: #e74c3c !important;
}

.invalid-feedback {
  color: #e74c3c;
  font-size: 0.875em;
  margin-top: 0.25rem;
}
</style>