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

// DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_sync_gcs")

// sample-metadata:
//   title: Transcript Audio File (Cloud Storage)
//   description: Transcribe short audio file from Cloud Storage using synchronous speech recognition
//   usage: node samples/v1/speech_transcribe_sync_gcs.js [--storage_uri "gs://cloud-samples-data/speech/brooklyn_bridge.raw"]

'use strict';

// [START speech_transcribe_sync_gcs]

const {SpeechClient} = require('@google-cloud/speech').v1;

/**
 * Transcribe short audio file from Cloud Storage using synchronous speech recognition
 *
 * @param storageUri {string} URI for audio file in Cloud Storage, e.g. gs://[BUCKET]/[FILE]
 */
function sampleRecognize(storageUri) {
  const client = new SpeechClient();
  // const storageUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

  // Sample rate in Hertz of the audio data sent
  const sampleRateHertz = 16000;

  // The language of the supplied audio
  const languageCode = 'en-US';

  // Encoding of audio data sent. This sample sets this explicitly.
  // This field is optional for FLAC and WAV audio formats.
  const encoding = 'LINEAR16';
  const config = {
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    encoding: encoding,
  };
  const audio = {
    uri: storageUri,
  };
  const request = {
    config: config,
    audio: audio,
  };
  client
    .recognize(request)
    .then(responses => {
      const response = responses[0];
      for (const result of response.results) {
        // First alternative is the most probable result
        const alternative = result.alternatives[0];
        console.log(`Transcript: ${alternative.transcript}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

// [END speech_transcribe_sync_gcs]
// tslint:disable-next-line:no-any

const argv = require(`yargs`).option('storage_uri', {
  default: 'gs://cloud-samples-data/speech/brooklyn_bridge.raw',
  string: true,
}).argv;

sampleRecognize(argv.storage_uri);
