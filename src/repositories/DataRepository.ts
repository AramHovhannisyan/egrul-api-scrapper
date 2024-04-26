import { FilterQuery } from 'mongoose';
import { ErgulItem, IErgulItem } from '../lib/models/ergulModel';
import createGetUlIpDTO from '../lib/dtos/createGetUlIpDTO';

class DataRepository {
  /**
   * Search with pagination applied
   */
  public static async getBySearchCriteria(searchCriteria: FilterQuery<IErgulItem>, skip: number,pageSize: number) {
    const results = await ErgulItem
                    .find(searchCriteria)
                    .select('title shortName gosRegNum inn kpp registeredAt stopped stoppedAt')
                    .skip(skip)
                    .limit(pageSize);

      return results;
  }

  // Insert Or Update all items from API results
  public static async upsertMany(upsertData: createGetUlIpDTO[]) {

    const x: number[] = [];

    upsertData.map(e => x.push(e.gosRegNum));    

    // Store bulk operations
    const bulkOps = upsertData.map(doc => ({
      updateOne: {
          filter: { gosRegNum: Number(doc.gosRegNum) }, // The filter to find the document
          update: doc, // The update to apply
          upsert: true // Upsert option, insert if not found
      }
    }));    

    // Execute bulk write operation
    const inserted = await ErgulItem.bulkWrite(bulkOps);
    
    return inserted;
  }
}

export default DataRepository;
