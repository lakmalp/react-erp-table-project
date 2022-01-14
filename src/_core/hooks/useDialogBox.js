import _ from "lodash";
import { useState } from "react"

const useDialogBox = () => {
  const [stack, setStack] = useState([]);
  const [nextId, setNextId] = useState(50);
  return {
    stack: stack,
    showModal: (args) => {
      let _nextId = nextId;
      let _stack = _.cloneDeep(stack);
      setNextId(prev => prev + 1)
      setStack([..._stack, { id: _nextId + 1, ...args }])
    },
    closeModal: (args, stack) => {
      console.log(args)
      console.log(stack)
      setStack(stack.filter(item => item.id !== args.id))
    },
    callback: (args) => {
      args.callback(args.params)
      setStack(prev => {
        return prev.filter(item => item.id !== args.id)
      })
    }
  }
}

export default useDialogBox;