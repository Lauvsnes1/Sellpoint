import { useState } from "react";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotification] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => router.push("/"))
      .catch((err) => {
        console.log(err.code, err.message);
        setNotification(err.message);
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          margin: auto;
        }
        form {
          max-width: 200px;
          margin: auto;
        }
        .textfield {
          margin: 20px 0;
        }
        h1 {
          text-align: center;
        }
        .button {
          margin: auto;
        }
        a {
            text-decoration: none;
        }
      `}</style>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="textfield">
          <TextField
            required
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            id="outlined-required"
            label="Email"
            variant="outlined"
          />
        </div>
        <div className="textfield">
          <TextField
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            error={notify != ""}
            helperText={notify}
          />
        </div>
        <Button color="secondary" variant="contained" type="submit">
          Log in
        </Button>
        <Link href="register">
          <a>
            <Button color="secondary" variant="outlined">
              Register
            </Button>
          </a>
        </Link>
      </form>
    </div>
  );
};
export default Login;
