import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Layout from '../components/Layout.vue'
import Kirim from '@/pages/Kirim.vue'
import Chiqim from '@/pages/Chiqim.vue'
import Tolov from '@/pages/Tolov.vue'

import Unit from '@/pages/Unit.vue'
import UnitCreate from '@/Unit/UnitCreate.vue'
import ExtraUnit from '@/pages/ExtraUnit.vue'
import ExtraUnitCreate from '@/ExtraUnit/ExtraUnitCreate.vue'
import Countrys from '@/pages/Countrys.vue'
import Brands from '@/pages/Brands.vue'
import Modals from '@/pages/Models.vue'
import Colours from '@/pages/Colours.vue'
import ExtraUnitUpdate from '@/ExtraUnit/ExtraUnitUpdate.vue'
import UnitUpdate from '@/Unit/UnitUpdate.vue'
import ColourCreate from '@/Colours/ColourCreate.vue'
import ColourUpdate from '@/Colours/ColourUpdate.vue'
import BrandCreate from '@/Brands/BrandCreate.vue'
import BrandUpdate from '@/Brands/BrandUpdate.vue'
import ModelCreate from '@/Models/ModelCreate.vue'
import ModelUpdate from '@/Models/ModelUpdate.vue'
import CountryCreate from '@/Countrys/CountryCreate.vue'
import CountryUpdate from '@/Countrys/CountryUpdate.vue'
import Product from '@/pages/Product.vue'
import ProductCreate from '@/FormProduct/ProductCreate.vue'
import ProductUpdate from '@/FormProduct/ProductUpdate.vue'
import Kurs from '@/pages/kurs.vue'
import KursCreate from '@/pages/KursCreate.vue'
import Kontragent from '@/pages/Kontragent.vue'
import CRM from '@/pages/CRM.vue'
import KontragentCreate from '@/Kontragent/KontragentCreate.vue'
import KontragentUpdate from '@/Kontragent/KontragentUpdate.vue'
import CrmCreate from '@/CRM/CrmCreate.vue'
import CrmUpdate from '@/CRM/CrmUpdate.vue'
import Staff from '@/pages/Staff.vue'
import StaffCreate from '@/Staff/StaffCreate.vue'
import StaffUpdate from '@/Staff/StaffUpdate.vue'
import Users from '@/pages/Users.vue'
import UsersCreate from '@/Users/UsersCreate.vue'
import UserUpdate from '@/Users/UserUpdate.vue'
import KassaOrder from '@/pages/KassaOrder.vue'
import KassaOrderCreate from '@/KassaOrder/KassaOrderCreate.vue'
import KassaOrderUpdate from '@/KassaOrder/KassaOrderUpdate.vue'
import KirimCreate from '@/Kirim/KirimCreate.vue'
import KirimUpdate from '@/Kirim/KirimUpdate.vue'
import TolovCreate from '@/Tolov/TolovCreate.vue'
import TolovUpdate from '@/Tolov/TolovUpdate.vue'




const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
         path: '/kirim',
        name: 'Kirim',
        component: Kirim

      },{
         path: '/savdo',
        name: 'Savdo',
        component: Chiqim

      },{
         path: '/tolov',
        name: 'Tolov',
        component: Tolov,
        props: route => ({
    tolov: route.query.tolov ? JSON.parse(route.query.tolov) : null
  })

      },
      {
         path: '/units',
        name: 'Birliklar',
        component: Unit

      },
      {
         path: '/extraunits',
        name: 'Qoshimcha birliklar',
        component: ExtraUnit

      },{
         path: '/models',
        name: 'Modal',
        component:Modals

      },
      {
         path: '/brands',
        name: 'Brand',
        component: Brands

      },
      {
         path: '/colours',
        name: 'Rang',
        component: Colours

      },
      {
         path: '/countrys',
        name: 'Mamlakatlar',
        component: Countrys

      },{
         path: '/products',
        name: 'Mahsulotlar',
        component:Product

      },{
         path: '/kurs',
        name: 'Kurs',
        component:Kurs

      },{
         path: '/kontragent',
        name: 'Kontragent',
        component:Kontragent

      },
      {
         path: '/crm',
        name: 'CRM',
        component:CRM

      },
      {
         path: '/staff',
        name: 'Xodimlar',
        component:Staff

      },
      {
         path: '/users',
        name: 'Foydalanuvchilar',
        component:Users

      },
      {
         path: '/kassoviyOrder',
        name: 'KassoviyOrder',
        component:KassaOrder

      }
    ]
  },{
    path: '/addTolov',
    name: 'AddTolov',
    component: TolovCreate
  },{
    path: '/addUnit',
    name: 'unitAdd',
    component: UnitCreate
  },{
    path: '/product/create',
    name: 'ProductCreate',
    component: ProductCreate
  },{
    path: '/product/update/:id',
    name: 'ProductUpdate',
    component: ProductUpdate
  },
  {
    path: '/unit/update/:id',
    name: 'unitUpdate',
    component: UnitUpdate
  },
  {
    path: '/addExtraUnit',
    name: 'ExtraunitAdd',
    component: ExtraUnitCreate
  },
  {
    path: '/ExtraUnit/update/:id',
    name: 'ExtraunitUpdate',
    component: ExtraUnitUpdate
  },{
    path: '/addColour',
    name: 'Colour',
    component: ColourCreate
  },
  {
    path: '/colour/update/:id',
    name: 'ColourUpdate',
    component: ColourUpdate
  },{
    path: '/addBrand',
    name: 'Brandadd',
    component: BrandCreate
  },
  {
    path: '/brand/update/:id',
    name: 'BrandUpdate',
    component: BrandUpdate
  },{
    path: '/addModel',
    name: 'ModelAdd',
    component: ModelCreate
  },
  {
    path: '/model/update/:id',
    name: 'ModelUpdate',
    component: ModelUpdate
  },{
    path: '/addCountry',
    name: 'CountryAdd',
    component: CountryCreate
  },
  {
    path: '/country/update/:id',
    name: 'CountryUpdate',
    component: CountryUpdate
  }
  ,
  {
    path: '/kurs/create',
    name: 'KursCreate',
    component: KursCreate
  },{
    path: '/kontragent/create',
    name: 'KontragentCreate',
    component: KontragentCreate
  },{
    path: '/kontragent/update/:id',
    name: 'KontragentUpdate',
    component: KontragentUpdate
  },{
    path: '/crm/create',
    name: 'CrmCreate',
    component: CrmCreate
  },{
    path: '/crm/update/:id',
    name: 'CrmUpdate',
    component: CrmUpdate
  },{
    path: '/staff/create',
    name: 'StaffCreate',
    component:StaffCreate
  },{
    path: '/staff/update/:id',
    name: 'StaffUpdate',
    component: StaffUpdate
  },{
    path: '/user/create',
    name: 'UserCreate',
    component:UsersCreate
  },{
    path: '/user/update/:id',
    name: 'UserUpdate',
    component: UserUpdate
  }
  ,{
    path: '/kassaOrder/create',
    name: 'KassaOrderCreate',
    component:KassaOrderCreate
  },{
    path: '/kassaOrder/update/:id',
    name: 'KassaOrderUpdate',
    component: KassaOrderUpdate
  } ,{
    path: '/kirim/create',
    name: 'KirimCreate',
    component:KirimCreate
  },{
    path: '/kirim/update/:id',
    name: 'KirimUpdate',
    component: KirimUpdate
  },{
    path: '/tolov/update/:id',
    name: 'TolovUpdate',
    component: TolovUpdate
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
