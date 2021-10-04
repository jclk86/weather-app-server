require("dotenv").config();

const { expect } = require("chai");
const supertest = require("supertest");
const nock = require("nock");

global.expect = expect;
global.supertest = supertest;
global.nock = nock;
