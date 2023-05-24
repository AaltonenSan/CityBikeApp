import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <Card className="p-4" style={{ backgroundColor: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>
        <Card.Title>Welcome to Helsinki City Bikes</Card.Title>
        <Card.Text>Here you can find data about the journeys made with city bikes and city bike stations</Card.Text>
        <Row className="mb-1 ms-auto me-auto">
          <Col>
            <Link to='/journeys'>
              <Button variant="warning" size="lg">
                Journeys
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to='/stations'>
              <Button variant="warning" size="lg">
                Stations
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
