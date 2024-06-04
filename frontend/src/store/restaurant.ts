import { defineStore } from 'pinia'
import { type user } from '@/types/user'
import { type order } from '@/types/worker'
import { en } from 'element-plus/es/locales.mjs'
export const useRestaurantStore = defineStore({
  id: 'addRestaurant',
  state: () => ({
    restaurantInfo: {
      startTime: '11:00',
      endTime: '20:00',
      restaurantName: '',
      restaurantPhone: '',
      describe: ''
    }
  }),
  persist: true
})
