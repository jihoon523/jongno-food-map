// 식당 데이터 접근 계층.
// 지금은 로컬 JSON을 읽지만, 나중에 API/DB로 바꿀 때 이 파일만 고치면 된다.
// 화면 쪽 코드는 getRestaurants() 만 호출하고 데이터 출처를 몰라야 한다.

import data from '../data/restaurants.json'

export const CATEGORIES = [
  { id: 'korean', label: '한식' },
  { id: 'japanese', label: '일식' },
  { id: 'chinese', label: '중식' },
  { id: 'western', label: '양식' },
  { id: 'meat', label: '고기' },
  { id: 'noodle', label: '면·국밥' },
  { id: 'asian', label: '아시안' },
  { id: 'cafe', label: '카페' },
]

// 마커 색상 (카테고리별)
export const CATEGORY_COLOR = {
  korean: '#d94f3d',
  japanese: '#3b6fd6',
  chinese: '#d98a1c',
  western: '#7a4fd6',
  meat: '#a0522d',
  noodle: '#2f9e6b',
  asian: '#0e9aa7',
  cafe: '#6b6b6b',
}

/**
 * @typedef {Object} Restaurant
 * @property {string} id
 * @property {string} name
 * @property {string} category   CATEGORIES 의 id 중 하나
 * @property {string} price      가격대 (예: "1만원대")
 * @property {string} floor      층 (예: "B1", "1F", "2F")
 * @property {string} building   건물 이름 (같은 건물 식당 묶기용, 없으면 빈 문자열)
 * @property {string} menu       추천 메뉴
 * @property {number} rating     0~5
 * @property {string} review     한줄평
 * @property {[number, number]} coords  [경도, 위도]
 */

/** @returns {Promise<Restaurant[]>} */
export async function getRestaurants() {
  return data
}
