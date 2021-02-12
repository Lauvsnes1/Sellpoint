import { useState } from "react";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Register = () => {
  const router = useRouter();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const [notification, setNotification] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification("Password and password confirmation does not   match");
      setTimeout(() => {
        setNotification("");
      }, 2000);
      setPassword("");
      setPassConf("");
      return null;
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message);
      });
    router.push("/");
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
      `}</style>
      <h1>Create new user</h1>
      {notification}
      <form onSubmit={handleLogin}>
        <div className="textfield">
          <TextField
            value={userName}
            onChange={({ target }) => setUsername(target.value)}
            id="outlined-required"
            label="Email"
            variant="outlined"
          />
        </div>
        <div className="textfield">
          <TextField
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </div>
        <div className="textfield">
          <TextField
            value={passConf}
            onChange={({ target }) => setPassConf(target.value)}
            id="outlined-password-confirmation-input"
            label="Password confirmation"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </div>
        <div className="button">
          <Button variant="outlined" color="primary" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Register;
