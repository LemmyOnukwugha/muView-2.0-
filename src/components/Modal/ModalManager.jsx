import React, { useContext } from "react"
import { ModalContext } from "../../context/ModalProvider"
import AddReviewModal from "./Review"
import SearchModal from "./SearchModal/SearchModal"
import AlbumModal from "./AlbumModal"

const ModalManager = () => {
  const { modalState } = useContext(ModalContext)

  const render = () => {
    switch (modalState.modal) {
      case "review":
        return <AddReviewModal />

      case "search":
        return <SearchModal />
      case "album":
        return <AlbumModal />

      default:
        return null
    }
  }
  return render()
}

export default ModalManager
