import axios from "axios";

const headers = {
  "Ocp-Apim-Subscription-Key": "1930c3ce89ec4636b5916f96e2141167",
};

const BASE_URL = "https://restaurantapi.azure-api.net/api/";

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
