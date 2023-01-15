import axios from "axios";
import configs from "src/utils/configs";

const instance = axios.create(configs.axios);

export default instance;
