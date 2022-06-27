const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '4cfb881a943ba5c6b1eec70ac8f3298d',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;