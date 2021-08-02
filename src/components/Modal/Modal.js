import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import React, { useEffect } from "react";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ toggleModal, children }) => {
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div onClick={handleBackdropClick} className={styles.Overlay}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
// ______________
// class Modal extends React.Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.hendleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.hendleKeyDown);
//   }

//   hendleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.toggleModal();
//     }
//   };

//   hendleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       this.props.toggleModal();
//     }
//   };

//   render() {
//     return createPortal(
//       <div onClick={this.hendleBackdropClick} className={styles.Overlay}>
//         <div className={styles.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// export default Modal;
// _____________________________
