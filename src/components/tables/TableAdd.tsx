import {TableProps} from "./Table.tsx";
import * as React from "react";
import {useState} from "react";

export interface TableAddProps<T> extends TableProps<T> {
    setSections: (sections: T[]) => void;
}

const TableAdd = <T extends object>({data: initialData, columns, onChange}
                                 : TableProps<T>) => {
    const [data, setData] = useState(initialData);

    function handleSelectChange(rowIndex: number, accessor: keyof T, value: string) {
        const updatedData = [...data];
        updatedData[rowIndex] = {...updatedData[rowIndex], [accessor]: value};
        setData(updatedData);

        if (onChange) {
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
            {data.map((row, rowIndex) => {
                    const isLastRow = rowIndex === data.length - 1;
                    return (
                        <tr key={(row as T & {sequence?: number}).sequence || (rowIndex + 1)}>
                            {columns.map((column, columnIndex) => (
                                <td
                                    scope="row"
                                    key={columnIndex}
                                    className={column.columnStyle}
                                >
                                    {column.type === 'stringEdit' && (
                                        <input type="text" className="form-control" value={row[column.accessor] as string}
                                               onChange={(e) => {
                                                   handleSelectChange(rowIndex, column.accessor, e.target.value)
                                               }}
                                        />
                                    )}

                                    {isLastRow && column.type === 'sequence' && (
                                        <button className="btn btn-primary"
                                        onClick={() => {
                                            const updatedData = [...data];
                                            updatedData.push({
                                                ...row,
                                                //sequence: data.length + 1,
                                                sequence: data.length > 0
                                                            ? Math.max(...data.map((r: T & {sequence?: number}) => r.sequence || 0 )) + 1
                                                            : 1
                                            } as T & {sequence?: number});
                                            setData(updatedData);
                                        }}>
                                            +
                                        </button>
                                    )}

                                    {!isLastRow && column.type === 'sequence'
                                        && (row[column.accessor] as React.ReactNode)}

                                    {column.type === 'string' && (row[column.accessor] as React.ReactNode)}
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

export default TableAdd;