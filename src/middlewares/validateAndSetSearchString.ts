import { Request, Response, NextFunction } from 'express';
import { validateSearchQueryParams } from '../lib/validators/validateSearchQueryParams';

const validateAndSetSearchString = (req: Request, res: Response, next: NextFunction) => {
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

  const { string, page, stopped } = req.query;
  

  res.locals.string = string;
  res.locals.filters = [];
  res.locals.page = (page) ? +page : 1;

  if (stopped) {
    res.locals.filters.push({ stopped: (stopped === 'true') });
  }

  return next();
};

export default validateAndSetSearchString;