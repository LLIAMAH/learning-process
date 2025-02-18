import * as React from "react";
import {Column, TableProps} from "./Table.tsx";
import {EStatus} from "../../interfaces/interfaces.ts";
import {useState} from "react";

const TableChangeStatus = <T extends object>({data: initialData, columns, onChange}
                                             : TableProps<T>) => {
    const [data, setData] = useState(initialData);

    function handleSelectChange(rowIndex: number, column: Column<T>, e: React.ChangeEvent<HTMLSelectElement>){
        const updatedData = [...data];
        updatedData[rowIndex] = {...updatedData[rowIndex], [column.accessor]: e.target.value};
        setData(updatedData);
        onChange?.(updatedData);
    }

    return (
        <table className="table">
            <thead>
            <tr>
                {columns.map((column, index) =>
                    <th scope="col" key={index}>{column.header}</th>)}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => {
                    return (
                        <tr key={(row as T & {sequence?: number}).sequence || (rowIndex + 1)}>
                            {columns.map((column, columnIndex) => (
                                <td
                                    scope="row"
                                    key={columnIndex}
                                    className={column.columnStyle}
                                >
                                    {column.type === 'string' && (row[column.accessor] as React.ReactNode)}
                                    {column.type === 'select' && (
                                        row[column.accessor] !== EStatus[EStatus.Completed]
                                            ? (
                                                <select className="form-select"
                                                        aria-label="Default select example"
                                                        onChange={(e) =>  handleSelectChange(rowIndex, column, e)}
                                                >
                                                    {column.options?.map((option) =>
                                                        (<option value={option}>{EStatus[option]}</option>))}
                                                </select>
                                            )
                                            : (row[column.accessor] as React.ReactNode)

                                    )}


                                </td>
                            ))}
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>
    );
}

export default TableChangeStatus;