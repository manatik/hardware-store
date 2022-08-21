import { Injectable } from "@nestjs/common";
import * as fsPromises from "fs/promises";
import * as fs from 'fs';
import * as path from "path";
import * as sharp from 'sharp'

@Injectable()
export class FilesService {
  private readonly SOURCE_DIR = path.join(process.cwd(), 'assets');

  async writeFileWithCompress({ filename, buffer }) {
    try {
      const compressedBuffer = await this.compressFile(buffer);
      await this.writeFile({ filename, buffer: compressedBuffer });
    } catch (e) {
      throw e;
    }
  }

  async compressFile(buffer: Buffer) {
    try {
      return await sharp(buffer)
        .toFormat('webp')
        .webp({ quality: 70 })
        .toBuffer()
    } catch (e) {
      throw e;
    }
  }

  async writeFile({ filename, buffer }) {
    try {
      if (!fs.existsSync(this.SOURCE_DIR)) {
        fs.mkdirSync(this.SOURCE_DIR, { recursive: true })
      }

      await fsPromises.writeFile(`${this.SOURCE_DIR}/${filename}`, buffer);
    } catch (e) {
      throw e;
    }
  }
}