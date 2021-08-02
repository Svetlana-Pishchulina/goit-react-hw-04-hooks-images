import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY = "21205558-461e6a7a88c8071e477290c49";

const fatchPictures = ({ request = "", currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `/?key=${API_KEY}&q=${request}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
    )
    .then((response) => response.data.hits);
};

export default { fatchPictures };
