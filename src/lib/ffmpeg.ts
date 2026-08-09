import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

class FFmpegService {
  private ffmpeg: FFmpeg | null = null;
  public isLoading = false;
  private loadPromise: Promise<FFmpeg> | null = null;

  async load(onProgress?: (ratio: number) => void): Promise<FFmpeg> {
    if (this.ffmpeg && this.ffmpeg.loaded) {
      if (onProgress) {
        this.ffmpeg.on("progress", ({ progress }) => onProgress(progress));
      }
      return this.ffmpeg;
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise(async (resolve, reject) => {
      try {
        this.isLoading = true;
        this.ffmpeg = new FFmpeg();
        
        if (onProgress) {
          this.ffmpeg.on("progress", ({ progress }) => onProgress(progress));
        }

        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
        
        await this.ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });

        this.isLoading = false;
        resolve(this.ffmpeg);
      } catch (error) {
        this.isLoading = false;
        this.loadPromise = null;
        this.ffmpeg = null;
        reject(error);
      }
    });

    return this.loadPromise;
  }
}

export const ffmpegService = new FFmpegService();
