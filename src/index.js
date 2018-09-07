'use strict'

const mh = require('multihashes')
const multibase = require('multibase')
const multicodec = require('multicodec')
const codecs = require('multicodec/src/base-table')
const multihash = require('multihashes')
const CIDUtil = require('./cid-util')

/* *****************************
 * Adding mime types as codecs:
 *
 * Based on the information at https://www.iana.org/assignments/media-types/media-types.xhtml
 * the following ranges can be reserved for the different mime types/subtypes.
 * In this implementation we are only declaring the mime types listed in the following article
 * since these should be the most relevant for the web, plus a few more useful for the semantic web:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
 */

// Range 0x1000 - 0x17ff (11 bits) reserved for 'application/*' (there currently are ~1,300 subtypes)
multicodec.addCodec('mime/application/x-abiword', Buffer.from('1000', 'hex'))
multicodec.addCodec('mime/application/octet-stream', Buffer.from('1001', 'hex'))
multicodec.addCodec('mime/application/vnd.amazon.ebook', Buffer.from('1002', 'hex'))
multicodec.addCodec('mime/application/x-bzip', Buffer.from('1003', 'hex'))
multicodec.addCodec('mime/application/x-bzip2', Buffer.from('1004', 'hex'))
multicodec.addCodec('mime/application/x-csh', Buffer.from('1005', 'hex'))
multicodec.addCodec('mime/application/msword', Buffer.from('1006', 'hex'))
multicodec.addCodec('mime/application/vnd.openxmlformats-officedocument.wordprocessingml.document', Buffer.from('1007', 'hex'))
multicodec.addCodec('mime/application/vnd.ms-fontobject', Buffer.from('1008', 'hex'))
multicodec.addCodec('mime/application/epub+zip', Buffer.from('1009', 'hex'))
multicodec.addCodec('mime/application/ecmascript', Buffer.from('100a', 'hex'))
multicodec.addCodec('mime/application/java-archive', Buffer.from('100b', 'hex'))
multicodec.addCodec('mime/application/javascript', Buffer.from('100c', 'hex'))
multicodec.addCodec('mime/application/json', Buffer.from('100d', 'hex'))
multicodec.addCodec('mime/application/vnd.apple.installer+xml', Buffer.from('100e', 'hex'))
multicodec.addCodec('mime/application/vnd.oasis.opendocument.presentation', Buffer.from('100f', 'hex'))
multicodec.addCodec('mime/application/vnd.oasis.opendocument.spreadsheet', Buffer.from('1010', 'hex'))
multicodec.addCodec('mime/application/vnd.oasis.opendocument.text', Buffer.from('1011', 'hex'))
multicodec.addCodec('mime/application/ogg', Buffer.from('1012', 'hex'))
multicodec.addCodec('mime/application/pdf', Buffer.from('1013', 'hex'))
multicodec.addCodec('mime/application/vnd.ms-powerpoint', Buffer.from('1014', 'hex'))
multicodec.addCodec('mime/application/vnd.openxmlformats-officedocument.presentationml.presentation', Buffer.from('1015', 'hex'))
multicodec.addCodec('mime/application/x-rar-compressed', Buffer.from('1016', 'hex'))
multicodec.addCodec('mime/application/rtf', Buffer.from('1017', 'hex'))
multicodec.addCodec('mime/application/x-sh', Buffer.from('1018', 'hex'))
multicodec.addCodec('mime/application/x-shockwave-flash', Buffer.from('1019', 'hex'))
multicodec.addCodec('mime/application/x-tar', Buffer.from('101a', 'hex'))
multicodec.addCodec('mime/application/typescript', Buffer.from('101b', 'hex'))
multicodec.addCodec('mime/application/vnd.visio', Buffer.from('101c', 'hex'))
multicodec.addCodec('mime/application/xhtml+xml', Buffer.from('101d', 'hex'))
multicodec.addCodec('mime/application/vnd.ms-excel', Buffer.from('101e', 'hex'))
multicodec.addCodec('mime/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', Buffer.from('101f', 'hex'))
multicodec.addCodec('mime/application/xml', Buffer.from('1020', 'hex'))
multicodec.addCodec('mime/application/vnd.mozilla.xul+xml', Buffer.from('1021', 'hex'))
multicodec.addCodec('mime/application/zip', Buffer.from('1022', 'hex'))
multicodec.addCodec('mime/application/x-7z-compressed', Buffer.from('1023', 'hex'))
multicodec.addCodec('mime/application/ld+json', Buffer.from('1024', 'hex'))
multicodec.addCodec('mime/application/rdf+xml', Buffer.from('1025', 'hex'))

// Range 0x1800 - 0x18ff (8 bits) reserved for 'audio/*' (there currently are ~150 subtypes)
multicodec.addCodec('mime/audio/aac', Buffer.from('1800', 'hex'))
multicodec.addCodec('mime/audio/midi', Buffer.from('1801', 'hex'))
multicodec.addCodec('mime/audio/x-midi', Buffer.from('1802', 'hex'))
multicodec.addCodec('mime/audio/ogg', Buffer.from('1803', 'hex'))
multicodec.addCodec('mime/audio/wav', Buffer.from('1804', 'hex'))
multicodec.addCodec('mime/audio/webm', Buffer.from('1805', 'hex'))
multicodec.addCodec('mime/audio/3gpp', Buffer.from('1806', 'hex'))
multicodec.addCodec('mime/audio/3gpp2', Buffer.from('1807', 'hex'))
multicodec.addCodec('mime/audio/mp4', Buffer.from('1808', 'hex'))


// Range 0x1900 - 0x190f (4 bits) reserved for 'font/*' (there currently are ~8 subtypes)
multicodec.addCodec('mime/font/otf', Buffer.from('1900', 'hex'))
multicodec.addCodec('mime/font/ttf', Buffer.from('1901', 'hex'))
multicodec.addCodec('mime/font/woff', Buffer.from('1902', 'hex'))
multicodec.addCodec('mime/font/woff2', Buffer.from('1903', 'hex'))

// Range 0x1910 - 0x197f (7 bits) reserved for 'image/*' (there currently are ~60 subtypes)
multicodec.addCodec('mime/image/bmp', Buffer.from('1910', 'hex'))
multicodec.addCodec('mime/image/gif', Buffer.from('1911', 'hex'))
multicodec.addCodec('mime/image/x-icon', Buffer.from('1912', 'hex'))
multicodec.addCodec('mime/image/jpeg', Buffer.from('1913', 'hex'))
multicodec.addCodec('mime/image/png', Buffer.from('1914', 'hex'))
multicodec.addCodec('mime/image/svg+xml', Buffer.from('1915', 'hex'))
multicodec.addCodec('mime/image/tiff', Buffer.from('1916', 'hex'))
multicodec.addCodec('mime/image/webp', Buffer.from('1917', 'hex'))

// Range 0x1980 - 0x19cf (5 bits) reserved for 'message/*' (there currently are ~18 subtypes)
multicodec.addCodec('mime/message/sip', Buffer.from('1980', 'hex'))

// Range 0x19d0 - 0x1a3f (6 bits) reserved for 'model/*' (there currently are ~24 subtypes)
// multicodec.addCodec('mime/model/', Buffer.from('19d0', 'hex'))

// Range 0x1a40 - 0x1a8f (5 bits) reserved for 'multipart/*' (there currently are ~13 subtypes)
multicodec.addCodec('mime/multipart/byteranges', Buffer.from('1a40', 'hex'))

// Range 0x1a90 - 0x1aff (7 bits) reserved for 'text/*' (there currently are ~71 subtypes)
multicodec.addCodec('mime/text/css', Buffer.from('1a90', 'hex'))
multicodec.addCodec('mime/text/csv', Buffer.from('1a91', 'hex'))
multicodec.addCodec('mime/text/html', Buffer.from('1a92', 'hex'))
multicodec.addCodec('mime/text/calendar', Buffer.from('1a93', 'hex'))
multicodec.addCodec('mime/text/plain', Buffer.from('1a94', 'hex'))
multicodec.addCodec('mime/text/turtle', Buffer.from('1a95', 'hex'))
multicodec.addCodec('mime/text/xml', Buffer.from('1a96', 'hex'))

// Range 0x1b00 - 0x1b6f (7 bits) reserved for 'video/*' (there currently are ~78 subtypes)
multicodec.addCodec('mime/video/x-msvideo', Buffer.from('1b00', 'hex'))
multicodec.addCodec('mime/video/mpeg', Buffer.from('1b01', 'hex'))
multicodec.addCodec('mime/video/ogg', Buffer.from('1b02', 'hex'))
multicodec.addCodec('mime/video/webm', Buffer.from('1b03', 'hex'))
multicodec.addCodec('mime/video/3gpp', Buffer.from('1b04', 'hex'))
multicodec.addCodec('mime/video/3gpp2', Buffer.from('1b05', 'hex'))
multicodec.addCodec('mime/video/JPEG', Buffer.from('1b06', 'hex'))
multicodec.addCodec('mime/video/mp4', Buffer.from('1b07', 'hex'))

/* End of adding mime types as codecs
 *************************************/

/**
 * @typedef {Object} SerializedCID
 * @param {string} codec
 * @param {number} version
 * @param {Buffer} multihash
 *
 */

/**
 * Class representing a CID `<mbase><version><mcodec><mhash>`
 * , as defined in [ipld/cid](https://github.com/ipld/cid).
 * @class CID
 */
class CID {
  /**
   * Create a new CID.
   *
   * The algorithm for argument input is roughly:
   * ```
   * if (str)
   *   if (1st char is on multibase table) -> CID String
   *   else -> bs58 encoded multihash
   * else if (Buffer)
   *   if (0 or 1) -> CID
   *   else -> multihash
   * else if (Number)
   *   -> construct CID by parts
   *
   * ..if only JS had traits..
   * ```
   *
   * @param {string|Buffer} version
   * @param {string} [codec]
   * @param {Buffer} [multihash]
   *
   * @example
   *
   * new CID(<version>, <codec>, <multihash>)
   * new CID(<cidStr>)
   * new CID(<cid.buffer>)
   * new CID(<multihash>)
   * new CID(<bs58 encoded multihash>)
   * new CID(<cid>)
   *
   */
  constructor (version, codec, multihash) {
    if (CID.isCID(version)) {
      let cid = version
      this.version = cid.version
      this.codec = cid.codec
      this.multihash = Buffer.from(cid.multihash)
      return
    }
    if (typeof version === 'string') {
      if (multibase.isEncoded(version)) { // CID String (encoded with multibase)
        const cid = multibase.decode(version)
        version = parseInt(cid.slice(0, 1).toString('hex'), 16)
        codec = multicodec.getCodec(cid.slice(1))
        multihash = multicodec.rmPrefix(cid.slice(1))
      } else { // bs58 string encoded multihash
        codec = 'dag-pb'
        multihash = mh.fromB58String(version)
        version = 0
      }
    } else if (Buffer.isBuffer(version)) {
      const firstByte = version.slice(0, 1)
      const v = parseInt(firstByte.toString('hex'), 16)
      if (v === 0 || v === 1) { // CID
        const cid = version
        version = v
        codec = multicodec.getCodec(cid.slice(1))
        multihash = multicodec.rmPrefix(cid.slice(1))
      } else { // multihash
        codec = 'dag-pb'
        multihash = version
        version = 0
      }
    }

    /**
     * @type {string}
     */
    this.codec = codec

    /**
     * @type {number}
     */
    this.version = version

    /**
     * @type {Buffer}
     */
    this.multihash = multihash
    CID.validateCID(this)
  }

  /**
   * The CID as a `Buffer`
   *
   * @return {Buffer}
   * @readonly
   *
   * @memberOf CID
   */
  get buffer () {
    switch (this.version) {
      case 0:
        return this.multihash
      case 1:
        return Buffer.concat([
          Buffer.from('01', 'hex'),
          multicodec.getCodeVarint(this.codec),
          this.multihash
        ])
      default:
        throw new Error('unsupported version')
    }
  }

  /**
   * Get the prefix of the CID.
   *
   * @returns {Buffer}
   * @readonly
   */
  get prefix () {
    return Buffer.concat([
      Buffer.from(`0${this.version}`, 'hex'),
      multicodec.getCodeVarint(this.codec),
      multihash.prefix(this.multihash)
    ])
  }

  /**
   * Convert to a CID of version `0`.
   *
   * @returns {CID}
   */
  toV0 () {
    if (this.codec !== 'dag-pb') {
      throw new Error('Cannot convert a non dag-pb CID to CIDv0')
    }

    return new CID(0, this.codec, this.multihash)
  }

  /**
   * Convert to a CID of version `1`.
   *
   * @returns {CID}
   */
  toV1 () {
    return new CID(1, this.codec, this.multihash)
  }

  /**
   * Encode the CID into a string.
   *
   * @param {string} [base='base58btc'] - Base encoding to use.
   * @returns {string}
   */
  toBaseEncodedString (base) {
    base = base || 'base58btc'

    switch (this.version) {
      case 0: {
        if (base !== 'base58btc') {
          throw new Error('not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()')
        }
        return mh.toB58String(this.multihash)
      }
      case 1:
        return multibase.encode(base, this.buffer).toString()
      default:
        throw new Error('Unsupported version')
    }
  }

  /**
   * Serialize to a plain object.
   *
   * @returns {SerializedCID}
   */
  toJSON () {
    return {
      codec: this.codec,
      version: this.version,
      hash: this.multihash
    }
  }

  /**
   * Compare equality with another CID.
   *
   * @param {CID} other
   * @returns {bool}
   */
  equals (other) {
    return this.codec === other.codec &&
      this.version === other.version &&
      this.multihash.equals(other.multihash)
  }

  /**
   * Test if the given input is a CID.
   *
   * @param {any} other
   * @returns {bool}
   */
  static isCID (other) {
    return !(CIDUtil.checkCIDComponents(other))
  }

  /**
   * Test if the given input is a valid CID object.
   * Throws if it is not.
   *
   * @param {any} other
   * @returns {void}
   */
  static validateCID (other) {
    let errorMsg = CIDUtil.checkCIDComponents(other)
    if (errorMsg) {
      throw new Error(errorMsg)
    }
  }
}

CID.codecs = codecs

module.exports = CID
