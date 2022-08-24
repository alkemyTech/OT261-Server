const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
// package to handle 'multipart/form-data' content-type
const multer = require("multer");
//S3 client for aws-sdk
const { S3Client } = require("@aws-sdk/client-s3");

// access variables
const bucketName = process.env.BUCKET_NAME;
const bucketPublic = process.env.BUCKET_PUBLIC_KEY;
const bucketSecret = process.env.BUCKET_SECRET_KEY;

const S3 = new S3Client({
  credentials: {
    accessKeyId: bucketPublic,
    secretAccessKey: bucketSecret,
  },
});

// The memory storage engine stores the files in memory as Buffer objects
// memoryStorage Object
const storage = multer.memoryStorage();
// function to storage images in memory
const upload = multer({ storage: storage });

//config to upload a single image --input name image name-- middleware to use in post routes
upload.single("image");
