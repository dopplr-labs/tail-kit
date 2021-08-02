import React, { useContext } from 'react'
import PropsContext from 'contexts/props-context'
import { useDeviceSizeContext } from 'hooks/use-device-size'

type PropsTableProps = {
  of: string
}

export function PropsTable({ of }: PropsTableProps) {
  const { props } = useContext(PropsContext)
  const componentProps = props[of]

  const { deviceSize } = useDeviceSizeContext()
  const isMobile = deviceSize === 'sm' || deviceSize === 'md'

  if (isMobile) {
    return (
      <div className="border rounded-md">
        {componentProps.map((prop) => (
          <div key={prop.name} className="p-3 text-sm odd:bg-gray-50">
            <div className="mb-2 font-mono font-bold">{prop.name}</div>
            <div className="mb-4 text-xs">
              <div>{prop.description}</div>
              {prop.type ? (
                <code className="inline-block mt-2 border">
                  {prop.type.name}
                </code>
              ) : null}
            </div>
            <div className="text-xs">
              <span className="font-medium">Default Value&nbsp;&nbsp;</span>
              {prop.defaultValue?.value ? (
                <code className="border ">{prop.defaultValue?.value}</code>
              ) : (
                <span className="text-xs">--</span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <table className="w-full overflow-auto text-sm text-gray-800 props-table">
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
        {componentProps.map((prop) => (
          <tr key={prop.name} className="odd:bg-gray-50">
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
