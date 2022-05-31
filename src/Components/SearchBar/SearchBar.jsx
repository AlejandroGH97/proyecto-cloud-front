import styles from "./SearchBar.module.css";
/*
 * Barra de búsqueda con función que se ejecuta cuando cambia el texto
 */
const SearchBar = (props) => {
  return (
    <>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Buscar"
        onChange={props.filterChange}
      />
    </>
  );
};

export default SearchBar;
