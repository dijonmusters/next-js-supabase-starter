import styles from "styles/components.module.css";
import supabase from "utils/supabase";

const Home = () => {
  return <h1 className={styles.title}>Welcome {supabase.auth.user().email}</h1>;
};

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Home;
