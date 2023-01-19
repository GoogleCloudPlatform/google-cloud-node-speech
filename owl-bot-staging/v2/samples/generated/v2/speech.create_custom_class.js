// Copyright 2023 Google LLC
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

function main(customClass, parent) {
  // [START speech_v2_generated_Speech_CreateCustomClass_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The CustomClass to create.
   */
  // const customClass = {}
  /**
   *  If set, validate the request and preview the CustomClass, but do not
   *  actually create it.
   */
  // const validateOnly = true
  /**
   *  The ID to use for the CustomClass, which will become the final component of
   *  the CustomClass's resource name.
   *  This value should be 4-63 characters, and valid characters
   *  are /[a-z][0-9]-/.
   */
  // const customClassId = 'abc123'
  /**
   *  Required. The project and location where this CustomClass will be created.
   *  The expected format is `projects/{project}/locations/{location}`.
   */
  // const parent = 'abc123'

  // Imports the Speech library
  const {SpeechClient} = require('@google-cloud/speech').v2;

  // Instantiates a client
  const speechClient = new SpeechClient();

  async function callCreateCustomClass() {
    // Construct request
    const request = {
      customClass,
      parent,
    };

    // Run request
    const [operation] = await speechClient.createCustomClass(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callCreateCustomClass();
  // [END speech_v2_generated_Speech_CreateCustomClass_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
