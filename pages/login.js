import supabase from "utils/supabase";
import { useState } from "react";
import styles from "styles/components.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { session, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      await axios.post("/api/auth", {
        event: "SIGNED_IN",
        session,
      });
      router.push("/");
    }
  };

  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.toggle}>
        Don't have an account? <Link href="/register">Register</Link>
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
        />
        <input
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
        />
        <button className={styles.submit} disabled={!email || !password}>
          Go!
        </button>
        {errorMessage !== "" && <p>{errorMessage}</p>}
      </form>
    </>
  );
};

export default Login;
