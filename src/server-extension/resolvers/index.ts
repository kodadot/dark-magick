import { Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'

import { CollectionChartResolver } from './collectionChart'
import { CollectionEventResolver } from './collectionEvent'
import { CountResolver } from './count'
import { EmoteResolver } from './emote'
import { EventResolver } from './event'
import { PassionFeedResolver } from './passionFeed'
import { SalesFeedResolver } from './salesFeed'
import { SeriesResolver } from './series'
import { SpotlightResolver } from './spotlight'

@ObjectType()
export class Hello {
  @Field(() => String, { nullable: false })
  greeting!: string

  constructor(greeting: string) {
    this.greeting = greeting
  }
}


@Resolver()
export class HelloResolver {
  constructor(
    private tx: () => Promise<EntityManager>
  ) {}

  @Query(() => Hello)
  async hello(): Promise<Hello> {
      return new Hello(`Hey, this is you custom API extension`)
  }
}

export {
  CollectionChartResolver,
  CountResolver,
  EventResolver,
  SeriesResolver,
  SpotlightResolver,
  CollectionEventResolver,
  PassionFeedResolver,
  SalesFeedResolver,
  EmoteResolver,
}
