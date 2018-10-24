import apis from '@/utils/apis'
import { compressFile } from '@/utils/img';
import { getLocalStorage } from '@/utils/local'; // 获取sessionId
import axios from 'axios';

export function uploadImage(file) {
  const formData = new FormData;
  formData.append('token', getLocalStorage('token'));
  formData.append('file', file)
  return axios.post('/upload/image', formData, {
    timeour: 30*1000
  })
}