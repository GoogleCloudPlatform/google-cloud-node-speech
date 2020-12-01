// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function main(gcsUri) {
  // [START syncRecognizeWithProfanityFilter]
  // Filters profanity

  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const gcsUri = 'gs://my-bucket/audio.raw';

  async function syncRecognizeWithProfanityFilter() {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');

    // Creates a client
    const client = new speech.SpeechClient();

    const audio = {
      uri: gcsUri,
    };

    const config = {
      encoding: 'FLAC',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
      profanityFilter: true, // set this to true
    };
    const request = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  }
  syncRecognizeWithProfanityFilter().catch(console.error);
  // [END syncRecognizeWithProfanityFilter]
}

main(...process.argv.slice(2));