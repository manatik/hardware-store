import { Injectable } from "@nestjs/common";
import fsPromises from "fs/promises";
import * as path from "path";

@Injectable()
export class FilesService {
  private readonly SOURCE_DIR = path.join(process.cwd(), 'assets');

  async writeFile() {
    const data = new Uint8Array(Buffer.from('Hello Node.js'));
    await fsPromises.writeFile(this.SOURCE_DIR + 'test.txt', data)
  }
}