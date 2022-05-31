import Star from "../../Assets/Icons/Star";
import styles from "./ListItem.module.css";

/*
 * Componente que muestra las causas de muertes con un boton para agregarla a favoritos
 */
const ListItem = (props) => {
  return (
    <div
      className={`${styles.listItem} ${
        props.isSelected ? styles.selected : ""
      }`}
      title={props.cause.name}
      onClick={() => {
        props.selectedCauseChange(props.cause);
      }}
    >
      <div className={styles.itemText}>{props.cause.name}</div>
      <Star
        class={`${props.cause.isFavorite ? styles.starFavorite : styles.star}`}
        width={24}
        height={24}
        clicked={() => {
          props.favCauseHandler(props.cause);
        }}
      />
    </div>
  );
};

export default ListItem;
