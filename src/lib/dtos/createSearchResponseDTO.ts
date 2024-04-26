import { responseItemParams } from "../types/searchTypes";

export default class createSearchResponseDTO {
  title;
  shortName;
  gosRegNum;
  inn;
  kpp;
  registeredAt;
  stopped;
  stoppedAt;

  constructor(data: responseItemParams) {
    this.title = data.title;
    this.shortName = data.shortName || "";
    this.gosRegNum = +data.gosRegNum;
    this.inn = (data.inn) ? +data.inn : data.inn;
    this.kpp = (data.kpp) ? +data.kpp : data.kpp;
    this.registeredAt = data.registeredAt;
    this.stopped = data.stopped;
    this.stoppedAt = data.stoppedAt || "";
  }

}