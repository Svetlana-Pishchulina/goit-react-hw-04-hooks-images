import React, { useEffect, useState } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Button from "./components/Button";
import Modal from "./components/Modal";
import api from "./servises/api";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [request, setRequest] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!request) {
      return;
    }
    fatchPictures();
  }, [request]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [pictures]);

  const onChangeRequest = (query) => {
    setPictures([]);
    setRequest(query);
    setCurrentPage(1);
    setError(null);
  };

  const fatchPictures = () => {
    const option = { request, currentPage };
    setIsLoading(true);
    api
      .fatchPictures(option)
      .then(
        (picturesArr) => setPictures([...pictures, ...picturesArr]),
        setCurrentPage(currentPage + 1)
      )
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const onPictureClick = (url) => {
    setLargeImageURL(url);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const shouldRenderLoadMoreButton = pictures.length > 0 && !isLoading;
  return (
    <>
      <Searchbar onSubmit={onChangeRequest}></Searchbar>

      <ImageGallery>
        {pictures.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            srcWebformat={webformatURL}
            pictureId={id}
            onClick={() => onPictureClick(largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      {isLoading && (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}
      {shouldRenderLoadMoreButton && <Button onClick={fatchPictures} />}
    </>
  );
};

export default App;

// ___________________________
// class App extends React.Component {
//   state = {
//     pictures: [],
//     request: "",
//     currentPage: 1,
//     largeImageURL: "",
//     isModalOpen: false,
//     isLoading: false,
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.request !== this.state.request) {
//       this.fatchPictures();
//     }
//     window.scrollTo({
//       top: document.getElementById("root").scrollHeight,
//       behavior: "smooth",
//     });
//   }

//   onChangeRequest = (query) => {
//     this.setState({
//       pictures: [],
//       request: query,
//       currentPage: 1,
//       error: null,
//     });
//   };

//   fatchPictures = () => {
//     const { request, currentPage } = this.state;
//     const option = { request, currentPage };

//     this.setState({ isLoading: true });

//     api
//       .fatchPictures(option)
//       .then((picturesArr) =>
//         this.setState((prevState) => ({
//           pictures: [...prevState.pictures, ...picturesArr],
//           currentPage: prevState.currentPage + 1,
//         }))
//       )
//       .catch((error) => this.setState({ error: error }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   onPictureClick = (url) => {
//     this.setState({ largeImageURL: url });
//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
//   };

//   render() {
//     const { pictures, isLoading, largeImageURL, isModalOpen } = this.state;
//     const shouldRenderLoadMoreButton = pictures.length > 0 && !isLoading;
//     return (
//       <>
//         <Searchbar onSubmit={this.onChangeRequest}></Searchbar>

//         <ImageGallery>
//           {pictures.map(({ id, webformatURL, largeImageURL }) => (
//             // <li
//             //   key={id}
//             //   onClick={() => this.onPictureClick(largeImageURL)}
//             //   className={styles.ImageGalleryItem}
//             // >
//             <ImageGalleryItem
//               srcWebformat={webformatURL}
//               pictureId={id}
//               onClick={() => this.onPictureClick(largeImageURL)}
//             />
//             // </li>
//           ))}
//         </ImageGallery>
//         {isModalOpen && (
//           <Modal toggleModal={this.toggleModal}>
//             <img src={largeImageURL} alt="" />
//           </Modal>
//         )}
//         {isLoading && (
//           <Loader
//             type="ThreeDots"
//             color="#00BFFF"
//             height={100}
//             width={100}
//             timeout={3000} //3 secs
//           />
//         )}
//         {shouldRenderLoadMoreButton && <Button onClick={this.fatchPictures} />}
//       </>
//     );
//   }
// }

// export default App;
// _________________________________
// не работает
// const App = () => {
//   const [pictures, setPictures] = useState([]);
//   const [request, setRequest] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [largeImageURL, setLargeImageURL] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fatchPictures = () => {
//     const option = { request, currentPage };
//     setIsLoading(true);
//     api
//       .fatchPictures(option)
//       .then((picturesArr) => setPictures([...pictures, ...picturesArr]))
//       .catch((error) => setError(error))
//       .finally(() => setIsLoading(false));
//   };

//   useEffect(() => {
//     if (!request) {
//       return;
//     }
//     fatchPictures();
//   }, [request,currentPage]);

//   const onChangeRequest = (query) => {
//     setPictures([]);
//     setRequest(query);
//     setCurrentPage(1);
//     setError(null);
//   };

//   const onPictureClick = (url) => {
//     setLargeImageURL(url);
//     toggleModal();
//   };

//   const toggleModal = () => {
//     setIsModalOpen((prevState) => !prevState);
//   };

//   const shouldRenderLoadMoreButton = pictures.length > 0 && !isLoading;
//   return (
//     <>
//       <Searchbar onSubmit={onChangeRequest}></Searchbar>

//       <ImageGallery>
//         {pictures.map(({ id, webformatURL, largeImageURL }) => (
//           // <li
//           //   key={id}
//           //   onClick={() => this.onPictureClick(largeImageURL)}
//           //   className={styles.ImageGalleryItem}
//           // >
//           <ImageGalleryItem
//             key={id}
//             srcWebformat={webformatURL}
//             pictureId={id}
//             onClick={() => onPictureClick(largeImageURL)}
//           />
//           // </li>
//         ))}
//       </ImageGallery>
//       {isModalOpen && (
//         <Modal toggleModal={toggleModal}>
//           <img src={largeImageURL} alt="" />
//         </Modal>
//       )}
//       {isLoading && (
//         <Loader
//           type="ThreeDots"
//           color="#00BFFF"
//           height={100}
//           width={100}
//           timeout={3000} //3 secs
//         />
//       )}
//       {shouldRenderLoadMoreButton && (
//         <Button onClick={setCurrentPage((page) => page + 1)} />
//       )}
//     </>
//   );
// };

// export default App;
// // _______________________________
// function App() {
//   const [pictures, setPictures] = useState([]);
//   const [request, setRequest] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [largeImageURL, setLargeImageURL] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!request) {
//       return;
//     }
//     const fatchPictures = () => {
//       const option = { request, currentPage };

//       setIsLoading(true);

//       api
//         .fatchPictures(option)
//         .then((picturesArr) => {
//           setPictures((pictures) => [...pictures, ...picturesArr]);
//           // setCurrentPage((page) => page + 1);
//         })
//         .catch((error) => setError(error))
//         .finally(() => setIsLoading(false));
//     };
//     fatchPictures();
//     window.scrollTo({
//       top: document.getElementById("root").scrollHeight,
//       behavior: "smooth",
//     });
//   }, [request, currentPage]);

//   const onChangeRequest = (query) => {
//     setPictures([]);
//     setRequest(query);
//     setCurrentPage(1);
//     setError(null);
//   };

//   const onPictureClick = (url) => {
//     setLargeImageURL(url);
//     toggleModal();
//   };

//   const toggleModal = () => {
//     setIsModalOpen((prevState) => !prevState);
//   };

//   const shouldRenderLoadMoreButton = pictures.length > 0 && !isLoading;
//   return (
//     <>
//       <Searchbar onSubmit={onChangeRequest}></Searchbar>

//       <ImageGallery>
//         {pictures.map(({ id, webformatURL, largeImageURL }) => (
//           // <li
//           //   key={id}
//           //   onClick={() => this.onPictureClick(largeImageURL)}
//           //   className={styles.ImageGalleryItem}
//           // >
//           <ImageGalleryItem
//             srcWebformat={webformatURL}
//             pictureId={id}
//             onClick={() => onPictureClick(largeImageURL)}
//           />
//           // </li>
//         ))}
//       </ImageGallery>
//       {isModalOpen && (
//         <Modal toggleModal={toggleModal}>
//           <img src={largeImageURL} alt="" />
//         </Modal>
//       )}
//       {isLoading && (
//         <Loader
//           type="ThreeDots"
//           color="#00BFFF"
//           height={100}
//           width={100}
//           timeout={3000} //3 secs
//         />
//       )}
//       {shouldRenderLoadMoreButton && (
//         <Button onClick={setCurrentPage((page) => page + 1)} />
//       )}
//     </>
//   );
// }
// export default App;
