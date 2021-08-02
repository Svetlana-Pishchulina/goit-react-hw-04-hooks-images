import React, { useState } from "react";
import styles from "./Searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
  const [searchWord, setSearchWord] = useState("");

  const inputChangeHandler = (evt) => {
    setSearchWord(evt.target.value);
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    onSubmit(searchWord);
    reset();
  };

  const reset = () => {
    setSearchWord("");
  };

  return (
    <>
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={formSubmitHandler}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={inputChangeHandler}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchWord}
          />
        </form>
      </header>
    </>
  );
};

export default Searchbar;

// class Searchbar extends React.Component {
//   state = {
//     searchWord: "",
//   };

//   inputChangeHandler = (evt) => {
//     this.setState({ searchWord: evt.target.value });
//   };

//   formSubmitHandler = (evt) => {
//     evt.preventDefault();
//     this.props.onSubmit(this.state.searchWord);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ searchWord: "" });
//   };

//   render() {
//     return (
//       <>
//         <header className={styles.Searchbar}>
//           <form className={styles.SearchForm} onSubmit={this.formSubmitHandler}>
//             <button type="submit" className={styles.SearchFormButton}>
//               <span className={styles.SearchFormButtonLabel}>Search</span>
//             </button>

//             <input
//               onChange={this.inputChangeHandler}
//               className={styles.SearchFormInput}
//               type="text"
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//               value={this.state.searchWord}
//             />
//           </form>
//         </header>
//       </>
//     );
//   }
// }

// export default Searchbar;
// ______________________________
