import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '',
});

export const fetchImagesForQuery = async (query: string): Promise<string[]> => {
  if (!import.meta.env.VITE_UNSPLASH_ACCESS_KEY) {
    return [];
  }

  try {
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 5,
      orientation: 'landscape',
    });

    if (result.response && result.response.results.length > 0) {
      return result.response.results.map(r => r.urls.regular);
    }
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
  }
  return [];
};
