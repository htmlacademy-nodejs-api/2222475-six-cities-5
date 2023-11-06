import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Location, OfferTypeEnum } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public previewImage!: string;

  @prop({default: []})
  public images!: string[];

  @prop()
  public createdDate!: Date;

  @prop()
  public price!: number;

  @prop()
  public city!: string;

  @prop({default: 0})
  public rating!: number;

  @prop({default: false})
  public isPremium!: boolean;

  @prop({default: false})
  public isFavorite!: boolean;

  @prop({
    type: () => String,
    enum: OfferTypeEnum
  })
  public type!: OfferTypeEnum;

  @prop({default: 0})
  public bedrooms!: number;

  @prop({default: 0})
  public maxAdults!: number;

  @prop({default: []})
  public goods!: string[];

  @prop({default: []})
  public location!: Location;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
