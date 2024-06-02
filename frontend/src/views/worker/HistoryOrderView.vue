<template>
  <RateOrderDialog v-if="showDialog" @close="submitReview()"></RateOrderDialog>
  <div class="mx-auto bg-white">
    <div class="flex flex-col-reverse lg:flex-row">
      <WorkerSidebar class="min-h-screen w-full shadow-lg lg:w-1/6"></WorkerSidebar>
      <div class="w-full lg:w-5/6">
        
        <div class="px-4 py-4 md:px-10 md:py-7">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
        </div>
        <div class="bg-white px-4 py-4 md:px-8 md:py-7 xl:px-10">
          <div class="items-center justify-between sm:flex">
            <div class="flex items-center">
              <a
                class="rounded-full focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800"
                href=" javascript:void(0)"
              >
                <div class="rounded-full bg-indigo-100 px-8 py-2 text-indigo-700">
                  <p>All</p>
                </div>
              </a>
              <a
                class="ml-4 rounded-full focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8"
                href="javascript:void(0)"
              >
                <div class="rounded-full px-8 py-2 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700">
                  <p>Done</p>
                </div>
              </a>
              <a
                class="ml-4 rounded-full focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8"
                href="javascript:void(0)"
              >
                <div class="rounded-full px-8 py-2 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700">
                  <p>Pending</p>
                </div>
              </a>
            </div>
            <div
              class="flex cursor-pointer items-center rounded bg-gray-200 px-4 py-3 text-sm font-medium leading-none text-gray-600 hover:bg-gray-300"
            >
              <p>Sort By:</p>
              <select aria-label="select" class="ml-1 bg-transparent focus:text-indigo-600 focus:outline-none">
                <option class="text-sm text-indigo-800">Latest</option>
                <option class="text-sm text-indigo-800">Oldest</option>
                <option class="text-sm text-indigo-800">Latest</option>
              </select>
            </div>
          </div>
          <div class="mt-7 overflow-x-auto">
            <table class="w-full whitespace-nowrap">
              <tbody>

                <tr tabindex="0" class="h-16 rounded border border-gray-300 focus:outline-none ">
                  <td class="pl-5"></td>
                  <td class="pl-5">
                    <div class="flex items-center">
                      <p class="mr-2 text-base font-medium leading-none text-gray-700">
                        餐廳名稱
                      </p>
                    </div>
                  </td>
                  <td class="pl-24">
                    <div class="flex items-center">
                      <p class="ml-2 text-sm leading-none text-gray-600">
                        總共消費金額
                      </p>
                    </div>
                  </td>
                  <td class="pl-5">
                  </td>
                  <td class="pl-5">
                  </td>
                  <td class="pl-5">
                    <div class="flex items-center">
                      <p class="ml-2 text-sm leading-none text-gray-600">餐廳評分</p>
                    </div>
                  </td>
                  <td class="pl">

                  </td>

                  <td>
                    <div class="flex items-center">
                      <p class="ml-2 text-sm leading-none text-gray-600">評分此餐廳</p>
                    </div>
                  </td>
                  <td class="pl-4">
                    <button
                      class="rounded bg-gray-100 px-5 py-3 text-sm leading-none text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <div class="relative px-5 pt-2">
                      <button
                        class="rounded-md focus:outline-none focus:ring-2"
                        onclick="dropdownFunction(this)"
                        role="button"
                        aria-label="option"
                      >
                      <svg
                        data-accordion-icon
                        class="h-3 w-3 shrink-0 rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                      </button>
                      <div class="dropdown-content absolute right-0 z-30 mr-6 hidden w-24 bg-white shadow">
                        <div
                          tabindex="0"
                          class="w-full cursor-pointer px-4 py-4 text-xs hover:bg-indigo-700 hover:text-white focus:text-indigo-600 focus:outline-none"
                        >
                          <p>Edit</p>
                        </div>
                        <div
                          tabindex="0"
                          class="w-full cursor-pointer px-4 py-4 text-xs hover:bg-indigo-700 hover:text-white focus:text-indigo-600 focus:outline-none"
                        >
                          <p>Delete</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-for="order, index in orders" class="h-16 rounded border border-gray-300 focus:outline-none">
                  <td class="pl-4">{{ index + 1 }}</td>
                  <td class="pl-5">
                    <div class="flex items-center">
                      <p class="mr-2 text-base font-medium leading-none text-gray-700">
                        {{ order.restaurant_name }}
                      </p>
                    </div>
                  </td>
                  <td class="pl-24">
                    <div class="flex items-center">
                      <p class="ml-2 text-sm leading-none text-gray-600">
                        $ {{ order.total_price }}
                      </p>
                    </div>
                  </td>
                  <td class="pl-5">
                  </td>
                  <td class="pl-5">
                  </td>
                  <td class="pl-5">
                    <div class="flex items-center">
                      <p class="ml-2 text-sm leading-none text-gray-600">
                        {{ order.overall_rating }}
                      </p>
                    </div>
                  </td>
                  <td class="pl">

                  </td>

                  <td>
                    <button
                      @click="openDialog(index)"
                      class="rounded bg-gray-100 px-5 py-3 text-sm leading-none text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                    >
                      rate order
                    </button>
                  </td>
                  <td class="pl-4">
                    <button
                      class="rounded bg-gray-100 px-5 py-3 text-sm leading-none text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <div class="relative px-5 pt-2">
                      <button
                        class="rounded-md focus:outline-none focus:ring-2"
                        onclick="dropdownFunction(this)"
                        role="button"
                        aria-label="option"
                      >
                        <svg
                          class="dropbtn"
                          onclick="dropdownFunction(this)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                            stroke="#9CA3AF"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                            stroke="#9CA3AF"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                            stroke="#9CA3AF"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                      <div class="dropdown-content absolute right-0 z-30 mr-6 hidden w-24 bg-white shadow">
                        <div
                          tabindex="0"
                          class="w-full cursor-pointer px-4 py-4 text-xs hover:bg-indigo-700 hover:text-white focus:text-indigo-600 focus:outline-none"
                        >
                          <p>Edit</p>
                        </div>
                        <div
                          tabindex="0"
                          class="w-full cursor-pointer px-4 py-4 text-xs hover:bg-indigo-700 hover:text-white focus:text-indigo-600 focus:outline-none"
                        >
                          <p>Delete</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
        
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import workerService from '@/service/workerService'
import userService from '@/service/userService'
import { useUserStore } from '@/store/user'
import { useOrderStore } from '@/store/order'
import router from '@/router'

const orderStore = useOrderStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const showDialog = ref(false)
const { orders, selectIndex, overAllRating } = storeToRefs(orderStore)

onMounted(async () => {
  const OuthResult = await userService.userCheckOuth()
  if (OuthResult === false) {
    alert('請重新登入')
    router.push('/')
  }
  await getHistortOrder()
})

const getHistortOrder = async () => {
  const data = await workerService.getHistoryOrder(userInfo.value.outh_token)
  orders.value = data
  console.log(orders.value)
}

const openDialog = (index: number) => {
  selectIndex.value = index
  showDialog.value = true 
}

const submitReview = async () => {
  const orderID = orders.value[selectIndex.value].order_id
  await workerService.reviewOrder(userInfo.value.outh_token, orderID, overAllRating.value, orders.value[selectIndex.value])
  await getHistortOrder()
  console.log(orders.value)
  showDialog.value = false
}
</script>

<style></style>
