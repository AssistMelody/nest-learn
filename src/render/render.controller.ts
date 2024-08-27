import { Controller, Get, Param } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { readFileSync } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';
import * as data from '../../static/config.json';

function readHbs(name: string) {
  return (context) => {
    const temp = readFileSync(
      join(process.cwd(), `static/${name}.hbs`),
      'utf-8',
    );
    const template = Handlebars.compile(temp);
    return template(context);
  };
}

Handlebars.registerPartial({
  text: readHbs('base-text'),
  STANDARD_FOUR_IMAGE_TEXT: readHbs('four-image-text'),
  STANDARD_THREE_IMAGE_TEXT: readHbs('three-image-text'),
  STANDARD_FOUR_IMAGE_TEXT_QUADRANT: readHbs('four-image-text-quadrant'),
  STANDARD_TEXT: readHbs('text'),
  STANDARD_TECH_SPECS: readHbs('teach-specs'),
  STANDARD_COMPARISON_TABLE: readHbs('comparison-table'),
  STANDARD_SINGLE_SIDE_IMAGE: readHbs('single-side-image'),
  STANDARD_COMPANY_LOGO: readHbs('company-logo'),
  STANDARD_HEADER_IMAGE_TEXT: readHbs('header-image-text'),
  STANDARD_PRODUCT_DESCRIPTION: readHbs('product-description'),
  STANDARD_IMAGE_TEXT_OVERLAY: readHbs('image-text-overlay'),
  STANDARD_MULTIPLE_IMAGE_TEXT: readHbs('multiple-image-text'),
});

Handlebars.registerHelper('moduleType', function (obj, key) {
  return obj[key];
});

Handlebars.registerHelper('isRight', function (value) {
  return value == 'RIGHT';
});

@Controller('render')
export class RenderController {
  @Get('/:mode')
  async getHtml(@Param('mode') mode: string) {
    const result = await readFile(
      join(process.cwd(), `static/main.hbs`),
      'utf-8',
    );
    const moduleList = data.contentDocument.contentModuleList;
    const template = Handlebars.compile(result);
    return template({ moduleList });
  }
}
