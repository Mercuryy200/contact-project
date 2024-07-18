const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

module.exports = class FileHandler {
  sendHtml(contentType, filename, res) {
    const fileToSend = path.join(__dirname, "/../assets/content/" + filename);
    fs.readFile(fileToSend, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("LE CONTENU EST INTROUVABLE!");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data, "binary");
      }
    });
  }

  sendIndex(res) {
    const fileToSend = path.join(__dirname, "/../assets/content/index.html");
    fs.readFile(fileToSend, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("LE CONTENU EST INTROUVABLE!");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data, "binary");
      }
    });
  }

  sendImage(contentType, filename, res) {
    const fileToSend = path.join(__dirname, "/../assets/img/" + filename);
    if (this.isImageRequest(fileToSend)) {
      fs.readFile(fileToSend, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("LE CONTENU EST INTROUVABLE!");
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data, "binary");
        }
      });
    }
  }

  sendCss(contentType, filename, res) {
    const fileToSend = path.join(__dirname, "/../css/" + filename);
    if (this.isCssRequest(fileToSend)) {
      fs.readFile(fileToSend, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("LE CONTENU EST INTROUVABLE!");
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data, "binary");
        }
      });
    }
  }

  sendJs(contentType, filename, res) {
    const fileToSend = path.join(__dirname, "/../assets/content/" + filename);
    fs.readFile(fileToSend, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("LE CONTENU EST INTROUVABLE!");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data, "binary");
      }
    });
  }

  isImageRequest(url) {
    let repImage = new RegExp("img");
    return repImage.test(url);
  }

  isCssRequest(url) {
    let repCss = new RegExp("css");
    return repCss.test(url);
  }
};
