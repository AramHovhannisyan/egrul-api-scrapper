import { Request, Response, NextFunction } from 'express';
import { validateSearchQueryParams } from '../lib/validators/validateSearchQueryParams';

const validateAndSetSearchString = (req: Request, res: Response, next: NextFunction) => {
  // JOI validation
  const { error } = validateSearchQueryParams(req.query);
  if (error) {
    console.info(error.details);

    return res
      .status(400)
      .json({
        status: 'Fail',
        message: 'Invalid Request',
      });
  }

  const { keyword, page, stopped } = req.query;
  
  // Save param-s for next middlewares
  res.locals.keyword = keyword;
  res.locals.filters = [];
  res.locals.page = (page) ? +page : 1;

  if (stopped) {
    res.locals.filters.push({ stopped: (stopped === 'true') });
  }

  return next();
};

export default validateAndSetSearchString;
