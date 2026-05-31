const ImageKit = require('@imageKit/nodejs');

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

({
    file:Buffer,
    fileName:'image.jpg'
})