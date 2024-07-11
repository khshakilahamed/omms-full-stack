// export const selectResponseItem = {
//   id: true,
//   email: true,
//   role: true,
// };

exports.userSelectOptions = {
  id: true,
  name: true,
  email: true,
  role: true,
  isBanned: true,
  createdAt: true,
  updatedAt: true,
};

exports.serviceSearchableFields = ['name', 'email'];

exports.serviceFilterableFields = ['searchTerm', 'id', 'email', 'role', 'isBanned'];