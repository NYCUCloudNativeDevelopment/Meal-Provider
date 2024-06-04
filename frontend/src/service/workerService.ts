import type { order, restaurant, orderReview } from '../types/worker'

export default class workerService {
  static async getRestaurantList(): Promise<any[]> {
    try {
      const response = await fetch('/api/main/restaurant_list')
      const data = await response.json()
      return data.restaurants
    } catch (error) {
      console.error(`GET /api/main/restaurant_list ${error}`)
      throw error
    }
  }

  static async getRestaurant(token: string, restaurant_id: string): Promise<restaurant> {
    const response = await fetch('/api/main/restaurant/' + restaurant_id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const data = await response.json()
    console.log(data)
    return data
  }

  static async getHistoryOrder(token: string): Promise<order[]> {
    const response = await fetch('/api/main/history', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const data = await response.json()
    return data.orders
  }

  // rating order by user
  static async reviewOrder(token: string, order_id: number, overAllRating: number, order: order): Promise<void> {
    const data = {
      order_id: order_id,
      overall_rating: overAllRating, // 1 to 5
      dishes_rating: [] as { dish_id: number; rating: number }[]
    }
    for (let i = 0; i < order.dishes.length; i++) {
      data.dishes_rating.push({
        dish_id: order.dishes[i].dish_id,
        rating: 1
      } as { dish_id: number; rating: number }) // Add type annotation here
    }
    console.log(data)
    const response1 = await fetch('/api/main/history', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    console.log(await response1.json())
    const response = await fetch('/api/main/add_review', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(token)
    console.log(response)
    console.log(await response.json())
  }
}
