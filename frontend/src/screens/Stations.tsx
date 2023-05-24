import { useEffect, useState } from "react"
import { Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { getAllStations } from "../services/StationService";
import { Station } from '../types'

export default function Stations() {
  const [stations, setStations] = useState<Station[]>([]);
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

  return (
    <Container className="mt-4">
      <Table striped bordered hover responsive style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Operator</th>
            <th>Capasity</th>
          </tr>
        </thead>
        <tbody style={{ cursor: 'pointer' }}>
          {stations.map(station => (
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
    </Container>
  )
}
