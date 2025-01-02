import axios from "axios";
const API_KEY="SECRETKEY";
const movieApi=axios.create(
    {
        baseURL:"https://api.themoviedb.org/3",
        params:{
            api_key: API_KEY,
        },
    }
)

export default movieApi;
