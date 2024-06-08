import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class MetadataService {
  async fetchMetadata(url: string) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const title = $('head > title').text();
      const description = $('meta[name="description"]').attr('content');

      return { title, description };
    } catch (error) {
      throw new HttpException(
        'Error fetching data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
