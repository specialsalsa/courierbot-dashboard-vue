import axios from "axios";

import { API_URL } from "./config.js";

export const usersConfig = {
    getUsers: async () => {
        return await axios
            .get(API_URL)
            .then(response => {
                return {
                    users: response.data,
                    status: response.status
                };
            })
            .catch(error => {
                console.log(error);
            });
    }
};
