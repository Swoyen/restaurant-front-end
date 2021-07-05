import axios from "axios";

const headers = {
  "Ocp-Apim-Subscription-Key": "7b1788f9dd9945aa83699487bea4d6f4",
};

const BASE_URL = "https://restauapi.azurewebsites.net/api/";

export const ENDPOINTS = {
  CUSTOMER: "Customer",
  FOODITEM: "FoodItem",
  ORDER: "Order",
};

export const createAPIEndPoint = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  return {
    fetchAll: () => axios.get(url, { headers: headers }),
    fetchById: (id) => axios.get(url + id, { headers: headers }),
    create: (newRecord) => axios.post(url, newRecord, { headers: headers }),
    update: (id, updatedRecord) =>
      axios.put(url + id, updatedRecord, { headers: headers }),
    delete: (id) => axios.delete(url + id, { headers: headers }),
  };
};
