import { useEffect, useState } from "react";
import SearchBox from "../../Container/SearchBox/SearchBox";
import DataBox from "../../Container/DataBox/DataBox";
import httpClient from "../../lib/httpClient";

import styles from "./Home.module.css";

/*
 * Contenedor base de la aplicación. Se encarga de manejar los datos y distribuirlos a los dos contenedores hijos (SearchBox y DataBox).
 */
const Home = () => {
  /*
   * State
   */

  // Causa seleccionada para ser visualizada
  const [selectedCause, setSelectedCause] = useState({});

  // Lista con el nombre de las causas
  const [causeList, setCauseList] = useState([]);

  // const [selectedCauseData, setSelectedCauseData] = useState([]);

  /*
   * useEffect
   */

  // Pedimos la lista de causas al back cuando se renderiza Home
  useEffect(() => {
    getCauseList();
  }, []);

  /*
   * Conexiones al servidor
   */

  /*
   * Función que pide la lista de los nombres de causas de muertes al servidor para ser utilizada en SearchList
   * Selecciona la primera causa para mostrar su información
   */
  const getCauseList = async () => {
    try {
      // Pedimos la lista de causas a la ruta /causas
      const causeData = await httpClient.get("/causas");

      // Cargamos la lista de favoritos guardada localmente
      let savedFavorites =
        JSON.parse(localStorage.getItem("favoriteCauses")) || [];

      // Como la base de datos no almacena favoritos, le agragamos la propiedad a todas las causas
      let causes = causeData.map((cause) => {
        const isFav = savedFavorites.findIndex((fav) => {
          return fav === cause.name;
        });
        return { id: cause.id, name: cause.name, isFavorite: isFav !== -1 };
      });

      // Ordenamos la lista de causas por nombre
      causes.sort((c1, c2) => {
        if (c1.name < c2.name) return -1;
        if (c1.name > c2.name) return 1;
        return 0;
      });

      // Guardamos la lista ya procesada
      setCauseList(() => {
        return causes;
      });

      // Seleccionamos la primera causa para que se muestre información en DataBox
      setSelectedCause(causes[0]);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Handlers
   */

  /*
   * Función que se llama cuando se selecciona una nueva causa
   */
  const selectedCauseChangeHandler = (newCause) => {
    setSelectedCause(newCause);
  };

  /*
   * Función que se llama cuando se hace click al ícono de favorito
   * Si era la causa seleccionada, cambia el valor de isFavorite ahi también
   */
  const favoriteCauseHandler = (favCause) => {
    // Seteamos la lista nuevamente pero negamos el valor de favorito para la causa seleccionada (favCause)
    setCauseList((prevList) => {
      const newList = prevList.map((cause) => {
        if (cause.name === favCause.name) {
          return {
            id: cause.id,
            name: cause.name,
            isFavorite: !cause.isFavorite,
          };
        }
        return cause;
      });

      // Actualizamos la lista de favoritos guardada localmente
      localStorage.setItem(
        "favoriteCauses",
        JSON.stringify(
          newList
            .filter((cause) => cause.isFavorite === true)
            .map((cause) => cause.name)
        )
      );
      return newList;
    });

    // Actualizamos la causa seleccionada en caso que sea la que se modificó
    if (favCause.name === selectedCause.name) {
      setSelectedCause((prevSelected) => {
        const newSelected = {
          name: prevSelected.name,
          isFavorite: !prevSelected.isFavorite,
        };
        return newSelected;
      });
    }
  };

  return (
    <>
      <h1 className={styles.homeTitle}>
        Causas de Muertes en Estados Unidos (2014-2019)
      </h1>
      <div className={styles.homeContent}>
        <SearchBox
          selectedCauseChange={selectedCauseChangeHandler}
          causeList={causeList}
          favCauseHandler={favoriteCauseHandler}
          selectedCause={selectedCause}
        />
        <DataBox cause={selectedCause} />
      </div>
    </>
  );
};

export default Home;
