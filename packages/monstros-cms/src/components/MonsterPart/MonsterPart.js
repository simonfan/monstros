import { Text, File, Select } from '@keystonejs/fields'
import { S3Adapter } from '@keystonejs/file-adapters'

const S3_PATH = 'uploads'
const S3_BUCKET = 'monstros'
const S3_REGION = 'sa-east-1'

export const MonsterPart = ({ keystone }) => {
  keystone.createList('MonsterPart', {
    label: 'Partes de monstro',
    fields: {
      name: {
        type: Text,
        isRequired: true
      },
      type: {
        type: Select,
        options: [
          { label: 'Cabeça (M)', value: 'head_m' },
          { label: 'Tronco (M)', value: 'body_m' },
          { label: 'Pernas (M)', value: 'legs_m' },
          { label: 'Cabeça (P)', value: 'head_p' },
          { label: 'Tronco (P)', value: 'body_p' },
          { label: 'Pernas (P)', value: 'legs_p' },
          { label: 'Cabeça (G)', value: 'head_g' },
          { label: 'Tronco (G)', value: 'body_g' },
          { label: 'Pernas (G)', value: 'legs_g' },
        ]
      },
      image: {
        type: File,
        adapter: new S3Adapter({
          //
          // Track issue:
          // https://github.com/keystonejs/keystone/issues/2965
          //
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: S3_REGION,

          bucket: S3_BUCKET,
          folder: S3_PATH,
          publicUrl: ({ id, filename, _meta }) => (
            `https://${S3_BUCKET}.s3-${S3_REGION}.amazonaws.com/${S3_PATH}/${filename}`
          ),
          s3Options: {
            profile: 'monstros',
            apiVersion: '2006-03-01',
            region: S3_REGION,
          },
        })
      }
    }
  })
}
