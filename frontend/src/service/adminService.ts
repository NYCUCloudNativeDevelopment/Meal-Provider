import type { restaurant, chart, order } from '../types/restaurant'

export default class adminService {
  static async addNewRestaurant(token: string, restaurant: any): Promise<boolean> {
    try {
      const response = await fetch('/api/admin/add_restaurant', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(restaurant)
      })
      if (response.status != 200) {
        throw new Error('Permission Denied')
      }
      const data = await response.json()
      const restaurant_id = data.restaurant_id
      const formData = new FormData()
      formData.append('image', restaurant.picture)
      formData.append('restaurant_id', restaurant_id)
      const response2 = await fetch('/api/admin/upload/cover', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: formData
      })
      console.log(await response2.json())
      if (response2.status != 200) {
        throw new Error('Permission Denied')
      }
      return true
    } catch (error) {
      throw error
      return false
    }
  }
}
