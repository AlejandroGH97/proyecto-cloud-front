import styles from "./DataTable.module.css";

/*
* Componente que muestra los datos de la causa en una tabla
*/
const DataTable = (props) => {
	return ( 
		<div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <tbody>
            <tr className={styles.tableRow}>
              <th key={"mes-title"}>Meses</th>
              {props.causeData.map((data, index) => {
                return (
                  <th key={"mes-" + index} className={styles.tableCell}>
                    {props.MESES[data.x - 1].slice(0, 3)}
                  </th>
                );
              })}
            </tr>
            <tr className={styles.tableRow}>
              <td key={"count-title"} className={styles.tableCell}>
                Muertes
              </td>
              {props.causeData.map((data, index) => {
                return (
                  <td key={"count-" + index} className={styles.tableCell}>
                    {data.y}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
	 );
}
 
export default DataTable;