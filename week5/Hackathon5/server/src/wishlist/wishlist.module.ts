import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistItem, WishlistItemSchema } from './schema/wishlist.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:WishlistItem.name,schema:WishlistItemSchema}])],
  controllers: [WishlistController],
  providers: [WishlistService]
})
export class WishlistModule {}
