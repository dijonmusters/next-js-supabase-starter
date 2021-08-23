import "styles/globals.css";
import styles from "styles/components.module.css";

const MyApp = ({ Component, pageProps }) => (
  <div className={styles.container}>
    <Component {...pageProps} />
  </div>
);

export default MyApp;
