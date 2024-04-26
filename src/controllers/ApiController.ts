import { Request, Response, NextFunction } from 'express';
import ApiService from '../services/ApiService';
import problem from '../lib/errorHandling/problem';

class ApiController {
  public static async searchData(req: Request, res: Response, next: NextFunction) {
    const { string, filters } = res.locals;
    
    try {
      const allData = await ApiService.getAllFilteredDataByKeyword(string, filters);
      if (!allData) {
        return res.status(404).json({
          status: "Fail",
          message: "Not found",
        });
      }      
    
      return res.status(200).json({
        status: "Success",
        page: 1,
        data: allData,
      });
    } catch (error) {
      console.error('error:', error);
      
      next(problem(1001, req));
    }
  }
}

export default ApiController;
