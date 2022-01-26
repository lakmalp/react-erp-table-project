import React, { useContext } from "react"
import GlobalStateContext from "../../providers/GlobalStateContext.js"
import { Button } from "../index.js"

const SectionCommandBar = (props) => {
  return (
    <div className="font-montserrat text-sm font-semibold text-ss-900 bg-ss-100 p-2">
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
    </div>
  )
}

export default SectionCommandBar