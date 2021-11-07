import React, { useEffect, useMemo, useRef, useState } from 'react'
import Pagination from 'components/pagination'
import { Checkbox } from 'components/checkbox/checkbox'
import useSyncedState from 'hooks/use-synced-states'

type OnChangeType = (selectedRowKeys: string[], selectedRows?: any) => void

/** Table Properties */
export type TableProps = {
  dataSource: Array<any>
  columns: Array<{
    title: string
    dataIndex: string
    key: string
    render?: (cellData: any) => React.ReactElement
  }>
  rowSelection?: {
    selectedRowKeys?: string[]
    onChange: OnChangeType
  }
  showPagination?: boolean
}

export function Table({
  dataSource,
  columns,
  rowSelection,
  showPagination = true,
}: TableProps) {
  const [tableData, setTableData] = useState(dataSource.slice(0, 10))
  const [selectionData, setSelectionData] = useSyncedState(
    dataSource.filter((row) =>
      rowSelection?.selectedRowKeys?.includes(row.key),
    ),
  )

  const onChangeCb = useRef<OnChangeType | null>()
  onChangeCb.current = rowSelection?.onChange

  useEffect(() => {
    onChangeCb.current?.(
      selectionData.map((row) => row.key),
      selectionData,
    )
  }, [selectionData])

  /** slice data for pagination */
  function handleTableData(page: number, pageSize: number) {
    setTableData(dataSource.slice(pageSize * (page - 1), pageSize * page))
  }

  // checkbox row selection
  function handleRowSelection(
    event: React.ChangeEvent<HTMLInputElement>,
    row: typeof dataSource[0],
  ) {
    if (event.target.checked) {
      setSelectionData((prevState) => (prevState ? [...prevState, row] : [row]))
    } else {
      setSelectionData((prevState) =>
        prevState?.filter((val) => val.key !== row.key),
      )
    }
  }

  // onChange callback for header checkbox
  function handleHeaderCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setSelectionData((prevState) =>
        prevState ? [...prevState, ...tableData] : [...tableData],
      )
    } else {
      const tableDataKeys = tableData.map((row) => row.key)
      setSelectionData((prevState) =>
        prevState?.filter((row) => !tableDataKeys.includes(row.key)),
      )
    }
  }

  // Checked state for header checkbox should work in sync
  // with the pagination component.
  // Header Checkbox will have independent true, false or indeterminate state
  // for each page of Pagination component
  const checkedState = useMemo(() => {
    const tableDataKeys = tableData.map((row) => row.key)
    const selectedRowKeys = selectionData?.map((val) => val.key)
    let count = 0
    for (const key of tableDataKeys) {
      if (selectedRowKeys?.includes(key)) {
        count++
      }
    }
    return count === 0
      ? false
      : count === tableDataKeys.length
      ? true
      : 'indeterminate'
  }, [tableData, selectionData])

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 space-y-4 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {rowSelection ? (
                    <th className="py-3 pl-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      <Checkbox
                        checked={checkedState}
                        onChange={handleHeaderCheckbox}
                      />
                    </th>
                  ) : null}
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
                {tableData.map((row: any) => (
                  <tr key={row.key}>
                    {rowSelection ? (
                      <td className="py-4 pl-6 text-sm text-gray-700 whitespace-nowrap">
                        <Checkbox
                          checked={selectionData
                            ?.map((val) => val.key)
                            .includes(row.key)}
                          onChange={(e) => handleRowSelection(e, row)}
                        />
                      </td>
                    ) : null}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            {showPagination ? (
              <Pagination
                total={dataSource.length}
                onChange={handleTableData}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
