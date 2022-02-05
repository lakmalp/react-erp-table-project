import React, { useContext } from "react"
import GlobalStateContext from "../../providers/GlobalStateContext.js"
import { Button } from "../index.js"
import {IconLoading} from "../../utilities/svg-icons"

const SectionCommandBar = (props) => {
  let { loadingSource } = useContext(GlobalStateContext);
  let { section } = props

  return (
    <div className="flex items-center font-montserrat text-sm font-semibold text-ss-900 bg-ss-100 p-2">
      {
        props.buttons && props.buttons.map((button, index) =>
          <Button
            type="button"
            key={index}
            text={button.caption}
            disabled={button.disabled}
            callback={button.callback}
            icon={{ component: button.icon, width: 13 }}
          />
        )
      }
      <IconLoading width="20" color="rgb(50,50,50)" className={"ml-2 animate-spin " + (loadingSource === section ? "" : "hidden")} />
      <span>{`${section}`}</span>
    </div>
  )
}

export default SectionCommandBar