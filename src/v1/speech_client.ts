// Copyright 2021 Google LLC
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

/* global window */
import * as gax from 'google-gax';
import {
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  LROperation,
} from 'google-gax';
import * as path from 'path';

import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v1/speech_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './speech_client_config.json';
import {operationsProtos} from 'google-gax';
const version = require('../../../package.json').version;

/**
 *  Service that implements Google Cloud Speech API.
 * @class
 * @memberof v1
 */
export class SpeechClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  innerApiCalls: {[name: string]: Function};
  operationsClient: gax.OperationsClient;
  speechStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of SpeechClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean} [options.fallback] - Use HTTP fallback mode.
   *     In fallback mode, a special browser-compatible transport implementation is used
   *     instead of gRPC transport. In browser context (if the `window` object is defined)
   *     the fallback mode is enabled automatically; set `options.fallback` to `false`
   *     if you need to override this behavior.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof SpeechClient;
    const servicePath =
      opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback =
      opts?.fallback ??
      (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    // Some of the methods on this service provide streaming responses.
    // Provide descriptors for these.
    this.descriptors.stream = {
      streamingRecognize: new this._gaxModule.StreamDescriptor(
        gax.StreamType.BIDI_STREAMING
      ),
    };

    const protoFilesRoot = this._gaxModule.protobuf.Root.fromJSON(jsonProtos);

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.

    this.operationsClient = this._gaxModule
      .lro({
        auth: this.auth,
        grpc: 'grpc' in this._gaxGrpc ? this._gaxGrpc.grpc : undefined,
      })
      .operationsClient(opts);
    const longRunningRecognizeResponse = protoFilesRoot.lookup(
      '.google.cloud.speech.v1.LongRunningRecognizeResponse'
    ) as gax.protobuf.Type;
    const longRunningRecognizeMetadata = protoFilesRoot.lookup(
      '.google.cloud.speech.v1.LongRunningRecognizeMetadata'
    ) as gax.protobuf.Type;

    this.descriptors.longrunning = {
      longRunningRecognize: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        longRunningRecognizeResponse.decode.bind(longRunningRecognizeResponse),
        longRunningRecognizeMetadata.decode.bind(longRunningRecognizeMetadata)
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.speech.v1.Speech',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.speechStub) {
      return this.speechStub;
    }

    // Put together the "service stub" for
    // google.cloud.speech.v1.Speech.
    this.speechStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.speech.v1.Speech'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.speech.v1.Speech,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const speechStubMethods = [
      'recognize',
      'longRunningRecognize',
      'streamingRecognize',
    ];
    for (const methodName of speechStubMethods) {
      const callPromise = this.speechStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const descriptor =
        this.descriptors.stream[methodName] ||
        this.descriptors.longrunning[methodName] ||
        undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.speechStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'speech.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'speech.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  recognize(
    request: protos.google.cloud.speech.v1.IRecognizeRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.cloud.speech.v1.IRecognizeResponse,
      protos.google.cloud.speech.v1.IRecognizeRequest | undefined,
      {} | undefined
    ]
  >;
  recognize(
    request: protos.google.cloud.speech.v1.IRecognizeRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.cloud.speech.v1.IRecognizeResponse,
      protos.google.cloud.speech.v1.IRecognizeRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  recognize(
    request: protos.google.cloud.speech.v1.IRecognizeRequest,
    callback: Callback<
      protos.google.cloud.speech.v1.IRecognizeResponse,
      protos.google.cloud.speech.v1.IRecognizeRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Performs synchronous speech recognition: receive results after all audio
   * has been sent and processed.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.speech.v1.RecognitionConfig} request.config
   *   Required. Provides information to the recognizer that specifies how to
   *   process the request.
   * @param {google.cloud.speech.v1.RecognitionAudio} request.audio
   *   Required. The audio data to be recognized.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [RecognizeResponse]{@link google.cloud.speech.v1.RecognizeResponse}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example
   * const [response] = await client.recognize(request);
   */
  recognize(
    request: protos.google.cloud.speech.v1.IRecognizeRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.cloud.speech.v1.IRecognizeResponse,
          protos.google.cloud.speech.v1.IRecognizeRequest | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.speech.v1.IRecognizeResponse,
      protos.google.cloud.speech.v1.IRecognizeRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.speech.v1.IRecognizeResponse,
      protos.google.cloud.speech.v1.IRecognizeRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    this.initialize();
    return this.innerApiCalls.recognize(request, options, callback);
  }

  /**
   * Performs bidirectional streaming speech recognition: receive results while
   * sending audio. This method is only available via the gRPC API (not REST).
   *
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which is both readable and writable. It accepts objects
   *   representing [StreamingRecognizeRequest]{@link google.cloud.speech.v1.StreamingRecognizeRequest} for write() method, and
   *   will emit objects representing [StreamingRecognizeResponse]{@link google.cloud.speech.v1.StreamingRecognizeResponse} on 'data' event asynchronously.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#bi-directional-streaming)
   *   for more details and examples.
   * @example
   * const stream = client.streamingRecognize();
   * stream.on('data', (response) => { ... });
   * stream.on('end', () => { ... });
   * stream.write(request);
   * stream.end();
   */
  _streamingRecognize(options?: CallOptions): gax.CancellableStream {
    this.initialize();
    return this.innerApiCalls.streamingRecognize(options);
  }

  longRunningRecognize(
    request: protos.google.cloud.speech.v1.ILongRunningRecognizeRequest,
    options?: CallOptions
  ): Promise<
    [
      LROperation<
        protos.google.cloud.speech.v1.ILongRunningRecognizeResponse,
        protos.google.cloud.speech.v1.ILongRunningRecognizeMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  longRunningRecognize(
    request: protos.google.cloud.speech.v1.ILongRunningRecognizeRequest,
    options: CallOptions,
    callback: Callback<
      LROperation<
        protos.google.cloud.speech.v1.ILongRunningRecognizeResponse,
        protos.google.cloud.speech.v1.ILongRunningRecognizeMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  longRunningRecognize(
    request: protos.google.cloud.speech.v1.ILongRunningRecognizeRequest,
    callback: Callback<
      LROperation<
        protos.google.cloud.speech.v1.ILongRunningRecognizeResponse,
        protos.google.cloud.speech.v1.ILongRunningRecognizeMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Performs asynchronous speech recognition: receive results via the
   * google.longrunning.Operations interface. Returns either an
   * `Operation.error` or an `Operation.response` which contains
   * a `LongRunningRecognizeResponse` message.
   * For more information on asynchronous speech recognition, see the
   * [how-to](https://cloud.google.com/speech-to-text/docs/async-recognize).
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.speech.v1.RecognitionConfig} request.config
   *   Required. Provides information to the recognizer that specifies how to
   *   process the request.
   * @param {google.cloud.speech.v1.RecognitionAudio} request.audio
   *   Required. The audio data to be recognized.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing
   *   a long running operation. Its `promise()` method returns a promise
   *   you can `await` for.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
   *   for more details and examples.
   * @example
   * const [operation] = await client.longRunningRecognize(request);
   * const [response] = await operation.promise();
   */
  longRunningRecognize(
    request: protos.google.cloud.speech.v1.ILongRunningRecognizeRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          LROperation<
            protos.google.cloud.speech.v1.ILongRunningRecognizeResponse,
            protos.google.cloud.speech.v1.ILongRunningRecognizeMetadata
          >,
          protos.google.longrunning.IOperation | null | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      LROperation<
        protos.google.cloud.speech.v1.ILongRunningRecognizeResponse,
        protos.google.cloud.speech.v1.ILongRunningRecognizeMetadata
      >,
      protos.google.longrunning.IOperation | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      LROperation<
        protos.google.cloud.speech.v1.ILongRunningRecognizeResponse,
        protos.google.cloud.speech.v1.ILongRunningRecognizeMetadata
      >,
      protos.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    this.initialize();
    return this.innerApiCalls.longRunningRecognize(request, options, callback);
  }
  /**
   * Check the status of the long running operation returned by `longRunningRecognize()`.
   * @param {String} name
   *   The operation name that will be passed.
   * @returns {Promise} - The promise which resolves to an object.
   *   The decoded operation object has result and metadata field to get information from.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations)
   *   for more details and examples.
   * @example
   * const decodedOperation = await checkLongRunningRecognizeProgress(name);
   * console.log(decodedOperation.result);
   * console.log(decodedOperation.done);
   * console.log(decodedOperation.metadata);
   */
  async checkLongRunningRecognizeProgress(
    name: string
  ): Promise<
    LROperation<
      protos.google.cloud.speech.v1.LongRunningRecognizeResponse,
      protos.google.cloud.speech.v1.LongRunningRecognizeMetadata
    >
  > {
    const request = new operationsProtos.google.longrunning.GetOperationRequest(
      {name}
    );
    const [operation] = await this.operationsClient.getOperation(request);
    const decodeOperation = new gax.Operation(
      operation,
      this.descriptors.longrunning.longRunningRecognize,
      gax.createDefaultBackoffSettings()
    );
    return decodeOperation as LROperation<
      protos.google.cloud.speech.v1.LongRunningRecognizeResponse,
      protos.google.cloud.speech.v1.LongRunningRecognizeMetadata
    >;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.speechStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}

import {ImprovedStreamingClient} from '../helpers';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SpeechClient extends ImprovedStreamingClient {}
