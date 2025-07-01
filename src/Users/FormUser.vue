<template>
  <form>
    <md-card>
      <div style="float:right;margin-top:-18px;">
        <button type="button" class="mybtn btn saved" @click="Savedokument()">
          Сақлаш ва беркитиш <sup>ctrl+enter</sup>
        </button>
        <router-link class="mybtn btn" :to="{ path: '/users' }">
          <button type="button" class="closebutton">
            Чиқиш<sup>esc</sup>
          </button>
        </router-link>
      </div>
      <md-card-content>
        <div class="md-layout" style="width: 100%;">
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-4">
                  <label>Исми</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control"
                    ref="focused"
                    v-model="datasend.first_name"
                    type="text"
                  />
                </div>
                <div class="col-md-4">
                  <label>Фамилия</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control"
                    v-model="datasend.last_name"
                    type="text"
                  />
                </div>
                <div class="col-md-4">
                  <label>Почта</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control"
                    v-model="datasend.email"
                    type="email"
                  />
                </div>
                <div class="col-md-4">
                  <label>Склад</label>
                </div>
                <div class="col-md-8">
                  <v-select
                    :disabled="skladhave"
                    :clearable="false"
                    class="form-control-sm required md-input"
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
                <div class="col-md-4">
                  <label>Ходим</label>
                </div>
                <div class="col-md-8">
                  <v-select
                    :clearable="false"
                    class="form-control-sm required md-input"
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
                <div class="col-md-4">
                  <label>Maosh</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control"
                    v-model="datasend.salary"
                    type="text"
                  />
                </div><div class="col-md-4">
                  <label>Bonus</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control"
                    v-model="datasend.percent"
                    type="text"
                  />
                </div>
                <div class="col-md-4">
                  <label>Логин</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control"
                    v-model="datasend.username"
                    type="text"
                  />
                </div>
                <div class="col-md-4">
                  <label>Парол</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control"
                    v-model="datasend.password"
                    type="password"
                  />
                </div>
                <div class="col-md-4">
                  <label>Парол тасдиқлаш</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control"
                    @change="Changeparol()"
                    v-model="datasend.confirm_password"
                    type="password"
                  />
                </div>
                <div class="col-md-4">
                  <label>Мобил Кирим</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control-sm"
                    v-model="datasend.mobile_prixod"
                    type="checkbox"
                  />
                </div>
                <div class="col-md-4">
                  <label>Мобил Чиқим</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control-sm"
                    v-model="datasend.mobile_rasxod"
                    type="checkbox"
                  />
                </div>
                <div class="col-md-4">
                  <label>Мобил Тан Нарх</label>
                </div>
                <div class="col-md-8">
                  <input
                    class="form-control-sm"
                    v-model="datasend.mobile_tan_narx"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <h6>Хуқуқ <button type="button" class="btn mybtn" @click="Clickall()">Барчасини белгилаш</button></h6>
              <div class="table100percent">
                <md-card>
                  <md-card-content>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Номи</th>
                          <th>Кўриш</th>
                          <th>Очиш</th>
                          <th>Ўзгартириш</th>
                        </tr>
                      </thead>
                      <tbody style="height: 72vh !important;">
                        <tr v-for="(item, index) in datasend.rules" :key="index">
                          <td>{{item.doc_for_rule.name}}</td>
                          <td><input type="checkbox" v-model="item.see"></td>
                          <td><input type="checkbox" v-model="item.open"></td>
                          <td><input type="checkbox" v-model="item.change"></td>
                        </tr>
                      </tbody>
                    </table>
                  </md-card-content>
                </md-card>
              </div>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
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
      // Implement your logic here if needed
    },
    Changeparol() {
      if (this.datasend.password !== this.datasend.confirm_password) {
        this.$store.state.errors = "Парол тасдиқланмади";
      }
    },
    Focus() {
      this.$refs.focused?.focus();
    },
    Savedokument() {
  // rules ni barcha holatda yuborish (hatto false bo‘lsa ham)
  const formattedRules = this.datasend.rules.map(rule => ({
    doc_for_rule_id: rule.doc_for_rule_id,
    see: rule.see,
    open: rule.open,
    change: rule.change
  }));

  // payload
  const payload = {
    ...this.datasend,
    rules: formattedRules
  };

  // patch yoki post
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
  });
}

  }
};
</script>

<style lang="scss" scoped>
.mybtn {
  margin-left: 5px;
  padding: 5px 10px;
}
.saved {
  background-color: #4CAF50;
  color: white;
}
.closebutton {
  background-color: #f44336;
  color: white;
}
.table100percent {
  width: 100%;
  overflow-y: auto;
}
.form-control {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}
.md-card {
  margin: 15px;
  padding: 15px;
}
</style>