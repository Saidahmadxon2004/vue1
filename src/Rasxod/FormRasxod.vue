<template>
  <div class="pos-wrapper bg-light">
    
    <div class="container-fluid py-3 top-bar">
      <div class="row mb-3 align-items-end g-2">
        <div class="col text-center">
          <h6>Жами сумма</h6>
          <input type="text" class="form-control text-center" value="0" readonly />
        </div>
        <div class="col text-center">
          <h6>Скидка</h6>
          <input type="text" class="form-control text-center" value="0" readonly />
        </div>
        <div class="col text-center">
          <h6>Тўлов сумма</h6>
          <input type="text" class="form-control text-center" value="0" readonly />
        </div>
        <div class="col text-center">
          <h6>Штрих</h6>
          <input type="text" class="form-control text-center" />
        </div>
        <div class="col-auto">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="sensorSwitch" />
            <label class="form-check-label" for="sensorSwitch">Сенсор</label>
          </div>
        </div>
        <div class="col-auto d-flex gap-2">
          <select class="form-select">
            <option>Чакан</option>
            <option>Умумий</option>
          </select>
          <select class="form-select">
            <option>Нақд</option>
            <option>Терминал</option>
          </select>
        </div>
        <div class="col-auto">
          <button class="btn btn-danger" @click="close"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
    </div>

    
    <div class="table-section">
      <div class="row h-100">
       
        <div class="col-5 border-end pe-0">
          <input type="text" class="form-control mb-2" placeholder="Қидирув (F10)" />
          <div class="scrollable-table">
            <table class="table table-bordered table-sm mb-0">
              <thead class="table-light sticky-top bg-white">
                <tr>
                  <th>Номи</th>
                  <th>Қолдиқ</th>
                  <th>Чакана Нарx</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in 50" :key="n">
                  <td>Маҳсулот {{ n }}</td>
                  <td>{{ 100 - n }}</td>
                  <td>{{ 10000 + n * 500 }} сўм</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      
        <div class="col-7 ps-0">
          <div class="scrollable-table">
            <table class="table table-bordered table-sm mb-0">
              <thead class="table-light sticky-top bg-white">
                <tr>
                  <th>№</th>
                  <th>Штрих</th>
                  <th>Товар</th>
                  <th>Қолдиқ</th>
                  <th>Пачка</th>
                  <th>Дона</th>
                  <th>Нарx</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 40" :key="i">
                  <td>{{ i }}</td>
                  <td>123456{{ i }}</td>
                  <td>Товар {{ i }}</td>
                  <td>{{ 50 - i }}</td>
                  <td>1</td>
                  <td>1</td>
                  <td>{{ 15000 + i * 300 }}</td>
                  <td>{{ (15000 + i * 300) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    
    <div class="btn-toolbar bg-white border-top p-2 fixed-bottom d-flex justify-content-between flex-wrap">
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-light"><i class="bi bi-house"></i></button>
        <button class="btn btn-light"><i class="bi bi-folder"></i></button>
        <button class="btn btn-danger"><i class="bi bi-x-circle"></i></button>
        <button class="btn btn-success"><i class="bi bi-arrow-down-circle"></i></button>
        <button class="btn btn-primary"><i class="bi bi-people"></i></button>
        <button class="btn btn-success"><i class="bi bi-trash"></i></button>
        <button class="btn btn-success"><i class="bi bi-plus-circle"></i></button>
        <button class="btn btn-danger"><i class="bi bi-dash-circle"></i></button>
        <button class="btn btn-warning"><i class="bi bi-box"></i></button>
        <button class="btn btn-warning"><i class="bi bi-box-seam"></i></button>
        <button class="btn btn-primary"><i class="bi bi-credit-card"></i></button>
        <button class="btn btn-info"><i class="bi bi-info-circle"></i></button>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-success">F12</button>
        <button class="btn btn-secondary"><i class="bi bi-gear"></i></button>
        <button class="btn btn-secondary"><i class="bi bi-arrow-clockwise"></i></button>
        <select class="form-select" style="width: auto;">
          <option>Админ</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function close() {
  router.push('/savdo')
}
</script>

<style scoped>
.pos-wrapper {
  min-height: 100vh;
  padding-bottom: 90px; /* pastki tugmalar uchun joy */
  display: flex;
  flex-direction: column;
}

.top-bar {
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.table-section {
  flex-grow: 1;
  overflow: hidden;
}

.scrollable-table {
  height: calc(100vh - 300px); /* pastki tugmalar + yuqori qism */
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 4px;
}

.table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}

.table tbody tr:hover {
  background-color: #f3f3f3;
}
</style>

<style scoped>
.pos-wrapper {
  min-height: 100vh;
  padding-bottom: 90px; /* pastki tugmalar uchun joy */
  display: flex;
  flex-direction: column;
}

.top-bar {
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.table-section {
  flex-grow: 1;
  overflow: hidden;
}

.scrollable-table {
  height: calc(100vh - 300px); /* pastki tugmalar + yuqori qism */
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 4px;
}

.table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}

.table tbody tr:hover {
  background-color: #f3f3f3;
}
</style>
