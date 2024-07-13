import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage } from "@/utils/local-storage";

export const getUserInfo = () => {
      const authToken = getFromLocalStorage(authKey);
      if (authToken) {
            const decodedData = decodedToken(authToken);
            return decodedData;
      } else {
            return "";
      }
};

export const removeUserInfo = (key) => {
      return localStorage.removeItem(key);
};