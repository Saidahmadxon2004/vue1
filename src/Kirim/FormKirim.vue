<template>
  <div class="container-fluid py-4">
    <!-- Sarlavha va Kurs -->
    <div class="row align-items-center mb-4">
      <div class="col-md-6">
        <h4 class="fw-bold text-dark">
          {{ $route.name }}
          <span v-if="$route.params.id" class="text-muted">№{{ $route.params.id }}</span>
          <button
            v-if="$route.params.id && settedRule.change"
            type="button"
            class="btn btn-primary btn-sm ms-2 shadow-sm"
            @click="change"
          >
            <i class="bi bi-pencil-square me-1"></i> Ўзгартириш
          </button>
        </h4>
      </div>
      <div class="col-md-4 d-flex align-items-center">
        <label for="dollar_rate" class="form-label me-2">Курс</label>
        <input
          :disabled="changedisabled"
          type="text"
          v-model="formData.dollar_rate"
          class="form-control form-control-sm w-50 shadow-sm"
          id="dollar_rate"
        />
      </div>
      <div class="col-md-2 text-end">
        <button
          type="button"
          class="btn btn-danger btn-sm shadow-sm"
          @click="closePage('/kirim')"
        >
          <i class="bi bi-x-lg"></i> Ёпиш
        </button>
      </div>
    </div>

    <!-- Форма майдонлари -->
    <div class="row mb-4">
      <div class="col-md-1">
        <label for="number" class="form-label">Факт №</label>
        <input
          :disabled="changedisabled"
          type="number"
          class="form-control form-control-sm shadow-sm"
          v-model="formData.number"
          id="number"
        />
      </div>
      <div class="col-md-2">
        <label class="form-label">Вақт</label>
        <input
          type="datetime-local"
          disabled
          class="form-control form-control-sm shadow-sm"
          :value="setDatetime(formData.created_at)"
        />
      </div>
      <div class="col-md-2">
        <label class="form-label">Склад</label>
        <v-select
          :disabled="skladhave"
          :clearable="false"
          class="form-control-sm shadow-sm"
          :options="skladList"
          v-model="formData.sklad_id"
          :reduce="name => name.id"
          label="name"
        >
          <template #search="{ attributes, events }">
            <input class="vs__search" v-bind="attributes" v-on="events" />
          </template>
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <em><b>{{ search }}</b></em> бўйича маълумот йўқ
            </template>
            <em style="opacity: 0.5" v-else>Маълумот йўқ</em>
          </template>
        </v-select>
      </div>
      <div class="col-md-2">
        <label class="form-label">Ётказувчи</label>
        <v-select
          :disabled="changedisabled"
          :clearable="false"
          class="form-control-sm shadow-sm"
          :options="kontragentList"
          v-model="formData.kontragent_id"
          :reduce="name => name.id"
          label="name"
        >
          <template #search="{ attributes, events }">
            <input class="vs__search" ref="kontragentSearch" v-bind="attributes" v-on="events" />
            <button
              :disabled="changedisabled"
              type="button"
              class="modallist btn btn-sm btn-outline-secondary ms-1"
              @click="openModal('modal-kontragentlist')"
            >
              <i class="bi bi-three-dots"></i>
            </button>
          </template>
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <em><b>{{ search }}</b></em> бўйича маълумот йўқ
              <button
                :disabled="changedisabled"
                type="button"
                class="pluss btn btn-sm btn-primary ms-1"
                @click="kontragent.name = search; openModal('modal-kontragent')"
              >
                +
              </button>
            </template>
            <em style="opacity: 0.5" v-else>Маълумот йўқ</em>
          </template>
        </v-select>
      </div>
      <div class="col-md-2">
        <label class="form-label">Тўлов тури</label>
        <v-select
          :disabled="changedisabled"
          :clearable="false"
          class="form-control-sm shadow-sm"
          :options="paytypeList"
          v-model="formData.pay_type_id"
          :reduce="name => name.id"
          label="name"
        >
          <template #search="{ attributes, events }">
            <input class="vs__search" v-bind="attributes" v-on="events" />
            <button
              :disabled="changedisabled"
              type="button"
              class="modallist btn btn-sm btn-outline-secondary ms-1"
              @click="openModal('modal-paytypelist')"
            >
              <i class="bi bi-three-dots"></i>
            </button>
          </template>
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              <em><b>{{ search }}</b></em> бўйича маълумот йўқ
            </template>
            <em style="opacity: 0.5" v-else>Маълумот йўқ</em>
          </template>
        </v-select>
      </div>
      <div class="col-md-2">
        <label class="form-label">Расход</label>
        <input
          :disabled="changedisabled"
          type="text"
          v-model.number="formData.rasxod_summa"
          class="form-control form-control-sm shadow-sm"
        />
      </div>
      <div class="col-md-1">
        <label class="form-label">Скидка</label>
        <input
          :disabled="changedisabled"
          type="text"
          v-model="formData.skidka_summa"
          class="form-control form-control-sm shadow-sm"
        />
      </div>
    </div>

    <!-- Жадвал -->
    <div class="table-responsive shadow-sm rounded">
      <table class="table table-hover table-bordered align-middle enhanced-table">
        <thead class="table-dark sticky-top">
          <tr :style="'display: grid; grid-template-columns:' + width1">
            <th colspan="4" class="tovar">Товар</th>
            <th colspan="2" class="kolvo">Сони</th>
            <th colspan="3" class="kirim">Нарх</th>
            <th colspan="2" class="kirim">Гарантия</th>
            <th colspan="2" class="nasenka">Наценка %</th>
            <th colspan="2" class="sena">Чакана Нарх</th>
            <th colspan="2" class="sena">Улгуржи Нарх</th>
            <th></th>
          </tr>
          <tr :style="'display: grid; grid-template-columns:' + width2">
            <th v-if="settings[0].view" class="bg-primary">№</th>
            <th v-if="settings[1].view" class="bg-primary">Штрих код</th>
            <th v-if="settings[2].view" class="bg-primary">Номи</th>
            <th v-if="settings[3].view" class="bg-primary">Қолдиқ</th>
            <th v-if="settings[16].view" class="bg-primary">Пачка</th>
            <th v-if="settings[4].view" class="bg-primary">Дона</th>
            <th v-if="settings[17].view" class="bg-primary">Пачка бўйича</th>
            <th v-if="settings[5].view" class="bg-primary">Дона бўйича</th>
            <th v-if="settings[7].view" class="bg-primary">Себет</th>
            <th v-if="settings[6].view" class="bg-primary">Жами сумма</th>
            <th v-if="settings[8].view" class="bg-primary">Себет сумма</th>
            <th v-if="settings[9].view" class="bg-primary">Чакана</th>
            <th v-if="settings[12].view" class="bg-primary">Улгуржи</th>
            <th v-if="settings[10].view" class="bg-primary">Сўм</th>
            <th v-if="settings[11].view" class="bg-primary text-success">$</th>
            <th v-if="settings[13].view" class="bg-primary">Сўм</th>
            <th v-if="settings[14].view" class="bg-primary text-success">$</th>
            <th v-if="settings[15].view"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in formData.prixod_table"
            :key="index"
            :style="'display: grid; grid-template-columns:' + width2"
            class="table-row"
          >
            <td v-if="settings[0].view" class="tovar">{{ index + 1 }}</td>
            <td v-if="settings[1].view" class="tovar">
              <input
                :disabled="changedisabled"
                class="form-control form-control-sm"
                type="text"
                v-model="item.shtrix_kod"
                @change="shtrix(index)"
              />
            </td>
            <td v-if="settings[2].view" class="tovar">
              <v-select
                :disabled="changedisabled"
                :clearable="false"
                class="form-control-sm"
                :options="paginated"
                v-model="item.product_id"
                :reduce="extra_name => extra_name.id"
                label="extra_name"
                @input="productChange(index)"
                @search="query => (search = query)"
              >
                <template #list-footer>
                  <li style="text-align: center; font-weight: bold;">
                    F4 умумий рўйхат
                  </li>
                </template>
                <template #selected-option-container="{ option }">
                  <div class="vs__selected">
                    <span v-if="typeof option.extra_name === 'number'">
                      {{ formatNumber(option.extra_name) }}
                    </span>
                    <span v-else>{{ option.extra_name }}</span>
                  </div>
                </template>
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes"></span>
                  <button
                    :disabled="changedisabled"
                    type="button"
                    class="modallist btn btn-sm btn-outline-secondary ms-1"
                    @click="selectProduct(index)"
                  >
                    <i class="bi bi-three-dots"></i>
                  </button>
                </template>
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    <em><b>{{ search }}</b></em> бўйича маълумот йўқ
                    <button
                      type="button"
                      class="pluss btn btn-sm btn-primary ms-1"
                      @click="createProduct(index, search)"
                    >
                      +
                    </button>
                  </template>
                  <em style="opacity: 0.5" v-else>Маълумот йўқ</em>
                </template>
              </v-select>
            </td>
            <td v-if="settings[3].view" class="tovar">{{ formatNumber(item.current_balance, 0) }}</td>
            <td v-if="settings[16].view" class="kolvo">
              <input
                :disabled="changedisabled"
                separator="space"
                style="text-align: center;"
                v-bind:precision="3"
                v-model="item.pack_count"
                class="form-control form-control-sm"
                @input="changePack(index)"
              />
            </td>
            <td v-if="settings[4].view" class="kolvo">
              <input
                :disabled="changedisabled"
                separator="space"
                style="text-align: center;"
                v-bind:precision="3"
                v-model="item.count"
                class="form-control form-control-sm"
                @input="changeCount(index)"
              />
            </td>
            <td v-if="settings[17].view" class="kirim">
  <input
    :disabled="changedisabled"
    separator="space"
    v-bind:precision="3"
    style="text-align: center;"
    v-model="item.pack_price"
    class="form-control form-control-sm"
    @input="changePackPrice(index)" 
  />
</td>
            <td v-if="settings[5].view" class="kirim">
              <input
                :disabled="changedisabled"
                separator="space"
                v-bind:precision="3"
                style="text-align: center;"
                v-model="item.kontragent_price"
                class="form-control form-control-sm"
                @input="changePrice(index)"
              />
            </td>
            <td v-if="settings[7].view" class="kirim">{{ formatNumber(item.debit_price, 3) }}</td>
            <td v-if="settings[6].view" class="kirim">{{ formatNumber(item.kontragent_summa) }}</td>
            <td v-if="settings[8].view" class="kirim">{{ formatNumber(item.debit_summa) }}</td>
            <td v-if="settings[9].view" class="nasenka">
              <input
                type="number"
                :disabled="changedisabled"
                style="text-align: center;"
                v-model="item.chakana_percent"
                class="form-control form-control-sm"
                @input="changePercentChakana(index)"
              />
            </td>
            <td v-if="settings[12].view" class="nasenka">
              <input
                type="number"
                :disabled="changedisabled"
                style="text-align: center;"
                v-model="item.optom_percent"
                class="form-control form-control-sm"
                @input="changePercentOptom(index)"
              />
            </td>
            <td v-if="settings[10].view" class="sena">
              <input
                :disabled="changedisabled"
                style="text-align: center;"
                separator="space"
                v-bind:precision="2"
                v-model="item.chakana_price"
                class="form-control form-control-sm"
                @change="changePriceChakana(index)"
              />
            </td>
            <td v-if="settings[11].view" class="sena text-success">
              <input
                :disabled="changedisabled"
                style="text-align: center; color: green;"
                separator="space"
                v-bind:precision="3"
                v-model="item.chakana_dollar_price"
                class="form-control form-control-sm"
                @change="changePriceChakanaDollar(index)"
              />
            </td>
            <td v-if="settings[13].view" class="sena">
              <input
                :disabled="changedisabled"
                style="text-align: center;"
                separator="space"
                v-bind:precision="2"
                v-model="item.optom_price"
                class="form-control form-control-sm"
                @change="changePriceOptom(index)"
              />
            </td>
            <td v-if="settings[14].view" class="sena text-success">
              <input
                :disabled="changedisabled"
                style="text-align: center; color: green;"
                separator="space"
                v-bind:precision="3"
                v-model="item.optom_dollar_price"
                class="form-control form-control-sm"
                @change="changePriceOptomDollar(index)"
              />
            </td>
            <td v-if="settings[15].view" class="text-center">
              <button
                v-if="!changedisabled"
                class="btn btn-sm btn-outline-danger"
                @click="trashItem(index)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr :style="'display: grid; grid-template-columns:' + width2">
            <th v-if="settings[0].view"></th>
            <th v-if="settings[1].view"></th>
            <th v-if="settings[2].view"></th>
            <th v-if="settings[3].view"></th>
            <th v-if="settings[16].view"></th>
            <th v-if="settings[4].view">{{ formatNumber(formData.count_all) }}</th>
            <th v-if="settings[5].view"></th>
            <th v-if="settings[17].view"></th>
            <th v-if="settings[7].view"></th>
            <th v-if="settings[6].view">{{ formatNumber(formData.summa) }}</th>
            <th v-if="settings[8].view">{{ formatNumber(formData.prixod_summa) }}</th>
            <th v-if="settings[9].view"></th>
            <th v-if="settings[12].view"></th>
            <th v-if="settings[10].view"></th>
            <th v-if="settings[11].view"></th>
            <th v-if="settings[13].view"></th>
            <th v-if="settings[14].view"></th>
            <th v-if="settings[15].view"></th>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Пастки тугмалар -->
    <div class="row mt-4">
      <div class="col-md-4 d-flex align-items-center">
        <label class="form-label me-2">Изох</label>
        <textarea
          :disabled="changedisabled"
          rows="1"
          v-model="formData.comment"
          class="form-control shadow-sm"
        ></textarea>
      </div>
      <div class="col-md-8 text-end">
        <button
          :disabled="changedisabled"
          class="btn btn-primary btn-sm me-2 shadow-sm"
          @click="addTable()"
        >
          <i class="bi bi-plus-lg"></i> <sup>F1</sup> Қўшиш
        </button>
        <button
          :disabled="changedisabled"
          class="btn btn-outline-secondary btn-sm me-2 shadow-sm"
          @click="openModal('modal-settings')"
        >
          <i class="bi bi-gear"></i> Сўзлама
        </button>
        <template v-if="!changedisabled">
          <button
            :disabled="sending"
            class="btn btn-outline-primary btn-sm me-2 shadow-sm"
            @click="rasxodXisob()"
          >
            Расход
          </button>
          <button
            :disabled="sending"
            class="btn btn-success btn-sm me-2 shadow-sm"
            @click="saveDocument('save')"
          >
            Сақлаш
          </button>
          <button
            :disabled="sending"
            class="btn btn-success btn-sm shadow-sm"
            @click="saveDocument()"
          >
            Сақлаш ва бекитish <sup>Ctrl+Enter</sup>
          </button>
        </template>
      </div>
    </div>

    <!-- Сўзлама модали -->
    <div class="modal fade" id="modal-settings" tabindex="-1" aria-labelledby="modal-settings-label" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-settings-label">Сўзлама</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Номи</th>
                  <th>Кўрсатиш</th>
                  <th>Ўлчам</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in settings" :key="index">
                  <td>{{ item.column }}</td>
                  <td>
                    <input type="checkbox" v-model="item.view" />
                  </td>
                  <td>
                    <input type="number" v-model="item.width" class="form-control form-control-sm" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ёпиш</button>
            <button type="button" class="btn btn-primary" @click="saveSettings">Сақлаш</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Штрих модал -->
    <div class="modal fade" id="modal-shtrix" tabindex="-1" aria-labelledby="modal-shtrix-label" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-shtrix-label">Товар</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Қидириш"
              v-model="filter"
              ref="shtrixSearch"
            />
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Номи</th>
                  <th>Қолдиқ</th>
                  <th>Чакана Нарх</th>
                  <th>Улгуржи Нарх</th>
                  <th>Штрих</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in filteredRows" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link"
                      @click="selectShtrixItem(item.product_id, settedIndex)"
                    >
                      {{ item.extra_name }}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link"
                      @click="selectShtrixItem(item.product_id, settedIndex)"
                    >
                      {{ item.balance }}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link"
                      @click="selectShtrixItem(item.product_id, settedIndex)"
                      v-if="item.price_register[0]"
                    >
                      {{ item.price_register[0].chakana_price }}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link"
                      @click="selectShtrixItem(item.product_id, settedIndex)"
                      v-if="item.price_register[0]"
                    >
                      {{ item.price_register[0].optom_price }}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link"
                      @click="selectShtrixItem(item.product_id, settedIndex)"
                      v-if="item.shtrix_table[0]"
                    >
                      {{ item.shtrix_table[0].shtrix_kod }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Ётказувчи модал (тахминан) -->
    <div class="modal fade" id="modal-kontragent" tabindex="-1" aria-labelledby="modal-kontragent-label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-kontragent-label">Янги ётказувчи</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              v-model="kontragent.name"
              class="form-control"
              placeholder="Номи"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ёпиш</button>
            <button type="button" class="btn btn-primary" @click="saveKontragent">Сақлаш</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Ётказувчилар рўйхати модал (тахминан) -->
    <div class="modal fade" id="modal-kontragentlist" tabindex="-1" aria-labelledby="modal-kontragentlist-label" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-kontragentlist-label">Ётказувчилар рўйхати</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body">
            <p>Ётказувчилар рўйхати (placeholder)</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Тўлов турлари рўйхати модал (тахминан) -->
    <div class="modal fade" id="modal-paytypelist" tabindex="-1" aria-labelledby="modal-paytypelist-label" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-paytypelist-label">Тўлов турлари рўйхати</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body">
            <p>Тўлов турлари рўйхати (placeholder)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import axios from 'axios';
import mitt from 'mitt';
// import VueNumeric from 'vue-numeric';

const emitter = mitt();

export default defineComponent({
  name: 'KirimForm',
  props: {
    datas: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // Reaktiv ma'lumotlar
    const formData = reactive({ ...props.datas });
    const settings = ref([
      { column: '№', width: 70, view: true },
      { column: 'shtrix_kod', width: 120, view: true },
      { column: 'product_id', width: 300, view: true },
      { column: 'current_balance', width: 100, view: true },
      { column: 'count', width: 100, view: true },
      { column: 'kontragent_price', width: 100, view: true },
      { column: 'kontragent_summa', width: 120, view: true },
      { column: 'debit_price', width: 100, view: true },
      { column: 'debit_summa', width: 120, view: true },
      { column: 'chakana_percent', width: 100, view: true },
      { column: 'chakana_price', width: 100, view: true },
      { column: 'chakana_dollar_price', width: 100, view: true },
      { column: 'optom_percent', width: 100, view: true },
      { column: 'optom_price', width: 100, view: true },
      { column: 'optom_dollar_price', width: 100, view: true },
      { column: 'del', width: 70, view: true },
      { column: 'pack_count', width: 100, view: true },
      { column: 'pack_price', width: 100, view: true },
    ]);
    const kontragent = ref({ name: '' });
    const shtrixList = ref([]);
    const settedIndex = ref(null);
    const kontragentList = ref([]);
    const skladList = ref([]);
    const paytypeList = ref([]);
    const filter = ref('');
    const search = ref('');
    const changedisabled = ref(false);
    const sending = ref(false);
    const skladhave = ref(false);
    const focusset = ref(null);
    const settedRule = reactive({ change: true });
    const productList = ref([]); // Yangi mahsulotlar ro'yxati

    // Modal boshqaruvi
    let modals = {};

    // Ma'lumotlarni yuklash
    onMounted(() => {
      loadSettings();
      fetchKontragent();
      fetchKontragentList();
      fetchSkladList();
      fetchPaytypeList();
      fetchProductList(); // Mahsulotlarni yuklash
    });

    // Mahsulotlar ro'yxatini olish
    async function fetchProductList() {
      try {
        const response = await axios.get('/api/v1/product'); // Mahsulotlar endpointini moslashtiring
        productList.value = response.data.map(item => ({
          id: item.id,
          extra_name: item.name,
          shtrix_kod: item.shtrix_table[0]?.shtrix_kod || '',
        }));
      } catch (error) {
        console.error('Product list error:', error);
      }
    }

    async function fetchKontragent() {
      const res = await axios.get('/api/v1/kontragent');
      kontragent.value = res.data;
    }

    async function fetchKontragentList() {
      const res = await axios.get('/api/v1/kontragent/all/0');
      kontragentList.value = res.data;
    }

    async function fetchSkladList() {
      const res = await axios.get('/api/v1/sklads/skladnames');
      skladList.value = res.data;
    }

    async function fetchPaytypeList() {
      const res = await axios.get('/api/v1/pay-type');
      paytypeList.value = res.data;
    }

    onBeforeUnmount(() => {
      store.commit('setPrixodComponent', null);
      emitter.all.clear();
      window.removeEventListener('storage', handleStorage);
    });

    // Computed xususiyatlar
    const width1 = computed(() => {
      return `${parseInt(settings.value[0].width) + parseInt(settings.value[1].width) + parseInt(settings.value[2].width) + parseInt(settings.value[3].width)}px ` +
        `${parseInt(settings.value[16].width) + parseInt(settings.value[4].width)}px ` +
        `${parseInt(settings.value[5].width) + parseInt(settings.value[17].width) + parseInt(settings.value[7].width)}px ` +
        `${parseInt(settings.value[6].width) + parseInt(settings.value[8].width)}px ` +
        `${parseInt(settings.value[9].width) + parseInt(settings.value[12].width)}px ` +
        `${parseInt(settings.value[10].width) + parseInt(settings.value[11].width)}px ` +
        `${parseInt(settings.value[13].width) + parseInt(settings.value[14].width)}px ` +
        `${parseInt(settings.value[15].width)}px`;
    });

    const width2 = computed(() => {
      return settings.value.map(item => `${parseInt(item.width)}px`).join(' ');
    });

    const filteredRows = computed(() => {
      return shtrixList.value.filter(row => {
        const name = row.extra_name.toString().toLowerCase();
        const searchTerm = filter.value.toLowerCase();
        return name.includes(searchTerm);
      });
    });

    const paginated = computed(() => {
      return productList.value;
    });

    // Metodlar
    const formatNumber = (value, precision = 2) => {
      if (value === null || value === undefined) return '0';
      return parseFloat(value).toLocaleString('uz-UZ', { minimumFractionDigits: precision, maximumFractionDigits: precision });
    };

    const loadSettings = async () => {
      try {
        const response = await axios.post('api/v1/sklad-settings', {
          sklad_id: localStorage.getItem('sklad_id'),
          key: 'prixod',
        });
        if (!response.data.data) {
          await saveSettings();
        } else {
          const value = JSON.parse(response.data.data);
          if (value.length < settings.value.length) {
            settings.value = [...value, ...settings.value.slice(value.length)];
          } else {
            settings.value = value;
          }
        }
      } catch (error) {
        console.error('Load settings error:', error);
      }
    };

    const saveSettings = async () => {
      try {
        const stringsettings = JSON.stringify(settings.value);
        await axios.patch('api/v1/sklad-settings', {
          sklad_id: localStorage.getItem('sklad_id'),
          key: 'prixod',
          data: stringsettings,
        });
      } catch (error) {
        console.error('Save settings error:', error);
      }
    };

    const createProduct = (index, search) => {
      localStorage.setItem('product_name', search);
      localStorage.setItem('shtrix_code', formData.prixod_table[index].shtrix_kod);
      store.commit('setSelectedIndex', index);
      const routeData = router.resolve({ name: 'Товар модал create' });
      window.open(routeData.href, '_blank', 'width=1400, height=1000');
    };

    const selectProduct = (index) => {
      store.commit('setSelectedIndex', index);
      const routeData = router.resolve({ name: 'Товар модал' });
      window.open(routeData.href, '_blank', 'width=1200, height=1000');
    };

    const selectShtrixItem = (productId, index) => {
      formData.prixod_table[index].product_id = productId;
      productChange(index);
      modals['modal-shtrix'].hide();
    };

    const productChange = async (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        item.optom_price = 0;
        item.chakana_price = 0;
        try {
          const response = await axios.post('api/v1/product/price-balance', {
            product_id: item.product_id,
            sklad_id: formData.sklad_id,
          });
          item.current_balance = response.data.balance || 0; // Қолдиқни аниқ олиш
          if (formData.pay_type_id === 3) {
            if (response.data.price_type === 2) {
              item.kontragent_price = response.data.delivery_price;
              item.pack_price = item.pack_norma * response.data.delivery_price;
              item.debit_price = response.data.delivery_price;
            } else if (response.data.price_type === 1) {
              item.kontragent_price = response.data.delivery_price / formData.dollar_rate;
              item.pack_price = item.pack_norma * response.data.delivery_price / formData.dollar_rate;
              item.debit_price = response.data.delivery_price / formData.dollar_rate;
              window.alert('Бу товар аввал бошқа валютада келган');
            }
            if (response.data.optom_dollar_price) {
              item.optom_dollar_price = response.data.optom_dollar_price;
              item.optom_price = response.data.optom_price;
              item.optom_percent = parseFloat((response.data.optom_dollar_price / item.debit_price) * 100 - 100).toFixed(2);
            }
            if (response.data.chakana_dollar_price) {
              item.chakana_dollar_price = response.data.chakana_dollar_price;
              item.chakana_price = response.data.chakana_price;
              item.chakana_percent = parseFloat((response.data.chakana_dollar_price / item.debit_price) * 100 - 100).toFixed(2);
            }
          } else {
            item.current_balance = response.data.balance || 0; // Қолдиқни яна аниқлаш
            if (response.data.price_type === 1) {
              item.kontragent_price = response.data.delivery_price;
              item.debit_price = response.data.delivery_price;
              item.pack_price = response.data.delivery_price * item.pack_norma;
            } else if (response.data.price_type === 2) {
              item.kontragent_price = response.data.delivery_price * formData.dollar_rate;
              item.pack_price = item.pack_norma * response.data.delivery_price * formData.dollar_rate;
              item.debit_price = response.data.delivery_price * formData.dollar_rate;
              window.alert('Бу товар аввал бошқа валютада келган');
            }
            if (response.data.optom_dollar_price) {
              item.optom_dollar_price = response.data.optom_dollar_price;
              item.optom_price = response.data.optom_price;
              item.optom_percent = parseFloat((response.data.optom_price / item.debit_price) * 100 - 100).toFixed(2);
            }
            if (response.data.chakana_dollar_price) {
              item.chakana_dollar_price = response.data.chakana_dollar_price;
              item.chakana_price = response.data.chakana_price;
              item.chakana_percent = parseFloat((response.data.chakana_price / item.debit_price) * 100 - 100).toFixed(2);
            }
          }
          const productResponse = await axios.get(`api/v1/product/id/${item.product_id}`);
          item.pack_norma = productResponse.data.pack_count;
          item.shtrix_kod = productResponse.data.shtrix_table[0]?.shtrix_kod || '';
          summa();
        } catch (error) {
          console.error('Product change error:', error);
          item.current_balance = 0; // Хатоликда нол қўйиш
        }
      }
    };

    const shtrix = async (index) => {
      const shtrix = formData.prixod_table[index].shtrix_kod;
      try {
        const response = await axios.post(`api/v1/product/shtrix2/${shtrix}`, {
          sklad_id: formData.sklad_id,
        });
        if (!response.data[0]) {
          // Hech narsa topilmadi
        } else if (response.data[1]) {
          settedIndex.value = index;
          shtrixList.value = response.data;
          modals['modal-shtrix'].show();
        } else {
          formData.prixod_table[index].product_id = response.data[0].product_id;
          productChange(index);
          focusNextInput();
        }
      } catch (error) {
        console.error('Shtrix error:', error);
      }
    };

    const addTable = (type = 'default') => {
      formData.prixod_table.push({
        product_id: 0,
        current_balance: 0,
        count: 0,
        debit_price: 0,
        debit_summa: 0,
        kontragent_price: 0,
        kontragent_summa: 0,
        chakana_percent: 0,
        optom_percent: 0,
        chakana_price: 0,
        chakana_dollar_price: 0,
        optom_price: 0,
        optom_dollar_price: 0,
        chakana_summa: 0,
        optom_summa: 0,
        shtrix_kod: '',
        pack_count: 0,
        pack_price: 0,
        pack_norma: 0,
      });
      if (type === 'default') {
        tableFocus();
      }
    };

    const summa = () => {
      formData.summa = 0;
      formData.count_all = 0;
      formData.prixod_summa = 0;
      formData.prixod_table.forEach(item => {
        formData.summa += parseFloat(item.kontragent_summa || 0);
        formData.count_all += parseFloat(item.count || 0);
        formData.prixod_summa += parseFloat(item.debit_summa || 0);
      });
    };

    const saveDocument = async (type = 'default') => {
      if (sending.value) return;
      sending.value = true;
      if (!formData.rasxod_summa) formData.rasxod_summa = 0;
      const method = route.path === '/kirim/create' ? 'post' : 'patch';
      const url = route.path === '/kirim/create' ? 'api/v1/prixod' : `api/v1/prixod/id/${route.params.id}`;
      if (method === 'patch' && store.state.saved === 1) {
        summa();
        formData.updated_at = Math.floor(Date.now() / 1000);
      }
      try {
        const response = await axios({ method, url, data: formData });
        store.commit('setSaved', null);
        if (type === 'save') {
          router.push({ path: `/kirim/update/${response.data.id}` });
        } else {
          router.push({ path: '/kirim' });
        }
      } catch (error) {
        console.error('Save document error:', error);
        store.commit('setErrors', error.message || 'Хатолик юз берди');
      } finally {
        sending.value = false;
      }
    };

    const closePage = (path) => {
      if (store.state.saved) {
        const answer = window.confirm('Сизда сақланмаган маълумотлар мавjud. Сақлансинми?');
        if (answer) {
          saveDocument();
          return;
        }
      }
      store.commit('setSaved', null);
      router.push(path);
    };

    const setDatetime = (date) => {
      try {
        return new Date(date * 1000).toISOString().slice(0, 16);
      } catch {
        return '';
      }
    };

    const changePrice = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        item.pack_price = item.kontragent_price * item.pack_norma;
        if (item.kontragent_price > 0) {
          item.debit_price = item.kontragent_price;
          item.debit_summa = item.debit_price * item.count;
        }
        item.kontragent_summa = item.kontragent_price * item.count;
        summa();
      }
    };

    const changePackPrice = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        if (item.pack_price > 0) {
          item.kontragent_price = item.pack_price / item.pack_norma;
        }
        if (item.kontragent_price > 0) {
          item.debit_price = item.kontragent_price;
          item.debit_summa = item.debit_price * item.count;
        }
        item.kontragent_summa = item.kontragent_price * item.count;
        summa();
      }
    };

    const changeCount = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        if (item.count > 0) {
          item.pack_count = item.count / item.pack_norma;
        }
        if (item.kontragent_price > 0) {
          item.kontragent_summa = item.count * item.kontragent_price;
        }
        if (item.debit_price > 0) {
          item.debit_summa = item.count * item.debit_price;
        }
        if (item.optom_price > 0) {
          item.optom_summa = item.count * item.optom_price;
        }
        if (item.chakana_price > 0) {
          item.chakana_summa = item.count * item.chakana_price;
        }
        summa();
      }
    };

    const changePack = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        item.count = item.pack_count * item.pack_norma;
        if (item.kontragent_price > 0) {
          item.kontragent_summa = item.count * item.kontragent_price;
        }
        if (item.debit_price > 0) {
          item.debit_summa = item.count * item.debit_price;
        }
        if (item.optom_price > 0) {
          item.optom_summa = item.count * item.optom_price;
        }
        if (item.chakana_price > 0) {
          item.chakana_summa = item.count * item.chakana_price;
        }
        summa();
      }
    };

    const changePercentOptom = (index) => {
      const item = formData.prixod_table[index];
      if (formData.pay_type_id === 3) {
        item.optom_dollar_price = item.debit_price * (item.optom_percent / 100 + 1);
        item.optom_price = item.optom_dollar_price * formData.dollar_rate;
        item.optom_summa = item.optom_price * item.count;
      } else {
        item.optom_price = item.debit_price * (item.optom_percent / 100 + 1);
        item.optom_summa = item.optom_price * item.count;
        item.optom_dollar_price = item.optom_price / formData.dollar_rate;
      }
    };

    const changePercentChakana = (index) => {
      const item = formData.prixod_table[index];
      if (formData.pay_type_id === 3) {
        item.chakana_dollar_price = item.debit_price * (item.chakana_percent / 100 + 1);
        item.chakana_price = item.chakana_dollar_price * formData.dollar_rate;
        item.chakana_summa = item.chakana_price * item.count;
      } else {
        item.chakana_price = item.debit_price * (item.chakana_percent / 100 + 1);
        item.chakana_summa = item.chakana_price * item.count;
        item.chakana_dollar_price = item.chakana_price / formData.dollar_rate;
      }
    };

    const changePriceOptom = (index) => {
      const item = formData.prixod_table[index];
      if (item.debit_price > 0) {
        if (formData.pay_type_id === 3) {
          item.optom_dollar_price = item.optom_price / formData.dollar_rate;
          item.optom_percent = parseFloat((item.optom_dollar_price / item.debit_price) * 100 - 100).toFixed(2);
          item.optom_summa = item.optom_price * item.count;
        } else {
          item.optom_percent = parseFloat((item.optom_price / item.debit_price) * 100 - 100).toFixed(2);
          item.optom_summa = item.optom_price * item.count;
          item.optom_dollar_price = item.optom_price / formData.dollar_rate;
        }
      }
    };

    const changePriceOptomDollar = (index) => {
      const item = formData.prixod_table[index];
      if (item.debit_price > 0) {
        if (formData.pay_type_id === 3) {
          item.optom_price = item.optom_dollar_price * formData.dollar_rate;
          item.optom_percent = parseFloat((item.optom_dollar_price / item.debit_price) * 100 - 100).toFixed(2);
          item.optom_summa = item.optom_price * item.count;
        } else {
          item.optom_price = item.optom_dollar_price * formData.dollar_rate;
          item.optom_percent = parseFloat((item.optom_price / item.debit_price) * 100 - 100).toFixed(2);
          item.optom_summa = item.optom_price * item.count;
        }
      }
    };

    const changePriceChakana = (index) => {
      const item = formData.prixod_table[index];
      if (item.debit_price > 0) {
        if (formData.pay_type_id === 3) {
          item.chakana_dollar_price = item.chakana_price / formData.dollar_rate;
          item.chakana_percent = parseFloat((item.chakana_dollar_price / item.debit_price) * 100 - 100).toFixed(2);
          item.chakana_summa = item.chakana_price * item.count;
        } else {
          item.chakana_percent = parseFloat((item.chakana_price / item.debit_price) * 100 - 100).toFixed(2);
          item.chakana_summa = item.chakana_price * item.count;
          item.chakana_dollar_price = item.chakana_price / formData.dollar_rate;
        }
      }
    };

    const changePriceChakanaDollar = (index) => {
      const item = formData.prixod_table[index];
      if (item.debit_price > 0) {
        if (formData.pay_type_id === 3) {
          item.chakana_price = item.chakana_dollar_price * formData.dollar_rate;
          item.chakana_percent = parseFloat((item.chakana_dollar_price / item.debit_price) * 100 - 100).toFixed(2);
          item.chakana_summa = item.chakana_price * item.count;
        } else {
          item.chakana_price = item.chakana_dollar_price * formData.dollar_rate;
          item.chakana_percent = parseFloat((item.chakana_price / item.debit_price) * 100 - 100).toFixed(2);
          item.chakana_summa = item.chakana_price * item.count;
        }
      }
    };

    const rasxodXisob = () => {
      if (!changedisabled.value) {
        if (formData.rasxod_summa && formData.summa) {
          const ortacharasxod = formData.rasxod_summa / formData.summa;
          formData.prixod_table.forEach((item, index) => {
            item.debit_price = parseFloat(item.kontragent_price) + item.kontragent_price * ortacharasxod;
            item.debit_summa = item.debit_price * item.count;
            if (formData.pay_type_id === 3) {
              if (item.chakana_dollar_price > 0) changePriceChakanaDollar(index);
              if (item.optom_dollar_price > 0) changePriceOptomDollar(index);
            } else {
              if (item.optom_price > 0) changePriceOptom(index);
              if (item.chakana_price > 0) changePriceChakana(index);
            }
          });
        } else {
          formData.prixod_table.forEach((item, index) => {
            item.debit_price = item.kontragent_price;
            item.debit_summa = item.debit_price * item.count;
            if (formData.pay_type_id === 3) {
              if (item.chakana_dollar_price > 0) changePriceChakanaDollar(index);
              if (item.optom_dollar_price > 0) changePriceOptomDollar(index);
            } else {
              if (item.optom_price > 0) changePriceOptom(index);
              if (item.chakana_price > 0) changePriceChakana(index);
            }
          });
        }
        summa();
      }
    };

    const rasxodXisobPercent = () => {
      if (!changedisabled.value) {
        if (formData.rasxod_summa && formData.summa) {
          const ortacharasxod = formData.rasxod_summa / formData.summa;
          formData.prixod_table.forEach((item, index) => {
            item.debit_price = parseFloat(item.kontragent_price) + item.kontragent_price * ortacharasxod;
            item.debit_summa = item.debit_price * item.count;
            if (item.chakana_dollar_price > 0) changePercentChakana(index);
            if (item.optom_dollar_price > 0) changePercentOptom(index);
          });
        } else {
          formData.prixod_table.forEach((item, index) => {
            item.debit_price = item.kontragent_price;
            item.debit_summa = item.debit_price * item.count;
            if (item.chakana_dollar_price > 0) changePercentChakana(index);
            if (item.optom_dollar_price > 0) changePercentOptom(index);
          });
        }
        summa();
      }
    };

    const trashItem = (index) => {
      const answer = window.confirm('Маълумотлар ўчирилсинми?');
      if (answer) {
        formData.summa -= formData.prixod_table[index].kontragent_summa;
        formData.prixod_summa -= formData.prixod_table[index].debit_summa;
        formData.count_all -= formData.prixod_table[index].count;
        formData.prixod_table.splice(index, 1);
      }
    };

    const openModal = (modalId) => {
      if (modals[modalId]) modals[modalId].show();
    };

    const saveKontragent = () => {
      console.log('Сақлаш контрагент:', kontragent.value);
      modals['modal-kontragent'].hide();
    };

    const tableFocus = () => {
      console.log('Жадвал фокус');
    };

    const setRule = (path) => {
      console.log('Қўллаш қоида:', path);
    };

    const next = () => {
      console.log('Кейинги');
    };

    const label = (value) => {
      return value;
    };

    const focusNextInput = () => {
      const activeElement = document.activeElement;
      const inputs = Array.from(document.querySelectorAll('input, select, textarea, button')).filter(el => el.offsetParent !== null);
      const index = inputs.indexOf(activeElement);
      if (index >= 0 && index + 2 < inputs.length) {
        inputs[index + 2].focus();
      }
    };

    const handleStorage = () => {
      if (localStorage.getItem('setted_product') > 0) {
        productList();
        formData.prixod_table[store.state.selected_index].product_id = parseInt(localStorage.getItem('setted_product'));
        if (store.state.selected_index != null) {
          productChange(store.state.selected_index);
        }
        localStorage.setItem('setted_product', 0);
        setTimeout(() => next(), 1000);
      }
    };

    return {
      formData,
      settings,
      kontragent,
      shtrixList,
      settedIndex,
      kontragentList,
      skladList,
      paytypeList,
      filter,
      search,
      changedisabled,
      sending,
      skladhave,
      focusset,
      settedRule,
      width1,
      width2,
      filteredRows,
      paginated,
      loadSettings,
      saveSettings,
      createProduct,
      selectProduct,
      selectShtrixItem,
      productChange,
      shtrix,
      addTable,
      summa,
      saveDocument,
      closePage,
      setDatetime,
      changePrice,
      changePackPrice,
      changeCount,
      changePack,
      changePercentOptom,
      changePercentChakana,
      changePriceOptom,
      changePriceOptomDollar,
      changePriceChakana,
      changePriceChakanaDollar,
      rasxodXisob,
      rasxodXisobPercent,
      trashItem,
      openModal,
      saveKontragent,
      tableFocus,
      setRule,
      next,
      label,
      focusNextInput,
      handleStorage,
      formatNumber,
    };
  },
});
</script>

<style scoped>
.table-responsive {
  max-height: calc(100vh - 325px);
  overflow-y: auto;
  overflow-x: auto;
}

.enhanced-table th,
.enhanced-table td {
  border: 2px solid #3498db; /* Чуқур чекиш */
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  background: linear-gradient(135deg, #ffffff, #ecf0f1); /* Градиент фон */
  transition: background-color 0.3s ease;
}

.enhanced-table th {
  background: linear-gradient(135deg, #2c3e50, #34495e); /* Тўғридан-тўғри қўлқоп градиент */
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.enhanced-table .table-row:hover {
  background: linear-gradient(135deg, #d5f4e6, #ffffff); /* Ёғон ховер эффекти */
}

.tovar,
.kolvo,
.kirim,
.nasenka,
.sena {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-control-sm,
.btn-sm {
  font-size: 0.85rem;
}

.shadow-sm {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modallist,
.pluss {
  margin-left: 5px;
}

.text-success {
  color: #27ae60 !important;
}
/* Jadval ustun ranglarini */
.enhanced-table .tovar {
  background-color: #cfe2ff; /* ko‘k */
}
.enhanced-table .kolvo {
  background-color: #f8d7da; /* qizil */
}
.enhanced-table .kirim {
  background-color: #d1e7dd; /* yashil */
}
.enhanced-table .nasenka {
  background-color: #cff4fc; /* och ko‘k */
}
.enhanced-table .sena {
  background-color: #ffe5b4; /* to‘q sariq */
}

/* Inputlarni markazlashtirish */
.enhanced-table input.form-control-sm {
  text-align: center;
}

/* Jadval hover uchun */
.enhanced-table tbody tr:hover {
  background-color: #f0f0f0;
}

</style>