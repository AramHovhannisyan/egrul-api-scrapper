import { Request, Response, NextFunction } from "express";
import DataService from "../services/DataService";
import problem from "../lib/errorHandling/problem";
import { IErgulItem } from "../lib/models/ergulModel";
import createSearchResponseDTO from "../lib/dtos/createSearchResponseDTO";

class DataController {
  /**
   * Search data locally
   * Move to next middleware if no data
   */
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    const { keyword, page, filters } = res.locals; 

    try {
      const data = await DataService.searchByKeyword(keyword, page, filters);

      if (data.length) {
        console.info('Data found in DB');

        // add custom order
        const orderedData = data.map((doc: IErgulItem) => new createSearchResponseDTO(doc));
        
        return res.status(200).json({
          status: "Success",
          page,
          data: orderedData,
        });
      }
  
      next();
    } catch (error) {
      console.error(error);
      
      next(problem(1001, req));
    }
  }
}

export default DataController;