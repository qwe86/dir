﻿var hanaClient = require("@sap/hana-client");
const path = require('path');
var mysql = require('mysql');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var rexec = require('remote-exec');
var child = require('child_process');
var db_check = false;
var res = "!"
var fs = require('fs');
var XLSX = require('xlsx');
var i;
var data;
var vbs_script = "{'type':'Buffer','data':[68,105,109,32,106,44,32,105,44,32,99,111,117,110,116,44,32,100,97,121,44,32,98,101,103,105,110,95,116,105,109,101,44,32,101,110,100,95,116,105,109,101,44,32,116,105,109,101,95,109,111,109,101,110,116,13,10,73,102,32,78,111,116,32,73,115,79,98,106,101,99,116,40,97,112,112,108,105,99,97,116,105,111,110,41,32,84,104,101,110,13,10,32,32,32,83,101,116,32,83,97,112,71,117,105,65,117,116,111,32,32,61,32,71,101,116,79,98,106,101,99,116,40,34,83,65,80,71,85,73,34,41,13,10,32,32,32,83,101,116,32,97,112,112,108,105,99,97,116,105,111,110,32,61,32,83,97,112,71,117,105,65,117,116,111,46,71,101,116,83,99,114,105,112,116,105,110,103,69,110,103,105,110,101,13,10,69,110,100,32,73,102,13,10,73,102,32,78,111,116,32,73,115,79,98,106,101,99,116,40,99,111,110,110,101,99,116,105,111,110,41,32,84,104,101,110,13,10,32,32,32,83,101,116,32,99,111,110,110,101,99,116,105,111,110,32,61,32,97,112,112,108,105,99,97,116,105,111,110,46,67,104,105,108,100,114,101,110,40,48,41,13,10,69,110,100,32,73,102,13,10,73,102,32,78,111,116,32,73,115,79,98,106,101,99,116,40,115,101,115,115,105,111,110,41,32,84,104,101,110,13,10,32,32,32,83,101,116,32,115,101,115,115,105,111,110,32,32,32,32,61,32,99,111,110,110,101,99,116,105,111,110,46,67,104,105,108,100,114,101,110,40,48,41,13,10,69,110,100,32,73,102,13,10,73,102,32,73,115,79,98,106,101,99,116,40,87,83,99,114,105,112,116,41,32,84,104,101,110,13,10,32,32,32,87,83,99,114,105,112,116,46,67,111,110,110,101,99,116,79,98,106,101,99,116,32,115,101,115,115,105,111,110,44,32,32,32,32,32,34,111,110,34,13,10,32,32,32,87,83,99,114,105,112,116,46,67,111,110,110,101,99,116,79,98,106,101,99,116,32,97,112,112,108,105,99,97,116,105,111,110,44,32,34,111,110,34,13,10,69,110,100,32,73,102,13,10,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,34,41,46,109,97,120,105,109,105,122,101,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,116,98,97,114,91,48,93,47,111,107,99,100,34,41,46,116,101,120,116,32,61,32,34,115,116,48,51,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,116,98,97,114,91,48,93,47,98,116,110,91,48,93,34,41,46,112,114,101,115,115,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,47,115,104,101,108,108,99,111,110,116,91,49,93,47,115,104,101,108,108,34,41,46,101,120,112,97,110,100,78,111,100,101,32,34,67,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,47,115,104,101,108,108,99,111,110,116,91,49,93,47,115,104,101,108,108,34,41,46,101,120,112,97,110,100,78,111,100,101,32,34,67,46,50,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,47,115,104,101,108,108,99,111,110,116,91,49,93,47,115,104,101,108,108,34,41,46,116,111,112,78,111,100,101,32,61,32,34,66,34,13,10,13,10,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,47,115,104,101,108,108,99,111,110,116,91,49,93,47,115,104,101,108,108,34,41,46,115,101,108,101,99,116,101,100,78,111,100,101,32,61,32,34,67,46,50,46,34,32,43,32,34,105,110,115,116,97,110,99,101,115,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,47,115,104,101,108,108,99,111,110,116,91,49,93,47,115,104,101,108,108,34,41,46,100,111,117,98,108,101,67,108,105,99,107,78,111,100,101,32,34,67,46,50,46,34,32,43,32,34,105,110,115,116,97,110,99,101,115,34,13,10,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,99,116,120,116,83,65,80,87,76,76,77,73,78,76,45,70,82,69,67,68,65,89,34,41,46,116,101,120,116,32,61,32,34,105,110,112,117,116,95,100,97,116,101,34,59,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,99,116,120,116,83,65,80,87,76,76,77,73,78,76,45,70,82,69,67,84,73,77,69,34,41,46,116,101,120,116,32,61,32,34,105,110,112,117,116,95,98,101,103,105,110,95,116,105,109,101,34,43,34,48,48,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,99,116,120,116,83,65,80,87,76,76,77,73,78,76,45,76,82,69,67,84,73,77,69,34,41,46,116,101,120,116,32,61,32,34,105,110,112,117,116,95,101,110,100,95,116,105,109,101,34,43,34,48,48,34,13,10,100,97,121,32,61,32,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,99,116,120,116,83,65,80,87,76,76,77,73,78,76,45,70,82,69,67,68,65,89,34,41,46,116,101,120,116,13,10,98,101,103,105,110,95,116,105,109,101,32,61,32,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,99,116,120,116,83,65,80,87,76,76,77,73,78,76,45,70,82,69,67,84,73,77,69,34,41,46,116,101,120,116,13,10,101,110,100,95,116,105,109,101,32,61,32,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,99,116,120,116,83,65,80,87,76,76,77,73,78,76,45,76,82,69,67,84,73,77,69,34,41,46,116,101,120,116,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,116,120,116,83,65,80,87,76,76,77,73,78,76,45,84,73,77,69,82,69,83,34,41,46,116,101,120,116,32,61,32,34,49,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,116,120,116,83,65,80,87,76,76,77,73,78,76,45,84,73,77,69,82,69,83,34,41,46,115,101,116,70,111,99,117,115,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,116,120,116,83,65,80,87,76,76,77,73,78,76,45,84,73,77,69,82,69,83,34,41,46,99,97,114,101,116,80,111,115,105,116,105,111,110,32,61,32,50,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,51,48,48,47,98,116,110,71,95,79,75,67,79,68,69,34,41,46,112,114,101,115,115,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,47,115,104,101,108,108,99,111,110,116,91,50,93,47,115,104,101,108,108,34,41,46,115,101,108,101,99,116,101,100,78,111,100,101,32,61,32,34,69,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,47,115,104,101,108,108,99,111,110,116,91,50,93,47,115,104,101,108,108,34,41,46,100,111,117,98,108,101,67,108,105,99,107,78,111,100,101,32,34,69,34,13,10,99,111,117,110,116,32,61,32,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,49,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,49,48,47,116,97,98,115,71,95,84,65,66,83,84,82,73,80,47,116,97,98,112,84,65,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,50,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,51,48,47,99,110,116,108,65,76,86,67,79,78,84,65,73,78,69,82,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,34,41,46,114,111,119,67,111,117,110,116,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,49,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,49,48,47,116,97,98,115,71,95,84,65,66,83,84,82,73,80,47,116,97,98,112,84,65,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,50,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,51,48,47,99,110,116,108,65,76,86,67,79,78,84,65,73,78,69,82,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,34,41,46,112,114,101,115,115,84,111,111,108,98,97,114,67,111,110,116,101,120,116,66,117,116,116,111,110,32,34,38,77,66,95,69,88,80,79,82,84,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,49,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,49,48,47,116,97,98,115,71,95,84,65,66,83,84,82,73,80,47,116,97,98,112,84,65,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,50,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,51,48,47,99,110,116,108,65,76,86,67,79,78,84,65,73,78,69,82,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,34,41,46,115,101,108,101,99,116,67,111,110,116,101,120,116,77,101,110,117,73,116,101,109,32,34,38,88,88,76,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,116,98,97,114,91,48,93,47,98,116,110,91,48,93,34,41,46,112,114,101,115,115,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,117,115,114,47,99,116,120,116,68,89,95,80,65,84,72,34,41,46,116,101,120,116,32,61,32,34,68,58,92,83,116,97,116,105,99,116,105,99,115,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,117,115,114,47,99,116,120,116,68,89,95,70,73,76,69,78,65,77,69,34,41,46,116,101,120,116,32,61,32,34,105,110,115,116,95,34,32,43,32,67,115,116,114,40,105,41,32,43,34,46,88,76,83,88,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,117,115,114,47,99,116,120,116,68,89,95,80,65,84,72,34,41,46,99,97,114,101,116,80,111,115,105,116,105,111,110,32,61,32,51,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,116,98,97,114,91,48,93,47,98,116,110,91,49,49,93,34,41,46,112,114,101,115,115,13,10,70,111,114,32,106,32,61,32,48,32,116,111,32,99,111,117,110,116,45,49,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,49,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,49,48,47,116,97,98,115,71,95,84,65,66,83,84,82,73,80,47,116,97,98,112,84,65,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,50,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,51,48,47,99,110,116,108,65,76,86,67,79,78,84,65,73,78,69,82,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,34,41,46,99,117,114,114,101,110,116,67,101,108,108,67,111,108,117,109,110,32,61,32,34,82,69,83,80,77,84,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,49,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,49,48,47,116,97,98,115,71,95,84,65,66,83,84,82,73,80,47,116,97,98,112,84,65,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,50,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,51,48,47,99,110,116,108,65,76,86,67,79,78,84,65,73,78,69,82,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,34,41,46,99,117,114,114,101,110,116,67,101,108,108,82,111,119,32,61,32,106,13,10,116,105,109,101,95,109,111,109,101,110,116,32,61,32,32,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,49,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,49,48,47,116,97,98,115,71,95,84,65,66,83,84,82,73,80,47,116,97,98,112,84,65,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,50,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,51,48,47,99,110,116,108,65,76,86,67,79,78,84,65,73,78,69,82,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,34,41,46,103,101,116,67,101,108,108,86,97,108,117,101,40,106,44,34,84,73,77,69,34,41,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,117,115,114,47,115,115,117,98,83,85,66,83,67,82,69,69,78,95,48,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,49,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,49,48,47,116,97,98,115,71,95,84,65,66,83,84,82,73,80,47,116,97,98,112,84,65,48,48,47,115,115,117,98,87,76,95,83,85,66,83,67,82,69,69,78,95,50,58,83,65,80,87,76,95,83,84,48,51,78,58,49,49,51,48,47,99,110,116,108,65,76,86,67,79,78,84,65,73,78,69,82,47,115,104,101,108,108,99,111,110,116,47,115,104,101,108,108,34,41,46,100,111,117,98,108,101,67,108,105,99,107,67,117,114,114,101,110,116,67,101,108,108,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,91,49,93,47,115,104,101,108,108,34,41,46,112,114,101,115,115,84,111,111,108,98,97,114,67,111,110,116,101,120,116,66,117,116,116,111,110,32,34,38,77,66,95,69,88,80,79,82,84,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,91,49,93,47,115,104,101,108,108,34,41,46,115,101,108,101,99,116,67,111,110,116,101,120,116,77,101,110,117,73,116,101,109,32,34,38,88,88,76,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,116,98,97,114,91,48,93,47,98,116,110,91,48,93,34,41,46,112,114,101,115,115,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,117,115,114,47,99,116,120,116,68,89,95,80,65,84,72,34,41,46,116,101,120,116,32,61,32,34,68,58,92,83,116,97,116,105,99,116,105,99,115,92,80,72,82,92,100,105,49,112,104,114,34,13,10,116,105,109,101,95,109,111,109,101,110,116,32,61,32,82,101,112,108,97,99,101,40,116,105,109,101,95,109,111,109,101,110,116,44,32,34,58,34,44,34,95,34,41,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,117,115,114,47,99,116,120,116,68,89,95,70,73,76,69,78,65,77,69,34,41,46,116,101,120,116,32,61,32,67,83,116,114,40,105,41,32,43,34,95,34,32,43,32,116,105,109,101,95,109,111,109,101,110,116,32,43,32,34,46,88,76,83,88,34,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,117,115,114,47,99,116,120,116,68,89,95,70,73,76,69,78,65,77,69,34,41,46,99,97,114,101,116,80,111,115,105,116,105,111,110,32,61,32,52,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,49,93,47,116,98,97,114,91,48,93,47,98,116,110,91,49,49,93,34,41,46,112,114,101,115,115,13,10,115,101,115,115,105,111,110,46,102,105,110,100,66,121,73,100,40,34,119,110,100,91,48,93,47,115,104,101,108,108,99,111,110,116,91,49,93,34,41,46,99,108,111,115,101,13,10,78,101,120,116,13,10,13,10]}"
// var connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'Alexvent555666!',
// });
var connection = hanaClient.createConnection();
var connection1 = hanaClient.createConnection();
// see documentation for the ssh2 npm package for a list of all options 

var hana_option_haq = {
	host: 'hanahaq',
	port: 36215,
	username: 'SYSTEM',
	password: 'SYS_hanaHAP1',
	databaseName: 'HAQ'
};
var hana_option_had = {
	host: 'hanahad',
	port: 36115,
	username: 'SYSTEM',
	password: 'HADh4n4SYS1',
	databaseName: 'HAD'
};

const connection_options = {
	port: 22,
	username: 'pbwadm',
	privateKey: require('fs').readFileSync('C:/Users/Bazhaev_AB/Desktop/keys/id_rsa'),
	passphrase: 'Lo4815162342!',
	stdout: fs.createWriteStream('./output.txt')
};
var hosts = [
	'sdx12-01'
];

var cmds = [
	'top -b -n 1 | grep bw0adm | grep hdbind+'
];

var urlencodedParser = bodyParser.urlencoded({ extended: false })
function cpu() {
	rexec(hosts, cmds, connection_options, function(err){
		if (err) {
			console.log(err);
		} else {
			fs.readFile("./output.txt", 'UTF8', function (err, buf) {
				io.emit("response",buf);
			});
		}
		});
	
}

function hana_locks1() {
	connection1.connect(hana_option_had, (err) => {
		if (err) {
			io.emit("err_db", JSON.stringify(err));
			//return console.error("Connection error", err);
		}

		const whereClause = process.argv[2] ? `WHERE "group" = '${process.argv[2]}'` : "";
		const sql = 'select count(*) from SYS.M_TABLE_LOCKS';
		
		connection1.exec(sql, (err, rows) => {
			connection1.disconnect();

			if (err) {
				return console.error('SQL execute error:', err);
			}
			//console.log(rows);
			io.emit("response_db", JSON.stringify(rows));
			//console.log(`Query '${sql}' returned ${rows.length} items`);
		});
		});
}



app.use(bodyParser.urlencoded({ extended: false }))

app.use("/", require('express').static(__dirname + '/public'));

app.get('/', urlencodedParser, function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
function go() {
	console.log("End!!");
}
io.on('connection', function (client) {
    
    client.on('import_vbs', function (data) {
		
		var content = Buffer.from(((fs.readFileSync('D:\x2FJs\x2Fst03.vbs', 'utf-8'))))
		var json = JSON.stringify(content)
		console.log(JSON.parse(json).data.ToString('utf-8'));
		//fs.writeFileSync('D:\x2FJs\x2Ffile.txt', Buffer.from(JSON.stringify(content)))
		//console.log(content.toString('utf-8'))
		/*var instance_count = 0;
		console.log(data);
		data = data.split("_");
		var date = data[1].split('-')[2] +"."+data[1].split('-')[1]+"." + data[1].split('-')[0];
		switch (data[0]) {
			case "R3R":
				instance_count = 11;
				break;
			case "ECP":
				instance_count = 5;
				break;
			case "PHR":
				instance_count = 5;
				break;
		}
		var content = fs.readFileSync('D:\x2FJs\x2Fst03.vbs', 'utf8');
		content = content.replace("input_date", date);
		content = content.replace("instances", instance_count);
		content = content.replace("instances", instance_count);
		content = content.replace("input_begin_time", data[2]);
		content = content.replace("input_end_time", data[3]);
		fs.writeFileSync('D:\x2FJs\x2Fst03_1.vbs', content);
		const util = require("util");
		const { exec } = require("child_process");
		const execProm = util.promisify(exec);
		
		async function run_shell_command(command) {
		   let result = "!!";
		   try {
			 result = await execProm(command);
		   } catch(ex) {
			  result = ex;
		   }
		   if ( Error[Symbol.hasInstance](result) )
			   return ;
			res = result;
		   return result;
		}
		run_shell_command("cscript D:\x2Flogin.vbs").then(result =>	adding(JSON.stringify(result)));*/
	});
	client.on("db_activate", function (data) {
		setInterval(cpu, 2000);
		setInterval(hana_locks1, 2000);
	});
	
    
});

//connection.connect();
//занесение данных в бд
function adding(resp) {
	var workbook = XLSX.readFile("D:\x2F1.xlsx");
	
		const wsname = workbook.SheetNames[0];
		const ws = workbook.Sheets[wsname];
		for (i = 2; i <= 18; i++) {
			console.log(ws["A" + i.toString()].v);
		}
}
function intervalFunc() {
    var retValue;

    var query = connection.query('SELECT count(*) FROM db.example;');
    query
        .on('error', function (err) {
            
        })
        .on('fields', function (fields) {
            
        })
        .on('result', function (row) {
            
            connection.pause();
            processRow(row);
            console.log(retValue); 
        })
        .on('end', function (row) {

        });
    
    function processRow(rows) {
        retValue = rows;
    }

    console.log(retValue); 
}



http.listen(3000, function () {
    console.log('listening on *:3000');
});