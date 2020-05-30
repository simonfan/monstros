import { Keystone } from '@keystonejs/keystone'
import { MongooseAdapter } from '@keystonejs/adapter-mongoose'
import { GraphQLApp } from '@keystonejs/app-graphql'
import { AdminUIApp } from '@keystonejs/app-admin-ui'

import { MonsterPart } from './components/MonsterPart/MonsterPart'

export const keystone = new Keystone({
  name: 'Monstros',
  cookieSecret: process.env.KEYSTONE_COOKIE_SECRET,
  adapter: new MongooseAdapter({
    mongoUri: process.env.MONGODB_URI,
  })
})

export const apps = [
  new GraphQLApp(),
  new AdminUIApp({
    enableDefaultRoute: true,
  }),
]

MonsterPart({ keystone })

export default {
  keystone,
  apps
}
