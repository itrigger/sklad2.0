import React from "react";
import { AUTH_TOKEN } from "../constants";
import { navigate } from "gatsby";

const Logout = () => {
  if(typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem("siteUser");
    localStorage.removeItem("woo-session");
    navigate(`/login`)
  }

  return (
    <div>

    </div>
  );
};

export default Logout;