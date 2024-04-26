import { Schema, model } from 'mongoose';

export interface IErgulItem {
  title: string,
  shortName?: string,
  gosRegNum: number,
  kpp: number,
  inn: number,
  registeredAt: string,
  stopped: boolean,
  stoppedAt: string,
}

const ergulItemSchema = new Schema<IErgulItem>({
  shortName: {
    type: String,
    required: false
  },
  inn: {
    type: Number,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  gosRegNum: {
    type: Number,
    unique: true,
    required: true
  },
  kpp: {
    type: Number,
    required: false
  },
  registeredAt: {
    type: String,
    required: true
  },
  stopped: {
    type: Boolean,
    default: false
  },
  stoppedAt: {
    type: String,
    required: true
  }
}, { versionKey: false });

const ErgulItem = model<IErgulItem>('Ergul-item', ergulItemSchema);

export { ErgulItem };