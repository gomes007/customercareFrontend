import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from "@/components/menu/Menu";

import '../styles/Customer.style.css';
import '../styles/DependentForm.style.css';
import '../styles/Employee.style.css';
import '../styles/Form.style.css';
import '../styles/Login.style.css';
import '../styles/Menu.style.css';
import '../styles/NavBar.style.css';
import '../styles/NavTitle.style.css';
import '../styles/Pagination.style.css';
import '../styles/PositionSalary.style.css';
import '../styles/RoleList.style.css';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  const noMenuRoutes = ["/login", "/logout"];


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !noMenuRoutes.includes(router.pathname)) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!noMenuRoutes.includes(router.pathname) ? (
        <Menu>
          <Component {...pageProps} />
          <ToastContainer />
        </Menu>
      ) : (
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )}
    </>
  );
}
