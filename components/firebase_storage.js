import uniqid from "uniqid";
import fire from "../config/fire-config";

const FirebaseStorage = () => {};

FirebaseStorage.uploadImage = async (imageFile, directory) => {
  const ref = uniqid();
  const url = await fire
    .storage()
    .ref("/images/" + directory + "/" + ref)
    .put(imageFile)
    .then((res) => {
      return res.ref.getDownloadURL();
    });
  return {
    ref: directory + "/" + ref,
    url: url,
  };
};

FirebaseStorage.uploadImages = async (imageFiles, directory) => {
  const imageRefs = [];

  for (const file of imageFiles) {
    const ref = await FirebaseStorage.uploadImage(file, directory);
    imageRefs.push(ref);
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
