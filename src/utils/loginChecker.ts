/* import axios from "axios";
import { NavigateFunction } from "react-router-dom";

const isUserLoggedIn = async (navigate: NavigateFunction) => {
  try {
    const user = localStorage.getItem("user_login");
    if (user) {
      const token = JSON.parse(user).token;
      if (!token) {
        navigate("/");
        return;
      }

      await axios.get("http://127.0.0.1:8000/api/v1/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      navigate("/");
    }
  } catch (error) {
    navigate("/");
  }
};

export default isUserLoggedIn;
 */
