import { CountrySearchBody } from "./CountrySearchBody.interface";

export interface CountrySearchResult {
    hits: {
      total: number;
      hits: Array<{
        _source: CountrySearchBody;
      }>;
    };
  }