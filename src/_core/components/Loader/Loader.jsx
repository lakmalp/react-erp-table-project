import { useContext } from "react"
import GlobalStateContext from "../../providers/GlobalStateContext"
import { IconLoading } from "../../utilities/svg-icons";

const Loader = () => {
  let globalState = useContext(GlobalStateContext);

  if (globalState.loadingSource === "") {
    return <></>
  } else {
    return (
      <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{zIndex: "9000"}}>
        <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <IconLoading width="50" color="rgb(59, 130, 246)" className="inline-block animate-spin" />
        </div>
      </div >
    )
  }
}

export default Loader;