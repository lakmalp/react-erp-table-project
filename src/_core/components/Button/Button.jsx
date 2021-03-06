import React from "react";

const Button = ({ type, text, disabled, callback, icon }) => {
  const className = () => {
    switch (type) {
      case "button":
        return `mr-2 py-2 text-xs font-roboto rounded text-white ` + (disabled ? "bg-blue-200 pointer-events-none" : "bg-blue-500 hover:bg-blue-600");
      default:
        return `mr-2 py-2 text-xs font-roboto rounded ` + (disabled ? "text-gray-500 pointer-events-none" : " text-black hover:text-white hover:bg-blue-500");
    }
  }
  return (
    <button
      className={className()}
      onClick={() => callback()}
      disabled={disabled}
    >
      <div className='flex items-center mx-2'>
        {
          icon && <LazyIcon icon={icon.component} width={icon.width} className="mr-2" color={disabled ? "#fff" : "#fff"} />
        }
        {text}
      </div>
    </button>
  )
}



const LazyIcon = (props) => {
  return React.cloneElement(props.icon, {
    ...props
  })
}

export default Button;