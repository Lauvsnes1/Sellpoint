import { useState } from "react";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const [notification, setNotification] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [emailInUse, setEmailInUse] = useState("");

  const handleLogin = async (e) => {
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
    await fire.auth().setPersistence(fire.auth.Auth.Persistence.LOCAL);
    await fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const ref = fire.firestore().collection("users").doc(user.uid);
        const permissions = { user: true };
        const numberOfRatings = 0;
        const totalRating = 0;
        ref.set({
          email,
          firstName,
          lastName,
          permissions,
          numberOfRatings,
          totalRating,
        });
      })
      .then(() => router.push("/"))
      .catch((err) => {
        if (err.code == "auth/email-already-in-use") {
          setEmailInUse("Email already in use");
          setTimeout(() => {
            setEmailInUse("");
          }, 2000);
        }
        if (err.code == "auth/invalid-email") {
          setInvalidEmail("Invalid email");
          setTimeout(() => {
            setInvalidEmail("");
          }, 2000);
        }
        console.log(err);
      });
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
        .buttons {
          dislplay: flex;
        }
        a {
          text-decoration: none;
        }
      `}</style>
      <h1>Opprett ny bruker</h1>
      <form onSubmit={handleLogin}>
        <div className="textfield">
          <TextField
            required
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            id="outlined-required"
            label="E-post"
            variant="outlined"
            error={invalidEmail != "" || emailInUse != ""}
            helperText={invalidEmail + emailInUse}
          />
        </div>
        <div className="textfield">
          <TextField
            required
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
            id="outlined-required"
            label="Fornavn"
            variant="outlined"
          />
        </div>
        <div className="textfield">
          <TextField
            required
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
            id="outlined-required"
            label="Etternavn"
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
            error={notification != ""}
          />
        </div>
        <div className="textfield">
          <TextField
            required
            value={passConf}
            onChange={({ target }) => setPassConf(target.value)}
            id="outlined-password-confirmation-input"
            label="Bekreft passord"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            error={notification != ""}
            helperText={notification}
          />
        </div>
        <div className="buttons">
          <Button
            style={{ width: "100%" }}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Registrer deg
          </Button>
          <Link href="/users/login">
            <a>
              <Button
                style={{ width: "100%", marginTop: "10px" }}
                color="secondary"
                variant="outlined"
              >
                Logg inn
              </Button>
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Register;
