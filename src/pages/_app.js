import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from "@/components/menu/Menu";

import '../styles/Menu.style.css';
import '../styles/NavBar.style.css';
import '../styles/NavTitle.style.css';
import '../styles/Pagination.style.css';
import '../styles/PositionSalary.style.css';
import '../styles/RoleList.style.css';


export default function App({ Component, pageProps }) {


  return (
    <Menu>
      <Component {...pageProps} />
      <ToastContainer />
    </Menu>
  );
}
