<!-- pages/ProductCreate.vue -->
<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="fw-bold mb-0">Yangi Mahsulot Qo'shish</h4>
          <router-link to="/products" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-2"></i>Orqaga
          </router-link>
        </div>
      
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <ProductForm 
          :datasend="formData" 
          :isEditMode="false"
          @submit="submitForm"
          @cancel="cancelForm"
        />
      </div>
    </div>
  </div>
</template>

<script>

import ProductForm from  './ProductForm.vue';
export default {
  components: {
    ProductForm

  },
  data() {
    return {
      formData: {
        name: '',
        extra_name: '',
        unit_id: '',
        brand_id: '',
        model_id: '',
        colour_id: '',
        country_id: '',
        quality: '',
        is_folder: '0',
        parent_id: '0',
        picture_name: null,
        shtrix_table: [{ shtrix_kod: '' }]
      },
      units: [],
      brands: [],
      models: [],
      colours: [],
      countries: []
    };
  },
  created() {
    this.fetchDropdownData();
  },
  methods: {
    async fetchDropdownData() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [units, brands, models, colours, countries] = await Promise.all([
          this.$axios.get('api/v1/unit', { headers }),
          this.$axios.get('api/v1/brand', { headers }),
          this.$axios.get('api/v1/model', { headers }),
          this.$axios.get('api/v1/colour', { headers }),
          this.$axios.get('api/v1/country', { headers })
        ]);

        this.units = units.data;
        this.brands = brands.data;
        this.models = models.data;
        this.colours = colours.data;
        this.countries = countries.data;
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
        this.$toast.error('Ma\'lumotlarni yuklashda xatolik yuz berdi');
      }
    },
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        // Append form data to FormData object
        Object.keys(this.formData).forEach(key => {
          if (key === 'shtrix_table') {
            this.formData[key].forEach((item, index) => {
              formData.append(`shtrix_table[${index}][shtrix_kod]`, item.shtrix_kod);
            });
          } else if (key === 'picture_name' && this.formData[key]) {
            formData.append(key, this.formData[key]);
          } else if (this.formData[key] !== null) {
            formData.append(key, this.formData[key]);
          }
        });

        await this.$axios.post('api/v1/product', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        this.$toast.success('Mahsulot muvaffaqiyatli qo\'shildi');
        this.$router.push('/products');
      } catch (error) {
        console.error('Error creating product:', error);
        this.$toast.error('Mahsulot qo\'shishda xatolik yuz berdi');
      }
    },
    cancelForm() {
      this.$router.push('/products');
    }
  }
};
</script>