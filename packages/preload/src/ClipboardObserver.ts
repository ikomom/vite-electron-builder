import type {NativeImage} from 'electron';
import {clipboard} from 'electron';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import clipboardEx from 'electron-clipboard-ex';
interface Options {
  duration?: number;
  textChange?: (text: string, beforeText: string) => void;
  imageChange?: (image: NativeImage, beforeImage: NativeImage) => void;
}

class ClipboardObserver {
  timer!: NodeJS.Timeout;
  beforeText!: string;
  beforeImage!: NativeImage;

  duration;
  textChange: Options['textChange'];
  imageChange: Options['imageChange'];

  constructor(options: Options) {
    const {duration = 500, textChange, imageChange} = options;

    this.duration = duration;
    this.textChange = textChange;
    this.imageChange = imageChange;

    if (this.textChange || this.imageChange) {
      this.start();
    }
  }

  /**
   * 设置定时器
   */
  setTimer(): void {
    this.timer = setInterval(() => {
      // console.log(clipboard.has('CF_HDROP'));
      // const res = clipboard.readBuffer('CF_HDROP').toString('ucs2');
      //
      // console.log("clipboard.readBuffer('CF_HDROP').toString('ucs2')\n", res);
      // console.log('single', clipboard.readBuffer('FileNameW').toString('ucs2'));
      if (this.textChange) {
        const text = clipboard.readText();
        if (this.isDiffText(this.beforeText, text)) {
          this.textChange(text, this.beforeText);
          this.beforeText = text;
        }
      }

      if (this.imageChange) {
        const image = clipboard.readImage();
        if (this.isDiffImage(this.beforeImage, image)) {
          this.imageChange(image, this.beforeImage);
          this.beforeImage = image;
        }
      }
    }, this.duration);
  }

  /**
   * 清除定时器
   */
  clearTimer(): void {
    clearInterval(this.timer);
  }

  /**
   * 设置剪贴板默认内容
   */
  setClipboardDefaultValue(): void {
    if (this.textChange) {
      this.beforeText = clipboard.readText();
    }
    if (this.imageChange) {
      this.beforeImage = clipboard.readImage();
    }
  }

  /**
   * 判断内容是否不一致
   * @param beforeText
   * @param afterText
   * @returns
   */
  isDiffText(beforeText: string, afterText: string): boolean {
    return !!(afterText && beforeText !== afterText);
  }

  /**
   * 判断图片是否不一致
   * @param beforeImage
   * @param afterImage
   * @returns
   */
  isDiffImage(beforeImage: NativeImage, afterImage: NativeImage): boolean {
    return (
      afterImage && !afterImage.isEmpty() && beforeImage.toDataURL() !== afterImage.toDataURL()
    );
  }

  /**
   * 开始
   */
  start(): void {
    this.setClipboardDefaultValue();
    this.setTimer();
  }

  /**
   * 暂停
   */
  stop(): void {
    this.clearTimer();
  }
}

export default (params: Options) => new ClipboardObserver(params);
