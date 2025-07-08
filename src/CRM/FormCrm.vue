<template>
  <div class="crm-container">
    <form class="crm-form">
      <div class="top-actions">
        <button type="button" class="btn btn-primary-custom" @click="Send">
          <i class="bi bi-save me-2"></i>Saqlash va berkitish
        </button>
        <button type="button" class="btn btn-secondary-custom" @click="$router.back()">
          <i class="bi bi-box-arrow-right me-2"></i>Chiqish
        </button>
      </div>

      <div class="form-grid">
        <div class="form-row">
          <label class="form-label">Ism</label>
          <div class="input-col">
            <input type="text" class="form-control" v-model="datasend.first_name" required />
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Familiya</label>
          <div class="input-col">
            <input type="text" class="form-control" v-model="datasend.last_name" />
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Otasining ismi</label>
          <div class="input-col">
            <input type="text" class="form-control" v-model="datasend.middle_name" />
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Telefon</label>
          <div class="input-col input-group-phone">
            <span class="input-group-text">+998</span>
            <input type="text" class="form-control" v-model="datasend.phone_number" placeholder="XX YYY ZZ ZZ" />
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Ish faoliyati</label>
          <div class="input-col select-with-button">
            <v-select
              v-model="datasend.work_id"
              :options="workOptions"
              label="name"
              :reduce="work => work.id"
              placeholder="Tanlang..."
              class="custom-v-select"
            ></v-select>
            <button class="btn btn-icon" @click.prevent="showWorkModal = true">
              <i class="bi bi-three-dots"></i>
            </button>
          </div>
        </div>
        
        <div class="form-row">
          <label class="form-label">Ish joyi qayerda joylashgan</label>
          <div class="input-col select-with-button">
            <v-select
              v-model="datasend.work_address_id"
              :options="workAddressOptions"
              label="name"
              :reduce="address => address.id"
              placeholder="Tanlang..."
              class="custom-v-select"
            ></v-select>
            <button class="btn btn-icon" @click.prevent="showWorkAddressModal = true">
              <i class="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Bizni qayerdan topgan</label>
          <div class="input-col select-with-button">
            <v-select
              v-model="datasend.found_address_id"
              :options="foundAddressOptions"
              label="name"
              :reduce="address => address.id"
              placeholder="Tanlang..."
              class="custom-v-select"
            ></v-select>
            <button class="btn btn-icon" @click.prevent="showFoundAddressModal = true">
              <i class="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Murojaat vaqti</label>
          <div class="input-col input-with-calendar">
            <input
              type="datetime-local"
              class="form-control datetime-input"
              v-model="foundDatetimeLocal"
              @change="updateFoundDatetime"
              placeholder="mm/dd/yyyy"
            />
            <i class="bi bi-calendar-event calendar-icon"></i>
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Oxirgi gaplashilgan vaqt</label>
          <div class="input-col input-with-calendar">
            <input
              type="datetime-local"
              class="form-control datetime-input"
              v-model="lastDatetimeLocal"
              @change="updateLastDatetime"
              placeholder="mm/dd/yyyy"
            />
            <i class="bi bi-calendar-event calendar-icon"></i>
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Aloqaga chiqish vaqti</label>
          <div class="input-col input-with-calendar">
            <input
              type="datetime-local"
              class="form-control datetime-input"
              v-model="contactDatetimeLocal"
              @change="updateContactDatetime"
              placeholder="mm/dd/yyyy"
            />
            <i class="bi bi-calendar-event calendar-icon"></i>
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Sotib olish ehtimoli (%)</label>
          <div class="input-col">
            <input type="number" class="form-control" v-model="datasend.probability" min="0" max="100" />
          </div>
        </div>

        <div class="form-row">
          <label class="form-label">Status</label>
          <div class="input-col select-with-button">
            <v-select
              v-model="datasend.status_id"
              :options="statusOptions"
              label="name"
              :reduce="status => status.id"
              placeholder="Tanlang..."
              class="custom-v-select"
            ></v-select>
            <button class="btn btn-icon" @click.prevent="showStatusModal = true">
              <i class="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        <div class="form-row comment-row">
          <label class="form-label">Kommentariy</label>
          <div class="input-col">
            <textarea class="form-control" v-model="datasend.comment" rows="4"></textarea>
          </div>
        </div>
      </div>
    </form>

    <WorkModal
      :showModal="showWorkModal"
      :items="workList"
      @close="showWorkModal = false"
      @refresh="fetchWorkList"
      @select="datasend.work_id = $event"
    />

    <WorkAddressModal
      :showModal="showWorkAddressModal"
      :items="workAddressList"
      @close="showWorkAddressModal = false"
      @refresh="fetchWorkAddressList"
      @select="datasend.work_address_id = $event"
    />

    <FoundAddressModal
      :showModal="showFoundAddressModal"
      :items="foundAddressList"
      @close="showFoundAddressModal = false"
      @refresh="fetchFoundAddressList"
      @select="datasend.found_address_id = $event"
    />

    <StatusModal
      :showModal="showStatusModal"
      :items="statusList"
      @close="showStatusModal = false"
      @refresh="fetchStatusList"
      @select="datasend.status_id = $event"
    />
  </div>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import WorkModal from '@/components/WorkModal.vue';
import WorkAddressModal from '@/components/WorkAddressModal.vue';
import FoundAddressModal from '@/components/FoundAddressModal.vue';
import StatusModal from '@/components/StatusModal.vue';

export default {
  components: {
    vSelect,
    WorkModal,
    WorkAddressModal,
    FoundAddressModal,
    StatusModal
  },
  props: ["datasend"],
  data() {
    return {
      foundAddressList: [],
      statusList: [],
      workList: [],
      workAddressList: [],
      showWorkModal: false,
      showWorkAddressModal: false,
      showFoundAddressModal: false,
      showStatusModal: false,
      foundDatetimeLocal: null,
      lastDatetimeLocal: null,
      contactDatetimeLocal: null
    }
  },
  computed: {
    workOptions() {
      return [{ id: null, name: 'Tanlang...' }, ...this.workList];
    },
    workAddressOptions() {
      return [{ id: null, name: 'Tanlang...' }, ...this.workAddressList];
    },
    foundAddressOptions() {
      return [{ id: null, name: 'Tanlang...' }, ...this.foundAddressList];
    },
    statusOptions() {
      return [{ id: null, name: 'Tanlang...' }, ...this.statusList];
    }
  },
  mounted() {
    this.fetchWorkList();
    this.fetchWorkAddressList();
    this.fetchFoundAddressList();
    this.fetchStatusList();

    if (this.datasend.found_datetime) {
      this.foundDatetimeLocal = this.formatDateForInput(this.datasend.found_datetime);
    }
    if (this.datasend.last_datetime) {
      this.lastDatetimeLocal = this.formatDateForInput(this.datasend.last_datetime);
    }
    if (this.datasend.contact_datetime) {
      this.contactDatetimeLocal = this.formatDateForInput(this.datasend.contact_datetime);
    }
  },
  methods: {
    formatDateForInput(timestamp) {
      if (!timestamp) return null;
      const date = new Date(timestamp * 1000);
      return date.toISOString().slice(0, 16);
    },

    updateFoundDatetime() {
      if (this.foundDatetimeLocal) {
        this.datasend.found_datetime = Math.floor(new Date(this.foundDatetimeLocal).getTime() / 1000);
      } else {
        this.datasend.found_datetime = null;
      }
    },

    updateLastDatetime() {
      if (this.lastDatetimeLocal) {
        this.datasend.last_datetime = Math.floor(new Date(this.lastDatetimeLocal).getTime() / 1000);
      } else {
        this.datasend.last_datetime = null;
      }
    },

    updateContactDatetime() {
      if (this.contactDatetimeLocal) {
        this.datasend.contact_datetime = Math.floor(new Date(this.contactDatetimeLocal).getTime() / 1000);
      } else {
        this.datasend.contact_datetime = null;
      }
    },

    fetchWorkList() {
      this.$axios.get('/api/v1/crm-work').then(res => this.workList = res.data);
    },
    fetchWorkAddressList() {
      this.$axios.get('/api/v1/crm-work-address').then(res => this.workAddressList = res.data);
    },
    fetchFoundAddressList() {
      this.$axios.get('/api/v1/crm-found-address').then(res => this.foundAddressList = res.data);
    },
    fetchStatusList() {
      this.$axios.get('/api/v1/crm-status').then(res => this.statusList = res.data);
    },
    Send() {
      let method = this.$route.params.id ? 'patch' : 'post';
      let url = this.$route.params.id
        ? `/api/v1/crm-client/id/${this.$route.params.id}`
        : '/api/v1/crm-client';

      this.$axios({
        method,
        url,
        data: this.datasend
      }).then(() => {
        this.$router.push({ path: "/crm" });
      }).catch(error => {
        console.error('Xato:', error.response?.data || error.message);
      });
    }
  }
}
</script>

<style scoped>
.crm-container {
  background-color: #f0f2f5;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.crm-form {
  background-color: #e9eff6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 30px 40px;
  width: 100%;
  max-width: 900px;
  position: relative;
}

.top-actions {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.btn-primary-custom {
  background-color: #4A90E2;
  border-color: #4A90E2;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.btn-primary-custom:hover {
  background-color: #357ABD;
  border-color: #357ABD;
}

.btn-secondary-custom {
  background-color: #6C7A89;
  border-color: #6C7A89;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.btn-secondary-custom:hover {
  background-color: #59646F;
  border-color: #59646F;
}

.form-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 15px 25px;
  margin-top: 50px;
}

.form-row {
  display: contents;
}

.form-label {
  grid-column: 1;
  color: #555;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding-right: 15px;
  
}

.input-col {
  grid-column: 2;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background-color: #fcfdfe;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  border-color: #8dbde7;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
  outline: none;
}

.input-group-phone {
  display: flex;
  width: 100%;
}
.input-group-phone .input-group-text {
  background-color: #e9eff6;
  border: 1px solid #cdd5df;
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding: 8px 12px;
  color: #555;
  font-size: 14px;
}
.input-group-phone .form-control {
  border-left: none;
  border-radius: 0 4px 4px 0;
}

.custom-v-select .vs__dropdown-toggle {
  background-color: #fcfdfe;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  padding: 6px 12px;
  min-height: auto;
}
.custom-v-select .vs__selected-options {
  padding: 0;
}
.custom-v-select .vs__selected {
  font-size: 14px;
  color: #333;
  margin: 0;
  padding: 0;
}
.custom-v-select .vs__dropdown-menu {
  border: 1px solid #cdd5df;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  font-size: 14px;
}
.custom-v-select .vs__dropdown-option {
  padding: 8px 12px;
  color: #555;
}
.custom-v-select .vs__dropdown-option--highlight {
  background-color: #e0e9f3;
  color: #333;
}
.custom-v-select .vs__open-indicator {
  fill: #888;
}

.select-with-button {
  display: flex;
  align-items: center;
  gap: 10px;
}
.select-with-button .form-control,
.select-with-button .custom-v-select {
  flex-grow: 1;
}
.btn-icon {
  background-color: #f2f6fa;
  border: 1px solid #cdd5df;
  color: #555;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 34px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.btn-icon:hover {
  background-color: #e0e9f3;
  border-color: #b9cbe0;
}

.input-with-calendar {
  position: relative;
  width: 100%;
}
.datetime-input[type="datetime-local"] {
  padding-right: 35px;
}
.calendar-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
}

.comment-row .input-col {
  align-items: flex-start;
}
textarea.form-control {
  min-height: 80px;
  resize: vertical;
}
</style>