import { useEffect, useState } from "react";
import ListItem from "../ListItem/ListItem";
import styles from "./SearchList.module.css";

/*
 * Componente encargado de mostrar la lista de causas.
 */
const SearchList = (props) => {
  /*
   * State
   */

  // Almacena la lista para mostrar
  const [filteredList, setFilteredList] = useState(props.causeList);

  /*
   * Use Effect
   */

  // Crea la nueva lista filtrada cuando cambia la lista original o el filtro de la búsqueda
  useEffect(() => {
    const newList = props.causeList.filter((cause) => {
      return (
        cause.name.toLowerCase().search(props.causeFilter.toLowerCase()) !== -1
      );
    });

    setFilteredList(newList);
  }, [props.causeList, props.causeFilter]);

  return (
    <div className={styles.searchList}>
      {filteredList.map((cause, index) => {
        return (
          <ListItem
            key={cause.name}
            cause={cause}
            selectedCauseChange={props.selectedCauseChange}
            isSelected={cause.name === props.selectedCause.name}
            favCauseHandler={props.favCauseHandler}
          />
        );
      })}
    </div>
  );
};

export default SearchList;
