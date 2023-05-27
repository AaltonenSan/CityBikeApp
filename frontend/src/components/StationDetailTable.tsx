import { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { distanceInKm } from '../util/journeyValueConverter';
import { StationDetailsInterface, StationDetailsResponse } from '../types';
import { getOneStation } from '../services/apiClient';

type StationDetailTableProps = { station: StationDetailsInterface };

export default function StationDetailTable({
  station,
}: StationDetailTableProps) {
  const [stationDetails, setStationDetails] =
    useState<StationDetailsInterface>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: StationDetailsResponse = await getOneStation(
          station.id
        );
        setStationDetails(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [station]);

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
            {stationDetails ? (
              stationDetails?.journeys_started
            ) : (
              <Spinner variant="warning" animation="border" size="sm" />
            )}
          </td>
        </tr>
        <tr>
          <th>Journeys ended</th>
          <td>
            {stationDetails ? (
              stationDetails?.journeys_ended
            ) : (
              <Spinner variant="warning" animation="border" size="sm" />
            )}
          </td>
        </tr>
        <tr>
          <th>Average started journey distance (km)</th>
          <td>
            {stationDetails ? (
              stationDetails?.avg_distance_started ? (
                distanceInKm(stationDetails.avg_distance_started)
              ) : (
                '-'
              )
            ) : (
              <Spinner variant="warning" animation="border" size="sm" />
            )}
          </td>
        </tr>
        <tr>
          <th>Average ended journey distance (km)</th>
          <td>
            {stationDetails ? (
              stationDetails?.avg_distance_ended ? (
                distanceInKm(stationDetails.avg_distance_ended)
              ) : (
                '-'
              )
            ) : (
              <Spinner variant="warning" animation="border" size="sm" />
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
