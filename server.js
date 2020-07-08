/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const express = require('express');
const app = express();
const hbs = require('hbs');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', './views');
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let origin = process.env.ORIGIN;

app.use((req, res, next) => {
  if (!origin) {
    origin = `${req.headers.protocol||'http'}://${req.headers.host}`;
    console.log(`Origin: "${origin}" was set because it was undefined.`);
  }
  if (!/^http:\/\/localhost/.test(origin) &&
      req.get('x-forwarded-proto') &&
     (req.get('x-forwarded-proto')).split(',')[0] !== 'https') {
    return res.redirect(301, `${origin}`);
  }
  req.schema = 'https';
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.render('index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 8080, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
