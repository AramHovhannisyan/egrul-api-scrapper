export function getValueByKey(array: any[], key: string) {
  const foundObject = array.find(obj => obj.hasOwnProperty(key));

  return foundObject ? foundObject[key] : null;
}

export function sliceArrayTo<T>(arr: T[], count: number): T[] {
  return arr.slice(0, count);
}


export function isJsonResponse(response: Response) {
  const contentType = response.headers.get('Content-Type') || '';
  
  return contentType === 'application/json';
}

export function isStringValidJson(myJson: string): boolean {
  try {
      JSON.parse(myJson);
      return true;
  } catch (error) {
      return false;
  }
}

// Function to introduce delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
