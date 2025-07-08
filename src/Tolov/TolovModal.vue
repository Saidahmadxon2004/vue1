<template>
  <div class="modal fade"
       :class="{show: showModal, 'd-block': showModal}"
       tabindex="-1"
       v-if="showModal"
       @click.self="$emit('close')"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Kontragentni tanlash</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex mb-3">
            <input type="text" class="form-control me-2" v-model="searchQuery" placeholder="Kontragent qidirish...">
            <button class="btn btn-primary" @click="openAddModal">Yangi qo'shish</button>
          </div>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nomi</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item.id">
                <td @click="selectItem(item)" style="cursor:pointer">{{ item.name }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-2" @click="openEditModal(item)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" @click="deleteItem(item.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Yopish</button>
        </div>
      </div>
    </div>

    <div class="modal fade"
         :class="{show: showKontragentModal, 'd-block': showKontragentModal}"
         tabindex="-1"
         v-if="showKontragentModal"
         @click.self="showKontragentModal = false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editMode ? 'Kontragentni Tahrirlash' : 'Yangi Kontragent Qo‘shish' }}</h5>
            <button type="button" class="btn-close" @click="showKontragentModal = false"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control mb-3" v-model="newKontragent.name" placeholder="Kontragent Nomi" />
            </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="saveKontragent">Saqlash</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      searchQuery: '',
      kontragents: [], // This will hold the list of kontragents
      newKontragent: { name: '' }, // For adding/editing
      editMode: false,
      currentKontragent: null, // Holds the kontragent being edited
      showKontragentModal: false // Controls the add/edit inner modal
    };
  },
  computed: {
    filteredItems() {
      return this.kontragents.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  watch: {
    showModal(newVal) {
      if (newVal) {
        this.fetchKontragents(); // Fetch kontragents when the modal is opened
      }
    }
  },
  methods: {
    fetchKontragents() {
      this.$axios.get('/api/v1/kontragent')
        .then(response => {
          // Assuming the API response for kontragents is in response.data.data
          // based on your warehouse example: { "error": false, "data": [...] }
          this.kontragents = response.data.data || response.data;
        })
        .catch(error => {
          console.error("Kontragentlarni olishda xato yuz berdi:", error);
          // Optionally, show a user-friendly error message
        });
    },
    openAddModal() {
      this.editMode = false;
      this.newKontragent = { name: '' };
      this.showKontragentModal = true;
    },
    openEditModal(item) {
      this.editMode = true;
      this.currentKontragent = item;
      this.newKontragent = { ...item }; // Create a copy for editing
      this.showKontragentModal = true;
    },
    saveKontragent() {
      const method = this.editMode ? 'patch' : 'post';
      // For PATCH, assuming the endpoint is /api/v1/kontragent/{id}
      const url = this.editMode
        ? `/api/v1/kontragent/id/${this.currentKontragent.id}`
        : '/api/v1/kontragent';

      this.$axios({
        method,
        url,
        data: this.newKontragent
      })
      .then(() => {
        this.fetchKontragents(); // Refresh the list after saving
        this.showKontragentModal = false; // Close the add/edit modal
        this.newKontragent = { name: '' }; // Reset form
        this.currentKontragent = null;
      })
      .catch(error => {
        console.error("Kontragentni saqlashda xato yuz berdi:", error);
        alert("Saqlashda xato yuz berdi: " + (error.response.data.message || ''));
      });
    },
    deleteItem(id) {
      if (confirm("Haqiqatan ham bu kontragentni o'chirmoqchimisiz?")) {
        this.$axios.delete(`/api/v1/kontragent/id/${id}`) // Assuming DELETE endpoint is /api/v1/kontragent/id/{id}
          .then(() => {
            this.fetchKontragents(); // Refresh list after deletion
          })
          .catch(error => {
            console.error("Kontragentni o'chirishda xato yuz berdi:", error);
            alert("O'chirishda xato yuz berdi: " + (error.response.data.message || ''));
          });
      }
    },
    selectItem(item) {
      // Emit the selected kontragent's ID and name to the parent component
      this.$emit('select-kontragent', { id: item.id, name: item.name });
      this.$emit('close'); // Close the main modal
    }
  }
};
</script>

<style scoped>
.modal {
  background-color: rgba(0,0,0,0.5);
}
/* Ensure the inner modal is properly positioned over the outer modal */
.modal.d-block + .modal.d-block {
    z-index: 1056; /* Higher than outer modal's z-index (1055 by default for Bootstrap) */
}
</style>