const fileInput = document.querySelector('#imageFileInput') as HTMLInputElement;
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const canvasCtx = canvas.getContext('2d');
const brightnessInput = document.querySelector('#brightness') as HTMLInputElement;
const saturationInput = document.querySelector('#saturation') as HTMLInputElement;
const blurInput = document.querySelector('#blur') as HTMLInputElement;
const inversionInput = document.querySelector('#inversion') as HTMLInputElement;

const settings = {} as Record<string, any>;
let image = null;

function resetSettings() {
  settings.brightness = '100';
  settings.saturation = '100';
  settings.blur = '0';
  settings.inversion = '0';

  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  inversionInput.value = settings.inversion;
}

function updateSetting(key: string, value: string) {
  if (!image) return;

  settings[key] = value;
  renderImage();
}

function generateFilter() {
  const { brightness, saturation, blur, inversion } = settings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;

  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0);
}

export default function () {
  brightnessInput.addEventListener('change', () => updateSetting('brightness', brightnessInput.value));
  saturationInput.addEventListener('change', () => updateSetting('saturation', saturationInput.value));
  blurInput.addEventListener('change', () => updateSetting('blur', blurInput.value));
  inversionInput.addEventListener('change', () => updateSetting('inversion', inversionInput.value));

  fileInput.addEventListener('change', () => {
    image = new Image();

    image.addEventListener('load', () => {
      resetSettings();
      renderImage();
    });

    image.src = URL.createObjectURL(fileInput.files[0]);
  });

  resetSettings();
}
