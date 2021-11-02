function fetchImages(pictureName, baseApi, myKey, page) {
    return fetch(`${baseApi}?q=${pictureName}&page=${page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response =>
            response.json())
        .then(data => {
            return data.hits
        })
}
export default fetchImages