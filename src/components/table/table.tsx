import React from 'react'

export type TableProps = {
  dataSource: any
  columns: Array<{
    title: string
    dataIndex: string
    key: string
    render?: (cellData: any) => React.ReactElement
  }>
}

export function Table({ dataSource, columns }: TableProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((val) => (
                    <th
                      key={val.key}
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      {val.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataSource.map((row: any) => (
                  <tr key={row.key}>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                      >
                        {column.render
                          ? column.render(row[column.dataIndex])
                          : row[column.dataIndex]}
                      </td>
                    ))}
                    {/* {dataIndex.map((title) => (
                      <td
                        key={title}
                        className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                      >
                        {val[title]}
                      </td>
                    ))} */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
