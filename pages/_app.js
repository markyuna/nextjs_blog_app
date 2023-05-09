import "../styles/globals.css";
import Format from '../layout/format';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />,
         <Format></Format>
}

export default MyApp
