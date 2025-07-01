<template>
  <div>
    <!-- Main Modal -->
    <div class="modal fade"
         id="firmaModal"
         tabindex="-1"
         aria-labelledby="firmaModalLabel"
         aria-hidden="true"
         @click.self="closeMainModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="firmaModalLabel">Firmalar</h5>
            <button type="button" class="btn-close" @click="closeMainModal"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-between mb-3">
              <button class="btn btn-primary" @click="openAddModal">
                <i class="bi bi-plus"></i> Qo'shish
              </button>
              <div class="input-group" style="width: 300px;">
                <input type="text" class="form-control" placeholder="Qidirish..." v-model="searchQuery">
              </div>
            </div>

            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Nomi</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="firma in filteredFirmaList"
                    :key="firma.id"
                    @click="selectFirma(firma)"
                    style="cursor: pointer;"
                >
                  <td>{{ firma.name }}</td>
                  <td @click.stop>
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editFirma(firma)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" @click="deleteFirma(firma.id)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeMainModal">Yopish</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal fade"
         id="firmaEditModal"
         tabindex="-1"
         aria-hidden="true"
         data-bs-backdrop="static"
         @click.self="closeEditModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editMode ? 'Tahrirlash' : 'Qo\'shish' }}</h5>
            <button type="button" class="btn-close" @click="closeEditModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nomi</label>
              <input type="text" class="form-control" v-model="currentFirma.name" ref="firmaNameInput">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeEditModal">Bekor qilish</button>
            <button type="button" class="btn btn-primary" @click="saveFirma">Saqlash</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  props: ['firmaList', 'showFirmaModal'],
  data() {
    return {
      modal: null,
      editModal: null,
      editMode: false,
      searchQuery: '',
      currentFirma: { id: null, name: '' }
    }
  },
  computed: {
    filteredFirmaList() {
      if (!this.searchQuery) return this.firmaList;
      return this.firmaList.filter(firma =>
        firma.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById('firmaModal'));
    this.editModal = new Modal(document.getElementById('firmaEditModal'));

    this.$watch('showFirmaModal', (newVal) => {
      if (newVal) {
        this.modal.show();
        this.$emit('update:showFirmaModal', false);
      }
    });

    this.editModal._element.addEventListener('shown.bs.modal', () => {
      this.$refs.firmaNameInput?.focus();
    });
  },
  methods: {
    openAddModal() {
      this.editMode = false;
      this.currentFirma = { id: null, name: '' };
      this.editModal.show();
    },
    editFirma(firma) {
      this.editMode = true;
      this.currentFirma = { ...firma };
      this.editModal.show();
    },
    closeEditModal() {
      this.editModal.hide();
    },
    closeMainModal() {
      this.modal.hide();
    },
    saveFirma() {
      const method = this.editMode ? 'patch' : 'post';
      const url = this.editMode
        ? `/api/v1/basa/id/${this.currentFirma.id}`
        : '/api/v1/basa';

      this.$axios({ method, url, data: { name: this.currentFirma.name } })
        .then(() => {
          this.$emit('refresh');
          this.editModal.hide();
        })
        .catch(err => console.error('Xato:', err));
    },
    deleteFirma(id) {
      if (confirm("Rostan ham o'chirmoqchimisiz?")) {
        this.$axios.delete(`/api/v1/bas/id/${id}`)
          .then(() => this.$emit('refresh'))
          .catch(err => console.error('Xato:', err));
      }
    },
    selectFirma(firma) {
      this.$emit('select', firma.id);
      this.modal.hide();
    }
  }
}
</script>

<style scoped>
tr:hover {
  background-color: #f5f5f5;
}
</style>
