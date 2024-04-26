import { config } from "../lib/config/config";
import createGetUlIpDTO from "../lib/dtos/createGetUlIpDTO";
import { createGetUlIpDTOParams, filterType } from "../lib/types/searchTypes";
import { delay, getValueByKey, isJsonResponse, isStringValidJson } from "../lib/utils/globalUtils";

class ApiRepository {
  
  /**
   * Build Cookie
   * Build Params
   * Request to get final url
   * Request to final url
   */
  public static async requestDataFromAPI(searchWord: string, page = 1): Promise<any> {  
    const cookie = await this.buildRequestCookies();
    const params: RequestInit = this.buildRequestParams(searchWord, page, cookie);
  
    const requestUrl = await this.buildRequestUrl(params);
  
    const responseBody = await this.searchRequestToAPI(requestUrl, params);

    if (!isStringValidJson(responseBody)) {
      console.log("responseBody:", responseBody);
      
      throw new Error("Invalid JSON response");
    }
    
    const responseObj = JSON.parse(responseBody);    

    return responseObj.rows;
  }

  public static async buildRequestCookies() {
    // Fetching initial URL to get the cookie
    const url = config.api.url;
    const initialResponse: Response | null = await fetch(url);
    if (!initialResponse) {
      throw new Error('Failed to fetch initial URL');
    }
  
    const cookie: string = initialResponse.headers?.get('Set-Cookie')?.split(';')[0] ?? '';
  
    return cookie;
  }

  public static async buildRequestUrl(params: RequestInit) {
    // Fetching the initial URL with parameters
    const response: Response = await fetch(config.api.url, params);
    const responseBody: string = await response.text();    

    const isResponseCorrectFormatted = await isJsonResponse(response);
    if (!isResponseCorrectFormatted) {
      console.log("response:", await response.text());
      
      throw new Error('The API request is returning an error, please try again.');
    }

    if (!isStringValidJson(responseBody)) {
      console.log(responseBody, typeof responseBody);
      
      throw new Error(responseBody);
    }

    const bodyObj = JSON.parse(responseBody);

    const urlPart: string = bodyObj.t;
    if (!urlPart ) {
      console.info("Captcha is required:", responseBody);
    }
  
    // Fetching the search result URL
    const time: number = new Date().getTime();
  
    return `${config.api.url}/search-result/${urlPart}?r=${time}&_=${time}`;
  }

  public static buildRequestParams(searchWord: string, page: number, cookie: string) {
    // Creating the request body
    const body: URLSearchParams = new URLSearchParams({
      vyp3CaptchaToken: '',
      page: `${page}`,
      query: searchWord,
      nameEq: config.api.strictMode,
      region: '',
      PreventChromeAutocomplete: ''
    });
  
    // Setting up parameters for the initial request
    const params: RequestInit = {
      headers: {
        'Cookie': cookie
      },
      method: 'POST',
      body
    };
  
    return params;
  }

  public static async searchRequestToAPI(requestUrl: string, params: RequestInit) {
    // Setting up parameters for the second request
    params.method = 'GET';
    delete params.body;
  
    // Fetching the search result URL
    const secondResponse: Response = await fetch(requestUrl, params);

    const isResponseCorrectFormatted = await isJsonResponse(secondResponse);
    if (!isResponseCorrectFormatted) {
      throw new Error('The API request is returning an error, please try again.');
    }
    
    const secondResponseBody: string = await secondResponse.text();
  
    return secondResponseBody;
  }

  /**
   * Count pages total by response items
   */
  public static getPagesCount(rows: createGetUlIpDTOParams[]) {
    if (!rows.length) {
      return 1;
    }
  
    const perPage = Number(config.options.perPage);
    const { cnt } =  rows[0];
  
    return Math.ceil(+cnt / perPage);
  }

  /**
   * Build all pages url-s to request all data, except first page data
   */
  public static async getAllPagesUrls(pagesTotal: number, searchWord: string) {
    const pagesUrls = [];
    for (let index = 2; index <= pagesTotal; index++) {
      const x = await this.buildRequestCookies();
      const params: RequestInit = this.buildRequestParams(searchWord, index, x);
      const requestUrl = await this.buildRequestUrl(params);
      pagesUrls.push(requestUrl);

      await delay(700);
    }
  
    return pagesUrls;
  }

  /**
   * Request to all pages data except the first page
   */
  public static async requestNextPagesData(pagesUrls: string[]) {
    const rejectedItems = [];
    const pagedData: createGetUlIpDTOParams[][] = [];

    const pageRequests = pagesUrls.map(url => fetch(url));

    const allPagesData = await Promise.all(pageRequests);    
    
    for (const item of allPagesData) {
      if (!isJsonResponse(item)) {
        // console.log("Problematic item", await item.text());
        console.log("pageUrl:", item.url);
        
        continue;
      }
      
      const jsonData = await item.json();
      pagedData.push(jsonData.rows);
    }

    return pagedData;
  }
  /**
   * Uses pregenerated page url-s in getAllPagesUrls, getNextPagesData
   */
  public static async getNextPagesData(pagesTotal: number, searchWord: string) {
    const pagesUrls = await this.getAllPagesUrls(pagesTotal, searchWord);
  
    const nextPagesData = await this.requestNextPagesData(pagesUrls);

    return nextPagesData;
  }

  // Merge all pages items together
  public static mergePagedDataTogether(firstPageData: createGetUlIpDTOParams[], nextPagesData: createGetUlIpDTOParams[][]) {
    nextPagesData.unshift(firstPageData);

    const allItemsTogether: createGetUlIpDTOParams[] = nextPagesData.flat();

    return allItemsTogether;
  }

  
  public static filterItems(items: createGetUlIpDTO[], filters: filterType[]) {    
    const isStopped = getValueByKey(filters, 'stopped');
    if (isStopped === null) {
      return items;
    }
    
    const filteredItems = items.filter(item => item.stopped === isStopped);

    return filteredItems;
  }

}

export default ApiRepository;
