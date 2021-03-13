import fire from "../../config/fire-config";
import AppBar from "../../components/header";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import PostForm from "../../components/post_form";
import FirebaseStorage from "../../components/firebase_storage";

export async function getServerSideProps({ res, params }) {
  const documentData = await fire
    .firestore()
    .collection("posts")
    .doc(params.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        res.statusCode = 302;
        res.setHeader("Location", "/404");
        res.end();
      }
    });

  return {
    props: {
      data: documentData,
      id: params.id,
    },
  };
}

export default function Annonse({ data, id }) {
  //keep track of deleted images so they can be deleted from firebase storage
  const deletedImageRefs = useRef([]);

  const router = useRouter();

  const storageRefs = useRef([]);

  const fetchStorageRefs = async () => {
    storageRefs.current = await FirebaseStorage.getStorageRefs(
      data.imageRefs.map((image) => image.ref)
    );
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (!user || user.uid != data.userID) {
        router.push("/");
      }
    });

    fetchStorageRefs();
  });

  const onImageDeleted = (image) => {
    if (image.ref) {
      deletedImageRefs.current.push(image.ref);
    }
  };

  const handleDelete = async () => {
    const ref = fire.firestore().collection("posts").doc(id);
    await FirebaseStorage.deleteImages(storageRefs.current);
    await ref
      .delete()
      .then(router.push("/"))
      .catch((error) => console.log(error.code));
  };

  const handleUpdate = async (
    images,
    title,
    location,
    price,
    miniDescription,
    description
  ) => {
    //delete removed images
    const deletedImageStorageRefs = await FirebaseStorage.getStorageRefs(
      deletedImageRefs.current
    );
    await FirebaseStorage.deleteImages(deletedImageStorageRefs);

    const imageRefs = [];
    for (const image of images) {
      if (image.file) {
        // upload newly added images
        const imageRef = await FirebaseStorage.uploadImage(image.file);
        imageRefs.push(imageRef);
      } else {
        // old images are not uploaded again
        imageRefs.push(image);
      }
    }

    await fire
      .firestore()
      .collection("posts")
      .doc(id)
      .update({
        title: title,
        place: location,
        price: price,
        description: description,
        miniDescription: miniDescription,
        imageRefs: imageRefs,
      })
      .then(router.push(`/annonse/${id}`))
      .catch((error) => console.log(error.code));
  };

  return (
    <div>
      <AppBar />
      <PostForm
        initial_title={data.title}
        initial_location={data.location}
        initial_price={data.price}
        initial_miniDescription={data.miniDescription}
        initial_description={data.description}
        initial_images={data.imageRefs}
        handleSubmit={handleUpdate}
        submit_text="Oppdater annonse"
        onImageDeleted={onImageDeleted}
        delete_button={
          <Button
            style={{
              width: "200px",
              marginTop: "10px",
              color: "#FF1744",
              borderColor: "#FF1744",
            }}
            variant="outlined"
            onClick={handleDelete}
          >
            Slett annonse
          </Button>
        }
      />
    </div>
  );
}
