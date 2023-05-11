import { createContext, useReducer } from "react"

export const ModalContext = createContext()
const initialState = {
  modal: null,
  payload: null,
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REVIEW":
      return {
        modal: "review",
        payload: action.payload,
      }
    case "SEARCH":
      return {
        modal: "search",
      }
    case "ALBUM":
      return {
        modal: "album",
      }
    case "CLOSE":
      return {
        modal: null,
      }

    default:
      return state
  }
}

const ModalProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState)

  const openReviewModal = (payload) => dispatch({ type: "REVIEW", payload })
  const openSearchModal = () => dispatch({ type: "SEARCH" })
  const openAlbumModal = () => dispatch({ type: "ALBUM" })
  const closeModal = () => dispatch({ type: "CLOSE" })
  return (
    <ModalContext.Provider
      value={{
        modalState,
        openReviewModal,
        openSearchModal,
        openAlbumModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
