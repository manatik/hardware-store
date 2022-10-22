import { Injectable } from '@nestjs/common';
import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  private readonly SOURCE_DIR = path.join(process.cwd(), 'assets');

  async writeFileWithCompress({ filename, buffer }: { filename: string; buffer: Buffer }) {
    try {
      const compressedBuffer = await this.compressFile(buffer);
      const name = uuid.v4() + '.webp';

      await this.writeFile({ filename: name, buffer: compressedBuffer });

      return {
        filename: name,
        path: `public/${name}`,
      };
    } catch (e) {
      throw e;
    }
  }

  async compressFile(buffer: Buffer) {
    try {
      return await sharp(buffer).toFormat('webp').webp({ quality: 50 }).toBuffer();
    } catch (e) {
      throw e;
    }
  }

  async writeFile({ filename, buffer }) {
    try {
      if (!fs.existsSync(this.SOURCE_DIR)) {
        fs.mkdirSync(this.SOURCE_DIR, { recursive: true });
      }

      await fsPromises.writeFile(`${this.SOURCE_DIR}/${filename}`, buffer);
    } catch (e) {
      throw e;
    }
  }
}
