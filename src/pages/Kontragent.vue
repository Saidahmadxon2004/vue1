<template>
  <div class="container-fluid mt-3">
    

    <div class="table-wrapper rounded shadow-sm">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Nomi</th>
            <th>Telefon</th>
            <th>Manzil</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="currentFolderId !== 0" style="cursor:pointer" @click="goBack">
            <td>⬅</td>
            <td colspan="4"><strong>..</strong></td>
          </tr>

          <tr 
            v-for="(item, index) in data" 
            :key="index"
            :style="item.is_folder ? 'cursor:pointer;' : ''"
            @click="item.is_folder && openFolder(item.id)"
          >
            <td>
              <span v-if="item.is_folder">📁</span>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ item.address }}</td>
           <td>
  <div class="action-buttons-container">
    <button class="action-btn btn-edit" @click="$router.push('/kontragent/update/' + item.id)">
      <i class="bi bi-pencil-square"></i>
    </button>
    <button class="action-btn btn-delete" @click="deleteElement(item.id)">
      <i class="bi bi-trash"></i>
    </button>
  </div>
</td>
           
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      currentFolderId: 0,
      parentStack: []
    };
  },
  mounted() {
    this.loadFolder(0);
  },
  methods: {
    async loadFolder(parentId) {
      try {
        const res = await this.$axios.get(`/api/v1/kontragent/all/${parentId}`);
        this.data = res.data;
        console.log(`✅ Folder ${parentId} yuklandi`, this.data);
      } catch (err) {
        console.error(`❌ Folder ${parentId} ni yuklashda xatolik:`, err);
      }
    },
    openFolder(folderId) {
      this.parentStack.push(this.currentFolderId);
      this.currentFolderId = folderId;
      this.loadFolder(folderId);
    },
    goBack() {
      if (this.parentStack.length > 0) {
        this.currentFolderId = this.parentStack.pop();
      } else {
        this.currentFolderId = 0;
      }
      this.loadFolder(this.currentFolderId);
    },
    async deleteElement(id) {
      try {
        await this.$axios.delete(`/api/v1/kontragent/id/${id}`);
        alert(`🗑️ ID: ${id} muvaffaqiyatli o‘chirildi`);
        this.loadFolder(this.currentFolderId);
      } catch (err) {
        console.error('❌ O‘chirishda xatolik:', err);
        alert('Xatolik: o‘chirish bajarilmadi');
      }
    }
  }
};
</script>

<style scoped>
.table-wrapper {
  max-height: 700px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
}

table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #eef2f7;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
}

table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

table tbody tr:nth-child(odd) {
  background-color: #e2eaf4;
}

table th,
table td {
  vertical-align: middle;
  text-align: center;
  padding: 0.75rem;
}

tr:hover {
  background: #f0f0f0;
}
</style>