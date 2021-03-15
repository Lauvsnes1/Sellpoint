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
  console.log(data);
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

    await fire.firestore().collection("posts").doc(id).update({
      title: title,
      place: location,
      price: price,
      description: description,
      miniDescription: miniDescription,
      imageRefs: imageRefs,
    });

    router.push(`/annonse/${id}`);
  };

  return (
    <div>
      <AppBar />
      <PostForm
        initialTitle={data.title}
        initialLocation={data.place}
        initialPrice={data.price}
        initialMiniDescription={data.miniDescription}
        initialDescription={data.description}
        initialImages={data.imageRefs}
        handleSubmit={handleUpdate}
        submitText="Oppdater annonse"
        onImageDeleted={onImageDeleted}
        deleteButton={
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
