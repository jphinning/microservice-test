import { Processor, WorkerHost } from '@nestjs/bullmq';
import * as AdmZip from 'adm-zip';
import { Job } from 'bullmq';

@Processor('image')
export class OptimizeProcessor extends WorkerHost {
  async process(job: Job) {
    const files: Express.Multer.File[] = job.data.files;

    const optimizationPromises: Buffer[] = files.map((file) => {
      const fileBuffer = Buffer.from(file.buffer);
      return fileBuffer;
    });

    const optimizedImages = await Promise.all(optimizationPromises);

    const zip = new AdmZip();

    optimizedImages.forEach((image, index) => {
      const fileData = files[index];
      zip.addFile(fileData.originalname, image);
    });

    return zip.toBuffer();
  }
}
