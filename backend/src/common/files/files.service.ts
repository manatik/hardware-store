import { Injectable } from '@nestjs/common';
import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import * as uuid from 'uuid';

export enum Extname {
  PNG = '.png',
  JPG = '.jpg',
  WEBP = '.webp',
}

@Injectable()
export class FilesService {
  private readonly SOURCE_DIR = path.join(process.cwd(), 'assets');

  async writeFileWithCompress({ filename, buffer, size = 0 }: { filename: string; buffer: Buffer; size?: number }) {
    try {
      const ext = path.extname(filename);
      const compressedBuffer = await this.compressFile(buffer, ext);
      const name = uuid.v4() + ext;

      await this.writeFile({ filename: name, buffer: compressedBuffer });

      return {
        filename: name,
        originalFilename: filename.split('.')?.[0] || filename,
        path: `/uploads/${name}`,
        size,
      };
    } catch (e) {
      throw e;
    }
  }

  async compressFile(buffer: Buffer, ext: string) {
    const imageOpt = { quality: 70 };
    const width = 1366;
    const height = 768;
    const opt: any = { fit: 'outside' };

    try {
      switch (ext) {
        case Extname.JPG:
          return await sharp(buffer).jpeg(imageOpt).resize(width, height, opt).toBuffer();
        case Extname.PNG:
          return await sharp(buffer).png().resize(width, height, opt).toBuffer();
        case Extname.WEBP:
          return await sharp(buffer).webp(imageOpt).resize(width, height, opt).toBuffer();
        default:
          throw new Error('Неправильный формат фото, принимается только PNG, JPG, WEBP');
      }
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

      return {
        success: true,
        message: 'Файл успешно записан',
      };
    } catch (e) {
      throw e;
    }
  }

  async removeFile(filename: string) {
    try {
      await fsPromises.rm(`${this.SOURCE_DIR}/${filename}`);

      return {
        success: true,
        message: 'Файл успешно удалён',
      };
    } catch (e) {
      throw e;
    }
  }
}
