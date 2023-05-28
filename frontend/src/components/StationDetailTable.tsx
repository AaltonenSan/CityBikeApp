import { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { distanceInKm } from '../util/journeyValueConverter';
import {
  StationDetailsInterface,
  StationDetailsResponse,
  TopStations,
} from '../types';
import { getOneStation } from '../services/apiClient';

type StationDetailTableProps = { station: StationDetailsInterface };

export default function StationDetailTable({
  station,
}: StationDetailTableProps) {
  const [stationDetails, setStationDetails] =
    useState<StationDetailsInterface>();
  const [topRetStations, setTopRetStations] = useState<TopStations[]>([]);
  const [topDepStations, setTopDepStations] = useState<TopStations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: StationDetailsResponse = await getOneStation(
          station.id
        );
        const { data, top_ret_stations, top_dep_stations } = response;
        setStationDetails(data[0]);
        setTopRetStations(top_ret_stations);
        setTopDepStations(top_dep_stations);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [station]);

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
          <th>Journeys started</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" size="sm" />
            ) : (
              stationDetails?.journeys_started
            )}
          </td>
        </tr>
        <tr>
          <th>Journeys ended</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" size="sm" />
            ) : (
              stationDetails?.journeys_ended
            )}
          </td>
        </tr>
        <tr>
          <th>Average started journey distance (km)</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" size="sm" />
            ) : stationDetails?.avg_distance_started ? (
              distanceInKm(stationDetails.avg_distance_started)
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
            ) : stationDetails?.avg_distance_ended ? (
              distanceInKm(stationDetails.avg_distance_ended)
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
            ) : (
              <TopStationsTable stations={topRetStations} />
            )}
          </td>
        </tr>
        <tr>
          <th>Top 5 departure stations for journeys ending at the station</th>
          <td>
            {loading ? (
              <Spinner variant="warning" animation="border" />
            ) : (
              <TopStationsTable stations={topDepStations} />
            )}{' '}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
