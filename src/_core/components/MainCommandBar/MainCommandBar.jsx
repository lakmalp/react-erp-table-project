import React, {useEffect} from "react"
import eventBus from "../../utilities/event-bus"
import { IconLoading, IconPlus, IconSave, IconTrash } from '../../utilities/svg-icons';

const MainCommandBar = () => {
  const save = () => {
    eventBus.dispatch("commandBarSave_clicked", "")
  }
  return (
    <div>
      {/* <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-300 hover:bg-ss-500 text-black'>
        <div className='flex items-center mx-2'><IconSave width="15" className="mr-2" color="#000" />Save</div>
      </button>
      <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-300 hover:bg-ss-500 text-black'>
        <div className='flex items-center mx-2'><IconPlus width="15" className="mr-2" color="#000" />New</div>
      </button>
      <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-300 hover:bg-ss-500 text-black'>
        <div className='flex items-center mx-2'><IconTrash width="13" className="mr-2" color="#000" />Delete</div>
      </button> */}
      <button className='py-2 text-xs font-roboto font-semibolda bg-ss-300 hover:bg-ss-500 text-black'>
        <div className='flex items-center mx-2'><IconLoading width="15" className="mr-2" color="#000" />Refresh</div>
      </button>
    </div>
  )
}

export default MainCommandBar