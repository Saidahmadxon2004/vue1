<template>
  <div class="content">
    <chiqim-form :bronlist="bronlist" :datas="dataall"></chiqim-form>
    <kontragent :datas="dataall">
    </kontragent>
    <sklad :datas="dataall"></sklad>
    <b-modal centered id="modal-bronlist" hide-footer  size="lg" style="float: right!important;" @hidden="Hide()">
      <md-card>
        <md-card-content>
          <table class="table table-bordered left">
            <thead>
              <tr>
                <th class="column1">№</th>
                <th class="column3">Склад</th>
                <th class="column3" >Клиент</th>
                <th class="column3">{{$t('Сони')}}</th>
                <th class="column3">Сумма</th>
                <th class="column3">{{$t('Вақт')}}</th>
              </tr>
            </thead>
            <tbody style="height: 44vh!important;">
                <tr  v-for="(item, index) in bronlist"
                  :key="index" @click="Bronselect(item,index)"  >
                  <td class="column1">{{ index + 1 }}</td>
                  <td class="column3">
                    <button type="button" class="atable"  v-if="item.sklad!=null">
                      {{ item.sklad.name }}
                    </button>
                  </td>
                  <td class="column3">
                    <button type="button" class="atable"  v-if="item.kontragent!=null">
                      {{ item.kontragent.name}}
                    </button>
                  </td>
                  <td class="column3">
                    <button type="button" class="atable"  >
                      {{ item.count_all }}
                    </button>
                  </td>
                  <td class="column3">
                    <button type="button" class="atable"  >
                      {{item.summa}}
                    </button>
                  </td>
                  <td class="column3">
                    <button type="button" class="atable"  >
                      {{ Datetime(item.created_at) }}
                    </button>
                  </td>
                </tr>
            </tbody>
          </table>
        </md-card-content>
      </md-card>
    </b-modal>
    <b-modal id="modal-close" centered>
      <h4>
        {{$t('Sizda saqlanmagan malumotlar mavjud. Saqlansinmi?')}}
      </h4>

      <template #modal-footer="{ ok, cancel, hide }">
        <button type="button" class="btn btn-success" style="margin-bottom: 16px;"
          @click="$root.$refs.rasxod.Savedokument('home')">{{$t('Да')}}</button>
        <button type="button" class="btn btn-danger" @click='Home()'>{{$t('Нет')}}</button>
        <button type="button" class="btn btn-primary" @click="cancel()">{{$t('Отмена')}}</button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import $ from "jquery";
import { ChiqimForm, Kontragent,Sklad } from "@/pages";
export default {
  components: { ChiqimForm, Kontragent,Sklad },
  watch: {
    dataall: {
      deep: true,
      handler(val, oldVal) {
        this.$store.state.saved += 1;
      }
    }
  },
  methods:{
    Hide() {
        let self = this;
        setTimeout(function (e) {
            $("#shtrix").focus();
        }, 100);
      },
    Bronselect(item,index){
        let self = this;
      axios({
        method: "get",
        url: "api/v1/bron/id/"+item.id
      }).then(function(response) {
        if(self.dataall.rasxod_table.length>0){
          self.Bronss();
        }
        self.dataall=response.data;
        self.dataall.shot_summa=0;
        self.Deletebron(item.id);
        self.bronlist.splice(index,1);
        self.Lastnumber();
      });
      },
      Bronss(){
        let self=this;
        axios({
            method: "post",
            url: "api/v1/bron",
            data: self.dataall
          }).then(function (response) {
            self.$store.state.saved = null;
            self.$root.$refs.rasxod.bronlist.push(response.data);
          });
      },
      Lastnumber(){
        let self=this;
        axios
        .get("api/v1/rasxod/last-number")
        .then(function(response) {
            self.dataall.number=response.data.number;
            self.$store.state.saved=null;
        });
      },
      Deletebron(id){
        let self=this;
        axios({
        method: "delete",
        url: "api/v1/bron/id/"+id
      }).then(function(response) {
        self.$bvModal.hide("modal-bronlist");
      });
      },
      Datetime(date) {
      var d = new Date(date * 1000);
      var dt = d.getDate();
      var month = d.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      if (dt < 10) {
        dt = "0" + dt;
      }

      return dt + "-" + month + "-" + d.getFullYear();
    },
    Bronlist(){
      let self = this;
      axios({
        method: "get",
        url: "api/v1/bron"
      }).then(function(response) {
        self.bronlist = response.data;
      });
    },
    Home() {
        this.$store.state.saved = null;
        this.$bvModal.hide('modal-close');
        this.$router.push({ name: "Чиқим" });
      }
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.saved < 2) {
      this.$store.state.saved = null;
      next();
    } else {
        this.$bvModal.show("modal-close");
    }
  },
  mounted:function(){
    this.Bronlist();
  },
  created: function() {
    let self=this;
    self.$root.$refs.rasxodcreate = self;
    axios
        .get("api/v1/rasxod/last-number")
        .then(function(response) {
            self.dataall.number=response.data.number;
            self.$store.state.saved=null;
        });
        axios
        .get("api/v1/dollar-exchange-rate/last")
        .then(function(response) {
            self.dataall.dollar_rate=response.data.rate;
            self.$store.state.saved=null;
        });
  }, 
  data() {
    return {
      bronlist:[],
      dataall: {
        dollar_rate:0,
        dollar_summa:0,
        refund_money:0,
        refund_money_dollar:0,
        sklad_id: parseInt(localStorage.getItem("sklad_id")),
        created_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        updated_at: new Date()
          .valueOf()
          .toString()
          .slice(0, 10),
        kontragent_id: 0,
        user_id: parseInt(localStorage.getItem("user_id")),
        pay_type_id: 1,
        price_type: "chakana",
        skidka_summa: 0,
        summa: 0,
        comment: "",
        cash_summa: 0,
        plastic_summa: 0,
        shot_summa: 0,
        count_all: 0,
        rasxod_table: []
      }
    };
  }
};
</script>
