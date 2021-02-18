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

  const handleLogin = async (e) => {
    e.preventDefault();
    await fire.auth().setPersistence(fire.auth.Auth.Persistence.LOCAL);
    await fire
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
        .buttons {
            dislplay: flex;
        }
      `}</style>
      <h1>Logg inn</h1>
      <form onSubmit={handleLogin}>
        <div className="textfield">
          <TextField
            required
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            id="outlined-required"
            label="E-post"
            variant="outlined"
          />
        </div>
        <div className="textfield">
          <TextField
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="outlined-password-input"
            label="Passord"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            error={notify != ""}
            helperText={notify}
          />
        </div>
        <div className="buttons">
          <Button 
          style={{width: '100%'}}
          color="secondary" 
          variant="contained" 
          type="submit">
            Logg inn
          </Button>
          <Link href="/users/register">
            <a>
              <Button 
              style={{width: '100%', marginTop: '10px'}}
              color="secondary" 
              variant="outlined">
                Registrer deg
              </Button>
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
