import styles from "./ImageGalleryItem.module.css";
const ImageGalleryItem = ({ pictureId, srcWebformat, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem} onClick={onClick}>
      <img src={srcWebformat} alt="" className={styles.ImageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;
