import { useEffect, useState } from "react"
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

  const handleClick = (id: number) => navigate('/station', { state: { id: id } })

  const TitleWithSearch = (title: string) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        {title} <FaSearch onClick={title === 'Name' ? () => setSearchByName(true) : () => setSearchByAddress(true)} />
      </div>
    )
  }

  const closeSearch = () => {
    setSearchByName(false)
    setSearchByAddress(false)
    setName('')
    setAddress('')
  }

  const SearchInput = (type: string) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <input type="text" placeholder={`Search by ${type}`} value={type === 'name' ? name : address}
          onChange={type === 'name' ? (e) => setName(e.target.value) : (e) => setAddress(e.target.value)}
        />
        <AiOutlineClose onClick={() => closeSearch()} />
      </div>
    )
  }

  const search = (stations: Station[]) => {
    if (name) {
      return stations.filter(station => station.nimi.toLowerCase().includes(name.toLowerCase()))
    } else if (address) {
      return stations.filter(station => station.osoite.toLowerCase().includes(address.toLowerCase()))
    } else {
      return stations
    }
  }

  const limit = 10 // stations shown per page
  const lastPage = Math.ceil(search(stations).length / limit)
  console.log(lastPage)

  const lastIndex = page * limit
  const firstIndex = lastIndex - limit

  const paginatedStations = search(stations).slice(firstIndex, lastIndex)

  return (
    <Container className="mt-4">
      <Table striped bordered hover responsive style={{ backgroundColor: 'rgba(255,255,255,0.95)', margin: 0 }}>
        <thead>
          <tr>
            <th style={{ width: '270px', height: '46px' }}>
              {searchByName ? SearchInput('name') : TitleWithSearch('Name')}
            </th>
            <th style={{ width: '300px', height: '46px' }}>
              {searchByAddress ? SearchInput('address') : TitleWithSearch('Address')}
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
