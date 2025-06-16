<template>
  <div class="bg-light p-3 vh-100" style="width: 200px;">
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link
          to="/kirim"
          class="nav-link"
          active-class="active bg-primary text-white rounded"
        >
          Kirim
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/chiqim"
          class="nav-link"
          active-class="active bg-primary text-white rounded"
        >
          Chiqim
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/tolov"
          class="nav-link"
          active-class="active bg-primary text-white rounded"
        >
          To'lov
        </router-link>
      </li>
    </ul>
  </div>
</template>

