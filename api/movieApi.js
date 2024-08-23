import axios from "axios";
const API_KEY="d2902a3a68fe8793eacbaa649ba03be4";
const movieApi=axios.create(
    {
        baseURL:"https://api.themoviedb.org/3",
        params:{
            api_key: API_KEY,
        },
    }
)

export default movieApi;