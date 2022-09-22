// Copyright 2022 Google LLC
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
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(customClass) {
  // [START speech_v2_generated_Speech_UpdateCustomClass_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The CustomClass to update.
   *  The CustomClass's `name` field is used to identify the CustomClass to
   *  update. Format:
   *  `projects/{project}/locations/{location}/customClasses/{custom_class}`.
   */
  // const customClass = {}
  /**
   *  The list of fields to be updated. If empty, all fields are considered for
   *  update.
   */
  // const updateMask = {}
  /**
   *  If set, validate the request and preview the updated CustomClass, but do
   *  not actually update it.
   */
  // const validateOnly = true

  // Imports the Speech library
  const {SpeechClient} = require('@google-cloud/speech').v2;

  // Instantiates a client
  const speechClient = new SpeechClient();

  async function callUpdateCustomClass() {
    // Construct request
    const request = {
      customClass,
    };

    // Run request
    const [operation] = await speechClient.updateCustomClass(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callUpdateCustomClass();
  // [END speech_v2_generated_Speech_UpdateCustomClass_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));