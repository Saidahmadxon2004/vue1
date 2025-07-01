<template>
  <div class="container-fluid">
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="fw-bold mb-0">Mahsulotni Tahrirlash</h4>
          <router-link to="/products" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-2"></i>Orqaga
          </router-link>
        </div>
        
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <div v-if="loading" class="d-flex justify-content-center align-items-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <span class="ms-3">Yuklanmoqda...</span>
            </div>

            <ProductForm
              v-else
              v-model:productData="productData"
              :options="options"
              :isEditMode="true"
              @submit="submitForm"
              @cancel="cancelForm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductForm from './ProductForm.vue';

export default {
  components: {
    ProductForm
  },
  data() {
    return {
      loading: true,
      productData: {
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
        picture_url: '',
        shtrix_table: [{ shtrix_kod: '' }] 
      },
      options: {
        units: [],
        brands: [],
        models: [],
        colours: [],
        countries: []
      }
    };
  },
  async created() {
    try {
      await this.fetchDropdownData();
      await this.fetchProductData();
    } catch (error) {
      console.error('Error loading data:', error);
      this.$toast.error('Ma\'lumotlarni yuklashda xatolik yuz berdi');
      this.$router.push('/products');
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async fetchDropdownData() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [units, brands, models, colours, countries] = await Promise.all([
        this.$axios.get('api/v1/unit', { headers }),
        this.$axios.get('api/v1/brand', { headers }),
        this.$axios.get('api/v1/model', { headers }),
        this.$axios.get('api/v1/colour', { headers }),
        this.$axios.get('api/v1/country', { headers })
      ]);

      this.options = {
        units: units.data,
        brands: brands.data,
        models: models.data,
        colours: colours.data,
        countries: countries.data
      };
    },
    async fetchProductData() {
      const token = localStorage.getItem('token');
      const response = await this.$axios.get(`api/v1/product/id/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const product = response.data;
      this.productData = {
        name: product.name,
        extra_name: product.extra_name || '',
        unit_id: product.unit_id || '',
        brand_id: product.brand_id || '',
        model_id: product.model_id || '',
        colour_id: product.colour_id || '',
        country_id: product.country_id || '',
        quality: product.quality || '',
        is_folder: product.is_folder?.toString() || '0',
        parent_id: product.parent_id?.toString() || '0',
        picture_name: null,
        picture_url: product.picture_url || '',
        shtrix_table: product.shtrix_table?.length ? product.shtrix_table : [{ shtrix_kod: '' }]
      };
    },
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        
        // Append form data
        Object.keys(this.productData).forEach(key => {
          if (key === 'shtrix_table') {
            this.productData[key].forEach((item, index) => {
              if (item.shtrix_kod) {
                formData.append(`shtrix_table[${index}][shtrix_kod]`, item.shtrix_kod);
              }
            });
          } else if (key === 'picture_name' && this.productData[key]) {
            formData.append(key, this.productData[key]);
          } else if (this.productData[key] !== null && key !== 'picture_url') {
            formData.append(key, this.productData[key]);
          }
        });

        await this.$axios.patch(`api/v1/product/id/${this.$route.params.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        this.$toast.success('Mahsulot muvaffaqiyatli yangilandi');
        this.$router.push('/products');
      } catch (error) {
        this.$toast.error('Mahsulotni yangilashda xatolik yuz berdi');
        console.error('Error updating product:', error);
      }
    },
    cancelForm() {
      this.$router.push('/products');
    }
  }
};
</script>

<style scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>