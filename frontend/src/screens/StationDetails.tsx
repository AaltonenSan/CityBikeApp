import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import StationDetailTable from '../components/StationDetailTable';
import StationMap from '../components/StationMap';

export default function StationDetails() {
  const location = useLocation();
  const { station } = location.state;

  return (
    <Container
      className="d-flex align-items-center justify-content-center mt-2 mb-2"
      style={{ minHeight: '70vh' }}
    >
      {station ? (
        <Row className="w-100">
          <Col xs={12} md={6} className="p-0" style={{ minHeight: '300px' }}>
            <StationMap
              x={station.x}
              y={station.y}
              name={station.nimi}
              osoite={station.osoite}
            />
          </Col>
          <Col xs={12} md={6} className="p-0">
            <div style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
              <StationDetailTable station={station} />
            </div>
          </Col>
        </Row>
      ) : (
        <Spinner variant="warning" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
}
