import type { restaurant, chart, order } from '../types/restaurant'

export default class restaurantService {
  static async getRestaurant(token: string): Promise<restaurant> {
    try {
      const response = await fetch('/api/pos/menu', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      if (response.status === 403) {
        throw new Error('Permission Denied')
      }
      const data = await response.json()
      const info = {
        restaurant: 'Fake Restaurant',
        meals: data.meals
      }
      return info
    } catch (error) {
      console.error('GET /api/pos/menu', error)
      throw error
    }
  }
  static async checkOuth(token: string): Promise<boolean> {
    const response = await fetch('/api/pos/get_order', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    console.log(response)
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  }
  static async addOrder(token: string, order: chart): Promise<string> {
    try {
      const response = await fetch('/api/pos/add_order', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
      if (response.status === 403) {
        throw new Error('Permission Denied')
      }
      const data = await response.json()
      return data.order_id
    } catch (error) {
      console.error('POST /api/pos/add_order', error)
      throw error
    }
  }

  static async getHistoryOrder(token: string): Promise<order[]> {
    const response = await fetch('/api/pos/get_order', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const data = (await response.json()) as {
      orders: order[]
    }
    return data.orders
  }
  static async finishOrder(token: string, order_id: number): Promise<void> {
    const response = await fetch(`/api/pos/finish/${order_id}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
}
