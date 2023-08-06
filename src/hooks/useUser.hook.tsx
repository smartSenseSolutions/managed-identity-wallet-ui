import { useContext } from "react";
import { UserContext } from "../contexts/userInfo";

function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser used outside UserContext");
  }

  return context;
}

export default useUser;
