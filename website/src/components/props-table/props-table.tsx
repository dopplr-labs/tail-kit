import React, { useContext } from 'react'
import PropsContext from 'contexts/props-context'

export function PropsTable() {
  const { props } = useContext(PropsContext)
  return (
    <table className="w-full text-sm text-gray-800 table-fixed">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Description</th>
          <th className="px-4 py-2 text-left">Default Value</th>
        </tr>
      </thead>
      <tbody className="border">
        {props.map((prop, index) => (
          <tr
            key={prop.name}
            className={index % 2 === 0 ? 'bg-gray-50' : undefined}
          >
            <td className="p-4 font-medium text-left">{prop.name}</td>
            <td className="p-4 font-medium text-left">
              <div>{prop.description}</div>
              {prop.type ? (
                <div className="inline-block px-2 py-1 mt-2 text-xs bg-gray-100 rounded-md">
                  {prop.type.name}
                </div>
              ) : null}
            </td>
            <td className="p-4 font-medium text-left">
              {prop.defaultValue?.value ?? '--'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
