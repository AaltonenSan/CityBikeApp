import { Container, Table } from "react-bootstrap"

export default function Journeys() {
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
      </Table>
    </Container>
  )
}
