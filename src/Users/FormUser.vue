<template>
  <div class="user-form-container">
    <form class="user-form-card">
      <div class="form-header-actions">
        <button type="button" class="btn btn-save" @click="Savedokument()">
          <i class="bi bi-save me-2"></i>Сақлаш ва беркитиш <sup>ctrl+enter</sup>
        </button>
        <router-link :to="{ path: '/users' }" class="btn btn-cancel-link">
          <button type="button" class="btn btn-cancel">
            <i class="bi bi-x-circle me-2"></i>Чиқиш<sup>esc</sup>
          </button>
        </router-link>
      </div>

      <div class="form-content-grid">
        <div class="form-section-left">
          <div class="form-row-item">
            <label class="form-label">Исми</label>
            <input
              class="form-control"
              ref="focused"
              v-model="datasend.first_name"
              type="text"
            />
          </div>
          <div class="form-row-item">
            <label class="form-label">Фамилия</label>
            <input
              class="form-control"
              v-model="datasend.last_name"
              type="text"
            />
          </div>
          <div class="form-row-item">
            <label class="form-label">Почта</label>
            <input
              class="form-control"
              v-model="datasend.email"
              type="email"
            />
          </div>
          <div class="form-row-item">
            <label class="form-label">Склад</label>
            <v-select
              :disabled="skladhave"
              :clearable="false"
              class="form-control-sm required custom-v-select"
              :options="skladlist"
              v-model="datasend.sklad_id"
              :reduce="name => name.id"
              label="name"
              @input="Productlistfolder(datasend.sklad_id)"
            >
              <template #search="{attributes, events}">
                <input
                  class="vs__search"
                  v-bind="attributes"
                  v-on="events"
                />
              </template>
              <template #selected-option="{ name }">
                {{ name }}
              </template>
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  <em><b>{{ search }}</b></em> бўйича маьлумот йўқ
                </template>
                <em style="opacity: 0.5;" v-else>Маьлумот йўқ</em>
              </template>
            </v-select>
          </div>
          <div class="form-row-item">
            <label class="form-label">Ходим</label>
            <v-select
              :clearable="false"
              class="form-control-sm required custom-v-select"
              :options="stafflist"
              v-model="datasend.staff_id"
              :reduce="name => name.id"
              label="name"
            >
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  <em><b>{{ search }}</b></em> бўйича маьлумот йўқ
                </template>
                <em style="opacity: 0.5;" v-else>Маьлумот йўқ</em>
              </template>
            </v-select>
          </div>
          <div class="form-row-item">
            <label class="form-label">Maosh</label>
            <input
              class="form-control"
              v-model="datasend.salary"
              type="text"
            />
          </div>
          <div class="form-row-item">
            <label class="form-label">Bonus</label>
            <input
              class="form-control"
              v-model="datasend.percent"
              type="text"
            />
          </div>
          <div class="form-row-item">
            <label class="form-label">Логин</label>
            <input
              class="form-control"
              v-model="datasend.username"
              type="text"
            />
          </div>
          <div class="form-row-item">
            <label class="form-label">Парол</label>
            <input
              class="form-control"
              v-model="datasend.password"
              type="password"
            />
          </div>
          <div class="form-row-item">
            <label class="form-label">Парол тасдиқлаш</label>
            <input
              class="form-control"
              @change="Changeparol()"
              v-model="datasend.confirm_password"
              type="password"
            />
          </div>
          <div class="form-row-item checkbox-row">
            <label class="form-label">Мобил Кирим</label>
            <input
              class="form-check-input"
              v-model="datasend.mobile_prixod"
              type="checkbox"
            />
          </div>
          <div class="form-row-item checkbox-row">
            <label class="form-label">Мобил Чиқим</label>
            <input
              class="form-check-input"
              v-model="datasend.mobile_rasxod"
              type="checkbox"
            />
          </div>
          <div class="form-row-item checkbox-row">
            <label class="form-label">Мобил Тан Нарх</label>
            <input
              class="form-check-input"
              v-model="datasend.mobile_tan_narx"
              type="checkbox"
            />
          </div>
        </div>

        <div class="form-section-right">
          <h6 class="section-title">
            Хуқуқ
            <button type="button" class="btn btn-select-all" @click="Clickall()">
              <i class="bi bi-check-all me-1"></i>Барчасини белгилаш
            </button>
          </h6>
          <div class="table-container">
            <div class="custom-card">
              <div class="card-content-table">
                <table class="table custom-table table-bordered">
                  <thead>
                    <tr>
                      <th>Номи</th>
                      <th class="text-center">Кўриш</th>
                      <th class="text-center">Очиш</th>
                      <th class="text-center">Ўзгартириш</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in datasend.rules" :key="index">
                      <td>{{item.doc_for_rule.name}}</td>
                      <td class="text-center"><input type="checkbox" v-model="item.see"></td>
                      <td class="text-center"><input type="checkbox" v-model="item.open"></td>
                      <td class="text-center"><input type="checkbox" v-model="item.change"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  name: "user-form",
  components: {
    vSelect
  },
  data() {
    return {
      filter: "",
      skladlist: [],
      stafflist: [],
      skladhave: false
    };
  },
  props: ["datasend"],
  created() {
    let self = this;
    self.$root.userComponent = self;
  },
  mounted() {
    this.Skladlist();
    this.Stafflist();
    this.Focus();
  },
  methods: {
    Clickall() {
      this.datasend.rules.forEach(item => {
        item.change = true;
        item.open = true;
        item.see = true;
      });
    },
    Skladlist() {
      axios.get("api/v1/sklads").then(response => {
        this.skladlist = response.data;
      });
    },
    Stafflist() {
      axios.get("api/v1/staff").then(response => {
        this.stafflist = response.data;
      });
    },
    Productlistfolder(skladId) {
      console.log('Sklad tanlandi:', skladId);
    },
    Changeparol() {
      if (this.datasend.password !== this.datasend.confirm_password) {
        this.$toast.error("Парол тасдиқланмади"); // Xatolikni toastda ko'rsatish
      }
    },
    Focus() {
      this.$refs.focused?.focus();
    },
    Savedokument() {
      const formattedRules = this.datasend.rules.map(rule => ({
        doc_for_rule_id: rule.doc_for_rule_id,
        see: rule.see,
        open: rule.open,
        change: rule.change
      }));

      const payload = {
        ...this.datasend,
        rules: formattedRules
      };

      let method, action;
      if (this.$route.path === "/user/create") {
        method = "post";
        action = "api/v1/users";
      } else {
        method = "patch";
        action = "api/v1/users/id/" + this.$route.params.id;
      }

      this.$axios({
        method,
        url: action,
        data: payload
      })
      .then(response => {
        console.log("Saqlandi:", response.data);
        this.$router.push({ path: "/users" });
      })
      .catch(err => {
        console.error("Xatolik:", err.response?.data || err);
        const errorMessage = err.response?.data?.message || "Маьлумотларни сақлашда хатолик юз берди!";
        this.$toast.error(errorMessage); // Xatolikni toastda ko'rsatish
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-form-container {
  background-color: #f0f2f5;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.user-form-card {
  background-color: #e9eff6;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 30px 40px;
  width: 100%;
  max-width: 1400px;
  position: relative;
}

.form-header-actions {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.btn-save {
  background-color: #4CAF50;
  border-color: #4CAF50;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 15px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.btn-save:hover {
  background-color: #45a049;
  border-color: #45a049;
  transform: translateY(-1px);
}

.btn-cancel-link {
  text-decoration: none;
}

.btn-cancel {
  background-color: #f44336;
  border-color: #f44336;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 15px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.btn-cancel:hover {
  background-color: #da332a;
  border-color: #da332a;
  transform: translateY(-1px);
}

.form-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 50px;
}

.form-section-left {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row-item {
  display: grid;
  grid-template-columns: 180px 1fr;
  align-items: center;
  gap: 20px;
}

.form-label {
  color: #555;
  font-weight: 500;
  text-align: right;
  padding-right: 10px;
  white-space: nowrap;
  font-size: 16px;
}

.form-control {
  width: 100%;
  padding: 10px 14px;
  height: 42px;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background-color: #fcfdfe;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  border-color: #8dbde7;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
  outline: none;
}

.checkbox-row {
  grid-template-columns: 180px auto;
  align-items: center;
}

.form-check-input {
  width: 20px;
  height: 20px;
  border: 1px solid #cdd5df;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 0;
  flex-shrink: 0;
}
.form-check-input:checked {
  background-color: #4A90E2;
  border-color: #4A90E2;
}

.custom-v-select {
  width: 100%;
}

.custom-v-select .vs__dropdown-toggle {
  background-color: #fcfdfe;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  padding: 8px 14px;
  min-height: 42px;
  align-items: center;
}
.custom-v-select .vs__selected-options {
  padding: 0;
  display: flex;
  align-items: center;
}
.custom-v-select .vs__selected {
  font-size: 16px;
  color: #333;
  margin: 0;
  padding: 0;
  line-height: normal;
}
.custom-v-select .vs__dropdown-menu {
  border: 1px solid #cdd5df;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  font-size: 16px;
}
.custom-v-select .vs__dropdown-option {
  padding: 10px 14px;
  color: #555;
}
.custom-v-select .vs__dropdown-option--highlight {
  background-color: #e0e9f3;
  color: #333;
}
.custom-v-select .vs__open-indicator {
  fill: #888;
}

.form-section-right {
  display: flex;
  flex-direction: column;
}

.section-title {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
}

.btn-select-all {
  background-color: #6C7A89;
  border-color: #6C7A89;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.2s ease;
}
.btn-select-all:hover {
  background-color: #59646F;
  border-color: #59646F;
}

.table-container {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.custom-card {
  background-color: #fcfdfe;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-content-table {
  padding: 15px;
  overflow-y: auto;
  height: calc(100vh - 250px);
  min-height: 400px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #dbe2eb;
  padding: 12px;
  text-align: left;
  font-size: 15px;
  color: #333;
}

.custom-table thead th {
  background-color: #e0e9f3;
  color: #2c3e50;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f5f8fc;
}

.custom-table tbody tr:hover {
  background-color: #dbe4ef;
}

.custom-table input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  vertical-align: middle;
}

.text-center {
  text-align: center;
}
</style>