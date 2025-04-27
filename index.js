const accessKey = "y-YDKlq4eY5Ku-B7K2-vUzrBeFeX00rWltyO9xF2pnA";

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const gallery = document.getElementById('image-gallery');

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    fetchImages(query);
  }
});

async function fetchImages(query) {
  gallery.innerHTML = "<p>Loading images...</p>";

  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${accessKey}`);
    const data = await response.json();

    if (data.results.length > 0) {
      gallery.innerHTML = data.results.map(photo => `
        <img src="${photo.urls.regular}" alt="${photo.alt_description}">
      `).join('');
    } else {
      gallery.innerHTML = "<p>No images found. Try another bird name!</p>";
    }
  } catch (error) {
    gallery.innerHTML = "<p>Error fetching images. Please try again later.</p>";
    console.error(error);
  }
}
