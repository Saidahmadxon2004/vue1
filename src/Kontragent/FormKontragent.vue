<template>
  <div class="user-form-container">
    <form class="user-form-card">
      <div class="form-header-actions">
        <button type="button" class="btn btn-save" @click="Send">
          <i class="bi bi-save me-2"></i>Сақлаш<sup>ctrl+enter</sup>
        </button>
        <button type="button" class="btn btn-cancel" @click="$router.back()">
          <i class="bi bi-x-circle me-2"></i>Чиқиш<sup>esc</sup>
        </button>
      </div>

      <h5 class="section-title text-center">Kontragent Qo‘shish / Tahrirlash</h5>

      <div class="form-content-grid single-column">
        <div class="form-section-left">
          <div class="form-row-item">
            <label class="form-label">FIO</label>
            <input type="text" class="form-control" v-model="datasend.name" required />
          </div>

          <div class="form-row-item">
            <label class="form-label">Telefon</label>
            <input type="text" class="form-control" v-model="datasend.phone_number" />
          </div>

          <div class="form-row-item">
            <label class="form-label">Hisob raqam</label>
            <input type="text" class="form-control" v-model="datasend.account_number" />
          </div>

          <div class="form-row-item">
            <label class="form-label">ИНН</label>
            <input type="text" class="form-control" v-model="datasend.inn" />
          </div>
          
          <div class="form-row-item">
            <label class="form-label">Mfo</label>
            <input type="text" class="form-control" v-model="datasend.mfo_id" />
          </div>
          
          <div class="form-row-item">
            <label class="form-label">ОКОНХ</label>
            <input type="text" class="form-control" v-model="datasend.okonx" />
          </div>

          <div class="form-row-item">
            <label class="form-label">Manzil</label>
            <input type="text" class="form-control" v-model="datasend.address" />
          </div>

          <div class="form-row-item form-row-with-button">
            <label class="form-label">Firma</label>
            <div class="input-with-btn">
              <v-select
                v-model="datasend.firma_id"
                :options="firmaOptions"
                label="name"
                :reduce="firma => firma.id"
                placeholder="Tanlang..."
                class="custom-v-select"
              ></v-select>
              <button class="btn-ellipsis" @click.prevent="showFirmaModal = true">
                <i class="bi bi-three-dots"></i>
              </button>
            </div>
          </div>
          
          <div class="form-row-item">
            <label class="form-label">Ombor</label>
            <v-select
              v-model="datasend.sklad_id"
              :options="skladOptions"
              label="name"
              :reduce="sklad => sklad.id"
              placeholder="Tanlang..."
              class="custom-v-select"
            ></v-select>
          </div>
          
          <div class="form-row-item checkbox-row">
            <label class="form-label">Papka</label>
            <input type="checkbox" class="form-check-input" v-model="datasend.is_folder" />
          </div>
          
          <div class="form-row-item">
            <label class="form-label">Guruh</label>
            <v-select
              v-model="datasend.parent_id"
              :options="guruhOptions"
              label="name"
              :reduce="guruh => guruh.id"
              placeholder="Tanlang..."
              class="custom-v-select"
              @input="handleGroupChange"
            ></v-select>
          </div>
          
          <div class="form-row-item">
            <label class="form-label">Turi</label>
            <v-select
              v-model="datasend.type"
              :options="typeOptions"
              label="text"
              :reduce="type => type.value"
              class="custom-v-select"
            ></v-select>
          </div>

          <div class="form-row-item">
            <label class="form-label">Kommentariy</label>
            <input type="text" class="form-control" v-model="datasend.comment" />
          </div>
        </div>
      </div>
    </form>
  </div>
  
  <FirmaModal 
    :firmaList="firmaList" 
    :showFirmaModal="showFirmaModal"
    @update:showFirmaModal="showFirmaModal = $event"
    @refresh="fetchFirmaList"
    @select="datasend.firma_id = $event"
  />
</template>

<script>
import axios from 'axios';
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
          const errorMessage = error.response?.data?.message || "Ma'lumotlarni saqlashda xatolik yuz berdi!";
          this.$toast.error(errorMessage);
        } else if (error.request) {
          console.error('Serverdan javob kelmadi:', error.request);
          this.$toast.error("Serverdan javob kelmadi. Internet aloqasini tekshiring.");
        } else {
          console.error('So‘rov xatosi:', error.message);
          this.$toast.error("So'rov yuborishda xatolik yuz berdi.");
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.user-form-container {
  background-color: #f0f2f5;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-form-card {
  background-color: #e9eff6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 40px 60px;
  width: 100%;
  max-width: 1100px;
  position: relative;
}

.form-header-actions {
  position: absolute;
  top: 25px;
  right: 25px;
  display: flex;
  gap: 12px;
}

.btn-save {
  background-color: #2196F3;
  border-color: #2196F3;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.btn-save:hover {
  background-color: #1976D2;
  border-color: #1976D2;
  transform: translateY(-1px);
}

.btn-cancel {
  background-color: #9E9E9E;
  border-color: #9E9E9E;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.btn-cancel:hover {
  background-color: #757575;
  border-color: #757575;
  transform: translateY(-1px);
}

.section-title {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 40px;
  font-size: 24px;
}

.form-content-grid {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.form-content-grid.single-column {
  grid-template-columns: 1fr;
  width: 100%;
}

.form-section-left {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 800px;
}

.form-row-item {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 25px;
}

.form-row-item.form-row-with-button {
  grid-template-columns: 200px 1fr 40px; /* Label, select va tugma uchun aniq ustun kengliklari */
  .input-with-btn {
    display: flex;
    width: 100%;
    .custom-v-select {
      flex-grow: 1;
      .vs__dropdown-toggle {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .btn-ellipsis {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fcfdfe;
      border: 1px solid #cdd5df;
      border-left: none;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: #e0e9f3;
      }
    }
  }
}

.form-label {
  color: #555;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  font-size: 16px;
}

.form-control {
  width: 100%;
  padding: 10px 15px;
  height: 40px;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  font-size: 15px;
  color: #333;
  background-color: #fcfdfe;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  border-color: #8dbde7;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
  outline: none;
}

.custom-v-select {
  width: 100%;
  .vs__dropdown-toggle {
    min-height: 40px;
    padding: 10px 15px;
    border: 1px solid #cdd5df;
    border-radius: 4px;
    background-color: #fcfdfe;
  }
  .vs__selected {
    font-size: 15px;
  }
  .vs__dropdown-menu {
    font-size: 15px;
  }
}

.checkbox-row {
  grid-template-columns: 200px auto;
  .form-check-input {
    width: 20px;
    height: 20px;
    border: 1px solid #cdd5df;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 0;
    flex-shrink: 0;
    &:checked {
      background-color: #4A90E2;
      border-color: #4A90E2;
    }
  }
}
</style>