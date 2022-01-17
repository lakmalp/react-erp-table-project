import { useContext } from "react"
import { ToastContext } from "../../providers/ToastContext"
import { ToastPlaceholder } from "./ToastPlaceholder"

const ToastContainer = () => {
  let Toast = useContext(ToastContext)

  return (
    Toast.stack.map((args, i) => <ToastPlaceholder key={i} {...args} />)
  )
}

export default ToastContainer