<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-0">To'lov qo'shish</h5>
          <small class="text-muted">{{ currentDate }}</small>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button
            class="btn btn-success d-flex flex-column align-items-center"
            type="submit"
            form="formAdd"
          >
            Saqlash va berkitish
            <small class="text-white-50">Ctrl + Enter</small>
          </button>
          <button class="btn btn-outline-danger" @click="cancel">❌</button>
        </div>
      </div>

      <div class="card-body">
        <form id="formAdd" @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-md-6">
              <input v-model="form.name" type="text" class="form-control" placeholder="Ism kiriting.." required />
            </div>

            <div class="col-md-6">
              <select v-model="form.kursKassa" class="form-select">
                <option value="Dollar">Dollar</option>
                <option value="Sum">So'm</option>
              </select>
            </div>

            <div class="col-md-6">
              <input v-model="form.date" type="date" class="form-control" required />
            </div>

            <div class="col-md-6">
              <input v-model.number="form.amountKassa" type="number" class="form-control" placeholder="Kassa summasi" />
            </div>

            <div class="col-md-7">
              <select v-model="form.kurs" class="form-select">
                <option value="Dollar">Dollar</option>
                <option value="Sum">So'm</option>
              </select>
            </div>

            <div class="col-md-7">
              <input
                type="number"
                class="form-control"
                placeholder="Hisoblangan summa"
                :value="ChangeKurs"
                readonly
              />
            </div>

            <div class="col-md-7">
              <select v-model="form.type" class="form-select">
                <option value="Kirim">Kirim</option>
                <option value="Chiqim">Chiqim</option>
              </select>
            </div>

            <div class="col-md-6">
              <select v-model="form.role" class="form-select">
                <option value="user">User</option>
                <option value="Admin">Admin</option>
                <option value="Boss">Boss</option>
              </select>
            </div>

            <div class="col-md-7">
              <input v-model="form.note" type="text" class="form-control" placeholder="Izoh yozing.." />
            </div>

            <div class="col-md-5">
              <input type="number" v-model.number="form.kursNarxi" class="form-control" placeholder="Kurs narxi" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTolov",
  data() {
    return {
      
      currentDate: new Date().toLocaleString("uz-UZ"),
      form: {
        name: "",
        date: "",
        warehouse: "Asosiy sklad",
        amountKassa: 0,
        kursNarxi: 12700,
        kurs: "Dollar",
        kursKassa: "Dollar",
        amount: null,
        type: "Kirim",
        role: "user",
        note: ""
      }
    };
  },
  computed: {
    ChangeKurs() {
      const { kurs, kursKassa, amountKassa, kursNarxi } = this.form;

      if (!amountKassa || !kursNarxi) return 0;

      if (kurs === kursKassa) {
        return amountKassa;
      }

      if (kursKassa === "Dollar" && kurs === "Sum") {
        return amountKassa * kursNarxi;
      }

      if (kursKassa === "Sum" && kurs === "Dollar") {
        return (amountKassa / kursNarxi).toFixed(2);
      }

      return 0;
    }
  },
  methods: {
    submitForm() {
      const tolov = {
        ...this.form,
        amount: this.ChangeKurs,
        datetime: this.currentDate
      };

      this.$router.push({
        name: "Tolov",
        query: { tolov: JSON.stringify(tolov) }
      });

      console.log(tolov);
      this.resetForm();
    },
    cancel() {
      if (confirm("Formani tozalamoqchimisiz?")) {
        this.resetForm();
      }
    },
    resetForm() {
      this.form = {
        name: "",
        date: "",
        warehouse: "Asosiy sklad",
        amountKassa: 0,
        kursNarxi: 12700,
        kurs: "Dollar",
        kursKassa: "Dollar",
        amount: null,
        type: "Kirim",
        role: "user",
        note: ""
      };
    }
  }
};
</script>

<style scoped>
.card-header small {
  font-size: 0.85rem;
}
</style>
