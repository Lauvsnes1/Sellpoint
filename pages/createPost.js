import { useState, useEffect } from "react";
import fire from "../config/fire-config";
import AppBar from "../components/header";
import { useRouter } from "next/router";
import ImageUpload from "../components/image_upload";
import PostForm from "../components/post_form";

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

    const imagesRef = await ImageUpload.firebaseUpload(
      images.map((image) => image.file)
    ).then((res) => {
      return res;
    });

    // Create post
    var document = await fire.firestore().collection("posts").add({
      title: title,
      place: location,
      price: price,
      miniDescription: miniDescription,
      description: description,
      userID: user.uid,
      imagesRef: imagesRef,
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
        initial_title=""
        initial_location=""
        initial_price={0}
        initial_miniDescription=""
        initial_description=""
        initial_images={[]}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreatePost;
