import { useState } from 'react'

export function ManageGifSearchState() {
  const [gifSearch, setGifSearch] = useState('')
  const [gifs, setGifs] = useState([])
  const [selectedGif, setSelectedGif] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  return { gifSearch, setGifSearch, gifs, setGifs, selectedGif, setSelectedGif, isSearching, setIsSearching }
}
