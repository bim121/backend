export class FileDto {
    constructor(
      public readonly imageBuffer: Buffer,
      public readonly filename: string,
    ) {}
  }