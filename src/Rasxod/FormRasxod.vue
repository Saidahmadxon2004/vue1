<template>
  <form>
    <!-- <div> -->
    <div class="row">
      <div class="logo">
        <a v-if="info==false" href="http://sellerpeak24.uz/" target="_blank" class="btn developer">
        </a>
        <button v-else class="btn developer" type="button" @click="infotext='Дастурчилар ҳақида маълумот!!!'">
        </button>
      </div>
      <div class="headerfirst">
        <div class="rowform">
          <!-- <div class="column5 topheader">
              <span>
                <label>Склад</label>
                <v-select v-if="$route.path == '/chiqim/create'" :disabled="skladhave" :clearable="false"
                  class="form-control-sm required md-input" :options="skladlist" v-model="datas.sklad_id"
                  :reduce="name => name.id" label="name" @input="Productlistfolder(datas.sklad_id,parent)">
                  <template #search="{attributes, events}">
                    <input class="vs__search" v-bind="attributes" v-on="events" />
                  </template>
                  <template #selected-option="{ name }">
                    {{ name }}
                  </template>
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      <em><b>{{ search }}</b></em>{{ $t("бўйича маьлумот йўқ") }}
                    </template>
                    <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
                  </template>
                </v-select>
                <input type="text" :disabled="true" :value="datas.sklad.name" class="table-input" v-else />
              </span>
            </div> -->
          <div class="column6 topheader text-center">
            <label class="toplabel" for="">{{$t('Жами сумма')}}</label>
            <div>
              <h3><b>{{datas.summa|numFormatuniversal}}</b></h3>
            </div>
          </div>
          <div class="column4 topheader text-center">
            <label class="toplabel" for="">{{$t('Скидка')}}</label>
            <div>
              <h3><b>{{datas.skidka_summa|numFormatuniversal}}</b></h3>
            </div>
          </div>
          <div class="column6 topheader text-center">
            <label class="toplabel" for="">{{$t("Тўлов")}} сумма</label>
            <div>
              <h3><b>{{real_summa > 0 ? $options.filters.numFormatuniversal(real_summa) : 0}}</b></h3>
            </div>
          </div>
          <div class="column5 topheader" v-if="!touch">
            <label class="toplabel" style="width: 100%; text-align: center;">Штрих</label>
            <input :disabled="changedisabled" type="text" class="table-input" id="shtrix" v-model="newitem.shtrix_kod"
              style="height: 43px; background: #F7F9FA !important;" />
          </div>
        </div>
      </div>
      <div class="switchbutton">
        <md-switch @change="Sensorchange()" v-model="touch" class="mr-1 mb-1"></md-switch>
        <label>Сенсор</label>
      </div>
      <div style="width: 85px;" class="hand selectbutton" v-if="!touch">
        <span>
          <!-- <label>{{ $t("Нарх тури") }}</label> -->
          <v-select :disabled="changedisabled" :clearable="false" class="form-control-sm required md-input mt-2"
            :options="pricetypelist" v-model="datas.price_type" :reduce="name => name.id" label="name"
            @input="ChangePricetype()">
            <template #selected-option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
            <template #option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
          </v-select>
        </span>
        <span>
          <!-- <label>{{ $t("Тўлов тури") }}</label> -->
          <v-select :disabled="changedisabled" :clearable="false" class="form-control-sm required md-input mt-2"
            :options="paytypelist" @input="Productlistfolder(datas.sklad_id,parent),ChangePricetype()"
            v-model="datas.pay_type_id" :reduce="name => name.id" label="name">
            <template #selected-option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
            <template #option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
          </v-select>
        </span>
      </div>
      <button v-if="touch==true" :disabled="changedisabled" class="btn productbutton" id="tovar" type="button"
        @click="Tovarlistnew()">
        <b-icon icon="search"></b-icon>Товар<sup>F3</sup>
      </button>
      <div class="end" style="width: 80px;">
        <router-link class="btn btn-danger xhome" :to="{ path: '/chiqim/index' }">
          <button type="button" class="closebutton">
            <b-icon icon="x-circle"></b-icon>
          </button>
        </router-link>
      </div>
    </div>
    <!-- <div class="headerhref"> -->
    <!-- <b class="watch">{{ time }}</b> -->
    <!-- <label>Сумма</label> -->
    <!-- {{ datas.summa | numFormat }} -->
    <!-- <h3 style="color: #3f51b5;"> -->
    <!-- <span v-if="datas.id">№ {{ datas.id }}</span> -->
    <!-- </h3> -->
    <!-- </div> -->
    <div class="row">
      <div class="col-md-5 pr_list" v-if="($route.params.id==undefined || changedisabled==false) && touch == false">
        <div class="table100percent">
          <md-card>
            <md-card-content>
              <input type="text" id="f10" class="form-control searchtable" v-bind:placeholder="$t('Қидирув') + '(F10)'"
                v-model="filter" ref="focused" @input="onInput"
                data-layout="numeric" />
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="column1"></th>
                    <th style="width: 45%;">{{ $t("Номи") }}</th>
                    <th class="column3">{{ $t("Қолдиқ") }}</th>
                    <th class="column3" v-if="datas.price_type == 'chakana'">{{ $t("Чакана") }} {{$t('Нарх')}}</th>
                    <th class="column3" v-if="datas.price_type == 'optom'">{{$t('Улгуржи')}} {{$t('Нарх')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <VueAutoVirtualScrollList :totalHeight="600" :defaultHeight="25" class="virtual"
                    style="width: 100%;height: calc(100vh - 255px)!important;">
                    <tr>
                      <span class="cursor" @click="Productlistfolder(datas.sklad_id,parent)">
                        <td class="column1">
                          <b-icon icon="arrow-left"></b-icon>
                        </td>
                        <!-- <td>{{ index + 1 }}</td> -->
                        <td style="width: 45%;">
                          <button type="button" class="atable gohome">
                            ..
                          </button>
                        </td>
                      </span>
                      <td class="column3"></td>
                      <td class="column3"></td>
                    </tr>
                    <tr v-for="(item, index) in productlistfolder" :style="{ height: `${index / 1000 + 10}px` }"
                      :key="index" @click="Clickproduct(item)" v-b-toggle="['collapse-'+item.id]"
                      :class="item.is_folder == true ? 'folderyellow' : ''">
                      <td class="column1">
                        <b-icon v-if="item.is_folder==true" icon="folder-fill"></b-icon>
                      <img  v-else-if="item.picture_name!='undefined'" :src="axios.defaults.baseURL+'/api/v1/uploads/'+item.picture_name" >
                      </td>
                      <td style="width: 45%;">
                        <button type="button" class="atable" style="text-align:left!important;">
                          {{ item.extra_name }}
                        </button>
                      </td>
                      <td class="column3 kol">
                        <button type="button" class="noborder" v-if="item.is_folder!=true">
                          {{ item.balance | numFormatuniversal }}
                        </button>
                      </td>
                      <td class="column3 kol" v-if="datas.price_type == 'chakana'">
                        <button type="button" class="noborder" v-if="item.price_register">
                          {{ item.price_register.chakana_price | numFormatuniversal }}
                        </button>
                      </td>
                      <td class="column3 kol" v-if="datas.price_type == 'optom'">
                        <button type="button" class="noborder" v-if="item.price_register">
                          {{ item.price_register.optom_price | numFormatuniversal }}
                        </button>
                      </td>
                    </tr>
                  </VueAutoVirtualScrollList>
                </tbody>
              </table>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <div
        :class="!touch && (changedisabled==false || $route.params.id==undefined)? 'col-md-7 pr_table' : 'touchtable'">
        <div class="table100percent">
          <md-card>
            <md-card-content id="tableId">
              <table class="table table-bordered right">
                <thead style="width: calc(100% - 9px)!important;">
                  <tr>
                    <th class="textbold column1 text-center">№</th>
                    <th class="textbold column2-5 font10">Штрих</th>
                    <th class="textbold column5">Товар</th>
                    <th class="textbold column1-5">{{ $t("Қолдиқ") }}</th>
                    <th class="textbold column1-5">{{$t('Пачка')}}</th>
                    <th class="textbold column1-5">{{$t('Штук')}}</th>
                    <th class="textbold column2">{{ $t("Нарх") }}</th>
                    <th class="textbold column2-5">Сумма</th>
                  </tr>
                </thead>
                <tbody style="overflow: hidden;">
                  <div :class="touch == true ? 'trade' : 'trade-hand'">
                    <tr v-for="(item, index) in datas.rasxod_table" :key="index" @click="ChangeIndex(index, item)">
                      <td class="column1 text-center" :style="[itemindex == index ? { background: '#baaaaa' } : {}]">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ index + 1 }}
                        </a>
                      </td>
                      <td class="column2-5" :style="[itemindex == index ? { background: '#baaaaa' } : {}]">
                        <a href="javascript:void(0)" class="savdolist font10">
                          {{ item.shtrix_kod }}
                        </a>
                      </td>
                      <td class="column5" :style="[itemindex == index ? { background: '#baaaaa' } : {}]">
                        <a href="javascript:void(0)" class="savdolist" v-if="item.product_id>0">
                          {{ Label(item.product_id) }}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]" class="column1-5 kol">
                        <a href="javascript:void(0)" class="savdolist font10">
                          {{ item.current_balance | numFormat }}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]" class="column1-5 kol">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ item.pack_count | numFormat3 }}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]" class="column1-5 kol">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ item.count | numFormatuniversal }}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]" class="column2 kol">
                        <a href="javascript:void(0)" class="savdolist">
                          {{item.price|numFormatuniversal}}
                        </a>
                      </td>
                      <td :style="[itemindex == index ? { background: '#baaaaa' } : {}]" class="kol column2-5">
                        <a href="javascript:void(0)" class="savdolist">
                          {{ item.summa|numFormatuniversal}}
                        </a>
                      </td>
                    </tr>
                  </div>
                  <tr class="footertr" v-if="info==false">
                    <td class="column1 text-center">
                      <b>{{ (itemindex == 0 && footer_prod == null) ? '': (itemindex + 1) }}</b>
                    </td>
                    <td colspan="3" class="column5">
                      <div style="height: 25px;">
                        <b>{{ Label(footer_prod!= null ? footer_prod.product_id : "") }}</b>
                      </div>
                    </td>
                    <td class="column1-5 kol">
                      <b>{{ footer_prod!= null ? $options.filters.numFormatuniversal(footer_prod.count) + " *" : ""}}</b>
                    </td>
                    <td class="column2 kol">
                      <b>{{ footer_prod!= null ? $options.filters.numFormatuniversal(footer_prod.price) + " =" : ""}}</b>
                    </td>
                    <td class="kol column2-5">
                      <b>{{ footer_prod!= null ? $options.filters.numFormatuniversal(footer_prod.summa) : ""}}</b>
                    </td>
                  </tr>
                  <tr v-else class="footertr">
                    <td colspan="7" style="padding-top:15px!important;text-align:center;">
                      <b>{{ $t(infotext) }}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <b-modal id="modal-tovarlistnew" centered hide-footer @shown="Shoved1" size="lg" style="float: right!important;"
        @hidden="Hide()">
        <md-card>
          <md-card-content>
            <input type="text" @focus="showtext" class="form-control searchtable" v-bind:placeholder="$t('Қидирув')"
              v-model="filter" @input="Productlistfolder(datas.sklad_id,parent)" id="inputtext" data-layout="normal" />
            <table class="table table-bordered left">
              <thead style="width: calc(100% - 10px)!important;">
                <tr>
                  <th class="column1">№</th>
                  <th>{{ $t("Номи") }}</th>
                  <th class="column2">{{ $t("Қолдиқ") }}</th>
                  <th class="column3" v-if="datas.price_type == 'chakana'">{{ $t("Чакана") }} {{$t("Нарх")}}</th>
                  <th class="column3" v-if="datas.price_type == 'optom'">{{ $t("Улгуржи") }} {{$t("Нарх")}}</th>
                </tr>
              </thead>
              <tbody style="overflow: hidden;height: 44vh!important;">
                <VueAutoVirtualScrollList :totalHeight="500" :defaultHeight="25" class="virtual"
                  style="width: 100%;height: 44vh!important;">
                  <tr>
                    <span class="cursor" @click="Productlistfolder(datas.sklad_id,parent)">
                      <td class="column1">
                        <b-icon icon="arrow-left"></b-icon>
                      </td>
                      <!-- <td>{{ index + 1 }}</td> -->
                      <td>
                        <button type="button" class="atable gohome">
                          ..
                        </button>
                      </td>
                    </span>
                    <td class="column2"></td>
                    <td class="column3"></td>
                  </tr>
                  <tr :style="{ height: `${index / 1000 + 10}px` }" v-for="(item, index) in filteredProduct"
                    :key="index" @click="Ostatkanew(item,'modal');"
                    :class="item.is_folder == true ? 'folderyellow' : ''">
                    <td class="column1">
                      <b-icon v-if="item.is_folder==true" icon="folder-fill"></b-icon>
                    </td>
                    <td>
                      <button type="button" class="atable">
                        {{ item.extra_name }}
                      </button>
                    </td>
                    <td class="column2" style="text-align: end;">
                      <button type="button" class="noborder">
                        {{ item.balance | numFormat}}
                      </button>
                    </td>
                    <td class="column3" style="text-align: end;" v-if="datas.price_type == 'chakana'">
                      <button type="button" class="noborder" v-if="item.price_register">
                        {{ item.price_register.chakana_price | numFormat }}
                      </button>
                    </td>
                    <td class="column3" style="text-align: end;" v-if="datas.price_type == 'optom'">
                      <button type="button" class="noborder" v-if="item.price_register">
                        {{ item.price_register.optom_price | numFormat }}
                      </button>
                    </td>
                  </tr>
                </VueAutoVirtualScrollList>
              </tbody>
            </table>
            <vue-touch-keyboard :options="options" :layout="layout1" :cancel="hide" :accept="accept"
              :input="inputtext" />
          </md-card-content>
        </md-card>
      </b-modal>
      <div class="touchmodule" v-if="touch == true && $route.params.id==undefined">
        <span>
          <input :disabled="changedisabled" type="text" class="form-control"
            style="margin:8px 0;box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);text-align: center;font-size: 14pt;"
            v-model="sensors" id="sensors" @focus="show1" />
          <span class="keyboardglobal">
            <vue-touch-keyboard :options="options" :layout="layout" :cancel="cancel" :accept="accept" :input="input" />
          </span>
          <div class="row mt-0">
            <!-- <div class="mycol-50">
              <button :disabled="changedisabled" type="button" class="btn touchbutton xsavdo" @click="Multiplication()">
              </button>
            </div> -->
            <div class="mycol-50">
              <button :disabled="changedisabled" type="button" class="btn touchbutton numeric" @click="Kod()">
              </button>
            </div>
            <div class="mycol-50">
              <button :disabled="changedisabled" type="button" class="btn touchbutton barcode" @click="Shtrixsearch()">
              </button>
            </div>
            <div class="mycol-50">
              <button :disabled="changedisabled" type="button" class="btn touchbutton pricing" @click="Narxsearch()">
              </button>
            </div>
            <div class="mycol-100">
              <button type="button" class="btn touchbutton" @click="Panel()">
                <b>Панел</b>
              </button>
            </div>
            <div class="column5 selectbutton mt-2">
              <span>
                <!-- <label>{{ $t("Нарх тури") }}</label> -->
                <v-select :disabled="changedisabled" :clearable="false" class="form-control-sm required md-input mt-2"
                  :options="pricetypelist" v-model="datas.price_type" :reduce="name => name.id" label="name"
                  @input="ChangePricetype()">
                  <template #selected-option="{ name }">
                    <b>{{ $t(name) }}</b>
                  </template>
                  <template #option="{ name }">
                    <b>{{ $t(name) }}</b>
                  </template>
                </v-select>
              </span>
            </div>
            <div class="column5 selectbutton mt-2" style="margin-left: 70px">
              <span>
                <!-- <label>{{ $t("Тўлов тури") }}</label> -->
                <v-select :disabled="changedisabled" :clearable="false" class="form-control-sm required md-input mt-2"
                  :options="paytypelist" @input="Productlistfolder(datas.sklad_id,parent)" v-model="datas.pay_type_id"
                  :reduce="name => name.id" label="name">
                  <template #selected-option="{ name }">
                    <b>{{ $t(name) }}</b>
                  </template>
                  <template #option="{ name }">
                    <b>{{ $t(name) }}</b>
                  </template>
                </v-select>
              </span>
            </div>
            <!-- <div class="mycol-50">
              <button type="button" class="btn touchbutton" @click="Up()">
                <b-icon icon="arrow-up-square"></b-icon>
              </button>
            </div>
            <div class="mycol-50">
              <button type="button" class="btn touchbutton" @click="Down">
                <b-icon icon="arrow-down-square"></b-icon>
              </button>
            </div> -->
          </div>
        </span>
      </div>
      <div class="touchmodule" v-if='changedisabled==true && $route.params.id!=undefined'>
        <div class="row">
          <div class="information-table">
            <label>Клиент</label>
            <span>{{datas.kontragent != null ? datas.kontragent.name : ""}}</span>
          </div>
          <div class="information-table">
            <label>Курс</label>
            <span>{{NumberFormat(datas.dollar_rate, 0)}}</span>
          </div>
          <div class="information-table">
            <label>{{ $t('Нақд') }} $</label>
            <span>{{datas.dollar_summa|numFormat}}</span>
          </div>
          <div class="information-table">
            <label>{{ $t('Нақд') }}</label>
            <span>{{datas.cash_summa|numFormat}}</span>
          </div>
          <div class="information-table">
            <label>{{ $t("Пластик") }}</label>
            <span>{{datas.plastic_summa|numFormat}}</span>
          </div>
          <div class="information-table">
            <label>Перечесления</label>
            <span>{{datas.shot_summa|numFormat}}</span>
          </div>
          <div class="information-table">
            <label>{{ $t("Қайтим") }} $</label>
            <span>{{datas.refund_money_dollar|numFormat}}</span>
          </div>
          <div class="information-table">
            <label>{{ $t("Қайтим") }} сўм</label>
            <span>{{datas.refund_money|numFormat}}</span>
          </div>
          <div class="information-table">
            <label>{{ $t("Изоҳ") }}</label>
            <span>{{datas.comment}}</span>
          </div>
          <div class="mycol-75">
            <button type="button" class="btn touchbutton" @click="OldCheck(datas.id)">
              <b-icon icon="printer"></b-icon><b>Чек</b>
            </button>
          </div>
          <div class="mycol-75">
            <button type="button" class="btn touchbutton" @click="A4Print(datas.id)">
              <b-icon icon="printer"></b-icon><b>A4</b>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-12 buttom touchfooter px-0">
        <b-spinner smal v-if="sending"></b-spinner>
        <!-- home icon start -->
        <button type="button" v-if="info==false" class="btn touchbutton chiqimindex closebutton"
          @click="Closepage('/chiqim/index')">
        </button>
        <!-- <router-link v-if="info==false" class="btn touchbutton chiqimindex" :to="{ path: '/chiqim/index' }"> -->
        <!-- </router-link> -->
        <button v-else class="btn touchbutton chiqimindex" type="button" @click="infotext='Савдо ойнасидан чиқиш'">
        </button>
        <!-- home icon end -->
        <!-- dir back icon start -->
        <button class="btn touchbutton chiqimindex2" type="button" @click="DailyTrade()">
        </button>
        <!-- dir back icon end -->
        <!-- x icon start -->
        <button style="width: 62px;" v-if="$route.path == '/chiqim/create'" type="button"
          class="btn touchbutton clearall" @click="Clear(1)">
        </button>
        <!-- x icon end -->

        <!-- down arrow start -->
        <router-link v-if="info==false" class="mybtn btn refund" :to="{ path: '/refund/create' }" target="_blank">
        </router-link>
        <button v-else class="btn mybtn refund" type="button"
          @click="infotext='Клиентлардан товар қайтариб олиш учун босилади бу ҳолатда остаток текширилмайди'">
        </button>
        <!-- down arrow end -->
        <!-- people icon start -->
        <button class="btn touchbutton paid" v-if="$route.path == '/chiqim/create'" type="button" @click="ClientPay()">
        </button>
        <!-- people icon end -->

        <!-- trash icon start -->
        <button :disabled="changedisabled" type="button" style="width:62px" id="del" class="btn touchbutton trashbin"
          @click="Trashitem(itemindex)">
          <sup>Del</sup>
        </button>
        <!-- trash icon end -->
        <!-- plus icon start -->
        <button :disabled="changedisabled" type="button" style="width:62px" id="plus" class="btn touchbutton plusbtn"
          @click="Plus(itemindex)">
        </button>
        <!-- plus icon end -->
        <!-- minus icon start -->
        <button :disabled="changedisabled" type="button" style="width:62px" id="minus" class="btn touchbutton minusbtn"
          @click="Minus(itemindex)">
        </button>
        <!-- minus icon end -->
        <!-- box up start -->
        <button v-if="$route.path == '/chiqim/create'" type="button" style="width:62px" id="expection"
          class="btn touchbutton setojidaniya" @click="Expectation()">
          <abbr :title="$t('Ojidaniyaga kiritish')">
          </abbr>
        </button>
        <!-- box up end -->
        <!-- box down start -->
        <button v-if="$route.path == '/chiqim/create'" type="button" style="width:62px"
          class="btn touchbutton showojidaniya" @click="Showojidaniya()">
          <abbr :title="$t('Ojidaniyalar royxati')">
          </abbr>
        </button>
        <!-- box down end -->

        <!-- mobile start -->
        <button v-if="$route.path == '/chiqim/create'" type="button" class="btn touchbutton mobile" @click="Mobile()">
        </button>
        <!-- mobile end -->

        <!-- <button type="button" class="btn mybtn addrow" @click="Addtable()">
          {{ $t("Қўшиш") }}<sup>F1</sup>
        </button> -->

        <button style="width: 62px;" :style="info == true ? 'background-color:red!important' : ''" type="button"
          class="btn touchbutton info" @click="Info()">
        </button>
        <!-- pay icon start -->
        <button :disabled="changedisabled" class="btn cashpay" id="f12" type="button" @click="Showpay()">
          <sup>F12</sup>
        </button>
        <button class="btn mybtn" type="button" v-b-modal.modal-settings>
          <b-icon icon="gear"></b-icon>
        </button>
        <button class="btn mybtn" type="button" @click="Productlistfolder(datas.sklad_id,0)">
          <b-icon icon="arrow-repeat"></b-icon>
        </button>
        <button class="btn mybtn" v-if='$route.params.id!=undefined' type="button" @click="Savedokument('saqlash')">
          {{$t('Сақлаш')}}
        </button>
        <button class="btn mybtn" v-if='$route.params.id!=undefined' type="button" @click="downloadExl()">
          <b-icon icon="cloud-download"></b-icon> Excel
        </button>
        <v-select filled style="width: 200px!important;float: right;" class="form-control-sm required md-input mt-2 userddd" :clearable="false" :disabled="changedisabled" :options="userlist"
        v-model="datas.user_id" :reduce="username=> username.id" label="username" :placeholder="$t('Ходимни танланг...')">
      </v-select> 
        <button type="button" v-if="$route.params.id!=undefined && settedrule.change==true" @click="Change()"
          class="btn btn-primary change">{{$t('Ўзгартириш')}}</button>
        <!-- pay icon end -->
      </div>
    </div>
    <b-modal id="modal-settings" centered hide-footer size="xl" @hidden="SaveSettings()">
      <div class="row">
        <div class="col-md-4">
          <label>{{ $t("Нарх тури") }}</label>
        </div>
        <div class="col-md-8">
          <v-select :clearable="false" class="form-control-sm required md-input mt-2" :options="pricetypelist"
            v-model="settings.price_type" :reduce="name => name.id" label="name">
            <template #selected-option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
            <template #option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
          </v-select>
        </div>
        <div class="col-md-4">
          <label>{{ $t("Тўлов тури") }}</label>
        </div>
        <div class="col-md-8">
          <v-select :clearable="false" class="form-control-sm required md-input mt-2" :options="paytypelist"
            v-model="settings.pay_type_id" :reduce="name => name.id" label="name">
            <template #selected-option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
            <template #option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
          </v-select>
        </div>
        <div class="col-md-4">
          <label>{{ $t("Фокус") }}</label>
        </div>
        <div class="col-md-8">
          <v-select :clearable="false" class="form-control-sm required md-input mt-2" :options="focuslist"
            v-model="settings.focus" :reduce="name => name.id" label="name">
            <template #selected-option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
            <template #option="{ name }">
              <b>{{ $t(name) }}</b>
            </template>
          </v-select>
        </div>
        <div class="col-md-4">
          <label>Сенсор</label>
        </div>
        <div class="col-md-8">
          <div>
            <md-switch @change="Sensorchange()" v-model="settings.touch" class="mr-1 mb-1"></md-switch>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal id="modal-pay" centered hide-footer size="lg" @shown="Shoved" @hidden="Hide()">
      <form>
        <div class="row paymodal paybutton">
          <div class="col-md-12">
            <div class="rowform">
              <div class="column5 topheader text-center">
                <span>
                  <label class="toplabel">Сумма</label>
                  <!-- <input type="text" readonly class="table-input" :value="datas.summa | numFormat"> -->
                  <h5><b>{{$options.filters.numFormatuniversal(datas.summa)}}</b></h5>
                </span>
              </div>
              <div class="column4 topheader text-center">
                <span>
                  <label class="toplabel">Скидка</label>
                  <!-- <input type="text" readonly class="table-input" :value="datas.skidka_summa | numFormat"> -->
                  <h5><b>{{$options.filters.numFormatuniversal(datas.skidka_summa)}}</b></h5>
                </span>
              </div>
              <div class="column5 topheader text-center">
                <span>
                  <label class="toplabel">{{$t('Тўлов')}} cумма</label>
                  <!-- <input type="text" v-if="tolov_summa>0" readonly class="table-input"
                    :value="tolov_summa | numFormat">
                  <input type="text" v-else readonly class="table-input" :value="0"> -->
                  <h5><b>{{tolov_summa > 0 ? $options.filters.numFormatuniversal(tolov_summa) : 0}}</b></h5>
                </span>
              </div>
              <div class="column3 topheader text-center">
                <span>
                  <label class="toplabel" @click="DollarKurs()"
                    style="background: #0764ac;color: white!important;padding: 2px 20px;border-radius: 9px;cursor: pointer;"
                    for="">Курс</label>
                  <input type="text" :disabled="changedisabled" class="table-input kol textbold"
                    v-model="datas.dollar_rate">
                </span>
              </div>
              <div class="column3 topheader text-center">
                <span>
                  <label class="toplabel" for="">Факт №</label>
                  <input :disabled="changedisabled" type="number" class="input100" v-model="datas.number">
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-7 pr-0">
            <div class="row paybutton">
              <div class="col-md-6">
                <v-select :disabled="changedisabled" class="form-control-sm required md-input mt-2"
                  :options="kontragentlist" v-model="datas.kontragent_id" :reduce="name => name.id" label="name"
                  :placeholder="$t('Клиентни танланг...')" @input="Kontragentchange()">
                  <template #search="{attributes, events}">
                    <input class="vs__search" v-bind="attributes" v-on="events" />
                    <button type="button" class="modallist" v-b-modal.modal-kontragentlist>
                      <b-icon icon="three-dots"></b-icon>
                    </button>
                  </template>
                  <template #list-footer>
                    <li style="text-align: center;font-weight:bold;">
                      f4 {{ $t("умумий рўйхат") }}
                    </li>
                  </template>
                  <template #selected-option="{ name }">
                    <div>
                      <abbr :title="name">{{ name }}</abbr>
                    </div>
                  </template>
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      <em><b>{{ search }}</b></em>
                      {{ $t("бўйича маьлумот йўқ") }}
                      <button type="button" class="pluss" @click="kontragent.name = search" v-b-modal.modal-kontragent>
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
                  </template>
                </v-select>
              </div>
              <div class="col-md-3">
                <input type="date" v-model="pay_date_pay" @change="Changetimepay()" class="form-control"
                  style="font-size: 13px;padding: 0;margin: 8px;">
              </div>
              <div class="col-md-3" style="padding:0 0px 0 10px!important;font-size:11px">
                <div class="row">
                  <div class="col-md-3">
                    <span>Сўм</span>
                  </div>
                  <div class="col-md-9 end" style="border-bottom:1px outset!important;">
                    <span>{{current_total | numFormatuniversal}}</span>
                  </div>
                  <div class="col-md-3">
                    <span>Доллар</span>
                  </div>
                  <div class="col-md-9 end" style="border-bottom:1px outset!important;">
                    <span>{{current_total_dollar | numFormatuniversal}}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <button type="button" class="btn mybtn" @click="F8button()">{{ $t("Нахд") }} $ <sup
                    class="float-right mr-1 mt-2 p-0">F8</sup></button>
              </div>
              <div class="col-md-8 end payrowborder">
                {{datas.dollar_summa|numFormatuniversal}}
              </div>
              <div class="col-md-4">
                <button type="button" class="btn mybtn" @click="F5button()">{{ $t("Нахд") }} <sup
                    class="float-right mr-1 mt-2 p-0">F5</sup></button>
              </div>
              <div class="col-md-8 end payrowborder">
                {{datas.cash_summa|numFormatuniversal}}
              </div>
              <div class="col-md-4">
                <button type="button" class="btn mybtn" @click="F6button()">{{ $t("Пластик") }} <sup
                    class="float-right mr-1 mt-2 p-0">F6</sup></button>
              </div>
              <div class="col-md-8 end payrowborder">
                {{datas.plastic_summa|numFormatuniversal}}
              </div>
              <div class="col-md-4">
                <button type="button" class="btn mybtn" @click="Shotbutton()">Перечесления<sup
                    class="float-right mr-1 mt-2 p-0"></sup></button>
              </div>
              <div class="col-md-8 end payrowborder">
                {{datas.shot_summa|numFormatuniversal}}
              </div>
              <div class="col-md-4">
                <button type="button" @click="Qaytim('dollar')" class="mybtn btn btn-primary">{{$t('Қайтим')}} $ <span
                    v-if="tolov_summa<0">{{qaytimdollar|numFormatuniversal}}</span></button>
              </div>
              <div class="col-md-8 end payrowborder">
                {{datas.refund_money_dollar|numFormatuniversal}}
              </div>
              <div class="col-md-4">
                <button type="button" @click="Qaytim('som')" class="mybtn btn btn-primary">{{$t('Қайтим')}} cўм <span
                    v-if="tolov_summa<0">{{qaytimsom|numFormatuniversal}}</span></button>
              </div>
              <div class="col-md-8 end payrowborder">
                {{datas.refund_money|numFormatuniversal}}
              </div>
            </div>
          </div>
          <div class="col-md-5 pr-0">
            <div class="col-md-12">
              <!-- <vue-numeric  :format="customFormat"   v-model="pay"></vue-numeric> -->
              <!-- <div style="text-align: end;position:absolute;" class="form-control pay-input">{{pay|numFormat}}</div> -->
              <input type="text" ref="inputText2" @focus="show" v-model="pay" class="form-control pay-input">
              <!-- <input type="number" name="number" pattern="([0-9]{1,3}).([0-9]{1,3})" title="Must contain a decimal number"> -->
              <vue-touch-keyboard :options="options" :layout="layoutpay" :cancel="cancelpay" :accept="acceptpay"
                :input="input1" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3 mt-1">
                <textarea type="text" :disabled="changedisabled" :placeholder="$t('Изоҳ')" rows="2"
                  class="table-input pay-textarea" v-model="datas.comment"></textarea>
              </div>
              <div class="col-md-2">
                <button class="button-control button-back" :disabled="sending" type="button"
                  @click="Savedokument('a4print')">
                  <b-icon icon="printer"></b-icon> A4
                </button>
              </div>
              <div class="col-md-2">
                <button class="button-control button-back" id="chek" :disabled="sending" type="button"
                  @click="Savedokument('print')">
                  <b-icon icon="printer"></b-icon> Чек <sup class="float-right mt-3 p-0">F7</sup>
                </button>
              </div>
              <div class="col-md-4">
                <button class="button-control button-back" style="background-color:green!important;" :disabled="sending"
                  id="f9" type="button" @click="Savedokument('saqlash')">
                  <b-iconstack font-scale="1">
                    <b-icon stacked icon="x-lg" variant="danger"></b-icon>
                    <b-icon stacked icon="printer"></b-icon>
                  </b-iconstack>
                  <sup class="float-right mt-3 p-0">F9</sup>
                </button>
              </div>
              <div class="col-md-1">
                <button type="button" @click="Payzero()" class="button-control button-back"
                  style="background-color: red!important;">
                  <b-icon icon="trash" variant="white"></b-icon></button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal id="modal-count" centered hide-footer size="l" @shown="Shoved" @hidden="Hide()">
      <form v-if="tableindexcount!=null">
        <h4 v-if="datas.rasxod_table[tableindexcount].product_name!=undefined">{{
          datas.rasxod_table[tableindexcount].product_name }}</h4>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3" style="text-align: center;">
            <span for="" style="font-size: 12px;font-weight: bold;">{{ $t("Пачка") }}</span>
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-3" style="text-align: center;">
            <span for="" style="font-size: 12px;font-weight: bold;"><b>{{ $t("Штук") }}</b></span>
          </div>
          <div class="col-md-3 countmodal">
            <label for="">{{ $t("Нарх") }}</label>
            <label for="">{{ $t("Cони") }}</label><br>
            <label for="">{{ $t("Қолдиқ") }}</label><br>
            <label for="">Cумма</label><br>
          </div>
          <div class="col-md-3 countmodalinput">
            <div>
              <input type="text" class="form-control" @focus="show3"
                v-model="datas.rasxod_table[tableindexcount].pack_price" @input='Changepackprice(tableindexcount)' />
              <input class="form-control" type="text" @focus="show3"
                v-model="datas.rasxod_table[tableindexcount].pack_count" @input="Changepackcount(tableindexcount)"
                :style="
                datas.rasxod_table[tableindexcount].count > datas.rasxod_table[tableindexcount].current_balance ? 'color:red' : 'black'
              " />
              <input type="text" class="form-control needt" readonly
                :value="datas.rasxod_table[tableindexcount].current_balance/datas.rasxod_table[tableindexcount].pack_norma| numFormat" />
                <input type="text" class="form-control needt" @focus="show3"
                v-model="datas.rasxod_table[tableindexcount].summa" @input="Changesumma(tableindexcount)" />
            </div>
          </div>
          <div class="col-md-3">
            <br>
            <center v-if="datas.rasxod_table[tableindexcount].tan_narx">
              <!-- {{datas.rasxod_table[tableindexcount].tan_narx}} -->
              <!-- {{parseFloat(datas.rasxod_table[tableindexcount].price-datas.rasxod_table[tableindexcount].tan_narx).toFixed(2)}} -->
            </center>
            <br>
            <input style="text-align: center;" type="text" class="form-control needt" readonly
              :value="datas.rasxod_table[tableindexcount].pack_norma| numFormat" />
          </div>
          <div class="col-md-3 countmodalinput">
            <div>
              <input @focus="show3"
                :style="datas.rasxod_table[tableindexcount].tan_narx > datas.rasxod_table[tableindexcount].price ? 'color:red':''"
                type="text" class="form-control" v-model="datas.rasxod_table[tableindexcount].price"
                @input='Changeprice(tableindexcount)' />
              <input @focus="show3" class="form-control" ref="inputText2" type="text"
                v-model="datas.rasxod_table[tableindexcount].count" @blur="Ostatka(tableindexcount)" :style="
              datas.rasxod_table[tableindexcount].count > datas.rasxod_table[tableindexcount].current_balance ? 'color:red' : 'black'
            " />
              <input type="text" class="form-control needt" readonly
                :value="datas.rasxod_table[tableindexcount].current_balance | numFormat" />
                <input type="text" class="form-control needt" @focus="show3"
                v-model="datas.rasxod_table[tableindexcount].summa" @input="Changesumma(tableindexcount)"  />
            </div>
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary"
              @click="Ostatka(tableindexcount);$bvModal.hide('modal-count');">
              Сақлаш
            </button>
          </div>
          <vue-touch-keyboard style="width: 100%;" v-if="touch" :options="options" :layout="layout3" :input="input4" />
          <div class="col-md-12" style="display: flex;justify-content: center;align-items: center;">
            <img style="width: 300px;"  if="datas.rasxod_table[tableindexcount].product.picture_name!='undefined'" :src="axios.defaults.baseURL+'/api/v1/uploads/'+datas.rasxod_table[tableindexcount].product.picture_name" >
          </div>
        </div>
      </form>
    </b-modal>
    <!-- <b-modal id="modal-new" hide-footer size="xl" @shown="Shoved" @hidden="Hide()">
      <form>
        <h4>{{ newitem.product_name }}</h4>
        <div class="row">
          <div class="col-md-4">
            <label for="">{{ $t("Cони") }}</label>
          </div>
          <div class="col-md-8">
            <input class="form-control" ref="inputText2" type="number" v-model="newitem.count"
              @change="newitem.summa = newitem.price * newitem.count" :style="
                newitem.count > newitem.current_balance ? 'color:red' : 'black'
              " />
          </div>
          <div class="col-md-4">
            <label for="">{{ $t("Қолдиқ") }}</label>
          </div>
          <div class="col-md-8">
            <input type="text" class="form-control needt" readonly v-model="newitem.current_balance" />
          </div>
          <div class="col-md-4">
            <label for="">{{ $t("Нарх") }}</label>
          </div>
          <div class="col-md-8">
            <input :style="newitem.price < newitem.tan_narx ? 'color:red' : 'black'" class="form-control" type="number"
              v-model="newitem.price" @change="newitem.summa = newitem.price * newitem.count" />
          </div>
          <div class="col-md-4">
            <label for="">Сумма</label>
          </div>
          <div class="col-md-8">
            <input readonly class="form-control needt" type="number" v-model="newitem.summa" />
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" @click="Create()">
              Сақлаш
            </button>
          </div>
        </div>
      </form>
    </b-modal> -->
    <b-modal id="modal-shtrixnew" centered title="Товар" hide-footer size="xl" @shown="Shoved" @hidden="Hide()">
      <div class="row">
        <input type="text" v-if="touch==false" class="form-control searchtable" v-bind:placeholder="$t('Қидирув')"
          v-model="filter1" ref="inputText2" />
        <table class="table table-bordered">
          <thead>
            <tr>
              <!-- <th>№</th> -->
              <th>{{ $t("Номи") }}</th>
              <th>{{ $t("Қолдиқ") }}</th>
              <th>{{ $t("Чакана") }} {{ $t("Нарх") }}</th>
              <th>{{ $t("Улгуржи") }} {{ $t("Нарх") }}</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in filteredShtrix" :key="index">
            <tr @click="newitem.product_id = item.product_id;$bvModal.hide('modal-shtrixnew');Ostatkanew(item);">
              <!-- <td>{{ index + 1 }}</td> -->
              <td>
                <button type="button" class="atable">
                  {{ item.extra_name }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder">
                  {{ item.balance }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.price_register[0]">
                  {{ item.price_register[0].chakana_price|numFormat }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.price_register[0]">
                  {{ item.price_register[0].optom_price|numFormat }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
    <b-modal id="modal-narx" centered title="Товар" hide-footer size="xl" @shown="Shoved" @hidden="Hide()">
      <div class="row">
        <input type="text" v-if="touch==false" class="form-control searchtable" v-bind:placeholder="$t('Қидирув')"
          v-model="filter1" ref="inputText2" />
        <table class="table table-bordered">
          <thead>
            <tr>
              <!-- <th>№</th> -->
              <th>{{ $t("Номи") }}</th>
              <th>{{ $t("Қолдиқ") }}</th>
              <th>{{ $t("Чакана") }} {{ $t("Нарх") }}</th>
              <th>{{ $t("Улгуржи") }} {{ $t("Нарх") }}</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in filteredNarx" :key="index">
            <tr @click="newitem.product_id = item.product_id;$bvModal.hide('modal-narx');Ostatkanewnarx(item);">
              <!-- <td>{{ index + 1 }}</td> -->
              <td>
                <button type="button" class="atable">
                  {{ item.extra_name }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder">
                  {{ item.balance }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder">
                  {{ item.chakana_price|numFormat }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder">
                  {{ item.optom_price|numFormat }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
    <b-modal id="modal-shtrix" centered title="Товар" hide-footer size="xl" @shown="Shoved" @hidden="Hide()">
      <div class="row">
        <input type="text" class="form-control searchtable" v-bind:placeholder="$t('Қидирув')" v-model="filter1"
          ref="inputText2" />
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>№</th>
              <th>{{ $t("Номи") }}</th>
              <th>{{ $t("Қолдиқ") }}</th>
              <th>{{ $t("Чакана") }} {{ $t("Нарх") }}</th>
              <th>{{ $t("Улгуржи") }} {{ $t("Нарх") }}</th>
              <th>Штрих</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in filteredShtrix" :key="index">
            <tr
              @click="datas.rasxod_table[settedindex].product_id =item.product_id;$bvModal.hide('modal-shtrix');Ostatka(settedindex);">
              <td>{{ index + 1 }}</td>
              <td>
                <button type="button" class="atable">
                  {{ item.extra_name }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder">
                  {{ item.balance }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.price_register[0]">
                  {{ item.price_register[0].chakana_price|numFormat }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.price_register[0]">
                  {{ item.price_register[0].optom_price|numFormat }}
                </button>
              </td>
              <td>
                <button type="button" class="noborder" v-if="item.shtrix_table[0]">
                  {{ item.shtrix_table[0].shtrix_kod }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
    <b-modal id="modal-daily-trade" centered hide-footer size="lg" @shown="Shoved1" @hidden="Hide()">
      <md-card>
        <md-card-content>
          <!-- <input type="text" @focus="showtext" class="form-control searchtable" v-bind:placeholder="$t('Қидирув')" id="inputtext"
            data-layout="normal" /> -->
          <table class="table table-bordered">
            <thead style="width: calc(100% - 19px)!important;">
              <tr>
                <th class="column1 text-center">№</th>
                <th>{{$t("Савдо/Тўлов")}}</th>
                <th>{{ $t("Вақт") }}</th>
                <th>{{ $t("Ходим") }}</th>
                <th class="column1-5">Фак.</th>
                <th>Клиент</th>
                <th>{{$t("Тўлов")}} сумма</th>
                <th>{{ $t('Нақд') }} $</th>
                <th>{{ $t('Нақд') }}</th>
                <th>{{ $t("Пластик") }}</th>
                <th>Перечесления</th>
              </tr>
            </thead>
            <tbody>
              <div style="overflow-y: scroll; overflow-x: scroll; width: 100%;">
                <tr :style="{ height: `${index / 1000 + 10}px` }" v-for="(item, index) in dochistorylist" :key="index"
                  @click="ChangeDocIndex(index, item)">
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]" class="column1 text-center">{{index
                    + 1}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]">{{item.doc_type}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]">{{Datetime(item.created_at)}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]">{{username}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]" class="column1-5 kol">
                    {{item.number}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]">{{item.kontragent_name}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]" class="kol">
                    {{item.pay_summa|numFormat}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]" class="kol">{{item.dollar_summa |
                    numFormat}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]" class="kol">{{item.cash_summa |
                    numFormat}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]" class="kol">{{item.plastic_summa |
                    numFormat}}</td>
                  <td :style="[docindex == index ? { background: '#70aef5' } : {}]" class="kol">{{item.shot_summa |
                    numFormat}}</td>
                </tr>
              </div>
            </tbody>
            <tfoot>
              <div style="width: calc(100% - 19px)!important;">
                <tr>
                  <td colspan="6" style="width:55%!important;"><b>{{$t('Жами сумма')}}:</b></td>
                  <td class="kol" style="width:11%!important;"><b>{{history_pay_summa|numFormat}}</b></td>
                  <td class="kol" style="width:11%!important;"><b>{{history_cash_dollar|numFormat}}</b></td>
                  <td class="kol" style="width:10%!important;"><b>{{history_cash|numFormat}}</b></td>
                  <td class="kol" style="width:12%!important;"><b>{{history_plastik|numFormat}}</b></td>
                </tr>
              </div>
            </tfoot>
          </table>
          <div class="row">
            <div class="col-md-3">
              <button type="button" class="btn touchbutton z-report" @click="A4Print(docitem.id)">
                <b-icon icon="printer"></b-icon>
                A4 Копия
              </button>
            </div>
            <div class="col-md-3">
              <button type="button" class="btn touchbutton z-report" @click="OldCheck(docitem.id)">
                <b-icon icon="printer"></b-icon>
                Чек Копия
              </button>
            </div>
            <div class="col-md-3">
              <button type="button" class="btn touchbutton z-report" @click="ZReportNoCheck()">
                <b-iconstack font-scale="1">
                  <b-icon stacked icon="x-lg" variant="danger"></b-icon>
                  <b-icon stacked icon="printer"></b-icon>
                </b-iconstack> Z
              </button>
            </div>
            <div class="col-md-3">
              <button type="button" class="btn touchbutton z-report" @click="ZReportCheck()">
                <b-icon icon="printer"></b-icon>
                Z
              </button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </b-modal>
    <b-modal id="modal-client-pay" centered hide-footer size="lg" @shown="FocusToClient" @hidden="Hide()">
      <form>
        <div class="row paymodal paybutton">
          <div class="col-md-12">
            <div class="rowform">
              <div class="column6 topheader text-center">
                <span>
                  <label class="toplabel">Склад</label>
                  <v-select :clearable="false" class="form-control-sm required md-input" :options="skladlist"
                    v-model="client_pay.sklad_id" :reduce="name => name.id" label="name">
                    <template #search="{ attributes, events }">
                      <input class="vs__search" v-bind="attributes" v-on="events" aria-activedescendant="null" />
                    </template>
                    <template v-slot:no-options="{ search, searching }">
                      <template v-if="searching">
                        <em><b>{{ search }}</b></em>
                        {{ $t("бўйича маьлумот йўқ") }}
                      </template>
                      <em style="opacity: 0.5" v-else>{{ $t("Маьлумот йўқ") }}</em>
                    </template>
                  </v-select>
                </span>
              </div>
              <div class="column6 topheader text-center">
                <span>
                  <label class="toplabel">{{ $t("Тури") }}</label>
                  <v-select :clearable="false" class="form-control-sm" :options="typelist" v-model="client_pay.type"
                    :reduce="name => name.id" label="name" required="true"></v-select>
                </span>
              </div>
              <div class="column4 topheader text-center">
                <span>
                  <label class="toplabel" for="">Курс</label>
                  <input type="text" class="table-input kol textbold" v-model="client_pay.dollar_rate">
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-7 pr-0">
            <div class="row paybutton">
              <!-- kontragent -->
              <div class="col-md-8">
                <v-select class="form-control-sm required md-input mt-2" :options="kontragentlist"
                  v-model="client_pay.kontragent_id" :reduce="name => name.id" label="name"
                  :placeholder="$t('Клиентни танланг...')" @input="KontragentChangeClient()">
                  <template #search="{attributes, events}">
                    <input class="vs__search" v-bind="attributes" v-on="events" ref="focusedToClient" />
                    <button type="button" class="modallist" v-b-modal.modal-kontragentlist>
                      <b-icon icon="three-dots"></b-icon>
                    </button>
                  </template>
                  <!-- <template #list-footer>
                    <li style="text-align: center;font-weight:bold;">
                      f4 {{ $t("умумий рўйхат") }}
                    </li>
                  </template> -->
                  <template #selected-option="{ name }">
                    <div style="position:absolute; font-size: 11pt!important;">
                      {{ name }}
                    </div>
                  </template>
                  <!-- <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      <em><b>{{ search }}</b></em>
                      {{ $t("бўйича маьлумот йўқ") }}
                      <button type="button" class="pluss" @click="kontragent.name = search" v-b-modal.modal-kontragent>
                        +
                      </button>
                      <b>insert</b>
                    </template>
                    <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
                  </template> -->
                </v-select>
              </div>
              <!-- Ostatka -->
              <div class="col-md-4" style="padding:0 0px 0 10px!important;font-size:13px">
                <div class="row">
                  <div class="col-md-3">
                    <span>Сўм</span>
                  </div>
                  <div class="col-md-9 end" style="border-bottom:1px outset!important;">
                    <span>{{client_pay.current_total | numFormat}}</span>
                  </div>
                  <div class="col-md-3">
                    <span>Доллар</span>
                  </div>
                  <div class="col-md-9 end" style="border-bottom:1px outset!important;">
                    <span>{{client_pay.current_total_dollar | numFormat}}</span>
                  </div>
                </div>
              </div>
              <!-- tipoplata -->
              <div class="col-md-4">
                <label for="">{{ $t("Тўлов тури") }}</label>
              </div>
              <div class="col-md-8">
                <v-select :clearable="false" @input="Summachange()" class="form-control-sm required md-input"
                  :options="paytypelist" v-model="client_pay.pay_type_id" :reduce="name => name.id" label="name">
                  <template #list-footer>
                    <li style="text-align: center;font-weight:bold;">
                      f4 {{ $t("умумий рўйхат") }}
                    </li>
                  </template>
                  <template #search="{ attributes, events }">
                    <input class="vs__search" v-bind="attributes" v-on="events" />
                    <!-- <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-paytypelist
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </button> -->
                  </template>
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      <em><b>{{ search }}</b></em>
                      {{ $t("бўйича маьлумот йўқ") }}
                    </template>
                    <em style="opacity: 0.5" v-else>{{ $t("Маьлумот йўқ") }}</em>
                  </template>
                </v-select>
              </div>
              <!-- summa -->
              <div class="col-md-4">
                <label>Сумма</label>
              </div>
              <div class="col-md-8 end payrowborder">
                {{client_pay.summa|numFormat}}
              </div>
              <!-- tipoplata kassa -->
              <div class="col-md-4">
                <label for="">{{ $t("Тўлов тури") }} Касса</label>
              </div>
              <div class="col-md-8">
                <v-select :clearable="false" class="form-control-sm required md-input mt-1" :options="paytypelist"
                  @input="Summachange()" v-model="client_pay.pay_type_kassa" :reduce="name => name.id" label="name">
                  <template #list-footer>
                    <li style="text-align: center;font-weight:bold;">
                      f4 {{ $t("умумий рўйхат") }}
                    </li>
                  </template>
                  <template #search="{ attributes, events }">
                    <input class="vs__search" v-bind="attributes" v-on="events" />
                    <!-- <button
                      type="button"
                      class="modallist"
                      v-b-modal.modal-paytypelist
                    >
                      <b-icon icon="three-dots"></b-icon>
                    </button> -->
                  </template>
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      <em><b>{{ search }}</b></em>
                      {{ $t("бўйича маьлумот йўқ") }}
                      <!-- <button
                        type="button"
                        class="pluss"
                        @click="paytype.name = search"
                        v-b-modal.modal-paytype
                      >
                        +
                      </button> -->
                    </template>
                    <em style="opacity: 0.5" v-else>{{ $t("Маьлумот йўқ") }}</em>
                  </template>
                </v-select>
              </div>
              <!-- kassa summa -->
              <div class="col-md-4">
                <label>Касса Сумма</label>
              </div>
              <div class="col-md-8 end payrowborder">
                {{client_pay.kassa_summa|numFormat}}
              </div>
              <!-- tolov vaqti -->
              <div class="col-md-5">
                <label>{{$t('Тўлов вақти')}}</label>
              </div>
              <div class="col-md-7 payrowborder">
                <input type="date" v-model="pay_date_clientpay" @change="Changetime()">
              </div>
              <div class="col-md-12">
                <textarea type="text" :placeholder="$t('Изоҳ')" rows="2" class="table-input pay-textarea"
                  v-model="client_pay.comment"></textarea>
              </div>
            </div>
          </div>
          <div class="col-md-5 pr-0">
            <div class="col-md-12">
              <input type="text" ref="inputText2" id="clientinput" @focus="showclientpay" v-model="pay_client_input"
                class="form-control pay-input">
              <vue-touch-keyboard :options="options" :layout="layoutclientpay" :cancel="cancelclient"
                :accept="acceptpayclient" :input="inputpayclient" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3">
                <router-link class="button-control button-back" style="color:white!important;" target="_blank"
                  :to="{ path: '/xisobot/sverka/kontragent/null/null/null/null/dollar'}">
                  <b-icon icon="journal-check"></b-icon>Акт сверка
                </router-link>
              </div>
              <div class="col-md-2">
                <button class="button-control button-back" id="chek" :disabled="sending" type="button">
                  <b-icon icon="printer"></b-icon> A4
                </button>
              </div>
              <div class="col-md-2">
                <button class="button-control button-back" id="chek" :disabled="sending" type="button"
                  @click="CheckOplata()">
                  <b-icon icon="printer"></b-icon> Чек
                </button>
              </div>
              <div class="col-md-4">
                <button class="button-control button-back" style="background-color:green!important;" :disabled="sending"
                  id="f9" type="button" @click="SaveClientPay()">
                  <b-iconstack font-scale="1">
                    <b-icon stacked icon="x-lg" variant="danger"></b-icon>
                    <b-icon stacked icon="printer"></b-icon>
                  </b-iconstack>
                </button>
              </div>
              <div class="col-md-1">
                <button type="button" @click="ClientPayClear()" class="button-control button-back"
                  style="background-color: red!important;">
                  <b-icon icon="trash" variant="white"></b-icon></button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal id="modal-panel" centered hide-footer size="lg" @shown="Shoved" @hidden="Hide()">
      <button type="button" class="panel-back" @click="PanelFolder(datas.sklad_id, parent)">
        <b-icon icon="arrow-return-left" flip-v scale="1.8"></b-icon>
      </button>
      <md-card>
        <md-card-content>
          <div class="row">
            <div class="col-md-2" v-for="(item, index) in panel_folder" :key="index">
              <!-- folder box -->
              <button type="button" @click="PanelFolder(datas.sklad_id, item.id)" class="panel-button-child"
                v-if="item.folder_name != null">
                <b-icon icon="folder-fill" :style="'color:'+item.colour">
                </b-icon>
                <br>
                <span style="color:black">{{ item.folder_name}}</span>
              </button>
              <!-- product box -->
              <button type="button" class="panel-button-child" v-if="item.product != null"
                :style="'background-color:'+item.colour" @click="ProductPanel(item.product_id)">
                {{ item.product.extra_name }}
              </button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </b-modal>
  </form>
</template>

<script>
  var XLSX = require("xlsx");
  import debounce from 'lodash/debounce';
  var FileSaver = require("file-saver");
  import { print } from "../../components/mixins/print.js";
  import * as htmlToImage from "html-to-image";
  import VueAutoVirtualScrollList from "vue-auto-virtual-scroll-list";
  import $ from "jquery";
  export default {
    name: "ChiqimForm",
    components: { VueAutoVirtualScrollList },
    // directives: {mon},
    mixins: [print],
    data() {
      return {
        money: {
          decimal: ',',
          thousands: ' ',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false /* doesn't work with directive */
        },
        settings: { 'touch': true, pay_type_id: 1, price_type: 'chakana', focus: "shtrix" },
        narxlists: [],
        pay_date_pay: 0,
        pay_date_clientpay: 0,
        username: localStorage.getItem("username"),
        infotext: "",
        info: false,
        parent: 0,
        changedisabled: false,
        pay: 0,
        tableindexcount: null,
        visible: false,
        pricesettings: '',
        paytypelist: [],
        layout3: {
          _meta: {
            backspace: { func: "backspace", text: "Del", classes: "xbackspace" },
          },

          default: ["7 8 9", "4 5 6", "1 2 3", "0 . {backspace}"]
        },
        input4: null,
        layout1: {
          _meta: {
            "tab": { key: "\t", text: "Tab", width: 60, classes: "control" },
            "shiftl": { keySet: "shifted", text: "Shift", width: 100, classes: "control" },
            "shiftr": { keySet: "shifted", text: "Shift", width: 100, classes: "control" },
            "shiftlru": { keySet: "shifted_ru", text: "Shift", width: 100, classes: "control" },
            "shiftrru": { keySet: "shifted_ru", text: "Shift", width: 100, classes: "control" },
            "ru": { keySet: "default_ru", text: "ru", width: 40, classes: "control featured" },
            "eng": { keySet: "default", text: "eng", width: 40, classes: "control featured" },
            "caps": { keySet: "capsed", text: "Caps lock", width: 80, classes: "control" },
            "capsru": { keySet: "capsed_ru", text: "Caps lock", width: 80, classes: "control" },
            "space": { key: " ", text: "Space", width: 180 },
            "enter": { key: "\r\n", text: "Enter", width: 80, classes: "control" },
            "enter": { func: "enter", key: "\r\n", text: "Enter", width: 80, classes: "control" },
            "backspace": { func: "backspace", classes: "control backspace", width: 65 },
            "accept": { func: "accept", text: "Close", classes: "control" },
            "next": { func: "next", text: "Next", classes: "control featured" }
          },

          default: [
            "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} q w e r t y u i o p [ ] \\",
            "{caps} a s d f g h j k l ; ' {enter}",
            "{shiftl} z x c v b n m , . / {shiftr}",
            "{ru} {space} "
          ],
          shifted: [
            "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
            "{tab} Q W E R T Y U I O P { } |",
            "{caps} A S D F G H J K L : \" {enter}",
            "{shiftl} Z X C V B N M < > ? {shiftr}",
            "{ru} {space} "
          ],
          capsed: [
            "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} Q W E R T Y U I O P [ ] \\",
            "{caps} A S D F G H J K L ; ' {enter}",
            "{shiftl} Z X C V B N M , . / {shiftr}",
            "{ru} {space} "
          ],
          shifted_ru: [
            "Ё ! \" № ; % : ? * ( ) _ + {backspace}",
            "{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ |",
            "{capsru} Ф Ы В А П Р О Л Д Ж Э {enter}",
            "{shiftlru} Я Ч С М И Т Ь Б Ю , {shiftrru}",
            "{eng} {space} "
          ],
          default_ru: [
            "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} й ц у к е н г ш щ з х ъ \\",
            "{capsru} ф ы в а п р о л д ж э {enter}",
            "{shiftlru} я ч с м и т ь б ю . {shiftrru}",
            "{eng} {space} "
          ],
          capsed_ru: [
            "Ё 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ \\",
            "{capsru} Ф Ы В А П Р О Л Д Ж Э {enter}",
            "{shiftlru} Я Ч С М И Т Ь Б Ю . {shiftrru}",
            "{eng} {space} "
          ]
        },
        layout: {
          _meta: {
            backspace: { func: "backspace", text: "Del", classes: "xbackspace" },
            "accept": { func: "accept", text: "C", classes: "control trash" },
            "cancel": { func: "cancel", text: "X", classes: "control xsavdo" }
          },

          default: ["7 8 9", "4 5 6", "1 2 3", "0 . 00", "{cancel} {accept} {backspace}"]
        },
        layoutpay: {
          _meta: {
            backspace: { func: "backspace", text: "Del", classes: "xbackspace" },
            "accept": { func: "accept", text: "C", classes: "control xbackspace" },
            "cancel": { func: "cancel", classes: "percent" }
          },

          default: ["7 8 9", "4 5 6", "1 2 3", "0 . 00", "{cancel} {accept} {backspace}"]
        },
        layoutclientpay: {
          _meta: {
            backspace: { func: "backspace", text: "Del", classes: "xbackspace" },
            "accept": { func: "accept", text: "C", classes: "control xbackspace" },
            "cancel": { func: "cancel", classes: "gold" }
          },

          default: ["7 8 9", "4 5 6", "1 2 3", "0 . 00", "{cancel} {accept} {backspace}"]
        },
        pay_client_input: null,
        inputpayclient: $("#clientinput").target,
        input: $("#sensors").target,
        inputtext: $("#inputtext").target,
        input1: null,
        itemindex: 0,
        docindex: 0,
        docitem: null,
        footer_prod: null,
        keyboard: "",
        time: 0,
        options: {
          useKbEvents: false,
          preventClickEvent: true
        },
        sending: false,
        dataall: [],
        touch: false,
        sensors: "",
        kontragent: "",
        product_id: null,
        filter: "",
        filter1: "",
        focusout: "",
        shtrixlist: [],
        search2: "",
        newitem: {
          product_id: 0,
          count: 1,
          price: 0,
          summa: 0,
          shtrix_kod: "",
          product_name: "",
          pack_count: 1,
          pack_price: 0,
          pack_norma: 1
        },
        pricetypelist: [
          { id: "optom", name: "Оптом" },
          { id: "chakana", name: "Чакана" }
        ],
        focuslist: [
          { id: "shtrix", name: "Штрих код" },
          { id: "f10", name: "Номи" }
        ],
        userlist: [],
        settedindex: null,
        kontragentlist: [],
        current_total: 0,
        current_total_dollar: 0,
        skladlist: [],
        regionlist: [],
        productlistfolder: [],
        client_pay: {
          datetime: new Date()
            .valueOf()
            .toString()
            .slice(0, 10),
          user_id: parseInt(localStorage.getItem("user_id")),
          sklad_id: parseInt(localStorage.getItem("sklad_id")),
          kontragent_id: null,
          current_total: 0,
          summa: 0,
          pay_type_id: 1,
          current_total_dollar: 0,
          dollar_rate: 0,
          pay_type_kassa: 1,

          kassa_summa: 0,
          type: true,
          comment: ""
        },
        typelist: [
          { id: false, name: this.$t("Расход") },
          { id: true, name: this.$t("Кирим") }
        ],
        dochistorylist: [],
        history_pay_summa: 0,
        history_cash_dollar: 0,
        history_cash: 0,
        history_plastik: 0,
        history_shot: 0,
        panel_folder: []
      };
    },
    computed: {
      tochnost(){
        if(this.datas.pay_type_id==3){
          return 3;
        }else{
          return 2;
        }
      },
      tolov_summa() {
        var data = 0;
        if (this.datas.pay_type_id == 3) {
          data = this.datas.summa - this.datas.skidka_summa - this.datas.cash_summa / this.datas.dollar_rate - this.datas.plastic_summa / this.datas.dollar_rate - this.datas.shot_summa / this.datas.dollar_rate - this.datas.dollar_summa + this.datas.refund_money / this.datas.dollar_rate + this.datas.refund_money_dollar;
        } else {
          data = this.datas.summa - this.datas.skidka_summa - this.datas.cash_summa - this.datas.plastic_summa - this.datas.shot_summa - this.datas.dollar_summa * this.datas.dollar_rate + this.datas.refund_money + this.datas.refund_money_dollar * this.datas.dollar_rate;
        }
        return this.NumberFixed(data, 2);
      },
      real_summa() {
        return this.datas.summa - this.datas.skidka_summa;
      },
      qaytimsom() {
        var data = 0;
        if (this.tolov_summa < 0) {
          if (this.datas.pay_type_id == 3) {
            data = this.tolov_summa * this.datas.dollar_rate;
          } else {
            data = this.tolov_summa;
          }
        }
        return data;
      },
      qaytimdollar() {
        var data = 0;
        if (this.tolov_summa < 0) {
          if (this.datas.pay_type_id == 3) {
            data = this.tolov_summa;
          } else {
            data = this.tolov_summa / this.datas.dollar_rate;
          }
        }
        return data;
      },
      filteredProduct() {
        return this.productlistfolder;
          // .filter(row => {
          //   const name = row.extra_name.toString().toLowerCase();
          //   const searchTerm = this.filter.toLowerCase();
          //   return name.includes(searchTerm);
          // })
       //   .slice(0, 200);
      },
      paginated2() {
        let self = this;
        let search = self.search2;
        // if (search.length > 2) {
          return self.productlistfolder;
        // } else {
          // return self.productlistfolder.slice(0, 100);
        // }
      },
      Narxsearchcomputed() {
        return this.productlistfolder.filter(row => {
          if (row.price_register.body_price > 0) {
            if (row.price_register.chakana_price == this.sensors) {
              return row;
            }
          }
        });
      },
      filteredShtrix() {
        return this.shtrixlist.filter(row => {
          const name = row.extra_name.toString().toLowerCase();
          const searchTerm = this.filter1.toLowerCase();
          if (row.balance > 0) {
            return name.includes(searchTerm);
          }
        });
      },
      filteredNarx() {
        return this.narxlists.filter(row => {
          const name = row.extra_name.toString().toLowerCase();
          const searchTerm = this.filter1.toLowerCase();
          if (row.balance > 0) {
            return name.includes(searchTerm);
          }
        });
      }
    },
    props: ["datas", "bronlist"],
    created: function () {
      this.debouncedSearch = debounce(this.Productlistfolder, 500); // 500ms delay
      let self = this;
      self.Time();
      if (self.$route.path != "/chiqim/create") {
        self.changedisabled = true;
      }else{
        if (this.settedrule.change == false) {
          this.changedisabled = true;
        }
      }
      self.$root.$refs.rasxod = self;
      self.Pricesettings();
      self.Paytypelist();
      self.$root.$on("kontragentone", function (getdata) {
        self.kontragent = getdata;
      });
      self.$root.$on("kontragentall", function (getdata) {
        self.kontragentlist = getdata;
      });
      self.$root.$on("skladall", function (getdata) {
        self.skladlist = getdata;
      });
      axios
        .get("api/v1/dollar-exchange-rate/last")
        .then(function (response) {
          self.client_pay.dollar_rate = response.data.rate;
        });
      // self.Skladlist();
    },
    mounted: function () {
      setTimeout(() => {
        this.Focus();
        this.SetRule('/chiqim/index');
      self.Settings();
      }, 100);
      setInterval(() => {
        this.Userlists();
      }, 3000);
      let self = this;
      // if (localStorage.getItem("sensor") == "false") {
      // self.touch = false;
      // }
      $("input").focusout(function (e) {
        self.focusout = e.target;
      });
      $("body").on("keydown", "#shtrix", function (e) {
        if (e.keyCode == 13) {
          self.Shtrix_code();
        } else {
          return true;
        }
      });
      $("body").on("keydown", "#sensors", function (e) {
        if (e.keyCode == 13) {
          self.Shtrixsearch();
        } else {
          return true;
        }
      });
      $("body").on("keydown", ".savdolist", function (e) {
        var tr = $(this).parents("tr");
        var tbody = $(this).parents("tbody");
        var index = self.itemindex;
        if (e.keyCode == 40) {
          index = tbody.find("tr").index(tr) + 1;
          if (index > tbody.find("tr").length - 1) {
            index = 0;
          }
          tbody
            .find("tr")
            .eq(index)
            .find(".savdolist")
            .focus();
        } else if (e.keyCode == 38) {
          index = tbody.find("tr").index(tr) - 1;
          if (index < 0) {
            index = tbody.find("tr").length - 1;
          }
          tbody
            .find("tr")
            .eq(index)
            .find(".savdolist")
            .focus();
        }
        self.itemindex = index;
      });
      setTimeout(() => {
        if (self.datas.sklad_id > 0) {
          self.Productlistfolder(self.datas.sklad_id, self.parent);
        }
      }, 1000);
      $("body").keydown(function (e) {
        //+
        if (e.keyCode == 107) {
          self.Plus(self.itemindex);
          // $("#plus").click();
          return false;
          // f5 bosilsa
        } else if (e.keyCode == 109) {
          // $("#minus").click();
          self.Minus(self.itemindex);
          return false;
          // f5 bosilsa
        } else if (e.keyCode == 46) {
          $("#del").click();
          return false;
          // f5 bosilsa
        }
        // f3
        else if (e.keyCode == 114) {
          $("#tovar").click();
          return false;
          // f5 bosilsa
        } else if (e.keyCode == 116) {
          self.F5button();
          return false;
          // f6 bosilsa
        } else if (e.keyCode == 117) {
          self.F6button();
          return false;
        }
        // f7
        else if (e.keyCode == 118) {
          $("#chek").click();
          return false;
        }
        //f8
        else if (e.keyCode == 119) {
          self.F8button();
          return false;
        }
        // f9
        else if (e.keyCode == 120) {
          $("#f9").click();
          return false;
        } else if (e.keyCode == 121) {
          $('#f10').focus();
          return false;
        } else if (e.keyCode == 123) {
          $("#f12").click();
          return false;
        } else if (self.touch == true) {
          if ($(':focus').attr('id') != 'sensors') {
            $("#sensors").focus();
            return true;
          }
        }
        else {
          return true;
        }
        // return false;
      });
    },
    watch: {
      itemindex: function (val) {
        setTimeout(() => {
          $(".right")
            .find("tbody")
            .children()
            .scrollTop(999999);
        }, 400);
      },
      search: function (val) {
        this.changed = true;
      },
      'datas.pay_type_id': function (newVal, oldVal) {
        console.log('pay_type_id changed from', oldVal, 'to', newVal);
        console.trace(); 
      },
      'datas.rasxod_table': function () {
        this.footer_prod = this.datas.rasxod_table[this.datas.rasxod_table.length - 1];
      },
      dochistorylist: function () {
        this.docitem = this.dochistorylist[0];
      }
    },
    methods: {
      onInput() {
      this.debouncedSearch(this.datas.sklad_id, this.parent);
    },
      Userlists() {
      let self = this;
      axios
        .get("/api/v1/users/usernames/"+self.datas.sklad_id)
        .then(function(response) {
          self.userlist = response.data;
        });
    },
      customFormat(value) {
        // Custom format function
        return value + 1;
      },
      Mask() {
        var data = "###,###"
        if (this.pay < 1000) {
          data = '###,###';
        } else if (this.pay < 10000) {
          data = '# ###,###'
        }
        return data;
      },
      downloadExl() {
        setTimeout(() => {
          $('.footertr').css('display', 'none');
          let wb = XLSX.utils.table_to_book(document.getElementById("tableId")),
            wopts = {
              bookType: "xlsx",
              bookSST: false,
              type: "binary"
            };
          var wscols = [{ width: 5 }, { width: 13 }, { width: 28 }, { width: 15 }, { width: 15 }, { width: 13 }, { width: 13 }, { width: 13 }, { width: 13 }, { width: 13 }];
          wb.Sheets.Sheet1['!cols'] = wscols;
          let wbout = XLSX.write(wb, wopts);
          FileSaver.saveAs(
            new Blob([this.s2ab(wbout)], {
              type: "application/octet-stream;charset=utf-8"
            }),
            new Date() + ".xlsx"
          );
        }, 1000);
      },
      show3(e) {
        this.input4 = e.target;
      },
      Changepackprice(index) {
        let self = this;
        let item = self.datas.rasxod_table[index];
        item.price = item.pack_price / item.pack_norma;
         item.summa = item.price * item.count;
         self.Summa();
        // self.Changeprice(index);
      },
      Changepackcount(index) {
        let self = this;
        let item = self.datas.rasxod_table[index];
        item.count = item.pack_count * item.pack_norma;
        self.Ostatka(index);
      },
      Settings() {
        let self = this;
        axios({
          method: "post",
          url: "api/v1/sklad-settings",
          data: { sklad_id: localStorage.getItem('sklad_id'), key: 'rasxod' }
        }).then(function (response) {
          if (response.data.data == null) {
            self.SaveSettings();
          } else {
            self.settings = JSON.parse(response.data.data);
            self.datas.pay_type_id = self.settings.pay_type_id;
            self.datas.price_type = self.settings.price_type;
            if (self.settings.focus == undefined) {
              self.settings.focus = 'shtrix';
            }
            if (self.$route.params.id != undefined) {
              self.touch = self.settings.touch;
            } else {
              self.touch = self.settings.touch;
            }
          }
        });
      },
      SaveSettings() {
        let self = this;
        let stringsettings = JSON.stringify(self.settings);
        axios({
          method: "patch",
          url: "api/v1/sklad-settings",
          data: { sklad_id: localStorage.getItem('sklad_id'), key: 'rasxod', data: stringsettings }
        }).then(function (response) {
          self.touch = self.settings.touch;
        });
      },
      NumberFormat(number, decimalPlaces) {
        const factor = Math.pow(10, decimalPlaces);
        const truncatedNumber = Math.floor(number * factor) / factor;
        const integerPart = Math.trunc(truncatedNumber);
        const decimalPart = (truncatedNumber - integerPart).toFixed(decimalPlaces).substr(1);
        const formattedIntegerPart = integerPart.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }).replace(/,/g, ' ');;
        const formattedNumber = formattedIntegerPart + decimalPart;
        return formattedNumber;
      },
      NumberFixed(number, decimalPlaces) {
        const factor = Math.pow(100, decimalPlaces);
        const truncatedNumber = Math.floor(number * factor) / factor;
        return truncatedNumber;
      },
      Info() {
        if (this.info == true) {
          this.info = false;
        } else {
          this.info = true;
          this.infotext = "Маълумот бериш жараёни бошланди!!!";
        }
      },
      Kontragentchange() {
        let self = this;
        self.current_total = 0;
        self.current_total_dollar = 0;
        if (self.datas.kontragent_id > 0) {
          axios({
            method: "get",
            url: "api/v1/kontragent/id/" + self.datas.kontragent_id,
          }).then(function (response) {
            if (response.data.payment_date > 0) {
              self.pay_date_pay = new Date(response.data.payment_date * 1000).toISOString().slice(0, 10);
            }
          });
        }
        axios({
          method: "post",
          url: "api/v1/kontragent/total",
          data: {
            kontragent_id: self.datas.kontragent_id,
            sklad_id: self.datas.sklad_id,
            datetime: self.datas.created_at
          }
        }).then(function (response) {
          response.data.forEach(element => {
            if (element.pay_type_id == 3) {
              self.current_total_dollar = element.total.toFixed(3);
            } else {
              self.current_total += element.total;
            }
          });
        });
      },
      Changetime() {
        let self = this;
        if (self.client_pay.kontragent_id > 0) {
          var date = new Date(self.pay_date_clientpay).valueOf().toString().slice(0, 10);
          axios
            .get("api/v1/kontragent/update/payment/id/" + self.client_pay.kontragent_id + "/date/" + date)
            .then(function (response) { });
        } else {
          self.pay_date_clientpay = 0;
          self.$store.state.errors = self.$t("Kontragent tanlamasdan vaqt belgilash mumkin emas");
        }
      },
      Changetimepay() {
        let self = this;
        if (self.datas.kontragent_id > 0) {
          var date = new Date(self.pay_date_pay).valueOf().toString().slice(0, 10);
          axios
            .get("api/v1/kontragent/update/payment/id/" + self.datas.kontragent_id + "/date/" + date)
            .then(function (response) { });
        } else {
          self.pay_date_pay = 0;
          self.$store.state.errors = self.$t("Kontragent tanlamasdan vaqt belgilash mumkin emas");
        }
      },
      KontragentChangeClient() {
        let self = this;
        self.client_pay.current_total = 0;
        self.client_pay.current_total_dollar = 0;
        if (self.client_pay.kontragent_id > 0) {
          axios({
            method: "get",
            url: "api/v1/kontragent/id/" + self.client_pay.kontragent_id,
          }).then(function (response) {
            if (response.data.payment_date > 0) {
              self.pay_date_clientpay = new Date(response.data.payment_date * 1000).toISOString().slice(0, 10);
            }
          });
          axios({
            method: "post",
            url: "api/v1/kontragent/total",
            data: {
              kontragent_id: self.client_pay.kontragent_id,
              sklad_id: self.client_pay.sklad_id,
              datetime: self.client_pay.datetime
            }
          }).then(function (response) {
            response.data.forEach(element => {
              if (element.pay_type_id == 3) {
                self.client_pay.current_total_dollar = element.total.toFixed(3);
              } else {
                self.client_pay.current_total += element.total;
              }
              $('#clientinput').focus();
            });
          });
        } else {
          self.pay_date_clientpay = 0;
        }
      },
      Summachange() {
        if (this.pay_client_input > 0) {
          this.client_pay.summa = this.pay_client_input;
          this.pay_client_input = null;
        }
        if (this.client_pay.pay_type_id == 3) {
          if (this.client_pay.pay_type_kassa == 3) {
            this.client_pay.kassa_summa = this.client_pay.summa;
          } else {
            this.client_pay.kassa_summa = this.client_pay.summa * this.client_pay.dollar_rate;
          }
          this.pay_client_input = null;
        } else {
          if (this.client_pay.pay_type_kassa != 3) {
            this.client_pay.kassa_summa = this.client_pay.summa;
          } else {
            this.client_pay.kassa_summa = this.client_pay.summa / this.client_pay.dollar_rate;
          }
          this.pay_client_input = null;
        }
      },
      DailyTrade() {
        if (this.info == true) {
          this.infotext = 'Қилинган савдолар бўйича рўйҳатни қўриш ва қайтадан чек чиқариш';
        } else {
          this.$bvModal.show('modal-daily-trade');
          this.DocHistory();
        }
      },
      DocHistory() {
        let self = this;
        axios({
          method: "get",
          url: "api/v1/report/history"
        }).then(function (response) {
          self.dochistorylist = response.data;
          self.SummaDocHistory();
        });
      },
      SummaDocHistory() {
        let self = this;
        self.history_pay_summa = 0;
        self.history_cash_dollar = 0;
        self.history_cash = 0;
        self.history_plastik = 0;
        self.history_shot = 0;

        self.dochistorylist.forEach(function (key, value) {
          self.history_pay_summa += parseFloat(key.pay_summa);
          self.history_cash_dollar += parseFloat(key.dollar_summa);
          self.history_cash += parseFloat(key.cash_summa);
          self.history_plastik += parseFloat(key.plastic_summa);
          self.history_shot += parseFloat(key.shot_summa);
        });
      },
      Datetime(date) {
        var d = new Date(date * 1000);
        var dt = d.getDate();
        var month = d.getMonth() + 1;
        var hour = d.getHours();
        var minut = d.getMinutes();
        var sekund = d.getSeconds();
        if (month < 10) {
          month = "0" + month;
        }
        if (dt < 10) {
          dt = "0" + dt;
        }
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minut < 10) {
          minut = "0" + minut;
        }
        if (sekund < 10) {
          sekund = "0" + sekund;
        }

        return dt + "." + month + "." + d.getFullYear() + " " + hour + ":" + minut + ":" + sekund;
      },
      ZReportNoCheck() {
        let self = this;
        axios({
          method: "get",
          url: "api/v1/report/z-report-close"
        }).then(function (response) {
          if (response.data.success == true) {
            self.DocHistory();
          }
        });
      },
      ZReportCheck() {
        let self = this;
        axios({
          method: "get",
          url: "api/v1/report/z-report"
        }).then(function (response) {
          let myDatax = response.data;

          if (!myDatax.rasxod.cash) { myDatax.rasxod.cash = 0; }
          if (!myDatax.kontragent_pay.cash) { myDatax.kontragent_pay.cash = 0; }
          if (!myDatax.refund.cash) { myDatax.refund.cash = 0; }
          var allcash = (myDatax.rasxod.cash + myDatax.kontragent_pay.cash) - myDatax.refund.cash;

          if (!myDatax.rasxod.plastic) { myDatax.rasxod.plastic = 0; }
          if (!myDatax.kontragent_pay.plastic) { myDatax.kontragent_pay.plastic = 0; }
          if (!myDatax.refund.plastic) { myDatax.refund.plastic = 0; }
          var allplastic = (myDatax.rasxod.plastic + myDatax.kontragent_pay.plastic) - myDatax.refund.plastic;

          if (!myDatax.rasxod.dollar) { myDatax.rasxod.dollar = 0; }
          if (!myDatax.kontragent_pay.dollar) { myDatax.kontragent_pay.dollar = 0; }
          if (!myDatax.refund.dollar) { myDatax.refund.dollar = 0; }
          var alldollar = (myDatax.rasxod.dollar + myDatax.kontragent_pay.dollar) - myDatax.refund.dollar;

          localStorage.setItem("zreportcheck", JSON.stringify(response.data));
          localStorage.setItem("allcash", allcash);
          localStorage.setItem("allplastic", allplastic);
          localStorage.setItem("alldollar", alldollar);
          let checkWindow = window.open(
            '#/chiqim/zreportprint',
            "_blank",
            "width=1000, height=1000"
          );
          self.ZReportNoCheck();
        });
      },
      ClientPay() {
        if (this.info == true) {
          this.infotext = 'Контрагент тўловлар ойнасига ўтиш';
        } else {
          this.$bvModal.show('modal-client-pay');
        }
      },
      cancelclient() {
        this.Summachange();
      },
      Clear(type = 0) {
        if (this.info == true) {
          this.infotext = "Қилинган савдони сақламасдан бекор қилиш";
        } else {
          var answer = true;
          if (type == 1) {
            answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
          }
          if (answer) {
            this.tableindexcount = null;
            this.datas.rasxod_table = [];
            this.Payzero();
            this.datas.number += 1;
            this.datas.kontragent_id = 0;
            this.datas.created_at = new Date()
              .valueOf()
              .toString()
              .slice(0, 10);
            this.datas.updated_at = new Date()
              .valueOf()
              .toString()
              .slice(0, 10);
            this.datas.skidka_summa = 0;
            this.datas.summa = 0;
            this.count_all = 0;
            this.itemindex = 0;
            this.Productlistfolder(this.datas.sklad_id, this.parent);
          }
        }
      },
      Payzero() {
        this.datas.cash_summa = 0;
        this.datas.skidka_summa = 0;
        this.datas.plastic_summa = 0;
        this.datas.shot_summa = 0;
        this.datas.dollar_summa = 0;
        this.datas.refund_money = 0;
        this.datas.refund_money_dollar = 0;
      },
      ClientPayClear() {
        this.client_pay.kontragent_id = null;
        this.client_pay.current_total = 0;
        this.client_pay.summa = 0;
        this.client_pay.current_total_dollar = 0;
        this.client_pay.kassa_summa = 0;
        this.client_pay.comment = "";
        this.pay_client_input = null;
        this.pay_date_clientpay = 0;
      },
      FocusToClient() {
        this.$refs.focusedToClient.focus();
      },
      SaveClientPay() {
        let self = this;
        self.client_pay.datetime = new Date().valueOf().toString().slice(0, 10);
        axios({
          method: "post",
          url: "api/v1/kontragent-pay",
          data: self.client_pay
        }).then(function (response) {
          self.ClientPayClear();
        });
      },
      CheckOplata() {
        let self = this;
        self.client_pay.datetime = new Date().valueOf().toString().slice(0, 10);
        axios({
          method: "post",
          url: "api/v1/kontragent-pay",
          data: self.client_pay
        }).then(function (response) {
          let myWindow;
          myWindow = window.open(
            '#/oplata/print/' + response.data.id,
            "_blank",
            "width=1000, height=1000"
          );
          self.ClientPayClear();
        });
      },
      Panel() {
        if (this.info == true) {
          this.infotext = 'Панел ойнасига ўтиш';
        } else {
          this.PanelFolder(this.datas.sklad_id, this.parent);
          this.$bvModal.show('modal-panel');
        }
      },
      PanelFolder(sklad, parent) {
        let self = this;
        axios({
          method: "post",
          url: "api/v1/product-panel/by-parent",
          data: {
            sklad_id: sklad,
            parent_id: parent
          }
        }).then(function (response) {
          self.panel_folder = response.data;
        });
      },
      ProductPanel(product_id) {
        let self = this;
        self.newitem.product_id = product_id;

        axios({
          method: "post",
          url: "api/v1/product/price-balance",
          data: {
            product_id: self.newitem.product_id,
            sklad_id: self.datas.sklad_id,
            datetime: self.datas.created_at
          }
        }).then(function (response) {
          if (response.data.balance >= self.newitem.count) {
            self.Priceset(response.data);
            self.newitem.current_balance = response.data.balance;
            if (self.datas.price_type == "optom") {
              self.newitem.price = response.data.optom_price;
            } else {
              self.newitem.price = response.data.chakana_price;
            }
            self.newitem.summa = self.newitem.price * self.newitem.count;
            if (self.pricesettings.common_price_type == 2 && self.datas.pay_type_id == 3) {
              self.newitem.tan_narx = response.data.body_price / self.datas.dollar_rate;
            } else if (self.pricesettings.common_price_type == 1 && self.datas.pay_type_id > 3) {
              self.newitem.tan_narx = response.data.body_price * self.datas.dollar_rate;
            } else {
              self.newitem.tan_narx = response.data.body_price;
            }
            self.Create();
          } else {
            self.newitem = {
              shtrix_kod: "",
              product_id: 0,
              count: 1,
              price: 0,
              summa: 0,
              product_name: "",
              pack_count: 1,
              pack_price: 0,
              pack_norma: 1

            };
            self.$store.state.errors = "Қолдиқ мавжуд эмас";
          }
        });
      },
      Qaytim(type) {
        if (this.tolov_summa < 0) {
          // var summa = parseFloat(this.tolov_summa) * -1;
          if (type == 'dollar') {
            // if(this.datas.dollar_summa>0){
            // if(this.datas.pay_type_id==3){
            // this.datas.dollar_summa-=summa;
            this.datas.refund_money_dollar = this.qaytimdollar * -1;
            // }else{
            // this.datas.dollar_summa-=summa/this.datas.dollar_rate;
            // this.datas.refund_money_dollar=summa/this.datas.dollar_rate;
            // }
            // }
          } else {
            // if(this.datas.cash_summa>0){
            // if(this.datas.pay_type_id==3){
            // this.datas.cash_summa-=summa*this.datas.dollar_rate;
            // this.datas.refund_money=summa*this.datas.dollar_rate;
            // }else{
            // this.datas.cash_summa-=summa;
            this.datas.refund_money = this.qaytimsom * -1;
            // }
            // }
          }
        }
      },
      Skidka() {
        this.datas.skidka_summa = this.pay;
        this.pay = null;
        this.Shoved();
      },
      DollarKurs() {
        this.datas.dollar_rate = this.pay;
        this.pay = null;
        this.Shoved();
      },
      F5button() {
        if (this.pay > 0) {
          this.datas.cash_summa = this.pay;
          this.pay = null;
        } else {
          // this.datas.dollar_summa=0;
          // this.datas.plastic_summa=0;
          this.datas.cash_summa = 0;
          if (this.tolov_summa > 0) {
            if (this.datas.pay_type_id == 3) {
              this.datas.cash_summa = parseFloat(this.tolov_summa).toFixed(2) * this.datas.dollar_rate;
            } else {
              this.datas.cash_summa = this.tolov_summa;
            }
          }
        }
        this.Shoved();
      },
      F6button() {
        if (this.pay > 0) {
          this.datas.plastic_summa = this.pay;
          this.pay = null;
        } else {
          // this.datas.dollar_summa=0;
          // this.datas.cash_summa=0;
          this.datas.plastic_summa = 0;
          if (this.tolov_summa > 0) {
            if (this.datas.pay_type_id == 3) {
              this.datas.plastic_summa = parseFloat(this.tolov_summa).toFixed(2) * this.datas.dollar_rate;
            } else {
              this.datas.plastic_summa = this.tolov_summa;
            }
          }
        }
        this.Shoved();
      },
      Shotbutton() {
        if (this.pay > 0) {
          this.datas.shot_summa = this.pay;
          this.pay = null;
        } else {
          // this.datas.dollar_summa=0;
          // this.datas.cash_summa=0;
          this.datas.shot_summa = 0;
          if (this.tolov_summa > 0) {
            if (this.datas.pay_type_id == 3) {
              this.datas.shot_summa = parseFloat(this.tolov_summa).toFixed(2) * this.datas.dollar_rate;
            } else {
              this.datas.shot_summa = this.tolov_summa;
            }
          }
        }
        this.Shoved();
      },
      F8button() {
        if (this.pay > 0) {
          this.datas.dollar_summa = this.pay;
          this.pay = null;
        } else {
          // this.datas.cash_summa=0;
          // this.datas.plastic_summa=0;
          this.datas.dollar_summa = 0;
          if (this.tolov_summa > 0) {
            if (this.datas.pay_type_id == 3) {
              this.datas.dollar_summa = parseFloat(this.tolov_summa);
            } else {
              this.datas.dollar_summa = (this.tolov_summa) / this.datas.dollar_rate;
            }
          }
        }
        this.Shoved();
      },
      Pricesettings() {
        let self = this;
        axios.get("api/v1/sklads/id/1").then(function (response) {
          self.pricesettings = { common_price_type: response.data.common_price_type, chakana_price_type: response.data.chakana_price_type, optom_price_type: response.data.optom_price_type };
        });
      },
      Priceset(item) {
        if (item) {
          if (this.pricesettings.chakana_price_type == 1) {
            if (this.datas.pay_type_id == 3) {
              item.chakana_price = item.chakana_price / this.datas.dollar_rate;
              item.chakana_price = this.NumberFixed(item.chakana_price, this.tochnost);
            } else {
              item.chakana_price = item.chakana_price;
            }
          } else if (this.pricesettings.chakana_price_type == 2) {
            if (this.datas.pay_type_id == 3) {
              item.chakana_price = item.chakana_dollar_price;
            } else {
              item.chakana_price=this.NumberFixed(item.chakana_dollar_price * this.datas.dollar_rate, this.tochnost);
            }
          } else if (this.pricesettings.chakana_price_type == 3) {
            if (this.datas.pay_type_id == 3) {
              item.chakana_price = item.chakana_dollar_price;
            } else {
              item.chakana_price = item.chakana_price;
            }
          }
          item.chakana_price = this.NumberFixed(item.chakana_price, this.tochnost);
          if (this.pricesettings.optom_price_type == 1) {
            if (this.datas.pay_type_id == 3) {
              // item.optom_price = parseFloat(item.optom_price / this.datas.dollar_rate).toFixed(2);
              item.optom_price=this.NumberFixed(item.optom_price / this.datas.dollar_rate, this.tochnost);
              
            } else {
              item.optom_price = item.optom_price;
            }
          } else if (this.pricesettings.optom_price_type == 2) {
            if (this.datas.pay_type_id == 3) {
              item.optom_price = item.optom_dollar_price;
            } else {
              // item.optom_price = parseFloat(item.optom_dollar_price * this.datas.dollar_rate).toFixed(2);
              item.optom_price=this.NumberFixed(item.optom_dollar_price * this.datas.dollar_rate, this.tochnost);
            }
          } else if (this.pricesettings.optom_price_type == 3) {
            if (this.datas.pay_type_id == 3) {
              item.optom_price = item.optom_dollar_price;
            } else {
              item.optom_price = item.optom_price;
            }
          }
          item.optom_price = this.NumberFixed(item.optom_price, this.tochnost);
        }
      },
      Paytypelist() {
        let self = this;
        axios.get("api/v1/pay-type").then(function (response) {
          self.paytypelist = response.data;
        });
      },
      Clickproduct(item) {
        if (item.is_folder == false) {
          let self = this;
          if (self.changedisabled == false) {
            if (item.is_folder == true) {
              if (item.child == undefined) {
                axios({
                  method: "post",
                  url: "api/v1/product/all-price-balance-not-zero/" + item.id,
                  data: { sklad_id: self.datas.sklad_id, datetime: self.datas.created_at }
                }).then(function (response) {
                  item.child = response.data;
                });
              }
            } else {
              this.newitem.product_id = item.id;
              this.Ostatkanew(item);
            }
          }
        } else {
          this.Productlistfolder(this.datas.sklad_id, item.id);
          setTimeout(() => {
            $('.atable:eq(0)').focus()
          }, 100);
        }
      },
      Showojidaniya() {
        if (this.info == true) {
          this.infotext = "Буфер хотирадаги (ожидания) рўйҳатини юклаш";
        } else {
          this.$bvModal.show('modal-bronlist');
        }
      },
      Mobile() {
        if (this.info == true) {
          this.infotext = "Мобил савдо рўйҳатини юклаш";
        } else {
          this.$bvModal.show('modal-mobile');
        }
      },
      Showpay() {
        if (this.info == true) {
          this.infotext = "Тўлов ойнасига ўтиш!!!";
        } else {
          this.$bvModal.show('modal-pay');
        }
      },
      Tovarlistnew() {
        if (this.info == true) {
          this.infotext = "Товарлар рўйҳати!!!";
        } else {
          this.$bvModal.show('modal-tovarlistnew');
        }
      },
      Expectation() {
        if (this.info == true) {
          this.infotext = "Мавжуд рўйҳатни вақтинча буфер хотирага (ожидания) олиш ва ойнани янги савдога тайёрлаш";
        } else {
          let self = this;
          if (self.sending == false) {
            self.sending = true;
            axios({
              method: "post",
              url: "api/v1/bron",
              data: self.datas
            }).then(function (response) {
              self.$store.state.saved = null;
              self.bronlist.push(response.data);
              self.sending = false;
              self.Clear();
            });
            if (self.sending == true) {
              setTimeout(() => {
                self.sending = false;
              }, 1000);
            }
          }
        }
      },
      Up() {
        if (this.itemindex != 0) {
          this.itemindex -= 1;
        } else {
          this.itemindex = this.datas.rasxod_table.length - 1;
        }
      },
      Down() {
        if (this.itemindex == this.datas.rasxod_table.length - 1) {
          this.itemindex = 0;
        } else {
          this.itemindex += 1;
        }
      },
      ChangePricetype() {
        let self = this;
        this.datas.rasxod_table.forEach(function (key, value) {
          self.Ostatka(value, true);
        });
      },
      Plus(index) {
        if (this.info == true) {
          this.infotext = "Савдога урилган товарни дона бўйича миқдорини 1тага қўтариш";
        } else {
          var item = this.datas.rasxod_table[index];
          if (item != undefined) {
            item.count = parseFloat(item.count) + 1;
            this.Ostatka(index);
          }
        }
      },
      Minus(index) {
        if (this.info == true) {
          this.infotext = "Савдога урилган товарни дона бўйича миқдорини 1тага камайтириш";
        } else {
          var item = this.datas.rasxod_table[index];
          if (item != undefined) {
            if (item.count > 0) {
              item.count = parseFloat(item.count) - 1;
              this.Ostatka(index);
            }
          }
        }
      },
      ChangeIndex(index, item) {
        if (this.changedisabled == false) {
          this.Ostatka(index, true);
          this.$bvModal.show('modal-count');
        }
        this.itemindex = index;
        this.tableindexcount = index;
        this.footer_prod = item;
      },
      ChangeDocIndex(index, item) {
        this.docindex = index;
        this.docitem = item;
      },
      cancel() {
        this.Multiplication();
      },
      Multiplication() {
        if (this.info == true) {
          this.infotext = "Товар сонини белгилаш";
        } else {
          this.newitem.count = parseFloat(this.sensors);
          this.sensors = "";
        }
      },
      Sensorchange() {
        setTimeout(() => {
          this.Focus();
        }, 100);
      },
      Kod() {
        if (this.info == true) {
          this.infotext = "Товар коди бўйича қидирув";
        } else {
          let self = this;
          self.newitem.product_id = parseInt(self.sensors);
          let item = this.newitem;
          axios({
            method: "get",
            url: "api/v1/product/id/" + item.product_id
          }).then(function (response) {
            item.product_name = response.data.extra_name;
            axios({
              method: "post",
              url: "api/v1/product/price-balance",
              data: {
                product_id: self.newitem.product_id,
                sklad_id: self.datas.sklad_id,
                datetime: self.datas.created_at
              }
            }).then(function (response) {
              if (response.data.balance >= self.newitem.count) {
                self.Priceset(response.data);
                self.newitem.current_balance = response.data.balance;
                if (self.datas.price_type == "optom") {
                  self.newitem.price = response.data.optom_price;
                } else {
                  self.newitem.price = response.data.chakana_price;
                }
                self.newitem.summa = self.newitem.price * self.newitem.count;
                // self.newitem.tan_narx = response.data.body_price;
                if (self.pricesettings.common_price_type == 2 && self.datas.pay_type_id == 3) {
                  self.newitem.tan_narx = response.data.body_price / self.datas.dollar_rate;
                } else if (self.pricesettings.common_price_type == 1 && self.datas.pay_type_id != 3) {
                  self.newitem.tan_narx = response.data.body_price * self.datas.dollar_rate;
                } else {
                  self.newitem.tan_narx = response.data.body_price;
                }
                self.Create();
                self.sensors = '';
              } else {
                self.newitem = {
                  shtrix_kod: "",
                  product_id: 0,
                  count: 1,
                  price: 0,
                  summa: 0,
                  product_name: "",
                  pack_count: 1,
                  pack_price: 0,
                  pack_norma: 1
                };
                self.$store.state.errors = "Қолдиқ мавжуд эмас";
              }
            });
          }).catch(function (error) {
            self.$store.state.errors = self.$t("Товар мавжуд эмас");
          });
        }
      },
      Shtrixsearch() {
        if (this.info == true) {
          this.infotext = "Товар штрих код бўйича қидирув";
        } else {
          this.newitem.shtrix_kod = this.sensors;
          this.sensors = "";
          this.Shtrix_code();
        }
      },
      Narxsearch() {
        if (this.info == true) {
          this.infotext = "Товар нархи бўйича қидирув";
        } else {
          let self = this;
          axios({
            method: "post",
            url: "api/v1/product/get-by-price",
            data: {
              datetime: self.datas.created_at,
              price_type: self.datas.price_type,
              pay_type_id: self.datas.pay_type_id,
              sklad_id: self.datas.sklad_id,
              price: self.sensors
            }
          }).then(function (response) {
            if (response.data.length) {
              self.narxlists = response.data;
              self.sensors = "";
              self.$bvModal.show("modal-narx");
            } else {
              self.$store.state.errors = self.$t('Товар мавжуд эмас');
            }
          });
        }
      },
      Narxlist() {
        return this.productlistfolder.filter(row => {
          if (row.price_register.body_price > 0) {
            if (row.price_register.chakana_price == this.sensors) {
              return row;
            }
          }
        });
      },
      Skladlist() {
        let self = this;
        axios.get("api/v1/sklads").then(function (response) {
          self.skladlist = response.data;
        });
      },
      acceptpay() {
        this.pay = null;
      },
      acceptpayclient() {
        this.pay_client_input = null;
      },
      cancelpay() {
        this.Skidka();
      },
      accept(text) {
        if (this.info == true) {
          this.infotext = "Сенсор бўлимини тозалаш";
        } else {
          this.delete();
        }
      },
      delete() {
        // this.hide();
        this.newitem = {
          shtrix_kod: "",
          product_id: 0,
          count: 1,
          price: 0,
          summa: 0,
          product_name: "",
          pack_count: 1,
          pack_price: 0,
          pack_norma: 1
        };
        this.sensors = "";
      },
      show(e) {
        this.input1 = e.target;
      },
      showclientpay(e) {
        this.inputpayclient = e.target;
      },
      showtext(e) {
        this.inputtext = e.target;
      },
      show1(e) {
        this.input = e.target;
      },
      hide() {
        this.visible = false;
      },
      F5(type = 'default') {
        if (this.datas.pay_type_id == 3) {
          if (type == 'skidka') {
            if (this.datas.skidka_summa > this.datas.summa - this.datas.cash_summa / this.datas.dollar_rate - this.datas.plastic_summa / this.datas.dollar_rate - this.datas.shot_summa / this.datas.dollar_rate - this.datas.dollar_summa) {
              this.$store.state.errors = this.$t('Summadan ortiq skidka berish mumkin emas');
              this.datas.skidka_summa = this.datas.summa - this.datas.cash_summa / this.datas.dollar_rate - this.datas.plastic_summa / this.datas.dollar_rate - this.datas.shot_summa / this.datas.dollar_rate - this.datas.dollar_summa;
            } else {
              this.datas.cash_summa = 0;
              this.datas.plastic_summa = 0;
              this.datas.shot_summa = 0;
              this.datas.dollar_summa = 0;
            }
          } else if (type == 'plastic') {
            if (this.datas.plastic_summa > (this.datas.summa - this.datas.skidka_summa - this.datas.dollar_summa) * this.datas.dollar_rate) {
              this.$store.state.errors = this.$t('summadan ortiq to`lash mumkin emas');
              this.datas.cash_summa = 0;
              this.datas.plastic_summa = (this.datas.summa - this.datas.dollar_summa - this.datas.skidka_summa) * this.datas.dollar_rate;
            } else {
              this.datas.cash_summa = this.datas.summa - this.datas.plastic_summa - this.datas.skidka_summa;
            }
          }
        }
      },
      F6() {
        if (this.datas.cash_summa > this.datas.summa - this.datas.skidka_summa) {
          this.$store.state.errors = this.$t('summadan ortiq to`lash mumkin emas');
          this.datas.plastic_summa = 0;
          this.datas.cash_summa = this.datas.summa - this.datas.skidka_summa - this.datas.plastic_summa;
        } else {
          this.datas.plastic_summa = this.datas.summa - this.datas.cash_summa - this.datas.skidka_summa;
        }
      },
      F8() {
        if (this.datas.cash_summa > this.datas.summa - this.datas.skidka_summa) {
          this.$store.state.errors = this.$t('summadan ortiq to`lash mumkin emas');
          this.datas.plastic_summa = 0;
          this.datas.cash_summa = this.datas.summa - this.datas.skidka_summa - this.datas.plastic_summa;
        } else {
          this.datas.plastic_summa = this.datas.summa - this.datas.cash_summa - this.datas.skidka_summa;
        }
        this.Shoved();
      },
      Time: function () {
        window.setInterval(() => {
          var d = new Date();
          var s = d.getSeconds();
          var s = d.getSeconds();
          var m = d.getMinutes();
          var h = d.getHours();
          this.time =
            ("0" + h).substr(-2) +
            ":" +
            ("0" + m).substr(-2) +
            ":" +
            ("0" + s).substr(-2);
        }, 1000);
      },
      Productlistfolder(sklad, parent) {
        let self = this;
        var keyword = "";
        if (self.filter.length > 1) {
          keyword = self.filter;
        }
        setTimeout(() => {
        axios({
          method: "post",
          url: "api/v1/product/all-price-balance-not-zero/" + parent,
          data: {
            sklad_id: sklad, datetime: new Date()
              .valueOf()
              .toString()
              .slice(0, 10), keyword: keyword, parent_id: parent, page: 1, limit: 200
          }
        }).then(function (response) {
          self.productlistfolder = response.data;
          if (response.data.length > 0 && response.data[0].parent_id > 0) {
            axios
              .get("api/v1/product/id/" + response.data[0].parent_id)
              .then(function (response) {
                self.parent = response.data.parent_id;
              });
          }
          self.productlistfolder.forEach(function (key, value) {
            if (key.price_register.body_price > 0) {
              self.Priceset(key.price_register);
            }
          });
          return false;
        });
      }, 1000);
      },
      async Print(id) {
        let self = this;
        await self.Qarzdorlik();
        $("#my-node").css("display", "block");
        var node = document.getElementById("my-node");
        setTimeout(() => {
          htmlToImage
            .toSvg(document.getElementById("my-node"))
            .then(function (dataUrl) {
              self.$refs.electronVuePrinter.print(dataUrl);
              setTimeout(() => {
                localStorage.setItem("sensor", self.touch);
                self.$router.go();
              }, 2500);
            })
            .catch(function (error) {
              console.error("oops, something went wrong!", error);
            });
        }, 100);
      },
      Focus() {
        if (this.touch == false) {
          $('#' + this.settings.focus).focus();
        } else {
          $("#sensors").focus();
        }
      },
      Trashitem(index) {
        if (this.info == true) {
          this.infotext = "Жадвалдаги танланган қаторни ўчириш";
        } else {
          const answer = window.confirm(this.$t("Malumotlar ochirilsinmi?"));
          if (answer) {
            // this.datas.summa -= this.datas.rasxod_table[index].summa;
            this.datas.rasxod_table.splice(index, 1);
            if (this.datas.rasxod_table.length < this.itemindex + 1) {
              this.itemindex = 0;
            }
            this.tableindexcount = null;
            this.Summa();
          }
        }
      },
      Ostatka(index, change = false) {
        let self = this;
        if (self.datas.rasxod_table[index].count == 0) {
          self.Trashitem(index);
        } else {
          let data = {
            product_id: self.datas.rasxod_table[index].product_id,
            sklad_id: self.datas.sklad_id
          };
          if (self.datas.rasxod_table[index].count > 3) {
            self.tableindexcount = index;
            self.$bvModal.show('modal-count')
          }
          axios({
            method: "post",
            url: "api/v1/product/price-balance",
            data: {
              product_id: self.datas.rasxod_table[index].product_id,
              sklad_id: self.datas.sklad_id,
              datetime: self.datas.created_at
            }
          }).then(function (response) {
            self.Priceset(response.data);
            // self.datas.rasxod_table[index].tan_narx=response.data.body_price;
            if (response.data.balance >= self.datas.rasxod_table[index].count) {
              self.datas.rasxod_table[index].current_balance =
                response.data.balance;

            } else {
              self.datas.rasxod_table[index].count = response.data.balance;
              self.$store.state.errors = "Қолдиқ мавжуд эмас";
            }
            // if (self.datas.rasxod_table[index].price == 0) {
            if (self.datas.rasxod_table[index].price < -1 || change == true) {
              if (self.datas.price_type == "optom") {
                self.datas.rasxod_table[index].price = response.data.optom_price;
              } else {
                self.datas.rasxod_table[index].price = response.data.chakana_price;
              }
            }
            // }
            self.Changeprice(index);
          });
        }
      },
      Productchanged(index) {
        let self = this;
        let item = self.datas.rasxod_table[index];
        self.datas.rasxod_table.forEach(function (key, value) {
          if (value != index) {
            if (item.product_id == key.product_id) {
              self.$store.state.errors = self.$t("Бу товар танланган");
              item.product_id = 0;
              item.count = 0;
              item.summa = 0;
              self.Summa();
            }
          }
        });
        if (item.product_id > 0) {
          if (item.shtrix_kod == "") {
            axios({
              method: "get",
              url: "api/v1/product/id/" + item.product_id
            }).then(function (response) {
              if (response.data.shtrix_table[0]) {
                item.shtrix_kod = response.data.shtrix_table[0].shtrix_kod;
              }
            });
          }
          self.Ostatka(index);
        }
      },
      Shoved() {
        if (this.$refs.inputText2 != undefined) {
          this.$refs.inputText2.focus();
          // }else{
          // $('#pay-input').focus();
        }
      },
      Shoved1() {
        // setTimeout(() => {
        $('#inputtext').focus();
        // }, 100);
      },
      Productname() {
        let item = this.newitem;
        axios({
          method: "get",
          url: "api/v1/product/id/" + item.product_id
        }).then(function (response) {
          item.pack_norma = response.data.pack_count;
          item.pack_count = item.count / response.data.pack_count;
          item.product_name = response.data.extra_name;
          item.product={"extra_name":response.data.extra_name,"picture_name":response.data.picture_name};
        });
      },
      Hide() {
        let self = this;
        setTimeout(function (e) {
          // if ($(":focus").attr("class") == undefined) {
          if (self.touch == true) {
            $("#sensors").focus();
          } else {
            $("#" + self.settings.focus).focus();
          }
          // }
        }, 100);
      },
      Ostatkanewnarx(item, type = 'default') {
        let self = this;
        if (item.is_folder != true) {
          if (type == 'modal') {
            self.$bvModal.hide('modal-tovarlistnew');
            self.newitem.product_id = item.id;
          }
          if (item.balance >= self.newitem.count) {
            self.newitem.current_balance = item.balance;
            // self.$bvModal.show("modal-new");
            if (self.datas.price_type == "optom") {
              self.newitem.price = parseFloat(item.optom_price).toFixed(self.tochnost);
            } else {
              self.newitem.price = parseFloat(item.chakana_price).toFixed(self.tochnost);
            }
            self.Productname();
            self.newitem.summa = self.newitem.price * self.newitem.count;
            self.Create();
            if (item.price_type == 2 && self.datas.pay_type_id == 3) {
              self.newitem.tan_narx = item.body_price / self.datas.dollar_rate;
            } else if (item.price_type == 1 && self.datas.pay_type_id != 3) {
              self.newitem.tan_narx = item.body_price * self.datas.dollar_rate;
            } else {
              self.newitem.tan_narx = item.body_price;
            }
          } else {
            self.newitem = {
              shtrix_kod: "",
              product_id: 0,
              count: 1,
              price: 0,
              summa: 0,
              product_name: "",
              pack_count: 1,
              pack_price: 0,
              pack_norma: 1
            };
            self.$store.state.errors = "Қолдиқ мавжуд эмас";
          }
        } else {
          self.parent = item.parent_id;
          self.Productlistfolder(self.datas.sklad_id, item.id);
          setTimeout(() => {
            $('.atable:eq(0)').focus()
          }, 100);
        }
      },
      Ostatkanew(item, type = 'default') {
        let self = this;
        if (item.price_register.length > 0) {
          item.price_register = item.price_register[0];
        }
        if (item.is_folder != true) {
          if (type == 'modal') {
            self.$bvModal.hide('modal-tovarlistnew');
            self.newitem.product_id = item.id;
          }
          if (item.balance < self.newitem.count) {
            self.newitem.count = item.balance;
            // self.$store.state.errors = "Қолдиқ мавжуд эмас";
          }
          self.newitem.current_balance = item.balance;
          // self.$bvModal.show("modal-new");
          if (self.datas.price_type == "optom") {
            self.newitem.price = parseFloat(item.price_register.optom_price).toFixed(self.tochnost);
          } else {
            self.newitem.price = parseFloat(item.price_register.chakana_price).toFixed(self.tochnost);
          }
          self.Productname();
          self.newitem.summa = parseFloat(self.newitem.price * self.newitem.count).toFixed(self.tochnost);
          console.log(item);
          if (self.pricesettings.common_price_type == 1 && self.datas.pay_type_id == 3) {
            self.newitem.tan_narx = item.price_register.body_price / self.datas.dollar_rate;
          } else if (self.pricesettings.common_price_type == 2 && self.datas.pay_type_id != 3) {
            self.newitem.tan_narx = item.price_register.body_price * self.datas.dollar_rate;
          } else {
            self.newitem.tan_narx = item.price_register.body_price;
          }
          self.Create();
        } else {
          self.parent = item.parent_id;
          self.Productlistfolder(self.datas.sklad_id, item.id);
          setTimeout(() => {
            $('.atable:eq(0)').focus()
          }, 100);
        }
      },
      Shtrix_code(e) {
        let self = this;
        let shtrix = self.newitem.shtrix_kod;
        if (shtrix != "" && shtrix != " ") {
          axios({
            method: "post",
            url: "api/v1/product/shtrix2/" + shtrix,
            data: { sklad_id: self.datas.sklad_id }
          }).then(function (response) {
            if (!response.data[0]) {
              self.newitem.shtrix_kod = "";
            } else if (response.data[1]) {
              self.shtrixlist = response.data;
              for (let index = 0; index < self.shtrixlist.length; index++) {
                self.Priceset(self.shtrixlist[index].price_register[0]);
              }
              if (self.filteredShtrix.length) {
                self.$bvModal.show("modal-shtrixnew");
              }
            } else {
              if (response.data[0].price_register.length > 0) {
                self.Priceset(response.data[0].price_register[0]);
              }
              self.newitem.product_id = response.data[0].product_id;
              self.Ostatkanew(response.data[0]);
            }
          });
        }
      },
      Shtrix(index) {
        let self = this;
        var shtrix = self.datas.rasxod_table[index].shtrix_kod;
        axios({
          method: "post",
          url: "api/v1/product/shtrix2/" + shtrix,
          data: { sklad_id: self.datas.sklad_id }
        }).then(function (response) {
          if (!response.data[0]) {
          } else if (response.data[1]) {
            self.settedindex = index;
            self.shtrixlist = response.data;
            self.$bvModal.show("modal-shtrix");
          } else {
            self.datas.rasxod_table[index].product_id =
              response.data[0].product_id;
            self.Productchanged(index);
          }
        });
      },
      Selectproduct(index) {
        this.$store.state.selected_product = this.datas.rasxod_table;
        this.$store.state.selected_index = index;
      },
      Changeprice(index) {
        let self = this;
        var item = self.datas.rasxod_table[index];
        // axios({
        //   method: "post",
        //   url: "api/v1/product/price-balance",
        //   data: {
        //     product_id: item.product_id,
        //     sklad_id: self.datas.sklad_id,
        //     datetime: self.datas.created_at
        //   }
        // }).then(function (response) {
        //   if (response.data.balance >= item.count) {
        // item.current_balance = response.data.balance;
        item.pack_count = item.count / item.pack_norma;
        item.pack_price = item.price * item.pack_norma;
        item.summa = item.price * item.count;
        self.Summa();
        // } else {
        // item.count = item.summa / item.price;
        // self.$store.state.errors = "Қолдиқ мавжуд эмас";
        // }
        // });
      },
      Changesumma(index) {
        let self = this;
        var item = self.datas.rasxod_table[index];
        item.count=item.summa/item.price;
        item.pack_count = item.count / item.pack_norma;
        item.pack_price = item.price * item.pack_norma;
        // item.summa = item.price * item.count;
        self.Summa();
      },
      Create() {
        let self = this;
        axios({
          method: "post",
          url: "api/v1/product/price-balance",
          data: {
            product_id: self.newitem.product_id,
            sklad_id: self.datas.sklad_id,
            datetime: self.datas.created_at
          }
        }).then(function (response) {
          if (response.data.balance >= self.newitem.count) {
            self.datas.rasxod_table.forEach(function (key, value) {
              if (key.product_id == self.newitem.product_id) {
                if (key.count > 3) {
                  self.tableindexcount = value;
                  self.$bvModal.show('modal-count');
                }
                if (
                  response.data.balance >=
                  parseFloat(self.newitem.count) + parseFloat(key.count)
                ) {
                  key.count = parseFloat(self.newitem.count) + parseFloat(key.count);
                  key.price = self.newitem.price;
                  self.Changeprice(value);
                  self.tableindexcount = value;
                  if (self.touch == false) {
                    self.$bvModal.show('modal-count')
                  }
                  self.newitem = {
                    shtrix_kod: "",
                    product_id: 0,
                    count: 1,
                    price: 0,
                    summa: 0,
                    product_name: "",
                    pack_count: 1,
                    pack_price: 0,
                    pack_norma: 1
                  };
                } else {
                  key.count = response.data.balance;
                  key.price = self.newitem.price;
                  self.Changeprice(value);
                  self.newitem = {
                    shtrix_kod: "",
                    product_id: 0,
                    count: 1,
                    price: 0,
                    summa: 0,
                    product_name: "",
                    pack_count: 1,
                    pack_price: 0,
                    pack_norma: 1
                  };
                }
              }
              if (self.touch == false) {
                $('#sensors').focus();
              }
            });
            if (self.newitem.product_id > 0) {
              self.datas.rasxod_table.push(self.newitem);
              self.newitem = {
                shtrix_kod: "",
                product_id: 0,
                count: 1,
                price: 0,
                summa: 0,
                product_name: "",
                current_balance: 0,
                pack_count: 1,
                pack_price: 0,
                pack_norma: 1
              };
              var items =
                self.datas.rasxod_table[self.datas.rasxod_table.length - 1];
              axios({
                method: "get",
                url: "api/v1/product/id/" + items.product_id
              }).then(function (response) {
                if (response.data.shtrix_table[0]) {
                  items.shtrix_kod = response.data.shtrix_table[0].shtrix_kod;
                }
                self.tableindexcount = self.datas.rasxod_table.length - 1;
                if (self.touch == false) {
                  self.$bvModal.show('modal-count')
                }
              });
              self.itemindex = self.datas.rasxod_table.length - 1;
            }
            self.newitem.summa = self.newitem.price * self.newitem.count;
            self.Summa();
            self.$bvModal.hide("modal-new");
            // self.filter = "";
            // self.Productlistfolder(self.datas.sklad_id, self.parent);
          } else {
            self.$store.state.errors = "Қолдиқ мавжуд эмас";
          }
        });
      },
      Addtable() {
        this.datas.rasxod_table.push({
          shtrix_kod: "",
          product_id: 0,
          count: 1,
          price: 0,
          summa: 0,
          current_balance: 0,
          pack_count: 1,
          pack_price: 0,
          pack_norma: 0
        });
        // $('.right').find('td').eq(-1).find('input').focus();
        setTimeout(() => {
          var have = $(".shtrixx");
          if (have.length != 0) {
            have.eq(have.length - 1).focus();
          } else {
            have.focus();
          }
        }, 100);
      },
      Summa() {
        this.datas.summa = 0;
        this.datas.count_all = 0;
        let self = this;
        this.datas.rasxod_table.forEach(function (key, value) {
          self.datas.summa += parseFloat(self.NumberFixed(key.summa, self.tochnost));
          self.datas.count_all += parseFloat(self.NumberFixed(key.count, 2));
        });
      },
      Savedokument(type) {
        let self = this;
        // if (self.rule.change == true) {
        if (self.datas.plastic_summa == "") {
          self.datas.plastic_summa = 0;
        }
        if (self.datas.shot_summa == "") {
          self.datas.shot_summa = 0;
        }
        if (self.datas.cash_summa == "") {
          self.datas.cash_summa = 0;
        }
        if (self.datas.skidka_summa == "") {
          self.datas.skidka_summa = 0;
        }
        if (self.datas.dollar_summa == "") {
          self.datas.dollar_summa = 0;
        }
        if (self.tolov_summa < 0 && self.datas.kontragent_id < 1) {
          this.$store.state.errors = this.$t("Қайтим берилмаган");
        } else if (!self.datas.kontragent_id > 0 && self.tolov_summa > 0) {
          this.$store.state.errors = this.$t("Тўлов тўлиқ амалга оширилмаган");
        } else if (self.sending == false) {
          self.sending = true;
          if (this.$route.path == "/chiqim/create") {
            var methods = "post";
            var action = "api/v1/rasxod";
          } else {
            var methods = "patch";
            var action = "api/v1/rasxod/id/" + self.$route.params.id;
            if (self.$store.state.saved == 1) {
              self.datas.updated_at = new Date()
                .valueOf()
                .toString()
                .slice(0, 10);
            }
          }
          axios({
            method: methods,
            url: action,
            data: self.datas
          }).then(function (response) {
            self.$store.state.saved = null;
            self.sending = false;
            if (type == "print") {
              let routeData = self.$router.resolve({
                name: "prints",
                query: { id: response.data.id }
              });
              let myWindow;
              myWindow = window.open(
                '#/chiqim/print/' + response.data.id,
                "_blank",
                "width=1000, height=1000"
              );
              localStorage.setItem("sensor", self.touch);
              // self.$router.go();
              if (self.$route.path == "/chiqim/create") {
                self.Clear();
                self.$bvModal.hide('modal-pay');
              }
            } else if (type == "home") {
              self.$router.push({ name: "Чиқим" });
            } else if (type == "a4print") {
              let myWindows;
              myWindows = window.open(
                '#/chiqim/a4print/' + response.data.id,
                "_blank",
                "width=1000, height=1000"
              );
              if (self.$route.path == "/chiqim/create") {
                self.Clear();
                self.$bvModal.hide('modal-pay');
              }
            } else {
              localStorage.setItem("sensor", self.touch);
              if (self.$route.path == "/chiqim/create") {
                self.Clear();
                self.$bvModal.hide('modal-pay');
              }
            }
          });
          if (self.sending == true) {
            setTimeout(() => {
              self.sending = false;
            }, 1000);
          }
        }
        // } else {
        //   self.$store.state.errors = self.$t('Sizdan bunday xuquq mavjud emas');
        // }
      },
      OldCheck(id) {
        let myWindow;
        localStorage.setItem("print_type", "Копия");
        myWindow = window.open(
          '#/chiqim/print/' + id,
          "_blank",
          "width=1000, height=1000"
        );
      },
      A4Print(id) {
        let A4Window;
        localStorage.setItem("print_type", "Копия");
        A4Window = window.open(
          '#/chiqim/a4print/' + id,
          "_blank",
          "width=1000, height=1000"
        );
      }
    }
  };
</script>
<style scoped>
  .pay.row>div {
    padding: 2px;
    /* border-bottom: 1px outset; */
  }

  .pay .col-md-8 {
    text-align: end;
  }

  .watch {
    background: #3f51b5;
    color: white;
    border-radius: 5px;
    border: 2px solid #002bff45;
    padding: 20px 10px;
    font-size: 20pt;
    margin: 0 3px;
  }

  .touchbutton {
    padding: 1px 0;
    margin: 0.4em 0.6em 0 0;
    -webkit-box-flex: 40;
    -ms-flex: 40;
    flex: 40;
    height: 2.2em;
    /* line-height: 2.2em; */
    /* overflow: hidden; */
    vertical-align: middle;
    border: 1px solid #ccc;
    color: #333;
    background-color: #ccc;
    -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.6) !important;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);
    border-radius: 0.35em;
    font-size: 1.25em !important;
    text-align: center;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer !important;
  }

  .buttom a,
  .buttom button,
  .mybtn {
    font-size: 15pt !important;
    margin: 5px 3px !important;
  }

  .toggle__button {
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
  }

  .toggle__button input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  .toggle__button .toggle__switch {
    display: inline-block;
    height: 12px;
    border-radius: 6px;
    width: 40px;
    background: #bfcbd9;
    box-shadow: inset 0 0 1px #bfcbd9;
    position: relative;
    margin-left: 10px;
    transition: all 0.25s;
  }

  .toggle__button .toggle__switch::after,
  .toggle__button .toggle__switch::before {
    content: "";
    position: absolute;
    display: block;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    left: 0;
    top: -3px;
    transform: translateX(0);
    transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
  }

  .toggle__button .toggle__switch::after {
    background: #4d4d4d;
    box-shadow: 0 0 1px #666;
  }

  .toggle__button .toggle__switch::before {
    background: #4d4d4d;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    opacity: 0;
  }

  #my-node {
    width: 300px;
  }

  #my-node h5 {
    font-weight: bold;
    font-size: 14px;
    color: black;
  }

  #my-node ul {
    list-style: none;
    border-bottom: 1px dotted;
    text-align: left;
    padding: 0;
    margin: 0;
    font-size: 13px;
    color: black;
  }

  thead {
    width: calc(100% - 19px) !important;
  }

  table {
    font-size: 14px !important;
  }

  .vs__selected {
    position: absolute;
  }

  h5 {
    text-align: center;
  }

  .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .leftkassa .mybtn {
    margin: 0px !important;
    border-color: currentColor;
  }

  .mylayouts {
    width: 10%;
    border: 2px solid #002bff45;
    margin: 2px 3px 0 0 !important;
  }

  .mylayouts>label {
    background: #3f51b5 !important;
    margin: 0 !important;
    font-weight: bold;
    color: white !important;
  }

  .panel-button-child>svg {
    font-size: 56px;
  }

  .bi-trash {
    color: black;
  }

  tbody>div>span>tr:nth-child(even) {
    background-color: #31cadd33 !important;
  }

  /* .bodyrow .left>tbody { */
  /* display: block; */
  /* height: 50vh !important; */
  /* overflow-y: scroll; */
  /* overflow: hidden !important; */
  /* } */

  #mydiv {
    display: block;
    height: 72vh;
    overflow-y: scroll;
  }

  /* .bodyrow table thead,
  .bodyrow table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  } */

  input[type="number"].table-input,
  input[type="tel"].table-input,
  input[type="text"].table-input {
    width: 100% !important;
  }

  .mybtn {
    border: 2px solid #002bff45;
    background: #3f51b5 !important;
    color: white !important;
    font-weight: bold;
  }

  .big {
    background: #ccc;
    height: 300px;
  }

  .btn {
    font-size: 14px;
  }

  .box {
    background: lightgreen;
    height: 40px;
  }

  input[type="number"].table-input,
  input[type="tel"].table-input,
  input[type="text"].table-input {
    background: white !important;
  }

  table .mybtn {
    background: none !important;
  }

  sup {
    font-size: 16px;
    color: #d92c54;
    font-weight: bold;
  }

  /* thead { */
  /* background-color: #3f51b5 !important; */
  /* color: white; */
  /* font-weight: bold; */
  /* } */

  .mylayouts .table-input {
    max-width: 100% !important;
  }

  .sklad {
    background: #3f51b5;
    padding: 0px 2px;
    margin: 0 2px;
    width: 35vh;
    border-radius: 5px;
  }

  /* .md-card-content>.table.table-bordered.left tbody { */
  /* height: 54vh !important; */
  /* } */

  /* .md-card-content>.table.table-bordered.right tbody { */
  /* height: 61vh !important; */
  /* } */

  .headerhref {
    display: flex;
  }

  .headerhref a {
    padding: 13px 10px;
  }

  tr {
    cursor: pointer;
  }

  .countmodal label {
    height: calc(1.5em + 0.75rem + 2px);
    margin: 5px;
  }

  .countmodalinput input {
    margin: 5px;
    padding: 0!important;
    text-align: end;
    /* width: 100px; */
  }

  .countmodalinput>div {
    border-radius: 5px;
    padding: 5px 12px;
    position: absolute;
    border: 2px dashed;
  }
</style>