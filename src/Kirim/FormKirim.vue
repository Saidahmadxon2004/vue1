

<template>
  <!-- The template remains unchanged to preserve the design -->
  <div class="container-fluid py-4 app-bg">
    <div class="row align-items-center mb-4 header-section">
      <div class="col-md-6">
        <h4 class="fw-bold text-primary app-title">
          {{ $route.name }}
          <span v-if="$route.params.id" class="text-secondary document-number">№{{ $route.params.id }}</span>
          <button
            v-if="$route.params.id && settedRule.change"
            type="button"
            class="btn btn-primary btn-sm ms-2 action-btn"
            @click="change"
            title="Hujjatni o'zgartirish"
          >
            <i class="bi bi-pencil-square me-1"></i> Ўзгартириш
          </button>
        </h4>
      </div>
      <div class="col-md-4 d-flex align-items-center">
        <label for="dollar_rate" class="form-label me-2 text-dark label-text">Курс:</label>
        <input
          :disabled="changedisabled"
          type="text"
          v-model="formData.dollar_rate"
          class="form-control form-control-sm app-input"
          id="dollar_rate"
          placeholder="Valyuta kursi"
        />
      </div>
      <div class="col-md-2 text-end">
        <button
          type="button"
          class="btn btn-danger btn-sm close-btn"
          @click="closePage('/kirim')"
          title="Sahifani yopish"
        >
          <i class="bi bi-x-lg"></i> Ёпиш
        </button>
      </div>
    </div>

    <div class="row mb-4 form-section">
      <div class="col-md-1">
        <label for="number" class="form-label label-text">Факт №</label>
        <input
          :disabled="changedisabled"
          type="number"
          class="form-control form-control-sm app-input"
          v-model="formData.number"
          id="number"
          placeholder="Hujjat raqami"
        />
      </div>
      <div class="col-md-2">
        <label class="form-label label-text">Вақт</label>
        <input
          type="datetime-local"
          disabled
          class="form-control form-control-sm app-input disabled-input"
          :value="setDatetime(formData.created_at)"
        />
      </div>
      <div class="col-md-2">
        <label class="form-label label-text">Склад</label>
        <v-select
          :disabled="skladhave"
          :clearable="false"
          class="form-control-sm app-select"
          :options="skladList"
          v-model="formData.sklad_id"
          :reduce="name => name.id"
          label="name"
          placeholder="Sklad tanlang"
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
        <label class="form-label label-text">Ётказувчи</label>
        <v-select
          v-model="formData.kontragent_id"
          :options="kontragentList"
          :reduce="item => item.id"
          label="name"
          @update:modelValue="summa"
          placeholder="Yetkazuvchini tanlang"
        >
          <template #search="{ attributes, events }">
            <input class="vs__search" ref="kontragentSearch" v-bind="attributes" v-on="events" />
            <button
              :disabled="changedisabled"
              type="button"
              class="modallist btn btn-sm btn-outline-secondary ms-1 mini-btn"
              @click="openModal('modal-kontragentlist')"
              title="Yetkazuvchilar ro'yxati"
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
                class="pluss btn btn-sm btn-primary ms-1 mini-btn"
                @click="kontragent.name = search; openModal('modal-kontragent')"
                title="Yangi yetkazuvchi qo'shish"
              >
                +
              </button>
            </template>
            <em style="opacity: 0.5" v-else>Маълумот йўқ</em>
          </template>
        </v-select>
      </div>
      <div class="col-md-2">
        <label class="form-label label-text">Тўлов тури</label>
        <v-select
          :disabled="changedisabled"
          :clearable="false"
          class="form-control-sm app-select"
          :options="paytypeList"
          v-model="formData.pay_type_id"
          :reduce="name => name.id"
          label="name"
          placeholder="To'lov turini tanlang"
        >
          <template #search="{ attributes, events }">
            <input class="vs__search" v-bind="attributes" v-on="events" />
            <button
              :disabled="changedisabled"
              type="button"
              class="modallist btn btn-sm btn-outline-secondary ms-1 mini-btn"
              @click="openModal('modal-paytypelist')"
              title="To'lov turlari ro'yxati"
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
        <label class="form-label label-text">Расход</label>
        <input
          :disabled="changedisabled"
          type="text"
          v-model.number="formData.rasxod_summa"
          class="form-control form-control-sm app-input"
          placeholder="Rasxod summasi"
        />
      </div>
      <div class="col-md-1">
        <label class="form-label label-text">Скидка</label>
        <input
          :disabled="changedisabled"
          type="text"
          v-model="formData.skidka_summa"
          class="form-control form-control-sm app-input"
          placeholder="Skidka summasi"
        />
      </div>
    </div>

    <div class="table-responsive app-table-container">
      <table class="table table-hover table-bordered align-middle data-table">
        <thead class="table-header-group">
          <tr :style="'display: grid; grid-template-columns:' + width1">
            <th colspan="4" class="header-category header-category-1 text-center">Товар</th>
            <th colspan="2" class="header-category header-category-2 text-center">Сони</th>
            <th colspan="3" class="header-category header-category-3 text-center">Нарх</th>
            <th colspan="3" class="header-category header-category-3 text-center">Жами сумма</th>
            <th colspan="2" class="header-category header-category-4 text-center">Наценка %</th>
            <th colspan="2" class="header-category header-category-5 text-center">Чакана Нарх</th>
            <th colspan="2" class="header-category header-category-6 text-center">Улгуржи Нарх</th>
            <th class="text-center bg-dark header-category"></th>
          </tr>
          <tr :style="'display: grid; grid-template-columns:' + width2">
            <th v-if="settings[0].view" class="sub-header sub-header-1">№</th>
            <th v-if="settings[1].view" class="sub-header sub-header-1">Штрих код</th>
            <th v-if="settings[2].view" class="sub-header sub-header-1">Номи</th>
            <th v-if="settings[3].view" class="sub-header sub-header-1">Қолдиқ</th>
            <th v-if="settings[16].view" class="sub-header sub-header-2">Пачка</th>
            <th v-if="settings[4].view" class="sub-header sub-header-2">Дона</th>
            <th v-if="settings[17].view" class="sub-header sub-header-3">Пачка бўйича</th>
            <th v-if="settings[5].view" class="sub-header sub-header-3">Дона бўйича</th>
            <th v-if="settings[7].view" class="sub-header sub-header-3">Себет</th>
            <th v-if="settings[6].view" class="sub-header sub-header-3">Жами сумма</th>
            <th v-if="settings[8].view" class="sub-header sub-header-3">Себет сумма</th>
            <th v-if="settings[9].view" class="sub-header sub-header-4">Чакана</th>
            <th v-if="settings[12].view" class="sub-header sub-header-4">Улгуржи</th>
            <th v-if="settings[10].view" class="sub-header sub-header-5">Сўм</th>
            <th v-if="settings[11].view" class="sub-header sub-header-5 text-success">USD</th>
            <th v-if="settings[13].view" class="sub-header sub-header-6">Сўм</th>
            <th v-if="settings[14].view" class="sub-header sub-header-6 text-success">USD</th>
            <th v-if="settings[15].view" class="text-center bg-dark sub-header"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in formData.prixod_table"
            :key="index"
            :style="'display: grid; grid-template-columns:' + width2"
            class="table-row-item"
          >
            <td v-if="settings[0].view" class="text-center cell-data cell-group-1">{{ index + 1 }}</td>
            <td v-if="settings[1].view" class="cell-data cell-group-1">
              <input
                :disabled="changedisabled"
                class="form-control form-control-sm text-center table-input"
                type="text"
                v-model="item.shtrix_kod"
                @change="shtrix(index)"
                placeholder="Kod"
              />
            </td>
            <td v-if="settings[2].view" class="v-select-cell cell-data cell-group-1">
              <v-select
                :disabled="changedisabled"
                :clearable="false"
                class="form-control-sm table-select"
                :options="paginated"
                v-model="item.product_id"
                :reduce="extra_name => extra_name.id"
                label="extra_name"
                @update:modelValue="productChange(index)"
                @search="query => (search = query)"
                placeholder="Mahsulot tanlang"
              >
                <template #list-footer>
                  <li class="text-center fw-bold text-info list-footer-text">F4 умумий рўйхат</li>
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
                    class="modallist btn btn-sm btn-outline-secondary ms-1 mini-btn"
                    @click="selectProduct(index)"
                    title="Mahsulotlar ro'yxati"
                  >
                    <i class="bi bi-three-dots"></i>
                  </button>
                </template>
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    <em><b>{{ search }}</b></em> бўйича маълумот йўқ
                    <button
                      type="button"
                      class="pluss btn btn-sm btn-primary ms-1 mini-btn"
                      @click="createProduct(index, search)"
                      title="Yangi mahsulot qo'shish"
                    >
                      +
                    </button>
                  </template>
                  <em style="opacity: 0.5" v-else>Маълумот йўқ</em>
                </template>
              </v-select>
            </td>
            <td v-if="settings[3].view" class="text-center cell-data text-info cell-group-1">{{ formatNumber(item.current_balance, 0) }}</td>
            <td v-if="settings[16].view" class="cell-data cell-group-2">
              <input
                :disabled="changedisabled"
                separator="space"
                class="form-control form-control-sm text-center table-input"
                v-bind:precision="3"
                v-model="item.pack_count"
                @input="changePack(index)"
                placeholder="Paket soni"
              />
            </td>
            <td v-if="settings[4].view" class="cell-data cell-group-2">
              <input
                :disabled="changedisabled"
                type="number"
                step="0.001"
                class="form-control form-control-sm text-center table-input"
                v-model.number="item.count"
                @input="changeCount(index)"
                placeholder="Dona soni"
              />
            </td>
            <td v-if="settings[17].view" class="cell-data cell-group-3">
              <input
                :disabled="changedisabled"
                separator="space"
                class="form-control form-control-sm text-center table-input"
                v-bind:precision="3"
                v-model="item.pack_price"
                @input="changePackPrice(index)"
                placeholder="Paket narxi"
              />
            </td>
            <td v-if="settings[5].view" class="cell-data cell-group-3">
              <input
                :disabled="changedisabled"
                type="number"
                step="0.001"
                class="form-control form-control-sm text-center table-input"
                v-model.number="item.kontragent_price"
                @input="changePrice(index)"
                placeholder="Narxi"
              />
            </td>
            <td v-if="settings[7].view" class="text-center cell-data text-success cell-group-3">{{ formatNumber(item.debit_price, 3) }}</td>
            <td v-if="settings[6].view" class="text-center cell-data text-primary fw-bold cell-group-3">{{ formatNumber(item.kontragent_summa) }}</td>
            <td v-if="settings[8].view" class="text-center cell-data text-success fw-bold cell-group-3">{{ formatNumber(item.debit_summa) }}</td>
            <td v-if="settings[9].view" class="cell-data cell-group-4">
              <input
                type="number"
                :disabled="changedisabled"
                class="form-control form-control-sm text-center table-input"
                v-model="item.chakana_percent"
                @input="changePercentChakana(index)"
                placeholder="Chakana %"
              />
            </td>
            <td v-if="settings[12].view" class="cell-data cell-group-4">
              <input
                type="number"
                :disabled="changedisabled"
                class="form-control form-control-sm text-center table-input"
                v-model="item.optom_percent"
                @input="changePercentOptom(index)"
                placeholder="Ulgurji %"
              />
            </td>
            <td v-if="settings[10].view" class="cell-data cell-group-5">
              <input
                :disabled="changedisabled"
                separator="space"
                class="form-control form-control-sm text-center table-input"
                v-bind:precision="2"
                v-model="item.chakana_price"
                @change="changePriceChakana(index)"
                placeholder="Chakana So'm"
              />
            </td>
            <td v-if="settings[11].view" class="text-success cell-data cell-group-5">
              <input
                :disabled="changedisabled"
                separator="space"
                class="form-control form-control-sm text-center table-input"
                v-bind:precision="3"
                v-model="item.chakana_dollar_price"
                @change="changePriceChakanaDollar(index)"
                placeholder="Chakana USD"
              />
            </td>
            <td v-if="settings[13].view" class="cell-data cell-group-6">
              <input
                :disabled="changedisabled"
                separator="space"
                class="form-control form-control-sm text-center table-input"
                v-bind:precision="2"
                v-model="item.optom_price"
                @change="changePriceOptom(index)"
                placeholder="Ulgurji So'm"
              />
            </td>
            <td v-if="settings[14].view" class="text-success cell-data cell-group-6">
              <input
                :disabled="changedisabled"
                separator="space"
                class="form-control form-control-sm text-center table-input"
                v-bind:precision="3"
                v-model="item.optom_dollar_price"
                @change="changePriceOptomDollar(index)"
                placeholder="Ulgurji USD"
              />
            </td>
            <td v-if="settings[15].view" class="text-center cell-data action-cell">
              <button
                v-if="!changedisabled"
                class="btn btn-sm btn-outline-danger delete-btn"
                @click="trashItem(index)"
                title="Qatorni o'chirish"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr :style="'display: grid; grid-template-columns:' + width2" class="table-footer-row">
            <th v-if="settings[0].view" class="footer-cell cell-group-1"></th>
            <th v-if="settings[1].view" class="footer-cell cell-group-1"></th>
            <th v-if="settings[2].view" class="footer-cell cell-group-1"></th>
            <th v-if="settings[3].view" class="footer-cell cell-group-1"></th>
            <th v-if="settings[16].view" class="footer-cell cell-group-2"></th>
            <th v-if="settings[4].view" class="text-center footer-cell text-primary fw-bold cell-group-2">{{ formatNumber(formData.count_all) }}</th>
            <th v-if="settings[17].view" class="footer-cell cell-group-3"></th>
            <th v-if="settings[5].view" class="footer-cell cell-group-3"></th>
            <th v-if="settings[7].view" class="footer-cell cell-group-3"></th>
            <th v-if="settings[6].view" class="text-center footer-cell text-primary fw-bold cell-group-3">{{ formatNumber(formData.summa) }}</th>
            <th v-if="settings[8].view" class="text-center footer-cell text-success fw-bold cell-group-3">{{ formatNumber(formData.prixod_summa) }}</th>
            <th v-if="settings[9].view" class="footer-cell cell-group-4"></th>
            <th v-if="settings[12].view" class="footer-cell cell-group-4"></th>
            <th v-if="settings[10].view" class="footer-cell cell-group-5"></th>
            <th v-if="settings[11].view" class="footer-cell cell-group-5"></th>
            <th v-if="settings[13].view" class="footer-cell cell-group-6"></th>
            <th v-if="settings[14].view" class="footer-cell cell-group-6"></th>
            <th v-if="settings[15].view" class="text-center footer-cell"></th>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="row mt-4 bottom-section">
      <div class="col-md-4 d-flex align-items-center">
        <label class="form-label me-2 label-text">Изох:</label>
        <textarea
          :disabled="changedisabled"
          rows="1"
          v-model="formData.comment"
          class="form-control app-textarea"
          placeholder="Izoh qoldiring"
        ></textarea>
      </div>
      <div class="col-md-8 text-end button-group">
        <button
          :disabled="changedisabled"
          class="btn btn-primary btn-sm me-2 action-btn"
          @click="addTable()"
          title="Yangi qator qo'shish (F1)"
        >
          <i class="bi bi-plus-lg"></i> <sup>F1</sup> Қўшиш
        </button>
        <button
          :disabled="changedisabled"
          class="btn btn-outline-secondary btn-sm me-2 action-btn"
          @click="openModal('modal-settings')"
          title="Jadval sozlamalari"
        >
          <i class="bi bi-gear"></i> Сўзлама
        </button>
        <template v-if="!changedisabled">
          <button
            :disabled="sending"
            class="btn btn-outline-info btn-sm me-2 action-btn"
            @click="rasxodXisob()"
            title="Rasxodni hisoblash"
          >
            Расход
          </button>
          <button
            :disabled="sending"
            class="btn btn-success btn-sm me-2 action-btn"
            @click="saveDocument('save')"
            title="Hujjatni saqlash"
          >
            Сақлаш
          </button>
          <button
            :disabled="sending"
            class="btn btn-success btn-sm action-btn"
            @click="saveDocument()"
            title="Hujjatni saqlash va yopish (Ctrl+Enter)"
          >
            Сақлаш ва бекитиш <sup>Ctrl+Enter</sup>
          </button>
        </template>
      </div>
    </div>

    <div class="modal fade" id="modal-settings" tabindex="-1" aria-labelledby="modal-settings-label" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content app-modal-content">
          <div class="modal-header bg-primary text-white modal-header-custom">
            <h5 class="modal-title" id="modal-settings-label">Сўзлама</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body modal-body-custom">
            <table class="table table-bordered table-striped modal-table">
              <thead class="table-light">
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
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" v-model="item.view" :id="'setting-toggle-' + index">
                      <label class="form-check-label" :for="'setting-toggle-' + index"></label>
                    </div>
                  </td>
                  <td>
                    <input type="number" v-model="item.width" class="form-control form-control-sm table-input" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer modal-footer-custom">
            <button type="button" class="btn btn-secondary action-btn" data-bs-dismiss="modal">Ёпиш</button>
            <button type="button" class="btn btn-primary action-btn" @click="saveSettings">Сақлаш</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal-shtrix" tabindex="-1" aria-labelledby="modal-shtrix-label" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content app-modal-content">
          <div class="modal-header bg-primary text-white modal-header-custom">
            <h5 class="modal-title" id="modal-shtrix-label">Товар</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body modal-body-custom">
            <input
              type="text"
              class="form-control mb-3 app-input search-input"
              placeholder="Қидириш..."
              v-model="filter"
              ref="shtrixSearch"
            />
            <div class="table-responsive modal-table-responsive">
              <table class="table table-bordered table-hover modal-table">
                <thead class="table-light">
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
                        class="btn btn-link table-link"
                        @click="selectShtrixItem(item.product_id, settedIndex)"
                      >
                        {{ item.extra_name }}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-link table-link"
                        @click="selectShtrixItem(item.product_id, settedIndex)"
                      >
                        {{ item.balance }}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-link table-link"
                        @click="selectShtrixItem(item.product_id, settedIndex)"
                        v-if="item.price_register[0]"
                      >
                        {{ item.price_register[0].chakana_price }}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-link table-link"
                        @click="selectShtrixItem(item.product_id, settedIndex)"
                        v-if="item.price_register[0]"
                      >
                        {{ item.price_register[0].optom_price }}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-link table-link"
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
    </div>

    <div class="modal fade" id="modal-kontragent" tabindex="-1" aria-labelledby="modal-kontragent-label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content app-modal-content">
          <div class="modal-header bg-primary text-white modal-header-custom">
            <h5 class="modal-title" id="modal-kontragent-label">Янги ётказувчи</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body modal-body-custom">
            <input
              type="text"
              v-model="kontragent.name"
              class="form-control app-input"
              placeholder="Yetkazuvchi nomi"
            />
          </div>
          <div class="modal-footer modal-footer-custom">
            <button type="button" class="btn btn-secondary action-btn" data-bs-dismiss="modal">Ёпиш</button>
            <button type="button" class="btn btn-primary action-btn" @click="saveKontragent">Сақлаш</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal-kontragentlist" tabindex="-1" aria-labelledby="modal-kontragentlist-label" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content app-modal-content">
          <div class="modal-header bg-primary text-white modal-header-custom">
            <h5 class="modal-title" id="modal-kontragentlist-label">Ётказувчилар рўйхати</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body modal-body-custom">
            <p class="text-muted">Бу ерда етказувчилар рўйхати кўрсатилади.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal-paytypelist" tabindex="-1" aria-labelledby="modal-paytypelist-label" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content app-modal-content">
          <div class="modal-header bg-primary text-white modal-header-custom">
            <h5 class="modal-title" id="modal-paytypelist-label">Тўлов турлари рўйхати</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Ёпиш"></button>
          </div>
          <div class="modal-body modal-body-custom">
            <p class="text-muted">Бу ерда тўлов турлари рўйхати кўрсатилади.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The CSS remains unchanged to preserve the design */
.app-bg {
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #333;
}

.header-section, .form-section, .bottom-section {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-section {
  background-color: #f7f2f2;
  border: 1px solid #dcdcdc;
}

.app-title {
  color: #007bff;
  font-size: 1.8rem;
  margin-bottom: 0;
}

.document-number {
  font-size: 1.2rem;
  color: #6c757d;
}

.label-text {
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

.app-input, .app-textarea, .app-select .vs__dropdown-toggle {
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-in-out;
}

.app-input:focus, .app-textarea:focus,
.app-select .vs__dropdown-toggle:focus-within {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
  outline: none;
}

.disabled-input {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.vs__dropdown-toggle {
  display: flex;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.08);
}

.vs__dropdown-toggle:focus-within {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.25rem rgba(0,123,255,0.25);
}

.vs__selected {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.vs__search { padding: 0; margin: 0; }
.vs__search input {
  height: 24px;
  line-height: 24px;
  border: none;
  box-shadow: none;
}

.vs__actions { margin-left: auto; }

.vs__dropdown-menu {
  z-index: 1000;
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.vs__dropdown-option--highlight { background-color: #f0f2f5; }
.vs__dropdown-option--selected { background-color: #e9ecef; }

.v-select-cell { position: relative; overflow: visible !important; z-index: 1; }

.app-table-container {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 0.75rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1200px;
}

.table-header-group th {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
  color: white;
  border-bottom: 1px solid #dee2e6;
}

.header-category { font-size: 1.1rem; padding: 0.8rem; }
.sub-header { font-size: 0.9rem; }

.header-category-1, .sub-header-1 { background-color: #1a71c2; }
.header-category-2, .sub-header-2 { background-color: #c21a1a; }
.header-category-3, .sub-header-3 { background-color: #218838; }
.header-category-4, .sub-header-4 { background-color: #117a8b; }
.header-category-5, .sub-header-5 { background-color: #e08e0b; }
.header-category-6, .sub-header-6 { background-color: #e08e0b; }

.table-row-item td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e9ecef;
  border-right: 1px solid #e9ecef;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell-group-1 { background-color: #eaf2fa; }
.cell-group-2 { background-color: #fde2e2; }
.cell-group-3 { background-color: #edf8ed; }
.cell-group-4 { background-color: #e7f6f9; }
.cell-group-5, .cell-group-6 { background-color: #fff6e9; }

.footer-cell {
  padding: 0.75rem;
  font-weight: 600;
  border-top: 1px solid #dee2e6;
  border-right: 1px solid #e9ecef;
}

.table-input, .table-select .vs__dropdown-toggle {
  height: 32px;
  font-size: 0.85rem;
  padding: 0.3rem 0.6rem;
}

.table-link {
  font-size: 0.9rem;
  color: #007bff;
  text-decoration: none;
}
.table-link:hover { text-decoration: underline; }

.action-btn {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
}
.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.close-btn { padding: 0.5rem 1rem; border-radius: 0.5rem; }
.mini-btn { padding: 0.2rem 0.5rem; font-size: 0.75rem; border-radius: 0.3rem; }
.delete-btn { padding: 0.3rem 0.6rem; }

.app-modal-content {
  border-radius: 0.75rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}
.modal-header-custom {
  background-color: #007bff;
  padding: 1rem 1.5rem;
}
.modal-title { color: white; font-weight: 600; }
.btn-close-white { filter: brightness(0) invert(1); }
.modal-body-custom { padding: 1.5rem; }
.modal-footer-custom {
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
}
.modal-table {
  width: 100%;
  border-collapse: collapse;
}
.modal-table th, .modal-table td {
  padding: 0.75rem;
  border: 1px solid #e9ecef;
}
.modal-table thead th {
  background-color: #e9ecef;
  font-weight: 600;
}
.form-control, .form-select, .vs__search, .vs__selected, .vs__dropdown-toggle {
  border:none;
  padding: none;
  
}
.search-input {
  border-radius: 0.5rem;
  padding: 0.6rem 1rem;
}
</style>

      
<script>
import { defineComponent, ref, reactive, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import mitt from 'mitt';
import { Modal } from 'bootstrap';

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

    // Reactive formData
    const formData = reactive({ ...props.datas });

  watch(
  () => props.datas,
  (newVal) => {
    if (!newVal) return;

    const isUpdate = !!newVal.id; // id bor bo‘lsa update rejim

    for (const key in newVal) {
      if (key === 'prixod_table') {
        formData.prixod_table = JSON.parse(JSON.stringify(newVal.prixod_table));
      } else if (['pay_type_id', 'kontragent_id', 'dollar_rate', 'sklad_id'].includes(key)) {
        if (isUpdate) {
          formData[key] = newVal[key]; // update bo‘lsa ustidan yoz
        }
      } else {
        formData[key] = newVal[key]; // qolganini har doim yoz
      }
    }
  },
  { immediate: true }
);

    const settings = ref([
      { column: '№', width: 70, view: true },
      { column: 'shtrix_kod', width: 120, view: true },
      { column: 'product_id', width: 300, view: true },
      { column: 'current_balance', width: 120, view: true },
      { column: 'count', width: 120, view: true },
      { column: 'kontragent_price', width: 120, view: true },
      { column: 'kontragent_summa', width: 120, view: true },
      { column: 'debit_price', width: 120, view: true },
      { column: 'debit_summa', width: 120, view: true },
      { column: 'chakana_percent', width: 120, view: true },
      { column: 'chakana_price', width: 120, view: true },
      { column: 'chakana_dollar_price', width: 120, view: true },
      { column: 'optom_percent', width: 120, view: true },
      { column: 'optom_price', width: 120, view: true },
      { column: 'optom_dollar_price', width: 120, view: true },
      { column: 'del', width: 70, view: true },
      { column: 'pack_count', width: 120, view: true },
      { column: 'pack_price', width: 120, view: true },
    ]);
    const kontragent = ref({ name: '' });
    const shtrixList = ref([]);
    const settedIndex = ref(null);
    const kontragentList = ref([]);
    const skladList = ref([]);
    const paytypeList = ref([]);
    const filter = ref('');
    const search = ref('');
    const changedisabled = ref(route.path.includes('/kirim/update'));
    const sending = ref(false);
    const skladhave = ref(false);
    const focusset = ref(null);
    const settedRule = reactive({ change: true });
    const productList = ref([]);
    let modals = {};

    // Initialize modals and other setup
    onMounted(() => {
      modals['modal-settings'] = new Modal(document.getElementById('modal-settings'));
      modals['modal-shtrix'] = new Modal(document.getElementById('modal-shtrix'));
      modals['modal-kontragent'] = new Modal(document.getElementById('modal-kontragent'));
      modals['modal-kontragentlist'] = new Modal(document.getElementById('modal-kontragentlist'));
      modals['modal-paytypelist'] = new Modal(document.getElementById('modal-paytypelist'));

      loadSettings();
      fetchKontragent();
      fetchKontragentList();
      fetchSkladList();
      fetchPaytypeList();
      fetchProductList();

      store.commit('setPrixodComponent', this);
      emitter.on('kontragentone', (val) => (kontragent.value = val));
      emitter.on('kontragentall', (val) => (kontragentList.value = val));
      emitter.on('skladone', (val) => {
        skladList.value = val;
        formData.sklad_id = parseInt(localStorage.getItem('sklad_id')) || 0;
      });
      emitter.on('skladall', (val) => {
        skladList.value = val;
        formData.sklad_id = parseInt(localStorage.getItem('sklad_id')) || 0;
      });
      emitter.on('paytypeone', (val) => (paytypeList.value = val));
      emitter.on('paytypeall', (val) => (paytypeList.value = val));
      window.addEventListener('storage', handleStorage);
    });

    onBeforeUnmount(() => {
      store.commit('setPrixodComponent', null);
      emitter.all.clear();
      window.removeEventListener('storage', handleStorage);
    });

    // Handle storage event
    function handleStorage(event) {
      if (event.key === 'sklad_id') {
        formData.sklad_id = parseInt(event.newValue) || 0;
      }
    }

    // Fetch data methods
    async function fetchProductList() {
      try {
        const response = await axios.get('/api/v1/product');
        productList.value = response.data.map(item => ({
          id: item.id,
          extra_name: item.name || 'Unknown',
          shtrix_kod: item.shtrix_table[0]?.shtrix_kod || '',
        }));
        console.log('Fetched product list:', productList.value);
      } catch (error) {
        console.error('Product list error:', error);
        window.alert('Товарлар рўйхатини юклашда хатолик');
      }
    }

    async function fetchKontragent() {
      try {
        const res = await axios.get('/api/v1/kontragent');
        kontragent.value = res.data;
      } catch (error) {
        console.error('Fetch kontragent error:', error);
      }
    }

    async function fetchKontragentList() {
      try {
        const res = await axios.get('/api/v1/kontragent');
        kontragentList.value = res.data;
      } catch (error) {
        console.error('Fetch kontragent list error:', error);
      }
    }

    async function fetchSkladList() {
      try {
        const res = await axios.get('/api/v1/sklads/skladnames');
        skladList.value = res.data;
      } catch (error) {
        console.error('Fetch sklad list error:', error);
      }
    }

    async function fetchPaytypeList() {
      try {
        const res = await axios.get('/api/v1/pay-type');
        paytypeList.value = res.data;
      } catch (error) {
        console.error('Fetch paytype list error:', error);
      }
    }

    // Computed properties
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

    // Methods
    const formatNumber = (value, precision = 2) => {
      if (value === null || value === undefined) return '0';
      return parseFloat(value).toLocaleString('uz-UZ', { minimumFractionDigits: precision, maximumFractionDigits: precision });
    };

    const roundNumber = (value, precision = 2) => {
      return parseFloat(parseFloat(value || 0).toFixed(precision));
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

    const selectShtrixItem = async (productId, index) => {
      const originalShtrix = formData.prixod_table[index].shtrix_kod;
      formData.prixod_table[index].product_id = productId;
      await productChange(index);
      formData.prixod_table[index].shtrix_kod = originalShtrix;
      modals['modal-shtrix'].hide();
    };

    const productChange = async (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        if (!item.product_id || !formData.sklad_id) {
          console.warn(`productChange [${index}]: Missing product_id=${item.product_id} or sklad_id=${formData.sklad_id}`);
          window.alert('Товар ёки склад танланмади');
          return;
        }
        const originalShtrix = item.shtrix_kod;
        const originalCount = parseFloat(item.count) || 0;
        const originalBalance = parseFloat(item.current_balance) || 0;
        console.log(`Before productChange [${index}]: product_id=${item.product_id}, current_balance=${item.current_balance}, shtrix_kod=${item.shtrix_kod}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
        try {
          const response = await axios.post('api/v1/product/price-balance', {
            product_id: item.product_id,
            sklad_id: formData.sklad_id,
          });
          console.log(`API response price-balance:`, response.data);

          const newBalance = parseFloat(response.data.balance);
          if (!isNaN(newBalance) && newBalance >= 0) {
            item.current_balance = roundNumber(newBalance, 0);
          } else {
            item.current_balance = originalBalance;
            console.warn(`Invalid balance received for product_id=${item.product_id}, retaining original balance: ${originalBalance}`);
            window.alert('API дан нотўғри қолдиқ маълумоти олинди');
          }

          item.optom_price = roundNumber(item.optom_price);
          item.chakana_price = roundNumber(item.chakana_price);
          item.kontragent_price = roundNumber(item.kontragent_price);
          item.debit_price = roundNumber(item.debit_price);
          item.pack_price = roundNumber(item.pack_price);
          item.count = originalCount;
          item.pack_count = roundNumber(item.pack_count);
          item.kontragent_summa = roundNumber(item.kontragent_summa);

          if (formData.pay_type_id === 3) {
            if (response.data.price_type === 2) {
              item.kontragent_price = roundNumber(response.data.delivery_price) || item.kontragent_price;
              item.debit_price = roundNumber(response.data.delivery_price) || item.debit_price;
              item.pack_price = item.pack_norma ? roundNumber(item.pack_norma * item.kontragent_price) : item.pack_price;
            } else if (response.data.price_type === 1 && formData.dollar_rate) {
              item.kontragent_price = roundNumber(response.data.delivery_price / formData.dollar_rate) || item.kontragent_price;
              item.debit_price = roundNumber(response.data.delivery_price / formData.dollar_rate) || item.debit_price;
              item.pack_price = item.pack_norma ? roundNumber(item.pack_norma * item.kontragent_price) : item.pack_price;
              window.alert('Бу товар аввал бошқа валютада келган');
            } else {
              console.warn(`Invalid dollar_rate or price_type for product_id=${item.product_id}`);
            }
            if (response.data.optom_dollar_price) {
              item.optom_dollar_price = roundNumber(response.data.optom_dollar_price);
              item.optom_price = roundNumber(response.data.optom_price) || item.optom_price;
              item.optom_percent = item.debit_price ? roundNumber((item.optom_dollar_price / item.debit_price) * 100 - 100) : 0;
            }
            if (response.data.chakana_dollar_price) {
              item.chakana_dollar_price = roundNumber(response.data.chakana_dollar_price);
              item.chakana_price = roundNumber(response.data.chakana_price) || item.chakana_price;
              item.chakana_percent = item.debit_price ? roundNumber((item.chakana_dollar_price / item.debit_price) * 100 - 100) : 0;
            }
          } else {
            if (response.data.price_type === 1) {
              item.kontragent_price = roundNumber(response.data.delivery_price) || item.kontragent_price;
              item.debit_price = roundNumber(response.data.delivery_price) || item.debit_price;
              item.pack_price = item.pack_norma ? roundNumber(item.pack_norma * item.kontragent_price) : item.pack_price;
            } else if (response.data.price_type === 2 && formData.dollar_rate) {
              item.kontragent_price = roundNumber(response.data.delivery_price * formData.dollar_rate) || item.kontragent_price;
              item.debit_price = roundNumber(response.data.delivery_price * formData.dollar_rate) || item.debit_price;
              item.pack_price = item.pack_norma ? roundNumber(item.pack_norma * item.kontragent_price) : item.pack_price;
              window.alert('Бу товар аввал бошқа валютада келган');
            } else {
              console.warn(`Invalid dollar_rate or price_type for product_id=${item.product_id}`);
            }
            if (response.data.optom_dollar_price) {
              item.optom_dollar_price = roundNumber(response.data.optom_dollar_price);
              item.optom_price = roundNumber(response.data.optom_price) || item.optom_price;
              item.optom_percent = item.debit_price ? roundNumber((item.optom_price / item.debit_price) * 100 - 100) : 0;
            }
            if (response.data.chakana_dollar_price) {
              item.chakana_dollar_price = roundNumber(response.data.chakana_dollar_price);
              item.chakana_price = roundNumber(response.data.chakana_price) || item.chakana_price;
              item.chakana_percent = item.debit_price ? roundNumber((item.chakana_price / item.debit_price) * 100 - 100) : 0;
            }
          }

          const productResponse = await axios.get(`api/v1/product/id/${item.product_id}`);
          console.log(`API response product details:`, productResponse.data);
          item.pack_norma = parseFloat(productResponse.data.pack_count) || item.pack_norma || 0;
          item.shtrix_kod = productResponse.data.shtrix_table[0]?.shtrix_kod || originalShtrix;
          if (!item.shtrix_kod) {
            console.warn(`No shtrix_kod found for product_id=${item.product_id}`);
            window.alert('Штрих код топилмади');
          }

          item.kontragent_summa = roundNumber(item.kontragent_price * item.count);
          item.debit_summa = roundNumber(item.debit_price * item.count);
          item.chakana_summa = roundNumber(item.chakana_price * item.count);
          item.optom_summa = roundNumber(item.optom_price * item.count);

          console.log(`After productChange [${index}]: current_balance=${item.current_balance}, shtrix_kod=${item.shtrix_kod}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
          summa();
        } catch (error) {
          console.error('Product change error:', error);
          item.current_balance = originalBalance;
          window.alert('Товар маълумотларини олишда хатолик');
        }
      }
    };

    const shtrix = async (index) => {
      const shtrix = formData.prixod_table[index].shtrix_kod;
      if (!shtrix) {
        window.alert('Штрих код киритилмаган');
        return;
      }
      try {
        const response = await axios.post(`api/v1/product/shtrix2/${shtrix}`, {
          sklad_id: formData.sklad_id,
        });
        console.log(`Shtrix API response:`, response.data);
        if (!response.data[0]) {
          window.alert(`Штрих код "${shtrix}" бўйича товар топилмади`);
        } else if (response.data[1]) {
          settedIndex.value = index;
          shtrixList.value = response.data;
          modals['modal-shtrix'].show();
        } else {
          formData.prixod_table[index].product_id = response.data[0].product_id;
          await productChange(index);
          focusNextInput();
        }
      } catch (error) {
        console.error('Shtrix error:', error);
        window.alert('Штрих кодни қидиришда хатолик');
      }
    };

    const addTable = (type = 'default') => {
      formData.prixod_table.push({
        product_id: null,
        current_balance: 0,
        count: 0,
        debit_price: 0,
        debit_summa: 0,
        kontragent_price: 0,
        kontragent_summa: 0,
        chakana_percent: 0,
        optom_percent: 0,
        chakana_price: 0,
        optom_price: 0,
        chakana_summa: 0,
        optom_summa: 0,
        chakana_dollar_price: 0,
        optom_dollar_price: 0,
        shtrix_kod: '',
        pack_count: 0,
        pack_price: 0,
        pack_norma: 0,
      });
      if (type === 'default') {
        tableFocus();
      }
      summa();
    };

    const summa = () => {
      formData.summa = 0;
      formData.count_all = 0;
      formData.prixod_summa = 0;
      formData.prixod_table.forEach((item, index) => {
        item.count = parseFloat(item.count) || 0;
        item.kontragent_price = parseFloat(item.kontragent_price) || 0;
        item.kontragent_summa = roundNumber(item.kontragent_price * item.count);
        item.debit_summa = roundNumber((parseFloat(item.debit_price) || 0) * item.count);
        item.chakana_summa = roundNumber((parseFloat(item.chakana_price) || 0) * item.count);
        item.optom_summa = roundNumber((parseFloat(item.optom_price) || 0) * item.count);
        formData.summa += item.kontragent_summa;
        formData.count_all += item.count;
        formData.prixod_summa += item.debit_summa;
        console.log(`summa [${index}]: count=${item.count}, kontragent_price=${item.kontragent_price}, kontragent_summa=${item.kontragent_summa}`);
      });
      formData.summa = roundNumber(formData.summa);
      formData.count_all = roundNumber(formData.count_all);
      formData.prixod_summa = roundNumber(formData.prixod_summa);
      console.log(`Total: summa=${formData.summa}, count_all=${formData.count_all}, prixod_summa=${formData.prixod_summa}`);
    };

    const rasxodXisobPercent = () => {
      if (!changedisabled.value) {
        if (formData.rasxod_summa !== 0 && formData.summa) {
          const ortacharasxod = formData.rasxod_summa / formData.summa;
          formData.prixod_table.forEach((item, index) => {
            item.debit_price = roundNumber(
              parseFloat(item.kontragent_price) + item.kontragent_price * ortacharasxod
            );
            item.debit_summa = roundNumber(item.debit_price * item.count);
            if (item.chakana_dollar_price > 0) {
              changePercentChakana(index);
            }
            if (item.optom_dollar_price > 0) {
              changePercentOptom(index);
            }
          });
        } else {
          formData.prixod_table.forEach((item, index) => {
            item.debit_price = roundNumber(item.kontragent_price);
            item.debit_summa = roundNumber(item.debit_price * item.count);
            if (item.chakana_dollar_price > 0) {
              changePercentChakana(index);
            }
            if (item.optom_dollar_price > 0) {
              changePercentOptom(index);
            }
          });
        }
        summa();
      }
    };

    const rasxodXisob = () => {
      if (!changedisabled.value) {
        if (formData.rasxod_summa !== 0 && formData.summa) {
          const ortacharasxod = formData.rasxod_summa / formData.summa;
          formData.prixod_table.forEach((item, index) => {
            item.debit_price = roundNumber(
              parseFloat(item.kontragent_price) + item.kontragent_price * ortacharasxod
            );
            item.debit_summa = roundNumber(item.debit_price * item.count);
            if (formData.pay_type_id === 3) {
              if (item.chakana_dollar_price > 0) {
                changePriceChakanaDollar(index);
              }
              if (item.optom_dollar_price > 0) {
                changePriceOptomDollar(index);
              }
            } else {
              if (item.chakana_price > 0) {
                changePriceChakana(index);
              }
              if (item.optom_price > 0) {
                changePriceOptom(index);
              }
            }
          });
        } else {
          formData.prixod_table.forEach((item, index) => {
            item.debit_price = roundNumber(item.kontragent_price);
            item.debit_summa = roundNumber(item.debit_price * item.count);
            if (formData.pay_type_id === 3) {
              if (item.chakana_dollar_price > 0) {
                changePriceChakanaDollar(index);
              }
              if (item.optom_dollar_price > 0) {
                changePriceOptomDollar(index);
              }
            } else {
              if (item.chakana_price > 0) {
                changePriceChakana(index);
              }
              if (item.optom_price > 0) {
                changePriceOptom(index);
              }
            }
          });
        }
        summa();
      }
    };

    const saveDocument = async (type = 'default') => {
      if (sending.value) return;
      sending.value = true;
      if (!formData.rasxod_summa) formData.rasxod_summa = 0;
      if (!formData.kontragent_id) {
        window.alert('Контрагент танланмади');
        sending.value = false;
        return;
      }
      if (!formData.sklad_id) {
        window.alert('Склад танланмади');
        sending.value = false;
        return;
      }
      if (!formData.pay_type_id) {
        window.alert('Тўлов тури танланмади');
        sending.value = false;
        return;
      }
      const method = route.path === '/kirim/create' ? 'post' : 'patch';
      const url = route.path === '/kirim/create' ? 'api/v1/prixod' : `api/v1/prixod/id/${route.params.id}`;
      if (method === 'patch' && store.state.saved === 1) {
        summa();
        formData.updated_at = Math.floor(Date.now() / 1000);
      }
      try {
        const payload = {
          ...formData,
          prixod_table: formData.prixod_table.map(item => ({
            product_id: parseInt(item.product_id) || 0,
            current_balance: roundNumber(item.current_balance),
            count: roundNumber(item.count),
            debit_price: roundNumber(item.debit_price),
            debit_summa: roundNumber(item.debit_summa),
            kontragent_price: roundNumber(item.kontragent_price),
            kontragent_summa: roundNumber(item.kontragent_summa),
            chakana_percent: roundNumber(item.chakana_percent),
            optom_percent: roundNumber(item.optom_percent),
            chakana_price: roundNumber(item.chakana_price),
            chakana_dollar_price: roundNumber(item.chakana_dollar_price),
            optom_price: roundNumber(item.optom_price),
            optom_dollar_price: roundNumber(item.optom_dollar_price),
            chakana_summa: roundNumber(item.chakana_summa),
            optom_summa: roundNumber(item.optom_summa),
            shtrix_kod: item.shtrix_kod || '',
            pack_count: roundNumber(item.pack_count),
            pack_price: roundNumber(item.pack_price),
            pack_norma: roundNumber(item.pack_norma),
          })),
        };
        console.log('Saving payload:', payload);
        const response = await axios({ method, url, data: payload });
        store.commit('setSaved', null);
        if (type === 'save') {
          router.push({ path: `/kirim/update/${response.data.id}` });
        } else {
          router.push({ path: '/kirim' });
        }
      } catch (error) {
        console.error('Save document error:', error.response?.data || error);
        store.commit('setErrors', error.response?.data?.message || 'Хатолик юз берди');
        window.alert(error.response?.data?.message || 'Хатолик юз берди');
      } finally {
        sending.value = false;
      }
    };

    const closePage = (path) => {
      if (store.state.saved) {
        const answer = window.confirm('Сизда сақланмаган маълумотлар мавжуд. Сақлансинми?');
        if (answer) {
          saveDocument();
          return;
        }
      }
      store.commit('setSaved', null);
      router.push(path);
    };

    const change = () => {
      changedisabled.value = false;
    };

    const setDatetime = (date) => {
      try {
        return new Date(date * 1000).toISOString().slice(0, 16);
      } catch {
        return '';
      }
    };

    const openModal = (modalId) => {
      modals[modalId]?.show();
    };

    const saveKontragent = async () => {
      try {
        const response = await axios.post('/api/v1/kontragent', kontragent.value);
        kontragentList.value.push(response.data);
        formData.kontragent_id = response.data.id;
        modals['modal-kontragent'].hide();
      } catch (error) {
        console.error('Save kontragent error:', error);
        window.alert('Ётказувчи сақлашда хатолик');
      }
    };

    const changePrice = (index) => {
  if (!changedisabled.value) {
    const item = formData.prixod_table[index];
    const originalCount = parseFloat(item.count) || 0;
    console.log(`changePrice [${index}]: kontragent_price=${item.kontragent_price}, count=${item.count}, pack_norma=${item.pack_norma}, prev_kontragent_summa=${item.kontragent_summa}`);
    item.kontragent_price = roundNumber(item.kontragent_price);
    item.pack_price = item.pack_norma ? roundNumber(item.kontragent_price * item.pack_norma) : item.pack_price;
    item.debit_price = item.kontragent_price;
    item.count = originalCount;
    item.kontragent_summa = roundNumber(item.kontragent_price * item.count);
    item.debit_summa = roundNumber(item.debit_price * item.count);
    item.chakana_summa = roundNumber((parseFloat(item.chakana_price) || 0) * item.count);
    item.optom_summa = roundNumber((parseFloat(item.optom_price) || 0) * item.count);
    console.log(`After changePrice [${index}]: kontragent_price=${item.kontragent_price}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
    
    // Trigger percentage updates if relevant prices exist
    if (item.optom_price > 0 || item.optom_dollar_price > 0) {
      changePriceOptom(index)
    }
    if (item.chakana_price > 0 || item.chakana_dollar_price > 0) {
      changePriceChakana(index);
    }
    
    summa();
  }
};

   const changePackPrice = (index) => {
  if (!changedisabled.value) {
    const item = formData.prixod_table[index];
    const originalCount = parseFloat(item.count) || 0;
    console.log(`changePackPrice [${index}]: pack_price=${item.pack_price}, pack_norma=${item.pack_norma}, count=${item.count}, prev_kontragent_summa=${item.kontragent_summa}`);
    item.pack_price = roundNumber(item.pack_price);
    item.kontragent_price = item.pack_norma > 0 ? roundNumber(item.pack_price / item.pack_norma) : roundNumber(item.kontragent_price);
    item.debit_price = item.kontragent_price;
    item.count = originalCount;
    item.kontragent_summa = roundNumber(item.kontragent_price * item.count);
    item.debit_summa = roundNumber(item.debit_price * item.count);
    item.chakana_summa = roundNumber((parseFloat(item.chakana_price) || 0) * item.count);
    item.optom_summa = roundNumber((parseFloat(item.optom_price) || 0) * item.count);
    console.log(`After changePackPrice [${index}]: kontragent_price=${item.kontragent_price}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
    
    // Trigger percentage updates if relevant prices exist
    if (item.optom_price > 0 || item.optom_dollar_price > 0) {
     changePriceOptom(index)
    }
    if (item.chakana_price > 0 || item.chakana_dollar_price > 0) {
      changePriceChakana(index);
      console.log('ishaldi');
    }
    
    summa();
  }
};

    const changeCount = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        console.log(`changeCount [${index}]: count=${item.count}, pack_norma=${item.pack_norma}, kontragent_price=${item.kontragent_price}, prev_kontragent_summa=${item.kontragent_summa}`);
        item.count = roundNumber(item.count);
        if (item.count >= 0 && item.pack_norma > 0) {
          item.pack_count = roundNumber(item.count / item.pack_norma);
        } else {
          item.pack_count = 0;
        }
        item.kontragent_summa = roundNumber((parseFloat(item.kontragent_price) || 0) * item.count);
        item.debit_summa = roundNumber((parseFloat(item.debit_price) || 0) * item.count);
        item.chakana_summa = roundNumber((parseFloat(item.chakana_price) || 0) * item.count);
        item.optom_summa = roundNumber((parseFloat(item.optom_price) || 0) * item.count);
        console.log(`After changeCount [${index}]: count=${item.count}, pack_count=${item.pack_count}, kontragent_summa=${item.kontragent_summa}`);
        summa();
      }
    };

    const changePack = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        console.log(`changePack [${index}]: pack_count=${item.pack_count}, pack_norma=${item.pack_norma}, kontragent_price=${item.kontragent_price}, prev_kontragent_summa=${item.kontragent_summa}`);
        item.pack_count = roundNumber(item.pack_count);
        item.count = item.pack_norma ? roundNumber(item.pack_count * item.pack_norma) : item.count;
        item.kontragent_summa = roundNumber((parseFloat(item.kontragent_price) || 0) * item.count);
        item.debit_summa = roundNumber((parseFloat(item.debit_price) || 0) * item.count);
        item.chakana_summa = roundNumber((parseFloat(item.chakana_price) || 0) * item.count);
        item.optom_summa = roundNumber((parseFloat(item.optom_price) || 0) * item.count);
        console.log(`After changePack [${index}]: count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
        summa();
      }
    };

    const changePercentOptom = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        const originalCount = parseFloat(item.count) || 0;
        console.log(`changePercentOptom [${index}]: optom_percent=${item.optom_percent}, debit_price=${item.debit_price}, count=${item.count}, prev_kontragent_summa=${item.kontragent_summa}`);
        item.optom_percent = roundNumber(item.optom_percent);
        if (formData.pay_type_id === 3) {
          item.optom_dollar_price = roundNumber((parseFloat(item.debit_price) || 0) * (item.optom_percent / 100 + 1));
          item.optom_price = roundNumber(item.optom_dollar_price * (formData.dollar_rate || 1));
          item.optom_summa = roundNumber(item.optom_price * originalCount);
        } else {
          item.optom_price = roundNumber((parseFloat(item.debit_price) || 0) * (item.optom_percent / 100 + 1));
          item.optom_summa = roundNumber(item.optom_price * originalCount);
          item.optom_dollar_price = formData.dollar_rate ? roundNumber(item.optom_price / formData.dollar_rate) : 0;
        }
        item.count = originalCount;
        item.kontragent_summa = roundNumber((parseFloat(item.kontragent_price) || 0) * item.count);
        console.log(`After changePercentOptom [${index}]: optom_price=${item.optom_price}, optom_summa=${item.optom_summa}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
        summa();
      }
    };

    const changePercentChakana = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        const originalCount = parseFloat(item.count) || 0;
        console.log(`changePercentChakana [${index}]: chakana_percent=${item.chakana_percent}, debit_price=${item.debit_price}, count=${item.count}, prev_kontragent_summa=${item.kontragent_summa}`);
        item.chakana_percent = roundNumber(item.chakana_percent);
        if (formData.pay_type_id === 3) {
          item.chakana_dollar_price = roundNumber((parseFloat(item.debit_price) || 0) * (item.chakana_percent / 100 + 1));
          item.chakana_price = roundNumber(item.chakana_dollar_price * (formData.dollar_rate || 1));
          item.chakana_summa = roundNumber(item.chakana_price * originalCount);
        } else {
          item.chakana_price = roundNumber((parseFloat(item.debit_price) || 0) * (item.chakana_percent / 100 + 1));
          item.chakana_summa = roundNumber(item.chakana_price * originalCount);
          item.chakana_dollar_price = formData.dollar_rate ? roundNumber(item.chakana_price / formData.dollar_rate) : 0;
        }
        item.count = originalCount;
        item.kontragent_summa = roundNumber((parseFloat(item.kontragent_price) || 0) * item.count);
        console.log(`After changePercentChakana [${index}]: chakana_price=${item.chakana_price}, chakana_summa=${item.chakana_summa}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
        summa();
      }
    };  

    const changePriceChakana = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        const originalCount = parseFloat(item.count) || 0;
        console.log(`changePriceChakana [${index}]: chakana_price=${item.chakana_price}, debit_price=${item.debit_price}, count=${item.count}, prev_kontragent_summa=${item.kontragent_summa}`);
        item.chakana_price = roundNumber(item.chakana_price);
        item.chakana_percent = item.debit_price ? roundNumber((item.chakana_price / item.debit_price) * 100 - 100) : 0;
        item.chakana_dollar_price = formData.dollar_rate ? roundNumber(item.chakana_price / formData.dollar_rate) : 0;
        item.chakana_summa = roundNumber(item.chakana_price * originalCount);
        item.count = originalCount;
        item.kontragent_summa = roundNumber((parseFloat(item.kontragent_price) || 0) * item.count);
        console.log(`After changePriceChakana [${index}]: chakana_price=${item.chakana_price}, chakana_summa=${item.chakana_summa}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
        summa();
      }
    };

    const changePriceChakanaDollar = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        const originalCount = parseFloat(item.count) || 0;
        console.log(`changePriceChakanaDollar [${index}]: chakana_dollar_price=${item.chakana_dollar_price}, debit_price=${item.debit_price}, count=${item.count}, prev_kontragent_summa=${item.kontragent_summa}`);
        item.chakana_dollar_price = roundNumber(item.chakana_dollar_price);
        item.chakana_price = roundNumber(item.chakana_dollar_price * (formData.dollar_rate || 1));
        item.chakana_percent = item.debit_price ? roundNumber((item.chakana_price / item.debit_price) * 100 - 100) : 0;
        item.chakana_summa = roundNumber(item.chakana_price * originalCount);
        item.count = originalCount;
        item.kontragent_summa = roundNumber((parseFloat(item.kontragent_price) || 0) * item.count);
        console.log(`After changePriceChakanaDollar [${index}]: chakana_price=${item.chakana_price}, chakana_summa=${item.chakana_summa}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
        summa();
      }
    };

    const changePriceOptom = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        const originalCount = parseFloat(item.count) || 0;
        console.log(`changePriceOptom [${index}]: optom_price=${item.optom_price}, debit_price=${item.debit_price}, count=${item.count}, prev_kontragent_summa=${item.kontragent_summa}`);
        item.optom_price = roundNumber(item.optom_price);
        item.optom_percent = item.debit_price ? roundNumber((item.optom_price / item.debit_price) * 100 - 100) : 0;
        item.optom_dollar_price = formData.dollar_rate ? roundNumber(item.optom_price / formData.dollar_rate) : 0;
        item.optom_summa = roundNumber(item.optom_price * originalCount);
        item.count = originalCount;
        item.kontragent_summa = roundNumber((parseFloat(item.kontragent_price) || 0) * item.count);
        console.log(`After changePriceOptom [${index}]: optom_price=${item.optom_price}, optom_summa=${item.optom_summa}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
        summa();
      }
    };

    const changePriceOptomDollar = (index) => {
      if (!changedisabled.value) {
        const item = formData.prixod_table[index];
        const originalCount = parseFloat(item.count) || 0;
        console.log(`changePriceOptomDollar [${index}]: optom_dollar_price=${item.optom_dollar_price}, debit_price=${item.debit_price}, count=${item.count}, prev_kontragent_summa=${item.kontragent_summa}`);
        item.optom_dollar_price = roundNumber(item.optom_dollar_price);
        item.optom_price = roundNumber(item.optom_dollar_price * (formData.dollar_rate || 1));
        item.optom_percent = item.debit_price ? roundNumber((item.optom_price / item.debit_price) * 100 - 100) : 0;
        item.optom_summa = roundNumber(item.optom_price * originalCount);
        item.count = originalCount;
        item.kontragent_summa = roundNumber((parseFloat(item.kontragent_price) || 0) * item.count);
        console.log(`After changePriceOptomDollar [${index}]: optom_price=${item.optom_price}, optom_summa=${item.optom_summa}, count=${item.count}, kontragent_summa=${item.kontragent_summa}`);
        summa();
      }
    };

    const trashItem = (index) => {
      if (!changedisabled.value) {
        formData.prixod_table.splice(index, 1);
        summa();
      }
    };

    const tableFocus = () => {
      const lastRow = formData.prixod_table.length - 1;
      if (lastRow >= 0) {
        const input = document.querySelector(`tbody tr:nth-child(${lastRow + 1}) input[placeholder="Kod"]`);
        if (input) {
          input.focus();
        }
      }
    };

    const focusNextInput = () => {
      const inputs = document.querySelectorAll('tbody input');
      const currentInput = document.activeElement;
      const currentIndex = Array.from(inputs).indexOf(currentInput);
      if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
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
      productList,
      width1,
      width2,
      filteredRows,
      paginated,
      formatNumber,
      roundNumber,
      loadSettings,
      saveSettings,
      createProduct,
      selectProduct,
      selectShtrixItem,
      productChange,
      shtrix,
      addTable,
      summa,
      rasxodXisob,
      rasxodXisobPercent,
      saveDocument,
      closePage,
      change,
      setDatetime,
      openModal,
      saveKontragent,
      changePrice,
      changePackPrice,
      changeCount,
      changePack,
      changePercentOptom,
      changePercentChakana,
      changePriceChakana,
      changePriceChakanaDollar,
      changePriceOptom,
      changePriceOptomDollar,
      trashItem,
      tableFocus,
      focusNextInput,
    };
  },
});
</script>