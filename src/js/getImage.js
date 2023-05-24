import axios from 'axios';
import { per_page, page } from '../index';

export default async function getImage(value, page) {
  const URL = 'https://pixabay.com/api/';
  const KEY = '36565236-ceeca203cf624ecaf65a866e5';
  const filter = `?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
  return await axios.get(`${URL}${filter}`).then(response => response.data);
}

export { getImage, page };