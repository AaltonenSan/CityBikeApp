import { Container, Table } from "react-bootstrap"

export default function Journeys() {
  return (
    <Container style={{ marginTop: '20px' }}>
      <Table striped bordered responsive style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
        <thead>
          <tr>
            <th>Departure</th>
            <th>Return</th>
            <th>Departure station</th>
            <th>Return station</th>
            <th>Covered distance</th>
            <th>Duration</th>
          </tr>
        </thead>
      </Table>
    </Container>
  )
}
