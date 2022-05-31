import styles from "./SearchBox.module.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchList from "../../Components/SearchList/SearchList";
import { useState } from "react";

/*
 * Contenedor que se encarga de mostrar la lista de causas, seleccionar causa que se quiere visualizar y manejar los favoritos
 */
const SearchBox = (props) => {
  /*
   * State
   */

  // String para filtrar las causas
  const [causeFilter, setCauseFilter] = useState("");

  // Nombre del tab activo (Causas o Fav) para ver que lista mostrar
  const [activeTab, setActiveTab] = useState("Causas");

  // Variable que almacena las causas a mostrar en base a activeTab
  let selectedList = [];

  if (activeTab === "Causas") {
    selectedList = props.causeList;
  } else {
    const filteredList = props.causeList.filter((cause) => {
      return cause.isFavorite;
    });
    selectedList = filteredList;
  }

  /*
   * Handlers
   */

  // Función que cambia el filtro cuando se escribe algo en SearchBar
  const causeFilterChangeHandler = (event) => {
    setCauseFilter(event.target.value);
  };

  // Función para cambiar al tab Causas
  const toggleCausas = () => {
    setActiveTab("Causas");
  };

  // Función para cambiar al tab Favoritos
  const toggleFav = () => {
    setActiveTab("Fav");
  };

  return (
    <div className={styles.searchBox}>
      <div className={styles.navButtons}>
        <button
          className={`${styles.button} ${
            activeTab === "Causas" ? styles.active : ""
          }`}
          onClick={toggleCausas}
        >
          Causas
        </button>
        <button
          className={`${styles.button} ${
            activeTab === "Fav" ? styles.active : ""
          }`}
          onClick={toggleFav}
        >
          Favoritos
        </button>
      </div>
      <SearchBar filterChange={causeFilterChangeHandler} />
      <SearchList
        selectedCause={props.selectedCause}
        causeList={selectedList}
        causeFilter={causeFilter}
        selectedCauseChange={props.selectedCauseChange}
        favCauseHandler={props.favCauseHandler}
      />
    </div>
  );
};

export default SearchBox;
