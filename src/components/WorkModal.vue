<template>
  <div>
    <!-- Asosiy ish faoliyatlari modal -->
    <div class="modal fade" 
         :class="{show: showModal, 'd-block': showModal}" 
         tabindex="-1" 
         v-if="showModal"
         @click.self="$emit('close')"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ish Faoliyatlari</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex mb-3">
              <input type="text" class="form-control me-2" v-model="searchQuery" placeholder="Qidirish...">
              <button class="btn btn-primary" @click="addNewItem">Yangi qo'shish</button>
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
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editItem(item)">
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
    </div>

    <!-- Qo‘shish / Tahrirlash modal -->
    <div class="modal fade" 
         :class="{show: showItemModal, 'd-block': showItemModal}" 
         tabindex="-1" 
         v-if="showItemModal"
         @click.self="showItemModal = false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editMode ? 'Tahrirlash' : 'Yangi qo‘shish' }}</h5>
            <button type="button" class="btn-close" @click="showItemModal = false"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control mb-3" v-model="newItem.name" placeholder="Nomi" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="saveItem">Saqlash</button>
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
    items: Array
  },
  data() {
    return {
      searchQuery: '',
      showItemModal: false,
      newItem: { name: '' },
      editMode: false,
      currentItem: null
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    addNewItem() {
      this.editMode = false;
      this.currentItem = null;
      this.newItem = { name: '' };
      this.showItemModal = true;
    },
    editItem(item) {
      this.editMode = true;
      this.currentItem = item;
      this.newItem = { ...item };
      this.showItemModal = true;
    },
    saveItem() {
      const method = this.editMode ? 'patch' : 'post';
      const url = this.editMode 
        ? `/api/v1/crm-work/id/${this.currentItem.id}`
        : '/api/v1/crm-work';

      this.$axios({
        method,
        url,
        data: this.newItem
      }).then(() => {
        this.$emit('refresh');
        this.showItemModal = false;
      });
    },
    deleteItem(id) {
      if (confirm('Haqiqatan ham o‘chirmoqchimisiz?')) {
        this.$axios.delete(`/api/v1/crm-work/id/${id}`)
          .then(() => this.$emit('refresh'));
      }
    },
    selectItem(item) {
      this.$emit('select', item.id);
      this.$emit('close'); // qiymat tanlash bilan modal yopiladi
    }
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0,0,0,0.5);
}
</style>
