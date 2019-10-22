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

// DO NOT EDIT! This is a generated sample ("Request",  "speech_transcribe_recognition_metadata_beta")

// sample-metadata:
//   title: Adding recognition metadata (Local File) (Beta)
//   description: Adds additional details short audio file included in this recognition request
//   usage: node samples/v1p1beta1/speech_transcribe_recognition_metadata_beta.js [--local_file_path "resources/commercial_mono.wav"]

'use strict';

// [START speech_transcribe_recognition_metadata_beta]

const {SpeechClient} = require('@google-cloud/speech').v1p1beta1;

const fs = require('fs');
/**
 * Adds additional details short audio file included in this recognition request
 *
 * @param localFilePath {string} Path to local audio file, e.g. /path/audio.wav
 */
function sampleRecognize(localFilePath) {
  const client = new SpeechClient();
  // const localFilePath = 'resources/commercial_mono.wav';

  // The use case of the audio, e.g. PHONE_CALL, DISCUSSION, PRESENTATION, et al.
  const interactionType = 'VOICE_SEARCH';

  // The kind of device used to capture the audio
  const recordingDeviceType = 'SMARTPHONE';

  // The device used to make the recording.
  // Arbitrary string, e.g. 'Pixel XL', 'VoIP', 'Cardioid Microphone', or other value.
  const recordingDeviceName = 'Pixel 3';
  const metadata = {
    interactionType: interactionType,
    recordingDeviceType: recordingDeviceType,
    recordingDeviceName: recordingDeviceName,
  };

  // The language of the supplied audio. Even though additional languages are
  // provided by alternative_language_codes, a primary language is still required.
  const languageCode = 'en-US';
  const config = {
    metadata: metadata,
    languageCode: languageCode,
  };
  const content = fs.readFileSync(localFilePath).toString('base64');
  const audio = {
    content: content,
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

// [END speech_transcribe_recognition_metadata_beta]
// tslint:disable-next-line:no-any

const argv = require(`yargs`).option('local_file_path', {
  default: 'resources/commercial_mono.wav',
  string: true,
}).argv;

sampleRecognize(argv.local_file_path);
