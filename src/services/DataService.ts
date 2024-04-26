import { config } from '../lib/config/config';
import createGetUlIpDTO from '../lib/dtos/createGetUlIpDTO';
import { filterType, OrConditionTypes } from '../lib/types/searchTypes';
import DataRepository from '../repositories/DataRepository';

class DataService {
  /**
   * Search locally
   */
  public static async searchByKeyword(searchString: string, page: number, filters: filterType[]) {
    const pageSize = +config.options.perPage;
    const skip = (page - 1) * pageSize;

    const regex = new RegExp(searchString, 'i');    

    // String conditions
    const orConditions: OrConditionTypes[] = [
      { shortName: { $regex: regex } },
      { title: { $regex: regex } },
    ];

    // Numeric conditions
    if (!isNaN(parseInt(searchString))) {
      orConditions.push(
        { inn: +searchString },
        { gosRegNum: +searchString },
        { kpp: +searchString },
      );
    }
    
    // Define the base search criteria
    const notFilteredSearch = {
      $or: orConditions
    };

    // Define filtered search criteria
    const filteredSearch = {
      $and: [
        notFilteredSearch,
        ...filters
      ]
    };

    // Apply filtered or based criteria
    const searchCriteria = filters.length ? filteredSearch : notFilteredSearch;    
    
    const results = await DataRepository.getBySearchCriteria(searchCriteria, skip, pageSize);    
    
    return results;
  }

  // Insert / Update data
  public static async saveAll(upsertData: createGetUlIpDTO[]) {
    try {
      const isSaved = await DataRepository.upsertMany(upsertData);

      return isSaved;
    } catch (error) {
      console.error(upsertData, error);

      return false;
    }
    
  }
  
}

export default DataService;