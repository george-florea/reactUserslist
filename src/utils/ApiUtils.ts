import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApiUtils = () => {
  const call = async (method: string, path: string, payload?: any) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method: method,
      headers: headers,
    };

    try {
      const response = await axios({
        url: path,
        ...options,
      });

      return response.data;
    } catch (error) {
      //   if (error.response) {
      //     console.error(`${error.response.status}: ${error.response.statusText}`);
      //     switch (error.response.status) {
      //       case 401:
      //       case 403:
      //         userSession.clearAuthSession();
      //         navigate("/");
      //         break;
      //       // Add more cases as needed
      //       case 422:
      //         throw {
      //           status: error.response.status,
      //           message: error.response.data || "An error occurred",
      //         };
      //       default:
      //         navigate("/error", {
      //           state: {
      //             status: error.response.status,
      //             message: error.response.data.message || "An error occurred",
      //           },
      //         });
      //         break;
      //     }
      //   } else {
      //     console.error("Error: ", error.message);
      //     navigate("/error", {
      //       state: {
      //         status: "Unknown",
      //         message: error.message || "An error occurred",
      //       },
      //     });
      //   }
      throw error;
    }
  };

  return {
    get: async (path: string) => {
      return await call("GET", path);
    },
    post: async (path: string, payload: any) => {
      return await call("POST", path, payload);
    },
    put: async (path: string, payload: any) => {
      return await call("PUT", path, payload);
    },
    delete: async (path: string, payload: any) => {
      return await call("DELETE", path, payload);
    },
  };
};

export default ApiUtils;
