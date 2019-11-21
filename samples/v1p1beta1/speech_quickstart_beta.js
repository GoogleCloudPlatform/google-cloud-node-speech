// Copyright 2019 Google LLC
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

// DO NOT EDIT! This is a generated sample ("Request",  "speech_quickstart_beta")

// sample-metadata:
//   title: Quickstart Beta
//   description: Performs synchronous speech recognition on an audio file
//   usage: node samples/v1p1beta1/speech_quickstart_beta.js [--storage_uri "gs://cloud-samples-data/speech/brooklyn_bridge.mp3"]

'use strict';

function main(
  storageUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.mp3'
) {
  // [START speech_quickstart_beta]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const storageUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.mp3';

  // Imports the client library
  const {SpeechClient} = require('@google-cloud/speech').v1p1beta1;

  // Instantiates a client
  const speechClient = new SpeechClient();

  async function sampleRecognize() {
    // The language of the supplied audio
    const languageCode = 'en-US';

    // Sample rate in Hertz of the audio data sent
    const sampleRateHertz = 44100;

    // Encoding of audio data sent. This sample sets this explicitly.
    // This field is optional for FLAC and WAV audio formats.
    const encoding = 'MP3';
    const config = {
      languageCode: languageCode,
      sampleRateHertz: sampleRateHertz,
      encoding: encoding,
    };
    const audio = {
      uri: storageUri,
    };

    // Construct request
    const request = {
      config: config,
      audio: audio,
    };

    // Run request
    const [response] = await speechClient.recognize(request);

    for (const result of response.results) {
      // First alternative is the most probable result
      const alternative = result.alternatives[0];
      console.log(`Transcript: ${alternative.transcript}`);
    }
  }
  sampleRecognize();
  // [END speech_quickstart_beta]
}

const argv = require(`yargs`).option('storage_uri', {
  default: 'gs://cloud-samples-data/speech/brooklyn_bridge.mp3',
  string: true,
}).argv;

main(argv.storage_uri);
