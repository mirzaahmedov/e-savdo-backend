import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCartItemsService } from './shopping-cart-items.service';
import { CreateShoppingCartItemDto } from './dto/create-shopping-cart-item.dto';
import { UpdateShoppingCartItemDto } from './dto/update-shopping-cart-item.dto';
import { AuthenticatedGuard } from '@app/users/authenticated.guard';
import { GetUser } from '@app/users/get-user.decorator';
import { UserPayload } from '@app/users/interfaces/user-payload.interface';

@Controller('shopping-cart')
@UseGuards(AuthenticatedGuard)
export class ShoppingCartItemsController {
  constructor(
    private readonly shoppingCartItemsService: ShoppingCartItemsService,
  ) {}

  @Post()
  create(
    @GetUser() currentUser: UserPayload,
    @Body() createShoppingCartItemDto: CreateShoppingCartItemDto,
  ) {
    return this.shoppingCartItemsService.create(
      currentUser.userID,
      createShoppingCartItemDto,
    );
  }

  @Get()
  findAll(@GetUser() currentUser: UserPayload) {
    return this.shoppingCartItemsService.findAll(currentUser.userID);
  }

  @Get(':id')
  findOne(@GetUser() currentUser: UserPayload, @Param('id') id: string) {
    return this.shoppingCartItemsService.findOne(currentUser.userID, +id);
  }

  @Patch(':id')
  update(
    @GetUser() currentUser: UserPayload,
    @Param('id') id: string,
    @Body() updateShoppingCartItemDto: UpdateShoppingCartItemDto,
  ) {
    return this.shoppingCartItemsService.update(
      currentUser.userID,
      +id,
      updateShoppingCartItemDto,
    );
  }

  @Delete(':id')
  remove(@GetUser() currentUser: UserPayload, @Param('id') id: string) {
    return this.shoppingCartItemsService.remove(currentUser.userID, +id);
  }
}
