import { useEffect, useState } from "react";
import Star from "../../Assets/Icons/Star";
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  Hint,
} from "react-vis";
import httpClient from "../../lib/httpClient";

import "react-vis/dist/style.css";
import styles from "./DataBox.module.css";
import DataTable from "../../Components/DataTable/DataTable";

const DataBox = (props) => {
  // Variable helper para datos del gráfco
  const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Estado que almacena el año para filtrar los datos
  const [yearFilter, setYearFilter] = useState();

  // Estado que almacena los datos completos de la causa seleccionada
  const [causeData, setCauseData] = useState([]);

  // Estado que almacena los datos filtrados por yearFilter para ser mostrados en el gráfico
  const [filteredCauseData, setFilteredCauseData] = useState([]);

  // Estado que almacena lista de los años con los que se cuenta datos
  const [yearsList, setYearsList] = useState([]);

  // Función que pide datos al servidor cuando cambia la causa seleccionada
  useEffect(() => {
    getSelectedCauseData();
  }, [props.cause.name]);

  // Función que actualiza los datos filtrados cuando se piden datos nuevos o cambia el año de filtro
  useEffect(() => {
    filterCauseData();
  }, [causeData, yearFilter]);

  // Función que pide los datos de la causa seleccionada
  const getSelectedCauseData = async () => {
    // Si hay una causa valida seleccionada traemos la informacion
    if (props.cause.hasOwnProperty("id")) {
      try {
        // Pedimos la lista de causas a la ruta /causas/:id
        const data = await httpClient.get(`/causas/${props.cause.id}`);
        // Ordenamos los datos por fecha si se
        data.sort((data1, data2) => {
          if (Date.parse(data1.date) < Date.parse(data2.date)) return -1;
          if (Date.parse(data1.date) > Date.parse(data2.date)) return 1;
          return 0;
        });

        // Actualizamos los datos
        setCauseData(data);

        // Actualizamos la lista de años ya que pueden ser diferentes
        const years = [];
        for (let index = 0; index < data.length; index++) {
          if (
            years.findIndex((year) => year === parseInt(data[index].date)) ===
            -1
          ) {
            years.push(parseInt(data[index].date));
          }
        }
        setYearsList(years);
        setYearFilter(years[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  /*
   * Helper functions
   */

  // Función que filtra los datos en base al año seleccionado y los pone en el formato correcto para el gráfico
  const filterCauseData = () => {
    let filteredData = causeData
      .filter((cause) => {
        return parseInt(cause.date) === parseInt(yearFilter);
      })
      .map((cause) => {
        return {
          x: new Date(cause.date).getUTCMonth() + 1,
          y: cause.count,
        };
      });
    setFilteredCauseData(filteredData);
  };

  /*
   * Handlers
   */

  // Actualiza el año para filtrar los datos
  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value);
  };

  return (
    <div className={styles.dataBox}>
      <div className={styles.dataTitle}>
        {props.cause.name}{" "}
        {props.cause.isFavorite && (
          <Star height={30} width={30} class={styles.star} />
        )}
      </div>
      <select
        value={yearFilter}
        onChange={handleYearFilterChange}
        className={styles.yearSelect}
      >
        {yearsList.map((year) => {
          return (
            <option value={year} key={year}>
              {year}
            </option>
          );
        })}
      </select>
      <FlexibleWidthXYPlot
        height={400}
        margin={{ left: 70, right: 30 }}
        animation={true}
        style={{
          borderRadius: "10px",
          border: "2px solid #0000ff",
          boxShadow: "4px 4px 10px #000000bb",
        }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          type={"ordinal"}
          tickTotal={12}
          style={{
            ticks: {
              fontSize: "14px",
              color: "#000000",
            },
          }}
          tickFormat={(tick) => {
            return MESES[tick - 1].slice(0, 3);
          }}
        />
        <YAxis
          style={{
            ticks: {
              fontSize: "14px",
              color: "#000000",
            },
          }}
        />
        <LineMarkSeries
          data={filteredCauseData}
          curve={"curveMonotoneX"}
          strokeWidth={3}
          stroke={"#0000ff"}
          fill={"#c5ddfe"}
        />
      </FlexibleWidthXYPlot>
      <DataTable causeData={filteredCauseData} MESES={MESES}/>
    </div>
  );
};

export default DataBox;
