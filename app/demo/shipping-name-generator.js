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
window.namegen = () => {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const adjectives = [
    'Super',
    'Mega',
    'Crazy',
    'Happy Times',
    'Meh',
    'The Worst',
    'Premium',
  ];

  const verbs = [
    'Slow',
    'Speedy',
    'Unreliable',
    'Route',
    'Swift',
    'Hasty',
    'Prompt',
  ];

  const randomAdj = adjectives[getRandomNumber(0, adjectives.length)];
  const randomVerb = verbs[getRandomNumber(0, verbs.length)];

  return `${randomAdj} ${randomVerb} Shipping`;
};
