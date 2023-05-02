import { UpdateUserType } from '~/interfaces';

export function copyObject<T> (o: T): T {
  return JSON.parse(JSON.stringify(o));
}
export const getSplittedFio = (fio: string): Pick<UpdateUserType, 'name'|'secondname'|'surname'> => {
  const splt = fio.split(' ');
  return {
    name: splt[0],
    surname: splt[1],
    secondname: splt.length > 2 ? splt[3] : ''
  };
};
