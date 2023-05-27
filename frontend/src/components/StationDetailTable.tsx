import { Table } from 'react-bootstrap';
import { Station } from '../types';

type StationDetailTableProps = { station: Station };

export default function StationDetailTable({
  station,
}: StationDetailTableProps) {
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
          <td>TODO!</td>
        </tr>
        <tr>
          <th>Journeys ended</th>
          <td>TODO!</td>
        </tr>
        <tr>
          <th>Average started journey distance</th>
          <td>TODO</td>
        </tr>
        <tr>
          <th>Average ended journey distance</th>
          <td>TODO</td>
        </tr>
      </tbody>
    </Table>
  );
}
