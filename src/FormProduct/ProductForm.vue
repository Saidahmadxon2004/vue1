<template>
  <form class="card p-4 shadow-sm border rounded-3">
    <h5 class="mb-4">Mahsulot Qo‘shish / Tahrirlash</h5>

    <div class="row mb-3">
      <div class="col-md-6">
        <label for="name" class="form-label">Номи (Name)</label>
        <input
          type="text"
          id="name"
          v-model="datasend.name"
          class="form-control"
          placeholder="Mahsulot nomini kiriting..."
          required
        />
      </div>

      <div class="col-md-6">
        <label for="extra_name" class="form-label">Доп. Имя (Extra Name)</label>
        <input
          type="text"
          id="extra_name"
          v-model="datasend.extra_name"
          class="form-control"
          placeholder="Qo'shimcha nom..."
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <label for="unit_id" class="form-label">Ед.изм. (Unit)</label>
        <select
          id="unit_id"
          v-model="datasend.unit_id"
          class="form-select"
          required
        >
          <option value="" disabled>Tanlang...</option>
          <option v-for="unit in units" :key="unit.id" :value="unit.id">
            {{ unit.name }}
          </option>
        </select>
      </div>

      <div class="col-md-4">
        <label for="brand_id" class="form-label">Бренд (Brand)</label>
        <select
          id="brand_id"
          v-model="datasend.brand_id"
          class="form-select"
          required
        >
          <option value="" disabled>Tanlang...</option>
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">
            {{ brand.name }}
          </option>
        </select>
      </div>

      <div class="col-md-4">
        <label for="model_id" class="form-label">Модел (Model)</label>
        <select
          id="model_id"
          v-model="datasend.model_id"
          class="form-select"
          required
        >
          <option value="" disabled>Tanlang...</option>
          <option v-for="model in models" :key="model.id" :value="model.id">
            {{ model.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-4">
        <label for="colour_id" class="form-label">Ранг (Color)</label>
        <select
          id="colour_id"
          v-model="datasend.colour_id"
          class="form-select"
          required
        >
          <option value="" disabled>Tanlang...</option>
          <option v-for="colour in colours" :key="colour.id" :value="colour.id">
            {{ colour.name }}
          </option>
        </select>
      </div>

      <div class="col-md-4">
        <label for="country_id" class="form-label">Давпат (Country)</label>
        <select
          id="country_id"
          v-model="datasend.country_id"
          class="form-select"
          required
        >
          <option value="" disabled>Tanlang...</option>
          <option v-for="country in countries" :key="country.id" :value="country.id">
            {{ country.name }}
          </option>
        </select>
      </div>

      <div class="col-md-4">
        <label for="quality" class="form-label">Quality</label>
        <input
          type="text"
          id="quality"
          v-model="datasend.quality"
          class="form-control"
          placeholder="Quality..."
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-3">
        <label for="is_folder" class="form-label">Is Folder</label>
        <select
          id="is_folder"
          v-model="datasend.is_folder"
          class="form-select"
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div class="col-md-3">
        <label for="parent_id" class="form-label">Parent ID</label>
        <input
          type="number"
          id="parent_id"
          v-model="datasend.parent_id"
          class="form-control"
          placeholder="Parent ID..."
        />
      </div>

      <div class="col-md-6">
        <label for="picture_name" class="form-label">Фото (Photo)</label>
        <input
          type="file"
          id="picture_name"
          class="form-control"
          @change="handleFileUpload"
        />
        <div v-if="imagePreview" class="mt-2">
  <img :src="imagePreview" alt="Mahsulot rasmi" class="img-thumbnail" style="max-height: 200px;" />
</div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">Штрих коды (Barcodes)</label>
      <div v-for="(code, index) in datasend.shtrix_table" :key="index" class="input-group mb-2">
        <input
          type="text"
          v-model="code.shtrix_kod"
          class="form-control"
          placeholder="Barcode"
        />
        <button
          v-if="datasend.shtrix_table.length > 1"
          class="btn btn-outline-danger"
          type="button"
          @click="removeShtrix(index)"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <button
        type="button"
        class="btn btn-outline-primary btn-sm"
        @click="addShtrix"
      >
        <i class="bi bi-plus"></i> Add Barcode
      </button>
    </div>

    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary" @click="Send">
        <i class="bi bi-save"></i> Saqlash
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
  return {
    datasend: {
      name: "",
      extra_name: "",
      unit_id: "",
      brand_id: "",
      model_id: "",
      colour_id: "",
      country_id: "",
      quality: "",
      is_folder: "0",
      parent_id: "0",
      picture_name: null,
      shtrix_table: [{ shtrix_kod: "" }]
    },
    units: [],
    brands: [],
    models: [],
    colours: [],
    countries: [],
    imagePreview: null // ✅ Rasmlarni ko‘rsatish uchun preview
  };
},

  created() {
    this.fetchDropdownData();
    if (this.$route.params.id) {
      this.fetchProductData();
    }
  },
  methods: {
    fetchDropdownData() {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      
      const endpoints = [
        this.$axios.get("api/v1/unit", { headers }),
        this.$axios.get("api/v1/brand", { headers }),
        this.$axios.get("api/v1/model", { headers }),
        this.$axios.get("api/v1/colour", { headers }),
        this.$axios.get("api/v1/country", { headers })
      ];

      Promise.all(endpoints)
        .then(([unitsRes, brandsRes, modelsRes, coloursRes, countriesRes]) => {
          this.units = unitsRes.data;
          this.brands = brandsRes.data;
          this.models = modelsRes.data;
          this.colours = coloursRes.data;
          this.countries = countriesRes.data;
        })
        .catch(error => {
          console.error("Error fetching dropdown data:", error);
        });
    },
    fetchProductData() {
      const token = localStorage.getItem("token");
      
      this.$axios
        .get(`api/v1/product/id/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          const productData = response.data;
          this.datasend = {
  name: productData.name,
  extra_name: productData.extra_name || "",
  unit_id: productData.unit_id || "",
  brand_id: productData.brand_id || "",
  model_id: productData.model_id || "",
  colour_id: productData.colour_id || "",
  country_id: productData.country_id || "",
  quality: productData.quality || "",
  is_folder: productData.is_folder?.toString() || "0",
  parent_id: productData.parent_id?.toString() || "0",
  picture_name: null,
  shtrix_table: productData.shtrix_table || [{ shtrix_kod: "" }]
};
this.imagePreview = 'http://185.76.13.223:3084/api/v1/uploads/'+productData.picture_name || null;
console.log(this.imagePreview)
        })
        .catch(error => {
          console.error("Error fetching product data:", error);
        });
    },
    handleFileUpload(event) {
  const file = event.target.files[0];
  this.datasend.picture_name = file;

  if (file) {
    this.imagePreview = URL.createObjectURL(file);
  } else {
    this.imagePreview = null;
  }
}
,
    addShtrix() {
      this.datasend.shtrix_table.push({ shtrix_kod: "" });
    },
    removeShtrix(index) {
      this.datasend.shtrix_table.splice(index, 1);
    },
    Send() {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append all form data to FormData object
      Object.keys(this.datasend).forEach(key => {
        if (key === "shtrix_table") {
          this.datasend[key].forEach((item, index) => {
            formData.append(`shtrix_table[${index}][shtrix_kod]`, item.shtrix_kod);
          });
        } else if (key === "picture_name" && this.datasend[key]) {
          formData.append(key, this.datasend[key]);
        } else if (this.datasend[key] !== null) {
          formData.append(key, this.datasend[key]);
        }
      });

      const method = this.$route.params.id ? "patch" : "post";
      const url = this.$route.params.id 
        ? `api/v1/product/id/${this.$route.params.id}`
        : "api/v1/product";

      this.$axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
        .then(response => {
          this.$router.push({ path: "/products" });
        })
        .catch(error => {
          if (error.response) {
            console.error("Xato javob:", error.response.data);
          } else if (error.request) {
            console.error("Serverdan javob kelmadi:", error.request);
          } else {
            console.error("So'rov xatosi:", error.message);
          }
        });
    }
  }
};
</script>
