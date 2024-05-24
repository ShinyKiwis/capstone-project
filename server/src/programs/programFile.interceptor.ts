import { Injectable, NestInterceptor, Type, mixin } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";

interface ProgramFileInterceptorOptions {
  fieldName: string;
  path?: string;
}

function ProgramFileInterceptor(
  options: ProgramFileInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const fileDestination = './uploadedFiles';
      const destination = `${fileDestination}${options.path}`;

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

      this.fileInterceptor = new (FileInterceptor(options.fieldName, multerOptions))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      console.log(args);
      return this.fileInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}

export default ProgramFileInterceptor;