import { fetchFiles } from './filesAPI';

const MockResponse = [
  {
    "file": "test2.csv",
    "lines": [
      {
        "text": "WSe",
        "number": 2,
        "hex": "d590d32a1e70034f4ae517beeff98677"
      }
    ]
  },
  {
    "file": "test3.csv",
    "lines": [
      {
        "text": "mFltlwOIBrZV",
        "number": 34500,
        "hex": "2019d64c49c24eac1323f0070d0cd30d"
      },
      {
        "text": "HlrUmT",
        "number": 867,
        "hex": "fab12e626f26cec39ec3d0bd02732897"
      },
      {
        "text": "MxIZzVOPEfyQ",
        "number": 7445258,
        "hex": "2540a9a6712e23cac3e4389261c50623"
      }
    ]
  },
]

describe('filesAPI', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetches files without a file name', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => (MockResponse),
    });

    const result = await fetchFiles();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/files/data');
    expect(result).toEqual(MockResponse);
  });

  test('fetches files with a file name', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ([MockResponse[0]]),
    });

    const result = await fetchFiles('test2.csv');

    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/files/data?fileName=test2.csv');
    expect(result).toEqual([MockResponse[0]]);
  });

  // ... Aquí podrías añadir más pruebas, como manejar respuestas con errores, etc.
});
