import axios from "axios";

const baseURL = "http://localhost:8080";

export const getPreviewJobs = async (queryData) => {
  const data = await axios.post(baseURL, queryData).then((res) => {
    return res.data;
  });

  return data;
};
