<template>
  <div class="container mt-3">
  
    <div class="  pb-3 d-flex justify-content-between align-items-center">
    <h4 class="mb-6 fs-2">To'lov</h4>
   <button class="btn btn-primary btn-md" @click="$router.push('/addTolov')">Qo'shish</button>
  </div>
    <table class="table table-bordered table-hover">
      <thead class="table-dark">
         <tr>
          <th>ID</th>
          <th>Ism</th>
          <th>Sana & Vaqt</th>
          <th>Sklad</th>
          <th>Miqdor</th>
          <th>Turi</th>
          <th>Role</th>
          <th>Izoh</th>
          <th>Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tolovlar" :key="index">
           <td>{{index + 1}}</td>
        <td>{{item.name}}</td>
        <td>{{item.datetime}}</td>
        <td>{{item.warehouse}}</td>
        <td>{{item.amount}}</td>
        <td>{{item.type}}</td>
        <td>{{item.role}}</td>
        <td>{{item.note}}</td>
          <td>
            <button class="btn btn-sm btn-warning me-1"> <i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-sm btn-danger" @click="deleteElement(index)"><i class="bi bi-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
   props: {
  tolov: { type: Object, default: null }
},
  data() {
    return {
      tolovlar: [
  {
    
    "name": "john",
    "datetime": "01-06-2024 09:12:30",
    "warehouse": "Asosiy sklad",
    "amount": "100 000",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
   
    "name": "alex",
    "datetime": "02-06-2024 10:15:45",
    "warehouse": "Asosiy sklad",
    "amount": "250 000",
    "type": "Kirim",
    "role": "User",
    "note": "Initial deposit"
  },
  {
    
    "name": "mia",
    "datetime": "03-06-2024 11:05:20",
    "warehouse": "Asosiy sklad",
    "amount": "3 000",
    "type": "Kirim",
    "role": "test",
    "note": ""
  },
  {
    
    "name": "ethan",
    "datetime": "04-06-2024 12:22:10",
    "warehouse": "Asosiy sklad",
    "amount": "87 000",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "olivia",
    "datetime": "05-06-2024 14:01:56",
    "warehouse": "Asosiy sklad",
    "amount": "12 700",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "liam",
    "datetime": "06-06-2024 15:32:12",
    "warehouse": "Asosiy sklad",
    "amount": "2 000 000",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "emma",
    "datetime": "07-06-2024 08:45:33",
    "warehouse": "Asosiy sklad",
    "amount": "1 181",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "noah",
    "datetime": "08-06-2024 13:18:49",
    "warehouse": "Asosiy sklad",
    "amount": "90 000",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "ava",
    "datetime": "09-06-2024 17:03:55",
    "warehouse": "Asosiy sklad",
    "amount": "78,74",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "jack",
    "datetime": "10-06-2024 09:09:09",
    "warehouse": "Asosiy sklad",
    "amount": "6 000",
    "type": "Kirim",
    "role": "User",
    "note": "reimbursement"
  },
  {
    
    "name": "sophia",
    "datetime": "11-06-2024 16:45:00",
    "warehouse": "Asosiy sklad",
    "amount": "25 400",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "lucas",
    "datetime": "12-06-2024 11:22:22",
    "warehouse": "Asosiy sklad",
    "amount": "5 080 000",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "isabella",
    "datetime": "13-06-2024 10:10:10",
    "warehouse": "Asosiy sklad",
    "amount": "100 000",
    "type": "Kirim",
    "role": "test",
    "note": "Promo"
  },
  {
    
    "name": "logan",
    "datetime": "14-06-2024 13:37:48",
    "warehouse": "Asosiy sklad",
    "amount": "2 770 000",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
   
    "name": "ella",
    "datetime": "15-06-2024 08:00:00",
    "warehouse": "Asosiy sklad",
    "amount": "0,079",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "harry",
    "datetime": "16-06-2024 12:12:12",
    "warehouse": "Asosiy sklad",
    "amount": "780 000",
    "type": "Kirim",
    "role": "test",
    "note": ""
  },
  {
   
    "name": "grace",
    "datetime": "17-06-2024 14:14:14",
    "warehouse": "Asosiy sklad",
    "amount": "4 000",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "ryan",
    "datetime": "18-06-2024 18:18:18",
    "warehouse": "Asosiy sklad",
    "amount": "1 270 000 000",
    "type": "Kirim",
    "role": "test",
    "note": "mcklm klvmdfkvm"
  },
  {
    
    "name": "luna",
    "datetime": "19-06-2024 07:07:07",
    "warehouse": "Asosiy sklad",
    "amount": "12 700",
    "type": "Kirim",
    "role": "User",
    "note": ""
  },
  {
    
    "name": "nathan",
    "datetime": "20-06-2024 15:15:15",
    "warehouse": "Asosiy sklad",
    "amount": "5 000",
    "type": "Kirim",
    "role": "User",
    "note": ""
  }
]
    };
  },
  created() {
   
    // Агар props тилидаги `tolov` объекти занжираланган бўлса
    if (this.tolov) {
      console.log('Янги тўлов келди:', this.tolov)
      this.tolovlar.push(this.tolov)
    } else {
      console.log('Янги тўлов топилмади.')
    }
  },
  methods:{
    deleteElement(index){
        if(confirm(`Rostan ham ${index+1} tartibdagi qatorni o'chirasizmi?`)){this.dtolovlar.splice(index,1)}
        

    }
  }
};
</script>

<style>
/* Optional: Jadvalni biroz chiroyli qilish */
table th,
table td {
  vertical-align: middle;
  text-align: center;
}
</style>
