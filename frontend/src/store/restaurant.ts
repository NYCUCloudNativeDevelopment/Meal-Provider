import { defineStore } from 'pinia'
import { type user } from '@/types/user'
import { type order } from '@/types/worker'
import { en } from 'element-plus/es/locales.mjs'
export const useRestaurantStore = defineStore({
  id: 'addRestaurant',
  state: () => ({
    restaurantInfo: {
      open_time: '11:00',
      close_time: '20:00',
      restaurant_name: '',
      phone: '',
      description: '',
      picture: null
    },
    mealInfo: {
      restaurant_id: '',
      name: '',
      price: 0,
      description: '',
      picture: null,
      picture_filename: '',
      combo: 0
    }
  }),
  persist: true
})
