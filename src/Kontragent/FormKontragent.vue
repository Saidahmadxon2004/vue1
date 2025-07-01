<template>
  <form class="card p-4 shadow-sm border rounded-3">
    <h5 class="mb-4">Kontragent Qo‘shish / Tahrirlash</h5>

    <!-- FIO -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">FIO</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.name" required />
      </div>
    </div>

    <!-- Telefon -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Telefon</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.phone_number" />
      </div>
    </div>

    <!-- Hisob raqam -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Hisob raqam</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.account_number" />
      </div>
    </div>

    <!-- INN -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">ИНН</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.inn" />
      </div>
    </div>
    
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Mfo</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.mfo_id" />
      </div>
    </div>
    
    <!-- OKONX -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">ОКОНХ</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.okonx" />
      </div>
    </div>

    <!-- Manzil -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Manzil</label></div>
      <div class="col-md-9">
        <input type="text" class="form-control" v-model="datasend.address" />
      </div>
    </div>

    <!-- Firma select + ellipsis -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Firma</label></div>
      <div class="col-md-7">
        <v-select
          v-model="datasend.firma_id"
          :options="firmaOptions"
          label="name"
          :reduce="firma => firma.id"
          placeholder="Tanlang..."
        ></v-select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-outline-secondary w-100" @click.prevent="showFirmaModal = true">
          <i class="bi bi-three-dots"></i>
        </button>
      </div>
    </div>
    
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Ombor</label></div>
      <div class="col-md-9">
        <v-select
          v-model="datasend.sklad_id"
          :options="skladOptions"
          label="name"
          :reduce="sklad => sklad.id"
          placeholder="Tanlang..."
        ></v-select>
      </div>
    </div>
    
    <!-- Papka (checkbox) -->
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Papka</label></div>
      <div class="col-md-9">
        <input type="checkbox" class="form-check-input" v-model="datasend.is_folder" />
      </div>
    </div>
    
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Guruh</label></div>
      <div class="col-md-9">
        <v-select
          v-model="datasend.parent_id"
          :options="guruhOptions"
          label="name"
          :reduce="guruh => guruh.id"
          placeholder="Tanlang..."
          @input="handleGroupChange"
        ></v-select>
      </div>
    </div>
   
    <div class="row mb-3">
      <div class="col-md-3"><label class="form-label">Turi</label></div>
      <div class="col-md-9">
        <v-select
          v-model="datasend.type"
          :options="typeOptions"
          label="text"
          :reduce="type => type.value"
        ></v-select>
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
  </form>
  
  <FirmaModal 
    :firmaList="firmaList" 
    :showFirmaModal="showFirmaModal"
    @update:showFirmaModal="showFirmaModal = $event"
    @refresh="fetchFirmaList"
    @select="datasend.firma_id = $event"
  />
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { Modal } from 'bootstrap';
import FirmaModal from '@/components/FirmaModal.vue'

export default {
  components: { 
    FirmaModal,
    vSelect 
  },
  props: ["datasend"],
  data() {
    return { 
      firmaList: [],
      showFirmaModal: false,
      skladList: [],
      guruhList: [],
      typeOptions: [
        { text: 'Klient', value: 1 },
        { text: 'Yetkazuvchi', value: 2 },
        { text: 'Klient va Yetkazuvchi', value: 3 }
      ]
    }
  },
  computed: {
    firmaOptions() {
      return [{ id: null, name: 'Tanlang...' }, ...this.firmaList];
    },
    skladOptions() {
      return [{ id: null, name: 'Tanlang...' }, ...this.skladList];
    },
    guruhOptions() {
      return [{ id: null, name: 'Tanlang...' }, ...this.guruhList];
    }
  },
  mounted() {
    this.fetchFirmaList();
    this.fetchSkaldList();
    this.fetchGroupList();
  },
  methods: {
    handleGroupChange() {
      if (this.datasend.parent_id === null) {
        this.datasend.parent_id = 0;
      }
    },
    fetchFirmaList() { 
      let self = this;
      self.$axios.get('/api/v1/firma').then(res => self.firmaList = res.data);
    },
    fetchSkaldList() {
      let self = this;
      self.$axios.get('/api/v1/sklads/skladnames').then(res => self.skladList = res.data);
    },
    fetchGroupList() {
      let self = this;
      self.$axios.get('/api/v1/kontragent/folder-list').then(res => self.guruhList = res.data);
    },
    Send() {
      let self = this;
      let method = self.$route.params.id ? 'patch' : 'post';
      let url = self.$route.params.id
        ? `/api/v1/kontragent/id/${this.$route.params.id}`
        : '/api/v1/kontragent';

      self.$axios({
        method,
        url,
        data: self.datasend
      }).then(() => {
        self.$router.push({ path: "/kontragent" });
      }).catch(error => {
        if (error.response) {
          console.error('Xato javob:', error.response.data);
        } else if (error.request) {
          console.error('Serverdan javob kelmadi:', error.request);
        } else {
          console.error('So‘rov xatosi:', error.message);
        }
      });
    }
  }
}
</script>