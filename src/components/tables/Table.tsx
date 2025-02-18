import * as React from "react";
import {useState} from "react";
import {EStatus} from "../../interfaces/interfaces.ts";

export interface Column<T> {
    header: string;
    accessor: keyof T;
    columnStyle?: string;
    type: string;
    options?: EStatus[] | null;
}

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onChange?: (updatedData: T[]) => void;
}

const Table = <T extends object>({data: initialData, columns, onChange}
                                 : TableProps<T>) =>
{
    const [data, setData] = useState(initialData);

    function handleSelectChange(rowIndex: number, accessor: keyof T, value: string) {
        const updatedData = [...data];
        updatedData[rowIndex] = { ...updatedData[rowIndex], [accessor]: value };
        setData(updatedData);

        if(onChange) {
            onChange(updatedData);
        }
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
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                        <td scope="row" key={columnIndex}>
                            {column.type === 'select' && column.options && row[column.accessor] != EStatus[EStatus.Completed] &&
                                (
                                    <select className="form-select" aria-label="Default select example" value={row[column.accessor] as string}
                                            onChange={(e) =>
                                                {handleSelectChange(rowIndex, column.accessor, e.target.value)}}>
                                        {column.options.map((option) => (<option value={option}>{option}</option>))}
                                    </select>
                                )}
                            {column.type === 'select' && column.options && row[column.accessor] == EStatus[EStatus.Completed] && (row[column.accessor] as React.ReactNode)}
                            {column.type === 'string' && (row[column.accessor] as React.ReactNode)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;