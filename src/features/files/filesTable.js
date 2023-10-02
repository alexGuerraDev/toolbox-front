import React, { useEffect, useState } from 'react';
import { Table, Spinner, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, getFileList } from './filesSlice';


const FilterForm = ({ selectedFile, availableFiles, handleSelection }) => (
  <Form className="mb-3 mt-3">
    <Row>
      <Col xs={12} md={12}>
        <Form.Control as="select" value={selectedFile} onChange={e => handleSelection(e.target.value)}>
          <option value="">Selecciona un archivo para filtrar</option>
          {availableFiles.map(fileName => (
            <option key={fileName} value={fileName}>
              {fileName}
            </option>
          ))}
        </Form.Control>
      </Col>
    </Row>
  </Form>
);

const FilesTable = () => {
  const dispatch = useDispatch();
  const files = useSelector(state => state.files.files);
  const fileList = useSelector(state => state.files.fileList);

  const [fileName, setFileName] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    dispatch(getFileList());
    dispatch(getFiles());
  }, [dispatch]);

  const handleSelection = (selectedFile) => {
    setIsInitialLoad(false);
    dispatch(getFiles(selectedFile || null));
    setFileName(selectedFile);
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
            <FilterForm
              selectedFile={fileName}
              availableFiles={fileList}
              handleSelection={handleSelection}
            />
            <p>No se encontró ningún archivo con el nombre {fileName}</p>
          </Container>
        )
      ) : (
        <Container>
          <FilterForm
            selectedFile={fileName}
            availableFiles={fileList}
            handleSelection={handleSelection}
          />
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
