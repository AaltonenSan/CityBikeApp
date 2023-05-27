import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import PaginationControls from '../components/PaginationControls';
import { getAllJourneys } from '../services/apiClient';
import { Journey, JourneyResponseData } from '../types';
import { durationInMinutes, distanceInKm } from '../util/journeyValueConverter';

export default function Journeys() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [page, setPage] = useState(1);
  const lastPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: JourneyResponseData = await getAllJourneys();
        setJourneys(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <Table
        striped
        bordered
        responsive
        style={{ backgroundColor: 'rgba(255,255,255,0.95)', margin: 0 }}
      >
        <thead>
          <tr>
            <th>Departure</th>
            <th>Return</th>
            <th>Departure station</th>
            <th>Return station</th>
            <th>Distance (km)</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((journey) => (
            <tr key={journey.id}>
              <td>{journey.departure}</td>
              <td>{journey.return_time}</td>
              <td>{journey.dep_station_name}</td>
              <td>{journey.ret_station_name}</td>
              <td>{distanceInKm(journey.distance)}</td>
              <td>{durationInMinutes(journey.duration)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        className="d-flex justify-content-center"
        style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
      >
        <PaginationControls page={page} setPage={setPage} lastPage={lastPage} />
      </div>
    </Container>
  );
}
