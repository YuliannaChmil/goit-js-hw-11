import { per_page, page } from '../index';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '36565236-ceeca203cf624ecaf65a866e5';

async function getImage(value, page = 1) {
  const resp = await fetch(
    `${BASE_URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  if (!resp.ok) {
    throw new Error('RESP NOT OK!');
  }
  return await resp.json();
}

export { getImage, page };
