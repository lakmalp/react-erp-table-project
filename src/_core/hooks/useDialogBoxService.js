const useDialogBoxService = () => {
  return (
    {
      createDialogBox: (component) => {
        return (
          {
            showModal: () => {}
          }
        )
      }
    }
  )
}

export default useDialogBoxService;