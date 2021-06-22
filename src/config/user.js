import axios from "axios";

import { API_URL } from "./config.js";

export const usersConfig = {
    getUsers: async () => {
        return await axios
            .get(`${API_URL}/users`)
            .then(response => {
                return {
                    users: response.data,
                    status: response.status
                };
            })
            .catch(error => {
                console.log(error);
            });
    },
    addUser: async (username, kicked, id_user_type) => {
        console.log(username, kicked, id_user_type);
        return await axios
            .post(`${API_URL}/users`, {
                username: username,
                kicked: kicked,
                id_user_type: id_user_type
            })
            .then(response => {
                console.log(response);
                return {
                    status: response.status
                };
            })
            .catch(error => {
                console.log(error);
            });
    }
};
