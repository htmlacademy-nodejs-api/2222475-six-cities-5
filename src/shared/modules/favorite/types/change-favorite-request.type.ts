import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
import { ChangeFavoriteDto } from '../dto/change-favorite.dto.js';

export type ChangeFavoriteRequest = Request<RequestParams, RequestBody, ChangeFavoriteDto>;
