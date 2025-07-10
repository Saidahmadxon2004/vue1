
<template>
  <div class="product-form-container min-h-screen py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="card p-4 shadow-sm border rounded-3 mb-6">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center space-x-3">
            <div class="w-10 h-10 bg-primary-100 rounded-lg d-flex align-items-center justify-content-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 mb-0">Nomi {{ product.general_name || 'Mahsulot' }} ({{ isEditMode ? 'Tahrirlash' : 'Qoshish' }})</h1>
              <p class="text-gray-600 text-sm">Mahsulot ma'lumotlarini to'ldiring</p>
            </div>
          </div>
          <div class="d-flex space-x-3">
            <button type="button" class="btn btn-secondary me-2" @click="handleExit">
              <i class="bi bi-x-circle me-1"></i> Чиқиш <span class="shortcut">Esc</span>
            </button>
            <button type="submit" class="btn btn-primary" @click="saveProduct">
              <i class="bi bi-save me-1"></i> {{ isEditMode ? 'Yangilash' : 'Saqlash' }} <span class="shortcut">Ctrl+Enter</span>
            </button>
          </div>
        </div>
      </div>

      <form @submit.prevent="saveProduct" class="space-y-6">
        <div class="row g-4">
          <div class="col-lg-8 space-y-4">
            <div class="form-section card p-4 shadow-sm">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Asosiy ma'lumotlar</h2>
              <div class="row g-3">
                <div class="col-md-4">
                  <label for="code" class="form-label">Код</label>
                  <input
                    type="text"
                    id="code"
                    v-model="product.code"
                    class="form-control form-control-custom"
                    readonly
                  />
                </div>
                <div class="col-md-8">
                  <label for="generalName" class="form-label">Умумий номи <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="generalName"
                    v-model="product.general_name"
                    class="form-control form-control-custom"
                    placeholder="Avtomatik to'ldiriladi"
                    readonly
                  />
                </div>
              </div>
              <div class="mt-3">
                <label for="name" class="form-label">Номи</label>
                <input
                  type="text"
                  id="name"
                  v-model="product.name"
                  class="form-control form-control-custom"
                  placeholder="Mahsulot nomi"
                />
              </div>
            </div>

            <div class="row g-4">
              <div class="col-lg-6">
                <div class="form-section card p-4 shadow-sm">
                  <h3 class="text-md font-medium text-gray-900 mb-4">Xususiyatlar</h3>
                  <div class="space-y-3">
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label mb-0 me-2">Ед.изм.</label>
                      <div class="input-with-button flex-grow-1">
                        <v-select
                          v-model="product.unit_id"
                          :options="units"
                          label="name"
                          :reduce="unit => unit.id"
                          placeholder="Tanlang..."
                          class="custom-v-select"
                          :clearable="false"
                        ></v-select>
                        <button class="btn-ellipsis" type="button" @click="openModal('unit')"><i class="bi bi-three-dots"></i></button>
                      </div>
                    </div>
                    
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label mb-0 me-2">Бренд</label>
                      <div class="input-with-button flex-grow-1">
                        <v-select
                          v-model="product.brand_id"
                          :options="brands"
                          label="name"
                          :reduce="brand => brand.id"
                          placeholder="Tanlang..."
                          class="custom-v-select"
                          :clearable="false"
                        ></v-select>
                        <button class="btn-ellipsis" type="button" @click="openModal('brand')"><i class="bi bi-three-dots"></i></button>
                      </div>
                    </div>
                    
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label mb-0 me-2">Модел</label>
                      <div class="input-with-button flex-grow-1">
                        <v-select
                          v-model="product.model_id"
                          :options="models"
                          label="name"
                          :reduce="model => model.id"
                          placeholder="Tanlang..."
                          class="custom-v-select"
                          :clearable="false"
                        ></v-select>
                        <button class="btn-ellipsis" type="button" @click="openModal('model')"><i class="bi bi-three-dots"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-section card p-4 shadow-sm">
                  <h3 class="text-md font-medium text-gray-900 mb-4">Joylashuv va tasnif</h3>
                  <div class="space-y-3">
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label mb-0 me-2">Давлат</label>
                      <div class="input-with-button flex-grow-1">
                        <v-select
                          v-model="product.country_id"
                          :options="countries"
                          label="name"
                          :reduce="country => country.id"
                          placeholder="Tanlang..."
                          class="custom-v-select"
                          :clearable="false"
                        ></v-select>
                        <button class="btn-ellipsis" type="button" @click="openModal('country')"><i class="bi bi-three-dots"></i></button>
                      </div>
                    </div>
                    
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label mb-0 me-2">Гуруҳ</label>
                      <div class="input-with-button flex-grow-1">
                        <v-select
                          v-model="product.group_id"
                          :options="groups"
                          label="name"
                          :reduce="group => group.id"
                          placeholder="Tanlang..."
                          class="custom-v-select"
                          :clearable="false"
                        ></v-select>
                        <button class="btn-ellipsis" type="button" @click="openModal('group')"><i class="bi bi-three-dots"></i></button>
                      </div>
                    </div>
                    
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label mb-0 me-2">Ранг</label>
                      <div class="input-with-button flex-grow-1">
                        <v-select
                          v-model="product.color_id"
                          :options="colors"
                          label="name"
                          :reduce="color => color.id"
                          placeholder="Tanlang..."
                          class="custom-v-select"
                          :clearable="false"
                        ></v-select>
                        <button class="btn-ellipsis" type="button" @click="openModal('color')"><i class="bi bi-three-dots"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-section card p-4 shadow-sm">
                  <h3 class="text-md font-medium text-gray-900 mb-4">Qo'shimcha nomlar</h3>
                  <div class="space-y-3">
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label mb-0 me-2">Доп. Имя 1</label>
                      <div class="input-with-button flex-grow-1">
                        <v-select
                          v-model="product.additional_name_1_id"
                          :options="additionalNames"
                          label="name"
                          :reduce="name => name.id"
                          placeholder="Tanlang..."
                          class="custom-v-select"
                          :clearable="false"
                        ></v-select>
                        <button class="btn-ellipsis" type="button" @click="openModal('additionalName1')"><i class="bi bi-three-dots"></i></button>
                      </div>
                    </div>
                    
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label mb-0 me-2">Доп. Имя 2</label>
                      <div class="input-with-button flex-grow-1">
                        <v-select
                          v-model="product.additional_name_2_id"
                          :options="additionalNames"
                          label="name"
                          :reduce="name => name.id"
                          placeholder="Tanlang..."
                          class="custom-v-select"
                          :clearable="false"
                        ></v-select>
                        <button class="btn-ellipsis" type="button" @click="openModal('additionalName2')"><i class="bi bi-three-dots"></i></button>
                      </div>
                    </div>
                    
                    <div class="d-flex align-items-center justify-content-between">
                      <label class="form-label mb-0 me-2">Доп. Имя 3</label>
                      <div class="input-with-button flex-grow-1">
                        <v-select
                          v-model="product.additional_name_3_id"
                          :options="additionalNames"
                          label="name"
                          :reduce="name => name.id"
                          placeholder="Tanlang..."
                          class="custom-v-select"
                          :clearable="false"
                        ></v-select>
                        <button class="btn-ellipsis" type="button" @click="openModal('additionalName3')"><i class="bi bi-three-dots"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-section card p-4 shadow-sm">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <h3 class="text-md font-medium text-gray-900">Штрих код</h3>
                <button type="button" class="btn btn-primary btn-sm" @click="addBarcode">
                  <i class="bi bi-plus-lg me-1"></i> Янги штрих
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="(barcode, index) in product.barcodes" :key="index" class="d-flex align-items-center space-x-3">
                  <span class="text-sm text-gray-500 w-4">{{ index + 1 }}</span>
                  <input
                    type="text"
                    v-model="barcode.code"
                    class="form-control form-control-sm flex-grow-1"
                    placeholder="Штрих код"
                  />
                  <button
                    type="button"
                    @click="removeBarcode(index)"
                    class="btn btn-outline-danger btn-sm"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 space-y-4">
            <div class="form-section card p-4 shadow-sm">
              <h3 class="text-md font-medium text-gray-900 mb-4">Sozlamalar</h3>
              <div class="space-y-3">
                <div class="d-flex align-items-center justify-content-between">
                  <label class="form-label mb-0">Папка</label>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="isFolderSwitch" v-model="product.is_folder">
                    <label class="form-check-label" for="isFolderSwitch"></label>
                  </div>
                </div>
                
                <div v-if="product.is_folder">
                  <label for="parentId" class="form-label">Asosiy katalog ID</label>
                  <input
                    type="number"
                    id="parentId"
                    v-model.number="product.parent_id"
                    class="form-control form-control-custom"
                    placeholder="Asosiy katalog ID"
                    min="0"
                  />
                  <small class="text-muted">Faqat katalog bo'lsa to'ldiriladi.</small>
                </div>
                
                <div>
                  <label for="packCount" class="form-label">Пачка</label>
                  <input
                    type="number"
                    id="packCount"
                    v-model.number="product.pack_count"
                    class="form-control form-control-custom text-center"
                    min="0"
                  />
                </div>
                
                <div>
                  <label for="minCount" class="form-label">Минимал сон</label>
                  <input
                    type="number"
                    id="minCount"
                    v-model.number="product.min_count"
                    class="form-control form-control-custom text-center"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div class="form-section card p-4 shadow-sm">
              <h3 class="text-md font-medium text-gray-900 mb-4">Фото</h3>
              <div class="image-upload-area">
                <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;" />
                <div class="image-placeholder" @click="triggerFileInput">
                  <img v-if="product.image_url" :src="product.image_url" alt="Product Image" class="uploaded-image" />
                  <img v-else-if="imagePreviewUrl" :src="imagePreviewUrl" alt="Image Preview" class="uploaded-image" />
                  <i v-else class="bi bi-image image-icon-placeholder"></i>
                  <div class="overlay" v-if="!product.image_url && !imagePreviewUrl">
                    <button type="button" class="btn btn-light choose-file-btn">Choose File</button>
                    <span class="file-name text-muted">{{ selectedFileName || 'No file chosen' }}</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <button type="button" class="btn btn-light btn-sm" @click="triggerFileInput">Choose File</button>
                  <span class="text-sm text-gray-500 flex-grow-1 ms-2 me-2">{{ selectedFileName || 'No file chosen' }}</span>
                  <button v-if="selectedFileName || product.image_url" type="button" class="btn btn-outline-danger btn-sm" @click="clearImage">
                    <i class="bi bi-x-circle-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <GenericSelectModal
      :showModal="showUnitModal"
      title="Ўлчов бирликлари"
      apiEndpoint="unit"
      @close="showUnitModal = false"
      @select="selectItem('unit', $event)"
      @refresh="fetchDropdownData"
    />
    <GenericSelectModal
      :showModal="showBrandModal"
      title="Брендлар"
      apiEndpoint="brand"
      @close="showBrandModal = false"
      @select="selectItem('brand', $event)"
      @refresh="fetchDropdownData"
    />
    <GenericSelectModal
      :showModal="showModelModal"
      title="Моделлар"
      apiEndpoint="model"
      @close="showModelModal = false"
      @select="selectItem('model', $event)"
      @refresh="fetchDropdownData"
    />
    <GenericSelectModal
      :showModal="showCountryModal"
      title="Давлатлар"
      apiEndpoint="country"
      @close="showCountryModal = false"
      @select="selectItem('country', $event)"
      @refresh="fetchDropdownData"
    />
    
    <GenericSelectModal
      :showModal="showColorModal"
      title="Ранглар"
      apiEndpoint="colour"
      @close="showColorModal = false"
      @select="selectItem('color', $event)"
      @refresh="fetchDropdownData"
    />
    <GenericSelectModal
      :showModal="showAdditionalName1Modal"
      title="Қўшимча номлар 1"
      apiEndpoint="extra-unit"
      @close="showAdditionalName1Modal = false"
      @select="selectItem('additionalName1', $event)"
      @refresh="fetchDropdownData"
    />
    <GenericSelectModal
      :showModal="showAdditionalName2Modal"
      title="Қўшимча номлар 2"
      apiEndpoint="extra-unit"
      @close="showAdditionalName2Modal = false"
      @select="selectItem('additionalName2', $event)"
      @refresh="fetchDropdownData"
    />
    <GenericSelectModal
      :showModal="showAdditionalName3Modal"
      title="Қўшимча номлар 3"
      apiEndpoint="extra-unit"
      @close="showAdditionalName3Modal = false"
      @select="selectItem('additionalName3', $event)"
      @refresh="fetchDropdownData"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import GenericSelectModal from '@/components/GenericSelectModal.vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
// import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
// const toast = useToast();
const isEditMode = computed(() => !!route.params.id);

const product = reactive({
  id: null,
  code: '',
  general_name: '',
  name: '',
  unit_id: null,
  brand_id: null,
  model_id: null,
  country_id: null,
  group_id: null,
  color_id: null,
  additional_name_1_id: null,
  additional_name_2_id: null,
  additional_name_3_id: null,
  is_folder: false,
  parent_id: null,
  pack_count: 1,
  min_count: 1,
  image_url: null,
  barcodes: [{ code: '' }],
});

const fileInput = ref(null);
const selectedFile = ref(null);
const selectedFileName = ref('');
const imagePreviewUrl = ref(null);

const units = ref([]);
const brands = ref([]);
const models = ref([]);
const countries = ref([]);
const groups = ref([]);
const colors = ref([]);
const additionalNames = ref([]);

const showUnitModal = ref(false);
const showBrandModal = ref(false);
const showModelModal = ref(false);
const showCountryModal = ref(false);
const showGroupModal = ref(false);
const showColorModal = ref(false);
const showAdditionalName1Modal = ref(false);
const showAdditionalName2Modal = ref(false);
const showAdditionalName3Modal = ref(false);

const openModal = (type) => {
  if (type === 'unit') showUnitModal.value = true;
  else if (type === 'brand') showBrandModal.value = true;
  else if (type === 'model') showModelModal.value = true;
  else if (type === 'country') showCountryModal.value = true;
  else if (type === 'group') showGroupModal.value = true;
  else if (type === 'color') showColorModal.value = true;
  else if (type === 'additionalName1') showAdditionalName1Modal.value = true;
  else if (type === 'additionalName2') showAdditionalName2Modal.value = true;
  else if (type === 'additionalName3') showAdditionalName3Modal.value = true;
};

const selectItem = (type, id) => {
  if (type === 'unit') product.unit_id = id;
  else if (type === 'brand') product.brand_id = id;
  else if (type === 'model') product.model_id = id;
  else if (type === 'country') product.country_id = id;
  else if (type === 'group') product.group_id = id;
  else if (type === 'color') product.color_id = id;
  else if (type === 'additionalName1') product.additional_name_1_id = id;
  else if (type === 'additionalName2') product.additional_name_2_id = id;
  else if (type === 'additionalName3') product.additional_name_3_id = id;
};

const fetchDropdownData = async () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const [
      unitsRes,
      brandsRes,
      modelsRes,
      countriesRes,
      groupsRes,
      colorsRes,
      additionalNamesRes,
    ] = await Promise.all([
      axios.get('/api/v1/unit', { headers }),
      axios.get('/api/v1/brand', { headers }),
      axios.get('/api/v1/model', { headers }),
      axios.get('/api/v1/country', { headers }),
      // axios.get('/api/v1/product/all/0', { headers }),
      axios.get('/api/v1/colour', { headers }),
      axios.get('/api/v1/extra-unit', { headers }),
    ]);
    units.value = unitsRes.data;
    brands.value = brandsRes.data;
    models.value = modelsRes.data;
    countries.value = countriesRes.data;
    groups.value = groupsRes.data;
    colors.value = colorsRes.data;
    additionalNames.value = additionalNamesRes.data;
  } catch (error) {
    console.error('Error fetching dropdown data:', error);
    console.error('Ma\'lumotlarni yuklashda xatolik yuz berdi.');
  }
};

const fetchProductData = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`/api/v1/product/id/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    Object.assign(product, {
      ...data,
      is_folder: !!data.is_folder,
      parent_id: data.parent_id || null,
      barcodes: data.barcodes && data.barcodes.length > 0 ? data.barcodes.map(b => ({ code: b.code })) : [{ code: '' }],
    });
    if (data.image_url) {
      imagePreviewUrl.value = data.image_url;
      selectedFileName.value = data.image_url.split('/').pop() || '';
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
    console.error('Mahsulot ma\'lumotlarini yuklashda xatolik yuz berdi.');
    router.push({ path: '/products' });
  }
};

const addBarcode = () => {
  product.barcodes.push({ code: '' });
};

const removeBarcode = (index) => {
  if (product.barcodes.length > 1) {
    product.barcodes.splice(index, 1);
  } else {
    product.barcodes[0].code = '';
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event) => {
  const target = event.target;
  const file = target.files?.[0];
  if (file) {
    selectedFile.value = file;
    selectedFileName.value = file.name;
    imagePreviewUrl.value = URL.createObjectURL(file);
    product.image_url = null;
  } else {
    selectedFile.value = null;
    selectedFileName.value = '';
    imagePreviewUrl.value = null;
  }
};

const clearImage = () => {
  selectedFile.value = null;
  selectedFileName.value = '';
  imagePreviewUrl.value = null;
  product.image_url = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const updateGeneralName = () => {
  const parts = [];

  const unit = units.value.find(u => u.id === product.unit_id);
  if (unit) parts.push(unit.name);

  const brand = brands.value.find(b => b.id === product.brand_id);
  if (brand) parts.push(brand.name);

  const model = models.value.find(m => m.id === product.model_id);
  if (model) parts.push(model.name);

  const country = countries.value.find(c => c.id === product.country_id);
  if (country) parts.push(country.name);

  const color = colors.value.find(c => c.id === product.color_id);
  if (color) parts.push(color.name);

  const addName1 = additionalNames.value.find(n => n.id === product.additional_name_1_id);
  if (addName1) parts.push(addName1.name);

  const addName2 = additionalNames.value.find(n => n.id === product.additional_name_2_id);
  if (addName2) parts.push(addName2.name);

  const addName3 = additionalNames.value.find(n => n.id === product.additional_name_3_id);
  if (addName3) parts.push(addName3.name);

  product.general_name = parts.join(' ').trim();
};

watch(
  () => [
    product.unit_id,
    product.brand_id,
    product.model_id,
    product.country_id,
    product.color_id,
    product.additional_name_1_id,
    product.additional_name_2_id,
    product.additional_name_3_id,
  ],
  () => {
    updateGeneralName();
  },
  { deep: true }
);

const saveProduct = async () => {
  if (!product.general_name || product.general_name.trim() === '') {
    console.error("Iltimos, umumiy nom maydonini to'ldiring (avtomatik to'ldiriladi).");
    return;
  }

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  const formData = new FormData();

  for (const key in product) {
    if (key === 'barcodes') {
      product.barcodes.forEach((barcode, index) => {
        formData.append(`shtrix_table[${index}][shtrix_kod]`, barcode.code);
      });
    } else if (key === 'is_folder') {
      formData.append(key, product[key] ? '1' : '0');
    } else if (key === 'image_url') {
      if (selectedFile.value) {
        formData.append('picture_name', selectedFile.value);
      } else if (product.image_url === null && isEditMode.value) {
        formData.append('picture_name', '');
      }
    } else if (product[key] !== null) {
      formData.append(key, String(product[key]));
    }
  }

  const method = isEditMode.value ? 'patch' : 'post';
  const url = isEditMode.value ? `/api/v1/product/id/${product.id}` : '/api/v1/product';

  try {
    const response = await axios({
      method,
      url,
      data: formData,
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    });

    if ([200, 201, 204].includes(response.status)) {
      console.success(isEditMode.value ? 'Mahsulot muvaffaqiyatli yangilandi!' : 'Mahsulot muvaffaqiyatli qo\'shildi!');
      router.push({ path: '/products' });
    } else {
      console.error(`Kutilmagan status kodi: ${response.status}`);
    }
  } catch (error) {
    const errorMessage = error.response
      ? `Server xatosi (${error.response.status}): ${error.response.data?.message || error.response.statusText}`
      : error.request
      ? 'Serverdan javob kelmadi. Internet aloqasini tekshiring.'
      : `So'rovni sozlashda xato: ${error.message}`;
   console.error(errorMessage);
  }
};

const handleExit = () => {
  router.push({ path: '/products' });
};

const handleKeyDown = (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    saveProduct();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    handleExit();
  }
};

onMounted(() => {
  fetchDropdownData();
  if (isEditMode.value) {
    product.id = Number(route.params.id);
    fetchProductData();
  }
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value);
  }
});
</script>

<style scoped>
.product-form-container {
  background-color: #F0F2F5;
}

.card {
  border-radius: 0.75rem;
  border: 1px solid #E2E8F0;
}

.form-section {
  background-color: #FFFFFF;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.text-2xl {
  font-size: 1.75rem;
}
.font-bold {
  font-weight: 700;
}
.text-gray-900 {
  color: #1A202C;
}
.text-gray-600 {
  color: #4A5568;
}
.text-sm {
  font-size: 0.875rem;
}
.text-danger {
  color: #DC3545;
}

.btn-primary {
  background-color: #3B82F6;
  border-color: #3B82F6;
  color: white;
  padding: 0.6rem 1.25rem;
  font-size: 0.95rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
}
.btn-primary:hover {
  background-color: #2563EB;
  border-color: #2563EB;
}

.btn-secondary {
  background-color: #6B7280;
  border-color: #6B7280;
  color: white;
  padding: 0.6rem 1.25rem;
  font-size: 0.95rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
}
.btn-secondary:hover {
  background-color: #4B5563;
  border-color: #4B5563;
}

.shortcut {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-left: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4A5568;
  margin-bottom: 0.5rem;
  display: block;
}

.form-control-custom {
  background-color: #F7FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  color: #2D3748;
  height: calc(2.4rem + 2px);
}

.form-control-custom[readonly] {
  background-color: #E9ECEF;
  opacity: 0.7;
  cursor: not-allowed;
}

.form-control-custom:focus {
  border-color: #63B3ED;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  outline: none;
}

.custom-v-select.vs--single .vs__dropdown-toggle,
.custom-v-select.vs--multiple .vs__dropdown-toggle {
  background-color: #F7FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  padding: 0.375rem 1rem;
  min-height: calc(2.4rem + 2px);
  display: flex;
  align-items: center;
  box-shadow: none;
}

.custom-v-select .vs__selected-options {
  padding: 0;
  display: flex;
  flex-grow: 1;
  align-items: center;
}

.custom-v-select .vs__selected {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  margin: 0;
  color: #2D3748;
  font-size: 0.95rem;
}

.custom-v-select .vs__actions {
  padding: 0 0 0 8px;
}

.custom-v-select .vs__clear,
.custom-v-select .vs__open-indicator {
  fill: #A0AEC0;
}

.custom-v-select.vs--open .vs__dropdown-toggle {
  border-color: #63B3ED;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.input-with-button {
  display: flex;
  width: 100%;
}

.input-with-button .custom-v-select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-with-button .btn-ellipsis {
  width: calc(2.4rem + 2px);
  height: calc(2.4rem + 2px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EDF2F7;
  border: 1px solid #E2E8F0;
  border-left: none;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  color: #718096;
  transition: background-color 0.2s ease;
}

.input-with-button .btn-ellipsis:hover {
  background-color: #E2E8F0;
}

.barcode-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.barcode-item .form-control-sm {
  height: calc(1.8rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  background-color: #F7FAFC;
  border-color: #E2E8F0;
}

.barcode-item .btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
}

.image-upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-placeholder {
  width: 100%;
  max-width: 300px;
  height: 200px;
  border: 1px solid #E2E8F0;
  border-radius: 0.75rem;
  background-color: #F7FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.image-placeholder .uploaded-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
}

.image-placeholder .image-icon-placeholder {
  font-size: 4rem;
  color: #CBD5E0;
}

.image-placeholder .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 5;
}

.image-placeholder .choose-file-btn {
  background-color: #EDF2F7;
  border: 1px solid #E2E8F0;
  color: #3B82F6;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.image-placeholder .choose-file-btn:hover {
  background-color: #E2E8F0;
}

.image-placeholder .file-name {
  font-size: 0.75rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  margin-top: 0.25rem;
}

.text-muted {
  font-size: 0.85em;
  color: #6c757d;
}
</style>
