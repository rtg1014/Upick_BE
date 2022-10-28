import {
  S3Client,
  PutObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ReadStream } from 'fs';
import { S3_BUCKET_NAME, S3_REGION } from 'src/config/s3.config';
const { S3_AWSACCESS_KEY_ID, S3_AWS_SECRET_ACCESS_KEY, CLOUD_FRONT_URL } =
  process.env;

@Injectable()
export class S3Service {
  public region = S3_REGION;
  public bucket = S3_BUCKET_NAME;
  private client = new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_AWSACCESS_KEY_ID,
      secretAccessKey: S3_AWS_SECRET_ACCESS_KEY,
    },
  });

  async upload(
    key: string,
    file: Buffer | ReadStream,
    contentType: string,
  ): Promise<boolean> {
    const input: PutObjectCommandInput = {
      Key: key,
      Bucket: this.bucket,
      Body: file,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(input);
    const result: PutObjectCommandOutput = await this.client.send(command);

    return result.$metadata.httpStatusCode === 200;
  }

  private get baseURL() {
    return CLOUD_FRONT_URL;
  }

  public getFileURLByKey(key: string): string {
    return `${this.baseURL}/${key}`;
  }
}
