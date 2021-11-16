

function fetchImages(pictureName, page) {
    return fetch(`https://pixabay.com/api/?q=${pictureName}&page=${page}&key=23171615-fcdc729843fe7af43a640cf8d&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response =>
            response.json())
        .then(data => {
            return data.hits
        })
}
export default fetchImages


