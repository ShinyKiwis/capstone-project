import { Injectable, NestInterceptor, Type, mixin } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import path from 'path';

interface ProjectFilesInterceptorOptions {
  fieldName: string;
  path?: string;
}

function ProjectFilesInterceptor(
  options: ProjectFilesInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const filesDestination = './uploadedFiles';
      const destination = `${filesDestination}${options.path}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
          filename: function (req, file, cb) {
            /*Appending extension with original name*/
            console.log('saving');
            cb(null, Date.now() + file.originalname);
            console.log('done');
          },
        }),
      };

      this.fileInterceptor = new (FilesInterceptor(options.fieldName, null, multerOptions))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      console.log(args);
      return this.fileInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}

export default ProjectFilesInterceptor;
