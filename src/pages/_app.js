import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Menu from "@/components/menu/Menu";

import '../styles/Menu.style.css';
import '../styles/NavBar.style.css';

export default function App({ Component, pageProps }) {


  return (
    <Menu>
      <Component {...pageProps} />
    </Menu>
  );
}
