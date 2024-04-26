import { createGetUlIpDTOParams } from "../types/searchTypes";

export default class createGetUlIpDTO {
  title;
  shortName;
  gosRegNum;
  inn;
  kpp;
  registeredAt;
  stopped;
  stoppedAt;

  constructor(data: createGetUlIpDTOParams) {
    this.title = data.n;
    this.shortName = data.c;
    this.gosRegNum = +data.o;
    this.inn = (data.i) ? +data.i : null;
    this.kpp = (data.p) ? +data.p : null;
    this.registeredAt = data.r;
    this.stopped = (data.e) ? true : false;
    this.stoppedAt = data.e || "";
  }

}