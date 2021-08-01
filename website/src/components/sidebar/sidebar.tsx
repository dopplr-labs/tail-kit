import React from 'react'
import clsx from 'clsx'
import { routes } from 'configs/docs-sidebar.json'

type SidebarProps = {
  currentPath: string
}

export default function Sidebar({ currentPath }: SidebarProps) {
  return (
    <div
      id="sidebar"
      className="flex-none hidden px-1 pt-6 pb-10 overflow-y-auto border-r lg:block sm:px-3 xl:px-5 lg:w-64 lg:pt-8"
    >
      <ul className="px-2 space-y-6 text-base lg:text-sm">
        {routes.map((route) => (
          <li key={route.title}>
            <h4 className="mb-3 font-semibold tracking-wide text-gray-800 uppercase lg:text-xs">
              {route.title}
            </h4>
            <ul className="ml-2 space-y-3">
              {route.routes.map((route) => (
                <li key={route.title}>
                  <a
                    href={route.path}
                    className={clsx(
                      'font-medium',
                      route.path === `/${currentPath}`
                        ? 'text-blue-500'
                        : 'text-gray-600',
                    )}
                  >
                    {route.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    // <>
    //  <div
    //     id="sidebar"
    //     className={clsx(
    //       'fixed z-40 inset-0 flex-none h-full bg-black/25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block',
    //       !active ? 'hidden' : '',
    //     )}
    //     onClick={handleCloseSidebar}
    //   >
    //     <div
    //       id="navWrapper"
    //       className="h-full mr-24 overflow-hidden overflow-y-auto scrolling-touch bg-white lg:h-auto lg:block lg:sticky lg:bg-transparent lg:top-18 lg:mr-0"
    //     >
    //       <nav
    //         id="nav"
    //         className="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)"
    //       >
    //         <ul className="px-3 space-y-6">
    //           {routes.map((route) => (
    //             <li key={route.title}>
    //               <h4 className="mb-3 font-semibold tracking-wide text-gray-800 uppercase lg:text-xs">
    //                 {route.title}
    //               </h4>
    //               <ul className="space-y-3">
    //                 {route.routes.map((route) => (
    //                   <li key={route.title}>
    //                     <a
    //                       href={route.path}
    //                       className="font-medium text-gray-600"
    //                     >
    //                       {route.title}
    //                     </a>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </li>
    //           ))}
    //         </ul>
    //       </nav>
    //     </div>
    //   </div>
    //   <button
    //     className="fixed z-50 flex items-center justify-center w-16 h-16 text-white bg-gray-800 rounded-full focus:outline-none bottom-4 right-4 lg:hidden"
    //     onClick={() => setActive(!active)}
    //   >
    //     {active ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
    //   </button>
    // </>
  )
}
