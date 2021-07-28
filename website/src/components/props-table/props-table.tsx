import React, { useContext } from 'react'
import PropsContext from 'contexts/props-context'

type PropsTableProps = {
  of: string
}

export function PropsTable({ of }: PropsTableProps) {
  const { props } = useContext(PropsContext)
  const componentProps = props[of]
  return (
    <table className="w-full text-sm text-gray-800 props-table">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left whitespace-nowrap">Name</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">Description</th>
          <th className="px-4 py-2 text-left whitespace-nowrap">
            Default Value
          </th>
        </tr>
      </thead>
      <tbody className="border rounded-md">
        {componentProps.map((prop, index) => (
          <tr
            key={prop.name}
            className={index % 2 === 0 ? 'bg-gray-50' : undefined}
          >
            <td className="p-4 font-mono font-bold text-left">{prop.name}</td>
            <td className="p-4 font-medium text-left">
              <div>{prop.description}</div>
              {prop.type ? (
                <code className="inline-block mt-2 border">
                  {prop.type.name}
                </code>
              ) : null}
            </td>
            <td className="p-4 font-medium text-left">
              {prop.defaultValue?.value ? (
                <code className="border ">{prop.defaultValue?.value}</code>
              ) : (
                <span className="text-xs">--</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
