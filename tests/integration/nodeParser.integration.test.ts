import { fetchFigmaTree } from '../../src/api/figmaClient';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('figmaClient', () => {
  it('fetches Figma file tree', async () => {
    // Mock API response
    mockedAxios.get.mockResolvedValue({
      data: {
        document: {
          type: 'DOCUMENT',
          id: '0:0',
          name: 'Document',
          children: [],
        },
      },
    });

    const tree = await fetchFigmaTree('valid_key');
    expect(tree).toHaveProperty('type', 'DOCUMENT');
  });
});
