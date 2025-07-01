<template>
  <div class="container mt-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
        <div class="mb-2 mb-md-0">
          <h5 class="mb-1 fw-bold">To'lov qo'shish</h5>
          <small class="text-muted">{{ currentDate }}</small>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button 
            class="btn btn-success d-flex flex-column flex-md-row align-items-center py-2 px-3"
            type="submit" 
            form="formAdd"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">Saqlash va berkitish</span>
            <span v-else class="d-flex align-items-center">
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              Saqlanmoqda...
            </span>
            <small class="text-white-50 ms-md-2">Ctrl + Enter</small>
          </button>
          <button 
            class="btn btn-outline-danger py-2 px-3"
            @click="cancel"
            :disabled="isSubmitting"
          >
            ❌
          </button>
        </div>
      </div>

      <div class="card-body">
        <form id="formAdd" @submit.prevent="submitForm">
          <div class="row g-3">
          
            <div class="col-12 col-md-6">
              <label class="form-label">Sklad</label>
              <select 
                v-model="form.sklad_id" 
                class="form-select" 
                required
              >
                <option disabled value="">Sklad tanlang</option>
                <option 
                  v-for="sklad in sklads" 
                  :key="sklad.id" 
                  :value="sklad.id"
                >
                  {{ sklad.name }}
                </option>
              </select>
            </div>

            
            <div class="col-12 col-md-6">
              <label class="form-label">Ism</label>
              <input 
                v-model="form.name" 
                type="text" 
                class="form-control" 
                placeholder="Ism kiriting.." 
                required
              />
            </div>

           
            <div class="col-12 col-md-6">
              <label class="form-label">Sana</label>
              <input 
                v-model="form.date" 
                type="date" 
                class="form-control" 
                required
              />
            </div>

            
            <div class="col-12 col-md-6">
              <label class="form-label">Summa</label>
              <input 
                v-model.number="form.amountKassa" 
                type="number" 
                class="form-control" 
                placeholder="Summa kiriting"
                step="0.01"
                min="0"
                required
              />
            </div>

           
            <div class="col-12 col-md-6">
              <label class="form-label">To'lov turi</label>
              <select 
                v-model="form.pay_type_id" 
                class="form-select" 
                required
                @change="updateCurrencyBasedOnPaymentType"
              >
                <option disabled value="">To'lov turi</option>
                <option 
                  v-for="type in payTypes" 
                  :key="type.id" 
                  :value="type.id"
                  :data-currency="type.currency"
                >
                  {{ type.name }}
                </option>
              </select>
            </div>

            
            <div class="col-12 col-md-6">
              <label class="form-label">Hisoblangan summa</label>
              <input 
                type="text" 
                class="form-control bg-light" 
                :value="formattedCalculatedAmount" 
                readonly
              />
            </div>

            
            <div class="col-12 col-md-6">
              <label class="form-label">Kurs narxi (1$ = ? so'm)</label>
              <input 
                type="number" 
                v-model.number="form.kursNarxi" 
                class="form-control" 
                placeholder="Kurs narxi"
                step="1"
                min="1"
                required
              />
            </div>

           
            <div class="col-12 col-md-6">
              <label class="form-label">Kontragent</label>
              <select 
                v-model="form.kontragent_id" 
                class="form-select" 
                required
              >
                <option disabled value="">Kontragent tanlang</option>
                <option 
                  v-for="item in kontragents" 
                  :key="item.id" 
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>

            
            <div class="col-12 col-md-6">
              <label class="form-label">Operatsiya turi</label>
              <select 
                v-model="form.type" 
                class="form-select"
                required
              >
                <option value="Kirim">Kirim</option>
                <option value="Chiqim">Chiqim</option>
              </select>
            </div>

            
            <div class="col-12">
              <label class="form-label">Izoh</label>
              <textarea 
                v-model="form.note" 
                class="form-control" 
                placeholder="Izoh yozing.."
                rows="2"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export default {
  name: "AddTolov",
  data() {
    return {
      currentDate: new Date().toLocaleString("uz-UZ", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      kontragents: [],
      sklads: [], 
      payTypes: [
        { id: 1, name: "Naqd (so'm)", currency: "Sum" },
        { id: 2, name: "Plastik karta (so'm)", currency: "Sum" },
        { id: 3, name: "Naqd (dollar)", currency: "Dollar" },
        { id: 4, name: "Pul o'tkazish (so'm)", currency: "Sum" }
      ],
      isSubmitting: false,
      form: {
        name: "",
        date: new Date().toISOString().split('T')[0],
        sklad_id: "", 
        kontragent_id: "",
        pay_type_id: "",
        amountKassa: null,
        kursNarxi: 12700,
        currency: "Sum",
        type: "Kirim",
        note: ""
      }
    };
  },
  computed: {
    calculatedAmount() {
      const { amountKassa, kursNarxi, currency } = this.form;
      if (!amountKassa || !kursNarxi) return 0;
      
      if (currency === "Dollar") {
        return amountKassa * kursNarxi;
      }
      return amountKassa;
    },
    formattedCalculatedAmount() {
      return this.calculatedAmount.toLocaleString('uz-UZ', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  },
  async created() {
    await Promise.all([this.getKontragents(), this.getSklads()]);
    this.setupKeyboardShortcuts();
  },
  methods: {
    async getSklads() {
      try {
        const response = await this.$axios.get('/api/v1/sklads/skladnames');
        this.sklads = response.data;
        
        if (this.sklads.length > 0) {
          this.form.sklad_id = this.sklads[0].id;
        }
      } catch (error) {
        this.showError("Skladlarni yuklashda xatolik: " + error.message);
        console.error(error);
      }
    },
    updateCurrencyBasedOnPaymentType() {
      const selectedType = this.payTypes.find(type => type.id == this.form.pay_type_id);
      if (selectedType) {
        this.form.currency = selectedType.currency;
      }
    },
    async getKontragents() {
      try {
        const response = await this.$axios.get('/api/v1/kontragent');
        this.kontragents = response.data;
      } catch (error) {
        this.showError("Kontragentlarni yuklashda xatolik: " + error.message);
        console.error(error);
      }
    },
    async submitForm() {
      this.isSubmitting = true;
      
      try {
        const payload = {
          datetime: Math.floor(new Date(this.form.date).getTime() / 1000),
          sklad_id: this.form.sklad_id, 
          kontragent_id: this.form.kontragent_id,
          current_total: 20000,
          summa: parseFloat(this.calculatedAmount),
          pay_type_id: this.form.pay_type_id,
          type: this.form.type === "Kirim",
          comment: this.form.note || "To'lov",
          currency: this.form.currency
        };

        const response = await this.$axios.post('/api/v1/kontragent-pay', payload);
        
        this.showSuccess("To'lov muvaffaqiyatli qo'shildi");
        this.resetForm();
        this.$router.push('/tolov');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        this.showError("Xatolik: " + errorMessage);
        console.error(error);
      } finally {
        this.isSubmitting = false;
      }
    },
    cancel() {
      if (confirm("Formani tozalamoqchimisiz? Barcha kiritilgan ma'lumotlar yo'qoladi.")) {
        this.$router.push('/tolov');
      }
    },
    resetForm() {
      this.form = {
        name: "",
        date: new Date().toISOString().split('T')[0],
        sklad_id: this.sklads.length > 0 ? this.sklads[0].id : "", // Preserve default warehouse
        kontragent_id: "",
        pay_type_id: "",
        amountKassa: null,
        kursNarxi: 12700,
        currency: "Sum",
        type: "Kirim",
        note: ""
      };
    },
    showSuccess(message) {
      useToast().success(message, {
        position: 'top-right',
        duration: 3000
      });
    },
    showError(message) {
      useToast().error(message, {
        position: 'top-right',
        duration: 5000
      });
    },
    setupKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
          e.preventDefault();
          document.getElementById('formAdd')?.requestSubmit();
        }
      });
    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.setupKeyboardShortcuts);
  }
};
</script>

<style scoped>

.card-header {
  background-color: #f8f9fa;
}

.form-label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.btn-success {
  transition: all 0.2s;
}

.btn-success:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .card-header {
    padding: 1rem;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>