import React, { useEffect, useRef, useState } from "react"
import { Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import PaginationControls from "../components/PaginationControls";
import { getAllStations } from "../services/apiClient";
import { Station } from '../types'
import { FaSearch } from 'react-icons/fa'
import { AiOutlineClose } from "react-icons/ai";

export default function Stations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [searchByName, setSearchByName] = useState(false)
  const [searchByAddress, setSearchByAddress] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [page, setPage] = useState(1);
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllStations()
        setStations(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // Focus on search input when search is clicked
  useEffect(() => {
    if (searchByName || searchByAddress) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [searchByName, searchByAddress]);

  // Navigate to station details page
  const handleClick = (id: number) => navigate('/station', { state: { id: id } })

  const handleNameSearch = () => {
    setSearchByName(true);
    setSearchByAddress(false);
    setAddress('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  };

  const handleAddressSearch = () => {
    setSearchByAddress(true);
    setSearchByName(false);
    setName('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  };

  const closeSearch = () => {
    setSearchByName(false)
    setSearchByAddress(false)
    setName('')
    setAddress('')
  }

  // Column title with search icon
  const TitleWithSearch = (title: string, handleClick: React.MouseEventHandler<SVGElement>) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        {title} <FaSearch onClick={handleClick} />
      </div>
    )
  }

  // Column title with search input
  const SearchInput = (type: string, inputRef: React.RefObject<HTMLInputElement>) => {
    const inputValue = type === 'name' ? name : address
    const handleChange = type === 'name' ? setName : setAddress

    return (
      <div className="d-flex justify-content-between align-items-center">
        <input
          type="text"
          placeholder={`Search by ${type}`}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          ref={inputRef}
        />
        <AiOutlineClose onClick={closeSearch} />
      </div>
    );
  };

  // Filter stations by name or address
  const search = (stations: Station[]) => {
    if (name) {
      return stations.filter(station => station.nimi.toLowerCase().includes(name.toLowerCase()))
    } else if (address) {
      return stations.filter(station => station.osoite.toLowerCase().includes(address.toLowerCase()))
    } else {
      return stations
    }
  }

  // Pagination settings
  const limit = 10 // stations shown per page
  const lastPage = Math.ceil(search(stations).length / limit) // set the last page according to search results
  const lastIndex = page * limit
  const firstIndex = lastIndex - limit
  const paginatedStations = search(stations).slice(firstIndex, lastIndex)

  return (
    <Container className="mt-4">
      <Table striped bordered hover responsive style={{ backgroundColor: 'rgba(255,255,255,0.95)', margin: 0 }}>
        <thead>
          <tr>
            <th style={{ width: '270px', height: '46px' }}>
              {searchByName ? SearchInput('name', inputRef) : TitleWithSearch('Name', handleNameSearch)}
            </th>
            <th style={{ width: '300px', height: '46px' }}>
              {searchByAddress ? SearchInput('address', inputRef) : TitleWithSearch('Address', handleAddressSearch)}
            </th>
            <th>City
            </th>
            <th>Operator</th>
            <th>Capasity</th>
          </tr>
        </thead>
        <tbody style={{ cursor: 'pointer' }}>
          {paginatedStations.map(station => (
            <tr key={station.id} onClick={() => handleClick(station.id)}>
              <td>{station.nimi}</td>
              <td>{station.osoite}</td>
              <td>{station.kaupunki}</td>
              <td>{station.operaattor}</td>
              <td>{station.kapasiteet}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
        <PaginationControls page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </Container>
  )
}
