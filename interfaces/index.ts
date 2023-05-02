import { SignUpDto } from '~/interfaces/apiTypes/auth/dto/sign-up.dto';
import { ResponseUserDto } from '~/interfaces/apiTypes/user/dto/response-user.dto';
import { UpdateUserDto } from '~/interfaces/apiTypes/user/dto/update-user.dto';
import { CreateUserDto } from '~/interfaces/apiTypes/user/dto/create-user.dto';
import PaginationDto from '~/interfaces/apiTypes/helpers/pagination.dto';

export interface ResultWithMessage<T> {
  message: string;
  result: T;
  error?: string;
}

export interface EnvConfig {
  API_HOST: string;
  PRODUCTION: boolean;
  AUTH_COOKIE_NAME: string;
}

export interface UserNavigationItem {
  name: string;
  href?: string;
  action?: () => any;
}

export interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
  icon: string;
  skip?: boolean;
}

export interface SimplePropValidatorInterface {
  $errors: {
    $message: string;
  };
}

export type withId = {
  id: number;
}
export type SignUpFormDataType = Omit<SignUpDto, 'fio' | 'toEntity'>;
export type UserListElementType = Pick<ResponseUserDto, 'banned_to' | 'email' | 'id' | 'fio' | 'phone' | 'isActive'>
export type CreateUserType = Omit<CreateUserDto, 'toEntity' | 'fio'> & withId
export type UserByIdType = Required<Pick<ResponseUserDto, 'banned_to' | 'email' | 'id' | 'fio' | 'phone' | 'isActive' | 'rights'>>
export type DataTableOptions = Required<PaginationDto>
export type UpdateUserType = Omit<Required<UpdateUserDto>, 'fio' | 'toEntity'> & withId
export type UpdateProfileType = Omit<UpdateUserType, 'rights'>
export interface DataTableHeaderElement {
  text: string;
  value: string;
  sort?: boolean;
}
