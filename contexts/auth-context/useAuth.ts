import { useContext } from "react";
import AuthContext from "./AuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside of the AuthProvider");
  }

  return context;
}
