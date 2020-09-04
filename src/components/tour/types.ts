/** Tour step properties */
export type TourStep = {
  /** query selector for the target element */
  target: string
  /** title of the tour popup */
  title?: React.ReactNode
  /** content of tour popup */
  content?: React.ReactNode
}
