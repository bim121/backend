import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CountryEntity } from 'src/entity/country.entity';
import { CountrySearchBody } from 'src/interface/CountrySearchBody.interface';
import { CountrySearchResult } from 'src/interface/CountrySearchResult.interface';
 
@Injectable()
export default class CountrySearchService {
  index = 'country'
 
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}
 
  async indexCountry(country: CountryEntity) {
    return this.elasticsearchService.index<CountrySearchBody>({
      index: this.index,
      body: {
        id: country.id,
        countryName: country.countryName,
        location: country.location,
        description: country.description
      }
    })
  }
 
  async search(text: string) {
    const response = await this.elasticsearchService.search<CountrySearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'content']
          }
        }
      }
    })
    const hits = response.hits.hits;
    return hits.map((item) => item._id);
  }
}