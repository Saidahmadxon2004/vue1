<template>
  <form class="card p-4 shadow-sm border rounded-3">
    <h5 class="mb-4">CRM Qo‘shish / Tahrirlash</h5>

    <!-- Basic Info Fields -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Ism</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.first_name" required />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Familiya</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.last_name" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Otasining ismi</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.middle_name" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Telefon</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.phone_number" />
      </div>
    </div>
    
    <!-- Work Select with Modal -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Ish faoliyati</label></div>
      <div class="col-md-7">
        <v-select
          v-model="datasend.work_id"
          :options="workOptions"
          label="name"
          :reduce="work => work.id"
          placeholder="Tanlang..."
        ></v-select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-secondary w-100" @click.prevent="showWorkModal = true">
          <i class="bi bi-three-dots"></i>
        </button>
      </div>
    </div>
    
    <!-- Work Address Select with Modal -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Ish joyi qayerda joylashgan</label></div>
      <div class="col-md-7">
        <v-select
          v-model="datasend.work_address_id"
          :options="workAddressOptions"
          label="name"
          :reduce="address => address.id"
          placeholder="Tanlang..."
        ></v-select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-secondary w-100" @click.prevent="showWorkAddressModal = true">
          <i class="bi bi-three-dots"></i>
        </button>
      </div>
    </div>
   
    <!-- Found Address Select with Modal -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Topilgan manzil</label></div>
      <div class="col-md-7">
        <v-select
          v-model="datasend.found_address_id"
          :options="foundAddressOptions"
          label="name"
          :reduce="address => address.id"
          placeholder="Tanlang..."
        ></v-select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-secondary w-100" @click.prevent="showFoundAddressModal = true">
          <i class="bi bi-three-dots"></i>
        </button>
      </div>
    </div>

    <!-- Date Fields -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Murojaat vaqti</label></div>
      <div class="col-md-9">
        <input 
          type="datetime-local" 
          class="form-control" 
          v-model="foundDatetimeLocal" 
          @change="updateFoundDatetime"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Oxirgi gaplashilgan vaqt</label></div>
      <div class="col-md-9">
        <input 
          type="datetime-local" 
          class="form-control" 
          v-model="lastDatetimeLocal" 
          @change="updateLastDatetime"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Aloqaga chiqish vaqti</label></div>
      <div class="col-md-9">
        <input 
          type="datetime-local" 
          class="form-control" 
          v-model="contactDatetimeLocal" 
          @change="updateContactDatetime"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Sotib olish ehtimolligi</label></div>
      <div class="col-md-9">
        <input type="number" class="form-control" v-model="datasend.probability" />
      </div>
    </div>

    <!-- Status Select with Modal -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Status</label></div>
      <div class="col-md-7">
        <v-select
          v-model="datasend.status_id"
          :options="statusOptions"
          label="name"
          :reduce="status => status.id"
          placeholder="Tanlang..."
        ></v-select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-secondary w-100" @click.prevent="showStatusModal = true">
          <i class="bi bi-three-dots"></i>
        </button>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Kommentariy</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.comment" />
      </div>
    </div>

    <div class="d-flex justify-content-end mt-4">
      <button type="button" class="btn btn-primary me-2" @click="Send">Saqlash</button>
      <button type="button" class="btn btn-secondary" @click="$router.back()">Chiqish</button>
    </div>

    <!-- Modals for each select -->
    
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
    
    // Initialize datetime-local values
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