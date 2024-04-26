import createGetUlIpDTO from "../lib/dtos/createGetUlIpDTO";
import { createGetUlIpDTOParams, filterType } from "../lib/types/searchTypes";
import { sliceArrayTo } from "../lib/utils/globalUtils";
import ApiRepository from "../repositories/ApiRepository";
import DataService from "./DataService";

class ApiService {

  public static async getAllFilteredDataByKeyword(searchString: string, filters: filterType[]) {
    const allData = await ApiService.getAllPagesItems(searchString);
    if (!allData) {
      return null;
    }
    
    const allDataDTO = allData.map((item: createGetUlIpDTOParams) => new createGetUlIpDTO(item));

    const allDataFIltered = await ApiService.filterAllPagesItems(allDataDTO, filters);
    if (!allDataFIltered) {
      return null;
    }
    
    const firstPageData = sliceArrayTo(allDataFIltered, 20);

    // save all data
    await DataService.saveAll(allDataFIltered);

    return firstPageData;
  }

  /**
   * Figure out all pages and get items from all
   */
  public static async getAllPagesItems(searchString: string) {
    const firstPageData = await ApiRepository.requestDataFromAPI(searchString);
    
    if (!firstPageData.length) {
      return null;
    }

    const pagesTotal = ApiRepository.getPagesCount(firstPageData);

    if (pagesTotal < 2) {
      return firstPageData;
    }

    const nextPagesData = await ApiRepository.getNextPagesData(pagesTotal, searchString);
    const allPagesItems = ApiRepository.mergePagedDataTogether(firstPageData, nextPagesData);

    return allPagesItems;
  }

  /**
   * Filter all items by req.filters
   */
  public static async filterAllPagesItems(data: createGetUlIpDTO[], filters: filterType[]) {
    if (filters.length) {
      const allPagesItems = ApiRepository.filterItems(data, filters);
      if (!allPagesItems.length) {
        return null;
      }

      return allPagesItems;
    }

    return data;
  }
}

export default ApiService;
