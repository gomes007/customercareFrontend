import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");   
    router.push("/login");
  }, []);

  return <p>Saindo...</p>;
};

export default Logout;
