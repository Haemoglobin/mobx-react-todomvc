#!/usr/bin/env node
var path = require('path');
var fs = require('fs');

(global as any).__CLIENT__ = false;
(global as any).__SERVER__ = true;

require('../src/server');
