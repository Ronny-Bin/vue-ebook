import {get} from "./requests"
import { setLocalForage } from '@/utils/localForage'
import axios from 'axios'

export function getHomeData() {
  console.log(process.env.VUE_APP_BOOK_URL)
  const url = `${process.env.VUE_APP_BOOK_URL}/book/home2`
  return get(url)
}
export function getShelfData() {
  const url = `${process.env.VUE_APP_BOOK_URL}/book/shelf`
  return get(url)
}
export function getListData() {
  const url = `${process.env.VUE_APP_BOOK_URL}/book/list`
  return get(url)
}
export function getFlatListData() {
  const url = `${process.env.VUE_APP_BOOK_URL}/book/flat-list`
  return get(url)
}
export function detail(fileName) {
  const url = `${process.env.VUE_APP_BOOK_URL}/book/detail`
  return get(url,{fileName})
}

export function download(item, onSuccess, onFailed, onError, onProgress) {
  axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get(`${item.categoryText}/${item.fileName}.epub`)
      .then(res => {
        const blob = new Blob([res.data])
        setLocalForage(item.fileName, blob, () => {

          if (onSuccess) onSuccess(item)

        }, err => {

          if (onFailed) onFailed(err)

        })
      })
      .catch(err => {
        if (onError) onError(err)
      })
}