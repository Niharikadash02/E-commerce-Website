import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth(); // Removed setAuth since it's not being used in this component

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setOk(false); // Set ok to false in case of an error
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  // Render the Spinner component only if the request is still pending
  if (auth === null) {
    return <Spinner />;
  }

  // Render the Outlet component if authentication was successful
  return ok ? <Outlet /> : <Spinner />;
}
