import { useContext } from "react";
import { RegistrationContext } from "../contexts/Registration";

function useSelectedEntity() {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error("useSelectedEntity used outside RegistraionContext");
  }

  return context.state.selectedEntity;
}

export default useSelectedEntity;
