import React, { useEffect, useState } from 'react';
import { Table, Spinner, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from './filesSlice';

const FilterForm = ({ fileName, setFileName, handleFilter }) => (
  <Form className="mb-3 mt-3">
    <Row>
      <Col xs={12} md={10}>
        <Form.Control
          type="text"
          placeholder="Ingresar nombre de archivo"
          value={fileName}
          onChange={e => setFileName(e.target.value)}
        />
      </Col>
      <Col xs={12} md={2} >
        <Button variant="primary" onClick={handleFilter} block>Filtrar</Button>
      </Col>
    </Row>
  </Form>
);

const FilesTable = () => {
  const dispatch = useDispatch();
  const files = useSelector(state => state.files);
  const [fileName, setFileName] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  const handleFilter = () => {
    setIsInitialLoad(false);  // set isInitialLoad to false
    dispatch(getFiles(fileName || null));
  };

  const CenteredSpinner = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spinner animation="border" role="status">
        </Spinner>
      </div>
    );
  }

  return (
    <Container>
      {files.length === 0 ? (
        isInitialLoad ? (
          <CenteredSpinner />
        ) : (
          <Container>
            <FilterForm fileName={fileName} setFileName={setFileName} handleFilter={handleFilter} />
            <p>No se encontró ningún archivo con el nombre {fileName}</p>
          </Container>
        )
      ) : (
        <Container>
          <FilterForm fileName={fileName} setFileName={setFileName} handleFilter={handleFilter} />
          <div className="table-responsive">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Text</th>
                  <th>Number</th>
                  <th>Hex</th>
                </tr>
              </thead>
              <tbody>
                {files.map(file =>
                  file.lines.map((line, index) => (
                    <tr key={`${file.file}-${index}`}>
                      {index === 0 && <td rowSpan={file.lines.length}>{file.file}</td>}
                      <td>{line.text}</td>
                      <td>{line.number}</td>
                      <td>{line.hex}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>


        </Container>

      )}
    </Container>
  );
}

export default FilesTable;
