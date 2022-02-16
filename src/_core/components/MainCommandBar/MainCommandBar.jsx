import React, { useState, useEffect } from "react"
import { IconLoading } from '../../utilities/svg-icons';
import EventBus from "../../utilities/event-bus";

const MainCommandBar = () => {

  const refresh = () => {
    EventBus.dispatch("loadHeader", "");
  }

  return (
    <div className="flex items-center">
      {/* <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-300 hover:bg-ss-500 text-black'>
        <div className='flex items-center mx-2'><IconSave width="15" className="mr-2" color="#000" />Save</div>
      </button>
      <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-300 hover:bg-ss-500 text-black'>
        <div className='flex items-center mx-2'><IconPlus width="15" className="mr-2" color="#000" />New</div>
      </button>
      <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-300 hover:bg-ss-500 text-black'>
        <div className='flex items-center mx-2'><IconTrash width="13" className="mr-2" color="#000" />Delete</div>
      </button> */}
      <button className='py-2 px-3 text-xs font-roboto font-semibolda bg-blue-500 hover:bg-blue-600 text-white rounded' onClick={() => refresh()}>
        <div className='flex items-center mx-2'>Refresh</div>
      </button>
    </div>
  )
}

export default MainCommandBar