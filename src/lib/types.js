/**
 * type aliases for the 'data types' used in the project
 * use this so that you can import the types in other files without having to import the whole file
 *
 * when importing: (just a sample, same format for all types)
 *  /** @typedef {import('../lib/types.js').DecodedImage} Decoded Image *\/
 */

/**
 * Object returned by ImageLoader.
 * Use this when manipulating the image data using other components
 *
 * @typedef {Object} DecodedImage
 * @property {string} id - A unique identifier for the image.
 * @property {string} name - The name of the image file.
 * @property {string} type - The MIME type of the image file (e.g., 'image/png', 'image/jpeg').
 * @property {number|null} size - The size of the image file in bytes.
 * @property {number} width - The width of the image in pixels.
 * @property {number} height - The height of the image in pixels.
 * @property {string} url - A base64-encoded data URL representing the image.
 * @property {'upload'|'sample'} src - The source of the image, either 'upload' for user-uploaded images or 'sample' for sample images.
 * @property {ImageData} imageData - The ImageData object containing the raw pixel data of the image. (width, height, Uint8ClampedArray data)
 * @property {HTMLCanvasElement} canvas - The HTMLCanvasElement used to draw the image.
 */

/**
 * Metadata for a sample image.
 *
 * @typedef {Object} SampleImage
 * @property {string} id - A unique identifier for the sample image.
 * @property {string} name - The name of the sample image.
 * @property {string} url - The source URL or path of the sample image.
 * @property {string} desc - The description of the sample image.
 */

/**
 * Error object returned by the ImageLoader component when an error occurs.
 *
 * @typedef {Object} ImageLoadError
 * @property {'unsupported_type'|'file_too_large'|'decode_failed'|'network_error'} code - A short error code that can be used for programmatic error handling.
 * @property {string} mssg - A descriptive error message. Can be rendered to the UI directly.
 */

/**
 *
 * used in ImageInput.jsx to define the props for the component
 *
 * @typedef {Object} ImageInputProps
 * @property {(image: DecodedImage) => void} onImageLoad - Callback function that is called when an image is successfully loaded. Receives a DecodedImage object as an argument.
 * @property {(error: ImageLoadError) => void} [onError] - Optional callback function that is called when an error occurs during image loading. Receives an ImageLoadError object as an argument.
 * @property {number} [maxFileSizeMB=10] - Optional maximum file size in megabytes for uploaded images. Defaults to 10 MB.
 * @property {string[]} [acceptedTypes] - Optional array of accepted MIME types for uploaded images. If not provided, defaults to common image types (e.g., 'image/png', 'image/jpeg').
 */

export {};
