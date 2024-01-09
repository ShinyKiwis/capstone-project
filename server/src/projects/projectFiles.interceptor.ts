import { Injectable, NestInterceptor, Type, mixin } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import path from "path";

interface ProjectFilesInterceptorOptions {
  fieldName: string;
  path?: string;
}

function ProjectFilesInterceptor(options: ProjectFilesInterceptorOptions): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const filesDestination = "./uploadedFiles";
      const destination = `${filesDestination}${options.path}`

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
          filename: function (req, file, cb) {
            /*Appending extension with original name*/
            cb(null, Date.now() + file.originalname)
          }
        })
      }

      this.fileInterceptor = new (FileInterceptor(options.fieldName, multerOptions));
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}

export default ProjectFilesInterceptor;