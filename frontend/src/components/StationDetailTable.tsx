import { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { distanceInKm } from '../util/journeyValueConverter';
import {
  StationDetailsInterface,
  StationDetailsResponse,
  TopStations,
} from '../types';
import { getOneStation } from '../services/apiClient';
import getMonthName from '../util/getMonthName';

type StationDetailTableProps = { station: StationDetailsInterface };

export default function StationDetailTable({
  station,
}: StationDetailTableProps) {
  const [calculations, setCalculations] = useState<StationDetailsInterface>();
  const [topRetStations, setTopRetStations] = useState<TopStations[]>([]);
  const [topDepStations, setTopDepStations] = useState<TopStations[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: StationDetailsResponse = await getOneStation(
          station.id,
          month
        );
        const { data, top_ret_stations, top_dep_stations } = response;
        setCalculations(data[0]);
        setTopRetStations(top_ret_stations);
        setTopDepStations(top_dep_stations);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [station, month]);

  // Force map reload after the table size changes to avoid gray tiles
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }, [topRetStations]);

  const TopStationsTable = ({ stations }: { stations: TopStations[] }) => {
    return (
      <ul>
        {stations.map((station) => (
          <li key={station.id}>{station.name}</li>
        ))}
      </ul>
    );
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(event.target.value);
    setLoading(true);
  };

  return (
    <Table
      striped
      bordered
      responsive
      style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
    >
      <tbody>
        <tr>
          <th>Name</th>
          <td>{station.nimi}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td>{station.osoite}</td>
        </tr>
        <tr>
          <th>City</th>
          <td>{station.kaupunki}</td>
        </tr>
        <tr>
          <th>Operator</th>
          <td>{station.operaattor}</td>
        </tr>
        <tr>
          <th>Capasity</th>
          <td>{station.kapasiteet}</td>
        </tr>
        <tr>
          <th>Filter calculations by month:</th>
          <td>
            <select id="month" onChange={handleMonthChange}>
              <option value="">All Months</option>
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {getMonthName(index + 1)}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <th>Journeys started</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" size="sm" />
            ) : (
              calculations?.journeys_started
            )}
          </td>
        </tr>
        <tr>
          <th>Journeys ended</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" size="sm" />
            ) : (
              calculations?.journeys_ended
            )}
          </td>
        </tr>
        <tr>
          <th>Average started journey distance (km)</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" size="sm" />
            ) : calculations?.avg_distance_started ? (
              distanceInKm(calculations.avg_distance_started)
            ) : (
              '-'
            )}
          </td>
        </tr>
        <tr>
          <th>Average ended journey distance (km)</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" size="sm" />
            ) : calculations?.avg_distance_ended ? (
              distanceInKm(calculations.avg_distance_ended)
            ) : (
              '-'
            )}
          </td>
        </tr>
        <tr>
          <th>Top 5 return stations for journeys starting from the station</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" />
            ) : topRetStations.length > 0 ? (
              <TopStationsTable stations={topRetStations} />
            ) : (
              '-'
            )}
          </td>
        </tr>
        <tr>
          <th>Top 5 departure stations for journeys ending at the station</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" />
            ) : topDepStations.length > 0 ? (
              <TopStationsTable stations={topDepStations} />
            ) : (
              '-'
            )}{' '}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
