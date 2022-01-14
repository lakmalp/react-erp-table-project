import { IconEdit, IconPlus } from "../../_core/utilities/svg-icons";
import GlobalStateContext from "../../_core/providers/GlobalStateContext";
import { useContext } from "react";

const PoJournal = (props) => {
  const globalState = useContext(GlobalStateContext)

  return (
    <>
      <div className="font-montserrat text-md text-blue-600">
        <div className="font-montserrat text-sm font-semibold text-ss-900 bg-ss-100 p-2">
          <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-400 hover:bg-ss-600 text-black' onClick={() => globalState.write("activeDataSource", "POJournal")}>
            <div className='flex items-center mx-2'><IconEdit width="13" className="mr-2" color="#000" />Edit</div>
          </button>
          <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-400 hover:bg-ss-600 text-black'>
            <div className='flex items-center mx-2'><IconPlus width="13" className="mr-2" color="#000" />New</div>
          </button>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        <div className="font-inter 2xl:col-span-2">
          <label className="block text-xs">Supplier</label>
          <input type="text" className="h-7 w-full text-sm" value="AS876 - Associated Motorways (Pvt) Ltd" disabled />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Created Date</label>
          <input type="text" className="h-7 w-full text-sm" value="10-12-2021" disabled />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Delivery Date</label>
          <input type="text" className="h-7 w-full text-sm" value="18-12-2021" disabled />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Status</label>
          <input type="text" className="h-7 w-full text-sm" value="Released" disabled />
        </div>
      </div>
    </>
  )
}

export default PoJournal;