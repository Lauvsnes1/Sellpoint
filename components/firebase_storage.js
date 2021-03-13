import uniqid from "uniqid";
import fire from "../config/fire-config";

const FirebaseStorage = () => {};

FirebaseStorage.uploadImage = async (imageFile) => {
  const ref = uniqid();
  const url = await fire
    .storage()
    .ref("/images/" + ref)
    .put(imageFile)
    .then((res) => {
      return res.ref.getDownloadURL();
    });
  return {
    ref: ref,
    url: url,
  };
};

FirebaseStorage.uploadImages = async (imageFiles) => {
  const imageRefs = [];

  for (const file of imageFiles) {
    const ref = await FirebaseStorage.uploadImage(file);
    imageRefs.push(ref);
    /*
    const ref = uniqid();
    const url = await fire
      .storage()
      .ref("/images/" + ref)
      .put(file)
      .then((res) => {
        return res.ref.getDownloadURL();
      });
    imagesRef.push({
      ref: ref,
      url: url,
    });
    */
  }
  return imageRefs;
};

FirebaseStorage.getStorageRefs = async (imageRefs) => {
  const storageRefs = [];
  for (const ref of imageRefs) {
    const storageRef = await fire
      .storage()
      .ref()
      .child("/images/" + ref);

    storageRefs.push(storageRef);
  }

  return storageRefs;
};

FirebaseStorage.deleteImages = async (storageRefs) => {
  for (const storageRef of storageRefs) {
    await storageRef.delete().catch((err) => console.log(err.code));
  }
};

export default FirebaseStorage;
