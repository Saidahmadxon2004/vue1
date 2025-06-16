<template>
  <div class="container mt-3">
    <div class="  pb-3 d-flex justify-content-between align-items-center">
    <h4 class="mb-6 fs-2">Chiqim</h4>
    <button class="btn btn-primary btn-md " >Qo'shish</button>
  </div>
    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>No</th>
          <th>Mas'ul shaxs</th>
          <th>Summa</th>
          <th>Sana</th>
          <th>Oluvchi</th>
          <th>To'lov turi</th>
          <th>Izoh</th>
          <th>Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in chiqimlar" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.masulShaxs }}</td>
          <td>{{ item.summa.toLocaleString() }} so'm</td>
          <td>{{ item.sana }}</td>
          <td>{{ item.oluvchi }}</td>
          <td>{{ item.tolovTuri }}</td>
          <td>{{ item.izoh }}</td>
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
  data() {
    return {
      chiqimlar: [
  {
    masulShaxs: "Muhammedova Nargiza",
    summa: 150000,
    sana: "2025-06-09",
    oluvchi: "Muhammedova Nargiza",
    tolovTuri: "Naqd",
    izoh: "Xizmat haqi"
  },
  {
    masulShaxs: "Rustamov Diyor",
    summa: 20000,
    sana: "2025-06-10",
    oluvchi: "Milliy Bank",
    tolovTuri: "Bank o‘tkazmasi",
    izoh: "Bank komissiyasi"
  },
  {
    masulShaxs: "Islomova Laylo",
    summa: 30000,
    sana: "2025-06-08",
    oluvchi: "Ofis tozalash xizmati",
    tolovTuri: "Naqd",
    izoh: "May oyi tozalash"
  },
  {
    masulShaxs: "Karimov Kamol",
    summa: 100000,
    sana: "2025-06-07",
    oluvchi: "Texnika taʼmiri",
    tolovTuri: "Naqd",
    izoh: "Printer taʼmiri"
  },
  {
    masulShaxs: "Muhammedova Nargiza",
    summa: 50000,
    sana: "2025-06-06",
    oluvchi: "Yuridik xizmat",
    tolovTuri: "Bank o‘tkazmasi",
    izoh: "Shartnoma tayyorlash"
  },
  {
    masulShaxs: "Rustamov Diyor",
    summa: 35000,
    sana: "2025-06-05",
    oluvchi: "Kanselyariya",
    tolovTuri: "Naqd",
    izoh: "Qalam, qog‘oz, fayl"
  },
  {
    masulShaxs: "Islomova Laylo",
    summa: 220000,
    sana: "2025-06-04",
    oluvchi: "Qurilish materiallari",
    tolovTuri: "Bank o‘tkazmasi",
    izoh: "Ombor taʼmir ishlari"
  },
  {
    masulShaxs: "Karimov Kamol",
    summa: 120000,
    sana: "2025-06-03",
    oluvchi: "Avtotransport xizmati",
    tolovTuri: "Naqd",
    izoh: "Tovar tashish"
  },
  {
    masulShaxs: "Muhammedova Nargiza",
    summa: 5000,
    sana: "2025-06-02",
    oluvchi: "Obuna",
    tolovTuri: "Naqd",
    izoh: "Gazeta/jurnal uchun"
  },
  {
    masulShaxs: "Rustamov Diyor",
    summa: 180000,
    sana: "2025-06-01",
    oluvchi: "Elektr to‘lovi",
    tolovTuri: "Bank o‘tkazmasi",
    izoh: "May oyi uchun"
  },
  {
    masulShaxs: "Islomova Laylo",
    summa: 95000,
    sana: "2025-05-31",
    oluvchi: "Usta xizmatlari",
    tolovTuri: "Naqd",
    izoh: "Mehnat stoli yig‘ish"
  },
  {
    masulShaxs: "Karimov Kamol",
    summa: 70000,
    sana: "2025-05-30",
    oluvchi: "Taminotchi MCHJ",
    tolovTuri: "Bank o‘tkazmasi",
    izoh: "Material xaridi"
  },
  {
    masulShaxs: "Muhammedova Nargiza",
    summa: 40000,
    sana: "2025-05-29",
    oluvchi: "Reklama",
    tolovTuri: "Naqd",
    izoh: "Ijtimoiy tarmoqlar"
  },
  {
    masulShaxs: "Rustamov Diyor",
    summa: 125000,
    sana: "2025-05-28",
    oluvchi: "Internet provayder",
    tolovTuri: "Bank o‘tkazmasi",
    izoh: "3 oylik xizmat"
  },
  {
    masulShaxs: "Islomova Laylo",
    summa: 60000,
    sana: "2025-05-27",
    oluvchi: "Konditsioner ustasi",
    tolovTuri: "Naqd",
    izoh: "Xona sovutgichni tuzatish"
  }
]

    };
  },
  methods:{
    deleteElement(index){
        if(confirm(`Rostan ham ${index+1} tartibdagi bo'limni o'chirasizmi?`)){this.chiqimlar.splice(index,1)}
        

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
