import { useEffect, useState } from 'react';
import { Container, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import PaginationControls from '../components/PaginationControls';
import { getAllJourneys } from '../services/apiClient';
import { Journey, JourneyResponseData } from '../types';
import { durationInMinutes, distanceInKm } from '../util/journeyValueConverter';

export default function Journeys() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Get journeys for current page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: JourneyResponseData = await getAllJourneys(page);
        setJourneys(response.data);
        if (lastPage === 1) setLastPage(response.last_page!);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page, lastPage]);

  type ClickableColumnType = {
    title: string;
    id: number;
  };

  const ClickableColumn = ({ title, id }: ClickableColumnType) => {
    return (
      <OverlayTrigger overlay={<Tooltip>Station details</Tooltip>}>
        <span>{title}</span>
      </OverlayTrigger>
    );
  };

  return (
    <Container className="mt-4 mb-4">
      <Table
        striped
        bordered
        responsive
        hover
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
              <td>
                <ClickableColumn
                  title={journey.dep_station_name}
                  id={journey.dep_station_id}
                />
              </td>
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
