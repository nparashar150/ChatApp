require("dotenv").config();
const { google } = require("googleapis");
const stream = require("stream");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const uploadFile = async (base64, mimeType, fileName) => {
  try {
    const uploadImg = base64.split(/,(.+)/)[1];
    const buf = new Buffer.from(uploadImg, "base64");
    const bs = new stream.PassThrough();
    bs.end(buf);

    const media = {
      body: bs,
    };
    const response = await drive.files.create({
      requestBody: {
        name: `${Date.now() + fileName}`,
        mimeType: mimeType,
      },
      media: media,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

const generatePublicUrl = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    return result;
  } catch (error) {
    return error.message;
  }
};

const deleteFile = async (fileId) => {
  try {
    const response = await drive.files.delete({
      fileId,
    });
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = { uploadFile, deleteFile, generatePublicUrl };
