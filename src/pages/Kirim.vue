<template>
  <div class="container-fluid mt-3">
    <div class="pb-3 d-flex justify-content-between align-items-center">
      <h4 class="mb-0 fs-2 text-primary">Kirim</h4>
      <button class="btn btn-primary btn-md">Qo'shish</button>
    </div>

    <div class="table-wrapper rounded shadow-sm">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Mas'ul shaxs</th>
            <th>Summa</th>
            <th>Sana</th>
            <th>Mijoz</th>
            <th>To'lov turi</th>
            <th>Izoh</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.masulShaxs }}</td>
            <td>{{ item.summa.toLocaleString() }} so'm</td>
            <td>{{ item.sana }}</td>
            <td>{{ item.mijoz }}</td>
            <td>{{ item.tolovTuri }}</td>
            <td>{{ item.izoh }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteElement(index)">
                <i class="bi bi-trash"></i>
              </button>
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
      data: [
        {
          masulShaxs: "Aliyev Jamshid",
          summa: 250000,
          sana: "2025-06-01",
          mijoz: "Karimov D.",
          tolovTuri: "Naqd",
          izoh: "To‘lov joyida amalga oshirildi",
        },
        {
          masulShaxs: "Rustamova Nargiza",
          summa: 1000000,
          sana: "2025-06-02",
          mijoz: "Shukurova M.",
          tolovTuri: "Karta",
          izoh: "Terminal orqali",
        },
        {
          masulShaxs: "Abduganiyev Aziz",
          summa: 150000,
          sana: "2025-06-03",
          mijoz: "Ergashev A.",
          tolovTuri: "Bank o‘tkazmasi",
          izoh: "Oldindan to‘lov",
        },
        {
          masulShaxs: "Salimova Dilorom",
          summa: 500000,
          sana: "2025-06-03",
          mijoz: "Yunusov Z.",
          tolovTuri: "Karta",
          izoh: "QR kod orqali to‘landi",
        },
        {
          masulShaxs: "Toirov Shohrux",
          summa: 300000,
          sana: "2025-06-04",
          mijoz: "Bekchanov O.",
          tolovTuri: "Naqd",
          izoh: "Ofisda to‘lov qilindi",
        },
        {
          masulShaxs: "Hasanova Gulbahor",
          summa: 700000,
          sana: "2025-06-04",
          mijoz: "Aliyeva S.",
          tolovTuri: "Karta",
          izoh: "Payme orqali",
        },
        {
          masulShaxs: "Yoqubov Baxtiyor",
          summa: 450000,
          sana: "2025-06-05",
          mijoz: "Maxmudov I.",
          tolovTuri: "Bank o‘tkazmasi",
          izoh: "Shartnoma asosida",
        },
        {
          masulShaxs: "Nasriddinov Sanjar",
          summa: 600000,
          sana: "2025-06-06",
          mijoz: "Jabborova N.",
          tolovTuri: "Karta",
          izoh: "Humo orqali",
        },
        {
          masulShaxs: "Rahimova Zilola",
          summa: 800000,
          sana: "2025-06-06",
          mijoz: "Turgunov A.",
          tolovTuri: "Naqd",
          izoh: "Kvitansiya berilgan",
        },
        {
          masulShaxs: "Shamsiyev Doston",
          summa: 200000,
          sana: "2025-06-07",
          mijoz: "Qodirova M.",
          tolovTuri: "Karta",
          izoh: "Click orqali",
        },
        {
          masulShaxs: "Islomov Sherzod",
          summa: 100000,
          sana: "2025-06-07",
          mijoz: "Karimova D.",
          tolovTuri: "Naqd",
          izoh: "Ofisda qabul qilindi",
        },
        {
          masulShaxs: "Sodiqova Maftuna",
          summa: 300000,
          sana: "2025-06-08",
          mijoz: "Sultonov R.",
          tolovTuri: "Karta",
          izoh: "Payme orqali",
        },
        {
          masulShaxs: "Rashidov Doniyor",
          summa: 950000,
          sana: "2025-06-08",
          mijoz: "Olimova G.",
          tolovTuri: "Bank o‘tkazmasi",
          izoh: "Hisob raqamiga o‘tkazildi",
        },
        {
          masulShaxs: "Soliev Odil",
          summa: 350000,
          sana: "2025-06-08",
          mijoz: "Saidov I.",
          tolovTuri: "Naqd",
          izoh: "Joyida to‘landi",
        },
        {
          masulShaxs: "Kamolova Dilnoza",
          summa: 200000,
          sana: "2025-06-09",
          mijoz: "Zokirov Sh.",
          tolovTuri: "Karta",
          izoh: "Click orqali",
        },
        {
          masulShaxs: "Murodov Farhod",
          summa: 400000,
          sana: "2025-06-09",
          mijoz: "Tojiboyeva L.",
          tolovTuri: "Naqd",
          izoh: "Qabul dalolatnomasi bor",
        },
        {
          masulShaxs: "Asqarova Shahnoza",
          summa: 300000,
          sana: "2025-06-09",
          mijoz: "Jalolov K.",
          tolovTuri: "Bank o‘tkazmasi",
          izoh: "Bankdan tasdiq olingan",
        },
        {
          masulShaxs: "Karimov Aziz",
          summa: 1000000,
          sana: "2025-06-09",
          mijoz: "Nazarova G.",
          tolovTuri: "Karta",
          izoh: "Payme orqali",
        },
        {
          masulShaxs: "Madaminova Dildora",
          summa: 120000,
          sana: "2025-06-09",
          mijoz: "Salimov A.",
          tolovTuri: "Naqd",
          izoh: "To‘liq to‘langan",
        },
        {
          masulShaxs: "Erkinov Botir",
          summa: 850000,
          sana: "2025-06-09",
          mijoz: "Raxmonova S.",
          tolovTuri: "Karta",
          izoh: "Click orqali",
        },
        {
          masulShaxs: "Sattorov Shavkat",
          summa: 180000,
          sana: "2025-06-09",
          mijoz: "Ibodova N.",
          tolovTuri: "Naqd",
          izoh: "Kvitansiya olindi",
        },
        {
          masulShaxs: "Muhammedova Nargiza",
          summa: 270000,
          sana: "2025-06-09",
          mijoz: "G‘ulomov D.",
          tolovTuri: "Bank o‘tkazmasi",
          izoh: "Shartnoma bilan",
        },
        {
          masulShaxs: "Xolmatov Murod",
          summa: 320000,
          sana: "2025-06-09",
          mijoz: "Safarova Z.",
          tolovTuri: "Karta",
          izoh: "Click orqali",
        },
        {
          masulShaxs: "O‘rozboyeva Zarnigor",
          summa: 400000,
          sana: "2025-06-09",
          mijoz: "Tursunov B.",
          tolovTuri: "Naqd",
          izoh: "Ofisda to‘langan",
        },
      ],
    };
  },
  methods: {
    deleteElement(index) {
      if (confirm(`Rostan ham ${index + 1} tartibdagi bo'limni o'chirasizmi?`)) {
        this.data.splice(index, 1);
      }
    },
  },
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
</style>