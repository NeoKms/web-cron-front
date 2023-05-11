import { SignUpDto } from '~/interfaces/apiTypes/auth/dto/sign-up.dto';
import { ResponseUserDto } from '~/interfaces/apiTypes/user/dto/response-user.dto';
import { UpdateUserDto } from '~/interfaces/apiTypes/user/dto/update-user.dto';
import { CreateUserDto } from '~/interfaces/apiTypes/user/dto/create-user.dto';
import PaginationDto from '~/interfaces/apiTypes/helpers/pagination.dto';
import ResponseSshDto from '~/interfaces/apiTypes/ssh/dto/response-ssh.dto';
import CreateSshDto from '~/interfaces/apiTypes/ssh/dto/create-ssh.dto';
import ResponseJobDto from '~/interfaces/apiTypes/jobs/dto/response-job.dto';
import ResponseLogDto from '~/interfaces/apiTypes/log/dto/response-log.dto';

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
export type SshElementType = Required<ResponseSshDto>
export type CreateSshType = Omit<CreateSshDto, 'privateKey' | 'toEntity'> & { privateKey: File | null }
export type JobElementType = Omit<ResponseJobDto, 'sshEntity'>;
export type LogElementType = ResponseLogDto;
export type internalTimeType = {
  minute: {
    value: string,
    period: boolean,
  },
  hour: {
    value: string,
    period: boolean,
  },
  day: {
    value: string,
    period: boolean,
  },
  month: {
    value: string,
    period: boolean,
  },
  weekDay: {
    value: string,
    period: boolean,
  },
}
export type CreateJobType = {
  job: string,
  name: string,
  sshEntityId: number,
  time: internalTimeType
};

export interface DataTableHeaderElement {
  text: string;
  value: string;
  sort?: boolean;
}

export interface objectWithArrays {
  [key: string]: Array<string>;
}
