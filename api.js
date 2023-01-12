import axios from "axios";

export const getDataFromServer = async () => {
  const response_data = await axios.get("http://172.30.1.39:4000/test");
  return response_data.data;
};



