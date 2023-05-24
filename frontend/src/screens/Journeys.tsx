import { useEffect, useState } from "react"
import { Container, Table } from "react-bootstrap"
import { getAllJourneys } from "../services/apiClient";
import { Journey } from "../types";

export default function Journeys() {
  const [journeys, setJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllJourneys()
        setJourneys(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Container className="mt-4">
      <Table striped bordered responsive style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
        <thead>
          <tr>
            <th>Departure</th>
            <th>Return</th>
            <th>Departure station</th>
            <th>Return station</th>
            <th>Distance</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map(journey => (
            <tr>
              <td>{journey.departure}</td>
              <td>{journey.return_time}</td>
              <td>{journey.dep_station_name}</td>
              <td>{journey.ret_station_name}</td>
              <td>{journey.distance}</td>
              <td>{journey.duration}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
