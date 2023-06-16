const API_KEY =
  'live_6135fs6ZgQlUqaLad19Cd7c0sRCWYLbiXeEK6j8tNwTVPvXvV6gTV6bTxqcT0AkV';

export const fetchBreeds = function () {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export const fetchCatByBreed = function (breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
