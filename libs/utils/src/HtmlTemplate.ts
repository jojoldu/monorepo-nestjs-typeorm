import { Injectable } from '@nestjs/common';
import * as mustache from 'mustache';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class HtmlTemplate {
  async templateFromFile(filePath: string, data: any): Promise<string> {
    const html = await fs.readFile(
      path.join(__dirname, `../public/${filePath}.hbs`),
    );
    return this.template(html.toString(), data);
  }

  template(html: string, data: any): string {
    return mustache.render(html, data);
  }
}
