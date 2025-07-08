<template>
  <div class="modal fade custom-modal"
       :class="{show: showModal, 'd-block': showModal}"
       tabindex="-1"
       v-if="showModal"
       @click.self="$emit('close')"
       aria-modal="true"
       role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <div class="modal-body custom-modal-body">
          <div class="d-flex mb-3 align-items-center">
            <div class="input-group search-input-group me-2">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control" v-model="searchQuery" :placeholder="'Qidirish ' + title.toLowerCase() + ' bo\'yicha...'">
            </div>
            <button class="btn btn-primary btn-add-new" @click="openAddModal">
              <i class="bi bi-plus-lg me-1"></i> Yangi qo'shish
            </button>
          </div>

          <div class="table-responsive custom-table-container">
            <table class="table table-hover custom-table">
              <thead>
                <tr>
                  <th>Nomi</th>
                  <th class="text-center" style="width: 120px;">Amallar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredItems.length === 0">
                    <td colspan="2" class="text-center text-muted py-3">Ma'lumotlar topilmadi.</td>
                </tr>
                <tr v-for="item in filteredItems" :key="item.id">
                  <td @click="selectItem(item)" class="item-name-cell">{{ item[labelField] }}</td>
                  <td class="text-center action-buttons">
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
        </div>
        <div class="modal-footer custom-modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Yopish</button>
        </div>
      </div>
    </div>

    <div class="modal fade custom-item-modal"
         :class="{show: showItemModal, 'd-block': showItemModal}"
         tabindex="-1"
         v-if="showItemModal"
         @click.self="showItemModal = false"
         aria-modal="true"
         role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header custom-modal-header">
            <h5 class="modal-title">{{ editMode ? 'Tahrirlash' : 'Yangi qo‘shish' }}</h5>
            <button type="button" class="btn-close" @click="showItemModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label for="itemNameInput" class="form-label mb-2">{{ title.split(' ')[0] }} nomi</label>
            <input type="text" id="itemNameInput" class="form-control mb-3" v-model="newItem[labelField]" :placeholder="title.split(' ')[0] + ' nomini kiriting'" />
          </div>
          <div class="modal-footer custom-modal-footer">
            <button class="btn btn-primary" @click="saveItem">Saqlash</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue';
import axios from 'axios';

export default {
  name: 'GenericSelectModal',
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    apiEndpoint: {
      type: String,
      required: true
    },
    searchBy: {
      type: String,
      default: 'name'
    },
    labelField: {
      type: String,
      default: 'name'
    }
  },
  emits: ['close', 'select', 'refresh'],
  setup(props, { emit }) {
    const searchQuery = ref('');
    const items = ref([]);
    const newItem = ref({});
    const editMode = ref(false);
    const currentItem = ref(null);
    const showItemModal = ref(false);

    newItem.value[props.labelField] = '';

    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`/api/v1/${props.apiEndpoint}`, { headers });
        items.value = response.data;
      } catch (error) {
        console.error(`Error fetching ${props.apiEndpoint} data:`, error);
        alert(`Ma'lumotlarni yuklashda xatolik yuz berdi: ${error.message}`);
      }
    };

    const filteredItems = computed(() => {
      return items.value.filter(item =>
        item[props.searchBy] && item[props.searchBy].toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const openAddModal = () => {
      editMode.value = false;
      newItem.value = { [props.labelField]: '' };
      showItemModal.value = true;
    };

    const openEditModal = (item) => {
      editMode.value = true;
      currentItem.value = item;
      newItem.value = { ...item };
      showItemModal.value = true;
    };

    const saveItem = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const method = editMode.value ? 'patch' : 'post';
        const url = editMode.value
          ? `/api/v1/${props.apiEndpoint}/id/${currentItem.value.id}`
          : `/api/v1/${props.apiEndpoint}`;

        await axios({
          method,
          url,
          data: newItem.value,
          headers
        });

        await fetchItems();
        showItemModal.value = false;
        emit('refresh');
      } catch (error) {
        console.error(`Error saving ${props.apiEndpoint} item:`, error);
        alert(`Saqlashda xatolik yuz berdi: ${error.message}`);
      }
    };

    const deleteItem = async (id) => {
      if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
        try {
          const token = localStorage.getItem("token");
          const headers = { Authorization: `Bearer ${token}` };
          await axios.delete(`/api/v1/${props.apiEndpoint}/id/${id}`, { headers });
          await fetchItems();
          emit('refresh');
        } catch (error) {
          console.error(`Error deleting ${props.apiEndpoint} item:`, error);
          alert(`O'chirishda xatolik yuz berdi: ${error.message}`);
        }
      }
    };

    const selectItem = (item) => {
      emit('select', item.id);
      emit('close');
    };

    watch(() => props.showModal, (newVal) => {
      if (newVal) {
        fetchItems();
      }
    });

    onMounted(() => {
      if (props.showModal) {
        fetchItems();
      }
    });

    return {
      searchQuery,
      filteredItems,
      newItem,
      editMode,
      showItemModal,
      openAddModal,
      openEditModal,
      saveItem,
      deleteItem,
      selectItem
    };
  }
};
</script>

<style scoped>
/* GenericSelectModal.vue ga tegishli stillar */
.custom-modal {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  overflow-y: auto;
}

.modal-dialog {
  max-width: 700px;
}

.modal-content {
  border-radius: 10px;
  border: none;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.custom-modal-header {
  background-color: #4A90E2;
  color: white;
  border-bottom: 1px solid #357ABD;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-modal-header .modal-title {
  font-weight: 600;
  font-size: 20px;
}

.custom-modal-header .btn-close {
  filter: invert(1);
  opacity: 0.8;
}
.custom-modal-header .btn-close:hover {
  opacity: 1;
}

.custom-modal-body {
  padding: 20px;
  background-color: #F8F9FA;
}

.search-input-group .form-control {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #EEF4FA;
  border-color: #D9E2ED;
}

.search-input-group .input-group-text {
  background-color: #EBF2F8;
  border: 1px solid #D9E2ED;
  border-right: none;
  border-radius: 6px 0 0 6px;
  color: #607289;
}

.btn-add-new {
  background-color: #28a745;
  border-color: #28a745;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 6px;
}

.btn-add-new:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.custom-table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #D9E2ED;
  border-radius: 8px;
  background-color: white;
}

.custom-table {
  margin-bottom: 0;
}

.custom-table th {
  background-color: #E5EEF7;
  color: #334A62;
  font-weight: 600;
  border-bottom: 1px solid #D9E2ED;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 12px 20px;
  font-size: 14px;
}

.custom-table td {
  padding: 10px 20px;
  font-size: 15px;
  color: #495057;
  border-bottom: 1px solid #EBF2F8;
}

.custom-table tbody tr:last-child td {
  border-bottom: none;
}

.custom-table tbody tr:hover {
  background-color: #F0F5FA;
}

.item-name-cell {
  cursor: pointer;
  font-weight: 500;
}

.action-buttons .btn {
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 5px;
}

.action-buttons .btn-outline-primary {
  color: #4A90E2;
  border-color: #4A90E2;
}

.action-buttons .btn-outline-primary:hover {
  background-color: #4A90E2;
  color: white;
}

.action-buttons .btn-outline-danger {
  color: #dc3545;
  border-color: #dc3545;
}

.action-buttons .btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}

.custom-modal-footer {
  background-color: #F0F5FA;
  border-top: 1px solid #D9E2ED;
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
}

.custom-modal-footer .btn-secondary {
  background-color: #A0A0A0;
  border-color: #A0A0A0;
  color: white;
}
.custom-modal-footer .btn-secondary:hover {
  background-color: #8C8C8C;
  border-color: #8C8C8C;
}

/* Qo'shish / Tahrirlash ichki modal stillari */
.custom-item-modal .modal-dialog {
  max-width: 450px;
}

.custom-item-modal .modal-header {
  background-color: #6c757d;
  color: white;
  border-bottom-color: #5a6268;
}

.custom-item-modal .modal-title {
  font-size: 18px;
}

.custom-item-modal .btn-close {
  filter: invert(1);
}

.custom-item-modal .modal-body {
  background-color: #F8F9FA;
}

.custom-item-modal .modal-footer {
  background-color: #F0F5FA;
  border-top-color: #D9E2ED;
}

.custom-item-modal .btn-primary {
  background-color: #4A90E2;
  border-color: #4A90E2;
}
</style>