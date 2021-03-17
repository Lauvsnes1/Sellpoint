import { useState, useEffect } from "react";
import fire from "../config/fire-config";
import AppBar from "../components/header";
import { useRouter } from "next/router";
import PostForm from "../components/post_form";
import FirebaseStorage from "../components/firebase_storage";

const CreatePost = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    //Sets a firebase listener on initial render
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        //Redirects to login if user is not logged in
        router.push("/users/login");
      }
    });
  }, []);

  const handleSubmit = async (
    images,
    title,
    location,
    price,
    miniDescription,
    description
  ) => {
    setLoading(true);

    const imageRefs = await FirebaseStorage.uploadImages(
      images.map((image) => image.file),
      "annonseBilder"
    );

    // Create post
    var document = await fire.firestore().collection("posts").add({
      title: title,
      place: location,
      price: price,
      miniDescription: miniDescription,
      description: description,
      userID: user.uid,
      imageRefs: imageRefs,
    });

    router.push("/annonse/" + document.id);
  };

  if (!user || loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <AppBar />
      <PostForm
        initialTitle=""
        initialLocation=""
        initialPrice={0}
        initialMiniDescription=""
        initialDescription=""
        initialImages={[]}
        handleSubmit={handleSubmit}
        submitText="Opprett annonse"
      />
    </div>
  );
};

export default CreatePost;
