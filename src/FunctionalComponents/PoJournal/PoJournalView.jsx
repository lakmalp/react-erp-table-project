import { useEffect } from "react";
import { SectionCommandBar } from "../../_core/components";
import { IconEdit, IconPlus, IconTrash } from "../../_core/utilities/svg-icons";
import EventBus from "../../_core/utilities/event-bus"

const PoJournal = (props) => {
  let {
    parent_id: props_parent_id,
    active: props_active,
    disabled: props_disabled,
    refreshData: props_refreshData,
    headerPopulated: props_headerPopulated
  } = props;

  useEffect(() => {
    EventBus.on("headerLoadingDone", (id) => {
      props_active && props_refreshData(id);
    }
    );

    return () => {
      EventBus.remove("headerLoadingDone");
    }
  }, [])

  // useEffect(() => {
  //   props_active && !props_disabled && props_headerPopulated && props_refreshData();
  // }, [props_parent_id, props_active, props_disabled, props_headerPopulated])

  const prepareEdit = () => {
    
  }

  // const cmdEdit_callback = async (result, data) => {
    
  // }

  const prepareCreate = () => {
  }

  const prepareDelete = () => {
  }

  let sectionCommandBarButtons = [
    {
      caption: "Edit",
      callback: prepareEdit,
      icon: <IconEdit />
    },
    {
      caption: "New",
      callback: prepareCreate,
      icon: <IconPlus />
    },
    {
      caption: "Delete",
      callback: prepareDelete,
      icon: <IconTrash />
    }
  ]
  return (
    <>
      <SectionCommandBar
        section={props.name}
        buttons={sectionCommandBarButtons}
      />
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