import { Container, Table } from "react-bootstrap"

export default function Stations() {
  return (
    <Container style={{ marginTop: '20px' }}>
      <Table striped bordered responsive style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Operator</th>
            <th>Capasity</th>
          </tr>
        </thead>
      </Table>
    </Container>
  )
}
