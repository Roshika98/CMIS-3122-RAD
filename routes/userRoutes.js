const express = require('express');
const db = require('../database/dbHandler');
const router = express.Router();
const pdfContent = require('../utility/pdfCreator');
const puppeteer = require('puppeteer');