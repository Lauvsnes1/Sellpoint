import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fire from "../config/fire-config";

const MyFavorites = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fire.auth.onAuthStateChanged((user) => {
      if (!user) router.push("/");
      else setUser(user);
    });
  });
};

export default MyFavorites;
