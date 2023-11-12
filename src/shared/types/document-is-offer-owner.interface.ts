export interface DocumentIsOfferOwner {
  isOfferOwner(offerId: string, userId: string): Promise<boolean>;
}
