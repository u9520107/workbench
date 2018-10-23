import { sortWith, ascend, prop } from 'ramda';

export default sortWith([
  ascend(prop('lastName')),
  ascend(prop('firstName')),
]);
